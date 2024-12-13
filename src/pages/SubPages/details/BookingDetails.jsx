import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "../../../components/table/Table"; // Update path as needed
import { getAmenitiesBooking, getAmenitiesIdBooking, getFacitilitySetup } from "../../../api"; // Import API call
import { useParams } from "react-router-dom";

const BookingDetails = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const { id } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [facilityDetails, setFacilityDetails] = useState(null); // To hold the fetched facility data

  useEffect(() => {
    const fetchBookingAndFacilityDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the booking details using the provided ID
        const bookingResponse = await getAmenitiesIdBooking(id);
        const bookingData = bookingResponse.data;
        setBookingDetails(bookingData);

        // Extract amenity_id from the booking data
        const amenityId = bookingData.amenity_id;
        console.log("amenityId", amenityId);

        // Fetch facility details using the amenity_id
        const facilityResponse = await getFacitilitySetup(amenityId);
        const facilityData = facilityResponse.data;

        const filteredFacilityData = facilityData.find(facility => facility.id === amenityId);
        setFacilityDetails(filteredFacilityData);
        console.log("Amenities Booking Data:", bookingData);
        console.log("Setup Facility Data for amenity_id:", amenityId, filteredFacilityData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching booking or facility details:", error);
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    // Trigger the data fetching when the component is mounted or when the `id` changes
    if (id) {
      fetchBookingAndFacilityDetails();
    }
  }, [id]);

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

  // Extract booking data and facility details
  const {
    status,
    booking_date,
    slot,
    booked_on,
    booked_by,
    gst_no,
    payable_amount,
    transaction_id,
    payment_status,
    payment_method,
    amount_paid,
    members,
    amenity_id,
  } = bookingDetails;

  // Facility Data
  const {
    fac_name,
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

  // Find the relevant slot time based on the slot ID in the booking
  const amenitySlotId = bookingDetails?.amenity_slot_id;
  const selectedSlot = facilityDetails?.amenity_slots?.find(
    (slot) => slot.id === amenitySlotId
  ); // Find the matching slot
  const slotTime = selectedSlot
    ? `${selectedSlot.start_hr}:${selectedSlot.start_min} - ${selectedSlot.end_hr}:${selectedSlot.end_min}`
    : "N/A";


  return (
    <section>
      <div
        style={{ background: themeColor }}
        className="flex justify-center bg-black m-2 p-2 rounded-md"
      >
        <h2 className="text-xl font-semibold text-center text-white">Booking Details</h2>
      </div>
      <div className="flex flex-col w-full p-2">
        <div className="flex justify-between items-center w-full">
          <h1 className="w-full font-medium text-lg">{fac_name}</h1>
          <div className="flex justify-end gap-2 w-full">
            <p className="text-end bg-red-900 rounded-md text-white p-2">Capture Payment</p>
            <p className="text-end bg-yellow-500 rounded-md text-white p-2">Request Payment</p>
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
            <p>{booking_date}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Booked By:</p>
            <p>{booked_by}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">GST:</p>
            <p>{facilityGstNo} %</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Payable Amount:</p>
            <p>₹ {payable_amount}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Transaction ID:</p>
            <p>{transaction_id  }</p>
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
            <p>{payment_method}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Amount Paid:</p>
            <p>₹ {amount_paid}</p>
          </div>
        </div>

        {/* Facility Details */}
        <div className="grid grid-cols-2 gap-4">
          {/* Member Section */}
          <div>
            <h2 className="border-b font-medium mb-2">Member</h2>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Adult</p>
              <p>₹{member_price_adult}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Child</p>
              <p>₹{member_price_child}</p>
            </div>
          </div>

          {/* Guest Section */}
          <div>
            <h2 className="border-b font-medium mb-2">Guest</h2>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Adult</p>
              <p>₹{guest_price_adult}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Child</p>
              <p>₹{guest_price_child}</p>
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
