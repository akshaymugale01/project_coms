import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FileInputBox from "../../../containers/Inputs/FileInputBox";
import { getBuildings, getFloors } from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";

const AddParkingConfig = () => { 
  const buildings = getItemInLocalStorage("Building");
  const [floors, setFloors] = useState([])
  const themeColor = useSelector((state) => state.theme.color);
  const [formData, setFormData] = useState({
    building_id:"",
    floor_id:""
  })
  const [itemCount, setItemCount] = useState(1);
  // State for Two Wheeler Parking
  const [nonStackItemsTwoWheeler, setNonStackItemsTwoWheeler] = useState([]);
  const [stackItemsTwoWheeler, setStackItemsTwoWheeler] = useState([]);
  const [reservedItemsTwoWheeler, setReservedItemsTwoWheeler] = useState([]);
  const [nonStackCountTwoWheeler, setNonStackCountTwoWheeler] = useState(0);
  const [stackCountTwoWheeler, setStackCountTwoWheeler] = useState(0);
  const [reservedCountTwoWheeler, setReservedCountTwoWheeler] = useState(0);

  // State for Car Parking
  const [nonStackItemsCar, setNonStackItemsCar] = useState([]);
  const [stackItemsCar, setStackItemsCar] = useState([]);
  const [reservedItemsCar, setReservedItemsCar] = useState([]);
  const [nonStackCountCar, setNonStackCountCar] = useState(0);
  const [stackCountCar, setStackCountCar] = useState(0);
  const [reservedCountCar, setReservedCountCar] = useState(0);

  // UseEffect hooks for Two Wheeler Parking
  useEffect(() => {
    setNonStackCountTwoWheeler(nonStackItemsTwoWheeler.length);
    setStackCountTwoWheeler(stackItemsTwoWheeler.length);
    setReservedCountTwoWheeler(reservedItemsTwoWheeler.length);
  }, [nonStackItemsTwoWheeler, stackItemsTwoWheeler, reservedItemsTwoWheeler]);

  // UseEffect hooks for Car Parking
  useEffect(() => {
    setNonStackCountCar(nonStackItemsCar.length);
    setStackCountCar(stackItemsCar.length);
    setReservedCountCar(reservedItemsCar.length);
  }, [nonStackItemsCar, stackItemsCar, reservedItemsCar]);

  const addItem = (parkingArea, vehicleType) => {
    let newItemsWithSuffix = [];
    let nonStackItems, stackItems, reservedItems;

    if (vehicleType === "TwoWheeler") {
      nonStackItems = nonStackItemsTwoWheeler;
      stackItems = stackItemsTwoWheeler;
      reservedItems = reservedItemsTwoWheeler;
    } else {
      nonStackItems = nonStackItemsCar;
      stackItems = stackItemsCar;
      reservedItems = reservedItemsCar;
    }

    for (let i = 0; i < itemCount; i++) {
      const newItem =
        parkingArea === "P" || parkingArea === "p" || parkingArea === "R"
          ? `P${
              nonStackItems.length +
              Math.floor(stackItems.length / 2) +
              1 +
              reservedItems.length +
              i
            }`
          : "";

      if (parkingArea === "p") {
        newItemsWithSuffix.push(`${newItem}A`, `${newItem}B`);
      } else {
        newItemsWithSuffix.push(newItem);
      }
      setItemCount(0);
    }

    switch (parkingArea) {
      case "P":
        vehicleType === "TwoWheeler"
          ? setNonStackItemsTwoWheeler([
              ...nonStackItems,
              ...newItemsWithSuffix,
            ])
          : setNonStackItemsCar([...nonStackItems, ...newItemsWithSuffix]);
        break;
      case "p":
        vehicleType === "TwoWheeler"
          ? setStackItemsTwoWheeler([...stackItems, ...newItemsWithSuffix])
          : setStackItemsCar([...stackItems, ...newItemsWithSuffix]);
        break;
      case "R":
        vehicleType === "TwoWheeler"
          ? setReservedItemsTwoWheeler([
              ...reservedItems,
              ...newItemsWithSuffix,
            ])
          : setReservedItemsCar([...reservedItems, ...newItemsWithSuffix]);
        break;
      default:
        break;
    }
  };

  const deleteItem = (parkingArea, index, vehicleType) => {
    if (vehicleType === "TwoWheeler") {
      switch (parkingArea) {
        case "Non Stack":
          setNonStackItemsTwoWheeler(
            nonStackItemsTwoWheeler.filter((_, i) => i !== index)
          );
          break;
        case "Stack":
          setStackItemsTwoWheeler(
            stackItemsTwoWheeler.filter((_, i) => i !== index)
          );
          break;
        case "Reserved":
          setReservedItemsTwoWheeler(
            reservedItemsTwoWheeler.filter((_, i) => i !== index)
          );
          break;
        default:
          break;
      }
    } else {
      switch (parkingArea) {
        case "Non Stack":
          setNonStackItemsCar(nonStackItemsCar.filter((_, i) => i !== index));
          break;
        case "Stack":
          setStackItemsCar(stackItemsCar.filter((_, i) => i !== index));
          break;
        case "Reserved":
          setReservedItemsCar(reservedItemsCar.filter((_, i) => i !== index));
          break;
        default:
          break;
      }
    }
  };

  const handleItemchange1 = (parkingArea, index, newValue) => {
    switch (parkingArea) {
      case "Non Stack":
        setNonStackItemsTwoWheeler(
          nonStackItemsTwoWheeler.map((item, i) =>
            i === index ? newValue : item
          )
        );
        break;
      case "Stack":
        setStackItemsTwoWheeler(
          stackItemsTwoWheeler.map((item, i) => (i === index ? newValue : item))
        );
        break;
      case "Reserved":
        setReservedItemsTwoWheeler(
          reservedItemsTwoWheeler.map((item, i) =>
            i === index ? newValue : item
          )
        );
        break;
      default:
        break;
    }
  };

  const handleItemchange2 = (parkingArea, index, newValue) => {
    switch (parkingArea) {
      case "Non Stack":
        setNonStackItemsCar(
          nonStackItemsCar.map((item, i) => (i === index ? newValue : item))
        );
        break;
      case "Stack":
        setStackItemsCar(
          stackItemsCar.map((item, i) => (i === index ? newValue : item))
        );
        break;
      case "Reserved":
        setReservedItemsCar(
          reservedItemsCar.map((item, i) => (i === index ? newValue : item))
        );
        break;
      default:
        break;
    }
  };

  const handleChange = async (e) => {
    async function fetchFloor(floorID) {
      console.log(floorID)
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

      setFormData({
        ...formData,
        building_id: BuildID,
      });
    }else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  }
  return (
    <div>
      <h2
        style={{ background: themeColor }}
        className="text-center text-xl font-bold p-2 rounded-md mx-2 text-white mt-2"
      >
        Parking Group Configuration
      </h2>
      <div className=" my-5 mb-10  border-gray-400 p-2 md:px-10 ">
        <div className="w-full mx-3 my-2 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="location"
                name="building_id"
                value={formData.building_id}
onChange={handleChange}
              >
                <option value="">Select a location</option>
                {buildings.map((build)=>(
                  <option value={build.id} key={build.id}>{build.name}</option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="floor"
              >
                Floor
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="floor"
                placeholder="Floor"
                value={formData.floor_id}
                onChange={handleChange}
                name="floor_id"
              >
                <option value="">Select Floor</option>
                {floors.map((floor)=>(
                  <option value={floor.id} key={floor.id}>{floor.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Two Wheeler Configuration */}
        <div className="w-full mx-3 my-5  ">
          <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
            Parking Configuration
          </h3>
          <h1 className="text-lg  mb-6 font-medium border-b border-gray-300">
            Two Wheeler
          </h1>
          <div className="flex flex-col justify-between lg:flex-row ">
            {/* Non Stack Parking for Two Wheeler */}
            <div>
              <div class="mb-4">
                {" "}
                <b>Non Stack Parking</b>
              </div>
              <div className="w-80  border border-black rounded-md">
                {/* <div className="w-[310px] h-[200px] border border-black rounded-md"> */}
                <div className="p-4">
                  <div className="table-responsive">
                    <ul className="border border-gray-400 rounded-md list-none flex  items-start flex-wrap w-72 h-[170px] overflow-y-scroll scrollbar-thin">
                      {nonStackItemsTwoWheeler.map((p, index) => (
                        <li
                          key={index}
                          className="group w-[50px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px]"
                        >
                          <div className="flex flex-row mt-1 ml-1">
                            <input
                              type="text"
                              value={p}
                              onChange={(e) =>
                                handleItemchange1(
                                  "Non Stack",
                                  index,
                                  e.target.value
                                )
                              }
                              className="w-full bg-transparent border-none focus:ring-0"
                            />
                            <button
                              className="close bg-close-button-bg text-red-500 px-1.5 py-[3px] w-[18px] h-[18px] flex justify-center items-center rounded-full font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={() =>
                                deleteItem("Non Stack", index, "TwoWheeler")
                              }
                            >
                              X
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-2 my-2">
                <input
                  type="number"
                  value={itemCount}
                  onChange={(e) => setItemCount(parseInt(e.target.value))}
                  className="mb-4 bg-white border border-gray-400 px-2 w-20 h-10 mr-2 rounded"
                />
                <button
                  className="mb-4 bg-blue-500 text-white px-4 py-2 rounded "
                  onClick={() => addItem("P", "TwoWheeler")}
                >
                  Add
                </button>
                <input
                  type="number"
                  value={nonStackCountTwoWheeler}
                  readOnly
                  className="mb-4 bg-white border border-gray-400 w-20 h-10 ml-2 px-2 py-1 rounded"
                />
              </div>
            </div>

            {/* Stack Parking for Two Wheeler */}
            <div>
              <div className="mb-4">
                <b>Stack Parking</b>
              </div>
              <div className="w-80  border border-black rounded-md">
                <div className="p-4">
                  <div className="table-responsive">
                    <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-72 h-[170px] rounded-md overflow-y-scroll scrollbar-thin">
                      {stackItemsTwoWheeler.map((p, index) => (
                        <li
                          key={index}
                          className="group w-[53px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px]"
                        >
                          <div className="flex flex-row mt-1">
                            <input
                              type="text"
                              value={p}
                              onChange={(e) =>
                                handleItemchange1(
                                  "Stack",
                                  index,
                                  e.target.value
                                )
                              }
                              className="w-full bg-transparent border-none focus:ring-0"
                            />
                            <button
                              className="close bg-close-button-bg text-red-500 px-1.5 py-[3px] w-[18px] h-[18px] flex justify-center items-center rounded-full font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={() =>
                                deleteItem("Stack", index, "TwoWheeler")
                              }
                            >
                              X
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-center my-2 gap-2">
                <input
                  type="number"
                  value={itemCount}
                  onChange={(e) => setItemCount(parseInt(e.target.value))}
                  className="mb-4 bg-white border border-gray-400 px-2 w-20 h-10 mr-2 rounded"
                />
                <button
                  className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => addItem("p", "TwoWheeler")}
                >
                  Add
                </button>
                <input
                  type="number"
                  value={stackCountTwoWheeler}
                  readOnly
                  className="mb-4 bg-white border border-gray-400 w-20 h-10 ml-2 px-2 py-1 rounded"
                />
              </div>
            </div>

            {/* Reserved Parking for Two Wheeler */}
            <div>
              <div className="mb-4">
                <b>Reserved Parking</b>
              </div>
              <div className="w-80  border border-black rounded-md">
                <div className="p-4">
                  <div className="table-responsive">
                    <ul className="border border-gray-400 list-none rounded-md flex pl-0 items-start flex-wrap w-72 h-[170px] overflow-y-scroll scrollbar-thin">
                      {reservedItemsTwoWheeler.map((p, index) => (
                        <li
                          key={index}
                          className="group w-[50px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px]"
                        >
                          <div className="flex flex-row mt-1 ml-1">
                            <input
                              type="text"
                              value={p}
                              onChange={(e) =>
                                handleItemchange1(
                                  "Reserved",
                                  index,
                                  e.target.value
                                )
                              }
                              className="w-full bg-transparent border-none focus:ring-0"
                            />
                            <button
                              className="close bg-close-button-bg text-red-500 px-1.5 py-[3px] w-[18px] h-[18px] flex justify-center items-center rounded-full font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={() =>
                                deleteItem("Reserved", index, "TwoWheeler")
                              }
                            >
                              X
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-2 my-2">
                <input
                  type="number"
                  value={itemCount}
                  onChange={(e) => setItemCount(parseInt(e.target.value))}
                  className="mb-4 bg-white border border-gray-400 px-2 w-20 h-10 mr-2 rounded"
                />
                <button
                  className="mb-4 bg-blue-500 text-white px-4 py-2 rounded "
                  onClick={() => addItem("R", "TwoWheeler")}
                >
                  Add
                </button>
                <input
                  type="number"
                  value={reservedCountTwoWheeler}
                  readOnly
                  className="mb-4 bg-white border border-gray-400 ml-2 w-20 h-10 px-2 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Car Configuration */}
        <div className="w-full mx-3 my-5 ">
          {/* <h3 className="border-b text-center text-xl border-black mb-6 font-bold">Parking Configuration</h3> */}
          <h1 className="text-lg  mb-6 font-medium border-b border-gray-300">
            Car
          </h1>
          <div className="flex flex-col justify-between md:flex-row ">
            {/* Non Stack Parking for Car */}
            <div>
              <div className="mb-5">
                <b>Non Stack Parking</b>
              </div>
              <div className="w-80 border border-black rounded-md">
                <div className="p-4">
                  <div className="table-responsive">
                    <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-72 h-[170px] rounded-md overflow-y-scroll scrollbar-thin">
                      {nonStackItemsCar.map((p, index) => (
                        <li
                          key={index}
                          className="group w-[50px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px]"
                        >
                          <div className="flex flex-row mt-1 ml-2">
                            <input
                              type="text"
                              value={p}
                              onChange={(e) =>
                                handleItemchange2(
                                  "Non Stack",
                                  index,
                                  e.target.value
                                )
                              }
                              className="w-full bg-transparent border-none focus:ring-0"
                            />
                            <button
                              className="close bg-close-button-bg text-red-500 px-1.5 py-[3px] w-[18px] h-[18px] flex justify-center items-center rounded-full font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={() =>
                                deleteItem("Non Stack", index, "Car")
                              }
                            >
                              X
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-center my-2 gap-2">
                <input
                  type="number"
                  value={itemCount}
                  onChange={(e) => setItemCount(parseInt(e.target.value))}
                  className="mb-4 bg-white border border-gray-400 px-2 w-20 h-10 mr-2 rounded"
                />
                <button
                  className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => addItem("P", "Car")}
                >
                  Add
                </button>
                <input
                  type="number"
                  value={nonStackCountCar}
                  readOnly
                  className="mb-4 bg-white border border-gray-400 w-20 h-10 ml-2 px-2 py-1 rounded"
                />
              </div>
            </div>

            {/* Stack Parking for Car */}
            <div>
              <div className="mb-5">
                <b>Stack Parking</b>
              </div>
              <div className="w-80 border border-black rounded-md">
                <div className="p-4">
                  <div className="table-responsive">
                    <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-72 rounded-md h-[170px] overflow-y-scroll scrollbar-thin">
                      {stackItemsCar.map((p, index) => (
                        <li
                          key={index}
                          className="group w-[53px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px]"
                        >
                          <div className="flex flex-row mt-1">
                            <input
                              type="text"
                              value={p}
                              onChange={(e) =>
                                handleItemchange2(
                                  "Stack",
                                  index,
                                  e.target.value
                                )
                              }
                              className="w-full bg-transparent border-none focus:ring-0"
                            />
                            <button
                              className="close bg-close-button-bg text-red-500 px-1.5 py-[3px] w-[18px] h-[18px] flex justify-center items-center rounded-full font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={() => deleteItem("Stack", index, "Car")}
                            >
                              X
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-center my-2 gap-2">
                <input
                  type="number"
                  value={itemCount}
                  onChange={(e) => setItemCount(parseInt(e.target.value))}
                  className="mb-4 bg-white border border-gray-400 px-2 w-20 h-10 mr-2 rounded"
                />
                <button
                  className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => addItem("p", "Car")}
                >
                  Add
                </button>
                <input
                  type="number"
                  value={stackCountCar}
                  readOnly
                  className="mb-4 bg-white border border-gray-400 w-20 h-10 ml-2 px-2 py-1 rounded"
                />
              </div>
            </div>

            {/* Reserved Parking for Car */}
            <div>
              <div className="mb-5">
                <b>Reserved Parking</b>
              </div>
              <div className="w-80 border border-black rounded-md">
                <div className="p-4">
                  <div className="table-responsive">
                    <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-72 rounded-md h-[170px] overflow-y-scroll scrollbar-thin">
                      {reservedItemsCar.map((p, index) => (
                        <li
                          key={index}
                          className="group w-[50px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px]"
                        >
                          <div className="flex flex-row mt-1 ml-1">
                            <input
                              type="text"
                              value={p}
                              onChange={(e) =>
                                handleItemchange2(
                                  "Reserved",
                                  index,
                                  e.target.value
                                )
                              }
                              className="w-full bg-transparent border-none focus:ring-0 text-center"
                            />
                            <button
                              className="close bg-close-button-bg text-red-500 px-1.5 py-[3px] w-[18px] h-[18px] flex justify-center items-center rounded-full font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={() =>
                                deleteItem("Reserved", index, "Car")
                              }
                            >
                              X
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={itemCount}
                  onChange={(e) => setItemCount(parseInt(e.target.value))}
                  className="mb-4 bg-white border border-gray-400 px-2 w-20 h-10 mr-2 rounded"
                />
                <button
                  className="mb-4 bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  onClick={() => addItem("R", "Car")}
                >
                  Add
                </button>
                <input
                  type="number"
                  value={reservedCountCar}
                  readOnly
                  className="mb-4 bg-white border border-gray-400 ml-2 w-20 h-10 px-2 rounded"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mx-3 my-5 ">
          <h1 className="text-lg  mb-6 font-medium border-b border-gray-300">
            Floor Map
          </h1>

          <FileInputBox />
        </div>
        <div className="sm:flex justify-center grid gap-2 my-5 ">
          <button
            className="bg-black text-white p-2 px-4 rounded-md font-medium"
            //   onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddParkingConfig;
