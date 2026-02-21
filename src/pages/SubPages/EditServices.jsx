import React, { useEffect, useState } from "react";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  domainPrefix,
  EditSoftServices,
  getFloors,
  getSoftServicesDetails,
  getUnits,
  // getGenericInfo,       
  // getGenericSubInfo,    
} from "../../api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import Select from "react-select";
import Navbar from "../../components/Navbar";
import CronChecklist from "../../components/Cron";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const themeColor = useSelector((state) => state.theme.color);

  const siteId = getItemInLocalStorage("SITEID");
  const userId = getItemInLocalStorage("UserId");
  const buildings = getItemInLocalStorage("Building");

  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);
  const [groups, setGroups] = useState([]);         // ✅ FIX
  const [subgroups, setSubgroups] = useState([]);   // ✅ FIX
  const [selectedOption, setSelectedOption] = useState([]);

  const [formData, setFormData] = useState({
    site_id: siteId,
    building_id: "",
    floor_id: "",
    unit_id: "",
    user_id: userId,
    name: "",
    generic_info_id: "",
    generic_sub_info_id: "",
    latitude: "",
    longitude: "",
    attachments: [],
  });

  // ---------------- FETCH INITIAL DATA ----------------

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      await fetchGroups();
      await fetchServiceDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroups = async () => {
    try {
      // const res = await getGenericInfo();
      setGroups(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubGroups = async (groupId) => {
    try {
      // const res = await getGenericSubInfo(groupId);
      setSubgroups(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchServiceDetails = async () => {
    try {
      const res = await getSoftServicesDetails(id);
      const data = res.data;

      setFormData((prev) => ({
        ...prev,
        ...data,
      }));

      if (data.building_id) {
        await fetchFloors(data.building_id);
      }

      if (data.floor_id) {
        await fetchUnits(data.floor_id);
      }

      if (data.generic_info_id) {
        await fetchSubGroups(data.generic_info_id);
      }

      if (data.units) {
        const selectedUnits = data.units.map((unit) => ({
          value: unit.id,
          label: unit.name,
        }));
        setSelectedOption(selectedUnits);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFloors = async (buildingId) => {
    const res = await getFloors(buildingId);
    setFloors(res.data.map((f) => ({ id: f.id, name: f.name })));
  };

  const fetchUnits = async (floorId) => {
    const res = await getUnits(floorId);
    setUnits(
      res.data.map((u) => ({
        value: u.id,
        label: u.name,
      }))
    );
  };

  // ---------------- HANDLE CHANGE ----------------

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "building_id") {
      await fetchFloors(value);
      setFormData((prev) => ({ ...prev, building_id: value, floor_id: "" }));
    } else if (name === "floor_id") {
      await fetchUnits(value);
      setFormData((prev) => ({ ...prev, floor_id: value }));
    } else if (name === "generic_info_id") {
      await fetchSubGroups(value);
      setFormData((prev) => ({
        ...prev,
        generic_info_id: value,
        generic_sub_info_id: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (files, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: files,
    }));
  };

  // ---------------- SUBMIT ----------------

  const handleEditService = async () => {
    if (!formData.name || !formData.building_id || !formData.floor_id) {
      return toast.error("All fields are required.");
    }

    try {
      toast.loading("Updating Service...");

      const dataToSend = new FormData();

      dataToSend.append("soft_service[site_id]", formData.site_id);
      dataToSend.append("soft_service[name]", formData.name);
      dataToSend.append("soft_service[building_id]", formData.building_id);
      dataToSend.append("soft_service[floor_id]", formData.floor_id);
      dataToSend.append("soft_service[user_id]", formData.user_id);
      dataToSend.append(
        "soft_service[generic_info_id]",
        formData.generic_info_id
      );
      dataToSend.append(
        "soft_service[generic_sub_info_id]",
        formData.generic_sub_info_id
      );
      dataToSend.append("soft_service[latitude]", formData.latitude);
      dataToSend.append("soft_service[longitude]", formData.longitude);

      selectedOption.forEach((option) => {
        dataToSend.append("soft_service[unit_id][]", option.value);
      });

      (formData.attachments || []).forEach((file) => {
        dataToSend.append("attachfiles[]", file);
      });

      await EditSoftServices(dataToSend, id);

      toast.dismiss();
      toast.success("Service Updated Successfully");
      navigate(`/services/service-details/${id}`);
    } catch (error) {
      toast.dismiss();
      toast.error("Error Updating Service");
      console.log(error);
    }
  };

  // ---------------- UI ----------------

  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full flex flex-col">
        <div className="md:mx-20 my-5 border p-5 rounded-lg">
          <h2 className="text-center text-xl font-bold p-2 bg-black text-white rounded-md">
            Edit Service
          </h2>

          <div className="grid md:grid-cols-3 gap-4 my-5">

            <div className="flex flex-col">
              <label className="font-semibold">Service Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">Select Building:</label>
              <select
                name="building_id"
                value={formData.building_id}
                onChange={handleChange}
                className="border p-2 rounded-md"
              >
                <option value="">Select Building</option>
                {buildings?.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">Select Floor:</label>
              <select
                name="floor_id"
                value={formData.floor_id}
                onChange={handleChange}
                className="border p-2 rounded-md"
              >
                <option value="">Select Floor</option>
                {floors.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">Select Units:</label>
              <Select
                value={selectedOption}
                isMulti
                onChange={setSelectedOption}
                options={units}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">Service Groups:</label>
              <select
                name="generic_info_id"
                value={formData.generic_info_id}
                onChange={handleChange}
                className="border p-2 rounded-md"
              >
                <option value="">Select Group</option>
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">Service SubGroups:</label>
              <select
                name="generic_sub_info_id"
                value={formData.generic_sub_info_id}
                onChange={handleChange}
                className="border p-2 rounded-md"
              >
                <option value="">Select SubGroup</option>
                {subgroups.map((sg) => (
                  <option key={sg.id} value={sg.id}>
                    {sg.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
<p className="font-medium border-b ">Cron setting</p>

          <CronChecklist />
<h2 className="border-b text-center text-xl border-black mb-6 font-bold">
            Attachments
          </h2>
          <FileInputBox
            handleChange={(files) => handleFileChange(files, "attachments")}
            fieldName="attachments"
            isMulti
          />

          <div className="flex justify-end gap-3 mt-5">
            <button
              className="bg-gray-300 px-4 py-2 rounded-md"
              onClick={() => navigate("/services/soft-service")}
            >
              Cancel
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded-md"
              onClick={handleEditService}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditService;
