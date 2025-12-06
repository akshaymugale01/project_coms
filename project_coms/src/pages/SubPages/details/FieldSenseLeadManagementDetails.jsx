import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';

import { useSelector } from 'react-redux';
import { getFieldSenseLeadManagementDetails } from '../../../api';
import { useParams } from "react-router-dom";

function FieldSenseLeadManagementDetails() {
    const {id}= useParams()
    const [FieldSenseMeetingData, setFieldSenseMeetingData] = useState("");
    const themeColor = useSelector((state) => state.theme.color);
    useEffect(() => {
        const fetchFieldSenseMeeting = async () => {
          try {
            const response = await getFieldSenseLeadManagementDetails(id);
           
      
            console.log("field sense details from api", response);
      
            setFieldSenseMeetingData(response.data);
          } catch (err) {
            console.error("Failed to fetch field sense meeting data:", err);
          }
        };
      
        fetchFieldSenseMeeting();
      }, []);
   
  return (
    <section className='flex'>
        <Navbar/>
        <div className="w-full flex mx-3 flex-col overflow-hidden mb-5">
            <h2 className="text-center text-xl font-bold my-5 p-2 bg-black rounded-md text-white " style={{background:themeColor}}>
                Field Sense Lead Details
            </h2>
            <div className='flex justify-center'>
                <div className='w-full my-5 mx-8'>
                    
                    <div className='md:grid grid-cols-3 md:my-3'>
                    <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'>Lead Name:</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.lead_name}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'> Lead Source  :</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.lead_source}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'> Contact Phone:</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.contact_phone}</p>
                        </div>
                       
                    </div>
                    <div className='md:grid grid-cols-3  md:my-3'>
                        <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'>Company Name  :</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.company_name}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'>Lead Status  :</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.lead_status}</p>
                        </div>
                       
                        <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'>Assigned Sales Representative  :</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.assigned_sales_representative}</p>
                        </div>
                       
                    </div>
                    <div className='md:grid grid-cols-3  md:my-3'>
                    <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'>Contact Email:</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.contact_email}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'>Last Contact Date  :</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.last_contact_date}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'>Next Follow-up Date  :</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.next_follow_up_date}</p>
                        </div>
                        </div>
                </div>
            </div>
           
        </div>
    </section>
  )
}

export default FieldSenseLeadManagementDetails