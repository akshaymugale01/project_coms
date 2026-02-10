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

    // Validate date range
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("From date cannot be after To date");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Preparing export...", { id: "export-loading" });

      const response = await getAmenityExport(startDate, endDate);

      // Check if response has data
      if (!response.data || response.data.size === 0) {
        toast.dismiss("export-loading");
        toast.error("No data available for the selected date range");
        setLoading(false);
        return;
      }

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
      
      // Clean up the URL object
      window.URL.revokeObjectURL(url);

      toast.dismiss("export-loading");
      toast.success("Export downloaded successfully");
      
      // Close modal after short delay
      setTimeout(() => {
        onclose();
      }, 1000);
    } catch (error) {
      console.error("Export error:", error);
      toast.dismiss("export-loading");
      
      if (error.response) {
        // Server responded with error
        toast.error(`Export failed: ${error.response.statusText || "Server error"}`);
      } else if (error.request) {
        // Request made but no response
        toast.error("No response from server. Please check your connection.");
      } else {
        // Something else went wrong
        toast.error("Failed to export bookings. Please try again.");
      }
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
              max={endDate || undefined}
              className="border border-gray-200 p-2 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">To :</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || undefined}
              className="border border-gray-200 p-2 rounded-md"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleExport}
            disabled={loading || !startDate || !endDate}
            className={`p-2 px-6 text-white rounded-md my-5 ${
              loading || !startDate || !endDate
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Exporting..." : "Export"}
          </button>

          <button
            onClick={onclose}
            disabled={loading}
            className="bg-gray-500 hover:bg-gray-600 p-2 px-6 text-white rounded-md my-5"
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ExportBookingModal;
