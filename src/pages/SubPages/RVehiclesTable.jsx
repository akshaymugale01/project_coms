import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import Table from "../../components/table/Table";
import { getRegisteredVehicle } from "../../api";

const RVehiclesTable = () => {
  const themeColor = useSelector((state) => state.theme.color);

  const [registeredVehicles, setRegisteredVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchText, setSearchText] = useState("");

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    const fetchRegisteredVehicle = async () => {
      try {
        const response = await getRegisteredVehicle();

        // ✅ FIX: Get correct array
        const vehicles = response?.data?.registered_vehicles || [];

        // Sort by created_at (latest first)
        const sortedVehicles = vehicles.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setRegisteredVehicles(sortedVehicles);
        setFilteredVehicles(sortedVehicles);
      } catch (error) {
        console.log("Vehicle Fetch Error:", error);
      }
    };

    fetchRegisteredVehicle();
  }, []);

  /* ---------------- SEARCH ---------------- */

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value.trim()) {
      setFilteredVehicles(registeredVehicles);
      return;
    }

    const lowerValue = value.toLowerCase();

    const filtered = registeredVehicles.filter((item) =>
      item?.vehicle_number?.toLowerCase().includes(lowerValue) ||
      item?.slot_name?.toLowerCase().includes(lowerValue) ||
      item?.sticker_number?.toLowerCase().includes(lowerValue)
    );

    setFilteredVehicles(filtered);
  };

  /* ---------------- TABLE COLUMNS ---------------- */

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/rvehicles-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/edit-rvehicles/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Vehicle Number",
      selector: (row) => row.vehicle_number || "-",
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category || "-",
      sortable: true,
    },
    {
      name: "Parking Slot",
      selector: (row) => row.slot_name || "-",
      sortable: true,
    },
    {
      name: "Vehicle Category",
      selector: (row) => row.vehicle_category || "-",
      sortable: true,
    },
    {
      name: "Vehicle Type",
      selector: (row) => row.vehicle_type || "-",
      sortable: true,
    },
    {
      name: "Sticker Number",
      selector: (row) => row.sticker_number || "-",
      sortable: true,
    },
    {
      name: "Registration Number",
      selector: (row) => row.registration_number || "-",
      sortable: true,
    },
    {
      name: "Insurance Number",
      selector: (row) => row.insurance_number || "-",
      sortable: true,
    },
  ];

  return (
    <section className="flex">
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex md:flex-row flex-col gap-5 justify-between my-2">
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            className="border-gray-300 border rounded-md p-2 w-full placeholder:text-sm"
            placeholder="Search by parking slot, sticker number, vehicle number"
          />

          <Link
            to={"/admin/add-rvehicles"}
            className="border-2 font-semibold hover:bg-black hover:text-white transition-all p-2 rounded-md text-white flex items-center gap-2 justify-center"
            style={{ background: "rgb(3 19 37)" }}
          >
            <PiPlusCircle size={20} />
            Add
          </Link>
        </div>

        <Table
          columns={columns}
          data={filteredVehicles}
          isPagination={true}
        />
      </div>
    </section>
  );
};

export default RVehiclesTable;
