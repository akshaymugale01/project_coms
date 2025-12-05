import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PermitList from "./SubPages/PermitList";
import PermitPendingApproval from "./PermitPendingApproval";




const Permit = () => {
  const [page, setPage] = useState("permit");
  return (
    <section className="flex">
      <Navbar />
      <div className="p-2 w-full flex  overflow-hidden flex-col">
        <div className="flex justify-center w-full">
        <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-1 sm:rounded-full rounded-md bg-gray-200">
            <h2
              className={`p-1 ${
                page === "permit" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              onClick={() => setPage("permit")}
            >
              Permit
            </h2>
            <h2
              className={`p-1 ${
                page === "Pending Approvals" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer transition-all duration-300 ease-linear`}
              onClick={() => setPage("Pending Approvals")}
            >
              Pending Approvals
            </h2>
          </div>
        </div>
        {page === "permit" && (
        <div className="transition-all duration-300 ease-linear">
            <PermitList/>
            </div>
        )} 
        {page === "Pending Approvals" && (
        <div className="transition-all duration-300 ease-linear">
           <PermitPendingApproval/>
            </div>
        )} 
      </div>
    </section>
  );
};

export default Permit;