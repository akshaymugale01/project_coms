import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import {
  getVehicleSetup,
  postVehicleSetup,
  getVehicleSetupDetails,
  editVehicleSetup,
  deleteVehicleSetup,
  putVehicleSetup,
} from "../../../api";

const VehicleSetup = () => {
  const [vehicleList, setVehicleList] = useState([{ category: "", type: "" }]);
  const [savedVehicles, setSavedVehicles] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editVehicle, setEditVehicle] = useState({ category: "", type: "" });

  const handleChange = (index, field, value) => {
    const updated = [...vehicleList];
    updated[index][field] = value;
    setVehicleList(updated);
  };

  const handleAddVehicle = () => {
    setVehicleList([...vehicleList, { category: "", type: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const v of vehicleList) {
        if (!v.category || !v.type) continue;
        await postVehicleSetup({
          vehicle_category: v.category,
          vehicle_type_name: v.type,
          status: true,
        });
      }
      setVehicleList([{ category: "", type: "" }]);
      fetchVehicles();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };
  //Fetch saved vehicles (Read Operation)
  const fetchVehicles = async () => {
    try {
      const response = await getVehicleSetup();
      let vehicles = response.data?.vehicles || response.data || [];
      if (!Array.isArray(vehicles)) {
        if (typeof vehicles === "object" && vehicles !== null) {
          vehicles = Object.values(vehicles);
        } else {
          vehicles = [];
        }
      }
      setSavedVehicles(vehicles);
    } catch (error) {
      console.error("Read error:", error);
      setSavedVehicles([]);
    }
  };

  // Delete vehicle
  const handleDelete = async (vehicle) => {
    try {
      // Use id if available, otherwise do nothing
      if (!vehicle.id) {
        alert("Vehicle id missing. Cannot delete.");
        return;
      }
      await deleteVehicleSetup(vehicle.id);
      fetchVehicles();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Start editing
  const handleEdit = (i, v) => {
    setEditIndex(i);
    setEditVehicle({
      category: v.vehicle_category || v.category,
      type: v.vehicle_type_name || v.type,
      id: v.id,
    });
  };

  // Save edit
  const handleEditSave = async (i, orig) => {
    try {
      if (!editVehicle.id && !orig.id) {
        alert("Vehicle id missing. Cannot edit.");
        return;
      }
      await editVehicleSetup(editVehicle.id || orig.id, {
        vehicle_category: editVehicle.category,
        vehicle_type_name: editVehicle.type,
        status: true,
      });
      setEditIndex(null);
      setEditVehicle({ category: "", type: "" });
      fetchVehicles();
    } catch (error) {
      console.error("Edit error:", error);
    }
  };

  // Cancel edit
  const handleEditCancel = () => {
    setEditIndex(null);
    setEditVehicle({ category: "", type: "" });
  };

  // ⏱️ Load on mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  // DataTable columns for saved vehicles
  const columns = [
    {
      name: "Actions",
      cell: (row, i) => (
        <div className="flex items-center gap-4">
          {editIndex === i ? (
            <>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => handleEditSave(i, row)}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-white px-2 py-1 rounded"
                onClick={handleEditCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="text-black px-2 py-1 rounded mr-2 flex items-center justify-center"
                onClick={() => handleEdit(i, row)}
                title="Edit"
              >
                <BiEdit size={22} />
              </button>
            </>
          )}
        </div>
      ),
      width: "180px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Category",
      selector: (row) =>
        editIndex === savedVehicles.indexOf(row) ? (
          <input
            className="border px-2 py-1 rounded"
            value={editVehicle.category}
            onChange={(e) =>
              setEditVehicle((ev) => ({ ...ev, category: e.target.value }))
            }
          />
        ) : (
          row.vehicle_category || row.category
        ),
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) =>
        editIndex === savedVehicles.indexOf(row) ? (
          <input
            className="border px-2 py-1 rounded"
            value={editVehicle.type}
            onChange={(e) =>
              setEditVehicle((ev) => ({ ...ev, type: e.target.value }))
            }
          />
        ) : (
          row.vehicle_type_name || row.type
        ),
      sortable: true,
    },
  ];

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Allowed Vehicle Categories</h2>
      <form onSubmit={handleSubmit}>
        {vehicleList.map((vehicle, index) => (
          <div
            key={index}
            className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3 items-end"
          >
            <div>
              <label className="block mb-1">Vehicle Category</label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={vehicle.category}
                onChange={(e) =>
                  handleChange(index, "category", e.target.value)
                }
              >
                <option value="">Select</option>
                <option value="2-wheeler">2-Wheeler</option>
                <option value="3-wheeler">3-Wheeler</option>
                <option value="4-wheeler">4-Wheeler</option>
                <option value="4-wheeler">6-Wheeler</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Vehicle Type</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                placeholder="e.g. Bike, Auto, Sedan"
                value={vehicle.type}
                onChange={(e) => handleChange(index, "type", e.target.value)}
              />
            </div>

            <div className="flex md:block justify-end">
              {index > 0 && (
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                  onClick={() => {
                    setVehicleList(vehicleList.filter((_, i) => i !== index));
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="flex gap-10 mt-8">
          <button
            type="button"
            onClick={handleAddVehicle}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Add Vehicle Type
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save Categories
          </button>
        </div>
      </form>

      {/* Display Saved Vehicles */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Saved Vehicle Types</h3>
        <DataTable
          columns={columns}
          data={savedVehicles}
          pagination
          highlightOnHover
          responsive
          customStyles={{
            headRow: {
              style: {
                backgroundColor: "#f3f4f6", // Tailwind gray-100
                color: "#374151", // Tailwind gray-700
                fontWeight: "bold",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default VehicleSetup;
