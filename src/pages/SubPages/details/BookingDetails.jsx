import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "../../../components/table/Table"; // Update path as needed
import { getAmenitiesBooking, getAmenitiesIdBooking, getAssignedTo, getFacitilitySetup, getPaymentBookings, getSetupUsers, getSiteData, postPaymentBookings } from "../../../api"; // Import API call
import { Navigate, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

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


  const bookID = id;

  console.log("formData", formData);
  console.log("date", formData.paymen_date)


  const postPaymentBooking = async () => {
    const postData = new FormData();

    if (!formData.paymen_date) {
      toast.error("Date must be there!")
      return;
    }

    try {
      // Append all necessary fields dynamically
      postData.append("payment[resource_id]", formData.resource_id || "");
      postData.append("payment[resource_type]", formData.resource_type || "");
      postData.append("payment[total_amount]", amount || "");
      postData.append("payment[paid_amount]", formData.paid_amount || "");
      postData.append("payment[user_id]", user_id || "");
      postData.append("payment[payment_method]", formData.payment_method || "");
      postData.append("payment[transaction_id]", formData.transaction_id || "");

      postData.append("payment[paymen_date]", formData.paymen_date || "");
      postData.append("payment[notes]", formData.notes || "");


      // Debugging: Log the entire FormData
      for (const [key, value] of postData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // API call
      const response = await postPaymentBookings(postData);

      // Handle the response
      console.log("Payment response:", response);

      toast.success("Booking successful!");
      navigate('/bookings');
    } catch (error) {
      // Handle errors
      console.error("Error in booking:", error);
      alert("Error in booking. Please try again.");
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePaymentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      payment_method: value
    }));
  }

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


  const fetchPaymentDetails = async (id) => {
    try {
      const response = await getPaymentBookings();
      console.log("Id fetch", id)
      const filteredData = response.data.filter(record => record.resource_id === parseInt(bookID));

      if (filteredData.length > 0) {
        // Use the first matching record (or modify if you need another approach)
        const payment = filteredData[0];

        // Set the form data state to the first payment record details
        setFormData({
          payment_method: payment.payment_method || 'N/A',
          total_amount: payment.total_amount || 'N/A',
          paid_amount: payment.paid_amount || 'N/A',
          payment_date: payment.paymen_date || 'N/A', // Check if date is null or format it properly
          transaction_id: payment.transaction_id || 'N/A',
          notes: payment.notes || 'No notes provided',
          resource_id: payment.resource_id || 'N/A',
          resource_type: payment.resource_type || 'N/A',
        });
        console.log("filetr data", filteredData);
      } else {
        console.log("No payment details found for this resource_id");
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
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
        const bookingAmount = bookingData.amount
        console.log("amenityId", amenityId, bookingAmount);

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

    fetchPaymentDetails(id);
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




        {/* <div className="grid grid-cols-4 w-full gap-5 my-2 bg-blue-50 border rounded-xl p-2">
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className="font-medium">Payment Method:</p>
            <p>{formData.payment_method}</p>
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
        </div> */}


        <div className="border-b border-black mt-4">
          <h2 className="text-lg w-full font-medium">Payment Details:</h2>
        </div> 


        <div className=" mt-2 p-6 bg-white rounded-lg shadow-lg">
          {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Details</h2> */}

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-600">Payment Method</label>
              <p className="">{formData.payment_method}</p>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-600">Total Amount</label>
              <p className="">{formData.total_amount}</p>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-600">Paid Amount</label>
              <p className="">{formData.paid_amount}</p>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-600">Payment Date</label>
              <p className="">{formData.paymen_date}</p>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-600">Transaction ID</label>
              <p className="">{formData.transaction_id}</p>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-600">Notes</label>
              <p className="">{formData.notes}</p>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-600">Resource ID</label>
              <p className="">{formData.resource_id}</p>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-600">Resource Type</label>
              <p className="">{formData.resource_type}</p>
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
