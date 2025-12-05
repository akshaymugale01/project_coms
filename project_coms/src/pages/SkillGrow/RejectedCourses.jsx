import React, { useState } from "react";
import { Link } from "react-router-dom";
import profile2 from "/profile2.jpg";
import profile3 from "/profile3.jpg";
import figma from "/figma.jpg";
import graphic from "/graphic.jpg";
import marketing from "/digitalMarketing.jpg";
import { BsEye } from "react-icons/bs";
function RejectedCourses() {
  const [reject, setReject] = useState("instructor");
  const instructorRejected = [
    {
      id: 1,
      img: figma,
      courseName: "Advance Figma design",
      date: "20 July, 2024",
      instructorProfile: profile2,
      instructor: "Kalpana Gupta",
      status: "Rejected",
    },
    {
      id: 2,
      img: marketing,
      courseName: "Digital Marketing",
      date: "12 July, 2024",
      instructorProfile: profile3,
      instructor: "Sandip More",
      status: "Rejected",
    },
  ];

  const employeeRejected = [
    {
      id: 1,
      img: graphic,
      courseName: "Graphic Design",
      date: "21 May, 2024",
      employeeProfile: profile2,
      employee: "Niharika Gupta",
      status: "Rejected",
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
    <div className="shadow-custom-all-sides rounded-lg mx-10 py-5 my-5 mb-10">
      <h2 className="text-2xl font-semibold mx-8 text-gray-500 mb-5">
        Rejected Courses
      </h2>
      <div className="flex justify-between mx-8 my-3">
        <div className="flex gap-5 border-2 border-gray-400 rounded-md w-60 px-5 py-2 ">
          <div className="flex items-center">
            <input
              type="radio"
              id="instructor"
              name="courses"
              value="instructor"
              checked={reject === "instructor"}
              className="mr-2 cursor-pointer"
              onClick={() => setReject("instructor")}
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
              onClick={() => setReject("employee")}
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
      {reject === "instructor" && (
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
              {instructorRejected.map((course) => (
                <tr
                  key={course.id}
                  className="hover:bg-gray-200 border-t border-gray-200"
                >
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
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
      {reject === "employee" && (
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
              {employeeRejected.map((course) => (
                <tr
                  key={course.id}
                  className="hover:bg-gray-200 border-t border-gray-200"
                >
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    <div>
                      <Link to={"/admin/skill-grow/course-details"}>
                        <BsEye className="mt-1" size={15} />
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                    <Link to={""} className="flex gap-5">
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
                    </Link>
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

export default RejectedCourses;
