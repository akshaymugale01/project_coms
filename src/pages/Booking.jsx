import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { IoAddCircleOutline, IoClose } from "react-icons/io5";
import Navbar from "../components/Navbar";
import { BiEdit, BiExport, BiFilter } from "react-icons/bi";
import ExportBookingModal from "../containers/modals/ExportBookingsModal";
import { Link, useLocation } from "react-router-dom";
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
import { FaCalendarCheck } from "react-icons/fa";
import AmenitiesCalendar from "./SubPages/AmenitiesCalendar";

const Booking = () => {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
  fac_name: "",
  fac_type: "",
  payment_status: "",
  booked_by: "",
  booking_status: "",
});
const [showFilterModal, setShowFilterModal] = useState(false);
const [showExportModal, setShowExportModal] = useState(false);  
// const [page, setPage] = useState(getInitialTab());
const location = useLocation();

const getInitialTab = () => {
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab");
  return tab || "meetingBooking";
};

const [page, setPage] = useState(getInitialTab());
  const [bookings, setBookings] = useState([]); // State to hold booking data
  const [page_no, setPageNo] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [bookingFacility, setBookingFacility] = useState([]);
  const [hotelbooking, setHotelBooking] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]); // Filtered amenities bookings
  const [filteredHotelBookings, setFilteredHotelBookings] = useState([]); // Filtered hotel bookings
  
  const themeColor = "rgb(3, 19 37)";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hotelbookingResponse = await getAmenitiesBooking(page_no, per_page); // Pass true to indicate hotel bookings
        console.log("Bookings Data:", hotelbookingResponse?.data);
        const hotelBookings = hotelbookingResponse?.data.amenity_bookings || [];
        setHotelBooking(hotelBookings);
        setFilteredHotelBookings(hotelBookings); // Initialize filtered hotel data

        // Fetch Bookings
        const bookingsResponse = await getAmenityBooking(page_no, per_page);
        console.log("Bookings Data of only amenities:", bookingsResponse?.data);
        const amenityBookings = bookingsResponse?.data.amenity_bookings || [];
        setBookings(amenityBookings);
        setFilteredBookings(amenityBookings); // Initialize filtered data

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

  const applyFilters = () => {
  // ---- FILTER AMENITIES BOOKINGS ----
  const filteredAmenity = bookings.filter((booking) => {
    const facility = bookingFacility.find(
      (fac) => fac.id === booking.amenity_id
    );

    const facName = facility?.fac_name?.toLowerCase() || "";
    const facType = facility?.fac_type?.toLowerCase() || "";
    const bookedBy = booking?.book_by_user?.toLowerCase() || "";
    const paymentStatus = booking?.status?.toLowerCase() || "";
    const bookingStatus = booking?.status?.toLowerCase() || "";

    return (
      (!filters.fac_name ||
        facName.includes(filters.fac_name.toLowerCase())) &&
      (!filters.fac_type ||
        facType.includes(filters.fac_type.toLowerCase())) &&
      (!filters.booked_by ||
        bookedBy.includes(filters.booked_by.toLowerCase())) &&
      (!filters.payment_status ||
        paymentStatus === filters.payment_status.toLowerCase()) &&
      (!filters.booking_status ||
        bookingStatus === filters.booking_status.toLowerCase())
    );
  });

  // ---- FILTER HOTEL BOOKINGS ----
  const filteredHotel = hotelbooking.filter((booking) => {
    const facility = bookingFacility.find(
      (fac) => fac.id === booking.amenity_id
    );

    if (!facility || !facility.is_hotel) return false;

    const facName = facility?.fac_name?.toLowerCase() || "";
    const facType = facility?.fac_type?.toLowerCase() || "";
    const bookedBy = booking?.book_by_user?.toLowerCase() || "";
    const paymentStatus = booking?.status?.toLowerCase() || "";
    const bookingStatus = booking?.status?.toLowerCase() || "";

    return (
      (!filters.fac_name ||
        facName.includes(filters.fac_name.toLowerCase())) &&
      (!filters.fac_type ||
        facType.includes(filters.fac_type.toLowerCase())) &&
      (!filters.booked_by ||
        bookedBy.includes(filters.booked_by.toLowerCase())) &&
      (!filters.payment_status ||
        paymentStatus === filters.payment_status.toLowerCase()) &&
      (!filters.booking_status ||
        bookingStatus === filters.booking_status.toLowerCase())
    );
  });

  setFilteredBookings(filteredAmenity);
  setFilteredHotelBookings(filteredHotel);
};

