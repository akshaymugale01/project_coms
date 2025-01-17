import React, { useEffect, useState } from "react";
//import Navbar from '../../components/Navbar'
import { PiPlusCircle } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import Table from "../../../components/table/Table";
import { getExpectedUserVisitor, getExpectedVisitor, postOTPVerification, postVisitorCheckInCheckOut, postVisitorLogFromDevice } from "../../../api";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import EmployeePasses from "../EmployeePasses";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import toast from "react-hot-toast";
import { FaPersonWalkingArrowLoopLeft, FaPersonWalkingArrowRight } from "react-icons/fa6";

const EmployeeVisitor = () => {
  const [page, setPage] = useState("Visitor In");
  const themeColor = useSelector((state) => state.theme.color);
  const [selectedVisitor, setSelectedVisitor] = useState("expected");
  const [visitor, setVisitor] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [otpModal, setOTPModal] = useState(false);
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
  const fetchExpectedVisitor = async () => {
    try {
      const visitorResp = await getExpectedVisitor();
      const sortedVisitor = visitorResp.data.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      setVisitor(sortedVisitor);
      setFilteredData(sortedVisitor);
    } catch (error) {
      console.log(error);
    }
  };
  const [userVisitors, setUserVisitors] = useState([]);
  const [FilteredUserVisitors, setFilteredUserVisitors] = useState([]);
  const fetchUserVisitors = async () => {
    try {
      const visitorResp = await getExpectedUserVisitor();
      const sortedVisitor = visitorResp.data.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      setUserVisitors(sortedVisitor);
      setFilteredUserVisitors(sortedVisitor);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchExpectedVisitor();
    fetchUserVisitors();
  }, []);
  const getLocalDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };
  const handleCheckIn = async (id) => {
    const currentDateTime = getLocalDateTime();
    const payload = {
      visitor_id: id,
      check_in: currentDateTime,
    };
    try {
      const res = await postVisitorCheckInCheckOut(id, payload);
      fetchExpectedVisitor();
      toast.success("Visitor marked IN successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckOut = async (id) => {
    const currentDateTime = getLocalDateTime();
    const payload = {
      visitor_id: id,

      check_out: currentDateTime,
    };
    try {
      const res = await postVisitorCheckInCheckOut(id, payload);
      fetchExpectedVisitor();
      toast.success("Visitor marked OUT successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const VisitorColumns = [
    {
      name: "View",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employee/passes/visitors/visitor-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          {/* <Link to={`/employee/passes/visitors/edit-visitor/${row.id}`}>
            <BiEdit size={15} />
          </Link> */}
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
      name: "Host",
      selector: (row) => row?.hosts?.map((host) => <p>{host?.full_name}</p>),
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
    //   selector: (row) => (row.check_in ? dateTimeFormat(row.check_in) : ""),
    //   sortable: true,
    // },
    // {
    //   name: "Check Out",
    //   selector: (row) => (row.check_out ? dateTimeFormat(row.check_out) : ""),
    //   sortable: true,
    // },
    {
      name: "Created by",
      selector: (row) =>
        `${row?.created_by_name?.firstname} ${row?.created_by_name?.lastname}`,
      sortable: true,
    },
    {
      name: "Resend OTP",
      selector: (row) =>
        `${row?.created_by_name?.firstname} ${row?.created_by_name?.lastname}`,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => {
        if (userType === "security_guard") {
          return (
            <div className="flex items-center">
              {row.verified && row?.visitor_in_out === null && (
                <button
                  className="font-medium flex items-center gap-2 bg-green-400 text-white rounded-full p-1 shadow-custom-all-sides border-2 border-white px-4"
                  onClick={() => handleCheckIn(row.id)}
                >
                  <FaPersonWalkingArrowRight size={20} /> IN
                </button>
              )}
              {row.verified && row?.visitor_in_out === "IN" && (
                <button
                  className="font-medium flex items-center gap-2 bg-red-400 text-white rounded-full p-1 shadow-custom-all-sides border-2 border-white px-4"
                  onClick={() => handleCheckOut(row.id)}
                >
                  <FaPersonWalkingArrowLoopLeft size={20} /> OUT
                </button>
              )}
              {row?.verified && row?.visitor_in_out === "OUT" && (
                <p className="font-medium text-green-500 flex items-center gap-2">
                  <FaCheck /> Visit Completed
                </p>
              )}
            </div>
          );
        }
        return null;
      },
    },
  ];
  const EmployeeVisitorColumns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employee/passes/visitors/visitor-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          {/* <Link to={`/employee/passes/visitors/edit-visitor/${row.id}`}>
            <BiEdit size={15} />
          </Link> */}
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
      name: "Host",
      selector: (row) =>
        row?.hosts?.map((host) => <p>{host?.host_details?.user_name}</p>),
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
    //   selector: (row) => (row.check_in ? dateTimeFormat(row.check_in) : ""),
    //   sortable: true,
    // },
    // {
    //   name: "Check Out",
    //   selector: (row) => (row.check_out ? dateTimeFormat(row.check_out) : ""),
    //   sortable: true,
    // },
    {
      name: "Created by",
      selector: (row) => `${row?.created_by_name} `,
      sortable: true,
    },
  ];
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredData(visitor);
    } else {
      const filteredResults = visitor.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          (item.vehicle_number &&
            item.vehicle_number
              .toLowerCase()
              .includes(searchValue.toLowerCase()))
      );
      setFilteredData(filteredResults);
    }
  };
  const [otp, setOtp] = useState(Array(5).fill(""));
  console.log(otp.join(""));
  const handleChange = (value, index) => {
    // Only accept digits
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus next input field
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };
  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 5);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = Array(5).fill("");
      pastedData.split("").forEach((char, index) => {
        if (index < 5) newOtp[index] = char;
      });
      setOtp(newOtp);
    }
    e.preventDefault();
  };
  const navigate = useNavigate();
  const userType = getItemInLocalStorage("USERTYPE");
  const [visitorId, setVisitorId] = useState("");
  const handleVerifyOTP = async () => {
    const postOTP = new FormData();
    postOTP.append("otp", otp.join(""));
    try {
      const res = await postOTPVerification(postOTP);
      toast.success(res.data.message);
      setVisitorId(res.data.vid);
      setOTPModal(false);
      // console.log(res.data)
      navigate(`/employee/passes/visitors/visitor-details/${res.data.vid}`);
    } catch (error) {
      toast.error("Invalid or expired OTP")
      console.log(error);
      // toast.error(error.response.data.error);
    }
  };
  console.log(visitorId);

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
      const data = await postVisitorLogFromDevice(visitorLogData);
      await postVisitorLogToBackend(data);
      // } else {
      //   console.warn("No valid visitor log data to send.");
      // }
    };
    const intervalId = setInterval(postLogs, 15 * 60 * 1000);
    postLogs();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="visitors-page">
      <section className="flex">
        <Navbar />
        <div className=" w-full flex m-3  flex-col overflow-hidden">
          {/* <EmployeePasses/> */}

          {page === "Visitor In" && (
            <div className="flex  gap-2 justify-between flex-col md:flex-row items-center">
              <input
                type="text"
                className="border border-gray-300 p-2  rounded-md placeholder:text-sm w-96"
                value={searchText}
                onChange={handleSearch}
                placeholder="Search using Visitor name, Host, vehicle number "
              />

              <div className="flex justify-end md:flex-row flex-col gap-2">
                {userType !== "security_guard" && (
                  <div className="border md:flex-row flex-col flex p-2 rounded-md text-center border-black">
                    <span
                      className={` md:border-r px-2 border-black cursor-pointer hover:underline ${selectedVisitor === "expected"
                          ? "text-blue-600 underline"
                          : ""
                        } text-center`}
                      onClick={() => handleClick("expected")}
                    >
                      <span>Expected visitor</span>
                    </span>
                    <span
                      className={`cursor-pointer hover:underline ${selectedVisitor === "unexpected"
                          ? "text-blue-600 underline"
                          : ""
                        } text-center`}
                      onClick={() => handleClick("unexpected")}
                    >
                      &nbsp; <span>Unexpected visitor</span>
                    </span>
                  </div>
                )}
                {userType === "security_guard" && (
                  <button
                    className="bg-green-400 text-white rounded-md p-2 font-medium flex items-center justify-center gap-2"
                    onClick={() => setOTPModal(true)}
                  >
                    <IoMdCall size={20} /> Verify OTP
                  </button>
                )}
                <Link
                  to={"/employee/add-new-visitor"}
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
            <div className="grid md:grid-cols-3 gap-2 items-center">
              <select className="border p-2 rounded-md border-black">
                <option>Select Person to meet</option>
                <option>abc</option>
              </select>

              {userType !== "security_guard" && (
                <div className="border md:flex-row flex-col flex p-2 rounded-md text-center border-black">
                  <span
                    className={` md:border-r px-2 border-black cursor-pointer hover:underline ${selectedVisitor === "expected"
                        ? "text-blue-600 underline"
                        : ""
                      } text-center`}
                    onClick={() => handleClick("expected")}
                  >
                    <span>Expected visitor</span>
                  </span>
                  <span
                    className={`cursor-pointer hover:underline ${selectedVisitor === "unexpected"
                        ? "text-blue-600 underline"
                        : ""
                      } text-center`}
                    onClick={() => handleClick("unexpected")}
                  >
                    &nbsp; <span>Unexpected visitor</span>
                  </span>
                </div>
              )}
            </div>
          )}
          {page === "History" && (
            <div>
              <input
                type="text"
                placeholder="Search using Guest's Name or Pass Number"
                className="border p-2 rounded-md border-black w-96"
              />
            </div>
          )}
          {userType === "security_guard" && (
            <div className="my-4">
              {selectedVisitor === "expected" && page === "Visitor In" && (
                <Table columns={VisitorColumns} data={filteredData} />
              )}
              {selectedVisitor === "unexpected" && (
                // <Table columns={VisitorColumns} data={visitor} />
                <p className="font-medium text-center">No Records</p>
              )}
            </div>
          )}
          {userType !== "security_guard" && (
            <div className="my-4">
              {selectedVisitor === "expected" && page === "Visitor In" && (
                <Table
                  columns={EmployeeVisitorColumns}
                  data={FilteredUserVisitors}
                />
              )}
              {selectedVisitor === "unexpected" && (
                // <Table columns={VisitorColumns} data={visitor} />
                <p className="font-medium text-center">No Records</p>
              )}
            </div>
          )}
        </div>
      </section>
      {otpModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-20">
          <div className="bg-white overflow-auto max-h-[70%] min-h-48 md:w-auto min-w-96 p-4 px-8 flex flex-col rounded-xl gap-2 justify-between">
            <h2 className="border-b font-medium">Verify OTP</h2>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-medium">
                Enter OTP
              </label>

              <div className="flex  gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
            </div>
            <div className="border-t p-1 flex items-center justify-center gap-2">
              <button
                className="bg-red-400 text-white p-1 px-4 rounded-full flex items-center gap-2"
                onClick={() => setOTPModal(false)}
              >
                <MdClose /> Cancel
              </button>
              <button
                className="bg-green-400 text-white p-1 px-4 rounded-full flex items-center gap-2"
                onClick={handleVerifyOTP}
              >
                <FaCheck /> Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeVisitor