import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { IoAddCircleOutline } from "react-icons/io5";
import { ImEye } from "react-icons/im";
import { Link } from "react-router-dom";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { getEvents } from "../../api";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";
import Communication from "../Communication";
import Navbar from "../../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { DNA } from "react-loader-spinner";

const Events = () => {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState(false);
  const [user, setUser] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const themeColor = "rgb(3, 19, 37)";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userType = getItemInLocalStorage("USERTYPE");
    setUser(userType);
    const fetchEvents = async () => {
      const eventsResponse = await getEvents();
      const sortedEvents = eventsResponse.data.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      console.log(eventsResponse);
      setEvents(sortedEvents);
      setFilteredData(sortedEvents);
      setLoading(false);
    };
    fetchEvents();
  }, []);
  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const column = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/communication/event/event-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/communication/event/edit-events/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
      sortable: true,
    },
    { name: "Title", selector: (row) => row.event_name, sortable: true },
    { name: "Venue", selector: (row) => row.venue, sortable: true },
    // {
    //   name: "Description",
    //   selector: (row) => row.discription,
    //   sortable: true,
    // },
    { name: "Created By", selector: (row) => row.created_by, sortable: true },
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
    // {
    //   name: "Event Type",
    //   selector: (row) => row.scheduledOn,
    //   sortable: true,
    // },
    {
      name: "Status",
      selector: (row) => (row.status ? row.status.toUpperCase() : "N/A"),
      sortable: true,
    },
    {
      name: "Expired",
      selector: (row) => {
        const now = new Date();
        const endDate = new Date(row.end_date_time);
        return endDate < now
          ? dateFormat(row.end_date_time)
          : "Not expired yet";
      },
      sortable: true,
    },
    {
      name: "Created On",
      selector: (row) => dateFormat(row.created_at),
      sortable: true,
    },
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
        <Communication />
        {/* <div className="flex justify-between gap-2 items-center my-2 sm:flex-row flex-col "> */}
        <div className="grid grid-cols-12 my-2 gap-2">
          <input
            type="text"
            placeholder="Search by title"
            className="border p-2 border-gray-300 rounded-lg col-span-11"
            value={searchText}
            onChange={handleSearch}
          />
          <div className="flex gap-2">
            {/* {user === "pms_admin" && ( */}
            <Link
              style={{ background: themeColor }}
              to={"/communication/create-event"}
              className="w-full  rounded-md flex font-semibold justify-center  items-center gap-2 text-white p-2 col-span-1"
            >
              <IoAddCircleOutline size={20} />
              Add
            </Link>
            {/* )} */}
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center mt-10 h-60">
            <DNA
              visible={true}
              height={120}
              width={130}
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        ) : (
          <Table columns={column} data={filteredData} isPagination={true} />
        )}
      </div>
    </div>
  );
};

export default Events;
