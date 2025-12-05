import React, { useState } from "react";
import AdminHRMS from "./AdminHrms";

import LetterTable from "./LetterTable";
import LetterTableCompleted from "./LetterTableCompleted";

const GenerationLetter = () => {
  const [page, setPage] = useState("Pending");
  return (
    <div className="flex">
       <AdminHRMS/>
    <div className=" w-full my-2 flex  overflow-hidden flex-col ml-20">



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
          <div>
            <LetterTable/>
          </div>
        )}
        {page === "Completed" && <LetterTableCompleted/>}
      </div>
      <div>


      </div>

    </div>
  );
};

export default GenerationLetter