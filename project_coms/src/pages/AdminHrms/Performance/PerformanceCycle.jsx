import React, { useState } from "react";
import Table from "../../../components/table/Table";
import { PiPlus } from "react-icons/pi";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";

const PerformanceCycle = () => {
  const [page, setPage] = useState("table");
  const columns = [
    {
      name: "Cycle Name",
      sortable: true,
      selector: (row) => row.category,
    },
    {
      name: "Cycle Period",
      sortable: true,
      selector: (row) => row.period,
    },
    {
      name: "Created on",
      sortable: true,
      selector: (row) => row.updated_at,
    },
    {
      name: "Updated on",
      sortable: true,
      selector: (row) => row.updated_at,
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => (
        <div>
          <p
            className={`font-medium ${
              row.status === "Active" ? "text-green-400" : "text-red-400"
            }`}
          >
            {row.status}
          </p>
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditComModal(row.id)}>
            <BiEdit />
          </button>
          <button
            onClick={() => handleDeleteCompetency(row.id)}
            className="text-red-400"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const Data = [
    {
      category: "Test",
      period: "Apr 2024 to Mar 2025",
      updated_at: "08-08-2024",
      created_at: "08-08-2024",
    },
  ];
  const themeColor = useSelector((state) => state.theme.color);

  return (
    <div className="mt-5">
      {page === "table" && (
        <>
          <div className="flex justify-between gap-2 my-2">
            <input
              type="text"
              name=""
              id=""
              className="border rounded-md w-full p-2"
              placeholder="Search by cycle name"
            />
            <button
              style={{ background: themeColor }}
              className="flex items-center gap-2 rounded-md p-2 text-white"
            >
              <PiPlus /> Cycle{" "}
            </button>
          </div>
          <Table columns={columns} data={Data} />
        </>
      )}

      {page === "add" && <></>}
    </div>
  );
};

export default PerformanceCycle;
