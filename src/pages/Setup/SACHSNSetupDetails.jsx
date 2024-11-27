import React from 'react'
import Navbar from '../../components/Navbar'
function SACHSNSetupDetails() {
  return (
    <section className='flex'>
        <div className='hidden md:block'>
            <Navbar/>
        </div>
        <div className="w-full flex  flex-col overflow-hidden">
            <h2 className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10">
                SAC/HSN Setup Details
            </h2>
            <div className='flex justify-center'>
            <div className="md:my-5 md:px-10 p-5 text-sm items-center font-medium grid  md:grid-cols-2 border-2 border-black w-4/5 rounded-md" >
                <div className="grid grid-cols-2 items-center ">
                    <p>Type:</p>
                    <p className="text-sm font-normal ">Services</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>Category:</p>
                    <p className="text-sm font-normal ">Serv1.1</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>SAC/HSN Code: </p>
                    <p className="text-sm font-normal ">Code1.1</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>CGST Rate:</p>
                    <p className="text-sm font-normal ">2.0%</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>SGST Rate:</p>
                    <p className="text-sm font-normal ">2.0%</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>IGST Rate:</p>
                    <p className="text-sm font-normal ">%</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>Created On:</p>
                    <p className="text-sm font-normal ">18/03/2021 2:22 PM</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>Updated On:</p>
                    <p className="text-sm font-normal ">18/03/2021 2:22 PM</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <p>Created By:</p>
                    <p className="text-sm font-normal ">Lockated Demo</p>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default SACHSNSetupDetails