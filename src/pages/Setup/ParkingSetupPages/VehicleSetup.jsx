import React, { useState, useEffect } from "react";


const VehicleSetup = () => {
  const [vehicleList, setVehicleList] = useState([
    { category: "", type: "" }
  ]);
  const [savedVehicles, setSavedVehicles] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...vehicleList];
    updated[index][field] = value;
    setVehicleList(updated);
  };

  const handleAddVehicle = () => {
    setVehicleList([...vehicleList, { category: "", type: ""}]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Allowed Vehicle Config:", vehicleList);
    //Send to API or dispatch to state

    try {
      // Replace with actual POST endpoint
      // await axios.post("/vehicle.json", { vehicles: vehicleList });

      console.log("Vehicles submitted:", vehicleList);
      setVehicleList([{ category: "", type: "" }]); // reset form
      fetchVehicles(); // refresh data
    } catch (error) {
      console.error("Submit error:", error);
    }
  };
  //Fetch saved vehicles (Read Operation)
  const fetchVehicles = async () => {
    try {
      // const response = await axios.get("/vehicle.json");

      // Replace with response structure
      setSavedVehicles(response.data?.vehicles || []);
    } catch (error) {
      console.error("Read error:", error);
    }
  };

  // ⏱️ Load on mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Allowed Vehicle Categories</h2>
      <form onSubmit={handleSubmit}>
        {vehicleList.map((vehicle, index) => (
          <div
            key={index}
            className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3"
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

      {/* 🚘 Display Saved Vehicles */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Saved Vehicle Types</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Type</th>
            </tr>
          </thead>
          <tbody>
            {savedVehicles.map((v, i) => (
              <tr key={i}>
                <td className="p-2 border">{v.category}</td>
                <td className="p-2 border">{v.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleSetup;