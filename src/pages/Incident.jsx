import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io'
import Table from '../components/table/Table'
import { BsEye } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'

const Incidents = () => {
    const column = [
        {
          name: "view",

          cell: (row) => (
            <div className="flex items-center gap-4">
              <Link to={`/admin/incidents-details/${row.id}`}>
                <BsEye size={15} />
              </Link>
              <Link to={`/admin/edit-incidents`}>
                <BiEdit size={15} />
            </Link>
            </div>
          ),
        },

        { name: "ID", selector: (row) => row.ID, sortable: true },
        { name: "Description", selector: (row) => row.Description, sortable: true },
        { name: "Site", selector: (row) => row.Site, sortable: true },
        { name: "Region",selector: (row) => row.Region,sortable: true,},
        { name: "Tower",selector: (row) => row.Tower,sortable: true,},
        { name: "Incident Time", selector: (row) => row.IncidentTime, sortable: true },
        { name: "Level",selector: (row) => row.Level,sortable: true,},
        { name: "Category",selector: (row) => row.Category,sortable: true,},
        { name: "Sub Category",selector: (row) => row.SubCategory,sortable: true,},
        { name: "Support Required", selector: (row) => row.SupportRequired, sortable: true },
        { name: "Assigned To", selector: (row) => row.AssignedTo, sortable: true },
        { name: "Support Required", selector: (row) => row.SupportRequired, sortable: true },
        { name: "CurrentStatus", selector: (row) => row.CurrentStatus, sortable: true },
      ];

      const data = [
        {
          id: 1,
          ID: 1079,
          Description: "Accident near Main Gate",
          Site: "Time square",
          Region: "",
          IncidentTime: "18/03/2024 3:12 PM",
          Level: "L1",
          Category: "Health and Safety",
          SubCategory: "Injury / Illness",
          SupportRequired: "Yes ",
          AssignedTo: "",
          CurrentStatus: "Pending",
          action: <BsEye />,
        },
      ];
  return (
    <section className='flex'>
        <Navbar/>
        <div className="w-full flex mx-3 flex-col overflow-hidden">
            <h2 className="text-lg font-semibold my-5 ">
                INCIDENTS LIST
            </h2>
            <div className="flex flex-col sm:flex-row md:justify-between  gap-3 ">
                <input
                  type="text"
                  placeholder="search"
                  className="border-2 p-2 w-70 border-gray-300 rounded-lg"
                />
                <Link to="/admin/add-incidents" className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md">
                    <IoMdAdd /> Add
                </Link>
            </div>
            <div className='my-5 mx-3'>
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

export default Incidents