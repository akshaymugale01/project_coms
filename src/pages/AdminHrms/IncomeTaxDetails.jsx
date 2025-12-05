import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";

import Table from "../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import ReportDetailsList from "./ReportDetailsList";
import { GrHelpBook } from "react-icons/gr";

const IncomeTaxReport = () => {
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeriod] = useState("");
  const [includeEmployees, setIncludeEmployees] = useState("All");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleGenerateReport = () => {
    console.log("Generating Income Tax Report with parameters:");
    console.log("Period:", period);
    console.log("Include Employees:", includeEmployees);
    closeModal(); // Close modal after generating report (adjust as needed)
  };

  const columns = [
    {
      name: "view",
      cell: (row) => (
        <div className="flex items-center gap-4">
          {/* Replace Link with button for modal */}
          <button onClick={openModal}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
    {
      name: "Challan No.",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Month - Year",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "Income Tax Amount",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Surcharge ",
      selector: (row) => row.State,
      sortable: true,
    },
    {
      name: "Health And Education Cess",
      selector: (row) => row.Country,
      sortable: true,
    },
    
  ];
  const data1 = [
    {
      Label: "June-2024",
      Location: "1",
      City: "5656",
      State: "-",
      Country: "-",
    },
    // Add more data as needed
  ];
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
          <button onClick={() => openModal()} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
            Generate
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      Label: "Income Tax Monthly Report",
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
            <h2 className="text-lg font-bold mb-4">Generate Income Tax Report</h2>
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
        <div className="flex justify-end my-5">
          
          <Link
            to={"/admin/hrms/add-challan"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </Link>
        </div>
        <p className="mb-2">Income Tax Challans</p>
        <Table columns={columns} data={data1} isPagination={true} />
        <p className="mb-2">Income Tax Reports</p>
        <Table columns={columns1} data={data} isPagination={true} />
      </div>
      <div className='my-4 mx-2 w-fit'>
        <div className="flex flex-col  shadow-custom-all-sides bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
        <div className="flex  gap-2 font-medium">
        <GrHelpBook size={20} />
          <h2>Help Center</h2></div>
    <div className=' '>
              {/* <p className="font-medium">Help Center</p> */}
              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Income Tax Challans: You can conveniently update your monthly TDS paid challan here and allocate it to your employees as well.     </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Income Tax Monthly Report: This your monthly TDS deducted report with bifurcation of Tax Amount, Cess & Surcharge.    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Annexure I: This document contains Quarterly TDS data, generating the necessary information for filing returns in the Income Tax department's tool called RPU.   </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Annexure II: This document contains Annual TDS data, generating the necessary information for filing returns in the Income Tax department's tool called RPU.   </li>
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

export default IncomeTaxReport;