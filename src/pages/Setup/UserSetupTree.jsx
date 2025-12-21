
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

import {
  getFloors,
  getSites,
  getUnits,
  getBuildings,
  getSetupUsersByFloor,
  getSetupUsersByBuilding,
  getSetupUsersByUnit,
  getSetupUsersByMemberType,
} from "../../api";

import { getItemInLocalStorage } from "../../utils/localStorage";

const memberOptions = ["owner", "tenant"];

const UserSetupTree = () => {
  const siteId = getItemInLocalStorage("SITEID");

  const [sites, setSites] = useState([]);
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [floors, setFloors] = useState([]);

  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloorId, setSelectedFloorId] = useState("");
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [memberType, setMemberType] = useState("");

  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);

  const filteredOptions = memberOptions.filter((opt) =>
    opt.toLowerCase().includes(searchText.toLowerCase())
  );
  const [openBuilding, setOpenBuilding] = useState(false);
  const [searchBuilding, setSearchBuilding] = useState("");

  const [openUnit, setOpenUnit] = useState(false);
  const [searchUnit, setSearchUnit] = useState("");

  const [openFloor, setOpenFloor] = useState(false);
  const [searchFloor, setSearchFloor] = useState("");

  // State for expanded rows in tree view
  const [expandedBuildings, setExpandedBuildings] = useState({});
  const [expandedFloors, setExpandedFloors] = useState({});


  // Fetch buildings + sites
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sitesResp, buildingResp] = await Promise.all([
          getSites(),
          getBuildings(),
        ]);

        setSites(
          sitesResp.data.map((site) => ({
            value: site.id,
            label: site.name,
          }))
        );

        setFilteredBuildings(buildingResp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // MAIN SEARCH HANDLER
  const fetchUsers = async () => {
    try {
      // 1️⃣ If Member Type selected with any location
      if (memberType !== "") {
        // Determine which location parameter to use (most specific first)
        if (selectedUnitId) {
          const res = await getSetupUsersByMemberType(
            "users",
            selectedUnitId,
            memberType,
            "unit_id" // Specify parameter type
          );
          setUsers(res.data);
          return;
        } else if (selectedFloorId) {
          const res = await getSetupUsersByMemberType(
            "users",
            selectedFloorId,
            memberType,
            "floor_id" // Specify parameter type
          );
          setUsers(res.data);
          return;
        } else if (selectedBuilding) {
          const res = await getSetupUsersByMemberType(
            "users",
            selectedBuilding,
            memberType,
            "building_id" // Specify parameter type
          );
          setUsers(res.data);
          return;
        } else {
          alert("Please select a building, floor, or unit first.");
          return;
        }
      }

      // 2️⃣ Building → Floor → Unit (no member type filter)
      if (selectedUnitId !== "") {
        const res = await getSetupUsersByUnit("users", selectedUnitId);
        setUsers(res.data);
        return;
      }

      // 3️⃣ Building → Floor
      if (selectedFloorId !== "") {
        const res = await getSetupUsersByFloor("users", selectedFloorId);
        setUsers(res.data);
        return;
      }

      // 4️⃣ Only Building
      if (selectedBuilding !== "") {
        const res = await getSetupUsersByBuilding("users", selectedBuilding);
        setUsers(res.data);
        return;
      }

      alert("Please select a building first.");
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Toggle expand/collapse functions
  const toggleBuilding = (userId, buildingName) => {
    const key = `${userId}-${buildingName}`;
    setExpandedBuildings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleFloor = (userId, buildingName, floorName) => {
    const key = `${userId}-${buildingName}-${floorName}`;
    setExpandedFloors((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Group units by building and floor
  const groupUnitsByStructure = (sites) => {
    const buildingMap = {};
    
    // Aggregate all units from all sites into a single building structure
    sites.forEach((site) => {
      site.units.forEach((unit) => {
        if (!buildingMap[unit.building]) {
          buildingMap[unit.building] = {};
        }
        if (!buildingMap[unit.building][unit.floor]) {
          buildingMap[unit.building][unit.floor] = [];
        }
        buildingMap[unit.building][unit.floor].push(unit);
      });
    });

    return buildingMap;
  };

  // Expandable component for tree hierarchy
  const ExpandedComponent = ({ data }) => {
    const buildingStructure = groupUnitsByStructure(data.sites || []);
    
    return (
      <div className="p-4 bg-gray-50">
        {Object.entries(buildingStructure).map(([buildingName, floors]) => {
          const buildingKey = `${data.id}-${buildingName}`;
          
          return (
            <div key={buildingName} className="mb-3 border border-green-200 rounded">
              {/* Building Row */}
              <div className="flex items-center p-2 bg-green-50 cursor-pointer hover:bg-green-100"
                onClick={() => toggleBuilding(data.id, buildingName)}>
                <button className="mr-3 text-green-600">
                  {expandedBuildings[buildingKey] ? (
                    <FaChevronDown size={12} />
                  ) : (
                    <FaChevronRight size={12} />
                  )}
                </button>
                <span className="font-medium text-green-800">
                  🏢 {buildingName}
                </span>
                <span className="ml-2 text-xs bg-green-200 text-green-700 px-2 py-1 rounded">
                  {Object.keys(floors).length} floors
                </span>
              </div>

              {/* Floors */}
              {expandedBuildings[buildingKey] && (
                <div className="p-2 pl-6 bg-white">
                  {Object.entries(floors).map(([floorName, units]) => {
                    const floorKey = `${data.id}-${buildingName}-${floorName}`;
                    
                    return (
                      <div key={floorName} className="mb-2 border border-purple-200 rounded">
                        {/* Floor Row */}
                        <div className="flex items-center p-2 bg-purple-50 cursor-pointer hover:bg-purple-100"
                          onClick={() => toggleFloor(data.id, buildingName, floorName)}>
                          <button className="mr-3 text-purple-600">
                            {expandedFloors[floorKey] ? (
                              <FaChevronDown size={10} />
                            ) : (
                              <FaChevronRight size={10} />
                            )}
                          </button>
                          <span className="font-medium text-purple-800">
                            🔢 Floor {floorName}
                          </span>
                          <span className="ml-2 text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded">
                            {units.length} units
                          </span>
                        </div>

                        {/* Units */}
                        {expandedFloors[floorKey] && (
                          <div className="p-2 pl-6 bg-white">
                            {units.map((unit) => (
                              <div
                                key={unit.unit_id}
                                className="flex items-center p-2 mb-1 bg-orange-50 rounded hover:bg-orange-100"
                              >
                                <span className="mr-2">🏠</span>
                                <span className="font-medium text-gray-700">
                                  Unit {unit.unit_name}
                                </span>
                                <span className="ml-3 text-sm bg-orange-200 text-orange-700 px-2 py-1 rounded">
                                  {unit.ownership}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const columns = [
    {
      name: "Actions",
      cell: (row) => (
      <div className="flex items-center gap-2">
        <Link to={`/setup/users-tree/${row.id}`}>
        <BsEye size={15} />
        </Link>
        <Link to={`/setup/users-edit-page/${row.id}`}>
        <BiEdit size={15} />
        </Link>
      </div>
      ),
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.good_name || row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
    },
    {
      name: "Building",
      selector: (row) => row.sites[0].units[0].building,
      sortable: true,
      wrap: true,
    },
    {
      name: "Floor",
      selector: (row) => row.sites[0].units[0].floor,
      sortable: true,
      wrap: true, 
    },
    {
      name: "Ownership",
      selector: (row) => {
      const allUnits = (row.sites || []).flatMap(site => site.units || []);
      const ownerships = [...new Set(allUnits.map(unit => unit.ownership).filter(Boolean))];
      return ownerships.join(", ").toUpperCase() || "Not Assigned";
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "No. of Units",
      selector: (row) => {
      const totalUnits = (row.sites || []).reduce((sum, site) => sum + (site.units?.length || 0), 0);
      return totalUnits;
      },
      sortable: true,
    },
    ];

  // Check if user has units to show expand button
  const conditionalRowStyles = [
    {
      when: row => {
        const totalUnits = (row.sites || []).reduce((sum, site) => sum + (site.units?.length || 0), 0);
        return totalUnits === 0;
      },
      style: {
        pointerEvents: 'none',
      },
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        background: "rgb(17, 24, 39)",
        color: "white",
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    headCells: {
      style: {
        textTransform: "uppercase",
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
    expanderRow: {
      style: {
        backgroundColor: "#f9fafb",
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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end mt-6">
          {/* Building */}
          {/* Building - Searchable Dropdown */}
          <div className="flex flex-col w-full relative">
            <label className="font-semibold mb-1">Building</label>

            {/* Selected Box */}
            <div
              className="border p-2 px-4 rounded-md cursor-pointer bg-white"
              onClick={() => setOpenBuilding((prev) => !prev)}
            >
              {selectedBuilding
                ? filteredBuildings.find((b) => b.id == selectedBuilding)?.name
                : "-- Choose Building --"}
            </div>

            {/* Dropdown */}
            {openBuilding && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-20 shadow-lg">

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search building..."
                  className="border-b p-2 w-full text-sm outline-none"
                  value={searchBuilding}
                  onChange={(e) => setSearchBuilding(e.target.value)}
                />

                {/* Options */}
                <div className="max-h-40 overflow-y-auto">
                  {filteredBuildings
                    .filter((building) =>
                      building.name.toLowerCase().includes(searchBuilding.toLowerCase())
                    )
                    .map((building) => (
                      <div
                        key={building.id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={async () => {
                          setSelectedBuilding(building.id);
                          setOpenBuilding(false);
                          setSearchBuilding("");

                          // Reset dependent dropdowns
                          setSelectedFloorId("");
                          setSelectedUnitId("");
                          setFloors([]);
                          setUnits([]);

                          // Fetch floors for building
                          try {
                            const response = await getFloors(building.id);
                            setFloors(response.data);
                          } catch (error) {
                            console.error("Error fetching floors:", error);
                          }
                        }}
                      >
                        {building.name}
                      </div>
                    ))}

                  {/* No match */}
                  {filteredBuildings.filter((b) =>
                    b.name.toLowerCase().includes(searchBuilding.toLowerCase())
                  ).length === 0 && (
                      <div className="p-2 text-gray-400">No match found</div>
                    )}
                </div>
              </div>
            )}
          </div>


          {/* Floor */}
          <div className="flex flex-col w-full relative">
            <label className="font-semibold mb-1">Floor</label>

            {/* Selected Box */}
            <div
              className="border p-2 px-4 rounded-md cursor-pointer bg-white"
              onClick={() => setOpenFloor((prev) => !prev)}
            >
              {selectedFloorId
                ? floors.find((f) => f.id == selectedFloorId)?.name
                : "-- Choose Floor --"}
            </div>

            {/* Dropdown */}
            {openFloor && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-20 shadow-lg">

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search floor..."
                  className="border-b p-2 w-full text-sm outline-none"
                  value={searchFloor}
                  onChange={(e) => setSearchFloor(e.target.value)}
                />

                {/* Options */}
                <div className="max-h-40 overflow-y-auto">
                  {floors
                    .filter((floor) =>
                      floor.name.toLowerCase().includes(searchFloor.toLowerCase())
                    )
                    .map((floor) => (
                      <div
                        key={floor.id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={async () => {
                          setSelectedFloorId(floor.id);
                          setOpenFloor(false);
                          setSearchFloor("");

                          // Reset units
                          setSelectedUnitId("");
                          try {
                            const response = await getUnits(floor.id);
                            setUnits(response.data);
                          } catch (error) {
                            console.error("Error fetching units:", error);
                          }
                        }}
                      >
                        {floor.name}
                      </div>
                    ))}

                  {/* No match */}
                  {floors.filter((floor) =>
                    floor.name.toLowerCase().includes(searchFloor.toLowerCase())
                  ).length === 0 && (
                      <div className="p-2 text-gray-400">No match found</div>
                    )}
                </div>
              </div>
            )}
          </div>

          {/* Unit */}
          <div className="flex flex-col w-full relative">
            <label className="font-semibold mb-1">Unit</label>

            {/* Selected Box */}
            <div
              className="border p-2 px-4 rounded-md cursor-pointer bg-white"
              onClick={() => setOpenUnit((prev) => !prev)}
            >
              {selectedUnitId
                ? units.find((u) => u.id == selectedUnitId)?.name
                : "-- Choose Unit --"}
            </div>

            {/* Dropdown */}
            {openUnit && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-20 shadow-lg">

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search unit..."
                  className="border-b p-2 w-full text-sm outline-none"
                  value={searchUnit}
                  onChange={(e) => setSearchUnit(e.target.value)}
                />

                {/* Options */}
                <div className="max-h-40 overflow-y-auto">
                  {units
                    .filter((unit) =>
                      unit.name.toLowerCase().includes(searchUnit.toLowerCase())
                    )
                    .map((unit) => (
                      <div
                        key={unit.id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSelectedUnitId(unit.id);
                          setOpenUnit(false);
                          setSearchUnit(""); // clear search after select
                        }}
                      >
                        {unit.name}
                      </div>
                    ))}

                  {units.filter((unit) =>
                    unit.name.toLowerCase().includes(searchUnit.toLowerCase())
                  ).length === 0 && (
                      <div className="p-2 text-gray-400">No match found</div>
                    )}
                </div>
              </div>
            )}
          </div>

          {/* Member Type with Search */}
          <div className="flex flex-col w-full relative">
            <label className="font-semibold mb-1">Member Type:</label>

            {/* Selected Box */}
            <div
              className="border p-2 px-4 rounded-md cursor-pointer bg-white"
              onClick={() => setOpen((prev) => !prev)}
            >
              {memberType ? memberType : "-- Choose Member Type --"}
            </div>

            {/* Dropdown */}
            {open && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-20 shadow-lg">

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search member type..."
                  className="border-b p-2 w-full text-sm outline-none"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                {/* Options */}
                <div className="max-h-40 overflow-y-auto">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((opt) => (
                      <div
                        key={opt}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setMemberType(opt);
                          setOpen(false);
                          setSearchText(""); // clear search
                        }}
                      >
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-400">No match found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="flex flex-col h-full justify-end">
            <button
              type="button"
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={fetchUsers}
            >
              Search
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={users}
            pagination
            highlightOnHover
            striped
            customStyles={customStyles}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            expandOnRowClicked
            expandableRowDisabled={row => {
              const totalUnits = (row.sites || []).reduce((sum, site) => sum + (site.units?.length || 0), 0);
              return totalUnits === 0;
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default UserSetupTree;






// import { useEffect, useState } from "react";
// import { PiPlusCircle } from "react-icons/pi";
// import Navbar from "../../components/Navbar";
// import DataTable from "react-data-table-component";
// import { getSetupUsers, getSetupUsersByMemberType, getUserCount } from "../../api";
// import { Link } from "react-router-dom";
// import { BsEye } from "react-icons/bs";
// import { BiEdit } from "react-icons/bi";
// import { DNA } from "react-loader-spinner";
// import { RiEyeLine } from "react-icons/ri";
// import {
//   getFloors,
//   getSites,
//   getUnits,
//   getBuildings,
//   postSetupUsers,
//   getSetupUsersByFloor,
//   getSetupUsersByBuilding,
//   getSetupUsersByUnit,
// } from "../../api";
// import { getItemInLocalStorage } from "../../utils/localStorage";

// const UserSetupTree = () => {
//   const siteId = getItemInLocalStorage("SITEID");
//   const [sites, setSites] = useState([]);
//   const [units, setUnits] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [filteredBuildings, setFilteredBuildings] = useState([]);
//   const [filtteredFloors, setFilteredFloors] = useState([]);
//   const [selectedBuilding, setSelectedBuilding] = useState(null);
//   const [floors, setFloors] = useState([]);
//   const [selectedFloorId, setSelectedFloorId] = useState("");
//   const [selectedUnitId, setSelectedUnitId] = useState("");
//   const[memberType, setMemberType]= useState("");
//   const [searchText, setSearchText] = useState("");

// const filteredOptions = memberOptions.filter((opt) =>
//   opt.toLowerCase().includes(searchText.toLowerCase())
// );

//   const [filters, setFilters] = useState({
//     tower: "",
//     floor: "",
//     unit: "",
//   });

//   // const [formData, setFormData] = useState({
//   //   firstname: "",
//   //   lastname: "",
//   //   email: "",
//   //   password: "",
//   //   mobile: "",
//   //   userType: "unit_resident",
//   //   site_ids: [siteId],
//   //   user_sites: [
//   //     {
//   //       unit_id: "",
//   //       site_id: siteId,
//   //       ownership: "",
//   //       ownership_type: "",
//   //       is_approved: true,
//   //       lives_here: "",
//   //     },
//   //   ],
//   //   occupancy_type: "",
//   //   lease_expiry: "",
//   // });

//   // const [userList, setUserList] = useState([
//   //   {
//   //     firstName: "Anurag",
//   //     lastName: "Sharma",
//   //     email: "anuragsharma@example.com",
//   //     mobile: "9876543210",
//   //     userType: "Primary",
//   //   },
//   //   // Add more users
//   // ]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [sitesResp, buildingResp, unitsResp] = await Promise.all([
//           getSites(),
//           getBuildings(),
//           // const floors = getFloors(selectedBuilding),
//         ]);
//         setSites(
//           sitesResp.data.map((site) => ({
//             value: site.id,
//             label: site.name,
//           }))
//         );
//         setFilteredBuildings(buildingResp.data);
//         // setUnits(unitsResp.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       if (selectedBuilding && memberType != "") {
//         const user = await getSetupUsersByMemberType("users", selectedBuilding, memberType);
//         setUsers(user.data);
//       }
//       else if ( selectedBuilding && selectedFloorId && selectedUnitId != ""
//       ) {
//         const user = await getSetupUsersByUnit("users", selectedUnitId);
//         setUsers(user.data);
//       } else if (selectedBuilding && selectedFloorId != "") {
//         const userbyfloor = await getSetupUsersByFloor(
//           "users",
//           selectedFloorId
//         );
//         setUsers(userbyfloor.data);
//         setSelectedUnitId("");
//       } else if (selectedBuilding) {
//         const userbybuilding = await getSetupUsersByBuilding(
//           "users",
//           selectedBuilding
//         );
//         setUsers(userbybuilding.data);
//         setSelectedFloorId("");
//         setSelectedUnitId("");
//       }
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   console.log("The building id & member type is", selectedBuilding, memberType)
//   console.log("The unit id selected is", selectedUnitId);
//   console.log(
//     "The selected building and floor",
//     selectedBuilding,
//     selectedFloorId
//   );
//   console.log("Users:", users);

//   const handleFilterChange = (field, value) => {
//     setFilters((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSearchClick = async () => {
//     try {
//       fetchUsers();
//     } catch (error) {
//       // assuming this feeds your DataTable
//       console.error("Error fetching users:", error);
//       setUserData([]);
//     }
//   };

//   const handleViewUser = (user) => {
//     // Show user details or navigate
//   };

//   const columns = [
//     {
//       name: "View",
//       cell: (row) => (
//         <div className="flex item-center gap-2">
//           <Link to={`/setup/users-tree/${row.id}`}>
//             <BsEye size={15} />
//           </Link>
//           <Link to={`bookings/edit_bookings/${row.id}`}>
//                 <BiEdit size={15} />
//               </Link>
//         </div>
//       ),
//     },
//     {
//       name: "Name",
//       selector: (row) => row.good_name,
//       sortable: true,
//     },
//     {
//       name: "Mobile",
//       selector: (row) => row.mobile,
//       sortable: true,
//     },
//     {
//       name: "Building",
//       selector: (row) => row.building_name,
//       sortable: true,
//     },
//     {
//       name: "Floor",
//       selector: (row) => row.floor_name,
//       sortable: true,
//     },
//     // {
//     //   name: "Email",
//     //   selector: (row) => row.email,
//     //   sortable: true,
//     // },
//     // {
//     //   name: "Mobile",
//     //   selector: (row) => row.mobile,
//     //   sortable: true,
//     // },
//     // {
//     //   name: "Type of User",
//     //   selector: (row) => row.userType,
//     //   sortable: true,
//     // },
//   ];

//   const customStyles = {
//     headRow: {
//       style: {
//         background: "rgb(17, 24, 39)",
//         color: "white",
//         fontSize: "10px",
//       },
//     },
//     headCells: {
//       style: {
//         textTransform: "uppercase",
//       },
//     },
//     cells: {
//       style: {
//         // fontWeight: "bold",
//         fontSize: "14px",
//       },
//     },
//   };

//   return (
//     <section className="flex">
//       <Navbar />
//       <div className="w-full flex mx-10 flex-col gap-4 overflow-hidden mb-5">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center mt-5">
//           User Tree View
//         </h2>

//         {/* Dropdown Filters */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end mt-6">
//           {/* Tower Selection */}
//           <div className="flex flex-col">
//             <label className="font-semibold">
//               Tower: <span style={{ color: "red" }}>*</span>
//             </label>
//             <select
//               className="border p-2 px-4 border-gray-300 rounded rounded-md placeholder:text-sm"
//               value={selectedBuilding}
//               onChange={async (e) => {
//                 const buildingId = e.target.value;
//                 setSelectedBuilding(buildingId);

//                 // Reset dependent dropdowns
//                 setSelectedFloorId("");
//                 setSelectedUnitId("");
//                 setFloors([]);
//                 setUnits([]);

//                 if (buildingId) {
//                   try {
//                     const response = await getFloors(buildingId);
//                     setFloors(response.data);
//                   } catch (error) {
//                     console.error("Error fetching floors:", error);
//                   }
//                 }
//               }}
//             >
//               <option value="">-- Choose Building --</option>
//               {filteredBuildings.map((building) => (
//                 <option key={building.id} value={building.id}>
//                   {building.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Floor Selection */}
//           <div className="flex flex-col">
//             <label className="font-semibold">
//               Floor: <span style={{ color: "red" }}>*</span>
//             </label>
//             <select
//               className="border p-2 px-4 border-gray-300 rounded rounded-md placeholder:text-sm"
//               value={selectedFloorId}
//               onChange={async (e) => {
//                 const floorId = e.target.value;
//                 setSelectedFloorId(floorId);
//                 setSelectedUnitId(""); // reset unit selection

//                 if (floorId) {
//                   try {
//                     const response = await getUnits(floorId);
//                     setUnits(response.data);
//                   } catch (error) {
//                     console.error("Error fetching units:", error);
//                     setUnits([]);
//                   }
//                 } else {
//                   setUnits([]);
//                 }
//               }}
//             >
//               <option value="">-- Choose Floor --</option>
//               {floors.map((floor) => (
//                 <option key={floor.id} value={floor.id}>
//                   {floor.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Unit Selection */}
//           <div className="flex flex-col">
//             <label className="font-semibold">
//               Units:
//               {/* <span style={{ color: "red" }}>*</span> */}
//             </label>
//             <select
//               className="border p-2 px-4 border-gray-300 rounded rounded-md placeholder:text-sm"
//               value={selectedUnitId}
//               onChange={(e) => setSelectedUnitId(e.target.value)}
//             >
//               <option value="">-- Choose Unit --</option>
//               {units.map((unit) => (
//                 <option key={unit.id} value={unit.id}>
//                   {unit.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Member Type Selection */}
//           {/* <div className="flex flex-col">
//             <label className="font-semibold">
//               Member Type:
//               // <span style={{ color: "red" }}>*</span> 
//             </label>
//             <select
//               className="border p-2 px-4 border-gray-300 rounded rounded-md placeholder:text-sm"
//               value={memberType}
//               onChange={(e) => setMemberType(e.target.value)}
//             >
//               <option value="">-- Choose Member Type --</option>
//               <option value="owner">Owner</option>
//               <option value="tenant">Tenant</option>
//             </select>
//           </div> */}

//           <div className="flex flex-col">
//   <label className="font-semibold">Member Type:</label>

//   {/* 🔎 Search Input */}
//   <input
//     type="text"
//     placeholder="Search member type..."
//     className="border p-2 px-4 mb-2 rounded-md text-sm"
//     value={searchText}
//     onChange={(e) => setSearchText(e.target.value)}
//   />

//   {/* Dropdown */}
//   <select
//     className="border p-2 px-4 border-gray-300 rounded-md placeholder:text-sm"
//     value={memberType}
//     onChange={(e) => setMemberType(e.target.value)}
//   >
//     <option value="">-- Choose Member Type --</option>

//     {filteredOptions.length > 0 ? (
//       filteredOptions.map((option) => (
//         <option key={option} value={option}>
//           {option.charAt(0).toUpperCase() + option.slice(1)}
//         </option>
//       ))
//     ) : (
//       <option disabled>No match found</option>
//     )}
//   </select>
// </div>


//           {/* Search Button */}
//           <div className="flex flex-col h-full justify-end">
//             <button
//               type="button"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               onClick={handleSearchClick}
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {/* 📊 User Table */}
//         <div className="overflow-x-auto">
//           <DataTable
//             columns={columns}
//             data={users}
//             pagination
//             highlightOnHover
//             striped
//             customStyles={customStyles}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UserSetupTree;


