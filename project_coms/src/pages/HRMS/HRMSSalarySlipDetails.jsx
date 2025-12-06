import React from 'react'
import { IoMdPrint } from 'react-icons/io'
import { MdFeed } from 'react-icons/md'
const HRMSSalarySlipDetails = () => {
  return (
    <div className="flex justify-center items-center my-5 w-full p-4">
      <div className="border border-gray-300 rounded-lg p-4 w-full mx-4">
      <div className='absolute right-10'>
                {/* <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md mx-3'>
                    <MdFeed/>
                    feeds
                </button>  */}
                <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md'>
                    <IoMdPrint />
                    Print
                </button>
            </div><br/>
            <br/>
        <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
          Salary Slip Details
        </h2>

        {/* <h3 className="text-lg font-semibold mt-6 mb-2">Personal Information</h3> */}

        <div className="grid md:grid-cols-1 gap-4 mt-4">
  <div className="flex justify-between items-center">
    <label className="font-semibold">Employee Name:</label>
    <p className="text-sm font-normal">Mittu Panda</p>
  </div>
  {/* <div className="flex justify-between items-center">
    <label className="font-semibold">Last Name:</label>
    <p className="text-sm font-normal">{employee.lastName}</p>
  </div> */}
  <div className="flex justify-between items-center">
    <label className="font-semibold">Basic Salary :</label>
    <p className="text-sm font-normal">2024</p>
  </div>
  <div className="flex justify-between items-center">
    <label className="font-semibold">Allowances:</label>
    <p className="text-sm font-normal">9002</p>
  </div>
  <div className="flex justify-between items-center">
    <label className="font-semibold">Deductions:</label>
    <p className="text-sm font-normal">5005</p>
  </div>
  <div className="flex justify-between items-center">
    <label className="font-semibold">Net Salary:</label>
    <p className="text-sm font-normal">10564</p>
  </div>
  <div className="flex justify-between items-center">
    <label className="font-semibold">Total:</label>
    <p className="text-sm font-normal">10564</p>
  </div>
</div>

          </div> </div>
  )
}

export default HRMSSalarySlipDetails