import React, { useState } from 'react'
import Table from '../../components/table/Table';
import { BsEye } from 'react-icons/bs';
import AdvanceSalaryRequestDetailModal from '../../containers/modals/AdvanceSalaryRequestDetailsModal';
import { TiTick } from 'react-icons/ti';
import { IoAddCircleOutline, IoClose } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import Navbar from '../../components/Navbar';
function AdvanceSalaryRequest() {

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
        {
          name: "action",
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
          name: 'sagar',
          amountRequested: 12000,
          reasonForAdvance: "car Insurance ",
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
         
        </div>
        <div className='mx-5'>
          <Table
            columns={column}
            data={data}
            isPagination={true}
          />
        </div>
      </div>
    
      {detailAdvanceSalary && <AdvanceSalaryRequestDetailModal onclose={() => showDetailAdvanceSalary(false)} />}
    </section>
  )
}

export default AdvanceSalaryRequest