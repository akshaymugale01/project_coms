import React from "react";
import { PiPlusCircle } from "react-icons/pi";

const CreateOutbound = () => {
  const vendors = [
    { id: 1, name: "vendor A" },
    { id: 2, name: "vendor B" },
    { id: 3, name: "vendor C" },
  ];
  const senders = [
    { id: 1, name: "Sender A" },
    { id: 2, name: "Sender B" },
    { id: 3, name: "Sender C" },
  ];
  const recipients = [
    { id: 1, name: "recipient A" },
    { id: 2, name: "recipient B" },
    { id: 3, name: "recipient C" },
  ];
  const type = [
    { id: 1, name: "Type A" },
    { id: 2, name: "Type B" },
    { id: 3, name: "Type C" },
  ];

  return (
    <section>
      <div className="m-2">
        <h2 className="text-center text-xl font-bold p-2 bg-black rounded-full text-white">
          Create New Outbound Package
        </h2>
        <div className="flex justify-around my-10 mx-20 p-4 rounded-md border-2">
          <div className="flex gap-2 items-center ">
            <label htmlFor="vendorSelect" className="font-semibold text-lg">
              Select Vendor:
            </label>
            <select
              id="vendorSelect"
              onChange={(e) => onSelect(e.target.value)}
              className="border p-1 px-4 rounded-md border-gray-400"
            >
              <option value="">Select a Vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </select>
            <button className="border-2 px-2 p-1 rounded-md font-semibold flex items-center gap-2 border-black">
              <PiPlusCircle />
              Add vendor
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="" className="font-semibold text-lg">
              Sending Date:
            </label>
            <input
              type="date"
              name=""
              id=""
              className="border p-1 px-4 rounded-md border-gray-400"
            />
          </div>
        </div>
        <div className=" my-10">
          <h2 className="border-b text-center text-xl border-black m-5 font-bold">
            Package Details
          </h2>
          <div className="grid grid-cols-4 gap-5 mx-10">
            <div className="flex flex-col">
              <label htmlFor="vendorSelect" className="font-semibold text-lg">
                Select Sender:
              </label>
              <select
                id="vendorSelect"
                onChange={(e) => onSelect(e.target.value)}
                className="border p-1 px-4 rounded-md border-gray-400"
              >
                <option value="">Choose sender</option>
                {senders.map((recipient) => (
                  <option key={recipient.id} value={recipient.id}>
                    {recipient.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold text-lg">Recipient Name:</label>
              <input
                type="text"
                name=""
                id=""
                className="border p-1 px-4 rounded-md border-gray-400"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold text-lg">Mobile:</label>
              <input
                type="text"
                name=""
                id=""
                className="border p-1 px-4 rounded-md border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold text-lg">AWB Number:</label>
              <input
                type="text"
                name=""
                id=""
                className="border p-1 px-4 rounded-md border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold text-lg">Recipient's Email ID:</label>
              <input
                type="text"
                name=""
                id=""
                className="border p-1 px-4 rounded-md border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold text-lg">Recipient's Address Line 1 : </label>
              <input
                type="text"
                name=""
                id=""
                className="border p-1 px-4 rounded-md border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold text-lg">Recipient's Address Line 2:</label>
              <input
                type="text"
                name=""
                id=""
                className="border p-1 px-4 rounded-md border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold text-lg">State:</label>
              <input
                type="text"
                name=""
                id=""
                className="border p-1 px-4 rounded-md border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold text-lg">City:</label>
              <input
                type="text"
                name=""
                id=""
                className="border p-1 px-4 rounded-md border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold text-lg">Pin code:</label>
              <input
                type="text"
                name=""
                id=""
                className="border p-1 px-4 rounded-md border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="vendorSelect" className="font-semibold text-lg">
                Type:
              </label>
              <select
                id="vendorSelect"
                onChange={(e) => onSelect(e.target.value)}
                className="border p-1 px-4 rounded-md border-gray-400"
              >
                <option value="">Select Type</option>
                {type.map((recipient) => (
                  <option key={recipient.id} value={recipient.id}>
                    {recipient.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10 my-5">
            <button className="bg-black text-white p-2 rounded-md hover:bg-white hover:text-black hover:border-2 border-black font-semibold">
              Create Package
            </button>
          </div>
      </div>
    </section>
  );
};



export default CreateOutbound
