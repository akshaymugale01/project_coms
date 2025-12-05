import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { IoMdAdd } from "react-icons/io";
import Table from "../../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getAllAddress } from "../../../api";
import { IoAddCircleOutline } from "react-icons/io5";
function AddressesSetup() {
  const [filteredAddress, setFilteredAddress] = useState([]);
  const column = [
    {
      name: "Actions",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/edit-addresses-setup/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    { name: "Title", selector: (row) => row.address_title, sortable: true },
    { name: "Email", selector: (row) => row.email_address, sortable: true },
    {
      name: "Phone Number",
      selector: (row) => row.phone_number,
      sortable: true,
    },
    {
      name: "Building Name",
      selector: (row) => row.building_name,
      sortable: true,
    },
    { name: "Street Name", selector: (row) => row.street_name, sortable: true },
    { name: "City", selector: (row) => row.city, sortable: true },
    { name: "State", selector: (row) => row.state, sortable: true },
    { name: "Pin Code", selector: (row) => row.pin_code, sortable: true },

    // { name: "Fax", selector: (row) => row.fax, sortable: true },
    // { name: "GST No.", selector: (row) => row.gstNo, sortable: true },
    // { name: "Created On", selector: (row) => row.createdOn, sortable: true },
    // { name: "Updated On", selector: (row) => row.updatedOn, sortable: true },
  ];

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const addressResp = await getAllAddress();
        console.log(addressResp.data);
        setFilteredAddress(addressResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddress();
  }, []);
 
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex flex-col sm:flex-row md:justify-between gap-3 mt-10 my-4">
          <input
            type="text"
            placeholder="search"
            className="border p-1 w-96 border-gray-400 rounded-md"
          />
          <div className="flex gap-3 sm:flex-row flex-col">
            <Link
              to={`/admin/add-addresses-setup`}
              className=" font-semibold border-2 justify-center border-black px-4 p-1 flex gap-2 items-center rounded-md"
            >
              <IoAddCircleOutline /> Add
            </Link>
          </div>
        </div>
        <div className="">
          <Table columns={column} data={filteredAddress} isPagination={true} />
        </div>
      </div>
    </section>
  );
}

export default AddressesSetup;
