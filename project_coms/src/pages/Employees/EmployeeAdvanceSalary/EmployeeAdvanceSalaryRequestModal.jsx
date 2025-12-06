import React from 'react'
import ModalWrapper from '../../../containers/modals/ModalWrapper';
const EmpolyeeCreateAdvanceSalaryRequestModal = ({ onclose} ) => {
    return (
        <ModalWrapper onclose={onclose}>
            <div className="flex flex-col justify-center">
                <h2 className="flex gap-4 items-center justify-center font-bold text-lg my-2">
                    Create Advance Salary Request
                </h2>
                <div className="border-t-2 border-black">
                    <div className='md:grid grid-cols-1 gap-2 my-3 '>
                        <div className="flex flex-col my-1">
                            <input
                              type='text'
                              name=""
                              id=""
                              placeholder='Name'
                              className="border p-1 py-2 border-gray-500 rounded-md w-64"
                            >
                            </input>
                        </div>
                        <div className="flex flex-col my-1">
                            <input
                              type='number'
                              name=""
                              id=""
                              placeholder='Amount requested'
                              className="border p-1 py-2 border-gray-500 rounded-md md:w-64"
                            >
                            </input>
                        </div>
                        <div className="flex flex-col my-1">
                            <textarea
                              type='text'
                              name=""
                              id=""
                              rows="3"
                              placeholder='Reason for advance'
                              className="border p-1 py-2 border-gray-500 rounded-md md:w-64"
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="border-t-2 border-black my-2"></div>
                <div className="flex justify-end">
                    <button className="bg-black p-1 px-4 py-2 border-2 rounded-md text-white font-medium border-black ">
                        Create 
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default EmpolyeeCreateAdvanceSalaryRequestModal