import React, { useState } from "react";
import AdminHRMS from "./AdminHrms";
import LeavePendingApp from "./LeavePendingApp";
import LeavecycleFollower from "./LeaveCycleFollower";

const Rollover = () => {
  const [page, setPage] = useState("Leave cycle followers");
  return (
    <div className="flex ml-20">
      <AdminHRMS />
      <div className=" w-full my-2 flex  overflow-hidden flex-col">
        <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
          <h2
            className={`p-1 ${
              page === "Leave cycle followers" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("Leave cycle followers")}
          >
            Leave cycle Rollovers
          </h2>
          <h2
            className={`p-1 ${
              page === "work Anniversary Rollover" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("work Anniversary Rollover")}
          >
            Work Anniversary Rollover
          </h2>
          <h2
            className={`p-1 ${
              page === "Intra Rollover" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Intra Rollover")}
          >
            Intra Rollover
          </h2>
        </div>
        {page === "Leave cycle followers" && (
          <div>
            <LeavecycleFollower />
          </div>
        )}
        {page === "work Anniversary Rollover" && <LeavecycleFollower />}
        {page === "Intra Rollover" && <LeavecycleFollower />}
      </div>
      <div></div>
    </div>
  );
};

export default Rollover;
