import { useEffect, useRef, useState } from "react";

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
  const [ticketTypeCounts, setTicketTypeCounts] = useState({});
  const [ticketStatusCounts, setTicketStatusCounts] = useState({});
  const allTicketTypes = ["Complaint", "Request", "Suggestion"];
  const [filterSearch, setFilter] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allCounts, setAllCounts] = useState({});
  const perPage = 10;
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterModal, setFilterModal] = useState(false);
  const [hideColumn, setHideColumn] = useState(false);
  const dropdownRef = useRef(null);
  const [activeStatus, setActiveStatus] = useState(null);
  const [activeType, setActiveType] = useState(null);

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
    { name: "Status", selector: (row) => row.issue_status, sortable: true },
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

  const fetchData = async (page, perPage) => {
    try {
      const response = await getAdminPerPageComplaints(page, perPage);
      console.log("Resp", response);

      setAllData(response?.data || []);
      console.log("All Data", allData);
      const complaints = response?.data?.complaints || [];
      setFilteredData(complaints);
      setComplaints(complaints);
      setTotalRows(complaints.length);

      setTotalRows(complaints.length);

      const statusCounts = complaints.reduce((acc, curr) => {
        acc[curr.issue_status] = (acc[curr.issue_status] || 0) + 1;
        return acc;
      }, {});
      setTicketStatusCounts(statusCounts);

      const typeCounts = complaints.reduce((acc, curr) => {
        acc[curr.issue_type] = (acc[curr.issue_type] || 0) + 1;
        return acc;
      }, {});
      setTicketTypeCounts(typeCounts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // useEffect(() => {
  //   fetchData(currentPage, perPage);
  // }, [currentPage]);
  const [ticketTypes, setTicketsTypes] = useState({});
  const [statusData, setStatusData] = useState({});
  console.log("Ticket Types", ticketTypes);
  console.log("Status Data", statusData);

  useEffect(() => {
    const fetchTicketInfo = async () => {
      try {
        const ticketInfoResp = await getTicketDashboard();
        console.log("Dashboard API Response:", ticketInfoResp.data);
        setAllCounts(ticketInfoResp.data);
        setTicketsTypes(ticketInfoResp.data.by_type);
        setStatusData(ticketInfoResp.data.by_status);
        console.log(
          "Status Data from Dashboard:",
          ticketInfoResp.data.by_status
        );
        console.log(ticketInfoResp);
      } catch (error) {
        console.log(error);
      }
    };

    const filterSearchStatus = async () => {
      try {
        const searchAllTickets = await getAdminComplaints();
        const searchResp = searchAllTickets?.data?.complaints;
        console.log("All Tickets API Response:", searchResp);
        console.log("Total tickets from list API:", searchResp?.length);

        // Count status distribution in the actual data
        const statusCounts = searchResp?.reduce((acc, ticket) => {
          const status = ticket.issue_status || "Unknown";
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});
        console.log("Actual status counts from list data:", statusCounts);

        setFilter(searchResp);
        setFilteredData(searchResp); // Set initial filtered data to show all tickets
        setComplaints(searchResp); // Update complaints to use all data
        console.log(searchResp);
      } catch (error) {
        console.log(error);
      }
    };
    filterSearchStatus();
    fetchTicketInfo();
  }, []);

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    console.log(currentPage);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure currentPage does not go below 1
  };

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setCurrentPage(page);
  // };

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    if (searchValue.trim() === "") {
      setFilteredData(filterSearch); // Use all data instead of paginated complaints
    } else {
      // Split search into words, ignore extra spaces
      const searchWords = searchValue
        .toLowerCase()
        .split(" ")
        .filter((w) => w.trim() !== "");

      const filteredResults = filterSearch.filter((item) => {
        // Gather all searchable fields as a single string
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

        // All search words must be present in the searchable string
        const allWordsMatch = searchWords.every((word) =>
          searchable.includes(word)
        );

        // Status filter
        const statusMatch =
          selectedStatus === "all" ||
          (item.issue_status || "").toLowerCase() ===
            selectedStatus.toLowerCase();

        return allWordsMatch && statusMatch;
      });

      setFilteredData(filteredResults);
    }
  };

  console.log("Data", searchText);
  console.log("Filtered Data:", filteredData);
  console.log("Filter Search Data:", filterSearch);
  console.log("Selected Status:", selectedStatus);
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    console.log("Filtering by status:", status);

    if (status === "all") {
      setFilteredData(filterSearch); // Use filterSearch (all data) instead of complaints (paginated data)
    } else {
      const filteredResults = filterSearch.filter((item) => {
        console.log(
          "Item status:",
          item.issue_status,
          "Comparing with:",
          status
        );
        return item.issue_status.toLowerCase() === status.toLowerCase();
      });
      console.log("Filtered results count:", filteredResults.length);
      setFilteredData(filteredResults);
    }
  };

  const handelTypeChange = (type) => {
    setSelectedStatus(type);

    const filterType = filterSearch.filter(
      (i) => i.issue_type.toLowerCase() === type.toLowerCase()
    );
    setFilteredData(filterType);
  };

  const [exportAllTickets, setExportAllTickets] = useState([]);
  const getAllTickets = async () => {
    const allTicketResp = await getAdminComplaints();
    console.log(allTicketResp);
    setExportAllTickets(allTicketResp.data.complaints);
    return allTicketResp.data.complaints;
  };

  // export data
  const exportToExcel = () => {
    // const modifiedData = filteredData.map((item) => ({
    //   ...item,
    //   "Ticket Number": item.ticket_number,
    // }));
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileName = "helpdesk_data.xlsx";
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };
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
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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
              onClick={() => handleStatusChange(key.toLowerCase())}
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
              onClick={() => handelTypeChange(key.toLowerCase())}
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
                checked={selectedStatus === "open"}
                onChange={() => handleStatusChange("open")}
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
                checked={selectedStatus === "closed"}
                onChange={() => handleStatusChange("closed")}
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
                checked={selectedStatus === "pending"}
                onChange={() => handleStatusChange("pending")}
              />
              <label htmlFor="pending" className="text-sm">
                Pending
              </label>
            </div>
            {/* <div className="flex items-center gap-2">
              <input
                type="radio"
                id="hold"
                name="status"
                checked={selectedStatus === "hold"}
                onChange={() => handleStatusChange("hold")}
              />
              <label htmlFor="hold" className="text-sm">
                On Hold
              </label>
            </div> */}
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="completed"
                name="status"
                checked={selectedStatus === "completed"}
                onChange={() => handleStatusChange("completed")}
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

        {complaints.length === 0 ? (
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

        <div className="flex justify-end m-2 gap-2 items-center">
          <button
            onClick={handlePrevious}
            className=" px-2   disabled:opacity-50 disabled:shadow-none shadow-custom-all-sides rounded-full"
            disabled={currentPage <= 1}
          >
            <MdKeyboardArrowLeft size={30} />
          </button>

          <button
            onClick={handleNext}
            className="px-2 rounded-full shadow-custom-all-sides  disabled:opacity-50 disabled:shadow-none"
            disabled={perPage > totalRows}
          >
            <MdKeyboardArrowRight size={30} />
          </button>
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
