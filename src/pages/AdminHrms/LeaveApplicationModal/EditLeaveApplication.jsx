import React, { useEffect, useState } from "react";
import {
  editLeaveApplicationDetails,
  getLeaveApplicationDetails,
  getLeaveCategory,
} from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import toast from "react-hot-toast";

const EditLeaveApplication = ({ setEditModal, applicationId, fetchLeaveApplications }) => {
  const [formData, setFormData] = useState({
    halfDay: false,
    category: "",
    startDate: "",
    endDate: "",
    halfDayDate: "",
    reason: "",
    employee:""
  });
  const [leaveCategories, setLeaveCategories] = useState([]);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  useEffect(() => {
    const fetchLeaveApplicationDetails = async () => {
      try {
        const res = await getLeaveApplicationDetails(applicationId);
        setFormData({
          ...formData,
          halfDay: res.is_half_day,
          category: res.category,
          halfDayDate: res.half_day_selection,
          startDate: res.start_date,
          endDate: res.end_date,
          reason: res.reason,
          employee: res.employee
        });
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
    fetchLeaveApplicationDetails();
    fetchLeaveCategories();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEditApplication = async () => {
    const editData = new FormData();
    editData.append("category", formData.category);
    editData.append("reason", formData.reason);
    editData.append("is_half_day", formData.halfDay);
    editData.append("half_day_selection", formData.halfDayDate);
    editData.append("start_date", formData.startDate);
    editData.append("end_date", formData.endDate);
    editData.append("employee", formData.employee);
    try {
      const res = await editLeaveApplicationDetails(applicationId, editData);
      setEditModal(false);
      toast.success("Leave application updated successfully");
      fetchLeaveApplications()
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {/* Modal content */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="">
              <div className="mt-3  sm:mt-0 sm:ml-4 ">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900 mb-4"
                  id="modal-headline"
                >
                  Edit Leave
                </h3>
                <div className="mb-4">
                  <label
                    htmlFor="leaveCategory"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Select Leave Category *
                  </label>
                  <select
                    id="leaveCategory"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className=" w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select leave category</option>
                    {leaveCategories.map((leaveCat) => (
                      <option value={leaveCat.id} key={leaveCat.id}>
                        {leaveCat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4 w-full">
                  {/* <p className="text-sm font-medium text-gray-700 mb-1">
                        Pending Applications: 1 Applications / 0.5 Days
                      </p> */}
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
                    />{" "}
                    -
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      id=""
                      className="border p-1 rounded-md w-full"
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
                      name="halfDayDate"
                      value={formData.halfDayDate}
                      onChange={handleChange}
                      id=""
                      className="border p-1 rounded-md"
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
          {/* Modal footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleEditApplication}
            >
              Save Changes
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLeaveApplication;
