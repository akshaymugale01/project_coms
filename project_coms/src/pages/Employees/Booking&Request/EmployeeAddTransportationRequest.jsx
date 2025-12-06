import React from 'react';

const EmployeeAddTransportRequest = () => (
  <div className="flex flex-col justify-center items-center my-5 w-full p-4">
    <form className="border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen overflow-y-auto">
      <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
        Transport Request
      </h2>
      <div className="grid md:grid-cols-3 gap-5 mt-5">
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="employeeId" className="font-semibold">
            Employee ID:
          </label>
          <input
            type="number"
            id="employeeId"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Employee ID"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="employeeName" className="font-semibold">
            Employee Name:
          </label>
          <input
            type="text"
            id="employeeName"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Employee Name"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="destination" className="font-semibold">
            Destination:
          </label>
          <input
            type="text"
            id="destination"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Destination"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="date" className="font-semibold">
            Date:
          </label>
          <input
            type="date"
            id="date"
            className="border border-gray-400 p-2 rounded-md"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="time" className="font-semibold">
            Time:
          </label>
          <input
            type="time"
            id="time"
            className="border border-gray-400 p-2 rounded-md"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="specialRequirements" className="font-semibold">
            Special Requirements:
          </label>
          <textarea
            id="specialRequirements"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Special Requirements"
          ></textarea>
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="driverContactInfo" className="font-semibold">
            Driver/Contact Information:
          </label>
          <textarea
            id="driverContactInfo"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Driver/Contact Information"
          ></textarea>
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="vehicleDetails" className="font-semibold">
            Vehicle Details:
          </label>
          <textarea
            id="vehicleDetails"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Vehicle Details"
          ></textarea>
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="bookingConfirmationNumber" className="font-semibold">
            Booking Confirmation Number:
          </label>
          <input
            type="text"
            id="bookingConfirmationNumber"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Booking Confirmation Number"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="bookingStatus" className="font-semibold">
            Booking Status:
          </label>
          <select id="bookingStatus" className="border border-gray-400 p-2 rounded-md">
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="managerApproval" className="font-semibold">
            Manager Approval :
          </label>
          <select id="managerApproval" className="border border-gray-400 p-2 rounded-md">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="confirmationEmail" className="font-semibold">
            Confirmation Email:
          </label>
          <input
            type="email"
            id="confirmationEmail"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Confirmation Email"
          />
        </div>
      </div>
    </form>
    <div className="flex flex-col gap-5 justify-center items-center my-4">
          <button
            type="submit"
            className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
  </div>
);

export default EmployeeAddTransportRequest;