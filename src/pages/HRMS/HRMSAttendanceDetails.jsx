import React from 'react'

const HRMSAttendanceDetails = () => {
  return (
    <div className="flex justify-center items-center my-5 w-full p-4">
      <div className="border border-gray-300 rounded-lg p-4 w-full mx-4">
        <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
          Attendance Details
        </h2>

        {/* <h3 className="text-lg font-semibold mt-6 mb-2">Personal Information</h3> */}

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold"> Name:</label>
            <p className="text-sm font-normal">Mittu Panda</p>
          </div>
          {/* <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Last Name:</label>
            <p className="text-sm font-normal">{employee.lastName}</p>
          </div> */}
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Date :</label>
            <p className="text-sm font-normal">03/04/2024</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Time In:</label>
            <p className="text-sm font-normal">9:00AM</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Time Out:</label>
            <p className="text-sm font-normal">5:00PM</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Total Hours worked:</label>
            <p className="text-sm font-normal">10</p>
          </div>
          </div>
          </div> </div>
  )
}

export default HRMSAttendanceDetails