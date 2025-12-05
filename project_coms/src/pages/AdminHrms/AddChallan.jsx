import React, { useState } from 'react';
import AdminHRMS from './AdminHrms';

const AddChallan = () => {
  // State variables to hold form data
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [challanNumber, setChallanNumber] = useState('');
  const [bsrCode, setBsrCode] = useState('');
  const [tenderDate, setTenderDate] = useState('');
  const [taxApplicable, setTaxApplicable] = useState('');
  const [typeOfPayment, setTypeOfPayment] = useState('');
  const [incomeTax, setIncomeTax] = useState(0);
  const [surcharge, setSurcharge] = useState(0);
  const [healthCess, setHealthCess] = useState(0);
  const [interest, setInterest] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [others, setOthers] = useState(0);
  const [lateFees, setLateFees] = useState(0);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., sending data to backend)
    console.log('Form submitted!');
  };

  return (
    <div className='flex gap-10 ml-20'>
        <AdminHRMS/>

    <div className="ml-10 mt-10 bg-white p-8 rounded shadow-lg w-4/5">
      <h2 className="text-2xl font-bold mb-4">Add a Challan</h2>
      <form onSubmit={handleSubmit}>
        {/* Month and Year */}
        <div className='grid grid-cols-3'>
        <div className="mb-4">
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">Challan Month-Year *</label>
          <div className="flex space-x-4">
            <select
              id="month"
              name="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border border-gray-400 p-2 rounded-md"              required
            >
              <option value="">Select Month</option>
              {/* Add month options here */}
            </select>
            <select
              id="year"
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border border-gray-400 p-2 rounded-md"              required
            >
              <option value="">Select Year</option>
              {/* Add year options here */}
            </select>
          </div>
        </div>

        {/* Challan Number */}
        <div className="mb-4">
          <label htmlFor="challanNumber" className="block text-sm font-medium text-gray-700">Challan Number *</label>
          <input
            type="text"
            id="challanNumber"
            name="challanNumber"
            value={challanNumber}
            onChange={(e) => setChallanNumber(e.target.value)}
            className="border border-gray-400 p-2 rounded-md"            required
          />
        </div>

        {/* BSR Code */}
        <div className="mb-4">
          <label htmlFor="bsrCode" className="block text-sm font-medium text-gray-700">BSR Code *</label>
          <input
            type="text"
            id="bsrCode"
            name="bsrCode"
            value={bsrCode}
            onChange={(e) => setBsrCode(e.target.value)}
            className="border border-gray-400 p-2 rounded-md"            required
          />
        </div>

        {/* Tender Date */}
        <div className="mb-4">
          <label htmlFor="tenderDate" className="block text-sm font-medium text-gray-700">Tender Date *</label>
          <input
            type="date"
            id="tenderDate"
            name="tenderDate"
            value={tenderDate}
            onChange={(e) => setTenderDate(e.target.value)}
            className="border border-gray-400 p-2 rounded-md"            required
          />
        </div>

        {/* Tax Applicable */}
        <div className="mb-4">
          <label htmlFor="taxApplicable" className="block text-sm font-medium text-gray-700">Tax Applicable *</label>
          <select
            id="taxApplicable"
            name="taxApplicable"
            value={taxApplicable}
            onChange={(e) => setTaxApplicable(e.target.value)}
            className="border border-gray-400 p-2 rounded-md"            required
          >
            <option value="">Select Tax Applicable</option>
            {/* Add tax applicable options here */}
          </select>
        </div>

        {/* Type of Payment */}
        <div className="mb-4">
          <label htmlFor="typeOfPayment" className="block text-sm font-medium text-gray-700">Type of Payment *</label>
          <select
            id="typeOfPayment"
            name="typeOfPayment"
            value={typeOfPayment}
            onChange={(e) => setTypeOfPayment(e.target.value)}
            className="border border-gray-400 p-2 rounded-md"            required
          >
            <option value="">Select Type of Payment</option>
            {/* Add type of payment options here */}
          </select>
        </div>

        {/* Income Tax */}
        <div className="mb-4">
          <label htmlFor="incomeTax" className="block text-sm font-medium text-gray-700">Income Tax *</label>
          <input
            type="number"
            id="incomeTax"
            name="incomeTax"
            value={incomeTax}
            onChange={(e) => setIncomeTax(parseFloat(e.target.value))}
            className="border border-gray-400 p-2 rounded-md"            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="incomeTax" className="block text-sm font-medium text-gray-700">Surcharge *</label>
          <input
            type="number"
            id="incomeTax"
            name="incomeTax"
            value={incomeTax}
            onChange={(e) => setIncomeTax(parseFloat(e.target.value))}
            className="border border-gray-400 p-2 rounded-md"            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="incomeTax" className="block text-sm font-medium text-gray-700">Health and Education Cess * *</label>
          <input
            type="number"
            id="incomeTax"
            name="incomeTax"
            value={incomeTax}
            onChange={(e) => setIncomeTax(parseFloat(e.target.value))}
            className="border border-gray-400 p-2 rounded-md"            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="incomeTax" className="block text-sm font-medium text-gray-700">Interest*</label>
          <input
            type="number"
            id="incomeTax"
            name="incomeTax"
            value={incomeTax}
            onChange={(e) => setIncomeTax(parseFloat(e.target.value))}
            className="border border-gray-400 p-2 rounded-md"            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="incomeTax" className="block text-sm font-medium text-gray-700">Penalty*</label>
          <input
            type="number"
            id="incomeTax"
            name="incomeTax"
            value={incomeTax}
            onChange={(e) => setIncomeTax(parseFloat(e.target.value))}
            className="border border-gray-400 p-2 rounded-md"            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="incomeTax" className="block text-sm font-medium text-gray-700">Others*</label>
          <input
            type="number"
            id="incomeTax"
            name="incomeTax"
            value={incomeTax}
            onChange={(e) => setIncomeTax(parseFloat(e.target.value))}
            className="border border-gray-400 p-2 rounded-md"            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="incomeTax" className="block text-sm font-medium text-gray-700">Late fees*</label>
          <input
            type="number"
            id="incomeTax"
            name="incomeTax"
            value={incomeTax}
            onChange={(e) => setIncomeTax(parseFloat(e.target.value))}
            className="border border-gray-400 p-2 rounded-md"            required
          />
        </div>
        </div>
        {/* Surcharge */}
        {/* Add similar input fields for Surcharge, Health Cess, Interest, Penalty, Others, Late Fees */}

        {/* Submit and Cancel buttons */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div> </div>
  );
};

export default AddChallan