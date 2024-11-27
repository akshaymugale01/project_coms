import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import Table from "../../components/table/Table";
import ReportDetailsList from "./ReportDetailsList";
import { GrHelpBook } from "react-icons/gr";

const InvestmentReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [financialYear, setFinancialYear] = useState("FY 2024-2025");
  const [status, setStatus] = useState("Approved");
  const [downloadSoftCopies, setDownloadSoftCopies] = useState(false);
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleGenerateReport = () => {
    console.log("Generating Investment Declarations Report with parameters:");
    console.log("Financial Year:", financialYear);
    console.log("Status:", status);
    console.log("Download Soft Copies:", downloadSoftCopies);
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
         <button    onClick={() => openModal()}   className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
         >Generate</button>
        </div>
      ),
    },
  ];

  const data = [
    {
      Label: "Investment Declarations Report",
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
      {/* <ReportDetailsList/> */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 w-96 rounded-lg shadow-lg">
            <span
              className="absolute top-0 right-0 m-4 text-xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="text-lg font-bold mb-4">
              Generate Investment Declarations Report
            </h2>
            <form onSubmit={handleGenerateReport}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Financial Year
                </label>
                <select
                  value={financialYear}
                  onChange={(e) => setFinancialYear(e.target.value)}
                  className="border border-gray-400 w-full rounded-lg p-2"
                >
                  <option value="FY 2024-2025">FY 2024-2025</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border border-gray-400 w-full rounded-lg p-2"
                >
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                 
                  <span className="">
                    Do you want to download soft copies submitted by employees?
                  </span>
                  <div className="flex gap-2">
                  <input type="radio" />
                  <label htmlFor="">Yes</label>
                  <input type="radio" />
                  <label htmlFor="">No</label></div>
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

      <ReportDetailsList />
      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex justify-between my-5">
         
        </div>

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
                    Investment Declarations Report: Contains employee-declared investments for tax purposes, including type, amount, and proof of investment status.     </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Investment Summary Report: Summarizes approved employee-declared investments for tax purposes, including type, amount, and proof of investment status.    </li>
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

export default InvestmentReport;