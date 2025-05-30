import React, { useState, useEffect } from "react";
import axios from "axios";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { getFloors, postParkingConfiguration } from "../../../api";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar";
import toast from "react-hot-toast";

const ParkingConfig = () => {
  const [editIndex, setEditIndex] = useState(null); // Tracks which item is being edited
  const [editName, setEditName] = useState(""); // Tracks the current editable name
  const handleBlur = () => {
    setEditIndex(null);
    setEditName("");
  };

  const handleEditStart = (index, currentName, type) => {
    setEditIndex(`${type}-${index}`); // Combine type and index for a unique identifier
    setEditName(currentName); // Populate input with the current name
  };

  const handleEditSave = (type, vehicleType, index, isStack = false) => {
    if (!editName.trim()) {
      alert("Name cannot be empty.");
      return;
    }

    let updatedList;
    if (type === "Non Stack" && vehicleType === "2-wheeler") {
      updatedList = [...twoWheelerNonStack];
      updatedList[index].name = editName; // Update the name
      setTwoWheelerNonStack(updatedList); // Update the state
    } else if (type === "Reserved" && vehicleType === "2-wheeler") {
      updatedList = [...twoWheelerReserved];
      updatedList[index].name = editName;
      setTwoWheelerReserved(updatedList);
    } else if (type === "Non Stack" && vehicleType === "4-wheeler") {
      updatedList = [...fourWheelerNonStack];
      updatedList[index].name = editName; // Update name
      setFourWheelerNonStack(updatedList); // Update state
    } else if (type === "Stack" && vehicleType === "4-wheeler" && isStack) {
      updatedList = [...fourWheelerStack];
      updatedList[index].name = editName; // Update name in the array
      setFourWheelerStack(updatedList); // Update the state
    } else if (type === "Reserved" && vehicleType === "4-wheeler") {
      updatedList = [...fourWheelerReserved];
      updatedList[index].name = editName; // Update name
      setFourWheelerReserved(updatedList); // Update state
    }
    // Add conditions for 4-wheelers or stack parking if needed

    setEditIndex(null); // Exit edit mode
    setEditName(""); // Clear the input
  };

  const [location, setLocation] = useState(null);
  const [floor, setFloor] = useState(null);
  const [floors, setFloors] = useState([]);
  const userId = getItemInLocalStorage("UserId");
  const buildings = getItemInLocalStorage("Building");
  const themeColor = useSelector((state) => state.theme.color);
  const [twoWheelerNonStackInput, setTwoWheelerNonStackInput] = useState("");
  const [twoWheelerReservedInput, setTwoWheelerReservedInput] = useState("");
  const [fourWheelerNonStackInput, setFourWheelerNonStackInput] = useState("");
  const [fourWheelerReservedInput, setFourWheelerReservedInput] = useState("");
  const [fourWheelerStackInput, setFourWheelerStackInput] = useState("");
  const handleChange = async (e) => {
    async function fetchFloor(floorID) {
      try {
        const build = await getFloors(floorID);
        setFloors(build.data.map((item) => ({ name: item.name, id: item.id })));
      } catch (e) {
        console.log(e);
      }
    }

    if (e.target.type === "select-one" && e.target.name === "building_id") {
      const BuildID = Number(e.target.value);
      await fetchFloor(BuildID);

      setLocation(BuildID);
    }
  };
  // State for parking configurations
  const [twoWheelerNonStack, setTwoWheelerNonStack] = useState([]);
  const [twoWheelerReserved, setTwoWheelerReserved] = useState([]);
  const [fourWheelerNonStack, setFourWheelerNonStack] = useState([]);
  const [fourWheelerStack, setFourWheelerStack] = useState([]);
  const [fourWheelerReserved, setFourWheelerReserved] = useState([]);

  const [itemCount, setItemCount] = useState(0);

  // Fetch parking configurations on mount
  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await axios.get("/api/parking-configurations");
        const data = response.data.all_parking;
        console.log(data);

        // Filter data for two-wheeler and four-wheeler parking
        setTwoWheelerNonStack(
          data.filter(
            (item) => item.vehicle_type === "2-wheeler" && !item.is_reserved
          )
        );
        setTwoWheelerReserved(
          data.filter(
            (item) => item.vehicle_type === "2-wheeler" && item.is_reserved
          )
        );
        setFourWheelerNonStack(
          data.filter(
            (item) =>
              item.vehicle_type === "4-wheeler" &&
              !item.is_reserved &&
              !item.stack
          )
        );
        setFourWheelerStack(
          data.filter(
            (item) =>
              item.vehicle_type === "4-wheeler" &&
              !item.is_reserved &&
              item.stack
          )
        );
        setFourWheelerReserved(
          data.filter(
            (item) => item.vehicle_type === "4-wheeler" && item.is_reserved
          )
        );
      } catch (error) {
        console.error("Error fetching parking data:", error);
      }
    };

    fetchParkingData();
  }, []);

  // Add a parking slot
  const addItem = (type, vehicleType, isStack = false, count) => {
    if (!count || count <= 0) {
      alert("Please enter a valid number greater than 0.");
      return;
    }

    if (vehicleType === "2-wheeler") {
      const existingCount =
        twoWheelerNonStack.length + twoWheelerReserved.length;

      const newItems = [];
      for (let i = 0; i < count; i++) {
        const newName = `P${existingCount + i + 1}`;
        const newItem = {
          name: newName,
          building_id: location,
          floor_id: floor,
          vehicle_type: vehicleType,
          is_reserved: type === "Reserved",
          reserved_for_user_id: type === "Reserved" ? userId : null,
        };
        newItems.push(newItem);
      }

      if (type === "Reserved") {
        setTwoWheelerReserved([...twoWheelerReserved, ...newItems]);
      } else {
        setTwoWheelerNonStack([...twoWheelerNonStack, ...newItems]);
      }
    } else if (vehicleType === "4-wheeler") {
      if (isStack) {
        const stackGroup =
          Math.ceil(fourWheelerStack.length / 2) +
          fourWheelerNonStack.length +
          fourWheelerReserved.length +
          1;

        const newItems = [];
        for (let i = 0; i < count; i++) {
          const letterA = String.fromCharCode(65); // 'A'
          const letterB = String.fromCharCode(66); // 'B'

          const itemA = {
            name: `P${stackGroup + i}${letterA}`,
            building_id: location,
            floor_id: floor,
            vehicle_type: vehicleType,
            is_reserved: false,
            reserved_for_user_id: null,
          };

          const itemB = {
            name: `P${stackGroup + i}${letterB}`,
            building_id: location,
            floor_id: floor,
            vehicle_type: vehicleType,
            is_reserved: false,
            reserved_for_user_id: null,
          };

          newItems.push(itemA, itemB);
        }
        setFourWheelerStack([...fourWheelerStack, ...newItems]);
      } else {
        const existingCount =
          fourWheelerNonStack.length +
          fourWheelerReserved.length +
          Math.ceil(fourWheelerStack.length / 2);

        const newItems = [];
        for (let i = 0; i < count; i++) {
          const newName = `P${existingCount + i + 1}`;
          const newItem = {
            name: newName,
            building_id: location,
            floor_id: floor,
            vehicle_type: vehicleType,
            is_reserved: type === "Reserved",
            reserved_for_user_id: type === "Reserved" ? userId : null,
          };
          newItems.push(newItem);
        }

        if (type === "Reserved") {
          setFourWheelerReserved([...fourWheelerReserved, ...newItems]);
        } else {
          setFourWheelerNonStack([...fourWheelerNonStack, ...newItems]);
        }
      }
    }
  };

  // Delete a parking slot
  const deleteItem = (type, vehicleType, index, isStack = false) => {
    if (vehicleType === "2-wheeler") {
      if (type === "Reserved") {
        const updated = [...twoWheelerReserved];
        updated.splice(index, 1);
        setTwoWheelerReserved(updated);
      } else {
        const updated = [...twoWheelerNonStack];
        updated.splice(index, 1);
        setTwoWheelerNonStack(updated);
      }
    } else if (vehicleType === "4-wheeler") {
      if (type === "Reserved") {
        const updated = [...fourWheelerReserved];
        updated.splice(index, 1);
        setFourWheelerReserved(updated);
      } else if (isStack) {
        const updated = [...fourWheelerStack];
        updated.splice(index, 1);
        setFourWheelerStack(updated);
      } else {
        const updated = [...fourWheelerNonStack];
        updated.splice(index, 1);
        setFourWheelerNonStack(updated);
      }
    }
  };

  // Save parking configurations to the backend
  const saveParkingConfig = async () => {
    const allParking = [
      ...twoWheelerNonStack,
      ...twoWheelerReserved,
      ...fourWheelerNonStack,
      ...fourWheelerStack,
      ...fourWheelerReserved,
    ];
    try {
      const response = await postParkingConfiguration({
        all_parking: allParking,
      });
      toast.success("Parking configurations saved successfully!");
    } catch (error) {
      console.error("Error saving parking configurations:", error);
      // alert("Failed to save parking configurations.");
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="border border-gray-300 rounded-lg w-full md:mx-20 px-8 flex flex-col my-2 gap-5">
        {/* <h1 className="text-xl font-bold mb-4">Parking Group Configuration</h1> */}
        <h2
          style={{ background: themeColor }}
          className="text-center md:text-xl font-bold p-2 my-2 bg-black rounded-md text-white"
        >
          Parking Group Configuration
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="grid gap-2 items-center w-full">
            <label className="font-semibold">Location</label>
            <select
              name="building_id"
              className="border p-1 px-4 border-gray-500 rounded-md"
              value={location}
              onChange={handleChange}
            >
              <option value="">Select a location</option>
              {buildings?.map((building) => (
                <option value={building.id} key={building.id}>
                  {building.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2 items-center w-full">
            <label className="font-semibold">Floor</label>
            <select
              className="border p-1 px-4 border-gray-500 rounded-md"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            >
              <option value="">Select Floor</option>
              {floors?.map((floor) => (
                <option value={floor.id} key={floor.id}>
                  {floor.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Two Wheeler</h2>
          <div className="grid md:grid-cols-3 gap-2">
            <div>
              <h3 className="mb-2 font-semibold">Non Stack Parking</h3>
              <div className="w-[310px] h-[200px] border border-black">
                <div className="p-4">
                  <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-[280px] h-[170px] overflow-y-scroll scrollbar-thin">
                    {twoWheelerNonStack.map((item, index) => (
                      <li
                        key={index}
                        className="w-[70px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px] flex items-center justify-center"
                      >
                        <div className="flex items-center">
                          {editIndex === `NonStack-${index}` ? (
                            <div className="flex items-center">
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onBlur={() =>
                                  handleEditSave(
                                    "Non Stack",
                                    "2-wheeler",
                                    index
                                  )
                                }
                                className="border px-1 py-0.5 rounded text-sm w-[40px] mr-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                              <button
                                onClick={() =>
                                  handleEditSave(
                                    "Non Stack",
                                    "2-wheeler",
                                    index
                                  )
                                }
                                className="text-green-500 text-sm ml-1 hover:text-green-700"
                              >
                                ✔
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 w-full px-1">
                              <span
                                onClick={() =>
                                  handleEditStart(index, item.name, "NonStack")
                                }
                                className="cursor-pointer text-gray-800 hover:text-blue-500 text-sm truncate"
                              >
                                {item.name}
                              </span>
                              <button
                                onClick={() =>
                                  deleteItem("Non Stack", "2-wheeler", index)
                                }
                                className="text-red-800 text-sm hover:text-red-600"
                              >
                                X
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <input
                  type="number"
                  value={twoWheelerNonStackInput}
                  onChange={(e) => setTwoWheelerNonStackInput(e.target.value)}
                  placeholder="Enter "
                  className="border border-gray-400 px-4 py-2 rounded w-32"
                />
                <button
                  onClick={() =>
                    addItem(
                      "Non Stack",
                      "2-wheeler",
                      false,
                      parseInt(twoWheelerNonStackInput)
                    )
                  }
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
                <input
                  type="number"
                  value={twoWheelerNonStack.length}
                  readOnly
                  className="mb-4 bg-white border border-gray-400 w-24  ml-2 px-4 py-2 rounded"
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Reserved Parking</h3>
              <div className="w-[310px] h-[200px] border border-black">
                <div className="p-4">
                  <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-[280px] h-[170px] overflow-y-scroll scrollbar-thin">
                    {twoWheelerReserved.map((item, index) => (
                      <li
                        key={index}
                        className="w-[70px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px] flex items-center justify-center"
                      >
                        <div className="flex items-center">
                          {editIndex === `Reserved-${index}` ? (
                            <div className="flex items-center">
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="border px-1 py-0.5 rounded text-sm w-[40px] mr-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                              <button
                                onClick={() =>
                                  handleEditSave("Reserved", "2-wheeler", index)
                                }
                                className="text-green-500 text-sm ml-1 hover:text-green-700"
                              >
                                ✔
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 w-full px-1">
                              <span
                                onClick={() =>
                                  handleEditStart(index, item.name, "Reserved")
                                }
                                className="cursor-pointer text-gray-800 hover:text-blue-500 text-sm truncate"
                              >
                                {item.name}
                              </span>
                              <button
                                onClick={() =>
                                  deleteItem("Reserved", "2-wheeler", index)
                                }
                                className="text-red-800 text-sm hover:text-red-600"
                              >
                                X
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <input
                  type="number"
                  value={twoWheelerReservedInput}
                  onChange={(e) => setTwoWheelerReservedInput(e.target.value)}
                  placeholder="Enter "
                  className="border border-gray-400 px-4 py-2 rounded w-32"
                />
                <button
                  onClick={() =>
                    addItem(
                      "Reserved",
                      "2-wheeler",
                      false,
                      parseInt(twoWheelerReservedInput)
                    )
                  }
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
                <input
                  type="number"
                  value={twoWheelerReserved.length}
                  readOnly
                  className="mb-4 bg-white border border-gray-400 w-24  ml-2 px-4 py-2 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Four Wheeler</h2>
          <div className="grid md:grid-cols-3 gap-2">
            <div>
              <h3 className="font-semibold mb-2">Non-Stack Parking</h3>
              <div className="w-[310px] h-[200px] border border-black">
                <div className="p-4">
                  <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-[280px] h-[170px] overflow-y-scroll scrollbar-thin">
                    {fourWheelerNonStack.map((item, index) => (
                      <li
                        key={index}
                        className="w-[70px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px] flex items-center justify-center"
                      >
                        <div className="flex items-center">
                          {editIndex === `FourWheelerNonStack-${index}` ? (
                            <div className="flex items-center">
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onBlur={() =>
                                  handleEditSave(
                                    "Non Stack",
                                    "4-wheeler",
                                    index
                                  )
                                }
                                className="border px-1 py-0.5 rounded text-sm w-[40px] mr-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                              <button
                                onClick={() =>
                                  handleEditSave(
                                    "Non Stack",
                                    "4-wheeler",
                                    index
                                  )
                                }
                                className="text-green-500 text-sm ml-1 hover:text-green-700"
                              >
                                ✔
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 w-full px-1">
                              <span
                                onClick={() =>
                                  handleEditStart(
                                    index,
                                    item.name,
                                    "FourWheelerNonStack"
                                  )
                                }
                                className="cursor-pointer text-gray-800 hover:text-blue-500 text-sm truncate"
                              >
                                {item.name}
                              </span>
                              <button
                                onClick={() =>
                                  deleteItem("Non Stack", "4-wheeler", index)
                                }
                                className="text-red-800 text-sm hover:text-red-600"
                              >
                                X
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <input
                  type="number"
                  value={fourWheelerNonStackInput}
                  onChange={(e) => setFourWheelerNonStackInput(e.target.value)}
                  placeholder="Enter"
                  className="border border-gray-400 px-4 py-2 w-32 rounded w-32"
                />
                <button
                  onClick={() =>
                    addItem(
                      "Non Stack",
                      "4-wheeler",
                      false,
                      parseInt(fourWheelerNonStackInput)
                    )
                  }
                  className="ml-2 mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
                <input
                  type="number"
                  value={fourWheelerNonStack.length}
                  readOnly
                  className="mb-4 bg-white border border-gray-400 w-24 ml-2 px-4 py-2 rounded"
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Stack Parking</h3>
              <div className="w-[310px] h-[200px] border border-black">
                <div className="p-4">
                  <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-[280px] h-[170px] overflow-y-scroll scrollbar-thin">
                    {fourWheelerStack.map((item, index) => (
                      <li
                        key={index}
                        className="w-[70px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px] flex items-center justify-center"
                      >
                        <div className="flex items-center">
                          {editIndex === `FourWheelerStack-${index}` ? (
                            <div className="flex items-center">
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onBlur={() =>
                                  handleEditSave(
                                    "Stack",
                                    "4-wheeler",
                                    index,
                                    true
                                  )
                                }
                                className="border px-1 py-0.5 rounded text-sm w-[40px] mr-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                              <button
                                onClick={() =>
                                  handleEditSave(
                                    "Stack",
                                    "4-wheeler",
                                    index,
                                    true
                                  )
                                }
                                className="text-green-500 text-sm ml-1 hover:text-green-700"
                              >
                                ✔
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 w-full px-1">
                              <span
                                onClick={() =>
                                  handleEditStart(
                                    index,
                                    item.name,
                                    "FourWheelerStack"
                                  )
                                }
                                className="cursor-pointer text-gray-800 hover:text-blue-500 text-sm truncate"
                              >
                                {item.name}
                              </span>
                              <button
                                onClick={() =>
                                  deleteItem("Stack", "4-wheeler", index, true)
                                }
                                className="text-red-800 text-sm hover:text-red-600"
                              >
                                X
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <input
                  type="number"
                  value={fourWheelerStackInput}
                  onChange={(e) => setFourWheelerStackInput(e.target.value)}
                  placeholder="Enter count"
                  className="border border-gray-400 px-4 py-2 rounded w-32"
                />
                <button
                  onClick={() =>
                    addItem(
                      "Stack",
                      "4-wheeler",
                      true,
                      parseInt(fourWheelerStackInput)
                    )
                  }
                  className="mt-2 ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
                <input
                  type="number"
                  value={fourWheelerStack.length}
                  readOnly
                  className="mb-4 bg-white border border-gray-400 w-24 ml-2 px-4 py-2 rounded"
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Reserved Parking</h3>
              {/* <div className="w-[310px] h-[200px] border border-black">
            <div className="p-4">
            <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-[280px] h-[170px] overflow-y-scroll scrollbar-thin">
              {fourWheelerReserved.map((item, index) => (
                <li key={index} className=" w-[50px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px]">
                  <div className="flex gap-2 items-center justify-center">

                  {item.name}
                  <button onClick={() => deleteItem("Reserved", "4-wheeler", index)}><p className="text-red-800">X</p></button>
                  </div>
                </li>
              ))}
            </ul>
            </div>
            </div> */}
              <div className="w-[310px] h-[200px] border border-black">
                <div className="p-4">
                  <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-[280px] h-[170px] overflow-y-scroll scrollbar-thin">
                    {fourWheelerReserved.map((item, index) => (
                      <li
                        key={index}
                        className="w-[70px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px] flex items-center justify-center"
                      >
                        <div className="flex items-center">
                          {editIndex === `FourWheelerReserved-${index}` ? (
                            <div className="flex items-center">
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onBlur={() =>
                                  handleEditSave("Reserved", "4-wheeler", index)
                                }
                                className="border px-1 py-0.5 rounded text-sm w-[40px] mr-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                              <button
                                onClick={() =>
                                  handleEditSave("Reserved", "4-wheeler", index)
                                }
                                className="text-green-500 text-sm ml-1 hover:text-green-700"
                              >
                                ✔
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 w-full px-1">
                              <span
                                onClick={() =>
                                  handleEditStart(
                                    index,
                                    item.name,
                                    "FourWheelerReserved"
                                  )
                                }
                                className="cursor-pointer text-gray-800 hover:text-blue-500 text-sm truncate"
                              >
                                {item.name}
                              </span>
                              <button
                                onClick={() =>
                                  deleteItem("Reserved", "4-wheeler", index)
                                }
                                className="text-red-800 text-sm hover:text-red-600"
                              >
                                X
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="number"
                  value={fourWheelerReservedInput}
                  onChange={(e) => setFourWheelerReservedInput(e.target.value)}
                  placeholder="Enter"
                  className="border border-gray-400 px-4 py-2 rounded w-32"
                />
                <button
                  onClick={() =>
                    addItem(
                      "Reserved",
                      "4-wheeler",
                      false,
                      parseInt(fourWheelerReservedInput)
                    )
                  }
                  className="mt-2 ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
                <input
                  type="number"
                  value={fourWheelerReserved.length}
                  readOnly
                  className="mb-4 bg-white border border-gray-400 w-24 ml-2 px-4 py-2 rounded"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-2">
          <button
            onClick={saveParkingConfig}
            style={{ background: themeColor }}
            className="mt-6 bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParkingConfig;
