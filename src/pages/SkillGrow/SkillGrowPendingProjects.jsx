import React from "react";
import digitalMarketing from "/digitalMarketing.jpg";
import profile2 from "/profile2.jpg";
import profile4 from "/profile4.jpg";
import profile6 from "/profile6.jpg";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
function SkillGrowPendingProjects() {
  const pendingProjects = [
    {
      id: 1,
      img: digitalMarketing,
      projectName: "Web Developments",
      applyDate: " 5 August, 2024",
      employeeProfile: profile4,
      employeeName: "Vinay Singh",
      status: "Pending",
      action: (
        <div className="flex gap-3">
          <button className="rounded-md p-1 px-4 text-sm font-semibold bg-green-400 text-white">
            Approve
          </button>
          <button className="rounded-md p-1 px-4 text-sm font-semibold bg-red-400 text-white">
            Reject
          </button>
        </div>
      ),
    },
    {
      id: 2,
      img: digitalMarketing,
      projectName: "E-Commerce",
      applyDate: " 28 July, 2024",
      employeeProfile: profile2,
      employeeName: "Niharika Gupta",
      status: "Pending",
      action: (
        <div className="flex gap-3">
          <button className="rounded-md p-1 px-4 text-sm font-semibold bg-green-400 text-white">
            Approve
          </button>
          <button className="rounded-md p-1 px-4 text-sm font-semibold bg-red-400 text-white">
            Reject
          </button>
        </div>
      ),
    },
    {
      id: 3,
      img: digitalMarketing,
      projectName: "Game",
      applyDate: "2 August, 2024",
      employeeProfile: profile6,
      employeeName: "Ritesh Pandey",
      status: "Pending",
      action: (
        <div className="flex gap-3">
          <button className="rounded-md p-1 px-4 text-sm font-semibold bg-green-400 text-white">
            Approve
          </button>
          <button className="rounded-md p-1 px-4 text-sm font-semibold bg-red-400 text-white">
            Reject
          </button>
        </div>
      ),
    },
  ];

  const getStatusColorName = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-300";
      case "live":
        return "bg-green-300";
      case "rejected":
        return "bg-red-300";
      default:
        return "bg-gray-300";
    }
  };

  const getStatus = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-400";
      case "in progress":
        return "text-blue-400";
      case "live":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div>
      <div className="shadow-custom-all-sides rounded-md mx-10 py-5 my-5 mb-10">
        <h2 className="text-2xl font-semibold mx-8 text-gray-500 mb-5">
           Pending Projects
        </h2>
        <div className="flex justify-start mx-5">
          <input
            type="text"
            placeholder="Search All Projects"
            className="border-2 p-2 w-full border-gray-300 rounded-lg mx-5"
          />
        </div>
        <div className="overflow-x-scroll p-3 my-2 px-10">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  View
                </th>
                <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-5 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingProjects.map((project) => (
                <tr
                  key={project.id}
                  className="border-t border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-gray-500 whitespace-nowrap">
                    <Link to={"/admin/skill-grow/project-details"}>
                      <BsEye className="mt-1" size={15} />
                    </Link>
                  </td>
                  <td className="py-3 px-6 text-gray-500 whitespace-nowrap">
                    <div>
                      <div className="flex gap-5">
                        <span>
                          <img
                            src={project.img}
                            alt={project}
                            className="h-14 w-24 rounded-lg"
                          ></img>
                        </span>

                        <span className="py-1">
                          <p className="text-base font-bold">
                            {project.projectName}
                          </p>
                          <p>{project.applyDate}</p>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-gray-500 whitespace-nowrap">
                    <div className="flex gap-3">
                      <span>
                        <img
                          src={project.employeeProfile}
                          alt=""
                          className="h-10 w-10 rounded-full"
                        ></img>
                      </span>
                      <span className="flex items-center">
                        {project.employeeName}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-gray-500 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-3 w-3 rounded-full ${getStatusColorName(
                          project.status
                        )}`}
                      ></span>
                      <span className={` ${getStatus(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-gray-500 whitespace-nowrap">
                    {project.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SkillGrowPendingProjects;
