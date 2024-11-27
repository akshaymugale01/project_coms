import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
//import Navbar from "../../../components/Navbar";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import MaterialsModal from "../../containers/modals/MaterialsModal";
import { IoAddCircleOutline } from "react-icons/io5";
import Navbar from "../../components/Navbar";
import EmployeePasses from "./EmployeePasses";
import Table from "../../components/table/Table";

const EmployeeMaterials = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state)=> state.theme.color)
  const [modal, showModal] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employee/passes/material-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <button  onClick={()=>setIsModalOpen1(true)}>
            <BiEdit size={15} />
          </button>

        </div>
      ),
    },
    {
      name: "Person Name",
      selector: (row) => row.person_name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "No. of Items",
      selector: (row) => row.items,
      sortable: true,
    },

    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
        name: "Vehicle Number",
        selector: (row) => row.v_number,
        sortable: true,
      },
      {
        name: "Created By",
        selector: (row) => row.createby,
        sortable: true,
      },
      {
        name: "Created on",
        selector: (row) => row.createon,
        sortable: true,
      },
      {
        name: "Attachments",
        selector: (row) => row.attachments,
        sortable: true,
      },
  
  ];

 
  const data = [
    {
        id: 1,
        person_name: "Mittu Panda",
      type: "Inward",
      items: "2",
      description: "Demo",
      v_number:"MH1234545",
      createby:"Vibe Connect",
      createon:"10/08/2019, 6:37 PM",
      attachments:""
    },
    {
        id: 2,
        person_name: "Deepak Gupta",
      type: "Inward",
      items: "2",
      description: "Demo",
      v_number:"MH1234545",
      createby:"Vibe Connect",
      createon:"10/08/2019, 6:37 PM",
      attachments:""
    },
    {
        id: 3,
        person_name: "Mahesh Sharma",
        type: "Inward",
        items: "2",
        description: "Demo",
        v_number:"MH1234545",
        createby:"Vibe Connect",
        createon:"10/08/2019, 6:37 PM",
        attachments:""
    },



  ];

  return (
    <section className="flex">
<Navbar/>
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <EmployeePasses/>
        <div className="flex md:flex-row flex-col gap-5 justify-between my-4">
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
         
          <div className="flex justify-end gap-4  ">
          <input type="text"                 className="border w-64  border-black p-2 rounded-md placeholder:text-sm"
          placeholder="Search"        />
            <button

className="border-2 font-semibold hover:bg-black hover:text-white h-10 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
onClick={()=>setIsModalOpen(true)}
            >
              <IoAddCircleOutline size={20} />
              Add
            </button>

         
         
         
        </div>
        </div>
         
        <Table
          responsive
          //   selectableRows
          columns={columns}
          data={data}
        
        />
      </div>
      {/* {modal && <MaterialsModal onclose={()=> showModal(false)} />} */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-md w-1/3">
          <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full mb-4 text-white" style={{ background: themeColor }}>
          Add Materials
        </h2>
        <form>
         <div className="flex gap-4 items-center mb-4">
          <p className="font-bold">Select Type
          </p>
          <div className="flex gap-2">
         
           
            <input
              type="radio"
              name="userType"
              value="occupant"
              className="mt-1"
              // checked={userType === "occupant"}
              // onChange={handleUserTypeChange}
            />
             <label className="text-center font-bold">
             Inward
          </label >
          </div>
          <div className="flex gap-2">
         
            <input
              type="radio"
              name="userType"
              value="guest"
              className="mt-1"
              // checked={userType === "guest"}
              // onChange={handleUserTypeChange}
            />
            <label className="text-center font-bold"> Outward
          </label></div></div>
        </form>
        <div className="grid md:grid-cols-2 gap-5">
        
            {/* {userType === "occupant" && ( */}
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="occupantUser" className="font-semibold">
                Person Name:
                </label>
               
                <input
                  type="text"
                  id="occupantUser"
                  name="occupantUser"
                  className="border p-2 rounded-md border-black"
                />
              </div>
            {/* )} */}

            {/* {userType === "guest" && (
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="guestName" className="font-semibold">
                  Guest Name:
                </label>
                <input
                  type="text"
                  id="guestName"
                  name="guestName"
                  className="border p-2 rounded-md border-black"
                />
              </div>
            )} */}
             <div className="grid gap-2 items-center w-full">
            <label htmlFor="slotNumber" className="font-semibold">
            No. Of Items
            </label>
            <input
              type="text"
              id="slotNumber"
              name="slotNumber"
              placeholder="Enter No. Of Items"
              className="border p-2 rounded-md border-black"
            />
         </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="vehicleCategory" className="font-semibold">
            Vehicle Number
            </label>
            <input
              type="text"
              id="slotNumber"
              name="slotNumber"
              placeholder="Enter Vehicle Number"
              className="border p-2 rounded-md border-black"
            />
          </div>  </div>
          <div className="grid gap-2 items-center mt-4 w-full">
            <label htmlFor="vehicleType" className="font-semibold">
            Description
            </label>
            <textarea
              type="text"
              id="slotNumber"
              name="slotNumber"
             
              className="border p-2 rounded-md border-black"
            />
          </div>
      
            <div className="mt-2 flex justify-center gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
              >
                Close
              </button>
              <button
                // onClick={handleAddDepartment}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
       {isModalOpen1 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-md w-1/3">
          <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full mb-4 text-white" style={{ background: themeColor }}>
          Edit Materials
        </h2>
        <form>
         <div className="flex gap-4 items-center mb-4">
          <p className="font-bold">Select Type
          </p>
          <div className="flex gap-2">
         
           
            <input
              type="radio"
              name="userType"
              value="occupant"
              className="mt-1"
              // checked={userType === "occupant"}
              // onChange={handleUserTypeChange}
            />
             <label className="text-center font-bold">
             Inward
          </label >
          </div>
          <div className="flex gap-2">
         
            <input
              type="radio"
              name="userType"
              value="guest"
              className="mt-1"
              // checked={userType === "guest"}
              // onChange={handleUserTypeChange}
            />
            <label className="text-center font-bold"> Outward
          </label></div></div>
        </form>
        <div className="grid md:grid-cols-2 gap-5">
        
            {/* {userType === "occupant" && ( */}
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="occupantUser" className="font-semibold">
                Person Name:
                </label>
               
                <input
                  type="text"
                  id="occupantUser"
                  name="occupantUser"
                  className="border p-2 rounded-md border-black"
                />
              </div>
            {/* )} */}

            {/* {userType === "guest" && (
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="guestName" className="font-semibold">
                  Guest Name:
                </label>
                <input
                  type="text"
                  id="guestName"
                  name="guestName"
                  className="border p-2 rounded-md border-black"
                />
              </div>
            )} */}
             <div className="grid gap-2 items-center w-full">
            <label htmlFor="slotNumber" className="font-semibold">
            No. Of Items
            </label>
            <input
              type="text"
              id="slotNumber"
              name="slotNumber"
              placeholder="Enter No. Of Items"
              className="border p-2 rounded-md border-black"
            />
         </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="vehicleCategory" className="font-semibold">
            Vehicle Number
            </label>
            <input
              type="text"
              id="slotNumber"
              name="slotNumber"
              placeholder="Enter Vehicle Number"
              className="border p-2 rounded-md border-black"
            />
          </div>  </div>
          <div className="grid gap-2 items-center mt-4 w-full">
            <label htmlFor="vehicleType" className="font-semibold">
            Description
            </label>
            <textarea
              type="text"
              id="slotNumber"
              name="slotNumber"
             
              className="border p-2 rounded-md border-black"
            />
          </div>
      
            <div className="mt-2 flex justify-center gap-2">
              <button
                onClick={() => setIsModalOpen1(false)}
                className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
              >
                Close
              </button>
              <button
                // onClick={handleAddDepartment}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      
    </section>
  );
};

export default EmployeeMaterials