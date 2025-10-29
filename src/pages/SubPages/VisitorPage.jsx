import { useEffect, useState } from "react";
//import Navbar from '../../components/Navbar'
import { PiPlusCircle } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import Passes from "../Passes";
import Navbar from "../../components/Navbar";
import Table from "../../components/table/Table";
import VisitorFilters from "../../components/VisitorFilters";
import {
  getAllVisitorLogs,
  getExpectedVisitor,
  getVisitorApprovals,
  getVisitorByNumber,
  getVisitorHistory,
  postVisitorLogFromDevice,
  visitorApproval,
} from "../../api";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { DNA } from "react-loader-spinner";

import { formatTime } from "../../utils/dateUtils";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import toast from "react-hot-toast";
const VisitorPage = () => {
  const [page, setPage] = useState("all");
  const [selectedVisitor, setSelectedVisitor] = useState("expected");
  const [visitorIn, setVisitorIn] = useState([]);
  const [visitorOut, setVisitorOut] = useState([]);
  const [unexpectedVisitor, setUnexpectedVisitor] = useState([]);
  const [FilteredUnexpectedVisitor, setFilteredUnexpectedVisitor] = useState(
    []
  );
  const [showPopup, setShowPopup] = useState(false);
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();
  const [expectedVisitor, setExpectedVisitor] = useState([]);
  const [FilteredExpectedVisitor, setFilteredExpectedVisitor] = useState([]);
  const [FilteredApproval, setFilteredApproval] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredVisitorOut, setFilteredVisitorOut] = useState([]);
  const [histories, setHistories] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Add logs state variables here before pagination useEffect
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  
  // Pagination states - separate for each tab
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  
  // History pagination states
  const [historyCurrentPage, setHistoryCurrentPage] = useState(1);
  const [historyPerPage, setHistoryPerPage] = useState(10);
  const [historyTotalRows, setHistoryTotalRows] = useState(0);
  const [historyTotalPages, setHistoryTotalPages] = useState(1);
  
  // Approval pagination states
  const [approvalCurrentPage, setApprovalCurrentPage] = useState(1);
  const [approvalPerPage, setApprovalPerPage] = useState(10);
  const [approvalTotalRows, setApprovalTotalRows] = useState(0);
  const [approvalTotalPages, setApprovalTotalPages] = useState(1);
  
  // Logs pagination states
  const [logsCurrentPage, setLogsCurrentPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(10);
  const [logsTotalRows, setLogsTotalRows] = useState(0);
  const [logsTotalPages, setLogsTotalPages] = useState(1);
  
  // Filter states
  const [appliedFilters, setAppliedFilters] = useState({});
  
  const handleApplyFilters = (filters) => {
    console.log("Applying filters:", filters);
    setAppliedFilters(filters);
    setCurrentPage(1); // Reset to first page when applying filters
  };

  const handleResetFilters = () => {
    console.log("Resetting filters");
    setAppliedFilters({});
    setCurrentPage(1); // Reset to first page when resetting filters
  };
  
  const handleClick = (visitorType) => {
    setSelectedVisitor(visitorType);
  };
  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };
  const dateTimeFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Pagination helper functions
  const handlePageChange = (newPage) => {
    console.log(`Changing page from ${currentPage} to ${newPage} for ${page} tab`);
    setCurrentPage(newPage);
  };

  const handlePerPageChange = (newPerPage) => {
    console.log(`Changing per page to ${newPerPage}`);
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing per page
  };

  // History pagination helper functions
  const handleHistoryPageChange = (newPage) => {
    console.log(`Changing history page from ${historyCurrentPage} to ${newPage}`);
    setHistoryCurrentPage(newPage);
  };

  const handleHistoryPerPageChange = (newPerPage) => {
    console.log(`Changing history per page to ${newPerPage}`);
    setHistoryPerPage(newPerPage);
    setHistoryCurrentPage(1); // Reset to first page when changing per page
  };

  // Approval pagination helper functions
  const handleApprovalPageChange = (newPage) => {
    console.log(`Changing approval page from ${approvalCurrentPage} to ${newPage}`);
    setApprovalCurrentPage(newPage);
  };

  const handleApprovalPerPageChange = (newPerPage) => {
    console.log(`Changing approval per page to ${newPerPage}`);
    setApprovalPerPage(newPerPage);
    setApprovalCurrentPage(1); // Reset to first page when changing per page
  };

  // Logs pagination helper functions
  const handleLogsPageChange = (newPage) => {
    console.log(`Changing logs page from ${logsCurrentPage} to ${newPage}`);
    setLogsCurrentPage(newPage);
  };

  const handleLogsPerPageChange = (newPerPage) => {
    console.log(`Changing logs per page to ${newPerPage}`);
    setLogsPerPage(newPerPage);
    setLogsCurrentPage(1); // Reset to first page when changing per page
  };

  // Function to get data (server-side pagination handles pagination)
  const getData = (data) => {
    return data || [];
  };
  const handleSubmit = async () => {
    try {
      if (!mobile) {
        alert("Please enter a mobile number");
        return;
      }
      const visitorDetails = await getVisitorByNumber(mobile);
      if (visitorDetails && Object.keys(visitorDetails).length > 0) {
        console.log("Visitor found:", visitorDetails);
        setShowPopup(false);
        navigate(`/admin/add-new-visitor?mobile=${mobile}`);
      } else {
        console.log("No visitor found, redirecting...");
        navigate(`/admin/add-new-visitor?mobile=${mobile}`);
      }
    } catch (error) {
      // console.error("Error fetching visitor details:", error);
      navigate(`/admin/add-new-visitor?mobile=${mobile}`);
      // alert("Something went wrong. Please try again.");
    }
  };
  useEffect(() => {
    const fetchExpectedVisitor = async () => {
      try {
        setLoading(true);
        
        // Prepare filters based on current page and visitor type
        let filters = { ...appliedFilters }; // Include applied filters from VisitorFilters component
        
        if (page === "Visitor In") {
          filters['q[visitor_in_out_eq]'] = 'IN';
        } else if (page === "Visitor Out") {
          filters['q[visitor_in_out_eq]'] = 'OUT';
        }
        
        // Add expected/unexpected visitor filtering based on selectedVisitor
        if (selectedVisitor === "expected") {
          filters['q[user_type_not_eq]'] = 'security_guard'; // Expected visitors are NOT security guards
        } else if (selectedVisitor === "unexpected") {
          filters['q[user_type_eq]'] = 'security_guard'; // Unexpected visitors ARE security guards
        }
        
        console.log(`Fetching visitors - Page: ${currentPage}, PerPage: ${perPage}, Filters:`, filters);
        
        const visitorResp = await getExpectedVisitor(currentPage, perPage, filters);
        console.log("API Response:", visitorResp);
        
        if (!visitorResp || !visitorResp.data) {
          console.warn("No data received from getExpectedVisitor API");
          setLoading(false);
          return;
        }
        
        // Handle new API response format with pagination
        if (visitorResp.data.visitors && visitorResp.data.total_pages !== undefined) {
          const visitors = visitorResp.data.visitors;
          setTotalPages(visitorResp.data.total_pages || 1);
          setTotalRows(visitorResp.data.total_count || visitors.length);
          
          console.log("Pagination info:", {
            total_pages: visitorResp.data.total_pages,
            current_page: visitorResp.data.current_page,
            total_count: visitorResp.data.total_count,
            visitors_received: visitors.length,
            selectedVisitor: selectedVisitor,
            appliedFilters: filters
          });
          
          // Since backend filtering is applied, visitors array already contains the correct data
          if (page === "Visitor In") {
            // Backend filtered for IN visitors and user_type based on selectedVisitor
            setVisitorIn(visitors);
            setFilteredData(visitors);
            setUnexpectedVisitor(visitors);
            setFilteredUnexpectedVisitor(visitors);
            setExpectedVisitor(visitors);
            setFilteredExpectedVisitor(visitors);
            
            console.log(`Visitor In tab: ${visitors.length} visitors (${selectedVisitor})`);
          } else if (page === "Visitor Out") {
            // Backend filtered for OUT visitors and user_type based on selectedVisitor
            setVisitorOut(visitors);
            setFilteredVisitorOut(visitors);
            setExpectedVisitor(visitors);
            setFilteredExpectedVisitor(visitors);
            setUnexpectedVisitor(visitors);
            setFilteredUnexpectedVisitor(visitors);
            
            console.log(`Visitor Out tab: ${visitors.length} visitors (${selectedVisitor})`);
          } else {
            // For "all" page, backend filtered by user_type based on selectedVisitor
            // No need for frontend filtering since backend handled it
            setVisitorIn(visitors.filter(v => v.visitor_in_out === "IN"));
            setVisitorOut(visitors.filter(v => v.visitor_in_out === "OUT"));
            setFilteredVisitorOut(visitors.filter(v => v.visitor_in_out === "OUT"));
            setFilteredData(visitors.filter(v => v.visitor_in_out === "IN"));
            setUnexpectedVisitor(visitors);
            setFilteredUnexpectedVisitor(visitors);
            setExpectedVisitor(visitors);
            setFilteredExpectedVisitor(visitors);
            
            console.log("All page - backend filtered data:", {
              totalVisitors: visitors.length,
              selectedVisitor: selectedVisitor,
              visitorIn: visitors.filter(v => v.visitor_in_out === "IN").length,
              visitorOut: visitors.filter(v => v.visitor_in_out === "OUT").length
            });
          }
        } else if (visitorResp.data.visitors) {
          // Handle older API response format without total_pages
          const visitors = visitorResp.data.visitors;
          setTotalPages(visitorResp.data.total_pages || 1);
          setTotalRows(visitorResp.data.total_count || visitors.length);
          
          const filteredUnexpectedVisitor = visitors.filter(
            (visit) => visit.user_type === "security_guard"
          );
          const filteredExpectedVisitor = visitors.filter(
            (visit) => visit.user_type !== "security_guard"
          );
          const filteredVisitorIn = visitors.filter(
            (visit) => visit.visitor_in_out === "IN"
          );
          const filteredVisitorOut = visitors.filter(
            (visit) => visit.visitor_in_out === "OUT"
          );
          
          setVisitorIn(filteredVisitorIn);
          setVisitorOut(filteredVisitorOut);
          setFilteredVisitorOut(filteredVisitorOut);
          setFilteredData(filteredVisitorIn);
          setUnexpectedVisitor(filteredUnexpectedVisitor);
          setFilteredUnexpectedVisitor(filteredUnexpectedVisitor);
          setExpectedVisitor(filteredExpectedVisitor);
          setFilteredExpectedVisitor(filteredExpectedVisitor);
          
          console.log("Paginated visitor data:", visitors);
        } else if (Array.isArray(visitorResp.data) && visitorResp.data.total_pages === undefined) {
          // Fallback for old API response format (array directly)
          const sortedVisitor = visitorResp.data.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          
          // Apply frontend filtering for legacy format
          let filteredVisitors = sortedVisitor;
          
          // Apply visitor in/out filtering
          if (page === "Visitor In") {
            filteredVisitors = filteredVisitors.filter(v => v.visitor_in_out === "IN");
          } else if (page === "Visitor Out") {
            filteredVisitors = filteredVisitors.filter(v => v.visitor_in_out === "OUT");
          }
          
          // Apply expected/unexpected filtering
          if (selectedVisitor === "expected") {
            filteredVisitors = filteredVisitors.filter(v => v.user_type !== "security_guard");
          } else if (selectedVisitor === "unexpected") {
            filteredVisitors = filteredVisitors.filter(v => v.user_type === "security_guard");
          }
          
          // For non-paginated response, set default pagination
          setTotalPages(1);
          setTotalRows(filteredVisitors.length);
          
          // Set the filtered data to all state variables for consistency
          setVisitorIn(filteredVisitors.filter(v => v.visitor_in_out === "IN"));
          setVisitorOut(filteredVisitors.filter(v => v.visitor_in_out === "OUT"));
          setFilteredVisitorOut(filteredVisitors.filter(v => v.visitor_in_out === "OUT"));
          setFilteredData(filteredVisitors.filter(v => v.visitor_in_out === "IN"));
          setUnexpectedVisitor(filteredVisitors.filter(v => v.user_type === "security_guard"));
          setFilteredUnexpectedVisitor(filteredVisitors.filter(v => v.user_type === "security_guard"));
          setExpectedVisitor(filteredVisitors.filter(v => v.user_type !== "security_guard"));
          setFilteredExpectedVisitor(filteredVisitors.filter(v => v.user_type !== "security_guard"));
          
          console.log("Legacy format - Filtered visitor data:", {
            total: filteredVisitors.length,
            selectedVisitor: selectedVisitor,
            page: page
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching expected visitor:", error);
        setLoading(false);
      }
    };

    // Only fetch visitor data for relevant tabs
    if (page === "all" || page === "Visitor In" || page === "Visitor Out") {
      fetchExpectedVisitor();
    }
  }, [currentPage, perPage, page, selectedVisitor, appliedFilters]); // Added appliedFilters dependency

  // Separate useEffect for History tab
  useEffect(() => {
    const fetchVisitorHistory = async () => {
      try {
        setLoading(true);
        const historyResp = await getVisitorHistory(historyCurrentPage, historyPerPage);
        console.log("History API Response:", historyResp);
        
        if (!historyResp || !historyResp.data) {
          console.warn("No data received from getVisitorHistory API");
          setLoading(false);
          return;
        }
        
        // Handle new API response format with approval_history
        if (historyResp.data.approval_history && historyResp.data.total_pages !== undefined) {
          const approvalHistory = historyResp.data.approval_history;
          setHistoryTotalPages(historyResp.data.total_pages || 1);
          setHistoryTotalRows(historyResp.data.total_count || approvalHistory.length);
          
          // For server-side pagination, only show the current page data
          setHistories(approvalHistory);
          setFilteredHistory(approvalHistory);
          console.log(`Paginated history: ${approvalHistory.length} items out of ${historyResp.data.total_count} total`);
          console.log("History pagination info:", {
            total_pages: historyResp.data.total_pages,
            current_page: historyResp.data.current_page,
            total_count: historyResp.data.total_count
          });
        } else if (historyResp.data.visitors) {
          // Handle old API response format with visitors
          const visitors = historyResp.data.visitors;
          setHistoryTotalPages(historyResp.data.total_pages || 1);
          setHistoryTotalRows(historyResp.data.total_count || visitors.length);
          
          // For server-side pagination, only show the current page data
          setHistories(visitors);
          setFilteredHistory(visitors);
          console.log(`Paginated history: ${visitors.length} items out of ${historyResp.data.total_count} total`);
          console.log("History pagination info:", {
            total_pages: historyResp.data.total_pages,
            current_page: historyResp.data.current_page,
            total_count: historyResp.data.total_count
          });
        } else {
          // Fallback for old API response format
          const sortedVisitor = historyResp.data.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          // For non-paginated response, limit to per page amount
          const startIndex = (historyCurrentPage - 1) * historyPerPage;
          const endIndex = startIndex + historyPerPage;
          const paginatedData = sortedVisitor.slice(startIndex, endIndex);
          
          setHistoryTotalPages(Math.ceil(sortedVisitor.length / historyPerPage));
          setHistoryTotalRows(sortedVisitor.length);
          
          setHistories(paginatedData);
          setFilteredHistory(paginatedData);
          console.log(`Client-side paginated history: ${paginatedData.length} items, page ${historyCurrentPage}`);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching visitor history:", error);
        setLoading(false);
      }
    };

    // Only fetch history when on History tab
    if (page === "History") {
      fetchVisitorHistory();
    }
  }, [historyCurrentPage, historyPerPage, page]); // Added page dependency

  // Separate useEffect for Approval tab
  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        setLoading(true);
        const approvalResp = await getVisitorApprovals(approvalCurrentPage, approvalPerPage);
        console.log("Approvals API Response:", approvalResp);
        if (!approvalResp || !approvalResp.data) {
          console.warn("No data received from getVisitorApprovals API");
          setLoading(false);
          return;
        }
        
        // Handle new API response format - check for approval_history first, then visitors
        if (approvalResp.data.approval_history && approvalResp.data.total_pages !== undefined) {
          const approvalHistory = approvalResp.data.approval_history;
          setApprovalTotalPages(approvalResp.data.total_pages || 1);
          setApprovalTotalRows(approvalResp.data.total_count || approvalHistory.length);
          
          // For server-side pagination, only show the current page data
          setApprovals(approvalHistory);
          setFilteredApproval(approvalHistory);
          console.log(`Paginated approvals: ${approvalHistory.length} items out of ${approvalResp.data.total_count} total`);
          console.log("Approvals pagination info:", {
            total_pages: approvalResp.data.total_pages,
            current_page: approvalResp.data.current_page,
            total_count: approvalResp.data.total_count
          });
        } else if (approvalResp.data.visitors) {
          // Handle server-side pagination response with visitors
          const visitors = approvalResp.data.visitors;
          setApprovalTotalPages(approvalResp.data.total_pages || 1);
          setApprovalTotalRows(approvalResp.data.total_count || visitors.length);
          
          // For server-side pagination, only show the current page data
          setApprovals(visitors);
          setFilteredApproval(visitors);
          console.log(`Paginated approvals: ${visitors.length} items out of ${approvalResp.data.total_count} total`);
          console.log("Approvals pagination info:", {
            total_pages: approvalResp.data.total_pages,
            current_page: approvalResp.data.current_page,
            total_count: approvalResp.data.total_count
          });
        } else {
          // Fallback for old API response format
          const sortedApproval = approvalResp.data.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          // For non-paginated response, limit to per page amount
          const startIndex = (approvalCurrentPage - 1) * approvalPerPage;
          const endIndex = startIndex + approvalPerPage;
          const paginatedData = sortedApproval.slice(startIndex, endIndex);
          
          setApprovalTotalPages(Math.ceil(sortedApproval.length / approvalPerPage));
          setApprovalTotalRows(sortedApproval.length);
          
          setApprovals(paginatedData);
          setFilteredApproval(paginatedData);
          console.log(`Client-side paginated approvals: ${paginatedData.length} items, page ${approvalCurrentPage}`);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching visitor approvals:", error);
        setLoading(false);
      }
    };

    // Only fetch approvals when on approval tab
    if (page === "approval") {
      fetchApprovals();
    }
  }, [approvalCurrentPage, approvalPerPage, page]); // Added page dependency

  // Reset to first page when changing main tabs (but not when changing expected/unexpected)
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when changing main tabs
    setHistoryCurrentPage(1); // Reset history pagination
    setApprovalCurrentPage(1); // Reset approval pagination  
    setLogsCurrentPage(1); // Reset logs pagination
  }, [page]); // Only reset on main tab changes, not selectedVisitor changes
  // Simple fetch approvals function for refreshing after approval actions
  const fetchApprovals = async () => {
    try {
      console.log(`Refreshing approvals with page: ${approvalCurrentPage}, perPage: ${approvalPerPage}`);
      const approvalResp = await getVisitorApprovals(approvalCurrentPage, approvalPerPage);
      console.log("Refresh Approvals API Response:", approvalResp);
      
      if (!approvalResp || !approvalResp.data) {
        console.warn("No data received from getVisitorApprovals API");
        return;
      }
      
      // Handle new API response format - check for approval_history first, then visitors
      if (approvalResp.data.approval_history && approvalResp.data.total_pages !== undefined) {
        const approvalHistory = approvalResp.data.approval_history;
        setApprovalTotalPages(approvalResp.data.total_pages || 1);
        setApprovalTotalRows(approvalResp.data.total_count || approvalHistory.length);
        
        // For server-side pagination, only show the current page data
        setApprovals(approvalHistory);
        setFilteredApproval(approvalHistory);
        console.log(`Refreshed approvals: ${approvalHistory.length} items out of ${approvalResp.data.total_count} total`);
      } else if (approvalResp.data.visitors) {
        // Handle server-side pagination response with visitors
        const visitors = approvalResp.data.visitors;
        setApprovalTotalPages(approvalResp.data.total_pages || 1);
        setApprovalTotalRows(approvalResp.data.total_count || visitors.length);
        
        // For server-side pagination, only show the current page data
        setApprovals(visitors);
        setFilteredApproval(visitors);
        console.log(`Refreshed approvals: ${visitors.length} items out of ${approvalResp.data.total_count} total`);
      } else {
        // Fallback for old API response format
        const sortedApproval = approvalResp.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        // For non-paginated response, limit to per page amount
        const startIndex = (approvalCurrentPage - 1) * approvalPerPage;
        const endIndex = startIndex + approvalPerPage;
        const paginatedData = sortedApproval.slice(startIndex, endIndex);
        
        setApprovalTotalPages(Math.ceil(sortedApproval.length / approvalPerPage));
        setApprovalTotalRows(sortedApproval.length);
        
        setApprovals(paginatedData);
        setFilteredApproval(paginatedData);
        console.log(`Refreshed approvals (fallback): ${paginatedData.length} items, page ${approvalCurrentPage}`);
      }
    } catch (error) {
      console.error("Error refreshing visitor approvals:", error);
    }
  };
  const VisitorColumns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/passes/visitors/visitor-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/passes/visitors/edit-visitor/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Visitor Type",
      selector: (row) => row.visit_type,
      sortable: true,
    },
    {
      name: " Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Contact No.",
      selector: (row) => row.contact_no,
      sortable: true,
    },

    {
      name: "Purpose",
      selector: (row) => row.purpose,
      sortable: true,
    },
    {
      name: "Coming from",
      selector: (row) => row.coming_from,
      sortable: true,
    },
    {
      name: "Tower-Floor-Unit",
      selector: (row) => row.hosts[0]?.unit_name,
      sortable: true,
    },
    {
      name: "Expected Date",
      selector: (row) => row.expected_date,
      sortable: true,
    },
    {
      name: "Expected Time",
      selector: (row) => row.expected_time,
      sortable: true,
    },
    {
      name: "Vehicle No.",
      selector: (row) => row.vehicle_number,
      sortable: true,
    },

    {
      name: "Host Approval",
      selector: (row) => (row.skip_host_approval ? "Not Required" : "Required"),
      sortable: true,
    },

    {
      name: "Pass Start",
      selector: (row) => (row.start_pass ? dateFormat(row.start_pass) : ""),
      sortable: true,
    },
    {
      name: "Pass End",
      selector: (row) => (row.end_pass ? dateFormat(row.end_pass) : ""),
      sortable: true,
    },
    // {
    //   name: "Check In",
    //   selector: (row) => (
    //     <p>
    //       {row && row.visits_log && row.visits_log.length > 0 ? (
    //         row.visits_log.map((visit, index) =>
    //           visit.check_in ? (
    //             <span key={index}>{dateTimeFormat(visit.check_in)}</span>
    //           ) : (
    //             <span key={index}>-</span>
    //           )
    //         )
    //       ) : (
    //         <span>-</span>
    //       )}
    //     </p>
    //   ),
    //   sortable: true,
    // },
    // {
    //   name: "Check Out",
    //   selector: (row) => (row.check_out ? dateTimeFormat(row.check_out) : ""),
    //   sortable: true,
    // },
    {
      name: "Status",
      selector: (row) => (
        <div
          className={`${
            row.visitor_in_out === "IN" ? "text-red-400" : "text-green-400"
          } `}
        >
          {row.visitor_in_out}
        </div>
      ),
      sortable: true,
    },
    {
      name: "In/OUT",
      selector: (row) => (
        <div
          className={`${
            row.visitor_in_out === "IN" ? "text-red-400" : "text-green-400"
          } `}
        >
          {row.visitor_in_out}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Host",
      selector: (row) =>
        `${row?.created_by_name?.firstname} ${row?.created_by_name?.lastname}`,
      sortable: true,
    },
  ];
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      if (page === "Visitor In" && selectedVisitor === "expected") {
        setFilteredData(visitorIn);
      } else if (page === "Visitor In" && selectedVisitor === "unexpected") {
        setFilteredUnexpectedVisitor(unexpectedVisitor);
      } else if (page === "Visitor Out") {
        setFilteredVisitorOut(visitorOut);
      }
    } else {
      if (page === "Visitor In" && selectedVisitor === "expected") {
        const filteredResults = visitorIn.filter((item) =>
          rowMatchesSearch(item, searchValue)
        );
        setFilteredData(filteredResults);
      } else if (page === "Visitor In" && selectedVisitor === "unexpected") {
        const filteredResults = unexpectedVisitor.filter((item) =>
          rowMatchesSearch(item, searchValue)
        );
        setFilteredUnexpectedVisitor(filteredResults);
      } else if (page === "Visitor Out") {
        const filteredResults = visitorOut.filter((item) =>
          rowMatchesSearch(item, searchValue)
        );
        setFilteredVisitorOut(filteredResults);
      }
    }
  };
  console.log("textsearch", searchText);
  console.log("filterData", filteredData);
  console.log("visitorIn", visitorIn);
  const [searchAll, setSearchAll] = useState([]);
  const handleSearchAll = (e) => {
    const searchValue = e.target.value;
    setSearchAll(searchValue);
    if (searchValue.trim() === "") {
      setFilteredExpectedVisitor(expectedVisitor);
      setFilteredUnexpectedVisitor(unexpectedVisitor);
    } else {
      const filteredExpected = expectedVisitor.filter((item) =>
        rowMatchesSearch(item, searchValue)
      );
      const filteredUnexpected = unexpectedVisitor.filter((item) =>
        rowMatchesSearch(item, searchValue)
      );
      setFilteredExpectedVisitor(filteredExpected);
      setFilteredUnexpectedVisitor(filteredUnexpected);
    }
  };
  // console.log("all:", all);
  // console.log("Search all:", searchAll);
  const [searchHIstoryText, setSearchHistoryText] = useState("");
  const handleSearchHistory = (e) => {
    const searchValue = e.target.value;
    setSearchHistoryText(searchValue);
    // For server-side pagination, we should implement server-side search
    // For now, disable local filtering to respect pagination
    console.log("History search:", searchValue);
    // TODO: Implement server-side search with pagination
  };
  const [searchApprovalText, setSearchApprovalText] = useState("");
  const handleSearchApproval = (e) => {
    const searchValue = e.target.value;
    setSearchApprovalText(searchValue);
    // For server-side pagination, we should implement server-side search
    // For now, disable local filtering to respect pagination
    console.log("Approval search:", searchValue);
    // TODO: Implement server-side search with pagination
  };

  const historyColumn = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/passes/visitors/visitor-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Purpose",
      selector: (row) => row.purpose,
      sortable: true,
    },
    {
      name: "Mobile no.",
      selector: (row) => row.contact_no,
      sortable: true,
    },
    {
      name: "Approval Date",
      selector: (row) => dateTimeFormat(row.approval_date),
      sortable: true,
    },
    {
      name: "Approval",
      selector: (row) =>
        row.approved ? (
          <p className="text-green-400">Approved</p>
        ) : (
          <p className="text-red-400">Denied</p>
        ),
      sortable: true,
    },
  ];
  const handleApproval = async (id, decision) => {
    const approveData = new FormData();
    approveData.append("approve", decision);
    try {
      const res = await visitorApproval(id, approveData);
      console.log(res);
      fetchApprovals();
      if (decision === true) {
        toast.success("Visitor approved successfully");
      } else {
        toast.success("Approval denied");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const approvalColumn = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/passes/visitors/visitor-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Purpose",
      selector: (row) => row.purpose,
      sortable: true,
    },
    {
      name: "Expected Date",
      selector: (row) => dateFormat(row.expected_date),
      sortable: true,
    },
    {
      name: "Expected Time",
      selector: (row) => formatTime(row.expected_time),
      sortable: true,
    },
    {
      name: "Approval",
      selector: (row) => (
        <div className="flex gap-2">
          <button
            className="text-white bg-green-400 rounded-full p-1"
            onClick={() => handleApproval(row.id, true)}
          >
            <FaCheck size={20} />{" "}
          </button>
          <button
            className="text-white bg-red-400 rounded-full p-1"
            onClick={() => handleApproval(row.id, false)}
          >
            <IoClose size={20} />{" "}
          </button>
        </div>
      ),
      sortable: true,
    },
  ];
  document.title = `Passes - Vibe Connect`;
  const getVisitorLogData = () => {
    const now = new Date();
    const offsetMinutes = now.getTimezoneOffset(); // Timezone offset in minutes
    const localNow = new Date(now.getTime() - offsetMinutes * 60 * 1000);
    const startTime = new Date(localNow.getTime() - 15 * 60 * 1000); // 15 minutes ago
    const endTime = localNow;
    const formatTime = (date) => date.toISOString().slice(0, 19); // Remove milliseconds and 'Z'
    return {
      AcsEventCond: {
        searchID: "3166590d-cdb3-43f3-fvdvfdvdb25e-f6e98a05d359",
        searchResultPosition: 0,
        maxResults: 50,
        major: 0,
        minor: 0,
        // startTime: "2024-12-29T11:08:28",
        startTime: formatTime(startTime),
        endTime: formatTime(endTime), // Adjusted endTime
      },
    };
  };
  useEffect(() => {
    const postLogs = async () => {
      const visitorLogData = getVisitorLogData();
      // if (visitorLogData?.InfoList?.length > 0) {
      // const data = await postVisitorLogFromDevice(visitorLogData);
      await postVisitorLogFromDevice(visitorLogData);
      // await postVisitorLogToBackend(data); // Comment out until this function is available
      // } else {
      //   console.warn("No valid visitor log data to send.");
      // }
    };
    const intervalId = setInterval(postLogs, 15 * 60 * 1000);
    postLogs();

    return () => clearInterval(intervalId);
  }, []);
  const visitorDeviceLogColumn = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link
            to={`/admin/passes/visitors/visitor-details/${row.employee_no}`}
          >
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Sr. no.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: " Check in",
      selector: (row) => (row.in_time ? dateTimeFormat(row.in_time) : ""),
      sortable: true,
    },
    {
      name: " Check out",
      selector: (row) => (row.out_time ? dateTimeFormat(row.out_time) : null),
      sortable: true,
    },
  ];
  // Separate useEffect for Logs tab
  useEffect(() => {
    const fetchAllVisitorLogs = async () => {
      try {
        setLoading(true);
        const res = await getAllVisitorLogs(logsCurrentPage, logsPerPage);
        console.log("Visitor logs API Response:", res);
        if (!res || !res.data) {
          console.warn("No data received from getAllVisitorLogs API");
          setLoading(false);
          return;
        }
        // Handle server-side pagination response
        if (res.data.visitors) {
          const visitors = res.data.visitors;
          setLogsTotalPages(res.data.total_pages || 1);
          setLogsTotalRows(res.data.total_count || visitors.length);
          
          // For server-side pagination, only show the current page data
          setFilteredLogs(visitors);
          setLogs(visitors);
          console.log(`Paginated visitor logs: ${visitors.length} items out of ${res.data.total_count} total`);
          console.log("Logs pagination info:", {
            total_pages: res.data.total_pages,
            current_page: res.data.current_page,
            total_count: res.data.total_count
          });
        } else if (res.data.data) {
          // For non-paginated response, limit to per page amount
          const startIndex = (logsCurrentPage - 1) * logsPerPage;
          const endIndex = startIndex + logsPerPage;
          const paginatedData = res.data.data.slice(startIndex, endIndex);
          
          setLogsTotalPages(Math.ceil(res.data.data.length / logsPerPage));
          setLogsTotalRows(res.data.data.length);
          
          setFilteredLogs(paginatedData);
          setLogs(paginatedData);
          console.log(`Client-side paginated visitor logs: ${paginatedData.length} items, page ${logsCurrentPage}`);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching visitor logs:", error);
        setLoading(false);
      }
    };

    // Only fetch logs when on logs tab
    if (page === "logs") {
      fetchAllVisitorLogs();
    }
  }, [logsCurrentPage, logsPerPage, page]); // Added page dependency
  const [logSearchText, setLogSearchText] = useState();
  const handleLogSearch = (e) => {
    const searchValue = e.target.value;
    setLogSearchText(searchValue);
    // For server-side pagination, we should implement server-side search
    // For now, disable local filtering to respect pagination
    console.log("Logs search:", searchValue);
    // TODO: Implement server-side search with pagination
  };
  const rowMatchesSearch = (row, searchValue) => {
    const lowerSearch = searchValue.toLowerCase();
    return Object.values(row).some((val) => {
      if (val === null || val === undefined) return false;
      if (typeof val === "object") {
        return rowMatchesSearch(val, searchValue);
      }
      return String(val).toLowerCase().includes(lowerSearch);
    });
  };
  return (
    <div className="visitors-page">
      <section className="flex">
        <Navbar />
        <div className=" w-full flex mx-3  flex-col overflow-hidden">
          <Passes />
          <div className="flex w-full  m-2">
            <div className="flex w-full md:flex-row flex-col space-x-4 border-b border-gray-400">
              <h2
                className={`p-2 px-4 ${
                  page === "all"
                    ? "text-blue-500 font-medium  shadow-custom-all-sides"
                    : "text-black"
                } rounded-t-md  cursor-pointer text-center text-sm flex items-center justify-center transition-all duration-300`}
                onClick={() => setPage("all")}
              >
                All
              </h2>
              <h2
                className={`p-2 ${
                  page === "Visitor In"
                    ? "text-blue-500 font-medium  shadow-custom-all-sides"
                    : "text-black"
                } rounded-t-md  cursor-pointer text-center text-sm flex items-center justify-center transition-all duration-300`}
                onClick={() => setPage("Visitor In")}
              >
                Visitor In
              </h2>
              <h2
                className={`p-2 ${
                  page === "Visitor Out"
                    ? "text-blue-500 font-medium  shadow-custom-all-sides"
                    : "text-black"
                }  rounded-t-md  rounded-sm cursor-pointer text-center text-sm flex items-center justify-center transition-all duration-300`}
                onClick={() => setPage("Visitor Out")}
              >
                Visitor Out
              </h2>
              <h2
                className={`p-2 ${
                  page === "approval"
                    ? "text-blue-500 font-medium  shadow-custom-all-sides"
                    : "text-black"
                }  rounded-t-md  rounded-sm cursor-pointer text-center text-sm flex items-center justify-center transition-all duration-300`}
                onClick={() => setPage("approval")}
              >
                Approvals
              </h2>
              <h2
                className={`p-2 ${
                  page === "History"
                    ? "text-blue-500 font-medium  shadow-custom-all-sides"
                    : "text-black"
                }  rounded-t-md rounded-sm cursor-pointer text-center text-sm flex items-center justify-center transition-all duration-300`}
                onClick={() => setPage("History")}
              >
                History
              </h2>
              <h2
                className={`p-2 ${
                  page === "logs"
                    ? "text-blue-500 font-medium  shadow-custom-all-sides"
                    : "text-black"
                }  rounded-t-md rounded-sm cursor-pointer text-center text-sm flex items-center justify-center transition-all duration-300`}
                onClick={() => setPage("logs")}
              >
                Logs
              </h2>
            </div>
          </div>
          {page === "all" && (
            <div className="grid md:grid-cols-3 gap-2 items-center">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-md placeholder:text-sm"
                value={searchAll}
                onChange={handleSearchAll}
                placeholder="Search using Visitor name, Host, vehicle number"
              />
              <div className="border md:flex-row flex-col flex p-2 rounded-md text-center border-black">
                <span
                  className={` md:border-r px-2 border-gray-300 cursor-pointer hover:underline ${
                    selectedVisitor === "expected"
                      ? "text-blue-600 underline"
                      : ""
                  } text-center`}
                  onClick={() => handleClick("expected")}
                >
                  <span>Expected visitor</span>
                </span>
                <span
                  className={`cursor-pointer hover:underline ${
                    selectedVisitor === "unexpected"
                      ? "text-blue-600 underline"
                      : ""
                  } text-center`}
                  onClick={() => handleClick("unexpected")}
                >
                  &nbsp; <span>Unexpected visitor</span>
                </span>
              </div>
              <div className="flex justify-end gap-2">
                <VisitorFilters 
                  onApplyFilters={handleApplyFilters}
                  onResetFilters={handleResetFilters}
                />
                <button
                  style={{ background: "rgb(3 19 37)" }}
                  className="font-semibold hover:text-white duration-150 transition-all p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                  onClick={() => {
                    console.log("Opening Popup");
                    setShowPopup(true);
                  }}
                >
                  <PiPlusCircle size={20} />
                  Add New Visitor
                </button>
              </div>
            </div>
          )}
          {page === "Visitor In" && (
            <div className="grid md:grid-cols-3 gap-2 items-center">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-md placeholder:text-sm"
                value={searchText}
                onChange={handleSearch}
                placeholder="Search using Visitor name, Host, vehicle number"
              />
              <div className="border md:flex-row flex-col flex p-2 rounded-md text-center border-black">
                <span
                  className={` md:border-r px-2 border-gray-300 cursor-pointer hover:underline ${
                    selectedVisitor === "expected"
                      ? "text-blue-600 underline"
                      : ""
                  } text-center`}
                  onClick={() => handleClick("expected")}
                >
                  <span>Expected visitor</span>
                </span>
                <span
                  className={`cursor-pointer hover:underline ${
                    selectedVisitor === "unexpected"
                      ? "text-blue-600 underline"
                      : ""
                  } text-center`}
                  onClick={() => handleClick("unexpected")}
                >
                  &nbsp; <span>Unexpected visitor</span>
                </span>
              </div>
              <div className="flex justify-end">
                <VisitorFilters 
                  onApplyFilters={handleApplyFilters}
                  onResetFilters={handleResetFilters}
                />
              </div>
            </div>
          )}

          {console.log("Popup state:", showPopup)}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-5 rounded-lg shadow-lg w-96 relative z-50">
                <h2 className="text-lg font-semibold mb-3">
                  Enter Mobile Number
                </h2>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md w-full mb-4"
                  placeholder="Enter Mobile Number"
                  value={mobile}
                  maxLength={10}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^0-9]/g, "");
                    if (val.length > 0 && val[0] === "0") val = val.slice(1);
                    if (val.length > 10) val = val.slice(0, 10);
                    setMobile(val);
                  }}
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    style={{ background: "rgb(32 145 50)" }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
          {page === "Visitor Out" && (
            <div className="flex flex-col gap-2">
              <div className="grid md:grid-cols-3 gap-2 items-center">
                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded-md placeholder:text-sm"
                  value={searchText}
                  onChange={handleSearch}
                  placeholder="Search using Visitor name, Host, vehicle number"
                />

                <div className="border md:flex-row flex-col flex p-2 rounded-md text-center border-black">
                  <span
                    className={` md:border-r px-2 border-black cursor-pointer hover:underline ${
                      selectedVisitor === "expected"
                        ? "text-blue-600 underline"
                        : ""
                    } text-center`}
                    onClick={() => handleClick("expected")}
                  >
                    <span>Expected visitor</span>
                  </span>
                  <span
                    className={`cursor-pointer hover:underline ${
                      selectedVisitor === "unexpected"
                        ? "text-blue-600 underline"
                        : ""
                    } text-center`}
                    onClick={() => handleClick("unexpected")}
                  >
                    &nbsp; <span>Unexpected visitor</span>
                  </span>
                </div>
                
                <div className="flex justify-end">
                  <VisitorFilters 
                    onApplyFilters={handleApplyFilters}
                    onResetFilters={handleResetFilters}
                  />
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
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
                <Table 
                  columns={VisitorColumns} 
                  data={getData(filteredVisitorOut)} 
                  pagination={true}
                  paginationServer={true}
                  paginationPerPage={perPage}
                  paginationTotalRows={totalRows}
                  currentPage={currentPage}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handlePerPageChange}
                />
              )}
            </div>
          )}
          {page === "History" && (
            <div className="">
              <input
                type="text"
                placeholder="Search using Name or Mobile Number"
                className="border p-2 rounded-md border-gray-300 w-full mb-2 placeholder:text-sm"
                value={searchHIstoryText}
                onChange={handleSearchHistory}
              />
              {loading ? (
                <div className="flex justify-center items-center h-64">
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
                <Table 
                  columns={historyColumn} 
                  data={getData(filteredHistory)} 
                  pagination={true}
                  paginationServer={true}
                  paginationPerPage={historyPerPage}
                  paginationTotalRows={historyTotalRows}
                  currentPage={historyCurrentPage}
                  onChangePage={handleHistoryPageChange}
                  onChangeRowsPerPage={handleHistoryPerPageChange}
                />
              )}
            </div>
          )}
          {page === "logs" && (
            <div className="">
              <input
                type="text"
                placeholder="Search using Name "
                className="border p-2 rounded-md border-gray-300 w-full mb-2 placeholder:text-sm"
                value={logSearchText}
                onChange={handleLogSearch}
              />
              {loading ? (
                <div className="flex justify-center items-center h-64">
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
                <Table 
                  columns={visitorDeviceLogColumn} 
                  data={getData(filteredLogs)} 
                  pagination={true}
                  paginationServer={true}
                  paginationPerPage={logsPerPage}
                  paginationTotalRows={logsTotalRows}
                  currentPage={logsCurrentPage}
                  onChangePage={handleLogsPageChange}
                  onChangeRowsPerPage={handleLogsPerPageChange}
                />
              )}
            </div>
          )}
          {page === "approval" && (
            <div className="">
              <input
                type="text"
                placeholder="Search using Name or Mobile Number"
                className="border p-2 rounded-md border-gray-300 w-full mb-2 placeholder:text-sm"
                value={searchApprovalText}
                onChange={handleSearchApproval}
              />
              {loading ? (
                <div className="flex justify-center items-center h-64">
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
                <Table 
                  columns={approvalColumn} 
                  data={getData(FilteredApproval)} 
                  pagination={true}
                  paginationServer={true}
                  paginationPerPage={approvalPerPage}
                  paginationTotalRows={approvalTotalRows}
                  currentPage={approvalCurrentPage}
                  onChangePage={handleApprovalPageChange}
                  onChangeRowsPerPage={handleApprovalPerPageChange}
                />
              )}
            </div>
          )}
          <div className="my-4">
            {page === "Visitor In" && (
              <>
                {loading ? (
                  <div className="flex justify-center items-center h-64">
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
                    {selectedVisitor === "expected" && (
                      <Table 
                        columns={VisitorColumns} 
                        data={getData(filteredData)} 
                        pagination={true}
                        paginationServer={true}
                        paginationPerPage={perPage}
                        paginationTotalRows={totalRows}
                        currentPage={currentPage}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handlePerPageChange}
                      />
                    )}
                    {selectedVisitor === "unexpected" && (
                      <Table
                        columns={VisitorColumns}
                        data={getData(FilteredUnexpectedVisitor)}
                        pagination={true}
                        paginationServer={true}
                        paginationPerPage={perPage}
                        paginationTotalRows={totalRows}
                        currentPage={currentPage}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handlePerPageChange}
                      />
                    )}
                  </>
                )}
              </>
            )}
            {page === "all" && (
              <>
                {loading ? (
                  <div className="flex justify-center items-center h-64">
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
                    {console.log("All tab - Current state:", {
                      selectedVisitor,
                      expectedVisitors: FilteredExpectedVisitor?.length,
                      unexpectedVisitors: FilteredUnexpectedVisitor?.length,
                      totalRows
                    })}
                    {selectedVisitor === "expected" && (
                      <Table
                        columns={VisitorColumns}
                        data={getData(FilteredExpectedVisitor)}
                        pagination={true}
                        paginationServer={true}
                        paginationPerPage={perPage}
                        paginationTotalRows={totalRows}
                        currentPage={currentPage}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handlePerPageChange}
                      />
                    )}
                    {selectedVisitor === "unexpected" && (
                      <Table
                        columns={VisitorColumns}
                        data={getData(FilteredUnexpectedVisitor)}
                        pagination={true}
                        paginationServer={true}
                        paginationPerPage={perPage}
                        paginationTotalRows={totalRows}
                        currentPage={currentPage}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handlePerPageChange}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>

          {/* Show message when no records found - tab specific */}
          {!loading && (
            <>
              {page === "History" && historyTotalRows === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No records found
                </div>
              )}
              {page === "approval" && approvalTotalRows === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No records found
                </div>
              )}
              {page === "logs" && logsTotalRows === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No records found
                </div>
              )}
              {(page === "all" || page === "Visitor In" || page === "Visitor Out") && totalRows === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No records found
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default VisitorPage;
