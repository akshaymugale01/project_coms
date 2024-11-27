import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Navbar from '../../../components/Navbar'
import { IoAddCircleOutline } from 'react-icons/io5'
import Table from '../../../components/table/Table'
import { BsEye } from 'react-icons/bs'
import video from "/video.png";
function EmployeeBankAccountCreation() {
  const column = [
    {
      name: "view",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employee/bank-account-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    { name: "First Name", selector: (row) => row.firstName, sortable: true },
    { name: "Last Name", selector: (row) => row.lastName, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone", selector: (row) => row.phone, sortable: true },
    { name: "Date of Birth", selector: (row) => row.dateofBirth, sortable: true },
    { name: "Gender", selector: (row) => row.gender, sortable: true },
    { name: "city", selector: (row) => row.city, sortable: true },
    { name: "state", selector: (row) => row.state, sortable: true },
    { name: "Identification documents", selector: (row) => row.identificationDocuments, sortable: true },
    { name: "Eligibility Check", selector: (row) => row.eligibilityCheck, sortable: true },
    { name: "Advance salary amount", selector: (row) => row.advanceSalaryAmount, sortable: true },
  ];

  const data = [
    {
      id: 1,
      firstName: 'sagar',
      lastName: 'yadav',
      email: 'sagar@gmail.com',
      phone: 'sagar',
      dateofBirth: '2-feb-2000',
      gender:"male",
      city:"mumbai",
      state:"mh",
      address: "jp road mumbai",
      identificationDocuments: "",
      eligibilityCheck:"yes",
      advanceSalaryAmount:"12000",
      action: <BsEye />,
    },
  ];
  return (
    <section className='flex'>
      <Navbar/>
      <div className='w-full flex flex-col overflow-hidden'>
        <div className='flex justify-center my-2 w-full'>
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200 ">
            <NavLink
              to={"/employee/advance-salary"}
              className={({ isActive }) =>`p-1 ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides" 
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Advance Salary Request
            </NavLink>
            <NavLink
              to={"/employee/bank-account-creation"}
              className={({ isActive }) =>`p-1 ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides" 
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Bank Account Creation
            </NavLink>
          </div>
        </div>
        <div className='flex justify-between my-5 mx-5'>
          <input
            type="text"
            placeholder="search"
            className="border-2 p-2 w-70 border-gray-300 rounded-lg "
          />
          <Link to={`/employee/create-bank-account`}  className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center justify-center rounded-md ">
            <IoAddCircleOutline/>Update Bank Account 
          </Link>           
        </div>
        <div className='mx-5'>
          <Table
            columns={column}
            data={data}
            isPagination={true}
          />
        </div>
        <div className='fixed bottom-10 right-3'>
          <button className='border-2 border-black  px-2 rounded-md flex gap-3'>
          <img src={video} className="w-14 h-10" alt="forum-profile" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default EmployeeBankAccountCreation