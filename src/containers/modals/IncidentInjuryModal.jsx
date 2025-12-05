import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
const IncidentInjuryModal = ({ onclose }) => {
  const [incident, setIncident] = useState([{ name: "", mobile: "" }]);
  const [injury, setInjury] = useState();
  const handleAddIncident = (event) => {
    event.preventDefault();
    setIncident([...incident, { name: "", mobile: "" }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newIncident = [...incident];
    newIncident[index][name] = value;
    setIncident(newIncident);
  };

  const handleRemoveIncident = (index) => {
    const newIncident = [...incident];
    newIncident.splice(index, 1);
    setIncident(newIncident);
  };

  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col gap-4 z-10">
        <h1 className="font-semibold text-center text-xl"> Add Injury</h1>
        <div className="border-b border-black"></div>
        {/* <div className="grid  px-5 gap-x-5 gap-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-bold">
              Injury Type
            </label>
            <select
              text="time"
              name=""
              id=""
              className="border p-1 px-4 border-gray-500 rounded-md w-full"
            >
              <option value="">Select Type</option>
              <option value="">Head</option>
              <option value="">Neck</option>
              <option value="">Nose</option>
              <option value="">Tongue</option>
              <option value="">Arms</option>
              <option value="">Legs</option>
              <option value="">Eye</option>
              <option value="">Ears</option>
              <option value="">Skin</option>
              <option value="">Mouth</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-bold">
              Who got injured
            </label>
            <select
              text="time"
              name=""
              id=""
              className="border p-1 px-4 border-gray-500 rounded-md w-full"
            >
              <option value="">Select Type</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 px-5 gap-x-5 gap-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-bold">
              Name
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder=""
              className="border rounded-md border-gray-500 p-1 px-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-bold">
              Mobile
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder=""
              className="border rounded-md border-gray-500 p-1 px-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-bold">
              Company Name
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder=""
              className="border rounded-md border-gray-500 p-1 px-2"
            />
          </div>
        </div>
        <div className="border-b border-black"></div> */}
        {incident.map((incident1, index) => (
          <div key={index}>
            <div className="grid  px-5 gap-x-5 gap-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-bold">
                  Injury Type
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md w-full"
                >
                  <option value="">Select Type</option>
                  <option value="">Head</option>
                  <option value="">Neck</option>
                  <option value="">Nose</option>
                  <option value="">Tongue</option>
                  <option value="">Arms</option>
                  <option value="">Legs</option>
                  <option value="">Eye</option>
                  <option value="">Ears</option>
                  <option value="">Skin</option>
                  <option value="">Mouth</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-bold">
                  Who got injured
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md w-full"
                >
                  <option value="">Select Type</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 px-5 gap-x-5 gap-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-bold">
                  Name
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=""
                  value={incident.mobile}
                  onChange={(event) => handleInputChange(index, event)}
                  className="border rounded-md border-gray-500 p-1 px-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-bold">
                  Mobile
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=""
                  value={incident.mobile}
                  onChange={(event) => handleInputChange(index, event)}
                  className="border rounded-md border-gray-500 p-1 px-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-bold">
                  Company Name
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=""
                  value={incident.mobile}
                  onChange={(event) => handleInputChange(index, event)}
                  className="border rounded-md border-gray-500 p-1 px-2"
                />
              </div>
            </div>
            <div className="border-b border-black my-5"></div>
            <div>
              <button
                className="bg-black p-2 px-4 text-white rounded-md my-2"
                onClick={() => handleRemoveIncident(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-start">
          <button
            className="bg-black p-2 px-4 text-white rounded-md my-5"
            onClick={handleAddIncident}
          >
            Add More
          </button>
        </div>
        <div className="border-b border-black"></div>
        <div className="flex justify-end">
          <button className="bg-black p-2 px-4 text-white rounded-md my-5 w-24">
            Submit
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};
export default IncidentInjuryModal;