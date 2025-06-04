import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editSetupUsers,
  getAllUnits,
  getFilterUsers,
  getSetupUsers,
  getSites,
} from "../../../api";
import { RiDeleteBin5Line } from "react-icons/ri";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import toast from "react-hot-toast";

const EditPageUser = () => {
  const { id } = useParams();
  const [units, setUnits] = useState([]);
  const siteId = getItemInLocalStorage("SITEID");
  const [sites, setSites] = useState([]);
  const [usersites, setUserSites] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    userType: "",
    site_ids: [],
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
  });
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const navigate = useNavigate();

  const handleAddSite = () => {
    setFormData((prev) => ({
      ...prev,
      user_sites: [
        ...prev.user_sites,
        {
          unit_id: "",
          site_id: siteId,
          ownership: "",
          ownership_type: "",
          is_approved: false,
          lives_here: "",
        },
      ],
    }));
  };

  const handleSiteChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedSites = [...prev.user_sites];
      updatedSites[index][field] = value;
      return { ...prev, user_sites: updatedSites };
    });
  };

  const handleRemoveSite = (index) => {
    const updatedSites = formData.user_sites.filter((_, i) => i !== index);
    console.log("Removing site at index", index, updatedSites);
    setFormData((prev) => ({
      ...prev,
      user_sites: updatedSites,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sitesResp, unitsResp] = await Promise.all([
          getSites(),
          getAllUnits(),
        ]);
        setSites(
          sitesResp.data.map((site) => ({
            value: site.id,
            label: site.name,
          }))
        );
        setUnits(unitsResp.data);
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
              {formData.user_sites.map((site, index) => (
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
              </button>

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
