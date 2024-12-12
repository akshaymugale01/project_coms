import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "../../../components/table/Table"; // Update path as needed
import { getFacitilitySetup } from "../../../api"; // Import API call

const BookingDetails = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await getFacitilitySetup(); // Adjust API call as needed
        console.log(response)
        setBookingDetails(response.data); // Assume `response.data` contains the booking details
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, []);

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

  const {
    id,
    status,
    scheduled_date,
    slot,
    booked_on,
    booked_by,
    gst,
    payable_amount,
    transaction_id,
    payment_status,
    payment_method,
    amount_paid,
    members,
  } = bookingDetails;

  return (
    <section>
      <div
        style={{ background: themeColor }}
        className="flex justify-center bg-black m-2 p-2 rounded-md"
      >
        <h2 className="text-xl font-semibold text-center text-white">
          Booking Details
        </h2>
      </div>
      <div className="flex flex-col w-full p-2">
        <div className="flex justify-between items-center w-full">
          <h1 className="w-full font-medium text-lg">Test Meeting Room</h1>
          <div className="flex justify-end gap-2 w-full">
            <p className="text-end bg-red-900 rounded-md text-white p-2">
              Capture Payment
            </p>
            <p className="text-end bg-yellow-500 rounded-md text-white p-2">
              Request Payment
            </p>
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
              className={`${
                status === "Confirmed"
                  ? "bg-green-400"
                  : "bg-yellow-500"
              } text-white p-1 rounded-md text-center`}
            >
              {status}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Scheduled Date:</p>
            <p>{scheduled_date}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Selected Slot:</p>
            <p>{slot}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Booked On:</p>
            <p>{booked_on}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Booked By:</p>
            <p>{booked_by}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">GST:</p>
            <p>₹ {gst}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Payable Amount:</p>
            <p>₹ {payable_amount}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Transaction ID:</p>
            <p>{transaction_id || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Payment Status:</p>
            <p
              className={`${
                payment_status === "Pending"
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
        <div>
          <h2 className="border-b font-medium">Member Details</h2>
          <Table data={members} /> {/* Pass members data to the Table */}
        </div>
      </div>
    </section>
  );
};

export default BookingDetails;
