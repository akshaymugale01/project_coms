import React, { useEffect, useState } from "react";
import { editAssetGroupsDetails, getAssetGroupsDetails } from "../../api";
import ModalWrapper from "./ModalWrapper";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const EditAssetGroup = ({ id, onclose }) => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const companyId = getItemInLocalStorage("COMPANYID");
  useEffect(() => {
    const fetchGroupDetails = async () => {
      const groupResp = await getAssetGroupsDetails(id);
      console.log(groupResp);
      setGroupName(groupResp.data.name);
      setDescription(groupResp.data.description);
    };
    fetchGroupDetails();
  }, []);
  const editGroup = async () => {
    const formData = new FormData();
    formData.append("asset_group[name]", groupName);
    formData.append("asset_group[company_id]", companyId);
    formData.append("asset_group[description]", description);
    formData.append("asset_group[group_for]", "asset");
    try {
      const editGroup = await editAssetGroupsDetails(id,{
        name: groupName,
        description: description,
        company_id: companyId,
        group_for: "asset",
      });
      console.log(editGroup);
      onclose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col gap-4 z-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-sm font-bold">
            Asset Group Name :
          </label>
          <input
            type="text"
            name="groupName"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter Group Name"
            className="border rounded-md border-gray-500 p-1 px-2"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="" className="text-sm font-bold mt-1">
            Description :
          </label>
          <textarea
            cols="50"
            rows="3"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            className="border rounded-md border-gray-500 p-1 px-2"
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-black p-1 px-4 text-white rounded-md my-2 hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
            onClick={editGroup}
          >
            Save
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditAssetGroup;
