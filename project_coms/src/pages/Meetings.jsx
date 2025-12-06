import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";

import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import { IoClose, IoVideocam } from "react-icons/io5";
import Navbar from "../components/Navbar";
import Table from "../components/table/Table";
import { generateVibeMeetingSummary, getVibeCalendar, getVibeMeeting } from "../api";
import { getItemInLocalStorage } from "../utils/localStorage";
import { useSelector } from "react-redux";

const Meetings = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  const [searchMeetingText, setSearchMeetingText] = useState("")

  const handleStatusChange = (status) => {
    setSelectedStatus(status);

    if (status === "all") {
      setFilteredData(meetings);
      
    } else {
      const filteredResults = meetings.filter((item) => {
        if (status === "upcoming" && !item.status_complete) {
          console.log(item.status_complete)
          return true;
        }
        if (status === "completed" && item.status_complete) {
          return true;
        }
        return false;
      });

      setFilteredData(filteredResults);
      
    }
  };

  const handleSearchMeeting = (event) => {
    const searchValue = event.target.value;
    setSearchMeetingText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredData(meetings);
    } else {
    const filteredResults = meetings.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filteredResults);
    console.log(filteredResults)
    
  }
  };

  const columns = [
    {
      name: "View",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/meetings/meeting-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.from_date,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.from_time,
      sortable: true,
    },
    {
      name: "No. of Attendees ",
      selector: (row) => row.participant.length,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.status_complete ? "Completed" : "Upcoming"),
      sortable: true,
    },
    // {
    //   name: "Created By",
    //   selector: (row) => row.created_by,
    //   sortable: true,
    // },
    {
      name: "Join",
      selector: (row) =>
        !row.status_complete && (
          <div className="flex gap-2">
            <Link
              to={row.meet_link}
              target="_blank"
              className="p-1 px-4 bg-green-400 rounded-full hover:bg-green-600 text-white font-medium flex justify-center items-center gap-2 transition-all ease-in-out duration-300"
            >
              <IoVideocam /> Join
            </Link>
            {/* <button className=" p-2 bg-red-400 rounded-full hover:bg-red-600 text-white font-medium flex justify-center items-center gap-2 transition-all ease-in-out duration-300">
              <IoClose />
            </button> */}
          </div>
        ),
      sortable: true,
    },
  ];
  const user_id = getItemInLocalStorage("VIBEUSERID");
  useEffect(() => {
    const fetchMeetingList = async () => {
      try {
        const jsonData = await getVibeMeeting(user_id);

        if (jsonData.success) {
          console.log(jsonData);
          console.log(jsonData.data);
       
          const sortedMeetings = jsonData.data.sort((a, b) => new Date(b.from_date) - new Date(a.from_date));
          setMeetings(sortedMeetings);
          setFilteredData(sortedMeetings)
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error:", error);
        // setIsLoadingMeeting(false);
      }
    };
    fetchMeetingList();
  }, []);




  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 my-5 flex-col overflow-hidden">
        <h2 className="font-semibold text-xl">Meetings</h2>
        <div className=" flex justify-between items-center">
          <div className="flex sm:flex-row flex-col justify-between w-full my-5">
            <div className="sm:flex grid grid-cols-2 items-center justify-center  gap-4 border border-gray-300 rounded-md px-3 p-2 w-auto">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="all"
                  name="status"
                  checked={selectedStatus === "all"}
                  onChange={() => handleStatusChange("all")}
                />
                <label htmlFor="all" className="text-sm">
                  All
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="upcoming"
                  name="status"
                  checked={selectedStatus === "upcoming"}
                  onChange={() => handleStatusChange("upcoming")}
                />
                <label htmlFor="upcoming" className="text-sm">
                  Upcoming
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="completed"
                  name="status"
                  checked={selectedStatus === "completed"}
                  onChange={() => handleStatusChange("completed")}
                />
                <label htmlFor="completed" className="text-sm">
                  Completed
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by Title "
                className="border border-gray-400 w-96 placeholder:text-xs rounded-lg p-2"
                  value={searchMeetingText}
                  onChange={handleSearchMeeting}
              />
              <Link
                to={"/meetings/create-meeting"}
                style={{ background: themeColor }}
                className=" font-semibold text-white duration-300 ease-in-out transition-all  p-2 rounded-md  cursor-pointer text-center flex items-center px-4 gap-2 justify-center"
                // onClick={() => setShowCountry(!showCountry)}
              >
                <PiPlusCircle size={20} />
                Meeting Invite
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4  mb-5">
          <Table columns={columns} data={filteredData} isPagination={true} />
        </div>
      </div>
    </section>
  );
};

export default Meetings;
