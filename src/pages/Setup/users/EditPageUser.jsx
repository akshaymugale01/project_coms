import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editSetupUsers,
  getAllUnits,
  getFilterUsers,
  getSetupUsers,
  getAllFloors,
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
  const [selectedUnit, setSelectedUnit] = useState("");
  const siteId = getItemInLocalStorage("SITEID");
  const [sites, setSites] = useState([]);
  const [usersites, setUserSites] = useState([]);
  const [members, setMembers] = useState([]);
  const [pets, setPets] = useState([]);
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
    user_sites: [],
    user_members: [],
    user_vendor: [],
    vehicle_details: [],
    pet_details:[],
  });
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloorId, setSelectedFloorId] = useState("");
  const [floorsByBuilding, setFloorsByBuilding] = useState({});
const [unitsByFloor, setUnitsByFloor] = useState({});
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [hydratedSite, setHydratedSite] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  console.log("id", id);

  // Convert DD/MM/YYYY to YYYY-MM-DD for HTML5 date input
  const convertToISODate = (dateString) => {
    if (!dateString) return "";
    // Check if already in ISO format (YYYY-MM-DD)
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
    // Convert DD/MM/YYYY to YYYY-MM-DD
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    }
    return dateString;
  };

  const fetchUsers = async () => {
    try {
      setLoading(true); // Start loading
      const [userResp, sitesResp] = await Promise.all([
        getFilterUsers(id),
        getSites(),
      ]);
      console.log("Full API response:", userResp?.data);
      console.log("moving_date from API:", userResp?.data?.moving_date);
      console.log("vehicle_details from API:", userResp?.data?.vehicle_details);

      const userData = userResp?.data || {};
      // Convert date formats for HTML5 date inputs
      const formattedData = {
        ...userData,
        moving_date: convertToISODate(userData.moving_date),
        lease_expiry: convertToISODate(userData.lease_expiry),
        birth_date: convertToISODate(userData.birth_date),
      };

      setFormData(formattedData);
      if (Array.isArray(userData.pets)) {
        setPets(
          userData.pets.map((p) => ({
            id: p.id ?? null,
            pet_name: p.pet_name ?? "",
            // pet_owner_mobile_no: p.pet_owner_mobile_no ?? "",
            pet_breed: p.pet_breed ?? "",
            gender: p.gender ?? "",
            colour: p.colour ?? "",
            age: p.age ?? "",
          }))
        );
      }

      setOriginalData(formattedData);
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
const fetchFloors = async (buildingId) => {
  if (!buildingId) return;
  try {
    const resp = await getFloors(buildingId);
    setFloorsByBuilding((prev) => ({
      ...prev,
      [buildingId]: resp.data,
    }));
  } catch (err) {
    console.error("Error fetching floors:", err);
  }
};

const fetchUnits = async (floorId) => {
  if (!floorId) return;
  try {
    const resp = await getUnits(floorId);
    setUnitsByFloor((prev) => ({
      ...prev,
      [floorId]: resp.data,
    }));
  } catch (err) {
    console.error("Error fetching units:", err);
  }
};

useEffect(() => {
  if (Array.isArray(formData.user_sites) && formData.user_sites.length > 0) {
    const hydratedSites = formData.user_sites.map((site) => ({
      id: site.id ?? null,
      build_id: site.build_id ?? "",
      floor_id: site.floor_id ?? "",
      unit_id: site.unit_id ?? "",
      ownership: site.ownership ?? "",
      ownership_type: site.ownership_type ?? "primary",
      lives_here: site.lives_here ?? true,
      is_approved: true,
    }));

    setFormData((prev) => ({
      ...prev,
      user_sites: hydratedSites,
    }));
  }
}, [originalData]);

  useEffect(() => {
    const currentSite = formData.user_sites?.[0] || {};
    const needsUpdate =
      currentSite.build_id !== selectedBuilding ||
      currentSite.floor_id !== selectedFloorId ||
      currentSite.unit_id !== selectedUnit;

    if (needsUpdate) {
      setFormData((prev) => {
        const updatedSites = [...prev.user_sites];
        if (updatedSites.length > 0) {
          updatedSites[0] = {
            ...updatedSites[0],
            build_id: selectedBuilding ? parseInt(selectedBuilding, 10) : null,
            floor_id: selectedFloorId ? parseInt(selectedFloorId, 10) : null,
            unit_id: selectedUnit ? parseInt(selectedUnit, 10) : null,
          };
        }
        // Sync occupancy_type from ownership if available
        const occupancy = updatedSites[0]?.ownership ?? "";
        console.log("Selected Unit:", selectedUnit);

        return { ...prev, user_sites: updatedSites, occupancy_type: occupancy };
      });
    }
  }, [selectedBuilding, selectedFloorId, selectedUnit]);

  const navigate = useNavigate();
  const handleAddLocation = () => {
  setFormData((prev) => ({
    ...prev,
    user_sites: [
      ...prev.user_sites,
      {
        id: null,
        build_id: "",
        floor_id: "",
        unit_id: "",
        ownership: "",
        ownership_type: "primary",
        lives_here: true,
        is_approved: true,
      },
    ],
  }));
};
const handleRemoveLocation = (index) => {
  setFormData((prev) => ({
    ...prev,
    user_sites: prev.user_sites.filter((_, i) => i !== index),
  }));
};

const handleLocationChange = async (index, field, value) => {
  setFormData((prev) => {
    const updatedSites = [...prev.user_sites];
    updatedSites[index] = {
      ...updatedSites[index],
      [field]: value,
    };
    return { ...prev, user_sites: updatedSites };
  });

  if (field === "build_id") {
    await fetchFloors(value);
  }

  if (field === "floor_id") {
    await fetchUnits(value);
  }
};

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
        const [sitesResp, buildResp] = await Promise.all([
          getSites(),
          getBuildings(),
        ]);
        setSites(
          sitesResp.data.map((site) => ({
            value: site.id,
            label: site.name,
          }))
        );
        setFilteredBuildings(buildResp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  
  const [hasHydratedUserData, setHasHydratedUserData] = useState(false);

  useEffect(() => {
    if (!hasHydratedUserData && formData.firstname) {
      const hydratedMembers = Array.isArray(formData.user_members) && formData.user_members.length > 0
        ? formData.user_members.map((m) => ({
          id: m.id ?? null,
          member_type: m.member_type ?? "",
          member_name: m.member_name ?? "",
          contact_no: m.contact_no ?? "",
          relation: m.relation ?? "",
        }))
        : [];

      console.log("Hydrating members from formData:", hydratedMembers);
      setMembers(hydratedMembers);

      const hydratedVendors = Array.isArray(formData.user_vendor) && formData.user_vendor.length > 0
        ? formData.user_vendor.map((v) => ({
          id: v.id ?? null,
          service_type: v.service_type ?? "",
          name: v.name ?? "",
          contact_no: v.contact_no ?? "",
        }))
        : [];

      console.log("Hydrating vendors from formData:", hydratedVendors);
      setVendorList(hydratedVendors);

      // Hydrate vehicles
      const hydratedVehicles = Array.isArray(formData.vehicle_details) && formData.vehicle_details.length > 0
        ? formData.vehicle_details.map((v) => ({
          id: v.id ?? null,
          vehicle_type: v.vehicle_type ?? "",
          vehicle_no: v.vehicle_no ?? "",
          parking_slot_no: v.parking_slot_no ?? "",
        }))
        : [];

      console.log("Hydrating vehicles from formData:", hydratedVehicles);
      setVehicleList(hydratedVehicles);

      setHasHydratedUserData(true);
    }
  }, [formData.firstname, hasHydratedUserData]);

  useEffect(() => {
    if (!hasHydratedUserData) return;

    const syncedMembers = members.map((m) => ({
      id: m.id ?? undefined,
      member_type: m.member_type,
      member_name: m.member_name,
      contact_no: m.contact_no,
      relation: m.relation,
    }));

    const syncedVendors = vendorList.map((v) => ({
      id: v.id ?? undefined,
      service_type: v.service_type,
      name: v.name,
      contact_no: v.contact_no,
    }));

    const syncedVehicles = vehicleList?.map((v) => ({
      id: v.id ?? undefined,
      vehicle_type: v.vehicle_type,
      vehicle_no: v.vehicle_no,
      parking_slot_no: v.parking_slot_no,
    }));

    setFormData((prev) => ({
      ...prev,
      user_members: syncedMembers,
      user_vendor: syncedVendors,
      vehicle_details: syncedVehicles,
    }));
  }, [members, vendorList, vehicleList, hasHydratedUserData]);

  useEffect(() => {
    const fetchFloorsAndUnits = async () => {
      if (selectedBuilding) {
        try {
          const floorResp = await getFloors(selectedBuilding);
          setFloors(floorResp.data);
        } catch (error) {
          console.error("Error fetching floors:", error);
          setFloors([]);
        }
      }

      if (selectedFloorId) {
        try {
          const unitResp = await getUnits(selectedFloorId);
          setUnits(unitResp.data);
        } catch (error) {
          console.error("Error fetching units:", error);
          setUnits([]);
        }
      }
    };

    if (hydratedSite) {
      fetchFloorsAndUnits();
    }
  }, [hydratedSite, selectedBuilding, selectedFloorId]);

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
    // Optional: log or trigger side effects
    console.log("Selected unit ID:", e.target.value);
  };

  useEffect(() => {
  if (formData.user_sites?.length > 0) {
    formData.user_sites.forEach((site) => {
      if (site.build_id) fetchFloors(site.build_id);
      if (site.floor_id) fetchUnits(site.floor_id);
    });
  }
}, [formData.user_sites]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      pet_details: pets.map((p) => ({
        id: p.id ?? undefined,
        pet_name: p.pet_name,
        // pet_owner_mobile_no: p.pet_owner_mobile_no,
        pet_breed: p.pet_breed,
        gender: p.gender,
        colour: p.colour,
        age: p.age,
        // _destroy: p._destroy || false,
      })),
    }));
  }, [pets]);



  const handleAddPets = () => {
    setPets((prev) => [
      ...prev,
      {
        id: null,
        pet_name: "",
        pet_owner_mobile_no: "",
        pet_breed: "",
        gender: "",
        colour: "",
        age: "",
      }

    ]);
  };

  const handlePetChange = (index, field, value) => {
    setPets((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const handleDeletePet = (index) => {
    setPets((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, _destroy: true } : p
      )
    );
  };


  const handleAddMember = () => {
    setMembers((prev) => [
      ...prev,
      {
        id: null,
        member_type: "",
        member_name: "",
        contact_no: "",
        relation: "",
      },
    ]);
  };

  const handleDeleteMember = (index) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index, field, value) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const handleAddVendor = () => {
    setVendorList((prev) => [
      ...prev,
      { id: null, service_type: "", name: "", contact: "" },
    ]);
  };

  const handleDeleteVendor = (index) => {
    setVendorList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVendorChange = (index, field, value) => {
    setVendorList((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const handleAddVehicle = () => {
    setVehicleList((prev) => [
      ...prev,
      { id: null, vehicle_type: "", vehicle_no: "", parking_slot_no: "" },
    ]);
  };

  const handleDeleteVehicle = (index) => {
    setVehicleList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVehicleChange = (index, field, value) => {
    setVehicleList((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: field === "vehicle_type" ? value : value.toUpperCase(),
      };
      return updated;
    });
  };

  const validateMobileInput = (input) => {
    return input.replace(/\D/g, "").slice(0, 10);
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddUser = async () => {
    // Validate required fields
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.mobile ||
      !formData.moving_date ||
      !formData.occupancy_type ||
     !formData.user_sites.length ||
formData.user_sites.some(
  (s) => !s.build_id || !s.floor_id || !s.unit_id
)
    ) {
      return toast.error("Please fill all mandatory fields marked with *");
    }

    // Conditional check for lease expiry
    if (formData.occupancy_type === "tenant" && !formData.lease_expiry) {
      return toast.error("Lease expiry date is required for tenants");
    }

    // Validate mobile number format (Indian 10-digit starting with 6-9)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      return toast.error("Please enter a valid 10-digit mobile number");
    }

    setIsUpdating(true);

    const postData = {
      user: {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        mobile: formData.mobile,
        moving_date: formData.moving_date,
        lease_expiry: formData.lease_expiry,
        lives_here: formData.lives_here,
        profession: formData.profession,
        mgl_customer_number: formData.mgl_customer_number,
        adani_electricity_account_no: formData.adani_electricity_account_no,
        net_provider_name: formData.net_provider_name,
        net_provider_id: formData.net_provider_id,
        blood_group: formData.blood_group,
        no_of_pets: formData.no_of_pets,
        birth_date: formData.birth_date,
        pet_details: formData.pet_details || [],

     user_sites_attributes: formData.user_sites.map((site) => ({
  id: site.id ?? undefined,
  build_id: Number(site.build_id),
  floor_id: Number(site.floor_id),
  unit_id: Number(site.unit_id),
  ownership: formData.occupancy_type,
  ownership_type: site.ownership_type || "primary",
  is_approved: true,
  lives_here: formData.lives_here,
})),
        user_members_attributes: formData.user_members.map((m) => ({
          id: m.id ?? undefined,
          member_type: m.member_type,
          member_name: m.member_name,
          contact_no: m.contact_no,
          relation: m.relation,
        })),
        user_vendor_attributes: formData.user_vendor.map((v) => ({
          id: v.id ?? undefined,
          service_type: v.service_type,
          name: v.name,
          contact_no: v.contact_no,
        })),
        vehicle_details_attributes: (formData.vehicle_details || vehicleList || []).map((v) => ({
          id: v.id ?? undefined,
          vehicle_type: v.vehicle_type,
          vehicle_no: v.vehicle_no,
          parking_slot_no: v.parking_slot_no,
        })),
      },
    };
    console.log("PETS PAYLOAD", postData.user.pets_attributes);
    try {
      console.log("Sending update data:", postData);
      await editSetupUsers(id, postData);
      toast.success("User Updated successfully!");
      navigate("/setup/users-setup");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
    } finally {
      setIsUpdating(false);
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
                const isRequired = ["First Name", "Last Name", "Email", "Mobile"].includes(field);
                return (
                  <div key={idx} className="flex flex-col gap-1">
                    <label className="font-semibold">
                      {field}:{isRequired && <span style={{ color: "red" }}> *</span>}
                    </label>
                    <input
                      type="text"
                      name={field.toLowerCase().replace(" ", "")}
                      value={formData[field.toLowerCase().replace(" ", "")]}
                      onChange={handleChange}
                      placeholder={`Enter ${field}`}
                      disabled={isDisabled}
                      className={`border p-2 px-4 border-gray-300 rounded-md placeholder:text-sm
              ${isDisabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                        }
            `}
                    />
                  </div>
                );
              }
            )}
            {/* 🏠 Lives Here */}
<div className="flex flex-col gap-2">
  <label htmlFor="lives_here" className="font-semibold">
    Lives Here: <span style={{ color: "red" }}>*</span>
  </label>
  <select
    id="lives_here"
    name="lives_here"
    className="border p-2 rounded border-gray-300"
    value={
      formData.lives_here === true
        ? "true"
        : formData.lives_here === false
        ? "false"
        : ""
    }
    onChange={(e) =>
      handleInputChange("lives_here", e.target.value === "true")
    }
  >
    <option value="">-- Select --</option>
    <option value="true">Yes</option>
    <option value="false">No</option>
  </select>
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
                  value={formData?.moving_date || ""}
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

              {/* Pets */}
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

<div className="mt-10 space-y-6">

  {formData.user_sites.map((site, index) => (
    <div
      key={index}
      className="grid md:grid-cols-4 gap-4 border p-4 rounded-lg bg-gray-50"
    >
      {/* Tower */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold">
          Tower <span className="text-red-500">*</span>
        </label>
        <select
          value={site.build_id}
          onChange={(e) =>
            handleLocationChange(index, "build_id", e.target.value)
          }
          className="border p-2 rounded"
        >
          <option value="">-- Select Tower --</option>
          {filteredBuildings.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Floor */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold">
          Floor <span className="text-red-500">*</span>
        </label>
        <select
          value={site.floor_id}
          onChange={(e) =>
            handleLocationChange(index, "floor_id", e.target.value)
          }
          className="border p-2 rounded"
        >
          <option value="">-- Select Floor --</option>
{floorsByBuilding[site.build_id]?.map((f) => (
              <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      {/* Unit */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold">
          Unit <span className="text-red-500">*</span>
        </label>
        <select
          value={site.unit_id}
          onChange={(e) =>
            handleLocationChange(index, "unit_id", e.target.value)
          }
          className="border p-2 rounded"
        >
          <option value="">-- Select Unit --</option>
{unitsByFloor[site.floor_id]?.map((u) => (
              <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      {/* Remove Button */}
      <div className="flex items-end">
        {index > 0 && (
          <button
            type="button"
            onClick={() => handleRemoveLocation(index)}
            className="bg-red-500 text-white px-3 py-2 rounded"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  ))}

  {/* Add Button */}
  <button
    type="button"
    onClick={handleAddLocation}
    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
  >
    + Add Location
  </button>
</div>
          <div className="mt-10 space-y-4">
            {/* ➕ Add Button */}
            <button
              type="button"
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleAddPets}
            >
              Add Pets
            </button>

            {/* Pets Rows */}
            {pets.map((pet, index) => {
              if (pet._destroy) return null;

              return (
                <div
                  key={pet.id ?? index}
                  className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end mt-4"
                >
                  {/* Pet Name */}
                  <div className="flex flex-col">
                    <label className="font-semibold">Pet Name</label>
                    <input
                      type="text"
                      className="border p-2 rounded"
                      value={pet.pet_name}
                      onChange={(e) =>
                        handlePetChange(index, "pet_name", e.target.value)
                      }
                    />
                  </div>

                  {/* Owner Mobile */}
                  {/* <div className="flex flex-col">
                    <label className="font-semibold">Mobile No</label>
                    <input
                      type="tel"
                      className="border p-2 rounded"
                      value={pet.pet_owner_mobile_no}
                      maxLength={10}
                      onChange={(e) =>
                        handlePetChange(
                          index,
                          "pet_owner_mobile_no",
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                    />
                  </div> */}

                  {/* Breed */}
                  <div className="flex flex-col">
                    <label className="font-semibold">Breed</label>
                    <input
                      type="text"
                      className="border p-2 rounded"
                      value={pet.pet_breed}
                      onChange={(e) =>
                        handlePetChange(index, "pet_breed", e.target.value)
                      }
                    />
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col">
                    <label className="font-semibold">Gender</label>
                    <select
                      className="border p-2 rounded"
                      value={pet.gender}
                      onChange={(e) =>
                        handlePetChange(index, "gender", e.target.value)
                      }
                    >
                      <option value="">-- Select --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  {/* Colour */}
                  <div className="flex flex-col">
                    <label className="font-semibold">Colour</label>
                    <input
                      type="text"
                      className="border p-2 rounded"
                      value={pet.colour}
                      onChange={(e) =>
                        handlePetChange(index, "colour", e.target.value)
                      }
                    />
                  </div>

                  {/* Age */}
                  <div className="flex flex-col">
                    <label className="font-semibold">Age</label>
                    <input
                      type="number"
                      min={0}
                      className="border p-2 rounded"
                      value={pet.age}
                      onChange={(e) =>
                        handlePetChange(index, "age", e.target.value)
                      }
                    />
                  </div>

                  {/* Delete */}
                  <div>
                    <button
                      type="button"
                      onClick={() => handleDeletePet(index)}
                    >
                      <RiDeleteBinLine className="text-red-600 w-6 h-6" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 space-y-4">
            {/* ➕ Add Button */}
            <button
              type="button"
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleAddMember}
            >
              Add Family Member
            </button>

            {/* 👨‍👩‍👧 Member Rows */}
            {members.map((member, index) => {
              console.log("Rendering member:", member);
              return (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
                >
                  {/* Member Type Dropdown */}
                  <div className="flex flex-col mt-2 gap-2">
                    <label className="font-semibold">Member Type:</label>
                    <select
                      className="border p-2 rounded border-gray-300"
                      value={member.member_type ?? ""}
                      onChange={(e) =>
                        handleMemberChange(index, "member_type", e.target.value)
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
                      value={member.member_name ?? ""}
                      onChange={(e) => {
                        const validated = e.target.value.replace(
                          /[^a-zA-Z ]/g,
                          ""
                        );
                        handleMemberChange(index, "member_name", validated);
                      }}
                    />
                  </div>

                  {/* Contact */}
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Contact Details:</label>
                    <input
                      type="tel"
                      className="border p-2 rounded border-gray-300"
                      value={member.contact_no ?? ""}
                      onChange={(e) => {
                        const input = e.target.value;
                        const digitsOnly = input.replace(/\D/g, "");
                        if (digitsOnly.length <= 10) {
                          handleMemberChange(index, "contact_no", digitsOnly);
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
                      value={member.relation ?? ""}
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
              );
            })}
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
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700"
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
                      value={vendor.service_type ?? ""}
                      onChange={(e) =>
                        handleVendorChange(
                          index,
                          "service_type",
                          e.target.value
                        )
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
                      value={vendor.name ?? ""}
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
                      value={vendor.contact_no ?? ""}
                      onChange={(e) =>
                        handleVendorChange(
                          index,
                          "contact_no",
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

          {/* Vehicle Details Section */}
          <div className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Vehicle Details
            </h2>
            <hr className="border-t border-gray-300 mb-6" />

            <div className="mt-5 space-y-4">
              <button
                type="button"
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                onClick={handleAddVehicle}
              >
                🚗 Add Vehicle
              </button>

              {vehicleList.map((vehicle, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  {/*    Type */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Vehicle Type
                    </label>
                    <select
                      className="border p-2 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                      value={vehicle.vehicle_type ?? ""}
                      onChange={(e) =>
                        handleVehicleChange(index, "vehicle_type", e.target.value)
                      }
                    >
                      <option value="">-- Select --</option>
                      <option value="Car">Car</option>
                      <option value="Bike">Bike</option>
                      <option value="Scooter">Scooter</option>
                      <option value="SUV">SUV</option>
                      <option value="Truck">Truck</option>
                    </select>
                  </div>

                  {/* Vehicle Number */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Vehicle Number
                    </label>
                    <input
                      type="text"
                      className="border p-2 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 uppercase"
                      value={vehicle.vehicle_no ?? ""}
                      onChange={(e) =>
                        handleVehicleChange(index, "vehicle_no", e.target.value)
                      }
                      placeholder="e.g. MH01AB1234"
                      maxLength={15}
                    />
                  </div>

                  {/* Parking Slot */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Parking Slot No.
                    </label>
                    <input
                      type="text"
                      className="border p-2 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 uppercase"
                      value={vehicle.parking_slot_no ?? ""}
                      onChange={(e) =>
                        handleVehicleChange(index, "parking_slot_no", e.target.value)
                      }
                      placeholder="e.g. P-101"
                    />
                  </div>

                  {/* Delete Button */}
                  <div className="inline-block">
                    <button
                      type="button"
                      className="px-2 py-1 rounded hover:bg-red-100 transition-colors"
                      onClick={() => handleDeleteVehicle(index)}
                      aria-label="Delete vehicle"
                    >
                      <RiDeleteBinLine className="text-red-600 w-7 h-7" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end my-5 gap-3">
            <button
              onClick={() => navigate("/setup/users-setup")}
              className="px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleAddUser}
              disabled={isUpdating}
              className={`text-white p-2 px-5 rounded-md font-medium ${isUpdating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
                }`}
            >
              {isUpdating ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update User"
              )}
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
