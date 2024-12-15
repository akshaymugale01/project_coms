import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaDownload, FaUpload } from "react-icons/fa";
import { BiFilterAlt } from "react-icons/bi";
// import InvoiceImportModal from "../containers/modals/InvoiceImportModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CAMBilling() {
  const themeColor = useSelector((state) => state.theme.color);
  const [billingPeriod, setBillingPeriod] = useState([null, null]);
  const [importModal, setImportModal] = useState(false);
  const [filter, setFilter] = useState(false);
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/cam-billing-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Flat",
      selector: (row, index) => row.flat,
      sortable: true,
    },
    {
      name: "Period",
      selector: (row) => row.period,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Due Date",
      selector: (row) => row.due_date,
      sortable: true,
    },
    {
      name: "Invoice No.",
      selector: (row) => row.invoice_no,
      sortable: true,
    },
    {
      name: "Amount Paid",
      selector: (row) => row.amount_paid,
      sortable: true,
    },
    {
      name: "Payment Status",
      selector: (row) => row.payment_status,
      sortable: true,
    },
    {
      name: "Mail sent",
      selector: (row) => row.mail_sent,
      sortable: true,
    },
    {
      name: "Recall",
      selector: (row) => row.recall,
      sortable: true,
    },
    {
      name: "Created On",
      selector: (row) => row.created_on,
      sortable: true,
    },
  ];

  const data = [
    {
      Id: 1,
      flat: "DG",
      period: "	01/01/2022 - 31/12/2022",
      amount: "100.0",
      due_date: "30/07/2022",
      invoice_no: "INV-4047",
      amount_paid: "0.00",
      payment_status: "Unpaid",
      mail_sent: "",
      recall: "",
      created_on: "30/11/2024",
    },
    {
      Id: 2,
      flat: "A1-102",
      period: "01/08/2023 - 31/10/2023",
      amount: "1140.00",
      due_date: "11/10/2023",
      invoice_no: "INV-4046",
      amount_paid: "0.00",
      payment_status: "Unpaid",
      mail_sent: "",
      recall: "",
      created_on: "01/10/2023",
    },
  ];

  const handleDateChange = (dates) => {
    const [start, end] = dates; // Destructure the selected start and end dates
    setBillingPeriod([start, end]); // Update the state
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex md:flex-row flex-col justify-between md:items-center my-2 gap-2  ">
          <input
            type="text"
            placeholder="Search By Invoice No, Payment Status"
            className=" p-2 md:w-96 border-gray-300 rounded-md placeholder:text-sm outline-none border "
          />
          <div className="md:flex grid grid-cols-2 sm:flex-row my-2 flex-col gap-2">
            <Link
              to={`/admin/add-cam-billing`}
              style={{ background: themeColor }}
              className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center"
            >
              <IoAddCircleOutline />
              Add
            </Link>
            <button
              className="font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              style={{ background: themeColor }}
              onClick={() => setImportModal(true)}
            >
              <FaUpload />
              Import
            </button>
            <button
              className="font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              style={{ background: themeColor }}
            >
              <FaDownload />
              Export
            </button>
            <button
              className=" font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              style={{ background: themeColor }}
              onClick={() => setFilter(!filter)}
            >
              <BiFilterAlt />
              Filter
            </button>
          </div>
        </div>
        {filter && (
          <div className="flex flex-col md:flex-row mt-1 items-center justify-center gap-2 my-3">
            <div className="flex flex-col">
              <select
                name="tower"
                id=" tower"
                className="border p-1 px-4 border-gray-500 rounded-md"
              >
                <option value="" disabled selected>
                  Select Tower
                </option>
                <option value="headOffice">Fm</option>
                <option value="vibe1">Vibe1</option>
                <option value="vibe2">Vibe2</option>
              </select>
            </div>
            <div className="flex flex-col">
              <select
                name="flat"
                id=" flat"
                className="border p-1 px-4 border-gray-500 rounded-md"
              >
                <option value="" selected>
                  Select Flat
                </option>
              </select>
            </div>
            <div className="flex flex-col">
              <select
                name="paymentStatus"
                className="border p-1 px-4 border-gray-500 rounded-md"
              >
                <option value="" selected>
                  Select Payment Status
                </option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="PartPayment">Part Payment</option>
              </select>
            </div>
            <div className="flex flex-col">
              <input
                type="date"
                name=""
                id="dateSupply"
                placeholder="Enter Date of supply"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <DatePicker
                selectsRange
                startDate={billingPeriod[0]} // Start date of the range
                endDate={billingPeriod[1]} // End date of the range
                onChange={handleDateChange} // Callback when dates are selected
                placeholderText="Select Billing Period"
                className="border p-1 px-4 border-gray-500 rounded-md w-full"
                isClearable // Optional: Allow clearing the selection
              />
            </div>
            <button
              className=" p-1 px-4 text-white rounded-md"
              style={{ background: themeColor }}
            >
              Apply
            </button>
            <button className="bg-red-400 p-1 px-4 text-white rounded-md">
              Reset
            </button>
          </div>
        )}
        <Table columns={columns} data={data} selectableRow={true} />
      </div>
      {importModal && (
        <InvoiceImportModal onclose={() => setImportModal(false)} />
      )}
    </section>
  );
}

export default CAMBilling;
