import React from 'react'
import { MdOutlineEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'

function InsightsDetails() {
  return (
    <section>
      <div className="p-4 w-full my-2 flex  overflow-hidden flex-col">
        <div className="md:flex items-center sm:flex-row  flex-col gap-2 justify-between">
          <h2 className="text-xl font-semibold mx-5 ">
            DESIGN INSIGHT DETIALS (#371)
          </h2>
          <div className='flex gap-2 mr-5'>
            <button className=' font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md'>
              <Link to="/admin/edit-design-insight/:id">
                <MdOutlineEdit size={15} />
              </Link>
            </button>
            <button className=' font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md'><RiDeleteBin6Line /></button>
          </div>
        </div>
        <div className='border-2 flex flex-col my-5 mx-3 p-4 gap-4 rounded-md border-gray-400'>
          <h2 className="text-xl font-semibold mx-5 ">
            DESIGN DETAILS
          </h2>
          <div className="my-5 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2">
            <div className="grid grid-cols-2 items-center">
              <p>Category</p>
              <p className="text-sm font-normal ">: b</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p>Sub Category</p>
              <p className="text-sm font-normal ">: c</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p>Zone</p>
              <p className="text-sm font-normal ">: </p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p>Site</p>
              <p className="text-sm font-normal ">: Panchshil Test</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p>location</p>
              <p className="text-sm font-normal ">: mumbai</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p>Categorization</p>
              <p className="text-sm font-normal ">: Safety</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p>Must Have</p>
              <p className="text-sm font-normal ">: No</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p>Observation</p>
              <p className="text-sm font-normal ">: abc</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p>Recommendation</p>
              <p className="text-sm font-normal ">: cde</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p>Categorization :</p>
              <p className="text-sm font-normal "> Tag</p>
            </div>
          </div>
        </div>
        <div className="border-2 flex flex-col my-5 mx-3 p-4 gap-4 rounded-md border-gray-400">
          <h2 className="text-xl font-semibold mx-5 ">
            ATTACHMENTS
          </h2>
          <p className="text-sm font-normal ml-5">No ATTACHMENTS</p>
        </div>
      </div>
    </section>
  )
}

export default InsightsDetails