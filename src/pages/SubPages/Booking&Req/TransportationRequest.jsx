import React, { useState ,useEffect} from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import Table from "../../../components/table/Table";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";
import Navbar from "../../../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoAddCircleOutline, IoClose } from "react-icons/io5";
import { gettransportRequest } from "../../../api";
import BookingRequestNav from "./BookingRequestnav";

const TransportationRequest = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [TransportrequestsData, setTransportrequestsData] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  useEffect(() => {
    const fetchTransportRequest = async () => {
      try {
        const response = await gettransportRequest();
        const transportreqresp = response.data
          .map((request) => {
            let date = "";
            let time = "";
  
            if (request.date_and_time) {
              const dateTime = new Date(request.date_and_time);
              date = dateTime.toISOString().split('T')[0]; // Extract the date
              time = dateTime.toTimeString().split(' ')[0]; // Extract the time
            }
  
            return {
              ...request,
              date,
              time,
            };
          })
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
        console.log("response from api", transportreqresp);
  
        setTransportrequestsData(transportreqresp);
      } catch (err) {
        console.error("Failed to fetch Transport request data:", err);
      }
    };
  
    fetchTransportRequest();
  }, []);
  
  const CustomNavLink = ({ to, children }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `p-1 rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
            isActive ? 'bg-white text-blue-500 shadow-custom-all-sides' : 'hover:text-blue-400'
          }`
        }
      >
        {children}
      </NavLink>
    );
  };

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/transport-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/transport-edit/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Employee ID",
      selector: (row) => row.employee_id,
      sortable: true,
    },
    {
      name: "Employee Name",
      selector: (row) => row.employee_name,
      sortable: true,
    },
    {
      name: "Destination",
      selector: (row) => row.pickup_location,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: "Driver Information",
      selector: (row) => row.driver_contact_information,
      sortable: true,
    },
   
   
    {
      name: "Special Requirements",
      selector: (row) => row.special_requirements,
      sortable: true,
    },
    {
      name: "Vehicle Details",
      selector: (row) => row.vehicle_details,
      sortable: true,
    },
    {
      name: "Manager Approval",
      selector: (row) => row.manager_approval ? "Approved" : "Not Approved",
      sortable: true,
    },
    {
      name: "Booking Status",
      selector: (row) => row.booking_status,
      sortable: true,
    },
    {
      name: "Confirmation Email",
      selector: (row) => row.booking_confirmation_email,
      sortable: true,
    },
    {
      name: "Approval",
      selector: (row) =>
        (
          <div className="flex justify-center gap-2">
            <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full">
              <TiTick size={20} />
            </button>
            <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full">
              <IoClose size={20} />
            </button>
          </div>
        ),
      sortable: true,
    },
  ];

  
 

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    // Handle status change logic here if needed
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <BookingRequestNav/>
        <div className="w-full flex md:flex-row flex-col gap-5 justify-between mt-10 my-2">
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
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="cancelled"
                name="status"
                checked={selectedStatus === "cancelled"}
                onChange={() => handleStatusChange("cancelled")}
              />
              <label htmlFor="cancelled" className="text-sm">
                Cancelled
              </label>
            </div>
          </div>
          <span className="flex gap-4">
            <Link
              to={"/admin/add-transport-request"}
              style={{ background: themeColor }}
              className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center"  
            >
              <IoAddCircleOutline size={20} />
              Add
            </Link>
            {/* Additional buttons can be added here */}
          </span>
        </div>
        <div className="w-full overflow-x-auto">
          <Table
            responsive
            columns={columns}
            data={TransportrequestsData}
            // customStyles={customStyle}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
          />
        </div>
      </div>
    </section>
  );
};

export default TransportationRequest;