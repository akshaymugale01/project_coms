import React, { useState, useEffect } from 'react';

function AddGoalPlanning() {
  // State variables
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [targetDate, setTargetDate] = useState('');

  // Add a new goal
  const addGoal = () => {
    if (goalName && targetAmount && monthlyContribution && targetDate) {
      const newGoal = {
        id: goals.length + 1,
        name: goalName,
        targetAmount: parseFloat(targetAmount),
        monthlyContribution: parseFloat(monthlyContribution),
        targetDate: new Date(targetDate),
        progress: 0,
      };

      setGoals([...goals, newGoal]);
      clearForm();
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Clear form fields
  const clearForm = () => {
    setGoalName('');
    setTargetAmount('');
    setMonthlyContribution('');
    setTargetDate('');
  };

  // Handle goal priority (dummy function for demo)
  const handlePriority = (goalId) => {
    // Dummy logic - reorder goals based on priority
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        return { ...goal, priority: 1 }; // Set priority as 1 for demo
      }
      return goal;
    });

    setGoals(updatedGoals);
  };

  // Calculate progress for each goal
  useEffect(() => {
    const updatedGoals = goals.map(goal => {
      const monthsLeft = differenceInMonths(goal.targetDate, new Date());
      const projectedAmount = goal.monthlyContribution * monthsLeft;
      const progress = (projectedAmount / goal.targetAmount) * 100;
      return { ...goal, progress };
    });

    setGoals(updatedGoals);
  }, [goals]);

  // Function to calculate difference in months
  const differenceInMonths = (date1, date2) => {
    const diff = (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24 * 30.4375); // Average month length
    return Math.round(diff);
  };

  return (
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl text-center font-bold mb-4">Goal Planning Module</h1>
    <div className="mt-10 border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen overflow-y-auto">
    <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
    Add Goal Planning </h2>
      {/* Goal Form */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 mt-2">Add a New Goal</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block mb-1">Goal Name</label>
            <input
              type="text"
              placeholder="Enter goal name"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Target Amount</label>
            <input
              type="number"
              placeholder="Enter target amount"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Monthly Savings Contribution</label>
            <input
              type="number"
              placeholder="Enter monthly contribution"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Target Completion Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        </div>
        <button onClick={addGoal} className="bg-blue-500 text-white p-2 rounded mt-2">
          Add Goal
        </button>
      </div>

      {/* List of Goals */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">List of Goals</h2>
        {goals.map(goal => (
          <div key={goal.id} className="border p-4 mb-2">
            <p className="font-semibold">{goal.name}</p>
            <p>Target Amount: ${goal.targetAmount}</p>
            <p>Monthly Contribution: ${goal.monthlyContribution}</p>
            <p>Target Completion Date: {goal.targetDate.toLocaleDateString()}</p>
            <p>Progress: {goal.progress.toFixed(2)}%</p>
            <button onClick={() => handlePriority(goal.id)} className="bg-yellow-500 text-white p-2 rounded mt-2">
              Set Priority
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddGoalPlanning