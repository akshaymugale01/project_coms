import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Events from "./SubPages/Events";
import Broadcast from "./SubPages/Broadcast";
import Polls from "./SubPages/Polls";
import Notification from "./SubPages/Notification";
import {  NavLink } from "react-router-dom";

// import Forum from "./SubPages/Forum";

import Groups from "./SubPages/Groups";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Forum from "./SubPages/Forum";
import CommunicationDashboard from "./SubPages/CommunicationDashboard";


const Communication = () => {
  const themeColor = useSelector((state) => state.theme.color);
  
  // const [page, setPage] = useState("event");
  return (
    <section className="flex">
      
      <div className="w-full flex mx-3 flex-col overflow-hidden">
      <div className="flex lg:flex-row flex-col gap-2 relative items-center justify-center w-full">
      <div className="sm:flex grid grid-cols-2 flex-wrap text-sm md:text-base sm:flex-row gap-5 font-medium p-2 xl:rounded-full rounded-md opacity-90 bg-gray-200 ">
          <NavLink
          to={"/communication/events"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Events
        </NavLink>
        <NavLink
          to={"/communication/broadcast"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Broadcast
        </NavLink>
        <NavLink
          to={"/communication/polls"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Polls
        </NavLink>
        <NavLink
          to={"/communication/forum"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
         Forum
        </NavLink>
        <NavLink
          to={"/communication/groups"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Groups
        </NavLink>
        
            {/* <h2
              className={`p-1 ${
                page === "event" && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
              onClick={() => setPage("event")}
            >
              Events
            </h2>
            <h2
              className={`p-1 ${
                page === "broadcast" && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
              onClick={() => setPage("broadcast")}
            >
              Broadcast
            </h2>
            <h2
              className={`p-1 ${
                page === "polls" && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
              onClick={() => setPage("polls")}
            >
              Polls
            </h2>
            <h2
              className={`p-1 ${
                page === "forum" && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
              onClick={() => setPage("forum")}
            >
              Forum
            </h2>
            <h2
              className={`p-1 ${
                page ==="groups" && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
              onClick={() => setPage("groups")}
            >
              Groups
            </h2> */}
          </div>
        </div>
        {/* <Link to={`/admin/communication-charbot`} className="fixed bottom-10 right-5 ">
          <BsFillChatRightTextFill size={36} color={themeColor}/>
        </Link> */}
        {/* <Link  className="fixed top-3 right-20 ">
          <Notification/>
        </Link> */}
        
        {/* <Link to={`/admin/communication-charbot`}>
          <div  className="fixed bottom-10 right-5  z-20">
            <BsFillChatRightTextFill size={36} color={themeColor}/>
          </div>
        </Link> */}
        
        {/* {page === "event" && (
          <div>
           <Events/>
          </div>
        )}
        {page === "broadcast" && (
          <div>
           <Broadcast/>
          </div>
        )}
        {page === "polls" && (
          <div>
           <Polls/>
          </div>
        )}
        {page === "forum" && (
          <div>
           <Forum/>
          </div>
        )}
       {page === "groups" && (
          <div>
           <Groups/>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default Communication;