import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { useDispatch } from "react-redux";
import { addGroup } from "../../features/group/groupSlice";
import { postAssetGroups } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";

const AssetGroupModal = ({ onclose }) => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [groupFor, setGroupFor] = useState("asset");
  const companyId = getItemInLocalStorage("COMPANYID");
  const dispatch = useDispatch();
  const createGroup = async () => {
    try {
      const addGroup = await postAssetGroups({
        name: groupName,
        description: description,
        company_id: companyId,
        group_for: "asset",
      });
      console.log(addGroup);
      onclose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const createStockGroup = async () => {
    try {
      const addStockGroup = await postAssetGroups({
        name: groupName,
        description: description,
        company_id: companyId,
        group_for: "item",
      });
      console.log(addStockGroup);
      onclose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(groupName);
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col gap-4 z-10">
        <h1 className="font-semibold text-center text-xl">Create Group</h1>
        <div className="grid grid-cols-2 items-center">
          <p className="font-semibold">For :</p>
          <div className="flex gap-5">
            <p
              className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer transition-all duration-300 ${
                groupFor === "asset" && "bg-black text-white"
              }`}
              onClick={() => setGroupFor("asset")}
            >
              Asset
            </p>
            <p
              className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer transition-all duration-300 ${
                groupFor === "stock" && "bg-black text-white"
              }`}
              onClick={() => setGroupFor("stock")}
            >
              Stocks
            </p>
          </div>
        </div>
        {groupFor === "asset" ? (
          <div>
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
                onClick={createGroup}
              >
                Create
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-sm font-bold">
                Stock Group Name :
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
            <div className="flex flex-col gap-2">
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
                onClick={createStockGroup}
              >
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

export default AssetGroupModal;
