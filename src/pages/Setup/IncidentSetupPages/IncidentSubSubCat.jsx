import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Table from '../../../components/table/Table';
import SubSubCategorySetupModal from '../../../containers/modals/IncidentSetupModal.jsx/IncidentSetupSubSubCatModal';
const SubSubCategorysetup = () => {
    const [modal, showModal] = useState(false);
    const column = [
        { name: "Category", selector: (row) => row.Category, sortable: true },
        { name: "Sub Category", selector: (row) => row.SubCategory, sortable: true },
        { name: "Sub Sub Category", selector: (row) => row.SubSubCategory, sortable: true },
        {
            name: "action",

            cell: (row) => (
              <div className="flex items-center gap-4">
                <Link to="" onClick={() => showModal(true)}>
                  <BiEdit size={15} />
                </Link>
                {modal && <SubSubCategorySetupModal onclose={() => showModal(false)} />}
                <Link to="">
                  <RiDeleteBinLine size={15} />
                </Link>
              </div>
            ),
          },
      ];
      const data = [
        {
          id: 1,
          Category:"Near Miss / Good Catch",
          SubCategory: "Near Miss / Good Catch",
          SubSubCategory:"Unsafe act",
          action: <BsEye />,
        },
      ];
  return (
    <section>
        <div className="w-full flex flex-col overflow-hidden">
            <div className="flex lg:flex-row flex-col md: gap-3 mx-5 my-3 ">
                <select
                    name=""
                    id=""
                    className="border p-1 px-4 border-gray-500 rounded-md"
                >
                    <option value="">Select Category</option>
                    <option value="">Health and Safety</option>
                    <option value="">Fire</option>
                    <option value="">Near Miss/Good Catch</option> 
                </select>
                <select
                    name=""
                    id=""
                    className="border p-1 px-4 border-gray-500 rounded-md"
                >
                    <option value="">Select Sub Category</option>
                </select>
                <input
                  type="text"
                  placeholder="name"
                  className="border-2 p-2 w-70 border-gray-300 rounded-lg"
                />
                <button className='font-semibold border-2 border-black px-4 p-1 flex  items-center rounded-md'>
                    Submit
                </button>
            </div>
            <div className=' mx-5 my-3'>
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

export default SubSubCategorysetup