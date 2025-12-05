import React, { useState } from 'react'
import Navbar from "../../components/Navbar";
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import Table from '../../components/table/Table';
import Switch from '../../Buttons/Switch';
import { BiEdit } from 'react-icons/bi';
import MeterTypeSetupModal from '../../containers/modals/MeterTypeSetupModal';
import AddMeterTypeSetupModal from '../../containers/modals/AddMeterTypeSetupModal';
function MeterTypeSetup() {
  const [meter, showMeter] = useState(false);
  const [addMeter, showAddMeter] = useState(false);
  const column = [
    { name: "Meter Category", selector: (row) => row.meterCategory, sortable: true },
    { name: "Unitname", selector: (row) => row.unitName, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Edit",selector: (row) => row.edit,sortable: true,},
  ];

  const data = [
    {
      id: 1,
      meterCategory: "Electrical",
      unitName: "Accident near Main Gate",
      status: <Switch/>,
      edit: <Link to="" onClick={() => showMeter(true)}>
              <BiEdit size={15} />
            </Link>
    },
    {
      id: 2,
      meterCategory: "Fuel",
      unitName: "	Liters",
      status: <Switch/>,
      edit: <Link to="" onClick={() => showMeter(true)}>
             <BiEdit size={15} />
            </Link>
    },
    {
      id: 3,
      meterCategory: "Water meter",
      unitName: "	kl, 2, 3",
      status: <Switch/>,
      edit: <Link to="" onClick={() => showMeter(true)}>
               <BiEdit size={15} />
            </Link>
    },
    {
      id: 4,
      meterCategory: "Electrical",
      unitName: "	124",
      status: <Switch/>,
      edit: <Link to="" onClick={() => showMeter(true)}>
              <BiEdit size={15} />
           </Link>
    },
  ];

  return (
    <section className='flex'>
      <Navbar/>
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <h2 className="text-lg font-semibold my-5 ">
          Meter Types
        </h2>
        <div className="flex flex-col sm:flex-row md:justify-between  gap-3 ">
          <input
            type="text"
            placeholder="search"
            className="border-2 p-2 w-70 border-gray-300 rounded-lg"
          />
          <Link to="" className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md" onClick={() => showAddMeter(true)}>
            <IoMdAdd /> Add
          </Link>
        </div>
        <div className='my-5 '>
          <Table
            columns={column}
            data={data}
            isPagination={true}
          />
        </div>
        {meter && <MeterTypeSetupModal onclose={() => showMeter(false)} />}
        {addMeter && <AddMeterTypeSetupModal onclose={() => showAddMeter(false)} />}
      </div>
    </section>
  )
}

export default MeterTypeSetup