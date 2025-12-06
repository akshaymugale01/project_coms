import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import '../style/Calendar.css'
import toast from "react-hot-toast";
// import ModalWrapper from "../containers/modals/ModalWrapper";
import { getPPMTask } from "../../api";
import ModalWrapper from "../../containers/modals/ModalWrapper";

const PPMCalendar = () => {
  const [modal, setModal] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [events, setEvents] = useState([]);
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const calendarRef = useRef(null);

  // // Function to fetch data from the API with date range
  // const fetchPPM = async () => {
  //   // Only proceed if both dates are set
  //   if (!startDate || !endDate) return;
  //   if (startDate >= endDate) {
  //     return toast.error("Start date must be before End date");
  //   }
  //   toast.loading("Please wait");
  //   try {
  //     const response = await getPPMCalendar( startDate, endDate );
  //     const mappedEvents = response.data.map((event) => ({
  //       title: event.title,
  //       start: event.start,
  //       // end: event.end,
  //       start_time:event.start_time
  //     }));
  //     toast.dismiss()
  //     toast.success("PPM Calendar data fetched successfully");
  //     setEvents(mappedEvents);
  //     console.log("PPM CALENDAR", response);
  //   } catch (error) {
  //     console.error("Error fetching PPM calendar data", error);
  //   }
  // };

  // // Fetch events whenever both startDate and endDate are set
  // useEffect(() => {
  //   if (startDate && endDate) {
  //     fetchPPM();
  //   }
  // }, [startDate, endDate]);

  // const handleStartDateChange = (e) => {
  //   setStartDate(e.target.value);
  // };

  // const handleEndDateChange = (e) => {
  //   setEndDate(e.target.value);
  // };

  // const renderEventContent = (eventInfo) => {
  //   const { title, extendedProps } = eventInfo.event;
  //   return (
  //     <div>
  //       <strong>{extendedProps.start_time || "No time specified"}</strong>
  //       <br />
  //       <b>{title}</b>
  //     </div>
  //   );
  // };

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    const fetchPPMTask = async () => {
      toast.loading("Please wait...");
      try {
        const taskResponse = await getPPMTask();

        const formattedEvents = taskResponse.data.activities.map((task) => ({
          title: task?.asset_name || "No Title", // FullCalendar requires 'title'
          start: task?.start_time || new Date().toISOString(), // Ensure start date is valid
          // end: task?.end_date || "", // Optional end date
          extendedProps: {
            assignTo: task?.assigned_to_name || "Unassigned",
            status: task?.status || "unknown",
          },
        }));
        console.log(formattedEvents);
        // Set events in state
        setEvents(formattedEvents);
        toast.dismiss(); // Dismiss loading tast
      } catch (error) {
        console.log(error);
        toast.error("Failed to load tasks");
      }
    };

    fetchPPMTask();
  }, []);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleEvent = (eventInfo) => {
    setSelectedEvent(eventInfo.event);
    setModal(true);
  };
  const oncloseModal = () => {
    console.log("CALLED");
    setSelectedEvent(null);
    setModal(false);
  };
  return (
    <>
      <div className="rounded-xl shadow-custom-all-sides p-2">
        {/* Date range inputs */}

        <div className="shadow-custom-all-sides mb-2 rounded-xl p-2 flex items-center gap-4">
          <label className="font-medium">
            Start Date :&nbsp;
            <input
              className="border p-1 px-2 rounded-md border-gray-400"
              type="date"
              // value={startDate}
              // onChange={handleStartDateChange}
            />
          </label>
          <label className="font-medium">
            End Date :&nbsp;
            <input
              className="border p-1 px-2 rounded-md border-gray-400"
              type="date"
              // value={endDate}
              // onChange={handleEndDateChange}
            />
          </label>
        </div>
        <FullCalendar
          // ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next dayGridMonth,timeGridWeek,timeGridDay",
          }}
          views={{
            fortnightlyView: {
              type: "dayGrid",
              duration: { weeks: 2 },
              buttonText: "fortnight",
            },
          }}
          initialDate={selectedDate}
          events={events}
          eventClick={handleEvent} // Display the events from the state
          eventTextColor="white"
          height={"90vh"}
          allDayText="All Day"
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }}
          eventClassNames={(eventInfo) => {
            return eventInfo.event.extendedProps.status === "inprogress"
              ? "yellow"
              : eventInfo.event.extendedProps.status === "complete"
              ? "green"
              : "red";
          }}
          eventContent={(eventInfo) => (
            <div>
              <b>{eventInfo.event.title}</b>
              <br />
              <span>Assigned To: {eventInfo.event.extendedProps.assignTo}</span>
              <br />
              <span>Status: {eventInfo.event.extendedProps.status}</span>
            </div>
          )}
        />
      </div>
      {modal && (
        <ModalWrapper onclose={oncloseModal}>
          <div className="flex flex-col gap-y-4">
            <h3 className="text-base text-center font-bold text-gray-900">
              {selectedEvent.title}
            </h3>
            <p className="text-sm font-semibold text-gray-500">
              Assigned To:{" "}
              <span className="font-normal">
                {selectedEvent.extendedProps.assignTo}
              </span>
            </p>
            <p className="text-sm font-semibold text-gray-500">
              Status:{" "}
              <span className="font-normal">
                {selectedEvent.extendedProps.status}
              </span>
            </p>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default PPMCalendar;
