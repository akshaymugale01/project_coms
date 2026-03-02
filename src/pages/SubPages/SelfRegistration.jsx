import React, { useCallback, useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { Link, useParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { PiPlusCircle } from "react-icons/pi";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { getSelfRegistration } from "../../api";

function SelfRegistration() {
  const siteId = getItemInLocalStorage("SITEID");
  const { id } = useParams();
  const [records, setRecords] = useState([])
   const [search, setSearch] = useState("");
  // const [debouncedSearch, setDebouncedSearch] = useState("");
   const token = getItemInLocalStorage("TOKEN");

  const useQuery = () => {
    return new URLSearchParams(window.location.search);
  };

  console.log("records", records);

 const fetchSelfRegistrations = async (searchValue = "") => {
    try {
      const response = await getSelfRegistration(token, searchValue);

      const selfRegistration = response?.data?.data || [];
      const visitors = response?.data?.visitors || [];

      // Merge both safely
      const mergedData = [...selfRegistration, ...visitors];

      setRecords(mergedData);
    } catch (error) {
      console.log("Failed To fetch records:", error);
    }
  };


  // ✅ Initial Load
  useEffect(() => {
    fetchSelfRegistrations("");
  }, []);

  // ✅ Debounce Search (Works for 1 alphabet also)
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSelfRegistrations(search.trim());
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);


  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/passes/visitors/visitor-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/passes/visitors/edit-visitor/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },

    {
      name: "Visitor Type",
      selector: (row) => row.visit_type === "Guest-SelfRegistration" ? "Guest" : "",
      sortable: true,
    },
    {
      name: " Name",
      selector: (row) => row.visitor_name || "-",
      sortable: true,
    },
   {
      name: "Host",
      selector: (row) =>
        row.hosts?.length > 0
          ? row.hosts[0]?.hosts_name || "-"
          : "-",
      sortable: true,
    },
    {
      name: "Contact No.",
      selector: (row) => row.contact_no || "-",
      sortable: true,
    },

    {
      name: "Purpose",
      selector: (row) => row.purpose || "-",
      sortable: true,
    },
    {
      name: "Coming from",
      selector: (row) => row.coming_from || "-",
      sortable: true,
    },
   {
      name: "Expected Date",
      selector: (row) =>
        row.expected_date
          ? new Date(row.expected_date).toLocaleDateString()
          : "-",  
      sortable: true,
    },
    {
      name: "Expected Time",
      selector: (row) =>
        row.expected_time
          ? row.expected_time.slice(0, 5)  
          : "-", 
      sortable: true,
    },

  ];


  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="grid md:grid-cols-2 gap-2 items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded-md placeholder:text-sm w-[1250px]"
          placeholder="Search using Visitor name, Host name, Contact number, Purpose or Coming from"
        />
        <div className="flex justify-end">
          <Link
            to={`/admin/passes/add-self-registration?site_id=${siteId}&token=${token}`}
            className=" font-semibold bg-black hover:text-white duration-150 transition-all p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add Self-Registration
          </Link>
        </div>
      </div>
      <div className="my-3">
        <Table columns={columns} data={records} />
      </div>
    </div>
  );
}

export default SelfRegistration;