import React, { useState } from 'react'
import Navbar from '../../../components/Navbar';
import { Link } from 'react-router-dom';
import { BsFillChatRightTextFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import EmployeeBroadcast from './EmployeeBroadcast';
import EmployeePolls from './EmployeePoll';
import EmployeeForum from './EmployeeForum';
import EmployeeNotification from './EmployeeNotification';
import image from "/profile.png";
import EmployeeGroup from './EmployeeGroup';
import EmployeeEvents from './EmployeeEvents';
import {  NavLink } from "react-router-dom";

const EmployeeCommunication = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [page, setPage] = useState("empolyeeEvent");
  return (
    <section className='flex'>
    
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-center my-2">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200 ">
          <NavLink
          to={"/employee/communication/events"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Events
        </NavLink>
        <NavLink
          to={"/employee/communication/broadcast"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Broadcast
        </NavLink>
        <NavLink
          to={"/employee/communication/polls"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Polls
        </NavLink>
        <NavLink
          to={"/employee/communication/forum"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
         Forum
        </NavLink>
        <NavLink
          to={"/employee/communication/groups"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Groups
        </NavLink>
          </div>
          <Link to={`/employee/employee-communication-chatbot`}>
          <div  className="fixed bottom-10 right-5 ">
            <BsFillChatRightTextFill size={36} color={themeColor}/>
          </div>
        </Link>
        
        </div>
        
      </div>
    </section>
  )
}

export default EmployeeCommunication