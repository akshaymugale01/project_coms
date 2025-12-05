import React from "react";
import ModalWrapper from "./ModalWrapper";
import { IoAddCircle } from "react-icons/io5";

const IncidentUpdateModal = ({ onclose} ) => {
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col w-64 justify-center">
        <h2 className="flex gap-4 items-center justify-center font-bold text-lg my-2">
            Status Update
        </h2>
        <div className="border-t-2 border-black">
            <div className="flex flex-col my-2">
                <label htmlFor="" className="font-semibold">
                    Status
                </label>
                <select
                    text="time"
                    name=""
                    id=""
                    className="border p-1 px-4 border-gray-500 rounded-md w-full"
                >
                    <option value="">Select </option>
                </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                    Comment
                </label>
                <textarea
                    name=""
                    id=""
                    cols="5"
                    rows="4"
                    placeholder="Message"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                />
            </div>
        </div>
        <div className="border-t-2 border-black my-4"></div>
        <div className="flex justify-end">
          <button className="bg-black p-1 px-4 border-2 rounded-md text-white font-medium border-black hover:bg-white hover:text-black transition-all duration-300">
            Submit
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};




export default IncidentUpdateModal