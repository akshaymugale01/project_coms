import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import Table from "../components/table/Table";
import ToggleSwitch from "../Buttons/ToggleSwitch";
import Pantry from "./Pantry";
import { downloadRestaurtantData, getFB } from "../api";
import toast from "react-hot-toast";

const FoodsBeverage = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);
  const [page, setPage] = useState("F&B");
  const [fb, setFb] = useState([]);
  const [filterFb, setFilterFb] = useState([]);
  useEffect(() => {
    const fetchFB = async () => {
      try {
        const fbRes = await getFB();
        console.log(fbRes);
        setFb(fbRes.data);
        setFilterFb(fbRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFB();
  }, []);
  const handleRestaurtantDownload = async () => {
    toast.loading("Downloading Please Wait");
    try {
      const response = await downloadRestaurtantData();
      // Check if the response headers contain the correct content type
      console.log(response.headers["content-type"]);
      // Create a URL for the blob data
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers["content-type"], // Explicitly set the content type
        })
      );
      // Create a link element to download the file
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Restaurtants_Data.xlsx"); // Name the file
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Restaurtants Data downloaded successfully");
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      console.error("Error downloading Asset:", error);
      toast.error("Something went wrong, please try again");
    }
  };
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilterFb(fb);
    } else {
      const filteredResult = fb.filter((items) =>
        items.restaurant_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterFb(filteredResult);
    }
  };

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/restaurant/details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/fb-edit/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.restaurant_name,
      sortable: true,
    },

    {
      name: "Open Days",
      selector: (row) => {
        // Define the days of the week in order
        const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    
        // Filter days where the value is 1 and capitalize the first letter
        const openDays = daysOfWeek
          .filter((day) => row[day] === 1) // Only keep days with value 1
          .map((day) => day.charAt(0).toUpperCase() + day.slice(1)) // Capitalize first letter
          .join(", "); // Join them into a single string
    
        return openDays;
      },
      sortable: true,
    },
    

    {
      name: "Booking Allowed",
      cell: (row) => (
        <div className="flex items-center gap-4">
        <input
        type="checkbox"
        checked={row.booking_allowed}
       />
      </div>
      ),
      sortable: true,
    },

    {
      name: "Order Allowed",
      cell: (row) => (
        <div className="flex items-center gap-4">
         <input
        type="checkbox"
        checked={row.order_allowed}
        />
      </div>
      ),
      sortable: true,
    },
    {
      name: "Active",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <input type="checkbox"  checked={row.status} />
        </div>
      ),
      sortable: true,
    },

    // {
    //   name: "Cancellation",
    //   selector: (row) =>
    //     row.status === "Upcoming" && (
    //       <button className="text-red-400 font-medium">Cancel</button>
    //     ),
    //   sortable: true,
    // },
    // {
    //   name: "Approval",
    //   selector: (row) =>(
       
    //       <div className="flex justify-center gap-2">
    //         <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full">
    //           <TiTick size={20} />
    //         </button>
    //         <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full">
    //           <IoClose size={20} />
    //         </button>
    //       </div>
    //   ),
    //   sortable: true,
    // },
  ];
  const handleToggle = (id, field, value) => {
    // Find the row by ID and update all days in the schedule
    const row = data.find((item) => item.id === id);
    if (row && row.restaurant_schedule) {
      Object.keys(row.restaurant_schedule).forEach((day) => {
        row.restaurant_schedule[day][field] = value;
      });
    }
    console.log(`Updated ${field} for row ID ${id} to ${value}`);
  };
  
 
  const data = [
    {
      id: 1,
      name: "Haven Cafe",
      Open_Days: "M T W T F S S",
      Booking_Allowed: <ToggleSwitch />,
      Order_allow: <ToggleSwitch />,
      active: <ToggleSwitch />,
    },
    {
      id: 2,
      name: "Haven Cafe",
      Open_Days: "M T W T F S S",
      Booking_Allowed: <ToggleSwitch />,
      Order_allow: <ToggleSwitch />,
      active: <ToggleSwitch />,
    },
    {
      id: 3,
      name: "Haven Cafe",
      Open_Days: "M T W T F S S",
      Booking_Allowed: <ToggleSwitch />,
      Order_allow: <ToggleSwitch />,
      active: <ToggleSwitch />,
    },
  ];

  return (
    <section className="flex">
      <Navbar />
      <div className=" w-full flex mx-3 flex-col overflow-hidden my-5">
        <div className="flex justify-center my-2 w-full">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-1 sm:rounded-full rounded-md bg-gray-200">
            <h2
              className={`p-1 ${
                page === "F&B" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              onClick={() => setPage("F&B")}
            >
              F&B
            </h2>
            <h2
              className={`p-1 ${
                page === "pantry" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer transition-all duration-300 ease-linear`}
              onClick={() => setPage("pantry")}
            >
              Pantry
            </h2>
          </div>
        </div>
        {page === "F&B" && (
          <>
            <div className="flex md:flex-row flex-col gap-5 justify-end mt-5 my-2">
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
              
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-black w-full border-gray-400 placeholder:text-xs rounded-lg"
                  value={searchText}
                  onChange={handleSearch}
                />
                <Link
                  to={"/admin/add-fb"}
                  className="border-2 my-1 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
                  style={{ height: "1.2cm" }}
                >
                  <PiPlusCircle size={20} />
                  Add
                </Link>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  
                  onClick={handleRestaurtantDownload}
                >
                  Export
                </button>
              
            </div>
            <div className="mb-3">
              <Table
                responsive
                //   selectableRows
                columns={columns}
                data={filterFb}
                isPagination={true}
              />
            </div>
          </>
        )}
        {page === "pantry" && <Pantry />}
      </div>
    </section>
  );
};

export default FoodsBeverage;
