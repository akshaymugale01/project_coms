import React from 'react'
import Navbar from '../../components/Navbar';
import { IoMdAdd } from 'react-icons/io';
import Table from '../../components/table/Table';
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom';
function MasterCheckListSetup() {
  const column = [
    {
      name: "Actions",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={``} >
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    { name: "Id", selector: (row) => row.Id, sortable: true },
    { name: "Activity Name", selector: (row) => row.activityName, sortable: true },
    { name: "Meter Category", selector: (row) => row.meterCategory, sortable: true },
    { name: "Number Of Questions", selector: (row) => row.numberOfQuestions, sortable: true },
    { name: "Scheduled For", selector: (row) => row.scheduledFor, sortable: true },
];
const data = [
    {
      id: 1,
      Id: "544",
      activityName: "asdfgn",
      meterCategory: "",
      numberOfQuestions: "1",
      scheduledFor: "Asset",
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
            <Link to={`/admin/add-master-checklist-setup`} className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md" >
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

export default MasterCheckListSetup