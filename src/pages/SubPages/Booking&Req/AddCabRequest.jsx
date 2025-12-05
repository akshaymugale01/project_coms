import React, { useState } from 'react';
import { postCabRequest } from '../../../api';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddCabRequest = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [formData, setFormData] = useState({
        employee_name: "",
        employee_id: "",
        pickup_location: "",
        drop_off_location: "",
        date_and_time: "",
        number_of_passengers: "",
        transportation_type: "",
        special_requirements: "",
        driver_contact_information: "",
        vehicle_details: "",
        booking_confirmation_number: "",
        booking_status: "",
        manager_approval: false,
        booking_confirmation_email: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "date" || name === "time") {
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: value };
        if (updatedData.date && updatedData.time) {
          updatedData.date_and_time = `${updatedData.date}T${updatedData.time}`;
        }
        return updatedData;
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };
  
  const navigate = useNavigate()
  const handleCabRequest = async() => {
    const sendData = new FormData();
    sendData.append("cab_and_bus_request[employee_id]", formData.employee_id);
    sendData.append("cab_and_bus_request[employee_name]", formData.employee_name);
    sendData.append("cab_and_bus_request[pickup_location]", formData.pickup_location);
    sendData.append("cab_and_bus_request[drop_off_location]", formData.drop_off_location);
   
    sendData.append("cab_and_bus_request[date_and_time]", formData.date_and_time);
    sendData.append("cab_and_bus_request[number_of_passengers]", formData.number_of_passengers);
    sendData.append("cab_and_bus_request[transportation_type]", formData.transportation_type);
    sendData.append("cab_and_bus_request[special_requirements]", formData.special_requirements);
    sendData.append("cab_and_bus_request[driver_contact_information]", formData.driver_contact_information);
    sendData.append("cab_and_bus_request[vehicle_details]", formData.vehicle_details);
    sendData.append("cab_and_bus_request[booking_confirmation_number]", formData.booking_confirmation_number);
    sendData.append("cab_and_bus_request[booking_status]", formData.booking_status);
    sendData.append("cab_and_bus_request[manager_approval]", formData.manager_approval);
    sendData.append("cab_and_bus_request[booking_confirmation_email]", formData.booking_confirmation_email);
    
    
    try {
        const CabreqResp = await postCabRequest(sendData)
        toast.success("Cab Request Added")
        navigate("/admin/booking-request/cab-bus-request")
        console.log("Cab request Response", CabreqResp)
    } catch (error) {
        console.log(error)
    }
  };
  return(
  <div className="flex justify-center items-center my-5 w-full p-4">
    <div className="border border-gray-300 rounded-lg p-4 w-full mx-4 ">
      <h2 className="text-center md:text-xl font-bold p-2  rounded-full text-white " style={{ background: themeColor }}>
        Cab Request
      </h2>
      <div className="grid md:grid-cols-3 gap-5 mt-5">
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="employeeId" className="font-semibold">
            Employee ID:
          </label>
          <input
            type="number"
            id="employeeId"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            className="border p-1 px-4 border-gray-500 rounded-md"
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
            name="employee_name"
            value={formData.employee_name}
            onChange={handleChange}
            className="border p-1 px-4 border-gray-500 rounded-md"
            placeholder="Enter Employee Name"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="pickupLocation" className="font-semibold">
            Pickup Location:
          </label>
          <input
            type="text"
            id="pickupLocation"
            name="pickup_location"
            value={formData.pickup_location}
            onChange={handleChange}
            className="border p-1 px-4 border-gray-500 rounded-md"
            placeholder="Enter Pickup Location"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="dropoffLocation" className="font-semibold">
            Drop-off Location:
          </label>
          <input
            type="text"
            id="dropoffLocation"
            name="drop_off_location"
            value={formData.drop_off_location}
            onChange={handleChange}
            className="border p-1 px-4 border-gray-500 rounded-md"
            placeholder="Enter Drop-off Location"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="date" className="font-semibold">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-1 px-4 border-gray-500 rounded-md"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="time" className="font-semibold">
            Time:
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border p-1 px-4 border-gray-500 rounded-md"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="numberOfPassengers" className="font-semibold">
            Number of Passengers:
          </label>
          <input
            type="number"
            id="numberOfPassengers"
            name="number_of_passengers"
            value={formData.number_of_passengers}
            onChange={handleChange}
            className="border p-1 px-4 border-gray-500 rounded-md"
            placeholder="Enter Number of Passengers"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="transportationType" className="font-semibold">
            Transportation Type:
          </label>
          <select id="transportationType" 
          name="transportation_type"
          value={formData.transportation_type}
          onChange={handleChange}
          className="border p-1 px-4 border-gray-500 rounded-md"
          >
            <option value="">Select Transportation Type</option>
            <option value="cab">Cab</option>
            <option value="shuttle">Shuttle</option>
            <option value="bus">Bus</option>
          </select>
        </div>

      

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="bookingConfirmationNumber" className="font-semibold">
            Booking Confirmation Number:
          </label>
          <input
            type="text"
            id="bookingConfirmationNumber"
            name="booking_confirmation_number"
            value={formData.booking_confirmation_number}
            onChange={handleChange}
           className="border p-1 px-4 border-gray-500 rounded-md"
            placeholder="Enter Booking Confirmation Number"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="bookingStatus" className="font-semibold">
            Booking Status:
          </label>
          <select id="bookingStatus" 
           name="booking_status"
           value={formData.booking_status}
           onChange={handleChange}
           className="border p-1 px-4 border-gray-500 rounded-md">
            <option value="">Select Booking Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="managerApproval" className="font-semibold">
            Manager Approval (If Required):
          </label>
          <select id="managerApproval" 
           name="manager_approval"
           value={formData.manager_approval}
           onChange={handleChange}
           className="border p-1 px-4 border-gray-500 rounded-md">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="confirmationEmail" className="font-semibold">
            Confirmation Email:
          </label>
          <input
            type="email"
            id="confirmationEmail"
            name="booking_confirmation_email"
           value={formData.booking_confirmation_email}
           onChange={handleChange}
            className="border p-1 px-4 border-gray-500 rounded-md"
            placeholder="Enter Confirmation Email"
          />
        </div>
      
      </div>
      <div className="grid gap-2 items-center w-full my-4">
          <label htmlFor="specialRequirements" className="font-semibold">
            Special Requirements:
          </label>
          <textarea
            id="specialRequirements"
            name="special_requirements"
            value={formData.special_requirements}
            onChange={handleChange}
            cols="25"
              rows="3"
            className="border p-1 px-4 border-gray-500 rounded-md"
            placeholder="Enter Special Requirements"
          ></textarea>
        </div>

        <div className="grid gap-2 items-center w-full my-4">
          <label htmlFor="driverContactInfo" className="font-semibold">
            Driver/Contact Information:
          </label>
          <textarea
            id="driverContactInfo"
            name="driver_contact_information"
            value={formData.driver_contact_information}
            onChange={handleChange}
            cols="25"
              rows="3"
            className="border p-1 px-4 border-gray-500 rounded-md"
            placeholder="Enter Driver/Contact Information"
          ></textarea>
        </div>

        <div className="grid gap-2 items-center w-full my-4">
          <label htmlFor="vehicleDetails" className="font-semibold">
            Vehicle Details:
          </label>
          <textarea
            id="vehicleDetails"
            name="vehicle_details"
            value={formData.vehicle_details}
            onChange={handleChange}
            cols="25"
              rows="3"
           className="border p-1 px-4 border-gray-500 rounded-md"
            placeholder="Enter Vehicle Details"
          ></textarea>
        </div>
      <div className="flex gap-5 justify-center items-center my-4">
          <button
           onClick={handleCabRequest}
            className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
    </div>
  </div>
  );
};

export default AddCabRequest;