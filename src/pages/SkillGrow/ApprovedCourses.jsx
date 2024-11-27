import React, { useState } from "react";
import { Link } from "react-router-dom";
import profile2 from "/profile2.jpg";
import profile1 from "/profile1.jpg";
import profile3 from "/profile3.jpg";
import figma from "/figma.jpg";
import marketing from "/digitalMarketing.jpg";
import graphic from "/graphic.jpg";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
function ApprovedCourses() {
  const [approved, setApproved] = useState("instructor");
  const instructorApproved = [
    {
      id: 2,
      img: marketing,
      courseName: "Digital Marketing",
      date: "20 July, 2024",
      instructorProfile: profile3,
      instructor: "Anil Sharma",
      status: "Approved",
    },
    {
      id: 1,
      img: figma,
      courseName: "Figma",
      date: "12 July, 2024",
      instructorProfile: profile2,
      instructor: "Kalpana Gupta",
      status: "Approved",
    },
  ];
  const employeeApproved = [
    {
      id: 1,
      img: marketing,
      courseName: "Digita Marketing",
      date: "05 Apr, 2024",
      employeeProfile: profile3,
      employee: "Karan Gupta",
      status: "Approved",
    },
    {
      id: 2,
      img: graphic,
      courseName: "Graphic Design",
      date: "27 May, 2024",
      employeeProfile: profile1,
      employee: "Riya Yadav",
      status: "Approved",
    },
  ];
  const getStatusColorName = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-300";
      case "approved":
        return "bg-green-300";
      case "on hold":
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
      case "approved":
        return "text-green-400";
      case "on hold":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="shadow-custom-all-sides rounded-lg mx-10 py-5 my-5 mb-10">
      <h2 className="text-2xl font-semibold mx-8 text-gray-500 mb-5">
        Approved Courses
      </h2>
      <div className="flex justify-between mx-8 my-3">
        <div className="flex gap-5 border-2 border-gray-400 rounded-md w-60 px-5 py-2 ">
          <div className="flex items-center">
            <input
              type="radio"
              id="instructor"
              name="courses"
              value="instructor"
              checked={approved === "instructor"}
              className="mr-2 cursor-pointer"
              onClick={() => setApproved("instructor")}
            />
            <label htmlFor="instructor" className="text-base">
              Instructor
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="employee"
              name="courses"
              value="employee"
              className="mr-2 cursor-pointer"
              onClick={() => setApproved("employee")}
            />
            <label htmlFor="employee" className="text-base">
              Employee
            </label>
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="search"
            className="border-2 p-2 border-gray-300 rounded-lg"
          />
        </div>
      </div>
      {approved === "instructor" && (
        <div className="overflow-x-auto mx-8">
          <table className="w-full bg-white border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {instructorApproved.map((course) => (
                <tr key={course.id} className="hover:bg-gray-200 border-t border-gray-200">
                  <td className="px-6 py-4text-gray-500 whitespace-nowrap">
                    <div className="flex gap-3">
                      <Link to={"/admin/skill-grow/course-details"}>
                        <BsEye className="mt-1" size={15} />
                      </Link>
                      <Link to={"/admin/skill-grow/edit-course-details"}>
                        <BiEdit size={15} className="mt-1" />
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                    <div className="flex gap-5">
                      <span>
                        <img
                          src={course.img}
                          alt={course.courseName}
                          className="h-14 w-24 rounded-lg"
                        ></img>
                      </span>
                      <span className="py-1">
                        <p className="text-base font-bold">
                          {course.courseName}
                        </p>
                        <p>{course.date}</p>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    <div className="flex gap-3">
                      <span>
                        <img
                          src={course.instructorProfile}
                          alt={course.instructor}
                          className="h-10 w-10 rounded-full"
                        ></img>
                      </span>
                      <span className="flex items-center">
                        {course.instructor}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-3 w-3 rounded-full ${getStatusColorName(
                          course.status
                        )}`}
                      ></span>
                      <span className={` ${getStatus(course.status)}`}>
                        {course.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {approved === "employee" && (
        <div className="overflow-x-auto mx-8">
          <table className="w-full bg-white border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  View
                </th>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {employeeApproved.map((course) => (
                <tr key={course.id} className="hover:bg-gray-200 border-t border-gray-200">
                  <td className="px-6 py-4 border-t border-gray-200 text-gray-500 whitespace-nowrap">
                    <div>
                      <Link to={"/admin/skill-grow/course-details"}>
                        <BsEye className="mt-1" size={15} />
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                    <div className="flex gap-5">
                      <span>
                        <img
                          src={course.img}
                          alt={course.courseName}
                          className="h-14 w-24 rounded-lg"
                        ></img>
                      </span>
                      <span className="py-1">
                        <p className="text-base font-bold">
                          {course.courseName}
                        </p>
                        <p>{course.date}</p>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    <div className="flex gap-3">
                      <span>
                        <img
                          src={course.employeeProfile}
                          alt={course.employee}
                          className="h-10 w-10 rounded-full"
                        ></img>
                      </span>
                      <span className="flex items-center">
                        {course.employee}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-3 w-3 rounded-full ${getStatusColorName(
                          course.status
                        )}`}
                      ></span>
                      <span className={` ${getStatus(course.status)}`}>
                        {course.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ApprovedCourses;
