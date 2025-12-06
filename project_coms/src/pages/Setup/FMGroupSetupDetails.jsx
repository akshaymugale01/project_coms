import React from 'react'
import image from "/profile.png";
function FmGroupSetupDetails() {
  return (
    <section className='flex'>
        <div className='w-full flex flex-col overflow-hidden'>
            <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white mx-3 my-5">
                Fm Group Detail
            </h2>
            <div className='flex justify-center '>
                <div className='border-2 flex flex-col  p-4 gap-4 rounded-md border-gray-400 w-3/4'>
                    <div className='cursor-pointer flex justify-center items-center'>
                        <img
                          src={image}
                          className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
                        />
                    </div>
                    <div>
                    <h2 className="text-center text-lg font-bold p-2">
                        Electrical Technicians
                    </h2>
                    <p className="text-center font-medium text-red-400 p-2">Total Members - 2</p>
                    </div>
                    <div className='border-t border-black'>
                        <p className="text-lg font-semibold p-2">Members List</p>
                        <p className="text-sm font-medium p-2 border-t border-black"> Lockated Demo</p>
                        <p className="text-sm font-medium p-2 border-t border-black"> Yogesh Nalawde</p>
                    </div> 
                    <div className=' flex justify-center'>
                        <button className="bg-black text-white px-8  py-2 text-small rounded-md ">
                            Back
                        </button>
                    </div>               
                </div>
            </div>
        </div>
    </section>
  )
}

export default FmGroupSetupDetails