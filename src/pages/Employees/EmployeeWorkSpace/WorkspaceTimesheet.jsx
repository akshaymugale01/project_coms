import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import EmployeePortal from "../../../components/navbars/EmployeePortal";
import DataTable from "react-data-table-component";
import Table from "../../../components/table/Table";
import { PiPlusBold } from "react-icons/pi";
import { useSelector } from "react-redux";

// Sample data
const initialTimesheetData = [
  {
    id: 1,
    date: "2024-08-27",
    startTime: "09:00",
    endTime: "17:00",
    totalHoursWorked: "8",
    taskDone: "Development",
    projectDone: "Project A",
  },
  {
    id: 2,
    date: "2024-08-28",
    startTime: "10:00",
    endTime: "17:00",
    totalHoursWorked: "7",
    taskDone: "Testing",
    projectDone: "Project B",
  },
];

// Columns configuration
const columns = [
  { name: "Date", selector: (row) => row.date, sortable: true },
  { name: "Start Time", selector: (row) => row.startTime, sortable: true },
  { name: "End Time", selector: (row) => row.endTime, sortable: true },
  {
    name: "Total Hours Worked",
    selector: (row) => row.totalHoursWorked,
    sortable: true,
  },
  { name: "Task Done", selector: (row) => row.taskDone, sortable: true },
  { name: "Project Done", selector: (row) => row.projectDone, sortable: true },
];

const WorkspaceTimesheet = () => {
  const [searchDate, setSearchDate] = useState("");
  const [filteredData, setFilteredData] = useState(initialTimesheetData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formRows, setFormRows] = useState([{ totalHours: "", task: "", project: "", description: "" }]);
  const themeColor = useSelector((state) => state.theme.color);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSearchDate(date);
    if (date) {
      const filtered = initialTimesheetData.filter((item) => item.date === date);
      setFilteredData(filtered);
    } else {
      setFilteredData(initialTimesheetData);
    }
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddRow = () => {
    setFormRows([...formRows, { totalHours: "", task: "", project: "", description: "" }]);
  };

  const handleFormChange = (index, e) => {
    const { name, value } = e.target;
    const newRows = [...formRows];
    newRows[index][name] = value;
    setFormRows(newRows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data:", formRows);
    handleModalToggle(); // Close the modal after submission
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="p-2 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <EmployeePortal />
        <div className="my-2 flex justify-between">
          <input
            type="date"
            id="dateFilter"
            value={searchDate}
            onChange={handleDateChange}
            className="border p-1 rounded-md"
          />
          <button
            className="flex items-center gap-2 px-2 text-white rounded-md"
            style={{ background: themeColor }}
            onClick={handleModalToggle}
          >
            <PiPlusBold /> Add Timesheet
          </button>
        </div>
        <Table
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
        />
       {isModalOpen && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-20">
    <div className="bg-white overflow-auto max-h-[70%] md:w-auto hide-scrollbar w-96 p-4 px-8 flex flex-col rounded-md gap-5">
      <h2 className="text-lg font-semibold mb-4">Add Timesheet</h2>
      <form onSubmit={handleSubmit}>
        {formRows.map((row, index) => (
          <div key={index} className="mb-4 flex gap-2">
            <div className="flex flex-col gap-2 mb-2">
              <label className="font-medium">Start Time</label>
              <input
                type="time"
                name="totalHours"
                value={row.totalHours}
                onChange={(e) => handleFormChange(index, e)}
                placeholder="Total Hours"
                className="border p-2 rounded-md flex-grow w-40"
              />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label className="font-medium">End Time</label>
              <input
                type="time"
                name="totalHours"
                value={row.totalHours}
                onChange={(e) => handleFormChange(index, e)}
                placeholder="Total Hours"
                className="border p-2 rounded-md flex-grow w-40"
              />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label className="font-medium">Task</label>
              <input
                type="text"
                name="task"
                value={row.task}
                onChange={(e) => handleFormChange(index, e)}
                placeholder="Task"
                className="border p-2 rounded-md flex-grow"
              />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label className="font-medium">Project</label>
              <input
                type="text"
                name="project"
                value={row.project}
                onChange={(e) => handleFormChange(index, e)}
                placeholder="Project"
                className="border p-2 rounded-md flex-grow"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddRow}
          className="mb-4 bg-blue-500 text-white px-4 py-1 rounded-md"
        >
          Add Row
        </button>
        <div className="flex flex-col gap-2 mb-4">
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            // value={description}
            // onChange={handleDescriptionChange}
            placeholder="Description"
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={()=>setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      </div>
    </section>
  );
};

export default WorkspaceTimesheet;
