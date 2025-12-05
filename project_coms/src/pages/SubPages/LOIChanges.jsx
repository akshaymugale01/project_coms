import { useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate } from "react-router-dom";
import LOIProceed from "./LOIProceed";

const LOIChanges = () => {
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };
  const themeColor = useSelector((state) => state.theme.color);
  const [activities, setActivities] = useState([
    {
      inventory: "",
      SACCode: "",
      quantity: "",
      unit: "",
      UOM: "",
      rate: "",
      cgstRate: "",
      cgstAmount: "",
      sgstRate: "",
      sgstAmount: "",
      igstRate: "",
      igstAmount: "",
      TCSRate: "",
      TCSAmount: "",
      TaxAmount: "",
      Amount: "",
      Total: "",
    },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedActivities = [...activities];
    updatedActivities[index][name] = value;

    // Perform calculations for the specific activity being updated
    const activity = updatedActivities[index];
    if (name === "quantity" || name === "rate" || name === "UOM") {
      const quantity = name === "quantity" ? value : activity.quantity;
      const rate = name === "rate" ? value : activity.rate;
      const UOM = name === "UOM" ? value : activity.UOM;

      activity.Amount = quantity * rate * UOM;

      const cgstRate = parseFloat(activity.cgstRate);
      const sgstRate = parseFloat(activity.sgstRate);
      if (!isNaN(cgstRate)) {
        activity.cgstAmount = (activity.Amount * cgstRate) / 100;
      }
      if (!isNaN(sgstRate)) {
        activity.sgstAmount = (activity.Amount * sgstRate) / 100;
      }
    }

    if (name === "cgstRate" || name === "sgstRate") {
      const rateValue = parseFloat(value);
      if (!isNaN(rateValue)) {
        activity.cgstRate = rateValue;
        activity.sgstRate = rateValue;
        activity.cgstAmount = (activity.Amount * rateValue) / 100;
        activity.sgstAmount = (activity.Amount * rateValue) / 100;
      }
    }
    if (name === "igstRate") {
      const rateValue = parseFloat(value);
      if (!isNaN(rateValue)) {
        activity.igstRate = rateValue;
        activity.igstAmount = (activity.Amount * rateValue) / 100;
      }
    }
    if (name === "TCSRate") {
      const rateValue = parseFloat(value);
      if (!isNaN(rateValue)) {
        activity.TCSRate = rateValue;
        activity.TCSAmount = (activity.Amount * rateValue) / 100;
      }
    }

    activity.TaxAmount =
      parseFloat(activity.cgstAmount) +
      parseFloat(activity.sgstAmount) +
      parseFloat(activity.igstAmount) +
      parseFloat(activity.TCSAmount);
    activity.Total =
      parseFloat(activity.Amount) +
      parseFloat(activity.cgstAmount) +
      parseFloat(activity.sgstAmount) +
      parseFloat(activity.igstAmount) +
      parseFloat(activity.TCSAmount);

    setActivities(updatedActivities);
  };

  const handleAddActivity = () => {
    setActivities([
      ...activities,
      {
        inventory: "",
        SACCode: "",
        quantity: "",
        unit: "",
        rate: "",
        cgstRate: "",
        cgstAmount: "",
        sgstRate: "",
        sgstAmount: "",
        igstRate: "",
        igstAmount: "",
        TCSRate: "",
        TCSAmount: "",
        TaxAmount: "",
        Amount: "",
        Total: "",
      },
    ]);
  };

  const handleDeleteActivity = (index) => {
    const removeActivities = [...activities];
    removeActivities.splice(index, 1);
    setActivities(removeActivities);
  };
  return (
    <div className=" mx-3 my-5 p-5 shadow-md rounded-md border border-gray-300">
      <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
        BOQ Details
      </h3>

      <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
        {activities.map((activity, index) => (
          <div key={index} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={`activity-${index}`}
                >
                  Service Description
                </label>

                <input
                  type="text"
                  placeholder="Service Description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={`sub-activity-${index}`}
                >
                  SAC/HSN Code
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`sub-activity-${index}`}
                  type="text"
                  placeholder="Select SAC/HSN Code"
                  name="SACCode"
                  onChange={(e) => handleInputChange(e, index)}
                >
                  <option value="">100</option>
                  <option value="">101</option>
                </select>
              </div>
              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={`sub-activity-${index}`}
                >
                  Quantity/Area
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`sub-activity-${index}`}
                  type="text"
                  value={activity.quantity}
                  placeholder="Quantity"
                  name="quantity"
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={`sub-activity-${index}`}
                >
                  UOM
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`sub-activity-${index}`}
                  type="text"
                  value={activity.UOM}
                  placeholder="UOM"
                  name="UOM"
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>

              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={`sub-activity-${index}`}
                >
                  Rate
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`sub-activity-${index}`}
                  type="text"
                  placeholder="Rate"
                  value={activity.rate}
                  name="rate"
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={`sub-activity-${index}`}
                >
                  CGST Rate
                </label>
                <div className="flex items-center gap-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`sub-activity-${index}`}
                    type="text"
                    placeholder="CGST Rate(%)"
                    value={activity.cgstRate}
                    name="cgstRate"
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <input
                    className="shadow appearance-none border rounded bg-gray-100 w-full cursor-not-allowed py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`sub-activity-${index}`}
                    type="text"
                    placeholder="CGST Amt"
                    name="cgstAmount"
                    value={activity.cgstAmount}
                    readOnly
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={`sub-activity-${index}`}
                >
                  SGST Rate
                </label>
                <div className="flex items-center gap-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`sub-activity-${index}`}
                    type="text"
                    placeholder="SGST Rate"
                    value={activity.sgstRate}
                    name="sgstRate"
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 cursor-not-allowed text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`sub-activity-${index}`}
                    type="text"
                    placeholder="SGST Amt"
                    value={activity.sgstAmount}
                    name="sgstAmount"
                    readOnly
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={`sub-activity-${index}`}
                >
                  IGST Rate
                </label>
                <div className="flex items-center gap-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                    id={`sub-activity-${index}`}
                    type="text"
                    placeholder="IGST rate(%)"
                    value={activity.igstRate}
                    name="igstRate"
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 cursor-not-allowed text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`sub-activity-${index}`}
                    type="text"
                    placeholder="IGST Amt"
                    value={activity.igstAmount}
                    name="igstAmount"
                    readOnly
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={`sub-activity-${index}`}
                >
                  TCS Rate
                </label>
                <div className="flex items-center gap-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`sub-activity-${index}`}
                    type="text"
                    placeholder="TCS rate(%)"
                    name="TCSRate"
                    value={activity.TCSRate}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 cursor-not-allowed text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`sub-activity-${index}`}
                    type="text"
                    placeholder="TCS Amt"
                    name="TCSAmount"
                    value={activity.TCSAmount}
                    readOnly
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={`sub-activity-${index}`}
                >
                  Tax Amount
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`sub-activity-${index}`}
                  type="text"
                  placeholder="Tax Amount"
                  name="TaxAmount"
                  value={activity.TaxAmount}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={`sub-activity-${index}`}
                >
                  Amount
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`sub-activity-${index}`}
                  type="text"
                  placeholder="Amount"
                  value={activity.Amount}
                  name="Amount"
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={`sub-activity-${index}`}
                >
                  Total Amount
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`sub-activity-${index}`}
                  type="text"
                  placeholder="Total"
                  name="Total"
                  value={activity.Total}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            </div>

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleDeleteActivity(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleAddActivity}
          >
            Add Items
          </button>
        </div>
      </div>

      <div className="w-full mx-3 my-5 p-5 shadow-lg  rounded-lg border border-gray-300">
        <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
          Terms And Other Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="col-span-1">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="kindAttention"
            >
              Kind Attention
            </label>
            <input
              type="text"
              id="kindAttention"
              placeholder="kind Attention"
              name="kindAttention"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mt-2 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="col-span-1">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              placeholder="Subject"
              type="text"
              id="subject"
              name="subject"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mt-2 focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-2">
          <label
            className=" text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <ReactQuill
            value={description}
            onChange={handleDescriptionChange}
            tyle={{ minHeight: "200px" }}
            className="mt-1  w-full border-gray-300  rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            className=" text-sm font-medium mt-14 text-gray-700"
            htmlFor="termsConditions"
          >
            Terms & Conditions
          </label>
          <ReactQuill
            // onChange={handleDescriptionChange}
            className="  w-full border-gray-300 mt-2  rounded-md shadow-sm"
          />
        </div>
      </div>
      <div className="flex gap-5 justify-center items-center my-4">
        <button
          onClick={() => setIsModalOpen(true)}
          style={{ background: themeColor }}
          className="bg-black text-white hover:bg-gray-700 font-medium py-2 px-4 rounded"
        >
          Preview
        </button>
        {/* {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
            <div className="bg-white p-5 max-h-[90%] overflow-y-auto hide-scrollbar  rounded-md shadow-md w-2/3">
              <LOIProceed />

              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )} */}
        {/* <Link to="/admin/loi-proceed" style={{ background: themeColor }} className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 text-white items-center rounded-md">
                   Preview
                </Link> */}
        <button
          style={{ background: themeColor }}
          className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default LOIChanges;
