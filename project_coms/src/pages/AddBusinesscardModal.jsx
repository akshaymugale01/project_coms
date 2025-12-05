import html2canvas from "html2canvas";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaPlusCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

const AddBusinesscardModal = ({ onClose }) => {
  const themeColor = useSelector((state) => state.theme.color);
  
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-20">
      <div className="bg-white overflow-auto max-h-[70%]  md:w-[40%] p-4  flex flex-col rounded-xl hide-scrollbar">
        <h2 className="text-xl font-semibold mb-2 flex gap-2 justify-center items-center border-b">
          <FaPlusCircle /> Add Business card
        </h2>
        <div className="grid grid-cols-2 gap-2 my-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-medium">
              Full name
            </label>
            <input
              type="text"
              name=""
              id=""
              className="border-b border-gray-600 w-full p-1 focus:outline-none"
              placeholder="Full name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-medium">
              Profession/Designation
            </label>
            <input
              type="text"
              name=""
              id=""
              className="border-b border-gray-600 w-full p-1 focus:outline-none"
              placeholder="Profession/Designation"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-medium">
              Contact number
            </label>
            <input
              type="text"
              name=""
              id=""
              className="border-b border-gray-600 w-full p-1 focus:outline-none"
              placeholder="Contact number"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-medium">
              Email id
            </label>
            <input
              type="text"
              name=""
              id=""
              className="border-b border-gray-600 w-full p-1 focus:outline-none"
              placeholder="Email id"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-medium">
              Website
            </label>
            <input
              type="text"
              name=""
              id=""
              className="border-b border-gray-600 w-full p-1 focus:outline-none"
              placeholder="Website url"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-medium">
              Profile image
            </label>
            <input
              type="file"
              name=""
              id=""
              className="border-2 rounded-md border-double border-gray-600 w-full p-1 focus:outline-none"
            />
          </div>
          <div className="flex flex-col col-span-2 gap-1">
            <label htmlFor="" className="font-medium">
              Address
            </label>
            <input
              type="text"
              name=""
              id=""
              className="border-b border-gray-600 w-full p-1 focus:outline-none"
              placeholder="Address"
            />
          </div>
        </div>
        <div className="flex justify-center gap-2 my-2">
          <button
            className="p-1 rounded-md border-2 border-red-500 text-red-500  flex gap-2 items-center font-medium px-4"
            onClick={onClose}
          >
            <MdClose /> Close
          </button>
          <button
            style={{ background: themeColor }}
            className="p-1 rounded-md  text-white flex gap-2 items-center font-medium px-4"
          >
            <FaCheck /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBusinesscardModal;
