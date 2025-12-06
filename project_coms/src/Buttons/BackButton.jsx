import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
const BackButton = ({to}) => {
  return (
    <div>
      <ul className="p-2 bg-black rounded-xl flex max-w-screen w-fit mx-1 text-white text-md text-center justify-between flex-wrap gap-2 ">
          <NavLink
            to={to}
            className={({ isActive }) =>
              ` ${
                isActive
                  ? "text-black bg-white p-2 font-medium rounded-md item-start  text-sm "
                  : "  items-center text-sm  font-medium p-2 hover:bg-white hover:text-black rounded-md "
              }`
            }
          >
            <IoMdArrowBack />
          </NavLink>
        </ul>
    </div>
  )
}

export default BackButton
