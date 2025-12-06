import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { BiEdit, BiFilterAlt } from 'react-icons/bi';
import Table from '../../components/table/Table';
import { Switch } from '../../Buttons';
function FmUserSetup() {
  const [filter, setFilter] = useState(false);
    const column = [
        {
          name: "Actions",

          cell: (row) => (
            <div className="flex items-center gap-4">
              <Link to={`/admin/fm-user-details/${row.id}`}>
                <BiEdit size={15} />
              </Link>
            </div>
          ),
        },

        { name: "Active", selector: (row) => row.active, sortable: true },
        { name: "Id", selector: (row) => row.Id, sortable: true },
        { name: "User Name", selector: (row) => row.userName, sortable: true },
        { name: "Gender", selector: (row) => row.gender, sortable: true },
        { name: "Mobile Number", selector: (row) => row.mobileNumber, sortable: true },
        { name: "Email", selector: (row) => row.email, sortable: true },
        { name: "Unit", selector: (row) => row.unit, sortable: true },
        { name: "Role", selector: (row) => row.role, sortable: true },
        { name: "Cluster", selector: (row) => row.cluster, sortable: true },
        { name: "Employee ID", selector: (row) => row.employeeID, sortable: true },
        { name: "Access Level", selector: (row) => row.accessLevel, sortable: true },
        { name: "Type", selector: (row) => row.type, sortable: true },
        { name: "Status", selector: (row) => row.status, sortable: true },
        { name: "Face Recognition", selector: (row) => row.faceRecognition, sortable: true },
        { name: "App Downloded", selector: (row) => row.appDownloded, sortable: true },
    ];

    const data = [
        {
          id: 1,
          active: <Switch/>,
          Id: "	99991",
          userName: "Vivek singhROR",
          gender: "	Male",
          mobileNumber: "9988009988",
          email: "venderportal5@gmail.com",
          unit: "TCS B Unit",
          role: "QA",
          cluster: " ",
          employeeID: "",
          accessLevel: "Site",
          type: "Admin",
          status: "Approved",
          faceRecognition: "No",
          appDownloded: "Yes",

        },
    ];
  return (
    <section className='flex'>
        <Navbar/>
        <div className="w-full flex mx-3 flex-col overflow-hidden">
            <h2 className="text-lg font-semibold my-5 ">
                Fm User
            </h2>
            <div className="flex flex-col sm:flex-row md:justify-between  gap-3 ">
                <input
                  type="text"
                  placeholder="search"
                  className="border-2 p-2 w-70 border-gray-300 rounded-lg"
                />
                <div className='flex gap-3 sm:flex-row flex-col'>
                    <Link to={`/admin/add-fm-user`} className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md" >
                       Add Fm User
                    </Link>
                    <Link to="" className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md" >
                       Import
                    </Link>
                    <Link to="" className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md" onClick={() => setFilter(!filter)}>
                      <BiFilterAlt />Filter
                    </Link>
                </div>
            </div>
            {filter && (
              <div className='className="flex  items-center justify-center gap-2  my-3'>
                <h2 className="text-lg border-black font-semibold text-start">
                  Filter
                </h2>
                <div className="flex justify-start md:flex-row flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Enter Name"
                        className="border-2 p-2 w-70 border-gray-300 rounded-lg my-2 "
                      />
                      <input
                        type="text"
                        placeholder="Enter Email"
                        className="border-2 p-2 w-70 border-gray-300 rounded-lg my-2 "
                      />
                      <button className="bg-green-400 p-1 px-5 py-2 text-white rounded-md my-2">
                        Apply
                      </button>
                      <button className="bg-red-400 p-1 px-5 py-2 text-white rounded-md my-2">
                        Reset
                      </button>
                    </div>
                 </div>
                )}
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

export default FmUserSetup