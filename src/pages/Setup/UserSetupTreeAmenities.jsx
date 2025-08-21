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
                  style={{
                    padding: "4px",
                    fontSize: "0.8rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    width: "100%",
                  }}
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
        fontSize: "10px",
      },
    },
    headCells: {
      style: {
        textTransform: "uppercase",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
      },
    },
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
          position: "relative",
        }}
      >
        <button
          onClick={() => setShowSearch((prev) => !prev)}
          style={{
            padding: "6px 12px",
            backgroundColor: "#1f2937",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {showSearch ? "Hide Search" : "Show Search"}
        </button>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowColumnDropdown((prev) => !prev)}
            style={{
              padding: "6px 12px",
              backgroundColor: "#1f2937",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Column Visibility
          </button>

          {showColumnDropdown && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                zIndex: 1000,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {rawColumns.map((col) => (
                <label
                  key={col.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
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
                    style={{ marginRight: "8px" }}
                  />
                  {col.name}
                </label>
              ))}
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
      />
    </div>
  );
};

export default UserSetupTreeAmenities;