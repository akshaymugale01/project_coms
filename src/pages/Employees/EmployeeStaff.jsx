import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";

import Table from "../../components/table/Table";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";
import Navbar from "../../components/Navbar";
import EmployeePasses from "./EmployeePasses";
import { BiEdit } from "react-icons/bi";

const EmployeeStaff = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employee/passes/staff-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/employee/passes/staff-edit/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },

    // {
    //     name: "Edit",
    //     selector: (row) => row.edit,
    //     sortable: true,
    //   },
      {
        name: "ID",
        selector: (row) => row.Id,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Unit",
        selector: (row) => row.unit,
        sortable: true,
      },
      {
        name: "Department",
        selector: (row) => row.department,
        sortable: true,
      },

      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: "Mobile",
        selector: (row) => row.mobile,
        sortable: true,
      },

      {
        name: "Staff Id",
        selector: (row) => row.Staff_Id,
        sortable: true,
      },
      {
        name: "Work Type",
        selector: (row) => row.work_type,
        sortable: true,
      },

      {
        name: "Vendor name",
        selector: (row) => row.v_name,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
      },

   
  ];


  const data = [
    {
        id: 1,
      
       Id:"36955",
       name:"Deepak Kumar",
       unit:"101",
       department:"Security",
       email:"deepak@gmail.com",
       mobile:"9011376751",
       Staff_Id:"1234",
       work_type:"Driver	",
       v_name:"Devesh",
       status:"Approved"
    },
    {
        id: 2,
        Id:"36955",
        name:"Raj Patil",
        unit:"101",
        department:"Operational",
        email:"raj@gmail.com",
        mobile:"9011376751",
        Staff_Id:"1234",
        work_type:"Driver	",
        v_name:"Devesh",
        status:"Approved"
    },
    {
        id: 3,

        Id:"36955",
        name:"Akshay J",
        unit:"101",
        department:"Electrical dept",
        email:"akshayk@gmail.com",
        mobile:"9011376751",
        Staff_Id:"1234",
        work_type:"Driver	",
        v_name:"Devesh",
        status:"Rejected"
    },



  ];

  return (
    <section className="flex">
      <Navbar/>
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <EmployeePasses/>
        <div className="flex md:flex-row flex-col gap-5 justify-between mt-10 my-2">
          <div className="sm:flex grid grid-cols-2 items-center justify-center  gap-4 border border-gray-300 rounded-md px-3 p-2 w-auto">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="all"
                name="status"
                checked={selectedStatus === "all"}
                onChange={() => handleStatusChange("all")}
              />
              <label htmlFor="all" className="text-sm">
                All
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="upcoming"
                name="status"
                // checked={selectedStatus === "open"}
                checked={
                  selectedStatus === "upcoming" ||
                  selectedStatus === "upcoming"
                }
                // onChange={() => handleStatusChange("open")}
              />
              <label htmlFor="open" className="text-sm">
                upcoming
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="completed"
                name="status"
                checked={selectedStatus === "completed"}
                onChange={() => handleStatusChange("completed")}
              />
              <label htmlFor="completed" className="text-sm">
                Completed
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="cancelled"
                name="status"
                checked={selectedStatus === "cancelled"}
                //   onChange={() => handleStatusChange("cancelled")}
              />
              <label htmlFor="completed" className="text-sm">
                Cancelled
              </label>
            </div>
          </div>
          <span className="flex gap-4">
          <input type="text"                 className="border border-black p-2 rounded-md placeholder:text-sm"
          placeholder="Search"        />
            <Link
                to={"/employee/addstaff"}
                className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ height: '1cm' }}
            >
                <PiPlusCircle size={20} />
                Add
            </Link>
           
        </span>
        </div>
        <Table
          responsive
          //   selectableRows
          columns={columns}
          data={data}
        
        />
      </div>
    </section>
  );
};

export default EmployeeStaff