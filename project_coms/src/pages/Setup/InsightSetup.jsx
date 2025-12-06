import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import InsightCategory from './SetupSubPages/InsightCategory'
import InsightSubCategory from './SetupSubPages/InsightSubCategory'

const InsightSetup = () => {
    const [page, setPage] = useState("category")
  return (
    <section className='flex'>
        <Navbar/>
        <div className="p-4 w-full my-2 flex mx-3 overflow-hidden flex-col">
        <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
          <h2
            className={`p-1 ${
              page === "category" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("category")}
          >
            Category
          </h2>
          <h2
            className={`p-1 ${
              page === "subCategory" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("subCategory")}
          >
            Sub Category
          </h2>
        </div>
        {page === "category" && (
               <div>
                <InsightCategory/>
              </div>
            )}
           {page === "subCategory" && (
              <div>
                <InsightSubCategory/>
              </div>
            )}
        </div>
    </section>
  )
}

export default InsightSetup