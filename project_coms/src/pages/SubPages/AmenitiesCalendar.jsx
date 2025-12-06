import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enIN } from "date-fns/locale";
import { getCalendarBooking } from "../../api";

const locales = {
  "en-IN": enIN,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AmenitiesCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const transformBookings = (rawBookings) => {
    return rawBookings.map((booking) => ({
      id: booking.id,
      title: `${booking.title} - ${booking.booked_by}`,
      start: new Date(booking.start),
      end: new Date(booking.end),
      resource: {
        color: booking.color,
        url: booking.url,
      },
    }));
  };

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await getCalendarBooking();
        const rawData = response.data.bookings;
        const transformed = transformBookings(rawData);
        setBookings(transformed);
        console.log("Response",  response.data.bookings)
      } catch (error) {
        console.error("Error fetching facilities", error);
        setError("Failed to fetch booking facilities. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, []);

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.resource?.color || "#3174ad",
        color: "white",
        borderRadius: "5px",
        padding: "2px",
      },
    };
  };

  return (
    <div style={{ height: "80vh", padding: "10px", marginTop: "35px" }}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading ? (
        <div>Loading bookings...</div>
      ) : (
        <Calendar
          localizer={localizer}
          events={bookings}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          eventPropGetter={eventStyleGetter}
        />
      )}
    </div>
  );
};

export default AmenitiesCalendar;