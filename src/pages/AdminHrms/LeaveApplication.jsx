import React, { useState } from "react";
import AdminHRMS from "./AdminHrms";
import LeavePendingApp from "./LeavePendingApp";
import LeaveCompleted from "./LeaveCompleted";

const LeaveApplication = () => {
  const [page, setPage] = useState("Pending");
  return (
    <div className="flex ml-20">
      <AdminHRMS />
      <div className=" w-full my-2 flex  overflow-hidden flex-col">
        <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
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
        </div>
        {page === "Pending" && (
          <div >
            <LeavePendingApp />
          </div>
        )}
        {page === "Completed" && <LeaveCompleted />}
      </div>
    </div>
  );
};

export default LeaveApplication;
