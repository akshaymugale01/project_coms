import React from 'react'
import Navbar from '../../../components/Navbar'

function EditEmployeeProfile() {
  return (
    <section className='flex'>
        <div className='hidden md:block'>
           <Navbar/>
        </div>
        <div className="w-full flex mx-3 flex-col overflow-hidden mb-5">
            <h2 className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10">
                Edit Employee Profile
            </h2>
            <div className='flex justify-center'>
            <div className='border-2 border-black rounded-md my-5 w-4/5'>
                <div className='md:grid grid-cols-3 mx-5 gap-5 my-5'>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Name 
                       </label>
                       <input
                          type="text"
                          placeholder="Enter Name "
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                          Contact Number
                       </label>
                       <input
                          type="number"
                          placeholder="Contact Number"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Email 
                       </label>
                       <input
                          type="email"
                          placeholder="Email"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                          Department
                       </label>
                       <input
                          type="text"
                          placeholder="Department/Team"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                          Team
                       </label>
                       <input
                          type="text"
                          placeholder="Team"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                          Job Title
                       </label>
                       <input
                          type="text"
                          placeholder="Job Title"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                          Position
                       </label>
                       <input
                          type="text"
                          placeholder="Position"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                          Manager
                       </label>
                       <input
                          type="text"
                          placeholder="Manager"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                          Supervisor
                       </label>
                       <input
                          type="text"
                          placeholder="Supervisor"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
               </div>
                <div className='grid grid-cols mx-5 gap-5 my-5'>
                  <div className="flex flex-col ">
                      <label htmlFor="" className="font-semibold my-2">
                        Bio Pic
                        </label>
                        <textarea
                          name=""
                          id=""
                          cols="5"
                          rows="3"
                          placeholder="Bio Pic"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
               </div>
            </div>
            </div>
            <div className='flex justify-center mb-10 gap-2'>
                <button className='bg-black text-white p-2 px-4 rounded-md font-medium'>Edit</button>
            </div>
        </div>
    </section>
  )
}

export default EditEmployeeProfile