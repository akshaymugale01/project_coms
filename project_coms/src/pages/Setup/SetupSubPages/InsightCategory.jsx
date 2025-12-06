import React from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'
import Table from '../../../components/table/Table';

function InsightCategory() {
  const column = [
    { name: "Name", selector: (row) => row.Name, sortable: true },
  ];

  const data = [
    {
      id: 1,
      Name: "",
    },
  ];
  return (
    <section>
      <div className="flex sm:flex-row flex-col justify-around items-center">
        <div className="grid md:grid-cols-4 item-start gap-x-4 my-4 w-full">
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold my-1">
              Category
            </label>
            <input
              type="text"
              placeholder=""
              className="border p-1 px-4 border-gray-500 rounded-md"
            />
          </div> 
        </div>
      </div>
      <div className='flex'>
        <Link to="" className="font-semibold  border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md">
          <IoMdAdd /> Add
        </Link>
      </div>
      <div className='my-5'>
        <Table
          columns={column}
          data={data}
          isPagination={true}
        />
      </div>
    </section>
  )
}

export default InsightCategory