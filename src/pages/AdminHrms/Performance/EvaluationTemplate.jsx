import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import {
  FaCheck,
  FaComments,
  FaFileAlt,
  FaRegClone,
  FaTrash,
  FaUsers,
} from "react-icons/fa";
import { PiPlus } from "react-icons/pi";
import Table from "../../../components/table/Table";
import { MdClose } from "react-icons/md";
import { dateTimeFormat } from "../../../utils/dateUtils";
import { useSelector } from "react-redux";
import EvaluationTEmplateForm from "./EvaluationTEmplateForm";

const EvaluationTemplate = () => {
  const [page, setPage] = useState("table");
  const themeColor = useSelector((state) => state.theme.color);
  const [filteredTemplate, setFilteredTemplate] = useState([]);

  const columns = [
    {
      name: "Category Name",
      sortable: true,
      selector: (row) => row.category,
      title: (row) => {
        row.category;
      },
    },
    {
      name: "Created on",
      sortable: true,
      selector: (row) => row.created_at,
    },
    {
      name: "Updated on",
      sortable: true,
      selector: (row) => dateTimeFormat(row.updated_at),
    },

    {
      name: "Action",
      selector: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditGoalModal(row.id)}>
            <BiEdit />
          </button>
          <button
            onClick={() => handleDeleteGoal(row.id)}
            className="text-red-400"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => handleDeleteGoal(row.id)}
            className="text-red-400"
          >
            <FaRegClone />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mb-5">
      <div>
        <h2 className="font-semibold mt-4">Evaluation Template</h2>
        {page === "table" && (
          <>
            <div className="flex justify-between my-2 gap-2">
              <input
                type="text"
                // value={searchGoalText}
                // onChange={handleSearchGoal}
                id=""
                className="border border-gray-300 rounded-md w-full p-1"
                placeholder="Search by category name"
              />
              <button
                onClick={() => setPage("add")}
                style={{ background: themeColor }}
                className="p-2 text-white rounded-md flex items-center gap-2 px-2"
              >
                <PiPlus /> Template{" "}
              </button>
            </div>
            <div>
              <Table columns={columns} data={filteredTemplate} />
            </div>
          </>
        )}
        {page === "add" && <EvaluationTEmplateForm />}
      </div>
    </div>
  );
};

export default EvaluationTemplate;
