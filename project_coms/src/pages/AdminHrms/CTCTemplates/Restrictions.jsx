import React, { useState } from "react";
import CTCDetailsList from "../CTCDetailsList";
import { useSelector } from "react-redux";
import InputWithCurrency from "./InputWithCurrency";
import CriteriaSelection from "./CriteriaSelection";
import { ChevronDown } from "react-ionicons";

const Restrictions = () => {
  const themeColor = useSelector((state) => state.theme.color);

  const [fixedSalaryAllowances, setFixedSalaryAllowances] = useState([
    {
      category: "Basic",
      criteria: "",
      value: "",
      component: "",
      minAmount: "",
      maxAmount: "",
    },
    {
      category: "HRA",
      criteria: "",
      value: "",
      component: "",
      minAmount: "",
      maxAmount: "",
    },
    { category: "Child Education", criteria: "", value: "", minAmount: "" },
    { category: "Special", criteria: "balance", value: "" },
  ]);

  const [employerContributions, setEmployerContributions] = useState([
    { category: "Gratuity Percentage", value: "", selected: "3 selected" },
  ]);

  const [fixedSalaryDeductions, setFixedSalaryDeductions] = useState([
    { category: "new", criteria: "", value: "", minAmount: "", maxAmount: "" },
  ]);

  const handleFixedSalaryAllowanceChange = (index, field, value) => {
    const newAllowances = [...fixedSalaryAllowances];
    newAllowances[index][field] = value;
    setFixedSalaryAllowances(newAllowances);
  };

  const handleEmployerContributionChange = (index, field, value) => {
    const newContributions = [...employerContributions];
    newContributions[index][field] = value;
    setEmployerContributions(newContributions);
  };

  const handleFixedSalaryDeductionChange = (index, field, value) => {
    const newDeductions = [...fixedSalaryDeductions];
    newDeductions[index][field] = value;
    setFixedSalaryDeductions(newDeductions);
  };

  return (
    <div className="my-10 m-2">
      <div className="w-full">
        <section>
          <h2 className="text-lg font-medium mb-4">Fixed Salary Allowances</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-base">
                <th className=" p-2 text-left">Category</th>
                <th className=" p-2 text-left">Criteria</th>
                <th className=" p-2 text-left">Value</th>
                <th className=" p-2 text-left">Component</th>
                <th className=" p-2 text-left">Min Amount</th>
                <th className=" p-2 text-left">Max Amount</th>
              </tr>
            </thead>
            <tbody>
              {fixedSalaryAllowances.map((allowance, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{allowance.category}</td>
                  <td className="p-2">
                    {allowance.criteria === "balance" ? (
                      "Balance"
                    ) : (
                      <CriteriaSelection
                        value={allowance.criteria}
                        onChange={(value) =>
                          handleFixedSalaryAllowanceChange(
                            index,
                            "criteria",
                            value
                          )
                        }
                      />
                    )}
                  </td>
                  <td className="p-2">
                    {(allowance.criteria === "amount" ||
                      allowance.criteria === "percentage") && (
                      <input
                        type="text"
                        value={allowance.value}
                        onChange={(e) =>
                          handleFixedSalaryAllowanceChange(
                            index,
                            "value",
                            e.target.value
                          )
                        }
                        placeholder={`Enter ${
                          allowance.criteria === "percentage"
                            ? "Percentage"
                            : "Amount"
                        }`}
                        className="w-full  rounded-md p-2"
                      />
                    )}
                  </td>
                  <td className=" p-2">
                    {((allowance.category === "Basic" &&
                      allowance.criteria === "percentage") ||
                      allowance.category === "HRA") && (
                      <select className="w-full border rounded-md p-2 bg-white">
                        <option>Select</option>
                      </select>
                    )}
                  </td>
                  <td className="p-2">
                    <InputWithCurrency
                      value={allowance.minAmount}
                      onChange={(value) =>
                        handleFixedSalaryAllowanceChange(
                          index,
                          "minAmount",
                          value
                        )
                      }
                      placeholder="Blank For no Limit"
                    />
                  </td>
                  <td className=" p-2">
                    {(allowance.criteria === "amount" ||
                      allowance.criteria === "percentage") && (
                      <InputWithCurrency
                        value={allowance.maxAmount}
                        onChange={(value) =>
                          handleFixedSalaryAllowanceChange(
                            index,
                            "maxAmount",
                            value
                          )
                        }
                        placeholder="Blank For no Limit"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2 className="text-lg font-medium my-4">Employer Contributions</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Category</th>
                <th className="border p-2 text-left">Value</th>
                <th className="border p-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {employerContributions.map((contribution, index) => (
                <tr key={index}>
                  <td className="border p-2">{contribution.category}</td>
                  <td className="border p-2">
                    <div className="flex items-center border rounded-md">
                      <input
                        type="text"
                        value={contribution.value}
                        onChange={(e) =>
                          handleEmployerContributionChange(
                            index,
                            "value",
                            e.target.value
                          )
                        }
                        placeholder="%"
                        className="w-full p-2 rounded-l-md"
                      />
                      <span className="px-2 bg-gray-100 border-l">%</span>
                    </div>
                  </td>
                  <td className="border p-2">
                    <button className="w-full p-2 bg-white border rounded-md text-left flex justify-between items-center">
                      <span>{contribution.selected}</span>
                      <ChevronDown className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-lg font-medium  my-4">Fixed Salary Deductions</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-center">Category</th>
                <th className="border p-2 text-center">Criteria</th>
                <th className="border p-2 text-center">Value</th>
                <th className="border p-2 text-center">Min Amount</th>
                <th className="border p-2 text-center">Max Amount</th>
              </tr>
            </thead>
            <tbody>
              {fixedSalaryDeductions.map((deduction, index) => (
                <tr key={index}>
                  <td className="border p-2">{deduction.category}</td>
                  <td className="border p-2">
                    <CriteriaSelection
                      value={deduction.criteria}
                      onChange={(value) =>
                        handleFixedSalaryDeductionChange(
                          index,
                          "criteria",
                          value
                        )
                      }
                    />
                  </td>
                  <td className="border p-2">
                    {(deduction.criteria === "amount" ||
                      deduction.criteria === "percentage") && (
                      <input
                        type="text"
                        value={deduction.value}
                        onChange={(e) =>
                          handleFixedSalaryDeductionChange(
                            index,
                            "value",
                            e.target.value
                          )
                        }
                        placeholder={`Enter ${
                          deduction.criteria === "percentage"
                            ? "Percentage"
                            : "Amount"
                        }`}
                        className="w-full border rounded-md p-2"
                      />
                    )}
                  </td>
                  <td className="border p-2">
                    <InputWithCurrency
                      value={deduction.minAmount}
                      onChange={(value) =>
                        handleFixedSalaryDeductionChange(
                          index,
                          "minAmount",
                          value
                        )
                      }
                      placeholder="Blank For no Limit"
                    />
                  </td>
                  <td className="border p-2">
                    {(deduction.criteria === "amount" ||
                      deduction.criteria === "percentage") && (
                      <InputWithCurrency
                        value={deduction.maxAmount}
                        onChange={(value) =>
                          handleFixedSalaryDeductionChange(
                            index,
                            "maxAmount",
                            value
                          )
                        }
                        placeholder="Blank For no Limit"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Restrictions;
