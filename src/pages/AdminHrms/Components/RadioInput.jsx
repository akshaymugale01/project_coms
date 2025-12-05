import React from "react";

const RadioInput = ({
  label,
  required,
  checkedYes,
  onChangeYes,
  checkedNo,
  onChangeNo,
  name,
  yesId,
  noId,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700  font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            checked={checkedYes}
            onChange={onChangeYes}
            name={name}
            id={yesId}
          />
          <label htmlFor={yesId}>Yes</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            checked={checkedNo}
            onChange={onChangeNo}
            name={name}
            id={noId}
          />
          <label htmlFor={noId}>No</label>
        </div>
      </div>
    </div>
  );
};

export default RadioInput;
