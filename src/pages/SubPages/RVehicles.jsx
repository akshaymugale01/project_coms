import React, { useEffect, useMemo, useState, useCallback } from "react";
import RVehiclesTable from "./RVehiclesTable";
import Navbar from "../../components/Navbar";
import Passes from "../Passes";
import { getRegisteredVehicle, getVehicleHistory } from "../../api";
import { FaSearch } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getItemInLocalStorage } from "../../utils/localStorage";

/** ---------------- Token helpers ---------------- */
const normalizeToken = (raw) => {
  if (!raw) return "";
  let t = String(raw).trim();
  t = t.replace(/^"+|"+$/g, "").replace(/^'+|'+$/g, "");
  if (t.toLowerCase().startsWith("bearer ")) t = t.slice("bearer ".length);
  if (t.toLowerCase().startsWith("token=")) t = t.slice("token=".length);
  return t.trim();
};

const readTokensFromStorage = () => {
  const bearerRaw =
    getItemInLocalStorage("admin_access") ||
    getItemInLocalStorage("ADMIN_ACCESS") ||
    getItemInLocalStorage("access") ||
    getItemInLocalStorage("ACCESS") ||
    "";

  const queryRaw =
    getItemInLocalStorage("TOKEN") ||
    getItemInLocalStorage("token") ||
    getItemInLocalStorage("auth_token") ||
    getItemInLocalStorage("AUTH_TOKEN") ||
    getItemInLocalStorage("api_token") ||
    getItemInLocalStorage("API_TOKEN") ||
    getItemInLocalStorage("admin_token") ||
    getItemInLocalStorage("ADMIN_TOKEN") ||
    "";

  return {
    bearerToken: normalizeToken(bearerRaw),
    queryToken: normalizeToken(queryRaw),
  };
};

/** ---------------- recentHistory persistence ---------------- */
const RECENT_HISTORY_KEY = "RVehicles_recentHistory_v1";

