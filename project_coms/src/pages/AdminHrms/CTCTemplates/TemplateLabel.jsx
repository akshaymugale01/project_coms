import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TemplateLabel = ({ onBack, onNext }) => {
  const themeColor = useSelector((state) => state.theme.color);
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/admin/hrms/ctc/CTC-Template");
  };
  const [label, setLabel] = useState("");
  const handleAddTemplateLabel = async () => {
    if (label) {
      return toast.error("Please Enter Template Label");
    }
    const postData = new FormData()
    postData.append("label", label)
    postData.append("", label)
  };
  return (
    <div className="my-10 p-2 w-full">
      <p className="font-bold mb-4">General Settings</p>
      <div className="flex flex-col w-96">
        <label htmlFor="" className="font-medium">
          Please enter the label for the CTC Template{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="m-2 border p-2 border-gray-300 w-full rounded-md"
          placeholder="CTC Template Label"
        />
      </div>
      <div className="flex justify-center m-4 gap-6">
        <button
          onClick={handleCancel}
          className="bg-red-400 text-white hover:bg-gray-700 font-medium py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={onNext}
          style={{ background: themeColor }}
          className="bg-black text-white hover:bg-gray-700 font-medium py-2 px-4 rounded"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default TemplateLabel;
