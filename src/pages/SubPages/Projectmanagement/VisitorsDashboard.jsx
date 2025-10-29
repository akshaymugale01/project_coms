import { useEffect, useState } from "react";
import { FaDownload, FaCalendarAlt } from "react-icons/fa";
import { getVisitorDashboard, getExportVisitors } from "../../../api";
import toast from "react-hot-toast";

const VisitorsDashboard = () => {
  const [totalTickets, setTotalTickets] = useState("");
  const [todaysIn, setTodaysIn] = useState("");
  const [todaysOut, setTodaysOut] = useState("");
  const [totalIn, setTotalIn] = useState("");
  const [totalOut, setTotalOut] = useState("");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  console.log("Dashboard", totalTickets);
  //const [statusData, setStatusData] = useState({});
  useEffect(() => {
    const fetchTicketInfo = async (retry = 0) => {
      try {
        const ticketInfoResp = await getVisitorDashboard();
        setTotalTickets(ticketInfoResp.data.total);
        setTodaysIn(ticketInfoResp.data.today_in);
        setTodaysOut(ticketInfoResp.data.today_out);
        setTotalIn(ticketInfoResp.data.in);
        setTotalOut(ticketInfoResp.data.out);
        // console.log(ticketInfoResp);
      } catch (error) {
        if (retry < 1) {
          setTimeout(() => {
            console.log("Ticket DashBoard", error);
            fetchTicketInfo(retry + 1);
          }, 100);
        } else {
          console.error("Error fetching dashboard ticket  info:", error);
        }
      }
    };
    fetchTicketInfo();
  }, []);

  const handleVisitorsDownload = async (downloadType = 'overall', dateRange = null) => {
    const loadingMessage = downloadType === 'overall' 
      ? "Downloading All Visitors Report, Please Wait..." 
      : "Downloading Date-wise Visitors Report, Please Wait...";
      
    toast.loading(loadingMessage);
    try {
      // Use the API function with date parameters
      const response = downloadType === 'date' && dateRange
        ? await getExportVisitors(dateRange.start, dateRange.end)
        : await getExportVisitors();
      
      // Create blob and download
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      
      // Dynamic filename based on download type
      const filename = downloadType === 'date' && dateRange
        ? `visitors_${dateRange.start}_to_${dateRange.end}.xlsx`
        : `visitors_export_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.xlsx`;
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      toast.dismiss();
      toast.success("Visitors report downloaded successfully");
      setShowDownloadModal(false); // Close modal after download
    } catch (error) {
      toast.dismiss();
      console.error("Error downloading visitors report:", error);
      toast.error("Failed to download visitors report. Please try again.");
    }
  };

  const handleOverallDownload = () => {
    handleVisitorsDownload('overall');
  };

  const handleDateRangeDownload = () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date must be before end date");
      return;
    }
    
    const dateRange = { start: startDate, end: endDate };
    handleVisitorsDownload('date', dateRange);
  };

  const openDownloadModal = () => {
    setStartDate(getTodayDate());
    setEndDate(getTodayDate());
    setShowDownloadModal(true);
  };

  const handleGenericDownload = async (type) => {
    toast.loading(`Downloading ${type} report, Please Wait...`);
    try {
      // Map display names to filter types
      const filterTypeMap = {
        "Total In": "total_in",
        "Total Out": "total_out", 
        "Today's In": "today_in",
        "Today's Out": "today_out"
      };
      
      const filterType = filterTypeMap[type];
      
      // Use the API function with filter type
      const response = await getExportVisitors(null, null, filterType);
      
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.download = `${type.toLowerCase().replace(/\s+/g, '_')}_report.xlsx`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      toast.dismiss();
      toast.success(`${type} report downloaded successfully`);
    } catch (error) {
      toast.dismiss();
      console.error(`Error downloading ${type} report:`, error);
      toast.error(`Failed to download ${type} report. Please try again.`);
    }
  };

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 shadow-custom-all-sides border py-2 px-5 rounded-md flex flex-col text-white text-sm font-medium h-32">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-xl">Total Visitors</h2>
            <button 
              onClick={openDownloadModal}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all duration-200 hover:scale-110"
              title="Download with date options"
            >
              <FaDownload className="text-white" />
            </button>
          </div>
          <div className="my-5 flex items-center justify-center">
            <span className="text-3xl">{totalTickets}</span>
          </div>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-2 px-5 rounded-md flex flex-col text-white text-sm font-medium h-32">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-xl">Total In</h2>
            <button 
              onClick={() => handleGenericDownload("Total In")}
              className="bg-orange-500 hover:bg-orange-600 p-2 rounded-full transition-all duration-200 hover:scale-110"
              title="Direct download"
            >
              <FaDownload className="text-white" />
            </button>
          </div>
          <div className="my-5 flex items-center justify-center">
            <span className="text-3xl">{totalIn}</span>
          </div>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-2 px-5 rounded-md flex flex-col text-white text-sm font-medium h-32">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-xl">Total Out</h2>
            <button 
              onClick={() => handleGenericDownload("Total Out")}
              className="bg-orange-500 hover:bg-orange-600 p-2 rounded-full transition-all duration-200 hover:scale-110"
              title="Direct download"
            >
              <FaDownload className="text-white" />
            </button>
          </div>
          <div className="my-5 flex items-center justify-center">
            <span className="text-3xl">{totalOut}</span>
          </div>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-2 px-5 rounded-md flex flex-col text-white text-sm font-medium h-32">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-xl">Today&apos;s In</h2>
            <button 
              onClick={() => handleGenericDownload("Today's In")}
              className="bg-orange-500 hover:bg-orange-600 p-2 rounded-full transition-all duration-200 hover:scale-110"
              title="Direct download"
            >
              <FaDownload className="text-white" />
            </button>
          </div>
          <div className="my-5 flex items-center justify-center">
            <span className="text-3xl">{todaysIn}</span>
          </div>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-2 px-5 rounded-md flex flex-col text-white text-sm font-medium h-32">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-xl">Today&apos;s Out</h2>
            <button 
              onClick={() => handleGenericDownload("Today's Out")}
              className="bg-orange-500 hover:bg-orange-600 p-2 rounded-full transition-all duration-200 hover:scale-110"
              title="Direct download"
            >
              <FaDownload className="text-white" />
            </button>
          </div>
          <div className="my-5 flex items-center justify-center">
            <span className="text-3xl">{todaysOut}</span>
          </div>
        </div>
      </div>

      {/* Download Options Modal */}
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
            
            <h3 className="text-lg font-semibold mb-6">Download Visitors Report</h3>
            
            {/* Download All Records Section */}
            <div className="mb-6 p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Download All Records</h4>
              <p className="text-gray-600 text-sm mb-3">Download complete visitors report</p>
              <button
                onClick={handleOverallDownload}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                <FaDownload />
                Download
              </button>
            </div>
            
            {/* Download by Date Range Section */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Download by Date Range</h4>
              <p className="text-gray-600 text-sm mb-4">Select specific date range for download</p>
              
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
                onClick={handleDateRangeDownload}
                disabled={!startDate || !endDate}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition-colors"
              >
                <FaCalendarAlt />
                Download Date Range
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

export default VisitorsDashboard;
