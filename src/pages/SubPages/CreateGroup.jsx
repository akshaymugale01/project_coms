import React, { useEffect, useState } from "react";
import image from "/profile.png";
import Select from "react-select";
import { useSelector } from "react-redux";
import { PiPlusCircle } from "react-icons/pi";
import MultiSelect from "../AdminHrms/Components/MultiSelect";
import { getAllUnits, getSetupUsers, postGroups } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
function CreateGroup({ onclose }) {
  const [formData, setFormData] = useState({
    groupName: "",
    groupDescription: "",
    profilePic: [],
  });

  const themeColor = useSelector((state) => state.theme.color);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [units, setUnits] = useState([]);
  const [ownership, setOwnership] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]); // Selected units by user

  const handleSelectEdit = (option, type) => {
    console.log("Option selected:", option, "Type:", type);

    if (type === "unit") {
      setUnits((prev) => {
        const exists = prev.some((u) => u.value === option.value);
        return exists
          ? prev.filter((u) => u.value !== option.value)
          : [...prev, option];
      });
    } else if (type === "ownership") {
      setOwnership((prev) => {
        const exists = prev.some((o) => o.value === option.value);
        return exists
          ? prev.filter((o) => o.value !== option.value)
          : [...prev, option];
      });
    } else if (type === "member") {
      setSelectedOptions((prev) => {
        const exists = prev.some((m) => m.value === option.value);
        return exists
          ? prev.filter((m) => m.value !== option.value)
          : [...prev, option];
      });
    }
  };

  const handleUserSelectEdit = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const fetchUnits = async () => {
    try {
      const res = await getAllUnits();
      console.log("Units", res);
      const unitsList = res.data.map((unit) => ({
        value: unit.id,
        label: unit.name,
      }));
      setUnits(unitsList);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Units", units);
  console.log(selectedOptions);

  useEffect(() => {
    const fetchAllMembers = async () => {
      try {
        const res = await getSetupUsers();
        console.log("res", res);
        const employeesList = res.data.map((emp) => ({
          value: emp.id,
          label: `${emp.firstname} ${emp.lastname}`,
          user_sites: emp.user_sites,
        }));
        setMembers(employeesList);
        setFilteredMembers(employeesList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllMembers();
    fetchUnits();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const user_id = getItemInLocalStorage("UserId");
  const handleCreateGroup = async () => {
    const postData = new FormData();
    postData.append("group[group_name]", formData.groupName);
    postData.append("group[group_description]", formData.groupDescription);
    postData.append("group[created_by_id]", user_id);
    selectedOptions.forEach((member) => {
      postData.append("group[member_ids][]", member);
    });
    try {
      const res = await postGroups(postData);
      toast.success("Group created successfully");
      onclose();
      setFormData({
        groupName: "",
        groupDescription: "",
      });
      setSelectedOptions([]);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter Members Based on Selected Units & Ownership
  useEffect(() => {
    const filtered = members.filter((user) =>
      user.user_sites.some(
        (site) =>
          (units.length === 0 || units.includes(site.unit_id)) &&
          (ownership.length === 0 || ownership.includes(site.ownership))
      )
    );

    setFilteredMembers(filtered);
  }, [units, ownership, members]);

  console.log("Filtered Users", filteredMembers);

  const ownershipOptions = [
    { value: "owner", label: "Owner" },
    { value: "tenant", label: "Tenant" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
      <div class="max-h-screen bg-white p-2 w-[40rem] rounded-xl shadow-lg overflow-y-auto">
        <div className="flex flex-col justify-center">
          <div className=" ">
            <h2 className="flex items-center gap-2 justify-center border-b font-medium text-xl p-2 ">
              <PiPlusCircle size={20} /> Create Group
            </h2>

            <div className="md:grid grid-cols-2 gap-2 mt-2 mx-2">
              <div className="flex flex-col mt-2 ">
                <label className=" font-medium ">Group name</label>
                <input
                  type="text"
                  placeholder="Group name"
                  className="border p-2 border-gray-300 rounded-md"
                  value={formData.groupName}
                  onChange={handleChange}
                  name="groupName"
                />
              </div>

              <MultiSelect
                options={units} // Available options
                title={"Select Units"}
                handleSelect={(option) => handleSelectEdit(option, "unit")}
                selectedOptions={selectedUnits}
                setSelectedOptions={setSelectedUnits}
                searchOptions={units}
                compTitle="Select Unit"
              />

              {/* Ownership Selection */}
              <MultiSelect
                options={ownershipOptions} // This should be a list of objects { value, label }
                title={"Select Ownership"}
                handleSelect={(option) => handleSelectEdit(option, "ownership")}
                selectedOptions={ownership} // This should match the selected filter options
                setSelectedOptions={setOwnership}
                searchOptions={ownershipOptions}
                compTitle="Select Ownership"
              />

              <div className="flex flex-col mt-2 ">
                <MultiSelect
                  options={filteredMembers}
                  title={"Select members"}
                  handleSelect={handleUserSelectEdit}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  setOptions={setMembers}
                  searchOptions={filteredMembers}
                  compTitle="Select Group Members"
                />
              </div>
            </div>
            <div className="flex flex-col mx-2 ">
              <label className=" font-medium ">Description</label>
              <textarea
                name="groupDescription"
                id=""
                cols="30"
                rows="3"
                className="border p-2 border-gray-300 rounded-md"
                placeholder="Group description"
                value={formData.groupDescription}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex flex-col m-2 ">
              <label className=" font-medium ">Group profile picture</label>

              <input
                type="file"
                name=""
                id=""
                className="border p-2 border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-center items-center gap-2">
              <button
                className="flex items-center gap-2 bg-red-400 text-white p-2 rounded-full px-4 my-2"
                onClick={() => onclose()}
              >
                <MdClose /> Close
              </button>
              <button
                className="flex items-center gap-2 bg-green-400 text-white p-2 rounded-full px-4 my-2"
                onClick={handleCreateGroup}
              >
                <FaCheck /> Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
