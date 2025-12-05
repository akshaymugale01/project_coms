// src/components/Seat.js
import React from "react";
import { PiOfficeChairBold } from "react-icons/pi";

const Seat = ({ seatNumber, isSelected, onClick }) => {
  return (
    <div
      className={`w-10 h-10 m-2 flex items-center rounded-md shadow-custom-all-sides text-white justify-center cursor-pointer 
                ${
                  isSelected
                    ? "bg-red-400 hover:bg-red-700"
                    : "bg-green-400 hover:bg-green-700"
                }`}
      onClick={() => onClick(seatNumber, isSelected)}
    >
      <PiOfficeChairBold />
    </div>
  );
};

export default Seat;
