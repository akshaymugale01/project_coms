// import React, { useState } from "react";
// import Table from "../../components/table/Table";
// import { BiEdit } from "react-icons/bi";
// import { TiTick } from "react-icons/ti";
// import { IoClose } from "react-icons/io5";
// import { BsEye } from "react-icons/bs";

// const CompletedTable = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [showFilterModal, setShowFilterModal] = useState(false);
//   const [modalData, setModalData] = useState({
//     regularizationReason: "",
//     regularizationRequestStatus: "",
//     startDate: "",
//     endDate: "",
//     employeeDepartment: ""
//   });

//   const handleEditClick = (row) => {
//     setModalData({
//       regularizationReason: row.reason || "",
//       regularizationRequestStatus: row.status || "",
//       startDate: "",
//       endDate: "",
//       employeeDepartment: row.department || "",
//       ...row,
//     });
//     setShowModal(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setModalData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const columns = [
//     {
//       name: "view",
//       cell: (row) => (
//         <div className="flex items-center gap-4">
//           <button onClick={() => handleEditClick(row)}>
//             <BsEye size={15} />
//           </button>
//         </div>
//       ),
//     },
//     {
//       name: "Employee Name",
//       selector: (row) => row.Name,
//       sortable: true,
//     },
//     {
//       name: "Date",
//       selector: (row) => row.Date,
//       sortable: true,
//     },
//     {
//       name: "Requested Timings",
//       selector: (row) => row.time,
//       sortable: true,
//     },
//     {
//       name: "Actual Timings",
//       selector: (row) => row.atime,
//       sortable: true,
//     },
//     {
//       name: "Reason",
//       selector: (row) => row.reason,
//       sortable: true,
//     },
//     {
//       name: "Comment",
//       selector: (row) => row.Comment,
//       sortable: true,
//     },
//     {
//       name: "Status",
//       selector: (row) => row.status,
//       sortable: true,
//     },
//     // {
//     //   name: "Approval",
//     //   selector: (row) => (
//     //     <div className="flex justify-center gap-2">
//     //       <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full">
//     //         <TiTick size={20} />
//     //       </button>
//     //       <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full">
//     //         <IoClose size={20} />
//     //       </button>
//     //     </div>
//     //   ),
//     //   sortable: true,
//     // },
//   ];

//   const data = [
//     {
//       Name: "Mittu Panda",
//       Date: "1/2/2023",
//       time: "3:00pm",
//       atime: "3:00pm",
//       reason: "Miss punch",
//       Comment: "miss punch in",
//       status: "Approved",
//     },
//   ];

//   return (
//     <section className="flex">
//       <div className="w-full flex m-3 flex-col overflow-hidden">
//         <div className="flex justify-end gap-2 my-5">
//           <input
//             type="text"
//             placeholder="Search by Employee name"
//             className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
//           />
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={() => setShowFilterModal(true)}>
//             Filter
//           </button>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Actions</button>
//         </div>
//         <Table columns={columns} data={data} isPagination={true} />
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
//           <h2 className="text-xl font-semibold mb-4">Regularization Request</h2>
//           <div className="grid grid-cols-1 gap-4">
//             <div className="flex justify-between">
//               <span className="font-medium">Status:</span>
//               <span>Approved</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Regularization Date:</span>
//               <span>28-06-2024</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Attendance Template:</span>
//               <span>Attendance Policy</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Type of Request:</span>
//               <span>Check In & Check Out Request</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Applied On:</span>
//               <span>28-06-2024</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Actual Check In:</span>
//               <span>04:00 PM</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Actual Check Out:</span>
//               <span>08:21 PM</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Requested Check In:</span>
//               <span>04:00 PM</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Requested Check Out:</span>
//               <span>08:21 PM</span>
//             </div>
//           </div>
//           <div className="mt-4">
//             <span className="font-medium">Comments and History</span>
//           </div>
//           <div className="flex justify-end mt-4">
//             <button  onClick={() => setShowModal(false)} className="px-4 py-2 bg-red-500 text-white rounded-lg">Close</button>
//           </div>
//         </div>
//       </div>
//       )}

