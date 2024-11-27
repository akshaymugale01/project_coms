import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import { BsEye } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { API_URL, getPPMTask, getRoutineTask, getVibeBackground } from "../../api"
import toast from "react-hot-toast";

import Navbar from "../../components/Navbar";
import AssetNav from "../../components/navbars/AssetNav";
import { getItemInLocalStorage } from "../../utils/localStorage";

const PPMTask = () => {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  useEffect(() => {
    const fetchPPMTask = async () => {
      try {
        const taskResponse = await getPPMTask();
        // const filteredServiceTask = taskResponse.data.activities.filter(
        //   (asset) => asset.asset_name
        // );
        const filteredServiceTask = taskResponse.data.activities
        .filter((asset) => asset.asset_name) 
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        console.log(filteredServiceTask);
        setTasks(filteredServiceTask);
        setFilteredData(filteredServiceTask);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPPMTask();
    console.log(tasks);
  }, []);

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short", // or 'long' for full month names
      year: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   // second: '2-digit'
    //   hour12: true,
    });
  };
  const RoutineColumns = [
    {
      name: "View",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/assets/routine-task-details/${row.asset_id}/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    { name: "Asset Name", selector: (row) => row.asset_name, sortable: true },
    {
      name: "Checklist",
      selector: (row) => row.checklist_name,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => dateFormat(row.start_time),
      sortable: true,
    },
    // { name: "End Time", selector: (row) => row.end_time, sortable: true },

    { name: "Status", selector: (row) => row.status, sortable: true },
    {
      name: "Assigned To",
      selector: (row) => row.assigned_to_name,
      sortable: true,
    },
  ];

  const defaultImage = { index: 0, src: "" };
  let selectedImageSrc = defaultImage.src;
  let selectedImageIndex = defaultImage.index;
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const Get_Background = async () => {
    try {
      // const params = {
      //   user_id: user_id,
      // };
      const user_id = getItemInLocalStorage("VIBEUSERID");
      console.log(user_id);
      const data = await getVibeBackground(user_id);

      if (data.success) {
        console.log("sucess");

        console.log(data.data);
        selectedImageSrc = API_URL + data.data.image;

        selectedImageIndex = data.data.index;

        // Now, you can use selectedImageSrc and selectedImageIndex as needed
        console.log("Received response:", data);

        // For example, update state or perform any other actions
        setSelectedImage(selectedImageSrc);
        setSelectedIndex(selectedImageIndex);
        console.log("Received selectedImageSrc:", selectedImageSrc);
        console.log("Received selectedImageIndex:", selectedImageIndex);
        console.log(selectedImage);
        // dispatch(setBackground(selectedImageSrc));
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // Call the function to get the background image when the component mounts
    Get_Background();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    if (searchValue.trim() === "") {
      setFilteredData(tasks);
    } else {
      const filteredResults = tasks.filter(
        (item) =>
          (item.asset_name &&
            item.asset_name
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (item.checklist_name &&
            item.checklist_name
              .toLowerCase()
              .includes(searchValue.toLowerCase()))
      );
      setFilteredData(filteredResults);
    }
  };
  useEffect(() => {
    filterData(); // Filter data whenever tasks, searchText, or selectedStatus change
  }, [tasks, searchText, selectedStatus]);
  const filterData = () => {
    let filteredResults = tasks;


    // Apply status filter if it's not "all"
    if (selectedStatus !== "all") {
      filteredResults = filteredResults.filter(
        (item) => item.status.toLowerCase() === selectedStatus
      );
    }

    setFilteredData(filteredResults);
  };
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  return (
    <section
      className="flex"
      style={{
        background: `url(${selectedImage})no-repeat center center / cover`,
      }}
    >
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <AssetNav />
        <div className="flex md:flex-row flex-col justify-between items-center my-2 gap-2  ">
        <div className="md:flex justify-between grid grid-cols-2 items-center  gap-2 border border-gray-300 rounded-md px-3 p-2 w-auto">
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
                id="pending"
                name="status"
                checked={selectedStatus === "pending"}
                onChange={() => handleStatusChange("pending")}
              />
              <label htmlFor="pending" className="text-sm">
                Pending
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="completed"
                name="status"
                checked={selectedStatus === "complete"}
                onChange={() => handleStatusChange("complete")}
              />
              <label htmlFor="completed" className="text-sm">
                Completed
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="overdue"
                name="status"
                checked={selectedStatus === "overdue"}
                onChange={() => handleStatusChange("overdue")}
              />
              <label htmlFor="completed" className="text-sm">
                Overdue
              </label>
            </div>
          </div>
          <div  className="flex lg:flex-row flex-col gap-2">
          <input
            type="text"
            placeholder="Search By Asset name or Checklist name"
            className="border-2 p-2 md:w-96 border-gray-300 rounded-lg placeholder:text-sm"
            value={searchText}
            onChange={handleSearch}
          />
          </div>
         
        </div>
        <Table
          columns={RoutineColumns}
          data={filteredData}
          isPagination={true}
        />
      </div>
    </section>
  );
};




export default PPMTask
