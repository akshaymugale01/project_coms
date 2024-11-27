import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import profile3 from "/profile3.jpg";
import { IoBookOutline } from "react-icons/io5";
import { LuFileBarChart2 } from "react-icons/lu";
import react from "/reactImg.png";
import digitalMarketing from "/digitalMarketing.jpg";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
function SkillGrowEmployeeProfileDetails() {
  const [employee, setEmployee] = useState("courses");
  const employeeCourses = [
    {
      id: 1,
      course: react,
      courseName: "Basic React",
      totalLecture: "0",
      totalComplete: "0",
      progressPercentage: 0,
      joinDate: "02 August, 2024",
      status: "Pending",
      action: (
        <div className="flex gap-3">
          <button className=" rounded-md p-1 px-4 text-sm font-semibold bg-green-100 text-green-500">
            Approve
          </button>
          <button className=" rounded-md p-1 px-4 text-sm font-semibold bg-red-100 text-red-500">
            Reject
          </button>
        </div>
      ),
    },
    {
      id: 2,
      course: digitalMarketing,
      courseName: "Advance Digital Marketing",
      totalLecture: "15",
      totalComplete: "3",
      progressPercentage: 15,
      joinDate: "23 July, 2024",
      status: "Live",
      action: (
        <div className="flex gap-3">
          <button className="rounded-md p-1 px-4 text-sm font-semibold flex gap-1 bg-gray-100 text-gray-500">
            <MdOutlineSlowMotionVideo className="mt-1" /> Continue
          </button>
        </div>
      ),
    },
    {
      id: 3,
      course: digitalMarketing,
      courseName: "Basic Digital Marketing",
      totalLecture: "12",
      totalComplete: "12",
      joinDate: "15 Apr, 2024",
      progressPercentage: 100,
      status: "Completed",
      action: (
        <div className="flex gap-3">
          <button className="rounded-md p-1 px-4 text-sm font-semibold flex gap-1 bg-blue-100 text-blue-500">
            <FaCheck className="mt-1" /> Complete
          </button>
        </div>
      ),
    },
  ];
  const employeeProjects = [
    {
      id: 1,
      projectImg: digitalMarketing,
      projectName: "Web Development",
      duration: "30 Days",
      startDate: "18 July, 2024",
      endDate: "18 August, 2024",
      status: "Live",
      progressPercentage: 75,
    },
    {
      id: 2,
      projectImg: digitalMarketing,
      projectName: "social Networking",
      duration: "40 Days",
      startDate: "20 July, 2024",
      endDate: "30 August, 2024",
      status: "pending",
      progressPercentage: 0,
    },
  ];
  const getStatusColorName = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-300";
      case "approved":
        return "bg-green-300";
      case "live":
        return "bg-green-300";
      case "completed":
        return "bg-blue-300";
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
      case "completed":
        return "text-blue-400";
      case "approved":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      case "live":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <h2 className="text-2xl font-semibold mx-5 text-gray-600 mt-5">
          Employee Details
        </h2>
        <div className="grid grid-cols-3 gap-5 mx-5">
          <div className="col-span-2 mt-5">
            <div className="shadow-custom-all-sides rounded-md">
              <div className="bg-gray-100 py-3">
                <h2 className="text-xl font-semibold text-gray-800 mx-5">
                  Personal Information
                </h2>
              </div>
              <div className="mx-10 my-5">
                <img src={profile3} className="h-20 w-20 rounded-full"></img>
                <div className="grid grid-cols-2 py-5">
                  <div className="flex gap-4">
                    <h2 className="text-lg font-medium text-gray-500">Name</h2>
                    <p className="text-gray-500 text-base mt-1">Karan Gupta</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="text-lg font-medium text-gray-500">
                      Join Date:
                    </h2>
                    <p className="text-gray-500 text-base mt-1">1 Apr, 2024</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="text-lg font-medium text-gray-500">
                      Level:
                    </h2>
                    <p className="text-gray-500 text-base mt-1">Level 5</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="text-lg font-medium text-gray-500">
                      Location:
                    </h2>
                    <p className="text-gray-500 text-base mt-1">Agra</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="text-lg font-medium text-gray-500">
                      Payment:
                    </h2>
                    <p className="text-gray-500 text-base mt-1">₹ 19000</p>
                  </div>
                  <div className="col-span-2 flex gap-2 my-1">
                    <h2 className="text-lg font-medium text-gray-500 ">
                      Description:
                    </h2>
                    <p className="text-gray-500 text-base mt-1">
                      Karan is a web developer with 6 Months of experience in
                      building web applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 my-5">
            <div
              className={`shadow-custom-all-sides rounded-md cursor-pointer h-36 mb-5 ${
                employee === "courses"
                  ? "text-violet-700 border-b border-violet-700"
                  : ""
              }`}
              onClick={() => setEmployee("courses")}
            >
              <div className="flex justify-between mx-5 py-3">
                <p className="text-sm font-medium text-gray-600">COURSES</p>
                <IoBookOutline size={20} className="text-violet-500" />
              </div>
              <p className="text-4xl font-semibold text-center">3</p>
              <p className="text-base text-gray-600 text-center">
                Total Courses
              </p>
            </div>
            <div
              className={`shadow-custom-all-sides rounded-md cursor-pointer h-36 ${
                employee === "projects"
                  ? "text-violet-700 border-b border-violet-700"
                  : ""
              }`}
              onClick={() => setEmployee("projects")}
            >
              <div className="flex justify-between mx-5 py-3">
                <p className="text-sm font-medium text-gray-600">PROJECTS</p>
                <LuFileBarChart2 size={20} className="text-violet-500" />
              </div>
              <p className="text-4xl font-semibold text-center">2</p>
              <p className="text-base text-gray-600 text-center">
                Total Projects
              </p>
            </div>
          </div>
        </div>
        <div>
          {employee === "courses" && (
            <div className="mx-5 mb-10 shadow-custom-all-sides rounded-md">
              <h2 className="text-xl font-semibold text-gray-800 mx-5 py-5">
                Courses
              </h2>
              <table className="w-full bg-white border-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total Lecture
                    </th>
                    <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Complete Lecture
                    </th>
                    <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employeeCourses.map((courses) => (
                    <tr
                      key={courses.id}
                      className="hover:bg-gray-200 border-b border-gray-200"
                    >
                      <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                        <div className="flex gap-2">
                          <span>
                            <img
                              src={courses.course}
                              alt={courses}
                              className="h-14 w-24 rounded-md"
                            ></img>
                          </span>
                          <span className="py-1">
                            <p className="text-base font-medium">
                              {courses.courseName}
                            </p>
                            <p className="text-base">{courses.joinDate}</p>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {courses.totalLecture}
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {courses.totalComplete}
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        <div className="flex gap-3">
                          <div className="relative w-full h-2 bg-gray-200 rounded-full mt-1">
                            <div
                              className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
                              style={{
                                width: `${courses.progressPercentage}%`,
                              }}
                            ></div>
                          </div>
                          <div className="text-xs font-semibold text-gray-700">
                            {`${courses.progressPercentage}%`}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-3 w-3 rounded-full ${getStatusColorName(
                              courses.status
                            )}`}
                          ></span>
                          <span className={` ${getStatus(courses.status)}`}>
                            {courses.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {courses.action}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div>
          {employee === "projects" && (
            <div className="mx-5 mb-10 shadow-custom-all-sides rounded-md">
              <h2 className="text-xl font-semibold text-gray-800 mx-5 py-5">
                Projects
              </h2>
              <table className="w-full bg-white border-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      View
                    </th>
                    <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Project Name
                    </th>
                    <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employeeProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-gray-200 border-b border-gray-200"
                    >
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        <Link to="/employee/certificate/project-view">
                          <BsEye className="mt-1" size={15} />
                        </Link>
                      </td>
                      <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                        <div className="flex gap-2">
                          <img
                            src={project.projectImg}
                            alt={project.projectName}
                            className="h-14 w-24 rounded-md"
                          />
                          <div>
                            <p className="text-lg font-semibold">
                              {project.projectName}
                            </p>
                            <p>{project.duration}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {project.startDate}
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {project.endDate}
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        <span className={` ${getStatus(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        <div className="flex gap-3">
                          <div className="relative w-full h-2 bg-gray-200 rounded-full mt-1">
                            <div
                              className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
                              style={{
                                width: `${project.progressPercentage}%`,
                              }}
                            ></div>
                          </div>
                          <div className="text-xs font-semibold text-gray-700">
                            {`${project.progressPercentage}%`}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SkillGrowEmployeeProfileDetails;
