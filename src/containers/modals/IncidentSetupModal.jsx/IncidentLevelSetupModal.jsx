// import React from "react";
// import ModalWrapper from "../ModalWrapper";
import { BiEditAlt } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const IncidenceLevelSetupModal = ({ onclose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-20">
      <div className="bg-white overflow-auto max-h-[70%] md:w-auto w-96 p-4 px-8 flex flex-col rounded-xl gap-5">
        <div className="flex flex-col w-64 justify-center">
          <h2 className="flex gap-2 items-center justify-center font-bold text-lg ">
            <BiEditAlt /> Edit Incident Level
          </h2>
          <div className="border-t-2 border-black">
            <div className="flex flex-col my-2 gap-2">
              <label htmlFor="" className="font-medium">
                Level
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Level"
                className="border p-2 border-gray-500 rounded-md w-full"
              ></input>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-2">
            <button
              className="bg-gray-800 flex items-center gap-2 text-white rounded-md p-2 px-4 "
              onClick={onclose}
            >
              <MdClose /> Cancel
            </button>
            <button className="bg-indigo-700 flex items-center gap-2 text-white rounded-md px-4 p-2 ">
              <FaCheck /> Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidenceLevelSetupModal;