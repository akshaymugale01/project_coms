import React from 'react'
import { Link } from "react-router-dom";

const PersonalFinancialEdit = () => {

  return (
    <div className="mt-10 border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen overflow-y-auto">
                <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
Edit Initial Budget</h2>
        <div className="mt-10 mr-5 grid md:grid-cols-3 gap-5">
        <div className="grid gap-2 items-center w-full">
      <label htmlFor="salaryWages" className="font-semibold">
        Employee Name:
      </label>
      <input
        type="text"
        id="salaryWages"
        className="border border-gray-400 p-2 rounded-md"
        placeholder="Enter Name"
      />
    </div>
    <div className="grid gap-2 items-center w-full">
      <label htmlFor="salaryWages" className="font-semibold">
        Salary/Wages:
      </label>
      <input
        type="number"
        id="salaryWages"
        className="border border-gray-400 p-2 rounded-md"
        placeholder="Enter Salary/Wages"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="bonusIncentives" className="font-semibold">
        Bonus/Incentives:
      </label>
      <input
        type="number"
        id="bonusIncentives"
        className="border border-gray-400 p-2 rounded-md"
        placeholder="Enter Bonus/Incentives"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="investmentIncome" className="font-semibold">
        Investment Income:
      </label>
      <input
        type="number"
        id="investmentIncome"
        className="border border-gray-400 p-2 rounded-md"
        placeholder="Enter Investment Income"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="housing" className="font-semibold">
        Housing (Rent/Mortgage):
      </label>
      <input
        type="number"
        id="housing"
        className="border border-gray-400 p-2 rounded-md"
        placeholder="Enter Housing Expense"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="utilities" className="font-semibold">
        Utilities (Electricity, Water, Gas):
      </label>
      <input
        type="number"
        id="utilities"
        className="border border-gray-400 p-2 rounded-md"
        placeholder="Enter Utilities Expense"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="transportation" className="font-semibold">
        Transportation (Car Payment, Fuel, Public Transit):
      </label>
      <input
        type="number"
        id="transportation"
        className="border border-gray-400 p-2 rounded-md"
        placeholder="Enter Transportation Expense"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="groceries" className="font-semibold">
        Groceries:
      </label>
      <input
        type="number"
        id="groceries"
        className="border border-gray-400 p-2 rounded-md"
        placeholder="Enter Groceries Expense"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="diningOut" className="font-semibold">
        Dining Out/Entertainment:
      </label>
      <input
        type="number"
        id="diningOut"
        className="border border-gray-400 p-2 rounded-md"
        placeholder="Enter Dining Out/Entertainment Expense"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="healthInsurance" className="font-semibold">
        Health Insurance Premiums:
      </label>
      <input
        type="number"
        id="healthInsurance"
        className="border border-gray-400 p-2 rounded-md"
        placeholder="Enter Health Insurance Premiums"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="loanPayments" className="font-semibold">
        Loan Payments (Student Loans, Car Loans):
      </label>
      <input
        type="number"
        id="loanPayments"
        className="border border-gray-400 p-2 rounded-md"
        placeholder="Enter Loan Payments"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="savingsInvestments" className="font-semibold">
        Savings/Investments:
      </label>
      <input
        type="number"
        id="savingsInvestments"
        className="border border-gray-400 p-2 rounded-md"
        placeholder="Enter Savings/Investments"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="miscellaneous" className="font-semibold">
        Miscellaneous (Clothing, Personal Care):
      </label>
      <input
        type="number"
        id="miscellaneous"
        className="border border-gray-400 p-2 rounded-md"
        placeholder="Enter Miscellaneous Expense"
      />
    </div>
  </div>
  <div className="flex gap-5 justify-center items-center my-4">
          <button
            type="submit"
            className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
  </div>
  )
}

export default PersonalFinancialEdit