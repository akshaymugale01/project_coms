import { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { getAmenitiesBookedByUserId } from "../../api";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const UserSetupTreeAmenities = () => {
  const [amenitiesBooking, setAmenitiesBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const { id } = useParams();

  const rawColumns = [
    {
      name: "Action",
      selectorKey: null,
      cell: (row) => 
        row.isSearchRow ? null : (
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
    {
      name: "ID",
      selectorKey: "id",
      selector: (row) => row.id,
      sortable: true,
    },
    // {
    //   name: "Facility ID",
    //   selector: (row) => row.amenity_id,
    //   sortable: true,
    // },
    {
      name: "Facility Name",
      selectorKey: "facility_name",
      selector: (row) => row.amenity.fac_name,
      sortable: true,
    },
    {
      name: "Facility Type",
      selectorKey: "facility_type",
      selector: (row) => row.amenity.fac_type,
      sortable: true,
    },
    {
      name: "Total Amount",
      selectorKey: "total_amount",
      selector: (row) => row.amount || "NA",
      sortable: true,
    },
    {
      name: "Paymnet Status",
      selectorKey: "payment_status",
      selector: (row) => row.status || "NA",
      sortable: true,
    },
    {
      name: "Paymnet Method",
      selectorKey: "payment_method",
      selector: (row) => row?.payment?.payment_method || "NA",
      sortable: true,
    },
    {
      name: "Booked By",
      selectorKey: "booked_by",
      selector: (row) => {
        console.log("row", row.book_by_user);
        return row?.book_by_user || "User Not Set!";
      },
      sortable: true,
    },
    {
      name: "Booked On",
      selectorKey: "booked_on",
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
      selectorKey: "scheduled_on",
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
      selectorKey: "scheduled_time",
      selector: (row) => row.slot.slot_str || "N/A",
      sortable: true,
    },
    // {
    //   name: "Description",
    //   selectorKey: "description",
    //   selector: (row) => row.amenity.description,
    //   sortable: true,
    // },
    // {
    //   name: "Terms",
    //   selectorKey: "terms",
    //   selector: (row) => row.amenity.terms,
    //   sortable: true,
    // },
    {
      name: "Booking Status",
      selectorKey: "booking_status",
      selector: (row) => row.status || "N/A",
      sortable: true,
    },
  ];

  const [columnVisibility, setColumnVisibility] = useState(() =>
    Object.fromEntries(rawColumns.map((col) => [col.name, true]))
  );

  useEffect(() => {
    const getAmenities = async () => {
      try {
        const response = await getAmenitiesBookedByUserId(id);
        setAmenitiesBooking(response.data.amenity_bookings);
      } catch (error) {
        console.error("Error fetching amenities booking:", error);
      } finally {
        setLoading(false);
      }
    };

    getAmenities();
  }, [id]);

  const visibleColumns = useMemo(() => {
    return rawColumns
      .filter((col) => columnVisibility[col.name])
      .map((col) => {
        const key = col.selectorKey;
        const isFilterable = key && !["action", "created_at"].includes(key);

        return {
          ...col,
          cell: (row) => {
            if (row.isSearchRow && isFilterable) {
              return (
                <input
                  type="text"
                  placeholder={`Search ${col.name}`}
                  value={filters[key] || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              );
            }

            return col.cell ? col.cell(row) : col.selector?.(row);
          },
        };
      });
  }, [rawColumns, columnVisibility, filters, showSearch]);

  const filteredBookings = useMemo(() => {
    const filtered = amenitiesBooking.filter((item) =>
      rawColumns.every((col) => {
        const key = col.selectorKey;
        if (!key || !filters[key]) return true;
        return (item[key] ?? "")
          .toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      })
    );

    if (showSearch) {
      const searchRow = { id: "__search__", isSearchRow: true };
      return [searchRow, ...filtered];
    }

    return filtered;
  }, [amenitiesBooking, filters, showSearch]);

  const customStyle = {
    headRow: {
      style: {
        background: "rgb(17, 24, 39)",
        color: "white",
        fontSize: "12px",
        fontWeight: "600",
        borderBottom: "2px solid rgb(55, 65, 81)",
      },
    },
    headCells: {
      style: {
        textTransform: "uppercase",
        padding: "12px 8px",
      },
    },
    rows: {
      style: {
        minHeight: "50px",
        "&:hover": {
          backgroundColor: "rgb(243, 244, 246)",
          cursor: "pointer",
        },
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        padding: "8px",
      },
    },
  };

  return (
    <div className="w-full">
      <div className="flex gap-3 mb-4 items-center">
        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            showSearch
              ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          {showSearch ? "Hide Search" : "Show Search"}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowColumnDropdown((prev) => !prev)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-700 transition-all duration-200 shadow-md"
          >
            Column Visibility
          </button>

          {showColumnDropdown && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50 w-64 max-h-96 overflow-y-auto">
              <div className="p-3 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-700 text-sm">
                  Select Columns to Display
                </h3>
              </div>
              <div className="p-2">
                {rawColumns.map((col) => (
                  <label
                    key={col.name}
                    className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={columnVisibility[col.name]}
                      onChange={(e) =>
                        setColumnVisibility((prev) => ({
                          ...prev,
                          [col.name]: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      {col.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <DataTable
        responsive
        columns={visibleColumns}
        data={filteredBookings}
        customStyles={customStyle}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        selectableRowsHighlight
        highlightOnHover
        progressPending={loading}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30, 50]}
        noDataComponent={
          <div className="text-center py-10 text-gray-500">
            There are no records to display
          </div>
        }
      />
    </div>
  );
};

export default UserSetupTreeAmenities;