const readRecentHistory = () => {
  try {
    const raw = localStorage.getItem(RECENT_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeRecentHistory = (arr) => {
  try {
    localStorage.setItem(RECENT_HISTORY_KEY, JSON.stringify(arr || []));
  } catch {
    // ignore storage quota / private mode issues
  }
};

const pruneRecentHistory = (arr, max = 50, maxAgeDays = 14) => {
  const now = Date.now();
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;

  const filtered = (arr || []).filter((x) => {
    const t =
      (x?.created_at && new Date(x.created_at).getTime()) ||
      (x?.check_in && new Date(x.check_in).getTime()) ||
      0;
    if (!t) return true; // if no date, keep it
    return now - t <= maxAgeMs;
  });

  // keep newest first
  filtered.sort((a, b) => {
    const da =
      (a?.created_at && new Date(a.created_at).getTime()) ||
      (a?.check_in && new Date(a.check_in).getTime()) ||
      0;
    const db =
      (b?.created_at && new Date(b.created_at).getTime()) ||
      (b?.check_in && new Date(b.check_in).getTime()) ||
      0;
    return db - da;
  });

  return filtered.slice(0, max);
};

const RVehicles = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState("All");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [tokens, setTokens] = useState(() => readTokensFromStorage());

  // ✅ after approve/reject: force refetch
  const [refreshTick, setRefreshTick] = useState(0);

  // ✅ local “recent history” (persisted)
  const [recentHistory, setRecentHistory] = useState(() =>
    pruneRecentHistory(readRecentHistory(), 50, 14),
  );

  // keep localStorage in sync
  useEffect(() => {
    writeRecentHistory(pruneRecentHistory(recentHistory, 50, 14));
  }, [recentHistory]);

  useEffect(() => {
    const syncTokens = () => setTokens(readTokensFromStorage());
    syncTokens();
    window.addEventListener("storage", syncTokens);
    return () => window.removeEventListener("storage", syncTokens);
  }, []);

  // if tokens change (login/logout), optionally clear old history for safety
  // (comment out if you want history to remain even across accounts)
  useEffect(() => {
    // If you want to clear on missing token:
    const t =
      normalizeToken(tokens?.queryToken) || normalizeToken(tokens?.bearerToken);
    if (!t) {
      setRecentHistory([]);
      writeRecentHistory([]);
    }
  }, [tokens]);

  const BASE_URL = useMemo(() => {
    return (
      import.meta.env.VITE_API_BASE ||
      import.meta.env.VITE_API_BASE_URL ||
      "https://app.myciti.life"
    );
  }, []);

  const PER_PAGE = 10;
  const site_id = getItemInLocalStorage("SITEID");

  const getVehicleIdFromRow = (rowOrId) => {
    if (!rowOrId) return null;
    if (typeof rowOrId === "number" || typeof rowOrId === "string")
      return rowOrId;

    const row = rowOrId;
    return (
      row.registered_vehicle_id ||
      row.registered_vehicle?.id ||
      row.__vehicleId ||
      row.vehicle_id ||
      row.id
    );
  };

  const requestOrThrow = async (url, options = {}) => {
    const { useBearer = true, ...fetchOptions } = options;

    const headers = {
      Accept: "application/json",
      ...(fetchOptions.headers || {}),
    };

    if (useBearer && tokens?.bearerToken) {
      headers.Authorization = `Bearer ${tokens.bearerToken}`;
    }

    const res = await fetch(url, {
      ...fetchOptions,
      headers,
      signal: fetchOptions.signal,
    });

    const text = await res.text();

    if (!res.ok) {
      const err = new Error(
        `Request failed (${res.status})${text ? ` - ${text.slice(0, 300)}` : ""}`,
      );
      err.status = res.status;
      err.body = text;
      err.url = url;
      throw err;
    }

    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return { raw: text };
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPageNum(1);
  };

  const requireApprovalsTokenOrSetError = useCallback(() => {
    const q = normalizeToken(tokens?.queryToken);
    const b = normalizeToken(tokens?.bearerToken);
    const t = q || b;
    if (!t) {
      setError("Token missing. Please login again.");
      return "";
    }
    return t;
  }, [tokens]);

  const moveToHistoryAndRefresh = () => {
    setPage("History");
    setCurrentPageNum(1);
    setRefreshTick((x) => x + 1);
  };

  /** ✅ keep local history in vehicle_logs shape */
  const pushToRecentHistory = (row, status) => {
    const nowIso = new Date().toISOString();
    const vid = getVehicleIdFromRow(row);

    const vehicleNumber =
      row?.vehicle_number || row?.registered_vehicle?.vehicle_number || "-";
    const vehicleType =
      row?.vehicle_type ||
      row?.name ||
      row?.registered_vehicle?.vehicle_type ||
      "-";
    const vehicleCategory =
      row?.vehicle_category ||
      row?.name ||
      row?.registered_vehicle?.vehicle_category ||
      "-";
    const registeredUser = row?.created_by || row?.registered_user || "-";

    const vehicleLogLike = {
      id: `local-${status}-${vid}-${nowIso}`,
      registered_vehicle_id: vid,
      check_in: nowIso,
      check_out: status === "Rejected" ? nowIso : null,
      created_at: nowIso,
      updated_at: nowIso,
      registered_user: registeredUser,
      approval_status: status,
      registered_vehicle: {
        vehicle_number: vehicleNumber,
        vehicle_type: vehicleType,
        vehicle_category: vehicleCategory,
        slot_number:
          row?.registered_vehicle?.slot_number || row?.slot_number || "-",
        unit_name: row?.registered_vehicle?.unit_name || row?.unit_name || "-",
      },
    };

    setRecentHistory((prev) => {
      const next = [vehicleLogLike, ...(prev || [])];

      // dedupe by vehicle_number + status
      const seen = new Set();
      const unique = [];
      for (const item of next) {
        const key = `${item?.registered_vehicle?.vehicle_number}-${item?.approval_status}`;
        if (seen.has(key)) continue;
        seen.add(key);
        unique.push(item);
      }
      return pruneRecentHistory(unique, 50, 14);
    });
  };

  /** post helper (supports body) */
  const postFirstOk = async (paths, token, bodyObj, method = "POST") => {
    let lastErr = null;

    for (const path of paths) {
      const url = `${BASE_URL}${path}?token=${encodeURIComponent(token)}`;
      try {
        await requestOrThrow(url, {
          method,
          useBearer: false,
          headers: { "Content-Type": "application/json" },
          body: bodyObj ? JSON.stringify(bodyObj) : undefined,
        });
        return;
      } catch (e) {
        lastErr = e;
        if (e?.status === 404) continue;
        throw e;
      }
    }

    throw lastErr || new Error("No matching endpoint found.");
  };

  const handleApprove = async (row) => {
    try {
      setError(null);
      const t = requireApprovalsTokenOrSetError();
      if (!t) return;

      const vehicleId = getVehicleIdFromRow(row);
      if (!vehicleId) return setError("Vehicle ID missing.");

      await postFirstOk(
        [
          `/registered_vehicles/${vehicleId}/approve_request.json`,
          `/registered_vehicles/${vehicleId}/approve.json`,
        ],
        t,
        { approved: true },
        "POST",
      );

      setVehicles((prev) =>
        prev.filter(
          (v) => String(getVehicleIdFromRow(v)) !== String(vehicleId),
        ),
      );

      pushToRecentHistory(row, "Approved");
      moveToHistoryAndRefresh();
    } catch (err) {
      setError(err?.body?.slice?.(0, 250) || err?.message || "Approve failed.");
    }
  };

  const handleReject = async (row) => {
    try {
      setError(null);
      const t = requireApprovalsTokenOrSetError();
      if (!t) return;

      const vehicleId = getVehicleIdFromRow(row);
      if (!vehicleId) return setError("Vehicle ID missing.");

      await postFirstOk(
        [
          `/registered_vehicles/${vehicleId}/approve_request.json`,
          `/registered_vehicles/${vehicleId}/approve.json`,
        ],
        t,
        { approved: false },
        "POST",
      );

      setVehicles((prev) =>
        prev.filter(
          (v) => String(getVehicleIdFromRow(v)) !== String(vehicleId),
        ),
      );

      pushToRecentHistory(row, "Rejected");
      moveToHistoryAndRefresh();
    } catch (err) {
      setError(err?.body?.slice?.(0, 250) || err?.message || "Reject failed.");
    }
  };

  /** ---------------- Main fetch ---------------- */
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let params = { page: currentPageNum, per_page: PER_PAGE };

        if (searchTerm.trim()) {
          params["q[name_or_vehicle_number_cont]"] = searchTerm.trim();
        }

        let response;
        let data = {};
        let list = [];

        if (page === "All") {
          response = await getRegisteredVehicle(params, site_id);
          data = response?.data || {};
          list = data.registered_vehicles || [];
        } else if (page === "Vehicle In") {
          params["q[check_out_not_null]"] = false;
          response = await getVehicleHistory(params, site_id);
          data = response?.data || {};
          list = data.vehicle_logs || [];
        } else if (page === "Vehicle Out") {
          params["q[check_out_not_null]"] = true;
          response = await getVehicleHistory(params, site_id);
          data = response?.data || {};
          list = data.vehicle_logs || [];
        } else if (page === "History") {
          response = await getVehicleHistory(params, site_id);
          data = response?.data || {};
          list = data.vehicle_logs || [];

          // ✅ merge persisted local recentHistory on top + dedupe
          const merged = [...(recentHistory || []), ...(list || [])];
          const seen = new Set();
          const unique = merged.filter((x) => {
            const key =
              x?.id ||
              `${x?.registered_vehicle_id}-${x?.check_in}-${x?.check_out}-${x?.created_at}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });

          setVehicles(unique);
          setTotalPages(data?.total_pages || 1);
          setLoading(false);
          return;
        } else if (page === "Approvals") {
          const t = requireApprovalsTokenOrSetError();
          if (!t) {
            setVehicles([]);
            setTotalPages(1);
            setLoading(false);
            return;
          }

          const qs = new URLSearchParams();
          qs.set("token", t);
          qs.set("page", String(currentPageNum));
          qs.set("per_page", String(PER_PAGE));
          if (searchTerm.trim()) {
            qs.set("q[name_or_vehicle_number_cont]", searchTerm.trim());
          }

          const url = `${BASE_URL}/registered_vehicles/pending_approvals.json?${qs.toString()}`;
          const approvalData = await requestOrThrow(url, {
            signal: controller.signal,
            useBearer: false,
          });

          const raw = Array.isArray(approvalData?.approvals)
            ? approvalData.approvals
            : [];

          const normalized = raw.map((item) => ({
            ...item,
            id: item?.id,
            name: item?.name || "",
            vehicle_number: item?.vehicle_number || "",
            approved: item?.approved || "Pending",
            created_by: item?.created_by || "",
            created_at: item?.created_at || null,
            __vehicleId: item?.registered_vehicle_id || item?.id,
            __createdAt: item?.created_at || null,
            registered_vehicle: {
              id: item?.registered_vehicle_id || item?.id,
              name: item?.name,
              vehicle_number: item?.vehicle_number,
              approved: item?.approved,
              created_by: item?.created_by,
              created_at: item?.created_at,
            },
          }));

          normalized.sort((a, b) => {
            const da = a?.__createdAt ? new Date(a.__createdAt).getTime() : 0;
            const db = b?.__createdAt ? new Date(b.__createdAt).getTime() : 0;
            return db - da;
          });

          setVehicles(normalized);
          setTotalPages(approvalData?.total_pages || 1);
          setLoading(false);
          return;
        }

        const sorted = [...list].sort((a, b) => {
          const da = a?.created_at ? new Date(a.created_at).getTime() : 0;
          const db = b?.created_at ? new Date(b.created_at).getTime() : 0;
          return db - da;
        });

        setVehicles(sorted);
        setTotalPages(data?.total_pages || 1);
      } catch (err) {
        if (err?.name === "AbortError") return;
        setError(err?.body?.slice?.(0, 250) || "Failed to fetch data.");
        setVehicles([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [
    page,
    currentPageNum,
    searchTerm,
    BASE_URL,
    requireApprovalsTokenOrSetError,
    refreshTick,
    recentHistory,
  ]);

  return (
    <div className="visitors-page">
      <section className="flex">
        <Navbar />

        <div className="w-full flex mx-3 flex-col overflow-hidden">
          <Passes />

          <div className="flex justify-between items-end border-b border-gray-300 m-2">
            <div className="flex -mb-px">
              {["All", "Vehicle In", "Vehicle Out", "Approvals", "History"].map(
                (tab) => (
                  <h2
                    key={tab}
                    className={`p-2 px-4 text-sm cursor-pointer border-r border-l border-t ${
                      page === tab
                        ? "text-blue-600 bg-white border-gray-300 rounded-t-lg font-semibold"
                        : "text-gray-600 border-transparent"
                    }`}
                    onClick={() => {
                      if (page !== tab) {
                        setPage(tab);
                        setCurrentPageNum(1);
                        setVehicles([]);
                        setTotalPages(1);
                        setError(null);
                      }
                    }}
                  >
                    {tab}
                  </h2>
                ),
              )}
            </div>

        
          </div>
              <div className="relative mb-1 mr-2 flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="Search name or vehicle..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm w-[1300px]"
              />
              <FaSearch className="absolute left-3 text-gray-400 h-4 w-4" />
              <button
                onClick={() => navigate("/admin/add-rvehicles")}
                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition "
              >
                <IoAddCircleOutline size={20} />
                Add Vehicle
              </button>
            </div>

          <RVehiclesTable
            data={vehicles}
            loading={loading}
            error={error}
            currentPageNum={currentPageNum}
            pageType={page}
            onApprove={page === "Approvals" ? handleApprove : undefined}
            onReject={page === "Approvals" ? handleReject : undefined}
          />
        </div>
      </section>
    </div>
  );
};

export default RVehicles;
