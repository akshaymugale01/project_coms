import React, { useState } from 'react'
import EmployeeOutwardsTable from './EmployeeSubPages/EmployeeOutwardTable';
import EmployeeInwardsTable from './EmployeeSubPages/EmployeeInwardTable';
import Navbar from '../../components/Navbar';
import EmployeePasses from './EmployeePasses';

const EmployeeGoodsInOut = () => {
  const [page, setPage] = useState("Inwards")


  return (
    <div className="visitors-page">
      <section className="flex">
        <Navbar/>
        <div className=" w-full flex mx-3 flex-col overflow-hidden">
          <EmployeePasses/>
          
  <div className="flex md:justify-center  my-2">
          <div className="flex w-full md:flex-row flex-col space-x-4  border-b border-gray-400">
              <h2
                className={`p-2 ${
                  page === "Inwards"
                    ? "text-blue-500 font-medium  shadow-custom-all-sides"
                    : "text-black"
                } rounded-t-md  cursor-pointer text-center text-sm flex items-center justify-center transition-all duration-300`}
                onClick={() => setPage("Inwards")}
              >
                Inwards
              </h2>
              <h2
                className={`p-2 ${
                  page === "Outwards"
                    ? "text-blue-500 font-medium  shadow-custom-all-sides"
                    : "text-black"
                }  rounded-t-md  rounded-sm cursor-pointer text-center text-sm flex items-center justify-center transition-all duration-300`}
                onClick={() => setPage("Outwards")}
              >
                Outwards
              </h2>
            
            </div>
          </div>
          {page === "Inwards" && (
            <EmployeeInwardsTable/>
          )}

          {page === "Outwards" && (
            <div>
             <EmployeeOutwardsTable/>
            </div>
          )}

        </div>

      </section>

    </div>
  );
};

export default EmployeeGoodsInOut;