//       {showFilterModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded-lg w-96">
//             <h2 className="text-lg font-bold mb-4">Filter Requests</h2>
//             <div className="grid md:grid-cols-1 gap-5 mt-5">
//               <div className="grid gap-2 items-center w-full">
//                 <label htmlFor="filterReason">Regularization Reason</label>
//                 <input type="text" name="filterReason" value={modalData.regularizationReason} onChange={handleChange} className="border border-gray-400 p-2 rounded-md"/>
//               </div>
//               <div className="grid gap-2 items-center w-full">
//                 <label htmlFor="filterStatus">Regularization Request Status</label>
//                 <input type="text" name="filterStatus" value={modalData.regularizationRequestStatus} onChange={handleChange} className="border border-gray-400 p-2 rounded-md"/>
//               </div>
//               <div className="grid gap-2 items-center w-full">
//                 <label htmlFor="filterStartDate">Start Date</label>
//                 <input type="date" name="filterStartDate" value={modalData.startDate} onChange={handleChange} className="border border-gray-400 p-2 rounded-md"/>
//               </div>
//               <div className="grid gap-2 items-center w-full">
//                 <label htmlFor="filterEndDate">End Date</label>
//                 <input type="date" name="filterEndDate" value={modalData.endDate} onChange={handleChange} className="border border-gray-400 p-2 rounded-md"/>
//               </div>
//               <div className="grid gap-2 items-center w-full">
//                 <label htmlFor="filterDepartment">Employee Department</label>
//                 <input type="text" name="filterDepartment" value={modalData.employeeDepartment} onChange={handleChange} className="border border-gray-400 p-2 rounded-md"/>
//               </div>
//             </div>
//             <button
//               className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
//               onClick={() => setShowFilterModal(false)}
//             >
//               Close
//             </button>
//             &nbsp;<button
//               className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
//               onClick={() => setShowFilterModal(false)}
//             >
//               Apply
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default CompletedTable;

