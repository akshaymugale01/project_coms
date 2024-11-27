import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import DailyPickup from './EmployeeSubPages/DailyPickup'
import OutStation from './EmployeeSubPages/OutStation'

const EmployeeTransportation = () => {
  const [page, setPage] = useState("daily")
  return (
    <section className="flex">
    <Navbar />
    <div className=" w-full flex mx-3 flex-col overflow-hidden">
    <div className="flex justify-center my-2">
          <div className="flex flex-row gap-5 text-lg font-semibold p-1 rounded-full bg-gray-400">
            <h2
              className={`p-1 ${
                page === "daily" && "bg-white text-blue-500"
              } rounded-full px-4 cursor-pointer text-sm`}
              onClick={() => setPage("daily")}
            >
              Daily Pickup & Drop
            </h2>
            <h2
              className={`p-1 ${
                page === "outstation" && "bg-white text-blue-500"
              } rounded-full px-4 cursor-pointer text-sm`}
              onClick={() => setPage("outstation")}
            >
              Outstation Travel
            </h2>
           
          </div>
        </div>
        {page === "daily" && (
          <div>
           <DailyPickup/>
          </div>
        )}
        {page === "outstation" && (
          <div>
           <OutStation/>
          </div>
        )}
       
      </div>
    </section>
  )
}

export default EmployeeTransportation
