import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { IoAddCircleOutline } from "react-icons/io5";
import { ImEye } from "react-icons/im";
import { Link } from "react-router-dom";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import Table from "../../../components/table/Table";
import { getEvents } from "../../../api";
import { BsEye } from "react-icons/bs";
import EmployeeCommunication from "./EmployeeCommunication";
import Navbar from "../../../components/Navbar";

const EmployeeEvents = () => {
  const [searchText, setSearchText] = useState("");
  
  const [filter, setFilter] = useState(false);
  const [user, setUser] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const userType = getItemInLocalStorage("USERTYPE");
    setUser(userType);
    const fetchEvents = async () => {
      const eventsResponse = await getEvents();
      console.log(eventsResponse);
      setEvents(eventsResponse.data);
      setFilteredData(eventsResponse.data);
    };
    fetchEvents();
  }, []);
  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const userName = getItemInLocalStorage("name");

  const column = [
    {
      name: "Action",
      cell: (row) => (
        <Link to={`/communication/event/event-details/${row.id}`}>
          <BsEye size={15} />
        </Link>
      ),
      sortable: true,
    },
    { name: "Title", selector: (row) => row.event_name, sortable: true },
    {
      name: "Venue",
      selector: (row) => row.venue,
      sortable: true,
    },
    { name: "Created By", selector: (row) => row.userName, sortable: true },
    { name: "Description", selector: (row) => row.discription, sortable: true },
    {
      name: "Start Date",
      selector: (row) => dateFormat(row.start_date_time),
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => dateFormat(row.end_date_time),
      sortable: true,
    },
    {
      name: "Event Type",
      selector: (row) => row.scheduledOn,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.scheduledTime,
      sortable: true,
    },
    {
      name: "Expired",
      selector: (row) => row.bookingStatus,
      sortable: true,
    },
    {
      name: "Created On",
      selector: (row) => dateFormat(row.created_at),
      sortable: true,
    },
    // {
    //   name: "Attachments",
    //   selector: (row) => row.bookingStatus,
    //   sortable: true,
    // },
  ];

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    const filteredResults = events.filter((item) =>
      item.event_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  return (
    <div className="flex ">
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <EmployeeCommunication />

        <div className="flex justify-between gap-2 items-center my-2 sm:flex-row flex-col w-full">
          <input
            type="text"
            placeholder="Search by title"
            className="border p-2 w-full border-gray-300 rounded-lg"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <Table columns={column} data={filteredData} />
      </div>
    </div>
  );
};

export default EmployeeEvents;
