import React, { useState } from "react";
import PermitTypeTable from "./SetupSubPages/PermitTypeTable";
import PermitActivityTable from "./SetupSubPages/PermitActivityTable";
import PermitSubActivityTable from "./SetupSubPages/PermitSubActivityTable";
import PermitHazardCategoryTable from "./SetupSubPages/PermitHazardCategoryTable";

import PermitRiskTable from "./SetupSubPages/PermitRiskTable";
const PermitSetup = () => {
  const [page, setPage] = useState("Permit Type");
  return (
    <div className=" w-full my-2 flex  overflow-hidden flex-col">
      <div className="flex w-full">
        <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
          <h2
            className={`p-1 ${
              page === "Permit Type" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("Permit Type")}
          >
            Permit Type
          </h2>
          <h2
            className={`p-1 ${
              page === "Permit Activity" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Permit Activity")}
          >
            Permit Activity
          </h2>
          <h2
            className={`p-1 ${
              page === "Permit Sub Activity" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Permit Sub Activity")}
          >
            Permit Sub Activity
          </h2>
          <h2
            className={`p-1 ${
              page === "Permit Hazard Category" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Permit Hazard Category")}
          >
            Permit Hazard Category
          </h2>
          <h2
            className={`p-1 ${
              page === "Permit Risk" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Permit Risk")}
          >
            Permit Risk
          </h2>
          <h2
            className={`p-1 ${
              page === "Permit Safety Equipment" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Permit Safety Equipment")}
          >
            Permit Safety Equipment
          </h2>
        </div>
      </div>
      <div>
        {page === "Permit Type" && (
          <div>
            <PermitTypeTable />
          </div>
        )}
        {page === "Permit Activity" && <PermitActivityTable />}
        {page === "Permit Sub Activity" && <PermitSubActivityTable />}
        {page === "Permit Hazard Category" && <PermitHazardCategoryTable />}
        {page === "Permit Risk" && <PermitRiskTable />}
      </div>
    </div>
  );
};

export default PermitSetup;
