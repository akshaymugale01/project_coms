import React, { useState } from "react";
import react from "/reactImg.png";
import profile1 from "/profile1.jpg";
import { Link } from "react-router-dom";
import profile2 from "/profile2.jpg";
import profile3 from "/profile3.jpg";
import profile4 from "/profile4.jpg";
import profile5 from "/profile5.jpg";
import profile6 from "/profile6.jpg";
import figma from "/figma.jpg";
import graphic from "/graphic.jpg";
import marketing from "/digitalMarketing.jpg";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
function AllCourses() {
  const [course, setCourse] = useState("instructor");
  const instructorCourses = [
    {
      id: 3,
      img: marketing,
      courseName: "Digital Marketing",
      date: "20 July, 2024",
      instructorProfile: profile3,
      instructor: "Anil Sharma",
      status: "Approved",
    },
    {
      id: 1,
      img: react,
      courseName: "React Basics",
      date: "1 August, 2024",
      instructorProfile: profile1,
      instructor: "Suman Singh",
      status: "Pending",
      action: (
        <div className="flex gap-3">
          <button className="border-2 border-inherit rounded-md p-1 px-4 text-sm font-semibold bg-green-400 text-white">
            Approve
          </button>
          <button className="border-2 border-inherit rounded-md p-1 px-4 text-sm font-semibold bg-red-500 text-white">
            Reject
          </button>
        </div>
      ),
    },
    {
      id: 2,
      img: figma,
      courseName: "Figma",
      date: "12 July, 2024",
      instructorProfile: profile2,
      instructor: "Kalpana Gupta",
      status: "Approved",
    },
    {
      id: 4,
      img: graphic,
      courseName: "Graphic",
      date: "6 August, 2024",
      instructorProfile: profile5,
      instructor: "Radha Panchal",
      status: "Pending",
      action: (
        <div className="flex gap-3">
          <button className="border-2 border-inherit rounded-md p-1 px-4 text-sm font-semibold bg-green-400 text-white">
            Approve
          </button>
          <button className="border-2 border-inherit rounded-md p-1 px-4 text-sm font-semibold bg-red-500 text-white">
            Reject
          </button>
        </div>
      ),
    },
    {
      id: 5,
      img: figma,
      courseName: "Advance Figma design",
      date: " 20 July, 2024",
      instructorProfile: profile2,
      instructor: "Kalpana Gupta",
      status: "Rejected",
    },
    {
      id: 6,
      img: marketing,
      courseName: "Marketing",
      date: "12 July, 2024",
      instructorProfile: profile4,
      instructor: "Sandip More",
      status: "Rejected",
    },
  ];
  const employeeCourses = [
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
      img: figma,
      courseName: "Figma Design",
      date: "20 July, 2024",
      employeeProfile: profile4,
      employee: "Vinay Singh",
      status: "Pending",
      action: (
        <div className="flex gap-3">
          <button className="border-2 border-inherit rounded-md p-1 px-4 text-sm font-semibold bg-green-400 text-white">
            Approve
          </button>
          <button className="border-2 border-inherit rounded-md p-1 px-4 text-sm font-semibold bg-red-500 text-white">
            Reject
          </button>
        </div>
      ),
    },
    {
      id: 3,
      img: graphic,
      courseName: "Graphic Design",
      date: "21 May, 2024",
      employeeProfile: profile2,
      employee: "Niharika Gupta",
      status: "Rejected",
    },
    {
      id: 4,
      img: react,
      courseName: "Basic React",
      date: "6 August, 2024",
      employeeProfile: profile5,
      employee: "Priya Dogra",
      status: "Pending",
      action: (
        <div className="flex gap-3">
          <button className="border-2 border-inherit rounded-md p-1 px-4 text-sm font-semibold bg-green-400 text-white">
            Approve
          </button>
          <button className="border-2 border-inherit rounded-md p-1 px-4 text-sm font-semibold bg-red-500 text-white">
            Reject
          </button>
        </div>
      ),
    },
    {
      id: 5,
      img: graphic,
      courseName: "Graphic Design",
      date: "27 May, 2024",
      employeeProfile: profile1,
      employee: "Riya Yadav",
      status: "Approved",
    },
    {
      id: 6,
      img: figma,
      courseName: "Advance Figma",
      date: "6 August, 2024",
      employeeProfile: profile6,
      employee: "Ritesh Pandey",
      status: "Pending",
      action: (
        <div className="flex gap-3">
          <button className="border-2 border-inherit rounded-md p-1 px-4 text-sm font-semibold bg-green-400 text-white">
            Approve
          </button>
          <button className="border-2 border-inherit rounded-md p-1 px-4 text-sm font-semibold bg-red-500 text-white">
            Reject
          </button>
        </div>
      ),
    },
  ];
  const adminCourses = [
    {
      id: 3,
      img: marketing,
      courseName: "Digita Marketing",
      date: "20 July, 2024",
      instructorProfile: profile3,
      instructor: "Anil Sharma",
      status: "Live",
    },
    {
      id: 1,
      img: react,
      courseName: "React Advance",
      date: "12 July, 2024",
      instructorProfile: profile5,
      instructor: "Radha Panchal",
      status: "Live",
    },
    {
      id: 2,
      img: figma,
      courseName: "figma Design",
      date: "1 July, 2024",
      instructorProfile: profile2,
      instructor: "Kalpana Gupta",
      status: "Completed",
    },
  ];
  const getStatusColorName = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-300";
      case "approved":
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
    <section>
      <div className="shadow-custom-all-sides rounded-lg mx-10 py-5 my-5 mb-10">
        <h2 className="text-2xl font-semibold mx-8 text-gray-500 mb-5">
          All Courses
        </h2>
        <div className="flex justify-between mx-8 my-3">
          <div className="flex gap-5 border-2 border-gray-400 rounded-md px-5 py-2 ">
            <div className="flex items-center">
              <input
                type="radio"
                id="instructor"
                name="courses"
                value="instructor"
                checked={course === "instructor"}
                className="mr-2 cursor-pointer"
                onClick={() => setCourse("instructor")}
              />
              <label htmlFor="instructor" className="text-base">
                Instructor
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="admin"
                name="courses"
                value="admin"
                className="mr-2 cursor-pointer"
                onClick={() => setCourse("admin")}
              />
              <label htmlFor="admin" className="text-base">
                Admin
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="employee"
                name="courses"
                value="employee"
                className="mr-2 cursor-pointer"
                onClick={() => setCourse("employee")}
              />
              <label htmlFor="employee" className="text-base">
                Employee
              </label>
            </div>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="search"
              className="border-2 p-2 border-gray-300 rounded-lg"
            />
            <div>
              <Link
                to={"/admin/skill-grow/create-course-details"}
                className="border-2 border-gray-500 rounded-md p-2 px-4 flex gap-2"
              >
                <IoAddCircleOutline size={20} /> Add
              </Link>
            </div>
          </div>
        </div>
        {course === "instructor" && (
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
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {instructorCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-200 border-t border-gray-200"
                  >
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
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
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {course.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {course === "employee" && (
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
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {employeeCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-200 border-t border-gray-200"
                  >
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
                            alt=""
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
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {course.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {course === "admin" && (
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
                    Assign To Instructor
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {adminCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-200 border-t border-gray-200"
                  >
                    <td className="px-6 py-4 border-t border-gray-200 text-gray-500 whitespace-nowrap">
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
                            alt=""
                            className="h-10 w-10 rounded-full"
                          ></img>
                        </span>
                        <span className="flex items-center">
                          {course.instructor}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      <span className={` ${getStatus(course.status)}`}>
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default AllCourses;
