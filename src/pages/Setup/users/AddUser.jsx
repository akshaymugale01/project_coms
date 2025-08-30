import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import Select from "react-select";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  getFloors,
  getSites,
  getUnits,
  getBuildings,
  postSetupUsers,
} from "../../../api";
import { useNavigate } from "react-router-dom";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { RiDeleteBin5Line } from "react-icons/ri";
import { color } from "highcharts";

const AddUser = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const siteId = getItemInLocalStorage("SITEID");
  const [sites, setSites] = useState([]);
  const [units, setUnits] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [filtteredFloors, setFilteredFloors] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [floors, setFloors] = useState([]);
  const [selectedFloorId, setSelectedFloorId] = useState("");
  const [members, setMembers] = useState([]);
  // const [units, setUnits] = useState([]);
  const [showMemberFields, setShowMemberFields] = useState(false);
  const [memberData, setMemberData] = useState([
    {
      member_type: "",
      member_name: "",
      contact: "",
      relation: "",
    },
  ]);

  const [vendorList, setVendorList] = useState([
    { service_type: "", name: "", contact: "" },
  ]);

  const [occupancy_type, setOccupancy_type] = useState("");

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    userType: "unit_resident",
    site_ids: [siteId], // Make sure siteId is defined before this runs
    moving_date: "",
    building_id: selectedBuilding, // Same here
    lease_expiry: "",
    lives_here: "",
    profession: "",
    mgl_customer_number: "",
    adani_electricity_account_no: "",
    net_provider_name: "",
    net_provider_id: "",
    blood_group: "",
    no_of_pets: "",
    birth_date: "",
    user_sites: [
      {
        unit_id: selectedUnit,
        site_id: siteId,
        ownership: occupancy_type, // Will be filled later from formData.occupancy_type
        ownership_type: "primary",
        is_approved: true,
        lives_here: "",
      },
    ],

    user_members: [], // Now an array
    user_vendors: [],
  });

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
    // Optional: log or trigger side effects
    console.log("Selected unit ID:", e.target.value);
  };

  const handleAddVendor = () => {
    setVendorList([...vendorList, { service: "", name: "", contact: "" }]);
  };

  const handleDeleteVendor = (index) => {
    const updated = [...vendorList];
    updated.splice(index, 1);
    setVendorList(updated);
  };

  const handleVendorChange = (index, field, value) => {
    const updated = [...vendorList];
    updated[index][field] = value;
    setVendorList(updated);
  };

  console.log("formData", formData);

  const navigate = useNavigate();

  // const handleAddSite = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     user_sites: [
  //       ...prev.user_sites,
  //       {
  //         unit_id: "",
  //         site_id: siteId,
  //         ownership: "",
  //         ownership_type: "",
  //         is_approved: false,
  //         lives_here: "",
  //       },
  //     ],
  //   }));
  // };

  // const handleSiteChange = (index, field, value) => {
  //   setFormData((prev) => {
  //     const updatedSites = [...prev.user_sites];
  //     updatedSites[index][field] = value;
  //     return { ...prev, user_sites: updatedSites };
  //   });
  // };

  // const handleRemoveSite = (index) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     user_sites: prev.user_sites.filter((_, i) => i !== index),
  //   }));
  // };

  const validateMobileInput = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly.slice(0, 10); // Always returns string
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstname" || name === "lastname") {
      const validated = value.replace(/[^a-zA-Z]/g, "");
      setFormData((prev) => ({ ...prev, [name]: validated }));
      return;
    }

    if (name === "mobile") {
      const validated = validateMobileInput(value);
      setFormData((prev) => ({ ...prev, [name]: validated }));
      return;
    }

    if (name === "email") {
      // Remove all spaces from email input
      const noSpaces = value.replace(/\s/g, "");
      setFormData((prev) => ({ ...prev, [name]: noSpaces }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sitesResp, buildingResp, unitsResp] = await Promise.all([
          getSites(),
          getBuildings(),
          // const floors = getFloors(selectedBuilding),
        ]);
        setSites(
          sitesResp.data.map((site) => ({
            value: site.id,
            label: site.name,
          }))
        );
        setFilteredBuildings(buildingResp.data);
        // setUnits(unitsResp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log("All sites data", sites);
  console.log("All units data", units);
  console.log("Filtered building", filteredBuildings);

  // 🧩 Generic input handler
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddMember = () => {
    setMembers((prev) => [...prev, { name: "", contact: "", relation: "" }]);
  };

  // Update member field
  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  // Delete member row
  const handleDeleteMember = (index) => {
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
  };

  const handleAddUser = async () => {
    const {
      firstname,
      lastname,
      email,
      mobile,
      password,
      moving_date,
      occupancy_type,
      lease_expiry,
      userType,
      site_ids,
      lives_here,
      profession,
      mgl_customer_number,
      adani_electricity_account_no,
      net_provider_name,
      net_provider_id,
      blood_group,
      no_of_pets,
      birth_date,
    } = formData;

    // Validate required fields
    if (
      !firstname ||
      !lastname ||
      !email ||
      !mobile ||
      !password ||
      !moving_date ||
      !occupancy_type ||
      !selectedBuilding ||
      !selectedFloorId ||
      !selectedUnit
    ) {
      return toast.error("Please fill all mandatory fields marked with *");
    }

    // Conditional check for lease expiry
    if (occupancy_type === "tenant" && !lease_expiry) {
      return toast.error("Lease expiry date is required for tenants");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    // Validate mobile number format (Indian 10-digit starting with 6-9)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      return toast.error("Please enter a valid 10-digit mobile number");
    }

    const postData = {
      user: {
        firstname,
        lastname,
        email,
        password,
        mobile,
        userType,
        moving_date,
        building_id: selectedBuilding,
        lease_expiry,
        lives_here,
        profession,
        mgl_customer_number,
        adani_electricity_account_no,
        net_provider_name,
        net_provider_id,
        blood_group,
        no_of_pets,
        birth_date,
        user_sites: [
        {
          unit_id: selectedUnit,
          site_id: siteId,
          ownership: occupancy_type,
          ownership_type: "primary",
          is_approved: true,
          lives_here,
        },
      ],

      user_members: members.map((member) => ({
        member_type: member.type,
        member_name: member.name,
        contact: member.contact,
        relation: member.relation,
      })),

      user_vendors: vendorList.map((vendor) => ({
        service_type: vendor.service,
        name: vendor.name,
        contact: vendor.contact,
      })),
      },
      site_ids,
    };

    // Proceed with submission
    try {
      await postSetupUsers(postData); // API call
      toast.success("User added successfully!");
      navigate("/setup/users-setup"); // Navigate back to users list
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user. Please try again.");
    }
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col gap-4 overflow-hidden my-5">
        <h2
          style={{ background: `rgb(17, 24, 39)` }}
          className="text-center text-xl font-bold p-2 rounded-full text-white"
        >
          Add New User
        </h2>
        <div className="md:mx-20 my-5 md:mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg">
          {/* User Details */}
          <div className="grid mt-5 md:grid-cols-2 gap-4">
            {[
              { label: "First Name", type: "text" },
              { label: "Last Name", type: "text" },
              { label: "Email", type: "email" },
              { label: "Mobile", type: "tel" },
              { label: "Password", type: "password" },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <label className="font-semibold">
                  {field.label}: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type={field.type}
                  name={field.label.toLowerCase().replace(" ", "")}
                  value={formData[field.label.toLowerCase().replace(" ", "")]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label}`}
                  className="border p-2 px-4 border-gray-300 rounded-md placeholder:text-sm"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-4">
            <div className="grid mt-10 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">
                  Tower: <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="border p-2 px-4 border-gray-300 rounded rounded-md placeholder:text-sm"
                  value={selectedBuilding}
                  onChange={async (e) => {
                    const buildingId = e.target.value;
                    setSelectedBuilding(buildingId);
                    if (buildingId) {
                      try {
                        const response = await getFloors(buildingId);
                        setFloors(response.data);
                      } catch (error) {
                        console.error("Error fetching floors:", error);
                        setFloors([]);
                      }
                    } else {
                      setFloors([]);
                    }
                  }}
                >
                  <option value="">-- Choose Building --</option>
                  {filteredBuildings.map((building) => (
                    <option key={building.id} value={building.id}>
                      {building.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">
                  Floor: <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="border p-2 px-4 border-gray-300 rounded rounded-md placeholder:text-sm"
                  value={selectedFloorId}
                  onChange={async (e) => {
                    const floorId = e.target.value;
                    setSelectedFloorId(floorId);

                    if (floorId) {
                      try {
                        const response = await getUnits(floorId);
                        setUnits(response.data);
                      } catch (error) {
                        console.error("Error fetching units:", error);
                        setUnits([]);
                      }
                    } else {
                      setUnits([]);
                    }
                  }}
                >
                  <option value="">-- Choose Floor --</option>
                  {floors.map((floor) => (
                    <option key={floor.id} value={floor.id}>
                      {floor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">
                  Units: <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="border p-2 px-4 border-gray-300 rounded-md placeholder:text-sm"
                  value={selectedUnit}
                  onChange={handleUnitChange}
                >
                  <option value="">-- Choose Unit --</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 🗓️ Moving Date */}
              <div className="flex flex-col gap-2">
                <label htmlFor="moving_date" className="font-semibold">
                  Moving Date: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  id="moving_date"
                  name="moving_date"
                  className="border p-2 rounded border-gray-300"
                  value={formData.moving_date || ""}
                  onChange={(e) =>
                    handleInputChange("moving_date", e.target.value)
                  }
                />
              </div>

              {/* 🏠 Owner/Tenant Dropdown */}
              <div className="flex flex-col gap-2">
                <label htmlFor="occupancy_type" className="font-semibold">
                  Occupancy Type: <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="occupancy_type"
                  name="occupancy_type"
                  className="border p-2 rounded border-gray-300"
                  value={formData.occupancy_type}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleInputChange("occupancy_type", value);

                    //Clear lease_expiry if switching to owner
                    if (value !== "tenant") {
                      handleInputChange("lease_expiry", "");
                    }
                  }}
                >
                  <option value="">-- Select --</option>
                  <option value="owner">Owner</option>
                  <option value="tenant">Tenant</option>
                </select>
              </div>
              {/* 📅 Lease Expiry Date (only if Tenant) */}
              {formData.occupancy_type === "tenant" && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="lease_expiry" className="font-semibold">
                    Lease Expiry Date: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="date"
                    id="lease_expiry"
                    name="lease_expiry"
                    className="border p-2 rounded border-gray-300 w-40"
                    value={formData.lease_expiry}
                    onChange={(e) =>
                      handleInputChange("lease_expiry", e.target.value)
                    }
                  />
                </div>
              )}

              {/* 💼 Pets */}
              <div className="flex flex-col gap-2">
                <label htmlFor="profession" className="font-semibold">
                  Pets(if any):
                </label>
                <input
                  type="number"
                  min={0}
                  id="no_of_pets"
                  name="no_of_pets"
                  className="border p-2 rounded border-gray-300"
                  placeholder="Number of pets"
                  value={formData.no_of_pets || ""}
                  onChange={(e) =>
                    handleInputChange("no_of_pets", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* 🩸 Blood Group (2 characters max) */}
              <div className="flex flex-col gap-2">
                <label htmlFor="blood_group" className="font-semibold">
                  Blood Group:
                </label>
                <input
                  type="text"
                  id="blood_group"
                  name="blood_group"
                  maxLength={3}
                  className="border p-2 rounded border-gray-300"
                  placeholder="e.g. A+, B-"
                  value={formData.blood_group || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "blood_group",
                      e.target.value.toUpperCase()
                    )
                  }
                />
              </div>

              {/* 🎂 Date of Birth */}
              <div className="flex flex-col gap-2">
                <label htmlFor="dob" className="font-semibold">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  className="border p-2 rounded border-gray-300"
                  value={formData.birth_date || ""}
                  onChange={(e) =>
                    handleInputChange("birth_date", e.target.value)
                  }
                />
              </div>

              {/* 💼 Profession */}
              <div className="flex flex-col gap-2">
                <label htmlFor="profession" className="font-semibold">
                  Profession:
                </label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  className="border p-2 rounded border-gray-300"
                  placeholder="Enter profession"
                  value={formData.profession || ""}
                  onChange={(e) =>
                    handleInputChange("profession", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {/* ➕ Add Button */}
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleAddMember}
            >
              Add Family Member
            </button>

            {/* 👨‍👩‍👧 Member Rows */}
            {members.map((member, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
              >
                {/* Member Type Dropdown */}
                <div className="flex flex-col mt-2 gap-2">
                  <label className="font-semibold">Member Type:</label>
                  <select
                    className="border p-2 rounded border-gray-300"
                    value={member.type}
                    onChange={(e) =>
                      handleMemberChange(index, "type", e.target.value)
                    }
                  >
                    <option value="">-- Select --</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                  </select>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Member's Name:</label>
                  <input
                    type="text"
                    className="border p-2 rounded border-gray-300"
                    value={member.name}
                    onChange={(e) => {
                      const validated = e.target.value.replace(
                        /[^a-zA-Z ]/g,
                        ""
                      );
                      handleMemberChange(index, "name", validated);
                    }}
                  />
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Contact Details:</label>
                  <input
                    type="tel"
                    className="border p-2 rounded border-gray-300"
                    value={member.contact}
                    onChange={(e) => {
                      const input = e.target.value;
                      const digitsOnly = input.replace(/\D/g, "");
                      if (digitsOnly.length <= 10) {
                        handleMemberChange(index, "contact", digitsOnly);
                      }
                    }}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                  />
                </div>

                {/* Relation */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Relation:</label>
                  <input
                    type="text"
                    className="border p-2 rounded border-gray-300"
                    value={member.relation}
                    onChange={(e) =>
                      handleMemberChange(index, "relation", e.target.value)
                    }
                  />
                </div>

                {/* ❌ Delete Button */}
                <div className="inline-block">
                  <button
                    type="button"
                    className="px-2 py-1 rounded hover:bg-red-100"
                    onClick={() => handleDeleteMember(index)}
                  >
                    <RiDeleteBinLine className="text-red-600 w-7 h-7" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Section Header */}

          <div className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-5">
              Utility & Services Information
            </h2>
            <hr className="border-t border-gray-300 mb-6" />

            {/* 📦 Input Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 🔌 MGL Customer Number */}
              <div className="flex flex-col mt-5">
                <label
                  htmlFor="mgl_number"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  MGL Customer Number
                </label>
                <input
                  type="text"
                  id="mgl_customer_number"
                  name="mgl_customer_number"
                  className="border border-gray-300 rounded-md p-2"
                  value={formData.mgl_customer_number || ""}
                  onChange={(e) =>
                    handleInputChange("mgl_customer_number", e.target.value)
                  }
                />
              </div>

              {/* ⚡ Adani Electricity Account Number */}
              <div className="flex flex-col mt-5">
                <label
                  htmlFor="adani_electricity_account_no"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Adani Electricity Account Number
                </label>
                <input
                  type="text"
                  id="adani_electricity_account_no"
                  name="adani_electricity_account_no"
                  className="border border-gray-300 rounded-md p-2"
                  value={formData.adani_electricity_account_no || ""}
                  onChange={(e) =>
                    handleInputChange("adani_electricity_account_no", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                {/* 🌐 Internet Provider Name */}
                <div className="flex flex-col">
                  <label
                    htmlFor="net_provider_name"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Internet Provider Name
                  </label>
                  <input
                    type="text"
                    id="net_provider_name"
                    name="net_provider_name"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={formData.net_provider_name || ""}
                    onChange={(e) =>
                      handleInputChange("net_provider_name", e.target.value)
                    }
                  />
                </div>

                {/* 🆔 Internet ID */}
                <div className="flex flex-col">
                  <label
                    htmlFor="net_provider_id"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Internet ID
                  </label>
                  <input
                    type="text"
                    id="net_provider_id"
                    name="net_provider_id"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={formData.net_provider_id || ""}
                    onChange={(e) =>
                      handleInputChange("net_provider_id", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Resident Services / Vendor Details
            </h2>
            <hr className="border-t border-gray-300 mb-6" />

            <div className="mt-5 space-y-4" style={{ marginTop: "30px" }}>
              {/* ➕ Add Button */}
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAddVendor}
              >
                Add Vendor Service
              </button>

              {/* 🧹 Vendor Entries */}
              {vendorList.map((vendor, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4"
                >
                  {/* Dropdown */}
                  <div className="flex flex-col mt-3">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Service Type
                    </label>
                    <select
                      className="border p-2 rounded border-gray-300"
                      value={vendor.service}
                      onChange={(e) =>
                        handleVendorChange(index, "service", e.target.value)
                      }
                    >
                      <option value="">-- Select --</option>
                      <option value="Maid">Cook / Maid</option>
                      <option value="Driver">Driver (if any)</option>
                      <option value="Laundry">Laundry / Ironing</option>
                      <option value="Newspaper">Newspaper</option>
                      <option value="Milk">Milk Vendor</option>
                    </select>
                  </div>

                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="border p-2 rounded border-gray-300"
                      value={vendor.name}
                      onChange={(e) =>
                        handleVendorChange(index, "name", e.target.value)
                      }
                    />
                  </div>

                  {/* Contact */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Contact Details
                    </label>
                    <input
                      type="tel"
                      className="border p-2 rounded border-gray-300"
                      value={vendor.contact}
                      onChange={(e) =>
                        handleVendorChange(
                          index,
                          "contact",
                          validateMobileInput(e.target.value)
                        )
                      }
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                    />
                  </div>

                  {/* ❌ Delete Button */}
                  <div className="inline-block">
                    <button
                      type="button"
                      className="px-2 py-1 rounded hover:bg-red-100"
                      onClick={() => handleDeleteVendor(index)}
                      aria-label="Delete vendor"
                    >
                      <RiDeleteBinLine className="text-red-600 w-7 h-7" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="grid mt-3 md:grid-cols-2">
            <div className="flex flex-col px-4 gap-1">
              <label className="font-semibold">Phase:</label>
              <select className="border p-2 px-4 border-gray-300 rounded rounded-md placeholder:text-sm">
                <option value="">Select Phase</option>
                <option value="post_sales">Post Sales</option>
                <option value="post_possesions">Post Possesions</option>
              </select>
            </div>
            <div className="flex flex-col px-4 gap-1">
              <label className="font-semibold">Status:</label>
              <select className="border p-2 px-4 border-gray-300 rounded rounded-md placeholder:text-sm">
                <option value="">Select Status</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex flex-col px-4 mt-2 gap-1">
              <label className="font-semibold">Tower:</label>
              <select className="border p-2 px-4 border-gray-300 rounded rounded-md placeholder:text-sm">
                <option value="">Select Tower</option>
                <option value="post_sales">Post Sales</option>
                <option value="post_possesions">Post Possesions</option>
              </select>
            </div>
            <div className="flex flex-col px-4 mt-2 gap-1">
              <label className="font-semibold">Flat:</label>
              <select className="border p-2 px-4 border-gray-300 rounded rounded-md placeholder:text-sm">
                <option value="">Select Flat</option>
                <option value="post_sales">Post Sales</option>
                <option value="post_possesions">Post Possesions</option>
              </select>
            </div>
          </div> */}

          {/* Associated Units */}
          {/* {formData.user_sites.map((site, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-4 my-3 border p-5 w-full rounded-md"
            >
              {[
                { field: "unit_id", label: "Associated Unit" },
                { field: "ownership", label: "Ownership" },
                { field: "ownership_type", label: "Ownership Type" },
                { field: "lives_here", label: "Lives Here" },
              ].map(({ field, label }, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <label className="font-semibold">
                    {label}:<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    value={site[field]}
                    onChange={(e) =>
                      handleSiteChange(index, field, e.target.value)
                    }
                    className="border p-2 px-4 border-gray-300 rounded-md placeholder:text-sm"
                  >
                    <option value="">{`Select ${label}`}</option>
                    {field === "unit_id"
                      ? units.map((unit) => (
                          <option key={unit.id} value={unit.id}>
                            {unit.building_name}-{unit.floor_name}-{unit.name}
                          </option>
                        ))
                      : field === "ownership"
                      ? ["owner", "tenant"].map((opt) => (
                          <option key={opt} value={opt}>
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </option>
                        ))
                      : field === "ownership_type"
                      ? ["primary", "secondary"].map((opt) => (
                          <option key={opt} value={opt}>
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </option>
                        ))
                      : field === "lives_here"
                      ? [
                          { label: "Yes", value: true },
                          { label: "No", value: false },
                        ].map((opt) => (
                          <option key={opt.label} value={opt.value}>
                            {opt.label}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              ))}

              <div className="col-span-2 flex justify-end mt-2">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSite(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md"
                  >
                    <RiDeleteBin5Line />
                  </button>
                )}
              </div>
            </div>
          ))} */}

          {/* <button
            type="button"
            onClick={handleAddSite}
            className="px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Another Unit
          </button> */}

          {/* Submit Button */}
          <div className="flex justify-center my-5">
            <button
              onClick={handleAddUser}
              className="bg-black text-white p-2 px-4 rounded-md font-medium"
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