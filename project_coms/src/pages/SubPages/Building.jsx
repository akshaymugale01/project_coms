import { useEffect, useState } from "react";
import Account from "./Account";
import { PiPlusCircle } from "react-icons/pi";
import Table from "../../components/table/Table";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { getBuildings, getSites, postBuilding, putBuilding } from "../../api";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";

const Building = () => {
  const [siteId, setSiteId] = useState("");
  const [building, setBuilding] = useState("");
  const [floor_no, setFloor_No] = useState("");
  const [showFields, setShowFields] = useState(false);
  const [added, setAdded] = useState(false);
  const [sites, setSites] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("edit"); // "edit" or "view"
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const buildingColumns = [
    {
      name: "Site",
      selector: (row) => row.site_name,
      sortable: true,
    },
    {
      name: "Building ",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "No. of Floors ",
      selector: (row) => row.floor_no,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleView(row)}>
            <BsEye size={15} />
          </button>
          <button onClick={() => handleEdit(row)}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (siteId === "" || building === "") {
      toast.error("Site and Building Name are required");
      return;
    }
    const formData = new FormData();
    formData.append("building[name]", building);
    formData.append("building[site_id]", siteId);
    formData.append("building[floor_no]", floor_no);
    try {
      const buildResp = await postBuilding(formData);
      console.log(buildResp);
      setAdded(true);
      setShowFields(false);
      setSiteId("");
      setBuilding("");
      setFloor_No("");
      toast.success("Building Added Successfully");
    } catch (error) {
      console.log(error);
      // Show API error message if available
      const errorMessage = "Name " + error?.response?.data?.name[0] || "Name has already taken" 
      toast.error(errorMessage);
    }
  };

  const handleSiteChange = (e) => {
    setSiteId(e.target.value);
  };

const handleBuildingChange = (e) => {
  const { name, value } = e.target;
  if (name === "floor_no") {
    const filteredValue = value.replace(/[^0-9]/g, "");
    setFloor_No(filteredValue);
  } else if (name === "building") {
    const filteredValue = value.replace(/[^a-zA-Z0-9 ]/g, "");
    setBuilding(filteredValue);
  }
};

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const buildingResp = await getBuildings();
        setBuildings(buildingResp.data);
        console.log(buildingResp);
      } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.message || 
                            error?.response?.data?.error || 
                            error?.message || 
                            "Failed to fetch buildings";
        toast.error(errorMessage);
      }
    };
    const fetchSite = async () => {
      try {
        const siteResp = await getSites();
        setSites(siteResp.data);
        console.log(siteResp.data);
      } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.message || 
                            error?.response?.data?.error || 
                            error?.message || 
                            "Failed to fetch sites";
        toast.error(errorMessage);
      }
    };
    fetchBuildings();
    fetchSite();
  }, [added]);

  const handleEdit = (building) => {
    setSelectedBuilding(building);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleView = (building) => {
    setSelectedBuilding(building);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleUpdateBuilding = async () => {
    // Validate required fields
    if (!selectedBuilding.name || !selectedBuilding.site_id) {
      toast.error("Site and Building Name are required");
      return;
    }

    const formData = new FormData();
    formData.append("building[name]", selectedBuilding.name);
    formData.append("building[site_id]", selectedBuilding.site_id);
    formData.append("building[floor_no]", selectedBuilding.floor_no);
    try {
      await putBuilding(selectedBuilding.id, formData);
      toast.success("Building updated successfully");
      setIsModalOpen(false);
      setAdded(Date.now());
    } catch (error) {
      console.log(error);
      // Show API error message if available
      const errorMessage = error?.response?.data?.message || 
                          error?.response?.data?.error || 
                          error?.message || 
                          "Failed to update building";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="w-full mt-1">
        <Account />
        <div className="flex flex-col mx-5 gap-2">
          <div className="flex justify-end w-full p-2">
            <h2
              className="font-semibold  hover:text-white duration-150 transition-all  p-2 rounded-md text-white cursor-pointer text-center flex items-center  gap-2"
              onClick={() => setShowFields(!showFields)}
              style={{ background: "rgb(3 19 37)" }}
            >
              <PiPlusCircle size={20} />
              Add Building
            </h2>
          </div>
          {showFields && (
            <div>
              <div className="flex md:flex-row flex-col justify-center gap-3">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">
                    Select Site <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="siteId"
                    id=""
                    value={siteId}
                    onChange={handleSiteChange}
                    className="border border-gray-500 rounded-md p-2"
                    required
                  >
                    <option value={""}>Select Site</option>
                    {sites.map((site) => (
                      <option value={site.id} key={site.id}>
                        {site.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">
                    Building Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="building"
                    placeholder="Enter Building Name"
                    className="border border-gray-500 rounded-md p-2"
                    value={building}
                    onChange={handleBuildingChange}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">
                    No. of Floors
                  </label>
                  <input
                    type="text"
                    name="floor_no"
                    placeholder="Enter No. of Floors"
                    className="border border-gray-500 rounded-md p-2"
                    value={floor_no}
                    onChange={handleBuildingChange}
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmit}
                      style={{ background: "rgb(3 19 37)" }}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setShowFields(!showFields)}
                      className="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="flex my-2 gap-4">
              <div className="flex  gap-2">
                <input type="checkbox" name="wing" id="wing" />
                <label htmlFor="wing">Wing</label>
              </div>
              <div className="flex  gap-2">
                <input type="checkbox" name="area" id="area" />
                <label htmlFor="area">Area</label>
              </div>
              <div className="flex  gap-2">
                <input type="checkbox" name="floor" id="floor" />
                <label htmlFor="floor">Floor</label>
              </div>
              <div className="flex  gap-2">
                <input type="checkbox" name="room" id="room" />
                <label htmlFor="room">Room</label>
              </div>
            </div> */}
            </div>
          )}

          {/* <div className="flex justify-center items-center">
          <div className="mt-4 w-screen">
            <table className="border-collapse w-full">
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
                  <th className="border-md p-2 bg-black border-r-2 text-white ">
                    Room
                  </th>
                  <th className="border-md p-2 bg-black border-r-2 text-white rounded-r-xl ">
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
                        {data.site}
                      </td>
                      <td className="text-center p-2 border-r-2 border-black">
                        {data.building}
                      </td>
                      <td className="text-center p-2 border-r-2 border-black">
                        {data.wing ? "Yes" : "No"}
                      </td>
                      <td className="text-center p-2 border-r-2 border-black">
                        {data.area ? "Yes" : "No"}
                      </td>
                      <td className="text-center p-2 border-r-2 border-black">
                        {data.floor ? "Yes" : "No"}
                      </td>
                      <td className="text-center p-2 border-r-2 border-black">
                        {data.room ? "Yes" : "No"}
                      </td>
                      <td className="text-center p-2">
                        {" "}
                        <Switch />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div> */}
          <Table columns={buildingColumns} data={buildings} />
        </div>
      </div>
      {isModalOpen && selectedBuilding && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px] relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {modalMode === "view" ? "View Building" : "Edit Building"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Only allow submit in edit mode
                if (modalMode === "edit") handleUpdateBuilding();
              }}
              className="flex flex-col gap-3"
            >
              <label>
                Site <span className="text-red-500">*</span>:
                <input
                  type="text"
                  value={selectedBuilding.site_name}
                  disabled
                  className="border p-2 rounded w-full bg-gray-100"
                />
              </label>
              <label>
                Building Name <span className="text-red-500">*</span>:
                <input
                  type="text"
                  value={selectedBuilding.name}
                  disabled={modalMode === "view"}
                  onChange={(e) =>
                    setSelectedBuilding({ ...selectedBuilding, name: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
              <label>
                No. of Floors:
                <input
                  type="number"
                  value={selectedBuilding.floor_no || ""}
                  disabled={modalMode === "view"}
                  onChange={(e) =>
                    setSelectedBuilding({
                      ...selectedBuilding,
                      floor_no: e.target.value,
                    })
                  }
                  className="border p-2 rounded w-full"
                />
              </label>
              {modalMode === "edit" && (
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
                >
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Building;
