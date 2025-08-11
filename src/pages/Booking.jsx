import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { IoAddCircleOutline } from "react-icons/io5";
import Navbar from "../components/Navbar";
import { BiEdit, BiExport } from "react-icons/bi";
import ExportBookingModal from "../containers/modals/ExportBookingsModal";
import { Link } from "react-router-dom";
import SeatBooking from "./SubPages/SeatBooking";
import Table from "../components/table/Table";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";
import {
  getAmenitiesBooking,
  getAmenityBooking,
  getFacitilitySetup,
  getHotelSetup,
} from "../api";

const Booking = () => {
  const [searchText, setSearchText] = useState("");
  const [modal, showModal] = useState(false);
  const [page, setPage] = useState("meetingBooking");
  const [bookings, setBookings] = useState([]); // State to hold booking data
  const [page_no, setPageNo] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [bookingFacility, setBookingFacility] = useState([]);
  const [hotelbooking, setHotelBooking] = useState([]);
  const themeColor = "rgb(3, 19 37)";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hotelbookingResponse = await getAmenitiesBooking();
        console.log("Bookings Data:", hotelbookingResponse?.data);
        setHotelBooking(hotelbookingResponse?.data.amenity_bookings || []);

        // Fetch Bookings
        const bookingsResponse = await getAmenityBooking();
        console.log("Bookings Data:", bookingsResponse?.data);
        setBookings(bookingsResponse?.data.amenity_bookings || []);

        // Fetch Facility Setup — pass the required params here!
        const facilityResponse = await getFacitilitySetup(page_no, per_page);
        setBookingFacility(facilityResponse?.data.amenities || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(`Failed to fetch data: ${error.message || error}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [page_no, per_page]); // add dependencies if these are dynamic

  useEffect(() => {
    console.log("Updated Booking Facility:", bookingFacility);
  }, [bookingFacility]);

  const combinedData = bookings?.map((booking) => {
    const facility = bookingFacility.find(
      (fac) => fac.id === booking.amenity_id
    );
    console.log("Facility Data:", facility);
    // Find the relevant slot from amenity slots
    const amenitySlots = facility?.amenity_slots || [];
    const slot = amenitySlots.find((s) => s.id === booking.amenity_slot_id);

    // Format the slot time if found
    const slotTime = slot
      ? `${String(slot.start_hr || 0).padStart(2, "0")}:${String(
          slot.start_min || 0
        ).padStart(2, "0")} - ${String(slot.end_hr || 0).padStart(
          2,
          "0"
        )}:${String(slot.end_min || 0).padStart(2, "0")}`
      : "N/A";

    return {
      ...booking,
      fac_name: facility?.fac_name || "N/A",
      fac_type: facility?.fac_type || "N/A",
      description: facility?.description || "N/A",
      terms: facility?.terms || "N/A",
      slot_time: slotTime, // Add formatted slot time
    };
  });

  // Sort combinedData by ID in descending order
  const sortedData = combinedData.sort((a, b) => b.id - a.id);

  const combinedHotelData = hotelbooking.map((booking) => {
      const facility = bookingFacility.find(
        (fac) => fac.id === booking.amenity_id
      );

      if (!facility || !facility.is_hotel) return null; // Filter out non-hotel amenities

      // const amenitySlots = facility.amenity_slots || [];
      // const slot = amenitySlots.find((s) => s.id === booking.amenity_slot_id);

      // const slotTime = slot
      //   ? `${String(slot.start_hr || 0).padStart(2, "0")}:${String(
      //       slot.start_min || 0
      //     ).padStart(2, "0")} - ${String(slot.end_hr || 0).padStart(
      //       2,
      //       "0"
      //     )}:${String(slot.end_min || 0).padStart(2, "0")}`
      //   : "N/A";

      return {
        ...booking,
        fac_name: facility.fac_name || "N/A",
        fac_type: facility.fac_type || "N/A",
        description: facility.description || "N/A",
        terms: facility.terms || "N/A",
        // slot_time: slotTime,
      };
    })
    .filter((item) => item !== null) // Remove filtered-out bookings
    .sort((a, b) => b.id - a.id); // Sort descending by booking ID

  const sortHotelData = combinedHotelData;

  // Handle Search
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);

    const filteredResults = sortedData.filter((item) =>
      item.fac_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setBookings(filteredResults);
  };

  // Columns for DataTable
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex item-center gap-2">
          <Link to={`/bookings/booking-details/${row.id}`}>
            <BsEye />
          </Link>
          {/* <Link to={`bookings/edit_bookings/${row.id}`}>
        <BiEdit size={15} />
      </Link> */}
        </div>
      ),
      sortable: false,
    },
    { name: "ID", selector: (row) => row.id, sortable: true },
    // {
    //   name: "Facility ID",
    //   selector: (row) => row.amenity_id,
    //   sortable: true,
    // },
    {
      name: "Facility Name",
      selector: (row) => row.amenity.fac_name,
      sortable: true,
    },
    {
      name: "Facility Type",
      selector: (row) => row.amenity.fac_type,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) => row.amount || "NA",
      sortable: true,
    },
    {
      name: "Paymnet Status",
      selector: (row) => row.status || "NA",
      sortable: true,
    },
    {
      name: "Paymnet Method",
      selector: (row) => row?.payment?.payment_method || "NA",
      sortable: true,
    },
    {
      name: "Booked By",
      selector: (row) => {
        console.log("row", row.book_by_user);
        return row?.book_by_user || "User Not Set!";
      },
      sortable: true,
    },
    {
      name: "Booked On",
      selector: (row) => {
        const date = new Date(row.created_at);
        const yy = date.getFullYear().toString(); // Get last 2 digits of the year
        const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const dd = String(date.getDate()).padStart(2, "0");
        return `${dd}/${mm}/${yy}`;
      },
      sortable: true,
    },
    {
      name: "Scheduled On",
      selector: (row) => {
        const date = new Date(row.booking_date);
        const yy = date.getFullYear().toString(); // Get last 2 digits of the year
        const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const dd = String(date.getDate()).padStart(2, "0");
        return `${dd}/${mm}/${yy}`;
      },
      sortable: true,
    },
    {
      name: "Scheduled Time",
      selector: (row) => row.slot.slot_str || "N/A",
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.amenity.description,
      sortable: true,
    },
    {
      name: "Terms",
      selector: (row) => row.amenity.terms,
      sortable: true,
    },
    {
      name: "Booking Status",
      selector: (row) => row.status || "N/A",
      sortable: true,
    },
  ];

  const hotelColumns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex item-center gap-2">
          <Link to={`/bookings/booking-details/${row.id}`}>
            <BsEye />
          </Link>
          {/* <Link to={`bookings/edit_bookings/${row.id}`}>
        <BiEdit size={15} />
      </Link> */}
        </div>
      ),
      sortable: false,
    },
    { name: "ID", selector: (row) => row.id, sortable: true },
    // {
    //   name: "Facility ID",
    //   selector: (row) => row.amenity_id,
    //   sortable: true,
    // },
    {
      name: "Facility Name",
      selector: (row) => row.fac_name,
      sortable: true,
    },
    {
      name: "Facility Type",
      selector: (row) => row.fac_type,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) => row.amount || "NA",
      sortable: true,
    },
    {
      name: "Payment Status",
      selector: (row) => row.status || "NA",
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: (row) => row.payment_mode || "NA",
      sortable: true,
    },
    {
      name: "Booked By",
      selector: (row) => {
        console.log("row", row.book_by_user);
        return row?.book_by_user || "User Not Set!";
      },
      sortable: true,
    },
    {
      name: "Booked On",
      selector: (row) => {
        const date = new Date(row.created_at);
        const yy = date.getFullYear().toString(); // Get last 2 digits of the year
        const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const dd = String(date.getDate()).padStart(2, "0");
        return `${dd}/${mm}/${yy}`;
      },
      sortable: true,
    },
    {
      name: "Check-in Date",
      selector: (row) => {
        const date = new Date(row.checkin_at);
        const yy = date.getFullYear().toString(); // Get last 2 digits of the year
        const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const dd = String(date.getDate()).padStart(2, "0");
        return `${dd}/${mm}/${yy}`;
      },
      sortable: true,
    },
    {
      name: "Check-out Date",
      selector: (row) => {
        const date = new Date(row.checkout_at);
        const yy = date.getFullYear().toString(); // Get last 2 digits of the year
        const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const dd = String(date.getDate()).padStart(2, "0");
        return `${dd}/${mm}/${yy}`;
      },
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Terms",
      selector: (row) => row.terms,
      sortable: true,
    },
    {
      name: "Booking Status",
      selector: (row) => row.status || "N/A",
      sortable: true,
    },
  ];
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex justify-center">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200">
            <h2
              className={`p-1 ${
                page === "meetingBooking" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              onClick={() => setPage("meetingBooking")}
            >
              Amenities Bookings
            </h2>
            <h2
              className={`p-1 ${
                page === "hotelBooking" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              onClick={() => setPage("hotelBooking")}
            >
              Hotel Bookings
            </h2>
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

            <div className="flex min-h-screen">
              {loading ? (
                <p className="text-center">Loading bookings...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : (
                <div className="w-full">
                  <Table columns={columns} data={sortedData} />
                </div>
              )}
            </div>
            {modal && <ExportBookingModal onclose={() => showModal(false)} />}
          </div>
        )}

        {page === "hotelBooking" && (
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
                  to={"/bookings/new-hotel-booking"}
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

            <div className="flex min-h-screen">
              {loading ? (
                <p className="text-center">Loading bookings...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : (
                <div className="w-full">
                  <Table columns={hotelColumns} data={sortHotelData} />
                </div>
              )}
            </div>
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
