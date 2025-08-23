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
  getAmenitiesIdBooking,
  postAmenitiesBooking,
  getHotelSetupList,
  getAmenitiesBooking,
} from "../../api";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { FaCheck } from "react-icons/fa";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { error } from "highcharts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addHours , isSameDay } from "date-fns";

const HotelBooking = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
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
  const [memberTotalWithoutTax, setMemberTotalWithoutTax]= useState(0)
  const [guestTotalWithoutTax, setGuestTotalWithoutTax] = useState(0);
  const [tenantTotalWithoutTax, setTenantTotalWithoutTax] = useState(0);
  const[totalDays, setTotalDays] = useState(1);
  // const [userOptions, setUserOptions] = useState([]);
  const [formData, setFormData] = useState({
    hotel_id: "",
    hotel_slot_id: "",
    user_id: "",
    check_in_date_time: null,
    check_out_date_time: null,
    site_id: siteId,
    amount: "",
    gst_no: 0,
    sgst: 0,
    tax: 0,
    consecutive_slot_allowed: false,
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

  const [unavailableBookings, setUnavailableBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
     if (!facility?.id) return console.log("Facility id does not exist");

    const fetchBookedDates = async () => {
      try {
        const response = await getAmenitiesIdBooking(facility.amenity_id); //fetching all the bookings of the one facility
        const bookings = response.amenity_bookings;
        console.log("My facility id is", facility)
        console.log("amenity_bookings:", response.amenity_bookings);
        setUnavailableBookings(Array.isArray(bookings) ? bookings : []);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
        setUnavailableBookings([]);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookedDates();
  }, [facility.id]);


  // Time-based validation: conflict on same day + earlier/equal to checkout time
  const validateCheckInDateTime = (selectedDateTime) => {
    if (loadingBookings) {
      return { conflict: false, message: "" };
    }
    const selectedHour = selectedDateTime.getHours();
    const selectedMinute = selectedDateTime.getMinutes();

    const isDefaultTime = selectedHour === 0 && selectedMinute === 0;

    for (const { checkin_at, checkout_at } of unavailableBookings) {
      const checkinDate = new Date(checkin_at);
      const checkoutDateTime = new Date(checkout_at);

      const isSameCheckinDate = isSameDay(selectedDateTime, checkinDate);
      const isSameCheckoutDate = isSameDay(selectedDateTime, checkoutDateTime);
      const isBeforeOrEqualCheckout = selectedDateTime <= checkoutDateTime;

      if (isSameCheckinDate) {
        return {
          conflict: true,
          message:
            "The selected date is already booked for check-in. Please select another date.",
        };
      }

      // 💡 Only check time conflicts once user has picked a time (not default midnight)
      if (!isDefaultTime && isSameCheckoutDate && isBeforeOrEqualCheckout) {
        return {
          conflict: true,
          message: `The selected date is already booked for check-out. Please choose a later time than ${checkoutDateTime.toLocaleTimeString()} or another date.`,
        };
      }
    }

    return { conflict: false, message: "" };
  };

const parseApiDate = (str) => {
  if (!str) return null;

  const [datePart, timePart] = str.split(" ");
  if (!datePart || !timePart) return null;

  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  return new Date(year, month - 1, day, hour, minute); // ✅ Local time
};

const formatToApiDate = (date) => {
  if (!date || isNaN(date.getTime())) return "";

  const pad = (n) => String(n).padStart(2, "0");

  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());

  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
};
  const getMaxCheckoutDate = (checkinDate, facility) => {
    if (!checkinDate || !facility || !facility.no_of_days) return null;

    const totalDays =
      facility.consecutive_slot_allowed === true ||
      facility.consecutive_slot_allowed === "true"
        ? Number(facility.no_of_days) + 1
        : 1;

    return addHours(new Date(checkinDate), totalDays * 24);
  };

  const getTimeLimits = (checkOutDate, checkinDate, facility) => {
    const selectedDate = parseApiDate(checkOutDate);
    const checkin = parseApiDate(checkinDate);
    const maxCheckout = getMaxCheckoutDate(checkinDate, facility);

    if (!selectedDate || !checkin)
      return {
        minTime: null,
        maxTime: null,
        maxDate: null,
      };

    const isSameDay = selectedDate.toDateString() === checkin.toDateString();
    const isLastDay =
      maxCheckout && selectedDate.toDateString() === maxCheckout.toDateString();

    const minTime = isSameDay
      ? new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          checkin.getHours(),
          checkin.getMinutes()
        )
      : new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          0,
          0
        );

    const maxTime = isLastDay
      ? new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          maxCheckout.getHours(),
          maxCheckout.getMinutes()
        )
      : new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          23,
          59
        );

    if (minTime.getTime() === maxTime.getTime()) {
      maxTime.setMinutes(maxTime.getMinutes() + 30);
    }

    return {
      minTime,
      maxTime,
      maxDate: maxCheckout ?? selectedDate,
    };
  };

  // Extract limits
  const { minTime, maxTime, maxDate } = getTimeLimits(
    formData.check_out_date_time,
    formData.check_in_date_time,
    facility
  );

    const today = new Date();
    const checkinDate = parseApiDate(formData.check_in_date_time);
   
    const minCheckoutDate = checkinDate > today ? checkinDate : today;

    const calculateBookingAmount = (hotel, totalDays) => {
      console.log("Fixed amount of chosen hotel",hotel.fixed_amount)
      if (hotel.fixed_amount) {
        const fixedAmount = Number(hotel?.fixed_amount) * totalDays || 0;
        const taxPercentage = Number(hotel?.gst_no)+ Number(hotel?.sgst) || 0;
        const taxAmount = (fixedAmount * taxPercentage) / 100;
        console.log("total with tax", fixedAmount+taxAmount)
        return fixedAmount + taxAmount;
      }
    };

  //  console.log("Total allowed days", totalDays)

  //checkout date validation
  // const isValidDuration = (checkin, checkout) => {
  //   if (!checkin || !checkout) return false;

  //   const diffMs = new Date(checkout) - new Date(checkin);
  //   const diffHours = diffMs / (1000 * 60 * 60);

  //   return diffHours <= 23;
  // };

  const safeDate = (d) => {
    if (!d) return null;
    const date = new Date(d);
    return isNaN(date.getTime()) ? null : date;
  };

  useEffect(() => {
    fetchHotelSetup();
    fetchUsers();
    fetchUnits();
  }, []);

  const handlePaymentChange = (mode) => {
    setPaymentMode(mode);
    setFormData({ ...formData, payment_mode: mode });
  };

  useEffect(() => {
    const bookingAmount = calculateBookingAmount(facility, totalDays);
    console.log("Booking Amount:", bookingAmount);
    setAmountt(bookingAmount);
    setFormData((prev) => ({ ...prev, amount: bookingAmount }));
  }, [facility, totalDays]);

  // Calculate GST based on total amount before tax
  const calculateGST = (amount, gstNo) => {
    return (amount * gstNo) / 100;
  };

  const fetchHotelSetup = async () => {
    try {
      const response = await getHotelSetupList(); // Fetches the amenities.json data
      const allHotel = response.data.amenities;
      // console.log("All Hotel Data:", allHotel);

      setFacilities(allHotel); // Update your state with only hotel-specific amenities
    } catch (error) {
      console.log("Error Fetching hotel amenities", error);
    }
  };

  //fetch terms ,cancel, gst, member price
  const fetchTermsPolicy = async (facilityId) => {
    try {
      const response = await getHotelSetupList();
      if (response?.data.amenities) {
        const selectedFacility = response.data.amenities.find(
          (facility) => facility.id === parseInt(facilityId, 10)
        );
        
        const newPrices = {
          member_price_adult: selectedFacility.member_price_adult ?? 0,
          member_price_child: selectedFacility.member_price_child ?? 0,
          guest_price_adult: selectedFacility.guest_price_adult ?? 0,
          guest_price_child: selectedFacility.guest_price_child ?? 0,
          tenant_price_adult: selectedFacility.tenant_price_adult ?? 0,
          tenant_price_child: selectedFacility.tenant_price_child ?? 0,
        };
        // console.log("Selected Facility:", selectedFacility);

        //Update formData without resetting value
        setFormData((prevFormData) => ({
          ...prevFormData,
          gst_no: selectedFacility.gst_no,
          sgst: selectedFacility.sgst,
          consecutive_slot_allowed: selectedFacility.consecutive_slot_allowed,
          no_of_days: Number(selectedFacility.no_of_days),
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
  const parsedValue = field.includes("date_time")
    ? value
    : parseInt(value) || 0;

  const updatedFormData = {
    ...formData,
    [field]: parsedValue,
  };

  const totalPeople =
    (updatedFormData.member_adult || 0) +
    (updatedFormData.member_child || 0) +
    (updatedFormData.guest_adult || 0) +
    (updatedFormData.guest_child || 0) +
    (updatedFormData.tenant_adult || 0) +
    (updatedFormData.tenant_child || 0);

  //Block update if over max
  if (facility?.max_people && totalPeople > facility.max_people) {
    toast.error(
      `Total number of people (${totalPeople}) cannot exceed the maximum limit of ${facility.max_people} for this facility.`
    );
    return; 
  }

  //Block update if under min (but not zero)
  if (
    facility?.min_people &&
    totalPeople < facility.min_people &&
    totalPeople > 0
  ) {
    toast.error(
      `Total number of people (${totalPeople}) must be at least ${facility.min_people} for this facility.`
    );
    return;
  }

  //Update
  setFormData(updatedFormData);

  // Duration logic
  const checkin = parseApiDate(updatedFormData.check_in_date_time);
  const checkout = parseApiDate(updatedFormData.check_out_date_time);

  const durationInDays =
    checkin &&
    checkout &&
    !isNaN(checkin.getTime()) &&
    !isNaN(checkout.getTime())? Math.ceil((checkout - checkin) / (24 * 60 * 60 * 1000)): 1;

  setTotalDays(durationInDays);

  // Pricing logic
  if (facility.fixed_amount == null || Number(facility.fixed_amount) === 0) {
    const memberTotal =
      (updatedFormData.member_adult * prices.member_price_adult +
        updatedFormData.member_child * prices.member_price_child) *
      durationInDays;

    const guestTotal =
      (updatedFormData.guest_adult * prices.guest_price_adult +
        updatedFormData.guest_child * prices.guest_price_child) *
      durationInDays;

    const tenantTotal =
      (updatedFormData.tenant_adult * prices.tenant_price_adult +
        updatedFormData.tenant_child * prices.tenant_price_child) *
      durationInDays;

    const totalBeforeTax = memberTotal + guestTotal + tenantTotal;

    const taxAmount = calculateGST(
      totalBeforeTax,
      Number(formData.gst_no) + Number(formData.sgst) || 0
    );

    const finalAmount = totalBeforeTax + taxAmount;

    setMemberTotalWithoutTax(memberTotal);
    setGuestTotalWithoutTax(guestTotal);
    setTenantTotalWithoutTax(tenantTotal);

    setFormData((prev) => ({
      ...prev,
      amount: finalAmount,
    }));
  } else {
    const fixedAmount = calculateBookingAmount(facility, durationInDays);
    setFormData((prev) => ({
      ...prev,
      amount: fixedAmount,
    }));
  }
};


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
      alert("Error in booking. Please try agai1n.", error);
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

  const handleFacilityChange = (e) => {
    const selectedHotelId = e.target.value;

    fetchTermsPolicy(selectedHotelId); // Fetch Terms

    console.log("Selected Facility ID:", selectedHotelId);
    const selectedFacility = facilities.find(
      (facility) => facility.id === parseInt(selectedHotelId)
    );
    setFacility(selectedFacility);

    setFormData((prevData) => ({
      ...prevData,
      amenity_id: selectedHotelId,
    }));
  };

  console.log("facility", facility.id); //selected guestroom id

  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
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
              <div className="relative mt-3 p-2 flex flex-col gap-1">
                <label htmlFor="facility" className="font-semibold">
                  Select Hotel:
                </label>

                {/* Search input */}
                <input
                  type="text"
                  value={searchFATerm}
                  onChange={(e) => {
                    setSearchFATerm(e.target.value);
                    setFormData({
                      check_in_date_time: null,
                      check_out_date_time: null,
                      member_adult: 0,
                      member_child: 0,
                      guest_adult: 0,
                      guest_child: 0,
                      tenant_adult: 0,
                      tenant_child: 0,
                      // Add any other fields your formData includes
                    });
                    setMemberTotalWithoutTax(0);
                    setGuestTotalWithoutTax(0);
                    setTenantTotalWithoutTax(0);
                  }} // Update search term
                  onFocus={() => setShowDropdown(true)} // Show dropdown on focus
                  className="border p-[6px] px-4 border-gray-500 rounded-md w-60"
                  placeholder="Search Room"
                />
                {/* Dropdown */}
                {showDropdown && (
                  <div className="relative z-10 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto w-full">
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

              <div className="mt-3 relative p-2 flex flex-col gap-1">
                <label htmlFor="users" className="font-semibold">
                  Select User:
                </label>
                <input
                  type="text"
                  id="users"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      check_in_date_time: null,
                      check_out_date_time: null,
                      amount: 0,
                      member_adult: 0,
                      member_child: 0,
                      guest_adult: 0,
                      guest_child: 0,
                      tenant_adult: 0,
                      tenant_child: 0,
                    }));
                  }}
                  onFocus={() => setDropdownOpen(true)}
                  placeholder="Search User"
                  className="border p-[6px] px-4 border-gray-500 rounded-md w-60"
                />
                {isDropdownOpen && (
                  <ul className="relative bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto w-60">
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
              <div className="mt-3">
                <label className="font-semibold block mb-1">
                  Check-in Date & Time:
                </label>
                <DatePicker
                  selected={
                    formData.check_in_date_time
                      ? new Date(formData.check_in_date_time)
                      : null
                  }
                  onChange={(date) => {
                    const { conflict, message } = validateCheckInDateTime(date);
                    if (conflict) {
                      toast.error(message);
                      return;
                    }
                    setFormData((prev) => ({
                      ...prev,
                      check_in_date_time: formatToApiDate(date),
                      check_out_date_time: null,
                      amount: 0,
                      member_adult: 0,
                      member_child: 0,
                      guest_adult: 0,
                      guest_child: 0,
                      tenant_adult: 0,
                      tenant_child: 0,
                      amount: 0,
                    }));
                    setMemberTotalWithoutTax(0);
                    setGuestTotalWithoutTax(0);
                    setTenantTotalWithoutTax(0);
                  }}
                  showTimeSelect
                  timeIntervals={30}
                  dateFormat="Pp"
                  minDate={new Date()}
                  className="border p-[6px] px-4 border-gray-500 rounded-md w-60"
                />
              </div>

              {/* Check-out Date */}
              <div className="mt-3">
                <label className="font-semibold block mb-1">
                  Check-out Date & Time:
                </label>
                <DatePicker
                  selected={parseApiDate(formData.check_out_date_time)}
                  onChange={(date) => {
                    setFormData((prev) => ({
                      ...prev,
                      check_out_date_time: formatToApiDate(date),
                      amount: 0,
                      member_adult: 0,
                      member_child: 0,
                      guest_adult: 0,
                      guest_child: 0,
                      tenant_adult: 0,
                      tenant_child: 0,
                    }));
                    setMemberTotalWithoutTax(0);
                    setGuestTotalWithoutTax(0);
                    setTenantTotalWithoutTax(0);
                  }}
                  minDate={checkinDate > today ? checkinDate : today} //blocks past dates
                  maxDate={getMaxCheckoutDate(
                    formData.check_in_date_time,
                    facility
                  )}
                  showTimeSelect
                  timeIntervals={30}
                  dateFormat="Pp"
                  className="border p-[6px] px-4 border-gray-500 rounded-md w-60"
                />

                <p className="text-sm text-gray-600 mt-1">
                  You can book up to {Number(facility.no_of_days) + 1 || 0}{" "}
                  consecutive days.
                </p>
              </div>
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
                      id="member_adult"
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
                  <div>Total: {memberTotalWithoutTax || 0}</div>
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
                      min={0}
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
                      min={0}
                      placeholder="No. of Guest Child"
                      className="flex-1 p-2 border border-grey-300 rounded"
                      value={formData.guest_child}
                      onChange={(e) =>
                        handleInputChange("guest_child", e.target.value)
                      }
                    />
                  </div>
                  <div>Total: {guestTotalWithoutTax || 0}</div>
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
                      min={0}
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
                      min={0}
                      placeholder="No. Of Tenant Child"
                      className="flex p-2 border border-grey-300 rounded"
                      value={formData.tenant_child}
                      onChange={(e) =>
                        handleInputChange("tenant_child", e.target.value)
                      }
                    />
                  </div>
                  <div>Total: {tenantTotalWithoutTax || 0}</div>
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
                  value={Number(formData.gst_no) + Number(formData.sgst) || 0} // Display tax amount
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
                  value={formData.amount || 0} // Conditional display
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
