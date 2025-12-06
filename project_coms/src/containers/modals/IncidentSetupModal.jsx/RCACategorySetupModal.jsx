import React from 'react'
import ModalWrapper from "../ModalWrapper"

const RCACatagorySetModal = ({ onclose} ) => {
    return (
        <ModalWrapper onclose={onclose}>
            <div className="flex flex-col  justify-center">
                <h2 className="flex md:flex-row flex-col md: gap-3 mx-5 my-3">
                    RCA Category
                </h2>
                <div className="border-t-2 border-black">
                    <div className="flex flex-col gap-y-3 my-5">
                        <input
                          type='text'
                          name=""
                          id=""
                          placeholder='name'
                          className="border p-1 py-3 border-gray-500 rounded-md w-full"
                        >
                        </input>
                    </div>
                </div>
                <div className="border-t-2 border-black my-2"></div>
                <div className="flex justify-end">
                    <button className="bg-black p-1 px-4 py-2 border-2 rounded-md text-white font-medium border-black ">
                        Submit 
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};


export default RCACatagorySetModal