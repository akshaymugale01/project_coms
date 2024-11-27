import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import Select from "react-select";
import toast from "react-hot-toast";
import { getAllUnits, getSites, getUnits, postSetupUsers } from "../../../api";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [sites, setSites] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "",
    unitId: "",
    mobile: "",
    site_ids: [],
  });
  console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeSelectSite = (selectedOption) => {
    setSelectedOption(selectedOption);
    const selectedSiteIds = selectedOption.map((option) => option.value);
    setFormData({ ...formData, site_ids: selectedSiteIds });
  };

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const sitesResp = await getSites();
        const transformedSites = sitesResp.data.map((site) => ({
          value: site.id,
          label: site.name,
        }));
        setSites(transformedSites);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUnits = async () => {
      try {
        const unitResp = await getAllUnits();
        setUnits(unitResp.data);
        console.log(unitResp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnits();
    fetchSites();
  }, []);
  const navigate = useNavigate();
  const handleAddUser = async () => {
    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.userType === ""
    ) {
      return toast.error("All fields are required !");
    }

    const postData = new FormData();
    postData.append("user[firstname]", formData.firstName);
    postData.append("user[lastname]", formData.lastName);
    postData.append("user[email]", formData.email);
    postData.append("user[mobile]", formData.mobile);
    postData.append("user[password]", formData.password);
    postData.append("user[user_type]", formData.userType);
    postData.append("user[unit_id]", formData.unitId);
    formData.site_ids.forEach((siteId) => {
      postData.append("site_ids[]", siteId);
    });
    try {
      const resp = await postSetupUsers(postData);
      toast.success("User created successfully");
      console.log(resp);
      navigate("/setup/users-setup");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col gap-4 overflow-hidden my-5">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold p-2  rounded-full text-white"
        >
          Add New User
        </h2>
        <div className="md:mx-20 my-5 md:mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg ">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1 ">
              <label htmlFor="" className="font-semibold">
                First Name :
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                className="border p-2 px-4 border-gray-300  rounded-md placeholder:text-sm"
              />
            </div>

            <div className="flex flex-col gap-1 ">
              <label htmlFor="" className="font-semibold">
                Last Name :
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                className="border p-2 px-4 border-gray-300  rounded-md placeholder:text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-semibold">
                Email :
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="border p-2 px-4 border-gray-300  rounded-md placeholder:text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-semibold">
                Mobile No. :
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile no."
                className="border p-2 px-4 border-gray-300  rounded-md placeholder:text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-semibold">
                Password :
              </label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="border p-2 px-4 border-gray-300  rounded-md placeholder:text-sm"
              />
            </div>
            <div className="flex gap-1 flex-col">
              <label htmlFor="" className="font-semibold">
                User Type :
              </label>
              <select
                name="userType"
                value={formData.userType}
                id=""
                onChange={handleChange}
                className="border p-2 px-4 border-gray-300  rounded-md placeholder:text-sm"
              >
                <option value="">Select User Type</option>
                <option value="pms_admin">Admin</option>
                <option value="pms_technician">Technician</option>
                <option value="pms_occupant_admin">Unit Owner</option>
                <option value="pms_occupant">Unit Resident</option>
                <option value="face_scanner">Face Scanner</option>
                <option value="Tm">Approving Authority</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-semibold">
                Select Unit :
              </label>
              <select
                name="unitId"
                value={formData.unitId}
                id=""
                onChange={handleChange}
                className="border p-2 px-4 border-gray-300  rounded-md placeholder:text-sm"
              >
                <option value="">Select Unit</option>
                {units.map((unit) => (
                  <option value={unit.id} key={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-1 flex-col">
              <label htmlFor="" className="font-semibold">
                Associated Sites :
              </label>
              <Select
                isMulti
                onChange={handleChangeSelectSite}
                options={sites}
                noOptionsMessage={() => "Sites not available..."}
                maxMenuHeight={90}
                styles={{
                  placeholder: (baseStyles, state) => ({
                    ...baseStyles,
                    color: "black",
                  }),
                  clearIndicator: (baseStyles) => ({
                    ...baseStyles,
                    color: "red",
                  }),
                  dropdownIndicator: (baseStyles) => ({
                    ...baseStyles,
                    color: "black",
                  }),
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderColor: "darkblue",
                  }),
                  multiValueRemove: (baseStyles, state) => ({
                    ...baseStyles,
                    color: state.isFocused ? "red" : "gray",
                    backgroundColor: state.isFocused ? "black" : "lightgreen",
                  }),
                }}
                menuPosition={"fixed"}
              />
            </div>
          </div>

          <div className="md:flex grid md:grid-cols-2 gap-2 my-5 justify-center">
            <button
              onClick={handleAddUser}
              className="bg-black text-white p-1 px-4 rounded-md font-medium"
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddUser;
