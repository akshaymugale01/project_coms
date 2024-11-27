import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";

import { BiEdit } from "react-icons/bi";
import { GrHelpBook } from "react-icons/gr";

import DocumentDetailsList from "./DocumentDetailsList";
import { FaTrash } from "react-icons/fa";

const LetterTemplate = () => {
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const columns = [
    {
      name: "Template Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Employee Signature Required?",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "Status	",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Company Signature Required?",
      selector: (row) => row.State,
      sortable: true,
    },
    {
      name: "Last Updated",
      selector: (row) => row.Country,
      sortable: true,
    },
    {
      name: "Actions",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/edit-letter-templates`}>
            <BiEdit size={15} />
          </Link>
          <FaTrash size={15} />
        </div>
      ),
    },
  ];

  const data = [
    {
      Name: "Appointment letters",
      Label: "yes",
      City: "pending",
      State: "yes",

      Country: "23/10/2023",
    },
  ];

  return (
    <section className="flex ml-20">
      <DocumentDetailsList />
      <div className=" w-2/3 flex m-3 flex-col overflow-hidden">
        <div className=" flex justify-end gap-2 my-5">
          <input
            type="text"
            placeholder="Search by name "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
          />
          <Link
            to={"/admin/add-letter-template"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </Link>
        </div>
        <Table columns={columns} data={data} isPagination={true} />
      </div>
      <div className="flex flex-col mt-4 mr-2  bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
        <div className="flex  gap-4 font-medium">
          <GrHelpBook size={20} />
          <h2>Help Center</h2>
        </div>
        <div className=" ">
          {/* <p className="font-medium">Help Center</p> */}
          <ul style={listItemStyle} className="flex flex-col gap-2">
            <li>
              <ul style={listItemStyle}>
                <li>
                  Create multiple letter templates for employees like joining
                  forms, appointment letters, contract employees' letters, etc.
                  You can choose to have employee and employers' signature on
                  the letters as per need.{" "}
                </li>
              </ul>
            </li>
            <li>
              <ul style={listItemStyle}>
                <li>
                  The letters can be created based on dynamic fields available
                  in Vibe Connect.{" "}
                </li>
              </ul>
            </li>
            <li>
              <ul style={listItemStyle}>
                <li>
                  The letters can also be signed digitally by employee and
                  employer.{" "}
                </li>{" "}
              </ul>
            </li>

            <li>
              <p>
                {/* <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a> */}
                You can edit/delete the letter templates at any time.{" "}
              </p>
            </li>
            <li>
              <p>
                <a href="#" className="text-blue-400">
                  Click Here
                </a>
                &nbsp;for detailed information.{" "}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LetterTemplate;
