import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { getCuisinesFBSetup, postFB } from "../../api";
import toast from "react-hot-toast";
import { restaurantSchedule } from "../../utils/initialFormData";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Select from "react-select";


const AddFB = () => {
  const [option, setOption] = useState("bookable");
  const [selectedDays, setSelectedDays] = useState({
    all: false,
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });

  const handleAllChange = () => {
    const newState = !selectedDays.all;
    setSelectedDays({
      all: newState,
      sunday: newState,
      monday: newState,
      tuesday: newState,
      wednesday: newState,
      thursday: newState,
      friday: newState,
      saturday: newState,
    });
  };

  const handleIndividualChange = (day) => {
    const updatedState = {
      ...selectedDays,
      [day]: !selectedDays[day],
    };

    // If any checkbox is unchecked, uncheck "All"
    if (!updatedState[day]) {
      updatedState.all = false;
    } else {
      // If all individual checkboxes are checked, check "All"
      const allChecked = Object.keys(updatedState).every(
        (key) => key === "all" || updatedState[key]
      );
      updatedState.all = allChecked;
    }

    setSelectedDays(updatedState);
  };
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Fetch cuisines data
  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const siteDetailsResp = await getCuisinesFBSetup();

        // Transform data to react-select format
        const formattedOptions = siteDetailsResp.data.map((item) => ({
          value: item.id, // id as the value
          label: item.name, // name as the label
        }));

        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching cuisines:", error);
      }
    };
    fetchCuisines();
  }, []);

  // Handle selection changes
  const handleChange1 = (selected) => {
    setSelectedOptions(selected);
    console.log("Selected Cuisines:", selected);
  };
  const [rows, setRows] = useState([]);

  const addRow = () => {
    setRows([...rows, { order: false, booking: false, startDate: "", endDate: "" }]);
  };

  const deleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };
  const themeColor = useSelector((state) => state.theme.color);

  const [formData, setFormData] = useState({
    restaurtanttype: "",
    restaurantName: "",
    costForTwo: "",
    mobileNumber: "",
    anotherMobileNumber: "",
    landlineNumber: "",
    deliveryTime: "",
    cuisines: [],
    servesAlcohol: "",
    wheelchairAccessible: "",
    cashOnDelivery: "",
    pureVeg: "",
    address: "",
    termsAndConditions: "",
    disclaimer: "",
    closingMessage: "",
    start_time: "",
    end_time: "",
    table_booking_start_time: "",
    table_booking_end_time: "",
    booking_allowed: false,
    order_allowed: false,
    last_booking_time: "",
    table_number: "",
    minimumPerson: "",
    maximumPerson: "",
    canCancelBefore: "",
    bookingNotAllowedText: "",
    gst: "",
    deliveryCharge: "",
    ServiceCharges: "",
    minimumOrder: "",
    orderNotAllowedText: "",
    break_start_time: "",
    break_end_time: "",
    cover_image: [],
    menu: [],
    gallery: [],
    restaurantBook: restaurantSchedule,
  });

  console.log("Form Data", formData);
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;

    // Update all `selected` values in the formData
    const updatedBook = Object.keys(formData.restaurantBook).reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          ...formData.restaurantBook[day],
          selected: isChecked,
        },
      }),
      {}
    );

    setFormData((prev) => ({
      ...prev,
      restaurantBook: updatedBook,
    }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // This handles both strings and booleans if passed correctly
    }));
  };


  const handleCheckboxChange = (day) => {
    setFormData((prevState) => ({
      ...prevState,
      restaurantBook: {
        ...prevState.restaurantBook,
        [day]: {
          ...prevState.restaurantBook[day],
          selected: !prevState.restaurantBook[day].selected,
        },
      },
    }));
  };

  const handleTimeChange = (day, type, value) => {
    setFormData((prevState) => ({
      ...prevState,
      restaurantBook: {
        ...prevState.restaurantBook,
        [day]: {
          ...prevState.restaurantBook[day],
          [type]: value,
        },
      },
    }));
  };
  const handlePropagateValues = (sourceDay) => {
    const sourceValues = formData.restaurantBook[sourceDay]; // Get the values of the source day
    const updatedBook = Object.keys(formData.restaurantBook).reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          ...formData.restaurantBook[day],
          ...sourceValues, // Copy all values from the source day to each other day
          selected: formData.restaurantBook[day].selected, // Preserve the selected state
        },
      }),
      {}
    );

    setFormData((prev) => ({
      ...prev,
      restaurantBook: updatedBook,
    }));
  };

  const handleFileChange = (files, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
  };

  const userId = getItemInLocalStorage("UserId");
  const navigate = useNavigate()
  const handleSubmit = async () => {
    // const ids = selectedOptions.map(option => option.value);     
    if (!formData.restaurantName) {
      return toast.error("Restaurant Name is required");
    }
    if (!formData.costForTwo) {
      return toast.error(" Cost For Two Name is required");
    }
    if (!formData.mobileNumber) {
      return toast.error("Mobile Number is required");
    }
    if (formData.mobileNumber.length !== 10) {
      return toast.error("Mobile Number must be exactly 10 characters long");
    }

    if (!/^\d+$/.test(formData.mobileNumber)) {
      return toast.error("Mobile Number must contain only digits");
    }
    // Another Mobile Number
    if (!formData.anotherMobileNumber) {
      return toast.error("Another Mobile Number is required");
    }
    if (formData.anotherMobileNumber.length !== 10) {
      return toast.error("Another Mobile Number must be exactly 10 characters long");
    }

    if (!/^\d+$/.test(formData.anotherMobileNumber)) {
      return toast.error("Another Mobile Number must contain only digits");
    }
    // Landline Number
    // if (!formData.landlineNumber) {
    //   return toast.error("Landline Number is required");
    // }
    if (formData.landlineNumber.length !== 10) {
      return toast.error("Landline Number must be exactly 10 characters long");
    }

    if (!/^\d+$/.test(formData.landlineNumber)) {
      return toast.error("Landline Number must contain only digits");
    }

    if (!formData.servesAlcohol) {
      return toast.error("Please select Serves Alcohol Yes or No");
    }
    if (!formData.wheelchairAccessible) {
      return toast.error("Please select Wheelchair Accessible Yes or No ");
    }
    if (!formData.costForTwo) {
      return toast.error("Please select Cost For Two Yes or No ");
    }
    if (!formData.pureVeg) {
      return toast.error("Please select Pure Veg Yes or No ");
    }

    const postData = new FormData();
    const daysMapping = {
      sunday: "sun",
      monday: "mon",
      tuesday: "tue",
      wednesday: "wed",
      thursday: "thu",
      friday: "fri",
      saturday: "sat",
    };
    postData.append(
      "food_and_beverage[restauranttype]",
      option
    );
    postData.append(
      "food_and_beverage[restaurant_name]",
      formData.restaurantName
    );
    postData.append("food_and_beverage[status]", true);

    postData.append("food_and_beverage[created_by_id]", userId);
    postData.append("food_and_beverage[cost_for_two]", formData.costForTwo);
    postData.append("food_and_beverage[mobile_number]", formData.mobileNumber);
    postData.append(
      "food_and_beverage[alternate_mobile_number]",
      formData.anotherMobileNumber
    );
    postData.append(
      "food_and_beverage[landline_number]",
      formData.landlineNumber
    );
    postData.append("food_and_beverage[delivery_time]", formData.deliveryTime);
    // selectedValues.forEach(value => {
    //   postData.append("food_and_beverage[cuisines]", value); // Append each selected value (id or value)
    // });
    // ids.forEach(id => {
    //   postData.append("food_and_beverage[cuisines][]", id);
    // });
    selectedOptions.forEach((option) => {
      postData.append(`food_and_beverage[cuisines][]`, option.value);
    });
    postData.append(
      "food_and_beverage[serves_alcohols]",
      formData.servesAlcohol
    );
    postData.append(
      "food_and_beverage[wheelchair_accessible]",
      formData.wheelchairAccessible
    );
    postData.append(
      "food_and_beverage[cash_on_delivery]",
      formData.cashOnDelivery
    );
    postData.append("food_and_beverage[pure_veg]", formData.pureVeg);
    postData.append("food_and_beverage[address]", formData.address);
    postData.append(
      "food_and_beverage[terms_and_conditions]",
      formData.termsAndConditions
    );
    postData.append("food_and_beverage[disclaimer]", formData.disclaimer);
    postData.append(
      "food_and_beverage[closing_message]",
      formData.closingMessage
    );
    rows.forEach((row, index) => {
      postData.append(`blocked_days[][order_allowed]`, row.order);
      postData.append(`blocked_days[][booking_allowed]`, row.booking);
      postData.append(`blocked_days[][start_date]`, row.startDate);
      postData.append(`blocked_days[][end_date]`, row.endDate);
    });
    postData.append(
      "food_and_beverage[minimum_person]",
      formData.minimumPerson
    );
    postData.append(
      "food_and_beverage[maximum_person]",
      formData.maximumPerson
    );
    postData.append(
      "food_and_beverage[cancel_before]",
      formData.canCancelBefore
    );
    postData.append("food_and_beverage[booking_not_available_text]", formData.bookingNotAllowedText);
    postData.append("food_and_beverage[gst]", formData.gst);
    postData.append(
      "food_and_beverage[delivery_charges]",
      formData.deliveryCharge
    );
    postData.append("food_and_beverage[minimum_order]", formData.minimumOrder);
    postData.append("food_and_beverage[order_not_allowed_text]", formData.orderNotAllowedText);
    postData.append(
      "food_and_beverage[serviceCharges]",
      formData.ServiceCharges
    );
    postData.append("food_and_beverage[start_time]", formData.start_time);
    postData.append("food_and_beverage[end_time]", formData.end_time);
    postData.append("food_and_beverage[break_start_time]", formData.break_start_time);
    postData.append("food_and_beverage[break_end_time]", formData.break_end_time);

    postData.append("food_and_beverage[sun]", selectedDays['sunday'] ? "1" : "0");

    postData.append("food_and_beverage[mon]", selectedDays['monday'] ? "1" : "0");
    postData.append("food_and_beverage[tue]", selectedDays['tuesday'] ? "1" : "0");
    postData.append("food_and_beverage[wed]", selectedDays['wednesday'] ? "1" : "0");
    postData.append("food_and_beverage[thu]", selectedDays['thursday'] ? "1" : "0");
    postData.append("food_and_beverage[fri]", selectedDays['friday'] ? "1" : "0");
    postData.append("food_and_beverage[sat]", selectedDays['saturday'] ? "1" : "0");
    postData.append("food_and_beverage[booking_allowed]", formData.booking_allowed);
    postData.append("food_and_beverage[order_allowed]", formData.order_allowed);
    postData.append("food_and_beverage[last_booking_time]", formData.last_booking_time);

    postData.append("food_and_beverage[table_number]", formData.table_number);




    formData.cover_image?.forEach((file, index) => {
      postData.append(`cover_images[]`, file);
    });
    formData.menu?.forEach((file, index) => {
      postData.append(`menu_images[]`, file);
    });
    formData.gallery?.forEach((file, index) => {
      postData.append(`gallery_images[]`, file);
    });
    try {
      const postRes = await postFB(postData);
      console.log(postRes);
      toast.success("Fb added successfully");
      navigate("/admin/fb");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden w-full">
      <div className="md:mx-20 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
        <h2
          style={{ background: "rgb(19 27 32)" }}
          className="text-center text-xl font-bold p-2 rounded-md text-white"
        >
          New F&B
        </h2>
        <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
          <h3 className="border-b text-center text-xl  mb-6 font-bold">
            BASIC DETAILS
          </h3>
          <div className="mb-2">
            {/* <h1 className="text-lg font-semibold mb-4">Choose Booking Option</h1> */}
            <form>
              {/* Radio Buttons in Flex */}
              <div className="flex  space-x-6">
                {/* Bookable Option */}
                <div className="flex items-center">
                  <input
                    id="bookable"
                    type="radio"
                    value="bookable"
                    checked={option === "bookable"}
                    onChange={(e) => setOption(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="bookable"
                    className="ml-2  font-medium font-semibold "
                  >
                    Bookable
                  </label>
                </div>

                {/* Request Option */}
                <div className="flex items-center">
                  <input
                    id="request"
                    type="radio"
                    value="request"
                    checked={option === "request"}
                    onChange={(e) => setOption(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="request"
                    className="ml-2  font-medium font-semibold "
                  >
                    Request
                  </label>
                </div>
              </div>

              {/* Display Selected Option */}
              {/* <div className="mt-4">
        <p className="text-sm text-gray-500">
          Selected Option:{" "}
          <span className="font-semibold text-gray-800">{option}</span>
        </p>
      </div> */}
            </form>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="col-span-1">
              <label
                className="block   mb-2"
                htmlFor="restaurant-name"
              >
                Restaurant Name <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="restaurant-name"
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                placeholder="Restaurant Name"
              />
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="cost-for-two"
              >
                Cost For Two <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="cost-for-two"
                type="text"
                name="costForTwo"
                value={formData.costForTwo}
                onChange={handleChange}
                placeholder="Cost For Two"
              />
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="mobile-number"
              >
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="mobile-number"
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter Number"
              />
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="another-mobile-number"
              >
                Another Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="another-mobile-number"
                type="tel"
                name="anotherMobileNumber"
                value={formData.anotherMobileNumber}
                onChange={handleChange}
                placeholder="Enter Number"
              />
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="landline-number"
              >
                Landline Number
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="landline-number"
                type="tel"
                name="landlineNumber"
                value={formData.landlineNumber}
                onChange={handleChange}
                placeholder="Enter Number"
              />
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="delivery-time"
              >
                Delivery Time
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="delivery-time"
                type="text"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                placeholder="Mins"
              />
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="cuisines"
              >
                Cuisines
              </label>
              {/* <input
              className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
              id="delivery-time"
              type="text"
              name="cuisines"
              value={formData.cuisines}
              onChange={handleChange}
              placeholder="Cuisines"
            /> */}
              <Select
                id="cuisines"
                isMulti
                options={options}
                value={selectedOptions}
                onChange={handleChange1}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select cuisines"
              />
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="serves-alcohol"
              >
                Serves Alcohol <span className="text-red-500">*</span>
              </label>
              <select
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="serves-alcohol"
                name="servesAlcohol"
                value={formData.servesAlcohol}
                onChange={handleChange}
              >
                {/* Options for serving alcohol */}
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="wheelchair-accessible"
              >
                Wheelchair Accessible <span className="text-red-500">*</span>
              </label>
              <select
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="wheelchair-accessible"
                value={formData.wheelchairAccessible}
                name="wheelchairAccessible"
                onChange={handleChange}
              >
                {/* Options for wheelchair accessibility */}
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="cash-on-delivery"
              >
                Cash on Delivery <span className="text-red-500">*</span>
              </label>
              <select
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="cash-on-delivery"
                name="cashOnDelivery"
                value={formData.cashOnDelivery}
                onChange={handleChange}
              >
                {/* Options for cash on delivery */}
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="pure-veg"
              >
                Pure Veg <span className="text-red-500">*</span>
              </label>
              <select
                className="border border-gray-400  p-2 rounded-md placeholder:text-sm w-full"
                id="pure-veg"
                name="pureVeg"
                value={formData.pureVeg}
                onChange={handleChange}
              >
                {/* Options for pure vegetarian */}
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-span-3">
              <label
                className="block  mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
              />
            </div>
            <div className="col-span-3">
              <label
                className="block  mb-2"
                htmlFor="terms-conditions"
              >
                Terms & Conditions
              </label>
              <textarea
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="terms-conditions"
                type="text"
                name="termsAndConditions"
                value={formData.termsAndConditions}
                onChange={handleChange}
                placeholder="Terms & Conditions"
              />
            </div>
            <div className="col-span-3">
              <label
                className="block  mb-2"
                htmlFor="disclaimer"
              >
                Disclaimer
              </label>
              <textarea
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="disclaimer"
                type="text"
                value={formData.disclaimer}
                name="disclaimer"
                onChange={handleChange}
                placeholder="Disclaimer"
              />
            </div>
            <div className="col-span-3">
              <label
                className="block mb-2"
                htmlFor="closing-message"
              >
                Closing Message
              </label>
              <textarea
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="closing-message"
                type="text"
                name="closingMessage"
                value={formData.closingMessage}
                onChange={handleChange}
                placeholder="Closing Message"
              />
            </div>
          </div>
        </div>
        <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
          <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
            RESTAURTANT DETAILS
          </h3>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="select-operational-days"
              >
                Select Operational Days
              </label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <input
                    id="all"
                    type="checkbox"
                    checked={selectedDays.all}
                    onChange={handleAllChange}
                    className="h-4 w-4"
                  />
                  <label htmlFor="all" className="text-gray-700">
                    All
                  </label>
                </div>
                {[
                  { id: "sunday", label: "S" },
                  { id: "monday", label: "M" },
                  { id: "tuesday", label: "T" },
                  { id: "wednesday", label: "W" },
                  { id: "thursday", label: "T" },
                  { id: "friday", label: "F" },
                  { id: "saturday", label: "S" },
                ].map((day) => (
                  <div key={day.id} className="flex items-center gap-2 ">
                    <input
                      id={day.id}
                      type="checkbox"
                      checked={selectedDays[day.id]}
                      onChange={() => handleIndividualChange(day.id)}
                      className="h-4 w-4"
                    />
                    <label htmlFor={day.id} className="text-lg text-gray-700">
                      {day.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-1">
              <label htmlFor="" className="block  mb-2">Start Time</label>
              <input type="time"
                value={formData.start_time}
                name="start_time"
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full" placeholder="Start time" />
            </div>
            <div className="col-span-1">
              <label htmlFor="" className="block  mb-2">End Time</label>
              <input type="time"
                value={formData.end_time}
                name="end_time"
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full" placeholder="End time" />
            </div>
            <div className="flex  gap-10 col-span-1">
              <div className="flex items-center gap-2 ">
                <input
                  id="booking-allowed"
                  type="checkbox"
                  name="booking_allowed"
                  checked={formData.booking_allowed}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "booking_allowed",
                        value: e.target.checked, // Pass the boolean value
                      },
                    })
                  }
                  className="h-4 w-4 border-gray-400 rounded"
                />

                <label
                  htmlFor="booking-allowed"

                >
                  Booking Allowed
                </label>
              </div>


            </div>
            <div className="col-span-1">
              <label htmlFor="" className="block  mb-2">Break Start Time</label>
              <input
                type="time"
                value={formData.break_start_time}
                name="break_start_time"
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full" placeholder="Start time" />
            </div>
            <div className="col-span-1">
              <label htmlFor="" className="block  mb-2">Break End Time</label>
              <input
                type="time"
                value={formData.break_end_time}
                name="break_end_time"
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full" placeholder="End time" />
            </div>


            <div className="flex items-center gap-2 ">
              <input
                id="order-allowed"
                type="checkbox"
                name="order_allowed"
                checked={formData.order_allowed}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "order_allowed",
                      value: e.target.checked, // Pass the boolean value
                    },
                  })
                }
                className="h-4 w-4 border-gray-400 rounded"
              />
              <label
                htmlFor="order-allowed"

              >
                Order Allowed
              </label>
            </div>
            <div className="col-span-1">
              <label htmlFor="" className="block  mb-2">Last Booking & Order Time</label>
              <input type="time"
                value={formData.last_booking_time}
                name="last_booking_time"
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full" placeholder="End time" />
            </div>
          </div>
        </div>
        <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
          <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
            BLOCKED DAYS
          </h3>
          <div>
            <button
              onClick={addRow}
              className="px-4 py-2 border border-blue-500 rounded bg-blue-500 text-white hover:bg-blue-600"
              style={{ background: themeColor }}
            >
              Add
            </button>
            {rows.map((row, index) => (
              <div key={index} className="mb-2 flex gap-4 items-center">
                <div>
                  <input
                    type="checkbox"
                    checked={row.order}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows[index].order = e.target.checked;
                      setRows(newRows);
                    }}
                  />
                  &nbsp;&nbsp;
                  <label >Order</label>
                </div>
                &nbsp;&nbsp;
                <div>
                  <input
                    type="checkbox"
                    checked={row.booking}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows[index].booking = e.target.checked;
                      setRows(newRows);
                    }}
                  />
                  &nbsp;&nbsp;
                  <label >Booking</label>
                </div>
                &nbsp;&nbsp;
                <label htmlFor="" >Start Date:</label>
                <input
                  type="date"
                  className="border border-gray-400 p-1 rounded-md"
                  value={row.startDate}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].startDate = e.target.value;
                    setRows(newRows);
                  }}
                />
                &nbsp;&nbsp;
                <label htmlFor="" >End Date:</label>
                <input
                  type="date"
                  className="border border-gray-400 p-1 rounded-md"
                  value={row.endDate}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].endDate = e.target.value;
                    setRows(newRows);
                  }}
                />
                &nbsp;
                <button
                  onClick={() => deleteRow(index)}
                  className=""
                >
                  <FaTrash size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
          <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
            TABLE BOOKING
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="col-span-1">
              <label htmlFor="" className="block  mb-2">Number of Tables</label>
              <input type="text"
                value={formData.table_number}
                name="table_number"
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full" placeholder="Enter Tables" />
            </div>
            {/* <div className="col-span-1">
            <label htmlFor="" className="block text-gray-700 font-bold mb-2">Start Date</label>
            <input type="date" className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full" placeholder="Start time"/>
          </div>
          <div className="col-span-1">
            <label htmlFor="" className="block text-gray-700 font-bold mb-2">End Date</label>
            <input type="date" className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full" placeholder="End time"/>
          </div>
          <div className="col-span-1">
            <label htmlFor="" className="block text-gray-700 font-bold mb-2">Start Time</label>
            <input type="time" className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full" placeholder="Start time"/>
          </div>
          <div className="col-span-1">
            <label htmlFor="" className="block text-gray-700 font-bold mb-2">End Time</label>
            <input type="time" className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full" placeholder="End time"/>
          </div>
          <div className="col-span-1">
            <label htmlFor="" className="block text-gray-700 font-bold mb-2">Booking Capacity</label>
            <input type="text" className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full" placeholder="Enter Booking Capacity"/>
          </div>
          <div className="col-span-1">
            <label htmlFor="" className="block text-gray-700 font-bold mb-2">Waiting Capacity</label>
            <input type="text" className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full" placeholder="Enter Waiting Capacity"/>
          </div> */}
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="minimum-person"
              >
                Minimum Person
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="minimum-person"
                type="text"
                name="minimumPerson"
                value={formData.minimumPerson}
                onChange={handleChange}
                placeholder="Minimum Person"
              />
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="maximum-person"
              >
                Maximum Person
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="maximum-person"
                type="text"
                name="maximumPerson"
                value={formData.maximumPerson}
                onChange={handleChange}
                placeholder="Maximum Person"
              />
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="can-cancel-before"
              >
                Can Cancel Before
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="can-cancel-before"
                type="text"
                name="canCancelBefore"
                value={formData.canCancelBefore}
                onChange={handleChange}
                placeholder="In Mins"
              />
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="booking-not-allowed-text"
              >
                Booking Not Available Text
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="booking-not-allowed-text"
                type="text"
                name="bookingNotAllowedText"
                value={formData.bookingNotAllowedText}
                onChange={handleChange}
                placeholder="Booking Not Allowed Text"
              />
            </div>


          </div>
        </div>
        <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
          <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
            ORDER CONFIGURE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="GST"
              >
                GST(%)
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="GST"
                type="text"
                name="gst"
                value={formData.gst}
                onChange={handleChange}
                placeholder="GST(%)"
              />
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="delivery-charge"
              >
                Delivery Charge
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="delivery-charge"
                type="text"
                name="deliveryCharge"
                value={formData.deliveryCharge}
                onChange={handleChange}
                placeholder=" Delivery Charge"
              />
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="delivery-charge"
              >
                Service Charge(%)
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="delivery-charge"
                type="text"
                name="ServiceCharges"
                value={formData.ServiceCharges}
                onChange={handleChange}
                placeholder="Service Charge(%)"
              />
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="minimum-order"
              >
                Minimum Order
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="minimum-order"
                type="text"
                name="minimumOrder"
                value={formData.minimumOrder}
                onChange={handleChange}
                placeholder="Minimum Order"
              />
            </div>
            <div className="col-span-1">
              <label
                className="block  mb-2"
                htmlFor="order-not-allowed-text"
              >
                Order Not Allowed Text
              </label>
              <input
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                id="order-not-allowed-text"
                type="text"
                name="orderNotAllowedText"
                value={formData.orderNotAllowedText}
                onChange={handleChange}
                placeholder="Order Not Allowed Text"
              />
            </div>
          </div>
        </div>
        <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
          <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
            ATTACHMENTS
          </h3>
          <label htmlFor="" className="font-medium my-2 ">
            Cover Image
          </label>

          <FileInputBox
            handleChange={(files) => handleFileChange(files, "cover_image")}
            fieldName={"cover_image"}
          // isMulti={true}
          />
          <label htmlFor="" className="font-medium my-2">
            Menu
          </label>
          <FileInputBox
            handleChange={(files) => handleFileChange(files, "menu")}
            fieldName={"Menu"}
            isMulti={true}
          />
          <label htmlFor="" className="font-medium my-2 ">
            Gallery
          </label>
          <FileInputBox
            handleChange={(files) => handleFileChange(files, "gallery")}
            fieldName={"gallery"}
            isMulti={true}
          />
        </div>

        <div className="sm:flex justify-center grid gap-2 my-5 ">
          <button
            className="bg-black text-white p-2 px-4 rounded-md font-medium"
            onClick={handleSubmit}
            style={{ background: themeColor }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}






export default AddFB



//////////////////////////////////////////////////

