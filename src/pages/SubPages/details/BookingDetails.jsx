import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "../../../components/table/Table"; // Update path as needed
import { getAmenitiesBooking, getAmenitiesIdBooking, getAssignedTo, getFacitilitySetup, getSetupUsers, getSiteData } from "../../../api"; // Import API call
import { Navigate, useNavigate, useParams } from "react-router-dom";

const BookingDetails = () => {
  const themeColor = useSelector((state) => state.theme.color);

  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [facilityDetails, setFacilityDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resource_id: "",
    resource_type: "CamBill",
    total_amount: "",
    paid_amount: "",
    user_id: "",
    payment_method: "",
    transaction_id: "",
    payment_date: "",
  });


  // Extract booking data and facility details
  const {
    status,
    booking_date,
    slot,
    booked_on,
    booked_by,
    user_id,
    member_adult,
    member_child,
    guest_adult,
    guest_child,
    payable_amount,
    transaction_id,
    payment_status,
    payment_mode,
    amount_paid,
    amount,
    members,
    amenity_id,
  } = bookingDetails || {};

  // Facility Dat
  const {
    fac_name,
    created_at,
    fac_type,
    description,
    gst_no: facilityGstNo,
    terms,
    amenity_slots,
    guest_price_adult,
    guest_price_child,
    member_price_adult,
    member_price_child,
  } = facilityDetails || {};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchUsers = async () => {
    try {
      const response = await getAssignedTo(); // Replace with your API call
      const transformedUsers = response.data.map((user) => ({
        value: user.id,
        label: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
      }));
      setUserOptions(transformedUsers);
      console.log("Fetched Users:", transformedUsers);
      console.log("Fetched Users:", user_id);
      // console.log("prov", userId);

      // Find the user by ID and set the name
      const user = transformedUsers.find((u) => u.value === user_id);
      setUserName(user.label); // Full name (label

    } catch (error) {
      console.error("Error fetching assigned users:", error);
      setUserName("Error fetching user");
    }
  };

  useEffect(() => {
    const fetchBookingAndFacilityDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const bookingResponse = await getAmenitiesIdBooking(id);
        const bookingData = bookingResponse.data;
        setBookingDetails(bookingData);

        bookingDetails;

        const amenityId = bookingData.amenity_id;
        console.log("amenityId", amenityId);

        const facilityResponse = await getFacitilitySetup(amenityId);
        const facilityData = facilityResponse.data;
        const filteredFacilityData = facilityData.find(
          (facility) => facility.id === amenityId
        );
        setFacilityDetails(filteredFacilityData);

        console.log("Booking Data:", bookingData);
        console.log("Facility Data for amenity_id:", amenityId, filteredFacilityData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booking or facility details:", error);
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchUsers();

    if (id) {
      fetchBookingAndFacilityDetails();
    }
  }, [user_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading booking details...</p>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No booking details available</p>
      </div>
    );
  }

  // Find the relevant slot time based on the slot ID in the booking
  const amenitySlotId = bookingDetails?.amenity_slot_id;
  const selectedSlot = facilityDetails?.amenity_slots?.find(
    (slot) => slot.id === amenitySlotId
  ); // Find the matching slot
  const slotTime = selectedSlot
    ? `${selectedSlot.start_hr}:${selectedSlot.start_min} - ${selectedSlot.end_hr}:${selectedSlot.end_min}`
    : "N/A";

  let created = () => {
    const date = new Date(created_at);
    const yy = date.getFullYear().toString(); // Get last 2 digits of the year
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const dd = String(date.getDate()).padStart(2, '0');
    return `${dd}/${mm}/${yy}`;
  }


  return (
    <section>
      <div
        style={{ background: "rgb(17, 24, 39)" }}
        className="flex justify-center bg-black m-2 p-2 rounded-md"
      >
        <h2 className="text-xl font-semibold text-center text-white">Booking Details</h2>
      </div>
      <div className="flex flex-col w-full p-2">
        <div className="flex justify-between items-center w-full">
          <h1 className="w-full font-medium text-lg">Title:  {fac_name}</h1>
          <div>
            <div className="flex justify-end gap-2 w-full">
              <button
                className="bg-yellow-500 rounded-md text-white p-2 w-[150px] cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                Capture Payment
              </button>
              <button
                className="bg-red-500 rounded-md text-white p-2 w-[100px] cursor-pointer"
                onClick={() => navigate("/bookings")}
              >
                Cancel
              </button>
            </div>

            {showModal && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-md w-96">
                  <h2 className="text-xl font-bold mb-4">Capture Payment</h2>
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      name="resource_id"
                      placeholder="Resource ID"
                      value={formData.resource_id}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md w-full"
                    />
                    <input
                      type="text"
                      name="total_amount"
                      placeholder="Total Amount"
                      value={formData.total_amount}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md w-full"
                    />
                    <input
                      type="text"
                      name="paid_amount"
                      placeholder="Paid Amount"
                      value={formData.paid_amount}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md w-full"
                    />
                    <input
                      type="text"
                      name="user_id"
                      placeholder="User ID"
                      value={formData.user_id}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md w-full"
                    />
                    <input
                      type="text"
                      name="payment_method"
                      placeholder="Payment Method"
                      value={formData.payment_method}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md w-full"
                    />
                    <input
                      type="text"
                      name="transaction_id"
                      placeholder="Transaction ID"
                      value={formData.transaction_id}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md w-full"
                    />
                    <input
                      type="date"
                      name="payment_date"
                      placeholder="Payment Date"
                      value={formData.payment_date}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md w-full"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        className="bg-blue-500 text-white p-2 rounded-md"
                      // onClick={handleSubmit}
                      >
                        Submit
                      </button>
                      <button
                        className="bg-gray-500 text-white p-2 rounded-md"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 w-full gap-5 my-2 bg-blue-50 border rounded-xl p-2">
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Booking ID:</p>
            <p>{id}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Status:</p>
            <p
              className={`${status === "Confirmed"
                ? "bg-green-400"
                : "bg-yellow-500"
                } text-white p-1 rounded-md text-center`}
            >
              {status}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Scheduled Date:</p>
            <p>{booking_date}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Selected Slot:</p>
            <p>{slotTime}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Booked On:</p>
            <p>{created()}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Booked By:</p>
            <p>{userName}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">GST:</p>
            <p>{facilityGstNo} %</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Payable Amount:</p>
            <p>₹ {amount}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Transaction ID:</p>
            <p>{transaction_id}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Payment Status:</p>
            <p
              className={`${payment_status === "Pending"
                ? "bg-yellow-500"
                : "bg-green-400"
                } text-white text-center p-1 rounded-md`}
            >
              {payment_status}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Payment Method:</p>
            <p>{payment_mode === "post" ? "Postpaid" : payment_mode === "pre" ? "Prepaid" : "Unknown Payment Mode"}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Amount Paid:</p>
            <p>₹ {amount_paid}</p>
          </div>
        </div>

        {/* Facility Details */}
        <div className="grid grid-cols-3 gap-4">
          {/* Member Section */}
          <div>
            <h2 className="border-b font-medium mb-2">Member:</h2>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Adult:</p>
              <p>{member_adult}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Child:</p>
              <p>{member_child}</p>
            </div>
          </div>

          {/* Guest Section */}
          <div>
            <h2 className="border-b font-medium mb-2">Guest:</h2>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Adult:</p>
              <p>{guest_adult}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Child:</p>
              <p>{guest_child}</p>
            </div>
          </div>

          <div>
            <h2 className="border-b font-medium mb-2">Tenant:</h2>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Adult:</p>
              <p>{member_adult}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Child:</p>
              <p>{member_child}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="border font-medium mb-2"  >Description: {description}</p>
          <p className="border font-medium mb-2"  >Terms: {terms}</p>
        </div>

      </div>
    </section>
  );
};

export default BookingDetails;
