import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BiExport } from "react-icons/bi";
import { ImEye } from "react-icons/im";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Switch from "../../Buttons/Switch";
import Navbar from "../../components/Navbar";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";
import SeatBooking from "./SeatBooking";
import SetupSeatBooking from "./SetupSeatBooking";
import { getFacitilitySetup } from "../../api";

const SetupBookingFacility = () => {
  const [searchText, setSearchText] = useState("");
  const [bookingFacility, SetBookingFacility] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  useEffect(() => {
    const fetchFacilityBooking = async () => {
      try {
        const response = await getFacitilitySetup();
        console.log("Response", response);
        SetBookingFacility(response.data); // Correct function name
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching facilities", error);
        setError("Failed to fetch booking facilities. Please try again."); // Set error message
        setLoading(false); // Stop loading on error
      }
    };

    fetchFacilityBooking();
  }, []);


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
      selector: (row) => row.fac_name,
      sortable: true,
    },
    { name: "Type", selector: (row) => row.fac_type, sortable: true },
    { name: "Department", selector: (row) => row.department, sortable: true },
    {
      name: "Book By",
      selector: (row) => row.bookBy,
      sortable: true,
    },
    {
      name: "Book Before",
      selector: (row) => `${row?.book_before}`,
      sortable: true,
    },
    {
      name: "Advance Booking",
      selector: (row) => `${row.advance_booking}`,
      sortable: true,
    },
    {
      name: "Created On",
      selector: (row) => row.created_at,
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
      action: <ImEye />,
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
      action: <ImEye />,
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
  const [filteredData, setFilteredData] = useState(setupData);
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    const filteredResults = setupData.filter((item) =>
      item.facility.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filteredResults);
  };


  const themeColor = useSelector((state) => state.theme.color);
  const [page, setPage] = useState("facility");
  return (
    <div className="flex">
      <Navbar />

      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-center my-2">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200 ">
            <h2
              className={`p-1 ${
                page === "facility" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
              onClick={() => setPage("facility")}
            >
              Facility
            </h2>
            <h2
              className={`p-1 ${
                page === "seatBooking" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
              onClick={() => setPage("seatBooking")}
            >
              Seat
            </h2>
          </div>
        </div>
        {page === "facility" && (
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
                  to={"/setup/facility/setup-facility"}
                  className="bg-black w-20 rounded-lg flex font-semibold items-center gap-2 text-white p-2 my-2"
                >
                  <IoAddCircleOutline size={20} />
                  Add
                </Link>
                <button
                  style={{ background: themeColor }}
                  className="bg-black rounded-lg flex font-semibold items-center gap-2 text-white p-2 my-2"
                >
                  <BiExport size={20} />
                  Export
                </button>
              </div>
            </div>
            {/* <Table
              columns={setupColumn}
              data={bookingFacility}
              // data={filteredData}

              // customStyles={customStyle}
            /> */}
            <div className="flex items-center justify-center min-h-screen">
              {loading ? (
                <p className="text-center">Loading bookings...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : (
                <div className="w-full">
                  <Table columns={setupColumn} data={bookingFacility} />
                </div>
              )}
            </div>
          </>
          
        )}

        {page === "seatBooking" && (
         <SetupSeatBooking/>
        )}
      </div>
    </div>
  );
};

export default SetupBookingFacility;
