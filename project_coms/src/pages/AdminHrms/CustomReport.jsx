import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
// import AdminHRMS from "../../AdminHRMS";
import { BiEdit } from "react-icons/bi";
import ReportDetailsList from "./ReportDetailsList";
// import LeaveSetting from "./LeaveSetting";
// import ReportDetailsList from "./ReportDetailsList";
import { GrHelpBook } from "react-icons/gr";


const CustomReport = () => {
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const columns = [
   
    {
      name: "Name",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Created On",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "Last Modified",
      selector: (row) => row.City,
      sortable: true,
    },
  
   
  ];

  const data = [
    {
      Label: "3/3/2022",
      Location: "Report",
      City: "2/2/2023",
      State: "Maharashtra",

      Country:"India",

    },

  ];

useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <section className="flex gap-3 ml-20">
     {/* <ReportDetailsList/> */}
     <ReportDetailsList/>
      <div className=" w-full flex m-3 flex-col overflow-hidden">
     
        <div className=" flex justify-end my-5">
        <Link
            to={"/admin/reports/add-custom-report"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add Custom Report
          </Link>
        </div>
        <p className="mb-2 font-bold">Custom Reports</p>
        <Table columns={columns} data={data} isPagination={true} />
       

      </div>
      <div className='my-4 mx-2 w-fit'>
        <div className="flex flex-col  shadow-custom-all-sides bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
        <div className="flex  gap-4 font-medium">
        <GrHelpBook size={20} />
          <h2>Help Center</h2></div>
    <div className=' '>
              {/* <p className="font-medium">Help Center</p> */}
              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    Allows administrators to generate customizable reports based on specific employee data criteria.    </li>
                  </ul>
                </li>
               
              </ul>
            </div></div></div>
    </section>
  );
};

export default CustomReport;