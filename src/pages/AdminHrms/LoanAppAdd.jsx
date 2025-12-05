import React, { useState } from 'react';

const LoanAppAdd = () => {
  const [formData, setFormData] = useState({
    category: '',
    employees: '',
    interestRate: '',
    loanTerm: '',
    loanAmount: '',
    disbursementMode: 'Offline',
    grantDate: '',
    firstEMIMonth: '',
    firstEMIYear: '',
    emiRecoveryMode: '',
    totalAmountToBePaid: '',
    totalInterestPayable: '',
    totalTaxablePerqs: '0.0',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Loan Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-gray-700">Select Loan Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded"
            >
              <option value="">Select Category</option>
              <option value="personal">Personal</option>
              <option value="home">Home</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Select Employees *</label>
            <input
              type="text"
              name="employees"
              value={formData.employees}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Annual Interest Rate *</label>
            <input
              type="number"
              name="interestRate"
              step="0.01"
              value={formData.interestRate}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Term of Loan in months *</label>
            <input
              type="number"
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Loan Amount *</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Mode of Loan Disbursement *</label>
            <select
              name="disbursementMode"
              value={formData.disbursementMode}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded"
            >
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Loan Grant Date *</label>
            <input
              type="date"
              name="grantDate"
              value={formData.grantDate}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700">First EMI month *</label>
            <select
              name="firstEMIMonth"
              value={formData.firstEMIMonth}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded"
            >
              <option value="">Select Month</option>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700">Select Year *</label>
            <input
              type="number"
              name="firstEMIYear"
              value={formData.firstEMIYear}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Mode of EMI Recovery *</label>
            <select
              name="emiRecoveryMode"
              value={formData.emiRecoveryMode}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cheque">Cheque</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700">Total Amount to be Paid</label>
            <input
              type="text"
              name="totalAmountToBePaid"
              value={formData.totalAmountToBePaid}
              readOnly
              className="w-full mt-2 p-2 border rounded bg-gray-100"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700">Total Interest Payable</label>
            <input
              type="text"
              name="totalInterestPayable"
              value={formData.totalInterestPayable}
              readOnly
              className="w-full mt-2 p-2 border rounded bg-gray-100"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700">Total Taxable Perqs</label>
            <input
              type="text"
              name="totalTaxablePerqs"
              value="0.0"
              readOnly
              className="w-full mt-2 p-2 border rounded bg-gray-100"
            />
          </div>

          <div className="col-span-2 flex justify-between">
            <button
              type="button"
              className="w-full max-w-xs bg-red-500 text-white p-2 rounded hover:bg-red-700 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full max-w-xs bg-blue-500 text-white p-2 rounded hover:bg-blue-700 ml-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoanAppAdd
