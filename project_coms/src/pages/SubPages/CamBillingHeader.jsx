import React from "react";
import { NavLink } from "react-router-dom";

function CamBillingHeader() {
  return (
    <div className="flex lg:flex-row flex-col gap-2 relative items-center justify-center w-full my-5">
      <div className="sm:flex grid grid-cols-2 flex-wrap text-sm md:text-base sm:flex-row gap-5 font-medium p-2 xl:rounded-full rounded-md opacity-90 bg-gray-200 ">
        <NavLink
          to={"/cam_bill/billing"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Cam Billing
        </NavLink>
        <NavLink
          to={"/cam_bill/reciept-invoice"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Receipt Invoice
        </NavLink>
      </div>
    </div>
  );
}

export default CamBillingHeader;
