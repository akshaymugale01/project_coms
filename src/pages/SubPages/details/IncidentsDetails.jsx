import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { LuDownload } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import IncidentUpdateModal from "../../../containers/modals/IncidentUpdateModal";
import IncidentInjuryModal from "../../../containers/modals/IncidentInjuryModal";
import { getIncidentById } from "../../../api"; // ✅ make sure this exists
import { dateFormatSTD } from "../../../utils/dateUtils";

const IncidentsDetails = () => {
  const [modal, showModal] = useState(false);
  const [injurymodal, showInjurymodal] = useState(false);
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  /* -------------------- Fetch Incident Details -------------------- */
  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const res = await getIncidentById(id);
        setIncident(res.data);
      } catch (error) {
        console.error("Failed to fetch incident details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  if (loading) return <div className="p-5">Loading...</div>;
  if (!incident) return <div className="p-5">No Data Found</div>;

  return (
    <section className="flex">
      <Navbar />

      <div className="w-full flex mx-3 flex-col overflow-hidden">
        {/* Action Buttons */}
        <div className="flex gap-2 justify-end my-3 md:flex-row flex-col">
          <Link
            to={`/admin/edit-incidents/${id}`}
            className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md"
          >
            <BiEdit /> Edit Details
          </Link>

          <button
            className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md"
            onClick={() => showModal(true)}
          >
            <FaCheckCircle /> Update Status
          </button>

          {modal && (
            <IncidentUpdateModal onclose={() => showModal(false)} />
          )}

          <button
            className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md"
            onClick={() => showInjurymodal(true)}
          >
            <IoMdAdd /> Add Injury
          </button>

          {injurymodal && (
            <IncidentInjuryModal onclose={() => showInjurymodal(false)} />
          )}

          <button className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md">
            <LuDownload /> Download Report
          </button>
        </div>

        {/* BASIC DETAILS */}
        <div className="border-2 flex flex-col my-2 p-4 gap-4 rounded-md border-gray-400">
          <h2 className="text-lg border-black border-b font-semibold">
            BASIC DETAILS
          </h2>

          <div className="my-2 md:px-10 text-sm items-center font-medium grid gap-4 md:grid-cols-2">
            <Detail label="Status" value={incident.status} />
            <Detail
              label="Incident Date and Time"
              value={dateFormatSTD(incident.time_and_date)}
            />
            <Detail label="Building" value={incident.building_name} />
            <Detail label="Reported By" value={incident.created_by_name} />
            <Detail label="Level" value={incident.incident_level} />
            <Detail
              label="Primary Category"
              value={incident.primary_incident_category}
            />
            <Detail
              label="Sub Category"
              value={incident.primary_incident_sub_category}
            />
            <Detail
              label="Support Required"
              value={incident.support_required ? "Yes" : "No"}
            />
            <Detail
              label="First Aid Provided"
              value={incident.first_aid_provided_employee ? "Yes" : "No"}
            />
            <Detail
              label="Sent for Medical Treatment"
              value={
                incident.sent_medical_treatment
                  ? "Yes"
                  : incident.sent_medical_treatment === null
                  ? "-"
                  : "No"
              }
            />
            <Detail
              label="Property Damage"
              value={incident.property_damage ? "Yes" : "No"}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="border-2 flex flex-col my-2 p-4 gap-4 rounded-md border-gray-400">
          <h2 className="text-lg border-black border-b font-semibold">
            DESCRIPTION DETAILS
          </h2>

          <div className="my-2 md:px-10 text-sm grid gap-4 md:grid-cols-2">
            <Detail label="Description" value={incident.description || "-"} />
            <Detail label="RCA" value={incident.rca || "-"} />
          </div>
        </div>

        {/* INJURIES */}
        <div className="border-2 flex flex-col my-2 p-4 gap-4 rounded-md border-gray-400">
          <h2 className="text-lg font-semibold">
            INJURIES - {incident.incident_injuries?.length || 0}
          </h2>

          {incident.incident_injuries?.map((injury) => (
            <div
              key={injury.id}
              className="border p-3 rounded-md text-sm grid md:grid-cols-3 gap-3"
            >
              <Detail label="Injury Type" value={injury.injury_type} />
              <Detail label="Injured Person" value={injury.who_got_injured} />
              <Detail label="Created At" value={dateFormatSTD(injury.created_at)} />
            </div>
          ))}
        </div>

        {/* ATTACHMENTS */}
        <div className="border-2 flex flex-col my-2 p-4 gap-4 rounded-md border-gray-400">
          <h2 className="text-lg font-semibold">
            Attachments - {incident.attachments?.length || 0}
          </h2>
        </div>

        {/* UPDATE STATUS */}
        <div className="border-2 flex flex-col mb-16 p-4 gap-4 rounded-md border-gray-400">
          <h2 className="text-lg font-semibold">UPDATE STATUS</h2>
        </div>
      </div>
    </section>
  );
};

/* Reusable Detail Component */
const Detail = ({ label, value }) => (
  <div className="grid grid-cols-2 items-center">
    <p>{label}:</p>
    <p className="text-sm font-normal">{value}</p>
  </div>
);

export default IncidentsDetails;
