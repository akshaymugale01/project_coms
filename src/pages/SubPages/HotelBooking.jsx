import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import CustomTrigger from "../../containers/CustomTrigger";
import SeatTimeSlot, { initialSelectedTimes } from "./SeatTimeSlot";
import Select from "react-select";
import {
  getAllUnits,
  getAssignedTo,
  getLogin,
  getFacilitySlots,
  getFacitilitySetup,
  getSetupUsers,
  getSiteData,
  postAmenitiesBooking,
} from "../../api";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { FaCheck } from "react-icons/fa";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { error } from "highcharts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HotelBooking = () => {
  const navigate = useNavigate();
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const [isOpen, setIsOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState(formattedDate);
  const [facility, setFacility] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [terms, setTerms] = useState("No terms available.");
  const [amountt, setAmountt] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState(
    "No cancellation policy available."
  );
  const [paymentMode, setPaymentMode] = useState("post");
  const siteId = getItemInLocalStorage("SITEID");
  // const [userOptions, setUserOptions] = useState([]);
  const [formData, setFormData] = useState({
    hotel_id: "",
    hotel_slot_id: "",
    user_id: "",
    check_in_date_time: "",
    check_out_date_time: "",
    site_id: siteId,
    amount: "",
    gst_no: 0,
    member_adult: 0,
    member_child: 0,
    guest_adult: 0,
    guest_child: 0,
    tenant_adult: 0,
    tenant_child: 0,
    no_of_members: 0,
    no_of_guests: 0,
    payment_mode: "post",
    no_of_tenants: 0,
    min_people: 0,
    max_people: 0,
  });

  const [units, setUnits] = useState([]); // To store units

  const [prices, setPrices] = useState({
    member_price_adult: 0,
    member_price_child: 0,
    guest_price_adult: 0,
    guest_price_child: 0,
    tenant_price_adult: 0,
    tenant_price_child: 0,
  });

  console.log("formData", formData);

  //Use Effect

  const fetchUnits = async () => {
    try {
      const response = await getAllUnits(); // Fetch all units
      console.log("Units:", response);
      setUnits(response.data); // Store the units in state
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  // const getBookingAmount = (facility, amountt, formData) => {
  //   if (facility?.fac_type === "request" && facility?.postpaid === true) {
  //     return amountt !== undefined && amountt !== null ? amountt : "";
  //   } else {
  //     return formData?.amount !== undefined && formData?.amount !== null ? formData.amount : "";
  //   }
  // };

  const calculateBookingAmount = (hotel, formData) => {
    if (hotel?.fac_type === "request" && hotel?.postpaid === true) {
      const fixedAmount = Number(hotel?.fixed_amount) || 0;
      const taxPercentage = Number(hotel?.gst_no) || 0;
      console.log("taxPercentage Amount:", taxPercentage);
      const taxAmount = (fixedAmount * taxPercentage) / 100;
      const totalAmount = fixedAmount + taxAmount;
      console.log("Fixed Amount:", totalAmount);
      return totalAmount;
    } else {
      return formData?.amount ?? "";
    }
  };

  useEffect(() => {
    fetchHotelSetup();
    if (!formData.booking_date) {
      setFormData((prevData) => ({
        ...prevData,
        booking_date: today,
      }));
    }
    fetchUsers();
    fetchUnits();
  }, []);

  const handlePaymentChange = (mode) => {
    setPaymentMode(mode);
    setFormData({ ...formData, payment_mode: mode });
  };

  useEffect(() => {
    const bookingAmount = calculateBookingAmount(facility, formData);
    console.log("Booking Amount:", bookingAmount);
    setAmountt(bookingAmount);
  }, [facility, formData]);

  // Calculate GST based on total amount before tax
  const calculateGST = (amount, gstNo) => {
    return (amount * gstNo) / 100;
  };

  const fetchHotelSetup = async () => {
    try {
      const response = await getFacitilitySetup(); // Fetches the amenities.json data
      const allAmenities = response.data;

      // Filter amenities where is_hotel is true
      const hotelAmenities = allAmenities.filter(
        (item) => item.is_hotel === true
      );

      setFacilities(hotelAmenities); // Update your state with only hotel-specific amenities
    } catch (error) {
      console.log("Error Fetching hotel amenities", error);
    }
  };

  const formatTime = (hr, min) => {
    const safeMin = min ?? 0;
    return `${hr}:${safeMin.toString().padStart(2, "0")}`;
  };

  //fetch terms ,cancel, gst, member price
  const fetchTermsPolicy = async (facilityId) => {
    try {
      const response = await getFacitilitySetup();
      if (response?.data) {
        const selectedFacility = response.data.find(
          (facility) => facility.id === parseInt(facilityId, 10)
        );
        // console.log("Selected Facility:", selectedFacility);
        const newPrices = {
          member_price_adult: selectedFacility.member_price_adult || 0,
          member_price_child: selectedFacility.member_price_child || 0,
          guest_price_adult: selectedFacility.guest_price_adult || 0,
          guest_price_child: selectedFacility.guest_price_child || 0,
          tenant_price_adult: selectedFacility.tenant_price_adult || 0,
          tenant_price_child: selectedFacility.tenant_price_child || 0,
        };
        // console.log("Selected Facility:", selectedFacility);

        //Update formData without resetting value
        setFormData((prevFormData) => ({
          ...prevFormData,
          gst_no: selectedFacility.gst_no,
          prices: newPrices,
        }));
        // console.log("new p", newPrices);

        setPrices((prevPrices) => {
          if (JSON.stringify(prevPrices) !== JSON.stringify(newPrices)) {
            // console.log("Price set for selected facility", selectedFacility);
            return newPrices;
          }
          return prevPrices;
        });
        if (selectedFacility) {
          setTerms(selectedFacility.terms || "No terms available.");
          setCancellationPolicy(
            selectedFacility.cancellation_policy ||
              "No cancellation policy available."
          );
        } else {
          console.log("Facility not found.");
          setTerms("No terms available.");
          setCancellationPolicy("No cancellation policy available.");
        }
      } else {
        console.log("Error in fetching data.");
        setTerms("No terms available.");
        setCancellationPolicy("No cancellation policy available.");
      }
    } catch (error) {
      console.log("Error fetching facility data:", error);
      setTerms("Error loading terms.");
      setCancellationPolicy("Error loading cancellation policy.");
    }
  };

  const handleInputChange = (field, value) => {
    const updatedFormData = { ...formData, [field]: parseInt(value) || 0 };

    // Calculate total number of people
    const totalPeople =
      updatedFormData.member_adult +
      updatedFormData.member_child +
      updatedFormData.guest_adult +
      updatedFormData.guest_child +
      updatedFormData.tenant_adult +
      updatedFormData.tenant_child;

    // Validate against max_people limit
    if (facility?.max_people && totalPeople > facility.max_people) {
      toast.error(
        `Total number of people (${totalPeople}) cannot exceed the maximum limit of ${facility.max_people} for this facility.`
      );
      return; // Don't update the state if validation fails
    }

    // Validate against min_people limit
    if (
      facility?.min_people &&
      totalPeople < facility.min_people &&
      totalPeople > 0
    ) {
      toast.error(
        `Total number of people (${totalPeople}) must be at least ${facility.min_people} for this facility.`
      );
    }

    const memberTotal =
      updatedFormData.member_adult * prices.member_price_adult +
      updatedFormData.member_child * prices.member_price_child;
    const guestTotal =
      updatedFormData.guest_adult * prices.guest_price_adult +
      updatedFormData.guest_child * prices.guest_price_child;
    const tenantTotal =
      updatedFormData.tenant_adult * prices.tenant_price_adult +
      updatedFormData.tenant_child * prices.tenant_price_child;
    const totalBeforeTax = memberTotal + guestTotal + tenantTotal;
    // Assuming `tax_no` comes from the fetched data (e.g., tax rate is 12%)
    const taxAmount = calculateGST(totalBeforeTax, formData.gst_no || 0); // If no tax, use 0
    console.log("tax amm", taxAmount);
    const finalAmount = totalBeforeTax + taxAmount;
    // Update formData and the total amount
    setFormData({
      ...updatedFormData,
      amount: finalAmount,
      tax: taxAmount, // Store the calculated tax in formData for reference
    });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate); // Update date state

    setFormData((prevData) => ({
      ...prevData,
      booking_date: selectedDate,
    }));
  };

  // const handleButtonClick = (selectedTime) => {
  //   setSelectedTimes((prevState) => {
  //     const newState = {
  //       ...prevState,
  //       [selectedTime]: !prevState[selectedTime],
  //     };

  //     // Determine if any time slot is selected
  //     const anyTimeSelected = Object.values(newState).some(
  //       (isSelected) => isSelected
  //     );

  //     // Update the state for timeSelected and time
  //     setTimeSelected(anyTimeSelected);
  //     setTime(anyTimeSelected ? selectedTime : "");

  //     return newState;
  //   });
  // };

  const postBookFacility = async () => {
    const postData = new FormData();
    // Validate required fields for hotel booking
    if (
      !formData.user_id ||
      !formData.amenity_id ||
      !formData.check_in_date_time ||
      !formData.check_out_date_time
    ) {
      toast.error(
        "All fields are mandatory! Please fill all required details."
      );
      return;
    }

    // Calculate total number of people for final validation
    const totalPeople =
      (formData.member_adult || 0) +
      (formData.member_child || 0) +
      (formData.guest_adult || 0) +
      (formData.guest_child || 0) +
      (formData.tenant_adult || 0) +
      (formData.tenant_child || 0);

    // Final validation before submission
    if (facility?.max_people && totalPeople > facility.max_people) {
      toast.error(
        `Total number of people (${totalPeople}) cannot exceed the maximum limit of ${facility.max_people} for this facility.`
      );
      return;
    }

    if (facility?.min_people && totalPeople < facility.min_people) {
      toast.error(
        `Total number of people (${totalPeople}) must be at least ${facility.min_people} for this facility.`
      );
      return;
    }

    try {
      // Append all necessary fields dynamically
      postData.append("amenity_booking[site_id]", formData.site_id || "");
      postData.append("amenity_booking[user_id]", formData.user_id || "");
      postData.append("amenity_booking[amenity_id]", formData.amenity_id || "");
      postData.append(
        "amenity_booking[checkin_at]",
        formData.check_in_date_time || ""
      );
      postData.append(
        "amenity_booking[checkout_at]",
        formData.check_out_date_time || ""
      );
      postData.append(
        "amenity_booking[payment_mode]",
        formData.payment_mode || ""
      );
      postData.append("amenity_booking[amount]", amountt || "");
      postData.append(
        "amenity_booking[guest_adult]",
        formData.guest_adult || ""
      );
      postData.append(
        "amenity_booking[guest_child]",
        formData.guest_child || ""
      );
      postData.append(
        "amenity_booking[member_adult]",
        formData.member_adult || ""
      );
      postData.append(
        "amenity_booking[member_child]",
        formData.member_child || ""
      );
      // Debugging: Log the entire FormData
      for (const [key, value] of postData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // API call
      const response = await postAmenitiesBooking(postData);

      // Handle the response
      console.log("Booking response:", response);
      toast.success("Booking successful!");
      navigate("/bookings");
    } catch (error) {
      // Handle errors
      console.error("Error in booking:", error);
      alert("Error in booking. Please try again.", error);
    }
  };
  console.log("uuu", units);
  const fetchUsers = async () => {
    try {
      const response = await getSetupUsers();
      console.log("Users:", response);

      const transformedUsers = response.data.map((user) => {
        console.log("User:", user);
        // Ensure user.user_sites is defined
        const userSite = user?.user_sites?.[0];

        if (!userSite) {
          console.warn(`No user site found for user ${user.id}`);
          return {
            value: user.id,
            label: `${user.firstname} ${user.lastname} - Unknown Unit - ${
              user?.user_sites?.[0]?.ownership || "Unknown Ownership"
            }`,
          };
        }

        const unit = units.find((unit) => unit?.id === userSite?.unit_id);
        console.log("Found unit:", unit);

        return {
          value: user.id,
          label: `${user.firstname} ${user.lastname} -${
            unit ? unit.building_name : "Unknown Unit"
          } - ${unit ? unit.name : "Unknown Unit"} - ${
            unit ? unit.floor_name : "Unknown Unit"
          }`,
        };
      });

      setUserOptions(transformedUsers);
      console.log("Fetched Users:", transformedUsers);
    } catch (error) {
      console.error("Error fetching assigned users:", error);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (units.length > 0) {
      fetchUsers();
    }
  }, [units]);

  console.log("facility", facility);

  const handleFacilityChange = (e) => {
    const selectedFacilityId = e.target.value;

    fetchTermsPolicy(selectedFacilityId); // Fetch Terms

    const selectedFacility = facilities.find(
      (facility) => facility.id === parseInt(selectedFacilityId)
    );
    setFacility(selectedFacility);

    setFormData((prevData) => ({
      ...prevData,
      amenity_id: selectedFacilityId,
    }));
  };

  const handleSelectChange = (e) => {
    const selectedUserId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      user_id: selectedUserId, // Update user_id in the formData state
    }));
  };

  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Store the selected user
  const filteredOptions = userOptions.filter((user) =>
    user.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleUserSelect = (value) => {
    const user = userOptions.find((option) => option.value === value);
    setFormData({ ...formData, user_id: value });
    setDropdownOpen(false);
    setSearchText(user.label);
  };

  const [searchFATerm, setSearchFATerm] = useState(""); // State for search input
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

  const filteredFacilities = facilities.filter((facility) =>
    facility.fac_name.toLowerCase().includes(searchFATerm.toLowerCase())
  ); // Filter facilities based on search term

  const handleFacSelect = (facility) => {
    setSearchFATerm(facility.fac_name); // Update the search input with the selected facility name
    setShowDropdown(false); // Close dropdown
    handleFacilityChange({ target: { value: facility.id } }); // Pass selected facility ID to handler
  };

  const themeColor = useSelector((state) => state.theme.color);
  return (
    <section className="flex">
      <Navbar />
      <div className=" w-full flex mx-3  flex-col overflow-hidden">
        <div className="flex flex-col items-center mb-10">
          <div className="md:border rounded-md my-2 p-4">
            <h2
              style={{ background: "rgb(17, 24, 39)" }}
              className="text-xl p-2 rounded-md font-semibold text-center mb-4 text-white "
            >
              Hotel Booking
            </h2>
            <div className="grid grid-cols-4 gap-2">
              <div className="relative mt-3 p-2">
                <label htmlFor="facility" className="font-semibold">
                  Select Hotel:
                </label>

                {/* Search input */}
                <input
                  type="text"
                  value={searchFATerm}
                  onChange={(e) => setSearchFATerm(e.target.value)} // Update search term
                  onFocus={() => setShowDropdown(true)} // Show dropdown on focus
                  className="border p-[6px] px-4 border-gray-500 rounded-md w-60"
                  placeholder="Search Room"
                />
                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto w-full">
                    {filteredFacilities.length > 0 ? (
                      filteredFacilities.map((facility) => (
                        <div
                          key={facility.id}
                          onClick={() => handleFacSelect(facility)} // Handle selection
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {facility.fac_name}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No results found</div>
                    )}
                  </div>
                )}
              </div>

              {/* <div className="flex flex-col gap-1">
                <p className="font-semibold">Facility :</p>
                <select
                  className="border p-2 px-4 border-gray-500 rounded-md"
                  value={formData.facility}
                  onChange={handleFacilityChange}
                >
                  <option value="">Select Facility</option>
                  {facilities.map((facilityItem) => (
                    <option key={facilityItem.id} value={facilityItem.id}>
                      {facilityItem.fac_name}
                    </option>
                  ))}
                </select>
              </div> */}

              <div className="mt-3 relative p-2">
                <label htmlFor="users" className="font-semibold">
                  Select User:
                </label>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onFocus={() => setDropdownOpen(true)}
                  placeholder="Search User"
                  className="border p-[6px] px-4 border-gray-500 rounded-md w-60"
                />
                {isDropdownOpen && (
                  <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto w-full">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((user, index) => (
                        <li
                          key={index}
                          onClick={() => handleUserSelect(user.value)}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                        >
                          {user.label}
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-gray-500">No results found</li>
                    )}
                  </ul>
                )}
              </div>

              {/* Check-in Date */}
              <div className="relative mt-3 p-2">
                <label htmlFor="checkInDate" className="font-semibold">
                  Check-in Date:
                </label>
                <input
                  type="datetime-local"
                  id="checkInDate"
                  name="check_in_date_time"
                  min={new Date().toISOString().slice(0, 16)}
                  value={formData.check_in_date_time}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      check_in_date_time: e.target.value,
                    }))
                  }
                  className="border p-[6px] px-4 border-gray-500 rounded-md w-60"
                />
              </div>
              {/* Check-in Time */}
              {/* <div className="relative mt-3 p-2">
                <label htmlFor="checkInTime" className="font-semibold">
                  Check-in Time:
                </label>
                <input
                  type="time"
                  id="checkInTime"
                  name="check_in_time"
                  value={formData.check_in_time}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      check_in_time: e.target.value,
                    }))
                  }
                  className="border p-[6px] px-4 border-gray-500 rounded-md w-60"
                />
              </div> */}
              {/* Check-out Date */}
              <div className="relative mt-3 p-2">
                <label htmlFor="checkOutDate" className="font-semibold">
                  Check-out Date:
                </label>
                <input
                  type="datetime-local"
                  id="checkOutDate"
                  name="check_out_date_time"
                  min={new Date().toISOString().slice(0, 16)}
                  value={formData.check_out_date_time}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      check_out_date_time: e.target.value,
                    }))
                  }
                  className="border p-[6px] px-4 border-gray-500 rounded-md w-60"
                />
              </div>
              {/* Check-out Time */}
              {/* <div className="relative mt-3 p-2">
                <label htmlFor="checkOutTime" className="font-semibold">
                  Check-out Time:
                </label>
                <input
                  type="time"
                  id="checkOutTime"
                  name="check_out_time"
                  value={formData.check_out_time}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      check_out_time: e.target.value,
                    }))
                  }
                  className="border p-[6px] px-4 border-gray-500 rounded-md w-60"
                />
              </div> */}
            </div>

            <div className="my-2">
              <h2 className="border-b text-xl border-black font-semibold">
                Payment Mode
              </h2>
              <div>
                <div className=" flex flex-col md:flex-row  items-center my-2 w-full">
                  {/* <p className="font-semibold">For :</p> */}
                  <div className="flex gap-5 w-full">
                    <p
                      className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                        paymentMode === "post" && "bg-black text-white"
                      }`}
                      onClick={() => handlePaymentChange("post")}
                    >
                      Post Paid
                    </p>
                    <p
                      className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                        paymentMode === "pre" && "bg-black text-white"
                      }`}
                      onClick={() => handlePaymentChange("pre")}
                    >
                      Prepaid
                    </p>
                  </div>
                </div>
                {/* {paymentMode === "pre" && (
                  <div>
                    <input
                      type="text"
                      placeholder="Enter upi"
                      className="border border-gray-400 p-1 px-4 rounded-md"
                    />
                  </div>
                )} */}
              </div>
            </div>
            <div className="border-b text-xl border-black font-semibold">
              Members
            </div>
            {facility && (facility.min_people || facility.max_people) && (
              <div className="bg-blue-50 p-3 rounded-md mb-4">
                <div className="text-sm font-medium text-blue-800">
                  Facility Capacity:
                  {facility.min_people && ` Min: ${facility.min_people} people`}
                  {facility.min_people && facility.max_people && " | "}
                  {facility.max_people && ` Max: ${facility.max_people} people`}
                </div>
                <div className="text-sm text-blue-600">
                  Current Total:{" "}
                  {(formData.member_adult || 0) +
                    (formData.member_child || 0) +
                    (formData.guest_adult || 0) +
                    (formData.guest_child || 0) +
                    (formData.tenant_adult || 0) +
                    (formData.tenant_child || 0)}{" "}
                  people
                </div>
              </div>
            )}
            {/* <div className="flex flex-col my-2">
              <label htmlFor="" className="font-semibold">
                Comment :
              </label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="2"
                className="border p-1 px-1 border-gray-500 rounded-md"
              />
            </div> */}
            <div className=" ">
              <div className="grid grid-cols-3 gap-4 my-2">
                {/* Member Fields */}
                <div className="flex flex-col items-center border-b border-black pb-2 space-y-2">
                  <label htmlFor="" className="font-semibold">
                    Member:
                  </label>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="member_adult" className="text-sm">
                      Adult
                    </label>
                    <input
                      name="member_adult"
                      type="number"
                      min={0}
                      className="flex-1 p-2 border border-gray-300 rounded"
                      placeholder="No. of Member Adult"
                      value={formData.member_adult}
                      onChange={(e) =>
                        handleInputChange("member_adult", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="member_child" className="text-sm">
                      Child
                    </label>
                    <input
                      name="member_child"
                      id="member_child"
                      type="number"
                      min={0}
                      className="flex-1 p-2 border border-gray-300 rounded"
                      placeholder="No. of Member Child"
                      value={formData.member_child}
                      onChange={(e) =>
                        handleInputChange("member_child", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    Total:{" "}
                    {formData.member_adult * prices.member_price_adult +
                      formData.member_child * prices.member_price_child}
                  </div>
                </div>

                {/* Guest Fields */}
                <div className="flex flex-col items-center border-b border-black pb-2 space-y-2">
                  <label htmlFor="" className="font-semibold">
                    Guest:
                  </label>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="guest_adult" className="text-sm">
                      Adult
                    </label>
                    <input
                      name="guest_adult"
                      type="number"
                      id="guest_adult"
                      className="flex-1 p-2 border border-gray-300 rounded"
                      placeholder="No. of Guest Adult"
                      value={formData.guest_adult}
                      onChange={(e) =>
                        handleInputChange("guest_adult", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="guest_child" className="text-sm">
                      Child
                    </label>
                    <input
                      name="guest_child"
                      id="guest_child"
                      type="number"
                      placeholder="No. of Guest Child"
                      className="flex-1 p-2 border border-grey-300 rounded"
                      value={formData.guest_child}
                      onChange={(e) =>
                        handleInputChange("guest_child", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    Total:{" "}
                    {formData.guest_adult * prices.guest_price_adult +
                      formData.guest_child * prices.guest_price_child}
                  </div>
                </div>

                {/* Tenant Fields */}
                <div className="flex flex-col items-center border-b border-black pb-2 space-y-2">
                  <label htmlFor="" className="font-semibold">
                    Tenant:
                  </label>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="tenant_adult" className="text-sm">
                      Adult
                    </label>
                    <input
                      name="tenant_adult"
                      id="tenant_adult"
                      type="number"
                      className="border rounded border-grey-300 p-2 flex"
                      placeholder="No. of Tenant Adult"
                      value={formData.tenant_adult}
                      onChange={(e) =>
                        handleInputChange("tenant_adult", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="tenant_child" className="text-sm">
                      Child
                    </label>
                    <input
                      name="tenant_child"
                      id="tenant_child"
                      type="number"
                      placeholder="No. Of Tenant Child"
                      className="flex p-2 border border-grey-300 rounded"
                      value={formData.tenant_child}
                      onChange={(e) =>
                        handleInputChange("tenant_child", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    Total:{" "}
                    {formData.tenant_adult * prices.tenant_price_adult +
                      formData.tenant_child * prices.tenant_price_child}
                  </div>
                </div>
              </div>

              {/* Final Amount */}
              <div className="flex items-center space-x-2 justify-end">
                <label htmlFor="gst" className="font-bold">
                  Gst (%):
                </label>
                <input
                  type="text"
                  id="tax"
                  name="tax"
                  value={formData.gst_no} // Display tax amount
                  disabled
                  className="flex p-2 border border-grey-300 rounded"
                />
              </div>
              <div className="flex items-center space-x-2 justify-end">
                <label htmlFor="amount" className="font-bold">
                  Total Amount:{" "}
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={amountt ? amountt : formData.amount || 0} // Conditional display
                  disabled
                  className="flex p-2 border border-grey-300 rounded"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={postBookFacility} // Trigger the handleSubmit function on click
                className="p-2 px-4 flex items-center gap-2 bg-green-400 text-white rounded-md font-medium transition-all duration-300"
              >
                <FaCheck /> Submit
              </button>
            </div>

            <Collapsible
              readOnly
              trigger={
                <CustomTrigger isOpen={isOpen}>
                  Cancellation Policy:
                </CustomTrigger>
              }
              onOpen={() => setIsOpen(true)}
              onClose={() => setIsOpen(false)}
              className="bg-gray-100 my-4 p-2 rounded-md font-bold "
            >
              <div className="grid  bg-gray-100  rounded-md gap-5 p-4">
                <li className="font-medium">{cancellationPolicy}</li>
              </div>
            </Collapsible>
            <Collapsible
              readOnly
              trigger={
                <CustomTrigger isOpen={isTermOpen}>
                  Terms & Conditions:
                </CustomTrigger>
              }
              onOpen={() => setIsTermOpen(true)}
              onClose={() => setIsTermOpen(false)}
              className="bg-gray-100 my-4 p-2 rounded-md font-bold "
            >
              <div className="grid  bg-gray-100 rounded-md gap-5 p-4">
                <li className="font-medium">{terms}</li>
              </div>
            </Collapsible>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelBooking;
("http://13.215.74.38//complaint_modes.jsontoken=efe990d24b0379af8ba3d0a986ac802796bc2e0db15552&q[of_atype]=complaint");
