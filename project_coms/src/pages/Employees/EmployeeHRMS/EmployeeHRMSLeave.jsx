import React, { useState } from 'react';
import { PiPlusCircle } from 'react-icons/pi';
import { BsEye } from 'react-icons/bs';
import { Link } from 'react-router-dom';
// import HRMS from './HRMS';
import Table from '../../../components/table/Table';
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import EmployeeHRMS from './EmployeeHRMS';
const LeaveModal = ({ isOpen, onClose, onSubmit }) => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveBalance, setLeaveBalance] = useState('');
  const [applyFor, setApplyFor] = useState('others');
  const [name, setName] = useState('');
  const [employeeName, setEmployeeName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (applyFor === 'self') {
      onSubmit({ leaveType, startDate, endDate, leaveBalance, name });
    } else {
      onSubmit({ leaveType, startDate, endDate, leaveBalance, employeeName });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add Leave</h2>
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-4 flex gap-4">
            <button
              type="button"
              className={`border-2 font-semibold p-1 px-4 rounded-md ${
                applyFor === 'self' ? 'bg-black text-white' : 'border-black text-black'
              }`}
              onClick={() => setApplyFor('self')}
            >
              Self
            </button>
            <button
              type="button"
              className={`border-2 font-semibold p-1 px-4 rounded-md ${
                applyFor === 'others' ? 'bg-black text-white' : 'border-black text-black'
              }`}
              onClick={() => setApplyFor('others')}
            >
              Others
            </button>
          </div> */}
          {applyFor === 'self' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full border p-2 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          {applyFor === 'others' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Employee Name</label>
              <input
                type="text"
                className="w-full border p-2 rounded-md"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Leave Type</label>
            <select
              type="text"
              className="w-full border p-2 rounded-md"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              className="w-full border p-2 rounded-md"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              className="w-full border p-2 rounded-md"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Leave Balance : &nbsp;6</label>
            {/* <input
              type="number"
              className="w-full border p-2 rounded-md"
              value={leaveBalance}
              onChange={(e) => setLeaveBalance(e.target.value)}
              required
            /> */}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="border-2 font-semibold hover:bg-gray-200 duration-150 transition-all border-black p-1 px-4 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-1 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EmployeeHRMSLeaves = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    console.log('Form Data:', formData);
  };

  const columns = [
    {
      name: "view",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employee/hrms-leaves-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    // { name: "Name", selector: (row) => row.Name, sortable: true },
    { name: "From", selector: (row) => row.From, sortable: true },
    { name: "To", selector: (row) => row.To, sortable: true },
    { name: "Total", selector: (row) => row.Total, sortable: true },
    { name: "Type", selector: (row) => row.Type, sortable: true },
    { name: "Attachment", selector: (row) => row.Attachment, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    // {
    //     name: "Approval",
    //     selector: (row) =>
    //       row.status === "Upcoming" && (
    //         <div className="flex justify-center gap-2">
    //           <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full">
    //             <TiTick size={20} />
    //           </button>
    //           <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full">
    //             <IoClose size={20} />
    //           </button>
    //         </div>
    //       ),
    //     sortable: true,
    //   },
  ];

  const data = [
    {
      id: 1,
      Name:"M",
      From: "23/10/2024",
      To: "25/10/2024",
      Total: "2",
      Type: "sick",
      Attachment: "",
      status: "Upcoming",
    },
    {
      id: 2,
      Name:"M",
      From: "23/10/2024",
      To: "25/10/2024",
      Type: "sick",
      Total: "2",
      Attachment: "",
      Status: "pending",
    },
    {
      id: 3,
      Name:"M",
      From: "23/10/2024",
      To: "25/10/2024",
      Type: "sick",
      Attachment: "",
      Total: "2",
      Status: "pending",
    },
  ];

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",
        fontSize: "14px",
      },
    },
  };

  return (
    <section className="flex">
      <EmployeeHRMS/>
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-start gap-4 my-5 flex-shrink flex-wrap">
          <div className="shadow-xl rounded-full border-4 border-gray-400 w-72 px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Annual</p>
            <p className="text-center font-semibold md:text-lg">10 days</p>
          </div>
          <div className="shadow-xl rounded-full border-4 border-green-400 w-72 px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Sick Leave</p>
            <p className="text-center font-semibold md:text-lg">7 days</p>
          </div>
          <div className="shadow-xl rounded-full border-4 border-red-400 w-72 px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Casual Leave</p>
            <p className="text-center font-semibold md:text-lg">10 days</p>
          </div>
          <div className="shadow-xl rounded-full border-4 border-orange-400 w-72 px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Others</p>
            <p className="text-center font-semibold md:text-lg">5 days</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Search by name"
            className="border-2 p-2 w-96 border-gray-300 rounded-lg"
            // value={searchText}
            // onChange={handleSearch}
          />
            {/* <label htmlFor="from" className="mr-2">From:</label>
            <input
              id="from"
              type="date"
              className="border-2 p-2 w-70 border-gray-300 rounded-lg mr-2"
            />
            <label htmlFor="to" className="mr-2">To:</label>
            <input
              id="to"
              type="date"
              className="border-2 p-2 w-70 border-gray-300 rounded-lg mr-2"
            /> */}
            <select className="border border-gray-400 p-2 rounded-md mr-2">
              <option value="">All Types Leave</option>
              <option value="">b</option>
            </select>
            <select className="border border-gray-400 p-2 rounded-md mr-2">
              <option value="">All Status</option>
              <option value="">b</option>
            </select>
            <button
              onClick={handleAddClick}
              className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-1 px-4 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
            >
              <PiPlusCircle size={20} />
              Add
            </button>
          </div>
        </div>
        <Table
          columns={columns}
          data={data}
        //   customStyles={customStyle}
          responsive
          fixedHeader
          fixedHeaderScrollHeight="500px"
          pagination
          selectableRowsHighlight
          highlightOnHover
        />
      </div>
      <LeaveModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
      />
    </section>
  );
};

export default EmployeeHRMSLeaves;