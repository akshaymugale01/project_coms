import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
const CheckListAddGroupModal = ({ onclose} ) => {
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col justify-center ">
        <h2 className="flex gap-4 items-center justify-center font-bold text-lg my-2">
            Create Group
        </h2>
        <div className="border-t-2 border-black">
            <div className="grid grid-cols-1 gap-2 my-3">
                <div className="grid grid-col gap-2">
                    <label htmlFor="" className="text-sm font-medium mt-1">Enter Group Name</label>
                    <input type="text" name="" id="" placeholder="Enter Group Name" className="border rounded-md border-gray-500 p-1 px-2 py-2" />
                </div>
            </div>
        </div>
        <div className="border-t-2 border-black my-4"></div>
        <div className="flex justify-center">
          <button className="bg-black p-1 px-4 border-2 rounded-md text-white font-medium border-black hover:bg-white hover:text-black transition-all duration-300">
            Submit
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CheckListAddGroupModal