import React, { useState } from "react";
import AdminHRMS from "./AdminHrms";
import { postLeaveCategory } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useNavigate, useNavigation } from "react-router-dom";

function AddLeaveCategory() {
  const [formData, setFormData] = useState({
    leaveType: "",
    customLabel: "",
    abbreviationLabel: "",
    accrualPeriod: "",
    accrueInAdvance: false,
    carryoverLimit: "No Carryover",
    negativeBalance: false,
    roundOffAccrual: false,
    intraCycleLapse: false,
    prorationMethod: "",
    allowWeeklyOff: false,
    canApplyLeave: false,
    applyFutureLeave: false,
    leaveEncashmentRollover: false,
    leaveEncashmentFNF: false,
    halfDayOption: false,
    includeHolidayPrefixSuffix: false,
    includeHolidayInLeave: false,
    includeWeeklyOffPrefixSuffix: false,
    includeWeeklyOffInLeave: false,
    paidLeave: false,
    submissionDaysLimit: "",
    occurrenceDaysLimit: "",
    minConsecutiveDays: "",
    maxConsecutiveDays: "",
    weeklyOffConsecutive: false,
    holidayConsecutive: false,
    documentRequired: false,
    dateRestriction: false,
    displayClosingBalance: false,
    includeAnnualHolidayPart: false,
    includeWeeklyOffPrefixed: false,
    includeWeeklyOffPart: false,
    minApplicationDaysBefore: "",
    maxDaysFromOccurrence: "",
    consecutiveWithWeeklyOff: false,
    consecutiveWithHoliday: false,
    fixedCutoffDay: 15,
    resignationCutoffDay:15
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate()
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const handleSubmit = async () => {
    const postData = new FormData();
    postData.append("type_of_leave", formData.leaveType);
    postData.append("label", formData.customLabel);
    postData.append("abbreviation", formData.abbreviationLabel);
    postData.append("accrual_period", formData.accrualPeriod);
    postData.append("accrue_in_advance", formData.accrueInAdvance);
    postData.append("carryover_limits", formData.carryoverLimit);
    postData.append("negative_balance_allowed", formData.negativeBalance);
    postData.append("round_off_to_nearest_half", formData.roundOffAccrual);
    postData.append("intra_cycle_lapse_applicable", formData.intraCycleLapse);
    postData.append("prorate_first_month_accrual", formData.prorationMethod);
    postData.append("allow_on_weekly_offs", formData.allowWeeklyOff);
    postData.append("employee_can_apply", formData.canApplyLeave);
    postData.append("allow_future_leave", formData.applyFutureLeave);
    postData.append(
      "eligible_for_encashment_rollover",
      formData.leaveEncashmentRollover
    );
    postData.append("eligible_for_encashment_fnf", formData.leaveEncashmentFNF);
    postData.append("half_day_option", formData.halfDayOption);
    postData.append(
      "include_annual_holiday_prefixed",
      formData.includeHolidayPrefixSuffix
    );
    postData.append(
      "include_annual_holiday_part",
      formData.includeAnnualHolidayPart
    );
    postData.append(
      "include_weekly_off_prefixed",
      formData.includeWeeklyOffPrefixed
    );
    postData.append("include_weekly_off_part", formData.includeWeeklyOffPart);
    postData.append("is_paid_leave", formData.paidLeave);
    postData.append(
      "min_application_days_before",
      formData.minApplicationDaysBefore
    );
    postData.append("max_days_from_occurrence", formData.maxDaysFromOccurrence);
    postData.append(
      "min_consecutive_days_allowed",
      formData.minConsecutiveDays
    );
    postData.append(
      "max_consecutive_days_allowed",
      formData.maxConsecutiveDays
    );
    postData.append(
      "consecutive_with_weekly_off",
      formData.consecutiveWithWeeklyOff
    );
    postData.append(
      "consecutive_with_holiday",
      formData.consecutiveWithHoliday
    );
    postData.append("document_required", formData.documentRequired);
    postData.append("date_restriction", formData.dateRestriction);
    postData.append(
      "display_balance_in_payslip",
      formData.displayClosingBalance
    );
    postData.append(
      "fixed_cutoff_day",
      formData.fixedCutoffDay
    );
    postData.append(
      "resignation_cutoff_day",
      formData.resignationCutoffDay
    );
    postData.append("organization", hrmsOrgId);
    try {
      const res = await postLeaveCategory(postData);
      navigate("/leave-categories")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <AdminHRMS />
      <div className="container ml-20 mb-5 p-4 ">
        <h2 className="text-2xl mb-4">Add Leave Category</h2>
        <div className="grid gap-4 lg:grid-cols-3 ml-5">
          <div className="flex flex-col gap-2  justify-between">
            <label className="font-medium">
              Type of Leave <span className="text-red-500">*</span>
            </label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-400"
            >
              <option value="">Select</option>
              <option value="General Leave">General Leave</option>
              <option value="Annual Non-Accrual Leave">
                Annual Non-Accrual Leave
              </option>
              <option value="Flexi Holiday">Flexi Holiday</option>
              <option value="Comp Off">Comp Off</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <label className="font-medium">
              Label for this leave <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="customLabel"
              value={formData.customLabel}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-400"
              placeholder="Custom label"
            />
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <label className="font-medium">
              Abbreviation Label <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="abbreviationLabel"
              value={formData.abbreviationLabel}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-400"
              placeholder="PL"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Leave Accrual Period <span className="text-red-500">*</span>
            </label>
            <select
              name="accrualPeriod"
              value={formData.accrualPeriod}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-400"
            >
              <option value="">Select</option>
              <option value="Annually">Annually</option>
              <option value="Semi-Annually">Semi-Annually</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Bi-Monthly">Bi-Monthly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div className="flex flex-col gap-2  justify-between">
            <label className="font-medium">Accrue leave in advance?</label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="accrueInAdvance"
                  checked={formData.accrueInAdvance === true}
                  onChange={() =>
                    setFormData({ ...formData, accrueInAdvance: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="accrueInAdvance"
                  checked={formData.accrueInAdvance === false}
                  onChange={() =>
                    setFormData({ ...formData, accrueInAdvance: false })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Carryover limits</label>
            <select
              name="carryoverLimit"
              value={formData.carryoverLimit}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-400"
            >
              <option value="">Select</option>
              <option value="No Carryover">No Carryover</option>
              <option value="Carryover Cap">Carryover Cap</option>
              <option value="No Limit">No Limit</option>
            </select>
          </div>
          <div className="flex flex-col gap-2  justify-between">
            <label className="font-medium">
              Negative leave balance allowed?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="negativeBalance"
                  checked={formData.negativeBalance === true}
                  onChange={() =>
                    setFormData({ ...formData, negativeBalance: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="negativeBalance"
                  value="No"
                  checked={formData.negativeBalance === false}
                  onChange={() =>
                    setFormData({ ...formData, negativeBalance: false })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2  justify-between">
            <label className="font-medium">
              Round-off leave accrual to nearest 0.5 unit?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="roundOffAccrual"
                  checked={formData.roundOffAccrual === true}
                  onChange={() =>
                    setFormData({ ...formData, roundOffAccrual: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="roundOffAccrual"
                  checked={formData.roundOffAccrual === false}
                  onChange={() =>
                    setFormData({ ...formData, roundOffAccrual: false })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2  justify-between">
            <label className="font-medium">Intra-cycle lapse applicable?</label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="intraCycleLapse"
                  checked={formData.intraCycleLapse === true}
                  onChange={() =>
                    setFormData({ ...formData, intraCycleLapse: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="intraCycleLapse"
                  checked={formData.intraCycleLapse === false}
                  onChange={() =>
                    setFormData({ ...formData, intraCycleLapse: false })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <label className="font-medium">
              Pro-rate first month’s accrual for new joinees
            </label>
            <select
              name="prorationMethod"
              value={formData.prorationMethod}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-400"
            >
              <option value="">Select</option>
              <option value="Fixed cut-off">
                Fixed cut-off day of the month
              </option>
              <option value="Pro-ration ">
                Pro-ration by joining date in the calendar month
              </option>
            </select>
          </div>

          {formData.prorationMethod === "Fixed cut-off" && (
            <div className="flex flex-col gap-2">
              <label className="font-medium">
                What day of the month will the employee have to join on to get
                credit for that month?
              </label>
              <input
                type="text"
                name="fixedCutoffDay"
                id=""
                value={formData.fixedCutoffDay}
                onChange={handleChange}
                className="border p-2 rounded-md border-gray-400"
                placeholder="day of the month"
              />
            </div>
          )}
          {formData.prorationMethod === "Fixed cut-off" && (
            <div className="flex flex-col gap-2">
              <label className="font-medium">
                What day of the month will the employee have to resign on to get
                credit for that month?
              </label>
              <input
                type="text"
                name="resignationCutoffDay"
                value={formData.resignationCutoffDay}
                onChange={handleChange}
                id=""
                className="border p-2 rounded-md border-gray-400"
                placeholder="day of the month"
              />
            </div>
          )}
          <div className="flex flex-col gap-2  justify-between">
            <label className="font-medium">
              Allow application on Weekly offs and Holidays?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="allowWeeklyOff"
                  checked={formData.allowWeeklyOff === true}
                  onChange={() =>
                    setFormData({ ...formData, allowWeeklyOff: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="allowWeeklyOff"
                  checked={formData.allowWeeklyOff === false}
                  onChange={() =>
                    setFormData({ ...formData, allowWeeklyOff: false })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2  justify-between">
            <label className="font-medium">
              Can employee apply a leave for this category?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="canApplyLeave"
                  checked={formData.canApplyLeave === true}
                  onChange={() =>
                    setFormData({ ...formData, canApplyLeave: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="canApplyLeave"
                  checked={formData.canApplyLeave === false}
                  onChange={() =>
                    setFormData({ ...formData, canApplyLeave: false })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2  justify-between">
            <label className="font-medium">
              Can employee apply a future leave for this category?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="applyFutureLeave"
                  checked={formData.applyFutureLeave === true}
                  onChange={() =>
                    setFormData({ ...formData, applyFutureLeave: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="applyFutureLeave"
                  checked={formData.applyFutureLeave === false}
                  onChange={() =>
                    setFormData({ ...formData, applyFutureLeave: false })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2  justify-between">
            <label className="font-medium">
              Eligible for leave encashment during rollover?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="leaveEncashmentRollover"
                  checked={formData.leaveEncashmentRollover === true}
                  onChange={() =>
                    setFormData({ ...formData, leaveEncashmentRollover: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="leaveEncashmentRollover"
                  checked={formData.leaveEncashmentRollover === false}
                  onChange={() =>
                    setFormData({ ...formData, leaveEncashmentRollover: false })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Eligible for leave encashment/recovery during FNF?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="leaveEncashmentFNF"
                  checked={formData.leaveEncashmentFNF === true}
                  onChange={() =>
                    setFormData({ ...formData, leaveEncashmentFNF: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="leaveEncashmentFNF"
                  checked={formData.leaveEncashmentFNF === false}
                  onChange={() =>
                    setFormData({ ...formData, leaveEncashmentFNF: false })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <label className="font-medium">
              Provide a half-day option for this type of leave?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="halfDayOption"
                  checked={formData.halfDayOption === true}
                  onChange={() =>
                    setFormData({ ...formData, halfDayOption: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="halfDayOption"
                  checked={formData.halfDayOption === false}
                  onChange={() =>
                    setFormData({ ...formData, halfDayOption: false })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2  justify-between">
            <label className="font-medium">
              Include Annual Holiday prefixed/suffixed with a leave in number of
              days taken?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="includeHolidayPrefixSuffix"
                  checked={formData.includeHolidayPrefixSuffix === true}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      includeHolidayPrefixSuffix: true,
                    })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="includeHolidayPrefixSuffix"
                  checked={formData.includeHolidayPrefixSuffix === false}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      includeHolidayPrefixSuffix: false,
                    })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2  justify-between">
            <label className="font-medium">
              Include Annual Holiday part of the leave request in number of days
              taken?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="includeAnnualHolidayPart"
                  checked={formData.includeAnnualHolidayPart === true}
                  onChange={() =>
                    setFormData({ ...formData, includeAnnualHolidayPart: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="includeAnnualHolidayPart"
                  checked={formData.includeAnnualHolidayPart === false}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      includeAnnualHolidayPart: false,
                    })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2  justify-between">
            <label className="font-medium">
              Include Weekly Off prefixed/suffixed with a leave in number of
              days taken?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="includeWeeklyOffPrefixed"
                  checked={formData.includeWeeklyOffPrefixed === true}
                  onChange={() =>
                    setFormData({ ...formData, includeWeeklyOffPrefixed: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="includeWeeklyOffPrefixed"
                  checked={formData.includeWeeklyOffPrefixed === false}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      includeWeeklyOffPrefixed: false,
                    })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <label className="font-medium">
              Include Weekly Off part of the leave request in number of days
              taken?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="includeWeeklyOffPart"
                  checked={formData.includeWeeklyOffPart === true}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      includeWeeklyOffPart: true,
                    })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="includeWeeklyOffPart"
                  value="No"
                  checked={formData.includeWeeklyOffPart === false}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      includeWeeklyOffPart: false,
                    })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <label className="font-medium">Is this a paid Leave?</label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="paidLeave"
                  checked={formData.paidLeave === true}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      paidLeave: true,
                    })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="paidLeave"
                  checked={formData.paidLeave === false}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      paidLeave: false,
                    })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2  justify-between">
            <label className="font-medium">
              Number of days before which the leave application must be
              submitted
            </label>
            <input
              type="number"
              name="minApplicationDaysBefore"
              value={formData.minApplicationDaysBefore}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-400"
              placeholder="Enter days"
            />
          </div>
          <div className="flex flex-col gap-2  justify-between">
            <label className="font-medium">
              Within how many days can the employee apply for leave from the
              date of occurrence?
            </label>
            <input
              type="number"
              name="maxDaysFromOccurrence"
              value={formData.maxDaysFromOccurrence}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-400"
              placeholder="Enter days"
            />
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <label className="font-medium">
              Minimum number of consecutive leave days allowed
            </label>
            <input
              type="number"
              name="minConsecutiveDays"
              value={formData.minConsecutiveDays}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-400"
              placeholder="Enter days"
            />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="font-medium">
              Maximum number of consecutive leave days allowed
            </label>
            <input
              type="number"
              name="maxConsecutiveDays"
              value={formData.maxConsecutiveDays}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-400"
              placeholder="Enter days"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Are leaves separated by a weekly off considered consecutive?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="consecutiveWithWeeklyOff"
                  value="Yes"
                  checked={formData.consecutiveWithWeeklyOff === true}
                  onChange={() =>
                    setFormData({ ...formData, consecutiveWithWeeklyOff: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="consecutiveWithWeeklyOff"
                  value="Yes"
                  checked={formData.consecutiveWithWeeklyOff === false}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      consecutiveWithWeeklyOff: false,
                    })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Are leaves separated by a holiday considered consecutive?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="consecutiveWithHoliday"
                  value="Yes"
                  checked={formData.consecutiveWithHoliday === true}
                  onChange={() =>
                    setFormData({ ...formData, consecutiveWithHoliday: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="consecutiveWithHoliday"
                  value="Yes"
                  checked={formData.consecutiveWithHoliday === false}
                  onChange={() =>
                    setFormData({ ...formData, consecutiveWithHoliday: false })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Is there any document required to be uploaded for this category?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="documentRequired"
                  value="Yes"
                  checked={formData.documentRequired === true}
                  onChange={() =>
                    setFormData({ ...formData, documentRequired: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="documentRequired"
                  value="No"
                  checked={formData.documentRequired === false}
                  onChange={() =>
                    setFormData({ ...formData, documentRequired: false })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Is there a date restriction as to when the employee can apply?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="dateRestriction"
                  value="Yes"
                  checked={formData.dateRestriction === true}
                  onChange={() =>
                    setFormData({ ...formData, dateRestriction: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="dateRestriction"
                  value="No"
                  checked={formData.dateRestriction === false}
                  onChange={() =>
                    setFormData({ ...formData, dateRestriction: false })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Display closing balance in the employee's payslips?
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="displayClosingBalance"
                  value="Yes"
                  checked={formData.displayClosingBalance === true}
                  onChange={() =>
                    setFormData({ ...formData, displayClosingBalance: true })
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="displayClosingBalance"
                  value="Yes"
                  checked={formData.displayClosingBalance === false}
                  onChange={() =>
                    setFormData({ ...formData, displayClosingBalance: false })
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddLeaveCategory;
