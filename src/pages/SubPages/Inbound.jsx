import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { IoAddCircleOutline } from "react-icons/io5";
import DeliveryVendorModal from "../../containers/modals/DeliveryVendorModal";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";

const Inbound = () => {
  const [modal, showModal] = useState(false);
  const [add, setAdd] = useState(false);
  const [searchText, setSearchText] = useState("");
  const handleButtonClick = () => {
    showModal(true);
  };

  const column = [
    {
      name: "Action",
      cell: (row) => <Link to={"/mail-room/inbound/inbound-details"}>{row.action}</Link>,
      sortable: true,
    },
    { name: "ID", selector: (row) => row.id, sortable: true },
    {
      name: "Vendor Name",
      selector: (row) => row.vendorName,
      sortable: true,
    },
    { name: "Recipient", selector: (row) => row.recipient, sortable: true },
    { name: "Unit", selector: (row) => row.unit, sortable: true },
    {
      name: "Entity",
      selector: (row) => row.entity,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
    },

    {
      name: "Sender",
      selector: (row) => row.sender,
      sortable: true,
    },
    {
      name: "Company",
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: "Received On",
      selector: (row) => row.receivedOn,
      sortable: true,
    },
    {
      name: "Received By",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Ageing",
      selector: (row) => row.ageing,
      sortable: true,
    },
    {
      name: "Collected On",
      selector: (row) => row.collectedOn,
      sortable: true,
    },
    {
      name: "Collected By",
      selector: (row) => row.collectedBy,
      sortable: true,
    },
  ];
  const data = [
    {
      id: 1,
      action: <BsEye />,

      vendorName: "vendor A",
      recipient: "recipient 1",
      unit: "unit 1",
      entity: "entity1",
      type: "fac1",
      department: "A",
      sender: "person1",
      company: "12345",
      receivedOn: "bookable",
      status: "date",
      ageing: "time",
      collectedOn: "confirmed",
      collectedBy: "person",
    },
    {
      id: 2,
      action: <BsEye />,

      vendorName: "vend B",
      recipient: "recipient 1",
      unit: "unit 1",
      entity: "entity1",
      type: "fac1",
      department: "A",
      sender: "person1",
      company: "12345",
      receivedOn: "bookable",
      status: "date",
      ageing: "time",
      collectedOn: "confirmed",
      collectedBy: "person",
    },
  ];

  const [filteredData, setFilteredData] = useState(data);
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    const filteredResults = data.filter((item) =>
      item.vendorName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",
        fontSize: "12px",
      },
    },
  };
  return (
    <div className="my-5">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Vendor name"
          className="border-2 p-2 w-96 border-gray-300 rounded-lg"
          value={searchText}
          onChange={handleSearch}
        />

        <Link
          to={"/mail-room/inbound/create-inbound"}
          className="bg-black  rounded-lg flex font-semibold items-center gap-2 text-white p-2 my-5"
        >
          <IoAddCircleOutline size={20} />
          Add
        </Link>
      </div>
      <Table
        columns={column}
        data={filteredData}
        // customStyles={customStyle}
        // fixedHeader
        //   fixedHeaderScrollHeight="500px"
        //   pagination
        //   selectableRowsHighlight
        //   highlightOnHover
        //   omitColumn={column}
      />
      {modal && <DeliveryVendorModal onclose={() => showModal(false)} />}
      {add && (
        <DeliveryVendorModal title={"Add"} onclose={() => setAdd(false)} />
      )}
    </div>
  );
};

export default Inbound;
