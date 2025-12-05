import React, { useState } from "react";
import AdminHRMS from "./AdminHrms";

import LetterTable from "./LetterTable";
import LetterTableCompleted from "./LetterTableCompleted";
import ActiveEmployees from "./ActiveEmployees";
import ProcessedEmployees from "./ProcessedEmployees";

const EditAttendanceProcess = () => {
  const [page, setPage] = useState("Active Employees");
  return (
    <div className="flex">
       <AdminHRMS/>
       <div className="ml-20 w-full">
        <p className="text-2xl text-center mt-6 font-bold">Running Attendance Process for June - 2024</p>
       <p className="text-center font-semibold">Running Attendance Process is No More Tedious</p>
    <div className=" w-full my-2 flex  overflow-hidden flex-col ">



        <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">

          <h2
            className={`p-1 ${
              page === "Active Employees" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("Active Employees")}
          >
            Active Employees
          </h2>
          <h2
            className={`p-1 ${
              page === "Processed Employees" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Processed Employees")}
          >
            Processed Employees
          </h2>


        </div>
        {page === "Active Employees" && (
          <div className="mr-2">
            <ActiveEmployees/>
          </div>
        )}
        {page === "Processed Employees" && <div className="mr-2"><ProcessedEmployees/> </div> }
      </div>
      <div>


      </div>
      </div>
    </div>
  );
};

export default EditAttendanceProcess