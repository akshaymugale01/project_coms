import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { IoAddCircleOutline } from "react-icons/io5";
import Navbar from "../components/Navbar";
import { ImEye } from "react-icons/im";
import { BiExport } from "react-icons/bi";
import ExportBookingModal from "../containers/modals/ExportBookingsModal";
import { Link } from "react-router-dom";
import SetupBookingFacility from "./SubPages/SetupBookingFacility";
import SeatBooking from "./SubPages/SeatBooking";
import Table from "../components/table/Table";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";

const Booking = () => {
  const [searchText, setSearchText] = useState("");
  const [modal, showModal] = useState(false);
  const [page, setPage] = useState("meetingBooking");
  const column = [
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
      name: "Facility",
      selector: (row) => row.facility,
      sortable: true,
    },
    { name: "Booked By", selector: (row) => row.bookedBy, sortable: true },
    { name: "Booked On", selector: (row) => row.bookedOn, sortable: true },
    {
      name: "Facility Type",
      selector: (row) => row.facilityType,
      sortable: true,
    },
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
      facility: "Cabin",
      bookedBy: "Ravindar Sahani",
      bookedOn: "01/11/2024",
      facilityType: "bookable",
      scheduledOn: "05/11/2024",
      scheduledTime: "05:00PM to 06:00PM",
      bookingStatus: "confirmed",
    },
    {
      id: 2,
      action: <ImEye />,
      facility: "Conference Room",
      bookedBy: "Mittu Panda",
      bookedOn: "25/10/2024",
      facilityType: "bookable",
      scheduledOn: "01/11/2024",
      scheduledTime: "02:00 PM to 03:00 PM",
      bookingStatus: "Confirmed",
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

  const themeColor = useSelector((state) => state.theme.color);
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex justify-center">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200 ">
            <h2
              className={`p-1 ${
                page === "meetingBooking" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
              onClick={() => setPage("meetingBooking")}
            >
              Amenities Bookings
            </h2>
             {/* <h2
              className={`p-1 ${
                page === "seatBooking" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
              onClick={() => setPage("seatBooking")}
            >
              Seat Bookings
            </h2>  */}
          </div>
        </div>
        {page === "meetingBooking" && (
          <div>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Search By Facility"
                className="border p-2 w-full border-gray-300 rounded-lg"
                value={searchText}
                onChange={handleSearch}
              />
              <div className="flex gap-2 justify-end">
                <Link
                  to={"/bookings/new-facility-booking"}
                  style={{ background: themeColor }}
                  className="bg-black w-20 rounded-lg flex font-semibold items-center gap-2 text-white p-2 my-2"
                >
                  <IoAddCircleOutline size={20} />
                  Book
                </Link>
                <button
                  style={{ background: themeColor }}
                  onClick={() => showModal(true)}
                  className="bg-black rounded-lg flex font-semibold items-center gap-2 text-white p-2 my-2"
                >
                  <BiExport size={20} />
                  Export
                </button>
              </div>
            </div>

            <Table columns={column} data={filteredData} />
            {modal && <ExportBookingModal onclose={() => showModal(false)} />}
          </div>
        )}
        {page === "seatBooking" && (
          <div>
            <SeatBooking />
          </div>
        )}
      </div>
    </section>
  );
};

export default Booking;
