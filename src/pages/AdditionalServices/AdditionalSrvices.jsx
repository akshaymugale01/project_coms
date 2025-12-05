import React, { useState } from "react";

import Navbar from "../../components/Navbar"
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import AdditionalSetup from "./AdditionalSetup";
import Schedule from "./Schedule";

const AdditionalServices = () => {
    const [page, setPage] = useState("Additional Setup");

  return (
    <div className="flex gap-4">
       <Navbar />
    <div className=" w-full my-2 flex  overflow-hidden flex-col">

    <div className="flex w-full justify-center">
      <div className=" flex justify-center gap-2 p-2 bg-gray-100 rounded-full ">
        <h2
          className={`p-1 ${
            page === "Additional Setup" &&
            `bg-white font-medium text-blue-500 shadow-custom-all-sides`
          } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
          onClick={() => setPage("Additional Setup")}
        >
           Setup
        </h2>
        <h2
          className={`p-1 ${
            page === "Schedule" &&
            "bg-white font-medium text-blue-500 shadow-custom-all-sides"
          } rounded-full px-4 cursor-pointer transition-all duration-300 ease-linear`}
          onClick={() => setPage("Schedule")}
        >
          Schedule
        </h2>
      </div>
    </div>
    <div>

    {page === "Additional Setup" &&  <AdditionalSetup/>}
    {page === "Schedule" &&  <Schedule />}
      
    </div>
  </div>
  </div>
  )
}

export default AdditionalServices