import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import {
  getAssignedTo,
  getBuildings,
  getGroups,
  getSetupUsers,
  getBroadcastDetails,
  editBroadcastDetails,
} from "../../api";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FaCheck } from "react-icons/fa";
import ReactQuill from "react-quill";
import { MdClose } from "react-icons/md";

const EditBroadcast = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const themeColor = useSelector((state) => state.theme.color);
  const siteId = getItemInLocalStorage("SITEID");
  const currentUser = getItemInLocalStorage("UserId");

  const [share, setShare] = useState("all");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
const [selectedUnits, setSelectedUnits] = useState([]);
  const [selectedOwnership, setSelectedOwnership] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const datePickerRef = useRef(null);
  const currentDate = new Date();

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
    important: false,
    send_email: false,
  });

  // ---------------- FETCH INITIAL DATA ----------------

  useEffect(() => {
    fetchUsers();
    fetchUnitsAndMembers();
    fetchGroups();
  }, []);

  useEffect(() => {
    if (users.length > 0 && groups.length > 0) {
      fetchBroadcastDetails();
    }
  }, [users, groups]);

  const fetchUsers = async () => {
    const res = await getAssignedTo();
    const transformed = res.data.map((user) => ({
      value: user.id,
      label: `${user.firstname} ${user.lastname}`,
    }));
    setUsers(transformed);
  };

  const fetchUnitsAndMembers = async () => {
    const usersRes = await getSetupUsers();
    const unitsRes = await getBuildings();
    setUnits(unitsRes.data);

    const employeesList = usersRes.data.map((emp) => ({
      id: emp.id,
      name: `${emp.firstname} ${emp.lastname}`,
      building_id: emp.building_id || emp.building?.id || null,
      userSites: emp.user_sites || [],
    }));

    setMembers(employeesList);
    setFilteredMembers(employeesList);
  };

  const fetchGroups = async () => {
    const res = await getGroups();
    setGroups(res.data || []);
  };

  const fetchBroadcastDetails = async () => {
    try {
      const res = await getBroadcastDetails(id);
      const data = res.data;

      setFormData((prev) => ({
        ...prev,
        notice_title: data.notice_title || "",
        notice_discription: data.notice_discription || "",
        expiry_date: data.expiry_date ? new Date(data.expiry_date) : "",
        user_ids: data.users ? data.users.map((u) => u.user_id).join(",") : "",
        shared: data.shared || "all",
        group_id: data.group_id || "",
        group_name: data.group_name || "",
        important: data.important || false,
        send_email: data.send_email || false,
      }));

      setShare(data.shared || "all");

      // ✅ INDIVIDUAL FIX
      if (data.shared === "individual" && data.users) {
        const selected = data.users.map(u => ({
  value: u.user_id,
  label: u.name
}))

        setSelectedMembers(selected);
          setFilteredMembers(members);
      }

      // ✅ GROUP FIX
      if (data.shared === "groups") {
        const groupId = Number(data.group_id);
        setSelectedGroup(groupId);

        const groupObj = groups.find((g) => Number(g.id) === groupId);

        setGroupMembers(groupObj?.group_members || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- FILTER ----------------

  const handleFilter = () => {
  const filtered = members.filter((member) => {
    const buildingMatch =
      selectedUnits.length === 0 ||
      selectedUnits.some(
        (unit) => Number(member.building_id) === Number(unit.value)
      );

    const ownershipMatch =
      !selectedOwnership ||
      member.userSites.some(
        (site) =>
          site.ownership?.toLowerCase() ===
          selectedOwnership.toLowerCase()
      );

    return buildingMatch && ownershipMatch;
  });

  setFilteredMembers(filtered);
  toast.success("Filter applied");
};

  // ---------------- SELECT USERS ----------------

  const handleSelectChange = (selectedOptions) => {
    setSelectedMembers(selectedOptions);
    const ids = selectedOptions.map((opt) => opt.value).join(",");
    setFormData((prev) => ({ ...prev, user_ids: ids }));
  };

  const handleGroupChange = (e) => {
    const groupId = parseInt(e.target.value, 10);
    const groupObj = groups.find((g) => g.id === groupId);

    setSelectedGroup(groupId);
    setGroupMembers(groupObj?.group_members || []);

    setFormData((prev) => ({
      ...prev,
      group_id: groupId,
      group_name: groupObj?.group_name || "",
    }));
  };

  const handleFileChange = (files) => {
    setFormData((prev) => ({ ...prev, notice_image: files }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExpiryDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      expiry_date: date,
    }));
  };

  // ---------------- UPDATE BROADCAST ----------------

  const handleUpdateBroadcast = async () => {
    if (!formData.notice_title || !formData.expiry_date) {
      return toast.error("Please Enter Title & Expiry Date");
    }

    try {
      setSubmitting(true);
      toast.loading("Updating Broadcast...");

      const formDataSend = new FormData();

      formDataSend.append("notice[created_by_id]", currentUser);
      formDataSend.append("notice[site_id]", formData.site_id);
      formDataSend.append("notice[notice_title]", formData.notice_title);
      formDataSend.append("notice[important]", formData.important);
      formDataSend.append("notice[send_email]", formData.send_email);
      formDataSend.append(
        "notice[notice_discription]",
        formData.notice_discription,
      );
      formDataSend.append("notice[expiry_date]", formData.expiry_date);

      if (share === "all") {
        formDataSend.append("notice[shared]", "all");
      } else if (share === "individual") {
        formDataSend.append("notice[shared]", "individual");
        formDataSend.append("notice[user_ids]", formData.user_ids);
      } else if (share === "groups") {
        formDataSend.append("notice[shared]", "groups");
        formDataSend.append("notice[group_id]", formData.group_id);
        formDataSend.append("notice[group_name]", formData.group_name);
      }

      formData.notice_image.forEach((file) => {
        formDataSend.append("attachfiles[]", file);
      });

      await editBroadcastDetails(id, formDataSend);

      toast.dismiss();
      toast.success("Broadcast Updated Successfully");
      navigate("/communication/broadcast");
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------- UI (Same as Create Page) ----------------
  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-center">
          <div className="md:mx-20 my-5 mb-10 md:border md:p-2 md:px-2 rounded-lg w-full">
            <h2
              // style={{ background: themeColor }}
              className="text-center text-xl font-bold p-2 mb-2  rounded-md text-white bg-black"
            >
              Edit Broadcast
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
              <div className="flex flex-col">
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
              </div>
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
                    // minDate={currentDate}
                    className="border border-gray-400 w-full p-2 rounded-md"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="imp"
                    checked={formData.important}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        important: !prev.important,
                      }))
                    }
                  />
                  <label htmlFor="imp">Mark as Important</label>
                </div>
              </div>

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
                  <div className="my-2 flex w-full">
                    {share === "individual" && (
                      <div className="flex flex-col gap-2 mt-2 w-full">
                        {/* First Row: Unit Select, Ownership Select, and Filter Button */}
                        <div className="flex gap-2 items-end">
                          {/* Unit Select Dropdown */}
                         <Select
  options={units.map((unit) => ({
    value: unit.id,
    label: unit.name,
  }))}
  isMulti
  placeholder="Select Towers"
  className="flex-1"
  value={selectedUnits}
  onChange={(selectedOptions) =>
    setSelectedUnits(selectedOptions || [])
  }
/>

                          {/* Ownership Select Dropdown */}
                          <select
                            className="border p-3 border-gray-300 rounded-md flex-1"
                            value={selectedOwnership}
                            onChange={(e) =>
                              setSelectedOwnership(e.target.value)
                            }
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
                        <label
                          htmlFor="groupSelect"
                          className="font-medium mb-1"
                        >
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
              </div>
              <div className="flex justify-end mt-10 my-5 gap-3">
                <button
                  className="bg-gray-400 text-white p-2 px-4 rounded-md flex items-center gap-2 transition-colors duration-200"
                  onClick={() => navigate("/communication/broadcast")}
                >
                  <MdClose className="text-xl" /> Cancel
                </button>
                <button
                  onClick={handleUpdateBroadcast}
                  className="px-4 text-white p-2 rounded-md  flex items-center gap-2 bg-gray-950"
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

export default EditBroadcast;
