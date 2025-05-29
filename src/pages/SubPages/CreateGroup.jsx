import React, { useEffect, useState } from "react";
import image from "/profile.png";
import Select from "react-select";
import { useSelector } from "react-redux";
import { PiPlusCircle } from "react-icons/pi";
import MultiSelect from "../AdminHrms/Components/MultiSelect";
import { getMyHRMSEmployees, getSetupUsers, postGroups } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
function CreateGroup({ onclose }) {
  const [formData, setFormData] = useState({
    groupName: "",
    groupDescription: "",
    attachment:"",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    setFormData((prevFormData) => ({
      ...prevFormData,
      attachment: file,
    }));
  };

  const themeColor = useSelector((state) => state.theme.color);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectEdit = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  console.log(selectedOptions);

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
        console.log(error);
      }
    };
    fetchAllMembers();
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
    selectedOptions.forEach((member)=>{
      postData.append("group[member_ids][]", member);
    
    })
    if (formData.attachment) {
      postData.append("attachment", formData.attachment);
    }
    try {
      const res = await postGroups(postData);
      toast.success("Group created successfully")
      onclose()
      setFormData({
        groupName: "",
        groupDescription: "",
        attachment:"",
      });
  
      setSelectedOptions([]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
      <div className="max-h-screen bg-white p-2 w-[40rem] rounded-xl shadow-lg overflow-y-auto">
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
              <div className="flex flex-col mt-2 ">
                <MultiSelect
                  options={members}
                  title={"Select members"}
                  handleSelect={handleSelectEdit}
                  // handleSelectAll={handleSelectAll}
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
                accept="image/*"
                // value={formData.attachment}
                className="border p-2 border-gray-300 rounded-md"
                onChange={handleFileChange}
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
