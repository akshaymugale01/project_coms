import React, { useEffect, useState } from "react";
import Account from "./Account";
import { PiPlusCircle } from "react-icons/pi";
import Table from "../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { getAllFloors, getBuildings, postNewFloor } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import EditFloorModal from "../../containers/modals/EditFloorModal";
import Navbar from "../../components/Navbar";

const Floor = () => {
  const [building, setBuilding] = useState("");
  const [floors, setFloors] = useState([]);
  const [floor, setFloor] = useState("");
  const [floorAdded, setFloorAdded] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchAllFloors = async () => {
      try {
        setLoading(true);
        const floorsResp = await getAllFloors();

        const sortedFloor = floorsResp.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setFloors(sortedFloor);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load floors");
      } finally {
        setLoading(false);
      }
    };
    const fetchBuilding = async () => {
      try {
        const buildingResp = await getBuildings();
        console.log(buildingResp);
        setBuildings(buildingResp.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load buildings");
      }
    };
    fetchBuilding();
    fetchAllFloors();
  }, [floorAdded]);
  const handleEditClick = (id) => {
    setEditModal(true);
    setId(id);
  };
  const floorColumns = [
    {
      name: "Site",
      selector: (row) => row.site_name,
      sortable: true,
    },
    {
      name: "Building ",
      selector: (row) => row.building_name,
      sortable: true,
    },
    {
      name: "Floors ",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditClick(row.id)}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
  ];
  const siteId = getItemInLocalStorage("SITEID");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!building || !floor) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setSubmitting(true);
    const formData = new FormData();
    formData.append("floor[name]", floor);
    formData.append("floor[site_id]", siteId);
    formData.append("floor[building_id]", building);
    
    try {
      await postNewFloor(formData);
      // Reset form fields
      setBuilding("");
      setFloor("");
      setShowFields(false); // Hide the form
      // Trigger refresh by updating the dependency
      setFloorAdded(Date.now());
      toast.success("Floor created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create floor");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFloorChange = (e) => {
    const { value } = e.target;
    const validate = value.replace(/[^a-zA-Z0-9 ]/g, "");
    setFloor(validate);
  };
  return (
    <div className="flex">
      <Navbar />
      <div className=" w-full flex lg:mx-3 flex-col overflow-hidden">
        <Account />
        <div className="flex flex-col m-2 gap-2 p-1">
          {(siteId === 55 || siteId === 56) && (
            <div className="flex justify-end">
              <h2
                className="font-semibold hover:text-white duration-150 transition-all p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2"
                onClick={() => setShowFields(!showFields)}
                style={{ background: "rgb(3 19 37)" }}
              >
                <PiPlusCircle size={20} />
                Add Floor
              </h2>
            </div>
          )}
          {showFields && (
            <div>
              <div className="flex gap-3 md:flex-row flex-col">
                <select
                  name="building"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  id=""
                  className="border border-gray-500 rounded-md  p-2 md:w-48"
                >
                  <option value="">Select Building</option>
                  {buildings.map((build) => (
                    <option value={build.id} key={build.id}>
                      {build.name}
                    </option>
                  ))}
                </select>
                {/* <input
                type="text"
                placeholder="Enter Wing"
                className="border border-gray-500 rounded-md mt-5 p-2"
                value={wing}
                onChange={handlewingChange}
              />
              <input
                type="text"
                placeholder="Enter Area Name"
                className="border border-gray-500 rounded-md mt-5 p-2"
                value={area}
                onChange={handleAreaChange}
              /> */}
                <input
                  type="text"
                  placeholder="Enter Floor"
                  className="border border-gray-500 rounded-md  p-2"
                  value={floor}
                  onChange={handleFloorChange}
                />
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`py-2 px-4 rounded-md text-white ${
                    submitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {submitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    'Submit'
                  )}
                </button>
                <button
                  onClick={() => setShowFields(!showFields)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md "
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-center items-center">
            <div className=" w-screen">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-gray-600">Loading floors...</span>
                </div>
              ) : (
                <div>
                  <Table columns={floorColumns} data={floors} />
                </div>
              )}
            </div>
          </div>
        </div>
        {editModal && (
          <EditFloorModal id={id} onclose={() => setEditModal(false)} />
        )}
      </div>
    </div>
  );
};

export default Floor;
