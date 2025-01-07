import React, { useEffect, useState } from "react";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { getFloors, getUnits, postSoftServices } from "../../api";
import { getGenericGroup, getGenericSubGroup } from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import CronChecklist from "../../components/Cron";
import Select from "react-select";
const AddService = () => {
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);
  const siteId = getItemInLocalStorage("SITEID");
  const userId = getItemInLocalStorage("UserId");
  const [groups, setGroups] = useState([]);
  const [subgroups, setSubGroups] = useState([]);
 
  const [formData, setFormData] = useState({
    site_id: siteId,
    building_id: "",
    floor_id: "",
    unit_id: "",
    user_id: userId,
    name: "",
    generic_info_id:"",
    generic_sub_info_id:"",
    latitude:"",
    longitude:"",
    // wing_id: "",
    // area_id: "",
    attachments: [],
  });
  console.log(formData);
  const buildings = getItemInLocalStorage("Building");
  useEffect(() => {
    const fetchChecklistGroup = async () => {
      try {
        const ChecklistGroupsResp = await getGenericGroup();
       
        console.log("Checklist Group",ChecklistGroupsResp);
        setGroups(ChecklistGroupsResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChecklistGroup();
  }, []);
  
  const handleChange = async (e) => {
    const fetchSubGroup = async (groupId) => {
      try {
        const subCatResp = await getGenericSubGroup(groupId);
        setSubGroups(
          subCatResp.data.map((subCat) => ({
            name: subCat.name,
            id: subCat.id,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    async function fetchFloor(floorID) {
      try {
        const build = await getFloors(floorID);
        setFloors(build.data.map((item) => ({ name: item.name, id: item.id })));
      } catch (e) {
        console.log(e);
      }
    }

    async function getUnit(UnitID) {
      try {
        const unit = await getUnits(UnitID);
        // setUnits(unit.data.map((item) => ({ name: item.name, id: item.id })));
        console.log(unit);
        const unitList = unit.data.map((uni) => ({
          value: uni.id,
          label: uni.name,
        }));
        setUnits(unitList)
        console.log(unitList)
      } catch (error) {
        console.log(error);
      }
    }

    if (e.target.type === "select-one" && e.target.name === "building_id") {
      const BuildID = Number(e.target.value);
      await fetchFloor(BuildID);

      setFormData({
        ...formData,
        building_id: BuildID,
      });
    } else if (
      e.target.type === "select-one" &&
      e.target.name === "floor_name"
    ) {
      const UnitID = Number(e.target.value);
      await getUnit(UnitID);
      setFormData({
        ...formData,
        floor_id: UnitID,
      });
    }else if (
      e.target.type === "select-one" &&
      e.target.name === "generic_info_id"
    ) {
      const GroupID = Number(e.target.value);
      await fetchSubGroup(GroupID);
      setFormData({
        ...formData,
        generic_info_id: GroupID,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleFileChange = (files, fieldName) => {
    // Changed to receive 'files' directly
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
  };
  const navigate = useNavigate();
  const handleAddService = async () => {
    if (
      !formData.name ||
      !formData.building_id ||
      !formData.floor_id 
     
    ) {
      return toast.error("All fields are required.");
    }

    try {
      toast.loading("Creating Service Please Wait!");
      const dataToSend = new FormData();
      dataToSend.append("soft_service[site_id]", formData.site_id);
      dataToSend.append("soft_service[name]", formData.name);
      dataToSend.append("soft_service[building_id]", formData.building_id);
      dataToSend.append("soft_service[floor_id]", formData.floor_id);
      dataToSend.append("soft_service[generic_info_id]", formData.generic_info_id);
      dataToSend.append("soft_service[generic_sub_info_id]", formData.generic_sub_info_id);
      dataToSend.append("soft_service[latitude]", formData.latitude);
      dataToSend.append("soft_service[longitude]", formData.longitude);
      selectedOption.forEach(option => {
        dataToSend.append("soft_service[unit_id][]", option.value);
      });
      dataToSend.append("soft_service[user_id]", formData.user_id);
      (formData.attachments || []).forEach((file, index) => {
        dataToSend.append(`attachfiles[]`, file);
      });
      const serviceResponse = await postSoftServices(dataToSend);
      console.log(serviceResponse);
      navigate("/services/soft-service");
      toast.dismiss();
      toast.success("Service Created Successfully");
    } catch (error) {
      toast.error("Error Creating Service");
      console.log(error);
      toast.dismiss()
    }
  };

  const themeColor = useSelector((state) => state.theme.color);
  const [selectedOption, setSelectedOption] = useState([]);
  var handleChangeSelect = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
  };

  return (
    <section>
      <div className="m-2">
        <h2
          style={{ background: "rgb(19 27 32)" }}
          className="text-center text-xl font-bold p-2  rounded-full text-white"
        >
          Create Service
        </h2>
        <div className="md:mx-20 my-5 md:mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg ">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold">
                Service Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Service Name"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
            </div>

            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold">
                Select Building:
              </label>
              <select
                className="border p-1 px-4 border-gray-500 rounded-md"
                value={formData.building_id}
                onChange={handleChange}
                name="building_id"
              >
                <option value="">Select Building</option>
                {buildings?.map((building) => (
                  <option value={building.id} key={building.id}>
                    {building.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Select Floor:
              </label>
              <select
                className="border p-1 px-4 border-gray-500 rounded-md"
                value={formData.floor_id}
                onChange={handleChange}
                name="floor_name"
              >
                <option value="">Select Floor</option>
                {floors?.map((floor) => (
                  <option value={floor.id} key={floor.id}>
                    {floor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col z-50">
              <label htmlFor="" className="font-semibold">
                Select Unit:
              </label>
            
               <Select
               closeMenuOnSelect={false}
              isMulti
              onChange={handleChangeSelect}
              options={units}
              noOptionsMessage={() => "No Units Available"}
              //   maxMenuHeight={90}
              placeholder="Select Units"
            />
            </div>
            <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">Service Groups:</label>
                  <select name="generic_info_id" id="" 
                  value={formData.generic_info_id}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  >
                    <option value="">Select Group</option>
                    {groups.map((group) => (
                  <option value={group.id} key={group.id}>
                    {group.name}
                  </option>
                ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">Service SubGroups:</label>
                  <select name="generic_sub_info_id" id="" 
                 value={formData.generic_sub_info_id}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md">
                    <option value="">Select SubGroup</option>
                    {subgroups.map((subgroup) => (
                  <option value={subgroup.id} key={subgroup.id}>
                    {subgroup.name}
                  </option>
                ))}
                  </select>
                </div>
                <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold">
                Latitude:
              </label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Enter Latitude"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold">
                Longitude:
              </label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Enter Longitude"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
            </div>
          </div>
          <div>
<p className="font-medium border-b ">Cron setting</p>
          <CronChecklist />
          </div>
          <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
            Attachments
          </h2>
          <FileInputBox
            handleChange={(files) => handleFileChange(files, "attachments")}
            fieldName={"attachments"}
            isMulti={true}
          />
          <div className="md:flex grid md:grid-cols-2 gap-2 my-5 justify-center">
            <button
              className="bg-black text-white p-2 px-4 rounded-md font-medium"
              onClick={handleAddService}
            >
              Save & Show Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddService;
