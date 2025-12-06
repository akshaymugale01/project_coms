import React from "react";

const EmployeePantryDetails = () => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col border-2 rounded-md border-gray-400 w-full mx-10 my-5 p-4">
        <div className="flex justify-end  my-2">
            <button className="bg-green-400 p-1 px-4 rounded-md text-white font-medium">Order</button>
        </div>
        <div className="flex justify-center">
          <img
            src="https://m.media-amazon.com/images/I/81sHFvyr3CL._AC_UF1000,1000_QL80_.jpg"
            alt=""
            className="w-44 h-44 border border-gray-400 rounded-md"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-2 my-2">
          <div className="grid grid-cols-2">
            <p className="font-semibold">Name :</p>
            <p>Chips</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-semibold">Available Stock :</p>
            <p>1</p>
          </div>
        </div>
        <div className="grid ">
          <p className="font-semibold">Description :</p>
          <p className="bg-gray-300 p-1 rounded-md">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero,
            rem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeePantryDetails;
