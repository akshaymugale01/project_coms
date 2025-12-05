import React from "react";
import ModalWrapper from "./ModalWrapper";
import { IoAddCircle } from "react-icons/io5";
import TextFields from "../Inputs/TextFields";

const MaterialsModal = ({ onclose }) => {
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col justify-center">
        <h2 className="flex gap-4 items-center justify-center mb-5 font-bold text-lg">
          <IoAddCircle size={20} />
          Add Material
        </h2>
        <div className="flex item-center justify-center my-5 gap-5">
          <h3 className="font-semibold">Select Type</h3>
          <div className="flex gap-2 items-center">
            <input type="radio" name="type" id="inward" value="inward" />
            <label htmlFor="inward">Inward</label>
          </div>
          <div className="flex gap-2 items-center">
            <input type="radio" name="type" id="outward" value="outward" />
            <label htmlFor="outward">Outward</label>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">
            <TextFields title={"Person Name"} type={"text"} />
            <TextFields title={"No. Of Items"} type={"text"} />
            <TextFields title={"Vehicle Number"} type={"text"} />
          </div>
          <div className="flex flex-col my-4">
            <label htmlFor="" className="font-bold">
              Description
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="3"
              className="border border-gray-500 rounded-md"
            />
          </div>
        </div>
        <button className="bg-black p-2 px-4 text-white rounded-md my-5">Submit</button>
      </div>
    </ModalWrapper>
  );
};

export default MaterialsModal;
