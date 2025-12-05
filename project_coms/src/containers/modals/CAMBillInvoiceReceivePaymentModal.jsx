import React from "react";
import { useSelector } from "react-redux";
import FileInputBox from "../Inputs/FileInputBox";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import toast from "react-hot-toast";
import { receiptPayment } from "../../api";
import { useParams } from "react-router-dom";
const CAMBillInvoiceReceivePaymentModal = ({ onclose, fetchCamBilling }) => {
  const themeColor = useSelector((state) => state.theme.color);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    amount: "",
    paymentMode: "",
    transactionNumber: "",
    paymentDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanedValue = value;
    if (name === "amount") {
      // Only allow digits, no spaces, no alphabets, no special chars
      cleanedValue = value.replace(/[^0-9]/g, "");
    }
    if (name === "transactionNumber") {
      cleanedValue = value.replace(/[^a-zA-Z0-9]/g, "");
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: cleanedValue,
    }));
  };

  const [img, setImg] = useState(null);

  const handleFileChange = (files) => {
    if (files && files[0]) {
      setImg(files[0]);
      console.log("selected file:", files[0]);
    }
  };
  console.log(img);
  const handleSubmit = async () => {
    if (!formData.amount) {
      toast.error("Amount is required");
      return;
    }
    if (!formData.paymentMode) {
      toast.error("Payment Mode is required");
      return;
    }
    if (!formData.transactionNumber) {
      toast.error("Transaction Number is required");
      return;
    }
    if (!formData.paymentDate) {
      toast.error("Payment Date is required");
      return;
    }
    const sendData = new FormData();
    sendData.append("payment[resource_id]", id);
    sendData.append("payment[resource_type]", "CamBill");
    sendData.append("payment[total_amount]", formData.amount);
    sendData.append("payment[payment_method]", formData.paymentMode);
    sendData.append("payment[transaction_id]", formData.transactionNumber);
    sendData.append("payment[paymen_date]", formData.paymentDate);
    sendData.append("payment[notes]", formData.notes);
    sendData.append("image_url", img);
    try {
      const resp = await receiptPayment(sendData);
      console.log(resp);
      toast.success("Payment received successfully");
      onclose();
      fetchCamBilling();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(formData);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-20">
      <div className="bg-white overflow-auto max-h-[80%] hide-scrollbar md:w-auto w-96 p-4 px-8 flex flex-col rounded-md gap-5">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {/* Enter Amount */}
            <div className="flex flex-col">
              <label
                htmlFor="Amount"
                className="text-sm font-semibold text-gray-700 mb-2"
              >
                Enter Amount
                <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="amount"
                id="Amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter Amount"
                required
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
                name="paymentMode"
                id="Payment"
                value={formData.paymentMode}
                onChange={handleChange}
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
                name="transactionNumber"
                value={formData.transactionNumber}
                onChange={handleChange}
                id="TransactionNumber"
                placeholder="Enter Transaction Number"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="paymentDate"
                className="text-sm font-semibold text-gray-700 mb-2"
              >
                Payment Date
              </label>
              <input
                type="date"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
                id="paymentDate"
                placeholder="Enter Payment Date"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Notes */}
            <div className="flex flex-col md:col-span-2">
              <label
                htmlFor="Notes"
                className="text-sm font-semibold text-gray-700 mb-2"
              >
                Notes
              </label>
              <textarea
                name="notes"
                id="Notes"
                cols="5"
                rows="2"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter Notes"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* File Upload */}
            <div className="md:col-span-2">
              <FileInputBox handleChange={handleFileChange} />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end border-t border-gray-300 pt-4 mt-4">
            <button
              onClick={handleSubmit}
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
