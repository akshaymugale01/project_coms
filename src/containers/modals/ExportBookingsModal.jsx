import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { IoAddCircle } from "react-icons/io5";
import toast from "react-hot-toast";
import { getAmenityExport } from "../../api";

const ExportBookingModal = ({ onclose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select From and To dates");
      return;
    }

    try {
      setLoading(true);

      const response = await getAmenityExport(startDate, endDate);

      const blob = new Blob([response.data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `amenity_bookings_${startDate}_to_${endDate}.xlsx`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Export downloaded successfully");
      onclose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to export bookings");
    } finally {
      setLoading(false);
    }
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
            <label className="font-medium">From :</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-200 p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">To :</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-200 p-2 rounded-md"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleExport}
            disabled={loading}
            className="bg-black p-2 px-6 text-white rounded-md my-5"
          >
            {loading ? "Exporting..." : "Submit"}
          </button>

          <button
            onClick={onclose}
            className="bg-gray-500 p-2 px-6 text-white rounded-md my-5"
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ExportBookingModal;
