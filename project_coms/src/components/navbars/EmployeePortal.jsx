import React from "react";
import { BsTicketPerforated } from "react-icons/bs";
import { MdOutlineWidgets } from "react-icons/md";
import { RiSurveyFill, RiSurveyLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";

const EmployeePortal = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-2 relative items-center justify-center w-full">
      <div className="sm:flex grid grid-cols-2  text-sm md:text-base sm:flex-row gap-5 font-medium p-2 lg:rounded-full rounded-md opacity-90 bg-gray-200 ">
        {/* <NavLink
          to={"/employee-portal/employee-feeds"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Feeds
        </NavLink> */}
         <NavLink
          to={"/employee-portal/attendance"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Attendance
        </NavLink>
      
        <NavLink
          to={"/employee-portal/docs"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Documents
        </NavLink>
        <NavLink
          to={"/employee-portal/Leave"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Leave
        </NavLink>
        <NavLink
          to={"/employee-portal/roster"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
         Roster
        </NavLink>
        <NavLink
          to={"/employee-portal/payslip"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Payslip
        </NavLink>
        <NavLink
          to={"/employee-portal/timesheet"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Timesheet
        </NavLink>
        <NavLink
          to={"/employee-portal/esic"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          ESIC
        </NavLink>

      </div>

      
      <Link to={"/employee-portal/survey"} className="lg:absolute right-0  shadow-custom-all-sides p-1 rounded-full cursor-pointer hover:text-blue-500 transition-all duration-300 bg-gray-200 "><RiSurveyLine size={30} title="Survey" /></Link>
      <Link to={"/mytickets/userticket"} className="lg:absolute right-14  shadow-custom-all-sides p-1 rounded-full cursor-pointer hover:text-blue-500 transition-all duration-300 bg-gray-200 "><BsTicketPerforated  size={30} title="Grievance Management" /></Link>
    </div>
  );
};




export default EmployeePortal
