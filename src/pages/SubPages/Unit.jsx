import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Account from "./Account";
import { PiPlusCircle } from "react-icons/pi";
import { BiEdit } from "react-icons/bi";
import { FaCalendarPlus } from "react-icons/fa";
import { getAllUnits, getBuildings, getFloors, postNewUnit } from "../../api";
import { unitConfigurationService } from "../OSR/additionalServices";
import Table from "../../components/table/Table";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import EditUnitModal from "../../containers/modals/EditUnitModal";
import Navbar from "../../components/Navbar";

const Unit = () => {
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [units, setUnits] = useState([]);
  const [unit, setUnit] = useState("");
  const [unitConfiguration, setUnitConfiguration] = useState("");
  const [showFields, setShowFields] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [unitConfigurations, setUnitConfigurations] = useState([]);
  const [unitAdded, setUnitAdded] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
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

    const fetchUnitConfigurations = async () => {
      try {
        const configResp = await unitConfigurationService.getAll();
        console.log("Unit configurations:", configResp);
        setUnitConfigurations(Array.isArray(configResp.data) ? configResp.data : []);
      } catch (error) {
        console.log("Error loading unit configurations:", error);
        toast.error("Failed to load unit configurations");
        setUnitConfigurations([]);
      }
    };

    fetchBuilding();
    fetchUnitConfigurations();
  }, []);

  useEffect(() => {
    const fetchAllUnits = async () => {
      try {
        setLoading(true);
        const unitsResp = await getAllUnits();
        console.log("Units API response:", unitsResp.data); // Debug log
        const sortedUnits = unitsResp.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        console.log("Sorted units:", sortedUnits); // Debug log
        setUnits(sortedUnits);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load units");
      } finally {
        setLoading(false);
      }
    };
    fetchAllUnits();
  }, [unitAdded]);

  const handleBuildingChange = async (e) => {
    async function fetchFloor(floorID) {
      try {
        const build = await getFloors(floorID);
        setFloors(build.data.map((item) => ({ name: item.name, id: item.id })));
      } catch (e) {
        console.log(e);
      }
    }
    if (e.target.type === "select-one" && e.target.name === "building") {
      const BuildID = Number(e.target.value);
      await fetchFloor(BuildID);
      setBuilding(BuildID);
    }
  };

  const handleEditClick = (id) => {
    setEditModal(true);
    setId(id);
  };
  const unitColumns = [
    {
      name: "Site",
      selector: (row) => {
        console.log("Site data for row:", row); // Debug log
        return row.site_name || row.site?.name || "Unknown Site";
      },
      sortable: true,
    },
    {
      name: "Building",
      selector: (row) => {
        console.log("Building data for row:", row); // Debug log
        return row.building_name || row.building?.name || "Unknown Building";
      },
      sortable: true,
    },
    {
      name: "Floor",
      selector: (row) => {
        console.log("Floor data for row:", row); // Debug log
        return row.floor_name || row.floor?.name || "Unknown Floor";
      },
      sortable: true,
    },
    {
      name: "Unit",
      selector: (row) => row.name || "Unknown Unit",
      sortable: true,
    },
    {
      name: "Unit Configuration",
      selector: (row) => {
        console.log("Unit config data for row:", row); // Debug log
        return row.unit_configuration_name || row.unit_configuration?.name || "Not Set";
      },
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

    if (!building || !floor || !unit || !unitConfiguration) {
      toast.error("Please fill in all required fields including unit configuration");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("unit[site_id]", siteId);
    formData.append("unit[building_id]", building);
    formData.append("unit[floor_id]", floor);
    formData.append("unit[name]", unit);
    formData.append("unit[unit_configuration_id]", unitConfiguration);

    try {
      await postNewUnit(formData);
      // Reset form fields
      setBuilding("");
      setFloor("");
      setUnit("");
      setUnitConfiguration("");
      setFloors([]); // Clear floors since building is reset
      setShowFields(false); // Hide the form
      // Trigger refresh by updating the dependency
      setUnitAdded(Date.now());
      toast.success("Unit created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create unit");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnitChange = (e) => {
    const { value } = e.target;
    // Allow only alphabets and numbers, no spaces or special characters
    const filteredValue = value.replace(/[^a-zA-Z0-9]/g, "");
    setUnit(filteredValue);
  };
  return (
    <div className="flex">
      <Navbar />
      <div className=" w-full flex lg:mx-3 flex-col overflow-hidden">
        <Account />
        <div className="flex flex-col  m-2 gap-2">
          {(siteId === 55 || siteId === 56) && (
            <div className="flex justify-end">
              <h2
                className=" font-semibold  hover:text-white duration-150 transition-all  p-2 rounded-md text-white cursor-pointer text-center flex items-center  gap-2"
                onClick={() => setShowFields(!showFields)}
                style={{ background: "rgb(3 19 37)" }}
              >
                <PiPlusCircle size={20} />
                Add Unit
              </h2>
            </div>
          )}
          {showFields && (
            <div>
              <div className="flex gap-3 md:flex-row flex-col">
                <select
                  name="building"
                  value={building}
                  // onChange={(e) => setBuilding(e.target.value)}
                  onChange={handleBuildingChange}
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
                <select
                  name="building"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  id=""
                  className="border border-gray-500 rounded-md  p-2 md:w-48"
                >
                  <option value="">Select Floor</option>
                  {floors.map((fl) => (
                    <option value={fl.id} key={fl.id}>
                      {fl.name}
                    </option>
                  ))}
                </select>
                {/* <input
                type="text"
                placeholder="Enter Entity"
                className="border border-gray-500 rounded-md mt-5 p-2"
                value={entity}
                onChange={handleEntityChange}
              /> */}
                <input
                  type="text"
                  placeholder="Enter Unit Name"
                  className="border border-gray-500 rounded-md  p-2"
                  value={unit}
                  onChange={handleUnitChange}
                />
                
                <select
                  name="unitConfiguration"
                  value={unitConfiguration}
                  onChange={(e) => setUnitConfiguration(e.target.value)}
                  className="border border-gray-500 rounded-md p-2 md:w-48"
                  required
                >
                  <option value="">Select Unit Configuration</option>
                  {unitConfigurations.map((config) => (
                    <option value={config.id} key={config.id}>
                      {config.name}
                    </option>
                  ))}
                </select>
                {/* <input
                type="text"
                placeholder="Enter Area(sq.Mtr)"
                className="border border-gray-500 rounded-md mt-5 p-2"
              /> */}
                <div className="flex gap-2">
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className={`py-2 px-4 rounded-md text-white ${
                      submitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {submitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                  <button
                    onClick={() => setShowFields(!showFields)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md  "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center items-center">
            <div className=" w-screen">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-gray-600">Loading units...</span>
                </div>
              ) : (
                <div>
                  <Table columns={unitColumns} data={units} />
                </div>
              )}
            </div>
          </div>
        </div>
        {editModal && (
          <EditUnitModal onclose={() => setEditModal(false)} id={id} />
        )}
      </div>
    </div>
  );
};

export default Unit;
