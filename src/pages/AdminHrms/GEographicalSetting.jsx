import React, { useEffect, useState } from "react";
import OrganisationSetting from "./OrganisationSetting";
import {
  editOrganizationGeoSettings,
  getAllOrganizationGeoSettings,
  getCountriesList,
  getCountryData,
  getOrganizationGeoMasterData,
  postOrganizationGeoSettings,
} from "../../api";
import Select from "react-select";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
const GeographicalSetting = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");
  const [dateFormat, setDateFormat] = useState("");
  const [currency, setCurrency] = useState("");
  const [geoId, setGeoId] = useState("");
  const fetchAllGeoSettings = async () => {
    try {
      const res = await getAllOrganizationGeoSettings(hrmsOrgId);

      if (res.length > 0) {
        fetchGeoMasterData(res[0].geographical_master_data);
        setGeoId(res[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchGeoMasterData = async (geoId) => {
    try {
      const res = await getOrganizationGeoMasterData(geoId);
      setTimezone(res.time_zone);
      setDateFormat(res.date_format);
      setDateFormat(res.date_format);
      setCurrency(res.default_currency);
      setSelectedCountry(res.id);
      setCountry(res.country);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCountries = async () => {
    try {
      const countries = await getCountriesList(hrmsOrgId);
      const options = countries.map((country) => ({
        value: country.id,
        label: country.country,
      }));

      setCountryOptions(options);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };
  useEffect(() => {
    fetchAllGeoSettings();
    fetchCountries();
  }, []);
  const handleSelectChange = async (selectedOption) => {
    setSelectedCountry(selectedOption);

    try {
      const countryInfo = await fetchCountryInfo(selectedOption.value);
    } catch (error) {
      console.error("Error fetching country information:", error);
    }
  };

  const fetchCountryInfo = async (countryId) => {
    try {
      const response = await getCountryData(countryId);
      console.log(response);
      setTimezone(response.time_zone);
      setDateFormat(response.date_format);
      setCurrency(response.default_currency);
    } catch (error) {
      console.log(error);
    }
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const handleEditGeoSetting = async () => {
    if (!selectedCountry.value) {
      return toast.error("Please select country of origin");
    }
    const editData = new FormData();
    editData.append("geographical_master_data", selectedCountry.value);
    editData.append("organization", hrmsOrgId);
    try {
      //
      if (geoId) {
        const res = await editOrganizationGeoSettings(geoId, editData);
        fetchAllGeoSettings();
        toast.success("Geographical setting updated successfully");
        setIsEditing(false);
      } else {
        const res = await postOrganizationGeoSettings(editData);
        fetchAllGeoSettings();
        toast.success("Geographical setting updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-10 ml-20">
      <OrganisationSetting />
      <div className="w-2/3 mt-2  py-6 bg-white rounded-lg ">
        {/* <h2 className="text-xl font-bold mb-4">Geographical Settings</h2> */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6">Geographical Settings</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2"
            >
              <BiEdit /> Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleEditGeoSetting}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded-full flex items-center gap-2"
              >
                <FaCheck /> Save
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mb-4 px-4 py-2 border-2 border-red-500 text-red-400 rounded-full flex items-center gap-2"
              >
                <MdClose /> Cancel
              </button>
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country of Origin
          </label>
          {isEditing ? (
            <Select
              id="country"
              value={selectedCountry}
              onChange={handleSelectChange}
              options={countryOptions}
              placeholder="Select a country"
              noOptionsMessage={() => "No countries available"}
              isDisabled={!isEditing}
            />
          ) : (
            <input
              id="timezone"
              className={`w-full px-3 py-2 border border-gray-50 rounded-md bg-gray-200
            `}
              value={country}
              // onChange={(e) => setTimezone(e.target.value)}
              disabled
            />
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="timezone"
            className="block text-sm font-medium text-gray-700"
          >
            Timezone
          </label>
          <input
            id="timezone"
            className={`w-full px-3 py-2 border border-gray-50 rounded-md bg-gray-200
              `}
            value={timezone}
            // onChange={(e) => setTimezone(e.target.value)}
            disabled
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dateFormat"
            className="block text-sm font-medium text-gray-700"
          >
            Date Format
          </label>
          <input
            id="dateFormat"
            className={`w-full px-3 py-2 border border-gray-50 rounded-md bg-gray-200
              `}
            disabled
            value={dateFormat}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-700"
          >
            Default Currency
          </label>
          <input
            id="currency"
            className={`w-full px-3 py-2 border border-gray-50 rounded-md bg-gray-200
            `}
            value={currency}
            // onChange={(e) => setCurrency(e.target.value)}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default GeographicalSetting;
