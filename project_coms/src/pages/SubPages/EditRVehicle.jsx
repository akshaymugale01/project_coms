import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  editRegisteredVehicleDetails,
  getAllUnits,
  getParkingConfig,
  getRegisteredVehicleDetails,
  getSetupUsers,
  postRegisteredVehicle,
} from "../../api";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../utils/localStorage";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
const EditRVehicle = () => {
  const today = new Date().toISOString().split("T")[0];
  const { id } = useParams();
  const themeColor = useSelector((state) => state.theme.color);
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    slotNumber: "",
    vehicleCategory: "",
    vehicleType: "",
    stickerNumber: "",
    registrationNumber: "",
    InsuranceNumber: "",
    InsuranceTill: "",
    Category: "",
    vehicleNumber: "",
    unit: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchParkingConfig = async () => {
      try {
        const parkingRes = await getParkingConfig();
        setSlots(parkingRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUsers = async () => {
      try {
        const userRes = await getSetupUsers();
        const userData = userRes.data.map((user) => ({
          value: user.id,
          label: `${user.firstname} ${user.lastname}`,
        }));
        setUsers(userData);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDetails = async () => {
      try {
        const res = await getRegisteredVehicleDetails(id);
        const data = res.data;
        const initialUser = users.find((user) => user.value === data.user_id);
        setSelectedUser(initialUser);

        setFormData({
          slotNumber: data.slot_number || "",
          vehicleCategory: data.vehicle_category || "",
          vehicleType: data.vehicle_type || "",
          stickerNumber: data.sticker_number || "",
          registrationNumber: data.registration_number || "",
          InsuranceNumber: data.insurance_number || "",
          InsuranceTill: data.insurance_valid_till || "",
          Category: data.category || "",
          vehicleNumber: data.vehicle_number || "",
          unit: data.unit_id || "",
        });

        // if (data.user_id) {

        // }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUnits = async () => {
      try {
        const unitRes = await getAllUnits();
        setUnits(unitRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchParkingConfig();
    fetchUsers();
    fetchUnits();
    fetchDetails();
  }, [id]);

  const handleUserSelection = (selectedOption) => {
    setSelectedUser(selectedOption);
  };
  console.log(selectedUser);
  const userId = getItemInLocalStorage("UserId");
  const navigate = useNavigate();
  const handleEditRVehicle = async () => {
    if (!formData.vehicleNumber || !formData.vehicleCategory) {
      return toast.error("All fields are required!");
    }
    const postData = new FormData();
    postData.append("registered_vehicle[slot_number]", formData.slotNumber);
    postData.append(
      "registered_vehicle[vehicle_category]",
      formData.vehicleCategory
    );
    postData.append("registered_vehicle[vehicle_type]", formData.vehicleType);
    postData.append(
      "registered_vehicle[sticker_number]",
      formData.stickerNumber
    );
    postData.append(
      "registered_vehicle[registration_number]",
      formData.registrationNumber
    );
    postData.append(
      "registered_vehicle[insurance_number]",
      formData.InsuranceNumber
    );
    postData.append(
      "registered_vehicle[insurance_valid_till]",
      formData.InsuranceTill
    );
    postData.append("registered_vehicle[category]", formData.Category);
    postData.append(
      "registered_vehicle[vehicle_number]",
      formData.vehicleNumber
    );
    postData.append("registered_vehicle[unit_id]", formData.unit);
    postData.append("registered_vehicle[created_by_id]", userId);
    const userID = selectedUser.value;
    postData.append("registered_vehicle[user_id]", userID);
    try {
      const registeredRes = await editRegisteredVehicleDetails(id, postData);
      toast.success("Vehicle Edited Successfully");
      navigate(`/admin/rvehicles-details/${id}`);
      console.log(registeredRes);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center  w-full p-4">
      <div className="border border-gray-300 rounded-lg p-4 w-full mx-4">
        <h2
          style={{ background: "rgb(3 19 37)" }}
          className="text-center md:text-xl font-semibold p-2 bg-black rounded-full text-white"
        >
          Edit Vehicle
        </h2>

        <div className="grid md:grid-cols-3 gap-5 my-2">
          <div className="flex flex-col">
            <label htmlFor="users" className="font-semibold mb-1">
              Select User
            </label>
            <Select
              options={users}
              noOptionsMessage={"No Users Available..."}
              onChange={handleUserSelection}
              value={selectedUser}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="slotNumber" className="font-semibold">
              Select parking Slot
            </label>
            <select
              name="slotNumber"
              value={formData.slotNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Slot</option>
              {slots.map((slot) => (
                <option value={slot.id} key={slot.id}>
                  {slot.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="vehicleCategory" className="font-semibold">
              Vehicle Category
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.vehicleCategory}
              onChange={handleChange}
              name="vehicleCategory"
            >
              <option>Select Vehicle Category</option>
              <option value="2 Wheeler">2 Wheeler</option>
              <option value="4 Wheeler">4 Wheeler</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="vehicleType" className="font-semibold">
              Vehicle Type
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.vehicleType}
              onChange={handleChange}
              name="vehicleType"
            >
              <option>Select Vehicle Type</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback </option>
              <option value="Bike">Bike</option>
              <option value="Truck">Truck</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="stickerNumber" className="font-semibold">
              Sticker Number
            </label>
            <input
              type="text"
              id="stickerNumber"
              name="stickerNumber"
              value={formData.stickerNumber}
              onChange={handleChange}
              placeholder="Enter Sticker Number"
              className="border p-2 rounded-md border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="registrationNumber" className="font-semibold">
              Registration Number
            </label>
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="Enter Registration Number"
              className="border p-2 rounded-md border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="insuranceNumber" className="font-semibold">
              Insurance Number
            </label>
            <input
              type="text"
              id="insuranceNumber"
              name="InsuranceNumber"
              value={formData.InsuranceNumber}
              onChange={handleChange}
              placeholder="Enter Insurance Number"
              className="border p-2 rounded-md border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="insuranceValidTill" className="font-semibold">
              Insurance Valid Till
            </label>
            <input
              type="date"
              id="insuranceValidTill"
              name="InsuranceTill"
              value={formData.InsuranceTill}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-300"
              min={today}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category" className="font-semibold">
              Category
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.Category}
              onChange={handleChange}
              name="Category"
            >
              <option>Select Category</option>
              <option>Owned</option>
              <option>Staff</option>
              <option>Leased</option>
              <option>warehouse</option>
              <option>workshop</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="vehicleNumber" className="font-semibold">
              Vehicle Number
            </label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="Enter Vehicle Number"
              className="border p-2 rounded-md border-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="unit" className="font-semibold">
              Unit
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.unit}
              onChange={handleChange}
              name="unit"
            >
              <option>Select Unit</option>
              {units.map((unit) => (
                <option value={unit.id} key={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-5 justify-center items-center my-4">
          <button
            onClick={handleEditRVehicle}
            className="text-white bg-black hover:bg-white hover:text-black border-2 border-black font-semibold py-2 px-4 rounded transition-all duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRVehicle;
