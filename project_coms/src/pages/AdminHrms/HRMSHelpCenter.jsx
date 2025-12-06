import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { GrHelpBook } from "react-icons/gr";
import { PiPlus } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HRMSHelpCenter = ({ help, showModal }) => {
  const themeColor = useSelector((state) => state.theme.color);

  const page = help;
  const listItemStyle = {
    listStyleType: "disc",
    color: "gray",
    fontSize: "14px",
    fontWeight: 500,
  };
  return (
    <div className="my-4 mx-2 w-fit">
      <div className="flex flex-col  bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
        <div className="flex  gap-4 font-medium">
          <GrHelpBook size={20} />
          <h2>Help Center</h2>
        </div>
        {page === "basic" && (
          <>
            <div>
              <p className="font-medium">Company Profile Settings Guideline</p>
              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      The company profile allows you to store basic company
                      details such as Company legal name, Address, Contact, PAN,
                      TAN, etc. You can also enable statutory settings for PF,
                      ESIC, LWF, PT, IT in this section.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      Details mentioned in the company profile will be used
                      across modules. For e.g., Company name and address will be
                      displayed in the employee Pay Slip and Form16.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      You can edit/update the company details at any time.
                    </li>
                  </ul>
                </li>

                {/* <li>
                  <p>
                    <a href="basic-link" className="text-blue-400">
                      Click Here{" "}
                    </a>
                    for more details
                  </p>
                </li> */}
              </ul>
            </div>{" "}
          </>
        )}
        {page === "location" && (
          <>
            <div>
              <p className="font-medium">
                {" "}
                Location Settings Guidelines - Branch Location
              </p>
              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      A branch office relates to the office locations in
                      different states. The State Statutory compliances like PT
                      and LWF are in accordance with the branch locations.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      You will be able to store the PF, ESIC, PT, and LWF
                      registration codes in the branch location. The PF
                      registration code and the employee PF account number is
                      displayed in the employee salary pay slip.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      Branch Locations can also be used in filters across
                      modules.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      You can edit/update the branches at any time. But you
                      cannot delete the branches that are already mapped to
                      employees.
                    </li>
                  </ul>
                </li>

                <li>
                  You can edit/update the branches at any time. But you cannot
                  delete the branches that are already mapped to employees
                </li>
              </ul>
            </div>{" "}
          </>
        )}
        {page === "department" && (
          <>
            <div>
              <p className="font-medium"> Department Settings Guidelines</p>
              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      You can create departments such as a Sales, Marketing, HR,
                      Finance, Operations, etc. By adding departments, you will
                      be able to map the employees under specific departments
                      from the employee profile--employment---Job
                      Information---Position. This can further be mapped to head
                      of departments for direct reporting and workflow
                      approvals.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      An analytic view is displayed on the dashboard that gives
                      information on the no. Of employees mapped under specific
                      departments. Departments can also be used in filters
                      across modules.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>How do I create departments?</li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      Click on{" "}
                      <button
                        className="  w-24 text-white py-1 px-4 rounded-lg"
                        style={{ background: themeColor }}
                      >
                        Add Department
                      </button>{" "}
                      --- Enter department name and select the head of the
                      department from the employee list.
                    </li>
                  </ul>
                </li>

                <li>
                  You can edit and disable the departments. But you cannot
                  delete the departments that contains mapped employees.
                </li>
              </ul>
            </div>{" "}
          </>
        )}
        {page === "holiday" && (
          <>
            <div>
              <p className="font-medium">
                {" "}
                Company Holidays Settings Guidelines
              </p>
              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      You can create Company Holidays with a mix of mandatory
                      and flexible Holidays.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      Employees will automatically get an option to apply leaves
                      for flexible holidays in the leave module.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      As soon as the mandatory holidays are added, an event is
                      automatically created in the calendar.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      You can choose to apply the Holidays for all the employees
                      or specific employees.
                    </li>
                  </ul>
                </li>

                <li>
                  You can download the list of all the Company Holidays by
                  clicking on{" "}
                  {/* <a href="" className="text-blue-400">
                   Holiday Report 
                  </a> */}
                  <button
                    className=" text-white py-1 px-4 rounded-lg"
                    style={{ background: themeColor }}
                  >
                    <div className="flex  items-center gap-2">
                      {" "}
                      <FaDownload size={15} /> Holiday Report
                    </div>
                  </button>
                </li>
              </ul>
            </div>{" "}
          </>
        )}
        {page === "personal" && (
          <>
            <div>
              <p className="font-medium"> Employee Field Settings Guidelines</p>
              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      Employee fields contain employees' personal details,
                      employment details, any other information that you wish to
                      record. This data will be displayed in the employee
                      profile section.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      Apart from the default fields, you can create new custom
                      fields according to the kind of information you need. Here
                      are the steps to add new fields:
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li className="">
                      Organization module ---{">"} 
                      Employee fields ---{">"}{" "} 
                      <button
                        onClick={showModal}
                        className="text-white py-1 px-2 rounded-lg "
                        style={{ background: themeColor }}
                      >
                        Add Fields
                      </button>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      You can also create new custom multi-row tables for adding
                      specific data. For e.g., Employee family details,
                      Insurance details, educational details, Previous employer
                      records, etc.
                    </li>
                  </ul>
                </li>

                <li>
                  You can also select whether the field is mandatory (or not),
                  is part of the onboarding workflow and level of access given
                  to the employee through the edit option. You can delete fields
                  as long as they’ve not been mapped already.
                </li>
              </ul>
            </div>{" "}
          </>
        )}
        {page === "bank" && (
          <>
            <div>
              <p className="font-medium"> Bank Account Settings Guidelines</p>
              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      The Company Corporate Bank account is the account from
                      which the employee salaries get debited. Upon adding the
                      bank details, you will be able to pull reports in the bank
                      specific format (for those banks that you’ve added in the
                      master) from the reports section.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      You can enter the company bank details by following the
                      below steps:
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li className="flex">
                      Organization ---{">"}Bank Account{""}---{">"}Click on Add
                      {/* <div  className="text-blue-400">
                        <button   className=" text-white py-1 px-4 rounded-lg flex items-center gap-2"
                        style={{ background: themeColor }}><PiPlus/> Bank</button>
                     
                      </div> */}
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>You can enter multiple bank details.</li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>You can edit/delete the bank details at any time.</li>
                  </ul>
                </li>
              </ul>
            </div>{" "}
          </>
        )}
        {page === "calendar" && (
          <>
            <div>
              <p className="font-medium">
                Calendar Milestone Setting Guidelines
              </p>
              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      Milestones are employee-specific events such as Birthdays,
                      Work anniversaries, Wedding Anniversary, etc. and company
                      specific events such as Annual business meetups, etc.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      On creating milestones, the events get added to the
                      employee calendar and appear on the dashboard on the same
                      day.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      You can choose to enable email reminders about the event
                      from the milestone section. Once it is enabled, the
                      employees get an email reminder on the date of the event.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                      You can also send out automated custom email messages
                      (e.g., Birthday wishes and Work Anniversary wishes) for
                      created milestones through the communication settings.
                    </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>You can edit/delete the milestones at any time.</li>
                  </ul>
                </li>
                {/* <li>
                  <ul style={listItemStyle}>
                    <li>
                      <a href="" className="text-blue-400">
                        Click Here
                      </a>{" "}
                      to know more
                    </li>
                  </ul>
                </li> */}
              </ul>
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default HRMSHelpCenter;
