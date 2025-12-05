import React from "react";

const CriteriaSelection = ({ value, onChange }) => {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md p-1 px-2 bg-white"
      >
        <option value="">Select</option>
        <option value="amount">Amount</option>
        <option value="percentage">Percentage</option>
      </select>
    </div>
  );
};

export default CriteriaSelection;
