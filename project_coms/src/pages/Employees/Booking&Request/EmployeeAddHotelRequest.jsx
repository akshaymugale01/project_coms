import React from "react";
import { useSelector } from "react-redux";
import Accordion from "../../AdminHrms/Components/Accordion";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import Navbar from "../../../components/Navbar";
import { FaCheck } from "react-icons/fa";

const EmployeeAddHotelRequest = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const first_name = getItemInLocalStorage("Name");
  const last_name = getItemInLocalStorage("LASTNAME");
  const user_email = getItemInLocalStorage("USEREMAIL");
  return (
    <section className="flex">
      <Navbar />
      <div className="flex justify-center items-center  w-full p-2">
        <div className="border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen overflow-y-auto">
          <h2
            style={{ background: themeColor }}
            className="text-center md:text-xl font-bold p-2 bg-black rounded-md text-white"
          >
            Hotel Request
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
          <div className="grid md:grid-cols-3 gap-2 mt-5">
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="destination" className="font-semibold">
                Destination :
              </label>
              <input
                type="text"
                id="destination"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Destination"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="checkInDate" className="font-semibold">
                Check-in Date :
              </label>
              <input
                type="date"
                id="checkInDate"
                className="border border-gray-400 p-2 rounded-md"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="checkOutDate" className="font-semibold">
                Check-out Date :
              </label>
              <input
                type="date"
                id="checkOutDate"
                className="border border-gray-400 p-2 rounded-md"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="numberOfRooms" className="font-semibold">
                Number of Rooms :
              </label>
              <input
                type="number"
                id="numberOfRooms"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Number of Rooms"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="roomType" className="font-semibold">
                Room Type :
              </label>
              <select
                id="roomType"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">Select Type</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
              </select>
            </div>
          </div>
          <div className="grid gap-2 items-center w-full my-2">
            <label htmlFor="specialRequests" className="font-semibold">
              Special Requests :
            </label>
            <textarea
              id="specialRequests"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Special Requests"
            ></textarea>
          </div>

          <div className="grid gap-2 items-center w-full ">
            <label htmlFor="hotelPreferences" className="font-semibold">
              Hotel Preferences :
            </label>
            <textarea
              id="hotelPreferences"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Hotel Preferences"
            ></textarea>
          </div>
          <div className="flex gap-5 justify-center items-center my-2">
            <button
              type="submit"
              className="bg-green-400  text-white  font-semibold py-2 px-4 rounded-md flex items-center gap-2"
            >
            <FaCheck/>  Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeAddHotelRequest;
