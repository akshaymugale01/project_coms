import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { IoAddCircle } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { BiSolidEditAlt } from "react-icons/bi";
import { getIncidentTags,updateIncidents } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useParams } from "react-router-dom";

const IncidentUpdateModal = ({ onclose, }) => {
 // const incidentId = getItemInLocalStorage("COMPANYID")
 const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statuses, setStatuses] = useState([]);
  useEffect(() => {
    const fetchIncidentsCategory = async () => {
      try {
        const res = await getIncidentTags("IncidentStatus");
        setStatuses(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIncidentsCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateIncidents(id, {
        status: selectedStatus,
      });
      console.log(res);
      onclose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-20">
      <div className="bg-white overflow-auto max-h-[70%]  md:w-auto w-96 p-4 px-8 flex flex-col rounded-md gap-5">
        <div className="flex flex-col w-96 justify-center">
          <h2 className=" font-medium text-lg border-b flex items-center gap-2">
            <BiSolidEditAlt /> Update Status
          </h2>
          <div className="">
            <div className="flex flex-col my-2">
              <label htmlFor="" className="font-semibold">
                Status
              </label>
              <select
                text="time"
                name="selectedStatus"
                defaultValue={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                id=""
                className="border p-2 border-gray-400 rounded-md w-full"
              >
                <option value="">Select </option>
                {statuses.map((status) => (
                  <option value={status.name} key={status.id} >
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Comment
              </label>
              <textarea
                name=""
                id=""
                cols="5"
                rows="3"
                placeholder="Message"
                className="border p-2 border-gray-400 rounded-md"
              />
            </div> */}
          </div>

          <div className="flex justify-center border-t mt-1 p-1 gap-2">
            <button
              className="bg-gray-400 text-white rounded-full p-2 px-4 flex items-center gap-2"
              onClick={() => onclose()}
            >
              <MdClose /> Cancel
            </button>
            <button onClick={handleSubmit} className="bg-indigo-800 text-white rounded-full p-2 px-4 flex items-center gap-2">
              <FaCheck /> Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentUpdateModal;