import React, { useEffect, useState } from "react";
import { SelectInput } from "../../Components/SelectInput";
import { InputField } from "../../Components/InputFIeld";
import { FaPlus, FaTrash } from "react-icons/fa";
import RadioInput from "../../Components/RadioInput";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../../../utils/localStorage";
import {
  editFlexiBenefitCategoryDetails,
  getFlexiBenefitCategory,
  getFlexiBenefitCategoryDetails,
  postFlexiBenefitCategory,
} from "../../../../api";
import toast from "react-hot-toast";

const EditFlexiCategory = ({ setPage, fetchFlexiCategory, flexiId }) => {
  const [formData, setFormData] = useState({
    benefitType: "",
    customLabel: "",
    frequency: "",
    unclaimedAction: "",
    negativeEligibilityAction: "",
    taxedMonth: "",
    unclaimedPartOfPFWage: false,
    unclaimedPartOfESICWage: false,
    unclaimedPartOfPTWage: false,
    unclaimedPartOfLwfWage: false,
    proRateEligibility: false,
    surplusAmountAction: "",
    unclaimedAmtAtYearEnd: "",
    unclaimedFNF: "",
    timesEmployeeSubmitFlexiBenefit: "",
    unclaimedLabel: "",
  });
  const [fields, setFields] = useState([
    { fieldName: "", fieldType: "TextField", options: [] },
  ]);

  const handleAddField = () => {
    setFields([
      ...fields,
      { fieldName: "", fieldType: "TextField", options: [] },
    ]);
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const handleAddOption = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].options.push("");
    setFields(updatedFields);
  };

  const handleRemoveOption = (fieldIndex, optionIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options.splice(optionIndex, 1);
    setFields(updatedFields);
  };

  const handleOptionChange = (fieldIndex, optionIndex, value) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options[optionIndex] = value;
    setFields(updatedFields);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const themeColor = useSelector((state) => state.theme.color);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");

  useEffect(() => {
    const fetchFlexiCategoryDetails = async () => {
      try {
        const res = await getFlexiBenefitCategoryDetails(flexiId);
        setFormData({
          ...formData,
          benefitType: res.benefit_type,
          customLabel: res.label,
          frequency: res.frequency,
          unclaimedAction: res.unclaimed_amount_action,
          negativeEligibilityAction: res.negative_eligibility_action,
          unclaimedAmtAtYearEnd: res.financial_year_unclaimed_action,
          unclaimedFNF: res.fnf_unclaimed_action,
          unclaimedLabel: res.unclaimed_amount_label,
          unclaimedPartOfPFWage: res.pf_wage,
          proRateEligibility: res.pro_rata_eligibility,
          surplusAmountAction: res.surplus_amount_action,
          taxedMonth: res.taxed_from_month,
          timesEmployeeSubmitFlexiBenefit: res.max_submission_times,
          unclaimedPartOfESICWage: res.esic_wage,
          unclaimedPartOfLwfWage: res.lwf_wage,
          unclaimedPartOfPTWage: res.pt_wage

        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchFlexiCategoryDetails();
  }, []);

  const handleEditFlexiBenefitCategory = async () => {
    const editData = new FormData();
    editData.append("benefit_type", formData.benefitType);
    editData.append("label", formData.customLabel);
    editData.append("frequency", formData.frequency);
    // editData.append("icon", null);
    editData.append("unclaimed_amount_action", formData.unclaimedAction);
    editData.append(
      "negative_eligibility_action",
      formData.negativeEligibilityAction
    );
    editData.append(
      "financial_year_unclaimed_action",
      formData.unclaimedAmtAtYearEnd
    );
    editData.append("fnf_unclaimed_action", formData.unclaimedFNF);
    editData.append("unclaimed_amount_label", formData.unclaimedLabel);
    editData.append("pf_wage", formData.unclaimedPartOfPFWage);
    editData.append("esic_wage", formData.unclaimedPartOfESICWage);
    editData.append("pt_wage", formData.unclaimedPartOfPTWage);
    editData.append("lwf_wage", formData.unclaimedPartOfLwfWage);
    editData.append(
      "max_submission_times",
      formData.timesEmployeeSubmitFlexiBenefit
    );
    editData.append("pro_rata_eligibility", formData.proRateEligibility);
    editData.append("surplus_amount_action", formData.surplusAmountAction);
    editData.append("taxed_from_month", formData.taxedMonth);
    editData.append("organization", hrmsOrgId);
    try {
      const res = await editFlexiBenefitCategoryDetails(flexiId, editData);
      toast.success("Flexi Benefit edited successfully");
      fetchFlexiCategory();
      setPage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-5">
      <SelectInput
        label="Please choose type of Flexi Benefit"
        options={["Select Type", "Other"]}
        required={true}
        name={"benefitType"}
        value={formData.benefitType}
        onChange={handleChange}
      />
      <InputField
        label="What label would you like to give this Flexi Benefit?"
        required={true}
        value={formData.customLabel}
        name={"customLabel"}
        placeholder={"Custom Label"}
        onChange={handleChange}
      />
      {/* <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Choose Icon <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 hover:bg-orange-200 focus:outline-none"
        >
          <FaPlus className="h-6 w-6" />
        </button>
      </div> */}

      <SelectInput
        label="What is the frequency of the Flexi Benefit?"
        options={[
          "Select Frequency",
          "Monthly",
          "Quarterly",
          "Semi-Annually",
          "Annually",
        ]}
        required={true}
        value={formData.frequency}
        onChange={handleChange}
        name={"frequency"}
      />

      <SelectInput
        label="How would you like to treat unclaimed amounts in each claimable period?"
        options={[
          "Select an Action",
          "Rollover to next period",
          "Lapse Immediately",
          "Payout as taxable in that period",
          "Payout as tax-free in that period",
        ]}
        required={true}
        value={formData.unclaimedAction}
        onChange={handleChange}
        name={"unclaimedAction"}
      />
      {formData.unclaimedAction === "Payout as tax-free in that period" && (
        <SelectInput
          label={
            "From which month onwards this category should get taxed, if required?"
          }
          value={formData.taxedMonth}
          onChange={handleChange}
          name={"taxedMonth"}
          options={[
            "Select an Action",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
          required={true}
        />
      )}
      <SelectInput
        label="How would you like to treat negative eligibility amounts in each claimable period?"
        options={[
          "Select an Action",
          "Rollover to next period",
          "Recover in payslip",
        ]}
        required={true}
        value={formData.negativeEligibilityAction}
        onChange={handleChange}
        name={"negativeEligibilityAction"}
      />
      <SelectInput
        label="How would you like to treat unclaimed amounts at the end of financial year? "
        options={[
          "Select an Action",
          "Lapse",
          "Pay out all Unclaimed Amounts as Taxable",
          "Pay out all Unclaimed and Lapsed Amounts YTD as Taxable",
        ]}
        required={true}
        value={formData.unclaimedAmtAtYearEnd}
        onChange={handleChange}
        name={"unclaimedAmtAtYearEnd"}
      />
      <SelectInput
        label="What would you like to do with any outstanding unclaimed amounts for FnF employees?"
        options={[
          "Select an Action",
          "Lapse",
          "Pay out all Unclaimed Amounts as Taxable",
          "Pay out all Unclaimed and Lapsed Amounts YTD as Taxable",
        ]}
        required={true}
        value={formData.unclaimedFNF}
        onChange={handleChange}
        name={"unclaimedFNF"}
      />
      <InputField
        label="What would you like to call the unclaimed amount paid as taxable with salary?"
        required={true}
        value={formData.unclaimedLabel}
        onChange={handleChange}
        name={"unclaimedLabel"}
        placeholder={"Unclaimed Amount Label"}
      />
      <RadioInput
        label={"Are Unclaimed Amount Payments part of PF Wage?"}
        required={true}
        checkedYes={formData.unclaimedPartOfPFWage === true}
        onChangeYes={() =>
          setFormData({ ...formData, unclaimedPartOfPFWage: true })
        }
        checkedNo={formData.unclaimedPartOfPFWage === false}
        onChangeNo={() =>
          setFormData({ ...formData, unclaimedPartOfPFWage: false })
        }
        name={"unclaimedPartOfPFWage"}
        yesId={"PFY"}
        noId={"PFN"}
      />
      <RadioInput
        label={"Are Unclaimed Amount Payments part of ESIC Wage?"}
        required={true}
        checkedYes={formData.unclaimedPartOfESICWage === true}
        onChangeYes={() =>
          setFormData({ ...formData, unclaimedPartOfESICWage: true })
        }
        checkedNo={formData.unclaimedPartOfESICWage === false}
        onChangeNo={() =>
          setFormData({ ...formData, unclaimedPartOfESICWage: false })
        }
        name={"unclaimedPartOfESICWage"}
        yesId={"ESICY"}
        noId={"ESICN"}
      />
      <RadioInput
        label={"Are Unclaimed Amount Payments part of PT Wage?"}
        required={true}
        checkedYes={formData.unclaimedPartOfPTWage === true}
        onChangeYes={() =>
          setFormData({ ...formData, unclaimedPartOfPTWage: true })
        }
        checkedNo={formData.unclaimedPartOfPTWage === false}
        onChangeNo={() =>
          setFormData({ ...formData, unclaimedPartOfPTWage: false })
        }
        name={"unclaimedPartOfPTWage"}
        yesId={"PTY"}
        noId={"PTN"}
      />
      <RadioInput
        label={"Are Unclaimed Amount Payments part of LWF Wage?"}
        required={true}
        checkedYes={formData.unclaimedPartOfLwfWage === true}
        onChangeYes={() =>
          setFormData({ ...formData, unclaimedPartOfLwfWage: true })
        }
        checkedNo={formData.unclaimedPartOfLwfWage === false}
        onChangeNo={() =>
          setFormData({ ...formData, unclaimedPartOfLwfWage: false })
        }
        name={"unclaimedPartOfLwfWage"}
        yesId={"LWFY"}
        noId={"LWFN"}
      />
      <InputField
        label={
          "How many times can employee submit Flexi Benefit request in each claimable period?"
        }
        required={true}
        placeholder={"Leave Blank for no limit"}
        value={formData.timesEmployeeSubmitFlexiBenefit}
        onChange={handleChange}
        name={"timesEmployeeSubmitFlexiBenefit"}
      />
      <RadioInput
        label={"Would you like to pro rate eligibility based on attendance?"}
        checkedYes={formData.proRateEligibility === true}
        onChangeYes={() =>
          setFormData({ ...formData, proRateEligibility: true })
        }
        checkedNo={formData.proRateEligibility === false}
        onChangeNo={() =>
          setFormData({ ...formData, proRateEligibility: false })
        }
        required={true}
        name={"proRateEligibility"}
        yesId={"ProY"}
        noId={"ProN"}
      />
      <SelectInput
        label={
          "What would you like to do with the surplus amount if total amount approved is more than the eligibility balance? "
        }
        name={"surplusAmountAction"}
        value={formData.surplusAmountAction}
        onChange={handleChange}
        options={["Select Action", "Carry Forward", "Lapse"]}
      />
      <div className="">
        <h3 className="text-lg font-semibold">Custom Fields</h3>
        <span className="text-sm text-gray-400">
          Please add/edit fields that employees need to fill during flexi
          benefit application
        </span>
        {fields.map((field, fieldIndex) => (
          <div key={fieldIndex} className="custom-field-row mb-2">
            <div className="flex items-center space-x-4 mb-3">
              <input
                type="text"
                placeholder="Custom Field Label"
                value={field.fieldName}
                onChange={(e) =>
                  handleFieldChange(fieldIndex, "fieldName", e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <select
                value={field.fieldType}
                onChange={(e) =>
                  handleFieldChange(fieldIndex, "fieldType", e.target.value)
                }
                className="p-2 border rounded-md"
              >
                <option value="">Select Field Type</option>
                <option value="TextField">TextField</option>
                <option value="Number">Number</option>
                <option value="DateRange">DateRange</option>
                <option value="DropDown">DropDown</option>
              </select>
              <button
                type="button"
                onClick={() =>
                  setFields(fields.filter((_, index) => index !== fieldIndex))
                }
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                <FaTrash />
              </button>
            </div>

            {/* If DropDown is selected, show option inputs */}
            {field.fieldType === "DropDown" && (
              <div className=" flex flex-wrap gap-2">
                {field.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <input
                      type="text"
                      placeholder={`Add Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(
                          fieldIndex,
                          optionIndex,
                          e.target.value
                        )
                      }
                      className="p-2 border rounded-md w-full"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveOption(fieldIndex, optionIndex)
                      }
                      className="bg-red-500 text-white px-3 py-2 rounded-md"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddOption(fieldIndex)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md"
                >
                  Add Option
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddField}
          className="bg-green-500 text-white px-6 py-2 rounded-md"
        >
          Add Custom Field
        </button>
      </div>
      <div className="flex gap-4 justify-center items-center my-4">
        <button
          className="text-red-400 border-2 border-red-400 rounded-md p-2 px-4"
          onClick={() => setPage()}
        >
          Cancel
        </button>
        <button
          style={{ background: themeColor }}
          className="text-white  rounded-md p-2"
          onClick={handleEditFlexiBenefitCategory}
        >
          Save Flexi Benefit Category
        </button>
      </div>
    </div>
  );
};

export default EditFlexiCategory;
