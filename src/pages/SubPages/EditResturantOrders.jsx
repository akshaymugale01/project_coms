import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
//import Navbar from "../../../components/Navbar";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import Table from "../../components/table/Table";
import FBDetails from "./details/FBDetails";
import { getRestaurtantOrderBookings } from "../../api";

const EditRestaurtantOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state)=> state.theme.color)
  const [orderplace,setorderplace]=useState([]);
  const {id} = useParams();

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/res-order-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Order ID",
      selector: (row) => row.id,
      sortable: true,
    },

      {
        name: "Restaurant Name",
        selector: (row) => row.restaurant_name,
        sortable: true,
      },

      {
        name: "Order Date",
        selector: (row) => row.ondate,
        sortable: true,
      },
      {
        name: "Order Time",
        selector: (row) => new Date(row.ontime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sortable: true,
      },
      {
        name: "Created On",
        selector: (row) => {
          const date = new Date(row.created_at);
          const formattedDate = date.toISOString().split("T")[0]; // Extracts "YYYY-MM-DD"
          const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Extracts "HH:mm"
          return `${formattedDate} ${formattedTime}`; // Combines date and time
        },
        sortable: true,
      },
      {
        name: "Created by",
        selector: (row) => row.created_by,
        sortable: true,
      },

      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
      },
      {
        name: "Amount Paid",
        selector: (row) => row.total_amount,
        sortable: true,
      },
      {
        name: "No.of Items",
        selector: (row) => row.order_items?.length,
        sortable: true,
      },
      {
        name: "Payment Status",
        selector: (row) => row.payment_status,
        sortable: true,
      },
      {
        name: "Additional Request",
        selector: (row) => row.Additional_Request,
        sortable: true,
      },


   
  ];

  // useEffect(() => {
  //   const fetchCategory = async () => {
  //     try {
  //       const siteDetailsResp = await getRestaurtantOrderBookings();
        
  //       setorderplace(siteDetailsResp.data);
        
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchCategory();
  // }, []);
  useEffect(() => {
    const fetchTableBookings = async () => {
      try {
        const tablebookResp = await getRestaurtantOrderBookings(); // Fetch all table bookings

        // Filter bookings for the specific restaurant ID
        const filteredBookings = tablebookResp.data.filter(
          (booking) => booking.restaurant_id.toString() === id
        );

        setorderplace(filteredBookings); // Update state with filtered data
      } catch (error) {
        console.error("Error fetching table bookings:", error);
      }
    };

    fetchTableBookings();
  }, [id]);
  const data = [
    {
        id: 1,
        Vehicle_Number: '789',
        Name:"mp",
        Booked_on:"23/4/2024",
        Schedule_on:"23/4/2024",
        Guest:4,
        Status:"pending",
        Additional_Request:"",


    },




  ];

  return (
    <section className="flex">
<FBDetails/>
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex md:flex-row flex-col gap-5 justify-end mt-10 my-2">
          {/* <div className="sm:flex grid grid-cols-2 items-center justify-center  gap-4 border border-gray-300 rounded-md px-3 p-2 w-auto">
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
                // checked={selectedStatus === "open"}
                checked={
                  selectedStatus === "upcoming" ||
                  selectedStatus === "upcoming"
                }
                // onChange={() => handleStatusChange("open")}
              />
              <label htmlFor="open" className="text-sm">
                upcoming
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
                //   onChange={() => handleStatusChange("cancelled")}
              />
              <label htmlFor="completed" className="text-sm">
                Cancelled
              </label>
            </div>
          </div> */}
          <span className="flex gap-4">
            {/* <Link
                to={"/employee/addrvehicles"}
                className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ height: '1cm' }}
            >
                <PiPlusCircle size={20} />
                Add
            </Link>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                Import
            </button>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                Filter
            </button>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                History
            </button>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                All
            </button>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                In
            </button>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                Out
            </button> */}
        </span>
        </div>
        <Table

          columns={columns}
          data={orderplace}

         

        />
      </div>
    </section>
  );
};

export default EditRestaurtantOrders