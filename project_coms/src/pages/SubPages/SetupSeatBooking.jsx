import React, { useState } from "react";
import { BiExport } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import { BsEye } from "react-icons/bs";
import { Switch } from "../../Buttons";
import { PiPlus, PiPlusCircle, PiPlusCircleBold } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const SetupSeatBooking = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [showAddTypeModal, setShowAddTypeModal] = useState(false);
  const setupColumn = [
    {
      name: "Action",
      cell: (row) => (
        <Link to={`/bookings/booking-details/${row.id}`}>
          <BsEye />
        </Link>
      ),
      sortable: true,
    },
    { name: "ID", selector: (row) => row.id, sortable: true },
    {
      name: "Name",
      selector: (row) => row.facility,
      sortable: true,
    },
    { name: "Type", selector: (row) => row.type, sortable: true },
    { name: "Department", selector: (row) => row.department, sortable: true },
    {
      name: "Book By",
      selector: (row) => row.bookBy,
      sortable: true,
    },
    {
      name: "Book Before",
      selector: (row) => row.bookBefore,
      sortable: true,
    },
    {
      name: "Advance Booking",
      selector: (row) => row.advBooking,
      sortable: true,
    },
    {
      name: "Created On",
      selector: (row) => row.createdOn,
      sortable: true,
    },
    // {
    //   name: "Created By",
    //   selector: (row) => row.createdBy,
    //   sortable: true,
    // },
    // {
    //   name: "Status",
    //   selector: (row) => row.status,
    //   sortable: true,
    // },
  ];
  const seatTypeColumn = [
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <Link to={`/bookings/booking-details/${row.id}`}>
    //       <BsEye />
    //     </Link>
    //   ),
    //   sortable: true,
    // },

    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Active/Inactive",
      selector: (row) => (
        <div>
          <Switch />
        </div>
      ),
    },
    {
      name: "Created On",
      selector: (row) => row.createdOn,
      sortable: true,
    },
    // {
    //   name: "Created By",
    //   selector: (row) => row.createdBy,
    //   sortable: true,
    // },
    // {
    //   name: "Status",
    //   selector: (row) => row.status,
    //   sortable: true,
    // },
  ];

  const setupData = [
    {
      id: 1,
      // action: <ImEye />,
      facility: "fac1",
      type: "Bookable",
      department: "Electrical",
      bookBy: "slot",
      bookBefore: "date/time",
      advBooking: "date/time",
      createdOn: "23/04/2024 - time",
      createdBy: "user",
      // status: <Switch checked={"checked"} />,
    },
    {
      id: 2,
      // action: <ImEye />,
      facility: "Test",
      type: "Bookable",
      department: "Electrical",
      bookBy: "slot",
      bookBefore: "date/time",
      advBooking: "date/time",
      createdOn: "23/04/2024 - time",
      createdBy: "user",
      // status: <Switch />,
    },
  ];
  const seatTypeData = [
    {
      id: 1,
      name: "Cubicle",
      createdOn: "23/04/2024",
    },
    {
      id: 2,
      name: "Quiet Zone Seat",
      createdOn: "23/04/2024",
    },
  ];

  const [filteredData, setFilteredData] = useState(setupData);
  const [searchText, setSearchText] = useState("");
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    const filteredResults = setupData.filter((item) =>
      item.facility.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const [page, setPage] = useState("type");
  return (
    <div>
      <div className="flex gap-4 items-center border-b">
        <h2
          className={`${
            page === "type"
              ? "text-blue-500 border-b border-blue-500 font-medium"
              : ""
          } transition-all duration-300 ease-in-out cursor-pointer`}
          onClick={() => setPage("type")}
        >
          Seat Type
        </h2>
        <h2
          className={`${
            page === "setup"
              ? "text-blue-500 border-b border-blue-500 font-medium"
              : ""
          } transition-all duration-300 ease-in-out cursor-pointer`}
          onClick={() => setPage("setup")}
        >
          Seat Setup
        </h2>
      </div>
      {page === "type" && (
        <>
          <div className="flex gap-2 items-center w-full my-2">
            <input
              type="text"
              placeholder="Search by name"
              className="border p-2 border-gray-300 rounded-md w-full"
              value={searchText}
              onChange={handleSearch}
            />
            <div className="flex gap-2 justify-end  ">
              <button
                style={{ background: themeColor }}
                className="rounded-md p-2 px-4 flex items-center gap-2 text-white"
                onClick={() => setShowAddTypeModal(true)}
              >
                <PiPlusCircle /> Add
              </button>
            </div>
          </div>
          <Table
            columns={seatTypeColumn}
            data={seatTypeData}
            // customStyles={customStyle}
          />
        </>
      )}
      {page === "setup" && (
        <>
          <div className="flex gap-2 items-center w-full">
            <input
              type="text"
              placeholder="Search by name"
              className="border p-2 border-gray-300 rounded-md w-full"
              value={searchText}
              onChange={handleSearch}
            />
            <div className="flex gap-2 justify-end ">
              <Link
                style={{ background: themeColor }}
                to={"/setup/seat-setup"}
                className="bg-black w-20 rounded-lg flex font-semibold items-center gap-2 text-white p-2 my-2"
              >
                <IoAddCircleOutline size={20} />
                Add
              </Link>
            </div>
          </div>
          <Table
            columns={setupColumn}
            data={filteredData}
            // customStyles={customStyle}
          />
        </>
      )}
      {showAddTypeModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-2 rounded-lg w-1/3">
            <h2 className="text-xl font-medium mb-2 text-center flex items-center gap-2 justify-center border-b">
              <PiPlusCircleBold /> Create Type
            </h2>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="font-medium text-gray-600">
                  Type Name
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="border border-gray-400 rounded-md p-1"
                  placeholder="Enter Type name"
                />
              </div>
              <div className="flex flex-col gap-1 ">
                <label htmlFor="" className="font-medium text-gray-600">
                  Type image
                </label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex justify-center items-center gap-2 border-t  py-2">
                <button className="bg-green-500 rounded-md p-1 px-2 text-white flex items-center gap-2">
                  <FaCheck /> Submit
                </button>
                <button
                  className="bg-red-500 rounded-md p-1 px-3 text-white flex items-center gap-2"
                  onClick={() => setShowAddTypeModal(false)}
                >
                  <MdClose /> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupSeatBooking;
