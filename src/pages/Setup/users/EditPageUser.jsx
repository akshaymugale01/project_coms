import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editSetupUsers,
  getAllUnits,
  getFilterUsers,
  getSetupUsers,
  getSites,
  getFloors,
  getUnits,
  getBuildings,
} from "../../../api";
// import { RiDeleteBin5Line } from "react-icons/ri";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";

const EditPageUser = () => {
  const { id } = useParams();
  const [units, setUnits] = useState([]);
  const siteId = getItemInLocalStorage("SITEID");
  const [sites, setSites] = useState([]);
  const [usersites, setUserSites] = useState([]);
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    userType: "unit_resident",
    site_ids: [],
    moving_date: "",
    building_id: "",
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
    occupancy_type: "",
    user_sites: [
      {
        unit_id: "",
        site_id: "",
        ownership: "",
        ownership_type: "",
        is_approved: true,
        lives_here: "",
      },
    ],
    user_members: [],
    user_vendors: [],
  });
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloorId, setSelectedFloorId] = useState("");
  const [floors, setFloors] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [vendorList, setVendorList] = useState([
      { service_type: "", name: "", contact: "" },
    ]);

  console.log("id", id);

  const fetchUsers = async () => {
    try {
      setLoading(true); // Start loading
      const [userResp, unitsResp, sitesResp] = await Promise.all([
        getFilterUsers(id),
        getAllUnits(),
        getSites(),
      ]);
      setFormData(userResp?.data || {});
      setOriginalData(userResp?.data || {});
      setUnits(unitsResp.data);
      setUserSites(sitesResp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
  if (formData.user_sites && formData.user_sites.length > 0) {
    const site = formData.user_sites[0];
    setSelectedBuilding(site.building_id || "");
    setSelectedFloorId(site.floor_id || "");
    setSelectedUnit(site.unit_id || "");
  }
}, [formData]);

useEffect(() => {
  setFormData((prev) => {
    const updatedSites = [...prev.user_sites];
    if (updatedSites.length > 0) {
      updatedSites[0].building_id = selectedBuilding;
      updatedSites[0].floor_id = selectedFloorId;
      updatedSites[0].unit_id = selectedUnit;
    }
    return { ...prev, user_sites: updatedSites };
  });
}, [selectedBuilding, selectedFloorId, selectedUnit]);
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
  //   const updatedSites = formData.user_sites.filter((_, i) => i !== index);
  //   console.log("Removing site at index", index, updatedSites);
  //   setFormData((prev) => ({
  //     ...prev,
  //     user_sites: updatedSites,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sitesResp, unitsResp, buildResp] = await Promise.all([
          getSites(),
          getAllUnits(),
          getBuildings(),
        ]);
        setSites(
          sitesResp.data.map((site) => ({
            value: site.id,
            label: site.name,
          }))
        );
        setUnits(unitsResp.data);
        setFilteredBuildings(buildResp.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddUser = async () => {
    const changedFields = getChangedFields(originalData, formData);

    // Convert user_sites to user_sites_attributes always
    const postData = {
      user: {
        ...changedFields,
        user_sites_attributes: formData.user_sites.map((site, index) => {
          const existingSite = originalData.user_sites?.[index];
          return {
            ...site,
            id: existingSite?.id, // include ID if it's an existing site
          };
        }),
        user_members: formData.user_members,
        user_vendors: formData.user_vendors,
      },
    };

    try {
      await editSetupUsers(id, postData);
      toast.success("User Updated successfully!");
      navigate("/setup/users-setup");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
    }
  };

  const getChangedFields = (original, updated) => {
    const changed = {};
    Object.keys(updated).forEach((key) => {
      if (key === "user_sites") {
        // Compare user_sites array deeply
        if (JSON.stringify(original[key]) !== JSON.stringify(updated[key])) {
          changed[key] = updated[key];
        }
      } else if (original[key] !== updated[key]) {
        changed[key] = updated[key];
      }
    });
    return changed;
  };

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

    const handleAddMember = () => {
      setMembers((prev) => [...prev, { name: "", contact: "", relation: "" }]);
    };



  console.log("fomrData", formData);
  return (
    <section className="flex flex-col items-center p-2 bg-gray-700">
      <div className="flex mx-1 bg-white rounded-md flex-col gap-1 overflow-hidden my-1">
        {/* {loading ? (
          <div className="flex justify-center items-center h-96">
            <span className="text-lg font-semibold">Loading...</span>
          </div>
        ) : (
          <> */}
        <h2
          style={{ background: `rgb(17, 24, 39)`, marginTop: "10px" }}
          className="text-center text-xl font-bold p-2 mx-2 rounded-full text-white"
        >
          Update User Details
        </h2>
        <div className="md:mx-10 my-2 md:mb-5 sm:border border-gray-400 p-10  rounded-lg">
          {/* User Details */}
          <div className="grid md:grid-cols-2 gap-4">
            {["First Name", "Last Name", "Email", "Mobile", "Password"].map(
              (field, idx) => {
                const isDisabled = field === "Email" || field === "Password";
                return (
                  <div key={idx} className="flex flex-col gap-1">
                    <label className="font-semibold">{field}:</label>
                    <input
                      type="text"
                      name={field.toLowerCase().replace(" ", "")}
                      value={formData[field.toLowerCase().replace(" ", "")]}
                      onChange={handleChange}
                      placeholder={`Enter ${field}`}
                      disabled={isDisabled}
                      className={`border p-2 px-4 border-gray-300 rounded-md placeholder:text-sm
              ${
                isDisabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
              }
            `}
                    />
                  </div>
                );
              }
            )}
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
                  className="grid grid-cols-2 gap-4 my-10  border p-5 w-full rounded-md"
                >
                  {[
                    { field: "unit_id", label: "Associated Unit" },
                    { field: "ownership", label: "Ownership" },
                    { field: "ownership_type", label: "Ownership Type" },
                    { field: "lives_here", label: "Lives Here" },
                  ].map(({ field, label }, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <label className="font-semibold">{label}:</label>
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
              ))}

              <button
                type="button"
                onClick={handleAddSite}
                className="px-3 py-2 bg-gray-800 text-white rounded-md"
              >
                Add Another Unit
              </button> */}

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
                    handleInputChange(
                      "adani_electricity_account_no",
                      e.target.value
                    )
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

          {/* Submit Button */}
          <div className="flex justify-center my-5">
            <button
              onClick={handleAddUser}
              className="bg-black text-white p-2 px-4 rounded-md font-medium"
            >
              Submit
            </button>
          </div>
        </div>
        {/* </> */}
        {/* )} */}
      </div>
    </section>
  );
};

export default EditPageUser;
