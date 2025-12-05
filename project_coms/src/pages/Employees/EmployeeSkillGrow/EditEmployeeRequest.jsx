import React, { useRef, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import FileInputBox from "../../../containers/Inputs/FileInputBox";
import Select from "react-select";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";
function EditEmployeeRequest() {
  const [selectedTaskAssignee, setSelectedTaskAssignee] = useState([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState([]);
  const [budgetSection, setBudgetSection] = useState([]);
  const [taskSection, setTaskSection] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  const taskAssignee = [
    { value: "karan", label: "Karan Gupta" },
    { value: "riya", label: "Riya Yadav" },
    { value: "vinay", label: "Vinay Singh" },
    { value: "naharika", label: "Naharika Gupta" },
    { value: "neha", label: "Neha Mishra" },
    { value: "ritesh", label: "Ritesh Pandey" },
  ];

  const handleChangeTaskAssignee = (selected) => {
    setSelectedTaskAssignee(selected);
  };

  const teamMember = [
    { value: "karan", label: "Karan Gupta" },
    { value: "riya", label: "Riya Yadav" },
    { value: "vinay", label: "Vinay Singh" },
    { value: "naharika", label: "Naharika Gupta" },
    { value: "neha", label: "Neha Mishra" },
    { value: "ritesh", label: "Ritesh Pandey" },
  ];
  const handleChangeTeamMember = (selected) => {
    setSelectedTeamMember(selected);
  };

  const addBugdetSection = () => {
    setBudgetSection([
      ...budgetSection,
      { id: budgetSection.length, content: "" },
    ]);
  };

  const removeBudgetSection = (id) => {
    setBudgetSection(budgetSection.filter((budget) => budget.id !== id));
  };

  const addTaskSection = () => {
    setTaskSection([...taskSection, { id: taskSection.length, content: "" }]);
  };

  const removeTaskSection = (id) => {
    setTaskSection(taskSection.filter((task) => task.id !== id));
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold p-2 bg-black rounded-full text-white md:mx-20 mb-5"
        >
          Edit Project Request
        </h2>
        <div className="flex justify-center mt-4">
          <div className="border-2 border-gray-300 rounded-md w-4/5 p-4 mb-8">
            <h2 className="border-b border-gray-500 my-5 text-2xl font-medium pb-3 px-5">
              Edit Project
            </h2>
            <div className="md:grid grid-cols-3 gap-4 md:mx-10">
              <div className="flex flex-col">
                <label
                  className="text-base font-medium text-gray-600 mb-2"
                  htmlFor="title"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter Project Name"
                  className="border p-1 py-2 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-base font-medium text-gray-600 mb-2"
                  htmlFor="start_date"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  className="border p-1 py-2 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-base font-medium text-gray-600 mb-2"
                  htmlFor="end_date"
                >
                  End Date
                </label>
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  className="border p-1 py-2 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label
                  className="text-base font-medium text-gray-600 mb-2"
                  htmlFor="privacy"
                >
                  Privacy
                </label>
                <select
                  name="privacy"
                  id="privacy"
                  className="border p-1 py-2 border-gray-500 rounded-md w-full"
                >
                  <option value="public">Select Privacy</option>
                  <option value="public">Public to your team</option>
                  <option value="project-member">
                    Private to project member
                  </option>
                  <option value="private">Private to you</option>
                </select>
              </div>
              <div className="flex flex-col ">
                <label
                  className="text-base font-medium text-gray-600 mb-2"
                  htmlFor="teamMember"
                >
                  Team Member
                </label>
                <Select
                  isMulti
                  options={teamMember}
                  value={selectedTeamMember}
                  onChange={handleChangeTeamMember}
                  placeholder="Select Team Member"
                />
              </div>
              <div className="flex flex-col ">
                <label
                  className="text-base font-medium text-gray-600 mb-2"
                  htmlFor="priority"
                >
                  Priority
                </label>
                <select
                  name="priority"
                  id="priority"
                  className="border p-1 py-2 border-gray-500 rounded-md w-full"
                >
                  <option value="">Select Priority</option>
                  <option value="">High</option>
                  <option value="">Medium</option>
                  <option value="">Low</option>
                </select>
              </div>
              <div className="col-span-3">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-500 my-5 pb-3">
                  Project Task
                </h2>
                <div className="md:grid grid-cols-3 gap-4 ">
                  <div className="flex flex-col">
                    <label
                      className="text-base font-medium text-gray-600 mb-2"
                      htmlFor="taskName"
                    >
                      Task Name
                    </label>
                    <input
                      type="text"
                      name="taskName"
                      id="taskName"
                      placeholder="Enter Task Name"
                      className="border p-1 py-2 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="text-base font-medium text-gray-600 mb-2"
                      htmlFor="start_date"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      id="start_date"
                      className="border p-1 py-2 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="text-base font-medium text-gray-600 mb-2"
                      htmlFor="end_date"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      id="end_date"
                      className="border p-1 py-2 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="text-base font-medium text-gray-600 mb-2"
                      htmlFor="end_date"
                    >
                      Select Assignee
                    </label>
                    <Select
                      isMulti
                      options={taskAssignee}
                      value={selectedTaskAssignee}
                      onChange={handleChangeTaskAssignee}
                      placeholder="Select Assignee"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <label
                  className="text-base font-medium text-gray-600 mb-2"
                  htmlFor="description"
                >
                  Task Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  placeholder="Description"
                  className="border p-1 py-2 border-gray-500 rounded-md w-full"
                />
              </div>
              <div className="col-span-3">
                <label
                  className="text-base font-medium text-gray-600 mb-2"
                  htmlFor="description"
                >
                  Upload Attachments{" "}
                  <span className="text-gray-400 font-normal text-sm">
                    (related to task)
                  </span>
                </label>
                <FileInputBox />
              </div>
              <div className="col-span-3">
                {taskSection.map((task) => (
                  <div key={task.id} className="md:grid grid-cols-3 gap-4 ">
                    <div className="flex flex-col">
                      <label
                        className="text-base font-medium text-gray-600 mb-2"
                        htmlFor="taskName"
                      >
                        Task Name
                      </label>
                      <input
                        type="text"
                        name="taskName"
                        id="taskName"
                        placeholder="Enter Task Name"
                        className="border p-1 py-2 border-gray-500 rounded-md"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="text-base font-medium text-gray-600 mb-2"
                        htmlFor="start_date"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="start_date"
                        id="start_date"
                        className="border p-1 py-2 border-gray-500 rounded-md"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="text-base font-medium text-gray-600 mb-2"
                        htmlFor="end_date"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        name="end_date"
                        id="end_date"
                        className="border p-1 py-2 border-gray-500 rounded-md"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="text-base font-medium text-gray-600 mb-2"
                        htmlFor="end_date"
                      >
                        Select Assignee
                      </label>
                      <Select
                        isMulti
                        options={taskAssignee}
                        value={selectedTaskAssignee}
                        onChange={handleChangeTaskAssignee}
                        placeholder="Select Assignee"
                      />
                    </div>
                    <div className="col-span-3">
                      <label
                        className="text-base font-medium text-gray-600 mb-2"
                        htmlFor="description"
                      >
                        Task Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        rows="3"
                        placeholder="Description"
                        className="border p-1 py-2 border-gray-500 rounded-md w-full"
                      />
                    </div>
                    <div className="col-span-3">
                      <label
                        className="text-base font-medium text-gray-600 mb-2"
                        htmlFor="description"
                      >
                        Task File
                      </label>
                      <FileInputBox />
                    </div>
                    <div className="mt-8 flex flex-col justify-center">
                      <button onClick={() => removeTaskSection(task.id)}>
                        <RiDeleteBin5Line size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-span-3">
                <button
                  onClick={addTaskSection}
                  className="mt-4 p-2 px-4 text-white rounded flex gap-2"
                  style={{ background: themeColor }}
                >
                  <IoAddCircleOutline size={22} /> Add
                </button>
              </div>
              <div className="col-span-3">
                <h2 className="text-xl font-medium text-gray-700 border-b border-gray-500 my-5 pb-3">
                  Project Budget
                </h2>
                <div className="flex flex-col ">
                  <label
                    className="text-base font-medium text-gray-600 mb-2"
                    htmlFor="budget"
                  >
                    Total Project Budget
                  </label>
                  <input
                    type="text"
                    name="budget"
                    id="budget"
                    placeholder="Budget"
                    className="border p-1 py-2 border-gray-500 rounded-md w-full"
                  />
                </div>
                <div className="md:grid grid-cols-3 gap-4 my-5">
                  <div className="flex flex-col">
                    <label
                      className="text-base font-medium text-gray-600 mb-2"
                      htmlFor="categoryName"
                    >
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="categoryName"
                      id="categoryName"
                      placeholder="Category Name"
                      className="border p-1 py-2 border-gray-500 rounded-md w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="text-base font-medium text-gray-600 mb-2"
                      htmlFor="categeryBudget"
                    >
                      Categery Budget
                    </label>
                    <input
                      type="text"
                      name="categeryBudget"
                      id="categeryBudget"
                      placeholder="Categery Budget"
                      className="border p-1 py-2 border-gray-500 rounded-md w-full"
                    />
                  </div>
                </div>
                <div className="">
                  {budgetSection.map((budget) => (
                    <div
                      key={budget.id}
                      className="md:grid grid-cols-3 gap-4 my-5"
                    >
                      <div className="flex flex-col">
                        <label
                          className="text-base font-medium text-gray-600 mb-2"
                          htmlFor="categoryName"
                        >
                          Category Name
                        </label>
                        <input
                          type="text"
                          name="categoryName"
                          id="categoryName"
                          placeholder="Category Name"
                          className="border p-1 py-2 border-gray-500 rounded-md w-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="text-base font-medium text-gray-600 mb-2"
                          htmlFor="categeryBudget"
                        >
                          Categery Budget
                        </label>
                        <input
                          type="text"
                          name="categeryBudget"
                          id="categeryBudget"
                          placeholder="Categery Budget"
                          className="border p-1 py-2 border-gray-500 rounded-md w-full"
                        />
                      </div>
                      <div className="mt-8 flex flex-col justify-center">
                        <button onClick={() => removeBudgetSection(budget.id)}>
                          <RiDeleteBin5Line size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addBugdetSection}
                  className="mt-4 p-2 px-4 text-white rounded flex gap-2"
                  style={{ background: themeColor }}
                >
                  <IoAddCircleOutline size={22} /> Add
                </button>
              </div>
            </div>
            <div className="border-t border-gray-500 my-5 md:mx-10"></div>
            <div className="md:grid grid-cols-3 gap-4 md:mx-10">
              <div className="col-span-3">
                <label
                  className="text-base font-medium text-gray-600 my-2"
                  htmlFor="description"
                >
                  Project File
                </label>
                <FileInputBox />
              </div>
              <div className="col-span-3">
                <label
                  className="text-base font-medium text-gray-600"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  placeholder="Description"
                  className="border p-1 py-2 border-gray-500 rounded-md w-full mt-2"
                />
              </div>
              <div className="col-span-3">
                <label
                  className="text-base font-medium text-gray-600 "
                  htmlFor="description"
                >
                  Note
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  placeholder="Note"
                  className="border p-1 py-2 border-gray-500 rounded-md w-full mt-2"
                />
              </div>
            </div>
            <div className="md:mx-10 my-5">
              <label
                htmlFor="file-upload"
                className="border-2 border-dashed p-4 mb-4 border-gray-300 rounded-lg w-full flex items-center justify-center cursor-pointer"
              >
                <p>Upload Project Picture</p>
              </label>
              <input type="file" className="hidden" id="file-upload" />
            </div>
            <div className="flex justify-center border-t border-gray-500 py-5 mt-5">
              <button
                type="submit"
                className="border-2 border-gray-500 rounded-md p-2 px-5 text-white"
                style={{ background: themeColor }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditEmployeeRequest;
