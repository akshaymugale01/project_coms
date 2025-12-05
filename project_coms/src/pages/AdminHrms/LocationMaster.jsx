import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";

import PayrollSettingDetailsList from "./PayrollSettingDetailsList";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { editOrganizationLocation, getMyOrganizationLocations, getOrganizationLocation } from "../../api";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const LocationMaster = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    city: "",
    country: "",
    state: "",
  });
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
  const themeColor = useSelector((state) => state.theme.color);
  const [id, setId] = useState("");
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
  const closeModal = () => setModalIsOpen(false);
  useEffect(()=>{
    fetchMyOrgLocation()
  },[])

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

  return (
    <section className="flex ml-20">
      {/* <OrganisationSetting/> */}
      <PayrollSettingDetailsList />
      <div className=" w-full flex m-2 flex-col overflow-hidden">
        <div className=" flex justify-between my-2">
          <input
            type="text"
            placeholder="Search by name "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-md p-2"
              value={searchText}
              onChange={handleSearch}
          />
          {/* <Link
            to={"/templates/leave-templates"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </Link> */}
        </div>
        <Table columns={columns} data={filteredLocations} isPagination={true} />
      </div>
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
    </section>
  );
};

export default LocationMaster;
