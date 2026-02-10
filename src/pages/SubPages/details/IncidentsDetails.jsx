import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaCheckCircle } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io'
import { LuDownload } from 'react-icons/lu'
import { Link,useParams } from 'react-router-dom'
import Navbar from '../../../components/Navbar'
import IncidentUpdateModal from '../../../containers/modals/IncidentUpdateModal'
import IncidentInjuryModal from '../../../containers/modals/IncidentInjuryModal'


const IncidentsDetails = () => {
    const [modal, showModal] = useState(false);
    const [injurymodal, showInjurymodal] = useState(false);
      const { id } = useParams();
  return (
    <section className='flex'>
        <Navbar/>
        <div className="w-full flex mx-3 flex-col overflow-hidden">
            <div className='flex gap-2 justify-end my-3  md:flex-row flex-col'>
                <Link to={`/admin/edit-incidents/${id}`} className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md'>
                    <BiEdit/>Edit Details
                </Link>
                <Link to="" className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md' onClick={() => showModal(true)}>
                    <FaCheckCircle />Update Status
                </Link>
                {modal && <IncidentUpdateModal onclose={() => showModal(false)} />}
                <Link to="" className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md' onClick={() => showInjurymodal(true)} > 
                    <IoMdAdd />Add Injury
                </Link>
                {injurymodal && <IncidentInjuryModal onclose={() => showInjurymodal(false)} />}
                <Link to="" className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md'>
                    <LuDownload />Download Report
                </Link>
            </div>
            <div className="border-2 flex flex-col my-2  p-4 gap-4 rounded-md border-gray-400">
                <h2 className=" text-lg border-black border-b font-semibold ">
                    BASIC DETAILS
                </h2>
                <div className='my-2 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2'>
                    <div className="grid grid-cols-2 items-center">
                        <p>Status:</p>
                        <p className="text-sm font-normal ">Pending</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Incident Date and Time:</p>
                        <p className="text-sm font-normal ">18/03/2024 3:12 PM</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Revision Date and Time:</p>
                        <p className="text-sm font-normal ">18/03/2024 3:13 PM</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Reporting Date and Time:</p>
                        <p className="text-sm font-normal ">18/03/2024 3:13 PM</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Reported By:</p>
                        <p className="text-sm font-normal ">Rajnish Patil</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Level:</p>
                        <p className="text-sm font-normal ">L1</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Incident Primary Category:</p>
                        <p className="text-sm font-normal ">Health and Safety</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Category for the Health and Safety Incident:</p>
                        <p className="text-sm font-normal ">Injury / Illness</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Category for the Injury / Illness Incident:</p>
                        <p className="text-sm font-normal ">Medical Treatment – Injury</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Support Required:</p>
                        <p className="text-sm font-normal ">Yes</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>First Aid provided by Employees?:</p>
                        <p className="text-sm font-normal ">No</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Sent for Medical Treatment:</p>
                        <p className="text-sm font-normal ">No</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Has Any Property Damage Happend In The Incident:</p>
                        <p className="text-sm font-normal "> No</p>
                    </div>
                </div>
            </div>
            <div className="border-2 flex flex-col my-2  p-4 gap-4 rounded-md border-gray-400">
                <h2 className=" text-lg border-black border-b font-semibold ">
                    DESCRIPTION DETAILS
                </h2>
                <div className='my-2 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2'>
                    <div className="grid grid-cols-2 items-center">
                        <p>Description:</p>
                        <p className="text-sm font-normal ">Accident near Main Gate</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>RCA:</p>
                        <p className="text-sm font-normal ">Material Quality</p>
                    </div>
                </div>
            </div>
            <div className="border-2 flex flex-col my-2  p-4 gap-4 rounded-md border-gray-400">
                <h2 className=" text-lg font-semibold ">
                    INJURIES - 0
                </h2>
            </div>
            <div className="border-2 flex flex-col my-2  p-4 gap-4 rounded-md border-gray-400">
                <h2 className=" text-lg font-semibold ">
                    Attachments - 0
                </h2>
            </div>
            <div className="border-2 flex flex-col mb-16  p-4 gap-4 rounded-md border-gray-400">
                <h2 className=" text-lg font-semibold ">
                    UPDATE STATUS
                </h2>
            </div>
        </div>
    </section>
  )
}

export default IncidentsDetails