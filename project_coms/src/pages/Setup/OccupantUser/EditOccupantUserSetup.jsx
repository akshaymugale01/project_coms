import React, { useRef, useState,  } from 'react'
import image from "/profile.png";
function EditOccupantUserSetup() {
    const [imageFile, setImageFile] = useState(null);
    const inputRef = useRef(null);
    const handleImageClick = () => {
        inputRef.current.click();
    };
    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
      };
  return (
    <section>
        <div className="w-full flex  flex-col overflow-hidden">
            <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white mx-3 my-5">
                Occupant User Edit Details
            </h2>
            <div onClick={handleImageClick} className="cursor-pointer flex justify-center items-center my-4">
                {imageFile ? (
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Uploaded"
                      className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
                    />
                 ) : (
                   <img
                     src={image}
                     alt="Default"
                     className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
                    />
                )}
                <input
                  type="file"
                  ref={inputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
               />
            </div>
            <div className='mx-20 p-5 px-10 rounded-lg my-5 '>
                <div className='md:grid grid-cols-3 gap-5 '>
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
                        <label htmlFor="" className="font-semibold  my-2">
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
                </div>
                <div className='md:grid grid-cols-3 gap-5 my-3'>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold  my-2">
                            Company Cluster
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Company Cluster</option>
                        </select>
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold  my-2">
                            Mobile
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Mobile"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
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
                <div className='md:grid grid-cols-3 gap-5 my-3'>
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
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold  my-2">
                           Employee
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Employee"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
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
                <div className='md:grid grid-cols-3 gap-5 my-3'>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold  my-2">
                            Site
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div> 
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold  my-2">
                            Base Unit
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Base Unit</option>
                        </select>
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold  my-2">
                           OwnerShip
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select OwnerShip</option>
                        </select>
                    </div>  
                </div>
                <div className='md:grid grid-cols-3 gap-5 my-3'>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold  my-2">
                            Entity
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Entity</option>
                        </select>
                    </div> 
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold  my-2">
                            Source Type
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Source Type</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold  my-2">
                            Department
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Department</option>
                        </select>
                    </div> 
                </div>
                <div className='md:grid grid-cols-3 gap-5 my-3'>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold  my-2">
                            Designation
                        </label>
                        <input
                          type="text"
                          placeholder="Designation"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold  my-2">
                            User Type
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select User Type</option>
                        </select>
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold  my-2">
                            Access Level
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Access Level</option>
                        </select>
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold  my-2">
                            Access
                        </label>
                        <select className="border p-1 px-4 border-gray-500 rounded-md">
                            <option value="">Select Access</option>
                        </select>
                    </div>
                </div>
                <div className='md:grid grid-cols-4 gap-5 my-3 '>
                    <div className="flex gap-3 ">
                        <input type="checkbox" name="occupant_user" id="Helpdesk"/>
                        <label htmlFor="Helpdesk" className='font-semibold'>Daily Helpdesk Report Email</label>
                    </div>
                </div>
            </div>
            <div className='flex gap-3 justify-center mb-10 '>
                <button to="" className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md "  >
                    Submit
                </button>
            </div>
        </div>
    </section>
  )
}

export default EditOccupantUserSetup