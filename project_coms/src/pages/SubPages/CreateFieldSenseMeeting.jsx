import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { postFieldSenseMeetingManagement } from '../../api'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useSelector } from "react-redux";

function CreateFieldSenseMeeting() {
  const themeColor = useSelector((state) => state.theme.color);
    const userId = getItemInLocalStorage("UserId");
    const [formData, setFormData] = useState({
        meeting_title: "",
        meeting_date_and_time: "",
        participants: "",
        location: "",
        travel_mode: "",
        expenses: "",
        meeting_agenda: "",
        created_by_id: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "date" || name === "time") {
          setFormData((prevData) => {
            const updatedData = { ...prevData, [name]: value };
            if (updatedData.date && updatedData.time) {
              updatedData.meeting_date_and_time = `${updatedData.date}T${updatedData.time}`;
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
const handleFieldSenseMeeting = async() => {
  const sendData = new FormData();
  sendData.append("field_sense_meeting_management[meeting_title]", formData.meeting_title);
  sendData.append("field_sense_meeting_management[meeting_date_and_time]", formData.meeting_date_and_time);
  sendData.append("field_sense_meeting_management[participants]", formData.participants);
  sendData.append("field_sense_meeting_management[location]", formData.location);
  sendData.append("field_sense_meeting_management[travel_mode]", formData.travel_mode);
  sendData.append("field_sense_meeting_management[expenses]", formData.expenses);
  sendData.append("field_sense_meeting_management[meeting_agenda]", formData.meeting_agenda);
  sendData.append("field_sense_meeting_management[created_by_id]", userId);
 
  try {
      const FieldsenseMeetingResp = await postFieldSenseMeetingManagement(sendData)
      toast.success("Meeting Added")
      navigate("/admin/field-sense-meeting")
      console.log("Field sense Meeting Response",FieldsenseMeetingResp)
  } catch (error) {
      console.log(error)
  }
};
  return (
    <section className='flex'>
        <div className='hidden md:block'>
           <Navbar/>
        </div>
        <div className="w-full flex mx-3 flex-col overflow-hidden mb-5 ">
        <div className="flex justify-center items-center my-2 w-full p-2">
          <div className='border border-gray-300 rounded-lg p-4 w-full mx-4'>
            <h2 className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white "  style={{ background: themeColor }}>
                Create Meeting
            </h2>
            <div className='flex justify-center'>
            <div className='border-2 border-black rounded-md my-5 w-full'>
                <div className='md:grid grid-cols-3 mx-5 gap-5 my-5'>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Meeting Title
                       </label>
                       <input
                          type="text"
                          placeholder="Meeting Title"
                          name="meeting_title"
                          value={formData.meeting_title}
                          onChange={handleChange}
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Meeting Date 
                       </label>
                       <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Meeting Time
                       </label>
                       <input
                          type="time"
                          placeholder="Meeting Time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Participants
                       </label>
                       <input
                          type="text"
                          placeholder="Participants"
                          name="participants"
                          value={formData.participants}
                          onChange={handleChange}
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Location
                       </label>
                       <input
                          type="text"
                          placeholder="Location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                      <label htmlFor="" className="font-semibold my-2">
                        Travel Mode 
                       </label>
                       <select className="border p-1 px-4 border-gray-500 rounded-md"
                       name="travel_mode"
                       value={formData.travel_mode}
                       onChange={handleChange}
                       >
                          <option value="">Select Travel Mode </option>
                          <option value="Car">Car</option>
                          <option value="Public Transit">Public Transit</option>
                          <option value="Walking">Walking</option>
                       </select>
                   </div>
                   <div className="flex flex-col ">
                      <label htmlFor="" className="font-semibold my-2">
                        Expenses  
                       </label>
                       <select className="border p-1 px-4 border-gray-500 rounded-md"
                       name="expenses"
                       value={formData.expenses}
                       onChange={handleChange}
                       >
                          <option value="">Select Expenses </option>
                          <option value="Transportation">Transportation</option>
                          <option value="Meals">Meals</option>
                          <option value="Miscellaneous">Miscellaneous</option>
                       </select>
                   </div>
               </div>
                <div className='grid grid-cols mx-5 gap-5 my-5'>
                  <div className="flex flex-col ">
                      <label htmlFor="" className="font-semibold my-2">
                        Meeting Agenda
                        </label>
                        <textarea
                          name="meeting_agenda"
                          id=""
                          cols="5"
                          rows="3"
                          placeholder="Meeting Agenda"
                          
                          value={formData.meeting_agenda}
                          onChange={handleChange}
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
               </div>
            </div>
            </div>
            <div className='flex justify-center mb-10 gap-2'>
                <button onClick={handleFieldSenseMeeting} className='bg-black text-white p-2 px-4 rounded-md font-medium'>Create Meeting</button>
            </div>
        </div>
        </div></div>
    </section>
  )
}

export default CreateFieldSenseMeeting