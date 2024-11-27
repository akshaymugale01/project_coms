import React from "react";
import Navbar from "../../components/Navbar";

const AddPantry = () => {
  return (
    <section className="min-h-screen p-4 sm:p-0 flex flex-col md:flex-row">
      <div className="fixed hidden sm:block left-0 top-0 h-full md:static md:h-auto md:flex-shrink-0">
        <Navbar />
      </div>
      <div className="border border-gray-300 rounded-lg w-full md:mx-20 px-8 flex flex-col my-2 gap-5">
        <h2 className="text-center text-xl font-bold my-2 p-2 bg-black rounded-full text-white">
          Add New Item
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="name" className="font-semibold">
              Name :
            </label>
            <input
              type="text"
              name="name"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Item Name"
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="stock" className="font-semibold">
              Stock :
            </label>
            <input
              type="text"
              name="stock"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Stock"
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="stock" className="font-semibold">
              Upload Image :
            </label>
            <input type="file" name="" id="" />
          </div>
        </div>
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="stock" className="font-semibold">
            Description :
          </label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="4"
            className="border border-gray-400 p-2 rounded-md"
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black text-white hover:bg-gray-700 font-semibold text-xl py-1 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddPantry;
// name, availabe stock, description
