import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../../../components/Navbar'
import { IoAddCircleOutline, IoClose } from 'react-icons/io5'
import Table from '../../../components/table/Table'
import { BsEye } from 'react-icons/bs'
import EmpolyeeCreateAdvanceSalaryRequestModal from './EmployeeAdvanceSalaryRequestModal'
import EmployeeAdvanceSalaryRequestDetailModal from '../../../containers/modals/EmployeeAdvanceSalaryRequestModal'

function EmployeeAdvanceSalaryRequest() {
    const [createAdvanceSalary, showCreateAdvanceSalary] = useState(false);
    const [detailAdvanceSalary, showDetailAdvanceSalary] = useState(false);
    const column = [
        {
          name: "view",

          cell: (row) => (
            <div className="flex items-center gap-4">
              <button onClick={() =>showDetailAdvanceSalary(true)}>
                <BsEye size={15} />
              </button>
            </div>
          ),
        },
        { name: "Name", selector: (row) => row.name, sortable: true },
        { name: "Amount requested", selector: (row) => row.amountRequested, sortable: true },
        { name: "Reason for advance", selector: (row) => row.reasonForAdvance, sortable: true },
        { name: "Approval", selector: (row) => row.approval, sortable: true },
      ];

      const data = [
        {
          id: 1,
          name: 'sagar',
          amountRequested: 12000,
          reasonForAdvance: "car Insurance ",
          approval:"no",
        },
        {
          id: 2,
          name: 'vikram',
          amountRequested: 12000,
          reasonForAdvance: "home loan",
          approval:"yes",
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
                <button  className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center justify-center rounded-md " onClick={() => showCreateAdvanceSalary(true)}>
                  <IoAddCircleOutline/> Request Advance Salary
                </button> 
            </div>
            <div className='mx-5'>
                <Table
                    columns={column}
                    data={data}
                    isPagination={true}
                />
            </div>
            {createAdvanceSalary && <EmpolyeeCreateAdvanceSalaryRequestModal onclose={() => showCreateAdvanceSalary(false)} />}
            {detailAdvanceSalary && <EmployeeAdvanceSalaryRequestDetailModal onclose={() => showDetailAdvanceSalary(false)} />}
        </div>
    </section>
  )
}

export default EmployeeAdvanceSalaryRequest