import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { RiDeleteBin5Line } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { postCamBill, getFloors, getUnits, getAddressSetup } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

function AddCAMBilling() {
  const buildings = getItemInLocalStorage("Building");
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  const [billingPeriod, setBillingPeriod] = useState([null, null]);
  const [invoiceAdd, setInvoiceAdd] = useState([]);
  const [formData, setFormData] = useState({
    invoice_type: "",
    invoiceAddress: "",
    invoice_number: "",
    dueDate: "",
    dateSupply: "",
    block: "",
    floor_name: "",
    flat: "",
    notes: "",
  });
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

    // Prevent special characters for certain fields
    let cleanedValue = value;
    if (
      name === "description" ||
      name === "sacHsnCode" ||
      name === "unit"
    ) {
      cleanedValue = value.replace(/[^a-zA-Z0-9 ]/g, "");
    }

    // Update the field value
    updatedFields[index][name] = cleanedValue;

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

    if (name === "cgstRate") {
      const rateValue = parseFloat(value) || "";
      camBilling.cgstRate = rateValue;
      camBilling.cgstAmount = (camBilling.taxableValue * rateValue) / 100;

      // Automatically assign the same values to SGST
      camBilling.sgstRate = rateValue;
      camBilling.sgstAmount = (camBilling.taxableValue * rateValue) / 100;
    }

    // Calculate SGST separately (if needed)
    if (name === "sgstRate") {
      const rateValue = parseFloat(value) || "";
      camBilling.sgstRate = rateValue;
      camBilling.sgstAmount = (camBilling.taxableValue * rateValue) / 100;

      camBilling.cgstRate = rateValue;
      camBilling.cgstAmount = (camBilling.taxableValue * rateValue) / 100;
    }

    // Calculate IGST
    if (name === "igstRate") {
      const rateValue = parseFloat(value) || null;
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

  console.log("field Total", fields.total);

  const handleDateChange = (dates) => {
    const [start, end] = dates; // Destructure the selected start and end dates
    setBillingPeriod([start, end]); // Update the state
  };
  useEffect(() => {
    const fetchAddressSetup = async () => {
      try {
        const response = await getAddressSetup();
        setInvoiceAdd(response.data);
      console.log("Address Setup data:", response.data);
      } catch (err) {
        console.error("Failed to fetch Address Setup data:", err);
      }
    };

    fetchAddressSetup(); // Call the API
  }, []);

  const handleChange1 = async (e) => {
    const { name, value, type } = e.target;

    let cleanedValue = value;
    // Only allow letters, numbers, spaces, and basic punctuation in notes
    if (name === "notes") {
      cleanedValue = value.replace(/[^a-zA-Z0-9 .,!?'"()\-\n]/g, "");
    }

    // Fetch floors based on building ID
    const fetchFloor = async (buildingID) => {
      try {
        const response = await getFloors(buildingID);
        setFloors(
          response.data.map((item) => ({ name: item.name, id: item.id }))
        );
      } catch (error) {
        console.error("Error fetching floors:", error);
      }
    };
    // Fetch units based on floor ID
    const fetchUnit = async (floorID) => {
      try {
        const response = await getUnits(floorID);
        setUnits(
          response.data.map((item) => ({ name: item.name, id: item.id }))
        );
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    if (type === "select-one" && name === "block") {
      const buildingID = Number(value);
      await fetchFloor(buildingID); // Fetch floors for the selected block
      setFormData((prev) => ({
        ...prev,
        building_id: buildingID,
        block: value,
        floor_id: "", // Reset floor selection
        flat: "", // Reset unit selection
      }));
    } else if (type === "select-one" && name === "floor_name") {
      const floorID = Number(value);
      await fetchUnit(floorID); // Fetch units for the selected floor
      setFormData((prev) => ({
        ...prev,
        floor_id: floorID,
        floor_name: value,
        flat: "", // Reset unit selection
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: cleanedValue,
      }));
    }
  };

  // Determine if the "Flat" dropdown should be disabled
  const isFlatDisabled =
    !formData.block || !formData.floor_name || !units.length;

  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!formData.invoice_type) {
      toast.error("Invoice Type is required");
      return;
    }
    if (!formData.invoiceAddress) {
      toast.error("Invoice Address is required");
      return;
    }
    if (!formData.invoice_number) {
      toast.error("Invoice Number is required");
      return;
    }
    if (!formData.dueDate) {
      toast.error("Due Date is required");
      return;
    }
    if (!formData.block) {
      toast.error("Block is required");
      return;
    }
    if (!formData.floor_name) {
      toast.error("Floor is required");
      return;
    }
    if (!formData.flat) {
      toast.error("Flat is required");
      return;
    }
    const sendData = new FormData();
    sendData.append("cam_bill[invoice_type]", formData.invoice_type);
    sendData.append("cam_bill[invoice_address_id]", formData.invoiceAddress);
    sendData.append("cam_bill[invoice_number]", formData.invoice_number);
    sendData.append("cam_bill[due_date]", formData.dueDate);
    sendData.append("cam_bill[supply_date]", formData.dateSupply);
    sendData.append("cam_bill[building_id]", formData.block);
    sendData.append("cam_bill[floor_id]", formData.floor_name);
    sendData.append("cam_bill[unit_id]", formData.flat);
    sendData.append("cam_bill[due_amount]", previousDueAmount);
    sendData.append("cam_bill[due_amount_interst]", previousDueAmountInterest);
    sendData.append("cam_bill[note]", formData.notes);
    if (billingPeriod[0] && billingPeriod[1]) {
      const startDate = billingPeriod[0].toISOString().split("T")[0]; // Format: YYYY-MM-DD
      const endDate = billingPeriod[1].toISOString().split("T")[0]; // Format: YYYY-MM-DD
      sendData.append("cam_bill[bill_period_start_date]", startDate);
      sendData.append("cam_bill[bill_period_end_date]", endDate);
    } else {
      sendData.append("cam_bill[bill_period_start_date]", "");
      sendData.append("cam_bill[bill_period_end_date]", "");
    }
    fields.forEach((item) => {
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][description]",
        item.description
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][hsn_id]",
        item.sacHsnCode
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][quantity]",
        item.qty
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][unit]",
        item.unit
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][rate]",
        item.rate
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][total_value]",
        item.totalValue
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][discount_percent]",
        item.percentage
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][discount_amount]",
        item.discount
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][taxable_value]",
        item.taxableValue
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][cgst_rate]",
        item.cgstRate
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][cgst_amount]",
        item.cgstAmount
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][sgst_rate]",
        item.sgstRate
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][sgst_amount]",
        item.sgstAmount
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][igst_rate]",
        item.igstRate
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][igst_amount]",
        item.igstAmount
      );
      sendData.append(
        "cam_bill[cam_bill_charges_attributes][][total]",
        item.total
      );
    });
    try {
      const billResp = await postCamBill(sendData);
      toast.success("Cam Bill Added Successfully");
      navigate("/cam_bill/billing");
      console.log(billResp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex  flex-col overflow-hidden">
        <h2
          style={{ background: "rgb(3 19 37)" }}
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
                  id="InvoiceType"
                  value={formData.invoice_type}
                  onChange={handleChange1}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="" disabled>
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
                  name="invoiceAddress"
                  id=" invoiceAddress"
                  value={formData.invoiceAddress}
                  onChange={handleChange1}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="" disabled selected>
                    Select Address
                  </option>
                  {invoiceAdd.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.title}
                    </option>
                  ))}
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
                  value={formData.invoice_number}
                  onChange={handleChange1}
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
                  name="dueDate"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange1}
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
                  name="dateSupply"
                  id="dateSupply"
                  value={formData.dateSupply}
                  onChange={handleChange1}
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
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  onChange={handleChange1}
                  value={formData.block}
                  name="block"
                >
                  <option value="">Select Building</option>
                  {buildings?.map((building) => (
                    <option key={building.id} value={building.id}>
                      {building.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="Floor" className="font-semibold my-2">
                  Floor
                </label>
                <select
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  onChange={handleChange1}
                  value={formData.floor_name}
                  name="floor_name"
                  disabled={!floors.length} // Disable if no floors are available
                >
                  <option value="">Select Floor</option>
                  {floors.map((floor) => (
                    <option key={floor.id} value={floor.id}>
                      {floor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="Flat" className="font-semibold my-2">
                  Flat
                </label>
                <select
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  onChange={handleChange1}
                  value={formData.flat}
                  name="flat"
                  disabled={isFlatDisabled} // Disable if no building, floor, or units are available
                >
                  <option value="">Select Flat</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
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
                  name="previousDueAmount"
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
                  name="previousDueAmountInterest"
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
                      type="number"
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
                style={{ background: "rgb(3 19 34)" }}
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
                <label htmlFor="notes" className="font-semibold my-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  cols="5"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange1}
                  placeholder="Enter extra notes"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-center my-8 gap-2 ">
              <button
                onClick={handleSubmit}
                style={{ background: "rgb(3 19 36)" }}
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
