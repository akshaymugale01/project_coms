import React from "react";
import ExpenseSettingNav from "./ExpenseSettingNav";
import Table from "../../../components/table/Table";
import { GrHelpBook } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";

const ExpenseTemplates = () => {
  const columns = [
    {
      name: "Template name",
      selector: (row) => row.name,
      //   selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "No. of employees covered ",
      selector: (row) => row.covered,
      //   selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "No. of expense categories ",
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
      covered: "20",
      categories: "5",
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

export default ExpenseTemplates;
