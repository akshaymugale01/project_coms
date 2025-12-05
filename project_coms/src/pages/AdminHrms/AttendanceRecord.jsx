import React, { useState } from "react";
import dayjs from "dayjs";
import ToggleSwitch from "../../Buttons/ToggleSwitch";
import AdminHRMS from "./AdminHrms";
import { FaArrowLeft, FaArrowRight, FaRedo, FaTimes } from "react-icons/fa";
import EmployeeDetailView from "./EmployeeDetailView";
import { useSelector } from "react-redux";

// Example data
const employees = [
  { name: "Aniket Parkar", code: "AP" },
  { name: "Prathamesh Palav", code: "PP" },
  { name: "Sami Saudagar", code: "SS" },
  { name: "Ajay Baniya", code: "AB" },
  { name: "Sujal Bhavkar", code: "SB" },
  { name: "Ritik Solanki", code: "RS" },
  { name: "Dhiraj Pogaiy", code: "DP" },
  { name: "Prathamesh Raut", code: "PR" },
  { name: "Praveen Nair", code: "PN" },
  { name: "Mahek Nair", code: "MN" },
];

const rosterData = [
  {
    employee: "Aniket Parkar",
    schedule: [
      "09:00 AM - 06:00 PM",
      "09:00 AM - 06:00 PM",
      "Absent",
      "09:00 AM - 06:00 PM",
      "09:00 AM - 06:00 PM",
      "09:00 AM - 06:00 PM",
      "09:00 AM - 06:00 PM",
    ],
    code: "AP",
  },
  {
    employee: "Prathamesh Palav",
    schedule: [
      "09:00 AM - 06:00 PM",
      "09:00 AM - 06:00 PM",
      "09:00 AM - 06:00 PM",
      "Absent",
      "09:00 AM - 06:00 PM",
      "09:00 AM - 06:00 PM",
      "09:00 AM - 06:00 PM",
    ],
    code: "PP",
  },
  {
    employee: "Sami Saudagar",
    schedule: [
      "09:00 AM - 06:00 PM",
      "09:00 AM - 06:00 PM",
      "Weekly Off",
      "Absent",
      "09:00 AM - 06:00 PM",
      "Absent",
      "09:00 AM - 06:00 PM",
    ],
    code: "SS",
  },
  {
    employee: "Ajay Baniya",
    schedule: [
      "09:00 AM - 06:00 PM",
      "09:00 AM - 06:00 PM",
      "Absent",
      "09:00 AM - 06:00 PM",
      "09:00 AM - 06:00 PM",
      "09:00 AM - 06:00 PM",
      "09:00 AM - 06:00 PM",
    ],
    code: "AB",
  },
  // Add more employee schedules here
];
const splitTime = (time) => {
  if (time.includes(" - ")) {
    return time.split(" - ");
  }
  return [time];
};
const AttendanceRecords = () => {
  const [uploadFormat, setUploadFormat] = useState("My Citi Life");
  const [selectedYear, setSelectedYear] = useState("");
  const themeColor = useSelector((state) => state.theme.color);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDateFormat, setSelectedDateFormat] = useState("DD/MM/YYYY");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Logic to handle file upload
    console.log("File uploaded:", file);
  };
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeDetail = () => {
    setSelectedEmployee(null);
  };
  const [startDate, setStartDate] = useState(dayjs("2024-07-06"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedRecord1, setSelectedRecord1] = useState(false);
  const handleselectedRecord1 = () => {
    setSelectedRecord1(!selectedRecord1);
  };
  const handleNextWeek = () => {
    setStartDate(startDate.add(1, "week"));
  };

  const handlePrevWeek = () => {
    setStartDate(startDate.subtract(1, "week"));
  };

  const renderDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(startDate.add(i, "day"));
    }
    return dates;
  };

  const dates = renderDates();

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRecordClick = (employee, schedule, code) => {
    setSelectedRecord({ employee, schedule, code });
  };

  return (
    <div className="flex">
      <AdminHRMS />

      <div className="ml-20  bg-gray-100 p-2 w-full">
        {/* Header */}
        <div>
          <header
            style={{ background: themeColor }}
            className="bg-blue-500 text-white p-4 flex justify-between rounded-md items-center"
          >
            <h1 className="text-2xl font-bold">Attendance Record</h1>
            <div className="flex items-center space-x-4">
              <input
                className="border p-1 w-64 px-4 text-black border-gray-500 rounded-md"
                value="2024-07"
                type="month"
              />

              <select
                className="border p-2 text-black w-48 rounded"
                name=""
                id=""
              >
                <option value="">Action</option>
                <option value="">Bulk Regularization</option>
                <option value="">Bulk Delete</option>
              </select>
              <button
                onClick={() => setIsModalOpen1(true)}
                className="bg-white p-2 text-black rounded"
              >
                Upload Records
              </button>
              <button
                style={{ background: themeColor }}
                className="bg-black p-2 rounded"
                onClick={handleModalToggle}
              >
                Filter
              </button>
              <button
                style={{ background: themeColor }}
                className="bg-black p-2 rounded "
                onClick={() => setIsModalOpen2(true)}
              >
                <FaRedo />
              </button>

              <label className="text-white" htmlFor="">
                Multiselect
              </label>
              <ToggleSwitch />
            </div>
          </header>
        </div>
        {/* Main Content */}
        <div className="flex gap-5 mt-2 ">
          <div className="flex gap-2">
            <div class="w-4 h-4 bg-green-500 mt-1 rounded-full"></div>
            <p> Present</p>
          </div>
          <div className="flex gap-2">
            <div class="w-4 h-4 bg-red-500 mt-1 rounded-full"></div>
            <p> Absent</p>
          </div>
          <div className="flex gap-2">
            <div class="w-4 h-4 bg-orange-500 mt-1 rounded-full"></div>
            <p>Weekly Off/Holiday</p>
          </div>
          <div className="flex gap-2">
            <div class="w-4 h-4 bg-blue-500 mt-1 rounded-full"></div>
            <p>Half Day</p>
          </div>
          <div className="flex gap-2">
            <div class="w-4 h-4 bg-gray-500 mt-1 rounded-full"></div>
            <p>No Shift/Template missing</p>
          </div>
          <div className="flex gap-2">
            <div class="w-4 h-4 bg-black mt-1 rounded-full"></div>
            <p> Invalid Record</p>
          </div>
          <div className="flex gap-2">
            <div class="w-4 h-4 bg-yellow-400 mt-1 rounded-full"></div>
            <p> Early</p>
          </div>
          <div className="flex gap-2">
            <div class="w-4 h-4 bg-pink-400 mt-1 rounded-full"></div>
            <p> Late</p>
          </div>
        </div>
        <div className="flex  mt-6">
          <div className="w-1/4 bg-white p-4 rounded shadow-md mr-2">
            <p className="font-bold mb-5">Employee List</p>
            <input
              type="text"
              placeholder="Search Employee Name/Code"
              className="w-64 p-2 border mb-4 rounded"
            />
            {employees.map((employee, index) => (
              <li key={index} className="p-2 flex items-center border-b">
                <span className="bg-gray-200 p-2 rounded-full mr-2">
                  {employee.code}
                </span>
                <button onClick={() => handleEmployeeClick(employee)}>
                  {employee.name}
                </button>
              </li>
            ))}
            {selectedEmployee && (
              <EmployeeDetailView
                employee={selectedEmployee}
                closeDetail={closeDetail}
              />
            )}
          </div>
          <div className="w-3/4 bg-white p-4 rounded shadow-md">
            <div className="flex justify-between mb-4">
              <button
                className="bg-gray-300 p-2 rounded"
                onClick={handlePrevWeek}
              >
                <FaArrowLeft />
              </button>
              <button
                className="bg-gray-300 p-2 rounded"
                onClick={handleNextWeek}
              >
                <FaArrowRight />
              </button>
            </div>
            <div className="flex gap-2">
              <table className="table-auto w-full">
                <thead
                  style={{ background: themeColor }}
                  className="text-white"
                >
                  <tr>
                    {dates.map((date) => (
                      <th key={date} className="px-4 py-2">
                        {date.format("ddd DD MMM")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rosterData.map((employee, index) => (
                    <tr key={index}>
                      {employee.schedule.map((time, idx) => {
                        const [startTime, endTime] = splitTime(time);
                        let baseClass =
                          "border text-center  font-medium cursor-pointer";
                        let conditionClass = "";

                        if (time === "Weekly Off") {
                          conditionClass = "bg-orange-200  hover:bg-orange-400";
                        } else if (time === "09:00 AM - 06:00 PM") {
                          conditionClass = "bg-white-400 hover:bg-green-600";
                        } else if (time === "Absent") {
                          conditionClass = "text-red-400 hover:bg-red-600 ";
                        }

                        return (
                          <td
                            key={idx}
                            className={`${baseClass} ${conditionClass}`}
                            onClick={() =>
                              handleRecordClick(
                                employee.employee,
                                time,
                                employee.code
                              )
                            }
                          >
                            <div className="flex flex-col">
                              <span>{startTime}</span>
                              {endTime && <span>{endTime}</span>}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Filter Options</h2>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Attendance Template
                </label>
                <input type="text" className="border p-2 w-full rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Branch Location</label>
                <input type="text" className="border p-2 w-full rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Employee Department
                </label>
                <input type="text" className="border p-2 w-full rounded" />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-300 p-2 rounded"
                  onClick={handleModalToggle}
                >
                  Cancel
                </button>
                <button className="bg-blue-400 p-2 rounded">Apply</button>
              </div>
            </div>
          </div>
        )}
        {isModalOpen2 && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Refresh Records</h2>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Select Start Date *
                </label>
                <input type="date" className="border p-2 w-full rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Select End Date *</label>
                <input type="date" className="border p-2 w-full rounded" />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-300 p-2 rounded"
                  onClick={() => setIsModalOpen2(false)}
                >
                  Cancel
                </button>
                <button className="bg-blue-400 p-2 rounded">Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isModalOpen1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
            <h2 className="text-xl font-bold mb-4">
              Upload Attendance Records
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700">
                Step 1: Select upload format*
              </label>
              <select
                value={uploadFormat}
                onChange={(e) => setUploadFormat(e.target.value)}
                className="border border-gray-400 p-2 rounded-md mt-1"
              >
                <option value="My Citi Life">
                My Citi Life General Format
                </option>
                <option value="ESSL">ESSL Basic Report Format</option>
              </select>
            </div>

            {uploadFormat === "My Citi Life" && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Step 2: Select month and year for download or upload*
                  </label>
                  <div className="flex gap-5 mb-4">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-48 border border-gray-400 p-2 rounded-md"
                    >
                      <option value="">Select year</option>
                      {/* Add options for years here */}
                    </select>

                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-48 border border-gray-400 p-2 rounded-md"
                    >
                      <option value="">Select month</option>
                      {/* Add options for months here */}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">
                    Step 3: Download attendance global format*
                  </label>
                  <p className="text-gray-600 text-sm mb-2">
                    Includes all your employees with their pre-existing
                    attendance records as per Company's Attendance Cycle Dates
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    <li>
                      Select all the cells instructions when uploading check in
                      times
                    </li>
                    <li>Right click and select the format cells button</li>
                    <li>Choose the "Text" format</li>
                    <li>
                      Enter the check-in / check-out times in AM/PM format: E.g.
                      8:05 AM or 12:30 PM
                    </li>
                  </ul>
                  <button
                    onClick={handleUpload}
                    className="w-52 mt-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Download
                  </button>
                </div>
              </>
            )}

            {uploadFormat === "ESSL" && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Step 2: Download sample biometric format
                  </label>
                  <p className="text-gray-600 text-sm mb-2">
                    Includes all your Employees with their pre-existing
                    attendance records as per Company's Attendance Cycle Dates
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    <li>
                      Make sure that attendance template assigned to employees
                      have Biometric or Both Biometric & Web check-in enabled.
                    </li>
                    <li>
                      ESSL upload would not work for employees not having
                      Biometric code.
                    </li>
                    <button
                      onClick={handleUpload}
                      className="w-52 mt-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      Download
                    </button>
                  </ul>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">
                    Step 3: Select date format in which you want to upload*
                  </label>
                  <select
                    value={selectedDateFormat}
                    onChange={(e) => setSelectedDateFormat(e.target.value)}
                    className="w-48 border border-gray-400 p-2 rounded-md"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    {/* Add other date formats if needed */}
                  </select>
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block text-gray-700">
                Step 4: Make necessary changes in the downloaded file and
                upload*
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 border p-2 rounded-md"
              />
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={handleUpload}
                className="w-48 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Upload
              </button>
              <button
                onClick={() => setIsModalOpen1(false)}
                className="w-48 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Panel */}
      {selectedRecord && !selectedRecord1 && (
        <div className="fixed right-0 top-0 bg-white shadow-lg p-6 w-1/3 h-full overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Selected Employee Details</h2>
          <div className="flex gap-2">
            <div className="mt-2">
              <span className="bg-gray-200 p-2 rounded-full mt-2 mr-2">
                {selectedRecord.code}
              </span>
            </div>
            <div className="flex flex-col mb-2">
              <p className="font-semibold text-sm">{selectedRecord.employee}</p>
              <p className="font-sm">Business & Operations Manager</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p>Attendance Details </p>
              <p>6 Jul 24, Mon</p>
            </div>
            <div className="w-10 h-8 border p-2 flex justify-center items-center border-green-800 rounded-md">
              <p className="font-bold  ">P</p>
            </div>
          </div>
          <div className="mb-2 mt-2 flex justify-between">
            <p>Check In</p>
            <p>09:00 am</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p>Check Out</p>
            <p>06:00 am</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p>Working Hrs.</p>
            <p>08</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p>Break Hrs.</p>
            <p>0</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p>Status</p>
            <p>Present</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p>Deviation Hrs.</p>
            <p>04:15</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p>Late/Early Mark.</p>
            <p>/</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p>Shift Time</p>
            <p>{selectedRecord.schedule}</p>
          </div>

          {/* Add more details here as needed */}
          <div className="flex gap-2 ">
            <button
              className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleselectedRecord1}
            >
              Apply for Regularization
            </button>

            <button
              className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setSelectedRecord(!selectedRecord)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {selectedRecord && selectedRecord1 && (
        <div className="fixed right-0 top-0 bg-white shadow-lg p-6 w-1/3 h-full overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Selected Employee Details</h2>

          <div className="flex justify-between">
            <div>
              <p>New regularisation Request </p>
              <p>6 Jul 24, Mon</p>
            </div>
            <div className="w-10 h-8 border p-2 flex justify-center items-center border-green-800 rounded-md">
              <p className="font-bold  ">P</p>
            </div>
          </div>

          <div className="grid gap-2 items-center w-full">
            <span className="text-gray-700">Type of Request</span>
            <select className="border border-gray-400 p-2 rounded-md">
              <option>Select Type of Request</option>
            </select>
            <div className="grid gap-2 items-center w-full">
              <span className="text-gray-700">Comment</span>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
              />
            </div>
          </div>

          {/* Add more details here as needed */}
          <div className="flex gap-2 ">
            <button
              className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setSelectedRecord(!selectedRecord)}
            >
              Sumbit
            </button>

            <button
              className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleselectedRecord1}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceRecords;
