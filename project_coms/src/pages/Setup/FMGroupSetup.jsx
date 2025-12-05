import React, { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'
import Table from '../../components/table/Table';
import { BiEdit } from 'react-icons/bi';
import Navbar from '../../components/Navbar';
import { BsEye } from 'react-icons/bs';
import { Switch } from '../../Buttons';
import image from "/profile.png";
import AddFmGroupSetupModal from '../../containers/modals/AddFMGroupModal';
import EditFmGroupSetupModal from '../../containers/modals/EditFMGroupModal';

function FmGroupsSetup() {
  const [addFmGroupModal, showAddFmGroupModal] = useState(false);
  const [editFmGroupModal, showEditFmGroupModal] = useState(false);
    const column = [
        {
          name: "Actions",

          cell: (row) => (
            <div className="flex items-center gap-4">
              <Link to={`/admin/fm-groups-setup-details/${row.id}`}>
                <BsEye size={15} />
              </Link>
              <button  onClick={() => showEditFmGroupModal(true)}>
                <BiEdit size={15} />
              </button>
            </div>
          ),
        },
        { name: "Id", selector: (row) => row.Id, sortable: true },
        { name: "Profile", selector: (row) =>(<div>
          <img
            src={image}
            className="border-4 border-gray-300 rounded-full w-8 h-8 object-cover"
            />
        </div>
        ) 
      },
        { name: "Group Name", selector: (row) => row.groupName, sortable: true },
        { name: "Members", selector: (row) => row.members, sortable: true },
        { name: "Status", selector: (row) =>(
          <div><Switch/></div>
        ) },
    ];

    const data = [
        {
          id: 1,
          Id: "1",
          profile:"",
          groupName: "Electrical Technicians",
          members: "2",
          status: "",
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
                    <button className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md" onClick={() => showAddFmGroupModal(true)}>
                      <IoMdAdd /> Add 
                    </button>
                </div>
            </div>
            <div className='my-3'>
                <Table 
                  columns={column}
                  data={data}
                  isPagination={true}
                />
            </div>
            {addFmGroupModal && <AddFmGroupSetupModal onclose={() => showAddFmGroupModal(false)} />}
            {editFmGroupModal && <EditFmGroupSetupModal onclose={() => showEditFmGroupModal(false)} />}
        </div>
    </section>
  )
}

export default FmGroupsSetup