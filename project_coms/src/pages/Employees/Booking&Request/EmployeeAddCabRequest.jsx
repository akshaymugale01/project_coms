import React from "react";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import Accordion from "../../AdminHrms/Components/Accordion";
import { FaCheck } from "react-icons/fa";

const EmployeeAddCabRequest = () => {
  const themeColor = useSelector((state) => state.theme.color);

  const first_name = getItemInLocalStorage("Name");
  const last_name = getItemInLocalStorage("LASTNAME");
  const user_email = getItemInLocalStorage("USEREMAIL");
  return (
    <div className="flex justify-center items-center my-5 w-full p-4">
      <div className="border border-gray-300 rounded-lg p-4 w-full mx-4 ">
        <h2
          style={{ background: themeColor }}
          className="text-center md:text-xl font-bold p-2 bg-black rounded-md text-white"
        >
          Cab Request
        </h2>
        <Accordion
          title={"Requester Details"}
          // icon={MdOutlineWebAsset}
          content={
            <>
              <div className="grid grid-cols-3  p-2 rounded-md bg-gray-100">
                <div className="grid grid-cols-2">
                  <label htmlFor="" className="font-medium">
                    Name :{" "}
                  </label>
                  <p>
                    {first_name} {last_name}
                  </p>
                </div>
                <div className="grid grid-cols-2">
                  <label htmlFor="" className="font-medium">
                    Email :{" "}
                  </label>
                  <p>{user_email}</p>
                </div>
              </div>
            </>
          }
        />
        <div className="grid md:grid-cols-3 gap-2 mt-2">
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="pickupLocation" className="font-semibold">
              Pickup Location:
            </label>
            <input
              type="text"
              id="pickupLocation"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Pickup Location"
            />
          </div>

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="dropoffLocation" className="font-semibold">
              Drop-off Location:
            </label>
            <input
              type="text"
              id="dropoffLocation"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Drop-off Location"
            />
          </div>

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="date" className="font-semibold">
              Date:
            </label>
            <input
              type="date"
              id="date"
              className="border border-gray-400 p-2 rounded-md"
            />
          </div>

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="time" className="font-semibold">
              Time:
            </label>
            <input
              type="time"
              id="time"
              className="border border-gray-400 p-2 rounded-md"
            />
          </div>

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="numberOfPassengers" className="font-semibold">
              Number of Passengers:
            </label>
            <input
              type="number"
              id="numberOfPassengers"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Number of Passengers"
            />
          </div>

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="transportationType" className="font-semibold">
              Transportation Type:
            </label>
            <select
              id="transportationType"
              className="border border-gray-400 p-2 rounded-md"
            >
              <option value="">Select Transport type</option>
              <option value="cab">Cab</option>
              <option value="shuttle">Shuttle</option>
              <option value="bus">Bus</option>
            </select>
          </div>

          <div className="grid gap-2 items-center w-full">
            <label
              htmlFor="bookingConfirmationNumber"
              className="font-semibold"
            >
              Mobile Number:
            </label>
            <input
              type="text"
              id="bookingConfirmationNumber"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Mobile Number"
            />
          </div>
        </div>
        <div className="flex gap-5 justify-center items-center my-4">
          <button
            type="submit"
            className="bg-green-500 text-white  font-semibold py-2 px-4 rounded-md flex items-center gap-2"
          >
            <FaCheck /> Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAddCabRequest;
