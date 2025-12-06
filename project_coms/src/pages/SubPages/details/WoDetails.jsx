import React from 'react'
import Navbar from '../../../components/Navbar'
import { MdOutlineEdit } from 'react-icons/md'
import { IoPrintSharp } from 'react-icons/io5'
import Table from '../../../components/table/Table'

const WoDetail = () => {
    const column = [
        { name: "S.No", selector: (row) => row.SNo, sortable: true },
        { name: "BOQ Details", selector: (row) => row.BOQDetails, sortable: true },
        { name: "Quantity", selector: (row) => row.Quantity, sortable: true },
        { name: "UOM", selector: (row) => row.UOM, sortable: true },
        { name: "Expected Date", selector: (row) => row.ExpectedDate, sortable: true },
        { name: "Product Description", selector: (row) => row.ProductDescription, sortable: true },
        { name: "Rate", selector: (row) => row.Rate, sortable: true },
        { name: "CGST", selector: (row) => row.CGST, sortable: true },
        { name: "SGST", selector: (row) => row.SGST, sortable: true },
        { name: "IGST", selector: (row) => row.IGST, sortable: true },
        { name: "TCS", selector: (row) => row.TCS, sortable: true },
        { name: "Tax Amount", selector: (row) => row.TaxAmount, sortable: true },
        { name: "Total Amount", selector: (row) => row.TotalAmount, sortable: true },
    ];
    const data = [
        {
          id: 1,
          SNo: "",
          BOQDetails: "",
          Quantity : " ",
          UOM : "",
          ExpectedDate : "",
          ProductDescription : "",
          Rate : "",
          CGST : "",
          SGST : "",
          IGST: "",
          TCS: "",
          TaxAmount: "",
          TotalAmount: "",
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
    const columnInvoicesDetails = [
        { name: "Action", selector: (row) => row.Action, sortable: true },
        { name: "ID", selector: (row) => row.ID, sortable: true },
        { name: "Invoice Number", selector: (row) => row.InvoiceNumber, sortable: true },
        { name: "Invoice Date", selector: (row) => row.InvoiceDate, sortable: true },
        { name: "Total Invoice Amount", selector: (row) => row.TotalInvoiceAmount, sortable: true },
        { name: "Payable Amount", selector: (row) => row.PayableAmount, sortable: true },
        { name: "Retention Amount", selector: (row) => row.RetentionAmount, sortable: true },
        { name: "TDS Amount", selector: (row) => row.TDSAmount, sortable: true },
        { name: "QC Amount", selector: (row) => row.QCAmount, sortable: true },
        { name: "W.O. Number	", selector: (row) => row.WoNumber	, sortable: true },
        { name: "Physical Invoice Sent to Accounts", selector: (row) => row.PhysicalInvoiceSenttoAccounts, sortable: true },
        { name: "Physical Invoice Received by Accounts", selector: (row) => row.PhysicalInvoiceReceivedbyAccounts, sortable: true },
        { name: "Days Passed", selector: (row) => row.DaysPassed, sortable: true },
        { name: "Amount Paid", selector: (row) => row.AmountPaid, sortable: true },
        { name: "Balance Amount", selector: (row) => row.BalanceAmount, sortable: true },
        { name: "Payment Status", selector: (row) => row.PaymentStatus, sortable: true },
        { name: "Aging", selector: (row) => row.Aging, sortable: true },
        { name: "Created On", selector: (row) => row.CreatedOn, sortable: true },
        { name: "Created By", selector: (row) => row.CreatedBy, sortable: true },
    ];
    const dataInvoicesDetails = [
        {
          id: 1,
          Action: "",
          ID: "",
          InvoiceNumber : "",
          InvoiceDate : "",
          TotalInvoiceAmount : "",
          PayableAmount : "",
          RetentionAmount : "",
          TDSAmount : "",
          QCAmount : "",
          WoNumber : "",
          PhysicalInvoiceSenttoAccounts: "",
          PhysicalInvoiceReceivedbyAccounts: "",
          DaysPassed: "",
          AmountPaid : "",
          BalanceAmount : "",
          PaymentStatus: "",
          Aging: "",
          CreatedOn: "",
          CreatedBy : "",
        },  
      ];
      const customStyleInvoicesDetails = {
        headRow: {
          style: {
            backgroundColor: "black",
            color: "white",

            fontSize: "14px",
          },
        },
      };
      const columnPaymentDetails = [
        { name: "Invoice ID", selector: (row) => row.InvoiceID, sortable: true },
        { name: "Amount", selector: (row) => row.Amount, sortable: true },
        { name: "Payment Mode", selector: (row) => row.PaymentMode, sortable: true },
        { name: "Transaction Number", selector: (row) => row.TransactionNumber, sortable: true },
        { name: "Status", selector: (row) => row.Status, sortable: true },
        { name: "Payment Date", selector: (row) => row.PaymentDate, sortable: true },
        { name: "Note", selector: (row) => row.Note, sortable: true },
        { name: "Date Of Entry", selector: (row) => row.DateOfEntry, sortable: true },
      ];
      const dataPaymentDetails = [
        {
          id: 1,
          InvoiceID: "",
          Amount: "",
          PaymentMode : "",
          TransactionNumber: "",
          Status : "",
          PaymentDate : "",
          Note : "",
          DateOfEntry : "",
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
          Amount : "",
          Description: "",
          ApprovedOn : "",
          ApprovedBy : "",
          Note : "",
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
    <section className=''>

        <div className=''>
            <div className='my-5'>
                <p  className='mx-5'>Work Order Work Order Details</p>
                <h2 className="text-xl font-semibold mx-5">
                  PURCHASE ORDER DETAILS
                </h2>
            </div>
            <div className='flex justify-end mr-5'>
              <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md mx-3'>
              <MdOutlineEdit />
             </button> 
             <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md mx-3'>
                 Clone
             </button>
             <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md mx-3'>
                 Print <IoPrintSharp />
             </button>
             <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md mx-3'>
                 Feeds
             </button>
             <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md mx-3'>
                 Add Invoice/SES
             </button>
             <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md mx-3'>
                 Debit/Credit Note
             </button>
             <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md mx-3'>
             <MdOutlineEdit />
             </button>
            </div>
           <div className="border-2 flex flex-col my-5 mx-3 p-4 gap-4 rounded-md border-gray-400">
                <h2 className=" text-lg border-black font-semibold text-center">
                EON 2
                </h2>
                <div className="my-5 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2">
                  <div className="grid grid-cols-2 items-center">
                    <p>Phone</p>
                    <p className="text-sm font-normal ">: NA</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Fax</p>
                    <p className="text-sm font-normal ">: NA</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Email</p>
                    <p className="text-sm font-normal ">: NA</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>GST</p>
                    <p className="text-sm font-normal ">: NA</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>PAN</p>
                    <p className="text-sm font-normal ">: NA</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Address</p>
                    <p className="text-sm font-normal ">: Eon Kharadi - Ph-II -Eon Kharadi Infrastructure, Village - Kharadi, Pune - 411014</p>
                  </div>
                </div>
                <h2 className="border-t text-lg py-5 border-black font-semibold text-center">
                   Work Order (Pending)
                </h2>
                <div className="my-5 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2">
                  <div className="grid grid-cols-2 items-center">
                    <p>WO Number </p>
                    <p className="text-sm font-normal ">: 6100000838</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Reference No. </p>
                    <p className="text-sm font-normal ">: 10168</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>WO Date </p>
                    <p className="text-sm font-normal ">: 28-06-23</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>ID </p>
                    <p className="text-sm font-normal ">: 949</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Plant Detail </p>
                    <p className="text-sm font-normal ">: 1050-s040-S040</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Kind Attention</p>
                    <p className="text-sm font-normal ">:</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Contractor </p>
                    <p className="text-sm font-normal ">: Safety Signs And Equipments Private</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Subject </p>
                    <p className="text-sm font-normal ">:</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Address</p>
                    <p className="text-sm font-normal ">: Pune</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Related To</p>
                    <p className="text-sm font-normal ">:</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Phone</p>
                    <p className="text-sm font-normal ">: 9309011538</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Payment Tenure(In Days)</p>
                    <p className="text-sm font-normal ">:</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Email</p>
                    <p className="text-sm font-normal ">: safetysigns.eqp@gmail.com</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Retention(%)</p>
                    <p className="text-sm font-normal ">:</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>GST</p>
                    <p className="text-sm font-normal ">: NA</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>TDS(%)</p>
                    <p className="text-sm font-normal ">:</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>PAN</p>
                    <p className="text-sm font-normal ">: ABGCS8181A</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>QC(%) </p>
                    <p className="text-sm font-normal ">:</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Work Category</p>
                    <p className="text-sm font-normal ">: NA</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Advance Amount</p>
                    <p className="text-sm font-normal ">: </p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p>Description</p>
                    <p className="text-sm font-normal ">: </p>
                  </div>
                </div>
                <div className='border-t py-5 border-black'>
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
                </div>
                <div className=" md:px-2 text-sm items-center font-medium grid gap-1 ">
                  <div className="flex justify-between items-center">
                    <p>Net Amount(INR):</p>
                    <p className="text-sm font-bold ">0.000</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Total Taxable Value Of WO :</p>
                    <p className="text-sm font-bold">0.000</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Taxes (INR):</p>
                     <p className="text-sm font-bold">0.000</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Total WO Value (INR):</p>
                     <p className="text-sm font-bold">0.00</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Taxes:Amount In Words: Zero Rupees Only</p>
                     <p className="text-sm font-bold"></p>
                  </div>
                </div>
                <div className='border-t py-5 border-black'>
                  <h3 className="text-lg font-semibold mx-5">
                    Terms & Conditions :
                  </h3> 
                  <p className="text-sm mx-10">NA</p>

                  <h3 className="text-base font-semibold mx-5 my-5">
                  For EON Kharadi Phase - 2 We Confirm & Accept,
                  </h3> 
                  <h3 className="text-base font-semibold mx-5 my-2">
                  PREPARED BY: Panchshil API
                  </h3> 
                  <p className="text-base font-semibold mx-5 my-2">
                  SIGNATURE:
                  </p>
                </div>
           </div>
           <div className='border-t py-5 border-black mx-5'>
                <h3 className="text-base font-semibold mx-5 ">
                Attachments
                </h3> 
                <p className="text-sm mx-5">No attachments</p>
           </div>
           <div className='border-t py-5 border-black mx-5'>
           <h3 className="text-base font-semibold mx-5 my-5 ">
              Invoices/SES Details
            </h3> 
                <Table
                  columns={columnInvoicesDetails}
                  data={dataInvoicesDetails}
                  customStyles={customStyleInvoicesDetails}
                  responsive
                  fixedHeader
                  fixedHeaderScrollHeight="500px"
                  pagination
                  selectableRowsHighlight
                  highlightOnHover
                  omitColumn={column}
                 />
            </div>
            <div className='border-t py-5 border-black mx-5'>
               <h3 className="text-base font-semibold mx-5 my-5 ">
                  Payment Details
               </h3>
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
            <div className='border-t py-5 border-black mx-5'>
               <h3 className="text-base font-semibold mx-5 my-5 ">
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
            </div>
    </section>
  )
}

export default WoDetail