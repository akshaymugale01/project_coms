import React from 'react'
import ModalWrapper from './ModalWrapper';

const EditEmailRuleSetupModal = ({ onclose} ) => {
    return (
        <ModalWrapper onclose={onclose}>
            <div className="flex flex-col justify-center">
                <h2 className="flex gap-4 items-center justify-center font-bold text-lg my-2">
                    Edit Reminder Email Rule
                </h2>
                <div className="border-t-2 border-black">
                    <div className='md:grid grid-cols-2 gap-2 my-3 '>
                        <div className="flex flex-col my-2">
                            <input
                              type='text'
                              name=""
                              id=""
                              placeholder='Test Rule'
                              className="border p-1 py-2 border-gray-500 rounded-md w-64"
                            >
                            </input>
                        </div>
                        <div className="flex flex-col my-2">
                            <select className="border p-1  py-2 border-gray-500 rounded-md w-64">
                                <option value="">Select Trigger Type</option>
                                <option value="">PPM</option>
                                <option value="">AMC</option>
                            </select>
                        </div>
                        <div className="flex flex-col my-2">
                            <select className="border p-1  py-2 border-gray-500 rounded-md w-64">
                                <option value="">Select Trigger To</option>
                                <option value="">Site Admin</option>
                                <option value="">Occupant Admin</option>
                                <option value="">Supplier</option>
                            </select>
                        </div>
                        <div className="flex flex-col my-2">
                            <select className="border p-1  py-2 border-gray-500 rounded-md w-64">
                                <option value="">Select Period Type</option>
                                <option value="">Days</option>
                            </select>
                        </div>
                        <div className="flex flex-col my-2">
                            <input
                              type='text'
                              name=""
                              id=""
                              placeholder='Enter Period Value'
                              className="border p-1 py-2 border-gray-500 rounded-md w-64"
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="border-t-2 border-black my-2"></div>
                <div className="flex justify-end">
                    <button className="bg-black p-1 px-4 py-2 border-2 rounded-md text-white font-medium border-black ">
                        Update 
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default EditEmailRuleSetupModal