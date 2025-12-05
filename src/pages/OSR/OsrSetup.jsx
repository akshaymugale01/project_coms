import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Osr from "./Osr"; // Sidebar
import UnitConfigurations from "./UnitConfig";
import ServiceCategories from "./ServiceCategories";
import ServiceSubCategories from "./ServiceSubCategories";
import ServiceSlots from "./ServiceSlots";
import ServicePricing from "./ServicePricing";
import PropTypes from "prop-types";

const OrsSetup = ({ userRole = "admin" }) => {
  const location = useLocation();
  const [activeComponent, setActiveComponent] = useState("unitConfigs");

  const isActiveLink = (path) => location.pathname === path;

  const handleComponentClick = (componentName) => (e) => {
    e.preventDefault();
    setActiveComponent(componentName);
  };

  const adminLinks = [
    {
      path: "/admin/unit-configurations",
      label: "Unit Configs",
      onClick: handleComponentClick("unitConfigs"),
    },
    {
      path: "/admin/service-categories",
      label: "Categories",
      onClick: handleComponentClick("categories"),
    },
    {
      path: "/admin/service-subcategories",
      label: "Subcategories",
      onClick: handleComponentClick("subcategories"),
    },
    {
      path: "/admin/service-slots",
      label: "Slots",
      onClick: handleComponentClick("slots"),
    },
    {
      path: "/admin/service-pricing",
      label: "Pricing",
      onClick: handleComponentClick("pricing"),
    },
  ];

  const residentLinks = [
    { path: "/resident", label: "Dashboard" },
    { path: "/resident/services", label: "Available Services" },
    { path: "/resident/my-bookings", label: "My Bookings" },
  ];

  const links = userRole === "admin" ? adminLinks : residentLinks;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Osr />

      {/* Right side content */}
      <div className="flex-1 flex flex-col p-6 bg-gray-100 overflow-auto">
        {/* Top navigation (sub-menu) */}
        <div className="mb-6">
          {/* <h1 className="text-2xl font-bold mb-2">Property Management</h1> */}
          <ul className="flex border-b-4 border-bottom flex-wrap gap-4 text-sm font-medium">
            {links.map((link) => (
              <li key={link.path}>
                {link.onClick ? (
                  <button
                    onClick={link.onClick}
                    className={`px-3 py-1 border shadow-lg rounded ${
                      activeComponent ===
                      link.label.toLowerCase().replace(" ", "")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`px-3 py-1 border shadow-lg rounded ${
                      isActiveLink(link.path)
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Content area */}
        <div className="flex-1">
          {activeComponent === "unitConfigs" && (
            <UnitConfigurations onClose={() => setActiveComponent(null)} />
          )}
          {activeComponent === "categories" && (
            <ServiceCategories onClose={() => setActiveComponent(null)} />
          )}
          {activeComponent === "subcategories" && (
            <ServiceSubCategories onClose={() => setActiveComponent(null)} />
          )}
          {activeComponent === "slots" && (
            <ServiceSlots onClose={() => setActiveComponent(null)} />
          )}
          {activeComponent === "pricing" && (
            <ServicePricing onClose={() => setActiveComponent(null)} />
          )}
          {!activeComponent && (
            <div className="text-center text-gray-500 mt-10">
              <p>Select an option from the navigation above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

OrsSetup.propTypes = {
  userRole: PropTypes.string,
};

export default OrsSetup;
