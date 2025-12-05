import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const EmployeeAddGVehicles = () => {
  const [userType, setUserType] = useState("occupant");
  const themeColor = useSelector((state) => state.theme.color);

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  return (
    <div className="flex justify-center items-center my-5 w-full p-4">
      <form className="border border-gray-300 rounded-lg p-4 w-full mx-4">
        <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white"  style={{ background: themeColor }}>
       
          Add G Vehicles
        </h2>
      
        <form>
         <div className="flex gap-4 items-center mb-4">
          <p className="font-bold">For</p>
          <div className="flex gap-2">
         
           
            <input
              type="radio"
              name="userType"
              value="occupant"
              className="mt-1"
              checked={userType === "occupant"}
              onChange={handleUserTypeChange}
            />
             <label className="text-center font-bold">
           Occupants
          </label >
          </div>
          <div className="flex gap-2">
         
            <input
              type="radio"
              name="userType"
              value="guest"
              className="mt-1"
              checked={userType === "guest"}
              onChange={handleUserTypeChange}
            />
            <label className="text-center font-bold"> Guest
          </label></div></div>
        </form>
        <div className="grid md:grid-cols-2 gap-5">
        
            {userType === "occupant" && (
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="occupantUser" className="font-semibold">
                  Occupant User:
                </label>
               
                <input
                  type="text"
                  id="occupantUser"
                  name="occupantUser"
                  className="border p-2 rounded-md border-black"
                />
              </div>
            )}

            {userType === "guest" && (
              <div className="grid gap-2 items-center w-full">
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
             <div className="grid gap-2 items-center w-full">
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
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="vehicleCategory" className="font-semibold">
              Parking Slot
            </label>
            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option>Select Vehicle Category</option>
              {/* Add options here */}
            </select>
          </div>
          <div className="grid gap-2 items-center w-full">
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

export default EmployeeAddGVehicles;