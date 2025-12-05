import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { IoAddCircle } from "react-icons/io5";
import * as XLSX from "xlsx";

const ExportBookingModal = ({ onclose }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
  const handleExport = () => {
    const currentDate = new Date();
    const options = { timeZone: "Asia/Kolkata" };
    const ISTDate = currentDate.toLocaleString("en-IN", options);
    const formattedISTDate = ISTDate.replace(/[/:]/g, "_");
    const fileName = `bookings_${formattedISTDate}.xlsx`;
    const data = [
      ["Site", "User Type", "Department", "Month"],
      ["Site 1", "Occupants", "Electrical", "Jan/2022"],
      ["Site 2", "Admin", "Help Desk", "Feb/2022"],
    ];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, fileName);
    onclose();
  };

  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col items-center justify-center">
        <h2 className="flex gap-4 items-center justify-center mb-5 font-bold text-lg">
          <IoAddCircle size={20} />
          Export Booking Report
        </h2>
        <div className="flex gap-10 my-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-medium">
              From :
            </label>
            <input
              type="date"
              name=""
              id=""
              value={startDate}
              onChange={(e) => setStartDate(e.value)}
              className="border border-gray-200 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-medium">
              To :
            </label>
            <input
              type="date"
              name=""
              id=""
              value={endDate}
              onChange={(e) => setEndDate(e.value)}
              className="border border-gray-200 p-2 rounded-md"
            />
          </div>
        </div>

        <button className="bg-black p-2 px-4 text-white rounded-md my-5" onClick={handleExport}>
          Submit
        </button>
      </div>
    </ModalWrapper>
  );
};

export default ExportBookingModal;
