import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { IoAddCircleOutline, IoClose } from "react-icons/io5";
import Table from "../../../components/table/Table";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

import Navbar from "../../../components/Navbar";
import BookingRequestNav from "./BookingRequestnav";
import { getHotelRequest } from "../../../api";

const HotelRequest = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [HotelrequestsData, setHotelrequestsData] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchFlightRequest = async () => {
      try {
        const response = await getHotelRequest();
        const hotelreqresp = response.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        console.log("response from api", hotelreqresp);

        setHotelrequestsData(hotelreqresp);
      } catch (err) {
        console.error("Failed to fetch hotel request data:", err);
      }
    };

    fetchFlightRequest(); // Call the API
  }, []);
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/hotel-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/hotel-edit/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Employee ID",
      selector: (row) => row.employee_id,
      sortable: true,
    },
    {
      name: "Employee Name",
      selector: (row) => row.employee_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.booking_certification_email,
      sortable: true,
    },
    {
      name: "Destination",
      selector: (row) => row.destination,
      sortable: true,
    },
    {
      name: "Check-in Date",
      selector: (row) => dateFormat(row.check_in_date),
      sortable: true,
    },
    {
      name: "Check-out Date",
      selector: (row) => dateFormat(row.check_out_date),
      sortable: true,
    },
    {
      name: "Hotel Preferences",
      selector: (row) => row.hotel_preferences,
      sortable: true,
    },

    {
      name: "Number of Rooms",
      selector: (row) => row.number_of_rooms,
      sortable: true,
    },
    {
      name: "Room Type",
      selector: (row) => row.room_type,
      sortable: true,
    },
    // {
    //   name: "Manager Approval ",
    //   selector: (row) => (row.manager_approval ? "Approved" : "Not Approved"),
    //   sortable: true,
    // },
    {
      name: "Booking Status ",
      selector: (row) => row.booking_status,
      sortable: true,
    },

    {
      name: "Approval",
      selector: (row) =>
        row.booking_status === "pending" && (
          <div className="flex justify-center gap-2">
            <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full">
              <TiTick size={20} />
            </button>
            <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full">
              <IoClose size={20} />
            </button>
          </div>
        ),
      sortable: true,
    },
  ];

  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <BookingRequestNav />

        {/* Filters and Add Button */}
        <div className="flex md:flex-row flex-col gap-5 justify-between mt-10 my-2">
          <div className="sm:flex grid grid-cols-2 items-center justify-center gap-4 border border-gray-300 rounded-md px-3 p-2 w-auto">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="all"
                name="status"
                checked={selectedStatus === "all"}
                onChange={() => setSelectedStatus("all")}
              />
              <label htmlFor="all" className="text-sm">
                All
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="upcoming"
                name="status"
                checked={selectedStatus === "upcoming"}
                onChange={() => setSelectedStatus("upcoming")}
              />
              <label htmlFor="upcoming" className="text-sm">
                Upcoming
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="completed"
                name="status"
                checked={selectedStatus === "completed"}
                onChange={() => setSelectedStatus("completed")}
              />
              <label htmlFor="completed" className="text-sm">
                Completed
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="cancelled"
                name="status"
                checked={selectedStatus === "cancelled"}
                onChange={() => setSelectedStatus("cancelled")}
              />
              <label htmlFor="cancelled" className="text-sm">
                Cancelled
              </label>
            </div>
          </div>
          <span className="flex gap-4">
            <Link
              to={"/admin/add-hotel-request"}
              style={{ background: themeColor }}
              className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center"
            >
              <IoAddCircleOutline size={20} />
              Add
            </Link>
          </span>
        </div>

        {/* Table Component */}
        <Table
          responsive
          columns={columns}
          data={HotelrequestsData}
          //   customStyles={customStyle}
          pagination
          fixedHeader
          selectableRowsHighlight
          highlightOnHover
        />
      </div>
    </section>
  );
};

export default HotelRequest;
