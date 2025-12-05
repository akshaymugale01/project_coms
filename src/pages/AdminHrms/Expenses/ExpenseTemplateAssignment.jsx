import React from "react";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import ExpenseSettingNav from "./ExpenseSettingNav";
import Table from "../../../components/table/Table";
import { GrHelpBook } from "react-icons/gr";
import { MdKeyboardArrowDown } from "react-icons/md";

const ExpenseTemplateAssignment = () => {
  const columns = [
    {
      name: "Employee name",
      selector: (row) => row.name,
      //   selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Current expense template",
      selector: (row) => row.template,
      //   selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "supervisors",
      selector: (row) => row.categories,
      //   selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },

    {
      name: "Action",
      selector: (row) => (
        <div className="flex justify-end gap-2">
          <button
            // onClick={() => handleEditApplication(row.id)}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <BiEdit size={15} />
          </button>

          <button
            className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full"
            // onClick={() => {
            //   handleLeaveApplicationApproval(row.id, "rejected");
            // }}
          >
            <FaTrash size={15} />
          </button>
        </div>
      ),
      sortable: true,
    },
  ];

  const data = [
    {
      name: "Mittu",
      template: "Sales",
      categories: "L1: Kunal , L2: Akshat",
    },
  ];
  const listItemStyle = {
    listStyleType: "disc",
    color: "gray",
    fontSize: "14px",
    fontWeight: 500,
  };
  return (
    <section className="flex gap-2 ml-20">
      <ExpenseSettingNav />
      <div className="w-2/3 h-full my-10">
        <div className="my-2 flex justify-between ">
          <input
            type="text"
            name=""
            id=""
            className="border border-gray-400 rounded-md px-2 w-96"
            placeholder="Search by employee name"
          />
          <div className="relative inline-block text-left">
            <button
              // onClick={toggleDropdown}
              className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            >
              Actions
              <MdKeyboardArrowDown size={20} />
            </button>
          </div>
        </div>
        <Table columns={columns} data={data} isPagination={true} />
      </div>
      <div className="flex flex-col mt-4 mr-2  bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[20rem]">
        <div className="flex  gap-4 font-medium">
          <GrHelpBook size={20} />
          <h2>Help Center</h2>
        </div>
        <div className=" ">
          <ul style={listItemStyle} className="flex flex-col gap-2">
            <li>
              <ul style={listItemStyle}>
                <li>
                  Expense consists of different categories like travelling,
                  mobile allowance, food allowance, or any other expense related
                  to the business.
                </li>
              </ul>
            </li>
            <li>
              <ul style={listItemStyle}>
                <li>
                  Expense settings allows you to configure and assign expense
                  policy for different category of expenses based on profiles,
                  band, etc.
                </li>
              </ul>
            </li>
            <li>
              <ul style={listItemStyle}>
                <li>
                  Within the expense category settings, you can set custom
                  expense policies like expense limit, choose to allow employees
                  to upload expense receipts, cut-off expense submission
                  timeline, frequency of reminders for unsubmitted (saved)
                  expenses.
                </li>
              </ul>
            </li>

            <li>
              <p>
                You will see default leave categories like (i) Per Diem: You can
                set daily allowance limits like lunch allowance, etc. (ii)
                Distance/fuel: You can set kilometer wise limits (per km rate)
                for 2-wheelers and 4-wheelers (iii) Time: You can set your
                frequency of expense submissions in a period.
              </p>
            </li>
            <li>
              <p>
                Within the expense template settings, you can set approval
                hierarchy.
              </p>
            </li>
            <li>
              <p>
                You can edit/update the templates and categories at any time.
                You cannot delete the templates and modules if already assigned.
              </p>
            </li>
            <li>
              <p>
                The admin can process all approved expenses and generate a
                consolidated report and bank report.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ExpenseTemplateAssignment;
