import { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { fetchUserComplaintsById } from "../../api";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const UserSetupTreeVisitor = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const { id } = useParams();

   const VisitorColumns = [
      {
        name: "Action",
        cell: (row) => (
          <div className="flex items-center gap-4">
            <Link to={`/admin/passes/visitors/visitor-details/${row.id}`}>
              <BsEye size={15} />
            </Link>
            <Link to={`/admin/passes/visitors/edit-visitor/${row.id}`}>
              <BiEdit size={15} />
            </Link>
          </div>
        ),
      },
      {
        name: "Visitor Type",
        selector: (row) => row.visit_type,
        sortable: true,
      },
      {
        name: " Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Contact No.",
        selector: (row) => row.contact_no,
        sortable: true,
      },
  
      {
        name: "Purpose",
        selector: (row) => row.purpose,
        sortable: true,
      },
      {
        name: "Coming from",
        selector: (row) => row.coming_from,
        sortable: true,
      },
      {
        name: "Expected Date",
        selector: (row) => row.expected_date,
        sortable: true,
      },
      {
        name: "Expected Time",
        selector: (row) => row.expected_time,
        sortable: true,
      },
      {
        name: "Vehicle No.",
        selector: (row) => row.vehicle_number,
        sortable: true,
      },
  
      {
        name: "Host Approval",
        selector: (row) => (row.skip_host_approval ? "Not Required" : "Required"),
        sortable: true,
      },
  
      {
        name: "Pass Start",
        selector: (row) => (row.start_pass ? dateFormat(row.start_pass) : ""),
        sortable: true,
      },
      {
        name: "Pass End",
        selector: (row) => (row.end_pass ? dateFormat(row.end_pass) : ""),
        sortable: true,
      },
      // {
      //   name: "Check In",
      //   selector: (row) => (
      //     <p>
      //       {row && row.visits_log && row.visits_log.length > 0 ? (
      //         row.visits_log.map((visit, index) =>
      //           visit.check_in ? (
      //             <span key={index}>{dateTimeFormat(visit.check_in)}</span>
      //           ) : (
      //             <span key={index}>-</span>
      //           )
      //         )
      //       ) : (
      //         <span>-</span>
      //       )}
      //     </p>
      //   ),
      //   sortable: true,
      // },
      // {
      //   name: "Check Out",
      //   selector: (row) => (row.check_out ? dateTimeFormat(row.check_out) : ""),
      //   sortable: true,
      // },
      {
        name: "Status",
        selector: (row) => (
          <div
            className={`${
              row.visitor_in_out === "IN" ? "text-red-400" : "text-green-400"
            } `}
          >
            {row.visitor_in_out}
          </div>
        ),
        sortable: true,
      },
      {
        name: "In/OUT",
        selector: (row) => (
          <div
            className={`${
              row.visitor_in_out === "IN" ? "text-red-400" : "text-green-400"
            } `}
          >
            {row.visitor_in_out}
          </div>
        ),
        sortable: true,
      },
      {
        name: "Host",
        selector: (row) =>
          `${row?.created_by_name?.firstname} ${row?.created_by_name?.lastname}`,
        sortable: true,
      },
    ];

  const [columnVisibility, setColumnVisibility] = useState(() =>
    Object.fromEntries(rawColumns.map((col) => [col.name, true]))
  );

  useEffect(() => {
    const getComplaints = async () => {
      try {
        const response = await fetchUserComplaintsById(id);
        setComplaints(response.data.complaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    getComplaints();
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

  const filteredComplaints = useMemo(() => {
    const filtered = complaints.filter((item) =>
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
  }, [complaints, filters, showSearch]);

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
        data={filteredComplaints}
        customStyles={customStyle}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        selectableRowsHighlight
        highlightOnHover
        progressPending={loading}
      />
    </div>
  );
};

export default UserSetupTreeVisitor;