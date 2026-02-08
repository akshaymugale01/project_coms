import React from "react";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const AddIncident = () => {
  const navigate = useNavigate();
  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <h2 className="text-center text-lg mx-8 my-5 font-semibold p-2 bg-black rounded-full text-white">
          Add Incidents
        </h2>
        <div className="border-2 flex flex-col my-2 md:mx-10 p-4 gap-4 rounded-md border-gray-400">
          <h2 className=" text-lg border-black border-b font-semibold ">
            DETAILS
          </h2>
          <div className="flex  flex-col justify-around ">
            <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-8 w-full">
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold">
                  Time & Date
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    placeholder=""
                    className="border p-1 px-4 border-gray-500 rounded-md w-full"
                  />
                  <input
                    type="time"
                    placeholder=""
                    className="border p-1 px-4 border-gray-500 rounded-md w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select The Incident Primary Category
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select </option>
                  <option value="">Health and Safety</option>
                  <option value="">Fire</option>
                  <option value="">Near Miss/Good Catch</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select The Category For The Incident
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select The Secondry Category
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select The Secondry Category
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Severity
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Severity </option>
                  <option value="">Insignificant </option>
                  <option value="">Minor </option>
                  <option value="">moderate </option>
                  <option value="">major </option>
                  <option value="">catasTrophic </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Incident level
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Level </option>
                  <option value="">Level-1 </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Building
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Building</option>
                  <option value="">HelpDesk</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select Near Miss / Good Catch Incident
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select </option>
                  <option value="">Near Miss / Good Catch </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select The Category For The Incident
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select The Secondry Category For The Incident
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select The Secondry Category For The Incident
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select The Secondry Category For The Incident
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Probability
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Probability</option>
                  <option value="">Rare </option>
                  <option value="">Possible </option>
                  <option value="">Likely </option>
                  <option value="">Often </option>
                  <option value="">Frequent Almost/Certain </option>
                </select>
              </div>
            </div>
            <div className="flex flex-col my-3">
              <label htmlFor="" className="font-semibold">
                Description
              </label>
              <textarea
                name=""
                id=""
                cols="5"
                rows="3"
                placeholder="Accident near Main Gate"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="border-2 flex flex-col my-2 md:mx-10 p-4 gap- rounded-md border-gray-400">
          <div className=" mt-3 mb-10 ">
            <div className="flex items-center gap-6">
              {/* <label htmlFor="meterApplicable">Support</label> */}
              <input type="checkbox" name="is_meter" id="meterApplicable" />
              <label htmlFor="meterApplicable">Support required</label>
            </div>
            <div className="flex md:flex-row flex-col gap-2">
              {/* <label htmlFor="meterApplicable">Disclaimer </label>
               */}
              <div className="flex items-center gap-6">
                <input type="checkbox" name="is_meter" id="meterApplicable" />
                <label htmlFor="meterApplicable">
                  I have correctly stated all the facts related to the incident
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 flex flex-col my-2 md:mx-10 p-4 gap-4 rounded-md border-gray-400 ">
          <h2 className=" text-lg border-black border-b font-semibold ">
            ATTACHMENTS
          </h2>
          <FileInputBox />
        </div>
        <div className="flex justify-end gap-4 mt-10 mb-6 md:mr-10">
          <button
            type="button"
            onClick={() => navigate("/admin/incidents")}
            className="font-semibold border-2 border-black px-6 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            Cancel
          </button>

          <button className="font-semibold border-2 border-indigo-600 px-6 py-2 rounded-md bg-indigo-600 text-white">
            Create Incident
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddIncident;
