import React from "react";
import Navbar from "../../components/Navbar";
import SkillGrowHeaderComponent from "./SkillGrowHeaderComponent";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";

function Instructor() {
  const instructorInfo = [
    {
      id: 1,
      instructorProfile: "/profile5.jpg",
      instructorName: "Radha Panchal",
      courses: "4",
      joinDate: "4 Apr, 2024",
      employees: "254",
      rating: "3.9",
    },
    {
      id: 2,
      instructorProfile: "/profile3.jpg",
      instructorName: "Anil Sharma",
      courses: "6",
      joinDate: "3 May, 2024",
      employees: "314",
      rating: "4.9",
    },
    {
      id: 3,
      instructorProfile: "/profile1.jpg",
      instructorName: "Suman Singh",
      courses: "2",
      joinDate: "11 July, 2024",
      employees: "54",
      rating: "2.9",
    },
    {
      id: 4,
      instructorProfile: "/profile2.jpg",
      instructorName: "Kalpana Gupta",
      courses: "3",
      joinDate: "4 Apr, 2024",
      employees: "140",
      rating: "4.0",
    },
    {
      id: 4,
      instructorProfile: "/profile4.jpg",
      instructorName: "Sandip More",
      courses: "1",
      joinDate: "20 July, 2024",
      employees: "140",
      rating: "4.0",
    },
  ];
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <SkillGrowHeaderComponent />
        <div className="">
          <div className="flex justify-start mx-10 my-5">
            <input
              type="text"
              placeholder="search"
              className="border-2 p-2 w-full border-gray-300 rounded-lg mx-2"
            />
          </div>
        </div>
        <div className="mx-10 shadow-custom-all-sides rounded-md">
          <h2 className="text-2xl font-semibold text-gray-500 py-5 mx-5">
            Instructor List
          </h2>
          <table className="w-full bg-white border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  View
                </th>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Instructor Name
                </th>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Courses
                </th>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {instructorInfo.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-gray-200 border-b border-gray-200"
                >
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    <Link to={"/admin/skill-grow/instructor-details"}>
                      <BsEye className="mt-1" size={15} />
                    </Link>
                  </td>
                  <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                    <div className="flex gap-2">
                      <span>
                        <img
                          src={emp.instructorProfile}
                          alt={emp}
                          className="h-10 w-10 rounded-full"
                        ></img>
                      </span>
                      <span className="py-1">
                        <p className="text-base font-medium">
                          {emp.instructorName}
                        </p>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {emp.courses}
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {emp.joinDate}
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {emp.employees}
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {emp.rating}
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    <button>
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Instructor;
