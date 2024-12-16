import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import FileInputBox from "../../../containers/Inputs/FileInputBox";
import { Switch } from "../../../Buttons";
import Table from "../../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddInvoiceSetupModal from "./AddInvoiceSetupModal";
import EditInvoiceSetupModal from "./EditInvoiceSetupModal";
// import { id } from "date-fns/esm/locale";

function BillingSetup() {
  const [invoiceOption, setInvoiceOption] = useState("invoiceAuto");
  const [receiptOption, setReceiptOption] = useState("receiptAuto");
  const [addInvoiceModal, setAddInvoiceModal] = useState(false);
  const [editInvoiceModal, setEditInvoiceModal] = useState(false);
  const themeColor = useSelector((state) => state.theme.color);
  const handleChange = (event) => {
    setInvoiceOption(event.target.value);
  };

  const handleChangeReceiptOption = (event) => {
    setReceiptOption(event.target.value);
  };

  const columns = [
    {
      name: "Id",
      selector: (row, index) => row.Id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: "	Invoice Type",
    //   selector: (row) => row.invoice_Type,
    //   sortable: true,
    // },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => setEditInvoiceModal(true)}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      Id: 1,
      name: "CAM",
      // invoice_Type: "CAM",
    },
  ];

  const addressColumns = [
    {
      name: "Id",
      selector: (row, index) => row.Id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Organization",
      selector: (row) => row.organization,
      sortable: true,
    },
    {
      name: " Registration No",
      selector: (row) => row. registration_no,
      sortable: true,
    },
    {
      name: "GST.No",
      selector: (row) => row. gst_no,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row. address,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/edit-billing-address/${row.id}`}>
            <BiEdit size={15} />
          </Link>
          <button>
          <RiDeleteBin5Line size={15}/>
          </button>
        </div>
      ),
    },
  ];

  const addressData = [
    {
      Id: 1,
      name: "Jyoti Tower",
      organization: "Jyoti Tower",
      registration_no: "MH/29/2323",
      gst_no: "JY09192121",
      address: "G - 205, AB road. Andheri"
    },
  ];
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
      <h2
          style={{ background: "rgb(17, 24, 39)" }}
          className="text-center text-xl font-bold p-2 rounded-md text-white my-2"
        >
          Billing Setup
        </h2>
        <div className="border-b py-5 mx-5 border-black">
          <p className="text-md font-semibold">Invoice Number Setup</p>
        </div>
        <div className="space-y-3 my-5 mx-5">
          <div className="grid md:grid-cols-2">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="invoiceAuto"
                value="invoiceAuto"
                checked={invoiceOption === "invoiceAuto"}
                onChange={handleChange}
              />
              <label htmlFor="invoiceAuto" className="text-base text-gray-800">
                Continue auto-generating invoice numbers
              </label>
            </div>
            <div className="flex gap-2">
              <div>
                <input
                  defaultValue="INV"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  disabled={invoiceOption === "invoiceManual"} // Disable if manual is selected
                  placeholder="Prefix"
                />
              </div>
              <div>
                <input
                  defaultValue="4048"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  disabled={invoiceOption === "invoiceManual"} // Disable if manual is selected
                  placeholder="Next Number"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="invoiceManual"
              value="invoiceManual"
              checked={invoiceOption === "invoiceManual"}
              onChange={handleChange}
            />
            <label htmlFor="invoiceManual" className="text-base text-gray-800">
              I will add them manually each time
            </label>
          </div>
          <div className="flex justify-start">
            <button className="border border-gray-500 p-1 px-5 my-3 rounded-md">
              Submit
            </button>
          </div>
        </div>
        <div className="border-b py-5 mx-5 border-black">
          <p className="text-md font-semibold">Receipt Number Setup</p>
        </div>
        <div className="space-y-3 my-5 mx-5">
          <div className="grid md:grid-cols-2">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="receiptAuto"
                value="receiptAuto"
                checked={receiptOption === "receiptAuto"}
                onChange={handleChangeReceiptOption}
              />
              <label htmlFor="receiptAuto" className="text-base text-gray-800">
                Continue auto-generating receipt numbers
              </label>
            </div>
            <div className="flex gap-2">
              <div>
                <input
                  defaultValue="RCPT"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  disabled={receiptOption === "receiptManual"} // Disable if manual is selected
                  placeholder="Prefix"
                />
              </div>
              <div>
                <input
                  defaultValue="4010"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  disabled={receiptOption === "receiptManual"} // Disable if manual is selected
                  placeholder="Next Number"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="receiptManual"
              value="receiptManual"
              checked={receiptOption === "receiptManual"}
              onChange={handleChangeReceiptOption}
            />
            <label htmlFor="receiptManual" className="text-base text-gray-800">
              I will add them manually each time
            </label>
          </div>
          <div className="flex justify-start">
            <button className="border border-gray-500 p-1 px-5 my-3 rounded-md">
              Submit
            </button>
          </div>
        </div>
        <div className="py-2 mx-5 flex justify-between">
          <p className="text-md font-semibold">Invoice Setup</p>
          <button className="border border-gray-500 p-1 px-5 rounded-md" onClick={() => setAddInvoiceModal(true)}>
            Add
          </button>
        </div>
        <div>
          <div className="mx-5">
            <Table columns={columns} data={data} />
          </div>
        </div>
        <div className="py-2 mx-5 flex justify-between">
          <p className="text-md font-semibold">Address Setup</p>
          <Link to={`/admin/billing-address`} className="border border-gray-500 p-1 px-5 rounded-md">
            Add
          </Link>
        </div>
        <div className="mb-10">
          <div className="mx-5">
            <Table columns={addressColumns} data={addressData} />
          </div>
        </div>
        <div className="border-b py-5 mx-5 border-black">
          <p className="text-md font-semibold">Upload Logo</p>
        </div>
        <div className="my-5 mx-5">
          <FileInputBox />
          <div className="flex justify-end">
            <button className="border border-gray-500 p-1 px-5 my-3 rounded-md">
              Submit
            </button>
          </div>
        </div>
        <div className="flex gap-5 mx-4 mb-10">
          <h2>Online Payment Allowed </h2>
          <Switch />
        </div>
      </div>
      {addInvoiceModal && <AddInvoiceSetupModal onclose={() => setAddInvoiceModal(false)} />}
      {editInvoiceModal && <EditInvoiceSetupModal onclose={() => setEditInvoiceModal(false)} />}
    </section>
  );
}

export default BillingSetup;
