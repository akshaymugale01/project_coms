// src/components/SeatLayout.js
import React, { useState } from "react";
import Seat from "./Seat";

const SeatLayout = () => {
  const initialSeats = Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    isSelected: false, // Random availability
  }));

  const [seats, setSeats] = useState(initialSeats);
  const [bookedCount, setBookedCount] = useState(0);

  //   const handleSeatClick = (seatNumber) => {
  //     setSeats(
  //       seats.map((seat) =>
  //         seat.number === seatNumber ? { ...seat, isAvailable: false } : seat
  //       )
  //     );
  //     setBookedCount(bookedCount + 1);
  //   };

  const handleSeatClick = (seatNumber, isSelected) => {
    setSeats(
      seats.map((seat) =>
        seat.number === seatNumber ? { ...seat, isSelected: !isSelected } : seat
      )
    );
    setBookedCount(bookedCount + (isSelected ? -1 : 1));
  };
  return (
    <div className="">
      {/* <h1 className="text-xl mb-4">Available Seats</h1> */}
      <div className="flex justify-center flex-wrap gap-4">
        {seats.map((seat) => (
          <Seat
            key={seat.number}
            seatNumber={seat.number}
            isSelected={seat.isSelected}
            onClick={handleSeatClick}
          />
        ))}
      </div>
      <span className="font-semibold flex gap-2 items-center">
        No. of seats Booked : {bookedCount}
      </span>
    </div>
  );
};

export default SeatLayout;
