import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Table from "../../../components/table/Table"
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import { BiFilterAlt } from "react-icons/bi";


const EmployeeInwardsTable = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state)=> state.theme.color)
  const [modalVisible, setModalVisible] = useState(false);

  const columns = [
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div className="flex items-center gap-4">
    //       <Link to={`/employee/inwarddetails/${row.id}`}>
    //         <BsEye size={15} />
    //       </Link>
    //     </div>
    //   ),
    // },

    {
        name: "Type",
        selector: (row) => row.Type,
        sortable: true,
      },
      {
        name: "Category",
        selector: (row) => row.Category,
        sortable: true,
      },
      {
        name: "Person Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Profile Image",
        selector: (row) => row.Profile_Image,
        sortable: true,
      },
      {
        name: "Pass No.",
        selector: (row) => row.Pass_No,
        sortable: true,
      },

      {
        name: "Mode of Transport",
        selector: (row) => row.Transport,
        sortable: true,
      },
      {
        name: "LR No.",
        selector: (row) => row.LR_No,
        sortable: true,
      },

      {
        name: "Trip ID",
        selector: (row) => row.trip_id,
        sortable: true,
      },
      {
        name: "Gate Entry",
        selector: (row) => row.Gate_Entry,
        sortable: true,
      },

      {
        name: "Item Details",
        selector: (row) => row.Item_Details,
        sortable: true,
      },
     
  ];

 
  const data = [
    {
        id: 1,
        Type:"SRN",
        Category:"Visitor",
        name:"Yash",
        Profile_Image:"",
        Pass_No:"132424",
        Transport:"By Vehicle",
        LR_No:"456",
        trip_id:"45",
        Gate_Entry:"7-10026",
        Item_Details:"MW - 4 - 3",
       status:"Upcoming"
    },
    {
        id: 2,
        Type:"Faulty",
        Category:"Visitor",
        name:"Yash",
        Profile_Image:"",
        Pass_No:"132424",
        Transport:"By Courier",
        LR_No:"456",
        trip_id:"45",
        Gate_Entry:"7-10026",
        Item_Details:"Transmission - -MW - -",
    },
    {
        id: 3,
        Type:"Fresh",
        Category:"Vendor",
        name:"Yash",
        Profile_Image:"",
        Pass_No:"132424",
        Transport:"By Vehicle",
        LR_No:"456",
        trip_id:"45",
        Gate_Entry:"7-10026",
        Item_Details:"Transmission - -MW - -",
    },



  ];

  return (
    <section className="flex">

      <div className=" w-full flex mx-3 flex-col overflow-hidden">
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


          <button
              className=" font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              onClick={() => {
                setModalVisible(true);
              }}
              style={{ background: themeColor }}
            >
              <BiFilterAlt/>
              Filter
            </button>
            {modalVisible && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={() => {
                  setModalVisible(false);
                }}
              >
                <div
                  className="bg-white p-4 rounded-md w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="text-gray-500 float-right text-2xl leading-none font-semibold"
                    onClick={() => {
                      setModalVisible(false);
                    }}
                  >
                    &times;
                  </button>
                  <div className="flex justify-center items-center my-5 w-full p-2">
                    <form className="border border-gray-300 rounded-lg p-2 w-full mx-4">
                      {/* <h2 style={{ background: themeColor }} className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white" >
                        Add
                      </h2> */}

                      <div className="grid grid-cols-1 gap-5 mt-2">
                        <div className="grid grid-cols-2 gap-5">
                          <div className="flex flex-col">
                            <label htmlFor="building" className="font-semibold">
                              Search by name or id
                            </label>
                           <input type="text"               className="border border-gray-400 p-2 rounded-md"
                           />
                          </div>
                         
                        </div>
                      </div>

                      <div className="flex gap-5 justify-center items-center my-4">
                        <button
                          style={{ background: themeColor }}
                          className="text-white bg-black hover:bg-white hover:text-black border-2 border-black font-semibold py-2 px-4 rounded transition-all duration-300"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
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

export default EmployeeInwardsTable