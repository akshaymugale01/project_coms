import React from 'react'
import Navbar from '../../../components/Navbar'
import { NavLink } from 'react-router-dom'

function EmployeeProjectRequestApproval() {
  return (
    <section className='flex'>
      <Navbar/>
      <div className='w-full flex flex-col overflow-hidden'>
        <div className="flex justify-center my-2 w-full">
          <div className="sm:flex flex-wrap grid grid-cols-2 sm:flex-row gap-2 text-sm font-medium p-2 rounded-md text-white">
            <NavLink
              to={"/employee/certificate/course"}
              className={({ isActive }) => `p-1 ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Certificate
            </NavLink>
            <NavLink
              to={"/employee/certificate/rr-certificate"}
              className={({ isActive }) => `p-1 ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              RR Certificate
            </NavLink>
            <NavLink
              to={"/employee/certificate/course-request-approval"}
              className={({ isActive }) => `p-1 ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Course Request & Approval
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-request-approval"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Project Request & Approval
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-tracking"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Project Tracking
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-repository"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Project Repository
            </NavLink>
            <NavLink
              to={"/employee/certificate/knowledge-base"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Knowledge Base
            </NavLink>
          </div>
        </div>
        <div className="flex justify-center my-2 w-full">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-1 sm:rounded-full rounded-md opacity-90 bg-gray-200">
            <NavLink
              to={"/employee/certificate/project-request-approval/request"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Request
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-request-approval/approved"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Approved
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-request-approval/rejected"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Rejected
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmployeeProjectRequestApproval