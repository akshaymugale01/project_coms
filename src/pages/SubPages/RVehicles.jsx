import { useEffect, useMemo, useState, useCallback } from "react";
import RVehiclesTable from "./RVehiclesTable";
import Navbar from "../../components/Navbar";
import Passes from "../Passes";
import { getRegisteredVehicle, getVehicleHistory } from "../../api";
import { FaSearch } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getItemInLocalStorage } from "../../utils/localStorage";

/* -------------------- CONSTANTS -------------------- */
const PER_PAGE = 10;

/* -------------------- COMPONENT -------------------- */
const RVehicles = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState("All");
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  /* -------------------- DEBOUNCE -------------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim().toLowerCase());
      setCurrentPageNum(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  /* -------------------- FETCH DATA -------------------- */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let params = {
          page: currentPageNum,
          per_page: PER_PAGE,
        };

        let response;
        let list = [];

        if (page === "All") {
          response = await getRegisteredVehicle(params);
          list = response?.data?.registered_vehicles || [];
        } 
        else if (page === "Vehicle In") {
          params["q[check_out_not_null]"] = false;
          response = await getVehicleHistory(params);
          list = response?.data?.vehicle_logs || [];
        } 
        else if (page === "Vehicle Out") {
          params["q[check_out_not_null]"] = true;
          response = await getVehicleHistory(params);
          list = response?.data?.vehicle_logs || [];
        }
        else if (page === "Approvals") {
          params["q[is_approved_null]"] = true;
          response = await getRegisteredVehicle(params);
          list = response?.data?.registered_vehicles || [];
        }
        else if (page === "History") {
          response = await getVehicleHistory(params);
          list = response?.data?.vehicle_logs || [];
        }

        setVehicles(list || []);
        setTotalPages(response?.data?.total_pages || 1);
      } catch (err) {
        setError("Failed to load data.");
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, currentPageNum]);

  /* -------------------- LOCAL SEARCH (SAFE) -------------------- */
  useEffect(() => {
    if (!debouncedSearch) {
      setFilteredVehicles(vehicles);
      return;
    }

    const filtered = vehicles.filter((item) => {
  const vehicleNumber = String(
    item?.vehicle_number ||
    item?.registered_vehicle?.vehicle_number ||
    ""
  ).toLowerCase();

  const vehicleCategory = String(
    item?.vehicle_category ||
    item?.registered_vehicle?.vehicle_category ||
    ""
  ).toLowerCase();

  const vehicleType = String(
    item?.vehicle_type ||
    item?.registered_vehicle?.vehicle_type ||
    ""
  ).toLowerCase();

  const slotNumber = String(
    item?.slot_number ||
    item?.registered_vehicle?.slot_number ||
    ""
  ).toLowerCase();

  const unitName = String(
    item?.unit_name ||
    item?.registered_vehicle?.unit_name ||
    ""
  ).toLowerCase();

  const registeredUser = String(
    item?.registered_user ||
    item?.created_by ||
    ""
  ).toLowerCase();

  return (
    vehicleNumber.includes(debouncedSearch) ||
    vehicleCategory.includes(debouncedSearch) ||
    vehicleType.includes(debouncedSearch) ||
    slotNumber.includes(debouncedSearch) ||
    unitName.includes(debouncedSearch) ||
    registeredUser.includes(debouncedSearch)
  );
});

    setFilteredVehicles(filtered);
  }, [debouncedSearch, vehicles]);

  /* -------------------- HANDLERS -------------------- */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /* -------------------- RENDER -------------------- */
  return (
    <div className="visitors-page">
      <section className="flex">
        <Navbar />

        <div className="w-full flex mx-3 flex-col overflow-hidden">
          <Passes />

          {/* Tabs */}
          <div className="flex justify-between items-end border-b border-gray-300 m-2">
            <div className="flex">
              {["All", "Vehicle In", "Vehicle Out", "Approvals", "History"].map(
                (tab) => (
                  <h2
                    key={tab}
                    className={`p-2 px-4 text-sm cursor-pointer border-r border-l border-t border-b ${
                      page === tab
                        ? "text-blue-600 bg-white border-gray-300 rounded-t-lg font-semibold"
                        : "text-gray-600 border-transparent"
                    }`}
                    onClick={() => {
                      setPage(tab);
                      setCurrentPageNum(1);
                      setSearchTerm("");
                      setError(null);
                    }}
                  >
                    {tab}
                  </h2>
                )
              )}
            </div>
          </div>

          {/* Search + Add */}
          <div className="relative mb-1 mr-2 flex items-center">
            <input
              type="text"
              placeholder="Search by Vehicle Number, Category, Type, Slot, Unit, User"
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm w-[1000px]"
            />
            <FaSearch className="absolute left-3 text-gray-400 h-4 w-4" />

            <div className="flex justify-end items-center px-3">
              <button
                onClick={() => navigate("/admin/add-rvehicles")}
                className="flex items-center gap-2 bg-gray-800 text-white px-6 py-2 rounded-md transition"
              >
                <IoAddCircleOutline size={20} />
                Add Vehicle
              </button>
            </div>
          </div>

          {/* Table */}
          <RVehiclesTable
            data={filteredVehicles}
            loading={loading}
            error={error}
            currentPageNum={currentPageNum}
            pageType={page}
          />
        </div>
      </section>
    </div>
  );
};

export default RVehicles;
