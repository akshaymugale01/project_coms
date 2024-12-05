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
const SetupFacility = () => {
  const [allowMultipleSlots, setAllowMultipleSlots] = useState("no");

  const handleSelectChange = (e) => {
    setAllowMultipleSlots(e.target.value);
  };
  const themeColor = useSelector((state) => state.theme.color);
  const [formData, setFormData] = useState({
    amenity: {
      site_id: "",
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
      min_people: "",
      max_people: "",
      cancel_before: "",
      terms: "",
      advance_min: "",
      deposit: "",
      description: "",
      max_slots: "",
    },
    slots: [
      {
        start_hr: "",
        end_hr: "",
        start_min: "",
        end_min: "",
      },
    ],
  });
  
  console.log("DATA",formData)
  
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
    const postData = new FormData();
  
    // Append amenity fields
    Object.entries(formData.amenity).forEach(([key, value]) => {
      postData.append(`amenity[${key}]`, value);
    });
  
    // Append slot fields as an array
    formData.slots.forEach((slot, index) => {
      Object.entries(slot).forEach(([key, value]) => {
        postData.append(`slots[][${key}]`, value);
      });
    });    
  
    try {
      const response = await postFacitilitySetup(postData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
  
  const [slots, setSlots] = useState([
    {
      id: 1,
      startTime: "",
      breakTimeStart: "",
      breakTimeEnd: "",
      endTime: "",
      concurrentSlots: "",
      slotBy: "",
      wrapTime: "",
    },
  ]);

  console.log("slots",slots)

  const handleAddSlot = () => {
    setFormData((prevState) => ({
      ...prevState,
      slots: [
        ...prevState.slots,
        {
          start_hr: "",      // Hour for start time
          start_min: "",     // Minute for start time
          end_hr: "",        // Hour for end time
          end_min: "",       // Minute for end time
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
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevState) => ({
      ...prevState,
      amenity: {
        ...prevState.amenity,
        [name]: value,
      },
    }));
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
  const [rules, setRules] = useState([
    { timesPerDay: "", selectedOption: "" },
  ]);

  const options = ["Members", "Guests", "Staff", "Others"];

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
      ...formData, amenity: {
        ...formData.amenity, fac_type: e.target.value,
      },
    });
  };

  const handleSlotTimeChange = (index, timeType, timeValue) => {
    const [hours, minutes] = timeValue.split(":");
  
    setFormData(prevState => {
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
      <div className="w-full p-4 mb-5">
        <h1
          style={{ background: 'rgb(17, 24, 39)' }}
          className="bg-black text-white font-semibold rounded-md text-center p-2"
        >
          Setup New Facility
        </h1>

        <div className="flex  gap-4 my-4">
          <div className="flex gap-2 items-center">
            <input type="radio" name="type" id="bookable"
            value="bookable"
            checked={formData.amenity.fac_type === "bookable"}
            onChange={handelRadioChange}
            />
            <label htmlFor="bookable" className="text-lg">
              Bookable
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <input type="radio" name="type" id="request" 
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
                onChange={(e) => handleAmenityChange("fac_name", e.target.value)}
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
    value={formData.amenity.active ? "yes" : "no"}
    onChange={(e) =>
      setFormData((prevData) => ({
        ...prevData,
        amenity: {
          ...prevData.amenity,
          active: e.target.value === "yes",
        },
      }))
    }
  >
    <option value="">Select</option>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>
</div>

            {/* <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-medium">
                Shareable
              </label>
              <select
                name=""
                id=""
                className="border rounded-md border-gray-400 p-2"
              >
                <option value="">Select </option>
                <option value="">Yes</option>
                <option value="">No</option>
              </select>
            </div> */}
            {/* <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-medium">
                Link to billing
              </label>
              <select
                name=""
                id=""
                className="border rounded-md border-gray-400 p-2"
              >
                <option value="">Select </option>
                <option value="">Yes</option>
                <option value="">No</option>
              </select>
            </div> */}
          </div>
          <div>
            {/* <div className="my-2">
              <label htmlFor="subFacility" className="flex items-center gap-2">
                Sub Facility
                <input
                  type="checkbox"
                  name=""
                  id="subFacility"
                  checked={subFacilityAvailable === true}
                  onChange={() =>
                    setSubFacilityAvailable(!subFacilityAvailable)
                  }
                  className="h-4 w-4"
                />
              </label>
            </div> */}
            {subFacilityAvailable && (
              <>
                <div className="grid grid-cols-3 gap-x-5">
                  {subFacilities.map((subFacility, index) => (
                    <div className="flex items-end gap-2 mb-4" key={index}>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`name-${index}`}
                          className="font-medium"
                        >
                          Sub Facility name
                        </label>
                        <input
                          type="text"
                          name={`name-${index}`}
                          id={`name-${index}`}
                          className="border p-2 rounded-md"
                          placeholder="Sub Facility name"
                          value={subFacility.name}
                          onChange={(e) =>
                            handleSubChange(index, "name", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`status-${index}`}
                          className="font-medium"
                        >
                          Active
                        </label>
                        <select
                          name={`status-${index}`}
                          id={`status-${index}`}
                          className="border p-2 rounded-md w-48"
                          value={subFacility.status}
                          onChange={(e) =>
                            handleSubChange(index, "status", e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                      <button
                        onClick={() => handleRemoveSubFacility(index)}
                        className="text-red-500 mb-2 "
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddSubFacility}
                  className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                >
                  Add Sub Facility
                </button>
              </>
            )}
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
              {/* <p className="text-center font-medium">Configure Payment</p> */}
            </div>
            <div className="grid grid-cols-4 items-center border-b">
              <div className="flex justify-center my-2">
                <label htmlFor="">
                  <input type="checkbox" name="" id="" /> Member
                </label>
              </div>
              <div className="flex justify-center my-2">
                <div className="flex items-center">
                  <div className="rounded-l-md border p-2 border-gray-400">
                    <input type="checkbox" name="" id="" />
                  </div>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border border-gray-400 rounded-r-md p-2 outline-none"
                    placeholder="₹100"
                  />
                </div>
              </div>
              <div className="flex justify-center my-2">
                <div className="flex items-center">
                  <div className="rounded-l-md border p-2 border-gray-400">
                    <input type="checkbox" name="" id="" />
                  </div>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border border-gray-400 rounded-r-md p-2 outline-none"
                    placeholder="₹100"
                  />
                </div>
              </div>
              {/* <div className="flex justify-center my-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <label htmlFor="" className="flex items-center gap-2">
                      <input type="checkbox" name="" id="" /> Postpaid
                    </label>
                    <label htmlFor="" className="flex items-center gap-2">
                      <input type="checkbox" name="" id="" /> Prepaid
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="flex items-center gap-2 ">
                      <input type="checkbox" name="" id="" /> Pay on facility
                    </label>
                    <label htmlFor="" className="flex items-center gap-2">
                      <input type="checkbox" name="" id="" /> Complimentary
                    </label>
                  </div>
                </div>
              </div> */}
            </div>
            {/* <div className="grid grid-cols-4 items-center border-b ">
              <div className="flex justify-center my-2">
                <label htmlFor="" className="flex items-center gap-2">
                  <input type="checkbox" name="" id="" />
                  Non-Member
                </label>
              </div>
              <div className="flex justify-center my-2">
                <div className="flex items-center">
                  <div className="rounded-l-md border p-2 border-gray-400">
                    <input type="checkbox" name="" id="" />
                  </div>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border border-gray-400 rounded-r-md p-2 outline-none"
                    placeholder="₹100"
                  />
                </div>
              </div>
              <div className="flex justify-center my-2">
                <div className="flex items-center">
                  <div className="rounded-l-md border p-2 border-gray-400">
                    <input type="checkbox" name="" id="" />
                  </div>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border border-gray-400 rounded-r-md p-2 outline-none"
                    placeholder="₹100"
                  />
                </div>
              </div>
              {/* <div className="flex justify-center my-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <label htmlFor="" className="flex items-center gap-2">
                      <input type="checkbox" name="" id="" /> Postpaid
                    </label>
                    <label htmlFor="" className="flex items-center gap-2">
                      <input type="checkbox" name="" id="" /> Prepaid
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="flex items-center gap-2 ">
                      <input type="checkbox" name="" id="" /> Pay on facility
                    </label>
                    <label htmlFor="" className="flex items-center gap-2">
                      <input type="checkbox" name="" id="" /> Complimentary
                    </label>
                  </div>
                </div>
              </div> 
            </div> */}
            <div className="grid grid-cols-4 items-center border-b">
              <div className="flex justify-center my-2">
                <label htmlFor="" className="flex items-center gap-2">
                  <input type="checkbox" name="" id="" />
                  Guest
                </label>
              </div>
              <div className="flex justify-center my-2">
                <div className="flex items-center">
                  <div className="rounded-l-md border p-2 border-gray-400">
                    <input type="checkbox" name="" id="" />
                  </div>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border border-gray-400 rounded-r-md p-2 outline-none"
                    placeholder="₹100"
                  />
                </div>
              </div>
              <div className="flex justify-center my-2">
                <div className="flex items-center">
                  <div className="rounded-l-md border p-2 border-gray-400">
                    <input type="checkbox" name="" id="" />
                  </div>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border border-gray-400 rounded-r-md p-2 outline-none"
                    placeholder="₹100"
                  />
                </div>
              </div>
              {/* <div className="flex justify-center my-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <label htmlFor="" className="flex items-center gap-2">
                      <input type="checkbox" name="" id="" /> Postpaid
                    </label>
                    <label htmlFor="" className="flex items-center gap-2">
                      <input type="checkbox" name="" id="" /> Prepaid
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="flex items-center gap-2 ">
                      <input type="checkbox" name="" id="" /> Pay on facility
                    </label>
                    <label htmlFor="" className="flex items-center gap-2">
                      <input type="checkbox" name="" id="" /> Complimentary
                    </label>
                  </div>
                </div>
              </div> */}
            </div>
            {/* <div className="grid grid-cols-4 items-center border-b ">
              <div className="flex justify-center my-2">
                <label htmlFor="" className="flex items-center gap-2">
                  <input type="checkbox" name="" id="" />
                  Tenant
                </label>
              </div>
              <div className="flex justify-center my-2">
                <div className="flex items-center">
                  <div className="rounded-l-md border p-2 border-gray-400">
                    <input type="checkbox" name="" id="" />
                  </div>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border border-gray-400 rounded-r-md p-2 outline-none"
                    placeholder="₹100"
                  />
                </div>
              </div>
              <div className="flex justify-center my-2">
                <div className="flex items-center">
                  <div className="rounded-l-md border p-2 border-gray-400">
                    <input type="checkbox" name="" id="" />
                  </div>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border border-gray-400 rounded-r-md p-2 outline-none"
                    placeholder="₹100"
                  />
                </div>
              </div>
              {/* <div className="flex justify-center my-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <label htmlFor="" className="flex items-center gap-2">
                      <input type="checkbox" name="" id="" /> Postpaid
                    </label>
                    <label htmlFor="" className="flex items-center gap-2">
                      <input type="checkbox" name="" id="" /> Prepaid
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="flex items-center gap-2 ">
                      <input type="checkbox" name="" id="" /> Pay on facility
                    </label>
                    <label htmlFor="" className="flex items-center gap-2">
                      <input type="checkbox" name="" id="" /> Complimentary
                    </label>
                  </div>
                </div>
              </div> 
            </div> */}
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
    <div className="my-2 flex flex-col gap-2">
      <label htmlFor="gst" className="font-medium">
        GST
      </label>
      <input
        type="number"
        name="gst"
        id="gst"
        className="border rounded-md p-2"
        placeholder="GST(%)"
        value={formData.amenity.gst || ""} // Add GST to the state if necessary
        onChange={(e) =>
          setFormData((prevState) => ({
            ...prevState,
            amenity: {
              ...prevState.amenity,
              gst: e.target.value, // Add GST handler
            },
          }))
        }
      />
    </div>
  </div>
            {/* <div className="my-2 flex items-center gap-2">
              <label htmlFor="" className="font-medium">
                Consecutive slots Allowed
              </label>
              <Switch />
            </div> */}
          </div>
        </div>
        <div className="bg-blue-50 border-y">
  {/* Booking Allowed Before */}
  <div className="grid grid-cols-4 items-center border-b px-4 gap-2">
    <div className="flex justify-center my-2">
      <label htmlFor="book_before_days" className="flex items-center gap-2">
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
      />
    </div>
  </div>

  {/* Can Cancel Before Schedule */}
  <div className="grid grid-cols-4 items-center px-4 gap-2">
    <div className="flex justify-center my-2">
      <label htmlFor="cancel_before_days" className="flex items-center gap-2">
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
      />
    </div>
  </div>
</div>

<div className="w-full mt-2">
      <h2 className="font-medium border-b border-black w-full text-lg">
        Booking Rule
      </h2>
      <div className="grid gap-2 border-gray-400 py-2">
        {rules.map((rule, index) => (
          <div key={index} className="mb-2 grid grid-cols-12 items-center">
            <label className="flex gap-2 items-center col-span-5">
              <input type="checkbox" className="h-4 w-4" />
              Facility can be booked
              <input
                type="number"
                min="1"
                value={rule.timesPerDay}
                onChange={(e) =>
                  handleOptionChange(index, "timesPerDay", e.target.value)
                }
                className="border border-gray-400 rounded-md w-full p-1 outline-none max-w-14"
                placeholder="Enter times"
              />
              times per day by
              <select
                value={rule.selectedOption}
                onChange={(e) =>
                  handleOptionChange(index, "selectedOption", e.target.value)
                }
                className="border border-gray-400 rounded-md w-full p-1 outline-none max-w-28"
              >
                <option value="">Select</option>
                {options.map((option) => (
                  <option
                    key={option}
                    value={option}
                    disabled={rules.some((r) => r.selectedOption === option)}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <button
              onClick={() => handleRemoveRule(index)}
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded-md w-fit hover:bg-red-600"
            >
              <FaTrash />
            </button>
          </div>
        ))}

        <div className="flex">
          <button
            onClick={handleAddRule}
            disabled={rules.length === 4}
            className={`${
              rules.length === 4
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } mt-2 text-white px-4 py-2 rounded-md`}
          >
            Add Rule
          </button>
        </div>
        {rules.length === 4 && (
          <p className="text-red-500 text-sm mt-2">
            You cannot add more than 4 rules.
          </p>
        )}
      </div>
    </div>
      
    <div className="my-4">
          <h2 className="border-b border-black text-lg mb-1 font-medium">
            Cover Images
          </h2>
          <FileInputBox fileType="image/*" />
        </div>
       
        <div className="my-4">
          <h2 className="border-b border-black text-lg mb-1 font-medium">
            Attachments
          </h2>
          <FileInputBox />
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
    <div key={index} className="grid grid-cols-3 gap-2 bg-white my-2 rounded-lg">
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
