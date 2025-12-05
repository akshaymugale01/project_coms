import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FileInputBox from "../../../containers/Inputs/FileInputBox";

const EditParkingConfiguration = () => {
  const themeColor = useSelector((state) => state.theme.color);
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
          ? `P${nonStackItems.length + Math.floor(stackItems.length / 2) + 1 + reservedItems.length + i}`
          : "";

      if (parkingArea === "p") {
        newItemsWithSuffix.push(`${newItem}A`, `${newItem}B`);
      } else {
        newItemsWithSuffix.push(newItem);
      }
    }

    switch (parkingArea) {
      case "P":
        vehicleType === "TwoWheeler"
          ? setNonStackItemsTwoWheeler([...nonStackItems, ...newItemsWithSuffix])
          : setNonStackItemsCar([...nonStackItems, ...newItemsWithSuffix]);
        break;
      case "p":
        vehicleType === "TwoWheeler"
          ? setStackItemsTwoWheeler([...stackItems, ...newItemsWithSuffix])
          : setStackItemsCar([...stackItems, ...newItemsWithSuffix]);
        break;
      case "R":
        vehicleType === "TwoWheeler"
          ? setReservedItemsTwoWheeler([...reservedItems, ...newItemsWithSuffix])
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
          setNonStackItemsTwoWheeler(nonStackItemsTwoWheeler.filter((_, i) => i !== index));
          break;
        case "Stack":
          setStackItemsTwoWheeler(stackItemsTwoWheeler.filter((_, i) => i !== index));
          break;
        case "Reserved":
          setReservedItemsTwoWheeler(reservedItemsTwoWheeler.filter((_, i) => i !== index));
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
      case 'Non Stack':
        setNonStackItemsTwoWheeler(nonStackItemsTwoWheeler.map((item, i) => (i === index ? newValue : item)));
        break;
      case 'Stack':
        setStackItemsTwoWheeler(stackItemsTwoWheeler.map((item, i) => (i === index ? newValue : item)));
        break;
      case 'Reserved':
        setReservedItemsTwoWheeler(reservedItemsTwoWheeler.map((item, i) => (i === index ? newValue : item)));
        break;
      default:
        break;
    }
  };

  const handleItemchange2 = (parkingArea, index, newValue) => {
    switch (parkingArea) {
      case 'Non Stack':
        setNonStackItemsCar(nonStackItemsCar.map((item, i) => (i === index ? newValue : item)));
        break;
      case 'Stack':
        setStackItemsCar(stackItemsCar.map((item, i) => (i === index ? newValue : item)));
        break;
      case 'Reserved':
        setReservedItemsCar(reservedItemsCar.map((item, i) => (i === index ? newValue : item)));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2
        style={{ background: themeColor }}
        className="text-center text-xl font-bold p-2 rounded-full text-white mt-2"
      >
        Edit Parking Group Configuration
      </h2>
      <div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
        <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="col-span-1">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="location">Location</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="location"
                placeholder="Location"
              >
                <option value="">Select a location</option>
                <option value="location1">Location 1</option>
                <option value="location2">Location 2</option>
                <option value="location3">Location 3</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="floor">Floor</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="floor"
                placeholder="Floor"
              >
                <option value="">Select Floor</option>
                <option value="floor1">Floor 1</option>
                <option value="floor2">Floor 2</option>
                <option value="floor3">Floor 3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Two Wheeler Configuration */}
        <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
          <h3 className="border-b text-center text-xl border-black mb-6 font-bold">Parking Configuration</h3>
          <h1 className="text-xl border-black mb-6 font-bold">Two Wheeler</h1>
          <div className="flex flex-col justify-center md:flex-row gap-20">
            {/* Non Stack Parking for Two Wheeler */}
            <div>
              <span className="mb-5"><b>Non Stack Parking</b></span>
              <div className="w-[310px] h-[200px] border border-black">
                <div className="p-4">
                  <div className="table-responsive">
                    <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-[280px] h-[170px] overflow-y-scroll scrollbar-thin">
                      {nonStackItemsTwoWheeler.map((p, index) => (
                        <li key={index} className="group w-[50px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px]">
                          <div className="flex flex-row mt-1 ml-1">
                             <input
                              type="text"
                              value={p}
                              onChange={(e) => handleItemchange1('Non Stack',index,e.target.value)}
                              className="w-full bg-transparent border-none focus:ring-0"
                            />
                            <button
                              className="close bg-close-button-bg text-red-500 px-1.5 py-[3px] w-[18px] h-[18px] flex justify-center items-center rounded-full font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={() => deleteItem('Non Stack', index, 'TwoWheeler')}
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
                  onClick={() => addItem('P', 'TwoWheeler')}
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
              <span className="mb-5"><b>Stack Parking</b></span>
              <div className="w-[310px] h-[200px] border border-black">
                <div className="p-4">
                  <div className="table-responsive">
                    <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-[280px] h-[170px] overflow-y-scroll scrollbar-thin">
                      {stackItemsTwoWheeler.map((p, index) => (
                        <li key={index} className="group w-[53px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px]">
                          <div className="flex flex-row mt-1">
                          <input
                              type="text"
                              value={p}
                              onChange={(e) => handleItemchange1('Stack',index,e.target.value)}
                              className="w-full bg-transparent border-none focus:ring-0"
                            />
                            <button
                              className="close bg-close-button-bg text-red-500 px-1.5 py-[3px] w-[18px] h-[18px] flex justify-center items-center rounded-full font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={() => deleteItem('Stack', index, 'TwoWheeler')}
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
                  onClick={() => addItem('p', 'TwoWheeler')}
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
              <span className="mb-5"><b>Reserved Parking</b></span>
              <div className="w-[310px] h-[200px] border border-black">
                <div className="p-4">
                  <div className="table-responsive">
                    <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-[280px] h-[170px] overflow-y-scroll scrollbar-thin">
                      {reservedItemsTwoWheeler.map((p, index) => (
                        <li key={index} className="group w-[50px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px]">
                          <div className="flex flex-row mt-1 ml-1">
                          <input
                              type="text"
                              value={p}
                              onChange={(e) => handleItemchange1('Reserved',index,e.target.value)}
                              className="w-full bg-transparent border-none focus:ring-0"
                            />
                            <button
                              className="close bg-close-button-bg text-red-500 px-1.5 py-[3px] w-[18px] h-[18px] flex justify-center items-center rounded-full font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={() => deleteItem('Reserved', index, 'TwoWheeler')}
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
                  onClick={() => addItem('R', 'TwoWheeler')}
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
        <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
          {/* <h3 className="border-b text-center text-xl border-black mb-6 font-bold">Parking Configuration</h3> */}
          <h1 className="text-xl border-black mb-6 font-bold">Car</h1>
          <div className="flex flex-col justify-center md:flex-row gap-20">
            {/* Non Stack Parking for Car */}
            <div>
              <span className="mb-5"><b>Non Stack Parking</b></span>
              <div className="w-[310px] h-[200px] border border-black">
                <div className="p-4">
                  <div className="table-responsive">
                    <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-[280px] h-[170px] overflow-y-scroll scrollbar-thin">
                      {nonStackItemsCar.map((p, index) => (
                        <li key={index} className="group w-[50px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px]">
                          <div className="flex flex-row mt-1 ml-2">
                          <input
                              type="text"
                              value={p}
                              onChange={(e) => handleItemchange2('Non Stack',index,e.target.value)}
                              className="w-full bg-transparent border-none focus:ring-0"
                            />
                            <button
                              className="close bg-close-button-bg text-red-500 px-1.5 py-[3px] w-[18px] h-[18px] flex justify-center items-center rounded-full font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={() => deleteItem('Non Stack', index, 'Car')}
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
                  onClick={() => addItem('P', 'Car')}
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
              <span className="mb-5"><b>Stack Parking</b></span>
              <div className="w-[310px] h-[200px] border border-black">
                <div className="p-4">
                  <div className="table-responsive">
                    <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-[280px] h-[170px] overflow-y-scroll scrollbar-thin">
                      {stackItemsCar.map((p, index) => (
                        <li key={index} className="group w-[53px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px]">
                          <div className="flex flex-row mt-1">
                          <input
                              type="text"
                              value={p}
                              onChange={(e) => handleItemchange2('Stack',index,e.target.value)}
                              className="w-full bg-transparent border-none focus:ring-0"
                            />
                            <button
                              className="close bg-close-button-bg text-red-500 px-1.5 py-[3px] w-[18px] h-[18px] flex justify-center items-center rounded-full font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={() => deleteItem('Stack', index, 'Car')}
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
                  onClick={() => addItem('p', 'Car')}
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
              <span className="mb-5"><b>Reserved Parking</b></span>
              <div className="w-[310px] h-[200px] border border-black">
                <div className="p-4">
                  <div className="table-responsive">
                    <ul className="border border-gray-400 list-none flex pl-0 items-start flex-wrap w-[280px] h-[170px] overflow-y-scroll scrollbar-thin">
                      {reservedItemsCar.map((p, index) => (
                        <li key={index} className="group w-[50px] h-[40px] bg-[#eeeeee9e] border border-gray-300 rounded-lg m-[7px]">
                          <div className="flex flex-row mt-1 ml-1">
                          <input
                              type="text"
                              value={p}
                              onChange={(e) => handleItemchange2('Reserved',index,e.target.value)}
                              className="w-full bg-transparent border-none focus:ring-0 text-center"
                            />
                            <button
                              className="close bg-close-button-bg text-red-500 px-1.5 py-[3px] w-[18px] h-[18px] flex justify-center items-center rounded-full font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={() => deleteItem('Reserved', index, 'Car')}
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
                  onClick={() => addItem('R', 'Car')}
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
        <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
        <h1 className="text-xl border-black mb-6 font-bold">Floor Map</h1>

        <FileInputBox/>
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

export default EditParkingConfiguration;