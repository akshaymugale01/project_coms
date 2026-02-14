import React from "react";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FaCheck, FaTimes } from "react-icons/fa";
import Table from "../../components/table/Table";

const RVehiclesTable = ({
  data = [],
  loading,
  error,
  currentPageNum,
  pageType,
  onApprove,
  onReject,
}) => {
  const isApproval = pageType === "Approvals";
  const isHistory =
    pageType === "History" ||
    pageType === "Vehicle In" ||
    pageType === "Vehicle Out";

  const getVehicleId = (row) => {
    if (!row) return null;
    return (
      row.__vehicleId ||
      row.registered_vehicle_id ||
      row.registered_vehicle?.id ||
      row.vehicle_id ||
      row.id
    );
  };

  const fmtDate = (dt) => (dt ? new Date(dt).toLocaleString() : "-");

  const getStatus = (row) => {
    const s = row?.approved ?? row?.registered_vehicle?.approved;
    if (typeof s === "string") return s; // "Pending"/"Approved"/"Rejected"
    if (s === true) return "Approved";
    if (s === false) return "Rejected";
    return "-";
  };

  const columns = isApproval
    ? [
        {
          name: "Vehicle Number",
          selector: (row) =>
            row.vehicle_number ||
            row.registered_vehicle?.vehicle_number ||
            "-",
        },
        {
          name: "Vehicle Type",
          selector: (row) =>
            row.name ||
            row.vehicle_type ||
            row.registered_vehicle?.vehicle_type ||
            "-",
        },
        {
          name: "Requested By",
          selector: (row) =>
            row.created_by ||
            row.requested_by ||
            row.registered_vehicle?.created_by ||
            "-",
        },
        {

          name: "Requested At",
          selector: (row) => fmtDate(row.created_at || row.__createdAt),
        },
        {
          name: "Approval",
          cell: (row) => {
            const vehicleId = getVehicleId(row);
            return (
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => vehicleId && onApprove?.(row)}
                  disabled={!vehicleId}
                  className={`w-8 h-8 rounded-full text-white flex items-center justify-center ${
                    vehicleId
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-green-300 cursor-not-allowed"
                  }`}
                  title={vehicleId ? "Approve" : "Vehicle ID missing"}
                >
                  <FaCheck size={14} />
                </button>

                <button
                  type="button"
                  onClick={() => vehicleId && onReject?.(row)}
                  disabled={!vehicleId}
                  className={`w-8 h-8 rounded-full text-white flex items-center justify-center ${
                    vehicleId
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-red-300 cursor-not-allowed"
                  }`}
                  title={vehicleId ? "Reject" : "Vehicle ID missing"}
                >
                  <FaTimes size={14} />
                </button>
              </div>
            );
          },
        },
      ]
    : isHistory
    ? [
        {
          name: "Sr. No",
          cell: (_, index) => (currentPageNum - 1) * 10 + index + 1,
          width: "80px",
        },
        {
          name: "Vehicle Number",
          selector: (row) =>
            row.vehicle_number || row.registered_vehicle?.vehicle_number || "-",
        },
        {
          name: "Vehicle Type",
          selector: (row) =>
            row.name ||
            row.vehicle_type ||
            row.registered_vehicle?.vehicle_type ||
            "-",
        },
        {
          name: "Category",
          selector: (row) =>
            row.vehicle_category ||
            row.category ||
            row.registered_vehicle?.vehicle_category ||
            "-",
        },
        {
          name: "Status",
          selector: (row) => (
            <span
              className={
                getStatus(row) === "Approved"
                  ? "text-green-600 font-medium"
                  : getStatus(row) === "Rejected"
                  ? "text-red-600 font-medium"
                  : "text-gray-600"
              }
            >
              {getStatus(row)}
            </span>
          ),
        },
        {
          name: "Action Date",
          selector: (row) =>
            fmtDate(
              row.updated_at ||
                row.approved_at ||
                row.created_at ||
                row.__createdAt ||
                row.registered_vehicle?.updated_at ||
                row.registered_vehicle?.created_at
            ),
        },
        {
          name: "Check-In",
          selector: (row) =>
            row.check_in
              ? fmtDate(row.check_in)
              : row.vehicle_logs?.check_in
              ? fmtDate(row.vehicle_logs.check_in)
              : "-",
        },
        {
          name: "Check-Out",
          selector: (row) =>
            row.check_out
              ? fmtDate(row.check_out)
              : row.vehicle_logs?.check_out
              ? fmtDate(row.vehicle_logs.check_out)
              : "-",
        },
      ]
    : [
        {
          name: "Action",
          cell: (row) => (
            <div className="flex items-center gap-4">
              <Link to={`/admin/rvehicles-details/${row.id}`}>
                <BsEye size={15} />
              </Link>
              <Link to={`/admin/edit-rvehicles/${row.id}`}>
                <BiEdit size={15} />
              </Link>
            </div>
          ),
        },
        { name: "Vehicle Number", selector: (row) => row.vehicle_number || "-" },
        { name: "Category", selector: (row) => row.category || "-" },
        { name: "Slot", selector: (row) => row.slot_name || "-" },
      ];

  if (loading) return <p className="p-5 text-center">Loading...</p>;
  if (error) return <p className="p-5 text-center text-red-500">{error}</p>;

  return (
    <div className="w-full">
      <Table columns={columns} data={data} isPagination={false} />
    </div>
  );
};

export default RVehiclesTable;