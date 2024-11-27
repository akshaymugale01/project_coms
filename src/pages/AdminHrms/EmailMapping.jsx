import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { GrHelpBook } from "react-icons/gr";

import Table from "../../components/table/Table";
import { FaTrash } from "react-icons/fa";

import { BiEdit } from "react-icons/bi";

import WorkflowDetailsList from "./WorkFlowDetailsList";

const EmailIdMapping = () => {
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const columns = [
    {
      name: "Display Name",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "From Address",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "Verification Status",
      selector: (row) => row.City,
      sortable: true,
    },

    {
      name: "Actions",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => setShowModal1(true)}>
            <BiEdit size={15} />
          </button>
          <FaTrash size={15} />
        </div>
      ),
    },
  ];

  const data = [
    {
      Name: "person 1",
      Location: "Vibe Connect Support",
      City: "Verified",
      Label: "support@vibeconnect.in",

      Country: "India",
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
          <button
            onClick={() => setShowModal(true)}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-96">
              <h1 className="text-2xl font-bold mb-4">Add Email ID Mapping</h1>
              <div className="mb-4">
                <label className="block text-gray-700">Display Name :</label>
                <input
                  type="text"
                  name="name"
                  className="border border-gray-300 p-2 mt-2 rounded w-full"
                />
                <label className="block text-gray-700 mt-2">
                  From Address:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 mt-2 rounded w-full"
                />
                {/* <label className="block text-gray-700 mt-2">Type of access:</label>
            <select
              name="type"
             
              className="border border-gray-300 mt-2 p-2 rounded w-full"
            >
              <option value="text">Full Access</option>
              <option value="number">Restricted Access</option>
             
            </select> */}
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
        {showModal1 && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-96">
              <h1 className="text-2xl font-bold mb-4">Edit Email ID Mapping</h1>
              <div className="mb-4">
                <label className="block text-gray-700">Display Name :</label>
                <input
                  type="text"
                  name="name"
                  className="border border-gray-300 p-2 mt-2 rounded w-full"
                />
                <label className="block text-gray-700 mt-2">
                  From Address:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 mt-2 rounded w-full"
                />
                {/* <label className="block text-gray-700 mt-2">Type of access:</label>
            <select
              name="type"
             
              className="border border-gray-300 mt-2 p-2 rounded w-full"
            >
              <option value="text">Full Access</option>
              <option value="number">Restricted Access</option>
             
            </select> */}
              </div>
              <button
                className="mt-4 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={() => setShowModal1(false)}
              >
                Close
              </button>
              <button
                className="mt-4 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={() => setShowModal1(false)}
              >
                Update
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

export default EmailIdMapping;
