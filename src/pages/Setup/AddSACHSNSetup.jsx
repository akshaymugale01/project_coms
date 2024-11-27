import React from 'react'
import Navbar from '../../components/Navbar'

function AddSACHSNSetup() {
  return (
    <section className='flex'>
        <div className='hidden md:block'>
            <Navbar/>
        </div>
        <div className="w-full flex  flex-col overflow-hidden">
            <h2 className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10">
                Add SAC/HSN Setup
            </h2>
            <div className='flex justify-center'>
                <div className='border border-gray-400 p-5 px-10 rounded-lg w-4/5'>
                    <div className='md:grid grid-cols-3 gap-5 my-3'>
                        <div className="flex flex-col ">
                            <label htmlFor="" className="font-semibold my-2">
                                Type 
                            </label>
                            <select className="border p-1 px-4 border-gray-500 rounded-md">
                                <option value="">Select Type </option>
                                <option value="">Product</option>
                                <option value="">Service</option>
                            </select>
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="" className="font-semibold my-2">
                                Category 
                            </label>
                            <input
                              type="text"
                              placeholder="Enter Category "
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="" className="font-semibold my-2">
                                SAC/HSN code 
                            </label>
                            <input
                              type="text"
                              placeholder="Enter SAC/HSN code "
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="" className="font-semibold my-2">
                                CGST Rate
                            </label>
                            <input
                              type="text"
                              placeholder="Enter CGST Rate"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="" className="font-semibold my-2">
                                SGST Rate
                            </label>
                            <input
                              type="text"
                              placeholder="Enter SGST Rate"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                           />
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="" className="font-semibold my-2">
                                IGST Rate
                            </label>
                            <input
                              type="text"
                              placeholder="Enter IGST Rate"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="sm:flex justify-center grid gap-2 my-5 ">
                        <button className="bg-black text-white p-2 px-4 rounded-md font-medium">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AddSACHSNSetup