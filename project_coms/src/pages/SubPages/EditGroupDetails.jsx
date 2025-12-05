import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import MultiSelect from "../AdminHrms/Components/MultiSelect";
import { editGroups, getGroupsDetails, getSetupUsers } from "../../api";

function EditGroupDetails({ onclose, fetchGroupDetails }) {
  const [formData, setFormData] = useState({
    groupName: "",
    groupDescription: "",
    attachment: null,
    members: [],
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [details, setDetails] = useState({});
  const themeColor = useSelector((state) => state.theme.color);

  const { id } = useParams();

  // Fetch group details on mount
  useEffect(() => {
    const fetchGroupDetailsData = async () => {
      try {
        const res = await getGroupsDetails(id);
        setFormData({
          groupName: res.data.group_name,
          groupDescription: res.data.group_description,
          attachment: res.data.attachment,
        });
        setPreviewImage(res.data.attachment); // Set the initial image preview

        const selectedMembers = res.data.group_members.map((member) => ({
          value: member.user_id,
          label: `${member.user_name}`,
        }));
        setSelectedOptions(selectedMembers.map((item) => item.value));
      } catch (error) {
        console.error("Failed to fetch group details:", error);
        toast.error("Unable to fetch group details.");
      }
    };
    fetchGroupDetailsData();
  }, [id]);

  // Fetch all members on mount
  useEffect(() => {
    const fetchAllMembers = async () => {
      try {
        const res = await getSetupUsers();
        const employeesList = res.data.map((emp) => ({
          value: emp.id,
          label: `${emp.firstname} ${emp.lastname}`,
        }));
        setMembers(employeesList);
        setFilteredMembers(employeesList);
      } catch (error) {
        console.error("Failed to fetch members:", error);
        toast.error("Unable to fetch members.");
      }
    };
    fetchAllMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Log to verify state update
    console.log(`Field ${name} updated to:`, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prevState) => ({
        ...prevState,
        attachment: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      console.log("File updated:", file.name);
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  // const handleSave = async () => {
  //   try {
  //     // Validation
  //     if (!formData.groupName.trim()) {
  //       toast.error("Group name is required");
  //       return;
  //     }

  //     // Create FormData object
  //     const formDataToSend = new FormData();

  //     // Match the exact format shown in the screenshot
  //     formDataToSend.append("group[group_name]", formData.groupName);
  //     formDataToSend.append(
  //       "group[group_description]",
  //       formData.groupDescription
  //     );
  //     formDataToSend.append("group[created_by_id]", "733"); // Assuming this is the logged-in user's ID

  //     // Handle member IDs - append each member ID separately
  //     if (selectedOptions && selectedOptions.length > 0) {
  //       selectedOptions.forEach((memberId, index) => {
  //         formDataToSend.append(`group[member_ids][]`, memberId.toString());
  //       });
  //     }

  //     // Handle file attachment
  //     if (formData.attachment instanceof File) {
  //       formDataToSend.append("attachment", formData.attachment);
  //     }

  //     // Log FormData for debugging
  //     for (let pair of formDataToSend.entries()) {
  //       console.log("FormData:", pair[0], pair[1]);
  //     }

  //     // Make the API call with proper headers
  //     const response = await editGroups(id, formDataToSend);
  //     console.log("API Response:", response);

  //     if (response?.status === 200) {
  //       toast.success("Group updated successfully!");
  //       await fetchGroupDetails();
  //       onclose();
  //     } else {
  //       throw new Error("Failed to update group");
  //     }
  //   } catch (error) {
  //     console.error("Save failed:", error);
  //     toast.error("Failed to update group. Please try again.");
  //   }
  // };

  const handleSave = async () => {
    try {
      if (!formData.groupName.trim()) {
        toast.error("Group name is required");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("group[group_name]", formData.groupName);
      formDataToSend.append(
        "group[group_description]",
        formData.groupDescription
      );
      formDataToSend.append("group[created_by_id]", "733");

      if (selectedOptions && selectedOptions.length > 0) {
        selectedOptions.forEach((memberId) => {
          formDataToSend.append(`group[member_ids][]`, memberId.toString());
        });
      }

      if (formData.attachment instanceof File) {
        formDataToSend.append("attachment", formData.attachment);
      }

      const response = await editGroups(id, formDataToSend);
      console.log("Full API Response:", response);
      console.log("Response Status:", response?.status);
      console.log("Response Data:", response?.data);

      if (response?.status === 200 || response?.data?.status === 200) {
        toast.success("Group updated successfully!");

        // Update UI instantly instead of re-fetching
        setDetails((prev) => ({
          ...prev,
          group_name: formData.groupName,
          group_description: formData.groupDescription,
          group_members: selectedOptions,
        }));

        console.log("Updated Details:", details);
        onclose();
      } else {
        console.error("API Response Error:", response); // Debug API response
        throw new Error("Failed to update group");
      }
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to update group. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="max-h-screen bg-white p-4 w-[40rem] rounded-xl shadow-lg overflow-y-auto">
        <h2 className="flex items-center justify-center gap-2 border-b font-medium text-xl p-2">
          <BiEditAlt size={20} /> Edit Group
        </h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col">
            <label className="font-medium">Group Name</label>
            <input
              type="text"
              name="groupName"
              placeholder="Group name"
              value={formData.groupName}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <MultiSelect
              options={members}
              title="Select Members"
              handleSelect={(option) => {
                if (selectedOptions.includes(option)) {
                  setSelectedOptions(
                    selectedOptions.filter((item) => item !== option)
                  );
                } else {
                  setSelectedOptions([...selectedOptions, option]);
                }
              }}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              setOptions={setMembers}
              searchOptions={filteredMembers}
              compTitle="Select Group Members"
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label className="font-medium">Description</label>
          <textarea
            type="text"
            name="groupDescription"
            rows="3"
            placeholder="Group description"
            value={formData.groupDescription}
            onChange={handleChange}
            className="border p-2 rounded-md"
          ></textarea>
        </div>
        <div className="flex flex-col mt-4">
          <label className="font-medium">Group Cover Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded-md"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded-full"
            />
          )}
        </div>
        <div className="flex justify-end items-center gap-4 mt-6">
          <button
            className="flex items-center gap-2 bg-red-400 text-white p-2 rounded-full"
            onClick={onclose}
          >
            <MdClose /> Close
          </button>
          <button
            className="flex items-center gap-2 bg-green-400 text-white p-2 rounded-full"
            onClick={handleSave}
          >
            <FaCheck /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditGroupDetails;
