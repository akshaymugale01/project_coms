import React from "react";
import { useSelector } from "react-redux";

const EmployeeCabRequestDetails = () => {
  // Sample data (for demonstration purposes)
  const request = {
    employeeName: "John Doe",
    employeeId: "12345",
    pickupLocation: "123 Main Street, New York, NY",
    dropoffLocation: "456 Elm Street, New York, NY",
    date: "2024-07-10",
    time: "10:00 AM",
    numberOfPassengers: 3,
    transportationType: "Shuttle",
    specialRequirements: "Wheelchair Accessible",
    driverContactInformation: "Jane Smith, Phone: 555-1234",
    vehicleDetails: "Toyota Sienna, License Plate: ABC-1234",
    bookingConfirmationNumber: "ABC123XYZ",
    bookingStatus: "Confirmed",
    managerApproval: "Yes",
    confirmationEmail: "john.doe@example.com",
  };
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <div className="flex justify-center items-center my-5 w-full p-4">
      <div className="border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen overflow-y-auto">
        <h2
          style={{ background: themeColor }}
          className="text-center md:text-xl font-bold p-2 bg-black rounded-md text-white"
        >
          Cab Request Details
        </h2>
        <div className="grid md:grid-cols-3 gap-5 mt-5">
          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Employee Name:</label>
            <p>{request.employeeName}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Employee ID:</label>
            <p>{request.employeeId}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Pickup Location:</label>
            <p>{request.pickupLocation}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Drop-off Location:</label>
            <p>{request.dropoffLocation}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Date:</label>
            <p>{request.date}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Time:</label>
            <p>{request.time}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Number of Passengers:</label>
            <p>{request.numberOfPassengers}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Transportation Type:</label>
            <p>{request.transportationType}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Special Requirements:</label>
            <p>{request.specialRequirements}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Driver/Contact Information:</label>
            <p>{request.driverContactInformation}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Vehicle Details:</label>
            <p>{request.vehicleDetails}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">
              Booking Confirmation Number:
            </label>
            <p>{request.bookingConfirmationNumber}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Booking Status:</label>
            <p>{request.bookingStatus}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">
              Manager Approval (If Required):
            </label>
            <p>{request.managerApproval}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Confirmation Email:</label>
            <p>{request.confirmationEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCabRequestDetails;
