import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Table from "../components/table/Table";
import { BsEye } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import {
  API_URL,
  getRoutineTask,
  getRoutineTaskStatus,
  getVibeBackground,
} from "../api";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../utils/localStorage";
import Navbar from "../components/Navbar";
import AssetNav from "../components/navbars/AssetNav";
import { getRandomColors } from "../components/Boards/getRandomColors";

// Helper function to format date to YYYY-MM-DD
const formatDateToInput = (date) => {
  return date.toISOString().split("T")[0];
};

// Get current date and next day
const getCurrentDate = () => formatDateToInput(new Date());
const getNextDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDateToInput(tomorrow);
};

const RoutineTask = () => {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [statusCounts, setStatusCounts] = useState({
    all: 0,
    open: 0,
    pending: 0,
    overdue: 0,
    complete: 0, // Note: API returns 'complete' not 'completed'
  });
  const [isLoading, setIsLoading] = useState(false);

  // Status filter options
  const statusOptions = [
    { key: "all", label: "All", color: "bg-blue-500" },
    // { key: "open", label: "Open", color: "bg-green-500" },
    { key: "pending", label: "Pending", color: "bg-yellow-500" },
    { key: "overdue", label: "Overdue", color: "bg-red-500" },
    { key: "complete", label: "Complete", color: "bg-purple-500" }, // Changed from 'completed'
  ];

  // Update the fetch function to always use current dates if none provided
  const fetchRoutineTask = async (start = null, end = null, status = null) => {
    setIsLoading(true);
    toast.loading("Please wait");
    try {
      // Use current dates as default if not provided
      const defaultStart = start || startDate || getCurrentDate();
      const defaultEnd = end || endDate || getNextDate();
      const statusParam =
        status || (selectedStatus === "all" ? null : selectedStatus);

      const taskResponse = await getRoutineTask(
        defaultStart,
        defaultEnd,
        statusParam
      );
      toast.dismiss();
      toast.success("Routine task data fetched successfully");

      const filteredServiceTask = taskResponse.data.activities
        .filter((asset) => asset.asset_name)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      console.log(filteredServiceTask);
      setTasks(filteredServiceTask);
      setFilteredData(filteredServiceTask);

      // Calculate status counts from the response
      calculateStatusCounts(filteredServiceTask);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate status counts
  const calculateStatusCounts = (data) => {
    const counts = {
      all: data.length,
      // open: data.filter((t) => t.status.toLowerCase() === "open").length,
      pending: data.filter((t) => t.status.toLowerCase() === "pending").length,
      overdue: data.filter((t) => t.status.toLowerCase() === "overdue").length,
      complete: data.filter((t) => t.status.toLowerCase() === "complete")
        .length, // Changed to 'complete'
    };
    setStatusCounts(counts);
  };

  useEffect(() => {
    // Set default dates when component mounts
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    setStartDate(today.toISOString().split("T")[0]);
    setEndDate(tomorrow.toISOString().split("T")[0]);

    // Use the same API function as status filtering for consistency
    const fetchInitialData = async () => {
      try {
        const data = await getRoutineTaskStatus(); // No status = all data
        setTasks(data.activities);
        setFilteredData(data.activities);

        // Set initial counts including 'all'
        const initialCounts = {
          ...data.counts,
          all: data.activities.length,
        };
        setStatusCounts(initialCounts);

        console.log("Initial data:", data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const RoutineColumns = [
    {
      name: "View",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/assets/routine-task-details/${row.asset_id}/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Asset Name", selector: (row) => row.asset_name, sortable: true },
    {
      name: "Checklist",
      selector: (row) => row.checklist_name,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => dateFormat(row.start_time),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-white text-xs font-medium ${
            row.status.toLowerCase() === "open"
              ? "bg-green-500"
              : row.status.toLowerCase() === "pending"
              ? "bg-yellow-500"
              : row.status.toLowerCase() === "overdue"
              ? "bg-red-500"
              : row.status.toLowerCase() === "complete" // Changed to 'complete'
              ? "bg-purple-500"
              : "bg-gray-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Assigned To",
      selector: (row) => row.assigned_to_name,
      sortable: true,
    },
  ];

  // Export to Excel function
  const exportToExcel = () => {
    if (filteredData.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = [
      "ID",
      "Asset Name",
      "Checklist",
      "Start Date",
      "Status",
      "Assigned To",
    ];

    const csvRows = [
      headers.join(","),
      ...filteredData.map((row) =>
        [
          row.id,
          `"${row.asset_name || ""}"`,
          `"${row.checklist_name || ""}"`,
          `"${dateFormat(row.start_time)}"`,
          `"${row.status || ""}"`,
          `"${row.assigned_to_name || ""}"`,
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `routine_tasks_${selectedStatus}_${
        new Date().toISOString().split("T")[0]
      }.csv`
    );
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    link.parentNode.removeChild(link);

    toast.success("Data exported successfully");
  };

  // Filter by status with backend call
  const handleStatusChange = async (statusKey) => {
    setSelectedStatus(statusKey);
    setIsLoading(true);

    try {
      const data = await getRoutineTaskStatus(
        statusKey === "all" ? null : statusKey,
        startDate || null,
        endDate || null
      );

      setTasks(data.activities);
      setFilteredData(data.activities);

      const updatedCounts = {
        ...data.counts,
        all: data.activities.length,
      };
      setStatusCounts(updatedCounts);
    } catch (error) {
      toast.error("Failed to load activities.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateFilter = async () => {
    setIsLoading(true);

    try {
      const data = await getRoutineTaskStatus(
        selectedStatus === "all" ? null : selectedStatus,
        startDate || null,
        endDate || null
      );

      setTasks(data.activities);
      setFilteredData(data.activities);

      const updatedCounts = {
        ...data.counts,
        all: data.activities.length,
      };
      setStatusCounts(updatedCounts);
    } catch (error) {
      toast.error("Failed to load activities.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFilters = async () => {
    setStartDate("");
    setEndDate("");
    setSelectedStatus("all");
    setIsLoading(true);

    try {
      const data = await getRoutineTaskStatus();

      setTasks(data.activities);
      setFilteredData(data.activities);

      const updatedCounts = {
        ...data.counts,
        all: data.activities.length,
      };
      setStatusCounts(updatedCounts);
    } catch (error) {
      toast.error("Failed to clear filters.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("counts Status", statusCounts);

  // Apply client-side filters (for search)
  const applyClientFilters = (status, start, end, search) => {
    let filtered = tasks;

    // Filter by search text (client-side)
    if (search.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          (item.asset_name &&
            item.asset_name.toLowerCase().includes(search.toLowerCase())) ||
          (item.checklist_name &&
            item.checklist_name.toLowerCase().includes(search.toLowerCase()))
      );
    }

    setFilteredData(filtered);
  };

  // Update search handler
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    applyClientFilters(selectedStatus, startDate, endDate, searchValue);
  };

  // Background image logic (existing code)
  const defaultImage = { index: 0, src: "" };
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const Get_Background = async () => {
    try {
      const user_id = getItemInLocalStorage("VIBEUSERID");
      console.log(user_id);
      const data = await getVibeBackground(user_id);

      if (data.success) {
        const selectedImageSrc = API_URL + data.data.image;
        const selectedImageIndex = data.data.index;
        setSelectedImage(selectedImageSrc);
        setSelectedIndex(selectedImageIndex);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    Get_Background();
  }, []);

  return (
    <section
      className="flex"
      style={{
        background: `url(${selectedImage})no-repeat center center / cover`,
      }}
    >
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <AssetNav />

        {/* Overall Count Display */}
        {/* <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Routine Tasks Overview</h2>
          <div className="text-3xl font-bold text-blue-600">
            Total: {statusCounts.all} Tasks
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {selectedStatus !== "all" && `Showing ${selectedStatus} tasks`}
            {startDate && endDate && ` | Date Range: ${dateFormat(startDate)} - ${dateFormat(endDate)}`}
          </div>
        </div> */}

        {/* Search and Filter Section */}
        <div className="flex flex-col gap-3 my-2">
          {/* Search Bar */}
          {/* Filters Row */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex justify-start">
              <input
                type="text"
                placeholder="Search By Asset name or Checklist name"
                className="border-2 p-2 border-gray-300 rounded-lg placeholder:text-sm w-full max-w-md"
                value={searchText}
                onChange={handleSearch}
              />
            </div>
            {/* Date Filter Section - Compact */}
            <div className="flex flex-col gap-2 bg-gray-50  rounded-lg">
              {/* Date Inputs Row */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <label className="text-xs font-medium text-gray-600 whitespace-nowrap">
                    Start:
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-300 p-1 text-xs rounded w-28"
                  />
                </div>

                <div className="flex items-center gap-1">
                  <label className="text-xs font-medium text-gray-600 whitespace-nowrap">
                    End:
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-300 p-1 text-xs rounded w-28"
                  />
                </div>
              </div>

              {/* Buttons Row */}
              <div className="flex justify-center item-center gap-2">
                <button
                  onClick={handleDateFilter}
                  disabled={isLoading}
                  className="bg-gray-700 hover:bg-gray-800 disabled:bg-blue-300 text-white text-xs font-medium py-1 px-2 rounded transition-colors"
                >
                  Apply
                </button>

                <button
                  onClick={handleClearFilters}
                  disabled={isLoading}
                  className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-xs font-medium py-1 px-2 rounded transition-colors"
                >
                  Clear
                </button>

                <button
                  className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white text-xs font-medium py-1 px-2 rounded transition-colors"
                  onClick={exportToExcel}
                  disabled={filteredData.length === 0}
                >
                  Export ({filteredData.length})
                </button>
              </div>
            </div>

            {/* Status Filter Cards in single row */}
            <div className="flex gap-2">
              {statusOptions.map((status) => (
                <div
                  key={status.key}
                  onClick={() => handleStatusChange(status.key)}
                  className={`shadow-md cursor-pointer rounded-lg border-2 px-3 py-2 flex flex-col items-center transition-all duration-300 hover:scale-105 min-w-[80px] ${
                    selectedStatus === status.key
                      ? "bg-blue-100 border-blue-500 transform scale-105"
                      : "bg-white border-gray-300 hover:border-blue-300"
                  }`}
                  title={`Show ${status.label} activities`}
                  role="button"
                  tabIndex={0}
                >
                  <span className="font-medium text-xs capitalize text-gray-700">
                    {status.label}
                  </span>
                  <span className="font-bold text-sm text-blue-600">
                    {statusCounts[status.key] || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        <Table
          columns={RoutineColumns}
          data={filteredData}
          isPagination={true}
        />
      </div>
    </section>
  );
};

export default RoutineTask;
