import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Table from "../../../components/table/Table";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";
import Navbar from "../../../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoAddCircleOutline, IoClose } from "react-icons/io5";
import { getFlightTicketRequest } from "../../../api";
import BookingRequestNav from "./BookingRequestnav";

const FlightRequest = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [FlightrequestsData, setFlightrequestsData] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  useEffect(() => {
    const fetchFlightRequest = async () => {
      try {
        const response = await getFlightTicketRequest();
        const flightreqresp = response.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        console.log("response from api", flightreqresp);

        setFlightrequestsData(flightreqresp);
      } catch (err) {
        console.error("Failed to fetch flight request data:", err);
      }
    };

    fetchFlightRequest(); // Call the API
  }, []);

  // Handle status change function
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    // Implement logic to filter data based on status
  };

  // Define columns for the table
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/flight-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/flight-edit/${row.id}`}>
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
      name: "Departure City",
      selector: (row) => row.departure_city,
      sortable: true,
    },
    {
      name: "Arrival City",
      selector: (row) => row.arrival_city,
      sortable: true,
    },
    {
      name: "Departure Date",
      selector: (row) => row.departure_date,
      sortable: true,
    },
    {
      name: "Return Date",
      selector: (row) => row.return_date,
      sortable: true,
    },
    {
      name: "Preferred Airline",
      selector: (row) => row.preferred_airlines,
      sortable: true,
    },
    {
      name: "Ticket Confirmation Number",
      selector: (row) => row.ticket_confirmation_number,
      sortable: true,
    },
    {
      name: "Booking Confirmation Email",
      selector: (row) => row.booking_confirmation_email,
      sortable: true,
    },
    {
      name: "Class",
      selector: (row) => row.flight_class,
      sortable: true,
    },
    {
      name: "Passenger Name",
      selector: (row) => row.passenger_name,
      sortable: true,
    },
    {
      name: "Passport Information",
      selector: (row) => row.passport_information,
      sortable: true,
    },
    {
      name: "Manager Approval",
      selector: (row) => (row.manager_approval ? "Approved" : "Not Approved"),
      sortable: true,
    },

    {
      name: "Booking Status",
      selector: (row) => row.booking_status,
      sortable: true,
    },

    // {
    //   name: "Approval",
    //   selector: (row) =>

    //       <div className="flex justify-center gap-2">
    //         <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full">
    //           <TiTick size={20} />
    //         </button>
    //         <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full">
    //           <IoClose size={20} />
    //         </button>
    //       </div>
    //     ,
    //   sortable: true,
    // },
  ];

  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <BookingRequestNav />
        <div className="w-full flex mx-3 flex-col overflow-hidden mb-4">
          <div className="flex md:flex-row flex-col gap-5 justify-between mt-10 my-2">
            <div className="sm:flex grid grid-cols-2 items-center justify-center  gap-4 border border-gray-300 rounded-md px-3 p-2 w-auto">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="all"
                  name="status"
                  checked={selectedStatus === "all"}
                  onChange={() => handleStatusChange("all")}
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
                  onChange={() => handleStatusChange("upcoming")}
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
                  onChange={() => handleStatusChange("completed")}
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
                  onChange={() => handleStatusChange("cancelled")}
                />
                <label htmlFor="cancelled" className="text-sm">
                  Cancelled
                </label>
              </div>
            </div>
            <span className="mr-4">
              <Link
                to="/admin/add-flight-request"
                style={{ background: themeColor }}
                className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center"
              >
                <IoAddCircleOutline size={20} />
                Add
              </Link>
            </span>
          </div>

          <Table columns={columns} data={FlightrequestsData} />
        </div>{" "}
      </div>
    </section>
  );
};

export default FlightRequest;
