import React, { useState, useEffect } from 'react';

function AddInvestment() {
  // State variables
  const [riskTolerance, setRiskTolerance] = useState('');
  const [investmentGoals, setInvestmentGoals] = useState('');
  const [timeHorizon, setTimeHorizon] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioPerformance, setPortfolioPerformance] = useState({
    roi: 0,
    volatility: 0,
  });

  // Dummy data for asset classes
  const assetClasses = ['Stocks', 'Bonds', 'ETFs', 'Mutual Funds'];

  // Calculate recommended portfolio based on user inputs
  useEffect(() => {
    // Dummy logic - replace with actual recommendation algorithm based on user inputs
    const recommendedPortfolio = [
      { asset: 'Stocks', allocation: 40 },
      { asset: 'Bonds', allocation: 30 },
      { asset: 'ETFs', allocation: 20 },
      { asset: 'Mutual Funds', allocation: 10 },
    ];

    setPortfolio(recommendedPortfolio);

    // Dummy performance metrics - replace with actual calculations
    const roi = calculateROI(recommendedPortfolio);
    const volatility = calculateVolatility(recommendedPortfolio);

    setPortfolioPerformance({ roi, volatility });
  }, [riskTolerance, investmentGoals, timeHorizon]);

  // Dummy function to calculate ROI (Return on Investment)
  const calculateROI = (portfolio) => {
    return portfolio.reduce((totalROI, asset) => totalROI + asset.allocation, 0);
  };

  // Dummy function to calculate volatility
  const calculateVolatility = (portfolio) => {
    return portfolio.reduce((totalVolatility, asset) => totalVolatility + asset.allocation, 0);
  };

  // Handle portfolio rebalancing
  const handleRebalance = () => {
    // Dummy logic for rebalancing - replace with actual implementation
    alert('Portfolio rebalanced successfully!');
  };

  // Handle adjusting investment strategies
  const handleAdjustStrategy = () => {
    // Dummy logic for adjusting strategies - replace with actual implementation
    alert('Strategy adjusted successfully!');
  };

  return (
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl text-center font-bold mb-4">Investment Module</h1>
    <div className="mt-10 border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen overflow-y-auto">
    <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
    Investment Module</h2>
      {/* User Inputs */}
      <div className="mb-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Add Investment</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Risk Tolerance</label>
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Select</option>
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Investment Goals</label>
            <select
              value={investmentGoals}
              onChange={(e) => setInvestmentGoals(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Select</option>
              <option value="retirement">Retirement</option>
              <option value="education">Education</option>
              <option value="wealth_accumulation">Wealth Accumulation</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Time Horizon</label>
            <select
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Select</option>
              <option value="short_term">Short-term</option>
              <option value="medium_term">Medium-term</option>
              <option value="long_term">Long-term</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Investment Amount</label>
            <input
              type="number"
              placeholder="Enter investment amount"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* Recommended Portfolio */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Recommended Portfolio</h2>
        <div className="grid grid-cols-2 gap-4">
          {portfolio.map((asset, index) => (
            <div key={index} className="border p-2">
              <p className="font-semibold">{asset.asset}</p>
              <p>Allocation: {asset.allocation}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Performance Metrics */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Portfolio Performance Metrics</h2>
        <p>Return on Investment (ROI): {portfolioPerformance.roi}%</p>
        <p>Volatility: {portfolioPerformance.volatility}%</p>
      </div>

      {/* Action Buttons */}
      <div className="mb-4">
        <button onClick={handleRebalance} className="bg-blue-500 text-white p-2 rounded mr-4">
          Rebalance Portfolio
        </button>
        <button onClick={handleAdjustStrategy} className="bg-green-500 text-white p-2 rounded">
          Adjust Investment Strategy
        </button>
      </div>
    </div>
  );
}

export default AddInvestment