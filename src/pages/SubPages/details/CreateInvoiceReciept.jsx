import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { postInvoiceReceipt, getCamBillingDataDetails } from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
function CreateInvoiceReceipt() {
  const themeColor = "rgb(3 19 37)";
  // const [invoiceAdd, setInvoiceAdd] = useState([]);
  const { id } = useParams();
  const [invoiceNumber, setInvoiceNumber] = useState([]);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!formData.receiptNumber) {
      toast.error("Receipt number is required");
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
    sendData.append("invoice_receipt[resource_type]", "CamBill");
    sendData.append("invoice_receipt[resource_id]", id);
    sendData.append("invoice_receipt[cam_bill_id]", id);
    try {
      const receipt = await postInvoiceReceipt(sendData);
      toast.success("Invoice Receipt Added Successfully");
      navigate(`/cam_bill/details/${id}`);
      console.log(receipt);
    } catch {
      console.log(error);
    }
  };

  // useEffect(() => {
  //     const fetchAddressSetup = async () => {
  //       try {
  //         const response = await getAddressSetup();
  //         setInvoiceAdd(response.data);
  //       } catch (err) {
  //         console.error("Failed to fetch Address Setup data:", err);
  //       }
  //     };

  //     fetchAddressSetup(); // Call the API
  //   }, []);

  useEffect(() => {
    const fetchCamBilling = async () => {
      try {
        const response = await getCamBillingDataDetails(id);
        setInvoiceNumber(response.data);
        setFormData({
          ...formData,
          invoiceNumber: response.data.invoice_number,
        }); // Ensure response.data is structured as expected
      } catch (err) {
        console.error("Failed to fetch Address Setup data:", err);
      }
    };
    fetchCamBilling(); // Call the API
  }, [id]);
  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex  flex-col overflow-hidden">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10"
        >
          Create Invoice Receipt
        </h2>
        <div className="flex justify-center">
          <div className="sm:border border-gray-400 p-1 md:px-10 rounded-lg w-4/5 mb-14">
            <div className="md:grid grid-cols-3 gap-5 my-3">
              <div className="flex flex-col ">
                <label htmlFor="InvoiceNumber" className="font-semibold my-2">
                  Invoice Number
                </label>
                <input
                  type="text"
                  name="invoiceNumber"
                  id="InvoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleChange}
                  readOnly
                  placeholder="Enter Invoice Number"
                  className="border p-1 px-4 bg-gray-300 rounded-md cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col ">
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
              {/* <div className="flex flex-col">
                <label htmlFor="Block" className="font-semibold my-2">
                  Block
                </label>
                <select
                  name="block"
                  id=" Block"
                  value={formData.block}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="" disabled selected>
                    Select Tower
                  </option>
                  <option value="imperia">Imperia</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="Flat" className="font-semibold my-2">
                  Flat
                </label>
                <select
                  name="flat"
                  id=" Flat"
                  value={formData.flat}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="" disabled selected>
                    Select Flat
                  </option>
                  <option value="1001">1001</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="Address" className="font-semibold my-2">
                  Address
                </label>
                <select
                  name="address"
                  id=" Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select address</option>
                  {invoiceAdd.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.title}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="flex flex-col">
                <label htmlFor="Payment" className="font-semibold my-2">
                  Payment Mode
                </label>
                <select
                  name="paymentMode"
                  id=" Payment"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Mode</option>
                  <option value="online">online</option>
                  <option value="cash">cash</option>
                  <option value="cheque">cheque</option>
                  <option value="credit_card">credit_card</option>
                  <option value="Online Payment">Online Payment</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Bulk Upload">Bulk Upload</option>
                  <option value="Online">Online</option>
                  <option value="neft">neft</option>
                  <option value="rtgs">rtgs</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div className="flex flex-col ">
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
              <div className="flex flex-col ">
                <label
                  htmlFor="TransactionChequeNumber"
                  className="font-semibold my-2"
                >
                  Transaction / Cheque Number
                </label>
                <input
                  type="text"
                  name="transactionChequeNumber"
                  id="TransactionChequeNumber"
                  value={formData.transactionChequeNumber}
                  onChange={handleChange}
                  placeholder="Enter Transaction/Cheque Number"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="BankName" className="font-semibold my-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  id="BankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Enter Bank Name"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="BranchName" className="font-semibold my-2">
                  Branch Name
                </label>
                <input
                  type="text"
                  name="branchName"
                  id="BranchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  placeholder="Enter Branch Name"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="PaymentDate" className="font-semibold my-2">
                  Payment Date
                </label>
                <input
                  type="date"
                  name="paymentDate"
                  id="PaymentDate"
                  value={formData.paymentDate}
                  onChange={handleChange}
                  placeholder="Enter Payment Date"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="ReceiptDate" className="font-semibold my-2">
                  Receipt Date
                </label>
                <input
                  type="date"
                  id="ReceiptDate"
                  name="receiptDate"
                  value={formData.receiptDate}
                  onChange={handleChange}
                  placeholder="Enter Receipt Date"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
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
                className="p-1 px-4 border-2 rounded-md text-white font-medium"
                style={{ background: themeColor }}
                onClick={handleSubmit}
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

export default CreateInvoiceReceipt;
