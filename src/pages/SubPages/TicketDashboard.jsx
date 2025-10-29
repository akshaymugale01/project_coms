import { useEffect, useState } from "react";
import {
  getTicketDashboard,
  getStatusDownload,
  getTicketStatusDownload,
} from "../../api";
import { FaDownload, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

const TicketDashboard = () => {
  const [totalTickets, setTotalTickets] = useState("");
  const [statusData, setStatusData] = useState({});
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicketInfo = async (retry = 0) => {
      try {
        setLoading(true);
        const ticketInfoResp = await getTicketDashboard();
        setTotalTickets(ticketInfoResp.data.total);
        setStatusData(ticketInfoResp.data.by_status);
        setLoading(false);
        // console.log(ticketInfoResp);
      } catch (error) {
        if (retry < 1) {
          setTimeout(() => {
            console.log("Ticket DashBoard", error);
            fetchTicketInfo(retry + 1);
          }, 100);
        } else {
          console.error("Error fetching dashboard ticket  info:", error);
          setLoading(false);
        }
      }
    };
    fetchTicketInfo();
  }, []);

  const handleStatusDownload = async (key) => {
    toast.loading("Downloading Please Wait");
    try {
      const response = await getStatusDownload(key);
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers["content-type"],
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Ticket_Status_file.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Ticket Status downloaded successfully");
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      console.error("Error downloading Ticket Status:", error);
      toast.error("Something went wrong, please try again");
    }
  };

  const handleTicketStatusDownload = async (
    startDate = null,
    endDate = null
  ) => {
    toast.loading("Downloading Please Wait");
    try {
      const response = await getTicketStatusDownload(startDate, endDate);
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers["content-type"],
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ticket_file.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Ticket downloaded successfully");
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      console.error("Error downloading Ticket:", error);
      toast.error("Something went wrong, please try again");
    }
  };

  const handleDownloadClick = () => {
    setShowDownloadModal(true);
  };

  const handleModalDownload = async (downloadAll = false) => {
    if (downloadAll) {
      // Download all records without date filter
      await handleTicketStatusDownload();
    } else {
      // Download with date filter
      if (!startDate || !endDate) {
        toast.error("Please select both start and end dates");
        return;
      }
      await handleTicketStatusDownload(startDate, endDate);
    }
    setShowDownloadModal(false);
    setStartDate("");
    setEndDate("");
  };

  // Calculate metrics
  const totalResolved = Object.entries(statusData)
    .filter(([key]) => key.toLowerCase().includes('resolved') || key.toLowerCase().includes('closed') || key.toLowerCase().includes('complete'))
    .reduce((sum, [, value]) => sum + value, 0);
  
  const totalPending = Object.entries(statusData)
    .filter(([key]) => key.toLowerCase().includes('pending') || key.toLowerCase().includes('open') || key.toLowerCase().includes('new'))
    .reduce((sum, [, value]) => sum + value, 0);

  const totalInProgress = Object.entries(statusData)
    .filter(([key]) => key.toLowerCase().includes('progress') || key.toLowerCase().includes('assigned'))
    .reduce((sum, [, value]) => sum + value, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-white text-4xl" />
      </div>
    );
  }

  return (
    <div className="space-y-5">{/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Total Tickets</h3>
            <button
              onClick={handleDownloadClick}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all duration-200 hover:scale-110"
              title="Download with date options"
            >
              <FaDownload className="text-white" />
            </button>
          </div>
          <p className="text-4xl font-bold my-2">{totalTickets}</p>
          <p className="text-sm opacity-80">All tickets in system</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Resolved</h3>
            <div className="text-3xl opacity-80">✓</div>
          </div>
          <p className="text-4xl font-bold my-2">{totalResolved}</p>
          <p className="text-sm opacity-80">Successfully resolved</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">In Progress</h3>
            <div className="text-3xl opacity-80">⏳</div>
          </div>
          <p className="text-4xl font-bold my-2">{totalInProgress}</p>
          <p className="text-sm opacity-80">Currently working on</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Pending</h3>
            <div className="text-3xl opacity-80">⏸</div>
          </div>
          <p className="text-4xl font-bold my-2">{totalPending}</p>
          <p className="text-sm opacity-80">Awaiting action</p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        {Object.entries(statusData).map(([key, value]) => (
          <div
            key={key}
            className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-medium text-base">{key}</h2>
              <button
                onClick={() => handleStatusDownload(key)}
                className="bg-orange-500 hover:bg-orange-600 p-1.5 rounded-full transition-all duration-200 hover:scale-110"
                title="Download this status"
              >
                <FaDownload className="text-white text-xs" />
              </button>
            </div>
            <p className="text-3xl font-bold my-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* Close button */}
            <button
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-6">
              Download Tickets Report
            </h3>

            {/* Download All Records Section */}
            <div className="mb-6 p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">
                Download All Records
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                Download complete tickets report
              </p>
              <button
                onClick={() => handleModalDownload(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                <FaDownload />
                Download
              </button>
            </div>

            {/* Download by Date Range Section */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">
                Download by Date Range
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Select specific date range for download
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <button
                onClick={() => handleModalDownload(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                📅 Download Date Range
              </button>
            </div>

            {/* Cancel Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDashboard;
