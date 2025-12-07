import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const InterestConfiguration = () => {
  const [formData, setFormData] = useState({
    interest_rate: 18,
    calculation_method: 'monthly',
    grace_period_days: 5,
    apply_interest_from: 'due_date',
    min_amount_for_interest: 100,
    auto_calculate: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Interest configuration saved successfully');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Interest Configuration</h2>
        <p className="text-gray-600 mt-1">Configure interest calculation on overdue payments</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Interest Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (% per annum)
              </label>
              <input
                type="number"
                name="interest_rate"
                value={formData.interest_rate}
                onChange={handleChange}
                step="0.01"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Standard rate is 18% p.a.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calculation Method
              </label>
              <select
                name="calculation_method"
                value={formData.calculation_method}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily (365 days)</option>
                <option value="monthly">Monthly (30 days)</option>
                <option value="simple">Simple Interest</option>
                <option value="compound">Compound Interest</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grace Period (Days)
              </label>
              <input
                type="number"
                name="grace_period_days"
                value={formData.grace_period_days}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Days after due date before interest starts</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apply Interest From
              </label>
              <select
                name="apply_interest_from"
                value={formData.apply_interest_from}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="due_date">Due Date</option>
                <option value="grace_period_end">After Grace Period</option>
                <option value="bill_date">Bill Date</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Amount for Interest (₹)
              </label>
              <input
                type="number"
                name="min_amount_for_interest"
                value={formData.min_amount_for_interest}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Interest won't apply below this amount</p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="auto_calculate"
                checked={formData.auto_calculate}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Auto-calculate interest on overdue bills
              </label>
            </div>
          </div>
        </div>

        {/* Interest Calculation Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Calculation Preview</h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Example:</strong> If a bill of ₹10,000 is overdue by 30 days:
            </p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Principal Amount: ₹10,000</p>
              <p>Interest Rate: {formData.interest_rate}% p.a.</p>
              <p>Days Overdue: 30 days (after {formData.grace_period_days} days grace period)</p>
              <p className="font-semibold text-blue-700 mt-2">
                Interest Amount: ₹{((10000 * formData.interest_rate * 30) / (365 * 100)).toFixed(2)}
              </p>
              <p className="font-semibold text-gray-800">
                Total Payable: ₹{(10000 + ((10000 * formData.interest_rate * 30) / (365 * 100))).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Interest Configuration
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterestConfiguration;
