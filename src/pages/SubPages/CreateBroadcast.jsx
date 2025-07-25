import React, { useEffect, useRef, useState } from "react";
import FileInput from "../../Buttons/FileInput";
import { useSelector } from "react-redux";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import {
  getAllUnits,
  getAssignedTo,
  getBroadCast,
  getBuildings,
  getGroups,
  getSetupUsers,
  postBroadCast,
  postGroups,
} from "../../api";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FaCheck } from "react-icons/fa";
import ReactQuill from "react-quill";
const CreateBroadcast = () => {
  const [share, setShare] = useState("all");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const themeColor = useSelector((state) => state.theme.color);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const siteId = getItemInLocalStorage("SITEID");
  const currentUser = getItemInLocalStorage("UserId");
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedOwnership, setSelectedOwnership] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    site_id: siteId,
    notice_title: "",
    notice_discription: "",
    expiry_date: "",
    user_ids: "",
    notice_image: [],
    shared: "",
    group_id: "",
    group_name: "",
    important: "",
    send_email: "",
    group_member: [],
  });
  console.log(formData);
  const datePickerRef = useRef(null);
  const currentDate = new Date();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExpiryDateChange = (date) => {
    setFormData({ ...formData, expiry_date: date });
  };
  const handleSelectEdit = (option) => {
    if (selectedMembers.includes(option)) {
      setSelectedMembers(selectedMembers.filter((item) => item !== option));
    } else {
      setSelectedMembers([...selectedMembers, option]);
    }
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
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };

    // Fetch groups when 'share' is set to 'groups'
    if (share === "groups") {
      fetchGroups();
    }

    fetchUsers();
  }, [share]);

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
    toast.success("Filter applied");
  };

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
    const groupId = parseInt(event.target.value, 10) || 0;
    const selectedGroupObj = groups.find((group) => group.id === groupId);

    setSelectedGroup(event.target.value);
    setFormData({ ...formData, group_id: groupId });

    // Set members directly from selected group object
    setGroupMembers(selectedGroupObj?.group_members || []);
  };


  const handleShareChange = (shareType) => {
    setShare(shareType); // Update the share state

    // Update formData based on the selected share type
    setFormData((prevFormData) => ({
      ...prevFormData,
      shared: shareType === "all" ? "all" : "", // Set "all" for shared if "all" is selected
      group_id: shareType === "groups" ? prevFormData.group_id : "", // Clear group_id unless "groups" is selected
      user_ids: shareType === "individual" ? prevFormData.user_ids : "", // Clear user_ids unless "individual" is selected
    }));
  };

  const navigate = useNavigate();

  // const handleSelectChange = (selectedOptions) => {
  //   const selectedIds = selectedOptions
  //     ? selectedOptions.map((option) => option.value)
  //     : [];
  //   const userIdsString = selectedIds.join(",");
  //   setFormData({ ...formData, user_ids: userIdsString });
  // };

  const handleSelectChange = (selectedOptions) => {
    setSelectedMembers(selectedOptions);
    const selectedIds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    const userIdsString = selectedIds.join(",");
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_ids: userIdsString,
    }));
  };

  const handleCreateBroadCast = async () => {
    if (formData.notice_title === "" || formData.expiry_date === "") {
      return toast.error("Please Enter Title & Expiry Date");
    }
    try {
      toast.loading("Creating Broadcast Please Wait!");
      const formDataSend = new FormData();

      // Common fields
      formDataSend.append("notice[created_by_id]", currentUser);
      formDataSend.append("notice[site_id]", formData.site_id);
      formDataSend.append("notice[notice_title]", formData.notice_title);
      formDataSend.append("notice[important]", formData.important);
      formDataSend.append("notice[send_email]", formData.send_email);
      formDataSend.append(
        "notice[notice_discription]",
        formData.notice_discription
      );
      formDataSend.append("notice[expiry_date]", formData.expiry_date);
      if (share === "all") {
        const allUserIds = users.map((user) => user.value).join(",");
        formDataSend.append("notice[shared]", "all");
        formDataSend.append("notice[user_ids]", allUserIds);
      } else if (share === "individual") {
        formDataSend.append("notice[shared]", "individual");
        formDataSend.append("notice[user_ids]", formData.user_ids);
      } else if (share === "groups") {
        formDataSend.append("notice[shared]", "groups");
        formDataSend.append("notice[group_id]", formData.group_id);
        formDataSend.append("notice[group_name]", formData.group_name);
      }

      // Attach files
      formData.notice_image.forEach((file) => {
        formDataSend.append("attachfiles[]", file);
      });

      const response = await postBroadCast(formDataSend);
      toast.success("Broadcast Created Successfully");
      navigate("/communication/broadcast");
      console.log("Response:", response.data);
      toast.dismiss();
    } catch (error) {
      console.error("Error creating broadcast:", error);
      toast.dismiss();
    }
  };

  const handleFileChange = (files, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: files,
    });
  };

  const handlePreview = () => {
    // before preview you can add validations if needed
    setShowPreview(true);
  };

  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-green-600 text-white p-4 text-center">
                <h1>You're Invited!</h1>
              </div>
              <div className="p-5">
                <h2 className="text-2xl text-green-600">
                  {formData.notice_title}
                </h2>
                <p>
                  <strong>Description:</strong>
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: formData.notice_discription,
                  }}
                  className="text-gray-700"
                ></div>
                <p className="mt-4">
                  <strong>Expiry Date:</strong>{" "}
                  {new Date(formData.expiry_date).toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-100 text-center text-sm text-gray-600 py-2">
                &copy; 2025 MyCiti.life. All rights reserved.
              </div>
            </div>

            <div className="flex justify-end mt-5 gap-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setShowPreview(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-800 text-white rounded"
                onClick={handleCreateBroadCast}
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-center">
          <div className="md:mx-20 my-5 mb-10 md:border p-2 md:px-2 rounded-lg w-full">
            <h2
              style={{ background: "rgb(19 27 38)" }}
              className="text-center text-xl font-bold p-2 mb-2  rounded-md text-white"
            >
              Create Broadcast
            </h2>
            <h2 className="border-b text-xl border-gray-400 mb-6 font-medium">
              Communication Info
            </h2>
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Title :
                </label>
                <input
                  type="text"
                  name="notice_title"
                  value={formData.notice_title}
                  onChange={handleChange}
                  placeholder="Enter Title"
                  id=""
                  className="border p-2 rounded-md border-gray-400 placeholder:text-sm"
                />
              </div>
              <div className="flex flex-col gap-2 my-2">
                <label htmlFor="" className="font-medium">
                  Description:
                </label>
                <ReactQuill
                  theme="snow"
                  value={formData.notice_discription}
                  onChange={(value) =>
                    setFormData({ ...formData, notice_discription: value })
                  }
                  placeholder="Enter Description"
                  className="bg-white"
                  style={{ minHeight: "120px", minWidth: "120px" }}
                />
              </div>
              {/* <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Description :
                </label>
                <textarea
                  name="notice_discription"
                  value={formData.notice_discription}
                  onChange={handleChange}
                  id=""
                  placeholder="Enter Description"
                  rows="3"
                  className="border p-2 rounded-md border-gray-400 placeholder:text-sm"
                />
              </div> */}
              <div className="grid grid-cols-2 items-end gap-4">
                {/* <div className="flex justify-between  flex-col gap-2"> */}
                <div className="flex flex-col">
                  <p className="font-medium">Expire on</p>
                  <ReactDatePicker
                    selected={formData.expiry_date}
                    onChange={handleExpiryDateChange}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy h:mm aa"
                    placeholderText="Select Date & Time"
                    ref={datePickerRef}
                    minDate={currentDate}
                    className="border border-gray-400 w-full p-2 rounded-md"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name=""
                    id="imp"
                    checked={formData.important === true}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        important: !formData.important,
                      })
                    }
                  />
                  <label htmlFor="imp">Mark as Important</label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name=""
                    id="imp"
                    checked={formData.send_email === true}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        send_email: !formData.send_email,
                      })
                    }
                  />
                  <label htmlFor="imp">Send Email</label>
                </div>
              </div>

              {/* <div className="flex flex-col items-center justify-center"> */}

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
                          title="Select Members"
                          onChange={handleSelectChange}
                          value={selectedMembers}
                          isMulti
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
              {/* </div> */}
              <div className="my-5">
                <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
                  Attachments
                </h2>

                <FileInputBox
                  fieldName={"notice_image"}
                  isMulti={true}
                  handleChange={(files) =>
                    handleFileChange(files, "notice_image")
                  }
                />
              </div>
              {/* </div> */}
              {/* <div className="flex justify-center mt-10 my-5">
                <button
                  style={{ background: themeColor }}
                  onClick={handleCreateBroadCast}
                  className="px-4 text-white p-2 rounded-md  flex items-center gap-2"
                >
                  <FaCheck /> Submit
                </button>
              </div> */}
              <div className="flex justify-center mt-10 my-5">
                <button
                  style={{ background: themeColor }}
                  onClick={handlePreview}
                  className="px-4 text-white p-2 rounded-md flex items-center gap-2"
                >
                  <FaCheck /> Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateBroadcast;
