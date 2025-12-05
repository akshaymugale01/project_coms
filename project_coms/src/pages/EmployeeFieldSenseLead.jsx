import React from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Link, NavLink } from 'react-router-dom'
import Table from '../components/table/Table';
import { BsEye } from 'react-icons/bs';
import Navbar from '../components/Navbar';
function EmployeeFieldSenseLead() {
    const column = [
        {
          name: "view",
              cell: (row) => (
            <div className="flex items-center gap-4">
              <Link to={`/admin/field-sence-details/${row.id}`}>
                <BsEye size={15} />
              </Link>
            </div>
          ),
        },

        { name: "Lead Name", selector: (row) => row.name, sortable: true },
        { name: "Lead Source", selector: (row) => row.source, sortable: true },
        { name: "Phone", selector: (row) => row.phone, sortable: true },
        { name: "Email", selector: (row) => row.email, sortable: true },
        { name: "Company Name", selector: (row) => row.companyName, sortable: true },
        { name: "Lead Status ", selector: (row) => row.status , sortable: true },
        { name: "Assigned Sales Representative", selector: (row) => row.assignedRep, sortable: true },
        { name: "Last Contact Date", selector: (row) => row.lastContactDate, sortable: true },
        { name: "Next Follow-up Date", selector: (row) => row.nextFollowUpDate, sortable: true },

      ];

      const data = [
        {
          id: 1,
          name: "karan",
          source: "",
          phone: "2890829191",
          email: "karan@gmail.com",
          companyName: "Vibo",
          status: "Active",
          assignedRep: "",
          lastContactDate: "12-3-2024",
          nextFollowUpDate: "14-7-2024",
          action: <BsEye />,
        },
        {
            id: 2,
            name: "sameer",
            source: "",
            phone: "3288798788",
            email: "sameer@gmail.com",
            companyName: "abc",
            status: "Lost",
            assignedRep: "",
            lastContactDate: "5-5-2024",
            nextFollowUpDate: "7-7-2024",
            action: <BsEye />,
        },
        {
            id: 3,
            name: "varun",
            source: "",
            phone: "2456577887",
            email: "varun@gmail.com",
            companyName: "acd",
            status: "Ongoing Discussion",
            assignedRep: "Cancelled",
            lastContactDate: "15-5-2024",
            nextFollowUpDate: "25-8-2024",
            action: <BsEye />,
        },
      ];
  return (
    <section className='flex'>
      <Navbar/>
      <div className='w-full flex flex-col overflow-hidden'>
        <div className="flex justify-center my-2 w-full">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200 ">
            <NavLink
              to={"/employee/field-sense-meeting"}
              className={({ isActive }) =>`p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides" 
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              // onClick={() => setPage("fieldSenseMeeting")}
            >
              Meeting Management
            </NavLink>
            <NavLink
              to={"/employee/field-sense-leads"}
              className={({ isActive }) =>`p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides" 
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              // onClick={() => setPage("fieldSenseMeeting")}
            >
              Leads Management
            </NavLink>
          </div>
        </div>
        <div className="flex justify-end items-center sm:flex-row flex-col my-2 mx-3">
          <Link
            to={`/admin/create-field-sence-leads`}
            className="border-2 border-black rounded-md flex font-semibold items-center  text-black p-1 px-4 "
          >
            <IoMdAdd size={20} />
              Create
          </Link>
        </div>
        <div className='mx-3'>
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


export default EmployeeFieldSenseLead
