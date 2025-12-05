import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import { postFieldSenseLeadManagement } from '../../api';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useSelector } from "react-redux";

function CreateFieldSenseLeads() {
    const themeColor = useSelector((state) => state.theme.color);

    const [selectedOption, setSelectedOption] = useState('');
    const userId = getItemInLocalStorage("UserId");
    const [formData, setFormData] = useState({
        lead_name: "",
        lead_source: "",
        contact_phone: "",
        contact_email: "",
        company_name: "",
        lead_status: "",
        assigned_sales_representative: "",
        last_contact_date: "",
        next_follow_up_date: "",
        created_by_id: ""
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const navigate = useNavigate()
      const handleFieldsenseLeadManagement = async() => {
        const sendData = new FormData();
        sendData.append("field_sense_leads_management[lead_name]", formData.lead_name);
        sendData.append("field_sense_leads_management[lead_source]", formData.lead_source);
        sendData.append("field_sense_leads_management[contact_phone]", formData.contact_phone);
        sendData.append("field_sense_leads_management[contact_email]", formData.contact_email);
        sendData.append("field_sense_leads_management[company_name]", formData.company_name);
        sendData.append("field_sense_leads_management[lead_status]", formData.lead_status);
        sendData.append("field_sense_leads_management[assigned_sales_representative]", formData.assigned_sales_representative);
        sendData.append("field_sense_leads_management[last_contact_date]", formData.last_contact_date);
        sendData.append("field_sense_leads_management[next_follow_up_date]", formData.next_follow_up_date);
        sendData.append("field_sense_leads_management[created_by_id]", userId);
        
        
        try {
            const Leadmanagementresp = await postFieldSenseLeadManagement(sendData)
            toast.success("Lead management Added")
            navigate("/admin/field-sense-leads")
            console.log("Lead management Response",Leadmanagementresp)
        } catch (error) {
            console.log(error)
        }
      };
  return (
    <section className='flex'>
        <div className='hidden md:block'>
           <Navbar/>
        </div>
        <div className="w-full flex mx-3 flex-col overflow-hidden mb-5">
        <div className="flex justify-center items-center my-2 w-full p-2">
        <div className='border border-gray-300 rounded-lg p-4 w-full mx-4'>
            <h2 className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white" style={{ background: themeColor }}>
                Create Leads
            </h2>
            <div className='flex justify-center'>
            <div className='border-2 border-black rounded-md my-5 w-full'>
                <div className='md:grid grid-cols-3 mx-5 gap-5 my-5'>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Lead Name
                       </label>
                       <input
                          type="text"
                          placeholder="Lead Name"
                          name='lead_name'
                          value={formData.lead_name}
                          onChange={handleChange}
                          id="employeeId"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Lead Source 
                       </label>
                       <input
                          type="text"
                          name='lead_source'
                          value={formData.lead_source}
                          onChange={handleChange}
                          placeholder="Lead Source"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Contact Phone
                       </label>
                       <input
                          type="number"
                          name='contact_phone'
                          value={formData.contact_phone}
                          onChange={handleChange}
                          placeholder="Phone"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Contact Email
                       </label>
                       <input
                          type="email"
                          placeholder="Email"
                          name='contact_email'
                          value={formData.contact_email}
                          onChange={handleChange}
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Company Name
                       </label>
                       <input
                          type="text"
                          name='company_name'
                          value={formData.company_name}
                          onChange={handleChange}
                          placeholder="Company Name"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                      <label htmlFor="" className="font-semibold my-2">Lead Status  
                       </label>
                        <select
                         
                          name='lead_status'
                          value={formData.lead_status}
                          onChange={handleChange}
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        >
                            <option value="">Select status</option>
                            <option value="active">Active</option>
                            <option value="lost">Lost</option>
                            <option value="ongoing">Ongoing Discussion</option>
                            <option value="onHold">On Hold</option>
                            <option value="business">Business</option>
                        </select>
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Assigned Sales Representative
                       </label>
                       <input
                          type="text"
                          placeholder="Assigned Sales Representative"
                          name='assigned_sales_representative'
                          value={formData.assigned_sales_representative}
                          onChange={handleChange}
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Last Contact Date
                       </label>
                       <input
                          type="date"
                          placeholder="Last Date"
                          name='last_contact_date'
                          value={formData.last_contact_date}
                          onChange={handleChange}
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Next Follow-up Date
                       </label>
                       <input
                          type="date"
                          placeholder="Next Follow-up Date"
                          name='next_follow_up_date'
                          value={formData.next_follow_up_date}
                          onChange={handleChange}
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
               </div>
            </div>
            </div>
            <div className='flex justify-center mb-10 gap-2'>
                <button className='bg-black text-white p-2 px-4 rounded-md font-medium' onClick={handleFieldsenseLeadManagement} >Create Leads</button>
            </div>
        </div>  </div>
        </div>
    </section>
  )
}

export default CreateFieldSenseLeads