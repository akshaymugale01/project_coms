import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Select from "react-select";
import { FaCheck, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getAllUnits,
  getAssignedTo,
  getBuildings,
  getGroups,
  getSetupUsers,
  postPolls,
} from "../../api";
import { MdClose } from "react-icons/md";
import MultiSelect from "../AdminHrms/Components/MultiSelect";

function CreatePolls() {
  const themeColor = useSelector((state) => state.theme.color);
  const [share, setShare] = useState("all");
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [selectedOwnership, setSelectedOwnership] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [pollInput, setPollInput] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [selectedUserOption, setSelectedUserOption] = useState([]);
  const [pollsOption, setPollsOption] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    setCurrentDate(formattedDate);
  }, []);

  const navigate = useNavigate();

  const handleAddPolls = (event) => {
    event.preventDefault();

    if (pollInput.trim() !== "") {
      if (pollsOption.length < 5) {
        setPollsOption([...pollsOption, { pollOption: pollInput }]);
        setPollInput(""); // Clear the input after adding the poll option
      } else {
        toast.error("You can only add up to 5 options");
      }
    } else {
      toast.error("Please enter a poll option");
    }
  };

  const handleUserChangeSelect = (selectedUserOption) => {
    setSelectedUserOption(selectedUserOption);
    const targetGroups = selectedUserOption.map((user) => user.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      target_groups: targetGroups,
    }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAssignedTo();
        const transformedUsers = response.data.map((user) => ({
          value: user.id,
          label: `${user.firstname} ${user.lastname}`,
        }));
        setUsers(transformedUsers);
        console.log(response);
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };

    if (share === "groups") {
      fetchGroups();
    }

    fetchUsers();

    const fetchAssignedTo = async () => {
      const assignedToList = await getAssignedTo();
      const user = assignedToList.data.map((u) => ({
        value: u.id,
        label: `${u.firstname} ${u.lastname}`,
      }));
      setAssignedTo(user);
    };
    fetchAssignedTo();
  }, [share]);

  const fetchGroups = async () => {
    try {
      const response = await getGroups(); // Assuming your API to get groups
      setGroups(response.data || []); // Adjust based on actual API response structure
      console.log("group", response);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleGroupChange = (event) => {
    const groupId = parseInt(event.target.value, 10) || 0; // Default to 0 if value is invalid
    setSelectedGroup(event.target.value);
    setFormData({ ...formData, group_id: groupId });
  };

  const handleRemovePolls = (index) => {
    const newPollsOption = [...pollsOption];
    newPollsOption.splice(index, 1);
    setPollsOption(newPollsOption);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    visibility: "",
    user_ids: "",
    group_id: "",
    shared: "",
    shared_with: "",
    group_name: "",
    target_groups: [], // Array to store selected target groups
    poll_options_attributes: {}, // Object to store poll options
  });

  console.log("FormData", formData);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    const userIdsString = selectedIds.join(",");

    setFormData({ ...formData, user_ids: userIdsString });
  };

  const handleSubmit = async () => {
    const sendData = new FormData();
    sendData.append("poll[title]", formData.title);
    sendData.append("poll[description]", formData.description);
    sendData.append("poll[start_date]", currentDate);
    sendData.append("poll[end_date]", formData.end_date);
    sendData.append("poll[start_time]", formData.start_time);
    sendData.append("poll[end_time]", formData.end_time);
    sendData.append("poll[visibility]", formData.visibility);
    if (share === "all") {
      sendData.append("poll[shared]", "all");
    } else if (share === "individual") {
      sendData.append("poll[shared]", "individual");
      sendData.append("poll[user_ids]", formData.user_ids);
    } else if (share === "groups") {
      sendData.append("poll[shared]", "groups");
      sendData.append("poll[group_id]", formData.group_id);
      sendData.append("poll[group_name]", formData.group_name);
    }

    // Append target groups (assumed to be single value for simplicity)
    formData.target_groups.forEach((group) => {
      sendData.append("poll[target_groups]", group);
    });

    // Create poll_options_attributes with proper indexing
    pollsOption.forEach((option, index) => {
      sendData.append(
        `poll[poll_options_attributes][${index + 1}][content]`,
        option.pollOption
      );
    });

    try {
      const pollresp = await postPolls(sendData); // Call the API with the form data
      toast.success("Poll Added Successfully");
      navigate("/communication/polls");
      console.log(pollresp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await getSetupUsers();
        const unitsRes = await getBuildings();
        console.log("userSites", unitsRes);
        setUnits(unitsRes.data);

        const employeesList = usersRes.data.map((emp) => ({
          id: emp.id,
          name: `${emp.firstname} ${emp.lastname}`,
          building_id: emp.building_id,
          userSites: emp.user_sites || [],
        }));

        setMembers(employeesList);
        setFilteredMembers(employeesList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilter = () => {
    console.log(
      "Selected Building ID:",
      selectedUnit,
      "Selected Ownership:",
      selectedOwnership
    );
    console.log("Members Before Filtering:", members);

    const filtered = members.filter((member) => {
      // Check if the user belongs to the selected building
      const buildingMatch =
        !selectedUnit || Number(member.building_id) === Number(selectedUnit);

      // Check if any of the user's sites match the selected ownership
      const ownershipMatch =
        !selectedOwnership ||
        member.userSites.some(
          (site) =>
            site.ownership?.toLowerCase() === selectedOwnership.toLowerCase()
        );

      console.log(
        "User:",
        member.name,
        "Building Match:",
        buildingMatch,
        "Ownership Match:",
        ownershipMatch
      );

      return buildingMatch && ownershipMatch;
    });

    console.log("Filtered Members:", filtered);
    setFilteredMembers(filtered);
  };

  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSelectEdit = (option) => {
    if (selectedMembers.includes(option)) {
      setSelectedMembers(selectedMembers.filter((item) => item !== option));
    } else {
      setSelectedMembers([...selectedMembers, option]);
    }
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="my-5 mb-10 border border-gray-200 p-2 m-5 px-2 rounded-lg">
          <h2
            className="text-center text-xl font-bold  p-2 bg-black rounded-md text-white"
            style={{ background: "rgb(19 27 32)" }}
          >
            Create Polls
          </h2>

          <div className="md:grid grid-cols-3 gap-5 my-5">
            <div className="flex flex-col">
              <label className="font-semibold my-2">Poll Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Enter Poll Title"
                className="border p-2 px-4 border-gray-400 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold my-2">Poll Options</label>
              <div className="flex xl:flex-row flex-col gap-3 ">
                <input
                  type="text"
                  placeholder="Poll Options"
                  className="border p-2 w-96 px-4 border-gray-400 rounded-md"
                  value={pollInput}
                  onChange={(e) => setPollInput(e.target.value)}
                  disabled={pollsOption.length >= 5}
                />
                <button
                  className="border-2 border-black rounded-md p-2 px-4"
                  onClick={handleAddPolls}
                  disabled={pollsOption.length >= 5}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold my-2">Visibility</label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleFormChange}
                className="border py-2 px-4 border-gray-400 rounded-md"
              >
                <option value="">Select Visibility</option>
                <option value="Public">Public</option>
                <option value="Restricted">Restricted</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold my-2">Start Date/Time</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleFormChange}
                // readOnly
                className="border p-2 px-4 border-gray-400 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold my-2">Start Time</label>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleFormChange}
                className="border p-2 px-4 border-gray-400 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold my-2">End Date/Time</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleFormChange}
                className="border p-2 px-4 border-gray-400 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold my-2">End Time</label>
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleFormChange}
                className="border p-2 px-4 border-gray-400 rounded-md"
              />
            </div>
          </div>

          {/* Share Option */}
          <div className="">
            <h2 className="border-b t border-black my-5 text-lg font-semibold">
              Share With
            </h2>
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-row gap-2 w-full font-semibold p-2 ">
                <h2
                  className={`p-1 ${
                    share === "all" && "bg-black text-white"
                  } rounded-full px-6 cursor-pointer border-2 border-black`}
                  onClick={() => setShare("all")}
                >
                  All
                </h2>
                <h2
                  className={`p-1 ${
                    share === "individual" && "bg-black text-white"
                  } rounded-full px-4 cursor-pointer border-2 border-black`}
                  onClick={() => setShare("individual")}
                >
                  Individuals
                </h2>
                <h2
                  className={`p-1 ${
                    share === "groups" && "bg-black text-white"
                  } rounded-full px-4 cursor-pointer border-2 border-black`}
                  onClick={() => setShare("groups")}
                >
                  Groups
                </h2>
              </div>
              <div className="my-5 flex w-full">
                {share === "individual" && (
                  <div className="flex flex-wrap gap-4 mt-2 items-center">
                    {/* Unit Select Dropdown */}
                    <select
                      className="border p-3 border-gray-300 rounded-md flex-1 min-w-[150px]"
                      value={selectedUnit || ""}
                      onChange={(e) => setSelectedUnit(Number(e.target.value))}
                    >
                      <option value="">Select Tower</option>
                      {units.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name}
                        </option>
                      ))}
                    </select>

                    {/* Ownership Select Dropdown */}
                    <select
                      className="border p-3 border-gray-300 rounded-md flex-1 min-w-[150px]"
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
                      className="bg-blue-500 text-white px-4 py-2 rounded-md min-w-[100px]"
                    >
                      Filter
                    </button>

                    {/* MultiSelect Dropdown */}
                    <div className="w-full md:w-auto">
                      <Select
                        options={filteredMembers.map((member) => ({
                          value: member.id,
                          label: member.name,
                        }))}
                        className="w-full"
                        title="Select Members"
                        handleSelect={handleSelectEdit}
                        selectedOptions={selectedMembers}
                        setSelectedOptions={setSelectedMembers}
                        compTitle="Select Group Members"
                      />
                    </div>
                  </div>
                )}

                {share === "groups" && (
                  <div className="group-dropdown">
                    <label
                      htmlFor="group-select"
                      className="block mb-2 font-medium"
                    >
                      Select a Group:
                    </label>
                    <select
                      id="group-select"
                      className="border border-gray-300 rounded px-4 py-2"
                      value={selectedGroup}
                      onChange={handleGroupChange}
                    >
                      <option value="">-- Select a Group --</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.group_name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold my-2">Target Groups/Roles</label>
            <Select
              isMulti
              value={selectedUserOption}
              onChange={handleUserChangeSelect}
              options={assignedTo}
              noOptionsMessage={() => "No Users Available"}
              placeholder="Select Users"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold my-2">Poll Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              cols="5"
              rows="3"
              placeholder="Description"
              className="border p-2 px-4 border-gray-400 rounded-md"
            />
          </div>
          {pollsOption.length !== 0 && (
            <div className="flex items-center gap-2 flex-wrap border rounded-md p-2 my-2">
              {pollsOption.map((option, index) => (
                <div key={index} className="flex">
                  <div className="flex xl:flex-row flex-col gap-3 items-center bg-blue-400 p-1 rounded-md">
                    {/* <label className=" text-white">Option - {index + 1}</label> */}
                    {/* <input
                    type="text"
                    value={option.pollOption}
                    readOnly
                    className="border p-2 w-full px-4 border-gray-400 rounded-md"
                  /> */}
                    <p className="bg-green-400 rounded-md text-white p-1">
                      {option.pollOption}
                    </p>
                    <button
                      className="rounded-full bg-red-400 text-white p-1"
                      onClick={() => handleRemovePolls(index)}
                    >
                      <MdClose />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center my-5 gap-2">
            <button
              onClick={handleSubmit}
              className="bg-black text-white p-2 px-4 rounded-md font-medium flex items-center gap-2"
              style={{ background: themeColor }}
            >
              <FaCheck /> Create Poll
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreatePolls;
