import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { gettransportRequestDetails } from "../../../api";
import { useParams } from "react-router-dom";

const TransportRequestDetails = () => {
  
  const themeColor = useSelector((state) => state.theme.color);
  const {id}= useParams()
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_id: "",
    pickup_location: "",
    date_and_time: "",
    special_requirements: "",
    driver_contact_information: "",
    vehicle_details: "",
    booking_confirmation_number: "",
    booking_status: "",
    manager_approval: false,
    booking_confirmation_email: ""
});
useEffect(() => {
  const fetchTransportRequestDetails = async () => {
    try{
    const HotelreqDetailsResponse = await gettransportRequestDetails(id);
    const data = HotelreqDetailsResponse.data;
    console.log(data);
    const [date, timeWithSeconds] = data.date_and_time
    ? data.date_and_time.split('T') 
    : ["", ""];
    const time = timeWithSeconds ? timeWithSeconds.slice(0, 5) : "";
    setFormData({
      ...formData,
     
      employee_name: data.employee_name,
      employee_id: data.employee_id,
      pickup_location: data.pickup_location,
      
      date: date, 
      time: time,
      
      
      special_requirements: data.special_requirements,
      driver_contact_information: data.driver_contact_information,
      vehicle_details: data.vehicle_details,
      booking_confirmation_number: data.booking_confirmation_number,
      booking_status: data.booking_status,
      manager_approval: data.manager_approval,
      booking_confirmation_email: data.booking_confirmation_email
    });
  }catch (error) {
    console.log(error);
  }
  };
  fetchTransportRequestDetails();
}, []);
  return (
    <div className="flex justify-center items-center my-5 w-full p-4">
      <div className="border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen overflow-y-auto">
        <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white" style={{ background: themeColor }}>
          Transport Request Details
        </h2>
        <div className="grid md:grid-cols-3 gap-5 mt-5">
  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Employee Name:</label>
    <p>{formData.employee_name}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Employee ID:</label>
    <p>{formData.employee_id}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Pickup Location:</label>
    <p>{formData.pickup_location}</p>
  </div>

 

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Date:</label>
    <p>{formData.date}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Time:</label>
    <p>{formData.time}</p>
  </div>

 

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Special Requirements:</label>
    <p>{formData.special_requirements}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Driver/Contact Information:</label>
    <p>{formData.driver_contact_information}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Vehicle Details:</label>
    <p>{formData.vehicle_details}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Booking Confirmation Number:</label>
    <p>{formData.booking_confirmation_number}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Booking Status:</label>
    <p>{formData.booking_status}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Manager Approval (If Required):</label>
    <p>{formData.manager_approval?'Yes':"No"}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Confirmation Email:</label>
    <p>{formData.booking_confirmation_email}</p>
  </div>
</div>

      </div>
    </div>
  );
};

export default TransportRequestDetails;