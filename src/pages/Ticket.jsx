import { useEffect, useRef, useState, useCallback } from "react";

import DataTable from "react-data-table-component";
import Navbar from "../components/Navbar";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  getAdminComplaints,
  getAdminPerPageComplaints,
  getTicketDashboard,
} from "../api";
import { BsEye } from "react-icons/bs";
import { BiEdit, BiFilterAlt } from "react-icons/bi";
import moment from "moment";
// import { getItemInLocalStorage } from "../utils/localStorage";
import * as XLSX from "xlsx";
// import { useSelector } from "react-redux";
// import Table from "../components/table/Table";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { DNA } from "react-loader-spinner";
import TicketFilterModal from "../containers/modals/TicketFilterModal";
import { IoIosArrowDown } from "react-icons/io";
const Ticket = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [allComplaints, setAllComplaints] = useState([]); // Store all complaints in state
  const [complaints, setComplaints] = useState([]);
  const [allCounts, setAllCounts] = useState({});
  const perPage = 10;
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterModal, setFilterModal] = useState(false);
  const [hideColumn, setHideColumn] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  
  // Add state for tracking filtered mode
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentFilterParams, setCurrentFilterParams] = useState({});

  const getTimeAgo = (timestamp) => {
    const createdTime = moment(timestamp);
    const now = moment();
    const diff = now.diff(createdTime, "minutes");
    if (diff < 60) {
      return `${diff} minutes ago`;
    } else if (diff < 1440) {
      return `${Math.floor(diff / 60)} hours ago`;
    } else {
      return `${Math.floor(diff / 1440)} days ago`;
    }
  };

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/tickets/details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/edit/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Ticket Number",
      selector: (row) => row.ticket_number,
      sortable: true,
    },
    {
      name: "Building Name",
      selector: (row) => row.building_name,
      sortable: true,
    },
    { name: "Status", selector: (row) => row.issue_status, sortable: true },
    { name: "Floor Name", selector: (row) => row.floor_name, sortable: true },
    { name: "Unit Name", selector: (row) => row.unit, sortable: true },
    {
      name: "Customer Name",
      selector: (row) => row.created_by,
      sortable: true,
    },
    { name: "Category", selector: (row) => row.category_type, sortable: true },
    {
      name: "Sub Category",
      selector: (row) => row.sub_category,
      sortable: true,
    },
    { name: "Title", selector: (row) => row.heading, sortable: true },
    // {
    //   name: "Description",
    //   selector: (row) => row.text,
    //   sortable: true,
    //   // maxWidth: "500px",
    // },
    { name: "Created By", selector: (row) => row.created_by, sortable: true },
    {
      name: "Created On",
      selector: (row) => dateFormat(row.created_at),
      sortable: true,
    },
    { name: "Priority", selector: (row) => row.priority, sortable: true },
    { name: "Assigned To", selector: (row) => row.assigned_to, sortable: true },
    { name: "Ticket Type", selector: (row) => row.issue_type, sortable: true },
    // {
    //   name: "Response TAT",
    //   selector: (row) => row.response_TAT,
    //   sortable: true,
    // },
    // {
    //   name: "Response Time",
    //   selector: (row) => row.response_time,
    //   sortable: true,
    // },
    // {
    //   name: "Resolution TAT",
    //   selector: (row) => row.resolution_TAT,
    //   sortable: true,
    // },
    // {
    //   name: "Resolution Time",
    //   selector: (row) => row.resolution_time,
    //   sortable: true,
    // },
    {
      name: "Total Time",
      selector: (row) => getTimeAgo(row.created_at),
      sortable: true,
    },
  ];

  const [columnVisibility, setColumnVisibility] = useState({
    Action: true,
    "Ticket Number": true,
    "Building Name": true,
    "Floor Name": true,
    "Unit Name": true,
    "Customer Name": true,
    Category: true,
    "Sub Category": true,
    Title: true,
    Status: true,
    "Created By": true,
    "Created On": true,
    Priority: true,
    "Assigned To": true,
    "Ticket Type": true,
    "Response TAT": true,
    "Response Time": true,
    "Resolution TAT": true,
    "Resolution Time": true,
    "Total Time": true,
  });

  const handleCheckboxChange = (column) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setHideColumn(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //custom style
  // const themeColor = useSelector((state) => state.theme.color);
  const customStyle = {
    headRow: {
      style: {
        background: "rgb(17, 24, 39)",
        color: "white",
        fontSize: "10px",
      },
    },
    headCells: {
      style: {
        textTransform: "uppercase",
      },
    },
    cells: {
      style: {
        // fontWeight: "bold",
        fontSize: "14px",
      },
    },
  };

  // Function to fetch filtered data from API with query parameters and server pagination
  const fetchFilteredData = useCallback(async (filterParams = {}, page = 1) => {
    try {
      setLoading(true);
      
      // Build query string from filter parameters
      const queryParams = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value && value !== 'all') {
          queryParams.append(key, value);
        }
      });
      
      // Add page parameter for server-side pagination
      queryParams.append('page', page.toString());
      
      console.log("Fetching with filters:", filterParams);
      console.log("Page:", page);
      console.log("Query string:", queryParams.toString());
      
      // Construct the query string for the API call
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      
      // Fetch filtered data from API with server pagination
      const response = await getAdminComplaints(queryString);
      
      if (response?.data?.complaints) {
        const filteredComplaints = response.data.complaints;
        
        // Use server-provided pagination info
        const { count, total_pages, current_page } = response.data;
        
        setTotalRows(count || 0);
        setTotalPages(total_pages || 1);
        setCurrentPage(current_page || page);
        setFilteredData(filteredComplaints);
        
        console.log("Filtered data received:", filteredComplaints.length);
        console.log("Server pagination - Total:", count, "Pages:", total_pages, "Current:", current_page);
        return filteredComplaints;
      } else {
        console.log("No complaints data in response:", response?.data);
        setFilteredData([]);
        setTotalRows(0);
        setTotalPages(1);
        return [];
      }
      
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      setFilteredData([]);
      setTotalRows(0);
      setTotalPages(1);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchData = useCallback(async (page, perPageSize) => {
    try {
      setLoading(true);
      
      // Fetch both paginated and all data in parallel for efficiency
      const [paginatedResponse, allComplaintsResponse] = await Promise.all([
        getAdminPerPageComplaints(page, perPageSize),
        allComplaints.length === 0 ? getAdminComplaints() : Promise.resolve(null)
      ]);
      
      console.log("Paginated Response", paginatedResponse);

      if (paginatedResponse?.data) {
        const { complaints = [], count, total_pages, current_page } = paginatedResponse.data;
        
        // Update state with paginated data
        setComplaints(complaints);
        setTotalRows(count || 0);
        setTotalPages(total_pages || 1);
        setCurrentPage(current_page || 1);
        
        // Set filtered data to current page complaints initially
        setFilteredData(complaints);
      }

      // Update all complaints if we fetched them
      if (allComplaintsResponse?.data?.complaints) {
        const allComplaintsData = allComplaintsResponse.data.complaints;
        setAllComplaints(allComplaintsData);
        console.log("All complaints loaded:", allComplaintsData.length);
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [allComplaints.length]);

  const fetchTicketInfo = useCallback(async () => {
    try {
      const ticketInfoResp = await getTicketDashboard();
      console.log("Dashboard API Response:", ticketInfoResp.data);
      
      const dashboardData = ticketInfoResp.data;
      setAllCounts(dashboardData);
      setTicketsTypes(dashboardData.by_type);
      setStatusData(dashboardData.by_status);
      
      // Debug: Log the exact status keys from the API
      console.log("Available status keys from API:", Object.keys(dashboardData.by_status || {}));
      console.log("Available type keys from API:", Object.keys(dashboardData.by_type || {}));
      
      console.log("Status Data from Dashboard:", dashboardData.by_status);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Function to apply current filters to the data
  const applyFilters = useCallback((data) => {
    // Determine the data source
    let sourceData = data;
    if (!sourceData) {
      // If we have a specific status or type selected, use all complaints data
      if (selectedStatus !== "all" || selectedType !== "all") {
        sourceData = allComplaints;
      } else {
        // Otherwise use current page data
        sourceData = complaints;
      }
    }
    
    let filtered = [...sourceData];

    // Apply status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(item => 
        item.issue_status?.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter(item => 
        item.issue_type?.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Apply search filter
    if (searchText.trim() !== "") {
      const searchWords = searchText
        .toLowerCase()
        .split(" ")
        .filter((w) => w.trim() !== "");

      filtered = filtered.filter((item) => {
        const searchable = [
          item.ticket_number,
          item.category_type,
          item.building_name,
          item.floor_name,
          item.unit,
          item.issue_type,
          item.heading,
          item.priority,
          item.created_by,
          item.issue_status,
          item.sub_category,
        ]
          .map((v) => (v || "").toLowerCase())
          .join(" ");

        return searchWords.every((word) => searchable.includes(word));
      });
    }

    setFilteredData(filtered);
  }, [complaints, selectedStatus, selectedType, searchText, allComplaints]);

  // useEffect(() => {
  //   fetchData(currentPage, perPage);
  // }, [currentPage]);
  const [ticketTypes, setTicketsTypes] = useState({});
  const [statusData, setStatusData] = useState({});
  console.log("Ticket Types", ticketTypes);
  console.log("Status Data", statusData);

  useEffect(() => {
    const initializeData = async () => {
      // Only fetch normal pagination data if we're not in filtered mode
      if (!isFiltered) {
        await Promise.all([
          fetchTicketInfo(),
          fetchData(currentPage, perPage)
        ]);
      }
    };

    initializeData();
  }, [currentPage, perPage, fetchData, fetchTicketInfo, isFiltered]);

  const handleNext = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      
      if (isFiltered && Object.keys(currentFilterParams).length > 0) {
        // If we're in filtered mode, fetch next page from server
        await fetchFilteredData(currentFilterParams, nextPage);
      } else {
        // Normal server-side pagination
        setCurrentPage(nextPage);
      }
    }
  };

  const handlePrevious = async () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      
      if (isFiltered && Object.keys(currentFilterParams).length > 0) {
        // If we're in filtered mode, fetch previous page from server
        await fetchFilteredData(currentFilterParams, prevPage);
      } else {
        // Normal server-side pagination
        setCurrentPage(prevPage);
      }
    }
  };

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  // Apply filters whenever search text, status, or type changes
  useEffect(() => {
    applyFilters();
  }, [searchText, selectedStatus, selectedType, applyFilters]);

  const handleStatusChange = async (status) => {
    setSelectedStatus(status);
    setCurrentPage(1); // Reset to first page when filter changes
    console.log("Filtering by status:", status);
    
    if (status === "all") {
      // Show current page data when "all" is selected - reset to normal pagination
      setIsFiltered(false);
      setCurrentFilterParams({});
      await fetchData(1, perPage); // Fetch first page of unfiltered data
      console.log("Reset to normal pagination");
    } else {
      // Use API filtering with query parameters and server pagination
      const filterParams = {
        'q[complaint_status_name_eq]': status // Use the exact value from the dashboard
      };
      
      setIsFiltered(true);
      setCurrentFilterParams(filterParams);
      
      console.log("Sending filter params:", filterParams);
      const filteredResults = await fetchFilteredData(filterParams, 1);
      console.log(`API filtered results for ${status}:`, filteredResults.length);
    }
  };

  const handleTypeChange = async (type) => {
    setSelectedType(type);
    setCurrentPage(1); // Reset to first page when filter changes
    console.log("Filtering by type:", type);
    
    if (type === "all") {
      // Reset to normal pagination
      setIsFiltered(false);
      setCurrentFilterParams({});
      await fetchData(1, perPage);
      console.log("Reset to normal pagination");
    } else {
      // Use API filtering with query parameters and server pagination
      const filterParams = {
        'q[complaint_type_eq]': type // Use the exact value from the dashboard
      };
      
      setIsFiltered(true);
      setCurrentFilterParams(filterParams);
      
      console.log("Sending filter params:", filterParams);
      const filteredResults = await fetchFilteredData(filterParams, 1);
      console.log(`API filtered results for type ${type}:`, filteredResults.length);
    }
  };

  const getAllTickets = async () => {
    const allTicketResp = await getAdminComplaints();
    console.log(allTicketResp);
    return allTicketResp.data.complaints;
  };

  // export data
  const exportAllToExcel = async () => {
    // const modifiedData = filteredData.map((item) => ({
    //   ...item,
    //   "Ticket Number": item.ticket_number,
    // }));
    const Alltickets = await getAllTickets();
    const mappedData = Alltickets.map((ticket) => {
      // Format complaint logs as a single string
      const complaintLogs = ticket.complaint_logs
        .map((log) => {
          return `Log By: ${log.log_by}, Status: ${
            log.log_status
          }, Date: ${dateFormat(log.created_at)}`;
        })
        .join(" | ");

      return {
        "Site Name": ticket.site_name,
        "Ticket No.": ticket.ticket_number,
        "Related To": ticket.issue_type_id,
        Title: ticket.heading,
        Description: ticket.text,
        Building: ticket.building_name,
        Floor: ticket.floor_name,
        Unit: ticket.unit,
        Category: ticket.category_type,
        "Sub Category": ticket.sub_category,
        Status: ticket.issue_status,
        Type: ticket.issue_type,
        Priority: ticket.priority,
        "Assigned To": ticket.assigned_to,
        "Created By": ticket.created_by,
        "Created On": dateFormat(ticket.created_at),
        "Updated On": dateFormat(ticket.updated_at),
        "Updated By": ticket.updated_by,
        "Resolution Breached": ticket.resolution_breached ? "Yes" : "No",
        "Response Breached": ticket.response_breached ? "Yes" : "No",
        "Complaint Logs": complaintLogs, // Include the formatted complaint logs
      };
    });

    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileName = "helpdesk_data.xlsx";
    const ws = XLSX.utils.json_to_sheet(mappedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  document.title = `Tickets - My Citi Life`;

  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#FFC300"];

  const getFixedColor = (index) => {
    return colors[index % colors.length];
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 mb-10 flex-col overflow-hidden">
        <div className="sm:flex grid grid-cols-2 m-5 justify-start w-fit gap-5 sm:flex-row flex-col flex-shrink flex-wrap">
          <button
            key={"Total Tickets"}
            className="transition duration-300 transform hover:scale-105 drop-shadow-md shadow-lg rounded-full w-40 h-20 px-3 py-3 flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-indigo-300 text-black font-semibold"
            onClick={() => handleStatusChange("all")}
          >
            Total Tickets
            <span className="font-medium text-base text-black drop-shadow-md">
              {allCounts?.total}
            </span>
          </button>

          {Object.entries(statusData).map(([key, value], index) => (
            <button
              key={key}
              className="transition duration-300 transform hover:scale-105 shadow-lg drop-shadow-md rounded-full w-40 h-20 px-6 py-4 flex flex-col items-center justify-center font-semibold text-black"
              style={{
                background: `linear-gradient(135deg, ${getFixedColor(
                  index
                )}30, #ffffff)`,
                border: `2px solid ${getFixedColor(index)}`,
              }}
              onClick={() => {
                console.log("Card clicked for status:", key);
                // Use the exact key from the API response instead of lowercase
                handleStatusChange(key);
              }}
            >
              {key}
              <span className="font-medium text-base text-black drop-shadow-md">
                {value}
              </span>
            </button>
          ))}

          {Object.entries(ticketTypes).map(([key, value], index) => (
            <button
              key={key}
              className="transition duration-300 transform hover:scale-105 shadow-lg drop-shadow-md rounded-full w-40 h-20 px-6 py-4 flex flex-col items-center justify-center font-semibold text-black"
              style={{
                background: `linear-gradient(135deg, ${getFixedColor(
                  index
                )}30, #ffffff)`,
                border: `2px solid ${getFixedColor(index)}`,
              }}
              onClick={() => {
                console.log("Card clicked for type:", key);
                // Use the exact key from the API response instead of lowercase
                handleTypeChange(key);
              }}
            >
              {key}
              <span className="font-medium text-base text-black drop-shadow-md">
                {value}
              </span>
            </button>
          ))}
        </div>

        <div className="flex sm:flex-row flex-col w-full  gap-2 my-5">
          <div className="md:flex justify-between grid grid-cols-2 items-center  gap-2 border border-gray-300 rounded-md px-3 p-2 w-auto">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="all"
                name="status"
                checked={selectedStatus === "all"}
                onChange={() => handleStatusChange("all")}
              />
              <label htmlFor="all" className="text-sm">
                All
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="open"
                name="status"
                checked={selectedStatus === "Open"}
                onChange={() => handleStatusChange("Open")}
              />
              <label htmlFor="open" className="text-sm">
                Open
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="closed"
                name="status"
                checked={selectedStatus === "Closed"}
                onChange={() => handleStatusChange("Closed")}
              />
              <label htmlFor="closed" className="text-sm">
                Closed
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="pending"
                name="status"
                checked={selectedStatus === "Pending"}
                onChange={() => handleStatusChange("Pending")}
              />
              <label htmlFor="pending" className="text-sm">
                Pending
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="received"
                name="status"
                checked={selectedStatus === "Received"}
                onChange={() => handleStatusChange("Received")}
              />
              <label htmlFor="received" className="text-sm">
                Received
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="completed"
                name="status"
                checked={selectedStatus === "Completed"}
                onChange={() => handleStatusChange("Completed")}
              />
              <label htmlFor="completed" className="text-sm">
                Completed
              </label>
            </div>
          </div>

          <div className="flex lg:flex-row flex-col w-full gap-2">
            <input
              type="text"
              placeholder="Search by Title, Ticket number, Category, Ticket type, Priority, Building, Floor or Unit"
              className="border border-gray-400 md:w-full placeholder:text-xs rounded-lg p-2"
              value={searchText}
              onChange={handleSearch}
            />

            <Link
              to={"/tickets/create-ticket"}
              style={{ background: "rgb(3 19 37)" }}
              className=" font-semibold  text-white duration-300 transition-all  p-2 rounded-md  cursor-pointer text-center flex items-center gap-2 justify-center"
              // onClick={() => setShowCountry(!showCountry)}
            >
              <PiPlusCircle size={20} />
              Add
            </Link>
            <button
              className=" font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              style={{ background: "rgb(3 19 37)" }}
              onClick={() => setFilterModal(!filterModal)}
            >
              <BiFilterAlt />
              Filter
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setHideColumn(!hideColumn)}
                style={{ background: "rgb(3 19 37)" }}
                className="font-semibold text-white px-4 p-2 flex gap-2 items-center justify-center rounded-md whitespace-nowrap w-full"
              >
                Hide Columns
                {hideColumn ? <IoIosArrowDown /> : <MdKeyboardArrowRight />}
              </button>
              {hideColumn && (
                <div className="absolute py-2 right-0 top-12 bg-white border rounded shadow-md w-64 max-h-64 overflow-y-auto z-10">
                  {Object.keys(columnVisibility).map((column) => (
                    <label key={column} className="mr-4">
                      <div className="flex gap-5 px-3">
                        <input
                          type="checkbox"
                          checked={columnVisibility[column]}
                          onChange={() => handleCheckboxChange(column)}
                        />
                        <div>{column}</div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={exportAllToExcel}
              style={{ background: "rgb(3 19 37)" }}
            >
              Export
            </button>
          </div>
        </div>

        {loading || complaints.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <DNA
              visible={true}
              height="120"
              width="120"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        ) : (
          <>
            <DataTable
              responsive
              // selectableRows
              columns={columns.filter(
                (column) => columnVisibility[column.name]
              )}
              data={filteredData}
              customStyles={customStyle}
              fixedHeader
              fixedHeaderScrollHeight="500px"
              selectableRowsHighlight
              highlightOnHover
            />
          </>
        )}
        {/* </div> */}

        <div className="flex justify-between items-center m-2 gap-2">
          <div className="text-sm text-gray-600">
            {isFiltered ? (
              `Filtered results: Page ${currentPage} of ${totalPages} | Showing ${filteredData.length} of ${totalRows} records`
            ) : (
              `Page ${currentPage} of ${totalPages} | Showing ${filteredData.length} of ${totalRows} records`
            )}
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={handlePrevious}
              className="px-2 disabled:opacity-50 disabled:shadow-none shadow-custom-all-sides rounded-full"
              disabled={currentPage <= 1}
            >
              <MdKeyboardArrowLeft size={30} />
            </button>

            <span className="text-sm px-2">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={handleNext}
              className="px-2 rounded-full shadow-custom-all-sides disabled:opacity-50 disabled:shadow-none"
              disabled={currentPage >= totalPages}
            >
              <MdKeyboardArrowRight size={30} />
            </button>
          </div>
        </div>
      </div>
      {filterModal && (
        <TicketFilterModal
          onclose={() => setFilterModal(false)}
          setFilteredData={setFilteredData}
          fetchData={fetchData}
          currentPage={currentPage}
          perPage={perPage}
        />
      )}
    </section>
  );
};

//
export default Ticket;
