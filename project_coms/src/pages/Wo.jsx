import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/table/Table";
import { BiFilterAlt } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getItemInLocalStorage } from "../utils/localStorage";

function Wo() {
  const [filter, setFilter] = useState(false);
  const buildings = getItemInLocalStorage("Building");
  const [floors, setFloors] = useState([]);

  const handleBuildingChange = async (e) => {
    const buildingId = e.target.value;
    setSelectedBuilding(buildingId);
    const response = await getFloors(buildingId);
    setFloors(response.data.map((item) => ({ name: item.name, id: item.id })));
    setSelectedFloor(""); // Reset floor and unit when building changes
    setUnitName([]);
    setSelectedUnit("");
  };
  const column = [
    {
      name: "view",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/wo-detail/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },

    { name: "Id", selector: (row) => row.Id, sortable: true },
    { name: "WO No.", selector: (row) => row.WoNo, sortable: true },
    { name: "Reference No", selector: (row) => row.Reference, sortable: true },
    { name: "Created on", selector: (row) => row.CreatedOn, sortable: true },
    { name: "Supplier", selector: (row) => row.Supplier, sortable: true },
    {
      name: "Approved Status",
      selector: (row) => row.ApprovedStatus,
      sortable: true,
    },
    {
      name: "Payment Tenure(In Days)",
      selector: (row) => row.PaymentTenure,
      sortable: true,
    },
    {
      name: "Advance Amount",
      selector: (row) => row.AdvanceAmount1,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) => row.TotalAmount,
      sortable: true,
    },
    {
      name: "Total Work Completed(%)",
      selector: (row) => row.TotalWorkCompleted,
      sortable: true,
    },
    { name: "Retention(%)", selector: (row) => row.Retention, sortable: true },
    { name: "TDS(%)", selector: (row) => row.TDS, sortable: true },
    { name: "QC(%)", selector: (row) => row.QC, sortable: true },
    {
      name: "Active/Inactive",
      selector: (row) => row.ActiveInactive,
      sortable: true,
    },
    {
      name: "Last Approved By",
      selector: (row) => row.LastApprovedBy,
      sortable: true,
    },
    { name: "TDS Amount", selector: (row) => row.TDSAmount, sortable: true },
    {
      name: "Retention Amount",
      selector: (row) => row.RetentionAmount,
      sortable: true,
    },
    {
      name: "Retention Outstanding",
      selector: (row) => row.RetentionOutstanding,
      sortable: true,
    },
    { name: "QC Amount", selector: (row) => row.QCAmount, sortable: true },
    {
      name: "QC Outstanding",
      selector: (row) => row.QCOutstanding,
      sortable: true,
    },
    {
      name: "No of Invoices",
      selector: (row) => row.NoOfInvoices,
      sortable: true,
    },
    {
      name: "Total Amount paid",
      selector: (row) => row.TotalAmountpaid,
      sortable: true,
    },
    { name: "Outstanding", selector: (row) => row.Outstanding, sortable: true },
    {
      name: "Debit/Credit Note Raised",
      selector: (row) => row.DebitCreditNoteRaised,
      sortable: true,
    },
    { name: "Created By", selector: (row) => row.CreatedBy, sortable: true },
    { name: "Updated By", selector: (row) => row.UpdatedBy, sortable: true },
    { name: "Updated On", selector: (row) => row.UpdatedOn, sortable: true },
  ];
  const data = [
    {
      id: 1,
      Id: 949,
      WoNo: "6100000838",
      Reference: "10168",
      CreatedOn: "17/08/2023",
      Supplier: "Safety Signs And Equipments Private",
      ApprovedStatus: "Pending",
      PaymentTenure: " ",
      AdvanceAmount1: " ",
      TotalAmount: " 0.00",
      TotalWorkCompleted: " 0.0",
      Retention: " ",
      TDS: " ",
      QC: " ",
      ActiveInactive: "",
      LastApprovedBy: "",
      TDSAmount: " 0",
      RetentionAmount: "0",
      RetentionOutstanding: " 0.0",
      QCAmount: " 0",
      QCOutstanding: " 0.0",
      NoOfInvoices: "0",
      TotalAmountpaid: "0.0",
      Outstanding: "0.0",
      DebitCreditNoteRaised: "No",
      CreatedBy: "Panchshil API",
      UpdatedBy: "",
      UpdatedOn: "23/08/2023",

      action: <BsEye />,
    },
    {
      id: 2,
      Id: 948,
      WoNo: "6100000829",
      Reference: "10167",
      CreatedOn: "17/08/2023",
      Supplier: "Municipal Commissioner Pmc Water Mee",
      ApprovedStatus: "Pending",
      PaymentTenure: " ",
      AdvanceAmount1: " ",
      TotalAmount: " 35255.00",
      TotalWorkCompleted: " 0.0",
      Retention: " ",
      TDS: " ",
      QC: " ",
      ActiveInactive: "",
      LastApprovedBy: "",
      TDSAmount: " 0.0",
      RetentionAmount: "0.0",
      RetentionOutstanding: " 0.0",
      QCAmount: " 0",
      QCOutstanding: " 0.0",
      NoOfInvoices: "1",
      TotalAmountpaid: "0.0",
      Outstanding: "35255.0",
      DebitCreditNoteRaised: "No",
      CreatedBy: "Panchshil API",
      UpdatedBy: "AAKASH BHOT",
      UpdatedOn: "04/09/2023",

      action: <BsEye />,
    },
    {
      id: 3,
      Id: 628,
      WoNo: "6100000650",
      Reference: "10074",
      CreatedOn: "04/08/2023",
      Supplier: "Polytest Laboratories",
      ApprovedStatus: "Pending",
      PaymentTenure: " ",
      AdvanceAmount1: " ",
      TotalAmount: " 30296.50",
      TotalWorkCompleted: " 0.0",
      Retention: " ",
      TDS: " ",
      QC: " ",
      ActiveInactive: "",
      LastApprovedBy: "",
      TDSAmount: " 0.0",
      RetentionAmount: "0.0",
      RetentionOutstanding: " 0.0",
      QCAmount: "0.0",
      QCOutstanding: " 0.0",
      NoOfInvoices: "1",
      TotalAmountpaid: "0.0",
      Outstanding: "30296.5",
      DebitCreditNoteRaised: "No",
      CreatedBy: "Panchshil API",
      UpdatedBy: "",
      UpdatedOn: "31/08/2023",

      action: <BsEye />,
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
  return (
    <section className="flex">
      {/* <Navbar/> */}
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex  justify-start gap-4 my-5 flex-shrink flex-wrap ">
          <div className="shadow-xl rounded-full border-4 border-gray-400   px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Total no. of WO</p>
            <p className="text-center font-semibold md:text-lg ">264</p>
          </div>
          <div className="shadow-xl rounded-full border-4 border-green-400   px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Total Value Amount</p>
            <p className="text-center font-semibold md:text-lg ">
              ₹ 11,38,13,251
            </p>
          </div>
          <div className="shadow-xl rounded-full border-4 border-red-400   px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Total Paid Amount</p>
            <p className="text-center font-semibold md:text-lg "> ₹ 0</p>
          </div>

          <div className="shadow-xl rounded-full border-4 border-orange-400   px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Total Pending Amount</p>
            <p className="text-center font-semibold md:text-lg ">
              {" "}
              ₹ 11,38,13,251
            </p>
          </div>
        </div>
        <div>
          {filter && (
            <div className='className="flex flex-col md:flex-row mt-1 items-center justify-center gap-2'>
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

                <button className="bg-black p-1 px-5 py-2 text-white rounded-md">
                  Apply
                </button>
              </div>
            </div>
          )}
          <div className="md:flex grid grid-cols-2 sm:flex-row my-2 flex-col gap-2 justify-between">
            {/* <button
              className="md:text-lg text-sm font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md"
              onClick={() => setOmitColumn(!omitColumn)}
            >
              <IoFilterOutline />
              Filter Columns
            </button> */}

            <button
              className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md"
              onClick={() => setFilter(!filter)}
            >
              <BiFilterAlt />
              Filter
            </button>
            <input
              type="text"
              placeholder="search"
              className="border-2 p-2 w-70 border-gray-300 rounded-lg mx-2"
            />
          </div>
        </div>
        <Table
          columns={column}
          data={data}
          // customStyles={customStyle}
          // responsive
          // fixedHeader
          // fixedHeaderScrollHeight="500px"
          // pagination
          // selectableRowsHighlight
          // highlightOnHover
          // omitColumn={column}
        />
      </div>
    </section>
  );
}

export default Wo;
