import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function SkillGrowHeaderComponent() {
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <section>
      <div className=''>
        <div className="flex justify-center my-2 w-full">
          <div
            className="sm:flex flex-wrap grid grid-cols-2 sm:flex-row gap-5 font-medium p-2 rounded-md text-white"
            style={{ background: themeColor }}
          >
            <NavLink
              to={"/admin/skill-grow/course"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Courses
            </NavLink>
            <NavLink
              to={"/admin/skill-grow/projects"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Projects
            </NavLink>
            <NavLink
              to={"/admin/skill-grow/employee-profile"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Employee
            </NavLink>
            <NavLink
              to={"/admin/skill-grow/instructor"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Instructor
            </NavLink>
            <NavLink
              to={"/admin/skill-grow/dashboard"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Dashboard
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillGrowHeaderComponent;
