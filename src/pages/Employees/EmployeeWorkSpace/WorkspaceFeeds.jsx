import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import EmployeePortal from "../../../components/navbars/EmployeePortal";

const WorkspaceFeeds = () => {


 
  return (
    <section className="flex">
      <Navbar />
      <div className="p-2 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <EmployeePortal />
        <div className="my-2">
         
        </div>
      </div>
    </section>
  );
};



export default WorkspaceFeeds
