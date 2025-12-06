import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Table from "../../components/table/Table";
import AdminHRMS from "./AdminHrms";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
const AttendanceAudit = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toISOString().slice(0, 7);
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceCycle, setAttendanceCycle] = useState(currentMonth);
  const [dateRange, setDateRange] = useState("01-06-2024 - 30-06-2024");
  const [dayStatus, setDayStatus] = useState("");
  const [totalHoursWorked, setTotalHoursWorked] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [lateEarlyMarkStatus, setLateEarlyMarkStatus] = useState("");
  const [shift, setShift] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [attendanceTemplate, setAttendanceTemplate] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [showImportModal, setshowImportModal] = useState(false);
  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(lastDayOfMonth);
  const options = [
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
    { value: "halfDay", label: "Half Day" },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = (selected) => {
    if (selected?.some((option) => option.value === "selectAll")) {
      // If 'Select All' is chosen, select or deselect all options
      if (selected.length === options.length + 1) {
        setSelectedOptions(options);
      } else {
        setSelectedOptions([]);
      }
    } else {
      setSelectedOptions(selected);
    }
  };

  const [formData, setFormData] = useState({
    hoursWorked: "",
    checkIn: "",
    checkOut: "",
  });

  const allOptions = [{ value: "selectAll", label: "Select All" }, ...options];
  const LateEarly = [
    { value: "Late Mark Applicable", label: "Late Mark Applicable" },
    { value: "Early Mark Applicable", label: "Early Mark Applicable" },
  ];
  const columns = [
    { name: "Name", selector: (row) => row.Location, sortable: true },
    { name: "Date", selector: (row) => row.Label, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Hours Worked", selector: (row) => row.City, sortable: true },
    { name: "Check In", selector: (row) => row.State, sortable: true },
    { name: "Check Out", selector: (row) => row.Country, sortable: true },
    { name: "Shift Name", selector: (row) => row.Leave_Days, sortable: true },
    { name: "Shift Timing", selector: (row) => row.Comment, sortable: true },
    { name: "Late Mark", selector: (row) => row.late, sortable: true },
    { name: "Early Mark", selector: (row) => row.early, sortable: true },
    { name: "Branch Location", selector: (row) => row.early, sortable: true },
  ];

  const data = [
    {
      Label: "2/2/2024",
      Location: "Mittu",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
      Leave_Days: "Night",
      Comment: "6PM - 2PM",
      status: "pending",
    },
  ];

  const handleChangeField = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    console.log("Attendance Cycle:", attendanceCycle);
    console.log("Date Range:", dateRange);
    console.log("Day Status:", dayStatus);
    console.log("Total Hours Worked:", totalHoursWorked);
    console.log("Check In Time:", checkInTime);
    console.log("Check Out Time:", checkOutTime);
    console.log("Late and Early Mark Status:", lateEarlyMarkStatus);
    console.log("Shift:", shift);
    console.log("Work Location:", workLocation);
    console.log("Attendance Template:", attendanceTemplate);
    console.log("Employee Department:", employeeDepartment);
    setIsModalOpen(false);
  };

  return (
    <section className="flex ml-20">
      <AdminHRMS />
      <div>
        <div className=" bg-white p-2 px-3 w-72 rounded-md border m-1 mb-10">
          <h2 className="text-xl font-semibold mb-2">Smart Filters</h2>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Step 1: Date Selection</h3>
            <div className="mb-2">
              <label className="block font-medium mb-1 text-sm">
                Attendance Cycle
              </label>
              <input
                type="month"
                value={attendanceCycle}
                onChange={(e) => setAttendanceCycle(e.target.value)}
                className="border border-gray-400 rounded-md p-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-medium text-sm">
                Date Range
              </label>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setStartDate(update[0]);
                  setEndDate(update[1]);
                  setFilteredPPMData(filterByDateRange(ppmData));
                }}
                isClearable={true}
                placeholderText="Search by Date range"
                className="p-1 border-gray-300 rounded-md w-64  my-2 outline-none border"
              />
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">
              Step 2: Attendance Filter
            </h3>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-medium">
                Day Status
              </label>
              <Select
                options={allOptions}
                value={selectedOptions}
                onChange={handleChange}
                isMulti
                closeMenuOnSelect={false}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-medium">
                Total Hours Worked
              </label>
              <select
                className="border border-gray-400 rounded-md p-1 w-full"
                name="hoursWorked"
                id=""
                value={formData.hoursWorked}
                onChange={handleChangeField}
              >
                <option value="">Select </option>
                <option value="Greater than">Greater than</option>
                <option value="Less than">Less than</option>
                <option value="Between">Between</option>
              </select>
              {formData.hoursWorked === "Greater than" && (
                <input
                  type="time"
                  placeholder="Enter greater than"
                  className="border my-1 border-gray-400 rounded-md p-1 w-full"
                />
              )}
              {formData.hoursWorked === "Less than" && (
                <input
                  type="time"
                  placeholder="Enter greater than"
                  className="border my-1 border-gray-400 rounded-md p-1 w-full"
                />
              )}
              {formData.hoursWorked === "Between" && (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    placeholder="Enter greater than"
                    className="border my-1 border-gray-400 rounded-md p-1 w-full"
                  />
                  -
                  <input
                    type="time"
                    placeholder="Enter greater than"
                    className="border my-1 border-gray-400 rounded-md p-1 w-full"
                  />
                </div>
              )}
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-medium">
                Check in Time
              </label>
              <select
                className="border border-gray-400 rounded-md p-1 w-full"
                name="checkIn"
                id=""
                value={formData.checkIn}
                onChange={handleChangeField}
              >
                <option value="">Select</option>
                <option value="Greater than">Greater than</option>
                <option value="Less than">Less than</option>
                <option value="Between">Between</option>
              </select>
              {formData.checkIn === "Greater than" && (
                <input
                  type="time"
                  placeholder="Enter greater than"
                  className="border my-1 border-gray-400 rounded-md p-1 w-full"
                />
              )}
              {formData.checkIn === "Less than" && (
                <input
                  type="time"
                  placeholder="Enter greater than"
                  className="border my-1 border-gray-400 rounded-md p-1 w-full"
                />
              )}
              {formData.checkIn === "Between" && (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    placeholder="Enter greater than"
                    className="border my-1 border-gray-400 rounded-md p-1 w-full"
                  />
                  -
                  <input
                    type="time"
                    placeholder="Enter greater than"
                    className="border my-1 border-gray-400 rounded-md p-1 w-full"
                  />
                </div>
              )}
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-medium">
                Check out Time
              </label>
              <select
                className="border border-gray-400 rounded-md p-1 w-full"
                name="checkOut"
                id=""
                value={formData.checkOut}
                onChange={handleChangeField}
              >
                <option value="">Select</option>
                <option value="Greater than">Greater than</option>
                <option value="Less than">Less than</option>
                <option value="Between">Between</option>
              </select>
              {formData.checkOut === "Greater than" && (
                <input
                  type="time"
                  placeholder="Enter greater than"
                  className="border my-1 border-gray-400 rounded-md p-1 w-full"
                />
              )}
              {formData.checkOut === "Less than" && (
                <input
                  type="time"
                  placeholder="Enter greater than"
                  className="border my-1 border-gray-400 rounded-md p-1 w-full"
                />
              )}
              {formData.checkOut === "Between" && (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    placeholder="Enter greater than"
                    className="border my-1 border-gray-400 rounded-md p-1 w-full"
                  />
                  -
                  <input
                    type="time"
                    placeholder="Enter greater than"
                    className="border my-1 border-gray-400 rounded-md p-1 w-full"
                  />
                </div>
              )}
            </div>

            <div className="mb-2">
              <label className="block mb-1 text-sm font-medium">
                Late and Early Mark Status
              </label>
              <Select
                options={LateEarly}
                value={selectedOptions}
                onChange={handleChange}
                isMulti
                closeMenuOnSelect={false}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-medium text-sm">Shift</label>
              <select
                className="border border-gray-400 rounded-md p-1 w-full"
                name=""
                id=""
              >
                <option value="">6:00AM-7:00PM</option>
                <option value="">10:00AM-7:00PM</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">
              Step 3: Employee Filter
            </h3>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-medium">
                Work Location
              </label>
              <select
                className="border border-gray-400 rounded-md p-1 w-full"
                name=""
                id=""
              >
                <option value="">Mumbai</option>
                <option value="">Pune</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-medium">
                Attendance Template
              </label>
              <select
                className="border border-gray-400 rounded-md p-1 w-full"
                name=""
                id=""
              >
                <option value="">Attendance Policy</option>
                <option value="">Work from Home</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-medium">
                Employee Department
              </label>
              <select
                className="border border-gray-400 rounded-md p-1 w-full"
                name=""
                id=""
              >
                <option value="">Content writer</option>
                <option value="">Frontend Developer</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button className="border px-2 border-gray-400 rounded-md p-1">
              Clear
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white rounded-md p-1 px-2"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex m-2 flex-col overflow-hidden">
        <div className="flex justify-end gap-2 my-2">
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-400 w-96 placeholder:text-sm rounded-md p-2"
          />

          <button
            onClick={() => setShowActionsDropdown(!showActionsDropdown)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Actions
          </button>
        </div>
        <Table columns={columns} data={data} isPagination={true} />
      </div>
      {showActionsDropdown && (
        <div className="absolute top-35 right-2 mt-20 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => setshowImportModal(!showImportModal)}
          >
            Import
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            // onClick={() => setshowRejectModal(!showRejectModal)}
          >
            Export
          </button>
        </div>
      )}
      {showImportModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4">
              Upload Attendance Audit Changes
            </h2>

            <div className="grid md:grid-cols-1 gap-5 mt-5">
              <div className="grid gap-2 items-center w-full">
                <p>Make necessary changes in the imported file and upload *</p>
                <FileInputBox />
                {/* <textarea type="text" name="regularizationReason"  className="border border-gray-400 p-2 rounded-md"/> */}
              </div>
            </div>
            <p className="font-bold mt-2 ">Format For Upload:</p>
            <p>
              a) Select all the cells instructions when uploading check in times
            </p>
            <p>b) Right click and select the format cells button</p>
            <p>c) Choose the "Text" format</p>
            <p>
              d) Enter the check-in / check-out times in AM/PM format: E.g. 8:05
              AM or 12:30 PM
            </p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => setshowImportModal(false)}
            >
              Close
            </button>
            <button
              className="mt-4 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => setshowImportModal(false)}
            >
              Upload
            </button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
          <div class=" h-2/3 bg-white p-8 w-96 rounded-md shadow-lg overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Smart Filters</h2>

            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">
                Step 1: Date Selection
              </h3>
              <div className="mb-2">
                <label className="block mb-1">Attendance Cycle</label>
                <input
                  type="month"
                  value="2024-07"
                  onChange={(e) => setAttendanceCycle(e.target.value)}
                  className="border border-gray-400 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Date Range</label>
                <input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border border-gray-400 rounded-md p-2 w-full"
                />
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">
                Step 2: Attendance Filter
              </h3>
              <div className="mb-2">
                <label className="block mb-1">Day Status</label>
                <select
                  className="border border-gray-400 rounded-md p-2 w-full"
                  name=""
                  id=""
                >
                  <option value="">Present</option>
                  <option value="">Absent</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Total Hours Worked</label>
                <select
                  className="border border-gray-400 rounded-md p-2 w-full"
                  name=""
                  id=""
                >
                  <option value="">Greater than</option>
                  <option value="">Less than</option>
                  <option value="">Between</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Check in Time</label>
                <select
                  className="border border-gray-400 rounded-md p-2 w-full"
                  name=""
                  id=""
                >
                  <option value="">Greater than</option>
                  <option value="">Less than</option>
                  <option value="">Between</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Check out Time</label>
                <select
                  className="border border-gray-400 rounded-md p-2 w-full"
                  name=""
                  id=""
                >
                  <option value="">Greater than</option>
                  <option value="">Less than</option>
                  <option value="">Between</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Late and Early Mark Status</label>
                <select
                  className="border border-gray-400 rounded-md p-2 w-full"
                  name=""
                  id=""
                >
                  <option value="">Early Mark Applicable</option>
                  <option value="">Late Mark Applicable</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Shift</label>
                <select
                  className="border border-gray-400 rounded-md p-2 w-full"
                  name=""
                  id=""
                >
                  <option value="">6:00AM-7:00PM</option>
                  <option value="">10:00AM-7:00PM</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">
                Step 3: Employee Filter
              </h3>
              <div className="mb-2">
                <label className="block mb-1">Work Location</label>
                <select
                  className="border border-gray-400 rounded-md p-2 w-full"
                  name=""
                  id=""
                >
                  <option value="">Mumbai</option>
                  <option value="">Pune</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Attendance Template</label>
                <select
                  className="border border-gray-400 rounded-md p-2 w-full"
                  name=""
                  id=""
                >
                  <option value="">Attendance Policy</option>
                  <option value="">Work from Home</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Employee Department</label>
                <select
                  className="border border-gray-400 rounded-md p-2 w-full"
                  name=""
                  id=""
                >
                  <option value="">Content writer</option>
                  <option value="">Frontend Developer</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleModalClose}
                className="border-2 border-gray-400 rounded-md p-2 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white rounded-md p-2"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AttendanceAudit;
