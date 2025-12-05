import React, { useState } from 'react'
import { BsEye } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Table from '../../../components/table/Table'
import Select from "react-select";
import { RiDeleteBinLine } from 'react-icons/ri'
import EscalationSetupModal from '../../../containers/modals/IncidentSetupModal.jsx/IncidentEsclationSetupModal'
const IncidentEscalationSetup = () => {
    const [modal, showModal] = useState(false);
    const [formData, setFormData] = useState({
      meeting: "",
      Attendees: [],
      repeat: false,
      on_behalf: "",
    });
    const column = [
        { name: "Level", selector: (row) => row.Level, sortable: true },
        { name: "Escalate In Days", selector: (row) => row.Escalate, sortable: true },
        { name: "Users", selector: (row) => row.Users, sortable: true },
        {
            name: "action",

            cell: (row) => (
              <div className="flex items-center gap-4">
                <Link to="" onClick={() => showModal(true)}>
                  <BiEdit size={15} />
                </Link>
                {modal && <EscalationSetupModal onclose={() => showModal(false)} />}
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
          Level: "L1",
          Escalate: "3",
          Users: "sameer",
          action: <BsEye />,
        },
    ];
    const options = [
      {
        value: "Akshat",
        label: "Akshat",
        email: "akshat.shrawat@vibecopilot.ai",
      },
      { value: "Kunal", label: "Kunal", email: "kunal.sah@vibecopilot.ai" },
      { value: "Anurag", label: "Anurag", email: "anurag.sharma@vibecopilot.ai" },
    ];
  return (
    <section>
        <div className="w-full flex flex-col overflow-hidden">
            <div className="flex md:flex-row flex-col md: gap-3 mx-5 my-3 ">
                <select
                    name=""
                    id=""
                    className="border p-1 px-4 border-gray-500 rounded-md"
                >
                    <option value="">Select Level</option>
                    <option value="">L1</option> 
                </select>
                <input
                  type="numbar"
                  placeholder="Escalate In Days"
                  className="border-2 p-2 w-70 border-gray-300 rounded-lg"
                />
                <Select
                className=' p-1 px-4  rounded-md z-20'
                options={options}
                isMulti
                value={formData.Attendees}
                onChange={(selectedOption) =>
                  setFormData({ ...formData, Attendees: selectedOption })

                }
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

export default IncidentEscalationSetup