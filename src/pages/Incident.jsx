import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Table from "../components/table/Table";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { getIncidents } from "../api";
import { dateFormatSTD } from "../utils/dateUtils";

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const perPage = 10;
  const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

  const columns = [
    {
      name: "View",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/incidents-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/edit-incidents/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Building", selector: (row) => row.building_name, sortable: true },
    {
      name: "Incident Time",
      selector: (row) => dateFormatSTD(row.time_and_date),
      sortable: true,
    },
    { name: "Level", selector: (row) => row.incident_level, sortable: true },
    {
      name: "Category",
      selector: (row) => row.primary_incident_category,
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: (row) => row.primary_incident_sub_category,
      sortable: true,
    },
    {
      name: "Support Required",
      selector: (row) => (row.support_required ? "Yes" : "No"),
      sortable: true,
    },
    { name: "Current Status", selector: (row) => row.status, sortable: true },
  ];

 useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /* -------------------- Fetch API -------------------- */
  const fetchIncidents = async (pageNo = 1, searchValue = "") => {
    try {
      const res = await getIncidents(pageNo, searchValue);

      setIncidents(res.data?.incidents || []);
      setTotalRecords(res.data?.total_count || 0);
    } catch (error) {
      console.error("Failed to fetch incidents:", error);
    }
  };

  useEffect(() => {
    fetchIncidents(page, debouncedSearch);
  }, [page, debouncedSearch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); 
  };

  return (
    <section className="flex">
      <Navbar />

      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <h2 className="text-lg font-semibold my-5">INCIDENTS LIST</h2>

        <div className="flex flex-col sm:flex-row md:justify-between gap-3">
            <input
            type="text"
            placeholder="Search incidents by using  Building, Category, etc."
            value={search}
            onChange={handleSearchChange}
            className="border p-2 border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-gray-300 
                       w-full md:w-[400px]"
          />
          <Link
            to="/admin/add-incidents"
            className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md bg-black text-white md:mx-3"
          >
            <IoMdAdd /> Add
          </Link>
        </div>

        <div className="my-5 mx-3">
          <Table
            columns={columns}
            data={incidents}
            isPagination={true}
            currentPage={page}
            totalRecords={totalRecords}
            perPage={perPage}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>
    </section>
  );
};

export default Incidents;
