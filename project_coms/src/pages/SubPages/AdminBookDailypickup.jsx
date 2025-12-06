import React, { useState } from "react";

const AdminBookDailypickup = () => {
  const [formData, setFormData] = useState({
    behalf: "self",
  });
  return (
    <div className="flex justify-center items-center my-5 w-full md:p-4 ">
      <form
        className="md:border  border-gray-300 rounded-lg md:p-4 w-full mx-4"
        // onSubmit={handleSubmit}
      >
        <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
          Book New Pickup and Drop-Off Ride
        </h2>

        <div className="flex flex-col my-5 justify-around w-full gap-4">
          <div className="grid md:grid-cols-3">
          {/* <div className="flex flex-col md:flex-row justify-around items-center"> */}
            <label htmlFor="" className="font-semibold">
              On Behalf of :
            </label>
            <div className="grid grid-cols-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="behalf"
                  checked={formData.behalf === "self"}
                  onChange={() => setFormData({ ...formData, behalf: "self" })}
                  id="self"
                />
                <label htmlFor="self">Self</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="behalf"
                  id="other"
                  checked={formData.behalf === "other"}
                  onChange={() => setFormData({ ...formData, behalf: "other" })}
                />
                <label htmlFor="other">Other User</label>
              </div>
            </div>
          {formData.behalf === "other" && (
            <div className="grid md:grid-cols-2">
              <label htmlFor="" className="font-medium">Select User :</label>
              <select className="border p-1 px-4 border-gray-500 rounded-md">
                <option value="" className="text-gray-300">
                  Select User{" "}
                </option>
                <option value="unit1">User 1</option>
                <option value="unit2">User 2</option>
                <option value="unit2">User 3</option>
              </select>
            </div>
          )}
          </div>
          <div className="flex flex-col justify-around">
            <label htmlFor="" className="font-semibold">
              Pickup Location:
            </label>
            <textarea
              name="heading"
              placeholder="Enter Pickup Location"
              cols="15"
              rows="1"
              //   value={formData.heading}
              //   onChange={handleChange}
              className="border p-2 rounded-md border-black"
            ></textarea>
          </div>
          <div className="flex flex-col justify-around">
            <label htmlFor="" className="font-semibold">
              Drop-off Location:
            </label>
            <textarea
              name="heading"
              placeholder="Enter Drop-off Location"
              cols="15"
              rows="1"
              //   value={formData.heading}
              //   onChange={handleChange}
              className="border p-2 rounded-md border-black"
            ></textarea>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="grid grid-cols-2 items-center">
              <label htmlFor="" className="font-medium">
                {" "}
                Date :
              </label>
              <input
                type="date"
                name=""
                id=""
                className="w-40 border border-gray-500 px-4 rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 items-center">
              <label htmlFor="" className="font-medium md:text-center">
                Time :
              </label>
              <input
                type="time"
                name=""
                id=""
                className="w-40 border border-gray-500 px-4 rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 items-center">
              <label htmlFor="" className="font-medium">
                No. Of Passengers :
              </label>
              <input
                type="number"
                placeholder="No. of Passengers"
                name=""
                id=""
                className="w-40 border border-gray-500 p-1 placeholder:text-sm rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-around">
            <label htmlFor="" className="font-semibold">
              Additional note :
            </label>
            <textarea
              name="heading"
              placeholder="Additional note"
              cols="15"
              rows="3"
              //   value={formData.heading}
              //   onChange={handleChange}
              className="border p-2 rounded-md border-black"
            ></textarea>
          </div>
        <div className="flex gap-5 justify-center items-center my-4">
          <button
            type="submit"
            className={`text-white bg-black hover:bg-white hover:text-black border-2 border-black font-semibold py-2 px-4 rounded transition-all duration-300 `}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBookDailypickup;
