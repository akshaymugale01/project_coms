import React from 'react'
import { Link } from 'react-router-dom'
import interview from "/01.jpg";
import pic1 from "/profile1.jpg";
import pic2 from "/profile2.jpg";
import pic3 from "/profile3.jpg";
import pic4 from "/profile4.jpg";
import EmployeeCommunication from "./EmployeeCommunication";
import Navbar from "../../../components/Navbar";
function EmployeeGroup() {
  return (
    <div className="flex ">
    <Navbar/>
    <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
     <EmployeeCommunication/>
      <div className="flex justify-between md:flex-row flex-col my-5 gap-y-3">
        <input
          type="text"
          placeholder="search"
          className="border-2 p-2 w-70 border-gray-300 rounded-lg "
        />
        {/* <Link to={`/admin/communication-create-group`}  className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center justify-center rounded-md">
          Create Group
        </Link> */}
      </div>
      <div>
        <div className='md:grid grid-cols-4 mx-3 gap-5 my-3'>
          <div className='flex flex-col my-3'>
            <div className='border-2 border-gray-100 rounded-md'>
            <img src={interview} className=" rounded-md" alt="forum-profile" />
            <div className='my-6'>
              <Link to={"/employee/communication-groupdetail"} className='text-lg font-semibold flex justify-center'>All in the Mind</Link>
              <p className='text-base font-thin text-center'> Private Group</p>
              <div className='flex gap-5 justify-center'>
                <div className='my-3'>
                  <h2 className='text-lg font-semibold text-center'>32k</h2>
                  <p className='text-sm font-normal text-center'>Members</p>
                </div>
                <div className='my-3'>
                  <h2 className='text-lg font-semibold text-center'>20</h2>
                  <p className='text-sm font-normal text-center'>Post per day</p>
                </div>
              </div>
              <div className='flex justify-center  my-5'>
                <div className="relative ">
                  <img src={pic1} className="w-10 h-10 rounded-full " alt="forum-profile" />
                </div>
                <div className="relative right-4">
                  <img src={pic2} className="w-10 h-10 rounded-full " alt="forum-profile" />
                </div>
                <div className="relative right-8">
                  <img src={pic3} className="w-10 h-10 rounded-full " alt="forum-profile" />
                </div>
                <div className="relative right-12">
                  <img src={pic4} className="w-10 h-10 rounded-full " alt="forum-profile" />
                </div>
              </div>
              <div className='border-t border-black'>
                <div className='flex justify-center my-3'>
                  <button  className='border-2 border-grey-500 rounded-md p-1 px-4 bg-green-500 text-white'>Join Group</button>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className='flex flex-col my-3'>
            <div className='border-2 border-gray-100 rounded-md'>
            <img src={interview} className=" rounded-md" alt="forum-profile" />
            <div className='my-6'>
              <Link to={"/employee/communication-groupdetail"} className='text-lg font-semibold flex justify-center'>All in the Mind</Link>
              <p className='text-base font-thin text-center'> Private Group</p>
              <div className='flex gap-5 justify-center'>
                <div className='my-3'>
                  <h2 className='text-lg font-semibold text-center'>32k</h2>
                  <p className='text-sm font-normal text-center'>Members</p>
                </div>
                <div className='my-3'>
                  <h2 className='text-lg font-semibold text-center'>20</h2>
                  <p className='text-sm font-normal text-center'>Post per day</p>
                </div>
              </div>
              <div className='flex justify-center  my-5'>
                <div className="relative ">
                  <img src={pic1} className="w-10 h-10 rounded-full " alt="forum-profile" />
                </div>
                <div className="relative right-4">
                  <img src={pic2} className="w-10 h-10 rounded-full " alt="forum-profile" />
                </div>
                <div className="relative right-8">
                  <img src={pic3} className="w-10 h-10 rounded-full " alt="forum-profile" />
                </div>
                <div className="relative right-12">
                  <img src={pic4} className="w-10 h-10 rounded-full " alt="forum-profile" />
                </div>
              </div>
              <div className='border-t border-black'>
                <div className='flex justify-center my-3'>
                  <button  className='border-2 border-grey-500 rounded-md p-1 px-4 bg-green-500 text-white'>Join Group</button>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className='flex flex-col my-3'>
            <div className='border-2 border-gray-100 rounded-md'>
            <img src={interview} className=" rounded-md" alt="forum-profile" />
            <div className='my-6'>
            <Link to={"/employee/communication-groupdetail"} className='text-lg font-semibold flex justify-center'>All in the Mind</Link>
              <p className='text-base font-thin text-center'> Private Group</p>
              <div className='flex gap-5 justify-center'>
                <div className='my-3'>
                  <h2 className='text-lg font-semibold text-center'>32k</h2>
                  <p className='text-sm font-normal text-center'>Members</p>
                </div>
                <div className='my-3'>
                  <h2 className='text-lg font-semibold text-center'>20</h2>
                  <p className='text-sm font-normal text-center'>Post per day</p>
                </div>
              </div>
              <div className='flex justify-center  my-5'>
                <div className="relative ">
                  <img src={pic1} className="w-10 h-10 rounded-full " alt="forum-profile" />
                </div>
                <div className="relative right-4">
                  <img src={pic2} className="w-10 h-10 rounded-full " alt="forum-profile" />
                </div>
                <div className="relative right-8">
                  <img src={pic3} className="w-10 h-10 rounded-full " alt="forum-profile" />
                </div>
                <div className="relative right-12">
                  <img src={pic4} className="w-10 h-10 rounded-full " alt="forum-profile" />
                </div>
              </div>
              <div className='border-t border-black'>
                <div className='flex justify-center my-3'>
                  <button  className='border-2 border-grey-500 rounded-md p-1 px-4 bg-green-500 text-white'>Join Group</button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  )
}
export default EmployeeGroup