import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ExportBookingModal from "../../containers/modals/ExportBookingsModal";
import SeatBooking from "../SubPages/SeatBooking";
import DataTable from "react-data-table-component";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import FitOutList from "./FitOutList";
import { getAllFloors, getAllUnits, getAllVendors, getBuildings, getFitOutCategoriesSetup, getFitoutChecklist, getFitoutRequest, getFitOutStatus, getFitoutSubCategoriesSetup, getSetupUsers } from "../../api";
import { useSelector } from "react-redux";

const FitoutChecklistList = () => {
    const [searchText, setSearchText] = useState("");
    const [modal, showModal] = useState(false);
    const [category, setCategory] = useState([]);
      const [subCat, setSubCat] = useState([]);
      const [units, setUnits] = useState([]);
      const [users, setUsers] = useState([]);
      const [vendors, setVendors] = useState([]);
    const [page, setPage] = useState("meetingBooking");
    const [bookings, setBookings] = useState([]); // State to hold booking data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const [bookingFacility, setBookingFacility] = useState([]);
    const [originalBookings, setOriginalBookings] = useState([]); 
    const themeColor = useSelector((state) => state.theme.color);
  
    const userName = useState("Name");
    const LastName = useState("LASTNAME");
  
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
  
          // Fetch Bookings
          const Response = await getFitoutChecklist();
          console.log("Fitout Response:", Response);
          setBookings(Response?.data || []);
          setOriginalBookings(Response?.data || []); 
  
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
    // Handle Search
    const handleSearch = (event) => {
      const searchValue = event.target.value.toLowerCase();
      setSearchText(searchValue);

      if (!searchValue) {
        setBookings(originalBookings);
        return;
      }

      const filteredResults = originalBookings.filter((item) => {
        // Find category and subcategory names
        const categoryName = category.find((c) => c.id === item.snag_audit_category_id)?.name || "";
        const subCatName = subCat.find((sub) => sub.id === item.snag_audit_sub_category_id)?.name || "";
        const checklistName = item.name || "";
        const date = item.created_at
          ? new Date(item.created_at).toISOString().slice(2, 10).replace(/-/g, "-")
          : "";

        // Check if search value matches any field
        return (
          checklistName.toLowerCase().includes(searchValue) ||
          categoryName.toLowerCase().includes(searchValue) ||
          subCatName.toLowerCase().includes(searchValue) ||
          date.includes(searchValue)
        );
      });

      setBookings(filteredResults);
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
  
      // { name: "ID", selector: (row) => row.id, sortable: true },
      // {
      //   name: "Facility ID",
      //   selector: (row) => row.amenity_id,
      //   sortable: true,
      // },
        {
          name: "Title",
          selector: (row) => { 
            console.log(row); 
           return row.name },
          sortable: true,
        },
        {
          name: "Category",
          selector: (row) => {
            // const floor = floors.find((f) => f.id === row.floor_id);
            // return floor ? floor.name : "NA";
            const categoryName = category.find((c) => c.id === row.snag_audit_category_id);
            return categoryName ? categoryName.name : "NA";
          },
          sortable: true,
        },
        {
          name: "Sub Category",
          selector: (row) => {
            const subCatName = subCat.find((sub) => sub.id === row.snag_audit_sub_category_id);
            return subCatName ? subCatName.name : "NA";
          },
          sortable: true,
        },
        {
          name: "Total Questions",
          selector: (row) => row.total_questions,
          sortable: true,
          cell: (row) => (
            <div style={{ textAlign: "center", width: "50%" }}>
              {row.total_questions}
            </div>
          ),
        },
        
        {
          name: "Date",
          selector: (row) => {
            if (!row?.created_at) return "NA";
            const date = new Date(row.created_at);
            const yy = String(date.getFullYear()).slice(2);
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            return `${yy}-${mm}-${dd}`;
          },
          sortable: true,
        }
    ];
  console.log("categ", category);
    const fetchDetails = async () => {
        try {
          const categories = await getFitOutCategoriesSetup();
          setCategory(categories.data);
    
          const subCategory = await getFitoutSubCategoriesSetup();
          setSubCat(subCategory.data);
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      };
    return (
      <section className="flex">
        <FitOutList />
        <div className="w-full flex m-3 flex-col overflow-hidden">
          {/* <div className="flex justify-center">
            <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200">
            </div>
          </div> */}
          {page === "meetingBooking" && (
            <div>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Search By Name"
                  className="border p-2 w-full border-gray-300 rounded-lg"
                  value={searchText}
                  onChange={handleSearch}
                />
                <div className="flex justify-end">
                  <Link
                    to={"/fitout/checklist/create"}
                    style={{ background: "rgb(3 19 37)" }}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg font-semibold text-white shadow-md transition hover:shadow-lg whitespace-nowrap"
                  >
                    <IoAddCircleOutline size={20} />
                    Create Checklist
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

export default FitoutChecklistList;
