import React from 'react'
import Navbar from '../../components/Navbar'

function CreateEmployeeFieldSenseMeeting() {
  return (
    <section className='flex'>
        <div className='hidden md:block'>
           <Navbar/>
        </div>
        <div className="w-full flex mx-3 flex-col overflow-hidden mb-5">
            <h2 className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10">
                Create Meeting
            </h2>
            <div className='flex justify-center'>
            <div className='border-2 border-black rounded-md my-5 w-4/5'>
                <div className='md:grid grid-cols-3 mx-5 gap-5 my-5'>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Meeting Title
                       </label>
                       <input
                          type="text"
                          placeholder="Meeting Title"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Meeting Date 
                       </label>
                       <input
                          type="date"
                          placeholder="Threads Tags"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Meeting Time
                       </label>
                       <input
                          type="time"
                          placeholder="Meeting Time"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Participants
                       </label>
                       <input
                          type="text"
                          placeholder="Participants"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Location
                       </label>
                       <input
                          type="text"
                          placeholder="Location"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                      <label htmlFor="" className="font-semibold my-2">
                        Travel Mode 
                       </label>
                       <select className="border p-1 px-4 border-gray-500 rounded-md">
                          <option value="">Select Travel Mode </option>
                          <option value="">Car</option>
                          <option value="">Public Transit</option>
                          <option value="">Walking</option>
                       </select>
                   </div>
                   <div className="flex flex-col ">
                      <label htmlFor="" className="font-semibold my-2">
                        Expenses  
                       </label>
                       <select className="border p-1 px-4 border-gray-500 rounded-md">
                          <option value="">Select Expenses </option>
                          <option value="">Transportation</option>
                          <option value="">Meals</option>
                          <option value="">Miscellaneous</option>
                       </select>
                   </div>
               </div>
                <div className='grid grid-cols mx-5 gap-5 my-5'>
                  <div className="flex flex-col ">
                      <label htmlFor="" className="font-semibold my-2">
                        Meeting Agenda
                        </label>
                        <textarea
                          name=""
                          id=""
                          cols="5"
                          rows="3"
                          placeholder="Meeting Agenda"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
               </div>
            </div>
            </div>
            <div className='flex justify-center mb-10 gap-2'>
                <button className='bg-black text-white p-2 px-4 rounded-md font-medium'>Create Meeting</button>
            </div>
        </div>
    </section>
  )
}


export default CreateEmployeeFieldSenseMeeting