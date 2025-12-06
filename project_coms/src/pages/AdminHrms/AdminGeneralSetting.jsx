import React, { useEffect, useState } from "react";
import ToggleSwitch from "../../Buttons/ToggleSwitch";
import AttendanceDetailsList from "./AttendanceDetailsList";
import { GrHelpBook } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { editAttendanceGeneralSetting, getAttendanceGeneralSetting } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const AttendanceGeneralSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    selectRegularizationReason: false,
    isRegReasonMandatory: false,
    submitRegFutureDate: false,
    rosterApplicable: false,
    showApproveRejectBtn: false,
    id: ""
  });

  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchGeneralSetting = async () => {
    try {
      const res = await getAttendanceGeneralSetting(hrmsOrgId);
      const data = res[0];
      setFormData({
        ...formData,
        isRegReasonMandatory: data.is_reason_mandatory,
        rosterApplicable: data.is_roster_applicable,
      selectRegularizationReason: data.can_select_regularization_reason,
      showApproveRejectBtn: data.show_approve_reject_in_email,
      submitRegFutureDate: data.allow_future_submission,
      id:data.id
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGeneralSetting();
  }, []);

const handleEditGeneralSetting = async()=>{
  const editData = new FormData()
  editData.append("is_reason_mandatory", formData.isRegReasonMandatory)
  editData.append("is_roster_applicable", formData.rosterApplicable)
  editData.append("can_select_regularization_reason", formData.selectRegularizationReason)
  editData.append("show_approve_reject_in_email", formData.showApproveRejectBtn)
  editData.append("allow_future_submission", formData.submitRegFutureDate)
  editData.append("organization", hrmsOrgId)
  try {
    const res = await editAttendanceGeneralSetting(formData.id, editData)
    fetchGeneralSetting()
    toast.success("General setting updated successfully")
    setIsEditing(false)
  } catch (error) {
    console.log(error)
    toast.error("Something went wrong")
  }
}

  return (
    <div className="flex gap-5 ml-20">
      <AttendanceDetailsList />
      <div className="w-full mt-4">
        <div className="mt-2 ">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl">General Setting</h1>
            <div className="flex justify-end">
              {isEditing ? (
                <div className="flex gap-2 justify-center my-2">
                  <button
                    className="border-2 border-green-400 text-green-400 rounded-full p-1 px-4 flex items-center gap-2"
                    onClick={handleEditGeneralSetting}
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
          </div>
          <br />
          <label className="font-medium">
            Can Employees select Regularization Reason?{" "}
            <span className="text-red-500">*</span> &nbsp;
            <div className="flex gap-3">
              <label>
                <input
                  type="radio"
                  name="selectRegularizationReason"
                  checked={formData.selectRegularizationReason === true}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      selectRegularizationReason: true,
                    })
                  }
                  disabled={!isEditing}
                />{" "}
                &nbsp;Yes
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="selectRegularizationReason"
                  checked={formData.selectRegularizationReason === false}
                  // onChange={() =>
                  //   setFormData({
                  //     ...formData,
                  //     selectRegularizationReason: false,
                  //   })
                  // }
                  onChange={() =>
                    setFormData({
                      ...formData,
                      selectRegularizationReason: false,
                      isRegReasonMandatory: false, 
                    })
                  }
                  disabled={!isEditing}
                />{" "}
                &nbsp;No
              </label>
            </div>
          </label>
        </div>
        {formData.selectRegularizationReason && (
          <div className="mt-5 ">
            <label className="font-medium">
              Is Regularization Reason Mandatory?{" "}
              <span className="text-red-500">*</span> &nbsp;
              <div className="flex gap-3">
                <label>
                  <input
                    type="radio"
                    name="isRegReasonMandatory"
                    checked={formData.isRegReasonMandatory === true}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        isRegReasonMandatory: true,
                      })
                    }
                    disabled={!isEditing}
                  />{" "}
                  &nbsp;Yes
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name="isRegReasonMandatory"
                    checked={formData.isRegReasonMandatory === false}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        isRegReasonMandatory: false,
                      })
                    }
                    disabled={!isEditing}
                  />{" "}
                  &nbsp;No
                </label>
              </div>
            </label>
          </div>
        )}
        <div className="mt-4">
          <label className="font-medium">
            Allow employees to submit regularization request for a future date
            &nbsp;
            <div className="flex gap-3">
              <label>
                <input
                  type="radio"
                  name="submitRegFutureDate"
                  checked={formData.submitRegFutureDate === true}
                  onChange={() =>
                    setFormData({ ...formData, submitRegFutureDate: true })
                  }
                  disabled={!isEditing}
                />{" "}
                &nbsp;Yes
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="submitRegFutureDate"
                  checked={formData.submitRegFutureDate === false}
                  onChange={() =>
                    setFormData({ ...formData, submitRegFutureDate: false })
                  }
                  disabled={!isEditing}
                />{" "}
                &nbsp;No
              </label>
            </div>
          </label>
        </div>
        <div className="mt-4">
          <label className="font-medium">
            Is Roster Applicable?
            <div className="flex gap-3">
              <label>
                <input
                  type="radio"
                  name="rosterApplicable"
                  checked={formData.rosterApplicable === true}
                  onChange={() =>
                    setFormData({ ...formData, rosterApplicable: true })
                  }
                  disabled={!isEditing}
                />{" "}
                &nbsp;Yes
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="rosterApplicable"
                  checked={formData.rosterApplicable === false}
                  onChange={() =>
                    setFormData({ ...formData, rosterApplicable: false })
                  }
                  disabled={!isEditing}
                />{" "}
                &nbsp;No
              </label>
            </div>
          </label>
        </div>
        <div className="mt-4">
          <label className="font-medium">
            Would you like to show Approve/Reject button in the email
            notification for the approver?
            <div className="flex gap-3">
              <label>
                <input
                  type="radio"
                  name="showApproveRejectBtn"
                  checked={formData.showApproveRejectBtn === true}
                  onChange={() =>
                    setFormData({ ...formData, showApproveRejectBtn: true })
                  }
                  disabled={!isEditing}
                />
                &nbsp; Yes
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="showApproveRejectBtn"
                  checked={formData.showApproveRejectBtn === false}
                  onChange={() =>
                    setFormData({ ...formData, showApproveRejectBtn: false })
                  }
                  disabled={!isEditing}
                />{" "}
                &nbsp;No
              </label>
            </div>
          </label>
        </div>
      </div>

      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium">
            <GrHelpBook size={20} />
            <h2>Help Center</h2>
          </div>
          <div className="">
            {/* <p className="font-medium">Help Center</p> */}
            <ul style={listItemStyle} className="flex flex-col gap-2">
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Attendance settings allows you to configure attendance
                    policies in the form of templates based on different
                    departments, profiles, locations, etc.{" "}
                  </li>{" "}
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Within the attendance templates you can choose the mode of
                    capturing the attendance like web check-in, biometrics,
                    timesheet, mobile application.{" "}
                  </li>
                </ul>
              </li>
             

              <li>
                <p>
                  
                  You can automate the attendance process by automatically
                  capturing late marks, half-days, overtime and leave deductions
                  based on the template settings. You can also configure
                  attendance regularization limit and reason.
                </p>
              </li>
              <li>
                <p>
                  In the web check-in you can restrict capturing attendance
                  through static IP. Similarly, in mobile applications you can
                  restrict capturing attendance through geo-fencing.{" "}
                </p>
              </li>
              <li>
                <p>
                  Attendance module is integrated with leave and payroll module
                  and hence will sync data from the attendance module and derive
                  data like LOP calculations for running payroll.{" "}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceGeneralSetting;
