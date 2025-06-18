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
const SetupFacility = () => {
  const [allowMultipleSlots, setAllowMultipleSlots] = useState("no");

  const handleSelectChange = (e) => {
    setAllowMultipleSlots(e.target.value);
  };
  const themeColor = useSelector((state) => state.theme.color);
  const sitID = getItemInLocalStorage("SITEID");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amenity: {
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
      member_price_adult: "",
      member_price_child: "",
      guest_price_adult: "",
      guest_price_child: "",
      tenant_price_child: "",
      tenant_price_adult: "",
      min_people: "",
      max_people: "",
      cancel_before: "",
      terms: "",
      gst_no: "",
      fixed_amount: "",
      is_fixed: "",
      prepaid: false,
      postpaid: false,
      advance_booking: "",
      deposit: "",
      description: "",
      max_slots: "",
      member: null,
      guest: null,
      tenant: null,
      pay_on_facility: null,
      gst: "",
      sgst: "",
    },
    covers: [],
    attachments: [],
    slots: [
      {
        start_hr: "",
        end_hr: "",
        start_min: "",
        end_min: "",
      },
    ],
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
    if (
      !formData.amenity.gst_no ||
      !formData.amenity.fac_type ||
      formData.slots.length === 0
    ) {
      toast.error(
        "All fields are mandatory! Please provide GST number, Facility Type, and at least one slot."
      );
      return; // Stop the function if validation fails
    }
    const postData = new FormData();
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
    // Append amenity fields
    Object.entries(formData.amenity).forEach(([key, value]) => {
      // Handle arrays like payment_methods separately
      if (Array.isArray(value)) {
        value.forEach((item) => {
          postData.append(`amenity[${key}][]`, item); // For arrays
        });
      } else {
        postData.append(`amenity[${key}]`, value); // For regular fields
      }
    });
    // Append slots as an array with the correct structure
    formData.slots.forEach((slot, index) => {
      Object.entries(slot).forEach(([key, value]) => {
        postData.append(
          `amenity[amenity_slots_attributes][${index}][${key}]`,
          value
        );
      });
    });
    try {
      const response = await postFacitilitySetup(postData);
      console.log(response);

      toast.success("Amenity setup successfully!");
      navigate("/setup/facility");
    } catch (error) {
      console.error(error);
      toast.error("Failed to post amenity setup. Please try again.");
    }
  };
  const handleCheckboxChange = (type) => {
    setFormData((prevState) => ({
      ...prevState,
      amenity: {
        ...prevState.amenity,
        [type]: prevState.amenity[type] === null ? true : null, // Toggle between true and null
      },
    }));
  };
  const handlePriceChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      amenity: {
        ...prevState.amenity,
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
  const handleAmenityChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      amenity: {
        ...prev.amenity,
        [field]: value,
      },
    }));
  };
  const handleAddSlot = () => {
    setFormData((prevState) => ({
      ...prevState,
      slots: [
        ...prevState.slots,
        {
          start_hr: "", // Hour for start time
          start_min: "", // Minute for start time
          end_hr: "", // Hour for end time
          end_min: "", // Minute for end time
        },
      ],
    }));
  };

  const handleRemoveSlot = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      slots: prevState.slots.filter((_, i) => i !== index),
    }));
  };

  // Handle input change
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData((prevData) => {
  //     // Update the specific field in the formData
  //     const updatedFormData = {
  //       ...prevData,
  //       amenity: {
  //         ...prevData.amenity,
  //         [name]: value,
  //       },
  //     };

  //     // Construct the combined `book_before` value
  //     const { book_before_days, book_before_hours, book_before_mins } = updatedFormData.amenity;
  //     updatedFormData.amenity.book_before =
  //       parseInt(`${book_before_days || 0}${book_before_hours || 0}${book_before_mins || 0}`, 10);

  //     const { advance_days, advance_hours, advance_mins } = updatedFormData.amenity;
  //     updatedFormData.amenity.advance_booking =
  //       parseInt(`${advance_days || 0}${advance_hours || 0}${advance_mins || 0}`, 10);

  //     const { cancel_before_days, cancel_before_hours, cancel_before_min } = updatedFormData.amenity;
  //     updatedFormData.amenity.cancel_before =
  //       parseInt(`${cancel_before_days || 0}${cancel_before_hours || 0}${cancel_before_min || 0}`, 10);

  //     return updatedFormData;
  //   });
  // };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      // Update the specific field
      const updatedFormData = {
        ...prevData,
        amenity: {
          ...prevData.amenity,
          [name]: value,
        },
      };
      // Dynamically calculate total minutes for time fields
      const calculateTotalMinutes = (prefix) => {
        const days = parseInt(updatedFormData.amenity[`${prefix}_days`]) || 0;
        const hours = parseInt(updatedFormData.amenity[`${prefix}_hours`]) || 0;
        const minutes =
          parseInt(updatedFormData.amenity[`${prefix}_mins`]) || 0;
        return days * 24 * 60 + hours * 60 + minutes;
      };
      if (name.includes("book_before")) {
        updatedFormData.amenity.book_before =
          calculateTotalMinutes("book_before");
      } else if (name.includes("advance")) {
        updatedFormData.amenity.advance_booking =
          calculateTotalMinutes("advance");
      } else if (name.includes("cancel_before")) {
        updatedFormData.amenity.cancel_before =
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
  const [timeValues, setTimeValues] = useState({
    time1: "00:00",
    time2: "00:00",
    time3: "00:00",
  });

  const handleTimeChange = (e, timeKey) => {
    const { value } = e.target;
    setTimeValues((prev) => ({
      ...prev,
      [timeKey]: value,
    }));
  };
  const [subFacilities, setSubFacilities] = useState([
    { name: "", status: "" },
  ]);

  const handleAddSubFacility = () => {
    setSubFacilities([...subFacilities, { name: "", status: "" }]);
  };
  const handleRemoveSubFacility = (index) => {
    const updatedSubFacilities = subFacilities.filter((_, i) => i !== index);
    setSubFacilities(updatedSubFacilities);
  };

  const handleSubChange = (index, field, value) => {
    const updatedSubFacilities = subFacilities.map((subFacility, i) =>
      i === index ? { ...subFacility, [field]: value } : subFacility
    );
    setSubFacilities(updatedSubFacilities);
  };
  const [subFacilityAvailable, setSubFacilityAvailable] = useState(false);

  /*const [rules, setRules] = useState([{ selectedOption: "", timesPerDay: "" }]);
  const options = ["Flat", "User", "Tenant", "Owner"];
  const handleAddRule = () => {
    if (rules.length < 5) {
      setRules([...rules, { selectedOption: "", timesPerDay: "" }]);
    }
  };
  const handleOptionChange = (index, field, value) => {
    const updatedRules = rules.map((rule, i) =>
      i === index ? { ...rule, [field]: value } : rule
    );
    setRules(updatedRules);
  };

  const handleRemoveRule = (index) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
  };*/
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
  const [blockData, setBlockData] = useState({
    blockBy: "",
  });
  const handelRadioChange = (e) => {
    setFormData({
      ...formData,
      amenity: {
        ...formData.amenity,
        fac_type: e.target.value,
      },
    });
  };

  const handelPayemntRadioChange = (e) => {
    const value = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      amenity: {
        ...prevFormData.amenity,
        prepaid: value === "prepaid",
        postpaid: value === "postpaid",
      },
    }));
  };

  const handleSlotTimeChange = (index, timeType, timeValue) => {
    const [hours, minutes] = timeValue.split(":");

    setFormData((prevState) => {
      const updatedSlots = [...prevState.slots];
      updatedSlots[index] = {
        ...updatedSlots[index],
        [`${timeType}_hr`]: hours,
        [`${timeType}_min`]: minutes,
      };
      return { ...prevState, slots: updatedSlots };
    });
  };
  const handleDescriptionChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      amenity: {
        ...formData.amenity,
        description: value, // Update description in the state
      },
    });
  };
  //handle tearms
  const handleTermsChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      amenity: {
        ...formData.amenity,
        terms: value, // Update terms in the state
      },
    });
  };
  // Handle cancellation policy change
  const handleCancellationPolicyChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      amenity: {
        ...formData.amenity,
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
          Setup New Facility
        </h1>

        <div className="flex  gap-4 my-4">
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              name="type"
              id="bookable"
              value="bookable"
              checked={formData.amenity.fac_type === "bookable"}
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
              checked={formData.amenity.fac_type === "request"}
            />
            <label htmlFor="request" className="text-lg">
              Request
            </label>
          </div>
        </div>

        <div>
          <h2 className="border-b border-black text-lg  font-medium my-3">
            Facility Details
          </h2>
          <div className="grid md:grid-cols-4 gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-medium">
                Facility name
              </label>
              <input
                type="text"
                name="fac_name"
                id=""
                value={formData.amenity.fac_name}
                onChange={(e) =>
                  handleAmenityChange("fac_name", e.target.value)
                }
                className="border border-gray-400 rounded-md p-2"
                placeholder="Facility name"
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
                value={formData.amenity.active ? "true" : "false"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    amenity: {
                      ...prevData.amenity,
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
                checked={formData.amenity.prepaid} // Bind state for prepaid
                onChange={handelPayemntRadioChange}
              />
            </span>
            <span className="text-lg text-gray-800 ml-2">
              Postpaid
              <input
                type="radio"
                className="ml-2"
                name="payment_type"
                value="postpaid"
                checked={formData.amenity.postpaid} // Bind state for postpaid
                onChange={handelPayemntRadioChange}
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
                    checked={formData.amenity.member === true}
                    onChange={() => handleCheckboxChange("member")}
                  />
                  Member
                </label>
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="text"
                  disabled={!formData.amenity.member}
                  value={formData.amenity.member_price_adult || ""}
                  onChange={(e) =>
                    handlePriceChange("member_price_adult", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="text"
                  disabled={!formData.amenity.member}
                  value={formData.amenity.member_price_child || ""}
                  onChange={(e) =>
                    handlePriceChange("member_price_child", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="text"
                  disabled={
                    !(
                      formData.amenity.fac_type === "request" &&
                      formData.amenity.postpaid === true
                    )
                  }
                  value={formData.amenity.fixed_amount || ""}
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
                    checked={formData.amenity.guest === true}
                    onChange={() => handleCheckboxChange("guest")}
                  />
                  Guest
                </label>
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="text"
                  disabled={!formData.amenity.guest}
                  value={formData.amenity.guest_price_adult || ""}
                  onChange={(e) =>
                    handlePriceChange("guest_price_adult", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="text"
                  disabled={!formData.amenity.guest}
                  value={formData.amenity.guest_price_child || ""}
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
                    checked={formData.amenity.tenant === true}
                    onChange={() => handleCheckboxChange("tenant")}
                  />
                  Tenant
                </label>
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="text"
                  disabled={!formData.amenity.tenant}
                  value={formData.amenity.tenant_price_adult || ""}
                  onChange={(e) =>
                    handlePriceChange("tenant_price_adult", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
              <div className="flex justify-center my-2">
                <input
                  type="text"
                  disabled={!formData.amenity.tenant}
                  value={formData.amenity.tenant_price_child || ""}
                  onChange={(e) =>
                    handlePriceChange("tenant_price_child", e.target.value)
                  }
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="₹100"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center border-b p-2 gap-4">
              {/* Checkbox */}
              <div className="flex justify-center my-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.amenity.pay_on_facility === true}
                    onChange={() => handleCheckboxChange("pay_on_facility")}
                  />
                  Pay On Facility
                </label>
              </div>
              {/* GST Input */}
              {/* <div className="flex items-center space-x-2">
                <label htmlFor="gst">GST:</label>
                <input
                  type="number"
                  id="gst"
                  name="gst"
                  value={formData.amenity.gst || ""}
                  onChange={(e) =>
                    handlePriceChange("gst", e.target.value)
                  }
                  step="0.01"
                  placeholder="Enter GST"
                  className="border border-gray-400 rounded p-2 outline-none"
                />
              </div> */}
              <div className="flex items-center space-x-2">
                <label htmlFor="gst_no" className="font-medium">
                  GST
                </label>
                <input
                  type="number"
                  name="gst_no"
                  id="gst_no"
                  className="border border-gray-400 rounded p-2 outline-none"
                  placeholder="GST(%)"
                  value={formData.amenity.gst_no || ""} // Add GST to the state if necessary
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      amenity: {
                        ...prevState.amenity,
                        gst_no: e.target.value, // Add GST handler
                      },
                    }))
                  }
                />
              </div>

              {/* SGST Input */}
              <div className="flex items-center space-x-2">
                <label className="font-medium" htmlFor="sgst">
                  SGST:
                </label>
                <input
                  type="number"
                  id="sgst"
                  value={formData.amenity.sgst || ""}
                  onChange={(e) => handlePriceChange("sgst", e.target.value)}
                  name="sgst"
                  step="0.01"
                  placeholder="Enter SGST"
                  className="border border-gray-400 rounded p-2 outline-none"
                />
              </div>
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
                  className="border rounded-md p-2"
                  placeholder="Minimum person allowed"
                  value={formData.amenity.min_people}
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
                  className="border rounded-md p-2"
                  placeholder="Maximum person allowed"
                  value={formData.amenity.max_people}
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
                type="text"
                name="book_before_days"
                value={formData.amenity.book_before_days || ""}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Day"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="text"
                name="book_before_hours"
                value={formData.amenity.book_before_hours || ""}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Hour"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="text"
                name="book_before_mins"
                value={formData.amenity.book_before_mins || ""}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Mins"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />

              <input
                type="hidden"
                name="book_before"
                value={formData.amenity.book_before || ""}
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
                type="text"
                name="advance_days"
                value={formData.amenity.advance_days || ""}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Day"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="text"
                name="advance_hours"
                value={formData.amenity.advance_hours || ""}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Hour"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="text"
                name="advance_mins"
                value={formData.amenity.advance_mins || ""}
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
                type="text"
                name="cancel_before_days"
                value={formData.amenity.cancel_before_days || ""}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Day"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="text"
                name="cancel_before_hours"
                value={formData.amenity.cancel_before_hours || ""}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Hour"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
            <div className="flex justify-center my-2 w-full">
              <input
                type="text"
                name="cancel_before_mins"
                value={formData.amenity.cancel_before_mins || ""}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md p-2 outline-none w-full"
                placeholder="Mins"
                onBlur={validateInput} // Validate on losing focus
                maxLength="2" // Restrict input to a maximum of 2 characters
              />
            </div>
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
              value={formData.amenity.description} // Bind value to state
              onChange={handleDescriptionChange} // Handle change
              placeholder="Enter a description..."
            />
          </div>
        </div>

        <div className="my-4">
          <h2 className="border-b border-black text-lg mb-1 font-medium">
            Configure Slot
          </h2>

          {formData.slots.map((slot, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-2 bg-white my-2 rounded-lg"
            >
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Start time
                </label>
                <input
                  type="time"
                  placeholder="Start Time"
                  value={`${slot.start_hr}:${slot.start_min}`}
                  onChange={(e) =>
                    handleSlotTimeChange(index, "start", e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
                />
              </div>
              <div className="flex flex-col mx-3">
                <label htmlFor="" className="font-medium">
                  End Time
                </label>
                <input
                  type="time"
                  placeholder="End Time"
                  value={`${slot.end_hr}:${slot.end_min}`}
                  onChange={(e) =>
                    handleSlotTimeChange(index, "end", e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
                />
              </div>
              <div className="flex item-end justify-end">
                <button
                  type="button"
                  onClick={() => handleRemoveSlot(index)}
                  className="text-red-600 hover:text-red-800 p-2"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))}

          <div className="flex">
            <button
              type="button"
              onClick={handleAddSlot}
              className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <BiPlusCircle className="h-5 w-5 mr-2" />
              Add Slot
            </button>
          </div>
        </div>

        <div></div>

        <div>
          <div className="flex flex-col">
            <label htmlFor="terms" className="font-medium">
              Terms & Conditions
            </label>
            <textarea
              id="terms"
              rows="3"
              className="border border-gray-400 p-1 placeholder:text-sm rounded-md"
              value={formData.amenity.terms} // Bind value to state
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
              value={formData.amenity.cancellation_policy} // Bind value to state
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

export default SetupFacility;
