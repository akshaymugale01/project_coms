import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { getVisitorDashboard, API_URL } from "../../../api";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../../utils/localStorage";

const VisitorsDashboard = () => {
  const [totalTickets, setTotalTickets] = useState("");
  const [todaysIn, setTodaysIn] = useState("");
  const [todaysOut, setTodaysOut] = useState("");
  const [totalIn, setTotalIn] = useState("");
  const [totalOut, setTotalOut] = useState("");

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

  const handleVisitorsDownload = async () => {
    toast.loading("Downloading Visitors Report, Please Wait...");
    try {
      const token = getItemInLocalStorage("TOKEN");
      const siteId = getItemInLocalStorage("SITEID");
      
      // Direct download URL approach
      const downloadUrl = `${API_URL}/visitors/export_visitors.xlsx?token=${token}&site_ids=${siteId}`;
      
      // Using fetch for better control
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.download = 'visitors_export.xlsx';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      toast.dismiss();
      toast.success("Visitors report downloaded successfully");
    } catch (error) {
      toast.dismiss();
      console.error("Error downloading visitors report:", error);
      toast.error("Failed to download visitors report. Please try again.");
    }
  };

  const handleGenericDownload = async (type) => {
    toast.loading(`Downloading ${type} report, Please Wait...`);
    try {
      const token = getItemInLocalStorage("TOKEN");
      const siteId = getItemInLocalStorage("SITEID");
      
      // For now, using the same visitors API for all types
      // You can customize this based on different endpoints for each type
      const downloadUrl = `${API_URL}/visitors/export_visitors.xlsx?token=${token}&site_ids=${siteId}`;
      
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
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
     <div className="flex items-center gap-6 overflow-auto p-2 ">
        <div className="bg-gray-700 min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col items-center text-white text-sm w-fit font-medium">
          <div className="flex gap-2">
            <span> Total Visitors </span>
            <button onClick={handleVisitorsDownload}>
              <FaDownload />
            </button>
          </div>
          <span className="font-medium text-base text-white">
            {totalTickets}
          </span>{" "}
        </div>
        <div className="bg-gray-700 min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col items-center text-white text-sm w-fit font-medium">
          <div className="flex gap-2">
            <span> Total In </span>
            <button onClick={() => handleGenericDownload("Total In")}>
              <FaDownload />
            </button>
          </div>
          <span className="font-medium text-base text-white">
            {totalIn}
          </span>{" "}
        </div>
        <div className="bg-gray-700 min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col items-center text-white text-sm w-fit font-medium">
          <div className="flex gap-2">
            <span> Total Out </span>
            <button onClick={() => handleGenericDownload("Total Out")}>
              <FaDownload />
            </button>
          </div>
          <span className="font-medium text-base text-white">
            {totalOut}
          </span>{" "}
        </div>
        <div className="bg-gray-700 min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col items-center text-white text-sm w-fit font-medium">
          <div className="flex gap-2">
            <span> Today&apos;s In </span>
            <button onClick={() => handleGenericDownload("Today's In")}>
              <FaDownload />
            </button>
          </div>
          <span className="font-medium text-base text-white">
            {todaysIn}
          </span>{" "}
        </div>
        <div className="bg-gray-700 min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col items-center text-white text-sm w-fit font-medium">
          <div className="flex gap-2">
            <span> Today&apos;s Out</span>
            <button onClick={() => handleGenericDownload("Today's Out")}>
              <FaDownload />
            </button>
          </div>
          <span className="font-medium text-base text-white">
            {todaysOut}
          </span>{" "}
        </div>
        {/* {Object.entries(statusData).map(([key, value]) => (
          <div
            key={key}
            className="bg-gray-700 min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col items-center text-white text-sm w-fit font-medium"
          >
            <div className="flex gap-2">
              <span>{key} </span>
              <button onClick={() => handleStatusDownload(key)}>
                <FaDownload />
              </button>
            </div>
            <span className="font-medium text-base text-white">{value}</span>
          </div>
        ))} */}
      </div> 
    </div>
  );
};

export default VisitorsDashboard;
