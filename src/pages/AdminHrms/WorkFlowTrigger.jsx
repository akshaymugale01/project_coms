import React, { useState } from "react";

import Table from "../../components/table/Table";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import WorkflowDetailsList from "./WorkFlowDetailsList";
import { GrHelpBook } from "react-icons/gr";

const WorkflowTrigger = () => {
  const [showModal, setShowModal] = useState(false);
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Executed On",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "Last Updated",
      selector: (row) => row.City,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const data = [
    {
      Name: "person 1",
      Location: "Happy Birthday",
      City: "23/10/2023",
      Label: "On Birthday",

      status: "Active",
    },
  ];

  return (
    <section className="flex ml-20">
      <WorkflowDetailsList />
      <div className=" w-full flex m-3 flex-col overflow-hidden">
        <div className=" flex justify-end gap-2 my-5">
          <input
            type="text"
            placeholder="Search by name "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
          />
          {/* <button
            onClick={() => setShowModal(true)}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button> */}
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-96">
              <h1 className="text-2xl font-bold mb-4">Add Workflow Trigger</h1>
              <div className="mb-4">
                <label className="block text-gray-700">Name :</label>
                <input
                  type="text"
                  name="name"
                  className="border border-gray-300 p-2 mt-2 rounded w-full"
                />
                <label className="block text-gray-700 mt-2">Executed on:</label>
                <input
                  type="date"
                  className="border border-gray-300 p-2 mt-2 rounded w-full"
                />
                <label className="block text-gray-700 mt-2">
                  Last Updated:
                </label>
                <input
                  type="date"
                  className="border border-gray-300 p-2 mt-2 rounded w-full"
                />
              </div>
              <button
                className="mt-4 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <Table columns={columns} data={data} isPagination={true} />
      </div>
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium">
            <GrHelpBook size={20} />
            <h2>Help Center</h2>
          </div>
          <div className=" ">
            <ul style={listItemStyle} className="flex flex-col gap-2">
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Communication triggers can be used to send occasional emails
                    automatically on employee-specific events like Birthdays,
                    anniversaries, etc. and date-specific events like festivals,
                    holidays, annual meet-up notice, etc.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    The workflow will consist of a step-by-step process that
                    involves creating email templates, mapping custom 'from'
                    email ID, creating a workflow as to when the email will
                    trigger and to which recipients.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can configure from "email ID" (@companydomain.com) to
                    send the email communications. For e.g., your HR email or
                    your admin email.{" "}
                  </li>
                </ul>
              </li>

              <li>
                <p>
                  You can create custom communication templates along with
                  custom content, insert image of your choice and add dynamic
                  fields. This template will further be mapped to the Workflow
                  Trigger to send emails to recipients automatically on the date
                  of the event.{" "}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowTrigger;
