import React from "react";
import Navbar from "../../components/Navbar";
import SkillGrowHeaderComponent from "./SkillGrowHeaderComponent";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
function SkillGrowEmployeeProfile() {
  const employeeInfo = [
    {
      id: 1,
      profile: "/profile3.jpg",
      employeeName: "Karan Gupta",
      courses: "3",
      projects: "2",
      joinDate: "1 Apr, 2024",
      level: "Level 5",
      payment: "₹ 19000",
      location: "Agra",
    },
    {
      id: 2,
      profile: "/profile2.jpg",
      employeeName: "Niharika Gupta",
      courses: "3",
      projects: "2",
      joinDate: "10 May, 2024",
      level: "Level 3",
      payment: "₹ 14000",
      location: "Delhi",
    },
    {
      id: 1,
      profile: "/profile1.jpg",
      employeeName: "Riya Yadav",
      courses: "3",
      projects: "1",
      joinDate: "12 May, 2024",
      level: "Level 3",
      payment: "₹ 12000",
      location: "Mumbai",
    },
    {
      id: 4,
      profile: "/profile4.jpg",
      employeeName: "Vinay Singh",
      courses: "2",
      projects: "0",
      joinDate: "12 july, 2024",
      level: "Level 1",
      payment: "₹ 10000",
      location: "Mumbai",
    },
    {
      id: 5,
      profile: "/profile5.jpg",
      employeeName: "Neha Mishra",
      courses: "1",
      projects: "0",
      joinDate: "1 August, 2024",
      level: "Level 1",
      payment: "₹ 10000",
      location: "Jaipur",
    },
    {
      id: 6,
      profile: "/profile6.jpg",
      employeeName: "Ritesh Pandey",
      courses: "1",
      projects: "0",
      joinDate: "02 Aug, 2024",
      level: "Level 1",
      payment: "₹ 10000",
      location: "Lucknow",
    },
  ];
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <SkillGrowHeaderComponent />
        <div className="mb-10">
          <div className="flex justify-start mx-10 my-5">
            <input
              type="text"
              placeholder="search"
              className="border-2 p-2 w-full border-gray-300 rounded-lg mx-2"
            />
          </div>
          <div className="mx-10 shadow-custom-all-sides rounded-md py-5">
            <h2 className="text-2xl font-semibold text-gray-500 mb-5 mx-5">
              Employees List
            </h2>
            <table className="w-full bg-white border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    View
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Employee Name
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    courses
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Projects
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Joined Date
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    TotaL Payment
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {employeeInfo.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-gray-200 border-t border-gray-200"
                  >
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      <Link to={`/admin/skill-grow/employee-profile-details`}>
                        <BsEye className="mt-1" size={15} />
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                      <div className="flex gap-2">
                        <span>
                          <img
                            src={emp.profile}
                            alt={emp}
                            className="h-10 w-10 rounded-full"
                          ></img>
                        </span>
                        <span className="py-1">
                          <p className="text-base font-medium">
                            {emp.employeeName}
                          </p>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {emp.courses}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {emp.projects}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {emp.joinDate}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {emp.level}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {emp.payment}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {emp.location}
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
      </div>
    </section>
  );
}

export default SkillGrowEmployeeProfile;
