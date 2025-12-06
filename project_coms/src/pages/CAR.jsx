import React from 'react'
import Navbar from '../components/Navbar'
import { BiEdit, BiFilterAlt } from 'react-icons/bi'
import Table from '../components/table/Table'
import { Link } from 'react-router-dom'
import { BsEye } from 'react-icons/bs'
import { PiPlusCircle } from 'react-icons/pi'

const CAR = () => {
    const column = [
        {
          name: "view",

          cell: (row) => (
            <div className="flex items-center gap-4">
              <Link to={`/admin/car-details/${row.id}`}>
                <BsEye size={15} />
              </Link>
              <Link to="/admin/edit-CAR">
                <BiEdit size={15} />
            </Link>
            </div>
          ),
        },

        { name: "RequestID", selector: (row) => row.RequestID, sortable: true },
        { name: "TicketNumber", selector: (row) => row.TicketNumber, sortable: true },
        { name: "Category", selector: (row) => row.Category, sortable: true },
        {
          name: "Amount",
          selector: (row) => row.Amount,
          sortable: true,
        },
        {
          name: "Requested On",
          selector: (row) => row.RequestedOn,
          sortable: true,
        },
        { name: "Requested By", selector: (row) => row.RequestedBy, sortable: true },
        {
          name: "Master Status",
          selector: (row) => row.MasterStatus,
          sortable: true,
        },
        {
          name: "Current Level",
          selector: (row) => row.CurrentLevel,
          sortable: true,
        },
        {
          name: "Current Status",
          selector: (row) => row.CurrentStatus,
          sortable: true,
        },
        { name: "Last Approver Level", selector: (row) => row.LastApproverLevel, sortable: true },
      ];

      const data = [
        {
          id: 1,
          RequestID: 258,
          TicketNumber: "",
          Category: "Elevator",
          Amount: "1000",
          RequestedOn: "14/12/2020",
          RequestedBy: "Lockated Demo",
          MasterStatus: "Pending",
          CurrentLevel: "",
          CurrentStatus: " ",
          LastApproverLevel: "NA",
          action: <BsEye />,
        },
        {
            id: 2,
            RequestID: 309,
            TicketNumber: "",
            Category: "Air Conditioning",
            Amount: "22222",
            RequestedOn: "27/07/2021",
            RequestedBy: "Lockated Demo",
            MasterStatus: "Cancelled",
            CurrentLevel: "L1",
            CurrentStatus: " Cancelled",
            LastApproverLevel: "NA",
            action: <BsEye />,
        },
        {
            id: 3,
            RequestID: 314,
            TicketNumber: "",
            Category: "Elevator",
            Amount: "1000",
            RequestedOn: "14/12/2020",
            RequestedBy: "Lockated Demo",
            MasterStatus: "Cancelled",
            CurrentLevel: "L1",
            CurrentStatus: "Cancelled ",
            LastApproverLevel: "NA",
            action: <BsEye />,
        },
      ];
  return (
    <section className='flex'>
       <Navbar />
       <div className="w-full flex mx-3 flex-col overflow-hidden">
            <div className="flex  justify-start gap-4 my-5 flex-shrink flex-wrap ">
                <div className="shadow-xl rounded-full border-4 border-yellow-400 w-64  px-6 flex flex-col items-center">
                   <p className="font-semibold md:text-lg">Pending</p>
                   <p className="text-center font-normal md:text-sm ">₹ 2049615</p>
                </div>
                <div className="shadow-xl rounded-full border-4 border-green-400 w-64  px-6 flex flex-col items-center">
                   <p className="font-semibold md:text-lg">Approved</p>
                   <p className="text-center font-normal md:text-sm ">₹ 965611</p>
                </div>
                <div className="shadow-xl rounded-full border-4 border-red-400 w-64  px-6 flex flex-col items-center">
                   <p className="font-semibold md:text-lg">Rejected</p>
                   <p className="text-center font-normal md:text-sm ">₹ 534809</p>
                </div>
                <div className="shadow-xl rounded-full border-4 border-blue-400 w-64  px-6 flex flex-col items-center">
                   <p className="font-semibold md:text-lg">Partially Approved</p>
                   <p className="text-center font-normal md:text-sm ">₹ 0</p>
                </div>
                <div className="shadow-xl rounded-full border-4 border-gray-400 w-64  px-6 flex flex-col items-center">
                   <p className="font-semibold md:text-lg">cancelled</p>
                   <p className="text-center font-normal md:text-sm ">₹ 1732345</p>
                </div> 
            </div>
            <div className="flex sm:flex-row my-2 flex-col gap-2 justify-between">
           <input
              type="text"
              placeholder="search"
              className="border-2 p-2 w-70 border-gray-300 rounded-lg mx-2"
            />
             <Link
            to={"/admin/add-CAR"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </Link>
            </div>
            <div>
                <Table 
                  columns={column}
                  data={data}
                  isPagination={true}
                />
            </div>
        </div>
    </section>
  )
}



export default CAR
