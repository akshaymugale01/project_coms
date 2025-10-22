import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import {
  getAllAddress,
  getInventory,
  getLOIItems,
  getStandardUnits,
  getVendors,
  postLOI,
  postLOIItems,
} from "../../api";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../utils/localStorage";
import LOIChanges from "./LOIChanges";
// import LOIProceed from "./LOIProceed"x;
import LOIPOProceed from "./LOIPOProceed";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
const AddLoi = () => {
  const [scheduleFor, setScheduleFor] = useState("PO");
  const themeColor = "rgb(3 19 37)";
  // const [showEntityList, setShowEntityList] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [units, setUnits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activities, setActivities] = useState([
    {
      inventory: "",
      quantity: "",
      unit: "",
      rate: "",
      Amount: "",
    },
  ]);

  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    type: "PO",
    relatedTo: "",
    retentionPercentage: "",
    TDS: "",
    QC: "",
    paymentTenure: "",
    advanceAmount: "",
    billingAddress: "",
    deliveryAddress: "",
    terms: "",
    vendor_id: "",
    attachments: [],
  });
  console.log("formData", formData);
  console.log("activities", activities);

  useEffect(() => {
    const fetchStandardUnits = async () => {
      try {
        const unitResp = await getStandardUnits();
        const unitData = unitResp?.data || [];
        setUnits(Array.isArray(unitData) ? unitData : []);
      } catch (error) {
        console.log(error);
        setUnits([]);
      }
    };
    fetchStandardUnits();
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedActivities = [...activities];
    updatedActivities[index][name] = value;

    const activity = updatedActivities[index];
    if (name === "quantity" || name === "rate") {
      const quantity = name === "quantity" ? value : activity.quantity;
      const rate = name === "rate" ? value : activity.rate;
      activity.Amount = quantity * rate;
    }

    setActivities(updatedActivities);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchAllAddress = async () => {
      try {
        const addressResp = await getAllAddress();
        const addressData = addressResp?.data || [];
        setAddresses(Array.isArray(addressData) ? addressData : []);
        console.log(addressResp);
      } catch (error) {
        console.log(error);
        setAddresses([]);
      }
    };
    const fetchInventory = async () => {
      try {
        const inventoryResp = await getInventory();
        console.log("STOCKS", inventoryResp);
        const inventoryData = inventoryResp?.data?.items || [];
        // Normalize response - handle both array and wrapped payload
        const normalizedStocks = Array.isArray(inventoryData)
          ? inventoryData
          : inventoryData?.stocks || inventoryData?.inventory || [];
        setStocks(normalizedStocks);
      } catch (error) {
        console.log(error);
        setStocks([]);
      }
    };
    fetchAllAddress();

    fetchInventory();
  }, []);

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
  const siteId = getItemInLocalStorage("SITEID");
  const userId = getItemInLocalStorage("UserId");

  const navigate = useNavigate();
  const handleLoiSubmit = async () => {
    if (
      formData.date === "" ||
      formData.deliveryAddress === "" ||
      formData.billingAddress === ""
    ) {
      return toast.error("Please provide the required details");
    }

    let isValid = true;
    activities.forEach((activity) => {
      if (!activity.inventory) {
        isValid = false;
      }
    });
    if (!isValid) {
      return toast.error("Inventory is required");
    }

    const sendData = new FormData();
    sendData.append("loi_detail[site_id]", siteId);
    sendData.append("loi_detail[created_by_id]", userId);
    sendData.append("loi_detail[loi_type]", formData.type);
    sendData.append("loi_detail[loi_date]", formData.date);

    sendData.append("loi_detail[related_to]", formData.relatedTo);

    sendData.append("loi_detail[billing_address_id]", formData.billingAddress);
    sendData.append(
      "loi_detail[delivery_address_id]",
      formData.deliveryAddress
    );
    formData.attachments.forEach((file) => {
      sendData.append("attachfiles[]", file);
    });
    activities.forEach((item) => {
      sendData.append("loi_detail[loi_items][][item_id]", item.inventory);
      sendData.append("loi_detail[loi_items][][quantity]", item.quantity);
      sendData.append("loi_detail[loi_items][][standard_unit_id]", item.unit);
      sendData.append("loi_detail[loi_items][][rate]", item.rate);
      sendData.append("loi_detail[loi_items][][amount]", item.Amount);
    });

    try {
      const resp = await postLOI(sendData);
      navigate("/admin/purchase/loi");
      toast.success("LOI Created Successfully");
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (files, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
  };

  return (
    <section className="flex">
      <div className="md:block hidden">
        <Navbar />
      </div>
      <div className=" w-full  flex md:mx-2 overflow-hidden flex-col">
        <div className="m-2">
          <h2
            style={{ background: themeColor }}
            className="text-center text-xl font-bold p-2 rounded-full text-white"
          >
            New LOI
          </h2>
          <div className="flex sm:flex-row flex-col justify-around my-4 items-center">
            {/* <div className="grid grid-cols-4 items-center">
              <p className="font-semibold">For :</p>
              <div className="flex gap-5">
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                  <label
                    htmlFor="po"
                    className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                      scheduleFor === "PO" && "bg-black text-white"
                    }`}
                    onClick={() => setScheduleFor("PO")}
                  >
                    <input
                      type="radio"
                      name="type"
                      id="po"
                      className="hidden"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: "PO" })}
                    />
                    PO
                  </label>
                  <label
                    className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                      scheduleFor === "WO" && "bg-black text-white"
                    }`}
                    onClick={() => setScheduleFor("WO")}
                  >
                    <input
                      type="radio"
                      name="type"
                      id="wo"
                      className="hidden"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: "WO" })}
                    />
                    WO
                  </label>
                </div>
              </div>
            </div> */}
          </div>
          <div className="md:mx-20 my-5 mb-10 md:border border-gray-400 md:p-5 md:px-10 rounded-lg md:shadow-xl">
            <div className="w-full mx-3 my-5 p-5 md:shadow-lg rounded-lg md:border border-gray-300">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="col-span-1">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="date"
                    >
                      Select LOI Date{" "}
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="date"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="related"
                    >
                      Related To
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="related"
                      type="text"
                      name="relatedTo"
                      value={formData.relatedTo}
                      onChange={handleChange}
                      placeholder="Related To"
                    />
                  </div>
                  {/* <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="retention"
                  >
                    Retention(%)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="retention"
                    type="text"
                    name="retentionPercentage"
                    value={formData.retentionPercentage}
                    onChange={handleChange}
                    placeholder="Retention(%)"
                  />
                </div> */}
                  {/* <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="tds"
                  >
                    TDS(%)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tds"
                    type="text"
                    value={formData.TDS}
                    name="TDS"
                    onChange={handleChange}
                    placeholder="TDS(%)"
                  />
                </div> */}
                  {/* <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="qc"
                  >
                    QC(%)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="qc"
                    type="text"
                    name="QC"
                    value={formData.QC}
                    onChange={handleChange}
                    placeholder="QC(%)"
                  />
                </div> */}
                  {/* <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="payment"
                  >
                    Payment Tenure(In Days)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="payment"
                    type="text"
                    name="paymentTenure"
                    value={formData.paymentTenure}
                    onChange={handleChange}
                    placeholder="Payment Tenure"
                  />
                </div> */}
                  {/* <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="advance"
                  >
                    Advance Amount
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="unit"
                    type="advance"
                    name="advanceAmount"
                    value={formData.advanceAmount}
                    onChange={handleChange}
                    placeholder="Advance Amount"
                  />
                </div> */}

                  <div className="col-span-1">
                    <label className="block text-gray-700 font-bold mb-2">
                      Select Billing Address
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="contact-number"
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                    >
                      <option value="">Select billing address</option>
                      {addresses.map((address) => (
                        <option value={address.id} key={address.id}>
                          {address.address_title}
                        </option>
                      ))}
                    </select>
                  </div>
                  {scheduleFor === "PO" && (
                    <div className="col-span-1">
                      <label className="block text-gray-700 font-bold my-2">
                        Select Delivery Address
                      </label>
                      <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="site"
                        type="Select Delivery Address"
                        placeholder="Business Bay"
                        name="deliveryAddress"
                        value={formData.deliveryAddress}
                        onChange={handleChange}
                      >
                        <option value="">Select delivery address</option>
                        {addresses.map((address) => (
                          <option value={address.id} key={address.id}>
                            {address.address_title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                {/* <div className="w-full ">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="terms"
                >
                  Terms & Conditions
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="terms"
                  type="text"
                  rows={4}
                  name="terms"
                  value={formData.terms}
                  onChange={handleChange}
                  placeholder=""
                />
              </div> */}
              </div>
            </div>

            {scheduleFor === "PO" && (
              <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
                {activities.map((activity, index) => (
                  <div key={index} className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="col-span-1">
                        <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor={`activity-${index}`}
                        >
                          Item Details
                        </label>
                        <select
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id={`activity-${index}`}
                          type="text"
                          placeholder="Select Inventory"
                          name="inventory"
                          value={activity.inventory}
                          onChange={(e) => handleInputChange(e, index)}
                        >
                          <option value="">Select Inventory</option>
                          {stocks.map((stock) => (
                            <option value={stock.id} key={stock.id}>
                              {stock.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* <div className="col-span-1">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor={`sub-activity-${index}`}
                      >
                        SAC/HSN Code
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={`sub-activity-${index}`}
                        type="text"
                        placeholder="Select SAC/HSN Code"
                        name="SACCode"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div> */}
                      <div className="col-span-1">
                        <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor={`sub-activity-${index}`}
                        >
                          Quantity
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
                          Select Unit
                        </label>
                        <select
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id={`sub-activity-${index}`}
                          type="text"
                          value={activity.unit}
                          placeholder="Quantity"
                          name="unit"
                          onChange={(e) => handleInputChange(e, index)}
                        >
                          <option value="">Select Unit</option>
                          {units.map((unit) => (
                            <option value={unit.id} key={unit.id}>
                              {unit.unit_name}
                            </option>
                          ))}
                        </select>
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
                      {/* <div className="col-span-1">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor={`sub-activity-${index}`}
                      >
                        CGST
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
                    </div> */}
                      {/* 
                    <div className="col-span-1">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor={`sub-activity-${index}`}
                      >
                        SGST
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
                    </div> */}

                      {/* <div className="col-span-1">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor={`sub-activity-${index}`}
                      >
                        IGST
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
                    </div> */}

                      {/* <div className="col-span-1">
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
                    </div> */}
                      {/* 
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
                    </div> */}
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
                      {/* <div className="col-span-1">
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
                    </div> */}
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
                    Add Inventory
                  </button>
                </div>
                <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
                  ATTACHMENTS
                </h3>
                {/* <input type="file" /> */}
                <FileInputBox
                  handleChange={(files) =>
                    handleFileChange(files, "attachments")
                  }
                  fieldName={"attachments"}
                  isMulti={true}
                />
                <div className="sm:flex justify-center grid gap-2 my-5 ">
                  {/* <button
                    onClick={() => setIsModalOpen(true)}
                    style={{ background: themeColor }}
                    className="bg-black text-white hover:bg-gray-700 font-medium py-2 px-4 rounded"
                  >
                    Preview
                  </button> */}
                  {isModalOpen && (
                    <div
                      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center"
                      onClick={() => setIsModalOpen(false)}
                    >
                      <div className="bg-white p-5 max-h-[90%] overflow-y-auto hide-scrollbar  rounded-md shadow-md w-2/3">
                        <LOIPOProceed />

                        <div className="mt-2 flex justify-end">
                          <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-red-400 text-white font-medium p-2 px-4 rounded-md mx-2"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    className="bg-black text-white p-2 px-4 rounded-md font-medium"
                    onClick={handleLoiSubmit}
                    style={{ background: themeColor }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            {scheduleFor === "WO" && <LOIChanges />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddLoi;
