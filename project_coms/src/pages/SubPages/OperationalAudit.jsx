import React, { useState } from "react";
import ScheduledAudit from "./AuditSubPages/ScheduledAudit";
import ConductedAudit from "./AuditSubPages/ConductedAudit";
import AuditChecklist from "./AuditSubPages/AuditChecklist";

const OperationalAudit = () => {
  const [page, setPage] = useState("scheduled");
 
  return (
    <div className=" w-full my-2 flex  overflow-hidden flex-col">
      <div className="flex w-full">
        <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
          <h2
            className={`p-1 ${
              page === "scheduled" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("scheduled")}
          >
            Scheduled
          </h2>
          <h2
            className={`p-1 ${
              page === "conducted" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("conducted")}
          >
            Conducted
          </h2>
          <h2
            className={`p-1 ${
              page === "checklists" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("checklists")}
          >
            Checklists
          </h2>
        </div>
      </div>
      <div>
        {page === "scheduled" && <ScheduledAudit/> }
        {page === "conducted" && <ConductedAudit/> }
        {page === "checklists" && <AuditChecklist/> }
      </div>
    </div>
  );
};

export default OperationalAudit;
