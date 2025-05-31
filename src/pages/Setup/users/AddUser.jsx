import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import Select from "react-select";
import toast from "react-hot-toast";
import { getAllUnits, getSites, postSetupUsers } from "../../../api";
import { useNavigate } from "react-router-dom";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { RiDeleteBin5Line } from "react-icons/ri";
import { color } from "highcharts";

const AddUser = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const siteId = getItemInLocalStorage("SITEID");

  const [sites, setSites] = useState([]);
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    userType: "unit_resident",
    site_ids: [siteId],
    user_sites: [
      {
        unit_id: "",
        site_id: siteId,
        ownership: "",
        ownership_type: "",
        is_approved: true,
        lives_here: "",
      },
    ],
  });

  console.log("formData", formData);

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
    setFormData((prev) => ({
      ...prev,
      user_sites: prev.user_sites.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstname" || name === "lastname") {
      const validated = value.replace(/[^a-zA-Z]/g, "");
      setFormData((prev) => ({ ...prev, [name]: validated }));
      return;
    }

    if (name === "mobile") {
      const mobileRegex = /^[0-9]{0,10}$/;
      if (!mobileRegex.test(value)) {
        return; 
      }
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
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.password ||
      formData.user_sites.length === 0
    ) {
      return toast.error(
        "All fields are required! including at least one user site!"
      );
    }
    const postData = {
      user: {
        firstname: formData.firstname,
        lastname: formData.lastname,
        mobile: formData.mobile,
        password: formData.password,
        email: formData.email,
        user_type: formData.userType,
        user_sites: formData.user_sites.map((site) => ({
          unit_id: site.unit_id,
          site_id: site.site_id,
          ownership: site.ownership,
          ownership_type: site.ownership_type,
          is_approved: site.is_approved,
          lives_here: site.lives_here,
        })),
      },
    };

    try {
      await postSetupUsers(postData);

      console.log("created details", postData);
      toast.success("User created successfully!");
      navigate("/setup/users-setup");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user.");
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
          <div className="grid md:grid-cols-2 gap-4">
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
          ))}

          <button
            type="button"
            onClick={handleAddSite}
            className="px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Another Unit
          </button>

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
