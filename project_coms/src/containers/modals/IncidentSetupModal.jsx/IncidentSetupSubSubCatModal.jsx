import React from 'react'
import ModalWrapper from "../ModalWrapper"

const SubSubCategorySetupModal = ({ onclose} ) => {
    return (
        <ModalWrapper onclose={onclose}>
            <div className="flex flex-col  justify-center">
                <h2 className="flex gap-4 items-center justify-center font-bold text-lg my-2">
                    Sub Sub Category
                </h2>
                <div className="border-t-2 border-black">
                    <div className="grid gap-4 grid-cols-2 my-5">
                        <select
                          name=""
                          id=""
                          className="border p-1 px-4 border-gray-500 rounded-md py-3"
                        >
                            <option value="">Select Category</option>
                            <option value="">Health and Safety</option>
                            <option value="">Fire</option>
                            <option value="">Near Miss/Good Catch</option> 
                        </select>
                        <select
                          name=""
                          id=""
                          className="border p-1 px-4 border-gray-500 rounded-md py-3"
                        >
                            <option value="">Select Sub Category</option> 
                        </select>
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


export default SubSubCategorySetupModal