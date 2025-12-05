import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { IoAddCircleOutline } from "react-icons/io5";
import { ImEye } from "react-icons/im";
import { BiExport } from "react-icons/bi";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import EmployeeSeat from "./EmployeeSeat";
import Table from "../../components/table/Table";

const EmployeeBooking = () => {
  const [searchText, setSearchText] = useState("");
  const [modal, showModal] = useState(false);
  const [page, setPage] = useState("meetingBooking");
  const column = [
    {
      name: "Action",
      cell: (row) => (
        <Link to={`/bookings/booking-details/${row.id}`}>{row.action}</Link>
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
      bookingStatus: "pending",
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

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",
        fontSize: "14px",
      },
    },
  };
  return (
    <section className="flex ">
      <Navbar />
      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex justify-center">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200 ">
            <h2
              className={`p-1 ${
                page === "meetingBooking" && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
              onClick={() => setPage("meetingBooking")}
            >
              Facility Booking
            </h2>
            <h2
              className={`p-1 ${
                page === "seatBooking" && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
              onClick={() => setPage("seatBooking")}
            >
              Seat Bookings
            </h2>
          </div>
        </div>
        {page === "meetingBooking" && (
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
                  to={"/employees/facility-booking"}
                  className="bg-black w-20 rounded-lg flex font-semibold items-center gap-2 text-white p-2 my-5"
                >
                  <IoAddCircleOutline size={20} />
                  Book
                </Link>
              </div>
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
          </div>
        )}
        {page === "seatBooking" && (
          <div>
            <EmployeeSeat />
          </div>
        )}
      </div>
    </section>
  );
};

export default EmployeeBooking;
