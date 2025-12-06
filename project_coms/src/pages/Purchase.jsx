import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MaterialPR from "./MaterialPR";
import PO from "./PO";
import Navbar from "../components/Navbar";
import LetterOfIndent from "./LetterOfIndent";
import { useSelector } from "react-redux";

const Purchase = () => {
  const [page, setPage] = useState("loi");
 
  return (
    <div className="flex lg:flex-row flex-col gap-2 relative items-center justify-center w-full">
      <div className="sm:flex grid grid-cols-2 flex-wrap text-sm md:text-base sm:flex-row gap-5 font-medium p-2 xl:rounded-full rounded-md opacity-90 bg-gray-200 ">
        <NavLink
          to={"/admin/purchase/loi"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          LOI
        </NavLink>
        <NavLink
          to={"/admin/purchase/material-pr"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Material PR
        </NavLink>
        <NavLink
          to={"/admin/purchase/po"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          PO
        </NavLink>
      </div>
    </div>
  );
};

export default Purchase;
