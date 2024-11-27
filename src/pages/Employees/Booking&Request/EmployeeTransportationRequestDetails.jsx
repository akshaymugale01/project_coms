import React from 'react';

const EmployeeTransportRequestDetails = () => {
  // Sample data (for demonstration purposes)
  const request = {
    employeeName: 'Alice Johnson',
    employeeId: '98765',
    destination: 'Conference Center, Downtown',
    date: '2024-08-15',
    time: '09:00 AM',
    specialRequirements: 'VIP Transport, Black SUV',
    driverContactInformation: 'John Doe, Phone: 555-6789',
    vehicleDetails: 'Mercedes-Benz GLS, License Plate: XYZ-456',
    bookingConfirmationNumber: 'DEF456GHI',
    bookingStatus: 'Confirmed',
    managerApproval: 'Yes',
    confirmationEmail: 'alice.johnson@example.com'
  };

  return (
    <div className="flex justify-center items-center my-5 w-full p-4">
      <div className="border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen overflow-y-auto">
        <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
          Transport Request Details
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
    <label className="font-semibold">Destination:</label>
    <p>{request.destination}</p>
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
    <label className="font-semibold">Booking Confirmation Number:</label>
    <p>{request.bookingConfirmationNumber}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Booking Status:</label>
    <p>{request.bookingStatus}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Manager Approval (If Required):</label>
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

export default EmployeeTransportRequestDetails;