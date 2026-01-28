import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { BiFilterAlt } from "react-icons/bi";
import Table from "../components/table/Table"
import { Link } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';
import Purchase from './Purchase';
import { getLOIByApprovalStatus } from '../api';

const PO = () => {
  const [filter, setFilter] = useState(false);
  const [poData, setPoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPOData = async () => {
      try {
        setLoading(true);
        const response = await getLOIByApprovalStatus(true);
        const sortedData = response.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        const filteredData = sortedData.filter((item) => item.loi_type === "PO");
        setPoData(filteredData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPOData();
  }, []);

  const dateString = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const calculatePOAmount = (loiItems) => {
    if (!loiItems || loiItems.length === 0) return 0;
    return loiItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  };

  // Stats calculations
  const totalPOCount = poData.length;
  const totalValueAmount = poData.reduce((sum, po) => sum + calculatePOAmount(po.loi_items), 0);
  const totalPaidAmount = "-"; // Not available in API
  const totalPendingAmount = "-"; // Not available in API
  const column = [
    {
      name: "View",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/po-detail/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    { name: "Id", selector: (row) => row.id || "-", sortable: true },
    { name: "Po.No", selector: (row) => row.pr_no || "-", sortable: true },
    { name: "Reference No", selector: (row) => row.reference || "-", sortable: true },
    {
      name: "Created by",
      selector: (row) => row.created_by_name ? `${row.created_by_name.firstname} ${row.created_by_name.lastname}` : "-",
      sortable: true
    },
    { name: "Created on", selector: (row) => dateString(row.created_at), sortable: true },
    { name: "Supplier", selector: (row) => row.vendor_name || "-", sortable: true },
    { name: "Payment Tenure(In Days)", selector: (row) => row.payment_tenure || "-", sortable: true },
    { name: "Active/Inactive", selector: (row) => "-", sortable: true },
    { name: "Last Approved By", selector: (row) => "-", sortable: true },
    {
      name: "Approval status",
      selector: (row) => row.is_approved === true ? "Approved" : row.is_approved === false ? "Rejected" : "Pending",
      sortable: true
    },
    { name: "Advance Amount", selector: (row) => row.advance_amount || "-", sortable: true },
    {
      name: "PO Amount",
      selector: (row) => {
        const amount = calculatePOAmount(row.loi_items);
        return amount > 0 ? amount.toFixed(2) : "-";
      },
      sortable: true
    },
    { name: "Retention(%)", selector: (row) => row.retention || "-", sortable: true },
    { name: "TDS(%)", selector: (row) => row.tds || "-", sortable: true },
    { name: "QC(%)", selector: (row) => row.qc || "-", sortable: true },
    { name: "TDS Amount", selector: (row) => "-", sortable: true },
    { name: "Retention Amount", selector: (row) => "-", sortable: true },
    { name: "Retention Outstanding", selector: (row) => "-", sortable: true },
    { name: "QC Amount", selector: (row) => "-", sortable: true },
    { name: "QC Outstanding", selector: (row) => "-", sortable: true },
    { name: "No of Grns", selector: (row) => "-", sortable: true },
    { name: "Total Amount paid", selector: (row) => "-", sortable: true },
    { name: "Outstanding", selector: (row) => "-", sortable: true },
    { name: "Debit/Credit Note Raised", selector: (row) => "-", sortable: true },
  ];

  const formatCurrency = (amount) => {
    if (amount === "-" || amount === 0) return "-";
    return `₹ ${amount.toLocaleString('en-IN')}`;
  };
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex m-3 flex-col overflow-hidden">
        <Purchase/>
        <div className="flex  justify-start gap-4 my-5 flex-shrink flex-wrap ">
          <div className="shadow-xl rounded-full border-4 border-gray-400   px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Total number of PO</p>
            <p className="text-center font-semibold md:text-lg ">{totalPOCount}</p>
          </div>
          <div className="shadow-xl rounded-full border-4 border-green-400   px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Total Value Amount</p>
            <p className="text-center font-semibold md:text-lg ">{formatCurrency(totalValueAmount)}</p>
          </div>
          <div className="shadow-xl rounded-full border-4 border-red-400  px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Total Paid Amount</p>
            <p className="text-center font-semibold md:text-lg ">{totalPaidAmount}</p>
          </div>

          <div className="shadow-xl rounded-full border-4 border-orange-400  px-6 flex flex-col items-center">
            <p className="font-semibold md:text-lg">Total Pending Amount</p>
            <p className="text-center font-semibold md:text-lg ">{totalPendingAmount}</p>
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
         data={poData}
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