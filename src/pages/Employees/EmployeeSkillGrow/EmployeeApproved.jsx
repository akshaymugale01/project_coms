import React from "react";
import Navbar from "../../../components/Navbar";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { CgWebsite } from "react-icons/cg";
import marketing from "/digitalMarketing.jpg"
function EmployeeApproved() {
  const themeColor = useSelector((state) => state.theme.color);
  const approved = [
    {
      id: 1,
      img:marketing,
      projectIcon: <div className="border-2 border-inherit rounded-md p-3 mr-3">
        <CgWebsite size={30}/>
      </div>,
      projectName: "Web Development",
      projectDesc:
        "Web application design is an important stage when building a web application...",
      profiles: [
        { id: 1, src: "/profile1.jpg", alt: "Profile 1" },
        { id: 2, src: "/profile2.jpg", alt: "Profile 2" },
        { id: 3, src: "/profile3.jpg", alt: "Profile 3" },
      ],
      approved: "Approved",
      dueDate: "12 Aug, 2024",
      budget: "50000",
    },
    {
      id: 2,
      img:marketing,
      projectName: "Marketing Strategy",
      projectDesc:
        "Development of a new marketing strategy to increase brand awareness and sales increase brand awareness and...",
      profiles: [
        { id: 1, src: "/profile1.jpg", alt: "Profile 1" },
        { id: 2, src: "/profile2.jpg", alt: "Profile 2" },
        { id: 3, src: "/profile3.jpg", alt: "Profile 3" },
      ],
      approved: "Approved",
      dueDate: "22 Aug, 2024",
      budget: "60000",
    },
    {
      id: 3,
      img:marketing,
      projectName: "Business Project",
      projectDesc:
        "Development of a new marketing strategy to increase brand awareness and sales increase brand awareness and...",
      profiles: [
        { id: 1, src: "/profile1.jpg", alt: "Profile 1" },
        { id: 2, src: "/profile2.jpg", alt: "Profile 2" },
        { id: 3, src: "/profile3.jpg", alt: "Profile 3" },
      ],
      approved: "Approved",
      dueDate: "22 Aug, 2024",
      budget: "60000",
    },
  ];
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <div className="flex justify-center my-2 w-full">
          <div
            className="sm:flex flex-wrap grid grid-cols-2 sm:flex-row gap-2 text-sm font-medium p-2 rounded-md text-white"
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
              to={"/employee/certificate/project-request-approval"}
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
        <div className="flex justify-center my-2 w-full">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-1 sm:rounded-full rounded-md opacity-90 bg-gray-200">
            <NavLink
              to={"/employee/certificate/project-request-approval/request"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Request
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-request-approval/approved"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Approved
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-request-approval/rejected"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Rejected
            </NavLink>
          </div>
        </div>
        <div>
          <div className="border border-gray-400 rounded-md mx-5 my-5">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-5 my-5">
              {approved.map((item) => (
                <Link
                  to={`/employee/certificate/project-view`}
                  key={item.id}
                  className="shadow-custom-all-sides rounded-md flex flex-col justify-between"
                >
                  <img src={item.img} className="h-32 rounded-md"></img>
                  <div className="flex px-2 pt-3">
                     {/* <div>{item.projectIcon}</div> */}
                    <p className=" text-gray-700 font-medium">
                      {item.projectName}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 px-5 py-3">
                    {item.projectDesc}
                  </p>
                  <div className="flex justify-between items-center px-5 relative mt-2 mb-5">
                    <div className="flex ">
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
                    <p className="bg-green-100 text-green-400 p-1 px-2 rounded-md text-sm font-medium">
                      {item.approved}
                    </p>
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

export default EmployeeApproved;
