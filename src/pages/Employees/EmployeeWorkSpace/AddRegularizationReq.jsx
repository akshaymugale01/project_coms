import React from "react";
import { useSelector } from "react-redux";

const AddRegularizationReq = ({ onclose }) => {
    const themeColor = useSelector((state)=> state.theme.color)
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-20">
      <div className="bg-white overflow-auto max-h-[70%]  md:w-auto w-96 p-4 px-8 flex flex-col rounded-md gap-5">
        <div>
          <h2 className="font-medium mb-2 border-b">New Regularization Request</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="type" className="font-medium ">Type of Request </label>
              <select
                name=""
                id="type"
                className="border border-gray-300 rounded-md p-1"
              >
                <option value="">Select Request Type</option>
                <option value="checkIn">Check In Request</option>
                <option value="checkOut">Check Out Request</option>
                <option value="checkIn&Out">
                  Check In & Check Out Request
                </option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="type" className="font-medium ">Check-In </label>
             <input type="time"  className="border border-gray-300 rounded-md p-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="type" className="font-medium ">Check-Out </label>
             <input type="time"  className="border border-gray-300 rounded-md p-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="type" className="font-medium ">Reason </label>
              <select
                name=""
                id="type"
                className="border border-gray-300 rounded-md p-1"
              >
                <option value="">Select Reason</option>
                <option value="forgot">Forgot</option>
                <option value="outdoorDuty">Outdoor Duty</option>
                <option value="onField">
                  On Field
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="type" className="font-medium ">Comment </label>
              <textarea name="" id="" rows={"2"} className="border border-gray-300 rounded-md p-1"></textarea>
            </div>
          </div>
          <div className="my-2 flex justify-end gap-2">
<button className="p-1 px-2 text-white rounded-md" style={{background: themeColor}}>Submit</button>
          <button onClick={onclose} className="p-1 px-2 text-white rounded-md bg-red-400">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRegularizationReq;
