import React, { useState } from "react";

import Table from "../../components/table/Table";

import { BiEdit } from "react-icons/bi";

import ReportDetailsList from "./ReportDetailsList";
import { GrHelpBook } from "react-icons/gr";
import Collapsible from "react-collapsible";
import CustomTrigger from "../../containers/CustomTrigger";

const PayrollReports = () => {
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const [isOpen, setIsOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

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
        <button onClick={() => setIsModalOpen2(true)}><BiEdit size={15}/></button>
          <button
className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"   onClick={() => setIsModalOpen(true)}
        >
          Generate
        </button>
        </div>
      ),
    },
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
        
          <button 
className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"   onClick={() => setIsModalOpen1(true)}
        >
          Generate
        </button>
        </div>
      ),
    },
  ];
  const data1 = [
    {
      Label: "Monthly Loans & Advances",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },]

  const data = [
    {
      Label: "Monthly Salary Register",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
    {
      Label: "Monthly Salary Register With Arrears",
      Location: "2",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
    {
      Label: "Monthly Tax Register",
      Location: "3",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
    {
      Label: "Annual Tax Register",
      Location: "4",
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
              <p className="font-bold mb-4">Payroll</p>
        <Table columns={columns} data={data} isPagination={true} />
        <p className="font-bold mb-4">Loans</p>
        <Table columns={columns1} data={data1} isPagination={true} />


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
                  Select Period *
                  <input
                    type="month"
                    className="border border-gray-400 rounded-lg p-2 w-full"
                  />
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
        {isModalOpen1 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg w-96 ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Generate Loan And Advance Monthly Register</h2>
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
                  Select Period *
                  <input
                    type="month"
                    className="border border-gray-400 rounded-lg p-2 w-full"
                  />
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
                  onClick={() => setIsModalOpen1(false)}
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
           {isModalOpen2 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg w-1/3 h-96 overflow-y-auto ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Add Custom Field</h2>
             
            </div>
            <form>
           
            <Collapsible
            trigger={
              <CustomTrigger isOpen={isOpen}>
                <h2 className="text-2xl font-bold mt-6 mb-4">Personal Details</h2>
              </CustomTrigger>
            }
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            className="bg-gray-100 my-4 p-2 rounded-md font-bold"
          >
            <div className="flex flex-col">
                <div className="flex gap-2">
           <input type="checkbox" />
           <label htmlFor="">Select All</label></div>
           <div className="flex gap-2">
           <input type="checkbox" />
           <label htmlFor="">Email</label></div>
           <div className="flex gap-2">
           <input type="checkbox" />
           <label htmlFor=""> First Name</label></div>
           <div className="flex gap-2">
           <input type="checkbox" />
           <label htmlFor=""> Last Name</label></div>
           <div className="flex gap-2">
           <input type="checkbox" />
           <label htmlFor=""> Full Name</label></div>
           <div className="flex gap-2">
           <input type="checkbox" />
           <label htmlFor=""> Mobile</label></div>
           <div className="flex gap-2">
           <input type="checkbox" />
           <label htmlFor=""> Gender</label></div>
           <div className="flex gap-2">
           <input type="checkbox" />
           <label htmlFor=""> Aadhar No</label></div>
           <div className="flex gap-2">
           <input type="checkbox" />
           <label htmlFor=""> Date Of Birth</label></div>
           <div className="flex gap-2">
           <input type="checkbox" />
           <label htmlFor=""> Marital Status</label></div>
           <div className="flex gap-2">
           <input type="checkbox" />
           <label htmlFor="">PAN</label></div>
           
           </div>
          </Collapsible>
      
          

          <Collapsible
            trigger={
              <CustomTrigger isOpen={isOpen}>
                <h2 className="text-2xl font-bold mt-6 mb-4">Address Details</h2>
              </CustomTrigger>
            }
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            className="bg-gray-100 my-4 p-2 rounded-md font-bold"
          >
           
            
          </Collapsible>

          <Collapsible
            trigger={
              <CustomTrigger isOpen={isOpen}>
                <h2 className="text-2xl font-bold mt-6">Family Details</h2>
              </CustomTrigger>
            }
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            className="bg-gray-100 my-4 p-2 rounded-md font-bold"
          >
           
     
          </Collapsible>

          <Collapsible
            trigger={
              <CustomTrigger isOpen={isOpen}>
                <h2 className="text-2xl font-bold mt-6 mb-4">Location Details</h2>
              </CustomTrigger>
            }
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            className="bg-gray-100 my-4 p-2 rounded-md font-bold"
          >
           
          </Collapsible>
          <Collapsible
            trigger={
              <CustomTrigger isOpen={isOpen}>
                <h2 className="text-2xl font-bold mt-6 mb-4">Custom fields</h2>
              </CustomTrigger>
            }
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            className="bg-gray-100 my-4 p-2 rounded-md font-bold"
          >
           
          </Collapsible>
          <Collapsible
            trigger={
              <CustomTrigger isOpen={isOpen}>
                <h2 className="text-2xl font-bold mt-6 mb-4">CTC Component</h2>
              </CustomTrigger>
            }
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            className="bg-gray-100 my-4 p-2 rounded-md font-bold"
          >
           
          </Collapsible>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen2(false)}
                  className="mr-4 px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
                    Monthly Salary Register: Details about emplyees monthly earning, deduction and employer contribution & other benefit including CTC for the month.     </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Monthly Salary Register With Arrears: Its same month salary register with separate bifurcation of current month earning and arrears.    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Monthly Tax Register: Details about how the tax is calculated for the month after consideration of complete income, Exception, deduction etc.    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Annual Tax Register: This report content of all employees got paid in financial year.     </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    CTC History Reports: This report content information about employees historic salary updated in system monthly and annually, we can able to download for existing active employee by turn on Download for active CTC or turn off for download active and inactive employee salary history.     </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Yearly Salary Register: You can able to download selected months (multiple months) salary register in same sheet, this is useful you want all months register in single sheet.     </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Combined Salary Register: In this you will get salary register with summed values for each allowance and deduction for selected period..     </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Offcycle Payment Register: You can able to download register if you processed any off cycle payments.    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Variance Report: In this you can able to find out tentative the reason for variance in salary register compared to previous month.   </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Kerala Wage Report: This is a monthly salary report for the Government Portal upload. You can arrange the components to match the required format.  </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    CTC Variable Pays: If any new variable is included in the employee CTC breakup, along with information about the payable month, it can be downloaded in this report.  </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Salary Transfer Transactions Reports: You can able to download the salary transection details, If uploaded in monthly payroll section.   </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Monthly Loans & Advances: Download monthly employees EMI Amount   </li>
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

export default PayrollReports;