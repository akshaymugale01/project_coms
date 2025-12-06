import React, { useEffect, useState, useCallback } from "react";
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
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");

  const fetchGRN = useCallback(async (currentPage = page, itemsPerPage = perPage) => {
    try {
      setLoading(true);
      const resp = await getGRN(currentPage, itemsPerPage);
      const grnData = resp?.data;
      // Normalize response - handle both array and wrapped payload
      const normalizedGrns = Array.isArray(grnData)
        ? grnData
        : grnData?.grn_details || grnData?.data || [];
      
      // Get total count for pagination
      const totalCount = resp?.data?.total_count || resp?.total_count || normalizedGrns.length;
      
      setGrns(normalizedGrns);
      setTotal(totalCount);
      console.log("Fetched GRN data:", normalizedGrns);
    } catch (error) {
      console.log("Error fetching GRN:", error);
      setGrns([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, perPage]);

  useEffect(() => {
    fetchGRN(page, perPage);
  }, [page, perPage, fetchGRN]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerRowsChange = (newPerPage, newPage) => {
    setPerPage(newPerPage);
    setPage(newPage);
  };
  const column = [
    {
      name: "View",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/grn-detail/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    { name: "ID", selector: (row) => row.id || "-", sortable: true },
    { 
      name: "Vendor", 
      selector: (row) => row.vendor_name || row.vendor || "-", 
      sortable: true 
    },
    {
      name: "Invoice Number",
      selector: (row) => row.invoice_number || "-",
      sortable: true,
    },
    {
      name: "Invoice Date",
      selector: (row) => row.invoice_date ? new Date(row.invoice_date).toLocaleDateString() : "-",
      sortable: true,
    },
    {
      name: "Posting Date",
      selector: (row) => row.posting_date ? new Date(row.posting_date).toLocaleDateString() : "-",
      sortable: true,
    },
    {
      name: "Payment Mode",
      selector: (row) => row.payment_mode || "-",
      sortable: true,
    },
    {
      name: "Related To",
      selector: (row) => row.related_to || "-",
      sortable: true,
    },
    {
      name: "Invoice Amount",
      selector: (row) => row.invoice_amount ? `₹${parseFloat(row.invoice_amount).toFixed(2)}` : "-",
      sortable: true,
    },
    {
      name: "Other Expenses",
      selector: (row) => row.other_expenses ? `₹${parseFloat(row.other_expenses).toFixed(2)}` : "-",
      sortable: true,
    },
    {
      name: "Loading Expenses",
      selector: (row) => row.loading_expenses ? `₹${parseFloat(row.loading_expenses).toFixed(2)}` : "-",
      sortable: true,
    },
    {
      name: "Adjustment Amount",
      selector: (row) => row.adjustment_amount ? `₹${parseFloat(row.adjustment_amount).toFixed(2)}` : "-",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status || "Pending",
      sortable: true,
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.status === "Approved" ? "bg-green-100 text-green-800" : 
          row.status === "Rejected" ? "bg-red-100 text-red-800" : 
          "bg-yellow-100 text-yellow-800"
        }`}>
          {row.status || "Pending"}
        </span>
      ),
    },
    { 
      name: "Created On", 
      selector: (row) => row.created_at ? new Date(row.created_at).toLocaleDateString() : "-", 
      sortable: true 
    },
    { 
      name: "Created By", 
      selector: (row) => row.created_by_name || row.created_by || "-", 
      sortable: true 
    },
  ];

  const themeColor = 'rgb(3 19 37)'
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
                placeholder="Search by Invoice Number, Vendor, etc."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
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
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading GRN data...</p>
          </div>
        ) : grns.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No GRN records found</p>
          </div>
        ) : (
          <Table 
            columns={column} 
            data={grns.filter((grn) => {
              if (!searchText) return true;
              const search = searchText.toLowerCase();
              return (
                grn.invoice_number?.toLowerCase().includes(search) ||
                grn.vendor_name?.toLowerCase().includes(search) ||
                grn.related_to?.toLowerCase().includes(search) ||
                grn.payment_mode?.toLowerCase().includes(search)
              );
            })} 
            isPagination={true}
            pagination
            paginationServer
            paginationTotalRows={total}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerRowsChange}
            paginationPerPage={perPage}
            paginationDefaultPage={page}
          />
        )}
      </div>
    </section>
  );
}

export default GRN;
