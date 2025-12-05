import React from 'react'
import Table from '../../components/table/Table';
import { BsEye } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';
import { IoAddCircleOutline, IoClose } from 'react-icons/io5';
import Navbar from '../../components/Navbar';
import { MdOutlineEmail } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
function BankAccountCreation() {
    const column = [
        {
          name: "view",

          cell: (row) => (
            <div className="flex items-center gap-4">
              <Link to={`/admin/bank-account-details/${row.id}`}>
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
        {
          name: "Predefined Email ",

          cell: (row) => (
            <div className="flex items-center gap-4">
              <MdOutlineEmail size={20} />
            </div>
          ),
        },
        {
          name: "Eligibility Check",
          selector: (row) =>
            (
              <div className="flex justify-center gap-2">
                <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full">
                  <TiTick size={20} />
                </button>
                <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full">
                  <IoClose size={20} />
                </button>
              </div>
            ),
          sortable: true,
        },
      ];

      const data = [
        {
          id: 1,
          firstName: 'sagar',
          lastName: 'yadav',
          email: 'sagar@gmail.com',
          phone: '1078778710',
          dateofBirth: '6 may 2003',
          gender:"male",
          city:"mumbai",
          state:"mh",
          address: "jp road mumbai",
          identificationDocuments: "",
          action: <BsEye />,
        },
      ];
  return (
    <section className='flex'>
      <Navbar/>
      <div className='w-full flex flex-col overflow-hidden'>
        <div className="flex justify-center gap-2 my-2">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200 ">
            <NavLink
              to={"/admin/advance-salary-request"}
              className={({ isActive }) =>`p-1 ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides" 
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Advance Salary Request
            </NavLink>
            <NavLink
              to={"/admin/bank-account-creation"}
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
          <Link to={`/admin/create-bank-account`}  className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center justify-center rounded-md ">
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
      </div>
    </section>
  )
}
export default BankAccountCreation