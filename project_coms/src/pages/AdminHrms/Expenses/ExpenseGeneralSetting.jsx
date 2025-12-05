import React, { useState } from "react";
import ExpenseSettingNav from "./ExpenseSettingNav";
import { MdKeyboardArrowDown, MdOutlineClose } from "react-icons/md";
import { GrHelpBook } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";

const ExpenseGeneralSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
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
        <div className="p-6 bg-white  rounded-md ">
          <div className="flex justify-end">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mb-4 px-4 py-2 bg-blue-500 flex items-center gap-2 text-white rounded-md"
              >
                <BiEdit /> Edit
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  //   onClick={handleEditSetting}
                  className="mb-4 px-4 py-1 border text-green-500 border-green-500 flex items-center gap-2 rounded-full"
                >
                  <FaCheck /> Save
                </button>
                <button
                  //   onClick={handleEditSetting}
                  onClick={() => setIsEditing(!isEditing)}
                  className="mb-4 px-4 py-1 border text-red-500 border-red-500 flex items-center gap-2 rounded-full"
                >
                  <MdOutlineClose /> Cancel
                </button>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Would you like to download the PDF report group by expense
                categories?
              </label>
              <div className="space-x-4">
                <label>
                  <input
                    type="radio"
                    name="canAdminsApproveLeave"
                    // checked={formData.canAdminsApproveLeave === true}
                    // onChange={() =>
                    //   setFormData({ ...formData, canAdminsApproveLeave: true })
                    // }
                    disabled={!isEditing}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="canAdminsApproveLeave"
                    value="no"
                    disabled={!isEditing}
                    // checked={formData.canAdminsApproveLeave === false}
                    // onChange={() =>
                    //   setFormData({ ...formData, canAdminsApproveLeave: false })
                    // }
                  />{" "}
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Would you like to show Approve/Reject button in the email
                notification for the approver?
              </label>
              <div className="space-x-4">
                <label>
                  <input
                    type="radio"
                    name="canSupervisorsAddLeaveAdjustment"
                    // checked={formData.canSupervisorsAddLeaveAdjustment === true}
                    // onChange={() =>
                    //   setFormData({
                    //     ...formData,
                    //     canSupervisorsAddLeaveAdjustment: true,
                    //   })
                    // }
                    disabled={!isEditing}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="canSupervisorsAddLeaveAdjustment"
                    // checked={
                    //   formData.canSupervisorsAddLeaveAdjustment === false
                    // }
                    // onChange={() =>
                    //   setFormData({
                    //     ...formData,
                    //     canSupervisorsAddLeaveAdjustment: false,
                    //   })
                    // }
                    disabled={!isEditing}
                  />{" "}
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
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

export default ExpenseGeneralSetting;
