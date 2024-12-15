import React from "react";
import ModalWrapper from "./ModalWrapper";
import { useSelector } from "react-redux";

const RecallInvoiceModal = ({ onclose }) => {
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col w-80 justify-center">
        <h2 className="flex gap-4 items-center justify-center font-bold text-lg my-2">
          Recall Invoice
        </h2>
        <div className="border-t-2 border-black">
          <div className="md:grid grid-cols-2 gap-5 my-3">
            <div className="flex flex-col col-span-2">
              <label htmlFor="" className="font-semibold my-2">
                Reason
              </label>
              <textarea
                name=""
                id=""
                cols="5"
                rows="3"
                placeholder="Enter Reason"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t-2 py-5 border-black">
          <button
            className="p-1 px-4 border-2 rounded-md text-white font-medium"
            style={{ background: themeColor }}
          >
            Submit
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default RecallInvoiceModal;
