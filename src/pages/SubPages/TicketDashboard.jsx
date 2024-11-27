import React, { useEffect, useState } from "react";
import {
  getTicketDashboard,
  getStatusDownload,
  getTicketStatusDownload,
} from "../../api";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";

const TicketDashboard = () => {
  const [totalTickets, setTotalTickets] = useState("");
  const [statusData, setStatusData] = useState({});
  //const [statusData, setStatusData] = useState({});
  useEffect(() => {
    const fetchTicketInfo = async () => {
      try {
        const ticketInfoResp = await getTicketDashboard();
        setTotalTickets(ticketInfoResp.data.total);
        setStatusData(ticketInfoResp.data.by_status);
        console.log(ticketInfoResp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTicketInfo();
  }, []);
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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
      toast.success("Soft Service downloaded successfully");
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      console.error("Error downloading Soft Service:", error);
      toast.error("Something went wrong, please try again");
    }
  };

  const handleTicketStatusDownload = async () => {
    toast.loading("Downloading Please Wait");
    try {
      const response = await getTicketStatusDownload();
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

  return (
    <div>
      <div className="flex items-center gap-6 overflow-auto p-2 ">
        <div className="bg-white min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col items-center text-gray-500 text-sm w-fit font-medium">
          <div className="flex gap-2">
            <span>Tickets Created{" "}</span>
            <button onClick={handleTicketStatusDownload}>
              <FaDownload />
            </button>
          </div>
          <span className="font-medium text-base text-black">
            {totalTickets}
          </span>{" "}
        </div>
        {Object.entries(statusData).map(([key, value]) => (
          <div
            key={key}
            className="bg-white min-w-44 shadow-custom-all-sides p-4 font-medium rounded-md flex flex-col items-center text-gray-500 text-sm w-fit"
          >
            <div className="flex gap-2">
              <span>{key} </span>
              <button onClick={() => handleStatusDownload(key)}>
                <FaDownload />
              </button>
            </div>
            <span className="font-medium text-base text-black">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketDashboard;
