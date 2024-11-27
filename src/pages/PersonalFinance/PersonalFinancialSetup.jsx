import React, { useState } from 'react';

const PersonalFinancialSetup = () => {
  const [salaryWages, setSalaryWages] = useState('');
  const [bonusIncentives, setBonusIncentives] = useState('');
  const [investmentIncome, setInvestmentIncome] = useState('');
  const [allocations, setAllocations] = useState({});

  const handleSubmit = () => {
    const totalIncome = parseFloat(salaryWages) + parseFloat(bonusIncentives) + parseFloat(investmentIncome);

    if (!isNaN(totalIncome) && totalIncome > 0) {
      const newAllocations = {
        housing: (totalIncome * 0.24).toFixed(2),
        utilities: (totalIncome * 0.03).toFixed(2),
        groceries: (totalIncome * 0.10).toFixed(2),
        domesticHelp: (totalIncome * 0.04).toFixed(2),
        transportation: (totalIncome * 0.08).toFixed(2),
        fitness: (totalIncome * 0.02).toFixed(2),
        entertainment: (totalIncome * 0.06).toFixed(2),
        discretionary: (totalIncome * 0.04).toFixed(2),
        shortTermSavings: (totalIncome * 0.04).toFixed(2),
        longTermInvestments: (totalIncome * 0.24).toFixed(2),
        emergencyFund: (totalIncome * 0.07).toFixed(2),
        total:(totalIncome).toFixed(2),
      };
      setAllocations(newAllocations);
    }
  };

  return (
    <div className="mt-10 border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen overflow-y-auto">
      <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">Add Initial Budget</h2>
      <div className="mt-10 mr-5 grid md:grid-cols-3 gap-5">
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="salaryWages" className="font-semibold">Salary/Wages:</label>
          <input
            type="number"
            id="salaryWages"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Salary/Wages"
            value={salaryWages}
            onChange={(e) => setSalaryWages(e.target.value)}
          />
        </div>
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="bonusIncentives" className="font-semibold">Bonus/Incentives:</label>
          <input
            type="number"
            id="bonusIncentives"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Bonus/Incentives"
            value={bonusIncentives}
            onChange={(e) => setBonusIncentives(e.target.value)}
          />
        </div>
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="investmentIncome" className="font-semibold">Investment Income:</label>
          <input
            type="number"
            id="investmentIncome"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Investment Income"
            value={investmentIncome}
            onChange={(e) => setInvestmentIncome(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-5 justify-center items-center my-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
      {Object.keys(allocations).length > 0 && (
        <div className="mt-10 border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen ">
          <h2 className="text-center mb-2 md:text-xl font-bold p-2 bg-black rounded-full text-white">Salary Breakup</h2>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm">Category</th>
                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Allocation</th>
                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">% of Income</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {Object.keys(allocations).map((key) => (
                <tr key={key}>
                  <td className="text-left py-3 px-4">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                  <td className="text-left py-3 px-4">₹{allocations[key]}</td>
                  <td className="text-left py-3 px-4">{((allocations[key] / (parseFloat(salaryWages) + parseFloat(bonusIncentives) + parseFloat(investmentIncome))) * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PersonalFinancialSetup;