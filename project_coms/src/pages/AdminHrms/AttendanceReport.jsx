import React, { useState } from "react";

import Table from "../../components/table/Table";
import ReportDetailsList from "./ReportDetailsList";
import { GrHelpBook } from "react-icons/gr";

const AttendanceReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeriod] = useState("");
  const [includeEmployees, setIncludeEmployees] = useState("All");
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleGenerateReport = () => {
    console.log("Generating Attendance Report with parameters:");
    console.log("Period:", period);
    console.log("Include Employees:", includeEmployees);
    closeModal(); // Close modal after generating report (adjust as needed)
  };

  const columns1 = [
   
    {
      name: "Sr. No",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Report Name",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "view",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
 onClick={openModal}>Generate</button>
        </div>
      ),
    },
  ];

  const data = [
    {
      Label: "Check In - Check Out Record",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
    // Add more data as needed
  ];

  return (
    <section className="flex gap-3 ml-20">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 w-96 rounded-lg shadow-lg">
            <span
              className="absolute top-0 right-0 m-4 text-xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="text-lg font-bold mb-4">Generate Attendance Report</h2>
            <form onSubmit={handleGenerateReport}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Period
                </label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="Month-Year"
                  className="border border-gray-400 w-full rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Which Employees Do You Want to Include?
                </label>
                <div className="flex items-center gap-4">
                  <label>
                    <input
                      type="radio"
                      value="All"
                      checked={includeEmployees === "All"}
                      onChange={() => setIncludeEmployees("All")}
                      className="mr-2"
                    />
                    All Employees
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Some"
                      checked={includeEmployees === "Some"}
                      onChange={() => setIncludeEmployees("Some")}
                      className="mr-2"
                    />
                    Some Employees
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Specific"
                      checked={includeEmployees === "Specific"}
                      onChange={() => setIncludeEmployees("Specific")}
                      className="mr-2"
                    />
                    Specific Employees
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg mr-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  Generate Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ReportDetailsList />
      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex justify-between my-5">
         
        </div>
        <p className="font-bold mb-4">Attendance Reports</p>
        <Table columns={columns1} data={data} isPagination={true} />
      </div>
      <div className='my-4 mx-2 w-fit'>
        <div className="flex flex-col  shadow-custom-all-sides bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
        <div className="flex  gap-4 font-medium">
        <GrHelpBook size={20} />
          <h2>Help Center</h2></div>
    <div className=' '>
              {/* <p className="font-medium">Help Center</p> */}
              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Attendance-records: Tracks monthly check-in & check-out times for all employees for the selected month.    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Regularize records: Document adjustments made to original check-in/out times, including actual timings, regularized timings, approval authority, and reason, for a specific month.   </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Attendance-process: Contains the entire attendance register, along with processed attendance, unprocessed attendance, and an overtime report.    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Live-attendance-records: Contains record of Check in and Check out timings of employees for the current month.   </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Late-and-early-marks-attendance: Contains details of Early Checkout and Late Checkin over a selected month.  </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Ot-report: Details overtime worked by employees, including units and total amount.   </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Monthly-total-worked-hours-report: Contains details such as Total Worked Hours, Required Work Hours, Difference In Work Hours etc.  </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Daily-attendance-report: Contains the detailed daily attendance records such as Check In mode type, Check Out mode type, Check In Punch Records, Check Out Punch Records etc.   </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Unauthorised absence report: Contains employee details such as department and designation and contains the Total Absent Days and Continuous Absent Days.   </li>
                  </ul>
                </li>
                
                {/* <li>
                  <p>
                    <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a>
These allowance can be with or without linked with attendance or Payable days          </p>
                </li>
                <li>
                  <p>
                    <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a>
You can change allowances setting anytime but once payroll is processed won’t be deleted.        </p>
                </li> */}
              </ul>
            </div></div></div>
    </section>
  );
};

export default AttendanceReport;