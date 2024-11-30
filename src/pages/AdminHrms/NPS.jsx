import React, { useState } from "react";
import PayrollSettingDetailsList from "./PayrollSettingDetailsList";
import { GrHelpBook } from "react-icons/gr";

const NPS = () => {
  const [LIN, setLIN] = useState("");
  const [isESIC, setIsESIC] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const listItemStyle = {
    listStyleType: "disc",
    color: "gray",
    fontSize: "14px",
    fontWeight: 500,
  };
  return (
    <div className="flex  gap-4 ml-20">
      <PayrollSettingDetailsList />

      <div className="ml-10 w-2/3 p-8 bg-white rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6">NPS</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">
            Is your company registered under NPS?
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              name="esic"
              checked={isESIC}
              onChange={() => setIsESIC(true)}
              className="mr-2"
              disabled={!isEditing}
            />{" "}
            Yes
            <input
              type="radio"
              name="esic"
              checked={!isESIC}
              onChange={() => setIsESIC(false)}
              className="ml-4 mr-2"
              disabled={!isEditing}
            />{" "}
            No
          </div>
        </div>

        {/* <button className="w-full p-2 bg-blue-500 text-white font-semibold rounded">Submit</button> */}
      </div>
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium">
            <GrHelpBook size={20} />
            <h2>Help Center</h2>
          </div>
          <div className="">
            <ul style={listItemStyle} className="flex flex-col gap-2">
              <li>
                <ul style={listItemStyle}>
                  <li>
                    If your organization has NPS Policy where certain portion of
                    the salary is get contribution to NPS account then you can
                    configure the default setting here.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Further You need map require setting in employee salary Tax
                    and Statutory settings at the time of entering CTC details
                    for applicable employee. COPYRIGHT © 2024 My Citi Life{" "}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NPS;
