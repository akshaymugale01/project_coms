import React from "react";
import { TiDocumentText } from "react-icons/ti";

function AssetDetailsLogs() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="border border-gray-500 rounded-md p-5 my-5">
        <div className="flex gap-2 items-center">
          <div className="bg-gray-300 text-white flex justify-center items-center p-3 w-fit rounded-full">
            <TiDocumentText size={20} />
          </div>
          <h2 className="text-gray-500 text-xl">LOGS</h2>
        </div>
        <div className="md:flex gap-5 my-5">
          <div>
            <img src="/profile3.jpg" className="w-20 h-20 rounded-md"></img>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Karan Singh made below changes:-
            </p>
            <div className="grid md:grid-cols-2">
              <h2 className="font-medium">Meter Category:</h2>
              <h2 className="font-medium">
                From:Diesel Changed-to:Diesel generator
              </h2>
            </div>
          </div>
        </div>
        <div className="md:flex gap-5 my-5">
          <div>
            <img src="/profile3.jpg" className="w-20 h-20 rounded-md"></img>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Karan Singh made below changes:-
            </p>
            <div className="grid md:grid-cols-2">
              <h2 className="font-medium">Model No:</h2>
              <h2 className="font-medium">From:MH02 Changed-to:7801</h2>
            </div>
            <div className="grid md:grid-cols-2">
              <h2 className="font-medium">Purchased On:</h2>
              <h2 className="font-medium">From:NA Changed-to:01/08/2024</h2>
            </div>
            <div className="grid md:grid-cols-2">
              <h2 className="font-medium">Wing:</h2>
              <h2 className="font-medium">From:NA Changed-to:A</h2>
            </div>
            <div className="grid md:grid-cols-2">
              <h2 className="font-medium">Group:</h2>
              <h2 className="font-medium">From:Demo Changed-to:Assets</h2>
            </div>
            <div className="grid md:grid-cols-2">
              <h2 className="font-medium">Serial No:</h2>
              <h2 className="font-medium">From:safasf2213 Changed-to:535</h2>
            </div>
            <div className="grid md:grid-cols-2">
              <h2 className="font-medium">Breakdown:</h2>
              <h2 className="font-medium">From:false Changed-to:NA</h2>
            </div>
            <div className="grid md:grid-cols-2">
              <h2 className="font-medium">Asset Number:</h2>
              <h2 className="font-medium">From:AC2112 Changed-to:500</h2>
            </div>
            <div className="grid md:grid-cols-2">
              <h2 className="font-medium">Meter Category:</h2>
              <h2 className="font-medium">Meter Category:</h2>
            </div>
          </div>
        </div>
        <div className="flex gap-5 my-5">
          <div>
            <img src="/profile3.jpg" className="w-20 h-20 rounded-md"></img>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">
              Karan Singh made below changes:-
            </p>
            <div className="grid grid-cols-2">
              <h2 className="font-medium">Meter Category:</h2>
              <h2 className="font-medium">
                From:Diesel Changed-to:Diesel generator
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetDetailsLogs;
