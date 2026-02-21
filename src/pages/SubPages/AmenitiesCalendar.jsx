import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enIN } from "date-fns/locale";
import { getCalendarBooking } from "../../api";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  // ✅ FIXED TRANSFORM FUNCTION
  const transformBookings = (rawBookings) => {
    return rawBookings.map((booking) => ({
      id: booking.id,
      title: `${booking.title} - ${booking.booked_by}`,

      // ✅ Use real check-in & check-out datetime
      start: new Date(booking.hotel_booking?.checkin_at),
      end: new Date(booking.hotel_booking?.checkout_at),

      // ✅ Correct color field (colors not color)
      resource: {
        color: booking.colors || "#3174ad",
      },

      // ✅ Store full hotel booking object
      originalData: booking.hotel_booking,
    }));
  };

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await getCalendarBooking();
        const rawData = response.data.bookings || [];
        const transformed = transformBookings(rawData);
        setBookings(transformed);
      } catch (error) {
        console.error("Error fetching booking facilities", error);
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
        backgroundColor: event.resource?.color,
        color: "white",
        borderRadius: "6px",
        padding: "4px",
        cursor: "pointer",
      },
    };
  };

  // ✅ Navigate to Details Page
  const handleEventClick = (event) => {
    navigate(`/setup/facility-details/${event.id}`, {
      state: { booking: event.originalData },
    });
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
          onSelectEvent={handleEventClick}
        />
      )}
    </div>
  );
};

export default AmenitiesCalendar;