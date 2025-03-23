import React, { useEffect, useState } from "react";
import ExportBookingModal from "../../containers/modals/ExportBookingsModal";
import SeatBooking from "../SubPages/SeatBooking";
import { BiExport } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Navbar } from "@material-tailwind/react";
import {
    getAllFloors,
  getAllUnits,
  getAllVendors,
  getAmenitiesBooking,
  getBuildings,
  getFacitilitySetup,
  getFitoutRequest,
  getSetupUsers,
} from "../../api";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Table } from "lucide-react";
import DataTable from "react-data-table-component";
import SetupNavbar from "../../components/navbars/SetupNavbar";
import FitOutList from "./FitOutList";

const RequestListPage = () => {
  const [searchText, setSearchText] = useState("");
  const [modal, showModal] = useState(false);
  const [buildings, setBuildings] = useState([]);
    const [floors, setFloors] = useState([]);
    const [units, setUnits] = useState([]);
    const [users, setUsers] = useState([]);
    const [vendors, setVendors] = useState([]);
  const [page, setPage] = useState("meetingBooking");
  const [bookings, setBookings] = useState([]); // State to hold booking data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [bookingFacility, setBookingFacility] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);

  const userName = useState("Name");
  const LastName = useState("LASTNAME");

  // Handle Search
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);

    //   const filteredResults = sortedData.filter((item) =>
    //     item.fac_name.toLowerCase().includes(searchValue.toLowerCase())
    //   );
    //   setBookings(filteredResults);
  };

  // Columns for DataTable
  const columns = [
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div className="flex item-center gap-2">
    //       <Link to={`/bookings/booking-details/${row.id}`}>
    //         <BsEye />
    //       </Link>
    //       {/* <Link to={`bookings/edit_bookings/${row.id}`}>
    //       <BiEdit size={15} />
    //     </Link> */}
    //     </div>
    //   ),
    //   sortable: false,
    // },
    { name: "Sr. No.", selector: (row , index) => index + 1, sortable: true },

    { name: "ID", selector: (row) => row.id, sortable: true },
    // {
    //   name: "Facility ID",
    //   selector: (row) => row.amenity_id,
    //   sortable: true,
    // },
    {
        name: "Building Name",
        selector: (row) => {
          const building = buildings.find((b) => b.id === row.building_id);
          return building ? building.name : "NA";
        },
        sortable: true,
      },
      {
        name: "Floor Name",
        selector: (row) => {
          const floor = floors.find((f) => f.id === row.floor_id);
          return floor ? floor.name : "NA";
        },
        sortable: true,
      },
      {
        name: "Unit Name",
        selector: (row) => {
          const unit = units.find((u) => u.id === row.unit_id);
          return unit ? unit.name : "NA";
        },
        sortable: true,
      },
      {
        name: "User Name",
        selector: (row) => {
          const user = users.find((u) => u.id === row.user_id);
          return user ? `${user.firstname} ${user.lastname}` : "NA";
        },
        sortable: true,
      },
      {
        name: "Date",
        selector: (row) => row?.selected_date || "NA",
        sortable: true,
      },
      {
        name: "Vendor",
        selector: (row) => {
          const vendor = vendors.find((v) => v.id === row.supplier_id);
          return vendor ? vendor.vendor_name : "NA";
        },
        sortable: true,
      },
  ];

  const fetchDetails = async () => {
      try {
        const buildingsRes = await getBuildings();
        setBuildings(buildingsRes.data);
  
        const floorsRes = await getAllFloors();
        setFloors(floorsRes.data);
  
        const unitsRes = await getAllUnits();
        setUnits(unitsRes.data);
  
        const usersRes = await getSetupUsers();
        setUsers(usersRes.data);
        console.log("userResp", usersRes);
        const vendorsRes = await getAllVendors();
        setVendors(vendorsRes.data);
        console.log("vendor", vendorsRes);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Bookings
        const Response = await getFitoutRequest();
        console.log("Fitout Response:", Response);
        setBookings(Response?.data || []);

        // Fetch Facility Setup
        //   const facilityResponse = await getFacitilitySetup();
        //   console.log("Facility Setup Response:", facilityResponse);
        //   setBookingFacility(facilityResponse?.data || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(`Failed to fetch data: ${error.message || error}`);
        setLoading(false);
      }
    };
    fetchData();
    fetchDetails();
  }, []);

  

  return (
    <section className="flex">
      <FitOutList />
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
              Fitout Request
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
              <div className="flex justify-end">
                <Link
                  to={"/fitout/request/create"}
                  style={{ background: themeColor }}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg font-semibold text-white shadow-md transition hover:shadow-lg whitespace-nowrap"
                >
                  <IoAddCircleOutline size={20} />
                  Create Request
                </Link>
              </div>
            </div>

            <div className="flex min-h-screen">
              {loading ? (
                <p className="text-center">Loading bookings...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : (
                <div className="w-full">
                  <DataTable columns={columns} data={bookings} pagination />
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

export default RequestListPage;
