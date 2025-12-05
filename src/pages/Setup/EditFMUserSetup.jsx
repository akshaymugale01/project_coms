import React from 'react'
import image from "/profile.png";
function EditFmUserSetup() {
  return (
    <section>
        <div className="w-full flex  flex-col overflow-hidden">
            <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white mx-3 my-5">
                FM User Edit Details
            </h2>
            <div className='cursor-pointer flex justify-center items-center my-4'>
                <img
                  src={image}
                  className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
              />
            </div>
            <div className='mx-20 p-5 px-10 rounded-lg my-5 '>
                <div className='md:grid grid-cols-3 gap-5 '>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold my-2">
                            First Name
                        </label>
                        <input
                          type="text"
                          placeholder="First Name"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                            Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold my-2">
                            Gender
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Gender</option>
                            <option value="">Male</option>
                            <option value="">Female</option>
                        </select>
                    </div>
                </div>
                <div className='md:grid grid-cols-3 gap-5 '>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                            Company Cluster
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Company Cluster</option>
                        </select>
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                            Mobile
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Mobile"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                            Email
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Email"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                </div>
                <div className='md:grid grid-cols-3 gap-5 '>
                    <div className='flex md:flex-row flex-col gap-3 mt-10 '>
                        <div>
                        <input
                          type="radio"
                          id="yes"
                          name='name'
                          className="border p-1 px-4 border-gray-500 rounded-md mx-2 "
                        />
                        <label htmlFor="" className="font-semibold  mr-2">
                            Internal
                        </label>
                        </div>
                        <div>
                        <input
                          type="radio"
                          id="yes"
                          name='name'
                          className="border p-1 px-4 border-gray-500 rounded-md mx-2"
                        />
                        <label htmlFor="" className="font-semibold  mr-2">
                            External
                        </label>
                        </div>
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                           Employee
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Employee"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                            Last Working Day
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                </div>
                <div className='md:grid grid-cols-3 gap-5 '>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                            Site
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div> 
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                            Base Unit
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                           Department
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>  
                </div>
                <div className='md:grid grid-cols-3 gap-5 '>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                            Designation
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div> 
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                            User Type
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select User Type</option>
                        </select>
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                            Role
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Role</option>
                        </select>
                    </div> 
                </div>
                <div className='md:grid grid-cols-3 gap-5 '>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                            Access Level
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Access Level</option>
                        </select>
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                            Access
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select  Access</option>
                        </select>
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="" className="font-semibold  my-2">
                            Email Preference
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Email Preference</option>
                        </select>
                    </div>
                </div>
                    <div className='flex justify-center w-full my-2'>
                        <button className='p-1 px-4 bg-black text-white rounded-md'>Update</button>
                    </div>
            </div>
        </div>
    </section>
  )
}

export default EditFmUserSetup