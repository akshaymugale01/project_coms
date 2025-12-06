import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { getItemInLocalStorage } from "../utils/localStorage";
import { ImEye } from "react-icons/im";
// import { Table } from 'antd';
import Table from "../components/table/Table"
import { Link } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';
import Purchase from './Purchase';
const PO = () => {
  const [filter, setFilter] = useState(false);
  const buildings = getItemInLocalStorage("Building");
  const [floors, setFloors] = useState([]);

    const handleBuildingChange = async (e) => {
    const buildingId = e.target.value;
    setSelectedBuilding(buildingId);
    const response = await getFloors(buildingId);
    setFloors(response.data.map((item) => ({ name: item.name, id: item.id })));
    setSelectedFloor(''); // Reset floor and unit when building changes
    setUnitName([]);
    setSelectedUnit('');
   };
    const column = [
    {
      name: "view",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/po-detail/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },

    { name: "Id", selector: (row) => row.Id, sortable: true },
    { name: "Po.No", selector: (row) => row.PoNo, sortable: true },
    { name: "Reference No", selector: (row) => row.Reference, sortable: true },
    { name: "Created by", selector: (row) => row.CreatedBy, sortable: true },
    { name: "Created on", selector: (row) => row.CreatedOn, sortable: true },
    { name: "Supplier", selector: (row) => row.Supplier, sortable: true },
    { name: "Payment Tenure(In Days)", selector: (row) => row.Payment, sortable: true },
    { name: "Active/Inactive", selector: (row) => row.ActiveInactive, sortable: true },
    { name: "Last Approved By", selector: (row) => row.LastApprovedBy, sortable: true },
    { name: "Approval status", selector: (row) => row.Approvalstatus, sortable: true },
    { name: "Advance Amount", selector: (row) => row.AdvanceAmount, sortable: true },
    { name: "PO Amount", selector: (row) => row.POAmount, sortable: true },
    { name: "Retention(%)", selector: (row) => row.Retention, sortable: true },
    { name: "TDS(%)", selector: (row) => row.TDS, sortable: true },
    { name: "QC(%)", selector: (row) => row.QC, sortable: true },
    { name: "TDS Amount", selector: (row) => row.TDSAmount, sortable: true },
    { name: "Retention Amount", selector: (row) => row.RetentionAmount, sortable: true },
    { name: "Retention Outstanding", selector: (row) => row.RetentionOutstanding, sortable: true },
    { name: "QC Amount", selector: (row) => row.QCAmount, sortable: true },
    { name: "QC Outstanding", selector: (row) => row.QCOutstanding, sortable: true },
    { name: "No of Grns", selector: (row) => row.NoOfGrns, sortable: true },
    { name: "Total Amount paid", selector: (row) => row.TotalAmountpaid, sortable: true },
    { name: "Outstanding", selector: (row) => row.Outstanding, sortable: true },
    { name: "Debit/Credit Note Raised", selector: (row) => row.DebitCreditNoteRaised, sortable: true },
  ];

  const data = [
    {
      id: 1,
      Id: 5972,
      PoNo: "NA",
      Reference : "12351",
      CreatedBy : "Tech Support 1",
      CreatedOn : "29/05/2024",
      Supplier : "Ghaffar Industries pvt.ltd.",
      Payment : " ",
      ActiveInactive : " ",
      LastApprovedBy : " ",
      Approvalstatus : " Pending",
      AdvanceAmount : " ",
      POAmount : "115000.00",
      Retention : " ",
      TDS : " ",
      QC : " ",
      TDSAmount : " 0",
      RetentionAmount : " 0",
      RetentionOutstanding : " 0.0",
      QCAmount : " 0",
      QCOutstanding : " 0.0",
      NoOfGrns: " 0",
      TotalAmountpaid: "0.0",
      Outstanding: "115000.0",
      DebitCreditNoteRaised: "No",
      action: <BsEye />,
    },
    {
      id: 2,
      Id: 2382,
      PoNo: "NA",
      Reference : "10592",
      CreatedBy : "Kshitij Rasal (GoPhygital)	",
      CreatedOn : "03/10/2023",
      Supplier : "3 R Waste Management",
      Payment : " ",
      ActiveInactive : " ",
      LastApprovedBy : " ",
      Approvalstatus : " Approved",
      AdvanceAmount : " ",
      POAmount : "77290.00",
      Retention : " ",
      TDS : " ",
      QC : " ",
      TDSAmount : " 0.0",
      RetentionAmount : " 0.0",
      RetentionOutstanding : " 0.0",
      QCAmount : " 0.0",
      QCOutstanding : " 0.0",
      NoOfGrns: " 3",
      TotalAmountpaid: "0.0",
      Outstanding: "77290.0",
      DebitCreditNoteRaised: "No",
      action: <BsEye />,
    },
    {
      id: 3,
      Id: 1598	,
      PoNo: "NA",
      Reference : "10174",
      CreatedBy : "Rajnish Patil",
      CreatedOn : "22/08/2023",
      Supplier : "Fujitec India Private Limited",
      Payment : " ",
      ActiveInactive : " ",
      LastApprovedBy : " ",
      Approvalstatus : " Approved",
      AdvanceAmount : " ",
      POAmount : "248980.00",
      Retention : " ",
      TDS : " ",
      QC : " ",
      TDSAmount : "0.0",
      RetentionAmount : "0.0",
      RetentionOutstanding : "0.0",
      QCAmount : "0.0",
      QCOutstanding : "0.0",
      NoOfGrns: "10",
      TotalAmountpaid: "0.0",
      Outstanding: "248980.0",
      DebitCreditNoteRaised: "No",
      action: <BsEye />,
    },
    {
      id: 4,
      Id: 1296		,
      PoNo: "NA",
      Reference : "10020",
      CreatedBy : "Rajnish Patil",
      CreatedOn : "02/08/2023",
      Supplier : "3 R Waste Management",
      Payment : " ",
      ActiveInactive : " ",
      LastApprovedBy : " ",
      Approvalstatus : " Pending",
      AdvanceAmount : " ",
      POAmount : "1119.00",
      Retention : " ",
      TDS : " ",
      QC : " ",
      TDSAmount : "0",
      RetentionAmount : "0",
      RetentionOutstanding : "0.0",
      QCAmount : "0",
      QCOutstanding : "0.0",
      NoOfGrns: "0",
      TotalAmountpaid: "0.0",
      Outstanding: "1119.0",
      DebitCreditNoteRaised: "No",
      action: <BsEye />,
    },
    {
      id: 5,
      Id: 1292,
      PoNo: "NA",
      Reference : "10018",
      CreatedBy : "Rajnish Patil",
      CreatedOn : "02/08/2023",
      Supplier : "3 R Waste Management",
      Payment : " ",
      ActiveInactive : " ",
      LastApprovedBy : " ",
      Approvalstatus : " Pending",
      AdvanceAmount : " ",
      POAmount : "1119.00",
      Retention : " ",
      TDS : " ",
      QC : " ",
      TDSAmount : "0",
      RetentionAmount : "0",
      RetentionOutstanding : "0.0",
      QCAmount : "0",
      QCOutstanding : "0.0",
      NoOfGrns: "0",
      TotalAmountpaid: "0.0",
      Outstanding: "1865.0",
      DebitCreditNoteRaised: "No",
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
      <Navbar />
      <div className="w-full flex m-3 flex-col overflow-hidden">
        <Purchase/>
        <div className="flex  justify-start gap-4 my-5 flex-shrink flex-wrap ">
          <div className="shadow-xl rounded-full border-4 border-gray-400   px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Total number of po</p>
            <p className="text-center font-semibold md:text-lg ">2</p>
          </div>
          <div className="shadow-xl rounded-full border-4 border-green-400   px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Total Value Amount</p>
            <p className="text-center font-semibold md:text-lg ">₹ 1,152</p>
          </div>
          <div className="shadow-xl rounded-full border-4 border-red-400  px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Total Paid Amount</p> 
            <p className="text-center font-semibold md:text-lg "> ₹ 0</p>
          </div>

          <div className="shadow-xl rounded-full border-4 border-orange-400  px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Total Pending Amount</p>
            <p className="text-center font-semibold md:text-lg "> ₹ 1,152</p>
          </div>
        </div>
        <div>
        { filter && (
          <div className='className="flex flex-col md:flex-row mt-1 items-center justify-center gap-2'>
            <div className='flex justify-center'>
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
             >
              Apply
            </button>
            </div>
          </div>)
            }
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
        //  customStyles={customStyle}
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
  )
}

export default PO