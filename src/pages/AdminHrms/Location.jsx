import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";

import { BiEdit, BiPlusCircle } from "react-icons/bi";

import OrganisationSetting from "./OrganisationSetting";
import HRMSHelpCenter from "./HRMSHelpCenter";
import {
  editOrganizationLocation,
  getMyOrganizationLocations,
  getOrganizationLocation,
  postMyOrganizationLocations,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const Location = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const themeColor = useSelector((state) => state.theme.color);
  const [formData, setFormData] = useState({
    location: "",
    city: "",
    country: "",
    state: "",
  });

  const closeModal = () => setModalIsOpen(false);
  const columns = [
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },

    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: "Action",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditModal(row.id)}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
  ];

  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchMyOrgLocation = async () => {
    try {
      const myLocationRes = await getMyOrganizationLocations(hrmsOrgId);
      setFilteredLocations(myLocationRes);
      setLocations(myLocationRes);
    } catch (error) {
      console.log(error);
    }
  };

  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredLocations(locations);
    } else {
      const filteredResult = locations.filter((location) =>
        location.location.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredLocations(filteredResult);
    }
  };
  useEffect(() => {
    fetchMyOrgLocation();
  }, []);
  const [id, setId] = useState("");
  const handleEditModal = async (locationId) => {
    setModalIsOpen(true);
    setId(locationId);
    try {
      const locationRes = await getOrganizationLocation(locationId);
      setFormData({
        ...formData,
        city: locationRes.city,
        country: locationRes.country,
        location: locationRes.location,
        state: locationRes.state,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    if (!formData.city) {
      toast.error("City is required");
      return;
    }
    if (!formData.country) {
      toast.error("Country is required");
      return;
    }
    if (!formData.location) {
      toast.error("Location is required");
      return;
    }
    if (!formData.state) {
      toast.error("State is required");
      return;
    }

    const postData = new FormData();
    postData.append("city", formData.city);
    postData.append("country", formData.country);
    postData.append("location", formData.location);
    postData.append("organization", hrmsOrgId);
    postData.append("state", formData.state);

    try {
      const res = await editOrganizationLocation(id, postData);
      fetchMyOrgLocation();
      toast.success("Location updated successfully");
      setModalIsOpen(false);
    } catch (error) {
      toast.error("An error occurred while updating the location");
      console.log(error);
    }
  };
  const handleSaveLocation = async () => {
    if (!formData.city) {
      toast.error("City is required");
      return;
    }
    if (!formData.country) {
      toast.error("Country is required");
      return;
    }
    if (!formData.location) {
      toast.error("Location is required");
      return;
    }
    if (!formData.state) {
      toast.error("State is required");
      return;
    }

    const postData = new FormData();
    postData.append("city", formData.city);
    postData.append("country", formData.country);
    postData.append("location", formData.location);
    postData.append("organization", hrmsOrgId);
    postData.append("state", formData.state);

    try {
      const res = await postMyOrganizationLocations(postData);
      fetchMyOrgLocation();
      toast.success("Location added successfully");
      setAddModalIsOpen(false);
      setFormData({
        ...formData,
        city: "",
        country: "",
        location: "",
        state: "",
      });
    } catch (error) {
      toast.error("An error occurred while adding the location");
      console.log(error);
    }
  };

  return (
    <section className="flex ml-20">
      <OrganisationSetting />
      <div className="w-full flex my-3 mx-2 flex-col overflow-hidden">
        <div className="flex w-full my-2 justify-between gap-2">
          <input
            type="text"
            placeholder="Search by location "
            className="border border-gray-400 w-full placeholder:text-sm rounded-md p-2"
            value={searchText}
            onChange={handleSearch}
          />
          <button
            style={{ background: themeColor }}
            className="flex items-center gap-2 font-medium border-2 text-white p-1 rounded-md"
            onClick={() => setAddModalIsOpen(true)}
          >
            <BiPlusCircle /> Add
          </button>
        </div>
        <Table columns={columns} data={filteredLocations} isPagination={true} />
      </div>
      <HRMSHelpCenter help={"location"} />
      {modalIsOpen && (
        <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
          <div className="max-h-screen h-30 bg-white p-8 w-96 rounded-lg shadow-lg overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Branch Location</h2>
            <div className="grid grid-cols-1 gap-2">
              <div className="grid gap-1">
                <label htmlFor="" className="font-medium">
                  Location
                </label>
                <input
                  type="text"
                  className="border p-2 border-black rounded-md"
                  value={formData.location}
                  onChange={handleChange}
                  name="location"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="">City</label>
                <input
                  type="text"
                  className="border p-2 border-black rounded-md"
                  value={formData.city}
                  onChange={handleChange}
                  name="city"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="">State</label>
                <input
                  type="text"
                  className="border p-2 border-black rounded-md"
                  value={formData.state}
                  onChange={handleChange}
                  name="state"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="">Country</label>
                <input
                  type="text"
                  className="border p-2 border-black rounded-md"
                  value={formData.country}
                  onChange={handleChange}
                  name="country"
                />
              </div>
            </div>
            <div className="flex mt-2 justify-end gap-2 w-full">
              <button
                style={{ background: themeColor }}
                className="bg-black text-white hover:bg-gray-700 font-medium py-2 px-4 rounded"
                onClick={handleSaveEdit}
              >
                Update
              </button>
              <button
                className="bg-red-400 text-white e font-medium py-2 px-4 rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {addModalIsOpen && (
        <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
          <div className="max-h-screen h-30 bg-white p-8 w-96 rounded-lg shadow-lg overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Add Branch Location</h2>
            <div className="grid grid-cols-1 gap-2">
              <div className="grid gap-1">
                <label htmlFor="" className="font-medium">
                  Location
                </label>
                <input
                  type="text"
                  className="border p-2 border-black rounded-md"
                  value={formData.location}
                  onChange={handleChange}
                  name="location"
                  placeholder="Enter Location"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="">City</label>
                <input
                  type="text"
                  className="border p-2 border-black rounded-md"
                  value={formData.city}
                  onChange={handleChange}
                  name="city"
                  placeholder="Enter City"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="">State</label>
                <input
                  type="text"
                  className="border p-2 border-black rounded-md"
                  value={formData.state}
                  onChange={handleChange}
                  name="state"
                  placeholder="Enter State"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="">Country</label>
                <input
                  type="text"
                  className="border p-2 border-black rounded-md"
                  value={formData.country}
                  onChange={handleChange}
                  name="country"
                  placeholder="Enter Country"
                />
              </div>
            </div>
            <div className="flex mt-2 justify-end gap-2 w-full">
              <button
                style={{ background: themeColor }}
                className="bg-black text-white hover:bg-gray-700 font-medium py-2 px-4 rounded"
                onClick={handleSaveLocation}
              >
                Add
              </button>
              <button
                className="bg-red-400 text-white e font-medium py-2 px-4 rounded"
                onClick={() => setAddModalIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Location;
