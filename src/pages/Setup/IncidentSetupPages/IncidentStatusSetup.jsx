import  { useEffect, useState } from "react";
// import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
// import { Link } from "react-router-dom";
import Table from "../../../components/table/Table";
// import { RiDeleteBinLine } from "react-icons/ri";
import IncidenceStatusSetupModal from "../../../containers/modals/IncidentSetupModal.jsx/IncidentStatusSetupModal";
import { FaCheck, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { PiPlusCircle } from "react-icons/pi";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { getIncidentTags, postIncidentTags } from "../../../api";
import toast from "react-hot-toast";

const IncidenceStatusSetup = () => {
  const [modal, showModal] = useState(false);
  const column = [
    { name: "Status", selector: (row) => row.name, sortable: true },
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
  const [addStatus, setAddStatus] = useState(false);
  const [status, setStatus] = useState("")
  const companyId = getItemInLocalStorage("COMPANYID");
  const handleAddStatus = async () => {
    const payload = {
      name: status,
      active: true,
      // "parent_id": null,
      tag_type: "IncidentStatus",
      resource_id: companyId,
      resource_type: "Pms::CompanySetup",
      // "comment": "Covers all types of plumbing problems."
    };
    try {
      const res = await postIncidentTags(payload);
      toast.success("Incident Status Created successfully!");
      fetchIncidentStatus();
      setStatus("");
      setAddStatus(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [statuses, setStatuses] = useState([]);
  const fetchIncidentStatus = async () => {
    try {
      const res = await getIncidentTags("IncidentStatus");
      setStatuses(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchIncidentStatus();
  }, []);
  return (
    <section className="mx-2">
      <div className="w-full flex flex-col gap-2 overflow-hidden">
        <div className="flex justify-end">
          {addStatus && (
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                placeholder="Status"
                className="border p-2 w-full border-gray-300 rounded-lg"
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
              />
              <button className="bg-indigo-700 text-white p-2 flex gap-2 items-center rounded-md" onClick={handleAddStatus}>
                <FaCheck /> Submit
              </button>
              <button
                className="bg-gray-900 text-white flex items-center gap-2 p-2 rounded-md"
                onClick={() => setAddStatus(false)}
              >
                <MdClose /> Cancel
              </button>
            </div>
          )}
          {!addStatus && (
            <button
              className="bg-indigo-700 p-2 rounded-md text-white flex items-center gap-2"
              onClick={() => setAddStatus(true)}
            >
              <PiPlusCircle /> Add
            </button>
          )}
        </div>
        <div>
          <Table columns={column} data={statuses} isPagination={true} />
        </div>
      </div>
      {modal && <IncidenceStatusSetupModal onclose={() => showModal(false)} />}
    </section>
  );
};

export default IncidenceStatusSetup;