import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getHotelRequestDetails, UpdateHotelRequest,  } from '../../../api';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { useParams } from "react-router-dom";

const EditHotelRequest = () => {
  const siteId = getItemInLocalStorage("SITEID");
  const {id}= useParams()

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
    try{
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
  }catch (error) {
    console.log(error);
  }
  };
  fetchHotelRequestDetails();
}, []);
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
const navigate = useNavigate()
const handleHotelRequest = async() => {
  const sendData = new FormData();
  sendData.append("hotel[employee_id]", formData.employee_id);
  sendData.append("hotel[employee_name]", formData.employee_name);
  sendData.append("hotel[destination]", formData.destination);
  sendData.append("hotel[number_of_rooms]", formData.number_of_rooms);
  sendData.append("hotel[room_type]", formData.room_type);
  sendData.append("hotel[special_requests]", formData.special_requests);
  sendData.append("hotel[hotel_preferences]", formData.hotel_preferences);
  sendData.append("hotel[check_in_date]", formData.check_in_date);
  sendData.append("hotel[check_out_date]", formData.check_out_date);
  sendData.append("hotel[booking_confirmation_number]", formData.booking_confirmation_number);
  sendData.append("hotel[booking_certification_email]", formData.booking_certification_email);
  sendData.append("hotel[booking_status]", formData.booking_status);
  sendData.append("hotel[manager_approval]", formData.manager_approval);
  sendData.append("hotel[site_id]", siteId);
  
  
  try {
      const HotelreqResp = await UpdateHotelRequest(sendData,id)
      toast.success("Updated Hotel Request")
      navigate("/admin/booking-request/hotel-request")
      console.log("Hotel request Response",HotelreqResp)
  } catch (error) {
      console.log(error)
  }
};
  const themeColor = useSelector((state) => state.theme.color);
  return(
    <div className="flex justify-center items-center my-5 w-full p-4">
    <div className="border border-gray-300 rounded-lg p-4 w-full mx-4  ">
      <h2 className="text-center md:text-xl font-bold p-2  rounded-full text-white" style={{ background: themeColor }}>
       Edit Hotel Request
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
      <label htmlFor="destination" className="font-semibold">
        Destination:
      </label>
      <input
        type="text"
        id="destination"
        name="destination"
        value={formData.destination}
        onChange={handleChange}
        className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="Enter Destination"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="checkInDate" className="font-semibold">
        Check-in Date:
      </label>
      <input
        type="date"
        id="checkInDate"
        name="check_in_date"
        value={formData.check_in_date}
        onChange={handleChange}
        className="border p-1 px-4 border-gray-500 rounded-md"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="checkOutDate" className="font-semibold">
        Check-out Date:
      </label>
      <input
        type="date"
        id="checkOutDate"
        name="check_out_date"
        value={formData.check_out_date}
        onChange={handleChange}
        className="border p-1 px-4 border-gray-500 rounded-md"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="numberOfRooms" className="font-semibold">
        Number of Rooms:
      </label>
      <input
        type="number"
        id="numberOfRooms"
        name="number_of_rooms"
        value={formData.number_of_rooms}
        onChange={handleChange}
        className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="Enter Number of Rooms"
      />
    </div>

    <div className="grid gap-2 items-center w-full">
      <label htmlFor="roomType" className="font-semibold">
        Room Type:
      </label>
      <select id="roomType" className="border p-1 px-4 border-gray-500 rounded-md"
      name="room_type"
      value={formData.room_type}
      onChange={handleChange}
      >
        <option value="">Select Room Type</option>
        <option value="single">Single</option>
        <option value="double">Double</option>
        <option value="suite">Suite</option>
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
      <select id="bookingStatus" className="border p-1 px-4 border-gray-500 rounded-md"
      name="booking_status"
      value={formData.booking_status}
      onChange={handleChange}>
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
      <select id="managerApproval" className="border p-1 px-4 border-gray-500 rounded-md"
      name="manager_approval"
      value={formData.manager_approval}
      onChange={handleChange}>
      
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
        id="bookingConfirmationEmail"
        name="booking_certification_email"
      value={formData.booking_certification_email}
      onChange={handleChange}
       className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="Enter Booking Confirmation Email"
      />
    </div>

  </div>
  <div className="grid gap-2 items-center w-full my-4">
      <label htmlFor="specialRequests" className="font-semibold">
        Special Requests:
      </label>
      <textarea
        id="specialRequests"
        className="border p-1 px-4 border-gray-500 rounded-md"
        name="special_requests"
      value={formData.special_requests}
      onChange={handleChange}
        placeholder="Enter Special Requests"
         cols="25"
              rows="3"
      ></textarea>
    </div>
    <div className="grid gap-2 items-center w-full my-4">
      <label htmlFor="hotelPreferences" className="font-semibold">
        Hotel Preferences:
      </label>
      <textarea
        id="hotelPreferences"
       className="border p-1 px-4 border-gray-500 rounded-md"
       name="hotel_preferences"
      value={formData.hotel_preferences}
      onChange={handleChange}
        placeholder="Enter Hotel Preferences"
         cols="25"
              rows="3"
      ></textarea>
    </div>
  <div className="flex gap-5 justify-center items-center my-4">
          <button
           onClick={handleHotelRequest}
            className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
  </div>
  </div>
);
}

export default EditHotelRequest;
