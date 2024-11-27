import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'

function CreateEmployeeForum() {
  return (
    <section className='flex'>
        <div className='hidden md:block'>
           <Navbar/>
        </div>
        <div className="w-full flex mx-3 flex-col overflow-hidden mb-5">
            <h2 className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10">
                Create Forum
            </h2>
            <div className='flex justify-center'>
            <div className='border-2 border-black rounded-md my-5 w-4/5'>
                <div className='md:grid grid-cols-3 mx-5 gap-5 my-5'>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Thread Title 
                       </label>
                       <input
                          type="text"
                          placeholder="Enter Thread Title "
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                      <label htmlFor="" className="font-semibold my-2">
                        Thread Category 
                       </label>
                       <select className="border p-1 px-4 border-gray-500 rounded-md">
                          <option value="">Select Thread Category </option>
                          <option value="">Public</option>
                          <option value="">Private</option>
                       </select>
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Thread Tags 
                       </label>
                       <input
                          type="text"
                          placeholder="Threads Tags"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                          Thread Creator
                       </label>
                       <input
                          type="text"
                          placeholder="Thread Creator"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
                   <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                          Date/Time Created 
                       </label>
                       <input
                          type="date"
                          placeholder="Date/Time Created"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                   </div>
               </div>
                <div className='grid grid-cols mx-5 gap-5 my-5'>
                  <div className="flex flex-col ">
                      <label htmlFor="" className="font-semibold my-2">
                        Thread Description
                        </label>
                        <textarea
                          name=""
                          id=""
                          cols="5"
                          rows="3"
                          placeholder="Description"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
               </div>
            </div>
            </div>
            <div className='flex justify-center mb-10 gap-2'>
                <button className='bg-black text-white p-2 px-4 rounded-md font-medium'>Create Forum</button>
            </div>
        </div>
    </section>
  )
}

export default CreateEmployeeForum