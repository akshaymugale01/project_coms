import React, { useEffect, useRef, useState } from "react";
import FileInput from "../../Buttons/FileInput";
import Switch from "../../Buttons/Switch";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  postEvents,
  getAssignedTo,
  getGroups,
  getSetupUsers,
  getAllUnits,
  getBuildings,
} from "../../api";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import MultiSelect from "../AdminHrms/Components/MultiSelect";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateEvent = () => {
  const siteId = getItemInLocalStorage("SITEID");
  const userID = getItemInLocalStorage("UserId");
  const [share, setShare] = useState("all");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [ownership, setOwnership] = useState([]);
  const [selectedOwnership, setSelectedOwnership] = useState("");
  const [selectedFloor, setselectedFloor] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [users, setUsers] = useState([]);
  // const [selectedUnits, setSelectedUnits] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    site_id: siteId,
    created_by: userID,
    event_name: "",
    venue: "",
    description: "",
    start_date_time: "",
    end_date_time: "",
    user_ids: "",
    group_id: null,
    group_name: "",
    event_images: [],
    shared: "",
    email_enabled: false,
    rsvp_enabled: false,
    important: false,
    group_member: [],
  });
  console.log(formData);
  const fileInputRef = useRef(null);
  const themeColor = useSelector((state) => state.theme.color);
  const datePickerRef = useRef(null);
  const currentDate = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await getSetupUsers();
        const unitsRes = await getBuildings();
        console.log("userSites", unitsRes);
        setUnits(unitsRes.data);
        console.log("usersRes", usersRes);
        const employeesList = usersRes.data.map((emp) => ({
          id: emp.id,
          name: `${emp.firstname} ${emp.lastname}`,
          building_id: emp.building_id || emp.building?.id || null, //for some users id is null
          userSites: emp.user_sites || [],
          building: emp.building || {},
        }));

        setMembers(employeesList);
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
        !selectedUnit || Number(member.building_id ?? member.building?.id) === Number(selectedUnit);

      console.log(
        "building_id type:",
        typeof member.building_id,
        member.building_id
      );

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
    toast.success("Filter applied");
  };

  const handleStartDateChange = (date) => {
    setFormData({ ...formData, start_date_time: date });
  };

  const handleEndDateChange = (date) => {
    setFormData({ ...formData, end_date_time: date });
  };

  const formatDateTime = (date) => {
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const usersRes = await getSetupUsers();
  //       const unitsRes = await getAllUnits();

  //       setUnits(unitsRes.data);

  //       const employeesList = usersRes.data.map((emp) => ({
  //         id: emp.id,
  //         name: `${emp.firstname} ${emp.lastname}`,
  //         userSites: emp.user_sites || [],
  //       }));

  //       setMembers(employeesList);
  //       setFilteredMembers(employeesList);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const handleFilter = () => {
  //   console.log(
  //     "Selected Unit:",
  //     selectedUnit,
  //     "Selected Ownership:",
  //     selectedOwnership
  //   );
  //   console.log("Members Before Filtering:", members);

  //   const filtered = members.filter((member) =>
  //     member.userSites.some((site) => {
  //       console.log("Checking Site:", site);
  //       const unitMatch =
  //         !selectedUnit || Number(site.unit_id) === Number(selectedUnit);
  //       const ownershipMatch =
  //         !selectedOwnership ||
  //         site.ownership?.toLowerCase() === selectedOwnership.toLowerCase();
  //       console.log(
  //         "Unit Match:",
  //         unitMatch,
  //         "Ownership Match:",
  //         ownershipMatch
  //       );
  //       return unitMatch && ownershipMatch;
  //     })
  //   );
  //   console.log("Filtered Members:", filtered);
  //   setFilteredMembers(filtered);
  // };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getSetupUsers();
        const transformedUsers = response.data.map((user) => ({
          value: user.id,
          label: `${user.firstname} ${user.lastname}`,
        }));
        setUsers(transformedUsers);
        console.log("users Resp: ", response);
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };

    if (share === "groups") {
      fetchGroups();
    }

    fetchUsers();
  }, [share]);

  useEffect(() => {
    const filtered = members.filter((user) =>
      user.userSites.some(
        (site) =>
          (!selectedUnit || site.unit_id === selectedUnit) &&
          (!ownership || site.ownership === ownership)
      )
    );

    setFilteredMembers(filtered);
  }, [selectedUnit, ownership, members]);

  const fetchGroups = async () => {
    try {
      const response = await getGroups(); // Assuming your API to get groups
      setGroups(response.data || []); // Adjust based on actual API response structure
      console.log("group", response);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  console.log("ggp", groups);

  // const handleGroupChange = (event) => {
  //   const groupId = parseInt(event.target.value, 10) || 0; // Default to 0 if value is invalid
  //   setSelectedGroup(event.target.value);
  //   setFormData({ ...formData, group_id: groupId });
  // };

  const handleGroupChange = (event) => {
    const groupId = parseInt(event.target.value, 10) || 0;
    const selectedGroupObj = groups.find((group) => group.id === groupId);

    setSelectedGroup(event.target.value);
    setFormData({ ...formData, group_id: groupId });

    // Set members directly from selected group object
    setGroupMembers(selectedGroupObj?.group_members || []);
  };

  console.log("Group member", groupMembers);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleCreateEvent = async () => {
    if (formData.event_name === "" || formData.start_date_time === "") {
      return toast.error("All fields are Required");
    }
    if (submitting) return; // Prevent multiple submissions

    setSubmitting(true);
    try {
      toast.loading("Creating Event Please Wait!");
      const formDataSend = new FormData();

      formDataSend.append("event[site_id]", formData.site_id);
      formDataSend.append("event[event_name]", formData.event_name);
      formDataSend.append("event[discription]", formData.description);
      formDataSend.append(
        "event[start_date_time]",
        formatDateTime(formData.start_date_time)
      );
      formDataSend.append(
        "event[end_date_time]",
        formatDateTime(formData.end_date_time)
      );
      formDataSend.append("event[venue]", formData.venue);
      formDataSend.append("event[user_ids]", formData.user_ids);
      formDataSend.append("event[shared]", share);
      formDataSend.append("event[email_enabled]", formData.email_enabled);
      formDataSend.append("event[rsvp_enabled]", formData.rsvp_enabled);
      formDataSend.append("event[important]", formData.important);
      if (share === "all") {
        formDataSend.append("event[shared]", "all");
      } else if (share === "individual") {
        formDataSend.append("event[shared]", "individual");
        formDataSend.append("event[user_ids]", formData.user_ids);
      } else if (share === "groups") {
        formDataSend.append("event[shared]", "groups");
        formDataSend.append("event[group_id]", formData.group_id);
        formDataSend.append("event[group_name]", formData.group_name);
      }
      // formDataSend.append("event[important]", formData.important);

      // formData.user_ids.forEach((user_id) => {
      //   formDataSend.append("event[user_ids]", user_id);
      // });

      if (formData.event_images && formData.event_images.length > 0) {
        formData.event_images.forEach((file, index) => {
          formDataSend.append(`event[event_images][]`, file);
        });
      }
      const response = await postEvents(formDataSend);
      toast.success("Event Created Successfully");
      console.log("Response:", response.data);
      toast.dismiss();
      navigate("/communication/events");
    } catch (error) {
      console.log(error);
      toast.dismiss();
      setSubmitting(false);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    const userIdsString = selectedIds.join(",");

    setFormData({ ...formData, user_ids: userIdsString });
  };

  const handleFileAttachment = (input) => {
    let files = [];
    // If called from an event, extract files from event.target
    if (input && input.target && input.target.files) {
      files = Array.from(input.target.files);
    } else if (Array.isArray(input)) {
      files = input;
    } else if (input) {
      files = [input];
    }
    setFormData({ ...formData, event_images: files });
  };

  const filterTime = (time) => {
    const selectedDate = new Date(time);
    const currentDate = new Date();

    if (selectedDate.getTime() > currentDate.getTime()) {
      return true;
    } else if (selectedDate.getTime() === currentDate.getTime()) {
      const selectedTime =
        selectedDate.getHours() * 60 + selectedDate.getMinutes();
      const currentTime =
        currentDate.getHours() * 60 + currentDate.getMinutes();
      return selectedTime >= currentTime;
    } else {
      return false;
    }
  };

  const handleFileChange = (files, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: Array.isArray(files) ? files : [files],
    });
  };

  const handleSelectEdit = (selectedOption) => {
    setSelectedMembers(selectedOption); // Update state for selected members

    const selectedUserIds = selectedOption.map((option) => option.value); // Extract user IDs
    console.log("akshay", selectedUserIds);

    setFormData((prevFormData) => ({
      ...prevFormData,
      user_ids: selectedUserIds.join(","), // Store user IDs as a comma-separated string
    }));
  };

  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-center">
          <div className=" my-5 mb-10 border w-full max-w-[70rem] border-gray-400 p-2 rounded-lg ">
            <h2
              style={{ background: "rgb(17, 24, 39)" }}
              className="text-center text-xl font-medium p-2  rounded-md text-white"
            >
              Create Event
            </h2>
            <h2 className="border-b text-xl border-black my-6 font-semibold">
              Event Info
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Title :
                </label>
                <input
                  type="text"
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleChange}
                  id=""
                  placeholder="Enter Title"
                  className="border-gray-400 border p-2  rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Venue :
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  id=""
                  placeholder="Enter Venue"
                  className="border-gray-400 border p-2  rounded-md"
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                {/* <div > */}
                {/* <p className="font-medium mb-2">Start Time:</p> */}
                <DatePicker
                  selected={formData.start_date_time}
                  onChange={handleStartDateChange}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy h:mm aa"
                  placeholderText="Select start date & time"
                  ref={datePickerRef}
                  minDate={currentDate}
                  className="border border-gray-400 p-2 w-full rounded-md"
                />
                {/* </div> */}-{/* <div> */}
                {/* <p className="font-medium mb-2">End Time:</p> */}
                <DatePicker
                  selected={formData.end_date_time}
                  onChange={handleEndDateChange}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy h:mm aa"
                  placeholderText="Select end date & time"
                  ref={datePickerRef}
                  minDate={currentDate}
                  className="border border-gray-400 rounded-md p-2 w-full "
                />
                {/* </div> */}
              </div>
            </div>
            <div className="flex flex-col gap-2 my-2">
              <label htmlFor="" className="font-medium">
                Description:
              </label>
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
                placeholder="Enter Description"
                className="bg-white"
                style={{ minHeight: "120px" }}
              />
            </div>
            <div className="flex gap-4 my-5">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name=""
                  id="imp"
                  checked={formData.important === true}
                  onChange={() =>
                    setFormData({ ...formData, important: !formData.important })
                  }
                />
                <label htmlFor="imp" className="font-semibold">
                  Important
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name=""
                  id="email"
                  checked={formData.email_enabled === true}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      email_enabled: !formData.email_enabled,
                    })
                  }
                />
                <label htmlFor="email" className="font-semibold">
                  Send Email
                </label>
              </div>
            </div>
            {/* <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileAttachment}
            /> */}
            <div className="">
              <h2 className="border-b t border-black my-5 text-lg font-semibold">
                Share With
              </h2>
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row gap-2 w-full font-semibold p-2 ">
                  <h2
                    className={`p-1 ${share === "all" && "bg-black text-white"
                      } rounded-full px-6 cursor-pointer border-2 border-black`}
                    onClick={() => setShare("all")}
                  >
                    All
                  </h2>
                  <h2
                    className={`p-1 ${share === "individual" && "bg-black text-white"
                      } rounded-full px-4 cursor-pointer border-2 border-black`}
                    onClick={() => setShare("individual")}
                  >
                    Individuals
                  </h2>
                  <h2
                    className={`p-1 ${share === "groups" && "bg-black text-white"
                      } rounded-full px-4 cursor-pointer border-2 border-black`}
                    onClick={() => setShare("groups")}
                  >
                    Groups
                  </h2>
                </div>
                {share === "individual" && (
                  <div className="flex flex-col gap-2 mt-2 w-full">
                    {/* First Row: Unit Select, Ownership Select, and Filter Button */}
                    <div className="flex gap-2 items-end">
                      {/* Unit Select Dropdown */}
                      <select
                        className="border p-3 border-gray-300 rounded-md flex-1"
                        value={selectedUnit || ""}
                        onChange={(e) =>
                          setSelectedUnit(Number(e.target.value))
                        }
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
                        style={{ background: themeColor }}
                        onClick={handleFilter}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        Filter
                      </button>
                    </div>
                    <div className="w-full mt-3 mb-3">
                      <Select
                        options={filteredMembers.map((member) => ({
                          value: member.id,
                          label: member.name,
                        }))}
                        className="w-full"
                        isMulti // Enables multi-select functionality
                        title="Select Members"
                        value={selectedMembers} // This should be the selected state
                        onChange={handleSelectEdit} // Correct event handler
                        placeholder="Select Members"
                      />
                    </div>
                  </div>
                )}
                {share === "groups" && (
                  <div className="flex flex-col gap-2 mt-2 w-full">
                    <label htmlFor="groupSelect" className="font-medium mb-1">
                      Select Group
                    </label>
                    <select
                      id="groupSelect"
                      className="border p-3 border-gray-300 rounded-md"
                      value={selectedGroup}
                      onChange={handleGroupChange}
                    >
                      <option value="">Select Group</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.group_name}
                        </option>
                      ))}
                    </select>

                    {/* Display group members as per group selection */}
                    {selectedGroup && (
                      <div className="mt-4 p-4 border rounded-md bg-gray-50">
                        <h2 className="text-lg font-semibold mb-2">
                          Group Members
                        </h2>

                        {groupMembers.length > 0 ? (
                          <div className="space-y-2">
                            {groupMembers.map((member, index) => (
                              <div
                                key={index}
                                className="p-2 border rounded bg-white shadow-sm"
                              >
                                {member.user_name}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">
                            No members exist inside this group.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4 mt-2">
              <h2 className="border-b text-xl border-black font-semibold">
                RSVP
              </h2>
              <div className="flex gap-4 mt-2">
                <div className="flex gap-2 ">
                  <input
                    type="radio"
                    name="RSVP"
                    id="yes"
                    checked={formData.rsvp_enabled === true}
                    onChange={() =>
                      setFormData({ ...formData, rsvp_enabled: true })
                    }
                  />
                  <label htmlFor="yes" className="text-lg">
                    Yes
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="RSVP"
                    id="no"
                    checked={formData.rsvp_enabled === false}
                    onChange={() =>
                      setFormData({ ...formData, rsvp_enabled: false })
                    }
                  />
                  <label htmlFor="no" className="text-lg">
                    No
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h2 className="border-b text-xl border-black my-5 font-semibold">
                Upload Attachments
              </h2>
              <FileInputBox
                fieldName={"event_images"}
                handleChange={handleFileAttachment} // Ensuring it calls the correct handler
                fileType="image/*"
              />
            </div>
            <div className="flex justify-center mt-10 my-5">
              <button
                className={`${submitting ? "bg-gray-400" : "bg-gray-900 hover:bg-gray-700"
                  } text-white p-2 px-4 rounded-md flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-400`}
                onClick={handleCreateEvent}
                disabled={submitting}
              >
                <FaCheck /> {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateEvent;
