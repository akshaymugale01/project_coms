import React from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'
import Table from '../../../components/table/Table'

const InsightSubCategory = () => {
  const column = [
    { name: "category", selector: (row) => row.category, sortable: true },
    { name: "subCategory", selector: (row) => row.subCategory, sortable: true },
  ];

  const data = [
    {
      id: 1,
      category: "b",
      subCategory: "c",
    },
  ];
  return (
    <section>
      <div className="flex sm:flex-row flex-col justify-around items-center">
        <div className='grid md:grid-cols-4 item-start gap-x-4 my-4 w-full'>
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold my-1">
              Category
            </label>
            <select
              name=""
              id=""
              className="border p-1 px-4 border-gray-500 rounded-md"
            >
              <option value=""> Selcet  Category</option>
              <option value=""></option>            
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold my-1">
              Sub Category Name
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

export default InsightSubCategory