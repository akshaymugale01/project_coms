import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../../components/Navbar";
import {
  getAmenitiesBookingById,
  getSetupUsers,
  getFacitilitySetupId,
  getPaymentBookings,
  postPaymentBookings,
  updateAmenityBook,
} from "../../../api"; // Import API call

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
    // total_amount: "",
    paid_amount: "",
    user_id: "",
    payment_method: "",
    transaction_id: "",
    paymen_date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  // console.log(formData);
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch booking and facility details
      // const bookingResponse = await getAmenitiesIdBooking(id);

      const bookingResponse = await getAmenitiesBookingById(id);
      const bookingData = bookingResponse.amenity_bookings;

      console.log("data", bookingData);

      if (bookingData.length === 0) {
        setError("No booking data found.");
        return;
      }

      const bookingD = bookingResponse.amenity_bookings[0];
      // console.log("REsponse received is", bookingD)
      setBookingDetails(bookingD);

      // const bookingD = bookingData.map((facility) => facility.id === parseInt(id));
      // if (bookingD) {
      //   setBookingDetails(bookingD);
      // } else {
      //   setError("Facility not found.");
      //   return;
      // }

      // Fetch facility details
      const amenityId = bookingD.amenity_id;
      console.log(amenityId);
      const facilityResponse = await getFacitilitySetupId(amenityId);
      // console.log("Facility data is", facilityResponse.data)
      const facilityData = facilityResponse.data;
      const filteredFacilityData = facilityData.id === amenityId; //returns true
      //  console.log("Facility filter", filteredFacilityData);
      if (filteredFacilityData) setFacilityDetails(facilityData);

      // Fetch payment details
      const paymentResponse = await getPaymentBookings();
      const paymentDetails = paymentResponse.data.filter(
        (record) => record.resource_id === parseInt(id)
      );
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

  // const postPaymentBooking = async () => {
  //   if (!formData.payment_method || !formData.transaction_id || !formData.paid_amount) {
  //     toast.error("Payment Type ,amount and Transactioin_Id are mandatory!");
  //     return;
  //   }

  //   try {
  //     const postData = new FormData();

  //     Object.keys(formData).forEach((key) => postData.append(`payment[${key}]`, formData[key]));

  //     postData.append('payment[total_amount]', bookingDetails.amount);

  //     const response = await postPaymentBookings(postData);
  //     // console.log(response);
  //     if (response?.status === 201) {
  //       toast.success("Payment Captured successful!");
  //       setShowModal(false);
  //       navigate(`/bookings`);
  //     } else {
  //       toast.error("Booking failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error in booking:", error);
  //     toast.error("Error in booking. Please try again.");
  //   }
  // };

  const postPaymentBooking = async () => {
    if (
      !formData.payment_method ||
      !formData.transaction_id ||
      !formData.paid_amount
    ) {
      toast.error("Payment Type, amount, and Transaction_Id are mandatory!");
      return;
    }

    // Validate that the payable amount matches the paid amount
    if (
      parseFloat(formData.paid_amount) !== parseFloat(bookingDetails.amount)
    ) {
      toast.error("Paid amount must equal the payable amount!");
      return;
    }

    try {
      const postData = new FormData();

      // Append all form data fields
      Object.keys(formData).forEach((key) =>
        postData.append(`payment[${key}]`, formData[key])
      );

      // Append the total amount (payable amount) to the request
      postData.append("payment[total_amount]", bookingDetails.amount);

      // Post payment data
      const response = await postPaymentBookings(postData);

      if (response?.status === 201) {
        // Update the booking status to "paid"
        const updatedBookingData = {
          status: "paid", // Change the status to "paid"
        };

        console.log("Booking ID to update:", id); // Log the id to check
        const updateResponse = await updateAmenityBook(id, updatedBookingData); // Pass the id and updated data
        console.log("update response", updateResponse);

        // Update the bookingDetails.payment directly with the posted data
        const updatedPayment = {
          payment_method: formData.payment_method,
          total_amount: bookingDetails.amount,
          paid_amount: formData.paid_amount,
          paymen_date: new Date().toISOString().split("T")[0], // Use current date or adjust as needed
          transaction_id: formData.transaction_id,
          notes: formData.notes || "N/A",
          resource_id: formData.resource_id,
          resource_type: formData.resource_type,
        };

        // Update bookingDetails state with the payment details
        setBookingDetails((prevDetails) => ({
          ...prevDetails,
          payment: updatedPayment,
        }));

        // Optionally navigate to another page or show a success message
        setShowModal(false);
        toast.success("Payment Captured successfully!");
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
    console.log("id", id);
    try {
      // Prepare the updated data
      const updatedBookingData = {
        status: "cancelled", // Update status to "cancelled"
      };

      // Make sure id is a valid string or number
      console.log("Booking ID to update:", id); // Log the id to check

      // Make the API call to update the booking status
      const response = await updateAmenityBook(id, updatedBookingData); // Pass the id and updated data
      console.log("response", response);

      // Check if the update was successful
      if (response?.status === 200) {
        // Redirect to bookings page after successful update

        toast.success("Status Cancelled!");
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

  // const handleConfirmCancel = async () => {
  //   try {
  //     // Prepare the updated data
  //     const updatedBookingData = {
  //       status: "cancelled", // Update status to "cancelled"
  //     };

  //     // Make the API call to update the booking status
  //     const response = await fetch(`https://app.myciti.life/amenity_bookings/${bookingDetails.id}.json`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedBookingData),
  //     });

  //     // Check if the update was successful
  //     if (response.ok) {
  //       // Redirect to bookings page after successful update
  //       toast.success("Status Cancelled!");
  //       navigate("/bookings");
  //     } else {
  //       // Handle error response
  //       alert("Failed to cancel the booking. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating the booking:", error);
  //     alert("An error occurred. Please try again.");
  //   }
  // };

  const handleClosePopup = () => {
    setShowConfirmPopup(false); // Close the popup if canceled
  };

  // Format date for created_at field
  const created = () => {
    const date = new Date(facilityDetails.created_at);
    const yy = date.getFullYear().toString();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");

    return `${yy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };

  // Find the relevant slot time based on the slot ID in the booking
  const amenitySlotId = bookingDetails.amenity_slot_id;
  const selectedSlot = facilityDetails.amenity_slots?.find(
    (slot) => slot.id === amenitySlotId
  );
  const slotTime = selectedSlot
    ? `${String(selectedSlot.start_hr || 0).padStart(2, "0")}:${String(
        selectedSlot.start_min || 0
      ).padStart(2, "0")} - ${String(selectedSlot.end_hr || 0).padStart(
        2,
        "0"
      )}:${String(selectedSlot.end_min || 0).padStart(2, "0")}`
    : "N/A";
  // console.log("slot time", slotTime);

  // console.log("fac anem", bookingDetails.amount);

  return (
    <section className="flex ">
      <Navbar />

      <div className="w-full p-4 mb-5">
        <div
          style={{ background: "rgb(17, 24, 39)" }}
          className="flex justify-center bg-black m-2 p-2 rounded-md"
        >
          <h2 className="text-xl font-semibold text-center text-white">
            Booking Details
          </h2>
        </div>
        <div className="flex justify-end rounded border border-black-50 p-2 items-center w-full">
          <div>
            <div className="flex justify-end gap-2 w-full">
              {bookingDetails.status !== "cancelled" &&
                bookingDetails.status !== "paid" && (
                  <button
                    className="bg-yellow-500 rounded-md text-white p-2 w-[150px] cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    Capture Payment
                  </button>
                )}
              {/* <button
                className="bg-red-500 rounded-md text-white p-2 w-[100px] cursor-pointer"
                onClick={() => navigate("/bookings")}
              >
                Cancel
              </button> */}
              <div>
                {bookingDetails.status !== "paid" && (
                  <button
                    className="bg-red-500 rounded-md text-white p-2 w-[100px] cursor-pointer"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                )}

                {/* Confirmation Popup */}
                {showConfirmPopup && (
                  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                      <h3 className="text-xl font-semibold mb-4">
                        Are you sure?
                      </h3>
                      <p className="mb-4">
                        Do you want to cancel and go back to the bookings page?
                      </p>
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
                        value={formData.total_amount || bookingDetails.amount} // Use formData.total_amount, fallback to bookingDetails.amount
                        onChange={handleInputChange}
                        className="border p-2 bg-gray-100 rounded-md w-full"
                        disabled // This will disable the input field
                      />
                    </label>

                    <label>
                      Paid Amount{" "}
                      <label className="text-red-500 font-semibold">*</label>
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
                    <label>
                      Payment Method{" "}
                      <label className="text-red-500 font-semibold">*</label>
                      <select
                        className="border p-2 rounded w-full"
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
                    <label>
                      {" "}
                      Transaction ID{" "}
                      <label className="text-red-500 font-semibold">*</label>
                      <input
                        type="text"
                        name="transaction_id"
                        placeholder="Transaction ID"
                        value={formData.transaction_id}
                        onChange={handleInputChange}
                        className="border p-2 rounded-md w-full"
                      />
                    </label>
                    <label>
                      {" "}
                      Date
                      <input
                        type="date"
                        name="paymen_date"
                        placeholder="Payment Date"
                        value={formData.paymen_date}
                        onChange={handleInputChange}
                        className="border p-2 rounded-md w-full"
                      />
                    </label>
                    <label>
                      Remarks
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
          <div className="grid grid-cols-2  gap-2 items-center">
            <p className="font-medium">Facility Name</p>
            <p>{facilityDetails.fac_name}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Booking ID:</p>
            <p>{id}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Status:</p>
            <p
              className={`${
                bookingDetails.status === "booked"
                  ? "bg-yellow-500" // yellow for booked
                  : bookingDetails.status === "cancelled"
                  ? "bg-red-500" // red for cancelled
                  : "bg-green-500" // default color for other statuses
              } text-white p-1 rounded-md text-center`}
            >
              {bookingDetails.status.charAt(0).toUpperCase() +
                bookingDetails.status.slice(1)}{" "}
              {/* Capitalize first letter */}
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
            {/* <p>{facilityDetails.created_at}</p> */}
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Booked By:</p>
            <p>{userName}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">GST(%):</p>
            <p>{Number(facilityDetails.gst_no) + Number(facilityDetails.sgst) || "NA"}</p>
          </div>

          {/* <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Transaction ID:</p>
            <p>{bookingDetails.payment?.transaction_id || "NA"}</p>
          </div> */}

          {/* <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Payment Status:</p>
            <p
              className={`
                       ${bookingDetails.status === "booked"
                                   ? "bg-yellow-500"
                                   : bookingDetails.status === "paid"
                                     ? "bg-green-400"
                                     : bookingDetails.status === "cancelled"
                                       ? "bg-red-500"
                                       : "bg-gray-300"} 
                       text-white text-center p-1 rounded-md
                     `}
            >
              {bookingDetails.status}
            </p>
          </div> */}

          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Payment Type:</p>
            <p>
              {bookingDetails.payment_mode === "post"
                ? "Postpaid"
                : bookingDetails.payment_mode === "pre"
                ? "Prepaid"
                : "Unknown Payment Mode"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Payable Amount:</p>
            <p>{bookingDetails.amount || "NA"}</p>
          </div>

          {bookingDetails.status === "paid" && (
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Amount Paid:</p>
              <p>{bookingDetails.payment?.paid_amount || "NA"}</p>
            </div>
          )}
          {/* 
          {bookingDetails.status === "paid" && (
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Payment Status:</p>
              <p
                className={`${bookingDetails.status === "booked"
                  ? "bg-yellow-500"
                  : bookingDetails.status === "paid"
                    ? "bg-green-500"
                    : bookingDetails.status === "cancelled"
                      ? "bg-red-500"
                      : "bg-gray-300"} text-white text-center p-1 rounded-md`}
              >
              </p>
            </div>
          )} */}

          {bookingDetails.status === "paid" && (
            <div className="flex justify-center bg-gray-100 items-center gap-4 border rounded-lg h-10">
              {bookingDetails.status.toUpperCase()}
            </div>
          )}
        </div>

        {/* Facility Details */}
        <div className="mt-2 p-4 bg-blue-50 grid grid-cols-3 rounded-lg shadow-md gap-4">
          {/* Member Section */}
          <div>
            <h2 className="border-b font-medium mb-2">Member:</h2>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Adult:</p>
              <p>{bookingDetails.member_adult || "NA"}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Child:</p>
              <p>{bookingDetails.member_child || "NA"}</p>
            </div>
          </div>

          {/* Guest Section */}
          <div>
            <h2 className="border-b font-medium mb-2">Guest:</h2>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Adult:</p>
              <p>{bookingDetails.guest_adult || "NA"}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Child:</p>
              <p>{bookingDetails.guest_child || "NA"}</p>
            </div>
          </div>

          <div>
            <h2 className="border-b font-medium mb-2">Tenant:</h2>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Adult:</p>
              <p>{bookingDetails.tenant_adult || "NA"}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <p className="font-medium">Child:</p>
              <p>{bookingDetails.tenant_adult || "NA"}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="border-b border-black mt-4">
            <h2 className="text-lg w-full font-medium">Payment Details:</h2>
          </div>

          {bookingDetails?.payment?.paid_amount && (
            <div className="mt-2 p-6 bg-blue-50 rounded-lg shadow-md">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">
                    Payment Type
                  </label>
                  <p>{bookingDetails.payment.payment_method || "NA"}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">
                    Total Amount
                  </label>
                  <p>{bookingDetails.payment.total_amount || "NA"}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">
                    Paid Amount
                  </label>
                  <p>{bookingDetails.payment.paid_amount || "NA"}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">
                    Payment Date
                  </label>
                  <p>{bookingDetails.payment.paymen_date || "NA"}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">
                    Transaction ID
                  </label>
                  <p>{bookingDetails.payment.transaction_id || "NA"}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">Notes</label>
                  <p>{bookingDetails.payment.notes || "NA"}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">
                    Resource ID
                  </label>
                  <p>{bookingDetails.payment.resource_id || "NA"}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-600">
                    Resource Type
                  </label>
                  <p>{bookingDetails.payment.resource_type || "NA"}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow-md border">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Description:
            </h3>
            <p
              className={`text-gray-600 ${
                facilityDetails.description ? "" : "italic text-gray-400"
              }`}
            >
              {facilityDetails.description || "NA"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Terms:</h3>
            <p
              className={`text-gray-600 ${
                facilityDetails.terms ? "" : "italic text-gray-400"
              }`}
            >
              {facilityDetails.terms || "NA"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingDetails;
