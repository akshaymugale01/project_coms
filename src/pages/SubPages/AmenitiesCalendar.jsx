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
    } else {
      start = range.start;
      end = range.end;
    }

    setDateRange({ start, end });
  };

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.resource?.color || "#031325",
      color: "#fff",
      borderRadius: "8px",
      padding: "6px",
      fontSize: "13px",
      border: "none",
    },
  });

  const booking = selectedBooking?.details;
  const amenity = booking?.amenity;

  const bookingImage =
    amenity?.covers?.length > 0
      ? domainPrefix + amenity.covers[0].image_url
      : null;

  return (
    <div style={{ height: "85vh", padding: "20px", background: "#f4f6fa" }}>
      <Calendar
        localizer={localizer}
        events={bookings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "75vh", background: "#fff", padding: 15, borderRadius: 12 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleEventClick}
        onRangeChange={handleRangeChange}
      />

      {/* ================= MODAL ================= */}
      {selectedBooking && (
  <div style={overlayStyle}>
    <div style={modalStyle}>
      
      {/* Header */}
      <div style={headerStyle}>
        <h1 className="text-[20px] text-blue-800"><b>{selectedBooking.title}</b></h1>
        <button onClick={() => setSelectedBooking(null)} style={closeBtn}>
          ✕
        </button>
      </div>

      {/* ===== TOP SECTION (Left: Booking | Right: Image) ===== */}
      <div style={topSectionStyle}>
        
        {/* LEFT SIDE - Booking Details */}
        <div style={{ flex: 1 }}>
          <Section title="Booking Information">
            <Info label="Booking ID" value={booking?.id} />
            <Info label="Booked By" value={booking?.book_by_user} />
            <Info label="Status" value={booking?.status} />
            <Info label="Amount" value={`₹${booking?.amount}`} />
            <Info label="Payment Mode" value={booking?.payment_mode} />
            <Info label="Booking Date" value={booking?.booking_date} />
            <Info label="Selected Slot" value={booking?.slot?.twelve_hr_slot} />
          </Section>
        </div>

        {/* RIGHT SIDE - Cover Image */}
        {bookingImage && (
          <div style={imageContainerStyle}>
            <img
              src={bookingImage}
              alt="cover"
              style={imageStyle}
            />
          </div>
        )}
      </div>

      {/* ===== BELOW SECTION (Same as Before) ===== */}

      {/* People Details */}
      <Section title="People Details">
        <Info label="Member Adult" value={booking?.member_adult} />
        <Info label="Member Child" value={booking?.member_child} />
        <Info label="Guest Adult" value={booking?.guest_adult} />
        <Info label="Guest Child" value={booking?.guest_child} />
        <Info label="Tenant Adult" value={booking?.tenant_adult} />
        <Info label="Tenant Child" value={booking?.tenant_child} />
      </Section>

      {/* Amenity Details */}
      <Section title="Amenity Information">
        <Info label="Facility Name" value={amenity?.fac_name} />
        <Info label="Facility Type" value={amenity?.fac_type} />
        <Info label="Min People" value={amenity?.min_people} />
        <Info label="Max People" value={amenity?.max_people} />
        <Info label="GST %" value={amenity?.gst_no} />
        <Info label="Member Price Adult" value={amenity?.member_price_adult} />
        <Info label="Member Price Child" value={amenity?.member_price_child} />
        <Info label="Description" value={amenity?.description} />
      </Section>

      {/* Slots */}
      {amenity?.amenity_slots?.length > 0 && (
        <Section title="Available Slots">
          {amenity.amenity_slots.map((slot) => (
            <div key={slot.id} style={slotBox}>
              {slot.twelve_hr_slot}
            </div>
          ))}
        </Section>
      )}
    </div>
  </div>
)}
    </div>
  );
};

/* ================= Reusable Components ================= */

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 25 }}>
    <h3 style={{ marginBottom: 10, borderBottom: "1px solid #eee", paddingBottom: 5 }}>
      {title}
    </h3>
    <div style={gridStyle}>{children}</div>
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <strong>{label}:</strong>
    <div style={{ color: "#555", marginTop: 4 }}>{value || "-"}</div>
  </div>
);

/* ================= Styles ================= */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalStyle = {
  width: "85%",
  maxHeight: "90vh",
  overflowY: "auto",
  background: "#fff",
  padding: "20px",
  borderRadius: 16,
  boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
};

const slotBox = {
  padding: 10,
  background: "#f1f3f5",
  borderRadius: 6,
};

const policyStyle = {
  whiteSpace: "pre-line",
  color: "#444",
};

const closeBtn = {
  border: "none",
  background: "#031325",
  color: "#fff",
  borderRadius: "50%",
  width: 35,
  height: 35,
  cursor: "pointer",
};
const topSectionStyle = {
  display: "flex",
  gap: 30,
  marginBottom: 30,
  alignItems: "flex-start",
};

const imageContainerStyle = {
  width: "35%",
  display: "flex",
  justifyContent: "flex-end",
};

const imageStyle = {
  width: "100%",
  borderRadius: 12,
  objectFit: "cover",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
};

export default AmenitiesCalendar;