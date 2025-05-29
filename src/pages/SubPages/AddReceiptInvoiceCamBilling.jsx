import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { getCamBillingData, postInvoiceReceipt } from "../../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function AddReceiptInvoiceCamBilling() {
  const themeColor = useSelector((state) => state.theme.color);
  const [camBilling, setCamBilling] = useState([]);
  const [formData, setFormData] = useState({
    receiptNumber: "",
    invoiceNumber: "",
    // block: "",
    // flat: "",
    // address: "",
    paymentMode: "",
    amountReceived: "",
    transactionChequeNumber: "",
    bankName: "",
    branchName: "",
    paymentDate: "",
    receiptDate: "",
    notes: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchCamBilling = async () => {
      try {
        const response = await getCamBillingData();
        const invoiceNumbers = response.data.map((item) => item.invoice_number);
        setCamBilling(invoiceNumbers);
      } catch (err) {
        console.error("Failed to fetch CAM Billing data:", err);
      }
    };

    fetchCamBilling();
  }, []);

  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!formData.receiptNumber) {
      toast.error("Receipt Number is required");
      return;
    }
    if (!formData.invoiceNumber) {
      toast.error("Invoice Number is required");
      return;
    }
    if (!formData.paymentMode) {
      toast.error("Payment are required");
      return;
    }
    if (!formData.transactionChequeNumber) {
      toast.error("Transaction Cheque Number are required");
      return;
    }
    if (!formData.paymentDate) {
      toast.error("Payment date is required");
      return;
    }
    if (!formData.receiptDate) {
      toast.error("Receipt date is required");
      return;
    }
    const sendData = new FormData();
    sendData.append("invoice_receipt[receipt_number]", formData.receiptNumber);
    sendData.append("invoice_receipt[building_id]", "buildingId");
    sendData.append("invoice_receipt[invoice_number]", formData.invoiceNumber);
    // sendData.append("invoice_receipt[building_id]", formData.block);
    // sendData.append("invoice_receipt[unit_id]", formData.flat);
    // sendData.append("invoice_receipt[address_id]", formData.address);
    sendData.append("invoice_receipt[payment_mode]", formData.paymentMode);
    sendData.append(
      "invoice_receipt[amount_received]",
      formData.amountReceived
    );
    sendData.append(
      "invoice_receipt[transaction_or_cheque_number]",
      formData.transactionChequeNumber
    );
    sendData.append("invoice_receipt[bank_name]", formData.bankName);
    sendData.append("invoice_receipt[branch_name]", formData.branchName);
    sendData.append("invoice_receipt[payment_date]", formData.paymentDate);
    sendData.append("invoice_receipt[receipt_date]", formData.receiptDate);
    sendData.append("invoice_receipt[notes]", formData.notes);
    try {
      const receipt = await postInvoiceReceipt(sendData);
      toast.success("Invoice Receipt Added Successfully");
      console.log(receipt);
      navigate("/cam_bill/reciept-invoice");
    } catch {
      console.log(error);
    }
  };
  console.log(camBilling);
  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex flex-col overflow-hidden">
        <h2
          style={{ background: "rgb(3 19 37)" }}
          className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10"
        >
          Create Invoice Receipt
        </h2>
        <div className="flex justify-center">
          <div className="sm:border border-gray-400 p-1 md:px-10 rounded-lg w-4/5 mb-14">
            <div className="md:grid grid-cols-3 gap-5 my-3">
              {/* Receipt Number */}
              <div className="flex flex-col">
                <label htmlFor="receiptNumber" className="font-semibold my-2">
                  Receipt Number
                </label>
                <input
                  type="text"
                  name="receiptNumber"
                  id="receiptNumber"
                  value={formData.receiptNumber}
                  onChange={handleChange}
                  placeholder="Enter Receipt Number"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              {/* Invoice Number */}
              <div className="flex flex-col">
                <label htmlFor="invoiceNumber" className="font-semibold my-2">
                  Invoice Number
                </label>
                <select
                  name="invoiceNumber"
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Invoice Number</option>
                  {camBilling.map((invoiceNumber, index) => (
                    <option key={index} value={invoiceNumber}>
                      {invoiceNumber}
                    </option>
                  ))}
                </select>
              </div>
              {/* Block */}
              {/* <div className="flex flex-col">
                <label htmlFor="block" className="font-semibold my-2">
                  Block
                </label>
                <select
                  name="block"
                  id="block"
                  value={formData.block}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="" disabled>
                    Select Tower
                  </option>
                  <option value="imperia">Imperia</option>
                </select>
              </div> */}
              {/* Flat */}
              {/* <div className="flex flex-col">
                <label htmlFor="flat" className="font-semibold my-2">
                  Flat
                </label>
                <select
                  name="flat"
                  id="flat"
                  value={formData.flat}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="" disabled>
                    Select Flat
                  </option>
                  <option value="1001">1001</option>
                </select>
              </div> */}
              {/* Address */}
              {/* <div className="flex flex-col">
                <label htmlFor="address" className="font-semibold my-2">
                  Address
                </label>
                <select
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select address</option>
                </select>
              </div> */}
              {/* Payment Mode */}
              <div className="flex flex-col">
                <label htmlFor="paymentMode" className="font-semibold my-2">
                  Payment Mode
                </label>
                <select
                  name="paymentMode"
                  id="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Mode</option>
                  <option value="online">Online</option>
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="neft">NEFT</option>
                  <option value="rtgs">RTGS</option>
                </select>
              </div>
              {/* Amount Received */}
              <div className="flex flex-col">
                <label htmlFor="amountReceived" className="font-semibold my-2">
                  Amount Received
                </label>
                <input
                  type="text"
                  name="amountReceived"
                  id="amountReceived"
                  value={formData.amountReceived}
                  onChange={handleChange}
                  placeholder="Enter Amount"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              {/* Transaction / Cheque Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="transactionChequeNumber"
                  className="font-semibold my-2"
                >
                  Transaction / Cheque Number
                </label>
                <input
                  type="text"
                  name="transactionChequeNumber"
                  id="transactionChequeNumber"
                  value={formData.transactionChequeNumber}
                  onChange={handleChange}
                  placeholder="Enter Transaction/Cheque Number"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              {/* Bank Name */}
              <div className="flex flex-col">
                <label htmlFor="bankName" className="font-semibold my-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bankName"
                  id="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Enter Bank Name"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              {/* Branch Name */}
              <div className="flex flex-col">
                <label htmlFor="branchName" className="font-semibold my-2">
                  Branch Name
                </label>
                <input
                  type="text"
                  name="branchName"
                  id="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  placeholder="Enter Branch Name"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              {/* Payment Date */}
              <div className="flex flex-col">
                <label htmlFor="paymentDate" className="font-semibold my-2">
                  Payment Date
                </label>
                <input
                  type="date"
                  name="paymentDate"
                  id="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              {/* Receipt Date */}
              <div className="flex flex-col">
                <label htmlFor="receiptDate" className="font-semibold my-2">
                  Receipt Date
                </label>
                <input
                  type="date"
                  name="receiptDate"
                  id="receiptDate"
                  value={formData.receiptDate}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              {/* Notes */}
              <div className="flex flex-col col-span-3">
                <label htmlFor="notes" className="font-semibold my-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  cols="5"
                  rows="3"
                  placeholder="Enter Notes"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-center my-5">
              <button
                onClick={handleSubmit}
                className="p-1 px-4 border-2 rounded-md text-white font-medium"
                style={{ background: "rgb(3 19 37)" }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddReceiptInvoiceCamBilling;
