import React, { useState, useRef, useEffect } from "react";
import AdminHRMS from "./AdminHrms";
import LeaveSetting from "./LeaveSetting";
import { GrHelpBook } from "react-icons/gr";
import { editLeaveSetting, getLeaveSetting, postLeaveSetting } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const GeneralSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [formData, setFormData] = useState({
    month: "",
    canAdminsApproveLeave: false,
    canSupervisorsAddLeaveAdjustment: false,
    runDailyLeaveAccruals: false,
    id: "",
  });
  useEffect(() => {
    const fetchLeaveSetting = async () => {
      try {
        const res = await getLeaveSetting(hrmsOrgId);
        setFormData({
          ...formData,
          month: res[0].leave_cycle_start_month,
          canAdminsApproveLeave: res[0].admin_approval_access,
          canSupervisorsAddLeaveAdjustment: res[0].supervisors_can_adjust,
          runDailyLeaveAccruals: res[0].daily_leave_accrual,
          id: res[0].id,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeaveSetting();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSetting = async () => {
    const editData = new FormData();
    editData.append("leave_cycle_start_month", formData.month);
    editData.append("admin_approval_access", formData.canAdminsApproveLeave);
    editData.append(
      "supervisors_can_adjust",
      formData.canSupervisorsAddLeaveAdjustment
    );
    editData.append("daily_leave_accrual", formData.runDailyLeaveAccruals);
    editData.append("organization", hrmsOrgId);
    try {
      if (formData.id) {
        const res = await editLeaveSetting(formData.id, editData);
        toast.success("Leave setting updated successfully");
        setIsEditing(false); 
      }else{
        const res = await postLeaveSetting(editData)
        toast.success("Leave setting updated successfully");
        setIsEditing(false); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex gap-10 ml-20">
      <LeaveSetting />
      <div className="w-2/3 h-full my-10">
        <div className="p-6 bg-white  rounded-md ">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">Leave Settings</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleEditSetting}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Save
              </button>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                What month of the year does your leave cycle start from?
              </label>
              <select
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200" : ""
                }`}
                disabled={!isEditing}
                value={formData.month}
                onChange={handleChange}
                name="month"
              >
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Are Admins Having Manage Access to Leave Module Allowed To
                Approve/Reject Leave Applications?
              </label>
              <div className="space-x-4">
                <label>
                  <input
                    type="radio"
                    name="canAdminsApproveLeave"
                    checked={formData.canAdminsApproveLeave === true}
                    onChange={() =>
                      setFormData({ ...formData, canAdminsApproveLeave: true })
                    }
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
                    checked={formData.canAdminsApproveLeave === false}
                    onChange={() =>
                      setFormData({ ...formData, canAdminsApproveLeave: false })
                    }
                  />{" "}
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Can Supervisors add Leave Adjustments for subordinates?
              </label>
              <div className="space-x-4">
                <label>
                  <input
                    type="radio"
                    name="canSupervisorsAddLeaveAdjustment"
                    checked={formData.canSupervisorsAddLeaveAdjustment === true}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        canSupervisorsAddLeaveAdjustment: true,
                      })
                    }
                    disabled={!isEditing}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="canSupervisorsAddLeaveAdjustment"
                    checked={
                      formData.canSupervisorsAddLeaveAdjustment === false
                    }
                    onChange={() =>
                      setFormData({
                        ...formData,
                        canSupervisorsAddLeaveAdjustment: false,
                      })
                    }
                    disabled={!isEditing}
                  />{" "}
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Would you like to run daily leave accruals?
              </label>
              <div className="space-x-4">
                <label>
                  <input
                    type="radio"
                    name="runDailyLeaveAccruals"
                    checked={formData.runDailyLeaveAccruals === true}
                    onChange={() =>
                      setFormData({ ...formData, runDailyLeaveAccruals: true })
                    }
                    disabled={!isEditing}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="runDailyLeaveAccruals"
                    checked={formData.runDailyLeaveAccruals === false}
                    onChange={() =>
                      setFormData({ ...formData, runDailyLeaveAccruals: false })
                    }
                    disabled={!isEditing}
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
          <p className="font-medium">Leave Setting Guidelines:</p>
          <ul style={listItemStyle} className="flex flex-col gap-2">
            <li>
              <ul style={listItemStyle}>
                <li>
                  Leaves consist of different categories like Privilege leave,
                  casual leave, maternity leave, etc.{" "}
                </li>
              </ul>
            </li>
            <li>
              <ul style={listItemStyle}>
                <li>
                  Leave settings allows you to configure and assign leave policy
                  for different category of leaves based on department, profile,
                  locations, etc.{" "}
                </li>
              </ul>
            </li>
            <li>
              <ul style={listItemStyle}>
                <li>
                  Within the leave category you can set custom leave policies
                  like accrual frequency period, leave encashment, recovery
                  policies, sandwich leave, etc.{" "}
                </li>
              </ul>
            </li>

            <li>
              <p>
                {/* <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a> */}
                Within the template settings you can set approval hierarchy and
                accrual policy for new joinees, etc.{" "}
              </p>
            </li>
            <li>
              <p>
                {/* <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a> */}
                Leave module is integrated with the attendance module. Hence the
                leave data will be synced to attendance.{" "}
              </p>
            </li>
            <li>
              <p>
                <a href="leave-link" className="text-blue-400">
                  Click Here{" "}
                </a>
                for detailed information.{" "}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default GeneralSettings;
