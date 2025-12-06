import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import Table from "../../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import AddVehicleParkingModal from "./AddVehicleParkingModal";
import EditVehicleParkingModal from "./EditVehicleParkingModal";
import { getVehicleParking, deleteVehicleParking } from "../../../api";
import toast from "react-hot-toast";
function VehicleParkingSetup() {
  const themeColor = useSelector((state) => state.theme.color);
  const [addVehicleModal, setAddVehicleModal] = useState(false);
  const [editVehicleModal, setEditVehicleModal] = useState(false);
  const [vehicleParking, setVehicleParking] = useState([]);
  const [added, setAdded] = useState(false);
  const [vehId, setVehId] = useState("");
  const [searchText, setSearchText] = useState("");
  const column = [
    {
      name: "Sr. no.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Building Name",
      selector: (row) => row.building_name,
      sortable: true,
    },
    {
      name: "Floor Name",
      selector: (row) => row.floor_name,
      sortable: true,
    },
    {
      name: "Parking Slot",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Vehicle Type",
      selector: (row) => row.vehicle_type,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex items-center gap-4">
          <button>
            <BiEdit size={15} onClick={() => editVehicleParking(row.id)} />
          </button>
          <button>
            <RiDeleteBin5Line size={15} onClick={() => deleteVehicle(row.id)} />
          </button>
        </div>
      ),
    },
  ];
  const getVehicle = async () => {
    try {
      const vehicleRes = await getVehicleParking();
      setVehicleParking(vehicleRes.data);
      setFilteredData(vehicleRes.data);
      console.log(vehicleRes.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVehicle();
  }, [added]);

  const deleteVehicle = async (id) => {
    try {
      const vehicleParkingRes = await deleteVehicleParking(id);
      toast.success("deleted Successfully");
      setAdded(true);
      console.log(vehicleParkingRes);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setAdded(false);
      }, 500);
    }
  };

  const editVehicleParking = (id) => {
    setEditVehicleModal(true);
    setVehId(id);
  };

  const [filteredData, setFilteredData] = useState([]);
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredData(vehicleParking);
    } else {
      const filteredResults = vehicleParking.filter(
        (items) =>
          (items.name &&
            items.name.toLowerCase().includes(searchValue.toLowerCase())) ||
          (items.vehicle_type &&
            items.vehicle_type
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (items.building_name &&
            items.building_name
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (items.floor_name &&
            items.floor_name.toLowerCase().includes(searchValue.toLowerCase()))
      );
      setFilteredData(filteredResults);
    }
  };

  return (
    <section>
      <div className="w-full flex flex-col overflow-hidden">
        <div className="flex flex-col sm:flex-row md:justify-between gap-3 my-3">
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search By Building Name, Floor Name, Parking Slot or Vehicle Type"
            className="border p-2 w-full border-gray-300 rounded-lg placeholder:text-sm"
          />
          <div className="flex gap-3 sm:flex-row flex-col">
            <button
              className="text-white font-semibold px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              style={{ background: themeColor }}
              onClick={() => setAddVehicleModal(true)}
            >
              <IoAddCircleOutline size={22} /> Add
            </button>
          </div>
        </div>
        <div className="mb-3">
          <Table columns={column} data={filteredData} isPagination={true} />
        </div>
        {addVehicleModal && (
          <AddVehicleParkingModal
            setAdded={setAdded}
            onclose={() => setAddVehicleModal(false)}
          />
        )}
        {editVehicleModal && (
          <EditVehicleParkingModal
            vehId={vehId}
            setAdded={setAdded}
            onclose={() => setEditVehicleModal(false)}
          />
        )}
      </div>
    </section>
  );
}

export default VehicleParkingSetup;