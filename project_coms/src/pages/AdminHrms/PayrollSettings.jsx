import React, { useEffect, useState } from "react";
import PayrollSettingDetailsList from "./PayrollSettingDetailsList";
import { GrHelpBook } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { editPayrollGeneralSetting, getPayrollGeneralSetting } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const PayrollSettings = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    LIN: "",
    isESIC: false,
    isLWF: false,
    isPT: false,
    payrollDay: 0,
    approverType: "",
    approver: "",
    attendanceCycleStart: "",
    isTotalPayableDaysSame: false,
    payableDayCalculation: "",
    numberOfPayableDays: "",
    isPasswordProtected: false,
    password: "",
    lopDays: "",
    ctcComponents: "",
    startMonth: "",
    id: "",
  });
  const listItemStyle = {
    listStyleType: "disc",
    color: "gray",
    fontSize: "14px",
    fontWeight: 500,
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchGeneralSetting = async () => {
    try {
      const response = await getPayrollGeneralSetting(hrmsOrgId);
      const res = response[0];
      setFormData({
        ...formData,
        LIN: res.lin_number,
        isESIC: res.esic_registered,
        isLWF: res.lwf_registered,
        isPT: res.professional_tax_registered,
        payrollDay: res.payroll_run_day,
        approverType: res.payroll_approver_type,
        approver: res.other_approver,
        attendanceCycleStart: res.attendance_cycle_start_day,
        isTotalPayableDaysSame: res.same_payable_days_as_attendance,
        payableDayCalculation: res.payable_days_calculation,
        isPasswordProtected: res.password_required,
        // password: res.password
        ctcComponents: res.additional_ctc_components,
        lopDays: res.lop_days_entry_method,
        startMonth: res.ytd_start_month,
        id: res.id,
        numberOfPayableDays: res.number_of_payable_days,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGeneralSetting();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEditPayrollSetting = async () => {
    const editData = new FormData();
    editData.append("lin_number", formData.LIN);
    editData.append("esic_registered", formData.isESIC);
    editData.append("lwf_registered", formData.isLWF);
    editData.append("professional_tax_registered", formData.isPT);
    editData.append("payroll_run_day", formData.payrollDay);
    editData.append("payroll_approver_type", formData.approverType);
    editData.append("other_approver", formData.approver);
    editData.append(
      "attendance_cycle_start_day",
      formData.attendanceCycleStart
    );
    editData.append(
      "same_payable_days_as_attendance",
      formData.isTotalPayableDaysSame
    );
    editData.append("payable_days_calculation", formData.payableDayCalculation);
    editData.append("password_required", formData.isPasswordProtected);
    editData.append("password", formData.password);
    editData.append("additional_ctc_components", formData.ctcComponents);
    editData.append("lop_days_entry_method", formData.lopDays);
    editData.append("ytd_start_month", formData.startMonth);
    editData.append("number_of_payable_days", formData.numberOfPayableDays);
    editData.append("organization", hrmsOrgId);
    try {
      const res = await editPayrollGeneralSetting(formData.id, editData);
      toast.success("General setting updated successfully");
      fetchGeneralSetting();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Error updating payroll general setting");
    }
  };
  return (
    <div className="flex justify-between ml-20">
      <PayrollSettingDetailsList />
      <div className=" p-4 bg-white w-full rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6">Payroll General Settings</h2>
          {isEditing ? (
            <div className="flex gap-2 justify-center my-2">
              <button
                className="border-2 border-green-400 text-green-400 rounded-full p-1 px-4 flex items-center gap-2"
                onClick={handleEditPayrollSetting}
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
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            What LIN number have you registered your Company with?
          </label>
          <input
            type="text"
            value={formData.LIN}
            name="LIN"
            onChange={handleChange}
            placeholder="Enter Labour Identification Number"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              !isEditing ? "bg-gray-200" : ""
            }`}
            readOnly={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">
            Is your company registered under ESIC?
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              name="esic"
              checked={formData.isESIC === true}
              onChange={() => setFormData({ ...formData, isESIC: true })}
              className="mr-2"
              disabled={!isEditing}
            />{" "}
            Yes
            <input
              type="radio"
              name="esic"
              checked={formData.isESIC === false}
              onChange={() => setFormData({ ...formData, isESIC: false })}
              className="ml-4 mr-2"
              disabled={!isEditing}
            />{" "}
            No
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-medium">
            Is your company registered under LWF?
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              name="lwf"
              checked={formData.isLWF === true}
              onChange={() => setFormData({ ...formData, isLWF: true })}
              className="mr-2"
              disabled={!isEditing}
            />{" "}
            Yes
            <input
              type="radio"
              name="lwf"
              checked={formData.isLWF === false}
              onChange={() => setFormData({ ...formData, isLWF: false })}
              className="ml-4 mr-2"
              disabled={!isEditing}
            />{" "}
            No
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-medium">
            Is your company registered under Professional Tax?
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              name="pt"
              checked={formData.isPT === true}
              onChange={() => setFormData({ ...formData, isPT: true })}
              className="mr-2"
              disabled={!isEditing}
            />{" "}
            Yes
            <input
              type="radio"
              name="pt"
              checked={formData.isPT === false}
              onChange={() => setFormData({ ...formData, isPT: false })}
              className="ml-4 mr-2"
              disabled={!isEditing}
            />{" "}
            No
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            What day of the month do you run your payroll?
          </label>
          <input
            type="number"
            value={formData.payrollDay}
            name="payrollDay"
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              !isEditing ? "bg-gray-200" : ""
            }`}
            readOnly={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">
            Which employee will approve each payroll run?
          </label>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              name="approverType"
              checked={formData.approverType === "Company Admin"}
              onChange={() =>
                setFormData({ ...formData, approverType: "Company Admin" })
              }
              className="mr-2"
              disabled={!isEditing}
            />{" "}
            Company Admin
            <input
              type="radio"
              name="approverType"
              checked={formData.approverType === "Another Employee"}
              onChange={() =>
                setFormData({ ...formData, approverType: "Another Employee" })
              }
              className="ml-4 mr-2"
              disabled={!isEditing}
            />{" "}
            Another Employee
          </div>
        </div>
        {/* {approver === "Another Employee" && ( */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Select Payroll Approver
          </label>
          <select
            name="approver"
            id=""
            value={formData.approver}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              !isEditing ? "bg-gray-200" : ""
            }`}
            disabled={!isEditing}
          >
            <option value="">Select Approver</option>
          </select>
        </div>
        {/* )} */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            On what day of the month does your attendance cycle begin?
          </label>
          <input
            type="number"
            value={formData.attendanceCycleStart}
            onChange={handleChange}
            name="attendanceCycleStart"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              !isEditing ? "bg-gray-200" : ""
            }`}
            readOnly={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">
            Are the total payable days in the month the same as the number of
            days in the attendance cycle?
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              name="payableDays"
              checked={formData.isTotalPayableDaysSame === true}
              onChange={() =>
                setFormData({ ...formData, isTotalPayableDaysSame: true })
              }
              className="mr-2"
              disabled={!isEditing}
            />{" "}
            Yes
            <input
              type="radio"
              name="payableDays"
              checked={formData.isTotalPayableDaysSame === false}
              onChange={() =>
                setFormData({ ...formData, isTotalPayableDaysSame: false })
              }
              className="ml-4 mr-2"
              disabled={!isEditing}
            />{" "}
            No
          </div>
        </div>
        {!formData.isTotalPayableDaysSame && (
          <>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="" className="font-medium">
                How does payable days get calculated?
              </label>
              <select
                name="payableDayCalculation"
                value={formData.payableDayCalculation}
                onChange={handleChange}
                id=""
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200" : ""
                }`}
                disabled={!isEditing}
              >
                <option value="">Select Days</option>
                <option value="Fixed Days">Fixed Days</option>
                <option value="Exclude Weekly-Offs">Exclude Weekly-Offs</option>
                <option value="Exclude Weekly-Offs and Holidays">
                  Exclude Weekly-Offs and Holidays
                </option>
                <option value="Calendar Days in the payroll month">
                  Calendar Days in the payroll month
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="" className="font-medium">
                Number of payable days in a month to consider (This is the
                denomination factor considered during the payroll calculation)
              </label>
              <input
                type="number"
                name="numberOfPayableDays"
                id=""
                value={formData.numberOfPayableDays}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200" : ""
                }`}
                disabled={!isEditing}
              />
            </div>
          </>
        )}
        <div className="my-4">
          <label className="block font-medium">
            Do you want to keep password for salary register or not?
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              name="passwordProtected"
              checked={formData.isPasswordProtected === true}
              onChange={() =>
                setFormData({ ...formData, isPasswordProtected: true })
              }
              className="mr-2"
              disabled={!isEditing}
            />{" "}
            Yes
            <input
              type="radio"
              name="passwordProtected"
              checked={formData.isPasswordProtected === false}
              onChange={() =>
                setFormData({ ...formData, isPasswordProtected: false })
              }
              className="ml-4 mr-2"
              disabled={!isEditing}
            />{" "}
            No
          </div>
        </div>
        {formData.isPasswordProtected && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Please enter password for salary register
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="************"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            How would you like to add LOPs days while running the Payroll?
          </label>
          <select
            name="lopDays"
            id=""
            value={formData.lopDays}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              !isEditing ? "bg-gray-200" : ""
            }`}
            disabled={!isEditing}
          >
            <option value="">Select </option>
            <option value="Select Dates">Select Dates</option>
            <option value="Enter Number of LOP days">
              Enter Number of LOP days{" "}
            </option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            What additional components do you want to show in the CTC structure?
          </label>
          <select
            name="ctcComponents"
            value={formData.ctcComponents}
            onChange={handleChange}
            id=""
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              !isEditing ? "bg-gray-200" : ""
            }`}
            disabled={!isEditing}
          >
            <option value="">Select </option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Please select start month for YTD payslip
          </label>
          <select
            name="months"
            value={formData.startMonth}
            onChange={handleChange}
            id="months"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              !isEditing ? "bg-gray-200" : ""
            }`}
            disabled={!isEditing}
          >
            <option value="">Select</option>
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
          {isEditing && (
            <div className="flex gap-2 justify-center my-2">
              <button
                className="border-2 border-green-400 text-green-400 rounded-full p-1 px-4 flex items-center gap-2"
                onClick={handleEditPayrollSetting}
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
          )}
        </div>
        {/* <button className="w-full p-2 bg-blue-500 text-white font-medium rounded">Submit</button> */}
      </div>
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col bg-gray-50 rounded-md text-wrap text-gray-400 gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium">
            <GrHelpBook size={20} />
            <h2>Help Center</h2>
          </div>
          <div className="">
            <ul style={listItemStyle} className="flex flex-col gap-2">
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Here in General Settings you can configure how payable days
                    are calculated and can also set who will be the approving
                    authority for the same.
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can also set how the LOP days can be entered manually by
                    selecting date or entered LOP days in LOP in Loss of Pay
                    Days steps while running the payroll.
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You also get to select what components to additionally
                    incorporate to the CTC structure.
                  </li>
                </ul>
              </li>

              <li>
                <p>
                  {/* <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a> */}
                  You can also set password for your salary register and the
                  password will be suffix (@MMYYYY) with your entered password.
                  E.g. If you enter password as abcd in Payroll Setting then
                  password for salary register for month of April 2022 would be
                  abcd@042022
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollSettings;
