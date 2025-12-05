import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { IoAddCircleOutline } from "react-icons/io5";
import DeliveryVendorModal from "../../containers/modals/DeliveryVendorModal";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";

const OutBound = () => {
  const [modal, showModal] = useState(false);
  const [add, setAdd] = useState(false);
  const [searchText, setSearchText] = useState("");
  const column = [
    {
      name: "Action",
      cell: (row) => (
        <Link to={"/mail-room/outbound/outbound-details"}>{row.action}</Link>
      ),
      sortable: true,
    },
    { name: "ID", selector: (row) => row.id, sortable: true },
    {
      name: "Sender Name",
      selector: (row) => row.senderName,
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
      name: "Courier Vendor",
      selector: (row) => row.courierVendor,
      sortable: true,
    },
    {
      name: "AWB Number",
      selector: (row) => row.AWB,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },

    {
      name: "Sending Date",
      selector: (row) => row.sendingDate,
      sortable: true,
    },
  ];
  const data = [
    {
      id: 1,
      action: <BsEye />,
      courierVendor: "Courier",
      senderName: "sender A",
      recipient: "recipient 1",
      unit: "unit 1",
      AWB: "AWB 1",
      entity: "entity1",
      type: "fac1",
      sendingDate: "date",
    },
  ];

  const [filteredData, setFilteredData] = useState(data);
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    const filteredResults = data.filter((item) =>
      item.senderName.toLowerCase().includes(searchValue.toLowerCase())
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
    <div className="my-5 ">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Sender name"
          className="border-2 p-2 w-96 border-gray-300 rounded-lg"
          value={searchText}
          onChange={handleSearch}
        />

        <Link
          to={"/mail-room/outbound/create-outbound"}
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
      />
      {modal && <DeliveryVendorModal onclose={() => showModal(false)} />}
      {add && (
        <DeliveryVendorModal title={"Add"} onclose={() => setAdd(false)} />
      )}
    </div>
  );
};

export default OutBound;
