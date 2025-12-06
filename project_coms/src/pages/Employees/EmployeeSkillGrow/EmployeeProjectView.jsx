import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import EmployeeProjectOverview from "./EmployeeProjectOverview";
import EmployeeProjectTask from "./EmployeeProjectTask";
import EmployeeBudget from "./EmployeeBudget";
import EmployeeFiles from "./EmployeeFiles";
import profile1 from "/profile1.jpg";
import profile2 from "/profile2.jpg";
import profile3 from "/profile3.jpg";
import profile from "/profile.png";
import profile4 from "/profile4.jpg";
import EmployeeTeam from "./EmployeeTeam";
import profile6 from "/profile6.jpg";
import profile5 from "/profile5.jpg";
import EmployeeProjectSummary from "./EmployeeProjectSummary";
import { IoClose } from "react-icons/io5";
function EmployeeProjectView() {
  const [projectDetails, setProjectDetails] = useState("Overview");
  const handleToggle = (section) => {
    setProjectDetails(projectDetails === section ? null : section);
  };
  const [assign, setAssign] = useState(false);

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <div className="flex justify-between mx-5 mt-5">
          <div>
            <h2 className="text-2xl font-semibold">Vibe Project Details</h2>
          </div>
          <div className="relative flex items-center pr-32">
            <img
              src={profile1}
              className="h-12 w-12 rounded-full border-4 border-white"
              alt="Profile 1"
            />
            <img
              src={profile2}
              className="h-12 w-12 rounded-full absolute left-6 border-4 border-white"
              alt="Profile 2"
            />
            <img
              src={profile3}
              className="h-12 w-12 rounded-full absolute left-12 border-4 border-white"
              alt="Profile 3"
            />
            <img
              src={profile4}
              className="h-12 w-12 rounded-full absolute left-16 border-4 border-white"
              alt="Profile 4"
            />
            <div
              className="h-12 w-12 rounded-full absolute left-20 border-2 flex items-center justify-center bg-gray-100 border-white"
              alt="Profile 4"
            >
              5+
            </div>
            <button
            onClick={() => setAssign(!assign)}
              className="h-10 w-10 rounded-full absolute left-32 border-2 flex items-center justify-center bg-white border-gray-300 border-dashed"
              
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 mt-3 mx-5 rounded-md">
          <div
            className={`p-3 text-slate-800 cursor-pointer ${
              projectDetails === "Overview"
                ? "text-violet-700 border-b border-violet-700"
                : ""
            }`}
            onClick={() => handleToggle("Overview")}
          >
            Overview
          </div>
          <div
            className={` p-3 text-center cursor-pointer ${
              projectDetails === "task"
                ? "text-violet-700 border-b border-violet-700"
                : ""
            }`}
            onClick={() => handleToggle("task")}
          >
            Task
          </div>
          <div
            className={` p-3 text-center cursor-pointer  ${
              projectDetails === "budget"
                ? "text-violet-700 border-b border-violet-700"
                : ""
            }`}
            onClick={() => handleToggle("budget")}
          >
            Budget
          </div>
          <div
            className={` p-3 text-center cursor-pointer ${
              projectDetails === "files"
                ? "text-violet-700 border-b border-violet-700"
                : ""
            }`}
            onClick={() => handleToggle("files")}
          >
            Files
          </div>
          <div
            className={` p-3 text-center cursor-pointer ${
              projectDetails === "team"
                ? "text-violet-700 border-b border-violet-700"
                : ""
            }`}
            onClick={() => handleToggle("team")}
          >
            Team
          </div>
          <div
            className={` p-3 text-center cursor-pointer ${
              projectDetails === "summary"
                ? "text-violet-700 border-b border-violet-700"
                : ""
            }`}
            onClick={() => handleToggle("summary")}
          >
            Summary
          </div>
        </div>
        <div className="border-t border-gray-300 mb-5 mx-5"></div>
        {projectDetails === "Overview" && (
          <div>
            <EmployeeProjectOverview />
          </div>
        )}
        {projectDetails === "task" && (
          <div>
            <EmployeeProjectTask />
          </div>
        )}
        {projectDetails === "budget" && (
          <div>
            <EmployeeBudget />
          </div>
        )}
        {projectDetails === "files" && (
          <div>
            <EmployeeFiles />
          </div>
        )}
        {projectDetails === "team" && (
          <div>
            <EmployeeTeam />
          </div>
        )}
        {projectDetails === "summary" && (
          <div>
            <EmployeeProjectSummary />
          </div>
        )}
      </div>
      {assign && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="relative bg-white p-5 rounded-md w-96">
                  <button
                    className="absolute top-2 right-2 text-gray-500"
                    onClick={() => setAssign(!assign)}
                  >
                    <IoClose size={24} />
                  </button>
                  <h2 className="text-gray-600 font-semibold text-lg">
                    Add Project Member
                  </h2>
                  <div className="flex sm:flex-wrap flex-wrap gap-2 mt-2">
                    <img
                      src={profile1}
                      className="w-9 h-9 mt-1 rounded-full"
                      alt="Profile"
                    />
                    <img
                      src={profile2}
                      className="w-9 h-9 mt-1 rounded-full"
                      alt="Profile"
                    />
                    <img
                      src={profile3}
                      className="w-9 h-9 mt-1 rounded-full"
                      alt="Profile"
                    />
                  </div>
                  <div>
                    <input
                      type="search"
                      placeholder="search user"
                      className="border-2 p-1 border-gray-300 rounded-lg  w-full my-5"
                    ></input>
                  </div>
                  <div className="overflow-y-scroll h-40">
                    
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <img
                          src={profile4}
                          className="w-9 h-9 mt-1 rounded-full"
                          alt="Profile"
                        />
                        <h2 className="flex items-center">Ravindar</h2>
                      </div>
                      <input
                        type="checkbox"
                        name="completed"
                        className="mr-2 font-3"
                      />
                    </div>
                   
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <img
                          src={profile}
                          className="w-9 h-9 mt-1 rounded-full"
                          alt="Profile"
                        />
                        <h2 className="flex items-center">Mayur</h2>
                      </div>
                      <input
                        type="checkbox"
                        name="completed"
                        className="mr-2 font-3"
                      />
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <img
                          src={profile}
                          className="w-9 h-9 mt-1 rounded-full"
                          alt="Profile"
                        />
                        <h2 className="flex items-center">Akshat</h2>
                      </div>
                      <input
                        type="checkbox"
                        name="completed"
                        className="mr-2 font-3"
                      />
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <img
                          src={profile6}
                          className="w-9 h-9 mt-1 rounded-full"
                          alt="Profile"
                        />
                        <h2 className="flex items-center">Kunal</h2>
                      </div>
                      <input
                        type="checkbox"
                        name="completed"
                        className="mr-2 font-3"
                      />
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <img
                          src={profile}
                          className="w-9 h-9 mt-1 rounded-full"
                          alt="Profile"
                        />
                        <h2 className="flex items-center">Praful</h2>
                      </div>
                      <input
                        type="checkbox"
                        name="completed"
                        className="mr-2 font-3"
                      />
                    </div>
                   
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <img
                          src={profile5}
                          className="w-9 h-9 mt-1 rounded-full"
                          alt="Profile"
                        />
                        <h2 className="flex items-center">Riya</h2>
                      </div>
                      <input
                        type="checkbox"
                        name="completed"
                        className="mr-2 font-3"
                      />
                    </div>
                    
                  </div>
                  <div className="border-t border-inherit my-5"></div>
                  <button className="border-2 border-gray-300 rounded-md p-1 px-4 hover:bg-gray-300 hover:text-white">
                    Add
                  </button>
                </div>
              </div>
            )}
    </section>
  );
}

export default EmployeeProjectView