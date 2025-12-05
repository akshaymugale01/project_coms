import React from "react";
import ModalWrapper from "./ModalWrapper";

const DeliveryVendorModal = ({ onclose, title = "Edit" }) => {
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col gap-4 z-10">
        <h1 className="font-semibold text-center text-xl">{title} Vendor</h1>
        <form action="" className="grid grid-cols-2 px-5 gap-x-5 gap-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-bold">Vendor Name:</label>
            <input type="text" name="" id="" placeholder="Enter Vendor Name" className="border rounded-md border-gray-500 p-1 px-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-bold">Website Link:</label>
            <input type="text" name="" id="" placeholder="Enter Website Link" className="border rounded-md border-gray-500 p-1 px-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-bold">SPOC Person:</label>
            <input type="text" name="" id="" placeholder="Enter SPOC Person" className="border rounded-md border-gray-500 p-1 px-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-bold">Contact Number:</label>
            <input type="text" name="" id="" placeholder="Enter Contact Number" className="border rounded-md border-gray-500 p-1 px-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-bold">Agreement Start Date:</label>
            <input type="text" name="" id="" placeholder="Enter Agreement Start Date" className="border rounded-md border-gray-500 p-1 px-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-bold">Agreement End Date:</label>
            <input type="text" name="" id="" placeholder="Enter Agreement end Date" className="border rounded-md border-gray-500 p-1 px-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-bold">Agreement Attachment:</label>
            <input type="file" name="" id=""   />
          </div>
          <button className="bg-black p-2 px-4 text-white rounded-md my-5" >
          Submit
        </button>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default DeliveryVendorModal;
