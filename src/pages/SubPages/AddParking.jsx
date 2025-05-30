import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  getAssignedTo,
  getAvailableParkingNumber,
  getFloors,
  getParkingConfiguration,
  getParkingSlots,
  postParking,
} from "../../api";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../utils/localStorage";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const AddParking = () => {
  const navigate  = useNavigate()
  const [behalf, setBehalf] = useState("self");
  const [users, setUsers] = useState([]);
  const [floors, setFloors] = useState([]);

  const siteId = getItemInLocalStorage("SITEID");
  const userId = getItemInLocalStorage("UserId");
  const [ParkConfigData, setParkConfigData] = useState([]);
  useEffect(() => {
    const fetchPantry = async () => {
      try {
        const invResp = await getAvailableParkingNumber();
        const sortedInvData = invResp.data.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setParkConfigData(sortedInvData);
        console.log("Available parking number", invResp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPantry();
  }, []);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const fetchPantry = async () => {
      try {
        const invResp = await getParkingSlots();
        const sortedInvData = invResp.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setFilteredData(sortedInvData);
        console.log(invResp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPantry();
  }, []);
  const [formData, setFormData] = useState({
    on_behalf: "",
    booking_date: "",
    booking_start_time: "",
    booking_end_time: "",
    slot_id: "",
    parking_id: "",
    building_id: "",
    floor_id: "",
    user_id: "",
    status: "",
  });
  console.log(formData);
  const buildings = getItemInLocalStorage("Building");
  const handleChange = async (e) => {
    async function fetchFloor(floorID) {
      try {
        const build = await getFloors(floorID);
        setFloors(build.data.map((item) => ({ name: item.name, id: item.id })));
      } catch (e) {
        console.log(e);
      }
    }

    if (e.target.type === "select-one" && e.target.name === "building_id") {
      const BuildID = Number(e.target.value);
      await fetchFloor(BuildID);

      setFormData({
        ...formData,
        building_id: BuildID,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const formatTime = (hour, minute) => {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for midnight
    const formattedMinute = minute?.toString().padStart(2, "0") || "00"; // Ensure two digits for minutes
    return `${formattedHour}:${formattedMinute} ${period}`;
  };
  useEffect(() => {
    const fetchAssignedTo = async () => {
      try {
        const response = await getAssignedTo();
        const transformedUsers = response.data.map((user) => ({
          value: user.id,
          label: `${user.firstname} ${user.lastname}`,
        }));
        setUsers(transformedUsers);
        // setUsers(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };
    fetchAssignedTo();
    console.log(users);
  }, []);
  const userIdToSend = behalf === "self" ? userId : formData.user_id;
  const handleSubmit = async () => {
    const sendData = new FormData();
    sendData.append("booking_parking[booking_date]", formData.booking_date);
    sendData.append("booking_parking[user_id]", userIdToSend);
    sendData.append(
      "booking_parking[booking_start_time]",
      formData.booking_start_time
    );
    sendData.append(
      "booking_parking[booking_end_time]",
      formData.booking_end_time
    );
    sendData.append("booking_parking[slot_id]", formData.slot_id);
    sendData.append("booking_parking[parking_id]", formData.parking_id);
    sendData.append("booking_parking[status]", "Booked");

    sendData.append("booking_parking[site_id]", siteId);

    try {
      const resp = await postParking(sendData);
      navigate("/admin/parking");
      toast.success("Parking Created Successfully");
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <section className="flex ">
      <Navbar />
      <div className="flex flex-col md:items-center mb-10 p-4 w-full">
        <div
          style={{ background: "rgb(3 19 37)" }}
          className="flex justify-center bg-black mx-5 my-2 w-full p-2 rounded-md"
        >
          <h2
            className="text-xl font-semibold text-center mx-10 text-white w-full"
            style={{ background: "rgb(3 19 37)" }}
          >
            Book Parking
          </h2>
        </div>
        <div className="md:border border-gray-400 rounded-md md:mx-10 w-full p-2">
          <div className="md:grid flex flex-col grid-cols-3 items-center my-2">
            <p className="font-semibold">For :</p>
            <div className="grid grid-cols-2 items-center gap-2">
              <p
                className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                  behalf === "self" && "bg-black text-white"
                }`}
                onClick={() => setBehalf("self")}
              >
                Self
              </p>
              <p
                className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                  behalf === "others" && "bg-black text-white"
                }`}
                onClick={() => setBehalf("others")}
              >
                Others
              </p>
            </div>
          </div>
          <div className="flex md:grid  grid-cols-2 justify-between gap-4  flex-col">
            {behalf === "others" && (
              // <Select
              //   options={users}
              //   placeholder="Select User"
              //   value={formData.on_behalf}
              //   onChange={(selectedOption) =>
              //     setFormData({ ...formData, on_behalf: selectedOption })
              //   }
              //   className="w-full my-2"
              //   isMulti
              // />
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="">
                  Select User
                </label>
                <select
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select User</option>
                  {users?.map((building) => (
                    <option value={building.value} key={building.value}>
                      {building.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex flex-col">
              {/* <div className="grid grid-cols-2 items-center"> */}
              <p className="font-semibold">Select Date :</p>
              <input
                type="date"
                name="booking_date"
                id="booking_date"
                className="border p-1 px-4 border-gray-500 rounded-md"
                value={formData.booking_date}
                onChange={handleChange}
              />
            </div>
            {/* <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold">
                Select Building:
              </label>
              <select
                className="border p-1 px-4 border-gray-500 rounded-md"
                value={formData.building_id}
                onChange={handleChange}
                name="building_id"
              >
                <option value="">Select Building</option>
                {buildings?.map((building) => (
                  <option value={building.id} key={building.id}>
                    {building.name}
                  </option>
                ))}
              </select>
            </div> */}
            {/* <div className="grid grid-cols-2 items-center "> */}
            {/* <div className="flex flex-col">
              <p className="font-semibold ">Select Floor :</p>
              <select 
              className="border p-1 px-4 border-gray-500 rounded-md"
              name="floor_id"
              value={formData.floor_id}
              onChange={handleChange}
              >
                <option value="">Select Floor</option>
              {floors?.map((floor) => (
                  <option value={floor.id} key={floor.id}>
                    {floor.name}
                  </option>
                ))}
              </select>
            </div> */}
            {/* <div className="grid grid-cols-2 items-center "> */}

            {/* <div className="flex justify-center mt-5">
              <button className="p-1 px-4 border-2 border-black rounded-md font-semibold hover:bg-black hover:text-white transition-all duration-300">
                Submit
              </button>
            </div> */}
            {/* </div> */}

            {/* <div className="my-5">
            <div className="flex md:grid grid-cols-3 flex-col gap-4 justify-between my-2 md:gap-2"> */}
            {/* <div className="grid  items-center">
                <label className="font-semibold">Vehicle Type :</label>
                <select
                // value={formData.booking_date}
                // onChange={handleChange}
                className="border p-1 px-4 border-gray-500 rounded-md">
                  <option value="">Select Vehicle Type</option>
                  <option value="4 wheeler">4 Wheeler</option>
                  <option value="2 wheeler">2 Wheeler</option>
                </select>
              </div> */}
            {/* <div className="flex flex-col">
                <p className="font-semibold ">Employee Name :</p>
                <select className="border p-1 px-4 border-gray-500 rounded-md">
                  <option value="">Select Employee</option>
                  <option value="all">Employee A</option>
                  <option value="EV">Employee B</option>
                  <option value="visitor">Employee C</option>
                </select>
              </div> */}
            {/* <div>
                <div className="grid grid-cols-2 items-center ">
                  <p className="font-semibold ">Free Slot :</p>
                  <p>10</p>
                </div>
                <div className="grid grid-cols-2 items-center ">
                  <p className="font-semibold ">Paid Slot :</p>
                  <p>10</p>
                </div>
              </div>
              <div className="grid grid-cols-2 items-center ">
                <p className="font-semibold ">Available Slot :</p>
                <p>10</p>
              </div> */}

            <div className="flex flex-col">
              <p className="font-semibold ">Select Parking Slot :</p>
              <select
                className="border p-1 px-4 border-gray-500 rounded-md"
                name="slot_id"
                value={formData.slot_id}
                onChange={handleChange}
              >
                <option value="">Select Parking Slot</option>
                {filteredData?.map((building) => (
                  <option value={building.id} key={building.id}>
                    {formatTime(building.start_hr, building.start_min)} to{" "}
                    {formatTime(building.end_hr, building.end_min)}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="grid  items-center">
                <p className="font-semibold">From :</p>
                <input
                  type="time"
                  name="booking_start_time"
                  id=""
                  value={formData.booking_start_time}
                onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="grid items-center">
                <p className="font-semibold">To :</p>
                <input
                  type="time"
                  name="booking_end_time"
                  id=""
                  value={formData.booking_end_time}
                onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div> */}
            {/* <div className="flex flex-col">
              <p className="font-semibold ">Status :</p>
              <select className="border p-1 px-4 border-gray-500 rounded-md"
              name="status"
              value={formData.status}
              onChange={handleChange}
              >
                <option value="">Select </option>
                <option value="pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div> */}
            <div className="grid  items-center ">
              <label htmlFor="" className="font-semibold">
                Parking Number
              </label>
              <select
                name="parking_id"
                id=""
                value={formData.parking_id}
                onChange={handleChange}
                className="border p-1 px-4 border-gray-500 rounded-md"
              >
                <option value="">Select Parking Number</option>
                {ParkConfigData?.map((floor) => (
                  <option value={floor.id} key={floor.id}>
                    {floor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/*
          </div> */}

          <div className="flex justify-center my-2">
            <button
              onClick={handleSubmit}
              style={{ background: "rgb(3 19 37)" }}
              className="p-1 px-4 bg-black text-white hover:bg-white  rounded-md border-2 border-black font-medium transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddParking;
