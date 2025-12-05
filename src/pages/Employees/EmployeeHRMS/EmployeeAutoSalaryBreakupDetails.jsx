import React from 'react'

const EmployeeAutoSalaryBreakupDetails = () => {
  return (
    <div className="flex justify-center items-center my-5 w-full p-4">
      <div className="border border-gray-300 rounded-lg p-4 w-full mx-4">
        <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
        Auto Salary Details 
        </h2>

        {/* <h3 className="text-lg font-semibold mt-6 mb-2">Personal Information</h3> */}

        <div className="grid md:grid-cols-1 gap-4 mt-4">
  <div className="flex justify-between items-center">
    <label className="font-semibold">Basic Salary:</label>
    <p className="text-sm font-normal">10000</p>
  </div>

  <div className="flex justify-between items-center">
    <label className="font-semibold">HRA :</label>
    <p className="text-sm font-normal">03/04/2024</p>
  </div>
  <div className="flex justify-between items-center">
    <label className="font-semibold">PF:</label>
    <p className="text-sm font-normal">900</p>
  </div>
  <div className="flex justify-between items-center">
    <label className="font-semibold">Other Allowance:</label>
    <p className="text-sm font-normal">5004</p>
  </div>
  <div className="flex justify-between items-center">
    <label className="font-semibold">Bonus/Incentives:</label>
    <p className="text-sm font-normal">10566</p>
  </div>
  <div className="flex justify-between items-center">
    <label className="font-semibold">Total:</label>
    <p className="text-sm font-normal">10566</p>
  </div>
</div>

          </div> </div>
  )
}

export default EmployeeAutoSalaryBreakupDetails