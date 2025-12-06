import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io'
import { Link, NavLink } from 'react-router-dom'
import Table from '../components/table/Table';
import { BsEye } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { useSelector } from "react-redux";

import { getFieldSenseLeadManagement } from '../api';
import { PiPlusCircle } from 'react-icons/pi';
import { IoAddCircleOutline } from 'react-icons/io5';

function FieldSenseLeads() {
  const [FieldsenseLeadData, setFieldsenseLeadData] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);

  useEffect(() => {
    const fetchFlightRequest = async () => {
      try {
        const response = await getFieldSenseLeadManagement();
        const leadmanagementresp = response.data.sort((a,b)=> {
          return new Date(b.created_at) - new Date(a.created_at)
        })
        console.log("response from api",leadmanagementresp)
        
        setFieldsenseLeadData(leadmanagementresp);
       
      } catch (err) {
        console.error("Failed to fetch lead management data:", err);
      }
    };
  
    fetchFlightRequest(); // Call the API
  }, []);
    const column = [
        {
          name: "view",
              cell: (row) => (
            <div className="flex items-center gap-4">
              <Link to={`/admin/field-sense-lead-details/${row.id}`}>
                <BsEye size={15} />
              </Link>
            </div>
          ),
        },

        { name: "Lead Name", selector: (row) => row.lead_name, sortable: true },
        { name: "Lead Source", selector: (row) => row.lead_source, sortable: true },
        { name: "Phone", selector: (row) => row.contact_phone, sortable: true },
        { name: "Email", selector: (row) => row.contact_email, sortable: true },
        { name: "Company Name", selector: (row) => row.company_name, sortable: true },
        { name: "Lead Status ", selector: (row) => row.lead_status , sortable: true },
        { name: "Assigned Sales Representative", selector: (row) => row.assigned_sales_representative, sortable: true },
        { name: "Last Contact Date", selector: (row) => row.last_contact_date, sortable: true },
        { name: "Next Follow-up Date", selector: (row) => row.next_follow_up_date, sortable: true },

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
            to={`/admin/create-field-sence-leads`}
            style={{ background: themeColor }}
            className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center"              >
            <IoAddCircleOutline size={20} />
              Create
          </Link>
        </div>
        <div className='mx-3'>
          <Table
            columns={column}
            data={FieldsenseLeadData}
            isPagination={true}
          />
        </div>
      </div>
    </section>
  )
}

export default FieldSenseLeads