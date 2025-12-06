import React, { useState } from "react";
import Account from "./Account";
import { PiPlusCircle } from "react-icons/pi";

const Room = () => {
  const [wing, setWing] = useState("");
  const [building, setBuilding] = useState("");
  const [area, setArea] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [unit, setUnit] = useState("");
  const [showFields, setShowFields] = useState(false);
  const [showRows, setShowRows] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!wing || !building || !area || !floor || !room || !unit) {
      return;
    }

    const newData = {
      wing: wing,
      building: building,
      room: room,
      area: area,
      floor: floor,
      unit: unit,
      status: "Active",
    };
    setSubmittedData((prevData) => [...prevData, newData]);

    setWing("");
    setBuilding("");
    setArea("");
    setFloor("");
    setShowRows(true);
    setShowFields(false);
  };

  const handlewingChange = (e) => {
    setWing(e.target.value);
  };

  const handleBuildingChange = (e) => {
    setBuilding(e.target.value);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handleFloorChange = (e) => {
    setFloor(e.target.value);
  };
  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };
  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div className="w-full mt-1">
      <Account />
      <div className="flex flex-col mx-10 my-10 gap-2">
        <h2
          className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center w-44 gap-2"
          onClick={() => setShowFields(!showFields)}
        >
          <PiPlusCircle size={20} />
          Add Room
        </h2>
        {showFields && (
          <div>
            <div className="grid grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Enter Building Name"
                className="border border-gray-500 rounded-md mt-5 p-2"
                value={building}
                onChange={handleBuildingChange}
              />
              <input
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
              />
              <input
                type="text"
                placeholder="Enter Floor"
                className="border border-gray-500 rounded-md mt-5 p-2"
                value={floor}
                onChange={handleFloorChange}
              />

              <input
                type="text"
                placeholder="Enter Unit Name"
                className="border border-gray-500 rounded-md mt-5 p-2"
                value={unit}
                onChange={handleUnitChange}
              />
              <input
                type="text"
                placeholder="Enter Room Name"
                className="border border-gray-500 rounded-md mt-5 p-2"
                value={room}
                onChange={handleRoomChange}
              />
              <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Generate QR code</label>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        )}

        <div className="flex justify-center items-center">
          <div className="mt-4 w-screen">
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className="border-md p-2 bg-black border-r-2 text-white rounded-l-xl">
                    Actions
                  </th>
                 
                  <th className="border-md p-2 bg-black border-r-2 text-white ">
                    Site
                  </th>
                  <th className="border-md p-2 bg-black border-r-2 text-white ">
                    Building
                  </th>
                  <th className="border-md p-2 bg-black border-r-2 text-white ">
                    Wing
                  </th>

                  <th className="p-2 bg-black  text-white border-r-2 border-md">
                    Area
                  </th>
                  <th className="p-2 bg-black  text-white border-r-2 border-md ">
                    Floor
                  </th>
                  <th className="p-2 bg-black  text-white border-r-2 border-md ">
                    Unit
                  </th>
                  <th className="p-2 bg-black  text-white rounded-r-xl ">
                    Room
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
                        edit
                      </td>
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
                      <td className="text-center p-2 border-r-2 border-black">
                        {data.unit}
                      </td>
                      <td className="text-center p-2 rounded-r-xl">
                        {data.room}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
