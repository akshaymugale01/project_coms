import React, { useState } from "react";
import Account from "./Account";
import { PiPlusCircle } from "react-icons/pi";
import Switch from "../../Buttons/Switch";

const Entity = () => {
  const [entity, setEntity] = useState("");

  const [showCountry, setShowCountry] = useState(false);
  

  const handleSubmit = () => {
    setShowCountry(true);
  };

  return (
    <div className="w-full mt-1">
      <Account />
      <div className="flex flex-col mx-10 my-10 gap-2">
        <h2
          className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center w-44 gap-2"
          onClick={() => setShowCountry(!showCountry)}
        >
          <PiPlusCircle size={20} />
          Add Entity
        </h2>
        {showCountry && (
          <div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter Entity Name"
                className="border border-gray-500 rounded-md mt-5 p-2"
                value={entity}
                onChange={(e) => setEntity(e.target.value)}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        )}

        <div className="flex justify-center items-center ">
          {/* {showCountry && selectedCountries.length > 0 && ( */}
          <div className="mt-4 w-screen">
            <table className="border-collapse  w-full ">
              <thead>
                <tr>
                  <th className=" border-md p-2 bg-black border-r-2 text-white rounded-l-xl">
                    Actions
                  </th>
                  <th className=" border-md p-2 bg-black border-r-2 text-white ">
                    Active/Inactive
                  </th>
                  <th className=" border-md p-2 bg-black border-r-2 text-white rounded-r-xl ">
                    Entity
                  </th>
                </tr>
              </thead>

             
                <tbody>
                  
                    <tr
                      
                      className="border-md border-black border-b-2"
                    >
                      <td className="text-center p-2 border-r-2 border-black">
                        Edit
                      </td>
                      <td className="text-center p-2 border-r-2 border-black">
                     <Switch/>
                      </td>
                      <td className="text-center p-2">
                        {entity}
                      </td>
                     
                    </tr>
                  
                </tbody>
              
            </table>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Entity;
