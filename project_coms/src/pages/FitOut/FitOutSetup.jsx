import React, { useState } from "react";
import TicketSetupPage from "../Setup/TicketSetup/TicketSetupPage";
import { Navbar } from "@material-tailwind/react";
import FitOutSetupPage from "./FitOutSetupPage";

const FitOutSetup = () => {
  const [page, setPage] = useState("Setup");

  return (
    <div className="flex gap-4">
      <div className=" w-full flex  overflow-hidden flex-col">
        <FitOutSetupPage />
        <div></div>
      </div>
    </div>
  );
};

export default FitOutSetup;
