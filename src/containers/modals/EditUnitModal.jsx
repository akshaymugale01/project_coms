import React, { useEffect, useState } from "react";
import {
  editFloorDetails,
  editUnitDetails,
  getAllFloors,
  getBuildings,
  getFloorDetails,
  getUnitDetails,
} from "../../api";
import { unitConfigurationService } from "../../pages/OSR/additionalServices";
import { BiEdit } from "react-icons/bi";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const EditUnitModal = ({ onclose, id }) => {
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [unit, setUnit] = useState("");
  const [unitConfiguration, setUnitConfiguration] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [unitConfigurations, setUnitConfigurations] = useState([]);
  
console.log(building)
console.log(floor)
console.log(unit)
  useEffect(() => {
    const fetchUnitDetails = async () => {
      try {
        const unitResp = await getUnitDetails(id);
        console.log(unitResp);
        setBuilding(unitResp.data.building_id);
        setFloor(unitResp.data.floor_id);
        setUnit(unitResp.data.name);
        setUnitConfiguration(unitResp.data.unit_configuration_id || "");
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchAllFloors = async () => {
      try {
        const floorsResp = await getAllFloors();
        setFloors(floorsResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchBuilding = async () => {
      try {
        const buildingResp = await getBuildings();
        console.log(buildingResp);
        setBuildings(buildingResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchUnitConfigurations = async () => {
      try {
        const configResp = await unitConfigurationService.getAll();
        console.log("Unit configurations:", configResp);
        setUnitConfigurations(Array.isArray(configResp.data) ? configResp.data : []);
      } catch (error) {
        console.log("Error loading unit configurations:", error);
        setUnitConfigurations([]);
      }
    };
    
    fetchUnitDetails();
    fetchBuilding();
    fetchAllFloors();
    fetchUnitConfigurations();
  }, [id]);
  const siteId = getItemInLocalStorage("SITEID");
  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (building === "" || floor === "" || unit === "" || unitConfiguration === "") {
      return toast.error("Please fill in all required fields including unit configuration");
    }
    
    const formData = new FormData()
    formData.append("unit[site_id]", siteId)
    formData.append("unit[building_id]", building)
    formData.append("unit[floor_id]", floor)
    formData.append("unit[name]", unit)
    formData.append("unit[unit_configuration_id]", unitConfiguration)
    
    try {
      editUnitDetails(id, formData)
      toast.success("Unit edited successfully")
      window.location.reload()
    } catch (error) {
      console.log(error)
      toast.error("Failed to update unit")
    }
  };

  
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-20">
      <div className="bg-white overflow-auto max-h-[70%]  md:w-auto w-96 p-4 px-8 flex flex-col rounded-md gap-5">
        <h2 className="font-medium flex items-center gap-2 justify-center">
          <BiEdit /> Edit Unit{" "}
        </h2>
        <div className="flex gap-3 flex-col">
          <div className="grid md:grid-cols-2 gap-3">
            <select
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              className="border border-gray-500 rounded-md p-2"
            >
              <option value="">Select Building</option>
              {buildings.map((build) => (
                <option value={build.id} key={build.id}>
                  {build.name}
                </option>
              ))}
            </select>
            
            <select
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="border border-gray-500 rounded-md p-2"
            >
              <option value="">Select Floor</option>
              {floors.map((floor) => (
                <option value={floor.id} key={floor.id}>
                  {floor.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Enter Unit"
              className="border border-gray-500 rounded-md p-2"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
            
            <select
              value={unitConfiguration}
              onChange={(e) => setUnitConfiguration(e.target.value)}
              className="border border-gray-500 rounded-md p-2"
              required
            >
              <option value="">Select Unit Configuration</option>
              {unitConfigurations.map((config) => (
                <option value={config.id} key={config.id}>
                  {config.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end w-full gap-4">
            <button
              onClick={handleEditSubmit}
              className="bg-blue-500 text-white p-1 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              onClick={onclose}
              className="bg-red-500 text-white p-1 px-4 rounded-md "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUnitModal;
