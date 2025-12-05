import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import Table from "../../components/table/Table";
import ReportDetailsList from "./ReportDetailsList";
import { GrHelpBook } from "react-icons/gr";

const BankReport = () => {
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
    console.log("Generating Bank Report with parameters:");
    console.log("Period:", period);
    console.log("Include Employees:", includeEmployees);
    closeModal(); // Close modal after generating report (adjust as needed)
  };

  const columns = [
   
    {
      name: "Reports.",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Bank",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "Third Party",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Combined ",
      selector: (row) => row.State,
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
      Name: "person 1",
      Location: "Generic Statement",
      City: "-",
      State: "-",
      Country: "-",
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
            <h2 className="text-lg font-bold mb-4">Generate Bank Report</h2>
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
<p className="font-bold mb-4">Payroll Bank Reports</p>
        <Table columns={columns} data={data} isPagination={true} />
      </div>
      <div className='my-4 mx-2 w-fit'>
        <div className="flex flex-col  shadow-custom-all-sides bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
        <div className="flex  gap-4 font-medium">
        <GrHelpBook size={20} />
          <h2>Help Center</h2></div>
    <div className=' '>
              {/* <p className="font-medium">Help Center</p> */}
              <p className="font-bold ">Payroll Bank Reports</p>

              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Generic Statement: Available by default, providing a standard bank report.      </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Specific Bank Statement: Available if your organization has added a specific bank in the Organization module.     </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    offering three sub-reports: Bank Report, Third-Party Report, and Combined Report.   </li>
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

export default BankReport;