import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getAllFloors,
  getAllUnits,
  getAllVendors,
  getBuildings,
  getFloors,
  getSetupUsers,
  getUnits,
  getVendors,
  postFitoutRequest,
} from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FitOutRequestPage = () => {
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([{ id: 1, category_type: "" }]);
  const [categoryFiles, setCategoryFiles] = useState({});
  const navigate = useNavigate();
  console.log("categories", categories);
  const [formData, setFormData] = useState({
    building_id: "",
    floor_id: "",
    unit_id: "",
    user_id: "",
    description: "",
    selected_date: new Date().toISOString().split("T")[0],
    supplier_id: "",
  });

  console.log("formData", formData);
  const handleFileUpload = (event, categoryId) => {
    const file = event.target.files[0];

    if (file) {
      setCategoryFiles((prev) => {
        const updatedFiles = { ...prev, [categoryId]: file };
        console.log("Updated categoryFiles:", updatedFiles);
        return updatedFiles;
      });
    }
  };

  const handleCategoryChange = (event, categoryId) => {
    const { value } = event.target;

    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((cat) =>
        cat.id === categoryId ? { ...cat, category_type: value } : cat
      );

      console.log("Updated categories:", updatedCategories);
      return updatedCategories;
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addCategory = () => {
    setCategories([...categories, { id: categories.length + 1 }]);
  };

  const removeCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const fetchDetails = async () => {
    try {
      const buildingsRes = await getBuildings();
      setBuildings(buildingsRes.data);

      const floorsRes = await getAllFloors();
      setFloors(floorsRes.data);

      const unitsRes = await getAllUnits();
      setUnits(unitsRes.data);

      const usersRes = await getSetupUsers();
      setUsers(usersRes.data);
      console.log("userResp", usersRes);
      const vendorsRes = await getAllVendors();
      setVendors(vendorsRes.data);
      console.log("vendor", vendorsRes);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = new FormData();

    // Append standard fields
    Object.entries(formData).forEach(([key, value]) => {
      requestData.append(`fitout_request[${key}]`, value);
    });

    // Append category types (Array)
    categories.forEach((category) => {
      requestData.append(
        `fitout_request[category_types][]`,
        category.category_type
      );
    });

    // Append category images (Array)
    Object.entries(categoryFiles).forEach(([categoryId, file]) => {
      requestData.append(`fitout_request[category_images][]`, file);
    });

    try {
      await postFitoutRequest(requestData);
      toast.success("Fitout request submitted successfully!");
      navigate("/fitout/request/list");
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit the request.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="border rounded-lg p-6 shadow-md bg-white">
          <h2 className="text-xl font-semibold text-orange-600 flex items-center mb-4">
            🏢 BASIC DETAILS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="building_id"
              value={formData.building_id}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Building *</option>
              {buildings.map((building, index) => (
                <option key={`${building.id}-${index}`} value={building.id}>
                  {building.name}
                </option>
              ))}
            </select>

            <select
              name="floor_id"
              value={formData.floor_id}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Floor *</option>
              {floors.map((floor) => (
                <option key={floor.id} value={floor.id}>
                  {floor.name}
                </option>
              ))}
            </select>

            <select
              name="unit_id"
              value={formData.unit_id}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Unit *</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>

            <select
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select User *</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstname} {user.lastname}
                </option>
              ))}
            </select>

            <textarea
              name="description"
              value={formData.description}
              placeholder="Description"
              onChange={handleChange}
              className="border p-2 rounded w-full md:col-span-2"
            ></textarea>

            <input
              type="date"
              value={formData.selected_date}
              name="selected_date"
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <select
              name="supplier_id"
              value={formData.supplier_id}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.vendor_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category & Attachment */}
        <div className="border rounded-lg p-6 shadow-md bg-white mt-6">
          <h2 className="text-xl font-semibold text-orange-600 flex items-center mb-4">
            📎 CATEGORY AND ATTACHMENT
          </h2>

          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-wrap items-center gap-4 mt-4 p-4 bg-gray-100 rounded-md"
            >
              <select
                className="border p-2 rounded w-full md:w-auto flex-1"
                value={category.category_type}
                onChange={(e) => handleCategoryChange(e, category.id)}
              >
                <option value="">Select Category *</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
              </select>

              <input
                type="file"
                onChange={(e) => handleFileUpload(e, category.id)}
                className="border p-2 rounded w-full md:w-auto flex-1"
              />

              <button
                onClick={() => removeCategory(category.id)}
                type="button"
                className="bg-red-600 text-white p-2 rounded text-sm"
              >
                x Remove
              </button>
            </div>
          ))}

          <button
            onClick={addCategory}
            type="button"
            className="mt-4 bg-gray-700 text-white py-2 px-4 rounded w-full md:w-auto"
          >
            + Add Category
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-green-700 text-white py-3 px-6 rounded w-full"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default FitOutRequestPage;
