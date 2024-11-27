import React, { useState } from "react";
import AttendanceDetailsList from "./AttendanceDetailsList";
import AttendanceTemplateProcess from "./AttendanceTemplateProcess";
import AdminHRMS from "./AdminHrms";
import { FaCheck } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import TemplateGeneralSetting from "./AttendanceTemplate/TemplateGeneralSetting";
import AttendanceRegularization from "./AttendanceTemplate/AttendanceRegularization";
import LateEarlyCheckouts from "./AttendanceTemplate/LateEarlyCheckouts";
import OTSettings from "./AttendanceTemplate/OTSettings";
import { GrHelpBook } from "react-icons/gr";

const AttAddTemplate = () => {
  const initialSteps = [
    { id: 1, title: "General Template Settings", completed: false },
    { id: 2, title: "Attendance Regularization", completed: false },
    { id: 3, title: "Late Marks and Early Check Outs", completed: false },
    { id: 4, title: "Change OT Settings", completed: false },
  ];

  const [steps, setSteps] = useState(initialSteps);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    // Mark the current step as completed and move to the next step
    setSteps((prevSteps) =>
      prevSteps.map((step, index) =>
        index === currentStep ? { ...step, completed: true } : step
      )
    );
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    if (steps[stepIndex].completed || stepIndex === currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleCancel = () => {
    // Reset steps or navigate away
    console.log("Cancel clicked");
    setSteps(initialSteps);
    setCurrentStep(0);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const listItemStyle = {
    listStyleType: "disc",
    color: "gray",
    fontSize: "14px",
    fontWeight: 500,
  };

  return (
    <div className="flex ml-20">
      <AdminHRMS />
      <div className="bg-white border-r py-6 px-4 w-72">
        <h2 className="text-xl font-semibold mb-6">Process</h2>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start ${
                step.completed || index === currentStep
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              }`}
              onClick={() => handleStepClick(index)}
            >
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
                  className={`font-medium text-sm ${
                    step.completed ? "text-blue-500" : "text-black"
                  }`}
                >
                  {step.id}. {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow py-6 px-2">
        {currentStep === 0 && (
          <TemplateGeneralSetting
            handleNextStep={handleNextStep}
            handleCancel={handleCancel}
            handleBack={handleBack}
          />
        )}
        {currentStep === 1 && (
          <AttendanceRegularization
            handleNextStep={handleNextStep}
            handleCancel={handleCancel}
            handleBack={handleBack}
          />
        )}
        {currentStep === 2 && (
          <LateEarlyCheckouts
            handleNextStep={handleNextStep}
            handleCancel={handleCancel}
            handleBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <OTSettings handleCancel={handleCancel} handleBack={handleBack} />
        )}
      </div>
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium">
            <GrHelpBook size={20} />
            <h2>Help Center</h2>
          </div>
          <div className="">
            <ul style={listItemStyle} className="flex flex-col gap-2">
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Attendance settings allows you to configure attendance
                    policies in the form of templates based on different
                    departments, profiles, locations, etc.{" "}
                  </li>{" "}
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Within the attendance templates you can choose the mode of
                    capturing the attendance like web check-in, biometrics,
                    timesheet, mobile application.{" "}
                  </li>
                </ul>
              </li>

              <li>
                <p>
                  You can automate the attendance process by automatically
                  capturing late marks, half-days, overtime and leave deductions
                  based on the template settings. You can also configure
                  attendance regularization limit and reason.
                </p>
              </li>
              <li>
                <p>
                  In the web check-in you can restrict capturing attendance
                  through static IP. Similarly, in mobile applications you can
                  restrict capturing attendance through geo-fencing.{" "}
                </p>
              </li>
              <li>
                <p>
                  Attendance module is integrated with leave and payroll module
                  and hence will sync data from the attendance module and derive
                  data like LOP calculations for running payroll.{" "}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttAddTemplate;
