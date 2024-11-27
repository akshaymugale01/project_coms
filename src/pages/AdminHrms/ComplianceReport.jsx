import React, { useState } from "react";

import Table from "../../components/table/Table";

import ReportDetailsList from "./ReportDetailsList";
import { GrHelpBook } from "react-icons/gr";

const ComplianceReports = () => {
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
   
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
      Label: "Company Level Compliance Report",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
  ];
  const columns6 = [
   
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

  const data6 = [
    {
      Label: "Form A (FORMAT OF EMPLOYEE REGISTER)",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
  ];
  const data1 = [
    {
      Label: "Provident Fund Monthly Contribution New (Excel & Text File)",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
  ]; const data2 = [
    {
      Label: "ESIC Monthly Contribution",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
  ]; const data3 = [
    {
      Label: "Professional Tax Monthly Contribution",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
  ]; const data4 = [
    {
      Label: "LWF Monthly Contribution",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
  ];
  const openModal = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <section className="flex gap-3 ml-20">
      <ReportDetailsList />
      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex justify-between my-5">
         
        </div>
            <p className="mb-2">Compliance Tracker</p>
        <Table columns={columns} data={data} isPagination={true} />
        <p className="mb-2">Provident Fund</p>
        <Table columns={columns} data={data1} isPagination={true} />
        <p className="mb-2">ESIC</p>
        <Table columns={columns} data={data2} isPagination={true} />
        <p className="mb-2">Professional Tax</p>
        <Table columns={columns} data={data3} isPagination={true} />
        <p className="mb-2">LWF</p>
        <Table columns={columns} data={data4} isPagination={true} />
        <p className="mb-2">Shops & Establishment Act Reports</p>
        <Table columns={columns6} data={data6} isPagination={true} />
      </div>

      {isModalOpen && (
       <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
       <div className="bg-white p-6 rounded-lg w-96 h-4/6 overflow-y-auto">
         <div className="flex justify-between items-center mb-4">
           <h2 className="text-2xl font-bold">Generate Salary Register</h2>
           <button
             onClick={closeModal}
             className="text-gray-600 hover:text-gray-800"
           >
             &times;
           </button>
         </div>
         <form>
           <div className="mb-4">
             <label className="block mb-2">
               Select Act *
               <select className="border border-gray-400 rounded-lg p-2 w-full">
                 <option value="Act 1">Act 1</option>
                 <option value="Act 2">Act 2</option>
                 <option value="Act 3">Act 3</option>
               </select>
             </label>
           </div>

           <div className="mb-4">
             <label className="block mb-2">
               Select Start Period *
               <input
                 type="month"
                 className="border border-gray-400 rounded-lg p-2 w-full"
               />
             </label>
           </div>

           <div className="mb-4">
             <label className="block mb-2">
               Select End Period *
               <input
                 type="month"
                 className="border border-gray-400 rounded-lg p-2 w-full"
               />
             </label>
           </div>

           <div className="mb-4">
             <label className="block mb-2">
               Select Work Location *
               <select className="border border-gray-400 rounded-lg p-2 w-full">
                 <option value="Location 1">Location 1</option>
                 <option value="Location 2">Location 2</option>
                 <option value="Location 3">Location 3</option>
               </select>
             </label>
           </div>

           <div className="mb-4">
             <label className="block mb-2">
               Group By
               <select className="border border-gray-400 rounded-lg p-2 w-full">
                 <option value="Employees">Employees</option>
               </select>
             </label>
           </div>

           <div className="mb-4">
             <label className="block mb-2">
               Which Employees Do You Want to Include in this Report?
             </label>
             <div className="flex items-center mb-2">
               <input
                 type="radio"
                 name="employeeSelection"
                 className="mr-2"
                 value="All Employees"
               />
               <label>All Employees</label>
             </div>
             <div className="flex items-center mb-2">
               <input
                 type="radio"
                 name="employeeSelection"
                 className="mr-2"
                 value="Some Employees"
               />
               <label>Some Employees</label>
             </div>
             <div className="flex items-center mb-2">
               <input
                 type="radio"
                 name="employeeSelection"
                 className="mr-2"
                 value="Specific Employees"
               />
               <label>Specific Employees</label>
             </div>
           </div>

           <div className="flex justify-end">
             <button
               type="button"
               onClick={closeModal}
               className="mr-4 px-4 py-2 bg-gray-300 rounded"
             >
               Cancel
             </button>
             <button
               type="submit"
               className="px-4 py-2 bg-blue-600 text-white rounded"
             >
               Generate
             </button>
           </div>
         </form>
       </div>
     </div>

      )}
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
                    PF Monthly Contribution New (Excel & Text File): Generate and upload PF ECR data, including registration for new employees to create UAN numbers. Simplify the process by directly downloading the ECR Text file for uploading on the PF Portal for generation challans.      </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    ESIC Report: ESIC monthly contribution data helpful to generate monthly ESIC Challan.    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Professional Tax Monthly Contribution: Monthly state wise applicable employees PT deduction report, helpful to pay challan and file returns.    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    LWF Monthly Contribution: Monthly state wise applicable employees LWF deduction report, helpful to pay challan and file returns.   </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Shops & Establishment Act Reports: This is the standard format for the shop and establishment report. Ensure compatibility with your location's specific format before commencing use.   </li>
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

export default ComplianceReports;