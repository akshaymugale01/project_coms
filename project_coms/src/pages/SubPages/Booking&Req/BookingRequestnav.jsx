import React from "react";
import { MdOutlineWidgets } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const BookingRequestNav = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-2 relative items-center justify-center w-full">
      <div className="sm:flex grid grid-cols-2 flex-wrap text-sm md:text-base sm:flex-row gap-5 font-medium p-2 xl:rounded-full rounded-md opacity-90 bg-gray-200 ">
        <NavLink
          to={"/admin/booking-request/hotel-request"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Hotel Request
        </NavLink>
        <NavLink
          to={"/admin/booking-request/flight-ticket-request"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Flight Ticket Request
        </NavLink>
        <NavLink
          to={"/admin/booking-request/cab-bus-request"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Cab/Bus Request
        </NavLink>
        <NavLink
          to={"/admin/booking-request/transportation-request"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Transportation Request
        </NavLink>
        <NavLink
          to={"/admin/booking-request/traveling-allowance-request"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Travelling Allowance Request
        </NavLink>
       
      </div>
    </div>
  );
};

export default BookingRequestNav;
