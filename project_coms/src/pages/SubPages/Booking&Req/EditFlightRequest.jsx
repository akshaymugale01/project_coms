import React, { useState,useEffect } from "react";
import {  getFlightRequestDetails, UpdateFlightRequest } from '../../../api';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { useParams } from "react-router-dom";

const EditFlightRequest = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const {id}= useParams()
  const [formData, setFormData] = useState({
        employee_name: "",
        employee_id: "",
        departure_city: "",
        arrival_city: "",
        departure_date: "",
        return_date: "",
        preferred_airlines: "",
        flight_class: "",
        passenger_name: "",
        passport_information: "",
        ticket_confirmation_number: "",
        booking_status: "",
        manager_approval: false,
        booking_confirmation_email: ""
  });
  useEffect(() => {
    const fetchFlightRequestDetails = async () => {
      try{
      const HotelreqDetailsResponse = await getFlightRequestDetails(id);
      const data = HotelreqDetailsResponse.data;
      console.log(data);
      setFormData({
        ...formData,
       
        employee_id: data.employee_id,
      employee_name: data.employee_name,
      departure_city: data.departure_city,
      arrival_city: data.arrival_city,
      departure_date: data.departure_date,
      return_date: data.return_date,
      preferred_airlines: data.preferred_airlines,
      flight_class: data.flight_class,
      passenger_name: data.passenger_name,
      passport_information:data.passport_information,
      ticket_confirmation_number: data.ticket_confirmation_number,
      booking_status: data.booking_status,
      manager_approval: data.manager_approval,
      booking_confirmation_email:data.booking_confirmation_email
      });
    }catch (error) {
      console.log(error);
    }
    };
    fetchFlightRequestDetails();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate()
  const handleFlightRequest = async() => {
    const sendData = new FormData();
    sendData.append("flight_request[employee_id]", formData.employee_id);
    sendData.append("flight_request[employee_name]", formData.employee_name);
    sendData.append("flight_request[departure_city]", formData.departure_city);
    sendData.append("flight_request[arrival_city]", formData.arrival_city);
    sendData.append("flight_request[departure_date]", formData.departure_date);
    sendData.append("flight_request[return_date]", formData.return_date);
    sendData.append("flight_request[preferred_airlines]", formData.preferred_airlines);
    sendData.append("flight_request[flight_class]", formData.flight_class);
    sendData.append("flight_request[passenger_name]", formData.passenger_name);
    sendData.append("flight_request[passport_information]", formData.passport_information);
    sendData.append("flight_request[ticket_confirmation_number]", formData.ticket_confirmation_number);
    sendData.append("flight_request[booking_status]", formData.booking_status);
    sendData.append("flight_request[manager_approval]", formData.manager_approval);
    sendData.append("flight_request[booking_confirmation_email]", formData.booking_confirmation_email);
    
    
    try {
        const FlightreqResp = await UpdateFlightRequest(sendData,id)
        toast.success("Flight Request Updated")
        navigate("/admin/booking-request/flight-ticket-request")
        console.log("Flight request Response",FlightreqResp)
    } catch (error) {
        console.log(error)
    }
  };
  return (
  <div className="w-full  ">
          {/* <BackButton to={"/employee/flight-request"} /> */}

    <div className="flex justify-center items-center my-5 w-full p-4">
    <div className="border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen ">
      <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white" style={{ background: themeColor }}>
       Edit Flight Request
      </h2>
  <div className="grid md:grid-cols-3 gap-5 mt-5">
    <div className="grid gap-2 items-center w-full">
      <label htmlFor="employeeId" className="font-semibold">
        Employee ID:
      </label>
      <input
        type="number"
        name="employee_id"
        value={formData.employee_id}
        onChange={handleChange}
        id="employeeId"
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
        name="employee_name"
        value={formData.employee_name}
        onChange={handleChange}
        id="employeeName"
        className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="Enter Employee Name"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="destination" className="font-semibold">
      Departure City:
      </label>
      <input
        type="text"
        name="departure_city"
        value={formData.departure_city}
        onChange={handleChange}
        id="destination"
        className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="Enter Destination"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="checkInDate" className="font-semibold">
      Arrival City:
      </label>
      <input
        type="text"
        name="arrival_city"
        value={formData.arrival_city}
        onChange={handleChange}
        id="checkInDate"
        className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="Enter Arrival"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="departureDate" className="font-semibold">
        Departure Date:
      </label>
      <input
        type="date"
        name="departure_date"
        value={formData.departure_date}
        onChange={handleChange}
        id="departureDate"
        className="border p-1 px-4 border-gray-500 rounded-md"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="returnDate" className="font-semibold">
        Return Date (If Round Trip):
      </label>
      <input
        type="date"
         name="return_date"
        value={formData.return_date}
        onChange={handleChange}
        id="returnDate"
        className="border p-1 px-4 border-gray-500 rounded-md"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="preferredAirlines" className="font-semibold">
        Preferred Airline(s):
      </label>
      <input
        type="text"
        name="preferred_airlines"
        value={formData.preferred_airlines}
        onChange={handleChange}
        id="preferredAirlines"
        className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="Enter Preferred Airline(s)"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="class" className="font-semibold">
        Class:
      </label>
      <select id="class" 
      name="flight_class"
      value={formData.flight_class}
      onChange={handleChange}
      className="border p-1 px-4 border-gray-500 rounded-md">
        <option value="">Select Class</option>
        <option value="Economy">Economy</option>
        <option value="Business">Business</option>
        <option value="First">First</option>
      </select>
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="passengerNames" className="font-semibold">
        Passenger Name(s):
      </label>
      <input
        type="text"
         name="passenger_name"
        value={formData.passenger_name}
        onChange={handleChange}
        id="passengerNames"
        className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="Enter Passenger Name(s)"
      />
    </div>

   

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="ticketConfirmationNumber" className="font-semibold">
        Ticket Confirmation Number:
      </label>
      <input
        type="text"
         name="ticket_confirmation_number"
        value={formData.ticket_confirmation_number}
        onChange={handleChange}
        id="ticketConfirmationNumber"
        className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="Enter Ticket Confirmation Number"
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
        Manager Approval :
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
      <label htmlFor="bookingConfirmationEmail" className="font-semibold">
        Booking Confirmation Email:
      </label>
      <input
        type="email"
        name="booking_confirmation_email"
        id="bookingConfirmationEmail"
        value={formData.booking_confirmation_email}
        onChange={handleChange}
       className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="Enter Booking Confirmation Email"
      />
    </div>
  </div>
  <div className="grid gap-2 items-center w-full my-4">
      <label htmlFor="passportInformation" className="font-semibold">
        Passport Information:
      </label>
      <textarea
       name="passport_information"
        id="passportInformation"
        value={formData.passport_information}
        onChange={handleChange}
        cols="25"
              rows="3"
        className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="Enter Passport Information"
      ></textarea>
    </div>
  <div className="flex gap-5 justify-center items-center my-4">
          <button
           onClick={handleFlightRequest}
            className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
  </div>
  </div></div>
  );
}

export default EditFlightRequest;
