import React from "react";

const OutwardPassDetails = () => {
  return (
    <section>
      <div className="flex  justify-center bg-black m-4 p-2 rounded-md">
        <h2 className="text-xl font-semibold text-center text-white ">
          Goods Outward Details
        </h2>
      </div>
      <div className="flex flex-col items-center mx-10">

        <div className=" flex justify-end w-full">

        </div>
        <div className="grid grid-cols-3 w-full gap-5 my-5">
        <p  className="text-xl font-medium">Type :</p>
        <p  className="text-xl font-medium">Returnable :</p>
        <p  className="text-xl font-medium">Expected time :</p>
        <p  className="text-xl font-medium">Category :</p>
          <p  className="text-xl font-medium">Person Name :</p>
          <p  className="text-xl font-medium">Mode of Transport :</p>
          <p  className="text-xl font-medium">LR No. :</p>
          <p  className="text-xl font-medium">Trip ID :</p>
          <p  className="text-xl font-medium">Gate Entry :</p>
          <p  className="text-xl font-medium">Item Details :</p>
        </div>
      </div>
    </section>
  );
};

export default OutwardPassDetails;