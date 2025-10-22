import React, { useEffect, useState, useCallback } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import { getGDN } from "../../api";

const GdnDetails = () => {
  const [gdns, setGdns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");

  const fetchGDN = useCallback(async (currentPage = page, itemsPerPage = perPage) => {
    try {
      setLoading(true);
      const resp = await getGDN(currentPage, itemsPerPage);
      const gdnData = resp?.data;
      // Normalize response - handle both array and wrapped payload
      const normalizedGdns = Array.isArray(gdnData)
        ? gdnData
        : gdnData?.gdn_details || gdnData?.data || [];
      
      // Get total count for pagination
      const totalCount = resp?.data?.total_count || resp?.total_count || normalizedGdns.length;
      
      setGdns(normalizedGdns);
      setTotal(totalCount);
      console.log("Fetched GDN data:", normalizedGdns);
    } catch (error) {
      console.log("Error fetching GDN:", error);
      setGdns([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, perPage]);

  useEffect(() => {
    fetchGDN(page, perPage);
  }, [page, perPage, fetchGDN]);

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
          <Link to={`/admin/gdn-detail/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    { name: "ID", selector: (row) => row.id || "-", sortable: true },
    { 
      name: "GDN Date", 
      selector: (row) => row.gdn_date ? new Date(row.gdn_date).toLocaleDateString() : "-", 
      sortable: true 
    },
    {
      name: "Inventory Count",
      selector: (row) => row.inventory_count || row.gdn_inventory_details?.length || 0,
      sortable: true,
    },
    { 
      name: "Status", 
      selector: (row) => row.status || "Pending", 
      sortable: true,
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.status === "Dispatched" ? "bg-green-100 text-green-800" : 
          row.status === "Cancelled" ? "bg-red-100 text-red-800" : 
          "bg-yellow-100 text-yellow-800"
        }`}>
          {row.status || "Pending"}
        </span>
      ),
    },
    { 
      name: "Description", 
      selector: (row) => row.description || "-", 
      sortable: true 
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
    {
      name: "Handed Over To",
      selector: (row) => row.handover_to_name || row.handover_to || "-",
      sortable: true,
    },
  ];

  const themeColor = 'rgb(3 19 37)';
  return (
    <section>
      <div className="w-full flex  flex-col ">
        <div className="flex justify-between my-2">
          <div>
            <input
              type="text"
              placeholder="Search by ID, Status, Description..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border-2 p-2  border-gray-300 rounded-lg mx-2 w-96"
            />
          </div>
          <div>
            <Link
              to="/admin/add-gdn/"
              className=" font-semibold text-white px-4 p-2 flex gap-2 items-center rounded-md"
              style={{ background: themeColor }}
            >
              <IoMdAdd /> Add
            </Link>
          </div>
        </div>
        <div className="">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading GDN data...</p>
            </div>
          ) : gdns.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">No GDN records found</p>
            </div>
          ) : (
            <Table 
              columns={column} 
              data={gdns.filter((gdn) => {
                if (!searchText) return true;
                const search = searchText.toLowerCase();
                return (
                  gdn.id?.toString().includes(search) ||
                  gdn.status?.toLowerCase().includes(search) ||
                  gdn.description?.toLowerCase().includes(search) ||
                  gdn.created_by_name?.toLowerCase().includes(search)
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
      </div>
    </section>
  );
};

export default GdnDetails;
