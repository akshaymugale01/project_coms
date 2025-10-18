import { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from '../../components/Navbar';
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';
import Table from '../../components/table/Table';
import { getHsns } from '../../api';
import { FiEdit2 } from 'react-icons/fi';
function SACHSNSetup() {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

    const formatRate = (v) => {
      if (v === null || v === undefined || v === "") return "-";
      const n = Number(v);
      if (Number.isNaN(n)) return String(v);
      // show one decimal like 9.0%
      return `${n.toFixed(1)}%`;
    };

    const formatDate = (s) => {
      if (!s) return "-";
      try {
        const d = new Date(s);
        if (isNaN(d.getTime())) return "-";
        return d.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' });
      } catch {
        return "-";
      }
    };

    const capitalize = (t) => (typeof t === 'string' && t.length ? t.charAt(0).toUpperCase() + t.slice(1) : t || "");

    const mapRow = useCallback((d) => {
      const createdByName = (() => {
        if (d?.created_by_name && typeof d.created_by_name === 'object') {
          const f = d.created_by_name.firstname || "";
          const l = d.created_by_name.lastname || "";
          return `${f} ${l}`.trim() || "-";
        }
        return d?.created_by_name || d?.created_by || "-";
      })();
      return {
        id: d.id,
        type: capitalize(d.hsn_type),
        category: d.category || "",
        sacHsnCode: d.code || "",
        cgstRate: formatRate(d.cgst_rate),
        sgstRate: formatRate(d.sgst_rate),
        igstRate: formatRate(d.igst_rate),
        createdBy: createdByName,
        createdOn: formatDate(d.created_at),
        updatedOn: formatDate(d.updated_at),
        _raw: d,
      };
    }, []);

    useEffect(() => {
      const load = async () => {
        setLoading(true);
        try {
          const res = await getHsns(page, perPage);
          const payload = res?.data || {};
          const rows = Array.isArray(payload) ? payload : (payload?.hsns || []);
          const total = payload?.total_count ?? (Array.isArray(payload) ? rows.length : 0);
          setList(rows.map(mapRow));
          setTotalRows(Number(total) || rows.length || 0);
        } catch (e) {
          console.error('Failed to fetch HSNs:', e);
        } finally {
          setLoading(false);
        }
      };
      load();
    }, [mapRow, page, perPage]);

    const filtered = useMemo(() => {
      // Client-side filter over current page data only; for server-side search, call API instead
      if (!search?.trim()) return list;
      const q = search.toLowerCase();
      return list.filter((r) =>
        (r.type || "").toLowerCase().includes(q) ||
        (r.category || "").toLowerCase().includes(q) ||
        (r.sacHsnCode || "").toLowerCase().includes(q)
      );
    }, [list, search]);

    const column = [
        {
          name: "Actions",

          cell: (row) => (
            <div className="flex items-center gap-4">
              <Link to={`/admin/sac-hsn-setup-details/${row.id}`}>
                <BsEye size={15} />
              </Link>
              <Link to={`/admin/add-sac-hsn-setup?id=${row.id}`} title="Edit">
                <FiEdit2 size={15} />
              </Link>
            </div>
          ),
        },
        { name: "Type", selector: (row) => row.type, sortable: true },
        { name: "Category", selector: (row) => row.category, sortable: true },
        { name: "SAC/HSN Code", selector: (row) => row.sacHsnCode, sortable: true },
        { name: "CGST Rate", selector: (row) => row.cgstRate, sortable: true },
        { name: "SGST Rate", selector: (row) => row.sgstRate, sortable: true },
        { name: "IGST Rate", selector: (row) => row.igstRate, sortable: true },
        { name: "Created By", selector: (row) => row.createdBy, sortable: true },
        { name: "Created On", selector: (row) => row.createdOn, sortable: true },
        { name: "Updated On", selector: (row) => row.updatedOn, sortable: true },
    ];
  return (
    <section className='flex'>
        <Navbar/>
        <div className='w-full flex mx-3 flex-col overflow-hidden'>
            <div className="flex flex-col sm:flex-row md:justify-between gap-3 my-3">
                <input
                  type="text"
                  placeholder="search"
                  className="border-2 p-2 w-70 border-gray-300 rounded-lg"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className='flex gap-3 sm:flex-row flex-col'>
                    <Link to={`/admin/add-sac-hsn-setup`} className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md'>
                      <IoMdAdd /> Add
                    </Link>
                </div>
            </div>
            <div className='my-3'>
                <Table 
                  columns={column}
                  data={filtered}
                  pagination={true}
                  progressPending={loading}
                  paginationServer
                  paginationPerPage={perPage}
                  paginationTotalRows={totalRows}
                  onChangePage={(p) => setPage(p)}
                  onChangeRowsPerPage={(newPerPage) => { setPerPage(newPerPage); setPage(1); }}
                  currentPage={page}
                />
            </div>
        </div>
    </section>
  )
}

export default SACHSNSetup