import React from 'react'
import Account from './Account'
import vibe from "/vibe.jpeg"

const Organisation = () => {
  return (
    <div className='w-full my-1 '>
      <Account/>
      <div className='flex flex-col  items-center mt-10 '>
        {/* api to fetch data */}
        <img src={vibe} alt="vibe" width={"50%"} className=' p-10 rounded-3xl  shadow-gray-100 shadow-inner' />
        <h2 className='text-black text-5xl font-mono  p-4 rounded-full shadow-gray-50 shadow-inner font-bold text-center my-10'>Vibe Copilot</h2>
      </div>
    </div>
  )
}

export default Organisation
