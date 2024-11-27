import React from "react";
import { MdOutlineWidgets } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const AssetNav = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-2 relative items-center justify-center w-full">
      <div className="sm:flex grid grid-cols-2 flex-wrap text-sm md:text-base sm:flex-row gap-5 font-medium p-2 xl:rounded-full rounded-md opacity-90 bg-gray-200 ">
        <NavLink
          to={"/assets/all-assets"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Assets
        </NavLink>
        <NavLink
          to={"/assets/amc"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          AMC
        </NavLink>
        <NavLink
          to={"/assets/meter"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Meter
        </NavLink>
        <NavLink
          to={"/assets/checklist"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Checklist
        </NavLink>
        <NavLink
          to={"/assets/routine-task"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Routine Task
        </NavLink>
        <NavLink
          to={"/assets/ppm"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          PPM Checklist
        </NavLink>
        <NavLink
          to={"/assets/ppm-task"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          PPM Activity
        </NavLink>
        <NavLink
          to={"/assets/stock-items"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Stock Items
        </NavLink>
      </div>
      <Link to={"/assets/overview"} className="lg:absolute right-0  shadow-custom-all-sides p-1 rounded-full cursor-pointer  hover:text-blue-500 transition-all duration-300 bg-gray-200 "><MdOutlineWidgets size={30} /></Link>
    </div>
  );
};

export default AssetNav;
