import React, { useCallback, useEffect, useRef, useState } from "react";
//import Navbar from '../../components/Navbar'
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import Passes from "../Passes";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import Table from "../../components/table/Table";
import {
  getExpectedVisitor,
  getVisitorApprovals,
  getVisitorHistory,
  visitorApproval,
} from "../../api";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

import Webcam from "react-webcam";
import { formatTime } from "../../utils/dateUtils";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import toast from "react-hot-toast";
const VisitorPage = () => {
  const [page, setPage] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);
  const [selectedVisitor, setSelectedVisitor] = useState("expected");
  const [visitor, setVisitor] = useState([]);
  const [all, setAll] = useState([]);
  const [visitorIn, setVisitorIn] = useState([]);
  const [visitorOut, setVisitorOut] = useState([]);
  const [unexpectedVisitor, setUnexpectedVisitor] = useState([]);
  const [FilteredUnexpectedVisitor, setFilteredUnexpectedVisitor] = useState(
    []
  );
  const [FilteredApproval, setFilteredApproval] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [histories, setHistories] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);

  const webcamRef = useRef(null);
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
  useEffect(() => {
    const fetchExpectedVisitor = async () => {
      try {
        const visitorResp = await getExpectedVisitor();
        const sortedVisitor = visitorResp.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        const filteredUnexpectedVisitor = sortedVisitor.filter(
          (visit) => visit.user_type === "security_guard"
        );
        const filteredVisitorIn = sortedVisitor.filter(
          (visit) => visit.visitor_in_out === "IN"
        );
        const filteredVisitorOut = sortedVisitor.filter(
          (visit) => visit.visitor_in_out === "OUT"
        );
        setVisitor(sortedVisitor);
        setAll(sortedVisitor);
        setVisitorIn(filteredVisitorIn);
        console.log(filteredVisitorIn);
        setVisitorOut(filteredVisitorOut);
        setFilteredData(sortedVisitor);
        setUnexpectedVisitor(filteredUnexpectedVisitor);
        setFilteredUnexpectedVisitor(filteredUnexpectedVisitor);
        console.log(sortedVisitor);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchVisitorHistory = async () => {
      try {
        const historyResp = await getVisitorHistory();
        const sortedVisitor = historyResp.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setHistories(sortedVisitor);
        setFilteredHistory(sortedVisitor);
        console.log(sortedVisitor);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApprovals();
    fetchExpectedVisitor();
    fetchVisitorHistory();
  }, []);
  const fetchApprovals = async () => {
    try {
      const approvalResp = await getVisitorApprovals();
      const sortedApproval = approvalResp.data.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      setApprovals(sortedApproval);
      setFilteredApproval(sortedApproval);
    } catch (error) {
      console.log(error);
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
      if (selectedVisitor === "expected") {
        setFilteredData(visitorIn);
      } else {
        setFilteredUnexpectedVisitor(unexpectedVisitor);
      }
    } else {
      if (selectedVisitor === "expected") {
        const filteredResults = visitorIn.filter(
          (item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            (item.vehicle_number &&
              item.vehicle_number
                .toLowerCase()
                .includes(searchValue.toLowerCase()))
        );

        setFilteredData(filteredResults);
      } else {
        const filteredResults = unexpectedVisitor.filter(
          (item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            (item.vehicle_number &&
              item.vehicle_number
                .toLowerCase()
                .includes(searchValue.toLowerCase()))
        );

        setFilteredUnexpectedVisitor(filteredResults);
      }
    }
  };
  const [searchAll, setSearchAll] = useState([])
  const handleSearchAll = (e) => {
    const searchValue = e.target.value;
    setSearchAll(searchValue);
    if (searchValue.trim() === "") {
      setAll(visitor);
    } else {
      const filteredResults = visitor.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          (item.vehicle_number &&
            item.vehicle_number
              .toLowerCase()
              .includes(searchValue.toLowerCase()))
      );
      setAll(filteredResults);
    }
  };

  const [searchHIstoryText, setSearchHistoryText] = useState("");
  const handleSearchHistory = (e) => {
    const searchValue = e.target.value;
    setSearchHistoryText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredHistory(histories);
    } else {
      const filteredResults = histories.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          (item.contact_no &&
            item.contact_no.toLowerCase().includes(searchValue.toLowerCase()))
      );
      setFilteredHistory(filteredResults);
    }
  };
  const [searchApprovalText, setSearchApprovalText] = useState("");
  const handleSearchApproval = (e) => {
    const searchValue = e.target.value;
    setSearchApprovalText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredApproval(approvals);
    } else {
      const filteredResults = approvals.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredApproval(filteredResults);
    }
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
  document.title = `Passes - My Citi Life`;

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
              <div className="flex justify-end">
                <Link
                  to={"/admin/add-new-visitor"}
                  style={{ background: themeColor }}
                  className=" font-semibold  hover:text-white duration-150 transition-all p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                >
                  <PiPlusCircle size={20} />
                  Add New Visitor
                </Link>
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
                <Link
                  to={"/admin/add-new-visitor"}
                  style={{ background: themeColor }}
                  className=" font-semibold  hover:text-white duration-150 transition-all p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                >
                  <PiPlusCircle size={20} />
                  Add New Visitor
                </Link>
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
              </div>
              <Table columns={VisitorColumns} data={visitorOut} />
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
              <Table columns={historyColumn} data={filteredHistory} />
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
              <Table columns={approvalColumn} data={FilteredApproval} />
            </div>
          )}
          <div className="my-4">
            {selectedVisitor === "expected" && page === "Visitor In" && (
              <Table columns={VisitorColumns} data={visitorIn} />
            )}
            {selectedVisitor === "unexpected" && page === "Visitor In" && (
              <Table
                columns={VisitorColumns}
                data={FilteredUnexpectedVisitor}
              />
              // <p className="font-medium text-center">No Records</p>
            )}
            {/* all */}
            <div className="">
              {selectedVisitor === "expected" && page === "all" && (
                <Table columns={VisitorColumns} data={all} />
              )}
              {selectedVisitor === "unexpected" && page === "all" && (
                <Table
                  columns={VisitorColumns}
                  data={FilteredUnexpectedVisitor}
                />
                // <p className="font-medium text-center">No Records</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisitorPage;
