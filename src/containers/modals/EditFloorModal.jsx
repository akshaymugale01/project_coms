import React, { useEffect, useState } from "react";
import { editFloorDetails, getBuildings, getFloorDetails } from "../../api";
import { BiEdit } from "react-icons/bi";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const EditFloorModal = ({ onclose, id }) => {
  const [wing, setWing] = useState("");
  const [building, setBuilding] = useState("");
  const [area, setArea] = useState("");
  const [floors, setFloors] = useState([]);
  const [floor, setFloor] = useState([]);

  const [showFields, setShowFields] = useState(false);

  const [buildings, setBuildings] = useState([]);


  useEffect(() => {
    const fetchFloorDetails = async () => {
      const floorResp = await getFloorDetails(id);
      console.log(floorResp);
      setBuilding(floorResp.data.building_id)
      setFloor(floorResp.data.name)
    };
    const fetchBuilding = async () => {
        const buildingResp = await getBuildings();
        
        setBuildings(buildingResp.data);
      };
      fetchBuilding();
    fetchFloorDetails();
  }, []);
  const siteId = getItemInLocalStorage("SITEID");
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!building || !floor) {
      return;
    }
    const formData = new FormData();
    formData.append("floor[name]", floor);
    formData.append("floor[site_id]", siteId);
    formData.append("floor[building_id]", building);
    try {
      const resp = await editFloorDetails(id,formData);
      toast.success("Floor edited successfully");
      onclose()
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-20">
      <div className="bg-white overflow-auto max-h-[70%]  md:w-auto w-96 p-4 px-8 flex flex-col rounded-md gap-5">
        <h2 className="font-medium flex items-center gap-2 justify-center"><BiEdit/> Edit Floor </h2>
        <div className="flex gap-3 flex-col">
        <div className="grid md:grid-cols-2 gap-3">
          <select
            name="building"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            id=""
            className="border border-gray-500 rounded-md p-2 "
          >
            <option value="">Select Building</option>
            {buildings.map((build) => (
              <option value={build.id} key={build.id}>
                {build.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Enter Floor"
            className="border border-gray-500 rounded-md  p-2"
            value={floor}
            onChange={(e)=>setFloor(e.target.value)}
          />
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

export default EditFloorModal;
