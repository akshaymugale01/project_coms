import React from 'react'
import Navbar from '../../../components/Navbar'

function BillPayDetails() {
  return (
    <section className='flex'>
        <Navbar/>
        <div className='w-full flex  flex-col overflow-hidden'>
            <h2 className="text-center text-xl font-bold mx-5 mb-5 mt-3 p-2 bg-black rounded-lg text-white ">
                Card Details
            </h2>
            <div className='flex justify-center'>
                <div className='border-2 border-gray-400 rounded-md md:w-3/5'>
                    <h2 className='flex justify-center text-2xl font-semibold'>Credit Card</h2>
                    <div className='md:grid grid-cols px-5 py-5'>
                        <h2 className='text-xl font-semibold my-1'>Card number :<span className='text-base font-normal ml-5'>XXXX XXXX XXXX XXXX</span></h2>
                        <h2 className='text-xl font-semibold my-1'>Name on card :<span className='text-base font-normal ml-5'>Raj</span></h2>
                        <h2 className='text-xl font-semibold my-1'>Expiry date :<span className='text-base font-normal ml-5'>2025 Feb</span></h2>
                        <h2 className='text-xl font-semibold my-1'>CVV code :<span className='text-base font-normal ml-5'>****</span></h2>
                        <h2 className='text-xl font-semibold my-1'>Issuing Bank:<span className='text-base font-normal ml-5'></span></h2>
                        <h2 className='text-xl font-semibold my-1'>Credit Limit :<span className='text-base font-normal ml-5'></span></h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default BillPayDetails