import React from 'react'
import ModalWrapper from './ModalWrapper';

const AdvanceSalaryRequestDetailModal = ({ onclose} ) => {
    return (
        <ModalWrapper onclose={onclose}>
            <div className="flex flex-col justify-center">
                <h2 className="flex gap-4 items-center justify-center font-semibold text-2xl my-2">
                    Advance Salary Request
                </h2>
                <div className="border-t-2 border-black">
                    <div className='md:grid grid-cols-2 gap-2 my-3 '>
                        <h2 className='text-xl font-semibold my-1'>Name :<span className='text-base font-normal ml-5'>sagar</span></h2>
                        <h2 className='text-xl font-semibold my-1'>Amount requested :<span className='text-base font-normal ml-5'>12000</span></h2>
                    </div>
                    <div className='md:grid grid-cols gap-2 my-3 '>
                        <p className='text-xl font-semibold my-1'>Reason for advance :</p>
                        <p className='text-base font-normal'>car Insurance </p>
                    </div>
                </div>
                <div className="border-t-2 border-black mb-10"></div>
            </div>
        </ModalWrapper>
    );
};

export default AdvanceSalaryRequestDetailModal