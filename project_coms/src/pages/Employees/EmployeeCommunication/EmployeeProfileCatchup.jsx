import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import pic1 from "/profile1.jpg";
import { SlLike } from 'react-icons/sl';
import { FaComment } from 'react-icons/fa';
import { BsThreeDots } from "react-icons/bs";
import Switch from '../../../Buttons/Switch';
function EmployeeProfileCatchUp() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <section>
        <div className=''>
            <div className='w-full flex  flex-col overflow-hidden'>
                <div className='flex justify-center '>
                    <div className='border-2 border-grey-200 rounded-md md:w-3/5 w-full mb-5'>
                        <div className='md:grid grid-cols my-5 mx-5'>
                            <div className='flex justify-between'>
                                <div className='flex gap-4 flex-wrap'>
                                    <Link to={``}>
                                       <img src={pic1} className="w-20 h-20 rounded-full" alt="" />
                                    </Link>
                                    <div>
                                       <Link to={``}><h2 className='font-semibold'>Riya Gupta</h2></Link>
                                       <Link to={``}>Completed 1 year At GoldMedia India</Link>
                                       <div className="flex gap-3">
                                           <div className='flex justify-end gap-3 my-3'>
                                              <SlLike />
                                              <FaComment />
                                            </div>
                                            <input
                                              type="text"
                                              name="name"
                                              id="name"
                                              placeholder="Comments"
                                              className="border p-1 px-4 border-gray-500 rounded-2xl my-2 w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div ref={dropdownRef} className="relative">
                                    <button
                                      onClick={toggleDropdown}
                                      type="button"
                                      className=" absolute top-0 right-0 inline-flex justify-center w-full border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        <BsThreeDots size={15} className='absolute top-0 right-0 '/>
                                    </button>
                                    {isOpen && (
                                        <div
                                          className="absolute right-0 top-5 mt-3 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                                          role="menu"
                                          aria-orientation="vertical"
                                          aria-labelledby="menu-button"
                                        >
                                            <div className="py-1 " role="none">
                                                <div className='flex justify-between'>
                                                    <div className='ml-2'>
                                                        <h3 className='font-semibold'>Bhakti Raut</h3>
                                                        <p className='tex-xs'>Includes all notifications</p>
                                                    </div>
                                                    <div className='mt-3 mx-3'>
                                                        <Switch/>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <div className='ml-2'>
                                                        <h3 className='font-semibold'>Work anniversaries</h3>
                                                    </div>
                                                    <div className='mt-3 mx-3'>
                                                        <Switch/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EmployeeProfileCatchUp