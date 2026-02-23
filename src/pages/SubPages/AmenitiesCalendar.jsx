import React, { useEffect, useState, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enIN } from "date-fns/locale";
import { domainPrefix, getCalendarBooking } from "../../api";
import { error } from "logrocket";

const locales = { "en-IN": enIN };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AmenitiesCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingType, setBookingType] = useState("");
  const [dateRange, setDateRange] = useState({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  });

  const transformBookings = (raw) =>
    raw.map((b) => ({
      id: b.id,
      title: `${b.title} - ${b.booked_by}`,
      start: new Date(b.start),
      end: new Date(b.end),
      resource: {
        color: b.colors,
        originalData: b,
      },
    }));

  const fetchBooking = useCallback(async () => {
    try {
      setLoading(true);

      const params = {
        start_date: format(dateRange.start, "dd/MM/yyyy"),
        end_date: format(dateRange.end, "dd/MM/yyyy"),
      };

      if (bookingType) params.booking_type = bookingType;

      const res = await getCalendarBooking(params);
      const raw = res?.data?.bookings || [];
      setBookings(transformBookings(raw));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [bookingType, dateRange]);

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  const handleEventClick = (event) => {
    setSelectedBooking(event.resource.originalData);
  };

    const handleRangeChange = (range, view) => {
    let start;
    let end;

    if (view === "month") {
      start = startOfMonth(range.start || range);
      end = endOfMonth(range.start || range);
    } else if (view === "week") {
      start = startOfWeek(range.start, { locale: enIN });
      end = endOfWeek(range.start, { locale: enIN });
    } else if (view === "day") {
      start = range.start;
      end = range.end;
    } else {
      start = range.start;
      end = range.end;
    }

    setDateRange({ start, end });
  };


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

  const bookingImage = domainPrefix + selectedBooking?.details?.amenity?.covers[0]?.image_url || ""
  // console.log("booking details", bookingImage);
  // console.log("details", selectedBooking);

  return (
     <div style={{ height: "80vh", padding: "10px", marginTop: "35px" }}>
      
      {/* FILTER BUTTONS */}
      <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setBookingType("")}
          style={{
            padding: "6px 12px",
            background: bookingType === "" ? "#031325" : "#e5e5e5",
            color: bookingType === "" ? "#fff" : "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          All Bookings
        </button>

        <button
          onClick={() => setBookingType("guest_room")}
          style={{
            padding: "6px 12px",
            background: bookingType === "guest_room" ? "#031325" : "#e5e5e5",
            color: bookingType === "guest_room" ? "#fff" : "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Guest Room Bookings
        </button>

        <button
          onClick={() => setBookingType("amenity")}
          style={{
            padding: "6px 12px",
            background: bookingType === "amenity" ? "#031325" : "#e5e5e5",
            color: bookingType === "amenity" ? "#fff" : "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Amenity Bookings
        </button>
      </div>

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
          onRangeChange={handleRangeChange}
        />
      )}

      {/* ================= MODAL ================= */}
      {selectedBooking && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h2>{selectedBooking.title}</h2>

            <p><strong>Type:</strong> {selectedBooking.type}</p>
            <p><strong>Booked By:</strong> {selectedBooking.booked_by}</p>
            <p><strong>Status:</strong> {selectedBooking.details?.status}</p>
            <p><strong>Amount:</strong> ₹{selectedBooking.details?.amount}</p>

            {/* ================= GUEST ROOM ================= */}
            {selectedBooking.type === "guest_room" && (
              <>
                <p><strong>Check In:</strong> {selectedBooking.details?.checkin_at}</p>
                <p><strong>Check Out:</strong> {selectedBooking.details?.checkout_at}</p>
              </>
            )}

            {/* ================= AMENITY ================= */}
            {selectedBooking.type === "amenity" && (
              <>
                <p><strong>Booking Date:</strong> {selectedBooking.details?.booking_date}</p>

                <p><strong>Selected Slot:</strong>{" "}
                  {selectedBooking.details?.slot?.twelve_hr_slot ||
                    selectedBooking.details?.slot?.error}
                </p>

                {/* 🔥 All Available Slots */}
                {selectedBooking.details?.amenity?.amenity_slots?.length > 0 && (
                  <>
                    <h4>Available Slots:</h4>
                    <div style={{ maxHeight: 120, overflowY: "auto" }}>
                      {selectedBooking.details.amenity.amenity_slots.map((slot) => (
                        <div key={slot.id} style={slotBox}>
                          {slot.twelve_hr_slot}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {/* ================= AMENITY DETAILS ================= */}
            <hr />

            <h4>Amenity Information</h4>
            <p><strong>Name:</strong> {selectedBooking.details?.amenity?.fac_name}</p>
            <p><strong>Description:</strong> {selectedBooking.details?.amenity?.description}</p>
            <p><strong>Min People:</strong> {selectedBooking.details?.amenity?.min_people}</p>
            <p><strong>Max People:</strong> {selectedBooking.details?.amenity?.max_people}</p>

            {/* 🔥 Cover Image */}
            {selectedBooking.details?.amenity?.covers?.length > 0 && (
              <img
                src={bookingImage}
                alt="cover"
                style={{ width: "100%", marginTop: 10, borderRadius: 6 }}
              />
            )}

            <button onClick={() => setSelectedBooking(null)} style={closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalStyle = {
  background: "#fff",
  padding: 20,
  width: 500,
  maxHeight: "90vh",
  overflowY: "auto",
  borderRadius: 8,
};

const slotBox = {
  padding: "6px 10px",
  background: "#f2f2f2",
  marginBottom: 5,
  borderRadius: 4,
};

const closeBtn = {
  marginTop: 15,
  padding: "6px 12px",
  background: "#031325",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

export default AmenitiesCalendar;