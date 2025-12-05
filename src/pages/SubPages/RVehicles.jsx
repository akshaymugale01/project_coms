import React, { useEffect, useState } from "react";
//import Navbar from '../../components/Navbar'
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import RVehiclesTable from "./RVehiclesTable";
import RVehiclesHistory from "./RVehiclesHistory";
import Navbar from "../../components/Navbar";
import Passes from "../Passes";
import { getRegisteredVehicle } from "../../api";

const RVehicles = () => {
  const [page, setPage] = useState("All");

  const [selectedVisitor, setSelectedVisitor] = useState(null);
 
  return (
    <div className="visitors-page">
      <section className="flex">
        <Navbar />
        <div className=" w-full flex mx-3 flex-col overflow-hidden">
          <Passes />
          <div className="flex   m-2 w-full">
            <div className="gap-5 text-lg font-semibold w-full  border-b border-gray-300 ">
              <div className="flex w-full space-x-4 ">
                <h2
                  className={`p-2 ${
                    page === "All"
                      ? "text-blue-500 bg-white shadow-custom-all-sides rounded-t-md"
                      : "text-black"
                  }   px-4 cursor-pointer text-center text-sm`}
                  onClick={() => setPage("All")}
                >
                  All
                </h2>
                <h2
                  className={`p-2 ${
                    page === "History"
                      ? "text-blue-500 bg-white shadow-custom-all-sides rounded-t-md"
                      : "text-black"
                  }  px-4 cursor-pointer text-center text-sm`}
                  onClick={() => setPage("History")}
                >
                  History
                </h2>
              </div>
            </div>
          </div>

          {page === "All" && <RVehiclesTable />}

          {page === "History" && (
            <div>
              <RVehiclesHistory />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RVehicles;
