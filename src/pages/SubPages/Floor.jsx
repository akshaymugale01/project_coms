import React, { useEffect, useState } from "react";
import Account from "./Account";
import { PiPlusCircle } from "react-icons/pi";
import Switch from "../../Buttons/Switch";
import { useSelector } from "react-redux";
import Table from "../../components/table/Table";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { getAllFloors, getBuildings, postNewFloor } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import EditFloorModal from "../../containers/modals/EditFloorModal";
import Navbar from "../../components/Navbar";

const Floor = () => {
  const [wing, setWing] = useState("");
  const [building, setBuilding] = useState("");
  const [area, setArea] = useState("");
  const [floors, setFloors] = useState([]);
  const [floor, setFloor] = useState([]);
  const [floorAdded, setFloorAdded] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const [showRows, setShowRows] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const UserId = getItemInLocalStorage("UserId");
  console.log("User", UserId);
  const [id, setId] = useState("");
  useEffect(() => {
    const fetchAllFloors = async () => {
      try {
        const floorsResp = await getAllFloors();

        const sortedFloor = floorsResp.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setFloors(sortedFloor);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchBuilding = async () => {
      const buildingResp = await getBuildings();
      console.log(buildingResp);
      setBuildings(buildingResp.data);
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
      return;
    }
    const formData = new FormData();
    formData.append("floor[name]", floor);
    formData.append("floor[site_id]", siteId);
    formData.append("floor[building_id]", building);
    try {
      const resp = await postNewFloor(formData);
      toast.success("Floor created successfully");
      setFloorAdded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handlewingChange = (e) => {
    setWing(e.target.value);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };
  const handleFloorChange = (e) => {
    setFloor(e.target.value);
  };
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <div className="flex">
      <Navbar />
      <div className=" w-full flex lg:mx-3 flex-col overflow-hidden">
        <Account />
        <div className="flex flex-col m-2  gap-2">
          {UserId === 574 && (
            <div className="flex justify-end">
              <h2
                className="font-semibold hover:text-white duration-150 transition-all p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2"
                onClick={() => setShowFields(!showFields)}
                style={{ background: themeColor }}
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
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Submit
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
              {/* <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className="border-md p-2 bg-black border-r-2 text-white rounded-l-xl">
                    Site
                  </th>
                  <th className="border-md p-2 bg-black border-r-2 text-white ">
                    Building
                  </th>
                  <th className="border-md p-2 bg-black border-r-2 text-white ">
                    Wing
                  </th>
                  <th className="border-md p-2 bg-black border-r-2 text-white ">
                    Area
                  </th>
                  <th className="border-md p-2 bg-black border-r-2 text-white ">
                    Floor
                  </th>

                  <th className=" p-2 bg-black  text-white rounded-r-xl ">
                    Status
                  </th>
                </tr>
              </thead>
              {showRows && (
                <tbody>
                  {submittedData.map((data, index) => (
                    <tr
                      key={index}
                      className="border-md border-black border-b-2"
                    >
                      <td className="text-center p-2 border-r-2 border-black">
                        Kalyan
                      </td>
                      <td className="text-center p-2 border-r-2 border-black">
                        {data.building}
                      </td>
                      <td className="text-center p-2 border-r-2 border-black">
                        {data.wing}
                      </td>
                      <td className="text-center p-2 border-r-2 border-black">
                        {data.area}
                      </td>
                      <td className="text-center p-2 border-r-2 border-black">
                        {data.floor}
                      </td>
                      <td className="text-center p-2 rounded-r-xl">
                     <Switch/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table> */}

              <div>
                <Table columns={floorColumns} data={floors} />
              </div>
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
