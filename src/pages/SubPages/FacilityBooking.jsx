import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import CustomTrigger from "../../containers/CustomTrigger";
import SeatTimeSlot, { initialSelectedTimes } from "./SeatTimeSlot";
import Select from "react-select";
import { getAssignedTo, getFacitilitySetup, getLogin, getSiteData, postAmenitiesBooking } from "../../api";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { FaCheck } from "react-icons/fa";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { error } from "highcharts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const FacilityBooking = () => {
  const navigate = useNavigate();
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [slots, setSlots] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState(formattedDate);
  const [facility, setFacility] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [terms, setTerms] = useState("No terms available.");
  const [gstNo, setGstNo] = useState(null);
  const [cancellationPolicy, setCancellationPolicy] = useState(
    "No cancellation policy available."
  );
  const [paymentMode, setPaymentMode] = useState("post");
  const siteId = getItemInLocalStorage("SITEID");
  // const [userOptions, setUserOptions] = useState([]);
  const [formData, setFormData] = useState({
    amenity_id: "",
    amenity_slot_id: "",
    user_id: "",
    booking_date: "",
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
  });


  const [prices, setPrices] = useState({
    member_price_adult: 0,
    member_price_child: 0,
    guest_price_adult: 0,
    guest_price_child: 0,
    tenant_price_adult: 0,
    tenant_price_child: 0,
  })

  console.log("formData", formData);

  //Use Effect

  useEffect(() => {
    fetchFacilities();
    if (!formData.booking_date) {
      setFormData((prevData) => ({
        ...prevData,
        booking_date: today,
      }));
    }
    fetchUsers();
  }, []);


  const handlePaymentChange = (mode) => {
    setPaymentMode(mode);
    setFormData({ ...formData, payment_mode: mode })
  }

  // Calculate GST based on total amount before tax
  const calculateGST = (amount, gstNo) => {
    return (amount * gstNo) / 100;
  };

  const fetchFacilities = async () => {
    try {
      const response = await getFacitilitySetup(); // Assuming getFacilitySetup is an API call
      // console.log("Booking Setups", response);

      setFacilities(response.data)

    } catch (error) {
      console.log("Error Fetching facilities", error);
    }
  };

  const fetchSlotsForFacility = async (facilityId) => {
    try {
      const response = await getFacitilitySetup(); // Fetch facilities
      if (response?.data) {
        // Find the selected facility by ID
        const selectedFacility = response.data.find(
          (facility) => facility.id === parseInt(facilityId)
        );

        if (selectedFacility?.amenity_slots) {
          setSlots(selectedFacility.amenity_slots); // Update slots state with amenity_slots
        } else {
          console.log("No Slots Found for this Facility");
          setSlots([]); // Reset slots if none are found
        }
      } else {
        console.log("No Facilities Found");
      }
    } catch (error) {
      console.log("Error Fetching Slots", error);
    }
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
            selectedFacility.cancellation_policy || "No cancellation policy available."
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
    const updatedFormData = { ...formData, [field]: parseInt(value) };
    const memberTotal =
      (updatedFormData.member_adult * prices.member_price_adult) +
      (updatedFormData.member_child * prices.member_price_child);
    const guestTotal =
      (updatedFormData.guest_adult * prices.guest_price_adult) +
      (updatedFormData.guest_child * prices.guest_price_child);
    const tenantTotal =
      (updatedFormData.tenant_adult * prices.tenant_price_adult) +
      (updatedFormData.tenant_child * prices.tenant_price_child);
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



  const handleSlotChange = (e) => {
    const selectedSlotId = e.target.value;
    setSelectedSlot(selectedSlotId); // Update selected slot state
    setFormData((prevData) => ({
      ...prevData,
      amenity_slot_id: selectedSlotId, // Update formData with selected slot
    }));
  };



  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate); // Update local date state
    setFormData((prevData) => ({
      ...prevData,
      booking_date: selectedDate, // Update booking_date in formData state
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

    if (!formData.amenity_id || !formData.amenity_slot_id) {
      toast.error("Facility and Slot Must be present!")
      return;
    }

    try {
      // Append all necessary fields dynamically
      postData.append("amenity_booking[site_id]", formData.site_id || "");
      postData.append("amenity_booking[user_id]", formData.user_id || "");
      postData.append("amenity_booking[amenity_id]", formData.amenity_id || "");
      postData.append("amenity_booking[amenity_slot_id]", formData.amenity_slot_id || "");
      postData.append("amenity_booking[booking_date]", formData.booking_date || "");
      postData.append("amenity_booking[payment_mode]", formData.payment_mode || "");
      postData.append("amenity_booking[amount]", formData.amount || "");
      postData.append("amenity_booking[guest_adult]", formData.guest_adult || "");
      postData.append("amenity_booking[guest_child]", formData.guest_child || "");
      postData.append("amenity_booking[member_adult]", formData.member_adult || "");
      postData.append("amenity_booking[member_child]", formData.member_child || "");

      // Debugging: Log the entire FormData
      for (const [key, value] of postData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // API call
      const response = await postAmenitiesBooking(postData);

      // Handle the response
      console.log("Booking response:", response);

      toast.success("Booking successful!");
      navigate('/bookings');
    } catch (error) {
      // Handle errors
      console.error("Error in booking:", error);
      alert("Error in booking. Please try again.");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getAssignedTo(); // Replace with your API call
      const transformedUsers = response.data.map((user) => ({
        value: user.id,
        label: `${user.firstname} ${user.lastname}`,
      }));
      setUserOptions(transformedUsers);
      console.log("Fetched Users:", transformedUsers);
    } catch (error) {
      console.error("Error fetching assigned users:", error);
    }
  };

  const handleFacilityChange = (e) => {
    const selectedFacilityId = e.target.value; // Get the selected facility ID from the dropdown
    setSelectedSlot(""); // Reset selected slot
    fetchSlotsForFacility(selectedFacilityId);
    fetchTermsPolicy(selectedFacilityId);
    const selectedAFacility = facilities.find((facility) => facility.id === selectedFacilityId); // Find the facility by ID
    setFacility(selectedAFacility);
    setFormData((prevData) => ({
      ...prevData,
      amenity_id: selectedFacilityId, // Update amenity_id in formData state
    }));
  };  

  const handleSelectChange = (e) => {
    const selectedUserId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      user_id: selectedUserId, // Update user_id in the formData state
    }));
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
              Book Facility
            </h2>
            <div className="grid grid-cols-4 gap-2">
              <div className="flex flex-col gap-1">
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
              </div>



              <div className="flex flex-col gap-1">
                <p className="font-semibold">User :</p>
                {/* <Select
                      options={users}
                      closeMenuOnSelect={false}
                      placeholder="Select User"
                      value={users.filter((user) =>
                        formData.user_id.includes(user.value)
                      )}
                      onChange={handleUserSelectChange}
                      // isMulti
                      className="w-full"
                    /> */}

                <select
                  className="border p-2 px-4 border-gray-500 rounded-md"
                  value={formData.user_id}
                  onChange={handleSelectChange}
                >
                  <option value="">Select User</option>
                  {userOptions.map((user, index) => (
                    <option key={index} value={user.value}>
                      {user.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="bookingDate" className="font-semibold">
                  Select Date:
                </label>
                <input
                  type="date"
                  id="bookingDate"
                  name="bookingDate"
                  value={date} // Default to today's date
                  onChange={handleDateChange}
                  className="border p-[6px] px-4 border-gray-500 rounded-md w-60"
                />
              </div>
            </div>
            {facility !== "" && slots.length > 0 && (
              <div className="grid grid-cols-4 gap-1 mt-5">
                <p className="font-semibold">Select Slot :</p>
                <select
                  className="border p-2 px-4 border-gray-500 rounded-md"
                  value={selectedSlot}
                  onChange={handleSlotChange}
                >
                  <option value="">Select Slot</option>
                  {slots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.start_hr}:{slot.start_min} - {slot.end_hr}:{slot.end_min}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="my-2">
              <h2 className="border-b text-xl border-black font-semibold">
                Payment Mode
              </h2>
              <div>
                <div className=" flex flex-col md:flex-row  items-center my-2 w-full">
                  {/* <p className="font-semibold">For :</p> */}
                  <div className="flex gap-5 w-full">
                    <p
                      className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${paymentMode === "post" && "bg-black text-white"
                        }`}
                      onClick={() => handlePaymentChange("post")}
                    >
                      Post Paid
                    </p>
                    <p
                      className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${paymentMode === "pre" && "bg-black text-white"
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
              Users
            </div>
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
                  <label htmlFor="" className="font-semibold">Member:</label>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="member_adult" className="text-sm">Adult</label>
                    <input
                      name="member_adult"
                      type="number"
                      className="flex-1 p-2 border border-gray-300 rounded"
                      placeholder="No. of Member Adult"
                      value={formData.member_adult}
                      onChange={(e) => handleInputChange('member_adult', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="member_child" className="text-sm">Child</label>
                    <input
                      name="member_child"
                      id="member_child"
                      type="number"
                      className="flex-1 p-2 border border-gray-300 rounded"
                      placeholder="No. of Member Child"
                      value={formData.member_child}
                      onChange={(e) => handleInputChange('member_child', e.target.value)}
                    />
                  </div>
                  <div>
                    Total: {formData.member_adult * prices.member_price_adult + formData.member_child * prices.member_price_child}
                  </div>
                </div>

                {/* Guest Fields */}
                <div className="flex flex-col items-center border-b border-black pb-2 space-y-2">
                  <label htmlFor="" className="font-semibold">Guest:</label>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="guest_adult" className="text-sm">Adult</label>
                    <input
                      name="guest_adult"
                      type="number"
                      id="guest_adult"
                      className="flex-1 p-2 border border-gray-300 rounded"
                      placeholder="No. of Guest Adult"
                      value={formData.guest_adult}
                      onChange={(e) => handleInputChange('guest_adult', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="guest_child" className="text-sm">Child</label>
                    <input
                      name="guest_child"
                      id="guest_child"
                      type="number"
                      placeholder="No. of Guest Child"
                      className="flex-1 p-2 border border-grey-300 rounded"
                      value={formData.guest_child}
                      onChange={(e) => handleInputChange('guest_child', e.target.value)}
                    />
                  </div>
                  <div>
                    Total: {formData.guest_adult * prices.guest_price_adult + formData.guest_child * prices.guest_price_child}
                  </div>
                </div>

                {/* Tenant Fields */}
                <div className="flex flex-col items-center border-b border-black pb-2 space-y-2">
                  <label htmlFor="" className="font-semibold">Tenant:</label>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="tenant_adult" className="text-sm">Adult</label>
                    <input
                      name="tenant_adult"
                      id="tenant_adult"
                      type="number"
                      className="border rounded border-grey-300 p-2 flex"
                      placeholder="No. of Tenant Adult"
                      value={formData.tenant_adult}
                      onChange={(e) => handleInputChange('tenant_adult', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="tenant_child" className="text-sm">Child</label>
                    <input
                      name="tenant_child"
                      id="tenant_child"
                      type="number"
                      placeholder="No. Of Tenant Child"
                      className="flex p-2 border border-grey-300 rounded"
                      value={formData.tenant_child}
                      onChange={(e) => handleInputChange('tenant_child', e.target.value)}
                    />
                  </div>
                  <div>
                    Total: {formData.tenant_adult * prices.tenant_price_adult + formData.tenant_child * prices.tenant_price_child}
                  </div>
                </div>
              </div>

              {/* Final Amount */}
              <div className="flex items-center space-x-2 justify-end">
                <label htmlFor="gst" className="font-bold">Gst (%):
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
                <label htmlFor="amount" className="font-bold">Total Amount: </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount || 0} // Display total in input field
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
                <li className="font-medium">
                  {cancellationPolicy}

                </li>

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
                <li className="font-medium">
                  {terms}
                </li>
              </div>
            </Collapsible>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilityBooking;
"http://13.215.74.38//complaint_modes.jsontoken=efe990d24b0379af8ba3d0a986ac802796bc2e0db15552&q[of_atype]=complaint"