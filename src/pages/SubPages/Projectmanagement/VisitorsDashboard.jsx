import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { getTicketDashboard, getVisitorDashboard } from "../../../api";

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
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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

  return (
    <div>
     <div className="flex items-center gap-6 overflow-auto p-2 ">
        <div className="bg-gray-700 min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col items-center text-white text-sm w-fit font-medium">
          <div className="flex gap-2">
            <span> Total Visitors </span>
            <button onClick={handleTicketStatusDownload}>
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
            <button onClick={handleTicketStatusDownload}>
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
            <button onClick={handleTicketStatusDownload}>
              <FaDownload />
            </button>
          </div>
          <span className="font-medium text-base text-white">
            {totalOut}
          </span>{" "}
        </div>
        <div className="bg-gray-700 min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col items-center text-white text-sm w-fit font-medium">
          <div className="flex gap-2">
            <span> Today's In </span>
            <button onClick={handleTicketStatusDownload}>
              <FaDownload />
            </button>
          </div>
          <span className="font-medium text-base text-white">
            {todaysIn}
          </span>{" "}
        </div>
        <div className="bg-gray-700 min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col items-center text-white text-sm w-fit font-medium">
          <div className="flex gap-2">
            <span> Today's Out</span>
            <button onClick={handleTicketStatusDownload}>
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
