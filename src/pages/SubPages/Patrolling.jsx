import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
//import Navbar from "../../../components/Navbar";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import Table from "../../components/table/Table";
import Navbar from "../../components/Navbar";
import Passes from "../Passes";
import qr from "/QR.png";
import {
  getFloors,
  getPatrollingHistory,
  getPatrollings,
  getUnits,
  postPatrolling,
} from "../../api";
import {
  convertToIST,
  dateFormat,
  formatTime,
  SendDateFormat,
} from "../../utils/dateUtils";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { getUnit } from "@mui/material/styles/cssUtils";
import toast from "react-hot-toast";
const Patrolling = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);
  const [modalVisible, setModalVisible] = useState(false);
  const [interval, setInterval] = useState("hrs");
  const hours = Array.from({ length: 24 }, (_, i) =>
    i < 10 ? `0${i}` : `${i}`
  );
  const [selectedHours, setSelectedHours] = useState([]);
  const [patrollings, setPatrollings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);
  const [patrollingAdded, setPatrollingAdded] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [PatrollingHistories, setPatrollingHistories] = useState([]);
  const [filteredHistories, setFilteredHistories] = useState([]);
  const [page, setPage] = useState("schedule");
  const [formData, setFormData] = useState({
    buildingId: "",
    floorId: "",
    unitId: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timeInterval: "",
    // specificTimes:""
  });
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchPatrolling = async () => {
      setLoading(true);
      try {
        const patrollingResp = await getPatrollings();
        const sortedData = patrollingResp.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setPatrollings(sortedData);
        setFilteredData(sortedData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchPatrollingHistory = async () => {
      setLoading(true);
      try {
        const patrollingHistoryResp = await getPatrollingHistory();
        const sortedData = patrollingHistoryResp.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setPatrollingHistories(sortedData);
        setFilteredHistories(sortedData)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatrolling();
    fetchPatrollingHistory();
  }, [patrollingAdded]);

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/passes/patrolling-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/edit-patrolling/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Building",
      selector: (row) => row.building_name,
      sortable: true,
    },
    {
      name: "Floor",
      selector: (row) => row.floor_name,
      sortable: true,
    },
    {
      name: "Unit",
      selector: (row) => row.unit_name,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.start_date,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.end_date,
      sortable: true,
    },

    {
      name: "Start Time",
      selector: (row) => convertToIST(row.start_time),
      sortable: true,
    },
    {
      name: "End Time",
      selector: (row) => convertToIST(row.end_time),
      sortable: true,
    },
    {
      name: "Created On",
      selector: (row) => SendDateFormat(row.created_at),
      sortable: true,
    },

    // {
    //   name: "Active/Inactive",
    //   selector: (row) => row.ActiveInactive,
    //   sortable: true,
    // },

    // {
    //   name: "Qr Code",
    //   selector: (row) => <img src={qr} alt="" width={30} />,
    //   sortable: true,
    // },
  ];
  const HistoryColumns = [
    {
      name: "Building",
      selector: (row) => row.building_name,
      sortable: true,
    },
    {
      name: "Floor",
      selector: (row) => row.floor_name,
      sortable: true,
    },
    {
      name: "Unit",
      selector: (row) => row.unit_name,
      sortable: true,
    },
    {
      name: "Expected Time",
      selector: (row) => formatTime(row.expected_time),
      sortable: true,
    },
    {
      name: "Actual Time",
      selector: (row) => formatTime(row.actual_time),
      sortable: true,
    },
  ];

  //custom style

  const toggleHourSelection = (hour) => {
    setSelectedHours((prevSelectedHours) =>
      prevSelectedHours.includes(hour)
        ? prevSelectedHours.filter((h) => h !== hour)
        : [...prevSelectedHours, hour]
    );
  };

  const buildings = getItemInLocalStorage("Building");

  const handleChange = async (e) => {
    const fetchFloors = async (buildId) => {
      try {
        const floorResp = await getFloors(buildId);
        setFloors(
          floorResp.data.map((floor) => ({ name: floor.name, id: floor.id }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUnits = async (floorId) => {
      try {
        const unitResp = await getUnits(floorId);
        setUnits(
          unitResp.data.map((unit) => ({ name: unit.name, id: unit.id }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (e.target.type === "select-one" && e.target.name === "buildingId") {
      const BuildingId = Number(e.target.value);
      await fetchFloors(BuildingId);
      setFormData({
        ...formData,
        buildingId: BuildingId,
      });
    } else if (e.target.type === "select-one" && e.target.name === "floorId") {
      const FloorIdNumber = Number(e.target.value);
      await fetchUnits(FloorIdNumber);
      setFormData({ ...formData, floorId: FloorIdNumber });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  console.log(formData);
  const handlePatrollingSubmit = async () => {
    if (!formData.buildingId || !formData.floorId) {
      return toast.error("Please Select Building and Floor!");
    }
    const sendData = new FormData();
    sendData.append("patrolling[building_id]", formData.buildingId);
    sendData.append("patrolling[floor_id]", formData.floorId);
    sendData.append("patrolling[unit_id]", formData.unitId);
    sendData.append("patrolling[start_date]", formData.startDate);
    sendData.append("patrolling[end_date]", formData.endDate);
    sendData.append("patrolling[start_time]", formData.startTime);
    sendData.append("patrolling[end_time]", formData.endTime);
    sendData.append("patrolling[time_intervals]", formData.timeInterval);
    selectedHours.forEach((hour) => {
      sendData.append("patrolling[specific_times][]", hour);
    });
    try {
      toast.loading("Creating Patrolling please wait!");
      const patRes = await postPatrolling(sendData);
      console.log(patRes);
      toast.dismiss();
      toast.success("Patrolling Created Successfully");
      setFormData({
        ...formData,
        buildingId: "",
        floorId: "",
        unitId: "",
        endDate: "",
        endTime: "",
        startDate: "",
        startTime: "",
        timeInterval: "",
      });
      closeModal();
      setPatrollingAdded(true);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Something went wrong!");
    } finally {
      setTimeout(() => {
        setPatrollingAdded(false);
      }, 500);
    }
  };

  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchVale = e.target.value;
    setSearchText(searchVale);
    if (searchVale.trim() === "") {
      setFilteredData(patrollings);
    } else {
      const filteredResults = patrollings.filter(
        (item) =>
          (item.building_name &&
            item.building_name
              .toLowerCase()
              .includes(searchVale.toLowerCase())) ||
          (item.unit_name &&
            item.unit_name.toLowerCase().includes(searchVale.toLowerCase())) ||
          (item.floor_name &&
            item.floor_name.toLowerCase().includes(searchVale.toLowerCase()))
      );
      setFilteredData(filteredResults);
    }
  };
  const [searchHistoryText, setSearchHistoryText] = useState("");
  const handleHistorySearch = (e) => {
    const searchVale = e.target.value;
    setSearchHistoryText(searchVale);
    if (searchVale.trim() === "") {
      setFilteredHistories(PatrollingHistories);
    } else {
      const filteredResults = PatrollingHistories.filter(
        (item) =>
          (item.building_name &&
            item.building_name
              .toLowerCase()
              .includes(searchVale.toLowerCase())) ||
          (item.unit_name &&
            item.unit_name.toLowerCase().includes(searchVale.toLowerCase())) ||
          (item.floor_name &&
            item.floor_name.toLowerCase().includes(searchVale.toLowerCase()))
      );
      setFilteredHistories(filteredResults);
    }
  };

  return (
    <section className="flex">
      <Navbar />
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <Passes />
        <div className="flex gap-4 border-b border-gray-200 ml-1 items-center">
          <h2
            className={` cursor-pointer ${
              page === "schedule" &&
              "shadow-custom-all-sides px-2 p-1 rounded-t-md text-blue-500 font-medium"
            }`}
            onClick={() => setPage("schedule")}
          >
            Schedule
          </h2>
          <h2
            className={`cursor-pointer ${
              page === "logs" &&
              "shadow-custom-all-sides px-2 p-1 rounded-t-md text-blue-500 font-medium"
            }`}
            onClick={() => setPage("logs")}
          >
            Logs
          </h2>
        </div>
        {page === "schedule" && (
          <div className="mb-5">
            <div className="flex md:flex-row flex-col gap-5 justify-between  my-2">
              <input
                type="search"
                value={searchText}
                onChange={handleSearch}
                id=""
                className="border border-gray-300 placeholder:text-sm w-full rounded-md p-2"
                placeholder="Search by building, floor, unit"
              />
              <span className="flex gap-4">
                <div
                  onClick={openModal}
                  className="border-2 font-semibold text-white hover:text-white transition-all p-2 rounded-md cursor-pointer text-center flex items-center gap-2 justify-center"
                  style={{ background: "rgb(3 19 37)" }}
                >
                  <PiPlusCircle size={20} />
                  Add
                </div>
              </span>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></span>
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
              <Table columns={columns} data={filteredData} />
            )}
          </div>
        )}
        {page === "logs" && (
          <div className="mb-5">
            <div className="flex md:flex-row flex-col gap-5 justify-between  my-2">
              <input
                type="search"
                value={searchHistoryText}
                onChange={handleHistorySearch}
                id=""
                className="border border-gray-300 placeholder:text-sm w-full rounded-md p-2"
                placeholder="Search by building, floor, unit"
              />
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></span>
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
              <Table columns={HistoryColumns} data={filteredHistories} />
            )}
          </div>
        )}
      </div>
      {modalVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white  overflow-auto max-h-[82%]  md:w-[50%] w-96  flex flex-col rounded-md gap-5 hide-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center items-center my-5 w-full ">
              <div className="border border-gray-300 rounded-lg p-4 w-full mx-4">
                <h2
                  style={{ background: "rgb(3 19 37)" }}
                  className="text-center md:text-xl font-medium p-1 bg-black rounded-full text-white"
                >
                  Add Patrolling
                </h2>

                <div className="grid grid-cols-1 gap-2 my-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col">
                      <label htmlFor="building" className="font-semibold">
                        Building :
                      </label>
                      <select
                        name="buildingId"
                        placeholder="Enter Building Name"
                        className="border p-1 rounded-md border-black"
                        onChange={handleChange}
                        value={formData.buildingId}
                      >
                        <option value="">Select Building</option>
                        {buildings.map((building) => (
                          <option value={building.id} key={building.id}>
                            {building.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* <div className="flex flex-col">
                            <label htmlFor="wing" className="font-semibold">
                              Wing :
                            </label>
                            <select
                              name="wing"
                              placeholder="Enter Wing"
                              className="border p-1 rounded-md border-black"
                            >
                              <option value="">Select Wing</option>
                              <option value="">Wing A</option>
                              <option value="">Wing B</option>
                            </select>
                          </div> */}
                    {/* <div className="grid grid-cols-2 gap-5"> */}
                    <div className="flex flex-col">
                      <label htmlFor="floor" className="font-medium">
                        Floor :
                      </label>
                      <select
                        name="floorId"
                        className="border p-1 rounded-md border-black"
                        value={formData.floorId}
                        onChange={handleChange}
                      >
                        <option value="">Select Floor</option>
                        {floors.map((floor) => (
                          <option value={floor.id} key={floor.id}>
                            {floor.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="room" className="font-medium">
                        Unit :
                      </label>
                      <select
                        name="unitId"
                        className="border p-1 rounded-md border-black"
                        value={formData.unitId}
                        onChange={handleChange}
                      >
                        <option value="">Select Unit</option>
                        {units.map((unit) => (
                          <option value={unit.id} key={unit.id}>
                            {unit.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* </div> */}
                  </div>
                  <h2 className="font-medium border-b border-black">
                    Frequency
                  </h2>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col">
                      <label htmlFor="startTime" className="font-medium">
                        Start Date :
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="border p-1 rounded-md border-black"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="endTime" className="font-medium">
                        End Date :
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        onChange={handleChange}
                        value={formData.endDate}
                        className="border p-1 rounded-md border-black"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="startTime" className="font-medium">
                        Start Time :
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="border p-1 rounded-md border-black"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="endTime" className="font-medium">
                        End Time :
                      </label>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="border p-1 rounded-md border-black"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 my-2">
                  <p
                    onClick={() => setInterval("hrs")}
                    className={`font-medium cursor-pointer transition-all border px-4 rounded-full p-1 border-gray-300 duration-300 ${
                      interval === "hrs" &&
                      "bg-black text-white  rounded-full p-1 px-2"
                    }`}
                  >
                    Time Interval(hrs)
                  </p>
                  <p
                    onClick={() => setInterval("specific")}
                    className={`font-medium cursor-pointer transition-all duration-300 border px-4 rounded-full p-1 border-gray-300  ${
                      interval === "specific" &&
                      "bg-black text-white  rounded-full p-1 "
                    }`}
                  >
                    Specific Time
                  </p>
                </div>
                {interval === "hrs" && (
                  <div>
                    <input
                      type="text"
                      name="timeInterval"
                      value={formData.timeInterval}
                      onChange={handleChange}
                      className="border p-1 rounded-md border-black my-1"
                      placeholder="Enter Interval Hour(s) "
                    />
                  </div>
                )}
                {interval === "specific" && (
                  <div className="grid grid-cols-6 gap-2 bg-gray-100 p-4 rounded">
                    {hours.map((hour) => (
                      <p
                        key={hour}
                        className={`p-2 rounded cursor-pointer ${
                          selectedHours.includes(hour)
                            ? "bg-gray-500 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                        onClick={() => toggleHourSelection(hour)}
                      >
                        {hour}
                      </p>
                    ))}
                  </div>
                )}
                <div className="flex gap-5 justify-center items-center mt-4">
                  <button
                    onClick={handlePatrollingSubmit}
                    className="text-white bg-black hover:bg-white hover:text-black border-2 border-black font-semibold py-1 px-4 rounded transition-all duration-300"
                  >
                    Submit
                  </button>
                  <button
                    type="submit"
                    onClick={closeModal}
                    className=" bg-red-400 font-semibold text-white py-1 px-4 rounded transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Patrolling;
