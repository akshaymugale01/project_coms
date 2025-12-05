import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import ReportDetailsList from "./ReportDetailsList";
import { GrHelpBook } from "react-icons/gr";

const HRReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeType, setEmployeeType] = useState("all");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleGenerateReport = () => {
    console.log("Generating HR Report with parameters:");
    console.log("Employee Type:", employeeType);
    closeModal(); // Close modal after generating report (adjust as needed)
  };
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
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
          <button
            onClick={() => openModal()}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Generate
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      Label: "Employee Master Report",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
    // Add more data as needed
  ];
  const data1 = [
    {
      Label: "Employee Document Uploads Status Report",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
    // Add more data as needed
  ];
  const data2 = [
    {
      Label: "Announcement Acknowledgement Report",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
    // Add more data as needed
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="flex gap-3 ml-20">
      <ReportDetailsList/>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 w-96 rounded-lg shadow-lg">
            <span
              className="absolute top-0 right-0 m-4 text-xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="text-lg font-bold mb-4">Generate HR Report</h2>
            <form onSubmit={handleGenerateReport}>
              <div className="mb-4">
                <p className="block text-sm font-medium text-gray-700 mb-1">
                  Which Employees Do You Want to Include in this Report?
                </p>
                <label className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="employeeType"
                    value="all"
                    checked={employeeType === "all"}
                    onChange={() => setEmployeeType("all")}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">All Employees</span>
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="employeeType"
                    value="some"
                    checked={employeeType === "some"}
                    onChange={() => setEmployeeType("some")}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Some Employees</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="employeeType"
                    value="specific"
                    checked={employeeType === "specific"}
                    onChange={() => setEmployeeType("specific")}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Specific Employees</span>
                </label>
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

      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex justify-between my-5">
          {/* <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
          /> */}
        </div>
        <p className="font-bold mt-2 mb-1">Employee Master Reports</p>
        <Table columns={columns1} data={data} isPagination={true} />
        <p className="font-bold mt-2 mb-1">Employee Documents Reports</p>
        <Table columns={columns1} data={data} isPagination={true} />
        <p className="font-bold mt-2 mb-1">Log Reports</p>
        <Table columns={columns1} data={data} isPagination={true} />

      </div>
      <div className='my-4 mx-2 w-fit'>
        <div className="flex flex-col shadow-custom-all-sides bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
        <div className="flex  gap-4 font-medium">
        <GrHelpBook size={20} />
          <h2>Help Center</h2></div>
    <div className=' '>
              {/* <p className="font-medium">Help Center</p> */}
              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Employee Master Report: Provides a comprehensive overview of all employee information within the HRMS system.    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Employee Document Uploads Status Report: Tracks the status of uploaded employee documents, like resumes or identification proofs.    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Employee Bulk Document Download Report: Enables administrators to download employee documents in bulk for specific criteria.    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Job Information History Report: Tracks changes and updates made to job details and descriptions over time.   </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Multi-row Table Report: Presents various HR data points in a tabular format for easy analysis.  </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Contract History Report: Provides an overview of an employee's contract details and any amendments made throughout their employment.  </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Separation Report: Tracks employee separations from the company, including reasons for leaving.  </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Exit Interview Report: Summarizes key takeaways from exit interviews conducted with departing employees.  </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Announcement Acknowledgement Report: Tracks which employees have acknowledged receiving company announcements.  </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Employee Master Changelog Report: Records changes made to individual employee profiles within the HRMS..  </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Admin Permissions Changelog Report: Tracks modifications made to administrator permissions within the HRMS. </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Licensor Permission Changelog Report: Monitors changes made to licencor permissions within the HRMS.  </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    ESS & App Activation Status Report: Tracks the activation status of the employee self-service (ESS) portal and company applications.  </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    New Joinee Employee Report: Lists newly joined employees within a specific timeframe.  </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Letter Generation Status Report: Tracks the status of generated letters for various purposes, like employment offers or termination notices.  </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Employee Data Change Request Status Report: Monitors the status of employee requests to modify their personal data within the HRMS.  </li>
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

export default HRReport;