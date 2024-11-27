import React, { useState } from "react";
import EmployeeSections from './EmployeeSections';
import EditEmployeeDirectory from "./EditEmployeeDirectory";
import Table from "../../components/table/Table";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Collapsible from "react-collapsible";
import CustomTrigger from "../../containers/CustomTrigger";
import AdminHRMS from "./AdminHrms";

const AddCustomReport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    closeModal();
  };

  const column = [
    {
      name: "view",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={openModal}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
    { name: "Payment Type", selector: (row) => row.Payment_Type, sortable: true },
    { name: "Payment Mode", selector: (row) => row.mode, sortable: true },
    { name: "Bank Name", selector: (row) => row.name, sortable: true },
    { name: "Bank Account Number", selector: (row) => row.account, sortable: true },
    { name: "Bank IFSC Code", selector: (row) => row.ifsc, sortable: true },
  ];

  const data = [
    {
      Payment_Type: "Salary",
      mode: "Cash",
      name: "State Bank of India",
      account: "12356",
      ifsc: "BK4568",
    },
  ];

  return (
    <div className='flex flex-col ml-20'>
      {/* <EditEmployeeDirectory /> */}
      <AdminHRMS/>
      <div className='flex'>
      
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Custom Report</h2>
            <div className="mb-4 ">
                <label htmlFor="">What is label for Custom Report</label>
                <input type="text" className="border p-2 border-black w-full rounded-md" />
            </div>
          <Collapsible
            trigger={
              <CustomTrigger isOpen={isOpen}>
                <h2 className="text-2xl font-bold mb-6">Employee Master</h2>
              </CustomTrigger>
            }
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            className="bg-gray-100 my-4 p-2 rounded-md font-bold"
          >
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
      
          </Collapsible>

          <Collapsible
            trigger={
              <CustomTrigger isOpen={isOpen}>
                <h2 className="text-2xl font-bold mt-6 mb-4">Payroll Output</h2>
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
                <h2 className="text-2xl font-bold mt-6">CTC Components</h2>
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
                <h2 className="text-2xl font-bold mt-6 mb-4">Attendance</h2>
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
                <h2 className="text-2xl font-bold mt-6 mb-4">Leave</h2>
              </CustomTrigger>
            }
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            className="bg-gray-100 my-4 p-2 rounded-md font-bold"
          >
            <Table columns={column} data={data} isPagination={true} />
          </Collapsible>
          <Collapsible
            trigger={
              <CustomTrigger isOpen={isOpen}>
                <h2 className="text-2xl font-bold mt-6 mb-4">Expense</h2>
              </CustomTrigger>
            }
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            className="bg-gray-100 my-4 p-2 rounded-md font-bold"
          >
           <Collapsible
            trigger={
              <CustomTrigger isOpen={isOpen}>
                <h2 className="text-2xl font-bold mt-6 mb-4">Employee Expense Setting</h2>
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
           <label htmlFor="">Expense Template Assigned</label></div></div>
          </Collapsible>
          </Collapsible>

    

          <div className="mt-6 flex gap-2 justify-center">
          <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md">Cancel</button>

            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomReport;
