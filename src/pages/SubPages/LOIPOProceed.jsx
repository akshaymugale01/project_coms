import React from "react";
import Table from "../../components/table/Table";

const LOIPOProceed = () => {
  const columns = [
    {
      name: "S.No.",
      selector: (row) => row.Sno,
      sortable: true,
    },

    {
      name: "Item Details",
      selector: (row) => row.boq,
      sortable: true,
    },

    {
      name: "SAC/HSN Code",
      selector: (row) => row.sac,
      sortable: true,
    },

    {
      name: "Quantity",
      selector: (row) => row.Quantity,
      sortable: true,
    },
    {
      name: "Unit",
      selector: (row) => row.UOM,
      sortable: true,
    },
    {
      name: "Rate",
      selector: (row) => row.Rate,
      sortable: true,
    },
    {
      name: "CGST Rate",
      selector: (row) => row.cgst,
      sortable: true,
    },
    {
      name: "CGST Amount",
      selector: (row) => row.cgst,
      sortable: true,
    },
    {
      name: "SGST Rate",
      selector: (row) => row.sgst,
      sortable: true,
    },
    {
      name: "SGST Amount",
      selector: (row) => row.sgst,
      sortable: true,
    },
    {
      name: "IGST Rate",
      selector: (row) => row.igst,
      sortable: true,
    },
    {
      name: "IGST Amount",
      selector: (row) => row.igst,
      sortable: true,
    },
    {
      name: "TCS Rate",
      selector: (row) => row.tcs,
      sortable: true,
    },
    {
      name: "TCS Amount",
      selector: (row) => row.tcs,
      sortable: true,
    },
    ,
    {
      name: "Tax Amount",
      selector: (row) => row.taxamount,
      sortable: true,
    },
    ,
    {
      name: "Total Amount",
      selector: (row) => row.tamount,
      sortable: true,
    },
  ];
  const data = [
    {
      Sno: "1",
      boq: "NA",
      Quantity: "5",
      UOM: "6",
      sac: "45",
      Rate: "Rs 5",
      cgst: "0",
      sgst: "0",
      igst: "0",
      tcs: "0",
      taxamount: "Rs 0",
      tamount: "Rs 0",
    },
  ];

  return (
    <div className=" mx-3 my-5 p-5 shadow-md rounded-md border border-gray-300">
      <h1 className="text-xl text-center bg-gray-200 font-bold">Preview</h1>
      <div className="text-center border-b pb-4 mb-4">
        <h1 className="text-xl font-bold mt-4">LETTER OF INDENT</h1>
        <div className="flex justify-between">
          <p className="text-xl font-bold">My Citi Life</p>
          <button className="bg-orange-400 px-2 py-1 rounded-md text-white text-sm">
            Pending
          </button>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <p>LOI No. : NA</p>
          <p>Supplier : NA</p>
          <p>Address : NA</p>
          <p>Phone : NA</p>
          <p>Email : NA</p>
          <p>GST : NA</p>
          <p>PAN : NA</p>
          <p>Delivery Address : NA</p>
        </div>
        <div>
          <p>Phone : NA</p>
          <p>Email : NA</p>
          <p>Related To : NA</p>
          <p>Payment Tenure(In Days) : NA</p>
          <p>Retention(%) : NA</p>
          <p>TDS(%) : NA</p>
          <p>QC(%) : NA</p>
          <p>Advance Amount : NA</p>
        </div>
      </div>
      <Table responsive columns={columns} data={data} isPagination={true} />
      <div className="mb-4">
        <div className="flex justify-between">
          <p>Net Amount(INR): </p>
          <p> ₹0.00</p>
        </div>
        <div className="flex justify-between">
          <p>Total Taxable Value Of LOI </p>
          <p> ₹0.00</p>
        </div>
        <div className="flex justify-between">
          <p>Taxes (INR): </p>
          <p> ₹0.00</p>
        </div>
        <div className="flex justify-between">
          <p>Total LOI Value (INR): </p>
          <p> ₹0.00</p>
        </div>
        <div className="flex justify-between">
          <p>Amount In Words: </p>
          <p> Zero Rupees Only</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium">Notes :</p>
        <p className="bg-gray-100 p-2 rounded-md">NA</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium">Terms And Conditions :</p>
        <p className="bg-gray-100 p-2 rounded-md">NA</p>
      </div>
      <div className="flex justify-end mt-10">
        <div className="flex justify-end">
          <p className="text-center">Authorised Signatory</p>
        </div>
      </div>
    </div>
  );
};

export default LOIPOProceed;
