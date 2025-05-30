import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

import Account from "./Account";
import { PiPlusCircle } from "react-icons/pi";
import Switch from "../../Buttons/Switch";


const Country = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [showCountry, setShowCountry] = useState(false);
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (selectedOptions) => {
    setSelectedCountries(selectedOptions);
  };

  const handleSubmit = () => {
    setShowCountry(true);
  };

  return (
    <div className="w-full mt-1">
      <Account />
      <div className="flex flex-col mx-10 my-12 gap-2">
        <h2
          className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center w-44 gap-2"
          onClick={() => setShowCountry(!showCountry)}
        >
          <PiPlusCircle size={20} />
          Add Countries
        </h2>
        {showCountry && (
          <div>
            <Select
              options={options}
              onChange={changeHandler}
              isMulti
              value={selectedCountries}
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        )}

        <div className="flex items-center ">
          {/* {showCountry && selectedCountries.length > 0 && ( */}
          <div className="mt-4 w-screen">
            <table className="border-collapse  w-full ">
              <thead>
                <tr>
                  <th className=" border-md p-2 bg-black border-r-2 text-white rounded-l-xl">
                    Country
                  </th>
                  <th className="  rounded-r-xl p-2 bg-black text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedCountries.map((country, index) => (
                  <tr key={index} className="border-md border-black border-b-2">
                    <td className="text-center  p-2 border-r-2 border-black">
                      {country.label}
                    </td>
                    <td className="text-center p-2 ">
                      <Switch/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Country;
