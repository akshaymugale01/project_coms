import React, { useState } from "react";
import Navbar from "../components/Navbar";
import VisitorPage from "./SubPages/VisitorPage";
import RVehicles from "./SubPages/RVehicles";
import GVehicles from "./SubPages/GVehicles.jsx";
import Staff from "./SubPages/Staff.jsx";
import MaterialPass from "./MaterialsPass.jsx";
import Patrolling from "./SubPages/Patrolling.jsx";
import GoodsInOut from "./SubPages/GoodsInOut.jsx";
import { NavLink } from "react-router-dom";
// import EmployeeStaff from './SubPages/EmployeeStaff.jsx';
// import EmployeeMaterial from './SubPages/EmployeeMaterial.jsx';
// import Patrolling from './SubPages/Patrolling.jsx';
// import GoodsInOut from './SubPages/GoodsInOut.jsx';

const Passes = () => {
  const [page, setPage] = useState("Visitor");
  return (

    <div className="flex lg:flex-row my-2 flex-col gap-2 relative items-center justify-center w-full">
    <div className="sm:flex grid grid-cols-2 flex-wrap text-sm md:text-base sm:flex-row gap-5 font-medium p-2 xl:rounded-full rounded-md opacity-90 bg-gray-200 ">
      <NavLink
        to={"/admin/passes/visitors"}
        className={({ isActive }) =>
          `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
            isActive && "bg-white text-blue-500 shadow-custom-all-sides"
          }`
        }
      >
        Visitor
      </NavLink>
      <NavLink
         to={"/admin/passes/registered-vehicles"}
        className={({ isActive }) =>
          `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
            isActive && "bg-white text-blue-500 shadow-custom-all-sides"
          }`
        }
      >
        Registered Vehicles
      </NavLink>
      {/* <NavLink
         to={"/admin/passes/guest-vehicles"}
        className={({ isActive }) =>
          `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
            isActive && "bg-white text-blue-500 shadow-custom-all-sides"
          }`
        }
      >
        G Vehicles
      </NavLink> */}
      <NavLink
         to={"/admin/passes/staff"}
        className={({ isActive }) =>
          `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
            isActive && "bg-white text-blue-500 shadow-custom-all-sides"
          }`
        }
      >
        Staff
      </NavLink>
      {/* <NavLink
        to={"/admin/passes/materials"}
        className={({ isActive }) =>
          `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
            isActive && "bg-white text-blue-500 shadow-custom-all-sides"
          }`
        }
      >
       Materials
      </NavLink> */}
      <NavLink
        to={"/admin/passes/patrolling"}
        className={({ isActive }) =>
          `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
            isActive && "bg-white text-blue-500 shadow-custom-all-sides"
          }`
        }
      >
       Patrolling
      </NavLink>
      <NavLink
        to={"/admin/passes/goods-in-out"}
        className={({ isActive }) =>
          `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
            isActive && "bg-white text-blue-500 shadow-custom-all-sides"
          }`
        }
      >
        Goods In/Out
      </NavLink>
      
  </div>
  </div>



   
  );
};

export default Passes;
