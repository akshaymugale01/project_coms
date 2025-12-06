import React from "react";
import Navbar from "../../../components/Navbar";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";

function EmployeeRejected() {
  const themeColor = useSelector((state) => state.theme.color);
  const data = [
    {
      id: 1,
      title: "Title",
      description: "Description",
      subItems: [
        {
          subTitle: "Remote Work Proposal",
          subDescription:
            "Request for approval to work remotely either fulltime or part-time along with a plan outlining how productivity will be maintained",
        },
      ],
      timeline: "1 Months",
      budget: "₹ 18000",
      buttonText: "Rejected",
    },
    {
      id: 2,
      title: "Title",
      description: "Description",
      subItems: [
        {
          subTitle: "Diversity And Inclusion Initiative",
          subDescription:
            "Request for approval to lead or participate in initiative aimed at promoting diversity and inclusion within the organization.",
        },
      ],
      timeline: "1 Months",
      budget: "₹ 25000",
      buttonText: "Rejected",
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
        <div className="flex justify-end mx-10">
          <Link
            to={"/employee/certificate/project-request-approval/create-request"}
            className="border-2 border-gray-400 text-white rounded-md px-4 p-2 flex gap-2"
            style={{background: themeColor}}
          >
            <IoAddCircleOutline size={22} />
            Request Project
          </Link>
        </div>
        <div>
          <div className="border border-gray-400 rounded-md mx-5 my-5 p-1">
            {data.map((item) => (
              <Link
                to={"/employee/certificate/project-reject-details"}
                key={item.id}
              >
                <div className="shadow-custom-all-sides rounded-md mb-2 ">
                  <div className="flex flex-col md:flex-row justify-between py-5 px-5 gap-5">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-10">
                      <div>
                        <h2 className=" font-semibold">{item.title}</h2>
                        <p className="">{item.description}</p>
                      </div>
                      {item.subItems.map((subItem, index) => (
                        <div key={index}>
                          <h2 className=" font-semibold">
                            {subItem.subTitle}
                          </h2>
                          <p className="text-sm text-gray-600 sm:w-1/2">
                            {subItem.subDescription}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h2 className="text-base font-normal whitespace-nowrap">
                        <span className="text-red-400 ">Due Date :</span>{" "}
                        {item.timeline}
                      </h2>
                      <p className="text-base font-normal">
                        <span className="mr-5 text-red-400">Budget :</span>
                        {item.budget}
                      </p>
                    </div>
                    <div>
                      <button
                        className="border-2 rounded-md p-2 px-10 bg-red-400 text-white disabled:opacity-50"
                        disabled
                      >
                        {item.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeRejected;
