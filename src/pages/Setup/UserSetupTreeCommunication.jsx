import React, { useEffect, useState, useMemo } from "react";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { getEventsCreatedByUserId, getBroadCastCreatedByUserId } from "../../api";
import Table from "../../components/table/Table";
import Navbar from "../../components/Navbar";
import { DNA } from "react-loader-spinner";

const UserSetupTreeCommunication = () => {
  const [communicationTab, setCommunicationTab] = useState("Events");
  const [events, setEvents] = useState([]);
  const [broadcast, setBroadcast] = useState([]);
  const [filters, setFilters] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const rawColumns = [
    {
      name: "Action",
      selectorKey: null,
      cell: (row) =>
        row.isSearchRow ? null : (
          <div className="flex items-center gap-4">
            <Link to={`/communication/event/event-details/${row.id}`}>
              <BsEye size={15} />
            </Link>
            <Link to={`/communication/event/edit-events/${row.id}`}>
              <BiEdit size={15} />
            </Link>
          </div>
        ),
      sortable: true,
    },
    {
      name: "Title",
      selectorKey: "event_name",
      selector: (row) => row.event_name,
      sortable: true,
    },
    {
      name: "Venue",
      selectorKey: "venue",
      selector: (row) => row.venue,
      sortable: true,
    },
    {
      name: "Created By",
      selectorKey: "created_by",
      selector: (row) => row.created_by,
      sortable: true,
    },
    {
      name: "Start Date",
      selectorKey: "start_date_time",
      selector: (row) => dateFormat(row.start_date_time),
      sortable: true,
    },
    {
      name: "End Date",
      selectorKey: "end_date_time",
      selector: (row) => dateFormat(row.end_date_time),
      sortable: true,
    },
    {
      name: "Status",
      selectorKey: "status",
      selector: (row) => (row.status ? row.status.toUpperCase() : "N/A"),
      sortable: true,
    },
    {
      name: "Expired",
      selectorKey: "end_date_time",
      selector: (row) => row.end_date_time,
      cell: (row) => {
        const now = new Date();
        const endDate = new Date(row.end_date_time);
        return endDate < now
          ? dateFormat(row.end_date_time)
          : "Not expired yet";
      },
      sortable: true,
    },
    {
      name: "Created On",
      selectorKey: "created_at",
      selector: (row) => dateFormat(row.created_at),
      sortable: true,
    },
  ];

  const rawColumns1 = [
    {
      name: "Action",
      selectorKey: null,
      cell: (row) =>
        row.isSearchRow ? null : (
          <div className="flex items-center gap-4">
            <Link to={`/communication/event/event-details/${row.id}`}>
              <BsEye size={15} />
            </Link>
            <Link to={`/communication/event/edit-events/${row.id}`}>
              <BiEdit size={15} />
            </Link>
          </div>
        ),
      sortable: true,
    },
    {
      name: "Title",
      selectorKey: "notice_title",
      selector: (row) => row.notice_title,
      sortable: true,
    },
    {
      name: "Status",
      selectorKey: "status",
      selector: (row) => (row.status ? row.status.toUpperCase() : "N/A"),
      sortable: true,
    },
    {
      name: "Expiry Date",
      selectorKey: "expiry_date",
      selector: (row) => dateFormat(row.expiry_date),
      sortable: true,
    },
    {
      name: "Created On",
      selectorKey: "created_at",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Created By",
      selectorKey: "created_by",
      selector: (row) => row.created_by,
      sortable: true,
    },
  ];

  const columns = communicationTab === "Events" ? rawColumns : rawColumns1;

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsResponse = await getEventsCreatedByUserId(id);
      const data = eventsResponse.data;
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, [id]);

  useEffect(() => {
    const fetchBroadcasts = async () => {
      const broadcastResponse = await getBroadCastCreatedByUserId(id);
      const data = broadcastResponse.data;
      setBroadcast(data);
      setLoading(false);
    };
    fetchBroadcasts();
  }, [id]);

  const columnMap = {
    Events: rawColumns,
    Broadcast: rawColumns1,
  };

  const currentColumns = columnMap[communicationTab] || [];

  const [columnVisibilityMap, setColumnVisibilityMap] = useState(() =>
    Object.fromEntries(
      Object.entries(columnMap).map(([tab, cols]) => [
        tab,
        Object.fromEntries(cols.map((col) => [col.name, true])),
      ])
    )
  );

  const columnVisibility = columnVisibilityMap[communicationTab] || {};

  const setColumnVisibility = (updateFn) => {
    setColumnVisibilityMap((prev) => ({
      ...prev,
      [communicationTab]: updateFn(prev[communicationTab] || {}),
    }));
  };

  const visibleColumns = useMemo(() => {
    return currentColumns
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
  }, [currentColumns, columnVisibility, filters, showSearch]);

  const filteredData = useMemo(() => {
    const sourceData = communicationTab === "Events" ? events : broadcast;

    const filtered = sourceData.filter((item) =>
      currentColumns.every((col) => {
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
  }, [communicationTab, events, broadcast, filters, showSearch]);

  return (
    <div className="flex">
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        {/* Communication Tabs */}
        <div className="flex gap-4 sm:rounded-full rounded-md opacity-90 bg-gray-200 mx-auto">
          {["Events", "Broadcast"].map((tab) => (
            <h2
              key={tab}
              className={`px-9 py-2 rounded-full cursor-pointer text-center transition-all duration-300 ease-linear ${
                communicationTab === tab
                  ? "bg-white text-blue-500 shadow-custom-all-sides"
                  : "text-gray-700"
              }`}
              onClick={() => setCommunicationTab(tab)}
            >
              {tab}
            </h2>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-10">
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
                  {currentColumns.map((col) => (
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

          {/* Table */}
          {loading ? (
            <div className="flex justify-center items-center mt-10 h-60">
              <DNA visible={true} height={120} width={130} />
            </div>
          ) : (
            <Table
              columns={visibleColumns}
              data={filteredData}
              isPagination={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSetupTreeCommunication;
