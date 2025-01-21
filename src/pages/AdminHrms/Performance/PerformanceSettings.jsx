import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ImFileText2 } from "react-icons/im";
import AdminHRMS from "../AdminHrms";
// import { LuBookTemplate, LuGoal } from "react-icons/lu";
import { MdAutoGraph } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import GoalCompetency from "./GoalCompetency";
import EvaluationTemplate from "./EvaluationTemplate";
import PerformanceCycle from "./PerformanceCycle";
import { LucideBookTemplate, LucideGoal } from "lucide-react";

const PerformanceSettings = () => {
  const stepsData = [
    { id: 0, title: "1.Goal Category / Competency Bank", icon: <LucideGoal /> },
    {
      id: 1,
      title: "2. Evaluation Template",
      icon: <LucideBookTemplate />,
    },
    {
      id: 2,
      title: "3. Performance Cycle",
      icon: <MdAutoGraph />,
    },
  ];
  const [activePage, setActivePage] = useState(0);
  const handleStepClick = (stepId) => {
    setActivePage(stepId);
  };
  return (
    <div className="flex ml-20">
      <AdminHRMS />
      <div className="mt-10 mx-2 border rounded-xl max-w-96 min-w-80 max-h-80 h-80">
        <div className=" p-4 ">
          <h2 className="text-lg font-semibold flex items-center border-b">
            <FaChevronRight className="h-4 w-4 mr-2" />
            Performance Settings
          </h2>
        </div>
        <div className="bg-white ">
          {stepsData.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center p-4 ${
                index !== stepsData.length - 1 ? "border-b" : ""
              } cursor-pointer`}
              onClick={() => handleStepClick(step.id)}
            >
              <div
                className={`rounded-full p-2 mr-4 ${
                  activePage === step.id ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                {React.cloneElement(step.icon, {
                  className: `w-6 h-6 ${
                    activePage === step.id ? "text-blue-500" : "text-gray-400"
                  }`,
                })}
              </div>
              <span
                className={`${
                  activePage === step.id ? "text-black" : "text-gray-400"
                } font-medium`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full p-1">
        {activePage === 0 && <GoalCompetency />}
        {activePage === 1 && <EvaluationTemplate />}
        {activePage === 2 && <PerformanceCycle />}
      </div>
    </div>
  );
};

export default PerformanceSettings;
