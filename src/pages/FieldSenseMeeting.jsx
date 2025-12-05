import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io'
import { Link, NavLink } from 'react-router-dom'
import { GrMapLocation } from "react-icons/gr";
import Table from '../components/table/Table';
import { useSelector } from "react-redux";

import { BsEye } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { getFieldSenseMeetingManagement } from '../api';
import { PiPlusCircle } from 'react-icons/pi';
import { IoAddCircleOutline } from 'react-icons/io5';

function FieldSenseMeeting() {
  const [FieldSenseMeetingData, setFieldSenseMeetingData] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);

  useEffect(() => {
    const fetchFieldSenseMeeting = async () => {
      try {
        const response = await getFieldSenseMeetingManagement();
        const fieldsensemeetingresp = response.data
          .map((request) => {
            let date = "";
            let time = "";
  
            if (request.meeting_date_and_time) {
              const dateTime = new Date(request.meeting_date_and_time);
              date = dateTime.toISOString().split('T')[0]; // Extract the date
              time = dateTime.toTimeString().split(' ')[0]; // Extract the time
            }
  
            return {
              ...request,
              date,
              time,
            };
          })
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
        console.log("response from api", fieldsensemeetingresp);
  
        setFieldSenseMeetingData(fieldsensemeetingresp);
      } catch (err) {
        console.error("Failed to fetch field sense meeting data:", err);
      }
    };
  
    fetchFieldSenseMeeting();
  }, []);
  
  const column = [
    {
      name: "view",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/field-sense-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    { name: "Meeting Title", selector: (row) => row.meeting_title, sortable: true },
    { name: "Meeting Date", selector: (row) => row.date, sortable: true },
    { name: "Meeting Time", selector: (row) => row.time, sortable: true },
    { name: "Participants", selector: (row) => row.participants, sortable: true },
    { name: "Location", selector: (row) => row.location, sortable: true },
    { name: "Travel Mode", selector: (row) => row.travel_mode, sortable: true },
    { name: "Expenses Type", selector: (row) => row.expenses, sortable: true },

  ];
  
  return (
    <section className='flex'>
      <Navbar/>
      <div className='w-full flex flex-col overflow-hidden my-4'>
      <div className="flex lg:flex-row flex-col gap-2 relative items-center justify-center w-full">
      <div className="sm:flex grid grid-cols-2 flex-wrap text-sm md:text-base sm:flex-row gap-5 font-medium p-2 xl:rounded-full rounded-md opacity-90 bg-gray-200 ">
       <NavLink
              to={"/admin/field-sense-meeting"}
              className={({ isActive }) =>
                `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                }`
              }
            >
              Meeting Management
            </NavLink>
            <NavLink
              to={"/admin/field-sense-leads"}
              className={({ isActive }) =>
                `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                }`
              }
            >
              Leads Management
            </NavLink>
          </div>
        </div>
        <div className="flex justify-end items-center sm:flex-row flex-col my-2 mx-3">
          <Link
            to={`/admin/create-field-sense`}
            style={{ background: themeColor }}
            className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center"              >
            <IoAddCircleOutline size={20} />
              Create
          </Link>
        </div>
        <div className='mx-3'>
          <Table
          columns={column}
          data={FieldSenseMeetingData}
          isPagination={true}
        />
        </div>
      </div>
    </section>
  )
}

export default FieldSenseMeeting