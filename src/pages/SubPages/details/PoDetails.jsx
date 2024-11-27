import React from "react";
import { IoMdPrint } from "react-icons/io";
import { MdFeed } from "react-icons/md";
import Table from "../../../components/table/Table";
const PoDetails = () => {
  const column = [
    { name: "S.No", selector: (row) => row.SNo, sortable: true },
    { name: "Item Details", selector: (row) => row.ItemDetail, sortable: true },
    { name: "SAC/HSN Code", selector: (row) => row.SHCode, sortable: true },
    {
      name: "Expected Date",
      selector: (row) => row.ExpectedDate,
      sortable: true,
    },
    { name: "Quantity", selector: (row) => row.Quantity, sortable: true },
    { name: "Unit", selector: (row) => row.Unit, sortable: true },
    { name: "Rate", selector: (row) => row.Rate, sortable: true },
    { name: "QC Amount", selector: (row) => row.QCAmount, sortable: true },
    {
      name: "QC Outstanding",
      selector: (row) => row.QCOutstanding,
      sortable: true,
    },
    { name: "No of Grns", selector: (row) => row.NoOfGrns, sortable: true },
    {
      name: "Total Amount paid",
      selector: (row) => row.TotalAmountpaid,
      sortable: true,
    },
    { name: "Tax Amount", selector: (row) => row.TaxAmount, sortable: true },
    {
      name: "Total Amount",
      selector: (row) => row.TotalAmount,
      sortable: true,
    },
  ];
  const data = [
    {
      id: 1,
      SNo: 1,
      ItemDetail: "AER POCKET - FRESHNER",
      SHCode: "NA",
      ExpectedDate: "31/05/24",
      Quantity: "100.0",
      Unit: "",
      Rate: "1000.00",
      RetentionOutstanding: "",
      QCAmount: "",
      QCOutstanding: "",
      TotalAmountpaid: "",
      TaxAmount: "15000.00",
      TotalAmount: "100000.00",
    },
  ];
  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",

        fontSize: "14px",
      },
    },
  };

  const columnGRNDetails = [
    { name: "Action", selector: (row) => row.Action, sortable: true },
    { name: "ID", selector: (row) => row.ID, sortable: true },
    { name: "Inventory", selector: (row) => row.Inventory, sortable: true },
    { name: "Supplier", selector: (row) => row.Supplier, sortable: true },
    {
      name: "Invoice Number",
      selector: (row) => row.InvoiceNumber,
      sortable: true,
    },
    {
      name: "Total GRN Amount",
      selector: (row) => row.TotalGRNAmount,
      sortable: true,
    },
    {
      name: "Payable Amount",
      selector: (row) => row.PayableAmount,
      sortable: true,
    },
    {
      name: "Retention Amount",
      selector: (row) => row.RetentionAmount,
      sortable: true,
    },
    { name: "TDS Amount", selector: (row) => row.TDSAmount, sortable: true },
    { name: "QC Amount", selector: (row) => row.QCAmount, sortable: true },
    {
      name: "Invoice Date",
      selector: (row) => row.InvoiceDate,
      sortable: true,
    },
    {
      name: "Payment Mode",
      selector: (row) => row.PaymentMode,
      sortable: true,
    },
    {
      name: "Other Expense",
      selector: (row) => row.OtherExpense,
      sortable: true,
    },
    {
      name: "Loading Expense",
      selector: (row) => row.LoadingExpense,
      sortable: true,
    },
    {
      name: "Adjustment Amount",
      selector: (row) => row.AdjustmentAmount,
      sortable: true,
    },
    {
      name: "QC Approval Status",
      selector: (row) => row.QCApprovalStatus,
      sortable: true,
    },
    {
      name: "HSE Approval Status",
      selector: (row) => row.HSEApprovalStatus,
      sortable: true,
    },
    {
      name: "Admin Approval Status",
      selector: (row) => row.AdminApprovalStatus,
      sortable: true,
    },
    {
      name: "Physical Invoice Sent to Accounts",
      selector: (row) => row.PhysicalInvoiceSenttoAccounts,
      sortable: true,
    },
    {
      name: "Physical Invoice Received by Accounts",
      selector: (row) => row.PhysicalInvoiceReceivedbyAccounts,
      sortable: true,
    },
    { name: "Amount Paid", selector: (row) => row.AmountPaid, sortable: true },
    {
      name: "Payment Status",
      selector: (row) => row.PaymentStatus,
      sortable: true,
    },
    { name: "Created On", selector: (row) => row.CreatedOn, sortable: true },
    { name: "Created By", selector: (row) => row.CreatedBy, sortable: true },
  ];
  const dataGRNDetails = [
    {
      id: 1,
      Action: "",
      ID: "",
      Inventory: "",
      Supplier: "",
      InvoiceNumber: "",
      TotalGRNAmount: "",
      PayableAmount: "",
      RetentionAmount: "",
      TDSAmount: "",
      QCOutstanding: "",
      QCAmount: "",
      InvoiceDate: "",
      PaymentMode: "",
      OtherExpense: "",
      AdjustmentAmount: "",
      LoadingExpense: "",
      QCApprovalStatus: "",
      HSEApprovalStatus: "",
      AdminApprovalStatus: "",
      PhysicalInvoiceSenttoAccounts: "",
      PhysicalInvoiceReceivedbyAccounts: "",
      AmountPaid: "",
      PaymentStatus: "",
      CreatedOn: "",
      CreatedBy: "",
    },
  ];
  const customStyleGRNDetails = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",

        fontSize: "14px",
      },
    },
  };
  const columnPaymentDetails = [
    { name: "GRN ID", selector: (row) => row.GRNID, sortable: true },
    { name: "Amount", selector: (row) => row.Amount, sortable: true },
    {
      name: "Payment Mode",
      selector: (row) => row.PaymentMode,
      sortable: true,
    },
    {
      name: "Transaction Number",
      selector: (row) => row.TransactionNumber,
      sortable: true,
    },
    { name: "Status", selector: (row) => row.Status, sortable: true },
    {
      name: "Payment Date",
      selector: (row) => row.PaymentDate,
      sortable: true,
    },
    { name: "Note", selector: (row) => row.Note, sortable: true },
    {
      name: "Date Of Entry",
      selector: (row) => row.DateOfEntry,
      sortable: true,
    },
  ];
  const dataPaymentDetails = [
    {
      id: 1,
      GRNID: "",
      Amount: "",
      PaymentMode: "",
      TransactionNumber: "",
      Status: "",
      PaymentDate: "",
      Note: "",
      DateOfEntry: "",
    },
  ];
  const customStylePaymentDetails = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",

        fontSize: "14px",
      },
    },
  };
  const columnDebitCreditDetails = [
    { name: " ID", selector: (row) => row.ID, sortable: true },
    { name: "Type", selector: (row) => row.Type, sortable: true },
    { name: "Amount", selector: (row) => row.Amount, sortable: true },
    { name: "Description", selector: (row) => row.Description, sortable: true },
    { name: "Approved", selector: (row) => row.Approved, sortable: true },
    { name: "Approved On", selector: (row) => row.ApprovedOn, sortable: true },
    { name: "Approved By", selector: (row) => row.ApprovedBy, sortable: true },
    { name: "Created On", selector: (row) => row.CreatedOn, sortable: true },
    { name: "Created By", selector: (row) => row.CreatedBy, sortable: true },
    { name: "Attachment", selector: (row) => row.Attachment, sortable: true },
  ];
  const dataDebitCreditDetails = [
    {
      id: 1,
      ID: "",
      Type: "",
      Amount: "",
      Description: "",
      ApprovedOn: "",
      ApprovedBy: "",
      Note: "",
      CreatedOn: "",
      CreatedBy: "",
      Attachment: "",
    },
  ];
  const customStyleDebitCreditDetails = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",

        fontSize: "14px",
      },
    },
  };
  return (
    <section>
      <h2 className="text-xl font-semibold mx-5">PURCHASE ORDER DETAILS</h2>
      <div className="flex gap-3 my-3 mx-5 flex-wrap">
        <p>Level 1 Approval :</p>
        <button className="bg-orange-400 px-2 py-1 rounded-md">Pending</button>
        <p>Level 2 Approval :</p>
        <button className="bg-orange-400 px-2 py-1 rounded-md">Pending</button>
        <p>Level 3 Approval :</p>
        <button className="bg-orange-400 px-2 py-1 rounded-md">Pending</button>
        <p>Level 4 Approval :</p>
        <button className="bg-orange-400 px-2 py-1 rounded-md">Pending</button>
      </div>
      <div className="flex justify-end mr-5">
        <button className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md mx-3">
          <MdFeed />
          feeds
        </button>
        <button className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md">
          <IoMdPrint />
          Print
        </button>
      </div>
      <div className="border-2 flex flex-col my-5 mx-3 p-4 gap-4 rounded-md border-gray-400">
        <h2 className=" text-lg border-black font-semibold text-center">
          Business Bay
        </h2>
        <div className="my-5 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2">
          <div className="grid grid-cols-2 items-center">
            <p>Phone </p>
            <p className="text-sm font-normal ">: 5566884455</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Fax </p>
            <p className="text-sm font-normal">: 15656153</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Email </p>
            <p className="text-sm font-normal">: business@gmail.com</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>GST </p>
            <p className="text-sm font-normal">: 255651651213</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>PAN </p>
            <p className="text-sm font-normal">: AKSPI5656L</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Address</p>
            <p className="text-sm font-normal">: Pune, Maharashtra</p>
          </div>
        </div>
        <h2 className="border-t text-lg py-5 border-black font-semibold text-center">
          Purchase Order
        </h2>
        <div className="my-5 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2">
          <div className="grid grid-cols-2 items-center">
            <p>PO No. </p>
            <p className="text-sm font-normal ">:</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Reference No. </p>
            <p className="text-sm font-normal">: 12351</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>PO Date </p>
            <p className="text-sm font-normal">: 29-05-24</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>ID </p>
            <p className="text-sm font-normal">: 5972</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Plant Detail </p>
            <p className="text-sm font-normal">: 1050-S1101-S1101</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Supplier </p>
            <p className="text-sm font-normal">: Ghaffar Industries pvt.ltd.</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Address </p>
            <p className="text-sm font-normal">
              : Andheri west, Dn Nagar, Pune - 4300012, Maharshtra - India
            </p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Phone </p>
            <p className="text-sm font-normal">: NA</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Email </p>
            <p className="text-sm font-normal">: mp0573@gmail.com</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>GST </p>
            <p className="text-sm font-normal">: NA</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>PAN </p>
            <p className="text-sm font-normal">:NA</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Delivery Address </p>
            <p className="text-sm font-normal">
              : Business Bay Pune, Maharashtra
            </p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Phone </p>
            <p className="text-sm font-normal">: 5566884455</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Email </p>
            <p className="text-sm font-normal">: business@gmail.com</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Related To </p>
            <p className="text-sm font-normal">:</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Payment Tenure(In Days) </p>
            <p className="text-sm font-normal">:</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Retention(%) </p>
            <p className="text-sm font-normal">:</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>TDS(%) </p>
            <p className="text-sm font-normal">:</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>QC(%) </p>
            <p className="text-sm font-normal">:</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p>Advance Amount </p>
            <p className="text-sm font-normal">:</p>
          </div>
        </div>
        <div className="border-t py-5 border-black"></div>
        <Table
          columns={column}
          data={data}
          customStyles={customStyle}
          responsive
          fixedHeader
          fixedHeaderScrollHeight="500px"
          pagination
          selectableRowsHighlight
          highlightOnHover
          omitColumn={column}
        />
        <div className="my-5 md:px-2 text-sm items-center font-medium grid gap-1 ">
          <div className="flex justify-between items-center">
            <p>Net Amount(INR):</p>
            <p className="text-sm font-bold ">100000.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Gross Amount:</p>
            <p className="text-sm font-bold">100000.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Taxes:</p>
            <p className="text-sm font-bold">15000.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Net Invoice Amount:</p>
            <p className="text-sm font-bold">115000.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Amount In Words: One Lakh, Fifteen Thousand Rupees Only</p>
            <p className="text-sm font-normal"></p>
          </div>
        </div>
        <div className="border-t py-3 border-black"></div>
        <div className="">
          <p className="text-sm font-bold">Notes:</p>
          <p className="px-4"> 1 . Offlice address</p>
        </div>
        <div className="">
          <p className="text-sm font-bold">Terms & Conditions:</p>
          <p className="px-4"> 1 . test</p>
        </div>
        <div className="border-t py-3 border-black"></div>
        <p className="text-xg font-semibold mx-5">
          For Business Bay we Confirm & Accept,
        </p>
        <div className="border-t py-3 border-black">
          <p className="text-xg font-semibold mx-5 ">Authorised Signatory</p>
        </div>
      </div>

      <div className="border-t py-5 mx-5 border-black">
        <p className="text-md font-semibold">Attachments</p>
        <p className="text-sm">No attachments</p>
      </div>
      <div className="border-t py-5 mx-5 border-black">
        <h3 className="text-md font-semibold my-3">GRN Details</h3>
        <Table
          columns={columnGRNDetails}
          data={dataGRNDetails}
          customStyles={customStyleGRNDetails}
          responsive
          fixedHeader
          fixedHeaderScrollHeight="500px"
          pagination
          selectableRowsHighlight
          highlightOnHover
          omitColumn={column}
        />
      </div>
      <div className="border-t py-5 mx-5 border-black">
        <h3 className="text-md font-semibold my-3">Payment Details</h3>
        <Table
          columns={columnPaymentDetails}
          data={dataPaymentDetails}
          customStyles={customStylePaymentDetails}
          responsive
          fixedHeader
          fixedHeaderScrollHeight="500px"
          pagination
          selectableRowsHighlight
          highlightOnHover
          omitColumn={column}
        />
      </div>
      <div className="border-t py-5 mx-5 border-black">
        <h3 className="text-md font-semibold my-3">
          Debit/Credit Note Details
        </h3>
        <Table
          columns={columnDebitCreditDetails}
          data={dataDebitCreditDetails}
          customStyles={customStyleDebitCreditDetails}
          responsive
          fixedHeader
          fixedHeaderScrollHeight="500px"
          pagination
          selectableRowsHighlight
          highlightOnHover
          omitColumn={column}
        />
      </div>
    </section>
  );
};

export default PoDetails;
