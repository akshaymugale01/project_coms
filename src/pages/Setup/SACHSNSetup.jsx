import React from 'react'
import Navbar from '../../components/Navbar';
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';
import Table from '../../components/table/Table';
function SACHSNSetup() {
    const column = [
        {
          name: "Actions",

          cell: (row) => (
            <div className="flex items-center gap-4">
              <Link to={`/admin/sac-hsn-setup-details/${row.id}`}>
                <BsEye size={15} />
              </Link>
            </div>
          ),
        },
        { name: "Type", selector: (row) => row.type, sortable: true },
        { name: "Category", selector: (row) => row.category, sortable: true },
        { name: "SAC/HSN Code", selector: (row) => row.sacHsnCode, sortable: true },
        { name: "CGST Rate", selector: (row) => row.cgstRate, sortable: true },
        { name: "SGST Rate", selector: (row) => row.sgstRate, sortable: true },
        { name: "IGST Rate", selector: (row) => row.igstRate, sortable: true },
        { name: "Created By", selector: (row) => row.createdBy, sortable: true },
        { name: "Created On", selector: (row) => row.createdOn, sortable: true },
        { name: "Updated On", selector: (row) => row.updatedOn, sortable: true },
    ];

    const data = [
        {
          id: 1,
          type: "Services",
          category:"Serv1.1",
          sacHsnCode: "	wertg",
          cgstRate: "9.0%",
          sgstRate: "9.0%",
          igstRate: "18.0%",
          createdBy: "Lockated Demo",
          createdOn: "22/09/2020",
          updatedOn: "22/09/2020",
        },
    ];
  return (
    <section className='flex'>
        <Navbar/>
        <div className='w-full flex mx-3 flex-col overflow-hidden'>
            <div className="flex flex-col sm:flex-row md:justify-between gap-3 my-3">
                <input
                  type="text"
                  placeholder="search"
                  className="border-2 p-2 w-70 border-gray-300 rounded-lg"
                />
                <div className='flex gap-3 sm:flex-row flex-col'>
                    <Link to={`/admin/add-sac-hsn-setup`} className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md'>
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

export default SACHSNSetup