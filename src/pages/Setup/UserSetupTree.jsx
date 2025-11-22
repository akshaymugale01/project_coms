import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

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

  // Building dropdown state
  const [openBuilding, setOpenBuilding] = useState(false);
  const [searchBuilding, setSearchBuilding] = useState("");
  const [highlightBuildingIndex, setHighlightBuildingIndex] = useState(-1);

  // Floor dropdown state
  const [openFloor, setOpenFloor] = useState(false);
  const [searchFloor, setSearchFloor] = useState("");
  const [highlightFloorIndex, setHighlightFloorIndex] = useState(-1);

  // Unit dropdown state
  const [openUnit, setOpenUnit] = useState(false);
  const [searchUnit, setSearchUnit] = useState("");
  const [highlightUnitIndex, setHighlightUnitIndex] = useState(-1);

  // Member type dropdown state
  const [openMember, setOpenMember] = useState(false);
  const [searchMember, setSearchMember] = useState("");
  const [highlightMemberIndex, setHighlightMemberIndex] = useState(-1);

  // Search button disabled state if needed etc.
  const [searchText, setSearchText] = useState("");

  const filteredMemberOptions = memberOptions.filter((opt) =>
    opt.toLowerCase().includes(searchMember.toLowerCase())
  );

  // refs for scrolling highlighted items into view
  const buildingListRef = useRef(null);
  const floorListRef = useRef(null);
  const unitListRef = useRef(null);
  const memberListRef = useRef(null);

  // top-level container ref to detect outside clicks
  const containerRef = useRef(null);

  // Fetch buildings + sites on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sitesResp, buildingResp] = await Promise.all([getSites(), getBuildings()]);

        setSites(
          sitesResp.data.map((site) => ({
            value: site.id,
            label: site.name,
          }))
        );

        setFilteredBuildings(buildingResp.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeAllDropdowns();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAllDropdowns = () => {
    setOpenBuilding(false);
    setOpenFloor(false);
    setOpenUnit(false);
    setOpenMember(false);

    setHighlightBuildingIndex(-1);
    setHighlightFloorIndex(-1);
    setHighlightUnitIndex(-1);
    setHighlightMemberIndex(-1);
  };

  // Utility: ensure highlighted item is visible by scrolling the list container
  const scrollToHighlighted = (listRef, index) => {
    try {
      if (!listRef.current) return;
      const container = listRef.current;
      const child = container.children[index];
      if (child) {
        const containerTop = container.scrollTop;
        const containerBottom = containerTop + container.clientHeight;
        const childTop = child.offsetTop;
        const childBottom = childTop + child.clientHeight;
        if (childTop < containerTop) container.scrollTop = childTop;
        else if (childBottom > containerBottom) container.scrollTop = childBottom - container.clientHeight;
      }
    } catch (err) {
      // ignore
    }
  };

  // Keyboard handlers for each dropdown. Called onKeyDown when dropdown open.
  const handleBuildingKeyDown = (e) => {
    const list = filteredBuildings.filter((b) =>
      b.name.toLowerCase().includes(searchBuilding.toLowerCase())
    );
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightBuildingIndex((prev) => {
        const nxt = prev < list.length - 1 ? prev + 1 : 0;
        setTimeout(() => scrollToHighlighted(buildingListRef, nxt), 0);
        return nxt;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightBuildingIndex((prev) => {
        const nxt = prev > 0 ? prev - 1 : Math.max(list.length - 1, 0);
        setTimeout(() => scrollToHighlighted(buildingListRef, nxt), 0);
        return nxt;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightBuildingIndex >= 0 && list[highlightBuildingIndex]) selectBuilding(list[highlightBuildingIndex]);
    } else if (e.key === "Escape") {
      setOpenBuilding(false);
      setHighlightBuildingIndex(-1);
    }
  };

  const handleFloorKeyDown = (e) => {
    const list = floors.filter((f) => f.name.toLowerCase().includes(searchFloor.toLowerCase()));
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightFloorIndex((prev) => {
        const nxt = prev < list.length - 1 ? prev + 1 : 0;
        setTimeout(() => scrollToHighlighted(floorListRef, nxt), 0);
        return nxt;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightFloorIndex((prev) => {
        const nxt = prev > 0 ? prev - 1 : Math.max(list.length - 1, 0);
        setTimeout(() => scrollToHighlighted(floorListRef, nxt), 0);
        return nxt;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightFloorIndex >= 0 && list[highlightFloorIndex]) selectFloor(list[highlightFloorIndex]);
    } else if (e.key === "Escape") {
      setOpenFloor(false);
      setHighlightFloorIndex(-1);
    }
  };

  const handleUnitKeyDown = (e) => {
    const list = units.filter((u) => u.name.toLowerCase().includes(searchUnit.toLowerCase()));
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightUnitIndex((prev) => {
        const nxt = prev < list.length - 1 ? prev + 1 : 0;
        setTimeout(() => scrollToHighlighted(unitListRef, nxt), 0);
        return nxt;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightUnitIndex((prev) => {
        const nxt = prev > 0 ? prev - 1 : Math.max(list.length - 1, 0);
        setTimeout(() => scrollToHighlighted(unitListRef, nxt), 0);
        return nxt;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightUnitIndex >= 0 && list[highlightUnitIndex]) selectUnit(list[highlightUnitIndex]);
    } else if (e.key === "Escape") {
      setOpenUnit(false);
      setHighlightUnitIndex(-1);
    }
  };

  const handleMemberKeyDown = (e) => {
    const list = filteredMemberOptions;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightMemberIndex((prev) => {
        const nxt = prev < list.length - 1 ? prev + 1 : 0;
        setTimeout(() => scrollToHighlighted(memberListRef, nxt), 0);
        return nxt;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightMemberIndex((prev) => {
        const nxt = prev > 0 ? prev - 1 : Math.max(list.length - 1, 0);
        setTimeout(() => scrollToHighlighted(memberListRef, nxt), 0);
        return nxt;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightMemberIndex >= 0 && list[highlightMemberIndex]) selectMember(list[highlightMemberIndex]);
    } else if (e.key === "Escape") {
      setOpenMember(false);
      setHighlightMemberIndex(-1);
    }
  };

  // Selectors (they also fetch dependent lists)
  const selectBuilding = async (building) => {
    setSelectedBuilding(building.id);
    setOpenBuilding(false);
    setSearchBuilding("");
    setHighlightBuildingIndex(-1);

    // reset dependents
    setSelectedFloorId("");
    setSelectedUnitId("");
    setFloors([]);
    setUnits([]);

    try {
      const response = await getFloors(building.id);
      setFloors(response.data || []);
    } catch (error) {
      console.error("Error fetching floors:", error);
    }
  };

  const selectFloor = async (floor) => {
    setSelectedFloorId(floor.id);
    setOpenFloor(false);
    setSearchFloor("");
    setHighlightFloorIndex(-1);

    // reset units
    setSelectedUnitId("");
    setUnits([]);

    try {
      const response = await getUnits(floor.id);
      setUnits(response.data || []);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  const selectUnit = (unit) => {
    setSelectedUnitId(unit.id);
    setOpenUnit(false);
    setSearchUnit("");
    setHighlightUnitIndex(-1);
  };

  const selectMember = (opt) => {
    setMemberType(opt);
    setOpenMember(false);
    setSearchMember("");
    setHighlightMemberIndex(-1);
  };

  // MAIN SEARCH HANDLER (kept your logic)
  const fetchUsers = async () => {
    try {
      // 1️⃣ If Member Type selected → priority filter
      if (selectedBuilding && memberType !== "") {
        const res = await getSetupUsersByMemberType("users", selectedBuilding, memberType);
        setUsers(res.data);
        return;
      }

      // 2️⃣ Building → Floor → Unit
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

  // Table columns / styles (kept from your original)
  const columns = [
    {
      name: "View",
      cell: (row) => (
        <div className="flex item-center gap-2">
          <Link to={`/setup/users-tree/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/setup/users-edit-page/${row.id}`}>
            <BiEdit size={15} />
          </Link>
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
        fontSize: "14px",
      },
    },
  };

  return (
    <section className="flex" ref={containerRef}>
      <Navbar />

      <div className="w-full flex mx-10 flex-col gap-4 overflow-hidden mb-5">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-5">User Tree View</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end mt-6">

          {/* Building */}
          <div
            className="flex flex-col w-full relative"
            // allow keyboard focus on the wrapper so it can listen to keydown when dropdown is open
            tabIndex={0}
            onKeyDown={(e) => {
              if (openBuilding) handleBuildingKeyDown(e);
            }}
          >
            <label className="font-semibold mb-1">Building *</label>

            <div
              className="border p-2 px-4 rounded-md cursor-pointer bg-white"
              onClick={() => {
                setOpenBuilding((prev) => !prev);
                setOpenFloor(false);
                setOpenUnit(false);
                setOpenMember(false);
                setHighlightBuildingIndex(-1);
                // focus will be on input due to autoFocus
              }}
            >
              {selectedBuilding ? filteredBuildings.find((b) => b.id == selectedBuilding)?.name : "-- Choose Building --"}
            </div>

            {openBuilding && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-20 shadow-lg">
                <input
                  type="text"
                  placeholder="Search building..."
                  className="border-b p-2 w-full text-sm outline-none"
                  value={searchBuilding}
                  autoFocus
                  onChange={(e) => {
                    setSearchBuilding(e.target.value);
                    setHighlightBuildingIndex(-1);
                  }}
                />

                <div className="max-h-40 overflow-y-auto" ref={buildingListRef}>
                  {filteredBuildings
                    .filter((building) => building.name.toLowerCase().includes(searchBuilding.toLowerCase()))
                    .map((building, index) => (
                      <div
                        key={building.id}
                        className={`p-2 cursor-pointer ${
                          highlightBuildingIndex === index ? "bg-gray-200" : "hover:bg-gray-100"
                        }`}
                        onMouseEnter={() => setHighlightBuildingIndex(index)}
                        onClick={async () => selectBuilding(building)}
                      >
                        {building.name}
                      </div>
                    ))}

                  {filteredBuildings.filter((b) => b.name.toLowerCase().includes(searchBuilding.toLowerCase()))
                    .length === 0 && <div className="p-2 text-gray-400">No match found</div>}
                </div>
              </div>
            )}
          </div>

          {/* Floor */}
          <div
            className="flex flex-col w-full relative"
            tabIndex={0}
            onKeyDown={(e) => {
              if (openFloor) handleFloorKeyDown(e);
            }}
          >
            <label className="font-semibold mb-1">Floor *</label>

            <div
              className="border p-2 px-4 rounded-md cursor-pointer bg-white"
              onClick={() => {
                setOpenFloor((prev) => !prev);
                setOpenBuilding(false);
                setOpenUnit(false);
                setOpenMember(false);
                setHighlightFloorIndex(-1);
              }}
            >
              {selectedFloorId ? floors.find((f) => f.id == selectedFloorId)?.name : "-- Choose Floor --"}
            </div>

            {openFloor && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-20 shadow-lg">
                <input
                  type="text"
                  placeholder="Search floor..."
                  className="border-b p-2 w-full text-sm outline-none"
                  value={searchFloor}
                  autoFocus
                  onChange={(e) => {
                    setSearchFloor(e.target.value);
                    setHighlightFloorIndex(-1);
                  }}
                />

                <div className="max-h-40 overflow-y-auto" ref={floorListRef}>
                  {floors
                    .filter((floor) => floor.name.toLowerCase().includes(searchFloor.toLowerCase()))
                    .map((floor, index) => (
                      <div
                        key={floor.id}
                        className={`p-2 cursor-pointer ${highlightFloorIndex === index ? "bg-gray-200" : "hover:bg-gray-100"}`}
                        onMouseEnter={() => setHighlightFloorIndex(index)}
                        onClick={async () => selectFloor(floor)}
                      >
                        {floor.name}
                      </div>
                    ))}

                  {floors.filter((floor) => floor.name.toLowerCase().includes(searchFloor.toLowerCase())).length === 0 && (
                    <div className="p-2 text-gray-400">No match found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Unit */}
          <div
            className="flex flex-col w-full relative"
            tabIndex={0}
            onKeyDown={(e) => {
              if (openUnit) handleUnitKeyDown(e);
            }}
          >
            <label className="font-semibold mb-1">Unit</label>

            <div
              className="border p-2 px-4 rounded-md cursor-pointer bg-white"
              onClick={() => {
                setOpenUnit((prev) => !prev);
                setOpenBuilding(false);
                setOpenFloor(false);
                setOpenMember(false);
                setHighlightUnitIndex(-1);
              }}
            >
              {selectedUnitId ? units.find((u) => u.id == selectedUnitId)?.name : "-- Choose Unit --"}
            </div>

            {openUnit && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-20 shadow-lg">
                <input
                  type="text"
                  placeholder="Search unit..."
                  className="border-b p-2 w-full text-sm outline-none"
                  value={searchUnit}
                  autoFocus
                  onChange={(e) => {
                    setSearchUnit(e.target.value);
                    setHighlightUnitIndex(-1);
                  }}
                />

                <div className="max-h-40 overflow-y-auto" ref={unitListRef}>
                  {units
                    .filter((unit) => unit.name.toLowerCase().includes(searchUnit.toLowerCase()))
                    .map((unit, index) => (
                      <div
                        key={unit.id}
                        className={`p-2 cursor-pointer ${highlightUnitIndex === index ? "bg-gray-200" : "hover:bg-gray-100"}`}
                        onMouseEnter={() => setHighlightUnitIndex(index)}
                        onClick={() => selectUnit(unit)}
                      >
                        {unit.name}
                      </div>
                    ))}

                  {units.filter((unit) => unit.name.toLowerCase().includes(searchUnit.toLowerCase())).length === 0 && (
                    <div className="p-2 text-gray-400">No match found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Member Type */}
          <div
            className="flex flex-col w-full relative"
            tabIndex={0}
            onKeyDown={(e) => {
              if (openMember) handleMemberKeyDown(e);
            }}
          >
            <label className="font-semibold mb-1">Member Type:</label>

            <div
              className="border p-2 px-4 rounded-md cursor-pointer bg-white"
              onClick={() => {
                setOpenMember((prev) => !prev);
                setOpenBuilding(false);
                setOpenFloor(false);
                setOpenUnit(false);
                setHighlightMemberIndex(-1);
              }}
            >
              {memberType ? memberType : "-- Choose Member Type --"}
            </div>

            {openMember && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-20 shadow-lg">
                <input
                  type="text"
                  placeholder="Search member type..."
                  className="border-b p-2 w-full text-sm outline-none"
                  value={searchMember}
                  autoFocus
                  onChange={(e) => {
                    setSearchMember(e.target.value);
                    setHighlightMemberIndex(-1);
                  }}
                />

                <div className="max-h-40 overflow-y-auto" ref={memberListRef}>
                  {filteredMemberOptions.length > 0 ? (
                    filteredMemberOptions.map((opt, index) => (
                      <div
                        key={opt}
                        className={`p-2 cursor-pointer ${highlightMemberIndex === index ? "bg-gray-200" : "hover:bg-gray-100"}`}
                        onMouseEnter={() => setHighlightMemberIndex(index)}
                        onClick={() => selectMember(opt)}
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
            <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={fetchUsers}>
              Search
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={users} pagination highlightOnHover striped customStyles={customStyles} />
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


