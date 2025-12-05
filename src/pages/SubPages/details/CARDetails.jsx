import React from 'react'
import { Link } from 'react-router-dom'
import Table from '../../../components/table/Table';
const CARDetails = () => {
    const column = [
        { name: "Request Id", selector: (row) => row.RequestID, sortable: true },
        { name: "Amount", selector: (row) => row.Amount, sortable: true },
        { name: "Comments", selector: (row) => row.Comments, sortable: true },
        { name: "Created On", selector: (row) => row.CreatedOn, sortable: true },
        { name: "Created By", selector: (row) => row.CreatedBy, sortable: true },
        { name: "L1", selector: (row) => row.L1, sortable: true },
        { name: "L2", selector: (row) => row.L2, sortable: true },
        { name: "L3", selector: (row) => row.L3, sortable: true },
        { name: "L4", selector: (row) => row.L4, sortable: true },
        { name: "L5", selector: (row) => row.L5, sortable: true },
        { name: "Master Status", selector: (row) => row.MasterStatus, sortable: true },
        { name: "Cancelled By", selector: (row) => row.CancelledBy, sortable: true },
        { name: "Action", selector: (row) => row.Action, sortable: true },
        { name: "Attachments", selector: (row) => row.Attachments, sortable: true },

      ];

      const data = [
        {
          id: 1,
          RequestID: "258",
          Amount: "1000",
          Comments: "Test",
          CreatedOn: "14/12/2020",
          CreatedBy: "Lockated Demo",
          L1: "NA",
          L2: "NA",
          L3: "NA",
          L4: "NA",
          L5: "NA",
          MasterStatus:"Pending",
          CancelledBy:"NA",
          Action:"",
          Attachments:"",
        },
      ];
  return (
    <section>
        <div className="w-full flex flex-col overflow-hidden">
            <div className='flex gap-2 justify-end my-3 mr-5'>
                <Link to={`/admin/car-tag-vendors`} className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md'>
                    Tag Vendors
                </Link>
                <Link to={`/admin/car-feeds`} className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md'>
                    Feeds
                </Link>
                <Link to={`/admin/edit-CAR`} className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md'>
                    Edit
                </Link>
            </div>
            <div className="border-2 flex flex-col my-2 mx-5 p-4 gap-4 rounded-md border-gray-400">
                <h2 className=" text-lg border-black border-b font-semibold ">
                    Ticket Details
                </h2>
                <div className='my-2 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2'>
                    <div className="grid grid-cols-2 items-center">
                        <p>Title:</p>
                        <p className="text-sm font-normal ">Comment attach 201</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Ticket No:</p>
                        <p className="text-sm font-normal ">7-10498</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Created On:</p>
                        <p className="text-sm font-normal ">11/12/2020 7:19 PM</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Category:</p>
                        <p className="text-sm font-normal ">Elevator</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Status:</p>
                        <p className="text-sm font-normal ">Closed</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Subcategory:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Admin Priority:</p>
                        <p className="text-sm font-normal ">P1</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Reference Number:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                </div>
            </div>
            <div className="border-2 flex flex-col my-2 mx-5 p-4 gap-4 rounded-md border-gray-400">
                <h2 className=" text-lg border-black border-b font-semibold">
                    Creator's Info
                </h2>
                <div className='my-2 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2'>
                    <div className="grid grid-cols-2 items-center">
                        <p>Created By:</p>
                        <p className="text-sm font-normal ">Amit Dixittt</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Department:</p>
                        <p className="text-sm font-normal ">Electrical dept</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Site:</p>
                        <p className="text-sm font-normal ">Lockated Site 1</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Unit:</p>
                        <p className="text-sm font-normal ">101</p>
                    </div>
                </div>
            </div>
            <div className="border-2 flex flex-col my-2 mx-5 p-4 gap-4 rounded-md border-gray-400">
                <h2 className=" text-lg border-black border-b font-semibold">
                    Location Info
                </h2>
                <div className='my-2 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2'>
                    <div className="grid grid-cols-2 items-center">
                        <p>Region:</p>
                        <p className="text-sm font-normal ">Mumbai</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Zone:</p>
                        <p className="text-sm font-normal ">West Zone</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>City:</p>
                        <p className="text-sm font-normal ">Mumbai</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>District:</p>
                        <p className="text-sm font-normal ">Mumbai</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>State:</p>
                        <p className="text-sm font-normal ">Maharashtra</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Address:</p>
                        <p className="text-sm font-normal ">2nf Floor, Jyoti Tower</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Building:</p>
                        <p className="text-sm font-normal ">P1</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Floor:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Room:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                </div>
            </div>
            <div className="border-2 flex flex-col my-2 mx-5 p-4 gap-4 rounded-md border-gray-400">
                <h2 className=" text-lg border-black border-b font-semibold">
                    Additional Info
                </h2>
                <div className='my-2 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2'>
                    <div className="grid grid-cols-2 items-center">
                        <p>Assigned To:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>External Priority:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Proactive/Reactive:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Review (Tracking):</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Service Type:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Corrective Action:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Complaint Mode:</p>
                        <p className="text-sm font-normal ">P1</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Preventive Action:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Responsible Person:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Impact:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Correction:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Root Cause:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Asset/Service:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Task ID:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Asset/Service Location:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Notes:</p>
                        <p className="text-sm font-normal "></p>
                    </div>
                </div>
            </div>
            <div className="border-2 flex flex-col my-2 mx-5 p-4 gap-4 rounded-md border-gray-400">
                <h2 className=" text-lg border-black border-b font-semibold">
                    Attachment
                </h2>
                <p> Attachment</p>
                <p>No Attachment</p>
            </div>
            <div className="border-2 flex flex-col my-2 mb-10 mx-5 p-4 gap-4 rounded-md border-gray-400">
                <h2 className=" text-lg border-black border-b font-semibold">
                    Cost Approval Requests
                </h2>
                <div>
                    <Table
                      columns={column}
                      data={data}
                      isPagination={true}
                    />
                </div>
            </div>

        </div>
    </section>
  )
}

export default CARDetails