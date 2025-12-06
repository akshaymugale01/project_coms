import React, { useState, useRef, useEffect  } from 'react'
import interview from "/01.jpg";
import Navbar from '../../../components/Navbar';
import pic1 from "/profile1.jpg";
import pic2 from "/profile2.jpg";
import pic3 from "/profile3.jpg";
import pic4 from "/profile4.jpg";
import { BsThreeDots } from 'react-icons/bs';
import { IoMdShareAlt } from 'react-icons/io';
function EmployeeGroupJoinDetails() {
  const [page, setPage] = useState("empolyeeEvent");
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
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
    <section className='flex'>
      <Navbar/>
      <div className='w-full flex mx-3 flex-col overflow-hidden'>
        <div className='flex justify-center my-2'>
          <div className='border-2 border-grey-200 rounded-md w-full'>
            <div className='md:grid grid-cols my-5 '>
              <div className='flex flex-col'>
                <div className='flex md:flex-row flex-col justify-between gap-y-3 mx-5'>
                  <div className='flex gap-2'>
                    <img src={interview} className=" rounded-full w-20 h-20" alt="forum-profile" />
                    <div>
                      <h2 className='font-semibold text-lg'>Apple Education </h2>
                      <p className='font-normal text-sm'>Private group
                      28.3K members</p>
                    </div>
                  </div>
                  <div className='flex md:flex-row flex-col gap-2'>
                    <div>
                      <button className='border-2 border-black p-1 px-3 rounded-md w-full'>Join</button>
                    </div>
                    <div>
                      <button className='border-2 border-black p-1 px-3 rounded-md w-full flex justify-center'><IoMdShareAlt size={22} /></button>
                    </div>
                    <div ref={dropdownRef} className="relative">
                      <button
                        onClick={toggleDropdown}
                        type="button"
                        className="inline-flex justify-center w-full border-2 rounded-md border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <BsThreeDots size={15}/>
                      </button>
                      {isOpen && (
                        <div
                          className="absolute right-0 mt-3 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-button"
                        >
                          <div className="py-1" role="none">
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Save post</a>
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Delete</a>
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Hide post</a>
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Block</a>
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Report post</a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex flex-wrap items-center my-8 mx-5'>
                  <div className="relative">
                    <img src={pic1} className="w-10 h-10 rounded-full" alt="" />
                  </div>
                  <div className="relative right-4">
                    <img src={pic2} className="w-10 h-10 rounded-full" alt="" />
                  </div>
                  <div className="relative right-8">
                    <img src={pic3} className="w-10 h-10 rounded-full" alt="" />
                  </div>
                  <div className="relative right-12">
                    <img src={pic4} className="w-10 h-10 rounded-full" alt="" />
                  </div>
                  <div className="mt-2 md:relative right-10">
                    <h2 className='font-semibold md:inline-block block '>Carolyn Ortiz, Frances Guerrero, and 20 joined group</h2>
                  </div>
                </div>
                <div className='border-t border-black '>
                  <div className='mt-5 flex flex-wrap justify-around'>
                    <h2
                      className={`p-1 ${
                      page === "empolyeePolls" && "bg-white text-blue-500 shadow-custom-all-sides"
                      } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
                      onClick={() => setPage("empolyeePolls")}
                    >
                      Discussion
                    </h2>
                    <h2
                      className={`p-1 ${
                      page === "xyz" && "bg-white text-blue-500 shadow-custom-all-sides"
                      } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
                      onClick={() => setPage("xyz")}
                    >
                      Post
                    </h2>
                    <h2
                      className={`p-1 ${
                      page === "abc" && "bg-white text-blue-500 shadow-custom-all-sides"
                      } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
                      onClick={() => setPage("abc")}
                    >
                     People 
                    </h2>
                    <h2
                      className={`p-1 ${
                      page === "qrs" && "bg-white text-blue-500 shadow-custom-all-sides"
                      } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
                      onClick={() => setPage("qrs")}
                    >
                     About
                    </h2>
                    <h2
                      className={`p-1 ${
                      page === "Media" && "bg-white text-blue-500 shadow-custom-all-sides"
                      } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
                      onClick={() => setPage("Media")}
                    >
                     Media
                    </h2>
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

export default EmployeeGroupJoinDetails