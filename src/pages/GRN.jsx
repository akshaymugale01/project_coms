import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BiFilterAlt } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Table from "../components/table/Table";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import { getGRN } from "../api";

function GRN() {
  const [filter, setFilter] = useState(false);
  const [grns, setGrns] = useState([]);

  useEffect(() => {
    const fetchGRN = async () => {
      try {
        const resp = await getGRN();
        setGrns(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGRN();
  }, []);
  const column = [
    {
      name: "view",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/grn-detail/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },

    { name: "Id", selector: (row) => row.Id, sortable: true },
    { name: "Inventory", selector: (row) => row.Inventory, sortable: true },
    { name: "Supplier", selector: (row) => row.Supplier, sortable: true },
    {
      name: "Invoice Number",
      selector: (row) => row.invoice_number,
      sortable: true,
    },
    {
      name: "Reference No",
      selector: (row) => row.ReferenceNo,
      sortable: true,
    },
    { name: "P.O. Number", selector: (row) => row.PONumber, sortable: true },
    {
      name: "P.O Reference Number",
      selector: (row) => row.POReferenceNumber,
      sortable: true,
    },
    {
      name: "Approved Status",
      selector: (row) => row.ApprovedStatus,
      sortable: true,
    },
    {
      name: "Last Approved By",
      selector: (row) => row.LastApprovedBy,
      sortable: true,
    },
    { name: "PO Amount", selector: (row) => row.POAmount, sortable: true },
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
      name: "Invoice Date	",
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
      name: "Loading Expense	",
      selector: (row) => row.LoadingExpense,
      sortable: true,
    },
    {
      name: "Adjustment Amount",
      selector: (row) => row.AdjustmentAmount,
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
    { name: "Days Passed", selector: (row) => row.DaysPassed, sortable: true },
    { name: "Amount Paid", selector: (row) => row.AmountPaid, sortable: true },
    {
      name: "Balance Amount",
      selector: (row) => row.BalanceAmount,
      sortable: true,
    },
    {
      name: "Payment Status",
      selector: (row) => row.PaymentStatus,
      sortable: true,
    },
    { name: "Aging", selector: (row) => row.Aging, sortable: true },
    { name: "Created On", selector: (row) => row.CreatedOn, sortable: true },
    { name: "Created By", selector: (row) => row.CreatedBy, sortable: true },
  ];

  const data = [
    {
      id: 1,
      Id: 3386,
      Inventory: "HI SPEE...",
      Supplier: "Bharat Service Centre",
      InvoiceNumber: "340",
      ReferenceNo: "5000044129",
      PONumber: "4500002676",
      POReferenceNumber: " 12241",
      ApprovedStatus: "Approved ",
      LastApprovedBy: "SUSHMA PADALE ",
      POAmount: " 90290.0",
      TotalGRNAmount: "90290.0 ",
      PayableAmount: "90290.0",
      RetentionAmount: " 0.0",
      TDSAmount: "0.0 ",
      QCAmount: "0.0 ",
      InvoiceDate: " 15/05/24",
      PaymentMode: " ",
      OtherExpense: " ",
      LoadingExpense: " ",
      AdjustmentAmount: "",
      PhysicalInvoiceSenttoAccounts: "No",
      PhysicalInvoiceReceivedbyAccounts: "No",
      DaysPassed: "",
      AmountPaid: "0.0",
      BalanceAmount: "90290.0",
      PaymentStatus: "Unpaid",
      Aging: "7 Days",
      CreatedOn: "24/ 05/2024",
      CreatedBy: "TUSHAR BONDRE",
      action: <BsEye />,
    },
    {
      id: 2,
      Id: 3360,
      Inventory: "GREASE,...",
      Supplier: "Mukesh Trading Company",
      InvoiceNumber: "160",
      ReferenceNo: "5000043707",
      PONumber: "4500002529",
      POReferenceNumber: " 12133",
      ApprovedStatus: "Approved ",
      LastApprovedBy: "SUSHMA PADALE ",
      POAmount: " 82952.82	",
      TotalGRNAmount: "82952.82 ",
      PayableAmount: "12653.82",
      RetentionAmount: " 0.0",
      TDSAmount: "0.0 ",
      QCAmount: "0.0 ",
      InvoiceDate: " 14/05/24",
      PaymentMode: " ",
      OtherExpense: " ",
      LoadingExpense: " ",
      AdjustmentAmount: "70299.0",
      PhysicalInvoiceSenttoAccounts: "No",
      PhysicalInvoiceReceivedbyAccounts: "No",
      DaysPassed: "",
      AmountPaid: "0.0",
      BalanceAmount: "82952.82",
      PaymentStatus: "Unpaid",
      Aging: "8 Days",
      CreatedOn: "23/ 05/2024",
      CreatedBy: "Aniruddha Mane",
      action: <BsEye />,
    },
    {
      id: 3,
      Id: 3352,
      Inventory: "DIGITAL...",
      Supplier: "Pelican Telecom Private Limited",
      InvoiceNumber: "J-0237",
      ReferenceNo: "5000043664",
      PONumber: "4500002470",
      POReferenceNumber: " 12086",
      ApprovedStatus: "Approved ",
      LastApprovedBy: "SUSHMA PADALE ",
      POAmount: "12744.0",
      TotalGRNAmount: "12744.0",
      PayableAmount: "12744.0",
      RetentionAmount: " 0.0",
      TDSAmount: "0.0 ",
      QCAmount: "0.0 ",
      InvoiceDate: " 06/05/24	",
      PaymentMode: " ",
      OtherExpense: " ",
      LoadingExpense: " ",
      AdjustmentAmount: "70299.0",
      PhysicalInvoiceSenttoAccounts: "No",
      PhysicalInvoiceReceivedbyAccounts: "No",
      DaysPassed: "",
      AmountPaid: "0.0",
      BalanceAmount: "12744.0",
      PaymentStatus: "Unpaid",
      Aging: "9 Days",
      CreatedOn: "22/ 05/2024",
      CreatedBy: "SANDIP CHITTE",
      action: <BsEye />,
    },
  ];
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <section className="flex">
      {/* <Navbar /> */}
      <div className="w-full  flex flex-col overflow-hidden">
        <div>
          {filter && (
            <div className='className="flex flex-col md:flex-row  items-center justify-center gap-2'>
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Search By PR Number"
                  className="border-2 p-2 w-70 border-gray-300 rounded-lg mx-2 "
                />

                <input
                  type="text"
                  placeholder="Search By PO Number"
                  className="border-2 p-2 w-70 border-gray-300 rounded-lg mx-2"
                />
                <input
                  type="text"
                  placeholder="Supplier Name"
                  className="border-2 p-2 w-70 border-gray-300 rounded-lg mx-2"
                />

                <button
                  className="bg-black p-1 px-5 py-2 text-white rounded-md"
                  style={{ background: themeColor }}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
          <div className="flex  md:flex-row gap-2 justify-between w-full my-2">
            <div>
              <input
                type="text"
                placeholder="search"
                className="border-2 p-2  border-gray-300 rounded-lg  w-96"
              />
            </div>
            <div className="flex flex-col sm:flex-row md:justify-between  gap-2 ">
              <Link
                to="/admin/add-grn"
                style={{ background: themeColor }}
                className=" font-semibold text-white px-4 p-1 flex gap-2 items-center rounded-md"
              >
                <IoMdAdd /> Add
              </Link>

              <button
                className=" font-semibold text-white px-4 p-1 flex gap-2 items-center rounded-md"
                onClick={() => setFilter(!filter)}
                style={{ background: themeColor }}
              >
                <BiFilterAlt />
                Filter
              </button>
            </div>
          </div>
        </div>
        <Table columns={column} data={grns} isPagination={true} />
      </div>
    </section>
  );
}

export default GRN;
