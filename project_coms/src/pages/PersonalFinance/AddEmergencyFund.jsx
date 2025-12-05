import React, { useState, useEffect } from 'react';

function AddEmergencyFund() {
  // State variables
  const [goalAmount, setGoalAmount] = useState('');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [target, setTarget] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');

  // Calculate recommended target based on expenses
  const calculateTarget = () => {
    const recommendedTarget = expenses * 3; // Simplified to 3 months for demo purposes
    setTarget(recommendedTarget);
  };

  // Calculate estimated completion date based on current savings rate
  useEffect(() => {
    if (goalAmount && monthlyContribution) {
      const months = Math.ceil((goalAmount - currentBalance) / monthlyContribution);
      const estimatedDate = new Date();
      estimatedDate.setMonth(estimatedDate.getMonth() + months);
      setTargetDate(estimatedDate.toLocaleDateString());
    }
  }, [goalAmount, monthlyContribution, currentBalance]);

  // Handle withdrawal
  const handleWithdrawal = () => {
    if (withdrawalAmount <= currentBalance) {
      setCurrentBalance(currentBalance - withdrawalAmount);
      setWithdrawalAmount('');
    } else {
      alert('Insufficient funds');
    }
  };

  return (
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl text-center font-bold mb-4">Emergency Fund Module</h1>
    <div className="mt-10 border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen overflow-y-auto">

    <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
    Emergency Fund </h2>
      {/* Set Savings Goal */}
      <div className="mb-4 mt-2   ">
        <h2 className="text-xl font-semibold mb-2">Set a Savings Goal</h2>
        <input
          type="number"
          placeholder="Enter savings goal amount"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          className="border p-2 w-full mb-2"
        />
      </div>

      {/* Calculate Recommended Target */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Calculate Recommended Savings Target</h2>
        <input
          type="number"
          placeholder="Enter monthly income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Enter monthly expenses"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button onClick={calculateTarget} className="bg-blue-500 text-white p-2 rounded">
          Calculate Target
        </button>
        {target > 0 && <p className="mt-2">Recommended Target: ${target}</p>}
      </div>

      {/* Set Up Automatic Transfers */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Set Up Automatic Transfers</h2>
        <input
          type="number"
          placeholder="Enter monthly savings contribution"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(e.target.value)}
          className="border p-2 w-full mb-2"
        />
      </div>

      {/* Track Progress */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Track Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${(currentBalance / goalAmount) * 100}%` }}
          ></div>
        </div>
        <p>Current Balance: Rs{currentBalance}</p>
        <p>Goal Amount:Rs{goalAmount}</p>
        <p>Estimated Completion Date: {targetDate}</p>
      </div>

      {/* Access Emergency Funds */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Access Emergency Funds</h2>
        <input
          type="number"
          placeholder="Enter withdrawal amount"
          value={withdrawalAmount}
          onChange={(e) => setWithdrawalAmount(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button onClick={handleWithdrawal} className="bg-red-500 text-white p-2 rounded">
          Withdraw
        </button>
      </div>

      {/* Replenish Fund */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Replenish the Fund</h2>
        <input
          type="number"
          placeholder="Enter  amount"
          value={withdrawalAmount}
          onChange={(e) => setWithdrawalAmount(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        {/* <p>After withdrawal, please adjust your monthly contributions to replenish your emergency fund.</p> */}
      </div>
    </div>
  );
}

export default AddEmergencyFund