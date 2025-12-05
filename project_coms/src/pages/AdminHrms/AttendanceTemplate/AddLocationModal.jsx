import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const AddLocationModal = ({onClose}) => {
  const [locationLabel, setLocationLabel] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-5xl max-h-[90%] overflow-y-auto hide-scrollbar">
        <h2 className="text-2xl font-bold mb-4">Add Location</h2>
        <div className="grid grid-cols-12 gap-4">
          <div className=" flex flex-col gap-4 col-span-3 border rounded-xl p-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location Label
              </label>
              <input
                type="text"
                value={locationLabel}
                onChange={(e) => setLocationLabel(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Radius in meters
              </label>
              <input
                type="text"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="flex gap-2">
                <button className="border-2 rounded-full border-green-500 text-green-500 flex items-center gap-2 p-1 px-2"><FaCheck/> Submit</button>
                <button className="border-2 rounded-full border-red-500 text-red-500 flex items-center gap-2 p-1 px-2" onClick={onClose}><MdClose/> Cancel</button>
            </div>
          </div>
          <div className="col-span-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12684.086484547304!2d72.86411158963308!3d19.063672822328204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8df0bffffff%3A0x1ae312da31f46ddb!2sSofitel%20Mumbai%20BKC!5e0!3m2!1sen!2sin!4v1727429973937!5m2!1sen!2sin"
              width="100%"
              height="400"
              // style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className="rounded-md"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocationModal;
