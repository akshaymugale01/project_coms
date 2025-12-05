import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import ReportDetailsList from "./ReportDetailsList";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GrHelpBook } from "react-icons/gr";

const Form16 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeType, setEmployeeType] = useState("all");
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleGenerateForm16 = () => {
    console.log("Generating Form 16s for fiscal year 2023-2024 with parameters:");
    console.log("Employee Type:", employeeType);
    closeModal(); // Close modal after generating Form 16s (adjust as needed)
  };

  const columns = [
   
    {
      name: "Fiscal Year",
      selector: (row) => row.Location,
      sortable: true,
    }, {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-4">
           <Link 
          to={`/admin/view/form16/${row.id}`}
          >
            <BsEye size={15} />
          </Link>
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = [
    {
      Name: "person 1",
      Location: "2024-2025",
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
            <h2 className="text-lg font-bold mb-4">Generate Form 16s for 2023-2024</h2>
            <form onSubmit={handleGenerateForm16}>
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
                  Generate Form 16s
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex justify-between my-5">
        
        </div>
<p className="font-bold mb-4">Employees' Form 16 and Form 12BA</p>
        <Table columns={columns} data={data} isPagination={true} />
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
                    Form 16 is a yearly tax deducted at source (TDS) certificate issued by the employer, summarizing salary paid, taxes deducted, and other details for tax filing.    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Form 12BA supplements Form 16 by detailing the value of any perquisites (fringe benefits) provided to the employee, ensuring accurate tax liability reporting.    </li>
                  </ul>
                </li>
                {/* <li>
                  <ul style={listItemStyle}>
                    <li>
                    Expense Applications Report: Lists all submitted expense applications within a designated period.  </li>
                  </ul>
                </li> */}
                
               
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

export default Form16;