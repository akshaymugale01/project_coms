// CalendarView.jsx
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enIN } from "date-fns/locale";

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

// Sample booking data
const bookings = [
  {
    title: "Pool - Unit 101",
    start: new Date(2025, 7, 30, 10, 0),
    end: new Date(2025, 7, 30, 11, 0),
  },
  {
    title: "Pool - Unit 102",
    start: new Date(2025, 7, 30, 12, 30),
    end: new Date(2025, 7, 30, 1, 30),
  },
  {
    title: "Gym - Unit 203",
    start: new Date(2025, 7, 30, 17, 0),
    end: new Date(2025, 7, 30, 18, 0),
  },
  {
    title: "Conference Room - Unit 305",
    start: new Date(2025, 7, 31, 14, 0),
    end: new Date(2025, 7, 31, 16, 0),
  },
];

// const calendarData = [
//   ...filteredBookings.map((booking) => {
//     const facility = bookingFacility.find(
//       (fac) => fac.id === booking.amenity_id
//     );
//     if (!facility || facility.is_hotel) return null;

//     return {
//       title: `${facility.fac_name} - ${booking.book_by_user || "Guest"}`,
//       start: new Date(booking.checkin_at.replace(" ", "T")),
//       end: new Date(booking.checkin_at.replace(" ", "T")),
//       type: "amenity",
//     };
//   }),
//   ...filteredHotelBookings.map((booking) => {
//     const facility = bookingFacility.find(
//       (fac) => fac.id === booking.amenity_id
//     );
//     if (!facility || !facility.is_hotel) return null;

//     return {
//       title: `${facility.fac_name} - ${booking.book_by_user || "Guest"}`,
//       start: new Date(booking.checkin_at.replace(" ", "T")),
//       end: new Date(booking.checkout_at.replace(" ", "T")),
//       type: "hotel",
//     };
//   }),
// ].filter((event) => event !== null);

const AmenitiesCalendar = () => {
  return (
    <div style={{ height: "80vh", padding: "10px", marginTop:"35px", }}>
      <Calendar
        localizer={localizer}
        events={bookings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default AmenitiesCalendar;