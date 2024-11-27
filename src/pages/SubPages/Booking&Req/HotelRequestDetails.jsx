import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getHotelRequestDetails } from '../../../api';

import { useParams } from "react-router-dom";
const HotelRequestDetails = () => {
  const {id}= useParams()
  const themeColor = useSelector((state) => state.theme.color);

 
  const [formData, setFormData] = useState({
   
    employee_id: "",
    employee_name: "",
    destination: "",
    hotel_name: "",
    location: "",
    number_of_rooms: "",
    room_type: "",
    special_requests: "",
    hotel_preferences: "",
    check_in_date: "",
    check_out_date: "",
    booking_confirmation_number: "",
    booking_certification_email: "",
    booking_status: "",
    manager_approval: false,
    is_available: false,
    site_id: ""
});
const dateFormat = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`; // Return date in yyyy-mm-dd format
};


useEffect(() => {
  const fetchHotelRequestDetails = async () => {
    const HotelreqDetailsResponse = await getHotelRequestDetails(id);
    const data = HotelreqDetailsResponse.data;
    console.log(data);
    setFormData({
      ...formData,
     
      employee_id: data.employee_id,
    employee_name: data.employee_name,
    destination: data.destination,
    hotel_name: data.hotel_name,
    location: data.location,
    number_of_rooms: data.number_of_rooms,
    room_type: data.room_type,
    special_requests: data.special_requests,
    hotel_preferences: data.hotel_preferences,
    check_in_date: dateFormat(data.check_in_date),
    check_out_date: dateFormat(data.check_out_date),
    booking_confirmation_number: data.booking_confirmation_number,
    booking_certification_email: data.booking_certification_email,
    booking_status: data.booking_status,
    manager_approval: data.manager_approval,
    is_available: data.is_available,
    site_id: data.site_id
    });
  };
  fetchHotelRequestDetails();
}, []);
 

  return (
    <div className="flex justify-center items-center my-5 w-full p-4 overflow-y-auto mb-10">
      <div className="border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen overflow-y-auto">
        <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white" style={{ background: themeColor }}>
          Hotel Request Details
        </h2>
        <div className="grid md:grid-cols-3 gap-5 mt-5">
  <div className="flex items-center gap-2 w-full">
    <label className="font-semibold">Employee Name:</label>
    <p>{formData.employee_name}</p>
  </div>

  <div className="flex items-center gap-2 w-full">
    <label className="font-semibold">Employee ID:</label>
    <p>{formData.employee_id}</p>
  </div>

  <div className="flex items-center gap-2 w-full">
    <label className="font-semibold">Destination:</label>
    <p>{formData.destination}</p>
  </div>

  <div className="flex items-center gap-2 w-full">
    <label className="font-semibold">Check-in Date:</label>
    <p>{formData.check_in_date}</p>
  </div>

  <div className="flex items-center gap-2 w-full">
    <label className="font-semibold">Check-out Date:</label>
    <p>{formData.check_out_date}</p>
  </div>

  <div className="flex items-center gap-2 w-full">
    <label className="font-semibold">Number of Rooms:</label>
    <p>{formData.number_of_rooms}</p>
  </div>

  <div className="flex items-center gap-2 w-full">
    <label className="font-semibold">Room Type:</label>
    <p>{formData.room_type}</p>
  </div>

  <div className="flex items-center gap-2 w-full">
    <label className="font-semibold">Special Requests:</label>
    <p>{formData.special_requests}</p>
  </div>

  <div className="flex items-center gap-2 w-full">
    <label className="font-semibold">Hotel Preferences:</label>
    <p>{formData.hotel_preferences}</p>
  </div>

  <div className="flex items-center gap-2 w-full">
    <label className="font-semibold">Booking Confirmation Number:</label>
    <p>{formData.booking_confirmation_number}</p>
  </div>

  <div className="flex items-center gap-2 w-full">
    <label className="font-semibold">Booking Status:</label>
    <p>{formData.booking_status}</p>
  </div>

  <div className="flex items-center gap-2 w-full">
  <label className="font-semibold">Manager Approval (If Required):</label>
  <p>{formData.manager_approval ? 'Yes' : 'No'}</p>
</div>


  <div className="flex items-center gap-2 w-full mb-10">
    <label className="font-semibold">Booking Confirmation Email:</label>
    <p>{formData.booking_certification_email}</p>
  </div>
</div>

      </div>
    </div>
  );
};

export default HotelRequestDetails;