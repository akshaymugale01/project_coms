import React, { useState } from 'react'
import Navbar from "../../components/Navbar";
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import Table from '../../components/table/Table';
import Switch from '../../Buttons/Switch';
import CheckListAddGroupModal from '../../containers/modals/ChecklistAddGroupModal';
import AddSubGroupCheckListSetupModal from '../../containers/modals/export default AddSubGroupCheckListSetupModal';
function CheckListGroupSetup() {
  const [addGroup, showAddGroup] = useState(false);
  const [addSubGroup, showSubAddGroup] = useState(false);
  const [addMeter, showAddMeter] = useState(false);
  const columnGroup = [
    { name: "Sr.No", selector: (row) => row.srNo, sortable: true },
    { name: "Group Name", selector: (row) => row.groupName, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
  ];

  const dataGroup = [
    {
      id: 1,
      srNo: "1",
      groupName: "Cleaning",
      status: <Switch/>,
    },
    {
      id: 2,
      srNo: "2",
      groupName: "Hygiene",
      status: <Switch/>,
    },
    {
      id: 3,
      srNo: "3",
      groupName: "Painting",
      status: <Switch/>,
    },
  ];

  const columnSubGroup = [
    { name: "Sr.No", selector: (row) => row.srNo, sortable: true },
    { name: "Group Name", selector: (row) => row.groupName, sortable: true },
    { name: "Sub Group Name", selector: (row) => row.subGroupName, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
  ];

  const dataSubGroup = [
    {
      id: 1,
      srNo: "1",
      groupName: "Cleaning",
      subGroupName: "Mopping",
      status: <Switch/>,
    },
    {
      id: 1,
      srNo: "2",
      groupName: "Hygiene",
      subGroupName: "Sanitising Floors",
      status: <Switch/>,
    },
    {
      id: 1,
      srNo: "3",
      groupName: "Painting",
      subGroupName: "Grills",
      status: <Switch/>,
    },
  ];

  return (
    <section className='flex'>
      <Navbar/>
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <h2 className="text-lg font-semibold my-5 ">
          Group CheckList
        </h2>
        <div className="flex flex-col sm:flex-row md:justify-between  gap-3 ">
          <input
            type="text"
            placeholder="search"
            className="border-2 p-2 w-70 border-gray-300 rounded-lg"
          />
          <div className='flex gap-3 sm:flex-row flex-col'>
            <Link to="" className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md" onClick={() => showAddGroup(true)}>
              <IoMdAdd /> Add Group
            </Link>
            <Link to="" className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md" onClick={() => showSubAddGroup(true)}>
              <IoMdAdd /> Add Sub Group
            </Link>
            <Link to="" className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md" onClick={() => showAddMeter(true)}>
              <IoMdAdd /> Bulk Update
            </Link>
          </div>
        </div>
        <div className='my-2 '>
          <h2 className="text-lg font-semibold my-5 ">
            Group 
          </h2>
          <Table
            columns={columnGroup}
            data={dataGroup}
            isPagination={true}
          />
        </div>
        <div className='my-2 '>
          <h2 className="text-lg font-semibold my-5 ">
            Sub Groups
          </h2>
          <Table
            columns={columnSubGroup}
            data={dataSubGroup}
            isPagination={true}
          />
        </div>
        {addGroup && <CheckListAddGroupModal onclose={() => showAddGroup(false)} />}
        {addSubGroup && <AddSubGroupCheckListSetupModal onclose={() => showSubAddGroup(false)} />}
      </div>
    </section>
  )
}

export default CheckListGroupSetup