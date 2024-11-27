import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { IoAddCircleOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import DeliveryVendorModal from "../../containers/modals/DeliveryVendorModal";
import Table from "../../components/table/Table";

const DeliveryVendor = () => {
  const [modal, showModal] = useState(false);
  const [add, setAdd] = useState(false);
  const [searchText, setSearchText] = useState("");
  const handleButtonClick = () => {
    showModal(true);
  };

  const column = [
    {
      name: "Action",
      cell: (row) => (
        <button onClick={() => handleButtonClick(row.id)}>{row.action}</button>
      ),
      sortable: true,
    },
    { name: "Name", selector: (row) => row.name, sortable: true },
    {
      name: "Website Link",
      selector: (row) => row.websitelink,
      sortable: true,
    },
    { name: "SPOC Person", selector: (row) => row.SPOC, sortable: true },
    { name: "Contact Number", selector: (row) => row.contact, sortable: true },
    {
      name: "Agreement Start Date",
      selector: (row) => row.ASD,
      sortable: true,
    },
    {
      name: "Agreement End Date",
      selector: (row) => row.AED,
      sortable: true,
    },
    {
      name: "Active/Inactive",
      selector: (row) => row.status,
      sortable: true,
    },

    {
      name: "Created On",
      selector: (row) => row.createdOn,
      sortable: true,
    },
  ];
  const data = [
    {
      id: 1,
      action: <BiEdit />,
      name: "fac1",
      websitelink: "A",
      SPOC: "person1",
      contact: "12345",
      ASD: "bookable",
      AED: "date",
      status: "time",
      createdOn: "confirmed",
    },
    {
      id: 2,
      action: <BiEdit />,
      name: "person2",
      websitelink: "A",
      SPOC: "person1",
      contact: "12345",
      ASD: "bookable",
      AED: "date",
      status: "time",
      createdOn: "confirmed",
    },
  ];

  const [filteredData, setFilteredData] = useState(data);
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",

        fontSize: "10px",
      },
    },
    headCells: {
      style: {
        textTransform: "upperCase",
      },
    },
  };
  return (
    <div className="my-5">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By name"
          className="border-2 p-2 w-96 border-gray-300 rounded-lg"
          value={searchText}
          onChange={handleSearch}
        />

        <button
          onClick={() => setAdd(true)}
          className="bg-black  rounded-lg flex font-semibold items-center gap-2 text-white p-2 my-5"
        >
          <IoAddCircleOutline size={20} />
          Add
        </button>
      </div>
      <Table
        columns={column}
        data={filteredData}
        // customStyles={customStyle}
        // fixedHeader
        // fixedHeaderScrollHeight="500px"
        // pagination
        // selectableRowsHighlight
        // highlightOnHover
        // omitColumn={column}
      />
      {modal && <DeliveryVendorModal onclose={() => showModal(false)} />}
      {add && (
        <DeliveryVendorModal title={"Add"} onclose={() => setAdd(false)} />
      )}
    </div>
  );
};

export default DeliveryVendor;
