import React from 'react';

const EmployeeAddTravellingAllowanceRequest = () => (
  <div className="flex justify-center items-center my-5 w-full p-4">
    <form className="border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen overflow-y-auto">
      <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
        Travel Allowance Request
      </h2>
      <div className="grid md:grid-cols-3 gap-5 mt-5">
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="employeeId" className="font-semibold">
            Employee ID:
          </label>
          <input
            type="number"
            id="employeeId"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Employee ID"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="employeeName" className="font-semibold">
            Employee Name:
          </label>
          <input
            type="text"
            id="employeeName"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Employee Name"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="expenseCategory" className="font-semibold">
            Expense Category:
          </label>
          <select id="expenseCategory" className="border border-gray-400 p-2 rounded-md">
            <option value="meals">Meals</option>
            <option value="transportation">Transportation</option>
            <option value="accommodation">Accommodation</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="dateOfExpense" className="font-semibold">
            Date of Expense:
          </label>
          <input
            type="date"
            id="dateOfExpense"
            className="border border-gray-400 p-2 rounded-md"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="descriptionOfExpense" className="font-semibold">
            Description of Expense:
          </label>
          <textarea
            id="descriptionOfExpense"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Description of Expense"
          ></textarea>
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="amountSpent" className="font-semibold">
            Amount Spent:
          </label>
          <input
            type="number"
            id="amountSpent"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Amount Spent"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="supportingDocuments" className="font-semibold">
            Supporting Documents:
          </label>
          <input
            type="file"
            id="supportingDocuments"
            className="border border-gray-400 p-2 rounded-md"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="approvalStatus" className="font-semibold">
            Approval Status:
          </label>
          <select id="approvalStatus" className="border border-gray-400 p-2 rounded-md">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
          </select>
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="reimbursementAmount" className="font-semibold">
            Reimbursement Amount:
          </label>
          <input
            type="number"
            id="reimbursementAmount"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Reimbursement Amount"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="reimbursementMethod" className="font-semibold">
            Reimbursement Method:
          </label>
          <select id="reimbursementMethod" className="border border-gray-400 p-2 rounded-md">
            <option value="directDeposit">Direct Deposit</option>
            <option value="check">Check</option>
          </select>
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="managerApproval" className="font-semibold">
            Manager Approval:
          </label>
          <select id="managerApproval" className="border border-gray-400 p-2 rounded-md">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="reimbursementConfirmationEmail" className="font-semibold">
            Reimbursement Confirmation Email:
          </label>
          <input
            type="email"
            id="reimbursementConfirmationEmail"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Reimbursement Confirmation Email"
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
    </form>
  </div>
);

export default EmployeeAddTravellingAllowanceRequest;