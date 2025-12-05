import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import { FaDownload } from 'react-icons/fa'
import Table from '../../../components/table/Table';
import { useSelector } from 'react-redux';
import { getFieldSenseMeetingManagementDetails } from '../../../api';
import { useParams } from "react-router-dom";

function FieldSenseMeetingDetails() {
    const {id}= useParams()
    const [FieldSenseMeetingData, setFieldSenseMeetingData] = useState("");
    const themeColor = useSelector((state) => state.theme.color);
    useEffect(() => {
        const fetchFieldSenseMeeting = async () => {
          try {
            const response = await getFieldSenseMeetingManagementDetails(id);
           
      
            console.log("field sense details from api", response);
      
            setFieldSenseMeetingData(response.data);
          } catch (err) {
            console.error("Failed to fetch field sense meeting data:", err);
          }
        };
      
        fetchFieldSenseMeeting();
      }, []);
    const column = [
        { name: "Name", selector: (row) => row.name, sortable: true },
        { name: "Organization", selector: (row) => row.organization, sortable: true },
        { name: "Department",selector: (row) => row.department,sortable: true,},
        { name: "Email Id",selector: (row) => row.email,sortable: true,},
      ];

      const data = [
        {
          id: 1,
          name: "golu",
          organization: "GoPhygital",
          department: "IT",
          email: "golu@gmail.com",
        },
      ];
  return (
    <section className='flex'>
        <Navbar/>
        <div className="w-full flex mx-3 flex-col overflow-hidden mb-5">
            <h2 className="text-center text-xl font-bold my-5 p-2 bg-black rounded-md text-white " style={{background:themeColor}}>
                Field Sense Meeting Details
            </h2>
            <div className='flex justify-center'>
                <div className='w-4/5 my-5'>
                    <div className='md:grid grid-cols-3 '>
                        <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'>Title:</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.meeting_title}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
    <p className="font-semibold">Date:</p>
    <p className="text-sm font-normal">
        {new Date(FieldSenseMeetingData.meeting_date_and_time).toLocaleDateString()}
    </p>
</div>
<div className="grid grid-cols-2 items-center">
    <p className="font-semibold">Time:</p>
    <p className="text-sm font-normal">
        {new Date(FieldSenseMeetingData.meeting_date_and_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </p>
</div>


                    </div>
                    <div className='md:grid grid-cols-3 md:my-3'>
                        <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'>Participants :</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.participants}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'>Meeting Agenda:</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.meeting_agenda}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'>Meeting Location:</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.location}</p>
                        </div>
                    </div>
                    <div className='md:grid grid-cols-3 md:my-3'>
                        <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'>Travel Mode  :</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.travel_mode}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p className='font-semibold'>Expenses:</p>
                            <p className="text-sm font-normal ">{FieldSenseMeetingData.expenses}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-end gap-3 border-t border-b border-black py-3'>
                <button className='border-2 border-black p-1 px-4 rounded-md'>Notes</button>
                <button className='border-2 border-black p-1 px-4 rounded-md flex gap-3'><FaDownload />Audio</button>
            </div>
            <div className='my-5'>
                <Table
                  columns={column}
                  data={data}
                  isPagination={true}
                />
            </div>
        </div>
    </section>
  )
}

export default FieldSenseMeetingDetails