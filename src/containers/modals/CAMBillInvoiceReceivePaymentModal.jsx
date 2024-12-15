import React from "react";
import ModalWrapper from "./ModalWrapper";
import { useSelector } from "react-redux";
import FileInputBox from "../Inputs/FileInputBox";
import { AiOutlineClose } from "react-icons/ai";

const CAMBillInvoiceReceivePaymentModal = ({ onclose }) => {
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-20">
    <div  className="bg-white overflow-auto max-h-[75%] hide-scrollbar md:w-auto w-96 p-4 px-8 flex flex-col rounded-md gap-5">
      <button className="place-self-end" onClick={onclose}>
        <AiOutlineClose size={20} />
      </button>
      
      <div className="flex flex-col w-full max-w-2xl max-h-2xl bg-white rounded-lg p-4 ">
        {/* Modal Title */}
        <h2 className="text-center font-bold text-xl text-gray-800 mb-2">
          Receive Payment
        </h2>
        <div className="border-t border-gray-300 mb-6"></div>

        {/* rm Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
          {/* Enter Amount */}
          <div className="flex flex-col">
            <label
              htmlFor="Amount"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Enter Amount
            </label>
            <input
              type="text"
              name="Amount"
              id="Amount"
              placeholder="Enter Amount"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Payment Mode */}
          <div className="flex flex-col">
            <label
              htmlFor="Payment"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Payment Mode
            </label>
            <select
              name="payment_mode"
              id="Payment"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Mode</option>
              <option value="online">Online</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="credit_card">Credit Card</option>
              <option value="neft">NEFT</option>
              <option value="rtgs">RTGS</option>
              <option value="bulk_upload">Bulk Upload</option>
            </select>
          </div>

          {/* Transaction Number */}
          <div className="flex flex-col">
            <label
              htmlFor="TransactionNumber"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Transaction Number
            </label>
            <input
              type="text"
              name="TransactionNumber"
              id="TransactionNumber"
              placeholder="Enter Transaction Number"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col md:col-span-3">
            <label
              htmlFor="Notes"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Notes
            </label>
            <textarea
              name="Notes"
              id="Notes"
              cols="5"
              rows="2"
              placeholder="Enter Notes"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* File Upload */}
          <div className="md:col-span-3">
            <FileInputBox />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end border-t border-gray-300 pt-4 mt-4">
          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-all duration-200 shadow-md"
            style={{ background: themeColor }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CAMBillInvoiceReceivePaymentModal;
