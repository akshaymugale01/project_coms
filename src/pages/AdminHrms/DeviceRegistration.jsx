import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
import AdminHRMS from "./AdminHrms";
import { BiEdit } from "react-icons/bi";
import {
  getDeviceRegistrationRequests,
  getRegistrationDetails,
  postRegistrationRequestApproval,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { dateFormat } from "../../utils/dateUtils";

const DeviceRegistration = () => {
  const [page, setPage] = useState("Pending");
  const [showModal, setShowModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [registrationPendingReq, setRegistrationPendingReq] = useState([]);
  const [filteredPendingRequests, setFilteredPendingRequests] = useState([]);
  const [filteredCompletedRequests, setFilteredCompletedRequests] = useState(
    []
  );
  const [registrationApprovedReq, setRegistrationApprovedReq] = useState([]);
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");

  const fetchDeviceRegistrations = async () => {
    try {
      const res = await getDeviceRegistrationRequests(hrmsOrgId);
      const filterPendingRequest = res.filter(
        (req) => req.status === "Pending"
      );
      const filterApprovedRequest = res.filter(
        (req) => req.status !== "Pending"
      );
      setRegistrationPendingReq(filterPendingRequest);
      setFilteredPendingRequests(filterPendingRequest);
      setRegistrationApprovedReq(filterApprovedRequest);
      setFilteredCompletedRequests(filterApprovedRequest);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDeviceRegistrations();
  }, []);

  const columns = [
    {
      name: "view",
      cell: (row) => (
        <button onClick={() => handlePendingDetailsModal(row.id)}>
          <BsEye size={15} />
        </button>
      ),
    },
    {
      name: "Employee Name",
      selector: (row) => row.employee_name,
      sortable: true,
    },
    {
      name: "Device Ids",
      selector: (row) => row.device_id,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            className="bg-green-400 text-white p-2 rounded-full"
            onClick={() => handleSelectRow(row.id, "approve")}
          >
            <FaCheck size={14} />
          </button>
          <button
            className="bg-red-400 text-white p-2 rounded-full"
            onClick={() => handleSelectRow(row.id, "reject")}
          >
            <MdClose size={16} />
          </button>
        </div>
      ),
    },
  ];
  const [selectedRows, setSelectedRows] = useState([]);
  const handleSelectRow = async (rowId, reqApproval) => {
    const updatedRows = selectedRows.includes(rowId)
      ? selectedRows.filter((id) => id !== rowId)
      : [...selectedRows, rowId];
    setSelectedRows(updatedRows);
    setCommentModal(true);
    setStatus(reqApproval);
    // await handleRegistrationRequest(updatedRows, reqApproval);
  };

  const handleRegistrationRequest = async (rows, approval) => {
    if (selectedRows.length === 0) {
      toast.error("No request selected. Please select at least one.");
      return;
    }

    const approveRequests = {
      device_registration_ids: rows,
      action: approval,
      comment: comment,
    };
    setSelectedRows([]);
    setComment("");
    setCommentModal(false);
    try {
      await postRegistrationRequestApproval(approveRequests);
      fetchDeviceRegistrations();
    } catch (error) {
      console.log(error);
    }
  };

  const columns1 = [
    {
      name: "Employee Name",
      selector: (row) => row.employee_name,
      sortable: true,
    },
    {
      name: "Device Ids",
      selector: (row) => row.device_id,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handlePendingDetailsModal(row.id)}>
            <BsEye size={15} />
          </button>
        </div>
      ),
    },
  ];

  const data2 = [
    {
      Name: "person 1",
      Location: "Mittu",
    },
  ];

  const handleSelectedRows = (rows) => {
    const selectedId = rows.map((row) => row.id);
    setSelectedRows(selectedId);
  };
  const [pendingModal, setPendingModal] = useState(false);
  const [details, setDetails] = useState({});
  const handlePendingDetailsModal = async (reqId) => {
    setPendingModal(true);
    try {
      const res = await getRegistrationDetails(reqId);
      setDetails(res);
    } catch (error) {
      console.log(error);
    }
  };
  const [searchText, setSearchText] = useState("");

  const handlePendingSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredPendingRequests(registrationPendingReq);
    } else {
      const filteredResult = registrationPendingReq.filter((item) =>
        item?.employee_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredPendingRequests(filteredResult);
    }
  };
  const [completedSearchText, setCompletedSearchText] = useState("");

  const handleCompletedSearch = (e) => {
    const searchValue = e.target.value;
    setCompletedSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredCompletedRequests(registrationApprovedReq);
    } else {
      const filteredResult = registrationApprovedReq.filter((item) =>
        item?.employee_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCompletedRequests(filteredResult);
    }
  };

  return (
    <section className="flex ml-20">
      {/* <OrganisationSetting/> */}
      <AdminHRMS />
      <div className=" w-full flex m-3 flex-col overflow-hidden">
        <div className=" flex mb-2 gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
          <h2
            className={`p-1 ${
              page === "Pending" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("Pending")}
          >
            Pending
          </h2>
          <h2
            className={`p-1 ${
              page === "Completed" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Completed")}
          >
            Completed
          </h2>
          {/* <h2
            className={`p-1 ${
              page === "No Device Attached" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("No Device Attached")}
          >
            No Device Attached
          </h2> */}
        </div>
        {page === "Pending" && (
          <div>
            <div className="grid grid-cols-12 mb-2 gap-2">
              <input
                type="text"
                name=""
                value={searchText}
                onChange={handlePendingSearch}
                id=""
                className="border border-gray-300 rounded-md p-2 w-full col-span-10"
                placeholder="Search by employee name"
              />
              <button
                className="bg-green-400 rounded-md p-1 text-white col-span-1"
                onClick={() =>
                  handleRegistrationRequest(selectedRows, "approve")
                }
              >
                Bulk Approve
              </button>
              <button
                className="bg-red-400 rounded-md p-1 text-white col-span-1"
                onClick={() =>
                  handleRegistrationRequest(selectedRows, "reject")
                }
              >
                Bulk Reject
              </button>
            </div>
            <Table
              columns={columns}
              data={filteredPendingRequests}
              isPagination={true}
              selectableRow={true}
              onSelectedRows={handleSelectedRows}
            />
          </div>
        )}
        {page === "Completed" && (
          <div>
            <input
              type="text"
              name=""
              value={completedSearchText}
              onChange={handleCompletedSearch}
              id=""
              className="border border-gray-300 rounded-md p-2 my-2 w-full col-span-10"
              placeholder="Search by employee name"
            />
            <Table
              columns={columns1}
              data={filteredCompletedRequests}
              isPagination={true}
            />{" "}
          </div>
        )}
        {page === "No Device Attached" && (
          <div>
            <Table columns={columns} data={data2} isPagination={true} />{" "}
          </div>
        )}

        {pendingModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-2 rounded-lg w-2/3">
              <h2 className="text-lg font-medium mb-4 text-center">
                Details of device registration request
              </h2>
              <div className="border bg-blue-50 p-2 rounded-md">
                <div className="grid grid-cols-3 gap-2 text-gray-600">
                  <div className="grid grid-cols-2">
                    <p className="font-medium">Employee name :</p>
                    <p>{details?.employee_name}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="font-medium">Apply date :</p>
                    <p>{dateFormat(details.apply_date)}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="font-medium">Effective from :</p>
                    <p>{dateFormat(details?.effective_from)}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="font-medium">Effective to :</p>
                    <p>
                      {details?.effective_to
                        ? dateFormat(details.effective_to)
                        : ""}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 ">
                    <p className="font-medium">Device Id :</p>
                    <p>{details?.device_id ? details.device_id : ""}</p>
                  </div>
                  <div className="grid grid-cols-2 ">
                    <p className="font-medium">Device Id :</p>
                    <p>{details?.status ? details.status : ""}</p>
                  </div>
                </div>
                <div className="grid text-gray-600 bg-blue-100 p-1 rounded-md my-2">
                  <p className="font-medium">Device name :</p>
                  <p>{details?.device_name ? details.device_name : ""}</p>
                </div>
                <div className="grid bg-blue-100 p-1 rounded-md my-2 text-gray-600">
                  <p className="font-medium">Comment :</p>
                  <p>{details?.comment ? details.comment : ""}</p>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-red-400 text-white flex items-center rounded-full p-2 gap-2 px-4 my-2"
                  onClick={() => setPendingModal(false)}
                >
                  <MdClose /> Close
                </button>
              </div>
            </div>
          </div>
        )}
        {commentModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-96">
              <h2 className="font-medium">Comment</h2>
              <textarea
                name=""
                id=""
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                className="border border-gray-400 p-2 rounded-md w-full"
                placeholder="Enter comment"
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-green-400 text-white rounded-full flex items-center gap-2 p-1 px-2"
                  onClick={() =>
                    handleRegistrationRequest(selectedRows, status)
                  }
                >
                  <FaCheck /> Submit
                </button>
                <button
                  className="bg-red-400 text-white rounded-full flex items-center gap-2 p-1 px-2"
                  onClick={() => setCommentModal(false)}
                >
                  <MdClose /> Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DeviceRegistration;
