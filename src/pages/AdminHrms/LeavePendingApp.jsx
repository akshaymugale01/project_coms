import React, { useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import Table from "../../components/table/Table";
import AdminHRMS from "./AdminHrms";
import { useSelector } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  approveRejectMultipleRequest,
  getLeaveApplications,
  getLeaveCategory,
  getMyHRMSEmployees,
  postLeaveApplicationApproval,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import Select from "react-select";
import { Link } from "react-router-dom";
import SingleLeaveApplication from "./LeaveApplicationModal/SingleLeaveApplication";
import MultipleLeaveApplication from "./LeaveApplicationModal/MultipleLeaveApplication";
import toast from "react-hot-toast";
import EditLeaveApplication from "./LeaveApplicationModal/EditLeaveApplication";
const LeavePendingApp = () => {
  const themeColor = useSelector((state) => state.theme.color);

  const [editModal, setEditModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleAppModal, setSingleAppModal] = useState(false);
  const [multiAppModal, setMultiAppModal] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [isModalOpen5, setIsModalOpen5] = useState(false);
  const [isModalOpen6, setIsModalOpen6] = useState(false);
  const [isModalOpen7, setIsModalOpen7] = useState(false);
  const [isModalOpen8, setIsModalOpen8] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const calculateTotalDays = (start_Date, end_Date) => {
    if (!start_Date || !end_Date) {
      return "";
    }
    const startDate = new Date(start_Date);
    const endDate = new Date(end_Date);

    const timeDifference = endDate.getTime() - startDate.getTime();

    const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return totalDays;
  };

  const columns = [
    {
      name: "Employee Name",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category_label,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.start_date,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.end_date,
      sortable: true,
    },
    {
      name: "Leave Days",
      selector: (row) => calculateTotalDays(row.start_date, row.end_date),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleEditApplication(row.id)}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <BiEdit size={15} />
          </button>
          <button
            className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full"
            onClick={() => {
              handleLeaveApplicationApproval(row.id, "approved");
            }}
          >
            <TiTick size={20} />
          </button>
          <button
            className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full"
            onClick={() => {
              handleLeaveApplicationApproval(row.id, "rejected");
            }}
          >
            <IoClose size={20} />
          </button>
        </div>
      ),
      sortable: true,
    },
  ];
  const handleLeaveApplicationApproval = async (approvalId, approvalStatus) => {
    const postApproval = new FormData();
    postApproval.append("status", approvalStatus);
    try {
      await postLeaveApplicationApproval(approvalId, postApproval);
      fetchLeaveApplications();
      toast.success(`Leave application ${approvalStatus}`);
    } catch (error) {
      console.log(error);
    }
  };

  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [formData, setFormData] = useState({
    halfDay: false,
    category: "",
    startDate: "",
    endDate: "",
    halfDayDate: "",
    reason: "",
  });
  const [applications, setApplications] = useState([]);
  const [filteredApplication, setFilteredApplication] = useState([]);
  const fetchLeaveApplications = async () => {
    try {
      const res = await getLeaveApplications(hrmsOrgId);
      const filteredApplications = res.filter(
        (application) => application.status === "pending"
      );
      setApplications(filteredApplications);
      setFilteredApplication(filteredApplications);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLeaveApplications();
  }, []);
  const [applicationId, setApplicationId] = useState("");
  const handleEditApplication = (id) => {
    setApplicationId(id);
    setEditModal(true);
  };

  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredApplication(applications);
    } else {
      const filteredResult = applications.filter((application) =>
        `${application.first_name} ${application.last_name}`
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredApplication(filteredResult);
    }
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRows = (rows) => {
    const selectedId = rows.map((row) => row.id);
    setSelectedRows(selectedId);
  };

  const handleApproveMultipleApplications = async () => {
    if (selectedRows.length === 0) {
      toast.error("No leave request selected. Please select at least one.");
      return;
    }
    const approveData = {
      leave_request_ids: selectedRows,
      action: "approve",
    };
    setSelectedRows([]);
    try {
      await approveRejectMultipleRequest(approveData);
      fetchLeaveApplications();
      setIsModalOpen3(false);
      toast.success("Select leave Approved");
    } catch (error) {
      console.log(error);
    }
  };
  const handleRejectMultipleApplications = async () => {
    if (selectedRows.length === 0) {
      toast.error("No leave request selected. Please select at least one.");
      return;
    }
    const approveData = {
      leave_request_ids: selectedRows,
      action: "reject",
    };
    setSelectedRows([]);
    try {
      await approveRejectMultipleRequest(approveData);
      fetchLeaveApplications();
      setIsModalOpen5(false);
      toast.success("Select leave Rejected");
    } catch (error) {
      console.log(error);
    }
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <section className="flex">
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-between items-center gap-2 mr-2 my-2">
          <div>
            <Link className="font-medium" to={"/admin/hrms/dashboard"}>
              Home
            </Link>{" "}
            {"/ "}
            <Link className="font-medium" to={""}>
              Leave
            </Link>{" "}
            {"/ "}
            <Link className="font-medium" to={""}>
              Leave Application
            </Link>{" "}
            {"/ "}
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search by employee"
              value={searchText}
              onChange={handleSearch}
              className="border border-gray-400 w-96 placeholder:text-sm rounded-md p-2"
            />
            {/* <button
              onClick={() => setIsModalOpen(true)}
              style={{ background: themeColor }}
              className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
            >
              Filter
            </button> */}
            <div className="relative inline-block text-left">
              <button
                onClick={toggleDropdown}
                className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              >
                Actions
                <MdKeyboardArrowDown size={20} />
              </button>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          data={filteredApplication}
          isPagination={true}
          selectableRow={true}
          onSelectedRows={handleSelectedRows}
        />
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="origin-top-right z-30 absolute right-0 mt-14 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <p
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <button
                onClick={() => {
                  setSingleAppModal(true);
                  setIsOpen(false);
                }}
              >
                Add Single Leave Applications
              </button>
            </p>
            <p
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <button
                onClick={() => {
                  setMultiAppModal(true);
                  setIsOpen(false);
                }}
              >
                Add Multiple Leave Applications
              </button>
            </p>
            <p
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {/* Upload Documents */}
              <button
                onClick={() => {
                  setIsModalOpen3(true);
                  setIsOpen(false);
                }}
              >
                Approve multiple requests
              </button>
            </p>
            {/* <p
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
            
              <button
                onClick={() => {
                  setIsModalOpen4(true);
                  setIsOpen(false);
                }}
              >
                Bulk Approve by filters{" "}
              </button>
            </p> */}
            <p
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {/* Bulk Add New Employees */}
              <button
                onClick={() => {
                  setIsModalOpen5(true);
                  setIsOpen(false);
                }}
              >
                Reject multiple requests
              </button>
            </p>
            {/* <p
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <button
                onClick={() => {
                  setIsModalOpen6(true);
                  setIsOpen(false);
                }}
              >
                Bulk Reject by filters
              </button>
            </p> */}
            {/* <p
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <button
                onClick={() => {
                  setIsModalOpen7(true);
                  setIsOpen(false);
                }}
              >
                Bulk Approve Cancel Leave
              </button>
            </p> */}
            {/* <p
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <button
                onClick={() => {
                  setIsModalOpen8(true);
                  setIsOpen(false);
                }}
              >
                Bulk Reject Cancel Leave
              </button>
            </p> */}
          </div>
        </div>
      )}
      {editModal && (
        <EditLeaveApplication
          setEditModal={setEditModal}
          applicationId={applicationId}
          fetchLeaveApplications={fetchLeaveApplications}
        />
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-md w-2/3">
            {/* <h2 className="text-xl font-semibold mb-4">Add Department</h2> */}
            <div className="grid md:grid-cols-3 gap-5 mt-5">
              <div className="grid gap-2 items-center w-full">
                <label
                  htmlFor="departmentName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Leave Categories
                </label>
                <select
                  type="text"
                  id="departmentName"
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                  placeholder="Enter Branch Location"
                >
                  <option value="">Paid Leave</option>
                  <option value="">LWP</option>
                </select>
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Leave Status
                </label>
                <select
                  id="headOfDepartment"
                  // value={headOfDepartment}
                  // onChange={(e) => setHeadOfDepartment(e.target.value)}
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                >
                  <option value="" disabled>
                    Level 1 Approval Pending
                  </option>
                  <option value="" disabled>
                    Level 2 Approval Pending
                  </option>
                </select>
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee Status
                </label>
                <select
                  id="headOfDepartment"
                  // value={headOfDepartment}
                  // onChange={(e) => setHeadOfDepartment(e.target.value)}
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                >
                  <option value="" disabled>
                    Incomplete
                  </option>
                  <option value="" disabled>
                    Active
                  </option>
                </select>
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee Department
                </label>
                <select
                  id="headOfDepartment"
                  // value={headOfDepartment}
                  // onChange={(e) => setHeadOfDepartment(e.target.value)}
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                >
                  <option value="" disabled>
                    HR
                  </option>
                  <option value="" disabled>
                    Developer
                  </option>
                  <option value="">Driver</option>
                </select>
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                // onClick={handleAddDepartment}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
      {singleAppModal && (
        <SingleLeaveApplication
          setSingleAppModal={setSingleAppModal}
          fetchLeaveApplications={fetchLeaveApplications}
        />
      )}
      {multiAppModal && (
        <MultipleLeaveApplication
          setMultiAppModal={setMultiAppModal}
          fetchLeaveApplications={fetchLeaveApplications}
        />
      )}
      {isModalOpen3 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-xl">
            <div className="">
              <div className="mt-3  sm:mt-0 sm:ml-1 ">
                <h3
                  className="text-lg leading-6 border-b text-center font-medium text-gray-900 mb-4"
                  id="modal-headline"
                >
                  Are you sure?
                </h3>

                <p className="font-medium mb-2">
                  Are you sure you would like to Approve the selected leave
                  requests?
                </p>
                <div className="mb-4">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Approver Comment
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows="4"
                    className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    // placeholder="Enter your reason for leave"
                  ></textarea>
                </div>
              </div>
              <div className="mt-2 flex justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen3(false)}
                  className="border-red-400 border-2 text-red-400 p-1 px-4 rounded-full"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApproveMultipleApplications}
                  className="bg-green-500 text-white p-1 px-4 rounded-full"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen4 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-md w-2/3">
            <h2 className="text-xl font-semibold mb-4">
              Bulk Approve Leave Applications by Filters
            </h2>
            <div className="grid md:grid-cols-3 gap-5 mt-5">
              <div className="grid gap-2 items-center w-full">
                <label
                  htmlFor="departmentName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Leave Categories
                </label>
                <select
                  type="text"
                  id="departmentName"
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                  placeholder="Enter Branch Location"
                >
                  <option value="">Paid Leave</option>
                  <option value="">LWP</option>
                </select>
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Leave Status
                </label>
                <select
                  id="headOfDepartment"
                  // value={headOfDepartment}
                  // onChange={(e) => setHeadOfDepartment(e.target.value)}
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                >
                  <option value="" disabled>
                    Level 1 Approval Pending
                  </option>
                  <option value="" disabled>
                    Level 2 Approval Pending
                  </option>
                </select>
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee Status
                </label>
                <select
                  id="headOfDepartment"
                  // value={headOfDepartment}
                  // onChange={(e) => setHeadOfDepartment(e.target.value)}
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                >
                  <option value="" disabled>
                    Imcomplete
                  </option>
                  <option value="" disabled>
                    Active
                  </option>
                </select>
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee Department
                </label>
                <select
                  id="headOfDepartment"
                  // value={headOfDepartment}
                  // onChange={(e) => setHeadOfDepartment(e.target.value)}
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                >
                  <option value="" disabled>
                    HR
                  </option>
                  <option value="" disabled>
                    Developer
                  </option>
                  <option value="">Driver</option>
                </select>
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => setIsModalOpen4(false)}
                className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
              >
                Clear
              </button>
              <button
                // onClick={handleAddDepartment}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen5 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-xl">
            <div className="">
              <div className="mt-3  sm:mt-0 sm:ml-1 ">
                <h3
                  className="text-lg leading-6 border-b text-center font-medium text-gray-900 mb-4"
                  id="modal-headline"
                >
                  Are you sure?
                </h3>

                <p className="font-medium mb-2">
                  Are you sure you would like to Reject the selected leave
                  requests?
                </p>
                <div className="mb-4">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Approver Comment
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows="4"
                    className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    // placeholder="Enter your reason for leave"
                  ></textarea>
                </div>
              </div>
              <div className="mt-2 flex justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen3(false)}
                  className="border-red-400 border-2 text-red-400 p-1 px-4 rounded-full"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectMultipleApplications}
                  className="bg-green-500 text-white p-1 px-4 rounded-full"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen6 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-md w-2/3">
            <h2 className="text-xl font-semibold mb-4">
              Bulk Reject Leave Applications by Filters
            </h2>
            <div className="grid md:grid-cols-3 gap-5 mt-5">
              <div className="grid gap-2 items-center w-full">
                <label
                  htmlFor="departmentName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Leave Categories
                </label>
                <select
                  type="text"
                  id="departmentName"
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                  placeholder="Enter Branch Location"
                >
                  <option value="">Paid Leave</option>
                  <option value="">LWP</option>
                </select>
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Leave Status
                </label>
                <select
                  id="headOfDepartment"
                  // value={headOfDepartment}
                  // onChange={(e) => setHeadOfDepartment(e.target.value)}
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                >
                  <option value="" disabled>
                    Level 1 Approval Pending
                  </option>
                  <option value="" disabled>
                    Level 2 Approval Pending
                  </option>
                </select>
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee Status
                </label>
                <select
                  id="headOfDepartment"
                  // value={headOfDepartment}
                  // onChange={(e) => setHeadOfDepartment(e.target.value)}
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                >
                  <option value="" disabled>
                    Imcomplete
                  </option>
                  <option value="" disabled>
                    Active
                  </option>
                </select>
              </div>
              <div className="grid gap-2 items-center w-full ">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee Department
                </label>
                <select
                  id="headOfDepartment"
                  // value={headOfDepartment}
                  // onChange={(e) => setHeadOfDepartment(e.target.value)}
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                >
                  <option value="" disabled>
                    HR
                  </option>
                  <option value="" disabled>
                    Developer
                  </option>
                  <option value="">Driver</option>
                </select>
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => setIsModalOpen6(false)}
                className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
              >
                Clear
              </button>
              <button
                // onClick={handleAddDepartment}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen7 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="">
              <div className="mt-3  sm:mt-0 sm:ml-1 ">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900 mb-4"
                  id="modal-headline"
                >
                  Are you sure?
                </h3>

                <p>
                  Are you sure you would like to Approve Leave Cancellation for
                  selected leave requests?
                </p>
                <div className="mb-4">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Approver Comment
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows="3"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    // placeholder="Enter your reason for leave"
                  ></textarea>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => setIsModalOpen7(false)}
                  className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  // onClick={handleAddDepartment}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen8 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="">
              <div className="mt-3  sm:mt-0 sm:ml-1 ">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900 mb-4"
                  id="modal-headline"
                >
                  Are you sure?
                </h3>

                <p>
                  Are you sure you would like to Reject Leave Cancellation for
                  selected leave requests?
                </p>
                <div className="mb-4">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Approver Comment
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows="3"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    // placeholder="Enter your reason for leave"
                  ></textarea>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => setIsModalOpen8(false)}
                  className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  // onClick={handleAddDepartment}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LeavePendingApp;
