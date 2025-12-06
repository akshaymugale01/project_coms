import React from 'react'

const OtherFeedsBill = () => {
  return (
    <section>
        <div className="w-full flex flex-col overflow-hidden">
            <h2 className="text-center text-xl font-bold p-2 bg-black rounded-full text-white mx-10 my-5">
                Feeds
            </h2>
            <div className='md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg '>
                <p className="font-normal">May 31, 2024</p>
                <p className="font-normal">11:22 AM</p>
                <p className="font-semibold">Kaustubh B - <span className='font-thin'>created Payment Entry ID 5700</span></p>
                <p className="font-semibold">Amount - <span className='font-thin'>100.0</span></p>
                <p className="font-semibold">Payment Mode - <span className='font-thin'>Online</span></p>
                <p className="font-semibold">Transaction Number - <span className='font-thin'>5678822828</span></p>
                <p className="font-semibold">Status - <span className='font-thin'>Partially Paid</span></p>
                <p className="font-semibold">Payment Date - <span className='font-thin'>May 29, 202410:35 PM</span></p>
                <p className="font-semibold">Note - <span className='font-thin'>Other Bill Created.</span></p>
            </div>
        </div>
    </section>
  )
}

export default OtherFeedsBill