import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import CustomTrigger from "../../containers/CustomTrigger";
import SeatTimeSlot, { initialSelectedTimes } from "./SeatTimeSlot";
import Select from "react-select";
import { getFacitilitySetup, getLogin, getSiteData, postAmenitiesBooking } from "../../api";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { FaCheck } from "react-icons/fa";
import { getItemInLocalStorage } from "../../utils/localStorage";
const FacilityBooking = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [slots, setSlots] = useState([]);
  const [behalf, setBehalf] = useState("self");
  const [isOpen, setIsOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState(initialSelectedTimes);
  const [timeSelected, setTimeSelected] = useState(false);
  const [time, setTime] = useState("");
  const [users, setUsers] = useState([]);
  const [date, setDate] = useState(formattedDate);
  const [siteData, setSiteData] = useState([]);
  const [facility, setFacility] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [paymentMode, setPaymentMode] = useState("post");
  const siteId = getItemInLocalStorage("SITEID");
  const [selectedUser, setSelectedUser] = useState(""); // Holds the selected UserId
  const [userOptions, setUserOptions] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
    const [formData, setFormData] = useState({
      amenity_id: "",
      amenity_slot_id: "",
      user_id: "" ,
      booking_date: "",
      site_id: siteId ,
      amount: "",
      member_adult: "",
      member_child: "",
      guest_adult: "",
      guest_child: "",
    });
  console.log("Data", formData);

  const fetchFacilities = async () => {
    try {
      const response = await getFacitilitySetup();
      console.log("res", response);
      
      if (response?.data) {
        setFacilities(response.data);
      } else {
        console.log("No Amenities Found");
      }
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


  const handleButtonClick = (selectedTime) => {
    setSelectedTimes((prevState) => {
      const newState = {
        ...prevState,
        [selectedTime]: !prevState[selectedTime],
      };

      // Determine if any time slot is selected
      const anyTimeSelected = Object.values(newState).some(
        (isSelected) => isSelected
      );

      // Update the state for timeSelected and time
      setTimeSelected(anyTimeSelected);
      setTime(anyTimeSelected ? selectedTime : "");

      return newState;
    });
  };

  const postBookFacility = async () => {
    const postData = new FormData();
  
    try {
      // Append all necessary fields dynamically
      postData.append("amenity_booking[amenity_id]", formData.amenity_id || "");
      postData.append("amenity_booking[amenity_slot_id]", formData.amenity_slot_id || "");
      postData.append("amenity_booking[amount]", formData.amount || "");
      postData.append("amenity_booking[booking_date]", formData.booking_date || "");
      postData.append("amenity_booking[guest_adult]", formData.guest_adult || "");
      postData.append("amenity_booking[guest_child]", formData.guest_child || "");
      postData.append("amenity_booking[member_adult]", formData.member_adult || "");
      postData.append("amenity_booking[member_child]", formData.member_child || "");
      postData.append("amenity_booking[site_id]", formData.site_id || "");
      postData.append("amenity_booking[user_id]", formData.user_id || "");
  
      // Debugging: Log the entire FormData
      for (const [key, value] of postData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
      // API call
      const response = await postAmenitiesBooking(postData);
  
      // Handle the response
      console.log("Booking response:", response);
  
      alert("Booking successful!");
    } catch (error) {
      // Handle errors
      console.error("Error in booking:", error);
      alert("Error in booking. Please try again.");
    }
  };
  
  

  useEffect (() => {
    fetchFacilities();
      // Fetch user data from localStorage
      const userFirst = getItemInLocalStorage("Name");
      const userLast = getItemInLocalStorage("LASTNAME");
      const userID = getItemInLocalStorage("UserId");
  
      // If user data exists, add it to options
      if (userFirst && userLast && userID) {
        setUserOptions([
          {
            label: `${userFirst} ${userLast}`, // Full name
            value: userID, // UserId
          },
        ]);
      }
  },[]);

  const handleFacilityChange = (e) => {
    const selectedFacilityId = e.target.value; // Get the selected facility ID from the dropdown
    setSelectedSlot(""); // Reset selected slot
  
    if (selectedFacilityId) {
      fetchSlotsForFacility(selectedFacilityId); // Fetch slots for the selected facility
    }
  
    setFacility(selectedFacilityId); // Update local facility state
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
              style={{ background: themeColor }}
              className="text-xl p-2 rounded-md font-semibold text-center mb-4 text-white "
            >
              Book Facility
            </h2>
            <div className="grid grid-cols-4 gap-2">
            <div className="flex flex-col gap-1">
  <p className="font-semibold">Facility :</p>
  <select
    className="border p-2 px-4 border-gray-500 rounded-md"
    value={facility}
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
      <select
        className="border p-2 px-4 border-gray-500 rounded-md"
        value={formData.user_id} // Bind the value to formData.user_id
        onChange={handleSelectChange} // Update user_id on change
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
        value={date}
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
                      className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                        paymentMode === "post" && "bg-black text-white"
                      }`}
                      onClick={() => setPaymentMode("post")}
                    >
                      Post Paid
                    </p>
                    <p
                      className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                        paymentMode === "pre" && "bg-black text-white"
                      }`}
                      onClick={() => setPaymentMode("pre")}
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
            <div className="flex flex-col my-2">
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
                  {" "}
                  Cancellations made between 48 and 168 hours (2 to 7 days)
                  before the booking time will incur a 50% cancellation fee.
                </li>
                <li className="font-medium">
                  {" "}
                  Cancellations made less than 48 hours before the booking time
                  will not be refunded.
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
                  The facility must be used for the purpose stated at the time
                  of booking. Any change in purpose requires prior approval.
                </li>
                <li className="font-medium">
                  The booking party is responsible for any damage caused to the
                  facility during the booking period. Any repair costs will be
                  charged to the booking party.
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