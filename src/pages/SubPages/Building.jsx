import React, { useEffect, useState } from "react";
import Account from "./Account";
import { PiPlusCircle } from "react-icons/pi";
import Switch from "../../Buttons/Switch";
import Table from "../../components/table/Table";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getBuildings, getSites, postBuilding } from "../../api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";

const Building = () => {
  const [siteId, setSiteId] = useState("");
  const [building, setBuilding] = useState("");
  const [showFields, setShowFields] = useState(false);
const [added, setAdded] = useState(false)
  const [submittedData, setSubmittedData] = useState([]);
  const [sites, setSites] = useState([]);
  const [buildings, setBuildings] = useState([]);
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
          <Link>
            <BsEye size={15} />
          </Link>
          <Link>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (siteId === "" || building === "") {
      toast.error("All fields are required");
    }
    const formData = new FormData();
    formData.append("building[name]", building);
    formData.append("building[site_id]", siteId);
    try {
      const buildResp = await postBuilding(formData);
      console.log(buildResp);
      setAdded(true)
      setShowFields(false)
      setSiteId("")
      setBuilding("")
      toast.success("Building Added Successfully")
    } catch (error) {
      console.log(error);
    }
  };

  const handleSiteChange = (e) => {
    setSiteId(e.target.value);
  };

  const handleBuildingChange = (e) => {
    setBuilding(e.target.value);
  };

  useEffect(() => {
    const fetchBuildings = async () => {
      const buildingResp = await getBuildings();
      setBuildings(buildingResp.data);
      console.log(buildingResp);
    };
    const fetchSite = async () => {
      const siteResp = await getSites();
      setSites(siteResp.data);
      console.log(siteResp.data);
    };
    fetchBuildings();
    fetchSite();
  }, [added]);
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <div className="flex">
      <Navbar />
    <div className="w-full mt-1">
      
      <Account />
      <div className="flex flex-col mx-10 my-10 gap-2">
        <div className="flex justify-end w-full">
          <h2
            className="font-semibold  hover:text-white duration-150 transition-all  p-2 rounded-md text-white cursor-pointer text-center flex items-center  gap-2"
            onClick={() => setShowFields(!showFields)}
            style={{ background: themeColor }}
          >
            <PiPlusCircle size={20} />
            Add Building
          </h2>
        </div>
        {showFields && (
          <div>
            <div className="flex md:flex-row flex-col justify-center gap-3">
              <select
                name="siteId"
                id=""
                value={siteId}
                onChange={handleSiteChange}
                className="border border-gray-500 rounded-md  p-2"
              >
                <option value={""}>Select Site</option>
                {sites.map((site) => (
                  <option value={site.id} key={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Enter Building Name"
                className="border border-gray-500 rounded-md  p-2"
                value={building}
                onChange={handleBuildingChange}
              />
              <button
                onClick={handleSubmit}
                style={{ background: themeColor }}
                className="bg-blue-500 text-white py-1 px-4 rounded-md  hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                onClick={() => setShowFields(!showFields)}
                className="bg-red-400 text-white py-1 px-4 rounded-md  "
              >
                Cancel
              </button>
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
    </div>
  );
};

export default Building;
