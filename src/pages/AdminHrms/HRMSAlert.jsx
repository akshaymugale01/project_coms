import React, { useState } from "react";
import AdminHRMS from "./AdminHrms.jsx";
import AlertTasks from "./AlertTasks.jsx";
import PendingRequest from "./PendingRequest.jsx";
import ProcessAlert from "./ProcessAlert.jsx";
import SetupIssues from "./SetupIssues.jsx";
import { useNavigate, NavLink,useLocation } from "react-router-dom";

import LeaveSetting from "./LeaveSetting.jsx";



const HRMSAlert = () => {
  
  return (
    
      <section className="">
       <AdminHRMS/>
        
              {/* <h2
                className={`p-1 ${
                  page === "Pending Requests" && "bg-white text-blue-500"
                } md:rounded-full rounded-sm px-4 cursor-pointer text-center text-sm`}
                onClick={() => setPage("Pending Requests")}
              >
                Pending Requests
              </h2>
              <h2
                className={`p-1 ${
                  page === "Setup Issues" && "bg-white text-blue-500"
                } md:rounded-full rounded-sm px-4 cursor-pointer text-center text-sm`}
                onClick={() => setPage("Setup Issues")}
              >
               Setup Issues
              </h2>
              <h2
                className={`p-1 ${
                  page === "Process Alerts" && "bg-white text-blue-500"
                } md:rounded-full rounded-sm px-4 cursor-pointer text-center text-sm`}
                onClick={() => setPage("Process Alerts")}
              >
                Process Alerts
              </h2>
              <h2
                className={`p-1 ${
                  page === "Tasks" && "bg-white text-blue-500"
                } md:rounded-full rounded-sm px-4 cursor-pointer text-center text-sm`}
                onClick={() => setPage("Tasks")}
              >
                Tasks
              </h2> */}
               <div className="flex justify-center w-full"> 
      <div className="sm:flex grid grid-cols-2 text-sm md:text-base sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200 ">
        <NavLink
          to={"/admin/hrms/alerts/pending-request"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Pending Requests
        </NavLink>
        <NavLink
          to={"/admin/hrms/alerts/Setup-Issues"}
          className={({ isActive }) =>
            ` md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Setup Issues
        </NavLink>
        <NavLink
          to={"/admin/hrms/alerts/Process-Alerts"}
          className={({ isActive }) =>
            ` md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Process Alerts
        </NavLink>
        <NavLink
          to={"/admin/hrms/alerts/tasks"}
          className={({ isActive }) =>
            ` md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
         Tasks
        </NavLink>
       
      </div>
      </div>

           
          {/* {page === "Pending Requests" && (
            <div>
              <PendingRequest/>
            </div>
          )}
          {page === "Setup Issues" && (
            <div>
              <SetupIssues/>
             
            </div>
          )}
          {page === "Process Alerts" && (
            <div>
              <ProcessAlert/>
            </div>
          )}
          {page === "Tasks" && (
            <div>
              <AlertTasks/>
            </div>
          )} */}

       
      </section>
    
  );
};

export default HRMSAlert;