import React, { useEffect, useState } from "react";
import FlexiSetting from "./FlexiSetting";
import { GrHelpBook } from "react-icons/gr";
import {
  editFlexiGeneralSettings,
  getFlexiGeneralSettings,
} from "../../../../api";
import { getItemInLocalStorage } from "../../../../utils/localStorage";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";

const FlexiGeneralSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const listItemStyle = {
    listStyleType: "disc",
    color: "gray",
    fontSize: "14px",
    fontWeight: 500,
  };
  const [formData, setFormData] = useState({
    initialBalanceDate: "",
    separatePayslip: false,
    previousUploads: false,
    supervisorManualAdjustment: false,
    freezeSubmission: false,
    id: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchGeneralSetting = async () => {
    try {
      const res = await getFlexiGeneralSettings(hrmsOrgId);
      const data = res[0];
      setFormData({
        ...formData,
        freezeSubmission: data.freeze_flexi_submissions,
        initialBalanceDate: data.initial_balance_date,
        previousUploads: data.include_previous_uploads_for_flexi,
        separatePayslip: data.separate_payslips_for_flexi,
        supervisorManualAdjustment: data.supervisor_manual_adjustment,
        id: data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGeneralSetting();
  }, []);

  const handleEditFlexiGenSetting = async () => {
    const editData = new FormData();
    editData.append("initial_balance_date", formData.initialBalanceDate);
    editData.append("separate_payslips_for_flexi", formData.separatePayslip);
    editData.append(
      "include_previous_uploads_for_flexi",
      formData.previousUploads
    );
    editData.append(
      "supervisor_manual_adjustment",
      formData.supervisorManualAdjustment
    );
    editData.append("freeze_flexi_submissions", formData.freezeSubmission);
    editData.append("organization", hrmsOrgId);
    try {
      const res = await editFlexiGeneralSettings(formData.id, editData);
      fetchGeneralSetting();
      toast.success("Flexi benefit setting updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-20 flex gap-2">
      <FlexiSetting />
      <div className="w-2/3 h-full my-10">
        <div className="p-6 bg-white  rounded-md ">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">Flexi Benefit Settings</h1>
            {isEditing ? (
              <div className="flex gap-2 justify-center my-2">
                <button
                  className="border-2 border-green-400 text-green-400 rounded-full p-1 px-4 flex items-center gap-2"
                  onClick={handleEditFlexiGenSetting}
                >
                  <FaCheck /> Save
                </button>
                <button
                  className="border-2 border-red-400 text-red-400 rounded-full p-1 px-4 flex items-center gap-2"
                  onClick={() => setIsEditing(false)}
                >
                  <MdClose /> Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md flex gap-2 items-center"
              >
                <BiEdit /> Edit
              </button>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                When were the initial balances set? (Auto eligibility accrual
                will begin after this date){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="initialBalanceDate"
                id=""
                className={`w-full px-3 py-1 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200" : ""
                }`}
                disabled={!isEditing}
                value={formData.initialBalanceDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Would you like to have separate payslips for flexi benefits?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="space-x-4">
                <label>
                  <input
                    type="radio"
                    name="canAdminsApproveLeave"
                    disabled={!isEditing}
                    checked={formData.separatePayslip === true}
                    onChange={() =>
                      setFormData({ ...formData, separatePayslip: true })
                    }
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="canAdminsApproveLeave"
                    value="no"
                    disabled={!isEditing}
                    checked={formData.separatePayslip === false}
                    onChange={() =>
                      setFormData({ ...formData, separatePayslip: false })
                    }
                  />{" "}
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Would you like to have previous uploads for flexi benefits?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="space-x-4">
                <label>
                  <input
                    type="radio"
                    name="previousUploads"
                    disabled={!isEditing}
                    checked={formData.previousUploads === true}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        previousUploads: true,
                      })
                    }
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="previousUploads"
                    disabled={!isEditing}
                    checked={formData.previousUploads === false}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        previousUploads: false,
                      })
                    }
                  />{" "}
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Can supervisors add manual adjustment of eligibility balance for
                their subordinates? <span className="text-red-500">*</span>
              </label>
              <div className="space-x-4">
                <label>
                  <input
                    type="radio"
                    name="supervisorManualAdjustment"
                    disabled={!isEditing}
                    checked={formData.supervisorManualAdjustment === true}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        supervisorManualAdjustment: true,
                      })
                    }
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="supervisorManualAdjustment"
                    disabled={!isEditing}
                    checked={formData.supervisorManualAdjustment === false}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        supervisorManualAdjustment: false,
                      })
                    }
                  />{" "}
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Would you like to freeze the submission of flexi benefits?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="space-x-4">
                <label>
                  <input
                    type="radio"
                    name="freezeSubmission"
                    disabled={!isEditing}
                    checked={formData.freezeSubmission === true}
                    onChange={() =>
                      setFormData({ ...formData, freezeSubmission: true })
                    }
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="freezeSubmission"
                    disabled={!isEditing}
                    checked={formData.freezeSubmission === false}
                    onChange={() =>
                      setFormData({ ...formData, freezeSubmission: false })
                    }
                  />{" "}
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4 mr-2  bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
        <div className="flex  gap-4 font-medium">
          <GrHelpBook size={20} />
          <h2>Help Center</h2>
        </div>
        <div className=" ">
          {/* <p className="font-medium">Leave Setting Guidelines:</p> */}
          <ul style={listItemStyle} className="flex flex-col gap-2">
            <li>
              <ul style={listItemStyle}>
                <li>
                  Flexi benefit settings allow you to configure salary-related
                  reimbursements that let employees save on tax by submitting
                  proofs. Unsubmitted amount will be considered as a taxable
                  income.{" "}
                </li>
              </ul>
            </li>
            <li>
              <ul style={listItemStyle}>
                <li>
                  You can create different categories like internet allowances,
                  petrol reimbursements, food allowances, etc. and set the
                  allowance amount in the employee salary table. You can set the
                  frequency as monthly/quarterly/semi-annually/annually.
                </li>
              </ul>
            </li>
            <li>
              <ul style={listItemStyle}>
                <li>
                  The eligibility of the calculations will be based on the
                  attendance.
                </li>
              </ul>
            </li>

            <li>
              <p>
                Employees can track their eligibility and reimbursement status
                from the flexi-benefits section. They also have an option to
                generate separate flexi payslip.
              </p>
            </li>
            <li>
              <p>
                Categories cannot be edited/deleted if already assigned to
                employees. Copyright © 2024 Vibeconnect
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlexiGeneralSettings;
