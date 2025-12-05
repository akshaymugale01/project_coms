import React, { useEffect, useState } from "react";
import TextFields from "../../containers/Inputs/TextFields";
import FileInput from "../../Buttons/FileInput";
import TimeHourPicker from "../../containers/TimeHourPicker";
import TimeMinPicker from "../../containers/TimeMinPicker";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { FaCheck, FaTrash } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import { Switch } from "../../Buttons";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { getFacitilitySetup, postFacitilitySetup } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Setup from "../Setup";
import { checkbox } from "@material-tailwind/react";

const SetupHotelBooking = () => {
  const [allowMultipleSlots, setAllowMultipleSlots] = useState("no");

  const handleSelectChange = (e) => {
    setAllowMultipleSlots(e.target.value);
  };
  const themeColor = useSelector((state) => state.theme.color);
  const sitID = getItemInLocalStorage("SITEID");
  const navigate = useNavigate();
  const initialCgstNo = "";
  const initialSgst = "";
  const initialGst = Number(initialCgstNo) + Number(initialSgst);
  const [formData, setFormData] = useState({
    hotel: {
      site_id: sitID,
      fac_type: "",
      fac_name: "",
      member_charges: "",
      book_before: "",
      disclaimer: "",
      cancellation_policy: "",
      cutoff_min: "",
      return_percentage: "",
      create_by: "",
      active: true,
      is_hotel: true, //boolean to indicate hotel setup
      member_price_adult: "",
      member_price_child: "",
      guest_price_adult: "",
      guest_price_child: "",
      tenant_price_child: "",
      tenant_price_adult: "",
      book_before_days: "",
      book_before_hours: "",
      book_before_mins: "",
      advance_days: "",
      advance_hours: "",
      advance_mins: "",
      cancel_before_days: "",
      cancel_before_hours: "",
      cancel_before_mins: "",
      consecutive_slot_allowed: false,
      no_of_days: "",
      min_people: "",
      max_people: "",
      cancel_before: "",
      terms: "",
      fixed_amount: "",
      is_fixed: "",
      prepaid: false,
      postpaid: false,
      advance_booking: "",
      deposit: "",
      description: "",
      max_slots: "",
      member: false,
      guest: false,
      tenant: false,
      pay_on_facility: false,
      gst_no: initialCgstNo,
      sgst: initialSgst,
      gst: initialGst,
    },
    covers: [],
    attachments: [],
  });

  console.log("DATA:", formData);

  // const fecthFacitySetup = async() => {
  //   try {
  //    const fetchAPI = await getFacitilitySetup()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   fecthFacitySetup();
  // },[]) // [] for

  const postAmenitiesSetup = async () => {
    // Validate required fields
    if (!formData.hotel.gst_no || !formData.hotel.fac_type) {
      toast.error(
        "All fields are mandatory! Please provide GST number, Facility Type"
      );
      return; // Stop the function if validation fails
    }
    const postData = new FormData();
    const gst = Number(formData.gst_no) + Number(formData.sgst);
    postData.append("amenity[gst]", gst);
    // Append covers as an array
    if (formData.covers.length > 0) {
      formData.covers.forEach((file) => {
        postData.append("cover_images[]", file); // Use "cover_images[]" for Rails to recognize it as an array
      });
    }
    // Append attachments as an array
    if (formData.attachments.length > 0) {
      formData.attachments.forEach((file) => {
        postData.append("attachments[]", file); // Use "attachments[]" for Rails to recognize it as an array
      });
    }
    // Append hotel fields
    Object.entries(formData.hotel).forEach(([key, value]) => {
      // Handle arrays like payment_methods separately
      if (Array.isArray(value)) {
        value.forEach((item) => {
          postData.append(`amenity[${key}][]`, item); // For arrays
        });
      } else {
        postData.append(`amenity[${key}]`, value); // For regular fields
      }
    });

    try {
      const response = await postFacitilitySetup(postData);
      console.log(response);

      toast.success("Hotel setup successfully!");
      navigate("/setup/facility");
    } catch (error) {
      console.error(error);
      toast.error("Failed to post hotel setup. Please try again.");
    }
  };
  const handleCheckboxChange = (type) => {
    setFormData((prevState) => ({
      ...prevState,
      hotel: {
        ...prevState.hotel,
        [type]: prevState.hotel[type] === null ? true : null, // Toggle between true and null
      },
    }));
  };
  const handlePriceChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      hotel: {
        ...prevState.hotel,
        [field]: value,
      },
    }));
  };
  const handleFileChange = (event, key) => {
    const files = Array.from(event.target.files); // Convert FileList to an Array
    setFormData((prevState) => ({
      ...prevState,
      [key]: [...(prevState[key] || []), ...files], // Append new files to the existing array
    }));
  };
  const handleHotelChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      hotel: {
        ...prev.hotel,
        [field]: value,
      },
    }));
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      // Update the specific field
      const updatedFormData = {
        ...prevData,
        hotel: {
          ...prevData.hotel,
          [name]: value,
        },
      };

      // Dynamically calculate total minutes for time fields
      const calculateTotalMinutes = (prefix) => {
        const days = parseInt(updatedFormData.hotel[`${prefix}_days`]) || 0;
        const hours = parseInt(updatedFormData.hotel[`${prefix}_hours`]) || 0;
        const minutes = parseInt(updatedFormData.hotel[`${prefix}_mins`]) || 0;
        return days * 24 * 60 + hours * 60 + minutes;
      };
      if (name.includes("book_before")) {
        updatedFormData.hotel.book_before =
          calculateTotalMinutes("book_before");
      } else if (name.includes("advance")) {
        updatedFormData.hotel.advance_booking =
          calculateTotalMinutes("advance");
      } else if (name.includes("cancel_before")) {
        updatedFormData.hotel.cancel_before =
          calculateTotalMinutes("cancel_before");
      }

      return updatedFormData;
    });
  };
  // Validate Inputs
  const validateInput = (e) => {
    const { name, value } = e.target;
    const intValue = parseInt(value);

    if (isNaN(intValue) || intValue < 0) {
      toast.error(`${name.replace("_", " ")} must be a positive number.`);
      return;
    }

    if (name.includes("days") && intValue > 365) {
      toast.error(`${name.replace("_", " ")} cannot exceed 365 days.`);
    } else if (name.includes("hours") && intValue > 24) {
      toast.error(`${name.replace("_", " ")} cannot exceed 24 hours.`);
    } else if (name.includes("mins") && intValue > 59) {
      toast.error(`${name.replace("_", " ")} cannot exceed 59 minutes.`);
    }
  };

  //new
  const [rules, setRules] = useState([{ timesPerDay: "", selectedOption: "" }]);
  const options = ["Members", "Guests", "Tenant", "Staff", "Others"];
  const handleOptionChange = (index, field, value) => {
    const updatedRules = [...rules];
    updatedRules[index][field] = value;
    setRules(updatedRules);
  };

  const handleRemoveRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleAddRule = () => {
    if (rules.length < 4) {
      setRules([...rules, { timesPerDay: "", selectedOption: "" }]);
    }
  };

  const handelRadioChange = (e) => {
    setFormData({
      ...formData,
      hotel: {
        ...formData.hotel,
        fac_type: e.target.value,
      },
    });
  };

  const handlePaymentRadioChange = (e) => {
    const value = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      hotel: {
        ...prevFormData.hotel,
        prepaid: value === "prepaid",
        postpaid: value === "postpaid",
      },
    }));
  };

  const handleDescriptionChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      hotel: {
        ...formData.hotel,
        description: value, // Update description in the state
      },
    });
  };
  //handle tearms
  const handleTermsChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      hotel: {
        ...formData.hotel,
        terms: value, // Update terms in the state
      },
    });
  };
  // Handle cancellation policy change
  const handleCancellationPolicyChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      hotel: {
        ...formData.hotel,
        cancellation_policy: value, // Update cancellation policy in the state
      },
    });
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full bg-gray-100 p-4 mb-5">
        <h1
          style={{ background: "rgb(17, 24, 39)" }}
          className="bg-black text-white font-semibold rounded-md text-center p-2"
        >
          Setup Hotel Booking
        </h1>

        <div className="flex  gap-4 my-4">
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              name="type"
              id="bookable"
              value="bookable"
              checked={formData.hotel.fac_type === "bookable"}
              onChange={handelRadioChange}
            />
            <label htmlFor="bookable" className="text-lg">
              Bookable
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              name="type"
              id="request"
              value="request"
              onChange={handelRadioChange}
              checked={formData.hotel.fac_type === "request"}
            />
            <label htmlFor="request" className="text-lg">
              Request
            </label>
          </div>
        </div>

        <div>
          <h2 className="border-b border-black text-lg  font-medium my-3">
            Hotel Details
          </h2>
          <div className="grid md:grid-cols-4 gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-medium">
                Hotel name
              </label>
              <input
                type="text"
                name="fac_name"
                id=""
                value={formData.hotel.fac_name}
                onChange={(e) => handleHotelChange("fac_name", e.target.value)}
                className="border border-gray-400 rounded-md p-2"
                placeholder="Hotel name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="active" className="font-medium">
                Active
              </label>
              <select
                name="active"
                id="active"
                className="border rounded-md border-gray-400 p-2"
                value={formData.hotel.active ? "true" : "false"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    hotel: {
                      ...prevData.hotel,
                      active: e.target.value === "true",
                    },
                  }))
                }
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
        </div>
        <div className="my-4">
          <div className="flex gap-4 border-b border-black items-center mt-4">
            <span className="text-lg text-gray-800 ml-2">
              Prepaid
              <input
                type="radio"
                className="ml-2"
                name="payment_type"
                value="prepaid"
                checked={formData.hotel.prepaid}
                onChange={handlePaymentRadioChange}
              />
            </span>
            <span className="text-lg text-gray-800 ml-2">
              Postpaid
              <input
                type="radio"
                className="ml-2"
                name="payment_type"
                value="postpaid"
                checked={formData.hotel.postpaid}
                onChange={handlePaymentRadioChange}
              />
            </span>
          </div>
        </div>
        <div className="my-4">
          <h2 className="border-b border-black font-medium text-lg">
            Fee Setup
          </h2>
          <div className="border rounded-lg bg-blue-50 p-1 my-2">
            <div className="grid grid-cols-4 border-b border-gray-400">
              <p className="text-center font-medium">Member Type</p>
              <p className="text-center font-medium">Adult</p>
              <p className="text-center font-medium"> Child</p>
              <p className="text-center font-medium"> Flat Amount</p>
            </div>
            {/* Member Section */}
            <div className="grid grid-cols-4 items-center border-b">
              <div className="flex justify-center my-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hotel.member === true}
                    onChange={() => handleCheckboxChange("member")}
                  />
                  Member
                </label>
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="number"
                  min={0}
                  disabled={!formData.hotel.member}
                  value={formData.hotel.member_price_adult || ""}
                  onChange={(e) =>
                    handlePriceChange("member_price_adult", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="number"
                  min={0}
                  disabled={!formData.hotel.member}
                  value={formData.hotel.member_price_child || ""}
                  onChange={(e) =>
                    handlePriceChange("member_price_child", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="number"
                  min={0}
                  // disabled={
                  //   !(
                  //     (formData.hotel.fac_type === "request" &&
                  //       formData.hotel.postpaid === true) ||
                  //     formData.hotel.prepaid
                  //   )
                  // }
                  value={formData.hotel.fixed_amount || ""}
                  onChange={(e) =>
                    handlePriceChange("fixed_amount", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
            </div>

            {/* Guest Section */}
            <div className="grid grid-cols-4 items-center border-b">
              <div className="flex justify-center my-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hotel.guest === true}
                    onChange={() => handleCheckboxChange("guest")}
                  />
                  Guest
                </label>
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="number"
                  min={0}
                  disabled={!formData.hotel.guest}
                  value={formData.hotel.guest_price_adult || ""}
                  onChange={(e) =>
                    handlePriceChange("guest_price_adult", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="number"
                  min={0}
                  disabled={!formData.hotel.guest}
                  value={formData.hotel.guest_price_child || ""}
                  onChange={(e) =>
                    handlePriceChange("guest_price_child", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
            </div>

            {/* Tenant Section */}
            <div className="grid grid-cols-4 items-center border-b">
              <div className="flex justify-center my-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hotel.tenant === true}
                    onChange={() => handleCheckboxChange("tenant")}
                  />
                  Tenant
                </label>
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="number"
                  min={0}
                  disabled={!formData.hotel.tenant}
                  value={formData.hotel.tenant_price_adult || ""}
                  onChange={(e) =>
                    handlePriceChange("tenant_price_adult", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="number"
                  min={0}
                  disabled={!formData.hotel.tenant}
                  value={formData.hotel.tenant_price_child || ""}
                  onChange={(e) =>
                    handlePriceChange("tenant_price_child", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center border-b">
              {/* Checkbox */}
              <div className="flex justify-center my-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hotel.pay_on_facility === true}
                    onChange={() => handleCheckboxChange("pay_on_facility")}
                  />
                  Pay On Facility
                </label>
              </div>
              {/* GST Input */}
              <div className="flex items-center space-x-11">
                <label htmlFor="gst_no" className="font-medium p-2">
                  CGST
                </label>
                <input
                  type="number"
                  name="gst_no"
                  id="gst_no"
                  min={0}
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="CGST(%)"
                  value={formData.hotel.gst_no || ""} // Add GST to the state if necessary
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      hotel: {
                        ...prevState.hotel,
                        gst_no: e.target.value, // Add GST handler
                      },
                    }))
                  }
                />
              </div>

              {/* SGST Input */}
              <div className="flex items-center space-x-12">
                <label className="font-medium" htmlFor="sgst">
                  SGST
                </label>
                <input
                  type="number"
                  id="sgst"
                  value={formData.hotel.sgst || ""}
                  onChange={(e) => handlePriceChange("sgst", e.target.value)}
                  name="sgst"
                  step="0.01"
                  min={0}
                  placeholder="Enter SGST"
                  className="border border-gray-400 rounded p-2 outline-none"
                />
              </div>
              <div></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="my-2 flex flex-col gap-2">
                <label htmlFor="min_people" className="font-medium">
                  Minimum person allowed
                </label>
                <input
                  type="number"
                  name="min_people"
                  id="min_people"
                  min={1}
                  className="border rounded-md p-2"
                  placeholder="Minimum person allowed"
                  value={formData.hotel.min_people}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-2 flex flex-col gap-2">
                <label htmlFor="max_people" className="font-medium">
                  Maximum person allowed
                </label>
                <input
                  type="number"
                  name="max_people"
                  id="max_people"
                  min={1}
                  className="border rounded-md p-2"
                  placeholder="Maximum person allowed"
                  value={formData.hotel.max_people}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-y">
          {/* Booking Allowed Before */}
          <div className="grid grid-cols-4 items-center border-b px-4 gap-2">
            <div className="flex justify-center my-2">
              <label
                htmlFor="book_before_days"
                className="flex items-center gap-2"
              >
                Booking allowed before
              </label>
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                name="book_before_days"
                value={formData.hotel.book_before_days || ""}
                min={0}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Day"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                name="book_before_hours"
                value={formData.hotel.book_before_hours || ""}
                min={0}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Hour"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                name="book_before_mins"
                value={formData.hotel.book_before_mins || ""}
                min={0}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Mins"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
          </div>

          {/* Advance Booking */}
          <div className="grid grid-cols-4 items-center border-b px-4 gap-2">
            <div className="flex justify-center my-2">
              <label htmlFor="advance_days" className="flex items-center gap-2">
                Advance Booking
              </label>
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                name="advance_days"
                value={formData.hotel.advance_days || ""}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Day"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                name="advance_hours"
                value={formData.hotel.advance_hours || ""}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Hour"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                name="advance_mins"
                value={formData.hotel.advance_mins || ""}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Mins"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
          </div>

          {/* Can Cancel Before Schedule */}
          <div className="grid grid-cols-4 items-center px-4 gap-2">
            <div className="flex justify-center my-2">
              <label
                htmlFor="cancel_before_days"
                className="flex items-center gap-2"
              >
                Can Cancel Before Schedule
              </label>
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                name="cancel_before_days"
                value={formData.hotel.cancel_before_days || ""}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Day"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                name="cancel_before_hours"
                value={formData.hotel.cancel_before_hours || ""}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Hour"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="number"
                name="cancel_before_mins"
                value={formData.hotel.cancel_before_mins || ""}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Mins"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center px-4 gap-2">
            <div className="flex items-center gap-2 my-2">
              <label
                htmlFor="consecutive_slot_allowed"
                className="flex items-center ml-12"
              >
                Consecutive booking allowed
              </label>
              <input
                type="checkbox"
                id="consecutive_slot_allowed"
                checked={formData.hotel.consecutive_slot_allowed}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hotel: {
                      ...prev.hotel,
                      consecutive_slot_allowed: e.target.checked,
                      // Reset no_of_days if unchecked
                      no_of_days: e.target.checked ? prev.hotel.no_of_days : "",
                    },
                  }))
                }
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            {formData.hotel.consecutive_slot_allowed && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Number of days"
                  value={formData.hotel.no_of_days || ""}
                  min={1}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      hotel: {
                        ...prev.hotel,
                        no_of_days: e.target.value,
                      },
                    }))
                  }
                  className="border border-gray-400 rounded-md p-2 outline-none w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="my-4">
          <h2 className="border-b border-black text-lg mb-1 font-medium">
            Cover Images
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "covers")}
          />
        </div>

        <div className="my-4">
          <h2 className="border-b border-black text-lg mb-1 font-medium">
            Attachments
          </h2>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "attachments")}
          />
        </div>

        <div>
          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              id="description"
              cols="80"
              rows="3"
              className="border border-gray-400 p-1 placeholder:text-sm rounded-md"
              value={formData.hotel.description} // Bind value to state
              onChange={handleDescriptionChange} // Handle change
              placeholder="Enter a description..."
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col">
            <label htmlFor="terms" className="font-medium">
              Terms & Conditions
            </label>
            <textarea
              id="terms"
              rows="3"
              className="border border-gray-400 p-1 placeholder:text-sm rounded-md"
              value={formData.hotel.terms} // Bind value to state
              onChange={handleTermsChange} // Handle change
              placeholder="Enter terms and conditions..."
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col my-4">
            <label htmlFor="cancellation_policy" className="font-medium">
              Cancellation Policy
            </label>
            <textarea
              id="cancellation_policy"
              rows="3"
              className="border border-gray-400 p-1 placeholder:text-sm rounded-md"
              value={formData.hotel.cancellation_policy} // Bind value to state
              onChange={handleCancellationPolicyChange} // Handle change
              placeholder="Enter cancellation policy..."
            />
          </div>
        </div>

        <div className="flex justify-center my-2">
          <button
            style={{ background: themeColor }}
            className=" text-white p-2 px-4 font-semibold rounded-md flex items-center gap-2"
            onClick={postAmenitiesSetup}
          >
            <FaCheck /> Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default SetupHotelBooking;
