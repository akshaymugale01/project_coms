import React from "react";
import { NavLink } from "react-router-dom";
import { BiLock } from "react-icons/bi";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";

const Account = () => {
  const themeColor = useSelector((state)=> state.theme.color)
  return (
  
      <div className="flex justify-center w-full my-1 ">
        <div className="w-full mx-2 ">
        <ul
        style={{background: themeColor}}
        className="p-2 bg-black rounded-xl flex max-w-screen w-full  items-center text-white text-md text-center   gap-2 ">
            {/* <NavLink to={"/setup"}
            
            className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white p-2 font-medium rounded-md  items-center text-sm "
                    : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
                }`
              }
             >
              <IoMdArrowBack/>

              
            </NavLink> */}
              <div className="flex justify-center w-full gap-4">
            {/* <NavLink to={"/setup/account/organisation"}
            
            className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white p-2 font-medium rounded-md  items-center text-sm "
                    : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
                }`
              }
             >
              Organization
            </NavLink> */}
          {/* <NavLink to={"/setup/account/company"} className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white p-2 font-medium rounded-md  items-center text-sm "
                    : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
                }`
              }>Company</NavLink>
          <NavLink to={"/setup/account/country"} className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white p-2 font-medium rounded-md  items-center text-sm "
                    : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
                }`
              }>Country</NavLink>
          <NavLink to={"/setup/account/region"} className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white p-2 font-medium rounded-md  items-center text-sm "
                    : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
                }`
              }>Region</NavLink>
          <NavLink to={"/setup/account/zone"} className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white p-2 font-medium rounded-md  items-center text-sm "
                    : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
                }`
              }>Zone</NavLink>
          <NavLink to={"/setup/account/site"} className={({ isActive }) =>
                `flex gap-1 ${
                  isActive
                    ? "text-black bg-white p-2 font-medium rounded-md  items-center text-sm "
                    : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
                }`
              }>Site <BiLock/></NavLink>
          <NavLink to={"/setup/account/entity"} className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white p-2 font-medium rounded-md  items-center text-sm "
                    : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
                }`
              }>Entity</NavLink> */}
          {/* <NavLink to={"/setup/account/building"} className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white p-2 font-medium rounded-md  items-center text-sm "
                    : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
                }`
              }>Building</NavLink> */}
          {/* <NavLink to={"/setup/account/wing"} className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white p-2 font-medium rounded-md  items-center text-sm "
                    : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
                }`
              }>Wing</NavLink>
          <NavLink to={"/setup/account/area"} className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white p-2 font-medium rounded-md  items-center text-sm "
                    : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
                }`
              }>Area</NavLink> */}
          <NavLink to={"/setup/account/floor"} className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white p-2 font-medium rounded-md  items-center text-sm "
                    : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
                }`
              }>Floor</NavLink>
          <NavLink to={"/setup/account/unit"} className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white p-2 font-medium rounded-md  items-center text-sm "
                    : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
                }`
              }>Unit</NavLink>
          {/* <NavLink to={"/setup/account/room"} className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white p-2 font-medium rounded-md  items-center text-sm "
                    : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
                }`
              }>Room</NavLink> */}
              </div>
          </ul>
        </div>
      </div>
   
  );
};

export default Account;
