import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
const AddGVehicles = () => {
  const [userType, setUserType] = useState("occupant");
  const themeColor = useSelector((state) => state.theme.color);
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  return (
    <div className="flex justify-center items-center  w-full p-4">
      <form className="border border-gray-300 rounded-lg p-4 w-full mx-4">
        <h2
          style={{ background: themeColor }}
          className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white"
        >
          Add G Vehicles
        </h2>
        <form>
          <div className="flex justify-around max-w-96 items-center my-5">
            <span className="font-medium ">For :</span>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="userType"
                  value="occupant"
                  checked={userType === "occupant"}
                  onChange={handleUserTypeChange}
                />
                <label>Occupants</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="userType"
                  value="guest"
                  checked={userType === "guest"}
                  onChange={handleUserTypeChange}
                />
                <label>Guest</label>
              </div>
            </div>
          </div>
        </form>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="flex flex-col">
            {userType === "occupant" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="occupantUser" className="font-semibold">
                  Occupant User :
                </label>
                <select
                  name=""
                  id=""
                  className="border p-2 rounded-md w-full border-gray-300"
                >
                  <option value="">Select User</option>
                  <option value="">Kunal Sah</option>
                  <option value="">Ravi Parmar</option>
                  <option value="">Akshat Sharawat</option>
                </select>
              </div>
            )}

            {userType === "guest" && (
              <div className="flex flex-col">
                <label htmlFor="guestName" className="font-semibold">
                  Guest Name:
                </label>
                <input
                  type="text"
                  id="guestName"
                  name="guestName"
                  className="border p-2 rounded-md border-gray-300"
                />
              </div>
            )}
           
          
          </div>
          <div className="flex flex-col gap-1">
          <label htmlFor="slotNumber" className="font-semibold">
              Vehicle Number
            </label>
            <input
              type="text"
              id="slotNumber"
              name="slotNumber"
              placeholder="Enter Vehicle Number"
              className="border p-2 rounded-md border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1">
          <label htmlFor="slotNumber" className="font-semibold">
              Slot Number
            </label>
            <input
              type="text"
              id="slotNumber"
              name="slotNumber"
              placeholder="Enter Slot Number"
              className="border p-2 rounded-md border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="vehicleCategory" className="font-semibold">
              Parking Slot
            </label>
            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option>Select Parking Slot </option>
              <option>P1 </option>
              <option>P2 </option>
              {/* Add options here */}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="vehicleType" className="font-semibold">
              Entry Gate
            </label>
            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option>Select Vehicle Type</option>
              <option>Main Gate</option>
              <option>Gate - 1</option>
              <option>Gate - 2</option>
              {/* Add options here */}
            </select>
          </div>
        </div>

        <div className="flex gap-5 justify-center items-center my-4">
          <button
            type="submit"
            className="text-white bg-black hover:bg-white hover:text-black border-2 border-black font-semibold py-2 px-4 rounded transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGVehicles;
