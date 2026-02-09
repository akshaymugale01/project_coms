import React, { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import Table from "../../../components/table/Table";
import { RiDeleteBinLine } from "react-icons/ri";
import InjurySetupModal from "../../../containers/modals/IncidentSetupModal.jsx/InjurySetupModal";
import { PiPlusCircle } from "react-icons/pi";
import { MdClose } from "react-icons/md";
import { FaCheck, FaTrash } from "react-icons/fa";
import { postInjured, getInjured } from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import toast from "react-hot-toast";
const InjurySetup = () => {
  
  const [modal, showModal] = useState(false);
  const [addInjury, setAddInjury] = useState(false);
  const [personName, setPersonName] = useState("");
  const [editingId, setEditingId] = useState(null);
const [editName, setEditName] = useState("");

  console.log(personName);
  const CompanyId = getItemInLocalStorage("COMPANYID");
 const column = [
  { name: "Name", selector: (row) => row.name, sortable: true },
  {
    name: "Action",
    cell: (row) => (
      <div className="flex items-center gap-2">
        {editingId === row.id ? (
          <input
            className="border px-2 py-1 rounded"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={() => {
              // TODO: call update API here
              setEditingId(null);
            }}
          />
        ) : (
          <button
            className="text-blue-500 flex items-center gap-1"
            onClick={() => {
              setEditingId(row.id);
              setEditName(row.name);
            }}
          >
            <BiEdit size={15} />
          </button>
        )}

        <button className="text-red-500">
          <FaTrash size={15} />
        </button>
      </div>
    ),
  },
];

  // const data = [
  //   {
  //     id: 1,
  //     Name: "ashish",
  //     action: <BsEye />,
  //   },
  // ];

  console.log(CompanyId);
  const handleSubmit = async (e) => {
    const payload = {
      name: personName,
      active: true,
      // "parent_id": null,
      tag_type: "injury",
      resource_id: CompanyId,
      resource_type: "Pms::CompanySetup",
      // "comment": "Covers all types of plumbing problems."
    };
    try {
      const res = await postInjured(payload);
      toast.success("Incident Level Created successfully!");
      fetchInjured();

      // setLevel("");
      setPersonName("");
      setAddInjury(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [injury, setInjury] = useState([]);
  const fetchInjured = async () => {
    try {
      const res = await getInjured("injury");
      setInjury(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInjured();
  }, []);
  return (
    <section className="mx-2">
      <div className="w-full flex flex-col gap-2 overflow-hidden">
        <div className="flex justify-end">
          {addInjury && (
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                value={personName}
                onChange={(event) => setPersonName(event.target.value)}
                placeholder="Person Name"
                className="border p-2 w-full border-gray-300 rounded-lg"
              />
              <button
                onClick={handleSubmit}
                className="bg-indigo-800 text-white p-2 flex gap-2 items-center rounded-md"
              >
                <FaCheck /> Submit
              </button>
              <button
                className="bg-gray-800 text-white flex items-center gap-2 p-2 rounded-md"
                onClick={() => setAddInjury(false)}
              >
                <MdClose /> Cancel
              </button>
            </div>
          )}
          {!addInjury && (
            <button
              className="bg-indigo-800 p-2 rounded-md text-white flex items-center gap-2"
              onClick={() => setAddInjury(true)}
            >
              <PiPlusCircle /> Add
            </button>
          )}
        </div>
        <div>
          <Table columns={column} data={injury} isPagination={true} />
        </div>
      </div>
      {modal && <InjurySetupModal onclose={() => showModal(false)} />}
    </section>
  );
};

export default InjurySetup;