import React, { useState } from "react";

import TicketSetupPage from "./TicketSetupPage";
import TicketEscalationSetup from "./TicketEsclationSetup";
import TicketCostApprovalSetup from "./TicketCostApprovalSetup";

import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const TicketSetup = () => {
    const [page, setPage] = useState("Setup");

  return (
    <div className="flex gap-4">
       <Navbar/>
    <div className=" w-full my-2 flex  overflow-hidden flex-col">

    <div className="flex w-full justify-center">
      <div className=" flex justify-center gap-2 p-2 bg-gray-100 rounded-full ">
        <h2
          className={`p-1 ${
            page === "Setup" &&
            `bg-white font-medium text-blue-500 shadow-custom-all-sides`
          } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
          onClick={() => setPage("Setup")}
        >
           Setup
        </h2>
        <h2
          className={`p-1 ${
            page === "Escalation Setup" &&
            "bg-white font-medium text-blue-500 shadow-custom-all-sides"
          } rounded-full px-4 cursor-pointer transition-all duration-300 ease-linear`}
          onClick={() => setPage("Escalation Setup")}
        >
          Escalation Setup
        </h2>
        <h2
          className={`p-1 ${
            page === "Cost Approval" &&
            "bg-white font-medium text-blue-500 shadow-custom-all-sides"
          } rounded-full px-4 cursor-pointer transition-all duration-300 ease-linear`}
          onClick={() => setPage("Cost Approval")}
        >
          Cost Approval
        </h2>


      </div>
    </div>
    <div>

    {page === "Setup" &&  <TicketSetupPage/>}
    {page === "Escalation Setup" &&  <TicketEscalationSetup/>}
    {page === "Cost Approval" &&  <TicketCostApprovalSetup/>}
      
    </div>
  </div>
  </div>
  )
}

export default TicketSetup