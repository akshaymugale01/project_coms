import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { BiBell, BiLogIn, BiLogOutCircle, BiSolidBellRing } from "react-icons/bi";
import profile from "/profile.png";
import { BsPersonCircle } from "react-icons/bs";
import loginIcon from "/Login.png";
import { RiLoginCircleLine } from "react-icons/ri";
import { MdFastfood } from "react-icons/md";
import { FaCheck, FaNetworkWired } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import toast from "react-hot-toast";
import vibeLogo from "/bio.png"
const EmployeeDashboard = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const tasks = [
    { title: "Open Tasks", count: 10, progress: "w-2/5" },
    { title: "Work In Progress", count: 5, progress: "w-4/5" },
    { title: "Urgent Tasks", count: 2, progress: "w-1/4" },
    { title: "Action Pending", count: 3, progress: "w-1/3" },
    { title: "Complete", count: 1, progress: "w-1/6" },
  ];
  const taskstoday = [
    {
      id: 1,
      title: "Team Meeting",
      description: "Discussing Project with team",
      time: "10:00 AM",
      duration: "1hr 20 minutes",
      bgColor: "#F9DB70",
      participants:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSOdl2MNfJYiv3gDOHjd-Vn5wIFNQErfLEIw&s",
    },
    {
      id: 2,
      title: "Client Meeting",
      description: "Discussing Clients Requirement",
      time: "12:30 PM",
      duration: "1hr 20 minutes",
      bgColor: "#70C8F9",
    },
    {
      id: 3,
      title: "Client Meeting",
      description: "Discussing Clients Requirement",
      time: "03:00 PM",
      duration: "1hr 20 minutes",
      bgColor: "#F9DB70",
    },
    {
      id: 4,
      title: "Team Meeting",
      description: "Discussing Project with team",
      time: "04:30 PM",
      duration: "1hr 20 minutes",
      bgColor: "#70C8F9",
    },
  ];
  const celebrants = ["Akshat Shrawat", "Ravi Parmar", "Anurag Sharma"];
  const events = [
    {
      date: "May 10",
      title: "Company Event",
      time: "all day",
    },
    {
      date: "May 11",
      title: "Progress Meeting",
      time: "10:00AM - 10:30AM",
    },
    {
      date: "May 18",
      title: "Meeting",
      time: "10:00AM - 10:30AM",
    },
  ];
  const tickets = [
    {
      id: "#10202",
      title: "Laptop not working",
      status: "Pending",
      created: "09/05/2024",
      timeAgo: "1 day ago",
    },
    {
      id: "#10245",
      title: "Broken Desk",
      status: "Closed",
      created: "04/04/2024",
      timeAgo: "1 month ago",
    },
    {
      id: "#10263",
      title: "AC not working",
      status: "Closed",
      created: "02/03/2024",
      timeAgo: "2 months ago",
    },
  ];
  const themeColor = useSelector((state) => state.theme.color);
  const firstName = getItemInLocalStorage("Name");
  const lastName = getItemInLocalStorage("LASTNAME");

  const handleToggleComplete = (index) => {
  setCompletedTasks((prevCompleted) => {
    if (prevCompleted.includes(index)) {
      return prevCompleted.filter((i) => i !== index);
      
    } else {
      toast.success(`"${taskstoday[index].title}" marked as completed!`);
      return [...prevCompleted, index];
    }
  });
};
  return (
    <div className="flex bg-gray-100 ">
      <Navbar />
      <div className=" flex flex-col w-full">
        <div
          style={{ background: themeColor }}
          className="bg-black text-white p-2 mx-4 my-2 flex justify-between items-center rounded-lg shadow-md"
        >
          <div className="flex items-center">
            <img
              src={vibeLogo}
              // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGMshTNukLxdr-RYX5Hd9jz9ByEiJgl4liNw&s"
              alt="biocon"
              className="h-10 mr-2 bg-white p-1 rounded-md"
            />
          </div>
            <h1 className="text-xl font-semibold">Dashboard</h1>

          <div className="flex items-center space-x-4">
            
            <button className="p-2">
              <BiSolidBellRing size={20} />
            </button>
            <Link to={`/admin/profile`} className="flex items-center space-x-2 font-medium">
              <span>
                Welcome, {firstName} {lastName}
              </span>
              {/* <img
                src={profile} // replace with profile picture path
                alt="Profile"
                className="h-8 w-8 rounded-full"
              /> */}
              <BsPersonCircle size={30} />
            </Link>
          </div>
        </div>
        <div className="flex space-x-4 mx-5 border-b border-gray-400">
          <p className="text-sm font-medium" style={{ color: "#252AA0" }}>
            Quick Links :
          </p>
          <Link
            to={"/mytickets/userticket"}
            className="text-sm font-medium hover:underline transition-all duration-300"
            style={{ color: "#252AA0" }}
          >
            Raise Ticket
          </Link>
          <Link
            to={"/bookings/new-facility-booking"}
            className="text-sm font-medium hover:underline transition-all duration-300"
            style={{ color: "#252AA0" }}
          >
            Book Meeting Room
          </Link>
          <Link
            to={"/employee/insurance"}
            className="text-sm font-medium hover:underline transition-all duration-300"
            style={{ color: "#252AA0" }}
          >
            My Policies
          </Link>
        </div>
        <div className="flex mb-4">
          {/* Main Content */}
          <div className="flex flex-col  justify-between md:flex-row gap-2 p-4 w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
              {/* Tasks */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 border-b">Tasks</h2>
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className="mb-4  rounded-md  shadow-md p-2 border border-gray-200"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{task.title}</span>
                      <span>{task.count} Tasks</span>
                    </div>
                    <div className="bg-gray-200 h-2 rounded-full mt-2">
                      <div
                      style={{background: themeColor}}
                        className={`bg-black h-full rounded-full ${task.progress}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Birthdays */}
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between h-full">
                <h2 className="text-xl font-semibold mb-4 border-b">
                  Today's Birthday Celebrants!!
                </h2>
                <div className="flex-1">
                  {celebrants.map((name, index) => (
                    <div key={index} className="my-3">
                      <div className="bg-white shadow-custom-all-sides p-2 py-3 rounded-md text-white font-medium bg-gradient-to-r from-red-400 to-red-300" >
                        It's {name}'s birthday today! 🎉
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto text-right">
                  <Link to="/birthday" className="text-blue-500 underline">
                    View Recent Birthdays
                  </Link>
                </div>
              </div>

              {/* Tickets Overview */}
              <div className="p-4 bg-white rounded-2xl  shadow-lg">
                <h2 className="text-lg font-semibold mb-4 border-b">
                  Tickets Overview
                </h2>
                {tickets.map((ticket, index) => (
                  <div
                    key={index}
                    style={{background: themeColor}}
                    className="mb-4 flex bg-gray-800 rounded-2xl border-2 text-white  "
                  >
                    {/* Ticket Number Section */}
                    <div className="bg-white p-2 rounded-r-lg rounded-l-xl w-28 text-center flex items-center justify-center">
                      <span className="text-xs text-black font-bold tracking-wider rotate-270">
                        <p>Ticket No.</p>
                        {ticket.id}
                      </span>
                    </div>

                    {/* Ticket Info Section */}
                    <div className="p-4  flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-md font-medium">
                          {ticket.title}
                        </span>
                        <span className="text-xs text-gray-50">
                          {ticket.timeAgo}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm">Status: {ticket.status}</p>
                        <p className="text-xs text-gray-100">
                          Created on: {ticket.created}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-auto text-right">
                  <Link
                    to="/mytickets"
                    className="text-blue-500 text-sm underline"
                  >
                    View all Tickets
                  </Link>
                </div>
              </div>

              {/* Overview */}
              <div className="p-4 bg-white rounded-2xl shadow-lg space-y-4">
                <h2 className="text-xl font-semibold mb-1">Overview</h2>
                <p className="text-xl font-bold text-black">
                  Thursday 05 April 2024
                </p>

                <div className="mt-4 space-y-4">
                  {/* Check-in */}
                  <div className="flex gap-4 ">
                    <div className="flex flex-col items-center mt-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="h-14 w-0.5 bg-blue-500"></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="h-14 w-0.5 bg-blue-500"></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="h-14 w-0.5 bg-blue-500"></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>

                    <div className="w-full">
                      {/* Check-in */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex flex-col ">
                          <span className="text-md font-semibold">
                            08:00 AM
                          </span>
                          <span className="text-xs text-gray-400">
                            Actual check in
                          </span>
                        </div>
                        <div className="w-40 mx-2">
                          <div className="flex justify-between shadow-custom-all-sides rounded-xl items-center text-wrap  p-2">
                            <div className="flex flex-col ">
                              <span className="text-sm font-semibold">
                                Check in
                              </span>
                              <div>
                                <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2  rounded-full">
                                  On Time
                                </span>
                              </div>
                            </div>
                            <RiLoginCircleLine
                              className="text-purple-400"
                              size={25}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Break */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex flex-col space-y-1">
                          <span className="text-md font-semibold">
                            12:00 PM
                          </span>
                          <span className="text-xs text-gray-400">
                            Start 12:00 PM
                          </span>
                        </div>
                        <div className="w-40 mx-2">
                          <div className="flex justify-between items-center shadow-custom-all-sides rounded-xl text-wrap bg-gradient-to-r from-purple-custom to-purple-300 p-2">
                          <div className="flex flex-col">
                            <span className="font-semibold text-white">
                              Break
                            </span>
                            <span className="text-xs rounded-full font-medium text-white">
                              Enjoy
                            </span>
                          </div>
                            <MdFastfood size={25} className="text-white" /> 
                          </div>
                        </div>
                      </div>

                      {/* After Break */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-md font-semibold">
                            12:35 PM
                          </span>
                          <span className="text-xs text-gray-400">
                            After Break Schedule
                          </span>
                        </div>
                        <div className="w-40 mx-2">
                          <div className="flex justify-between items-center shadow-custom-all-sides rounded-xl text-wrap  p-2">
                          <div className="flex flex-col ">
                            <span className=" font-semibold">
                              {" "}
                              After Break
                            </span>
                            <span className="text-xs font-medium text-gray-500">
                              It is now 12:35pm
                            </span>
                          </div>
                          <FaNetworkWired size={25} className="text-purple-400" /> 
                          </div>
                        </div>
                      </div>

                      {/* Check-out */}
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col space-y-1">
                          <span className="text-md font-semibold">
                            06:00 PM
                          </span>
                          <span className="text-xs text-gray-400">
                            Check Out Schedule
                          </span>
                        </div>
                        <div className="w-40 mx-2">
                          <div className="flex justify-between items-center shadow-custom-all-sides rounded-xl text-wrap  p-2">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold">
                              {" "}
                              Check Out
                            </span>
                            <span className="text-xs text-gray-500">
                              It is now 06:00 PM
                            </span>
                          </div>
                            <BiLogOutCircle className="text-purple-400" size={25}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overtime */}
                <div className="mt-6 flex items-center justify-between shadow-custom-all-sides rounded-xl">
                  <div className="flex justify-between items-center w-full px-6 py-3">
                  <div className="flex flex-col ">
                    <p className="text-md font-bold text-black">Overtime</p>
                    <span className="text-sm font-semibold">Extra: 1 hr</span>
                  </div>
                  <FiClock size={25}  /> 
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 w-1/3 py-4 pr-2">
            <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-between flex-col">
              <h2 className="text-xl font-semibold mb-4 border-b">
                Upcoming Events
              </h2>
              {/* <div className=""> */}

              {events.map((event, index) => (
                <div key={index} className="mb-4">
                  <div className="flex gap-6">
                    <div className="text-gray-600">{event.date}</div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{event.title} - </span>
                      <div className="text-gray-500 text-sm">{event.time}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-auto text-right">
                <Link to="/calendar" className="text-blue-500 underline">
                  View full calendar
                </Link>
              </div>
              </div>
            {/* </div> */}
            <div className="p-4 bg-white rounded-2xl shadow-lg flex flex-col justify-between">
              <h2 className="text-lg font-semibold mb-4">
                Tasks Upcoming Today
              </h2>
              <div className="space-y-4">
                {taskstoday.map((task, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl flex items-center justify-between`}
                    style={{backgroundColor: `${task.bgColor}`}}
                  >
                    <div>
                      <h3 className="text-md font-semibold">{task.title}</h3>
                      <p className="text-sm font-medium">{task.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-sm font-medium bg-gray-100 px-2 rounded-full">{task.time}</span>
                        <span className="text-sm font-medium bg-gray-100 px-2 rounded-full">{task.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* <img
                   
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSOdl2MNfJYiv3gDOHjd-Vn5wIFNQErfLEIw&s"
                    alt="Participant"
                    className="w-8 h-8 rounded-full"
                  /> */}

                      <button className="w-8 h-8 flex justify-center items-center rounded-full bg-white" onClick={()=> handleToggleComplete(index)}>
                      {completedTasks.includes(index) && <FaCheck />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto text-right">
                <Link
                  to="/Task-management"
                  className="text-blue-500 text-sm mt-4 block underline"
                >
                  View all Tasks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
