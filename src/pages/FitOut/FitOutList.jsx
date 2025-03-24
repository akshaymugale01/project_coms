import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from "react-router-dom";
import FitOutSetupPage from "./FitOutSetupPage";
import FitOutRequestPage from "./FitOutRequestPage";
import FitOutChecklistPage from "./FitOutChecklistPage";
import { FaBars, FaTimes } from "react-icons/fa";
import Navbar from "../../components/Navbar";

const FitOutList = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex">
      {/* Sidebar */}
      <Navbar />
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gray-900 text-white h-screen transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Toggle Button */}
        {/* <button
          className="p-4 text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button> */}

        {/* Sidebar Menu */}
        <nav className="flex flex-col gap-4 p-4">
          <NavLink
            to="/fitout/setup/page"
            className={({ isActive }) =>
              `p-3 rounded-md transition ${
                isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
              }`
            }
          >
            {isOpen ? "Fitout Setup" : "🛠"}
          </NavLink>
          <NavLink
            to="/fitout/request/list"
            className={({ isActive }) =>
              `p-3 rounded-md transition ${
                isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
              }`
            }
          >
            {isOpen ? "Fitout Request" : "📋"}
          </NavLink>
          <NavLink
            to="/fitout/checklist/list"
            className={({ isActive }) =>
              `p-3 rounded-md transition ${
                isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
              }`
            }
          >
            {isOpen ? "Fitout Checklist" : "✅"}
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2">
        <Routes>
          <Route path="/fitout/setup/page" element={<FitOutSetupPage />} />
          <Route path="/fitout/request/list" element={<FitOutRequestPage />} />
          <Route path="/fitout/checklist/list" element={<FitOutChecklistPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default FitOutList;
