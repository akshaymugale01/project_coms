import React, { useState } from "react";
import Navbar from "../../../components/Navbar.jsx";
import Table from "../../../components/table/Table.jsx";
import { ImEye } from "react-icons/im";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import ToggleSwitch from "../../../Buttons/ToggleSwitch.jsx";
import { useNavigate } from "react-router-dom";
//import Modal from "../containers/modals/Modal";
const ParkingConfigurationSetup = () => {
  const themeColor = useSelector((state) => state.theme.color);

  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate("/admin/parking-config");
  };
  const column = [
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/edit-park-config/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    { name: "Location", selector: (row) => row.Location, sortable: true },
    { name: "Floor", selector: (row) => row.Floor, sortable: true },
    {
      name: "Parking Type",
      selector: (row) => row.Parking_Type,
      sortable: true,
    },
    { name: "2 Wheeler", selector: (row) => row.TwoWheeler, sortable: true },
    { name: "Car", selector: (row) => row.Car, sortable: true },
  ];

  const data = [
    {
      id: 1,
      Location: "Location 1",
      Floor: "Floor 1",
      Parking_Type: "Type 1",
      TwoWheeler: "Available",
      Car: "Available",
    },
    {
      id: 2,
      Location: "Location 2",
      Floor: "Floor 2",
      Parking_Type: "Type 2",
      TwoWheeler: "Not Available",
      Car: "Available",
    },
    // Add more data as needed
  ];

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "#333",
        color: "white",
        fontSize: "14px",
      },
    },
  };
  return (
    <div className="w-full flex mx-3 flex-col overflow-hidden">
      <div className=" flex m-3 flex-row">
        <button
          to={"/admin/parking-config"}
          className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
          style={{ height: "1cm" }}
          onClick={handleAddClick}
        >
          <PiPlusCircle size={20} />
          Add
        </button>
      </div>
      <Table
        columns={column}
        data={data}
        // customStyles={customStyle}
        responsive
        fixedHeader
        fixedHeaderScrollHeight="500px"
        pagination
        selectableRowsHighlight
        highlightOnHover
        omitColumn={column}
      />
    </div>
  );
};

export default ParkingConfigurationSetup;