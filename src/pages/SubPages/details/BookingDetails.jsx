import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../../components/Navbar";
import { getAmenitiesIdBooking, getSetupUsers, getFacitilitySetup, getPaymentBookings, postPaymentBookings } from "../../../api"; // Import API call

const BookingDetails = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const { id } = useParams();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // state to control the modal
  const [userOptions, setUserOptions] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [facilityDetails, setFacilityDetails] = useState(null);
  const [formData, setFormData] = useState({
    resource_id: id,
    resource_type: "AmenityBooking",
    total_amount: "",
    paid_amount: "",
    user_id: "",
    payment_method: "",
    transaction_id: "",
    paymen_date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch booking and facility details
      const bookingResponse = await getAmenitiesIdBooking(id);
      const bookingData = bookingResponse.data;

      console.log("data", bookingData);

      if (bookingData.length === 0) {
        setError("No booking data found.");
        return;
      }

      const bookingD = bookingResponse.data;

      setBookingDetails(bookingD)

      // const bookingD = bookingData.map((facility) => facility.id === parseInt(id));
      // if (bookingD) {
      //   setBookingDetails(bookingD);
      // } else {
      //   setError("Facility not found.");
      //   return;
      // }

      // Fetch facility details
      const amenityId = bookingD.amenity_id;
      const facilityResponse = await getFacitilitySetup(amenityId);
      const facilityData = facilityResponse.data;
      const filteredFacilityData = facilityData.find((facility) => facility.id === amenityId);
      setFacilityDetails(filteredFacilityData);

      // Fetch payment details
      const paymentResponse = await getPaymentBookings();
      const paymentDetails = paymentResponse.data.filter(record => record.resource_id === parseInt(id));
      if (paymentDetails.length > 0) {
        setFormData(paymentDetails[0]);
      }

      // Fetch users
      const userResponse = await getSetupUsers();
      const transformedUsers = userResponse.data.map((user) => ({
        value: user.id,
        label: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
      }));
      setUserOptions(transformedUsers);
      const user = transformedUsers.find((u) => u.value === bookingD.user_id);
      setUserName(user ? user.label : "User not found");

    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {


    if (id) {
      fetchData();
    }
  }, [id]);

  const postPaymentBooking = async () => {
    if (!formData.payment_method || !formData.paymen_date) {
      toast.error("Payment Method and Date must be there!");
      return;
    }

    try {
      const postData = new FormData();
      Object.keys(formData).forEach((key) => postData.append(`payment[${key}]`, formData[key]));

      const response = await postPaymentBookings(postData);
      if (response?.status === 201) {
        toast.success("Booking successful!");
        navigate(`/bookings/booking-details/${id}`);
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error in booking:", error);
      toast.error("Error in booking. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePaymentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      payment_method: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading booking details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  // Ensure that we have valid bookingDetails and facilityDetails before rendering
  if (!bookingDetails || !facilityDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No booking or facility details available.</p>
      </div>
    );
  }

  // Cancel PopUp

  const handleCancelClick = () => {
    setShowConfirmPopup(true); // Show confirmation popup when cancel is clicked
  };

  // const handleConfirmCancel = () => {
  //   navigate("/bookings"); // Navigate to bookings if confirmed
  // };
  const handleConfirmCancel = async () => {
    try {
      // Prepare the updated data
      const updatedBookingData = {
        status: "cancelled", // Update status to "cancelled"
      };

      // Make the API call to update the booking status
      const response = await fetch(`https://app.myciti.life/amenity_bookings/${bookingDetails.id}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBookingData),
      });

      // Check if the update was successful
      if (response.ok) {
        // Redirect to bookings page after successful update
        navigate("/bookings");
      } else {
        // Handle error response
        alert("Failed to cancel the booking. Please try again.");
      }
    } catch (error) {
      console.error("Error updating the booking:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleClosePopup = () => {
    setShowConfirmPopup(false); // Close the popup if canceled
  };

  // Format date for created_at field
  const created = () => {
    const date = new Date(facilityDetails.created_at);
    const yy = date.getFullYear().toString().slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${dd}/${mm}/${yy}`;
  };

  // Find the relevant slot time based on the slot ID in the booking
  const amenitySlotId = bookingDetails.amenity_slot_id;
  const selectedSlot = facilityDetails.amenity_slots?.find((slot) => slot.id === amenitySlotId);
  const slotTime = selectedSlot
    ? `${selectedSlot.start_hr}:${selectedSlot.start_min} - ${selectedSlot.end_hr}:${selectedSlot.end_min}`
    : "N/A";
  console.log("slot time", slotTime);

  // console.log("fac anem", bookingDetails.amount);

  return (
    <section className="flex">
      <Navbar />

      <div className="w-full p-4 mb-5">
        <div
          style={{ background: "rgb(17, 24, 39)" }}
          className="flex justify-center bg-black m-2 p-2 rounded-md"
        >
          <h2 className="text-xl font-semibold text-center text-white">Booking Details</h2>
        </div>
        <div className="flex justify-between rounded border border-black p-2 items-center w-full">
          <h1 className="w-full font-medium text-lg">Title:  {facilityDetails.fac_name}</h1>
          <div>
            <div className="flex justify-end gap-2 w-full">
              <button
                className="bg-yellow-500 rounded-md text-white p-2 w-[150px] cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                Capture Payment
              </button>
              {/* <button
                className="bg-red-500 rounded-md text-white p-2 w-[100px] cursor-pointer"
                onClick={() => navigate("/bookings")}
              >
                Cancel
              </button> */}
              <div>
                <button
                  className="bg-red-500 rounded-md text-white p-2 w-[100px] cursor-pointer"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>

                {/* Confirmation Popup */}
                {showConfirmPopup && (
                  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                      <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
                      <p className="mb-4">Do you want to cancel and go back to the bookings page?</p>
                      <div className="flex justify-end gap-4">
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-md"
                          onClick={handleConfirmCancel}
                        >
                          Yes, Cancel
                        </button>
                        <button
                          className="bg-gray-500 text-white px-4 py-2 rounded-md"
                          onClick={handleClosePopup}
                        >
                          No, Stay
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {showModal && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-md w-96">
                  <h2 className="text-xl font-bold mb-4">Capture Payment</h2>
                  <div className="flex flex-col gap-4">
                    {/* <input
                      type="text"
                      disabled
                      name="resource_id"
                      placeholder="Resource ID"
                      value={formData.resource_id}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md w-full"
                    /> */}
                    <label>
                      Total Amount

                      <input
                        type="text"
                        name="total_amount"
                        placeholder="Total Amount"
                        value={amount}
                        onChange={handleInputChange}
                        className="border p-2 rounded-md w-full"
                      />
                    </label>

                    <label>
                      Paid Amount
                      <input
                        type="text"
                        name="paid_amount"
                        placeholder="Paid Amount"
                        value={formData.paid_amount}
                        onChange={handleInputChange}
                        className="border p-2 rounded-md w-full"
                      />
                    </label>

                    {/* <input
                      type="text"
                      name="user_id"
                      disabled
                      placeholder="User ID"
                      value={user_id}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md w-full"
                    /> */}


                    {/* <input
                      type="text"
                      name="payment_method"
                      placeholder="Payment Method"
                      value={payment_mode === "pre" ? "Prepaid" : "post" ? "Postpaid" : ""}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md w-full"
                    /> */}
                    <label>Payment Method
                      <select className="border p-2 rounde w-full"
                        value={formData.payment_method}
                        onChange={(e) => handlePaymentChange(e.target.value)}
                      >
                        <option value="">Select Payment Method</option>
                        <option value="CHEQUE">Cheque</option>
                        <option value="UPI">UPI</option>
                        <option value="NEFT">NEFT</option>
                        <option value="CASH">Cash</option>
                      </select>
                    </label>
                    <label> Transaction ID
                      <input
                        type="text"
                        name="transaction_id"
                        placeholder="Transaction ID"
                        value={formData.transaction_id}
                        onChange={handleInputChange}
                        className="border p-2 rounded-md w-full"
                      />
                    </label>
                    <label> Date
                      <input
                        type="date"
                        name="paymen_date"
                        placeholder="Payment Date"
                        value={formData.paymen_date}
                        onChange={handleInputChange}
                        className="border p-2 rounded-md w-full"
                      />
                    </label>
                    <label>Remarks
                      <input
                        type="textarea"
                        name="notes"
                        placeholder="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="border p-2 rounded-md w-full"
                      />
                    </label>
                    <div className="flex justify-end gap-2">
                      <button
                        className="bg-blue-500 text-white p-2 rounded-md"
                        onClick={postPaymentBooking}
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
              className={`${bookingDetails.status === "booked"
                  ? "bg-yellow-500" // yellow for booked
                  : bookingDetails.status === "cancelled"
                    ? "bg-red-500" // red for cancelled
                    : "bg-gray-500" // default color for other statuses
                } text-white p-1 rounded-md text-center`}
            >
              {bookingDetails.status.charAt(0).toUpperCase() + bookingDetails.status.slice(1)} {/* Capitalize first letter */}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Scheduled Date:</p>
            <p>{bookingDetails.booking_date}</p>
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
            <p>{facilityDetails.gst_no} %</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Payable Amount:</p>
            <p>₹ {bookingDetails.amount}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Transaction ID:</p>
            <p>{bookingDetails.payment.transaction_id || "Payment Not Done!"}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Payment Status:</p>
            <p
              className={`${bookingDetails.payment_status === "Pending"
                ? "bg-yellow-500"
                : "bg-green-400"
                } text-white text-center p-1 rounded-md`}
            >
              {bookingDetails.payment_status}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Payment Method:</p>
            <p>{bookingDetails.payment_mode === "post" ? "Postpaid" : bookingDetails.payment_mode === "pre" ? "Prepaid" : "Unknown Payment Mode"}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Amount Paid:</p>
            <p>₹ {bookingDetails.payment.paid_amount || "Payment Not Done!"}</p>
          </div>
        </div>


        {/* Facility Details */}



        <div className="grid grid-cols-3 gap-4">
          {/* Member Section */}
          <div>
            <h2 className="border-b font-medium mb-2">Member:</h2>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Adult:</p>
              <p>{bookingDetails.member_adult}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Child:</p>
              <p>{bookingDetails.member_child}</p>
            </div>
          </div>

          {/* Guest Section */}
          <div>
            <h2 className="border-b font-medium mb-2">Guest:</h2>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Adult:</p>
              <p>{bookingDetails.guest_adult}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Child:</p>
              <p>{bookingDetails.guest_child}</p>
            </div>
          </div>

          <div>
            <h2 className="border-b font-medium mb-2">Tenant:</h2>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Adult:</p>
              <p>{bookingDetails.tenant_adult}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Child:</p>
              <p>{bookingDetails.tenant_adult}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="border-b border-black mt-4">
            <h2 className="text-lg w-full font-medium">Payment Details:</h2>
          </div>

          {bookingDetails?.payment?.paid_amount && (
            <div className="mt-2 p-6 bg-white rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">Payment Method</label>
                  <p>{bookingDetails.payment.payment_method || "Not Done Payment"}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">Total Amount</label>
                  <p>{bookingDetails.payment.total_amount}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">Paid Amount</label>
                  <p>{bookingDetails.payment.paid_amount}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">Payment Date</label>
                  <p>{bookingDetails.payment.paymen_date}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">Transaction ID</label>
                  <p>{bookingDetails.payment.transaction_id}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">Notes</label>
                  <p>{bookingDetails.payment.notes}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">Resource ID</label>
                  <p>{formData.resource_id}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">Resource Type</label>
                  <p>{bookingDetails.payment.resource_type}</p>
                </div>
              </div>
            </div>
          )}
        </div>





        <div className="mt-4">
          <p className="border font-medium mb-2"  >Description: {facilityDetails.description}</p>
          <p className="border font-medium mb-2"  >Terms: {facilityDetails.terms}</p>
        </div>

      </div>
    </section>
  );
};

export default BookingDetails;
