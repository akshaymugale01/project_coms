import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import ToggleSwitch from "../../Buttons/ToggleSwitch";
import AdminHRMS from "./AdminHrms";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import RoasterShiftDetails from "./Components/RoasterShiftDetails";
import { getRosterRecords } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { formatShiftTime } from "../../utils/dateUtils";

const Roster = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [downloadLiteVersion, setDownloadLiteVersion] = useState("No");
  const [startDate, setStartDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);

  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchRosterRecords = async () => {
    try {
      const res = await getRosterRecords(hrmsOrgId);
      setEmployees(res.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRosterRecords();
  }, []);

  const handleShiftClick = (employee, date, schedule) => {
    console.log(schedule)
    setSelectedShift({ employee, date, schedule });
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    setCurrentMonth(`${year}-${month}`);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const getDates = (start) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getDates(startDate);
  const changeWeek = (direction) => {
    setStartDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
      return newDate;
    });
  };

  const filteredEmployees = employees.filter((employee) =>
    `${employee.first_name} ${employee.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };
  const getShiftForDate = (employee, date) => {
    return employee.roster_records.find(
      (record) => record.date === date.toISOString().split("T")[0]
    );
  };
console.log(currentMonth)
  return (
    <div className="flex ">
      <AdminHRMS />
      <div className="ml-20  bg-gray-100 p-2 w-full px-6">
        <header
          style={{ background: themeColor }}
          className="bg-blue-500 p-4 text-white rounded-md flex justify-between items-center"
        >
          <h1 className="text-2xl font-medium">Roster Record</h1>
          <div className="flex items-center space-x-4">
            <input
              className="border p-2 w-64 px-4 text-black rounded-md"
              type="month"
              value={currentMonth}
              onChange={(e) => setCurrentMonth(e.target.value)}
            />
            {/* <button onClick={toggleModal} className="border p-2 rounded-md">
              Upload Records
            </button>
            <button className="border p-2 rounded" onClick={handleModalToggle}>
              Filter
            </button>
            <label className="text-white" htmlFor="">
              Multiselect
            </label>
            <ToggleSwitch /> */}
          </div>
        </header>

        <div className="flex gap-5 mt-2 ">
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-green-500 mt-1 rounded-full"></div>
            <p> Full Working Day</p>
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-orange-500 mt-1 rounded-full"></div>
            <p>Weekly Off/Holiday</p>
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-blue-500 mt-1 rounded-full"></div>
            <p>Half Day</p>
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-gray-500 mt-1 rounded-full"></div>
            <p>Not Assigned</p>
          </div>
        </div>

        <div className="container mx-auto p-4 bg-white rounded-xl mt-2 ">
          <div className="mb-4 flex justify-between gap-2 items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Employee Name/ Code"
                className="p-2 pl-10 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => changeWeek("prev")}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
                aria-label="Previous week"
              >
                <BiChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => changeWeek("next")}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
                aria-label="Next week"
              >
                <BiChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="w-full border-none bg-white">
              <thead>
                <tr
                  className="text-white rounded-lg"
                  style={{ background: themeColor }}
                >
                  <th className="border-none p-2 text-left w-48 font-medium">
                    Employee Name
                  </th>
                  {weekDates.map((date, index) => (
                    <th
                      key={index}
                      className="border-none p-2 text-center font-medium text-sm"
                    >
                      <div>
                        {formatDate(date).split(" ")[0]}{" "}
                        {`${date.getDate()} ${formatDate(date).split(" ")[1]}`}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="border-none p-2">
                      <div className="flex items-center space-x-2">
                        <div
                          style={{ background: themeColor }}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                        >
                          {employee.first_name[0]}
                          {employee.last_name[0]}
                        </div>
                        <span>
                          {employee.first_name} {employee.last_name}
                        </span>
                      </div>
                    </td>
                    {weekDates.map((date, index) => {
                      const shift = getShiftForDate(employee, date);
                      const isWeekend =
                        date.getDay() === 0 || date.getDay() === 6;
                      return (
                        <td key={index} className="border-none p-2 text-center">
                          {shift ? (
                            <div
                              onClick={() => handleShiftClick(employee, shift, date)}
                              // title={isWeekend? "":""}
                              className={`rounded-md p-1 cursor-pointer transition duration-200 ${
                                isWeekend
                                  ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                                  : "bg-green-100 text-green-800 hover:bg-green-200"
                              }`}
                            >
                              <div>
                                {/* {shift.shift_start_time} -{" "}
                                {shift.shift_end_time} */}
                                 {formatShiftTime(shift.shift_start_time, shift.shift_end_time)}
                              </div>
                            </div>
                          ) : (
                            <div
                              title="No Shift Assigned"
                              onClick={() => handleShiftClick(employee, shift, date)}
                              className="bg-gray-100 cursor-pointer text-gray-500 rounded-md p-1 hover:bg-gray-200 transition duration-200"
                            >
                              NOT ASSIGNED
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
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
        {isOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
              <h2 className="text-xl font-semibold mb-4">
                Upload Roster Records
              </h2>
              <p className="font-semibold mb-1">
                Step 1: Select month and year for download or upload *
              </p>
              <div className="flex justify-between gap-5 mb-2">
                {/* <label className="block mb-1">Select year</label> */}
                <select
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-52 border p-2 rounded"
                >
                  <option value="">Select Year</option>
                </select>

                <select
                  type="text"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-52 border p-2 rounded"
                >
                  <option value="">Select Month</option>
                </select>
              </div>

              <div className="mb-4">
                {/* <label className="block mb-1">Select month</label> */}
              </div>

              <div className="mb-4 mt-1">
                <label className="font-semibold ">
                  Step 2:Do you want to download Lite Version Sheet?
                </label>
                <select
                  value={downloadLiteVersion}
                  onChange={(e) => setDownloadLiteVersion(e.target.value)}
                  className="w-52 border mt-1 p-2 rounded"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-semibold ">
                  Step 3:Download roster global format
                </label>
                <button className="w-48 bg-green-500 mt-1 text-white px-4 py-2 rounded">
                  Download
                </button>
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-semibold ">
                  Step 4: Make necessary changes in the imported file and Upload
                  *
                </label>
                <input type="file" />
              </div>

              <div className="text-right">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedShift && (
        <RoasterShiftDetails
          employee={selectedShift.employee}
          date={selectedShift.date}
          schedule={selectedShift.schedule}
          onClose={() => setSelectedShift(null)}
          fetchRosterRecords={fetchRosterRecords}
        />
      )}
    </div>
  );
};

export default Roster;
