import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { getAllUnits } from "../../../api";
import {
  getCamSettings,
  upsertCamSettings,
  getUnitCamConfigs,
  createUnitCamConfig,
  updateUnitCamConfig,
} from "../../../api/accountingApi";

const defaultSettings = {
  rate_per_sqft: 0,
  gst_rate_move_in: 18,
  gst_rate_move_out: 18,
  advance_months_required: 24,
  tenant_move_in_fee: 0,
  tenant_move_out_fee: 0,
};

const CAMSetup = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(defaultSettings);
  const [units, setUnits] = useState([]);
  const [configs, setConfigs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [drafts, setDrafts] = useState({}); // { [unitId]: { carpet_area_sqft, cam_start_date } }

  const filteredUnits = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return units;
    return units.filter(
      (u) => `${u.name || u.flat || u.flat_no}`.toLowerCase().includes(term)
    );
  }, [units, search]);

  const pagedUnits = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredUnits.slice(start, start + perPage);
  }, [filteredUnits, page, perPage]);

  useEffect(() => {
    // Reset to first page on search change or units change
    setPage(1);
  }, [search, units]);

  useEffect(() => {
    const load = async () => {
      try {
        const [settingsRes, unitsRes, configsRes] = await Promise.all([
          getCamSettings().catch(() => ({ data: {} })),
          getAllUnits(),
          getUnitCamConfigs().catch(() => ({ data: [] })),
        ]);

        const st = settingsRes?.data?.data || settingsRes?.data || {};
        setSettings({ ...defaultSettings, ...st });

        const unitsData = unitsRes?.data || [];
        setUnits(Array.isArray(unitsData) ? unitsData : unitsData.units || []);

        const cfg = configsRes?.data?.data || configsRes?.data || [];
        const arr = Array.isArray(cfg) ? cfg : [];
        setConfigs(arr);
        // initialize drafts from configs
        const nextDrafts = {};
        arr.forEach((c) => {
          if (c?.unit_id) {
            nextDrafts[c.unit_id] = {
              carpet_area_sqft: Number(c.carpet_area_sqft ?? c.carpet_area ?? 0),
              cam_start_date: c.cam_start_date || "",
            };
          }
        });
        setDrafts(nextDrafts);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load CAM setup");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getConfigForUnit = (unitId) => configs.find((c) => c.unit_id === unitId);

  const handleSaveSettings = async () => {
    try {
      const payload = {
        rate_per_sqft: Number(settings.rate_per_sqft || 0),
        gst_rate_move_in: Number(settings.gst_rate_move_in ?? 0),
        gst_rate_move_out: Number(settings.gst_rate_move_out ?? 0),
        advance_months_required: Number(settings.advance_months_required || 24),
        tenant_move_in_fee: Number(settings.tenant_move_in_fee || 0),
        tenant_move_out_fee: Number(settings.tenant_move_out_fee || 0),
      };
      await upsertCamSettings({ setting: payload });
      toast.success("Settings saved");
    } catch (e) {
      console.error(e);
      toast.error("Failed to save settings");
    }
  };

  const handleDraftChange = (unitId, field, value) => {
    setDrafts((prev) => ({
      ...prev,
      [unitId]: {
        carpet_area_sqft: Number(
          field === "carpet_area_sqft" ? value : prev[unitId]?.carpet_area_sqft || 0
        ),
        cam_start_date:
          field === "cam_start_date" ? value : prev[unitId]?.cam_start_date || "",
      },
    }));
  };

  const handleSaveUnit = async (unit) => {
    try {
      const existing = getConfigForUnit(unit.id);
      const row = drafts[unit.id] || { carpet_area_sqft: 0, cam_start_date: "" };
      const nextCarpetArea = Number(row.carpet_area_sqft || 0);
      const nextStartDate = row.cam_start_date || null;

      if (!nextStartDate || nextCarpetArea <= 0) {
        toast("Set both Carpet Area and Start Date to save");
        return;
      }

      const payload = {
        unit_id: unit.id,
        carpet_area_sqft: nextCarpetArea,
        cam_start_date: nextStartDate,
      };

      if (existing?.id) {
        await updateUnitCamConfig(existing.id, { unit_config: payload });
      } else {
        await createUnitCamConfig({ unit_config: payload });
      }
      toast.success("Unit updated");
      // Refresh configs
      const res = await getUnitCamConfigs();
      const cfg = res?.data?.data || res?.data || [];
      const arr = Array.isArray(cfg) ? cfg : [];
      setConfigs(arr);
      setDrafts((prev) => ({
        ...prev,
        [unit.id]: {
          carpet_area_sqft: nextCarpetArea,
          cam_start_date: nextStartDate || "",
        },
      }));
    } catch (e) {
      console.error(e);
      toast.error("Failed to update unit");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Accounting Unit Config</h1>
      <div className="mb-6 border border-amber-300 bg-amber-50 text-amber-900 rounded p-3 text-sm">
        <div className="font-semibold">Possession Guard</div>
        <div>
          Possession cannot be issued until the resident pays advance maintenance of {settings.advance_months_required || 24} months from possession date.
        </div>
        <div className="mt-1">
          Tenant move-in/out fees apply: set amounts and GST in Global Settings; invoices will use these values.
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <h2 className="text-lg font-semibold mb-4">Global Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Per Sqft Rate</label>
            <input
              type="number"
              value={settings.rate_per_sqft}
              onChange={(e) => setSettings((s) => ({ ...s, rate_per_sqft: Number(e.target.value || 0) }))}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">GST % (Tenant Move-In)</label>
            <input
              type="number"
              value={settings.gst_rate_move_in}
              onChange={(e) => setSettings((s) => ({ ...s, gst_rate_move_in: Number(e.target.value || 0) }))}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">GST % (Tenant Move-Out)</label>
            <input
              type="number"
              value={settings.gst_rate_move_out}
              onChange={(e) => setSettings((s) => ({ ...s, gst_rate_move_out: Number(e.target.value || 0) }))}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Advance Months Required</label>
            <input
              type="number"
              value={settings.advance_months_required}
              onChange={(e) => setSettings((s) => ({ ...s, advance_months_required: Number(e.target.value || 24) }))}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tenant Move-In Fee</label>
            <input
              type="number"
              value={settings.tenant_move_in_fee}
              onChange={(e) => setSettings((s) => ({ ...s, tenant_move_in_fee: Number(e.target.value || 0) }))}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tenant Move-Out Fee</label>
            <input
              type="number"
              value={settings.tenant_move_out_fee}
              onChange={(e) => setSettings((s) => ({ ...s, tenant_move_out_fee: Number(e.target.value || 0) }))}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={handleSaveSettings} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Settings
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Unit Master (Carpet Area & CAM Start Date)</h2>
          <input
            placeholder="Search flat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Flat</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Carpet Area (sqft)</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">CAM Start Date (Possession)</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pagedUnits.map((u) => {
                const cfg = getConfigForUnit(u.id) || {};
                return (
                  <tr key={u.id}>
                    <td className="px-4 py-2 font-medium">{u.name || u.flat || u.flat_no}</td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={drafts[u.id]?.carpet_area_sqft ?? cfg.carpet_area_sqft ?? cfg.carpet_area ?? 0}
                        className="w-40 px-3 py-2 border rounded"
                        onChange={(e) => handleDraftChange(u.id, "carpet_area_sqft", e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="date"
                        value={drafts[u.id]?.cam_start_date ?? cfg.cam_start_date ?? ""}
                        className="w-52 px-3 py-2 border rounded"
                        onChange={(e) => handleDraftChange(u.id, "cam_start_date", e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="px-3 py-2 border rounded hover:bg-gray-50"
                        onClick={() => handleSaveUnit(u)}
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Rows per page:
              <select
                className="ml-2 border rounded px-2 py-1"
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value) || 10)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ‹
              </button>
              <span className="text-sm text-gray-700">
                {page} of {Math.max(1, Math.ceil(filteredUnits.length / perPage))}
              </span>
              <button
                className="px-3 py-1 border rounded"
                onClick={() =>
                  setPage((p) =>
                    Math.min(
                      Math.max(1, Math.ceil(filteredUnits.length / perPage)),
                      p + 1
                    )
                  )
                }
                disabled={page >= Math.ceil(filteredUnits.length / perPage)}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAMSetup;
