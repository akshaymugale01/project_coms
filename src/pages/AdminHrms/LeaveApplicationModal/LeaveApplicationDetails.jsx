import React, { useEffect, useState } from "react";
import { getLeaveApplicationDetails } from "../../../api";

const LeaveApplicationDetails = ({ applicationId, setDetailsModal }) => {
  const [status, setStatus] = useState("");
  const [details, setDetails] = useState({});
  useEffect(() => {
    const fetchLeaveApplicationDetails = async () => {
      try {
        const res = await getLeaveApplicationDetails(applicationId);
        setStatus(res.status);
        setDetails(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLeaveApplicationDetails();
  }, []);
  
  const capitalizeFirstLetter = (string) => {
    if (!string) return ""; 
    return string.charAt(0).toUpperCase() + string.slice(1);
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
  }
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
            <div className="mt-3  sm:mt-0 sm:ml-4 ">
              <h3
                className="text-lg leading-6 font-medium text-gray-900 mb-4 text-center border-b"
                id="modal-headline"
              >
                Leave Application Details
              </h3>
              <div>
                <div className=" flex flex-col gap-5">
                  <div className="grid grid-cols-2">
                    <label
                      htmlFor="leaveCategory"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Status :
                    </label>
                    <p className={`${status === "approved"&& "text-green-400"} ${status === "rejected" && "text-red-400"}`} >{capitalizeFirstLetter(status)}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <label
                      htmlFor="leaveCategory"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Employee Name :
                    </label>
                    <p>{`${details.first_name} ${details.last_name}`}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <label
                      htmlFor="leaveCategory"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      From :
                    </label>
                    <p>{details.start_date}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <label
                      htmlFor="leaveCategory"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      To :
                    </label>
                    <p>{details.end_date}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <label
                      htmlFor="leaveCategory"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Total leave Days :
                    </label>
                    <p>{calculateTotalDays(details.start_date, details.end_date)} days</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <label
                      htmlFor="leaveCategory"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Half day date :
                    </label>
                    <p>{details.half_day_selection ? details.half_day_selection : "No half days"}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <label
                      htmlFor="leaveCategory"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Reason for leave :
                    </label>
                    <p>{details.reason}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => setDetailsModal(false)}
          >
            Close
          </button>
        </div>
        </div>
        {/* Modal footer */}
      </div>
    </div>
  );
};

export default LeaveApplicationDetails;
