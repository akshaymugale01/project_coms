import React, { useEffect, useState } from "react";
import {
  getLeaveCategory,
  getMyHRMSEmployees,
  postMultipleLeaveApplication,
} from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import MultiSelect from "../Components/MultiSelect";
import toast from "react-hot-toast";
const MultipleLeaveApplication = ({
  setMultiAppModal,
  fetchLeaveApplications,
}) => {
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [selectedUserOption, setSelectedUserOption] = useState([]);
  const [leaveCategories, setLeaveCategories] = useState([]);
  const [formData, setFormData] = useState({
    halfDay: false,
    category: "",
    startDate: "",
    endDate: "",
    halfDayDate: "",
    reason: "",
  });
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const fetchAllEmployees = async () => {
    try {
      const res = await getMyHRMSEmployees(hrmsOrgId);

      const employeesList = res.map((emp) => ({
        value: emp.id,
        label: `${emp.first_name} ${emp.last_name}`,
      }));

      setEmployees(employeesList);
      setFilteredEmployees(employeesList);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchLeaveCategories = async () => {
    try {
      const res = await getLeaveCategory(hrmsOrgId);
      setLeaveCategories(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllEmployees();
    fetchLeaveCategories();
  }, []);

  const handleEmployeeSelect = (option) => {
    if (selectedUserOption.includes(option)) {
      setSelectedUserOption(
        selectedUserOption.filter((item) => item !== option)
      );
    } else {
      setSelectedUserOption([...selectedUserOption, option]);
    }
  };

  // const handleAddApplication = async () => {
  const handleAddApplication = async () => {
    const { startDate, endDate, halfDayDate, category, halfDay, reason } =
      formData;
    if (!category) {
      toast.error("Category is required.");
      return;
    }
    if (!reason) {
      toast.error("Reason is required.");
      return;
    }
    if (!selectedUserOption || selectedUserOption.length === 0) {
      toast.error("At least one employee must be selected.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const halfDaySelection = halfDayDate ? new Date(halfDayDate) : null;

    if (end < start) {
      toast.error("End date cannot be earlier than start date.");
      return;
    }

    if (
      halfDay &&
      halfDaySelection &&
      (halfDaySelection < start || halfDaySelection > end)
    ) {
      toast.error(
        "Half-day selection must be between or equal to start and end date."
      );
      return;
    }
    const postData = {
      employee: selectedUserOption,
      category: formData.category,
      start_date: formData.startDate,
      end_date: formData.endDate,
      is_half_day: formData.halfDay,
      half_day_selection: formData.halfDayDate,
      reason: formData.reason,
      status: "approve",
    };

    try {
      const res = await postMultipleLeaveApplication(postData);
      console.log(res);
      setMultiAppModal(false);
      fetchLeaveApplications();
      toast.success("Leave application added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const dd = String(today.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto hide-scrollbar">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-black opacity-30 backdrop-blur-sm z-20"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {/* Modal content */}
          <div className="max-h-[28rem] overflow-auto  px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-white hide-scrollbar">
            <div className="">
              <div className="">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900 mb-4"
                  id="modal-headline"
                >
                  Add Leaves Applications in bulk
                </h3>
                <div className="mb-4">
                  <label
                    htmlFor="leaveCategory"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Select Leave Category{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="leaveCategory"
                    name="category"
                    className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select leave category</option>
                    {leaveCategories.map((leaveCat) => (
                      <option value={leaveCat.id} key={leaveCat.id}>
                        {leaveCat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Select Employee
                  </label>
                  <MultiSelect
                    options={employees}
                    compTitle="Select employees"
                    handleSelect={handleEmployeeSelect}
                    // handleSelectAll={handleSelectAll}
                    selectedOptions={selectedUserOption}
                    setSelectedOptions={setSelectedUserOption}
                    setOptions={setEmployees}
                    searchOptions={filteredEmployees}
                  />
                </div>

                <div className="mb-4 w-full">
                  <label
                    htmlFor="dateRange"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Select Date Range for this Leave
                  </label>
                  <div className="flex space-x-2 items-center gap-2 w-full">
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      id=""
                      className="border p-1 rounded-md w-full"
                      min={getTodayDate()}
                    />{" "}
                    -
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      id=""
                      className="border p-1 rounded-md w-full"
                      min={getTodayDate()}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-700">
                    Are There Any Half Days?
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="halfDayYes"
                        name="halfDay"
                        type="radio"
                        checked={formData.halfDay === true}
                        onChange={() =>
                          setFormData({ ...formData, halfDay: true })
                        }
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor="halfDayYes"
                        className="ml-1 block text-sm font-medium text-gray-700"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="halfDayNo"
                        name="halfDay"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        checked={formData.halfDay === false}
                        onChange={() =>
                          setFormData({ ...formData, halfDay: false })
                        }
                      />
                      <label
                        htmlFor="halfDayNo"
                        className="ml-1 block text-sm font-medium text-gray-700"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
                {formData.halfDay && (
                  <div className="my-2">
                    <label
                      htmlFor="halfDaySelect"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Select Half Days
                    </label>
                    <input
                      type="date"
                      name=""
                      id=""
                      className="border p-1 w-full rounded-md"
                    />
                  </div>
                )}
                <div className="my-2">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Reason for Leave
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows="3"
                    value={formData.reason}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 p-2 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Enter your reason for leave"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex justify-center sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600   sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleAddApplication}
            >
              Submit
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setMultiAppModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleLeaveApplication;
