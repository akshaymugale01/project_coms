import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../components/Navbar";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsArchive, BsThreeDots } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FiLink, FiSave } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { CiExport } from "react-icons/ci";
import { LuPrinter } from "react-icons/lu";
import { AiOutlineDelete, AiOutlineTeam } from "react-icons/ai";
import marketing from "/digitalMarketing.jpg";
import { CgWebsite } from "react-icons/cg";
function EmployeeProjectRepository() {
  const themeColor = useSelector((state) => state.theme.color);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const dropdownRef = useRef(null);

  const projectData = [
    {
      id: 1,
      img: marketing,
      projectIcon: (
        <div className="border-2 border-inherit rounded-md p-3 mr-3">
          <CgWebsite size={30} />
        </div>
      ),
      projectName: "Website",
      projectSubTitle: "Web Design",
      projectDesc:
        "Web application design is an important stage when building a web application...",
      profiles: [
        { id: 1, src: "/profile1.jpg", alt: "Profile 1" },
        { id: 2, src: "/profile2.jpg", alt: "Profile 2" },
        { id: 3, src: "/profile3.jpg", alt: "Profile 3" },
      ],
      status: "Complete",
      budget: "20000",
      progress: 100,
      dueDate: "20/7/2024",
    },
    {
      id: 2,
      img: marketing,
      projectName: "Website",
      projectSubTitle: "Web Design",
      projectDesc:
        "Web application design is an important stage when building a web application...",
      profiles: [
        { id: 1, src: "/profile1.jpg", alt: "Profile 1" },
        { id: 2, src: "/profile2.jpg", alt: "Profile 2" },
        { id: 3, src: "/profile3.jpg", alt: "Profile 3" },
      ],
      status: "Complete",
      budget: "20000",
      progress: 100,
      dueDate: "20/7/2024",
    },
    {
      id: 3,
      img: marketing,
      projectName: "Website",
      projectSubTitle: "Web Design",
      projectDesc:
        "Web application design is an important stage when building a web application...",
      profiles: [
        { id: 1, src: "/profile1.jpg", alt: "Profile 1" },
        { id: 2, src: "/profile2.jpg", alt: "Profile 2" },
        { id: 3, src: "/profile3.jpg", alt: "Profile 3" },
      ],
      status: "Complete",
      budget: "20000",
      progress: 100,
      dueDate: "20/7/2024",
    },
    {
      id: 4,
      img: marketing,
      projectName: "Website",
      projectSubTitle: "Web Design",
      projectDesc:
        "Web application design is an important stage when building a web application ...",
      profiles: [
        { id: 1, src: "/profile1.jpg", alt: "Profile 1" },
        { id: 2, src: "/profile2.jpg", alt: "Profile 2" },
        { id: 3, src: "/profile3.jpg", alt: "Profile 3" },
      ],
      status: "Complete",
      budget: "20000",
      progress: 100,
      dueDate: "20/7/2024",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getProgressBarColor = (status) => {
    switch (status) {
      case "Complete":
        return "bg-green-300";
      default:
        return "bg-gray-400";
    }
  };

  // const handleDropdownToggle = (id) => {
  //   setActiveProjectId((prevId) => (prevId === id ? null : id));
  // };

  // const handleClickOutside = (event) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setActiveProjectId(null);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <div className="flex justify-center my-2 w-full">
          <div
            className="sm:flex flex-wrap grid grid-cols-2 sm:flex-row text-white p-2 gap-2 text-sm font-medium rounded-md"
            style={{ background: themeColor }}
          >
            <NavLink
              to={"/employee/certificate/course"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Certificate
            </NavLink>
            <NavLink
              to={"/employee/certificate/rr-certificate"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              RR Certificate
            </NavLink>
            <NavLink
              to={"/employee/certificate/course-request-approval"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Course Request & Approval
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-request-approval/request"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Project Request & Approval
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-tracking"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Project Tracking
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-repository"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Project Repository
            </NavLink>
            <NavLink
              to={"/employee/certificate/knowledge-base"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Knowledge Base
            </NavLink>
          </div>
        </div>
        <div className="flex justify-start mx-5 my-2">
          <input
            type="text"
            placeholder="search"
            className="border p-2 w-96 border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <div className="border border-gray-400 rounded-md mx-5 my-2">
            <div className="md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-5">
              {projectData.map((item) => (
                <Link
                  to={`/employee/certificate/project-repository-details`}
                  key={item.id}
                  className="shadow-custom-all-sides flex flex-col justify-between rounded-md my-5"
                >
                  <img src={item.img} className="h-32 rounded-md"></img>
                    <div className="flex px-5 pt-3">
                      {/* <div>{item.projectIcon}</div> */}
                      <p className="font-medium text-gray-700">
                        {item.projectName}
                        <p className="text-sm text-gray-600 mt-1">
                          {item.projectSubTitle}
                        </p>
                      </p>
                    </div>
                  {/* <div className="flex justify-between px-3 pt-3">
                    <button
                      className="relative"
                      onClick={() => handleDropdownToggle(item.id)}
                    >
                      <BsThreeDots />
                      {activeProjectId === item.id && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 text-start"
                        >
                          <h2 className="text-base font-semibold py-2 text-gray-800 px-4">
                            Setting
                          </h2>
                          <a
                            href="#"
                            className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                            onClick={(e) => e.preventDefault()}
                          >
                            <div className="flex gap-2">
                              <BiEdit
                                size={15}
                                className="mt-1 text-gray-600"
                              />
                              <span className="text-gray-800">
                                Edit Details
                              </span>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                            onClick={(e) => e.preventDefault()}
                          >
                            <div className="flex gap-2">
                              <FiLink
                                size={15}
                                className="mt-1 text-gray-600"
                              />
                              <span className="text-gray-800">
                                Copy project link
                              </span>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                            onClick={(e) => e.preventDefault()}
                          >
                            <div className="flex gap-2">
                              <FiSave
                                size={15}
                                className="mt-1 text-gray-600"
                              />
                              <span className="text-gray-800">
                                Save as Default
                              </span>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                            onClick={(e) => e.preventDefault()}
                          >
                            <div className="flex gap-2">
                              <HiOutlineDuplicate
                                size={15}
                                className="mt-1 text-gray-600"
                              />
                              <span className="text-gray-800"> Duplicate</span>
                            </div>
                          </a>
                          <div className="border-t border-gray-300 my-2"></div>
                          <a
                            href="#"
                            className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                            onClick={(e) => e.preventDefault()}
                          >
                            <div className="flex gap-2">
                              <CiExport
                                size={15}
                                className="mt-1 text-gray-600"
                              />
                              <span className="text-gray-800"> Import</span>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                            onClick={(e) => e.preventDefault()}
                          >
                            <div className="flex gap-2">
                              <LuPrinter
                                size={15}
                                className="mt-1 text-gray-600"
                              />
                              <span className="text-gray-800">
                                {" "}
                                Export / Print
                              </span>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                            onClick={(e) => e.preventDefault()}
                          >
                            <div className="flex gap-2">
                              <AiOutlineTeam
                                size={20}
                                className="mt-1 text-gray-600"
                              />
                              <span className="text-gray-800">
                                {" "}
                                Move to another team
                              </span>
                            </div>
                          </a>
                          <div className="border-t border-gray-300 my-2"></div>
                          <a
                            href="#"
                            className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                            onClick={(e) => e.preventDefault()}
                          >
                            <div className="flex gap-2">
                              <BsArchive
                                size={15}
                                className="mt-1 text-gray-600"
                              />
                              <span className="text-gray-800"> Archive</span>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="block px-4 pt-1 pb-3 text-gray-800 hover:bg-gray-100"
                            onClick={(e) => e.preventDefault()}
                          >
                            <div className="flex gap-2">
                              <AiOutlineDelete
                                size={15}
                                className="mt-1 text-gray-600"
                              />
                              <span className="text-gray-800">
                                {" "}
                                Delete Project
                              </span>
                            </div>
                          </a>
                        </div>
                      )}
                    </button>
                  </div> */}
                  <p className="text-sm text-gray-700 px-5 py-3">
                    {item.projectDesc}
                  </p>
                  <div className="flex justify-between items-center px-3 relative mt-2 mb-5">
                    <div className="flex">
                      {item.profiles.map((profile, index) => (
                        <img
                          key={profile.id}
                          src={profile.src}
                          alt={profile.alt}
                          className="w-9 h-9 rounded-full absolute top-0 ml-5"
                          style={{ left: `${index * 1.4}rem` }}
                        />
                      ))}
                    </div>
                    <p
                      className={`p-1 px-2 font-semibold rounded-md text-sm ml-auto ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </p>
                  </div>
                  <div className="flex items-center mt-2 mb-5 px-5">
                    <div
                      className={`relative w-full h-2 bg-gray-200 rounded-full`}
                    >
                      <div
                        className={`h-2 ${getProgressBarColor(
                          item.status
                        )} rounded-full`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">{`${item.progress}%`}</span>
                  </div>
                  <div className="border-t border-gray-300">
                    <div class="grid grid-cols-2 divide-x divide-gray-300">
                      <div className="flex justify-center">
                        <div className="py-3">
                          <p className="text-gray-500 text-sm font-medium">
                            Due Date
                          </p>
                          <p className="text-gray-600 text-sm font-medium">
                            {item.dueDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="py-3">
                          <p className="text-gray-500 text-sm font-medium">
                            Budget
                          </p>
                          <p className="text-gray-600 text-sm font-medium">
                            {item.budget}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeProjectRepository;
