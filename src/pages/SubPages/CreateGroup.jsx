import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PiPlusCircle } from "react-icons/pi";
import MultiSelect from "../AdminHrms/Components/MultiSelect";
import { getAllUnits, getSetupUsers, postGroups } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";

function CreateGroup({ onclose }) {
  const [formData, setFormData] = useState({
    groupName: "",
    profilePic: [],
    groupDescription: "",
    member_ids: [],
  });

  console.log("FormData", formData);
  const themeColor = useSelector((state) => state.theme.color);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [ownership, setOwnership] = useState([]);
  const [selectedOwnership, setSelectedOwnership] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await getSetupUsers();
        const unitsRes = await getAllUnits();

        setUnits(unitsRes.data); // Store all units

        const employeesList = usersRes.data.map((emp) => ({
          id: emp.id,
          name: `${emp.firstname} ${emp.lastname}`,
          userSites: emp.user_sites || [], // Ensure `user_sites` is not undefined
        }));

        setMembers(employeesList);
        setFilteredMembers(employeesList); // Default view
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilter = () => {
    console.log(
      "Selected Unit:",
      selectedUnit,
      "Selected Ownership:",
      selectedOwnership
    );
    console.log("Members Before Filtering:", members);

    const filtered = members.filter((member) =>
      member.userSites.some((site) => {
        console.log("Checking Site:", site);

        const unitMatch =
          !selectedUnit || Number(site.unit_id) === Number(selectedUnit);
        const ownershipMatch =
          !selectedOwnership ||
          site.ownership?.toLowerCase() === selectedOwnership.toLowerCase();

        console.log(
          "Unit Match:",
          unitMatch,
          "Ownership Match:",
          ownershipMatch
        );
        return unitMatch && ownershipMatch;
      })
    );
    console.log("Filtered Members:", filtered);
    setFilteredMembers(filtered);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get selected file
    setFormData((prev) => ({
      ...prev,
      profilePic: file,
    }));
  };

  useEffect(() => {
    const filtered = members.filter((user) =>
      user.userSites.some(
        (site) =>
          (selectedUnits.length === 0 ||
            selectedUnits.includes(site.unit_id)) &&
          (ownership.length === 0 || ownership.includes(site.ownership))
      )
    );
    setFilteredMembers(filtered);
  }, [selectedUnits, ownership, members]);

  const handleSelectEdit = (option) => {
    if (selectedMembers.includes(option)) {
      setSelectedMembers(selectedMembers.filter((item) => item !== option));
    } else {
      setSelectedMembers([...selectedMembers, option]);
    }
  };

  console.log("USer", selectedMembers);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const user_id = getItemInLocalStorage("UserId");
  const handleCreateGroup = async () => {
    const postData = new FormData();
    postData.append("group[group_name]", formData.groupName);
    postData.append("group[group_description]", formData.groupDescription);
    postData.append("group[created_by_id]", user_id);
    if (formData.profilePic) {
      postData.append("attachment", formData.profilePic);
    }
  
    selectedMembers.forEach((member) => {
      postData.append("group[member_ids][]", member);
    });
    try {
      await postGroups(postData);
      toast.success("Group created successfully");
      onclose();
    } catch (error) {
      console.log(error);
    }
  };

  const ownershipOptions = [
    { value: "owner", label: "Owner" },
    { value: "tenant", label: "Tenant" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
      <div className="max-h-screen bg-white p-4 w-[40rem] rounded-xl shadow-lg overflow-y-auto">
        <h2 className="flex items-center gap-2 justify-center border-b font-medium text-xl p-2">
          <PiPlusCircle size={20} /> Create Group
        </h2>

        <div className="md:grid grid-cols-2 gap-2 mt-2">
          <div className="flex flex-col">
            <label className="font-medium">Group Name</label>
            <input
              type="text"
              placeholder="Group name"
              className="border p-2 border-gray-300 rounded-md"
              value={formData.groupName}
              onChange={handleChange}
              name="groupName"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-2 items-end">
          {/* Unit Select Dropdown */}
          <select
            className="border p-3 border-gray-300 rounded-md flex-1"
            value={selectedUnit || ""}
            onChange={(e) => setSelectedUnit(Number(e.target.value))}
          >
            <option value="">Select Unit</option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>

          {/* Ownership Select Dropdown */}
          <select
            className="border p-3 border-gray-300 rounded-md flex-1"
            value={selectedOwnership}
            onChange={(e) => setSelectedOwnership(e.target.value)}
          >
            <option value="">Select Ownership</option>
            <option value="tenant">Tenant</option>
            <option value="owner">Owner</option>
          </select>

          {/* Filter Button */}
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Filter
          </button>
        </div>

        <MultiSelect
          options={filteredMembers.map((member) => ({
            value: member.id,
            label: member.name,
          }))}
          title="Select Members"
          handleSelect={handleSelectEdit} // Ensure it directly takes the option
          selectedOptions={selectedMembers} // Pass the correct selected state
          setSelectedOptions={setSelectedMembers} // Ensure it updates state
          compTitle="Select Group Members"
        />

        <div className="flex flex-col mt-2">
          <label className="font-medium">Description</label>
          <textarea
            name="groupDescription"
            className="border p-2 border-gray-300 rounded-md"
            placeholder="Group description"
            value={formData.groupDescription}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="flex flex-col m-2">
          <label className="font-medium">Group profile picture</label>
          <input
            type="file"
            accept="image/*" // Restrict to images
            className="border p-2 border-gray-300 rounded-md"
            onChange={handleFileChange} // Call function on file select
          />
        </div>

        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="bg-red-400 text-white p-2 rounded-full px-4"
            onClick={onclose}
          >
            <MdClose /> Close
          </button>
          <button
            className="bg-green-400 text-white p-2 rounded-full px-4"
            onClick={handleCreateGroup}
          >
            <FaCheck /> Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
