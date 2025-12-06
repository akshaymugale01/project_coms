import React, { useState } from "react";
import Navbar from "../components/Navbar";
import OperationalAudit from "./SubPages/OperationalAudit";
import VendorAudit from "./SubPages/VendorAudit";

const Audit = () => {
  const [page, setPage] = useState("operational");
  return (
    <section className="flex">
      <Navbar />
      <div className="p-2 w-full flex  overflow-hidden flex-col">
        <div className="flex justify-center w-full">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-1 sm:rounded-full rounded-md bg-gray-200">
            <h2
              className={`p-1 ${
                page === "operational" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              onClick={() => setPage("operational")}
            >
              Operational
            </h2>
            <h2
              className={`p-1 ${
                page === "vendor" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer transition-all duration-300 ease-linear`}
              onClick={() => setPage("vendor")}
            >
              Vendor
            </h2>
          </div>
        </div>
        {page === "operational" && (
          <div className="transition-all duration-300 ease-linear">
            <OperationalAudit />
          </div>
        )}
        {page === "vendor" && (
          <div className="transition-all duration-300 ease-linear">
            <VendorAudit />
          </div>
        )}
      </div>
    </section>
  );
};

export default Audit;
