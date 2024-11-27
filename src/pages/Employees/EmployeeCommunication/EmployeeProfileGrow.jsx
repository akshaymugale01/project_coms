import React from 'react'
import { Link } from 'react-router-dom'
import interview from "/01.jpg"
import { AiFillCloseCircle } from 'react-icons/ai'
function EmployeeProfileGrow() {
    const connection = [
        {
          image :"/profile2.jpg",
          id: 1,
          name: 'karuna',
          role: 'Lead Developer',
          mutual: '1 mutual connection".',
        },
        {
            image :"/profile3.jpg",
            id: 3,
            name: 'Amit',
            role: 'Web Development ',
            mutual: '1 mutual connection".',
          },
          {
            image :"/profile1.jpg",
            id: 3,
            name: 'Riya',
            role: 'Data Analysis',
            mutual: '1 mutual connection".',
          },
    ]
    const friend = [
        {
          image :"/profile2.jpg",
          id: 1,
          name: 'karuna',
          role: 'Lead Developer',
          mutual: '1 mutual connection".',
          follower:'89 followers'
        },
        {
            image :"/profile3.jpg",
            id: 3,
            name: 'Amit',
            role: 'Web Development',
            mutual: '1 mutual connection".',
            follower:'89 followers'
          },
          {
            image :"/profile1.jpg",
            id: 3,
            name: 'Anshu',
            role: 'Data Analysis',
            mutual: '1 mutual connection".',
            follower:'80 followers'
          },
          {
            image :"/profile5.jpg",
            id: 4,
            name: 'Sindhu',
            role: 'Data Analysis',
            mutual: '1 mutual connection".',
            follower:'189 followers'
          },
          {
            image :"/profile4.jpg",
            id: 5,
            name: 'Arun',
            role: 'Data Analysis',
            mutual: '1 mutual connection".',
            follower:'189 followers'
          },
          {
            image :"/profile1.jpg",
            id: 6,
            name: 'Anshu',
            role: 'Data Analysis',
            mutual: '1 mutual connection".',
            follower:'189 followers'
          },
    ]
  return (
    <section>
        <div className='w-full flex flex-col overflow-hidden'>
            <div className='flex justify-center '>
                <div className='border-2 border-grey-200 rounded-md md:w-3/5 w-full'>
                    <div className='md:grid grid-cols mb-3'>
                        <div className='flex justify-between md:flex-row flex-col'>
                            <h2 className='text-lg font-semibold my-2 mx-5'>Invitations</h2>
                            <Link to={``} className='font-semibold text-lg my-2 mx-5'><span className='hover:text-blue-700'>See All</span></Link>
                        </div>
                        <ul>
                            {connection.map((connections) => (
                                <li key={connections.id} className="p-2 border-b border-gray-200">
                                    <div className="ml-3 flex justify-between ">
                                        <div className='flex gap-2 flex-wrap'>
                                            <div>
                                                <img src={connections.image} className=" flex w-20 h-20 rounded-full" alt="" />
                                            </div>
                                            <div className=' ml-3'>
                                                <p className="text-md font-semibold">{connections.name}</p>
                                                <p className="text-sm font-normal ">{connections.role}</p>
                                                <p className="text-sm font-normal ">{connections.mutual}</p>
                                            </div>
                                        </div>
                                        <div className='flex gap-2 sm:flex-row flex-col'>
                                            <div>
                                                <button type='submit' className='hover:bg-gray-200 p-1 px-3 rounded-md'>Ignore</button>
                                            </div>
                                            <div>
                                                <button type='submit' className='hover:bg-blue-200 p-1 px-3 rounded-lg text-blue-400 border-2 border-blue'>Accept</button>
                                            </div>
                                        </div>
                                    </div>   
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='flex justify-center my-5'>
                <div className='border-2 border-grey-200 rounded-md md:w-3/5'>
                    <div className='md:grid grid-cols mb-3'>
                        <div className='flex justify-between md:flex-row flex-col'>
                            <h2 className='text-lg font-semibold my-2 mx-5'>People to follow based on your activity</h2>
                            <Link to={``} className='font-semibold text-lg my-2 mx-5'><span className='hover:text-blue-700'>See All</span></Link>
                        </div>
                    </div>
                    <div className='md:grid grid-cols-3 gap-3 mx-5 mb-5'>
                    {friend.map((friends) => (
                        <div key={friends.id} >
                            <div className='border-2 border-gray-300 rounded-lg my-3'>
                                <div className='relative'>
                                    <div>
                                        <img src={interview} className=" w-full" alt="" />
                                        <div className='absolute top-1 right-1 cursor-pointer'>
                                        <AiFillCloseCircle size={22} className='text-white' />
                                        </div>
                                    </div>
                                    <div className='absolute -bottom-8 left-6'>
                                        <img src={friends.image} className="w-20 h-20 rounded-full" alt="" />
                                    </div>
                                </div>
                                <div className=' mt-8 ml-5'>
                                    <p className="text-md font-semibold">{friends.name}</p>
                                    <p className="text-sm font-normal ">{friends.role}</p>
                                    <p className="text-sm font-normal ">{friends.mutual}</p>
                                    <p className='text-sm font-normal mt-5'>{friends.follower}</p>
                                </div>
                                <div className='flex justify-center mx-3 my-3'>
                                    <button className='border-2 border-gray-300 p-1 w-full rounded-2xl '>Follow</button>
                                </div>
                            </div>          
                        </div>
                    ))}
                    </div>
                    <div className='flex justify-center border-t border-gray-300 '>
                        <button type='submit' className=' p-1 px-10 my-3'>See More Result</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EmployeeProfileGrow