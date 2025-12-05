import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { IoMdAdd } from 'react-icons/io'
import Table from '../../components/table/Table'
import { BiEdit } from 'react-icons/bi'
import { Switch } from '../../Buttons'
import EditEmailRuleSetupModal from '../../containers/modals/EditEmailRuleSetupModal'
import AddEmailRuleSetupModal from '../../containers/modals/AddEmailRuleSetupModal'

function EmailRuleSetup() {
  const [editEmailRuleModal, showEditEmailRuleModal] = useState(false);
  const [addEmailRuleModal, showAddEmailRuleModal] = useState(false);
  const column = [
    {
      name: "Actions",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button to="" onClick={() => showEditEmailRuleModal(true)}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
    { name: "Sr.No", selector: (row) => row.srNo, sortable: true },
    { name: "Rule Name", selector: (row) => row.ruleName, sortable: true },
    { name: "Trigger Type", selector: (row) => row.triggerType, sortable: true },
    { name: "Trigger To", selector: (row) => row.triggerTo, sortable: true },
    { name: "Role", selector: (row) => row.role, sortable: true },
    { name: "Period Value", selector: (row) => row.periodValue, sortable: true },
    { name: "Period Type", selector: (row) => row.periodType, sortable: true },
    { name: "Create On", selector: (row) => row.createOn, sortable: true },
    { name: "Create By", selector: (row) => row.createBy, sortable: true },
    { name: "Active", selector: (row) =>(
      <div><Switch/></div>
    ) },
];

const data = [
    {
      id: 1,
      srNo: "	1",
      ruleName: "80	test rule",
      triggerType: "PPM",
      triggerTo: "	Supplier",
      role: "",
      periodValue: "11",
      periodType: "days",
      createOn: "08/06/2021, 3:25 PM",
      createBy: "Lockated Demo",
      active: <Switch/>
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
            <button to="" className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md" onClick={() => showAddEmailRuleModal(true)}>
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
      </div>
      {editEmailRuleModal && <EditEmailRuleSetupModal onclose={() => showEditEmailRuleModal(false)} />}
      {addEmailRuleModal && <AddEmailRuleSetupModal onclose={() => showAddEmailRuleModal(false)} />}
    </section>
  )
}

export default EmailRuleSetup