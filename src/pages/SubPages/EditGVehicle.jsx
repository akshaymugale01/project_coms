import React from "react";
import { useState } from "react";
const EditGVehicles = () => {
  const [userType, setUserType] = useState("occupant");

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  return (
    <div className="flex justify-center items-center my-5 w-full p-4">
      <form className="border border-gray-300 rounded-lg p-4 w-full mx-4">
        <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
          Edit Vehicles
        </h2>

        <form>
          <span>For</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            &nbsp;
            <input
              type="radio"
              name="userType"
              value="occupant"
              checked={userType === "occupant"}
              onChange={handleUserTypeChange}
            />
            &nbsp;&nbsp; Occupants
          </label>
          &nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="userType"
              value="guest"
              checked={userType === "guest"}
              onChange={handleUserTypeChange}
            />
            &nbsp;&nbsp; Guest
          </label>
        </form>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="flex flex-col">
            {userType === "occupant" && (
              <div>
                <label htmlFor="occupantUser" className="font-semibold">
                  Occupant User:
                </label>
                <br />
                <input
                  type="text"
                  id="occupantUser"
                  name="occupantUser"
                  className="border p-2 rounded-md border-black"
                />
              </div>
            )}

            {userType === "guest" && (
              <div>
                <label htmlFor="guestName" className="font-semibold">
                  Guest Name:
                </label>
                <input
                  type="text"
                  id="guestName"
                  name="guestName"
                  className="border p-2 rounded-md border-black"
                />
              </div>
            )}
            <label htmlFor="slotNumber" className="font-semibold">
              Slot Number
            </label>
            <input
              type="text"
              id="slotNumber"
              name="slotNumber"
              placeholder="Enter Slot Number"
              className="border p-2 rounded-md border-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="vehicleCategory" className="font-semibold">
              Parking Slot
            </label>
            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option>Select Vehicle Category</option>
              {/* Add options here */}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="vehicleType" className="font-semibold">
              Entry Gate
            </label>
            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option>Select Vehicle Type</option>
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

export default EditGVehicles;
