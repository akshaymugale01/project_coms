import React from "react";
import { NavLink } from "react-router-dom";

const ProcessHistoryNav = () => {
  return (
    <div>
      <div className="w-72 h-full bg-white mx-1 border border-gray-300 rounded-xl p-4 mt-9">
        <ul className="space-y-4">
          <li className="font-bold text-lg">Details</li>
          <div className="flex flex-col gap-2">
            <NavLink
              to="/process-history/expense-process-history"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-white bg-blue-500 flex p-2 gap-3.5 rounded-md group items-center text-sm font-medium"
                    : "group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-50 rounded-md"
                }`
              }
            >
              Expense Process History
            </NavLink>
            <NavLink
              to="/process-history/advance-expense-process-history"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-white bg-blue-500 flex p-2 gap-3.5 rounded-md group items-center text-sm font-medium"
                    : "group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-50 rounded-md"
                }`
              }
            >Advance Expense Process History</NavLink>
          </div>
        </ul>
      </div>
    </div>
  );
};




export default ProcessHistoryNav
