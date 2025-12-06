import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { postSalaryGeneralInfo, postTaxStatutory } from "../../api";
import SalaryAccordion from "./Components/SalaryAccordion";

const AddNewCTC = ({ setPageChange, empId, fetchEmployeeSalary }) => {
  const themeColor = useSelector((state) => state.theme.color);
  const [basic, setBasic] = useState(2000);
  const [hra, setHra] = useState(2000);
  const [childEducation, setChildEducation] = useState(1000);
  const [special, setSpecial] = useState(5000);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const total = basic + hra + childEducation + special;
  const [page, setPage] = useState("General Info");
  const [formData, setFormData] = useState({
    effectiveDate: "",
    effectiveDateDiffer: false,
    actualEffectiveDate: "",
    autoSalaryRevisionArrear: false,
    CTCFrequency: "monthly",
    howEnteringAmount: "As_CTC",
    monthlyCTCAmount: "",
    monthlyGrossAmount: "",
    annuallyCTCAmount: "",
    annuallyGrossAmount: "",
    ctcTemplate: "",
  });

  const [taxData, setTaxData] = useState({
    pfDeduction: false,
    providentPension: false,
    employeeProvidentContributionCapped: false,
    employerProvidentCOntributionCapped: false,
    fixedAmtForProvidentFundWage: "",
    pfTemplate: "",
    esicDeduction: false,
    ptDeduction: false,
    lwfDeduction: false,
    gratuityApplicable: false,
    incomeTaxDeduction: false,
    npsDeduction: false,
  });

  useEffect(() => {
    if (
      formData.howEnteringAmount !== "As_CTC" ||
      (formData.CTCFrequency !== "monthly" &&
        formData.CTCFrequency !== "Annually")
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        monthlyCTCAmount: "",
        annuallyCTCAmount: "",
      }));
    }

    if (
      formData.howEnteringAmount !== "As Gross Salary" ||
      (formData.CTCFrequency !== "monthly" &&
        formData.CTCFrequency !== "Annually")
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        monthlyGrossAmount: "",
        annuallyGrossAmount: "",
      }));
    }
  }, [formData.howEnteringAmount, formData.CTCFrequency]);
  const handleChangeTax = async (e) => {
    setTaxData({ ...taxData, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      ...(name === "effectiveDateDiffer" &&
        !value && { actualEffectiveDate: "" }),
    }));
  };

  const handleAddGeneralInfo = async () => {
    const postData = new FormData();
    postData.append("effective_date", formData.effectiveDate);
    postData.append(
      "actual_effective_date_differs",
      formData.effectiveDateDiffer
    );
    postData.append("actual_effective_date", formData.actualEffectiveDate);
    postData.append(
      "auto_salary_revision_arrears_required",
      formData.autoSalaryRevisionArrear
    );
    postData.append("monthly_ctc_amount", formData.monthlyCTCAmount);
    postData.append("ctc_frequency", formData.CTCFrequency);
    postData.append("employee_id", empId);
    // postData.append("employee_id", 2);
    postData.append("ctc_amount", formData.monthlyCTCAmount);
    postData.append("annually_ctc_amount", formData.annuallyCTCAmount);
    postData.append("monthly_gross_amount", formData.monthlyGrossAmount);
    postData.append("annually_gross_amount", formData.annuallyGrossAmount);
    postData.append("how_entering_amount", formData.howEnteringAmount);
    try {
      await postSalaryGeneralInfo(postData);
      setPage("Tax and Statutory Setting");
      fetchEmployeeSalary()
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddTaxStatutory = async () => {
    const postData = new FormData();
    postData.append("pf_deduction", taxData.pfDeduction);
    postData.append("provident_pension_deduction", taxData.providentPension);
    postData.append(
      "epf_contribution_capped",
      taxData.employeeProvidentContributionCapped
    );
    postData.append(
      "employer_epf_contribution_capped",
      taxData.employerProvidentCOntributionCapped
    );
    postData.append(
      "pf_wage_fixed_amount",
      taxData.fixedAmtForProvidentFundWage
    );
    postData.append("pf_template", taxData.pfTemplate);
    postData.append("esic_deduction", taxData.esicDeduction);
    postData.append("pt_deduction", taxData.ptDeduction);
    postData.append("lwf_deduction", taxData.lwfDeduction);
    postData.append("gratuity_applicable", taxData.gratuityApplicable);
    postData.append("income_tax_deduction", taxData.incomeTaxDeduction);
    postData.append("nps_deduction", taxData.npsDeduction);
    postData.append("employee", empId);

    try {
      await postTaxStatutory(postData);

      setPage("CTC Components");
    } catch (error) {
      console.log(error);
    }
  };

  const [fixedAllowanceItems, setFixedAllowanceItems] = useState([
    { label: "Enter the Amount for Basic", monthly: 2500, yearly: 30000 },
    {
      label: "Enter the Amount for Conveyance Allowance",
      monthly: 1600,
      yearly: 19200,
    },
    { label: "Enter the Amount for HRA", monthly: 900, yearly: 10800 },
    { label: "Enter the Amount for Medical", monthly: 0, yearly: 0 },
    { label: "Enter the Amount for Special Allowance", monthly: 0, yearly: 0 },
    { label: "Enter the Amount for Allowance", monthly: 0, yearly: 0 },
  ]);

  const totalMonthly = fixedAllowanceItems.reduce(
    (sum, item) => sum + item.monthly,
    0
  );
  const totalYearly = fixedAllowanceItems.reduce(
    (sum, item) => sum + item.yearly,
    0
  );

  const handleMonthlyChange = (index, value) => {
    const updatedItems = [...fixedAllowanceItems];
    updatedItems[index].monthly = Number(value); // Update the monthly value
    // Update yearly value based on new monthly input, assuming 12 months in a year
    updatedItems[index].yearly = Number(value) * 12;
    setFixedAllowanceItems(updatedItems);
  };

  const outputData = [
    {
      description: "Total Take Home (excluding Variable)",
      monthly: "₹ 5,000",
      yearly: "₹ 60,000",
    },
    {
      description: "Total CTC (excluding Variable & Other Benefits)",
      monthly: "₹ 5,000",
      yearly: "₹ 60,000",
    },
    {
      description: "Total CTC (including Variable)",
      yearly: "₹ 60,000",
    },
  ];

  return (
    <div className="flex items-center justify-between w-full mb-5">
      <div className="flex w-full px-4">
        <div className="flex w-full">
          <div className="w-full p-2 bg-white rounded-lg">
            <div className="w-full rounded-md">
              <h2 className="text-2xl font-semibold mb-4">Add New CTC</h2>
              <div className=" w-full my-2 flex  overflow-hidden flex-col">
                <div className="flex w-full">
                  <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
                    <h2
                      className={`p-1 ${
                        page === "General Info" &&
                        `bg-white font-medium text-blue-500 shadow-custom-all-sides`
                      } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
                      onClick={() => setPage("General Info")}
                    >
                      General Info
                    </h2>
                    <h2
                      className={`p-1 ${
                        page === "Tax and Statutory Setting" &&
                        "bg-white font-medium text-blue-500 shadow-custom-all-sides"
                      } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
                      onClick={() => setPage("Tax and Statutory Setting")}
                    >
                      Tax and Statutory Setting
                    </h2>
                    <h2
                      className={`p-1 ${
                        page === "CTC Components" &&
                        "bg-white font-medium text-blue-500 shadow-custom-all-sides"
                      } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
                      onClick={() => setPage("CTC Components")}
                    >
                      CTC Components
                    </h2>
                  </div>
                </div>
              </div>
              {page === "General Info" && (
                <div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="effectiveDate"
                    >
                      Select Effective Date for Payroll Processing
                    </label>
                    <input
                      type="date"
                      id="effectiveDate"
                      value={formData.effectiveDate}
                      onChange={handleChange}
                      name="effectiveDate"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Does the actual effective date of salary differ?
                    </label>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="yes"
                        name="effectiveDateDiffer"
                        checked={formData.effectiveDateDiffer === true}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            effectiveDateDiffer: true,
                          })
                        }
                        className="mr-2"
                      />
                      <label htmlFor="yes" className="mr-4">
                        Yes
                      </label>
                      <input
                        type="radio"
                        id="no"
                        name="effectiveDateDiffer"
                        checked={formData.effectiveDateDiffer === false}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            effectiveDateDiffer: false,
                          })
                        }
                        className="mr-2"
                      />
                      <label htmlFor="no">No</label>
                    </div>
                  </div>
                  {formData.effectiveDateDiffer && (
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="effectiveDate"
                      >
                        Please select the actual effective date
                      </label>
                      <input
                        type="date"
                        id="actualEffectiveDate"
                        value={formData.actualEffectiveDate}
                        name="actualEffectiveDate"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  )}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="ctcAmount"
                    >
                      Enter CTC Amount frequency
                    </label>
                    <select
                      id="ctcTemplate"
                      value={formData.CTCFrequency}
                      onChange={handleChange}
                      name="CTCFrequency"
                      className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select CTC Amount frequency</option>
                      <option value="monthly">Monthly</option>
                      <option value="Annually">Annually</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="ctcTemplate"
                    >
                      Select CTC Template
                    </label>
                    <select
                      id="ctcTemplate"
                      value={formData.ctcTemplate}
                      onChange={handleChange}
                      name="ctcTemplate"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="" disabled>
                        Select Template
                      </option>
                      <option value="template1">Template 1</option>
                      <option value="template2">Template 2</option>
                      <option value="template3">Template 3</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="ctcTemplate"
                    >
                      How are you entering the amount?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="ctcTemplate"
                      value={formData.howEnteringAmount}
                      onChange={handleChange}
                      name="howEnteringAmount"
                      className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="As_CTC">As CTC</option>
                      <option value="As Gross Salary">As Gross Salary</option>
                    </select>
                  </div>
                  {formData.howEnteringAmount === "As_CTC" &&
                    formData.CTCFrequency === "monthly" && (
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="ctcTemplate"
                        >
                          Enter Monthly CTC Amount
                        </label>
                        <input
                          type="text"
                          name="monthlyCTCAmount"
                          id=""
                          value={formData.monthlyCTCAmount}
                          onChange={handleChange}
                          placeholder="Enter Monthly CTC Amount"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          pattern="[0-9]*"
                          onKeyDown={(e) => {
                            if (
                              !/[0-9]/.test(e.key) &&
                              e.key !== "Backspace" &&
                              e.key !== "ArrowLeft" &&
                              e.key !== "ArrowRight"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    )}
                  {formData.howEnteringAmount === "As Gross Salary" &&
                    formData.CTCFrequency === "monthly" && (
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="ctcTemplate"
                        >
                          Enter Monthly Gross Amount
                        </label>
                        <input
                          type="text"
                          name="monthlyGrossAmount"
                          id=""
                          value={formData.monthlyGrossAmount}
                          onChange={handleChange}
                          placeholder="Enter Monthly Gross Amount"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          pattern="[0-9]*"
                          onKeyDown={(e) => {
                            if (
                              !/[0-9]/.test(e.key) &&
                              e.key !== "Backspace" &&
                              e.key !== "ArrowLeft" &&
                              e.key !== "ArrowRight"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    )}
                  {formData.howEnteringAmount === "As_CTC" &&
                    formData.CTCFrequency === "Annually" && (
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="ctcTemplate"
                        >
                          Enter Annually CTC Amount
                        </label>
                        <input
                          type="text"
                          name="annuallyCTCAmount"
                          id=""
                          value={formData.annuallyCTCAmount}
                          onChange={handleChange}
                          placeholder="Enter Annually CTC Amount"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          pattern="[0-9]*"
                          onKeyDown={(e) => {
                            if (
                              !/[0-9]/.test(e.key) &&
                              e.key !== "Backspace" &&
                              e.key !== "ArrowLeft" &&
                              e.key !== "ArrowRight"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    )}
                  {formData.howEnteringAmount === "As Gross Salary" &&
                    formData.CTCFrequency === "Annually" && (
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="ctcTemplate"
                        >
                          Enter Annually Gross Amount
                        </label>
                        <input
                          type="text"
                          name="annuallyGrossAmount"
                          id=""
                          value={formData.annuallyGrossAmount}
                          onChange={handleChange}
                          placeholder="Enter Annually Gross Amount"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          pattern="[0-9]*"
                          onKeyDown={(e) => {
                            if (
                              !/[0-9]/.test(e.key) &&
                              e.key !== "Backspace" &&
                              e.key !== "ArrowLeft" &&
                              e.key !== "ArrowRight"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    )}
                  <div className="flex justify-center gap-2">
                    <button
                      className="border border-red-500 text-red-500 rounded px-4"
                      onClick={() => setPageChange("table")}
                    >
                      Cancel
                    </button>
                    <button
                      style={{ background: themeColor }}
                      className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
                      onClick={handleAddGeneralInfo}
                    >
                      Save & Proceed
                    </button>
                  </div>
                </div>
              )}
              {page === "Tax and Statutory Setting" && (
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                      PF Deduction <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="pfDeduction"
                          checked={taxData.pfDeduction === true}
                          onChange={() =>
                            setTaxData({ ...taxData, pfDeduction: true })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          name="pfDeduction"
                          checked={taxData.pfDeduction === false}
                          onChange={() =>
                            setTaxData({ ...taxData, pfDeduction: false })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                      Provident Pension Deduction{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="providentPensionDeduction"
                          checked={taxData.providentPension === true}
                          onChange={() =>
                            setTaxData({ ...taxData, providentPension: true })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          name="providentPensionDeduction"
                          checked={taxData.providentPension === false}
                          onChange={() =>
                            setTaxData({ ...taxData, providentPension: false })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                      Employee’s PF contribution capped at the PF Ceiling?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="employeePfCapped"
                          checked={
                            taxData.employeeProvidentContributionCapped === true
                          }
                          onChange={() =>
                            setTaxData({
                              ...taxData,
                              employeeProvidentContributionCapped: true,
                            })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          name="employeePfCapped"
                          checked={
                            taxData.employeeProvidentContributionCapped ===
                            false
                          }
                          onChange={() =>
                            setTaxData({
                              ...taxData,
                              employeeProvidentContributionCapped: false,
                            })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                      Employer’s PF contribution capped at the PF Ceiling?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="employerPfCapped"
                          checked={
                            taxData.employerProvidentCOntributionCapped === true
                          }
                          onChange={() =>
                            setTaxData({
                              ...taxData,
                              employerProvidentCOntributionCapped: true,
                            })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          name="employerPfCapped"
                          checked={
                            taxData.employerProvidentCOntributionCapped ===
                            false
                          }
                          onChange={() =>
                            setTaxData({
                              ...taxData,
                              employerProvidentCOntributionCapped: false,
                            })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                      Provident Fund Wage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="fixedAmtForProvidentFundWage"
                      className="w-full mt-2 p-2 border border-gray-300 rounded"
                      placeholder="Leave blank for no amount"
                      value={taxData.fixedAmtForProvidentFundWage}
                      onChange={handleChangeTax}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                      PF Template <span className="text-red-500">*</span>
                    </label>
                    <select
                      name=""
                      id=""
                      onChange={handleChangeTax}
                      value={taxData.pfTemplate}
                      className="border border-gray-300 mt-1 rounded-md p-2 w-full"
                    >
                      <option value="">Select PF Template</option>
                      <option value="temp1">Temp 1</option>
                      <option value="temp2">Temp 2</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                      ESIC Deduction <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="esicDeduction"
                          checked={taxData.esicDeduction === true}
                          onChange={() =>
                            setTaxData({ ...taxData, esicDeduction: true })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          name="esicDeduction"
                          checked={taxData.esicDeduction === false}
                          onChange={() =>
                            setTaxData({ ...taxData, esicDeduction: false })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                      PT Deduction <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="ptDeduction"
                          checked={taxData.ptDeduction === true}
                          onChange={() =>
                            setTaxData({ ...taxData, ptDeduction: true })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          name="ptDeduction"
                          checked={taxData.ptDeduction === false}
                          onChange={() =>
                            setTaxData({ ...taxData, ptDeduction: false })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                      LWF Deduction <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="lwfDeduction"
                          checked={taxData.lwfDeduction === true}
                          onChange={() =>
                            setTaxData({ ...taxData, lwfDeduction: true })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          name="lwfDeduction"
                          checked={taxData.lwfDeduction === false}
                          onChange={() =>
                            setTaxData({ ...taxData, lwfDeduction: false })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                      Income Tax Deduction{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="incomeTaxDeduction"
                          checked={taxData.incomeTaxDeduction === true}
                          onChange={() =>
                            setTaxData({ ...taxData, incomeTaxDeduction: true })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          name="incomeTaxDeduction"
                          checked={taxData.incomeTaxDeduction === false}
                          onChange={() =>
                            setTaxData({
                              ...taxData,
                              incomeTaxDeduction: false,
                            })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                      Gratuity Applicable{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="gratuityApplicable"
                          checked={taxData.gratuityApplicable === true}
                          onChange={() =>
                            setTaxData({ ...taxData, gratuityApplicable: true })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          name="gratuityApplicable"
                          checked={taxData.gratuityApplicable === false}
                          onChange={() =>
                            setTaxData({
                              ...taxData,
                              gratuityApplicable: false,
                            })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                      NPS Deduction <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="npsDeduction"
                          checked={taxData.npsDeduction === true}
                          onChange={() =>
                            setTaxData({ ...taxData, npsDeduction: true })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          name="npsDeduction"
                          checked={taxData.npsDeduction === false}
                          onChange={() =>
                            setTaxData({ ...taxData, npsDeduction: false })
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                  <div className=" flex justify-center gap-2">
                  <button
                      className="border border-red-500 text-red-500 rounded px-4"
                      onClick={() => setPageChange("table")}
                    >
                      Cancel
                    </button>
                    <button
                      className=" text-gray-500   font-medium py-2 px-4 rounded-md border-2 border-gray-500"
                      onClick={() => setPage("General Info")}
                    >
                      Back
                    </button>
                    <button
                      className="bg-black text-white  hover:bg-gray-700 font-medium py-2 px-4 rounded-md"
                      onClick={handleAddTaxStatutory}
                    >
                      Save & Proceed
                    </button>
                  </div>
                </div>
              )}
              {page === "CTC Components" && (
                <div>
                <div className="w-full mx-auto p-4">
                  <div className="flex items-center mb-2 border-b">
                    <h2 className="text-lg font-semibold w-1/2">Components</h2>
                    <div className="flex w-1/2">
                      <p className="text-lg font-semibold w-1/3 text-center">
                        Monthly
                      </p>
                      <p className="text-lg font-semibold w-1/3 text-right">
                        Yearly
                      </p>
                      <span className="w-1/3"></span>
                    </div>
                  </div>
  
                  <SalaryAccordion
                    title="Fixed Allowance"
                    items={fixedAllowanceItems}
                    totalMonthly={totalMonthly}
                    totalYearly={totalYearly}
                    onMonthlyChange={handleMonthlyChange}
                  />
                  <SalaryAccordion
                    title="Other Benefits"
                    items={[]}
                    totalMonthly={0}
                    totalYearly={0}
                  />
                  <SalaryAccordion
                    title="Flexi Benefits"
                    items={[]}
                    totalMonthly={0}
                    totalYearly={0}
                  />
                  <SalaryAccordion
                    title="Total Employer Statutory Contributions"
                    items={[]}
                    totalMonthly={0}
                    totalYearly={0}
                  />
                  <SalaryAccordion
                    title="Total Employee Statutory Deductions"
                    items={[]}
                    totalMonthly={0}
                    totalYearly={0}
                  />
                  <SalaryAccordion
                    title="Fixed Deductions"
                    items={[]}
                    totalMonthly={0}
                    totalYearly={0}
                  />
                  <SalaryAccordion
                    title="Variable Allowances"
                    items={[]}
                    totalMonthly={0}
                    totalYearly={0}
                  />
                  <SalaryAccordion
                    title="Variable Deductions"
                    items={[]}
                    totalMonthly={0}
                    totalYearly={0}
                  />
                </div>
                <table className="w-full bg-gray-50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 font-semibold text-blue-500">
                        Consolidated Output
                      </th>
                      <th className="text-right p-3 font-semibold text-gray-600">
                        Monthly
                      </th>
                      <th className="text-right p-3 font-semibold text-gray-600">
                        Yearly
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {outputData.map((row, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="p-3 text-gray-700">{row.description}</td>
                        <td className="p-3 text-right text-gray-700">
                          {row.monthly || "-"}
                        </td>
                        <td className="p-3 text-right text-gray-700">
                          {row.yearly}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
  
                <div className="mt-10 flex justify-center gap-2">
                <button
                      className="border border-red-500 text-red-500 rounded px-4"
                      onClick={() => setPageChange("table")}
                    >
                      Cancel
                    </button>
                  <button
                    className=" text-gray-500  font-medium py-2 px-4 rounded-md border-2 border-gray-500"
                    onClick={() => setPage("Tax and Statutory Setting")}
                  >
                    Back
                  </button>
                  <button
                    style={{ background: themeColor }}
                    className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
                  >
                    Save & Proceed
                  </button>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddNewCTC;
