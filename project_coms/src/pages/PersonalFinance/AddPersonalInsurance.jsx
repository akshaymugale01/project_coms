import React, { useState } from 'react';

function AddPersonalInsurance() {
  // State variables
  const [personalInfo, setPersonalInfo] = useState({
    age: '',
    gender: '',
    maritalStatus: '',
  });
  const [dependents, setDependents] = useState({
    spouse: false,
    children: 0,
  });
  const [currentCoverage, setCurrentCoverage] = useState('');
  const [desiredCoverage, setDesiredCoverage] = useState('');
  const [premiumCost, setPremiumCost] = useState('');
  const [policyDetails, setPolicyDetails] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy submission logic - replace with actual implementation
    console.log({
      personalInfo,
      dependents,
      currentCoverage,
      desiredCoverage,
      premiumCost,
      policyDetails,
    });
    alert('Form submitted successfully!');
    // Clear form fields after submission
    clearForm();
  };

  // Clear form fields
  const clearForm = () => {
    setPersonalInfo({
      age: '',
      gender: '',
      maritalStatus: '',
    });
    setDependents({
      spouse: false,
      children: 0,
    });
    setCurrentCoverage('');
    setDesiredCoverage('');
    setPremiumCost('');
    setPolicyDetails('');
  };

  return (
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl text-center font-bold mb-4">Insurance Module</h1>
    <div className="mt-10 border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen overflow-y-auto">
    <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
    Insurance Module</h2>
      {/* Insurance Form */}
      <form onSubmit={handleSubmit} className="mt-2 mb-4">
        {/* Personal Information */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
          <div>
              <label className="block mb-1">Name</label>
              <input
                type="number"
                placeholder="Enter Name"
                value={personalInfo.age}
                onChange={(e) => setPersonalInfo({ ...personalInfo, age: e.target.value })}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Age</label>
              <input
                type="number"
                placeholder="Enter age"
                value={personalInfo.age}
                onChange={(e) => setPersonalInfo({ ...personalInfo, age: e.target.value })}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Gender</label>
              <select
                value={personalInfo.gender}
                onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                className="border p-2 w-full"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Marital Status</label>
              <select
                value={personalInfo.maritalStatus}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, maritalStatus: e.target.value })
                }
                className="border p-2 w-full"
                required
              >
                <option value="">Select</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dependent Information */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Dependent Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Spouse</label>
              <input
                type="checkbox"
                checked={dependents.spouse}
                onChange={(e) =>
                  setDependents({ ...dependents, spouse: e.target.checked })
                }
              />
            </div>
            <div>
              <label className="block mb-1">Children</label>
              <input
                type="number"
                placeholder="Enter number of children"
                value={dependents.children}
                onChange={(e) =>
                  setDependents({ ...dependents, children: e.target.value })
                }
                className="border p-2 w-full"
              />
            </div>
          </div>
        </div>

        {/* Current Insurance Coverage */}
        <div className="mb-4">
          <label className="block mb-1">Current Insurance Coverage</label>
          <textarea
            placeholder="Enter current coverage details"
            value={currentCoverage}
            onChange={(e) => setCurrentCoverage(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        {/* Desired Coverage */}
        <div className="mb-4">
          <label className="block mb-1">Desired Coverage Amount</label>
          <input
            type="number"
            placeholder="Enter desired coverage amount"
            value={desiredCoverage}
            onChange={(e) => setDesiredCoverage(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Premium Costs */}
        <div className="mb-4">
          <label className="block mb-1">Premium Costs</label>
          <input
            type="number"
            placeholder="Enter premium costs"
            value={premiumCost}
            onChange={(e) => setPremiumCost(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Policy Details */}
        <div className="mb-4">
          <label className="block mb-1">Policy Details</label>
          <textarea
            placeholder="Enter policy details (coverage limits, deductibles, exclusions)"
            value={policyDetails}
            onChange={(e) => setPolicyDetails(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPersonalInsurance