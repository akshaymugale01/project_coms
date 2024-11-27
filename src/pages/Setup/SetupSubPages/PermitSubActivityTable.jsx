import React, { useState } from "react";
//import Navbar from "../components/Navbar";
import Table from "../../../components/table/Table";
import { ImEye } from "react-icons/im";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { BiTrash } from 'react-icons/bi';
import { BsEye } from "react-icons/bs";
import { PiPlusCircle } from "react-icons/pi";


import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
//import Modal from "../containers/modals/Modal";
const PermitSubActivityTable = () => {
    const themeColor = useSelector((state)=> state.theme.color)
  const column = [
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link >
            <BiTrash size={15} />
          </Link>
          <Link >
            <BiEdit size={15} />
          </Link>
        </div>
      ),
      
    },

    
    { name: "Permit Type", selector: (row) => row.type, sortable: true },
    { name: "Permit Activity", selector: (row) => row.type, sortable: true },
    { name: "Permit Sub Activity", selector: (row) => row.type, sortable: true },
    
  ];
  const data = [
    {
      id: 1,
     
      type: "Loading, Unloading Hazardous Material Work",
      
    },
    {
        id: 2,
       
        type: "Radiology Work",
       
      },
      {
        id: 3,
       
        type: "Hot Work",
       
      },
      {
        id: 4,
       
        type: "Height Work",
        
      },
    
  ];

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: themeColor,
        color: "white",

        fontSize: "14px",
      },
    },
  };
  document.title = `Permit - Vibe Connect`;
  return (
    <section className="flex ">
      {/* <Navbar /> */}
      <div className="w-full flex mx-3 flex-col overflow-hidden">
       
        <div className=" flex m-3 flex-col">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Enter Permit Name"
              className="border-2 p-2 w-96 border-gray-300 rounded-lg"
            />
           <button
                to={"/admin/addnewpermit"}
                className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ height: '1cm' }}
            >
                <PiPlusCircle size={20} />
                Add
            </button>
            <div>
         <label htmlFor="" className="font-semibold">Category</label>
         <select name="" id="" className="border border-gray-400 p-2 rounded-md w-full">
         <option value="">Category1</option>
          <option value="">Category2</option>
         </select>
         </div>
         <div>
         <label htmlFor="" className="font-semibold">Sub Category</label>
         <select name="" id="" className="border border-gray-400 p-2 rounded-md w-full">
         <option value="">Category1</option>
          <option value="">Category2</option>
         </select>
         </div>
          </div>
         
           
          </div>
          <Table
              columns={column}
              data={data}
              // customStyles={customStyle}
              responsive
             
              fixedHeader
              fixedHeaderScrollHeight="500px"
              pagination
              selectableRowsHighlight
              highlightOnHover
              omitColumn={column}
            />
      </div>
      
    </section>
  );
};

export default PermitSubActivityTable;