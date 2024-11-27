import React, { useState } from "react";
import Table from "../../components/table/Table";
import ReportDetailsList from "./ReportDetailsList";
import { GrHelpBook } from "react-icons/gr";

const ExpenseReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [includeReceipts, setIncludeReceipts] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeType, setEmployeeType] = useState("all");
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleGenerateReport = () => {
    console.log("Generating expense report with parameters:");
    console.log("Include Receipts:", includeReceipts);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Employee Type:", employeeType);
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
      Label: "Expense Line Item Applications Report",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
    // Add more data as needed
  ];
  const data1 = [
    {
      Label: "Advance Expense Line Item Applications Report",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
    // Add more data as needed
  ];

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
            <h2 className="text-lg font-bold mb-4">Generate Expense Line Item Application</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you wish to include the receipts submitted for every expense report?
              </label>
              <div className="flex items-center mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="includeReceipts"
                    value="yes"
                    checked={includeReceipts}
                    onChange={() => setIncludeReceipts(true)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name="includeReceipts"
                    value="no"
                    checked={!includeReceipts}
                    onChange={() => setIncludeReceipts(false)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
            <form onSubmit={handleGenerateReport}>
              <div className="mb-4">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Select Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  Select End Date *
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
                />
              </div>
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
         
        </div>
      <p className="mb-2">Expense</p>
        <Table columns={columns1} data={data} isPagination={true} />
        <p className="mb-2">Advance Expense</p>
        <Table columns={columns1} data={data1} isPagination={true} />
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
                    Expense Line Item Applications Report: Contains details of all expenses applied by and employee includes the Amount, status, receipt and date.     </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Expense Process History Report: Tracks the history of submitted expense claims, including their status and approval workflow.    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Expense Applications Report: Lists all submitted expense applications within a designated period.  </li>
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

export default ExpenseReport;