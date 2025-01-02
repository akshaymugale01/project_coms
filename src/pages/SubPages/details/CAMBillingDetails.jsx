import React, { useState } from "react";
import { IoPrintOutline } from "react-icons/io5";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import { FaDownload, FaRegFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Table from "../../../components/table/Table";
import RecallInvoiceModal from "../../../containers/modals/RecallInvoiceModal";
import CAMBillInvoiceReceivePaymentModal from "../../../containers/modals/CAMBillInvoiceReceivePaymentModal";
import CAMBillingPaymentStatusModal from "../../../containers/modals/CAMBillingPaymentStatusModal";

function CAMBillingDetails() {
  const themeColor = useSelector((state) => state.theme.color);
  const [recallModal, setRecallModal] = useState(false);
  const [receivePayment, setReceivePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  // const columns = [
  //   {
  //     name: "S.N.",
  //     selector: (row, index) => row.sn,
  //     sortable: true,
  //   },
  //   {
  //     name: "Description",
  //     selector: (row) => row.description,
  //     sortable: true,
  //   },
  //   {
  //     name: "SAC/HSN Code",
  //     selector: (row) => row.SACHSNCode,
  //     sortable: true,
  //   },
  //   {
  //     name: "Qty",
  //     selector: (row) => row.qty,
  //     sortable: true,
  //   },
  //   {
  //     name: "Unit",
  //     selector: (row) => row.unit,
  //     sortable: true,
  //   },
  //   {
  //     name: "Rate",
  //     selector: (row) => row.rate,
  //     sortable: true,
  //   },
  //   {
  //     name: "Total Value",
  //     selector: (row) => row.total_value,
  //     sortable: true,
  //   },
  //   {
  //     name: "Discount/Percentage",
  //     selector: (row) => row.percentage,
  //     sortable: true,
  //   },
  //   {
  //     name: "Discount/Amount",
  //     selector: (row) => row.amount,
  //     sortable: true,
  //   },
  //   {
  //     name: "Taxable Value",
  //     selector: (row) => row.taxable_value,
  //     sortable: true,
  //   },
  //   {
  //     name: "CGST Rate",
  //     selector: (row) => row.cgst_rate,
  //     sortable: true,
  //   },
  //   {
  //     name: "CGST Amount",
  //     selector: (row) => row.cgst_amount,
  //     sortable: true,
  //   },
  //   {
  //     name: "SGST Rate",
  //     selector: (row) => row.sgst_rate,
  //     sortable: true,
  //   },
  //   {
  //     name: "SGST Amount",
  //     selector: (row) => row.sgst_amount,
  //     sortable: true,
  //   },
  //   {
  //     name: "IGST Rate",
  //     selector: (row) => row.igst_rate,
  //     sortable: true,
  //   },
  //   {
  //     name: "IGST Amount",
  //     selector: (row) => row.igst_amount,
  //     sortable: true,
  //   },
  // ];

  // const data = [
  //   {
  //     Id: 1,
  //     sn: "1",
  //     description: "good",
  //     SACHSNCode: "HASN",
  //     qty: "5",
  //     unit: "1",
  //     rate: "10",
  //     total_value: "50",
  //     percentage: "5%",
  //     amount: "2.5",
  //     taxable_value: "47.5",
  //     cgst_rate: "10.0%",
  //     cgst_amount: "32",
  //     sgst_rate: "2%",
  //     sgst_amount: "20",
  //     igst_rate: "5%",
  //     igst_amount: "20",
  //   },
  //   {
  //     Id: 2,
  //     sn: "2",
  //     description: "good",
  //     SACHSNCode: "HASN",
  //     qty: "10",
  //     unit: "2",
  //     rate: "5",
  //     total_value: "50",
  //     percentage: "10%",
  //     amount: "5",
  //     taxable_value: "45",
  //     cgst_rate: "8.0%",
  //     cgst_amount: "30",
  //     sgst_rate: "3%",
  //     sgst_amount: "10",
  //     igst_rate: "2%",
  //     igst_amount: "10",
  //   },
  // ];

  const columns = [
    { name: "S.N.", key: "sn" },
    { name: "Description Of Service/Goods", key: "description" },
    { name: "SAC/HSN Code", key: "SACHSNCode" },
    { name: "Qty", key: "qty" },
    { name: "Unit", key: "unit" },
    { name: "Rate", key: "rate" },
    { name: "Total Value", key: "total_value" },
    { name: "Discount/Rebate", key: "percentage" },
    { name: "Taxable Value", key: "taxable_value" },
    { name: "CGST Rate", key: "cgst_rate" },
    { name: "CGST Amount", key: "cgst_amount" },
    { name: "SGST Rate", key: "sgst_rate" },
    { name: "SGST Amount", key: "sgst_amount" },
    { name: "IGST Rate", key: "igst_rate" },
    { name: "IGST Amount", key: "igst_amount" },
  ];

  const data = [
    {
      sn: "1",
      description: "Good",
      SACHSNCode: "Jsjhsd",
      qty: "6.0",
      unit: "2.0",
      rate: "3.0",
      total_value: "2376.0",
      percentage: "38768.0",
      taxable_value: "8787.00",
      cgst_rate: "8.0%",
      cgst_amount: "98.00",
      sgst_rate: "8.0%",
      sgst_amount: "88.00",
      igst_rate: "0.0%",
      igst_amount: "0.00",
    },
    {
      sn: "2",
      description: "Ravindra",
      SACHSNCode: "Duygis",
      qty: "5.0",
      unit: "7.0",
      rate: "79.0",
      total_value: "98.00",
      percentage: "65.0",
      taxable_value: "2474.00",
      cgst_rate: "6.0%",
      cgst_amount: "78.00",
      sgst_rate: "6.0%",
      sgst_amount: "7.00",
      igst_rate: "0.0%",
      igst_amount: "0.00",
    },
  ];
  const columnsPaymentDetails = [
    {
      name: "Previous Amount Due",
      selector: (row, index) => row.previous_amount_due,
      sortable: true,
    },
    {
      name: "Current Charges",
      selector: (row) => row.current_charges,
      sortable: true,
    },
    {
      name: "Interest Amt on previous dues",
      selector: (row) => row.interest,
      sortable: true,
    },
    {
      name: "Total Amount Due",
      selector: (row) => row.total_amount_due,
      sortable: true,
    },
    {
      name: "Due Date",
      selector: (row) => row.due_date,
      sortable: true,
    },
  ];

  const dataPaymentDetails = [
    {
      Id: 1,
      previous_amount_due: "1000.00	",
      current_charges: "460.00",
      interest: "200.00",
      total_amount_due: "1660.00",
      due_date: "07.10.2023",
    },
  ];

  const columnsReceipts = [
    {
      name: "Receipt No.",
      selector: (row, index) => row.receipt_no,
      sortable: true,
    },
    {
      name: "Invoice No.",
      selector: (row) => row.invoice_no,
      sortable: true,
    },
    {
      name: "Flat",
      selector: (row) => row.flat,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customer_name,
      sortable: true,
    },
    {
      name: "Amount Received",
      selector: (row) => row.amount_received,
      sortable: true,
    },
    {
      name: "Payment Mode",
      selector: (row) => row.payment_mode,
      sortable: true,
    },
    {
      name: "Transaction Number",
      selector: (row) => row.transaction_number,
      sortable: true,
    },
    {
      name: "Payment Date",
      selector: (row) => row.payment_date,
      sortable: true,
    },
    {
      name: "Receipt Date",
      selector: (row) => row.receipt_date,
      sortable: true,
    },
    {
      name: "Mail sent",
      selector: (row) => row.mail_sent,
      sortable: true,
    },
    {
      name: "Attachments",
      selector: (row) => (
        <div>
          <button>
            <FaRegFileAlt />
          </button>
        </div>
      ),
      sortable: true,
    },
  ];

  const dataReceipts = [
    {
      Id: 1,
      receipt_no: "1235",
      invoice_no: "#IN92893283",
      flat: "A1-101",
      customer_name: "Ramesh Pal",
      amount_received: "₹ 1000.0",
      payment_mode: "cash",
      transaction_number: "CHK07001",
      payment_date: "11/10/2024",
      receipt_date: "12/10/2024",
      mail_sent: "10/10/2024 12:18 PM",
    },
  ];

  const columnsTransaction = [
    {
      name: "Date",
      selector: (row, index) => row.date,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Payment Mode",
      selector: (row) => row.payment_mode,
      sortable: true,
    },
    {
      name: "Transaction Number",
      selector: (row) => row.transaction_number,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => row.image,
      sortable: true,
    },
  ];

  const dataTransaction = [
    {
      Id: 1,
      date: "20/04/2024",
      amount: "460.00",
      payment_mode: "Online",
      transaction_number: "7444196469",
      image: "",
    },
  ];
  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex flex-col overflow-hidden">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10"
        >
          Add CAM Billing
        </h2>
        <div className="flex justify-end mx-5">
          <div className="md:flex grid grid-cols-2 sm:flex-row flex-col gap-2">
            <button
              className="font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              style={{ background: themeColor }}
              onClick={() => setRecallModal(true)}
            >
              Recall
            </button>
            <Link
              to={`/admin/create-invoice-receipt`}
              style={{ background: themeColor }}
              className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center"
            >
              Create Invoice Receipt
            </Link>
            <button
              className="font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              style={{ background: themeColor }}
              onClick={() => setReceivePayment(true)}
            >
              Receive Payment
            </button>
            <button
              className="font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              style={{ background: themeColor }}
              onClick={() => setPaymentStatus(true)}
            >
              Paid
            </button>
            <button
              className="font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              style={{ background: themeColor }}
            >
              <FaDownload />
              Download Invoice
            </button>
            <button
              className=" font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              style={{ background: themeColor }}
            >
              <IoPrintOutline />
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 mx-5 my-5">
          <div className="space-y-2">
            <h2 className="bg-black text-white p-2 px-5 w-fit rounded-md">
              Unpaid
            </h2>
            <div className="">
              <img src="/building.jpg" className="w-60 h-40 rounded-md"></img>
            </div>
          </div>
          <div className="my-5">
            <h2 className="font-bold text-lg">Jyoti Tower</h2>
            <p className="font-semibold">G - 205, AB road. Andheri</p>
            <p className="font-semibold">Tel : Fax: E-mail:</p>
          </div>
        </div>
        <div className="mx-5">
          <h2 className="border-b  text-xl border-black font-semibold">
            Tax invoice
          </h2>
          <div className="my-5 md:px-5 text-sm font-medium grid gap-4 md:grid-cols-2 md:divide-x-2 divide-black">
            <div className="space-y-2 px-5">
              <div className="grid grid-cols-2">
                <p>GSTIN : </p>
                <p className="text-sm font-normal">JY09192121</p>
              </div>
              <div className="grid grid-cols-2">
                <p>PAN : </p>
                <p className="text-sm font-normal"></p>
              </div>
              <div className="grid grid-cols-2">
                <p>Consecutive Serial No : </p>
                <p className="text-sm font-normal">tr</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Customer Code : </p>
                <p className="text-sm font-normal"></p>
              </div>
            </div>
            <div className="space-y-2 px-5">
              <div className="grid grid-cols-2">
                <p>Date of Supply : </p>
                <p className="text-sm font-normal">09.12.2024</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Billing Period: : </p>
                <p className="text-sm font-normal">01.01.2024 to 31.12.2024</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Place of Supply/Delivery : </p>
                <p className="text-sm font-normal">MAHARASHTRA</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-5">
          <h2 className="border-b  text-xl border-black font-semibold">
            Details of Receiver of supply:
          </h2>
          <div className="my-5 md:px-5 text-sm font-medium grid gap-4 md:grid-cols-2 md:divide-x-2 divide-black">
            <div className="space-y-2 px-5">
              <div className="grid grid-cols-2">
                <p>Name : </p>
                <p className="text-sm font-normal">Karan Gupta </p>
              </div>
              <div className="grid grid-cols-2">
                <p>Address : </p>
                <p className="text-sm font-normal">
                  A-1 Lockated Demo, 2nd Floor, Jyothi Tower, Opposite Versova
                  Police Station,
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>PAN : </p>
                <p className="text-sm font-normal"></p>
              </div>
              <div className="grid grid-cols-2">
                <p>State : </p>
                <p className="text-sm font-normal">MAHARASHTRA</p>
              </div>
              <div className="grid grid-cols-2">
                <p>State Code : </p>
                <p className="text-sm font-normal">27</p>
              </div>
              <div className="grid grid-cols-2">
                <p>GSTIN/ Unique ID : </p>
                <p className="text-sm font-normal">sdf22134532</p>
              </div>
            </div>
            <div className="space-y-2 px-5">
              <div className="grid grid-cols-2">
                <p>Basis : </p>
                <p className="text-sm font-normal">Adhoc Billing</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Date of Possession : </p>
                <p className="text-sm font-normal">15/11/2020</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 mx-5">
          <div className="overflow-x-auto rounded-md">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr style={{ background: themeColor }}>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-left text-sm text-white"
                    >
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className="border border-gray-300 px-4 py-2 text-sm text-black"
                      >
                        {row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-2 text-sm font-bold text-right text-gray-800"
                  >
                    Total Invoice Value (In Figure): 2745.00
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-2 text-sm font-bold text-right text-gray-800"
                  >
                    Total Amount Due (In Figure): 2905.00
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-2 text-sm font-bold text-right text-gray-800"
                  >
                    Total Amount (In Words): Rupees Two Thousand, Nine Hundred,
                    Five Only
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="mx-5 border-b  text-xl border-black font-semibold">
          <h2 className="border-b  text-xl border-black font-semibold"></h2>
          <div className="my-5 md:px-5 text-sm font-medium grid gap-4 md:grid-cols-2 md:divide-x-2 divide-black">
            <div className="space-y-2 px-5">
              <div className="grid grid-cols-2">
                <p>
                  Certified that the Particulars given above are true and
                  correct and the amount indicated. :{" "}
                </p>
                <p className="text-sm font-normal"></p>
              </div>
              <div className="grid grid-cols-2">
                <p>Bank Details : </p>
                <p className="text-sm font-normal"></p>
              </div>
              <div className="grid grid-cols-2">
                <p>A/C Name : </p>
                <p className="text-sm font-normal"></p>
              </div>
              <div className="grid grid-cols-2">
                <p>A/C No : </p>
                <p className="text-sm font-normal"></p>
              </div>
              <div className="grid grid-cols-2">
                <p>Bank & Branch : </p>
                <p className="text-sm font-normal"></p>
              </div>
              <div className="grid grid-cols-2">
                <p>IFSC : </p>
                <p className="text-sm font-normal"></p>
              </div>
            </div>
            <div className="space-y-2 px-5">
              <div className="grid grid-cols-2">
                <p>Authorized Signatory : </p>
                <p className="text-sm font-normal"></p>
                <div className="my-5">
                  <img
                    src="/signature.jpg"
                    className="w-60 h-40 rounded-md"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-5 border-b  text-xl border-black font-semibold">
          <h2 className="border-b  text-xl border-black font-semibold"></h2>
          <div className="grid grid-cols-1 my-5">
            <p>Note : </p>
            <p className="text-sm font-normal">Demo</p>
          </div>
        </div>
        <div className="my-5 mx-5">
          <Table columns={columnsPaymentDetails} data={dataPaymentDetails} />
        </div>
        <div className="my-5 mx-5">
          <h2 className="">Transaction details for this invoice</h2>
          <Table columns={columnsTransaction} data={dataTransaction} />
        </div>
        <div className="my-5 mx-5">
          <h2 className="">Imported Receipts</h2>
          <Table columns={columnsReceipts} data={dataReceipts} />
        </div>
      </div>
      {recallModal && (
        <RecallInvoiceModal onclose={() => setRecallModal(false)} />
      )}
      {receivePayment && (
        <CAMBillInvoiceReceivePaymentModal
          onclose={() => setReceivePayment(false)}
        />
      )}
      {paymentStatus && (
        <CAMBillingPaymentStatusModal onclose={() => setPaymentStatus(false)} />
      )}
    </section>
  );
}

export default CAMBillingDetails;
