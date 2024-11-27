import React from "react";
import { FaCheck } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";

const AttendanceTemplateProcess = ({ steps }) => {
  return (
    <div className="bg-white rounded-lg border-r p-6 w-80">
      <h2 className="text-xl font-semibold mb-6">Process</h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start">
            <div className="relative flex items-center justify-center">
              {step.completed ? (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <FaCheck className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center">
                  <FiFileText className="w-5 h-5 text-purple-600" />
                </div>
              )}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gray-300" />
              )}
            </div>
            <div className="ml-4">
              <p
                className={`font-medium ${
                  step.completed ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {step.id}. {step.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceTemplateProcess;