const resetFilters = () => {
  setFilters({
    fac_name: "",
    fac_type: "",
    payment_status: "",
    booked_by: "",
    booking_status: "",
  });

  setFilteredBookings(bookings);
  setFilteredHotelBookings(hotelbooking);
};
   // 🔥 Pagination Handlers
  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setPageNo(page);
  };


  useEffect(() => {
    console.log("Updated Booking Facility:", bookingFacility);
  }, [bookingFacility]);

  // Reset search when page changes
  useEffect(() => {
    setSearchText("");
    setFilteredBookings(bookings);
    setFilteredHotelBookings(hotelbooking);
  }, [page, bookings, hotelbooking]);

  const combinedData = filteredBookings?.map((booking) => {
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
  }) || [];

  // Sort combinedData by ID in descending order
  const sortedData = combinedData.sort((a, b) => b.id - a.id);

  const combinedHotelData = filteredHotelBookings.map((booking) => {
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

    if (!searchValue.trim()) {
      // If search is empty, reset to original data
      setFilteredBookings(bookings);
      setFilteredHotelBookings(hotelbooking);
      return;
    }

    // Filter amenities bookings
    const filteredAmenityResults = bookings.filter((booking) => {
      const facility = bookingFacility.find(
        (fac) => fac.id === booking.amenity_id
      );
      const facName = facility?.fac_name || "";
      const facType = facility?.fac_type || "";
      const bookedBy = booking?.book_by_user || "";
      
      return (
        facName.toLowerCase().includes(searchValue.toLowerCase()) ||
        facType.toLowerCase().includes(searchValue.toLowerCase()) ||
        bookedBy.toLowerCase().includes(searchValue.toLowerCase()) ||
        booking.id.toString().includes(searchValue)
      );
    });
    
    setFilteredBookings(filteredAmenityResults);

    // Filter hotel bookings
    const filteredHotelResults = hotelbooking.filter((booking) => {
      const facility = bookingFacility.find(
        (fac) => fac.id === booking.amenity_id
      );
      
      // Only consider hotel amenities
      if (!facility || !facility.is_hotel) return false;
      
      const facName = facility?.fac_name || "";
      const facType = facility?.fac_type || "";
      const bookedBy = booking?.book_by_user || "";
      
      return (
        facName.toLowerCase().includes(searchValue.toLowerCase()) ||
        facType.toLowerCase().includes(searchValue.toLowerCase()) ||
        bookedBy.toLowerCase().includes(searchValue.toLowerCase()) ||
        booking.id.toString().includes(searchValue)
      );
    });
    
    setFilteredHotelBookings(filteredHotelResults);
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
          <Link to={`/bookings/hotelbooking-details/${row.id}`}>
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
              Guest Room Bookings
            </h2>
             <h2
                          className={`p-1 ${
                            page === "Calendar" &&
                            "bg-white text-blue-500 shadow-custom-all-sides"
                          } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
                          onClick={() => setPage("Calendar")}
                        >
                          <FaCalendarCheck size={25} />
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
  onClick={() => setShowFilterModal(true)}
  className="bg-black rounded-lg flex font-semibold items-center gap-2 text-white p-2 my-2"
>
  <BiFilter size={20} />
  Filter
</button>
                <button
                  style={{ background: themeColor }}
                  onClick={() => setShowExportModal(true)}
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
            {showExportModal && <ExportBookingModal onclose={() => setShowExportModal(false)} />}
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
  onClick={() => setShowFilterModal(true)}
  className="bg-black rounded-lg flex font-semibold items-center gap-2 text-white p-2 my-2"
>
  <BiFilter size={20} />
  Filter
</button>
                <button
                  style={{ background: themeColor }}
                  onClick={() => setShowExportModal(true)}
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
            {showExportModal && <ExportBookingModal onclose={() => setShowExportModal(false)} />}
          </div>
        )}

      {showFilterModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-[450px] shadow-lg relative">

      {/* 🔴 Cross Icon */}
      <button
        onClick={() => setShowFilterModal(false)}
        className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
      >
        <IoClose />
      </button>

      <h2 className="text-lg font-semibold mb-4">Filter Bookings</h2>

      <div className="flex flex-col gap-3">

        <input
          type="text"
          placeholder="Facility Name"
          value={filters.fac_name}
          onChange={(e) =>
            setFilters({ ...filters, fac_name: e.target.value })
          }
          className="border p-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Facility Type"
          value={filters.fac_type}
          onChange={(e) =>
            setFilters({ ...filters, fac_type: e.target.value })
          }
          className="border p-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Booked By"
          value={filters.booked_by}
          onChange={(e) =>
            setFilters({ ...filters, booked_by: e.target.value })
          }
          className="border p-2 rounded-md"
        />

        <select
          value={filters.payment_status}
          onChange={(e) =>
            setFilters({ ...filters, payment_status: e.target.value })
          }
          className="border p-2 rounded-md"
        >
          <option value="">Select Payment Status</option>
          <option value="booked">Booked</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={filters.booking_status}
          onChange={(e) =>
            setFilters({ ...filters, booking_status: e.target.value })
          }
          className="border p-2 rounded-md"
        >
          <option value="">Select Booking Status</option>
          <option value="booked">Booked</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-400 text-white rounded-md"
        >
          Reset
        </button>

        <button
          onClick={() => {
            applyFilters();
            setShowFilterModal(false);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
)}

         {page === "Calendar" && (
                  <div className="p-4 mb-10 relative">
                    <AmenitiesCalendar />
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
