import React, { useState } from "react";
import AdminHRMS from "../AdminHrms";
import ExpenseDetailsNav from "./ExpenseDetailsNav";
import PendingReports from "./PendingReports";
import CompletedReports from "./CompletedReports";
import { MdKeyboardArrowDown } from "react-icons/md";
import AdvancePending from "./AdvancePending";
import AdvanceCompleted from "./AdvanceCompleted";

const AdvanceReports = () => {
  const [page, setPage] = useState("Pending");
  return (
    <div className="flex">
      <AdminHRMS />
      <div className="ml-20">
        <ExpenseDetailsNav />
      </div>
      {/* <div> */}
      <div className=" w-full my-2 flex  overflow-hidden flex-col">
        <div className=" flex gap-2 p-2 pb-0 border-b border-gray-200 w-full">
          <h2
            className={`p-1 ${
              page === "Pending" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("Pending")}
          >
            Pending Reports
          </h2>
          <h2
            className={`p-1 ${
              page === "Completed" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Completed")}
          >
            Completed Reports
          </h2>
        </div>
        <div className="flex gap-2 justify-between m-2 items-center">
          <input
            type="text"
            placeholder="Search by employee"
            //   value={searchText}
            //   onChange={handleSearch}
            className="border border-gray-400 w-96 placeholder:text-sm rounded-md p-2"
          />
          <div className="flex gap-2">
            <button
              //   onClick={() => setIsModalOpen(true)}
              //   style={{ background: themeColor }}
              className="bg-black text-white hover:bg-gray-700 font-medium py-1 px-4 rounded-md"
            >
              Filter
            </button>
            <div className="relative inline-block text-left">
              <button
                // onClick={toggleDropdown}
                className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              >
                Actions
                <MdKeyboardArrowDown size={20} />
              </button>
            </div>
          </div>
        </div>
        {page === "Pending" && (
          <div>
            <AdvancePending />
          </div>
        )}
        {page === "Completed" && <AdvanceCompleted />}
      </div>
    </div>
    // </div>
  );
};

export default AdvanceReports;
