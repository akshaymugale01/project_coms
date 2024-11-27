import React from 'react'
import Navbar from '../../../components/Navbar';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { BiEdit } from 'react-icons/bi';
import Table from '../../../components/table/Table';
function InvoiceApprovalSetup() {
    const column = [
        {
          name: "Actions",

          cell: (row) => (
            <div className="flex items-center gap-4">
              <Link to={`/admin/edit-invoice-approval-setup/${row.id}`}>
                <BiEdit size={15} />
              </Link>
            </div>
          ),
        },
        { name: "Id", selector: (row) => row.Id, sortable: true },
        { name: "Function", selector: (row) => row.function, sortable: true },
        { name: "Created On", selector: (row) => row.createdOn, sortable: true },
        { name: "Created By", selector: (row) => row.createdBy, sortable: true },
    ];

    const data = [
        {
          id: 1,
          Id: "	1",
          function: "Purchase Order",
          createdOn: "24/12/2021",
          createdBy: "Navin Lead Admin",
        },
    ];
  return (
    <section className='flex'>
        <Navbar/>
        <div className="w-full flex mx-3 flex-col overflow-hidden">
            <div className="flex flex-col sm:flex-row md:justify-between gap-3 my-3">
                <input
                  type="text"
                  placeholder="search"
                  className="border-2 p-2 w-70 border-gray-300 rounded-lg"
                />
                <div className='flex gap-3 sm:flex-row flex-col'>
                    <Link to={`/admin/add-invoice-approval-setup`} className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md" >
                      <IoMdAdd /> Add 
                    </Link>
                </div>
            </div>
            <div className='my-3'>
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

export default InvoiceApprovalSetup