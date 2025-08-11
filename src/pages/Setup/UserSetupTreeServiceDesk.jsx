import { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { fetchUserComplaintsById } from "../../api";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const UserSetupTreeServiceDesk = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const { id } = useParams();

  const rawColumns = [
    {
      name: "Action",
      selectorKey: null,
      selector: (row) => null,
      cell: (row) =>
        row.isSearchRow ? null : (
          <div className="flex items-center gap-4">
            <Link to={`/tickets/details/${row.id}`}>
              <BsEye size={15} />
            </Link>
            <Link to={`/edit/${row.id}`}>
              <BiEdit size={15} />
            </Link>
          </div>
        ),
      sortable: false,
    },
    { name: "Ticket Number", selectorKey: "ticket_number", selector: (row) => row.ticket_number, sortable: true },
    { name: "Building Name", selectorKey: "building_name", selector: (row) => row.building_name, sortable: true },
    { name: "Status", selectorKey: "issue_status", selector: (row) => row.issue_status, sortable: true },
    { name: "Floor Name", selectorKey: "floor_name", selector: (row) => row.floor_name, sortable: true },
    { name: "Unit Name", selectorKey: "unit", selector: (row) => row.unit, sortable: true },
    { name: "Customer Name", selectorKey: "created_by", selector: (row) => row.created_by, sortable: true },
    { name: "Category", selectorKey: "category_type", selector: (row) => row.category_type, sortable: true },
    { name: "Sub Category", selectorKey: "sub_category", selector: (row) => row.sub_category, sortable: true },
    { name: "Title", selectorKey: "heading", selector: (row) => row.heading, sortable: true },
    { name: "Created By", selectorKey: "created_by", selector: (row) => row.created_by, sortable: true },
    {
      name: "Created On",
      selectorKey: "created_at",
      selector: (row) => row.created_at,
      sortable: true,
      cell: (row) => (row.isSearchRow ? null : new Date(row.created_at).toLocaleString()),
    },
    { name: "Priority", selectorKey: "priority", selector: (row) => row.priority, sortable: true },
    { name: "Assigned To", selectorKey: "assigned_to", selector: (row) => row.assigned_to, sortable: true },
    { name: "Ticket Type", selectorKey: "issue_type", selector: (row) => row.issue_type, sortable: true },
    {
      name: "Total Time",
      selectorKey: "created_at",
      selector: (row) => row.created_at,
      sortable: true,
      cell: (row) => {
        if (row.isSearchRow) return null;
        const createdTime = moment(row.created_at);
        const now = moment();
        const diff = now.diff(createdTime, "minutes");
        if (diff < 60) return `${diff} minutes ago`;
        if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
        return `${Math.floor(diff / 1440)} days ago`;
      },
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
        const isFilterable =
          key && !["action", "created_at"].includes(key);

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

export default UserSetupTreeServiceDesk;