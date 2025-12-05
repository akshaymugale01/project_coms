import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { BiExport } from "react-icons/bi";
import { ImEye } from "react-icons/im";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";

const SeatBooking = () => {
  const [searchText, setSearchText] = useState("");
  const [modal, showModal] = useState(false);
  const [page, setPage] = useState("meetingBooking");
  const themeColor = useSelector((state) => state.theme.color);
  const column = [
    {
      name: "Action",
      cell: (row) => (
        <Link to={`/bookings/booking-details/${row.id}`}><BsEye/></Link>
      ),
      sortable: true,
    },
    { name: "Booking ID", selector: (row) => row.id, sortable: true },
    {
      name: "Seat Type",
      selector: (row) => row.facility,
      sortable: true,
    },
    {
      name: "Seat Number",
      selector: (row) => row.facility,
      sortable: true,
    },
    { name: "Booked By", selector: (row) => row.bookedBy, sortable: true },
    { name: "Booked On", selector: (row) => row.bookedOn, sortable: true },
    {
      name: "Scheduled On",
      selector: (row) => row.scheduledOn,
      sortable: true,
    },
    {
      name: "Scheduled Time",
      selector: (row) => row.scheduledTime,
      sortable: true,
    },
    {
      name: "Booking Status",
      selector: (row) => row.bookingStatus,
      sortable: true,
    },
  ];
  const data = [
    {
      id: 1,
      action: <ImEye />,
      facility: "fac1",
      bookedBy: "A",
      bookedOn: "booked date",
      facilityType: "bookable",
      scheduledOn: "date",
      scheduledTime: "time",
      bookingStatus: "confirmed",
    },
    {
      id: 2,
      action: <ImEye />,
      facility: "Test2",
      bookedBy: "B",
      bookedOn: "booked date",
      facilityType: "bookable",
      scheduledOn: "date",
      scheduledTime: "time",
      bookingStatus: "Requested",
    },
  ];

  const [filteredData, setFilteredData] = useState(data);
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    const filteredResults = data.filter((item) =>
      item.facility.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Facility"
          className="border-2 p-2 w-96 border-gray-300 rounded-lg"
          value={searchText}
          onChange={handleSearch}
        />
        <div className="flex gap-4 justify-end w-full">
          <Link
            to={"/seat-booking"}
            style={{ background: themeColor }}
            className=" w-20 rounded-lg flex font-semibold items-center gap-2 text-white p-2 my-5"
          >
            <IoAddCircleOutline size={20} />
            Book
          </Link>
          <button
            onClick={() => showModal(true)}
            className="bg-black rounded-lg flex font-semibold items-center gap-2 text-white p-2 my-5"
          >
            <BiExport size={20} />
            Export
          </button>
        </div>
      </div>
      <Table
        columns={column}
        data={filteredData}
       
      />
      {/* {modal && <ExportBookingModal onclose={() => showModal(false)} />} */}
    </div>
  );
};

export default SeatBooking;