import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import {
  getEmployeeRegularizationReq,
  getRegularizationDetails,
  postRegularizationApproval,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";

const CompletedTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setshowDetailsModal] = useState(false);
  const [showBulkModal, setshowBulkModal] = useState(false);
  const [showApproveModal, setshowApproveModal] = useState(false);
  const [showApproveFilterModal, setshowApproveFilterModal] = useState(false);
  const [showRejectModal, setshowRejectModal] = useState(false);
  const [showRejectFilterModal, setshowRejectFilterModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [modalData, setModalData] = useState({
    regularizationReason: "",
    regularizationRequestStatus: "",
    startDate: "",
    endDate: "",
    employeeDepartment: "",
  });
  const handleApproveMultiple = () => {
    // Logic to approve multiple requests
    console.log("Approve multiple requests");
    setShowActionsDropdown(false);
  };

  const handleRejectMultiple = () => {
    // Logic to reject multiple requests
    console.log("Reject multiple requests");
    setShowActionsDropdown(false);
  };
  const handleEditClick = (row) => {
    setModalData({
      regularizationReason: row.reason || "",
      regularizationRequestStatus: row.status || "",
      startDate: "",
      endDate: "",
      employeeDepartment: row.department || "",
      ...row,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const columns = [
    {
      name: "Employee Name",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Requested Timings",
      selector: (row) => row.requested_timing,
      sortable: true,
    },
    {
      name: "Actual Timings",
      selector: (row) => row.actual_timing,
      sortable: true,
    },
    {
      name: "Reason",
      selector: (row) => row.reason,
      sortable: true,
    },
    {
      name: "Comment",
      selector: (row) => row.comment,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <div
          className={`font-medium ${
            row.status === "rejected" ? "text-red-400" : "text-green-400"
          }`}
        >
          {row.status}
        </div>
      ),
      sortable: true,
    },
    {
      name: "view",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleShowDetails(row.id)}>
            <BsEye size={15} />
          </button>
        </div>
      ),
    },
  ];

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchRegularizationReq = async () => {
    try {
      const res = await getEmployeeRegularizationReq(hrmsOrgId);
      const pendingReq = res.filter((req) => req.status !== "pending");
      setFilteredRequests(pendingReq);
      setRequests(pendingReq);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRegularizationReq();
  }, []);
  const [regDate, setReqDate] = useState("");
  const [requestedTime, setRequestedTime] = useState("");
  const [actualTime, setActualTime] = useState("");
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const handleShowDetails = async (reqId) => {
    setshowDetailsModal(true);
    try {
      const res = await getRegularizationDetails(reqId);
      setReqDate(res.date);
      setRequestedTime(res.requested_timing);
      setActualTime(res.actual_timing);
      setReason(res.reason);
      setComment(res.comment);
      setStatus(res.setStatus);
    } catch (error) {
      console.log(error);
    }
  };
  const [searchText, setSearchText] = useState("")
  const handleSearch = (e)=>{
    const searchValue = e.target.value
    setSearchText(searchValue)
    if (searchValue.trim()=== "") {
      setFilteredRequests(requests)
    } else {
      const filteredResult = requests.filter((employee)=> `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(searchValue.toLowerCase()))
      setFilteredRequests(filteredResult)
    }
  }

  return (
    <section className="flex">
      <div className="w-full flex mx-2 flex-col overflow-hidden">
        <div className="flex justify-between gap-2 my-2">
          <input
            type="text"
            placeholder="Search by employee name"
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
            value={searchText}
            onChange={handleSearch}
          />
          <div className="flex gap-2">

          {/* <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={() => setShowFilterModal(true)}
            >
            Filter
          </button> */}
          <button
            onClick={() => setShowActionsDropdown(!showActionsDropdown)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
            Actions
          </button>
            </div>
          {showActionsDropdown && (
            <div className="absolute top-35 right-2 mt-10 w-72 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => setshowApproveModal(!showApproveModal)}
              >
                Approve multiple requests
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => setshowRejectModal(!showRejectModal)}
              >
                Reject multiple requests
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() =>
                  setshowApproveFilterModal(!showApproveFilterModal)
                }
              >
                Approve multiple requests by filters
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => setshowRejectFilterModal(!showRejectFilterModal)}
              >
                Reject multiple requests by filters
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => setshowBulkModal(!showBulkModal)}
              >
                Bulk Upload Regularization
              </button>
            </div>
          )}
        </div>
        <Table
          columns={columns}
          data={filteredRequests}
          isPagination={true}
          selectableRows={true}
        />
      </div>
      {showDetailsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              Regularization Request
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span>{status}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Regularization Date:</span>
                <span>{regDate}</span>
              </div>
              {/* <div className="flex justify-between">
                <span className="font-medium">Attendance Template:</span>
                <span>Attendance Policy</span>
              </div> */}
              <div className="flex justify-between">
                <span className="font-medium">Type of Request:</span>
                {/* <span>Check In & Check Out Request</span> */}
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Applied On:</span>
                <span></span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Actual Check In:</span>
                <span></span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Actual Check Out:</span>
                <span></span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Requested Check In:</span>
                <span></span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Requested Check Out:</span>
                <span></span>
              </div>
            </div>
            {/* <div className="mt-4">
              <span className="font-medium">Comments and History</span>
            </div> */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setshowDetailsModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              Edit Regularization Request
            </h2>
            <div className="grid md:grid-cols-1 gap-5 mt-5">
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="regularizationReason">
                  Regularization Reason
                </label>
                <input
                  type="text"
                  name="regularizationReason"
                  value={modalData.regularizationReason}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="regularizationRequestStatus">
                  Regularization Request Status
                </label>
                <input
                  type="text"
                  name="regularizationRequestStatus"
                  value={modalData.regularizationRequestStatus}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={modalData.startDate}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={modalData.endDate}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="employeeDepartment">Employee Department</label>
                <input
                  type="text"
                  name="employeeDepartment"
                  value={modalData.employeeDepartment}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showApproveModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p>Do you really want to approve selected records?</p>
            <div className="grid md:grid-cols-1 gap-5 mt-5">
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="regularizationReason">Approver's comment</label>
                <textarea
                  type="text"
                  name="regularizationReason"
                  value={modalData.regularizationReason}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setshowApproveModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p>Do you really want to reject selected records?</p>
            <div className="grid md:grid-cols-1 gap-5 mt-5">
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="regularizationReason">Approver's comment</label>
                <textarea
                  type="text"
                  name="regularizationReason"
                  value={modalData.regularizationReason}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setshowRejectModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showFilterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Filter Requests</h2>
            <div className="grid md:grid-cols-2 gap-5 mt-5">
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterReason">Regularization Reason</label>
                <select
                  name="filterReason"
                  value={modalData.regularizationReason}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterStatus">
                  Regularization Request Status
                </label>
                <select
                  name="filterStatus"
                  value={modalData.regularizationRequestStatus}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterStartDate">Start Date</label>
                <input
                  type="date"
                  name="filterStartDate"
                  value={modalData.startDate}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterEndDate">End Date</label>
                <input
                  type="date"
                  name="filterEndDate"
                  value={modalData.endDate}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterDepartment">Employee Department</label>
                <select
                  type="text"
                  name="filterDepartment"
                  value={modalData.employeeDepartment}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setShowFilterModal(false)}
            >
              Close
            </button>
            &nbsp;
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setShowFilterModal(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {showBulkModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">
              Bulk Upload Regularization
            </h2>
            <p className="font-bold">Instructions:</p>
            <p>1. Download bulk regularization format from download section</p>
            <p>
              2. Enter employee email as per records, Name & Emp Code Date &
              date in DD-MM-YYYY Format
            </p>
            <p>3. Select Requested Check In and Check Out Column</p>
            <p>4. Right click and select the format cells button</p>
            <p>5. Choose the "Text" format</p>
            <p>
              6. Enter the check-in / check-out times in AM/PM format: E.g. 8:05
              AM or 12:30 PM
            </p>
            <div className="grid md:grid-cols-1 gap-5 mt-5">
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterReason">
                  Step 1: Download Bulk Regularization Format
                </label>
                <button className="bg-blue-500 w-48 text-white p-2 rounded-md">
                  Download
                </button>
              </div>
              {/* <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterStatus">Regularization Request Status</label>
                <select  name="filterStatus" value={modalData.regularizationRequestStatus} onChange={handleChange} className="border border-gray-400 p-2 rounded-md"/>
              </div> */}
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterStartDate">
                  Step 2: Make necessary changes in upload format as per
                  instructions and Upload *
                </label>
                <input
                  type="file"
                  name="filterStartDate"
                  value={modalData.startDate}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterEndDate">
                  Step 3: Select Regularizataion Status Applicable *
                </label>
                <select
                  name="filterEndDate"
                  value={modalData.endDate}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              {/* <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterDepartment">Employee Department</label>
                <select type="text" name="filterDepartment" value={modalData.employeeDepartment} onChange={handleChange} className="border border-gray-400 p-2 rounded-md"/>
              </div> */}
            </div>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setshowBulkModal(false)}
            >
              Close
            </button>
            &nbsp;
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setshowBulkModal(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {showApproveFilterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">
              Bulk Approve Regularizataion Requests by Filters
            </h2>
            <div className="grid md:grid-cols-2 gap-5 mt-5">
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterReason">Regularization Reason</label>
                <select
                  type="text"
                  name="filterReason"
                  value={modalData.regularizationReason}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterStatus">
                  Regularization Request Status
                </label>
                <select
                  type="text"
                  name="filterStatus"
                  value={modalData.regularizationRequestStatus}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterStartDate">Start Date</label>
                <input
                  type="date"
                  name="filterStartDate"
                  value={modalData.startDate}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterEndDate">End Date</label>
                <input
                  type="date"
                  name="filterEndDate"
                  value={modalData.endDate}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterDepartment">Employee Department</label>
                <select
                  type="text"
                  name="filterDepartment"
                  value={modalData.employeeDepartment}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setshowApproveFilterModal(false)}
            >
              Close
            </button>
            &nbsp;
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setshowApproveFilterModal(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
      {showRejectFilterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">
              Bulk Reject Regularizataion Requests by Filters
            </h2>
            <div className="grid md:grid-cols-2 gap-5 mt-5">
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterReason">Regularization Reason</label>
                <select
                  type="text"
                  name="filterReason"
                  value={modalData.regularizationReason}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterStatus">
                  Regularization Request Status
                </label>
                <select
                  type="text"
                  name="filterStatus"
                  value={modalData.regularizationRequestStatus}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterStartDate">Start Date</label>
                <input
                  type="date"
                  name="filterStartDate"
                  value={modalData.startDate}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterEndDate">End Date</label>
                <input
                  type="date"
                  name="filterEndDate"
                  value={modalData.endDate}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="filterDepartment">Employee Department</label>
                <select
                  type="text"
                  name="filterDepartment"
                  value={modalData.employeeDepartment}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setshowRejectFilterModal(false)}
            >
              Close
            </button>
            &nbsp;
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setshowRejectFilterModal(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CompletedTable;
