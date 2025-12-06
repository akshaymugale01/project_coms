import React from 'react'
import Navbar from '../../../components/Navbar'
import { useSelector } from 'react-redux'

function EmployeeCourseCertificateDetails() {
    const themeColor = useSelector((state)=> state.theme.color)
  return (
    <section className='flex'>
        <Navbar/>
        <div className='w-full flex mx-3 flex-col overflow-hidden'>
            <h2 style={{background: themeColor}} className="text-center text-xl font-bold p-2 bg-black rounded-full text-white">
            Employee Course Certificate Details
            </h2>
            <div className='flex justify-center'>
                <div className="border-2 flex flex-col p-4 gap-4 rounded-md border-gray-400 w-4/5 mt-10">
                    <div className='my-2 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2'>
                        <div className="grid grid-cols-2 items-center">
                            <p>Organization Name:</p>
                            <p className="text-sm font-normal ">Hacker Rank</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p>Employee Name:</p>
                            <p className="text-sm font-normal ">Ravindar Sahani</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p>Course:</p>
                            <p className="text-sm font-normal ">Python</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p>Date:</p>
                            <p className="text-sm font-normal ">14 jan 2022</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EmployeeCourseCertificateDetails