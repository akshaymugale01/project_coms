import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import LOIChanges from "./LOIChanges";
import ReactQuill from "react-quill";
import Select from "react-select";
import {
  getAllAddress,
  getSoftServices,
  getVendors,
  postServicePR,
} from "../../api";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../utils/localStorage";
const AddServicePR = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [showEntityList, setShowEntityList] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [BillingAddresses, setBillingAddresses] = useState([]);
  const [description, setDescription] = useState("");
  const [services, setServices] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [activities, setActivities] = useState([
    {
      inventory: "",
      SACCode: "",
      quantity: "",
      expectedDate: "",
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
  const [formData, setFormData] = useState({
    contractorId: "",
    date: "",
    billingAddressId: "",
    retentionPercentage: "",
    reference: "",
    tdcPercentage: "",
    qcPercentage: "",
    paymentTenure: "",
    advanceAmount: "",
    relatedTo: "",
    approvedStatus: false,
    attention: "",
    subject: "",
    description:"",
    terms_and_conditions:"",
    service_orders_attachfile:[]
  });


  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedActivities = [...activities];
    updatedActivities[index][name] = value;

    // Perform calculations for the specific activity being updated
    const activity = updatedActivities[index];
    if (name === "quantity" || name === "rate") {
      const quantity = name === "quantity" ? value : activity.quantity;
      const rate = name === "rate" ? value : activity.rate;

      activity.Amount = quantity * rate;

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
      activity.cgstAmount +
      activity.sgstAmount +
      activity.igstAmount +
      activity.TCSAmount;
    activity.Total =
      activity.Amount +
      activity.cgstAmount +
      activity.sgstAmount +
      activity.igstAmount +
      activity.TCSAmount;

    setActivities(updatedActivities);
  };

  const handleAddActivity = () => {
    setActivities([
      ...activities,
      {
        inventory: "",
        SACCode: "",
        quantity: "",
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
  };

  const handleFileChange = (files, fieldName) => {
    
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
  };

  const handleDeleteActivity = (index) => {
    const removeActivities = [...activities];
    removeActivities.splice(index, 1);
    setActivities(removeActivities);
  };
  const handleDescriptionChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };
  const handleTermsChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      terms_and_conditions: value,
    }));
  };

  const handleRadioChange = (event) => {
    setShowEntityList(event.target.value === "client");
  };
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const supplierResp = await getVendors();
        setSuppliers(supplierResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchBillingAddress = async () => {
      try {
        const addressResp = await getAllAddress();
        setBillingAddresses(addressResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchServices = async () => {
      try {
        const servicesResp = await getSoftServices();
        const transformedData = servicesResp.data.map((serv) => ({
          value: serv.id,
          label: serv.name,
        }));
        console.log(transformedData);
        setServices(transformedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuppliers();
    fetchBillingAddress();
    fetchServices();
  }, []);

  var handleChangeSelectMeeting = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
  };

  const UserId = getItemInLocalStorage("UserId");
  const siteId = getItemInLocalStorage("SITEID");
  const handleServicePr = async () => {
    if (
      formData.contractorId === "" ||
      formData.date === "" ||
      formData.billingAddressId === "" ||
      formData.relatedTo === ""
    ) {
      return toast.error("Please Provide Required Fields!");
    }

    const sendData = new FormData();
    sendData.append("service_order[site_id]", siteId);
    sendData.append("service_order[vendor_id]", formData.contractorId);
    sendData.append("service_order[service_order_date]", formData.date);
    sendData.append(
      "service_order[billing_address_id]",
      formData.billingAddressId
    );
    sendData.append("service_order[retention]", formData.retentionPercentage);
    sendData.append("service_order[tds]", formData.tdcPercentage);
    sendData.append("service_order[qc]", formData.qcPercentage);
    sendData.append("service_order[payment_tenure]", formData.paymentTenure);
    sendData.append("service_order[advance_amount]", formData.advanceAmount);
    sendData.append("service_order[related_to]", formData.relatedTo);
    sendData.append("service_order[kind_attention]", formData.attention);
    sendData.append("service_order[subject]", formData.subject);
    sendData.append("service_order[description]", formData.description);
    sendData.append("service_order[terms_and_conditions]", formData.terms_and_conditions);

    sendData.append("service_order[created_by_id]", UserId);
    sendData.append("service_order[reference]", formData.reference);
    // sendData.append("service_order[total_amount]", formData.)
    sendData.append("service_order[approved_status]", formData.approvedStatus);

    formData.service_orders_attachfile.forEach((file)=>{
      sendData.append("attachfiles[]", file)
    })
    activities.forEach((item, index) => {
      sendData.append(
        `service_order[loi_service][][service_detail_id]`,
        selectedOption.value
      );
      sendData.append(`service_order[loi_service][][sac_code]`, item.SACCode);
      sendData.append(`service_order[loi_service][][quantity]`, item.quantity);
      sendData.append(
        `service_order[loi_service][][expected_date]`,
        item.expectedDate
      );
      
      sendData.append(`service_order[loi_service][][uom]`, item.UOM);
      sendData.append(`service_order[loi_service][][rate]`, item.rate);
      sendData.append(
        `service_order[loi_service][][csgt_rate]`,
        item.cgstRate
      );
      sendData.append(
        `service_order[loi_service][][csgt_amt]`,
        item.cgstAmount
      );
      sendData.append(
        `service_order[loi_service][][sgst_rate]`,
        item.sgstRate
      );
      sendData.append(
        `service_order[loi_service][][sgst_amt]`,
        item.sgstAmount
      );
      sendData.append(
        `service_order[loi_service][][igst_rate]`,
        item.igstRate
      );
      sendData.append(
        `service_order[loi_service][][igst_amt]`,
        item.igstAmount
      );
      sendData.append(`service_order[loi_service][][tcs_rate]`, item.TCSRate);
      sendData.append(`service_order[loi_service][][tcs_amt]`, item.TCSAmount);
      sendData.append(`service_order[loi_service][][tax_amt]`, item.TaxAmount);
      sendData.append(`service_order[loi_service][][amount]`, item.Amount);
      sendData.append(
        `service_order[loi_service][][total_amount]`,
        item.Total
      );
    });
    try {
      const resp = await postServicePR(sendData);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <div className="m-2">
        <div className="lg::mx-20 my-5 mb-10 sm:border border-gray-400 p-5 lg:px-10 rounded-lg sm:shadow-xl">
          <h2
            style={{ background: themeColor }}
            className="text-center text-xl font-bold p-2 rounded-full  text-white"
          >
            New Service PR
          </h2>
          {/* <h1 className="font-semibold">Requestor Details :</h1> */}

          <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
            <h2 className="border-b my-2 border-black mb-6 font-bold">
              WORK ORDER DETAILS
            </h2>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="supplier"
                  >
                    Select Contractor <span className="text-red-400">*</span>
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="supplier"
                    value={formData.contractorId}
                    onChange={handleChange}
                    name="contractorId"
                  >
                    <option value="">Select Contractor</option>
                    {suppliers.map((vendor) => (
                      <option value={vendor.id} key={vendor.id}>
                        {vendor.company_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="plant-detail"
                  >
                    Plant Detail*
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="plant-detail"
                  >
                    <option>Select Plant Detail</option>
                  </select>
                </div> */}

                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="pr-date"
                  >
                    LOI Date<span className="text-red-400">*</span>
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="pr-date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    name="date"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="billing-address"
                  >
                    Billing Address<span className="text-red-400">*</span>
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="billing-address"
                    value={formData.billingAddressId}
                    name="billingAddressId"
                    onChange={handleChange}
                  >
                    <option value="">Select Billing Address</option>
                    {BillingAddresses.map((address) => (
                      <option value={address.id} key={address.id}>
                        {address.address_title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1">
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
                    placeholder="Enter Number"
                    value={formData.retentionPercentage}
                    onChange={handleChange}
                    name="retentionPercentage"
                  />
                </div>

                <div className="col-span-1">
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
                    placeholder="Enter Number"
                    value={formData.tdcPercentage}
                    name="tdcPercentage"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-1">
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
                    placeholder="Enter Number"
                    value={formData.qcPercentage}
                    onChange={handleChange}
                    name="qcPercentage"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="payment-tenure"
                  >
                    Payment Tenure(In Days)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="payment-tenure"
                    type="text"
                    placeholder="Enter Number"
                    value={formData.paymentTenure}
                    name="paymentTenure"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="advance-amount"
                  >
                    Advance Amount
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="advance-amount"
                    type="text"
                    placeholder="Enter Number"
                    value={formData.advanceAmount}
                    name="advanceAmount"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="related-to"
                >
                  Related To<span className="text-red-400">*</span>
                </label>
                <textarea
                  name="relatedTo"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Related To"
                  value={formData.relatedTo}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          {/* <div className="  my-5 p-5 shadow-md rounded-md border border-gray-300"> */}

          <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
            <h3 className="border-b border-black mb-6 font-bold">
              BOQ Details
            </h3>
            {activities.map((activity, index) => (
              <div key={index} className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="col-span-1">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor={`activity-${index}`}
                    >
                      Select Service
                    </label>
                    <Select
                      options={services}
                      onChange={handleChangeSelectMeeting}
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor={`sub-activity-${index}`}
                    >
                      SAC/HSN Code
                    </label>
                    <input
                      type="text"
                      id=""
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="SAC/HSN Code"
                      value={activity.SACCode}
                      name="SACCode"
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor={`sub-activity-${index}`}
                    >
                      Expected Date
                    </label>
                    <input
                      type="date"
                      name="expectedDate"
                      id=""
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={activity.expectedDate}
                      onChange={(e) => handleInputChange(e, index)}
                    />
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
                      pattern="[0-9]*"
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight"
                        ) {
                          e.preventDefault();
                        }
                      }}
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
                      pattern="[0-9]*"
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight"
                        ) {
                          e.preventDefault();
                        }
                      }}
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
                        pattern="[0-9]*"
                        onKeyDown={(e) => {
                          if (
                            !/[0-9]/.test(e.key) &&
                            e.key !== "Backspace" &&
                            e.key !== "ArrowLeft" &&
                            e.key !== "ArrowRight"
                          ) {
                            e.preventDefault();
                          }
                        }}
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
                        pattern="[0-9]*"
                        onKeyDown={(e) => {
                          if (
                            !/[0-9]/.test(e.key) &&
                            e.key !== "Backspace" &&
                            e.key !== "ArrowLeft" &&
                            e.key !== "ArrowRight"
                          ) {
                            e.preventDefault();
                          }
                        }}
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
                        pattern="[0-9]*"
                        onKeyDown={(e) => {
                          if (
                            !/[0-9]/.test(e.key) &&
                            e.key !== "Backspace" &&
                            e.key !== "ArrowLeft" &&
                            e.key !== "ArrowRight"
                          ) {
                            e.preventDefault();
                          }
                        }}
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
                      pattern="[0-9]*"
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight"
                        ) {
                          e.preventDefault();
                        }
                      }}
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
                      pattern="[0-9]*"
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight"
                        ) {
                          e.preventDefault();
                        }
                      }}
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
                      pattern="[0-9]*"
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight"
                        ) {
                          e.preventDefault();
                        }
                      }}
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
                  value={formData.attention}
                  name="attention"
                  onChange={handleChange}
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
                  value={formData.subject}
                  onChange={handleChange}
                  name="subject"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mt-2 focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">

          
            <div className="mb-2">
              <label
                className=" text-sm font-medium text-gray-700"
                htmlFor="description"
              >
                Description
              </label>
              {/* <ReactQuill
                value={formData.description}
                onChange={handleDescriptionChange}
                // style={{ height: '100px' }}
                className="mt-1  w-full border-gray-300 rounded-md shadow-sm"
              /> */}
              <textarea name="description" onChange={handleChange} value={formData.description} id="" rows={4} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mt-2 focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div>
              <label
                className=" text-sm font-medium mt-14 text-gray-700"
                htmlFor="termsConditions"
              >
                Terms & Conditions
              </label>
              {/* <ReactQuill
                onChange={handleTermsChange}
                value={formData.terms_and_conditions}
                className="  w-full border-gray-300 mt-2  rounded-md shadow-sm"
              /> */}
               <textarea name="terms_and_conditions" onChange={handleChange} value={formData.terms_and_conditions} id="" rows={4} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mt-2 focus:outline-none focus:shadow-outline"></textarea>
            </div>
            </div>
          </div>
          {/* </div> */}
          <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
            ATTACHMENTS
          </h3>

          <FileInputBox  handleChange={(files) => handleFileChange(files, "service_orders_attachfile")}
                fieldName={"service_orders_attachfile"}
                isMulti={true} />

          <div className="sm:flex justify-center grid gap-2 my-5 ">
            <button
              className="bg-black text-white p-2 px-4 rounded-md font-medium"
              onClick={handleServicePr}
              style={{ background: themeColor }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddServicePR;
