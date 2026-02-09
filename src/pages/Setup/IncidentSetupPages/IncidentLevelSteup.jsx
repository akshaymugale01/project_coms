import React, { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import Table from "../../../components/table/Table";
import { RiDeleteBinLine } from "react-icons/ri";
import IncidenceLevelSetupModal from "../../../containers/modals/IncidentSetupModal.jsx/IncidentLevelSetupModal";
import { FaCheck, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { PiPlusCircle } from "react-icons/pi";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { getIncidentTags, postIncidentTags } from "../../../api";
import toast from "react-hot-toast";

const IncidenceLevelSetup = () => {
  const [modal, showModal] = useState(false);
  const column = [
    { name: "Levels", selector: (row) => row.name, sortable: true },
    {
      name: "action",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => showModal(true)} className="text-blue-500">
            <BiEdit size={15} />
          </button>

          <button className="text-red-500">
            <FaTrash size={15} />
          </button>
        </div>
      ),
    },
  ];

  const [addLevel, setAddLevel] = useState(false);
  const [level, setLevel] = useState("");
  const companyId = getItemInLocalStorage("COMPANYID");
  const handleAddLevel = async () => {
    const payload = {
      name: level,
      active: true,
      // "parent_id": null,
      tag_type: "IncidentLevel",
      resource_id: companyId,
      resource_type: "Pms::CompanySetup",
      // "comment": "Covers all types of plumbing problems."
    };
    try {
      const res = await postIncidentTags(payload);
      toast.success("Incident Level Created successfully!");
      fetchIncidentLevels();
      setLevel("");
      setAddLevel(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [levels, setLevels] = useState([]);
const fetchIncidentLevels = async () => {
  try {
    const res = await getIncidentTags("IncidentLevel", companyId);

    const tags =
      res?.data?.incidence_tags?.data ||
      res?.data?.incidence_tags ||
      [];

    setLevels(tags);
  } catch (error) {
    console.log("Fetch error:", error);
  }
};

  useEffect(() => {
    fetchIncidentLevels();
  }, []);
  return (
    <section className="mx-2">
      <div className="w-full flex flex-col gap-2 overflow-hidden">
        <div className="flex justify-end">
          {addLevel && (
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                placeholder="Level"
                className="border p-2 w-full border-gray-300 rounded-lg"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
              <button
                className="bg-indigo-700 text-white p-2 flex gap-2 items-center rounded-md"
                onClick={handleAddLevel}
              >
                <FaCheck /> Submit
              </button>
              <button
                className="bg-gray-800 text-white flex items-center gap-2 p-2 rounded-md"
                onClick={() => setAddLevel(false)}
              >
                <MdClose /> Cancel
              </button>
            </div>
          )}
          {!addLevel && (
            <button
              className="bg-indigo-700 p-2 rounded-md text-white flex items-center gap-2"
              onClick={() => setAddLevel(true)}
            >
              <PiPlusCircle /> Add
            </button>
          )}
        </div>
        {/* </div> */}
       <div>
  {levels.length === 0 ? (
    <p className="text-center text-gray-500 mt-4">
      No Incident Levels Found
    </p>
  ) : (
    <Table columns={column} data={levels} isPagination={true} />
  )}
</div>

      </div>
      {modal && <IncidenceLevelSetupModal onclose={() => showModal(false)} />}
    </section>
  );
};

export default IncidenceLevelSetup;