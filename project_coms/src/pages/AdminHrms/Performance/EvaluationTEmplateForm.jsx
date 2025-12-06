import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaChevronDown,
  FaComments,
  FaFileAlt,
  FaPlus,
  FaTrash,
  FaUsers,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { getPerformanceCompetency } from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { MdClose } from "react-icons/md";
// import MultiSelect from ""

const ProgressStep = ({ icon, steps, isActive, isCompleted, title }) => (
  <div className="flex flex-col items-center">
    <div
      className={`rounded-full p-3 ${
        isActive
          ? "bg-blue-100 text-blue-500"
          : isCompleted
          ? "bg-green-100 text-green-500"
          : "bg-gray-200 text-gray-500"
      }`}
    >
      {isCompleted ? <FaCheck className="w-6 h-6" /> : icon}
    </div>
    <p
      className={`mt-2 text-sm ${
        isActive
          ? "text-blue-500 font-semibold"
          : isCompleted
          ? "text-green-500 font-semibold"
          : "text-gray-500"
      }`}
    >
      {steps}
    </p>
    {title}
  </div>
);
const EvaluationTemplateForm = () => {
  const [templateName, setTemplateName] = useState("");
  const [enableAttachment, setEnableAttachment] = useState("No");
  const [evaluationComponents, setEvaluationComponents] = useState("");
  const [goalPercentage, setGoalPercentage] = useState("0");
  const [competencyPercentage, setCompetencyPercentage] = useState("0");
  const [currentStep, setCurrentStep] = useState(1);
  const [competencies, setCompetencies] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      templateName,
      enableAttachment,
      evaluationComponents,
      goalPercentage,
      competencyPercentage,
    });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const [sections, setSections] = useState([
    {
      label: "",
      weightage: "",
      competencies: [
        { label: "", weightage: "" },
        { label: "", weightage: "" },
      ],
    },
  ]);

  const addCompetency = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].competencies.push({ label: "", weightage: "" });
    setSections(newSections);
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        label: "",
        weightage: "",
        competencies: [{ label: "", weightage: "" }],
      },
    ]);
  };
  const removeSection = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const removeCompetency = (sectionIndex, competencyIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].competencies = newSections[
      sectionIndex
    ].competencies.filter((_, i) => i !== competencyIndex);
    setSections(newSections);
  };

  const updateSection = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const updateCompetency = (sectionIndex, competencyIndex, field, value) => {
    const newSections = [...sections];
    newSections[sectionIndex].competencies[competencyIndex][field] = value;
    setSections(newSections);
  };

  // step 3

  const [sectionStep3, setSectionStep3] = useState([
    {
      label: "",
      questions: [
        {
          text: "",
          responseType: "",
          options: ["", "", ""],
        },
      ],
    },
  ]);
  const updateSectionStep3 = (sectionIndex, field, value) => {
    const newSections = [...sections];
    newSections[sectionIndex][field] = value;
    setSections(newSections);
  };

  const updateQuestion = (sectionIndex, questionIndex, field, value) => {
    const newSections = [...sections];
    newSections[sectionIndex].questions[questionIndex][field] = value;
    setSections(newSections);
  };

  const updateOption = (sectionIndex, questionIndex, optionIndex, value) => {
    const newSections = [...sections];
    newSections[sectionIndex].questions[questionIndex].options[optionIndex] =
      value;
    setSections(newSections);
  };

  const addOption = (sectionIndex, questionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].questions[questionIndex].options.push("");
    setSections(newSections);
  };

  const removeOption = (sectionIndex, questionIndex, optionIndex) => {
    const newSections = [...sectionStep3];
    newSections[sectionIndex].questions[questionIndex].options.splice(
      optionIndex,
      1
    );
    setSectionStep3(newSections);
  };

  const addQuestion = (sectionIndex) => {
    const newSections = [...sectionStep3];
    newSections[sectionIndex].questions.push({
      text: "",
      responseType: "",
      options: ["", "", ""],
    });
    setSectionStep3(newSections);
  };

  const removeQuestion = (sectionIndex, questionIndex) => {
    const newSections = [...sectionStep3];
    newSections[sectionIndex].questions.splice(questionIndex, 1);
    setSectionStep3(newSections);
  };

  const addSectionStep3 = () => {
    setSectionStep3([
      ...sectionStep3,
      {
        label: "",
        questions: [
          {
            text: "",
            responseType: "",
            options: ["", "", ""],
          },
        ],
      },
    ]);
  };

  const removeSectionStep3 = (index) => {
    const newSections = sectionStep3.filter((_, i) => i !== index);
    setSectionStep3(newSections);
  };

  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");

  useEffect(() => {
    const fetchCompetencies = async () => {
      try {
        const res = await getPerformanceCompetency(hrmsOrgId);
        setCompetencies(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompetencies();
  }, []);

  const handleSaveAndProceed = ()=> {
    console.log("Submit")
  }

  return (
    <div className="mx-auto p-2 bg-white ">
      <div className="flex justify-between items-center mb-4 rounded-lg border p-2">
        <ProgressStep
          icon={<FaFileAlt className="w-6 h-6" />}
          steps="Step 1"
          isActive={currentStep === 1}
          isCompleted={currentStep > 1}
          title={"Evaluation Template Settings"}
        />
        <div className="border flex-grow border-dashed"></div>
        <ProgressStep
          icon={<FaUsers className="w-6 h-6" />}
          steps="Step 2"
          isActive={currentStep === 2}
          isCompleted={currentStep > 2}
          title={"Define All Competencies"}
        />
        <div className="border flex-grow border-dashed"></div>
        {/* <div className="flex-grow mx-4 h-px bg-gray-300"></div> */}
        <ProgressStep
          icon={<FaComments className="w-6 h-6" />}
          steps="Step 3"
          isActive={currentStep === 3}
          isCompleted={currentStep > 3}
          title={"Qualitative Feedback"}
        />
      </div>
      <form onSubmit={handleSubmit}>
        {currentStep == 1 && (
          <>
            <div className="mb-4">
              <label
                htmlFor="templateName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Template Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="templateName"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Template Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Do you want to enable attachment upload?
                <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="Yes"
                    checked={enableAttachment === "Yes"}
                    onChange={() => setEnableAttachment("Yes")}
                    className="form-radio text-orange-500"
                    required
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="No"
                    checked={enableAttachment === "No"}
                    onChange={() => setEnableAttachment("No")}
                    className="form-radio text-orange-500"
                    required
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
            <div className="mb-4">{/* <MultiSelect  /> */}</div>
            <div className="mb-4">
              <label
                htmlFor="goalPercentage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Goal Evaluation Percentage
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="goalPercentage"
                value={goalPercentage}
                onChange={(e) => setGoalPercentage(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="0 %"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="competencyPercentage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Competency Evaluation Percentage
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="competencyPercentage"
                value={competencyPercentage}
                onChange={(e) => setCompetencyPercentage(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="0 %"
                required
              />
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-4 p-4 border rounded-lg">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold mb-4">
                    Section {sectionIndex + 1}
                  </h3>
                  <button
                    onClick={() => removeSection(sectionIndex)}
                    className=" text-red-500 hover:text-red-700"
                    aria-label="Remove section"
                  >
                    <MdClose size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section Label
                    </label>
                    <input
                      type="text"
                      value={section.label}
                      onChange={(e) =>
                        updateSection(sectionIndex, "label", e.target.value)
                      }
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter Section Label"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weightage
                    </label>
                    <input
                      type="text"
                      value={section.weightage}
                      onChange={(e) =>
                        updateSection(sectionIndex, "weightage", e.target.value)
                      }
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter Weightage"
                    />
                  </div>
                </div>
                {section.competencies.map((competency, competencyIndex) => (
                  <div
                    key={competencyIndex}
                    className="grid grid-cols-3 items-end gap-4 mb-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Competency {competencyIndex + 1}
                      </label>
                      <div className="relative">
                        <select
                          value={competency.label}
                          onChange={(e) =>
                            updateCompetency(
                              sectionIndex,
                              competencyIndex,
                              "label",
                              e.target.value
                            )
                          }
                          className="w-full p-2 pr-10 border rounded-md "
                        >
                          <option value="">Select</option>
                          {competencies.map((comp) => (
                            <option value={comp.id}>{comp.category}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weightage
                      </label>
                      <input
                        type="text"
                        value={competency.weightage}
                        onChange={(e) =>
                          updateCompetency(
                            sectionIndex,
                            competencyIndex,
                            "weightage",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter Weightage"
                      />
                    </div>
                    <button
                      onClick={() =>
                        removeCompetency(sectionIndex, competencyIndex)
                      }
                      className=" top-0 right-0 text-red-500 hover:text-red-700"
                      aria-label="Remove competency"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addCompetency(sectionIndex)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  + Add Competency
                </button>
              </div>
            ))}
            <button
              onClick={addSection}
              className="mb-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              + Add Section
            </button>
          </>
        )}

        {currentStep === 3 && (
          <>
            {sectionStep3.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8 p-4 border rounded-lg">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold mb-4">
                    Section {sectionIndex + 1}
                  </h3>
                  <button
                    onClick={() => removeSectionStep3(sectionIndex)}
                    className=" text-red-500 hover:text-red-700"
                    aria-label="Remove section"
                  >
                    <MdClose size={20} />
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Label
                  </label>
                  <input
                    type="text"
                    value={section.label}
                    onChange={(e) =>
                      updateSectionStep3(sectionIndex, "label", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter Section Label"
                  />
                </div>
                {section.questions.map((question, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="mb-6 p-4 border rounded-lg"
                  >
                    <div className="mb-4">
                      <div className="flex justify-between my-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Question {questionIndex + 1}
                        </label>
                        <button
                          onClick={() =>
                            removeQuestion(sectionIndex, questionIndex)
                          }
                          className="text-red-500"
                        >
                          <MdClose />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) =>
                          updateQuestion(
                            sectionIndex,
                            questionIndex,
                            "text",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter Question"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Response Type
                      </label>
                      <div className="relative">
                        <select
                          value={question.responseType}
                          onChange={(e) =>
                            updateQuestion(
                              sectionIndex,
                              questionIndex,
                              "responseType",
                              e.target.value
                            )
                          }
                          className="w-full p-2 pr-10 border rounded-md "
                        >
                          <option value="">Select Response Type</option>
                          <option value="Dropdown">Dropdown</option>
                          <option value="Checkbox">Checkbox</option>
                          <option value="Text">Text</option>
                          <option value="Number">Number</option>
                        </select>
                      </div>
                    </div>
                    {(question.responseType === "Dropdown" ||
                      question.responseType === "Checkbox") && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Options
                        </label>
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="flex items-center mb-2"
                          >
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                updateOption(
                                  sectionIndex,
                                  questionIndex,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                              className="flex-grow p-2 border rounded-md mr-2"
                              placeholder={`Enter Option ${optionIndex + 1}`}
                            />
                            <button
                              onClick={() =>
                                removeOption(
                                  sectionIndex,
                                  questionIndex,
                                  optionIndex
                                )
                              }
                              className="p-2 text-red-500 hover:text-red-700"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addOption(sectionIndex, questionIndex)}
                          className="mt-2 text-blue-500 hover:text-blue-700 flex items-center"
                        >
                          <FaPlus className="mr-1" /> Add Option
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addQuestion(sectionIndex)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  + Add Question
                </button>
              </div>
            ))}
            <button
              onClick={addSectionStep3}
              className="mb-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              + Add Section
            </button>
          </>
        )}

        <div className="flex justify-center items-center gap-4 ">
          <button className="p-2 px-4 border-2 rounded-md border-red-400 text-red-400">
            Cancel
          </button>
          <div>
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Back
              </button>
            )}
            <button
              onClick={currentStep < 3 ? handleNext : handleSaveAndProceed}
              // onClick={handleNext}
              style={{ background: themeColor }}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 "
            >
              {currentStep < 3 ? "Next" : "Save & Complete"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EvaluationTemplateForm;
