import React from 'react'
import Navbar from '../../components/Navbar'
function BankAccountDetails() {
  return (
    <section className='flex'>
        <Navbar/>
        <div className='w-full flex  flex-col overflow-hidden'>
            <h2 className="text-center text-lg font-bold p-2 mx-10 my-3 bg-black rounded-full text-white">
               Bank Account Details
            </h2>
            <div className="border-2 flex flex-col my-2 mx-10 p-4 gap-4 rounded-md border-gray-400">
                <h2 className=" text-lg border-black border-b font-semibold ">
                    Bank Account Details
                </h2>
                <div className='my-2 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2'>
                    <div className="grid grid-cols-2 items-center">
                        <p>First Name:</p>
                        <p className="text-sm font-normal ">Ashish</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Last Name:</p>
                        <p className="text-sm font-normal ">Gupta</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Email:</p>
                        <p className="text-sm font-normal ">ashishgupta@gmail.com</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Phone:</p>
                        <p className="text-sm font-normal ">1226387383</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Date of Birth:</p>
                        <p className="text-sm font-normal ">18 sep 2003</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Gender:</p>
                        <p className="text-sm font-normal ">Male</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>City:</p>
                        <p className="text-sm font-normal ">Agra</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>State:</p>
                        <p className="text-sm font-normal ">Up</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <p>Address:</p>
                        <p className="text-sm font-normal ">jp nager lukhnow</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default BankAccountDetails