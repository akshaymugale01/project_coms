import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { postGDN, getMasters, getGDNPurposeSetup, getGDNConsumingSetup, getSetupUsers } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const AddGdn = () => {
  const themeColor = 'rgb(3 19 37)';
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    gdn_date: "",
    description: "",
    status: "Pending",
  });

  const [inventoryDetails, setInventoryDetails] = useState([
    {
      inventory: "",
      current_stock: "",
      quantity: "",
      comments: "",
      purpose_id: "",
      handover_to_id: "",
      consuming_in_id: "",
      service_id: "",
      asset_id: "",
    },
  ]);

  const [inventories, setInventories] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [consumingOptions, setConsumingOptions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch inventories
        const invResp = await getMasters(1, 1000);
        const invData = invResp?.data;
        const normalizedInv = Array.isArray(invData)
          ? invData
          : invData?.data || invData?.inventories || [];
        setInventories(normalizedInv);

        // Fetch purposes
        const purposeResp = await getGDNPurposeSetup();
        const purposeData = purposeResp?.data || [];
        setPurposes(Array.isArray(purposeData) ? purposeData : []);

        // Fetch consuming options
        const consumingResp = await getGDNConsumingSetup();
        const consumingData = consumingResp?.data || [];
        setConsumingOptions(Array.isArray(consumingData) ? consumingData : []);

        // Fetch users/employees
        const empResp = await getSetupUsers();
        const empData = empResp?.data || empResp || [];
        console.log("Employees data:", empData);
        setEmployees(Array.isArray(empData) ? empData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInventoryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...inventoryDetails];
    updatedDetails[index][name] = value;
    
    // If inventory is selected, fetch current stock
    if (name === "inventory" && value) {
      const selectedInv = inventories.find(inv => inv.id === parseInt(value));
      if (selectedInv) {
        updatedDetails[index].current_stock = selectedInv.current_stock || selectedInv.quantity || 0;
      }
    }
    
    setInventoryDetails(updatedDetails);
  };

  const handleAddInventory = () => {
    setInventoryDetails([
      ...inventoryDetails,
      {
        inventory: "",
        current_stock: "",
        quantity: "",
        comments: "",
        purpose_id: "",
        handover_to_id: "",
        consuming_in_id: "",
        service_id: "",
        asset_id: "",
      },
    ]);
  };

  const handleDeleteInventory = (index) => {
    const updatedDetails = inventoryDetails.filter((_, i) => i !== index);
    setInventoryDetails(updatedDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userId = getItemInLocalStorage("UserId");
    
    const gdnData = {
      gdn_detail: {
        gdn_date: formData.gdn_date,
        description: formData.description,
        status: formData.status,
        created_by_id: userId,
        gdn_inventory_details: inventoryDetails.map((item) => ({
          inventory: item.inventory,
          current_stock: item.current_stock,
          quantity: item.quantity,
          comments: item.comments,
          purpose_id: item.purpose_id,
          handover_to_id: item.handover_to_id,
          consuming_in_id: item.consuming_in_id,
          service_id: item.service_id,
          asset_id: item.asset_id,
        })),
      },
    };

    try {
      const response = await postGDN(gdnData);
      console.log("GDN submitted successfully:", response.data);
      toast.success("GDN created successfully");
      navigate("/admin/gdn-details");
    } catch (error) {
      console.error("Error submitting GDN:", error);
      toast.error("Failed to create GDN");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <section>
      <h2
        style={{ background: themeColor }}
        className="text-center text-white font-semibold p-2 m-2 rounded-xl "
      >
        Add GDN
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex  flex-col overflow-hidden">
          <div className="border-2 flex flex-col my-5 mx-5 p-4 gap-4 rounded-md border-gray-400">
            <h2 className=" border-b-2 border-gray-400 font-semibold ">
              Basic Details
            </h2>
            <div className="flex sm:flex-row flex-col justify-around items-center">
              <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-8 w-full">
                <div className="flex flex-col">
                  <label htmlFor="gdn_date" className="font-semibold my-1">
                    GDN Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="gdn_date"
                    value={formData.gdn_date}
                    onChange={handleChange}
                    required
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="description" className="font-semibold my-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    cols="1"
                    rows="1"
                    placeholder="Description"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        <div className="border-2 flex flex-col my-5 mx-5 p-4 gap-4 rounded-md border-gray-400">
          <h2 className=" border-b-2 border-gray-400 font-semibold ">
            Inventory Details
          </h2>
          {inventoryDetails.map((detail, index) => (
            <div key={index} className="border-2 border-gray-300 p-4 rounded-md mb-4">
              <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-4 w-full">
                <div className="flex flex-col">
                  <label className="font-semibold my-1">
                    Inventory <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="inventory"
                    value={detail.inventory}
                    onChange={(e) => handleInventoryChange(index, e)}
                    required
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  >
                    <option value="">Select Inventory</option>
                    {inventories.map((inv) => (
                      <option key={inv.id} value={inv.id}>
                        {inv.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold my-1">
                    Current Stock
                  </label>
                  <input
                    type="text"
                    name="current_stock"
                    value={detail.current_stock}
                    readOnly
                    className="border p-1 px-4 border-gray-500 rounded-md bg-gray-100"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold my-1">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={detail.quantity}
                    onChange={(e) => handleInventoryChange(index, e)}
                    required
                    placeholder="Quantity"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold my-1">
                    Purpose
                  </label>
                  <select
                    name="purpose_id"
                    value={detail.purpose_id}
                    onChange={(e) => handleInventoryChange(index, e)}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  >
                    <option value="">Select Purpose</option>
                    {purposes.map((purpose) => (
                      <option key={purpose.id} value={purpose.id}>
                        {purpose.info_value || purpose.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold my-1">
                    Handover To
                  </label>
                  <select
                    name="handover_to_id"
                    value={detail.handover_to_id}
                    onChange={(e) => handleInventoryChange(index, e)}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name || (emp.first_name && emp.last_name ? `${emp.first_name} ${emp.last_name}` : emp.first_name || emp.last_name || `Employee ${emp.id}`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold my-1">
                    Consuming In
                  </label>
                  <select
                    name="consuming_in_id"
                    value={detail.consuming_in_id}
                    onChange={(e) => handleInventoryChange(index, e)}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  >
                    <option value="">Select Consuming Location</option>
                    {consumingOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.info_value || option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col col-span-3">
                  <label className="font-semibold my-1">
                    Comments
                  </label>
                  <textarea
                    name="comments"
                    value={detail.comments}
                    onChange={(e) => handleInventoryChange(index, e)}
                    cols="5"
                    rows="2"
                    placeholder="Comments"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                {inventoryDetails.length > 1 && (
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => handleDeleteInventory(index)}
                      className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-md flex items-center gap-2"
                    >
                      <RiDeleteBin6Line /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={handleAddInventory}
              style={{ background: themeColor }}
              className="text-white p-2 px-4 rounded-md flex items-center gap-2"
            >
              <IoMdAdd /> Add Inventory
            </button>
          </div>
        </div>
        <div className="my-10 mx-5 text-center">
          <button
            type="submit"
            style={{ background: themeColor }}
            className="text-white px-8 py-2 text-small rounded-md hover:opacity-90"
          >
            Submit
          </button>
        </div>
      </div>
      </form>
    </section>
  );
};

export default AddGdn;
