import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editPatrollingDetails, getFloors, getPatrollingDetails, getUnits } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import Navbar from "../../components/Navbar";
import { formatTime } from "../../utils/dateUtils";
import toast from "react-hot-toast";

const EditPatrolling = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const hours = Array.from({ length: 24 }, (_, i) =>
    i < 10 ? `0${i}` : `${i}`
);
const [selectedHours, setSelectedHours] = useState([]);
const [interval, setInterval] = useState("hrs");
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);

  const [formData, setFormData] = useState({
    buildingId: "",
    floorId: "",
    unitId: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timeInterval: "",
  });

  console.log(formData)

  const toggleHourSelection = (hour) => {
    setSelectedHours((prevSelectedHours) =>
      prevSelectedHours.includes(hour)
        ? prevSelectedHours.filter((h) => h !== hour)
        : [...prevSelectedHours, hour]
    );
  };
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getPatrollingDetails(id);
        const details = res.data;
        console.log(details)
        setFormData({
          ...formData,
          buildingId: details.building_id,
          floorId: details.floor_id,
          unitId: details.unit_id,
          endDate: details.end_date,
          endTime: formatTime(details.end_time),
          startDate: details.start_date,
          startTime: formatTime(details.start_time),
          timeInterval: details.time_intervals,
        });
        setSelectedHours(details.specific_times || []);
        fetchFloors(details.building_id)
        fetchUnits(details.floor_id)
        
      } catch (error) {
        console.log(error);
      }
    };
    
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

    
    fetchDetails();
  }, [id]);
  const buildings =getItemInLocalStorage("Building")

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
const navigate = useNavigate()
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
    selectedHours.forEach(hour => {
      sendData.append("patrolling[specific_times][]", hour);
    });
    try {
      toast.loading("Editing Patrolling please wait!");
      const patRes = await editPatrollingDetails(id, sendData);
      console.log(patRes);
      toast.dismiss();
      toast.success("Patrolling Edited Successfully");
     
      
     navigate(`/admin/passes/patrolling-details/${patRes.data.id}`)
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Something went wrong!");
    }
    
  };

  useEffect(() => {
    if (selectedHours.length === 0) {
      setInterval("hrs");
    } else {
      setInterval("specific");
    }
  }, [selectedHours]);
  return (
    <section className="flex">
      <Navbar />
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
    <div className="flex justify-center items-center my-5 w-full ">
      <div className="border border-gray-300 rounded-lg p-4 w-full mx-4">
        <h2
          style={{ background: themeColor }}
          className="text-center md:text-xl font-medium p-1 bg-black rounded-full text-white"
        >
          Edit Patrolling
        </h2>

        <div className="grid grid-cols-1 gap-2 my-3">
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col">
              <label htmlFor="building" className="font-semibold">
                Building :
              </label>
              <select
                name="buildingId"
                placeholder="Enter Building Name"
                className="border p-1 rounded-md border-black"
                value={formData.buildingId}
                onChange={handleChange}
                
              >
                <option value="">Select Building</option>
                {buildings.map((build)=>(
                  <option value={build.id} key={build.id}>{build.name}</option>
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
                onChange={handleChange}
                value={formData.floorId}
              >
                <option value="">Select Floor</option>
               {floors.map((floor)=>(
                <option value={floor.id} key={floor.id}>{floor.name}</option>
               ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="room" className="font-medium">
                Units :
              </label>
              <select
                name="unitId"
                className="border p-1 rounded-md border-black"
                value={formData.unitId}
                onChange={handleChange}

              >
                <option value="">Select Unit</option>
                {units.map((unit)=>(
                  <option value={unit.id} key={unit.id}>{unit.name}</option>
                ))}
              </select>
            </div>
            {/* </div> */}
          </div>
          <h2 className="font-medium border-b border-black">Frequency</h2>
          <div className="grid grid-cols-4 gap-5">
            <div className="flex flex-col">
              <label htmlFor="startTime" className="font-medium">
                Start Date :
              </label>
              <input
                type="date"
                name="startDate"
                className="border p-1 rounded-md border-black"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="endTime" className="font-medium">
                End Date :
              </label>
              <input
                type="date"
                name="endDate"
                className="border p-1 rounded-md border-black"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="startTime" className="font-medium">
                Start Time :
              </label>
              <input
                type="time"
                name="startTime"
                className="border p-1 rounded-md border-black"
                value={formData.startTime}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="endTime" className="font-medium">
                End Time :
              </label>
              <input
                type="time"
                name="endTime"
                className="border p-1 rounded-md border-black"
                onChange={handleChange}
                value={formData.endTime}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 my-2">
            <p
              onClick={() => setInterval("hrs")}
              className={`font-medium cursor-pointer transition-all duration-300 ${
                interval === "hrs" &&
                "bg-black text-white shadow-custom-all-sides rounded-full p-1 px-2"
              }`}
            >
              Time Interval(hrs)
            </p>
            <p
              onClick={() => setInterval("specific")}
              className={`font-medium cursor-pointer transition-all duration-300 ${
                interval === "specific" &&
                "bg-black text-white shadow-custom-all-sides rounded-full p-1 px-2"
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
                className="border p-1 rounded-md border-black my-1"
                placeholder="Enter Interval Hour(s) "
                value={formData.timeInterval}
                onChange={handleChange}
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
        </div>

        <div className="flex gap-5 justify-center items-center mt-4">
          <button
            type="submit"
            onClick={handlePatrollingSubmit}
            className="text-white bg-black hover:bg-white hover:text-black border-2 border-black font-semibold py-1 px-4 rounded transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    </div>
    </section>
  );
};

export default EditPatrolling;
