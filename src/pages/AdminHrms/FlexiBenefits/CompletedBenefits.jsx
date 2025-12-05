import React from "react";
import Table from "../../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { FaDownload, FaTrash } from "react-icons/fa";

const CompletedBenefits = () => {
  const columns = [
    {
      name: "Employee Name",
      selector: (row) => row.name,
      //   selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.reimbursable,
      sortable: true,
    },
    {
      name: "Submitted on",
      selector: (row) => row.submittedOn,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex justify-center gap-2">
          <button
            // onClick={() => handleEditApplication(row.id)}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <BsEye size={15} />
          </button>

          <button
            className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full"
            // onClick={() => {
            //   handleLeaveApplicationApproval(row.id, "rejected");
            // }}
          >
            <FaTrash size={15} />
          </button>
          <button
            className="text-green-400 font-medium  transition-all duration-200 p-1 rounded-full"
            // onClick={() => {
            //   handleLeaveApplicationApproval(row.id, "rejected");
            // }}
          >
            <FaDownload  size={18} />
          </button>
        </div>
      ),
      sortable: true,
    },
  ];

  const data = [
    {
      name: "Mittu",
      title: "Traveling",
      submittedOn: "10/09/2024",
      reimbursable: "400",
      bill: "0",
      status: "Approved",
    },
  ];

  return (
    <section className="flex">
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <Table columns={columns} data={data} isPagination={true} />
      </div>
    </section>
  );
};

export default CompletedBenefits;
