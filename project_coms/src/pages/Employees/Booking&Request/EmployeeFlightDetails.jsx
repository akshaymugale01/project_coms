import React from "react";
import { useSelector } from "react-redux";

const EmployeeFlightRequestDetails = () => {
  // Sample data (for demonstration purposes)
  const request = {
    employeeName: "Jane Smith",
    employeeId: "54321",
    departureCity: "New York",
    arrivalCity: "London",
    departureDate: "2024-07-10",
    returnDate: "2024-07-20",
    preferredAirlines: ["British Airways", "Delta Airlines"],
    class: "Business",
    passengerNames: ["Jane Smith"],
    passportInformation: "Passport No: ABC12345, Expiry: 2026-05-15",
    ticketConfirmationNumber: "XYZ789",
    bookingStatus: "Confirmed",
    managerApproval: "Yes",
    bookingConfirmationEmail: "jane.smith@example.com",
  };
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <div className="flex justify-center items-center my-2 w-full p-4">
      <div className="border border-gray-300 rounded-lg p-2 w-full mx-4 max-h-screen overflow-y-auto">
        <h2
          style={{ background: themeColor }}
          className="text-center md:text-xl font-bold p-2 bg-black rounded-md text-white"
        >
          Flight Request Details
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
            <label className="font-semibold">Departure City:</label>
            <p>{request.departureCity}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Arrival City:</label>
            <p>{request.arrivalCity}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Departure Date:</label>
            <p>{request.departureDate}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Return Date:</label>
            <p>{request.returnDate}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Preferred Airlines:</label>
            <ul>
              {request.preferredAirlines.map((airline, index) => (
                <li key={index}>{airline}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Class:</label>
            <p>{request.class}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Passenger Name(s):</label>
            <ul>
              {request.passengerNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Passport Information:</label>
            <p>{request.passportInformation}</p>
          </div>

          <div className="flex gap-2 items-center w-full">
            <label className="font-semibold">Ticket Confirmation Number:</label>
            <p>{request.ticketConfirmationNumber}</p>
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
            <label className="font-semibold">Booking Confirmation Email:</label>
            <p>{request.bookingConfirmationEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFlightRequestDetails;
