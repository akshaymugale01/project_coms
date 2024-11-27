import React, { useEffect, useState } from "react";
import AdminHRMS from "./AdminHrms";
import { FaTrash } from "react-icons/fa";
import AddEmployeeDetailsList from "./AddEmployeeDetailsList";
import { GrHelpBook } from "react-icons/gr";
import {
  getTaxAndStatSetting,
  getTaxAndStatSettingByTemplateId,
  postCTCComponent,
  postSalaryGeneralInfo,
  postTaxAndStatSetting,
  postTaxStatutory,
  showCTCTemplates,
} from "../../api";
import { useSelector } from "react-redux";
import Accordion from "./Components/Accordion";
import { FaFileCircleCheck } from "react-icons/fa6";
import SalaryAccordion from "./Components/SalaryAccordion";
import { getItemInLocalStorage } from "../../utils/localStorage";
import FixedAllowance from "./FixedAllowance";
import SalaryAccordionAnnually from "./Components/SalaryAccordionAnnually";
import toast from "react-hot-toast";

const OnboardingSalary = ({ setSteps, empId }) => {
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

  const [salaryData, setSalaryData] = useState({
    basic: 0,
    HRA: 0,
    joiningIncentive: 0,
    otherAllowance: 0,
    grossSalary: 0,
    professionTax: 200,
    EPF12: 0,
    netPayment: 0,
    insurance: 1800,
    EPF13: 0,
    CTC: 0,
  });

  useEffect(() => {
    calculateSalary();
  }, [
    salaryData.basic,
    salaryData.HRA,
    salaryData.joiningIncentive,
    salaryData.otherAllowance,
    formData.CTCFrequency,
  ]);

  const calculateSalary = () => {
    const monthlyBasic =
      formData.CTCFrequency === "monthly"
        ? salaryData.basic
        : salaryData.basic / 12;
    const monthlyHRA =
      formData.CTCFrequency === "monthly"
        ? salaryData.HRA
        : salaryData.HRA / 12;
    const monthlyJoiningIncentive =
      formData.CTCFrequency === "monthly"
        ? salaryData.joiningIncentive
        : salaryData.joiningIncentive / 12;
    const monthlyOtherAllowance =
      formData.CTCFrequency === "monthly"
        ? salaryData.otherAllowance
        : salaryData.otherAllowance / 12;

    const monthlyGrossSalary =
      monthlyBasic +
      monthlyHRA +
      monthlyJoiningIncentive +
      monthlyOtherAllowance;
    const monthlyProfessionTax = 200;
    const monthlyEPF12 = monthlyBasic * 0.12;
    const monthlyNetPayment =
      monthlyGrossSalary - monthlyProfessionTax - monthlyEPF12;
    const monthlyInsurance = 1800;
    const monthlyEPF13 = monthlyBasic * 0.13;
    const monthlyCTC = monthlyNetPayment + monthlyEPF13 + monthlyInsurance;

    setSalaryData((prev) => ({
      ...prev,
      grossSalary: monthlyGrossSalary,
      professionTax: monthlyProfessionTax,
      EPF12: monthlyEPF12,
      netPayment: monthlyNetPayment,
      insurance: monthlyInsurance,
      EPF13: monthlyEPF13,
      CTC: monthlyCTC,
    }));
  };

  const handleInputChange = (field, value) => {
    setSalaryData((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderInputOrValue = (field, isMonthly, isMediumFont) => {
    const isInput = [
      "basic",
      "HRA",
      "joiningIncentive",
      "otherAllowance",
    ].includes(field);
    const value = isMonthly ? salaryData[field] : salaryData[field] * 12;

    if (
      isInput &&
      ((isMonthly && formData.CTCFrequency === "monthly") ||
        (!isMonthly && formData.CTCFrequency === "Annually"))
    ) {
      return (
        <input
          type="number"
          value={value || ""}
          onChange={(e) =>
            handleInputChange(
              field,
              isMonthly
                ? e.target.value
                : (parseFloat(e.target.value) / 12).toString()
            )
          }
          className="border rounded-md p-2 w-full"
          placeholder={field}
        />
      );
    } else {
      return (
        <p className={isMediumFont ? "font-medium" : ""}>
          {formatCurrency(value)}
        </p>
      );
    }
  };

  const handleAddSalaryCTCComponent = async () => {
    const postData = new FormData();
    postData.append("employee", empId);
    postData.append("basic_month", salaryData.basic);
    postData.append("basic_annual", salaryData.basic * 12);
    postData.append("hra_month", salaryData.HRA);
    postData.append("hra_annual", salaryData.HRA * 12);
    postData.append("joining_incentive_month", salaryData.joiningIncentive);
    postData.append(
      "joining_incentive_annual",
      salaryData.joiningIncentive * 12
    );
    postData.append("other_allowance_month", salaryData.otherAllowance);
    postData.append("other_allowance_annual", salaryData.otherAllowance * 12);
    postData.append("profession_tax_month", salaryData.professionTax);
    postData.append("epf_12_month", salaryData.EPF12);
    postData.append("epf_12_annual", salaryData.EPF12 * 12);
    postData.append("net_payment_month", salaryData.netPayment);
    postData.append("net_payment_annual", salaryData.netPayment * 12);
    postData.append("insurance_month", salaryData.insurance);
    postData.append("insurance_annual", salaryData.insurance * 12);
    postData.append("epf_13_month", salaryData.EPF13);
    postData.append("epf_13_annual", salaryData.EPF13 * 12);
    postData.append("ctc_month", salaryData.CTC);
    postData.append("ctc_annual", salaryData.CTC * 12);

    try {
      const res = await postCTCComponent(postData);
      toast.success("CTC component created successfully");
      setSteps("statutory");
    } catch (error) {
      console.log(error);
    }
  };

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
  const [templateData, setTemplateData] = useState([]);
  const handleCTCTemplateChange = async (e) => {
    const fetchTaxStat = async (templateId) => {
      try {
        const res = await getTaxAndStatSettingByTemplateId(templateId);
        setTemplateData(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (e.target.type === "select-one" && e.target.name === "ctcTemplate") {
      const tempId = Number(e.target.value);
      await fetchTaxStat(tempId);

      setFormData({
        ...formData,
        ctcTemplate: tempId,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    if (!formData.effectiveDateDiffer) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        actualEffectiveDate: "",
      }));
    }
  }, [formData.effectiveDateDiffer]);

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

  useEffect(() => {
    if (formData.monthlyCTCAmount) {
      setFixedAllowanceItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[0].monthly = formData.monthlyCTCAmount; // Update "Basic" monthly
        return updatedItems;
      });
    }
  }, [formData.monthlyCTCAmount]);

  const [fixedAllowanceItems, setFixedAllowanceItems] = useState([
    {
      label: "Enter the Amount for Basic",
      monthly: "",
      yearly: "",
    },
    {
      label: "Enter the Amount for Conveyance Allowance",
      monthly: "",
      yearly: "",
    },
    { label: "Enter the Amount for HRA", monthly: "", yearly: "" },
    { label: "Enter the Amount for Medical", monthly: "", yearly: "" },
    {
      label: "Enter the Amount for Special Allowance",
      monthly: "",
      yearly: "",
    },
    { label: "Enter the Amount for Allowance", monthly: "", yearly: "" },
  ]);
  const [employerContributions, setEmployerContribution] = useState([
    { label: "Employer PF Contribution", monthly: 0, yearly: 0 },
    {
      label: "Employer ESIC Contribution",
      monthly: 0,
      yearly: 0,
    },
    { label: "Employer LWF Contribution", monthly: 0, yearly: 0 },
    { label: "Employer NPS Contribution", monthly: 0, yearly: 0 },
  ]);
  const [employeeDeduction, setEmployeeDeduction] = useState([
    { label: "Employee PF Deduction", monthly: 0, yearly: 0 },
    {
      label: "Employee ESIC Deduction",
      monthly: 0,
      yearly: 0,
    },
    { label: "Employee LWF Deduction", monthly: 0, yearly: 0 },
    { label: "Employee PT Deduction", monthly: 0, yearly: 0 },
    { label: "Employee NPS Deduction", monthly: 0, yearly: 0 },
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
    updatedItems[index].monthly = Number(value);
    updatedItems[index].yearly = Number(value) * 12;
    setFixedAllowanceItems(updatedItems);
  };
  const handleYearlyChange = (index, value) => {
    const updatedItems = [...fixedAllowanceItems];
    updatedItems[index].yearly = Number(value);
    updatedItems[index].monthly = Number(value) / 12;
    setFixedAllowanceItems(updatedItems);
  };

  const outputData = [
    {
      description: "Total Take Home (excluding Variable)",
      monthly: "₹0",
      yearly: "₹0",
    },
    {
      description: "Total CTC (excluding Variable & Other Benefits)",
      monthly: "₹0",
      yearly: "₹0",
    },
    {
      description: "Total CTC (including Variable)",
      yearly: "₹0",
    },
  ];
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [taxStatFields, setTaxStatFields] = useState([]);
  // const [statData, setStatData] = useState(
  //   taxStatFields.reduce((acc, field) => {
  //     acc[field.id] =
  //       field.value_type === "boolean"
  //         ? field.default_value === "true"
  //         : field.default_value;
  //     return acc;
  //   }, {})
  // );

  const [statData, setStatData] = useState({});

  useEffect(() => {
    const fetchTaxStat = async () => {
      try {
        const res = await getTaxAndStatSetting(hrmsOrgId);
        setTaxStatFields(res);
        const initialStatData = res.reduce((acc, field) => {
          acc[field.id] =
            field.value_type === "boolean"
              ? field.default_value === "true"
              : field.default_value;
          return acc;
        }, {});

        setStatData(initialStatData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTaxStat();
  }, []);
  // useEffect(() => {
  //   const fetchTaxStat = async () => {
  //     try {
  //       const res = await getTaxAndStatSetting(hrmsOrgId);
  //       setTaxStatFields(res);
  //       const initialStatData = res.reduce((acc, field) => {
  //         acc[field.id] =
  //           field.value_type === "boolean"
  //             ? field.default_value === "true"
  //             : field.default_value;
  //         return acc;
  //       }, {});

  //       setStatData(initialStatData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchTaxStat();
  // }, []);

  const handleStatChange = (id, event, valueType) => {
    const updatedValue =
      valueType === "boolean"
        ? event.target.value === "true"
        : event.target.value;
    setStatData({
      ...statData,
      [id]: updatedValue,
    });
  };
  console.log(formData);
  const handlePostTaxStatutory = async () => {
    const taxData = Object.entries(statData).map(([key, value]) => ({
      employee: 1,
      master_id: key,
      value: String(value),
    }));
    try {
      const res = await postTaxAndStatSetting(taxData);
      setPage("CTC Components");
    } catch (error) {
      console.log(error);
    }
  };
  const [ctcTemplates, setCTCTemplates] = useState([]);
  const CTCTemplates = async () => {
    try {
      const res = await showCTCTemplates(hrmsOrgId);
      setCTCTemplates(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    CTCTemplates();
  }, []);

  return (
    <div className="flex w-full">
      {/* <AddEmployeeDetailsList /> */}
      <div className="w-full p-2 px-2 bg-white rounded-lg">
        <h2 className="border-b text-center text-xl border-black  font-bold mt-2">
          Salary
        </h2>
        <div className="w-full mt-2 p-5 border border-gray-300 rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Add CTC</h2>
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
                      setFormData({ ...formData, effectiveDateDiffer: true })
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
                      setFormData({ ...formData, effectiveDateDiffer: false })
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
                  onChange={handleCTCTemplateChange}
                  name="ctcTemplate"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Template</option>
                  {ctcTemplates.map((template) => (
                    <option value={template.id}>{template.name}</option>
                  ))}
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
                  style={{ background: themeColor }}
                  className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded"
                  onClick={handleAddGeneralInfo}
                >
                  Save & Proceed
                </button>
              </div>
            </div>
          )}
          {page === "Tax and Statutory Setting" && (
            // <div>
            //   {taxStatFields.map((field) => (
            //     <div key={field.id} className="flex gap-2 flex-col my-2">
            //       <label className="block text-gray-700 font-medium">
            //         {field.label}
            //       </label>
            //       {field.value_type === "boolean" && (
            //         <div className="flex gap-4 items-center">
            //           <label className="flex gap-2">
            //             <input
            //               type="radio"
            //               name={`boolean-${field.id}`}
            //               value="true" // String "true"
            //               checked={statData[field.id] === true} // Boolean check
            //               onChange={(e) =>
            //                 handleStatChange(field.id, e, "boolean")
            //               }
            //             />
            //             Yes
            //           </label>
            //           <label className="flex gap-2">
            //             <input
            //               type="radio"
            //               name={`boolean-${field.id}`}
            //               value="false" // String "false"
            //               checked={statData[field.id] === false} // Boolean check
            //               onChange={(e) =>
            //                 handleStatChange(field.id, e, "boolean")
            //               }
            //             />
            //             No
            //           </label>
            //         </div>
            //       )}
            //       {field.value_type === "number" && (
            //         <input
            //           type="number"
            //           value={statData[field.id]}
            //           onChange={(e) => handleStatChange(field.id, e, "number")}
            //           placeholder="Enter PF wage"
            //           className="border w-full border-gray-500 p-2 rounded-md"
            //         />
            //       )}
            //       {field.value_type === "string" && (
            //         <input
            //           type="text"
            //           value={statData[field.id]}
            //           onChange={(e) => handleStatChange(field.id, e, "string")}
            //           placeholder="Enter text"
            //           className="border w-full border-gray-500 p-2 rounded-md"
            //         />
            //       )}
            //       {field.value_type === "drop down" && (
            //         <select
            //           name=""
            //           id=""
            //           value={statData[field.id]}
            //           onChange={(e) => handleStatChange(field.id, e, "string")}
            //           className="border w-full border-gray-500 p-2 rounded-md"
            //         >
            //           <option value="">Select Template</option>
            //           <option value="temp">Template</option>
            //         </select>
            //       )}
            //     </div>
            //   ))}
            // <div className="flex justify-center items-center ">
            //   <button
            //     style={{ background: themeColor }}
            //     className="text-white p-2 rounded-md"
            //     onClick={handlePostTaxStatutory}
            //   >
            //     Save & Proceed
            //   </button>
            // </div>
            // </div>
            <div className="mt-4">
              {templateData.length > 0 ? (
                templateData.map((item) => (
                  <div key={item.id} className="mb-4">
                    <p className="text-sm font-medium text-gray-700">
                      {item.master_name}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`option-${item.id}`}
                          value="true"
                          checked={item.value === "true"}
                          readOnly
                          disabled
                          className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`option-${item.id}`}
                          value="false"
                          checked={item.value === "false"}
                          readOnly
                          disabled
                          className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center my-4">
                  Please Select CTC Template{" "}
                </p>
              )}

              <div className="flex justify-center items-center ">
                <button
                  style={{ background: themeColor }}
                  className="text-white p-2 rounded-md"
                  onClick={() => setPage("CTC Components")}
                >
                  Save & Proceed
                </button>
              </div>
            </div>
          )}
          {page === "CTC Components" && (
            <div>
              {/* <div className="w-full mx-auto p-4">
                <div className="flex items-center mb-4">
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
                {formData.CTCFrequency === "Annually" && (
                  <>
                    <SalaryAccordionAnnually
                      title="Fixed Allowance"
                      items={fixedAllowanceItems}
                      totalMonthly={totalMonthly}
                      totalYearly={totalYearly}
                      onYearlyChange={handleYearlyChange}
                    />
                  </>
                )}

                {formData.CTCFrequency === "monthly" && (
                  <>
                    <SalaryAccordion
                      title="Fixed Allowance"
                      items={fixedAllowanceItems}
                      totalMonthly={totalMonthly}
                      totalYearly={totalYearly}
                      onMonthlyChange={handleMonthlyChange}
                    />
                  </>
                )}

              
                <SalaryAccordion
                  title="Total Employer Statutory Contributions"
                  items={employerContributions}
                  totalMonthly={0}
                  totalYearly={0}
                  showInput={false}
                />

                <SalaryAccordion
                  title="Total Employee Statutory Deductions"
                  items={employeeDeduction}
                  totalMonthly={0}
                  totalYearly={0}
                  showInput={false}
                />
              </div> */}

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="border border-gray-300 p-2 text-left">
                        Designation
                      </th>
                      <th className="border border-gray-300 p-2 text-center min-w-44">
                        Monthly
                      </th>
                      <th className="border border-gray-300 p-2 text-center min-w-44">
                        Annually
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(salaryData).map(([key, value]) => (
                      <tr
                        key={key}
                        className={
                          key === "grossSalary" ||
                          key === "netPayment" ||
                          key === "CTC"
                            ? "bg-red-100"
                            : ""
                        }
                      >
                        <td className="border border-gray-300 p-2 font-medium">
                          {key === "EPF12"
                            ? "EPF 12%"
                            : key === "EPF13"
                            ? "EPF 13%"
                            : key === "HRA"
                            ? "HRA"
                            : key === "CTC"
                            ? "CTC"
                            : key.charAt(0).toUpperCase() +
                              key
                                .slice(1)
                                .replace(/([A-Z])/g, " $1")
                                .trim()}
                        </td>
                        <td className="border border-gray-300 p-2 text-right">
                          {renderInputOrValue(
                            key,
                            true,
                            key === "grossSalary" ||
                              key === "netPayment" ||
                              key === "CTC"
                          )}
                        </td>
                        <td className="border border-gray-300 p-2 text-right">
                          {renderInputOrValue(
                            key,
                            false,
                            key === "grossSalary" ||
                              key === "netPayment" ||
                              key === "CTC"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* <table className="w-full bg-gray-50 rounded-lg overflow-hidden">
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
              </table> */}

              <div className="mt-10 flex justify-center gap-2">
                <button
                  className=" text-gray-500 mb-2  font-medium py-2 px-4 rounded-md border-2 border-gray-500"
                  onClick={() => setPage("Tax and Statutory Setting")}
                >
                  Back
                </button>
                <button
                  style={{ background: themeColor }}
                  onClick={handleAddSalaryCTCComponent}
                  className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded"
                >
                  Save & Proceed
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingSalary;
