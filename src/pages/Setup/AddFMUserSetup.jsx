import React from 'react'

function AddFmUserSetup() {
  return (
    <section>
        <div className="w-full flex  flex-col overflow-hidden">
            <h2 className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10">
                Add FM User
            </h2>
            <div className='mx-20 border border-gray-400 p-5 px-10 rounded-lg  '>
                <div className='md:grid grid-cols-4 gap-5 my-3'>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            First Name
                        </label>
                        <input
                          type="text"
                          placeholder="First Name"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Mobile Number
                        </label>
                        <input
                          type="text"
                          placeholder="Mobile Number"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold my-2">
                            Email Address
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Number"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                </div>
                <div className='md:grid grid-cols-4 gap-5 my-3'>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Gender
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Gender</option>
                            <option value="">Male</option>
                            <option value="">Female</option>
                        </select>
                    </div>
                    <div className="flex flex-col mt-5">
                        <div className='flex gap-3 ml-5 my-5'>
                            <input
                              type="radio"
                              id="yes"
                              name='name'
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                            <label htmlFor="" className="font-semibold">
                                Internal
                            </label>
                            <input
                              type="radio"
                              id="yes"
                              name='name'
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                            <label htmlFor="" className="font-semibold">
                                External
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Employee Id
                        </label>
                        <input
                          type="text"
                          placeholder="Employee Id"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Base Unit
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Base Unit</option>
                            <option value="">Tcs B Unit</option>
                            <option value="">C</option>
                            <option value="">cloneunit</option>
                            <option value="">E</option>
                            <option value="">HDFC Ergo Bhandup- Floor1-101</option>
                            <option value="">unique</option>
                            <option value="">Tower 101-F1-Aerial Services</option>
                            <option value="">Unit A 01</option>
                            <option value="">Clone stage</option>
                            <option value="">Ktk</option>
                            <option value="">Pysh</option>
                            <option value="">AA</option>
                            <option value="">BB</option>
                            <option value="">CC</option>
                            <option value="">DD</option>
                            <option value="">AA1</option>
                            <option value="">BB1</option>
                            <option value="">Recurve Unit</option>
                            <option value="">Lock 1 Hi</option>
                            <option value="">221</option>
                            <option value="">Haven Havana</option>
                        </select>
                    </div>
                </div>
                <div className='md:grid grid-cols-4 gap-5 my-3 '>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Department
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Department</option>
                            <option value="">Electrical dept</option>
                            <option value="">Security</option>
                            <option value="">Helldesk</option>
                            <option value="">Water Supply</option>
                            <option value="">Operations Dept</option>
                            <option value="">Test</option>
                            <option value="">Help</option>
                            <option value="">Tested 123</option>
                            <option value="">Lockated Department Test</option>
                            <option value="">Metrology</option>
                            <option value="">Genral store</option>
                            <option value="">Hr dept</option>
                            <option value="">Temperature</option>
                            <option value="">Engineer</option>
                            <option value="">BMc Department</option>
                            <option value="">Aeronautics department</option>
                            <option value="">ABC</option>
                            <option value="">Chokidar</option>
                            <option value="">Operational</option>
                            <option value="">XYZ</option>
                            <option value="">Demo dept</option>
                            <option value="">SCD</option>
                            <option value="">Employee</option>
                            <option value="">Admin</option>
                            <option value="">IT</option>
                            <option value="">Sales</option>
                            <option value="">Hr</option>
                            <option value="">Tech</option>
                            <option value="">Accounts</option>
                            <option value="">test</option>
                            <option value="">abc</option>

                        </select>
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Employee Emails
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Emails Preference</option>
                            <option value="">All Emails</option>
                            <option value="">Critical Email Only</option>
                            <option value="">No Emails</option>
                        </select>
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Designation
                        </label>
                        <input
                          type="text"
                          placeholder="Designation"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            User Type
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select User Type</option>
                            <option value="">Admin(web & App)</option>
                            <option value="">Technician(App)</option>
                            <option value="">Head Site Engineer</option>
                            <option value="">Site Engineer</option>
                            <option value="">Accounts</option>
                            <option value="">Purchase Officer</option>
                            <option value="">Head Site Engineer</option>
                            <option value="">Quality Control</option>
                            <option value="">Security</option>
                            <option value="">Security Supervisor</option>
                        </select>
                    </div>
                </div>
                <div className='md:grid grid-cols-4 gap-5 my-3'>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Role
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select role</option>
                            <option value="">Account Manager</option>
                            <option value="">Executive</option>
                            <option value="">Process Manager</option>
                            <option value="">manager</option>
                            <option value="">Lockated Role Test</option>
                            <option value="">Manager</option>
                            <option value="">Technician</option>
                            <option value="">Admin</option>
                            <option value="">Inventory Role</option>
                            <option value="">admin</option>
                            <option value="">Marketing</option>
                            <option value="">executive</option>
                            <option value="">Admin</option>
                            <option value="">Super Admin</option>
                            <option value="">Site Engineer 1</option>
                            <option value="">Head Site engineer</option>
                            <option value="">Account</option>
                            <option value="">Engineering Admin</option>
                            <option value="">New Admin</option>
                            <option value="">N Security</option>
                            <option value="">Occupant Admin</option>
                            <option value="">Employee</option>
                            <option value="">Facility Manager</option>
                            <option value="">Mutli skill Technician</option>
                            <option value="">QA</option>
                            <option value="">Last Admin</option>
                        </select>
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Access Level
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Access Level</option>
                            <option value="">Company</option>
                            <option value="">Country</option>
                            <option value="">Region</option>
                            <option value="">Zone</option>
                            <option value="">Site</option>
                        </select>
                    </div>
                </div>
                <div className="sm:flex justify-start grid gap-2 my-5 ">
                    <button
                      className="bg-black text-white p-2 px-4 rounded-md font-medium"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AddFmUserSetup