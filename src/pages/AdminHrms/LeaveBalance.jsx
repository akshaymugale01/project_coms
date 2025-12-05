import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import AdminHRMS from "./AdminHrms";
import Table from "../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
const LeaveBalance = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [leaveCycle, setLeaveCycle] = useState("Jan 2024 - Dec 2024");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  const columns = [
    {
      name: "Leave Category",
      selector: (row) => row.leaveCategory,
      sortable: true,
    },
    {
      name: "Opening Balance",
      selector: (row) => row.openingBalance,
      sortable: true,
    },
    {
      name: "Accrued Balance",
      selector: (row) => row.accruedBalance,
      sortable: true,
    },
    {
      name: "Leaves Taken",
      selector: (row) => row.leavesTaken,
      sortable: true,
    },
    {
      name: "Leaves Adjusted",
      selector: (row) => row.leavesAdjusted,
      sortable: true,
    },
    {
      name: "Leaves Lapsed",
      selector: (row) => row.leavesLapsed,
      sortable: true,
    },
    {
      name: "Leaves Encashed",
      selector: (row) => row.leavesEncashed,
      sortable: true,
    },
    {
      name: "Ending Balance",
      selector: (row) => row.endingBalance,
      sortable: true,
    },
    {
      name: "Future Leaves",
      selector: (row) => row.futureLeaves,
      sortable: true,
    },
    {
      name: "Usable Balance",
      selector: (row) => row.usableBalance,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/hrms-leavebalance-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          {/* <button
            onClick={openModal}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Edit
          </button> */}
          {/* <button
            onClick={() => alert('Cancel leave')}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            Cancel
          </button> */}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const data = [
    {
      leaveCategory: "Annual Leave",
      openingBalance: 10,
      accruedBalance: 5,
      leavesTaken: 2,
      leavesAdjusted: 0,
      leavesLapsed: 0,
      leavesEncashed: 0,
      endingBalance: 13,
      futureLeaves: 1,
      usableBalance: 12,
    },
    {
      leaveCategory: "Sick Leave",
      openingBalance: 8,
      accruedBalance: 4,
      leavesTaken: 1,
      leavesAdjusted: 0,
      leavesLapsed: 0,
      leavesEncashed: 0,
      endingBalance: 11,
      futureLeaves: 0,
      usableBalance: 11,
    },
  ];
  return (
    <div className="flex ml-20">
      <AdminHRMS />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Leave Management</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <label
              htmlFor="employeeName"
              className="block text-sm font-medium text-gray-700"
            >
              Employee Name
            </label>
            <select
              id="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter employee name"
            >
              {/* Options should be provided here */}
              <option value="">Mittu Panda</option>
              <option value="">Akhil Nayak</option>
            </select>
          </div>
          <div className="col-span-1">
            <label
              htmlFor="leaveCycle"
              className="block text-sm font-medium text-gray-700"
            >
              Leave Cycle
            </label>
            <input
              type="text"
              id="leaveCycle"
              value={leaveCycle}
              onChange={(e) => setLeaveCycle(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter leave cycle"
            />
          </div>
          <div className="col-span-1 flex items-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-2">
          <Table columns={columns} data={data} isPagination={true} />
        </div>
      </div>
    </div>
  );
};

export default LeaveBalance;
