import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import AdminDailyPickup from './SubPages/AdminDailyPickup'
import AdminOutStation from './SubPages/AdminOutStation'



const Transportation = () => {
  const [page, setPage] = useState("daily")
  return (
    <section className="flex">
    <Navbar />
    <div className=" w-full flex mx-3 flex-col overflow-hidden">
    <div className="flex md:justify-center  my-2">
          <div className="md:flex md:flex-row flex-col gap-5 text-lg font-semibold p-1 md:rounded-full md:w-auto w-full rounded-sm bg-gray-400">
            <h2
              className={`p-1 ${
                page === "daily" && "bg-white text-blue-500"
              } md:rounded-full rounded-sm px-4 cursor-pointer text-center text-sm`}
              onClick={() => setPage("daily")}
            >
              Daily Pickup & Drop
            </h2>
            <h2
              className={`p-1 ${
                page === "outstation" && "bg-white text-blue-500"
              } md:rounded-full rounded-sm px-4 cursor-pointer text-center text-sm`}
              onClick={() => setPage("outstation")}
            >
              Outstation Travel
            </h2>
           
          </div>
        </div>
        {page === "daily" && (
          <div>
           <AdminDailyPickup/>
          </div>
        )}
        {page === "outstation" && (
          <div>
           <AdminOutStation/>
          </div>
        )}
       
      </div>
    </section>
  )
}




export default Transportation
