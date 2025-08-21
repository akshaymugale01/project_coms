import { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Navbar from "../../components/Navbar";
import DataTable from "react-data-table-component";
import { getSetupUsers, getUserCount } from "../../api";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { DNA } from "react-loader-spinner";
import { RiEyeLine } from "react-icons/ri";
import {
  getFloors,
  getSites,
  getUnits,
  getBuildings,
  postSetupUsers,
  getSetupUsersByFloor,
  getSetupUsersByBuilding,
  getSetupUsersByUnit,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";

const UserSetupTree = () => {
  const siteId = getItemInLocalStorage("SITEID");
  const [sites, setSites] = useState([]);
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [filtteredFloors, setFilteredFloors] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [floors, setFloors] = useState([]);
  const [selectedFloorId, setSelectedFloorId] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [filters, setFilters] = useState({
    tower: "",
    floor: "",
    unit: "",
  });

  // const [formData, setFormData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   password: "",
  //   mobile: "",
  //   userType: "unit_resident",
  //   site_ids: [siteId],
  //   user_sites: [
  //     {
  //       unit_id: "",
  //       site_id: siteId,
  //       ownership: "",
  //       ownership_type: "",
  //       is_approved: true,
  //       lives_here: "",
  //     },
  //   ],
  //   occupancy_type: "",
  //   lease_expiry: "",
  // });

  // const [userList, setUserList] = useState([
  //   {
  //     firstName: "Anurag",
  //     lastName: "Sharma",
  //     email: "anuragsharma@example.com",
  //     mobile: "9876543210",
  //     userType: "Primary",
  //   },
  //   // Add more users
  // ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sitesResp, buildingResp, unitsResp] = await Promise.all([
          getSites(),
          getBuildings(),
          // const floors = getFloors(selectedBuilding),
        ]);
        setSites(
          sitesResp.data.map((site) => ({
            value: site.id,
            label: site.name,
          }))
        );
        setFilteredBuildings(buildingResp.data);
        // setUnits(unitsResp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchUsers = async () => {
    try {
      if (
        selectedBuilding &&
        selectedFloorId &&
        selectedUnitId &&
        selectedUnitId != ""
      ) {
        const user = await getSetupUsersByUnit("users", selectedUnitId);
        setUsers(user.data);
      } else if (selectedBuilding && selectedFloorId && selectedFloorId != "") {
        const userbyfloor = await getSetupUsersByFloor(
          "users",
          selectedFloorId
        );
        setUsers(userbyfloor.data);
        setSelectedUnitId("");
      } else if (selectedBuilding) {
        const userbybuilding = await getSetupUsersByBuilding(
          "users",
          selectedBuilding
        );
        setUsers(userbybuilding.data);
        setSelectedFloorId("");
        setSelectedUnitId("");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  console.log("The unit id selected is", selectedUnitId);
  console.log(
    "The selected building and floor",
    selectedBuilding,
    selectedFloorId
  );
  console.log("Users:", users);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearchClick = async () => {
    try {
      fetchUsers();
    } catch (error) {
      // assuming this feeds your DataTable
      console.error("Error fetching users:", error);
      setUserData([]);
    }
  };

  const handleViewUser = (user) => {
    // Show user details or navigate
  };

  const columns = [
    {
      name: "View",
      cell: (row) => (
        <div className="flex item-center gap-2">
          <Link to={`/setup/users-tree/${row.id}`}>
            <BsEye size={15} />
          </Link>
          {/* <Link to={`bookings/edit_bookings/${row.id}`}>
                <BiEdit size={15} />
              </Link> */}
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.good_name,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
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
    // {
    //   name: "Email",
    //   selector: (row) => row.email,
    //   sortable: true,
    // },
    // {
    //   name: "Mobile",
    //   selector: (row) => row.mobile,
    //   sortable: true,
    // },
    // {
    //   name: "Type of User",
    //   selector: (row) => row.userType,
    //   sortable: true,
    // },
  ];

  const customStyles = {
    headRow: {
      style: {
        background: "rgb(17, 24, 39)",
        color: "white",
        fontSize: "10px",
      },
    },
    headCells: {
      style: {
        textTransform: "uppercase",
      },
    },
    cells: {
      style: {
        // fontWeight: "bold",
        fontSize: "14px",
      },
    },
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-10 flex-col gap-4 overflow-hidden mb-5">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-5">
          User Tree View
        </h2>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end mt-6">
          {/* Tower Selection */}
          <div className="flex flex-col">
            <label className="font-semibold">
              Tower: <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="border p-2 px-4 border-gray-300 rounded rounded-md placeholder:text-sm"
              value={selectedBuilding}
              onChange={async (e) => {
                const buildingId = e.target.value;
                setSelectedBuilding(buildingId);

                // Reset dependent dropdowns
                setSelectedFloorId("");
                setSelectedUnitId("");
                setFloors([]);
                setUnits([]);

                if (buildingId) {
                  try {
                    const response = await getFloors(buildingId);
                    setFloors(response.data);
                  } catch (error) {
                    console.error("Error fetching floors:", error);
                  }
                }
              }}
            >
              <option value="">-- Choose Building --</option>
              {filteredBuildings.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.name}
                </option>
              ))}
            </select>
          </div>

          {/* Floor Selection */}
          <div className="flex flex-col">
            <label className="font-semibold">
              Floor: <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="border p-2 px-4 border-gray-300 rounded rounded-md placeholder:text-sm"
              value={selectedFloorId}
              onChange={async (e) => {
                const floorId = e.target.value;
                setSelectedFloorId(floorId);
                setSelectedUnitId(""); // reset unit selection

                if (floorId) {
                  try {
                    const response = await getUnits(floorId);
                    setUnits(response.data);
                  } catch (error) {
                    console.error("Error fetching units:", error);
                    setUnits([]);
                  }
                } else {
                  setUnits([]);
                }
              }}
            >
              <option value="">-- Choose Floor --</option>
              {floors.map((floor) => (
                <option key={floor.id} value={floor.id}>
                  {floor.name}
                </option>
              ))}
            </select>
          </div>

          {/* Unit Selection */}
          <div className="flex flex-col">
            <label className="font-semibold">
              Units: 
              {/* <span style={{ color: "red" }}>*</span> */}
            </label>
            <select
              className="border p-2 px-4 border-gray-300 rounded rounded-md placeholder:text-sm"
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(e.target.value)}
            >
              <option value="">-- Choose Unit --</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="flex flex-col h-full justify-end">
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>
        </div>

        {/* 📊 User Table */}
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={users}
            pagination
            highlightOnHover
            striped
            customStyles={customStyles}
          />
        </div>
      </div>
    </section>
  );
};

export default UserSetupTree;
