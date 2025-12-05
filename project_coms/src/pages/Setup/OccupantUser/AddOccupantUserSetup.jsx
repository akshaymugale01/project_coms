import React from 'react'

function AddOccupantUserSetup() {
  return (
    <section>
        <div className="w-full flex  flex-col overflow-hidden">
            <h2 className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10">
                Add Occupant User
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
                            Gender
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Gender</option>
                            <option value="">Male</option>
                            <option value="">Female</option>
                        </select>
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
                </div>
                <div className='md:grid grid-cols-4 gap-5 my-3'>
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
                            Select Entity
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Entity</option>
                            <option value="">Lockated</option>
                            <option value="">Haven infoline</option>
                            <option value="">Demo</option>
                            <option value="">Demo 2</option>
                            <option value="">Mastercard</option>
                            <option value="">Tata</option>
                            <option value="">lsd</option>
                        </select>
                    </div>
                </div>
                <div className='md:grid grid-cols-4 gap-5 my-3 '>
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
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            OwnerShip
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select OwnerShip</option>
                            <option value="">Owner</option>
                            <option value="">Tenant</option>
                        </select>
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold my-2">
                            Select Type
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Select Type</option>
                            <option value="">Primary</option>
                            <option value="">Secondry</option>
                            <option value="">No Emails</option>
                        </select>
                    </div>
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
                </div>
                <div className='md:grid grid-cols-4 gap-5 my-3'>
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
                            <option value="">User</option>
                            <option value="">Admin</option>
                        </select>
                    </div>
                </div>
                <div className='md:grid grid-cols-4 gap-5 my-3'>
                    <div className="flex gap-3 ">
                        <input type="checkbox" name="occupant_user" id="Helpdesk"/>
                        <label htmlFor="Helpdesk" className='font-semibold'>Daily Helpdesk Report Email</label>
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
export default AddOccupantUserSetup