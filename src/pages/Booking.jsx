import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { IoAddCircleOutline } from "react-icons/io5";
import Navbar from "../components/Navbar";
import { BiExport } from "react-icons/bi";
import ExportBookingModal from "../containers/modals/ExportBookingsModal";
import { Link } from "react-router-dom";
import SeatBooking from "./SubPages/SeatBooking";
import Table from "../components/table/Table";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";
import { getAmenitiesBooking, getFacitilitySetup } from "../api";

const Booking = () => {
  const [searchText, setSearchText] = useState("");
  const [modal, showModal] = useState(false);
  const [page, setPage] = useState("meetingBooking");
  const [bookings, setBookings] = useState([]); // State to hold booking data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [bookingFacility, setBookingFacility] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Facility Setup
        const facilityResponse = await getFacitilitySetup();
        console.log("Facility Setup Response:", facilityResponse.data.fac_name);
        setBookingFacility(facilityResponse.data);

        // Fetch Bookings
        const bookingsResponse = await getAmenitiesBooking();
        console.log("Bookings Response:", bookingsResponse);
        setBookings(bookingsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const combinedData = bookings.map((booking) => {
    const facility = bookingFacility.find((fac) => fac.id === booking.amenity_id);
    
    // Find the relevant slot from amenity slots
    const amenitySlots = facility?.amenity_slots || [];
    const slot = amenitySlots.find((s) => s.id === booking.amenity_slot_id);
    
    // Format the slot time if found
    const slotTime = slot ? `${slot.start_hr}:${slot.start_min} - ${slot.end_hr}:${slot.end_min}` : "N/A";
    
    return {
      ...booking,
      fac_name: facility?.fac_name || "N/A",
      fac_type: facility?.fac_type || "N/A",
      description: facility?.description || "N/A",
      terms: facility?.terms || "N/A",
      slot_time: slotTime, // Add formatted slot time
    };
  });
  
  console.log("Combined Data:", combinedData);
  
  // Handle Search
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);

    const filteredResults = combinedData.filter((item) =>
      item.fac_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setBookings(filteredResults);
  };
  // Columns for DataTable
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <Link to={`/bookings/booking-details/${row.id}`}>
          <BsEye />
        </Link>
      ),
      sortable: false,
    },
    { name: "ID", selector: (row) => row.id, sortable: true },
    {
      name: "Facility ID",
      selector: (row) => row.amenity_id,
      sortable: true,
    },
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
      name: "Booked By",
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: "Booked On",
      selector: (row) => row.booking_date,
      sortable: true,
    },
    {
      name: "Scheduled On",
      selector: (row) => row.scheduledOn || "NA",
      sortable: true,
    },
    {
      name: "Scheduled Time",
      selector: (row) => row.slot_time || "N/A",
      sortable: true,
    },
    {
      name: "Booking Status",
      selector: (row) => row.bookingStatus || "N/A",
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

            
            {loading ? (
              <p>Loading bookings...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <Table columns={columns} data={combinedData} />
            )}
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
