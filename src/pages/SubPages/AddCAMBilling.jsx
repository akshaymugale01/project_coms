import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { RiDeleteBin5Line } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddCAMBilling() {
  const themeColor = useSelector((state) => state.theme.color);
  const [billingPeriod, setBillingPeriod] = useState([null, null]);
  const [fields, setFields] = useState([
    {
      description: "",
      sacHsnCode: "",
      qty: "",
      unit: "",
      rate: "",
      totalValue: "",
      percentage: "",
      discount: "",
      taxableValue: "",
      cgstRate: "",
      cgstAmount: "",
      sgstRate: "",
      sgstAmount: "",
      igstRate: "",
      igstAmount: "",
      total: "",
    },
  ]);

  const handleAdd = () => {
    setFields([
      ...fields,
      {
        description: "",
        sacHsnCode: "",
        qty: "",
        unit: "",
        rate: "",
        totalValue: "",
        percentage: "",
        discount: "",
        taxableValue: "",
        cgstRate: "",
        cgstAmount: "",
        sgstRate: "",
        sgstAmount: "",
        igstRate: "",
        igstAmount: "",
        total: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFields = [...fields];
    const camBilling = updatedFields[index];

    // Update the field value
    updatedFields[index][name] = value;

    // Update totalValue when qty or rate changes
    if (name === "qty" || name === "rate") {
      const qty =
        name === "qty"
          ? parseFloat(value) || 0
          : parseFloat(camBilling.qty) || 0;
      const rate =
        name === "rate"
          ? parseFloat(value) || 0
          : parseFloat(camBilling.rate) || 0;

      camBilling.totalValue = qty * rate;

      // Default taxableValue to totalValue initially
      camBilling.taxableValue = camBilling.totalValue;

      // If discount is applied, adjust taxableValue
      if (camBilling.discount) {
        camBilling.taxableValue = camBilling.totalValue - camBilling.discount;
      }

      // If percentage is applied, update discount and taxableValue
      if (camBilling.percentage) {
        camBilling.discount =
          (camBilling.percentage / 100) * camBilling.totalValue;
        camBilling.taxableValue = camBilling.totalValue - camBilling.discount;
      }
    }

    // Handle discount-to-percentage dependency
    if (name === "discount") {
      const discount = value ? parseFloat(value) : null;

      if (!isNaN(discount)) {
        // Correct NaN check
        camBilling.discount = discount;
        camBilling.percentage =
          camBilling.totalValue > 0
            ? (discount / camBilling.totalValue) * 100
            : 0;
        camBilling.taxableValue = camBilling.totalValue - discount;
      } else {
        camBilling.discount = 0; // Set discount to 0 if invalid
        camBilling.percentage = 0; // Reset percentage
        camBilling.taxableValue = camBilling.totalValue; // No discount applied
      }
    }

    // Handle percentage-to-discount dependency
    if (name === "percentage") {
      const percentage = value ? parseFloat(value) : null;

      if (!isNaN(percentage)) {
        camBilling.percentage = percentage;
        // Calculate the discount as a percentage of the total value
        camBilling.discount = (percentage / 100) * camBilling.totalValue;
        camBilling.taxableValue = camBilling.totalValue - camBilling.discount;
      } else {
        camBilling.percentage = 0; // Reset percentage if invalid
        camBilling.discount = 0; // Reset discount to 0
        camBilling.taxableValue = camBilling.totalValue; // No discount applied
      }
    }

    // Calculate CGST
    if (name === "cgstRate") {
      const rateValue = parseFloat(value) || isNaN;
      camBilling.cgstRate = rateValue;
      camBilling.cgstAmount = (camBilling.taxableValue * rateValue) / 100;
    }

    // Calculate SGST
    if (name === "sgstRate") {
      const rateValue = parseFloat(value) || isNaN;
      camBilling.sgstRate = rateValue;
      camBilling.sgstAmount = (camBilling.taxableValue * rateValue) / 100;
    }

    // Calculate IGST
    if (name === "igstRate") {
      const rateValue = parseFloat(value) || isNaN;
      camBilling.igstRate = rateValue;
      camBilling.igstAmount = (camBilling.taxableValue * rateValue) / 100;
    }

    // Calculate total
    camBilling.total =
      (parseFloat(camBilling.taxableValue) || 0) +
      (parseFloat(camBilling.cgstAmount) || 0) +
      (parseFloat(camBilling.sgstAmount) || 0) +
      (parseFloat(camBilling.igstAmount) || 0);

    // Update state
    setFields(updatedFields);
  };

  const [previousDueAmount, setPreviousDueAmount] = useState("");
  const [previousDueAmountInterest, setPreviousDueAmountInterest] =
    useState("");

  const handleChangePreviousDue = (e) => {
    const value = parseFloat(e.target.value) || "";
    if (e.target.id === "PreviousDueAmount") {
      setPreviousDueAmount(value);
    } else if (e.target.id === "PreviousDueAmountInterest") {
      setPreviousDueAmountInterest(value);
    }
  };

  const totalAmount =
    fields.reduce((sum, field) => sum + (parseFloat(field.total) || 0), 0) +
    previousDueAmount +
    previousDueAmountInterest;

  console.log(fields.total);

  const handleDateChange = (dates) => {
    const [start, end] = dates; // Destructure the selected start and end dates
    setBillingPeriod([start, end]); // Update the state
  };
  
  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex  flex-col overflow-hidden">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10"
        >
          Add CAM Billing
        </h2>
        <div className="flex justify-center">
          <div className="sm:border border-gray-400 p-1 md:px-10 rounded-lg w-4/5 mb-14">
            <div className="md:grid grid-cols-3 gap-5 my-3">
              <div className="flex flex-col">
                <label htmlFor="InvoiceType" className="font-semibold my-2">
                  Invoice Type
                </label>
                <select
                  name="invoice_type"
                  id=" InvoiceType"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="" disabled selected>
                    Select Invoice Type
                  </option>
                  <option value="cam">CAM</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="invoiceAddress" className="font-semibold my-2">
                  Invoice Address
                </label>
                <select
                  name="invoice_address"
                  id=" invoiceAddress"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="" disabled selected>
                    Select Address
                  </option>
                  <option value="headOffice">head Office</option>
                  <option value="vibe1">Vibe1</option>
                  <option value="vibe2">Vibe2</option>
                </select>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="invoiceNumber" className="font-semibold my-2">
                  Invoice Number
                </label>
                <input
                  type="text"
                  name="invoice_number"
                  id="invoiceNumber"
                  placeholder="Enter Phone Number "
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="dueDate" className="font-semibold my-2">
                  Due Date
                </label>
                <input
                  type="date"
                  name=""
                  id="dueDate"
                  placeholder="Enter Due Date"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="dateSupply" className="font-semibold my-2">
                  Date of supply
                </label>
                <input
                  type="date"
                  name=""
                  id="dateSupply"
                  placeholder="Enter Date of supply"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="billingPeriod" className="font-semibold my-2">
                  Billing Period
                </label>
                <DatePicker
                  selectsRange
                  startDate={billingPeriod[0]} 
                  endDate={billingPeriod[1]} 
                  onChange={handleDateChange} 
                  placeholderText="Select Billing Period"
                  className="border p-1 px-4 border-gray-500 rounded-md w-full"
                  isClearable 
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="Block" className="font-semibold my-2">
                  Block
                </label>
                <select
                  name="block"
                  id=" Block"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Tower</option>
                  <option value="a">A</option>
                  <option value="tesla">Tesla</option>
                  <option value="imperia">Imperia</option>
                  <option value="open space">Open space</option>
                  <option value="fm">FM</option>
                  <option value="t1">T1</option>
                  <option value="t2">T2</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="Flat" className="font-semibold my-2">
                  Flat
                </label>
                <select
                  name="flat"
                  id=" Flat"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Flat</option>
                </select>
              </div>
              <div className="flex flex-col ">
                <label
                  htmlFor="PreviousDueAmount"
                  className="font-semibold my-2"
                >
                  Previous Due Amount
                </label>
                <input
                  type="number"
                  name=""
                  id="PreviousDueAmount"
                  placeholder="Enter Previous Due Amount"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={previousDueAmount}
                  onChange={handleChangePreviousDue}
                />
              </div>
              <div className="flex flex-col ">
                <label
                  htmlFor="PreviousDueAmountInterest"
                  className="font-semibold my-2"
                >
                  Previous Due Amount Interest
                </label>
                <input
                  type="number"
                  name=""
                  id="PreviousDueAmountInterest"
                  placeholder="Enter Previous Due Amount Interest"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={previousDueAmountInterest}
                  onChange={handleChangePreviousDue}
                />
              </div>
            </div>
            <h2 className="border-b border-black my-5 font-semibold text-xl">
              Charges
            </h2>
            <div>
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="md:grid grid-cols-3 gap-5 my-3 border p-5 rounded-md"
                >
                  <div className="flex flex-col">
                    <label
                      htmlFor={`desc-${index}`}
                      className="font-semibold my-2"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      id={`desc-${index}`}
                      name="description"
                      placeholder="Enter Description"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.description}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`shCode-${index}`}
                      className="font-semibold my-2"
                    >
                      SAC/HSN Code
                    </label>
                    <input
                      type="text"
                      id={`shCode-${index}`}
                      name="sacHsnCode"
                      placeholder="Enter SAC/HSN Code"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.sacHsnCode}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`quantity-${index}`}
                      className="font-semibold my-2"
                    >
                      Qty
                    </label>
                    <input
                      type="number"
                      name="qty"
                      id={`quantity-${index}`}
                      placeholder="Enter Qty"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.qty}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`unit-${index}`}
                      className="font-semibold my-2"
                    >
                      Unit
                    </label>
                    <input
                      type="number"
                      id={`unit-${index}`}
                      placeholder="Enter Unit"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.unit}
                      name="unit"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`rate-${index}`}
                      className="font-semibold my-2"
                    >
                      Rate
                    </label>
                    <input
                      type="number"
                      name="rate"
                      id={`rate-${index}`}
                      placeholder="Enter Rate"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.rate}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`totalValue-${index}`}
                      className="font-semibold my-2"
                    >
                      Total Value
                    </label>
                    <input
                      type="number"
                      id={`totalValue-${index}`}
                      placeholder="Enter Total Value"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.totalValue}
                      name="totalValue"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`percentage-${index}`}
                      className="font-semibold my-2"
                    >
                      Discount/Percentage
                    </label>
                    <input
                      type="number"
                      id={`percentage-${index}`}
                      placeholder="Enter Percentage"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.percentage}
                      name="percentage"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`discount-${index}`}
                      className="font-semibold my-2"
                    >
                      Discount/Amount
                    </label>
                    <input
                      type="number"
                      id={`discount-${index}`}
                      placeholder="Enter Amount"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.discount}
                      name="discount"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`taxableValue-${index}`}
                      className="font-semibold my-2"
                    >
                      Taxable Value
                    </label>
                    <input
                      type="number"
                      id={`taxableValue-${index}`}
                      placeholder="Enter Taxable Value"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.taxableValue}
                      name="taxableValue"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`cgstRate-${index}`}
                      className="font-semibold my-2"
                    >
                      CGST Rate
                    </label>
                    <input
                      type="number"
                      id={`cgstRate-${index}`}
                      placeholder="Enter CGST Rate"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.cgstRate}
                      name="cgstRate"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`cgstAmount-${index}`}
                      className="font-semibold my-2"
                    >
                      CGST Amount
                    </label>
                    <input
                      type="number"
                      id={`cgstAmount-${index}`}
                      placeholder="Enter CGST Amount"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.cgstAmount}
                      readOnly
                      name="cgstAmount"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`sgstRate-${index}`}
                      className="font-semibold my-2"
                    >
                      SGST Rate
                    </label>
                    <input
                      type="number"
                      id={`sgstRate-${index}`}
                      placeholder="Enter SGST Rate"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.sgstRate}
                      name="sgstRate"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`sgstAmount-${index}`}
                      className="font-semibold my-2"
                    >
                      SGST Amount
                    </label>
                    <input
                      type="number"
                      id={`sgstAmount-${index}`}
                      placeholder="Enter SGST Amount"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.sgstAmount}
                      name="sgstAmount"
                      readOnly
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`igstRate-${index}`}
                      className="font-semibold my-2"
                    >
                      IGST Rate
                    </label>
                    <input
                      type="number"
                      id={`igstRate-${index}`}
                      placeholder="Enter IGST Rate"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.igstRate}
                      name="igstRate"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`igstAmount-${index}`}
                      className="font-semibold my-2"
                    >
                      IGST Amount
                    </label>
                    <input
                      type="number"
                      id={`igstAmount-${index}`}
                      placeholder="Enter IGST Amount"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.igstAmount}
                      name="igstAmount"
                      readOnly
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`total-${index}`}
                      className="font-semibold my-2"
                    >
                      Total
                    </label>
                    <input
                      type="number"
                      id={`total-${index}`}
                      placeholder="Enter Total"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={field.total}
                      name="total"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>

                  <div className="flex justify-start items-center mt-8">
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between gap-2 ">
              <button
                style={{ background: themeColor }}
                className="bg-black text-white p-2 px-4 rounded-md font-medium"
                onClick={handleAdd}
              >
                Add
              </button>
              <button className="bg-black text-white p-2 px-4 rounded-md font-medium">
                Total Amount : {totalAmount}
              </button>
            </div>
            <div className="md:grid grid-cols-2 gap-5 my-3">
              <div className="flex flex-col col-span-2">
                <label htmlFor="" className="font-semibold my-2">
                  Notes
                </label>
                <textarea
                  name=""
                  id=""
                  cols="5"
                  rows="3"
                  placeholder="Enter extra notes"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-center my-8 gap-2 ">
              <button
                style={{ background: themeColor }}
                className="bg-black text-white p-2 px-4 rounded-md font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddCAMBilling;
