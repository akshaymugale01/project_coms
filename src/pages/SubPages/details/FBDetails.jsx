import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ImFileText2 } from "react-icons/im";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Import the necessary icons
import Navbar from "../../../components/Navbar";
import { useParams } from "react-router-dom";
import BackButton from "../../../Buttons/BackButton";
import { ArrowLeft } from 'lucide-react';
import { useSelector } from "react-redux";

const FBDetails = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const themeColor = useSelector((state) => state.theme.color);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const [open1, setOpen1] = useState(true);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);

  const toggleDropdown1 = () => {
    setDropdownOpen1(!dropdownOpen1);
  };

  return (
    <div className="flex ">
      <Navbar />
      <div className="w-64 border-r  bg-white  p-4 ">
        {/* <BackButton to={`/admin/fb`} /> */}
        <Link
          to={`/admin/fb`}
          style={{ background: themeColor }}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
        <ul className="space-y-4 mt-8 ">
          <li className="font-bold text-lg">Details List</li>

          <li>
            <NavLink
              to={`/admin/restaurant/details/${id}`}
              className={({ isActive }) =>
                `${isActive
                  ? "text-white bg-blue-500 flex p-2 gap-3.5 rounded-md group items-center text-sm font-medium"
                  : "group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-100 rounded-md"
                }`
              }
              // Set "Restaurant" as default open
              isActive={() => true} // Ensure this item is always "active" by default
            >
              <div>
                {React.createElement(ImFileText2, { size: "20" })}
              </div>
              <h2
                className={`whitespace-pre duration-300 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                Restaurtant
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                Restaurtant
              </h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/fnb/status-setup/${id}`}
              className={({ isActive }) =>
                `${isActive
                  ? "text-white bg-blue-500 flex p-2 gap-3.5 rounded-md group items-center text-sm font-medium"
                  : "group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-100 rounded-md"
                }`
              }
            >
              <div>
                {React.createElement(ImFileText2, { size: "20" })}
              </div>
              <h2
                className={`whitespace-pre duration-300 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                Status Setup
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                Status Setup
              </h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/fnb/category-setup/${id}`}
              className={({ isActive }) =>
                `${isActive
                  ? "text-white bg-blue-500 flex p-2 gap-3.5 rounded-md group items-center text-sm font-medium"
                  : "group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-100 rounded-md"
                }`
              }
            >
              <div>
                {React.createElement(ImFileText2, { size: "20" })}
              </div>
              <h2
                className={`whitespace-pre duration-300 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                Categories Setup
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                Categories Setup
              </h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/fnb/sub-category-setup/${id}`}
              className={({ isActive }) =>
                `${isActive
                  ? "text-white bg-blue-500 flex p-2 gap-3.5 rounded-md group items-center text-sm font-medium"
                  : "group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-100 rounded-md"
                }`
              }
            >
              <div>
                {React.createElement(ImFileText2, { size: "20" })}
              </div>
              <h2
                className={`whitespace-pre duration-300 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                Sub Categories Setup
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                Sub Categories Setup
              </h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/fnb/restaurtant-menu/${id}`}
              className={({ isActive }) =>
                `${isActive
                  ? "text-white bg-blue-500 flex p-2 gap-3.5 rounded-md group items-center text-sm font-medium"
                  : "group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-100 rounded-md"
                }`
              }
            >
              <div>
                {React.createElement(ImFileText2, { size: "20" })}
              </div>
              <h2
                className={`whitespace-pre duration-300 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                Restaurtant Menu
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                Restaurtant Menu
              </h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/admin/restaurtant-bookings/${id}`}
              className={({ isActive }) =>
                `${isActive
                  ? "text-white bg-blue-500 flex p-2 gap-3.5 rounded-md group items-center text-sm font-medium"
                  : "group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-100 rounded-md"
                }`
              }
            >
              <div>
                {React.createElement(ImFileText2, { size: "20" })}
              </div>
              <h2
                className={`whitespace-pre duration-300 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                Restaurtant Bookings
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                Restaurtant Bookings
              </h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/admin/restaurtant-orders/${id}`}
              className={({ isActive }) =>
                `${isActive
                  ? "text-white bg-blue-500 flex p-2 gap-3.5 rounded-md group items-center text-sm font-medium"
                  : "group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-100 rounded-md"
                }`
              }
            >
              <div>
                {React.createElement(ImFileText2, { size: "20" })}
              </div>
              <h2
                className={`whitespace-pre duration-300 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                Restaurtant Orders
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                Restaurtant Orders
              </h2>
            </NavLink>
          </li>


          <li>



          </li>


        </ul>
      </div>

    </div>
  );
};
export default FBDetails