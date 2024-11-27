import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Table from "../../components/table/Table";

import { BiEdit } from "react-icons/bi";

import OrganisationSetting from "./OrganisationSetting";
import HRMSHelpCenter from "./HRMSHelpCenter";
import { PiPlusCircle } from "react-icons/pi";
import { FaTrash } from "react-icons/fa";
import AddCalendarEvent from "./Modals/AddCalendarEvent";
import { deleteCalendarMilestone, getCalendarMilestone } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import EditCalendarEvent from "./Modals/EditCalendarEvent";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CalendarEvent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const columns = [
    {
      name: "Name Of Milestone",
      selector: (row) => row.milestone_name,
      sortable: true,
    },
    {
      name: "Who Can View It",
      selector: (row) => row.who_view,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditModal(row.id)}>
            <BiEdit size={15} />
          </button>
          <button
            onClick={() => handleDeleteEvent(row.id)}
            className="text-red-400"
          >
            <FaTrash size={15} />
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteEvent = async (id) => {
    try {
      await deleteCalendarMilestone(id);
      toast.success("Milestone deleted successfully");
      fetchAllCalendarEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const [eventId, setEventId] = useState("");
  const handleEditModal = (id) => {
    setEventId(id);
    setShowModal1(true);
  };

  const [calendarEvents, setCalendarEvents] = useState([]);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchAllCalendarEvents = async () => {
    try {
      const res = await getCalendarMilestone(hrmsOrgId);
      setCalendarEvents(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCalendarEvents();
  }, []);
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <section className="flex ml-20">
      <OrganisationSetting />
      <div className=" w-full flex m-3 flex-col overflow-hidden">
        <div className=" flex justify-between gap-2 my-2 mt-5">
          <input
            type="text"
            placeholder="Search by name "
            className="border border-gray-400 w-full placeholder:text-sm rounded-lg p-2"
            //   value={searchText}
            //   onChange={handleSearch}
          />
          <button
            onClick={() => setShowModal(true)}
            style={{ background: themeColor }}
            className="border-2 font-semibold hover:bg-black text-white duration-150 transition-all  p-2 rounded-md  cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>
        <Table columns={columns} data={calendarEvents} isPagination={true} />
      </div>
      {showModal && (
        <AddCalendarEvent
          onClose={() => setShowModal(false)}
          fetchAllCalendarEvents={fetchAllCalendarEvents}
        />
      )}
      {showModal1 && (
        <EditCalendarEvent
          onClose={() => setShowModal1(false)}
          eventId={eventId}
          fetchAllCalendarEvents={fetchAllCalendarEvents}
        />
      )}
      <HRMSHelpCenter help={"calendar"} />
    </section>
  );
};

export default CalendarEvent;
