import React, { useEffect, useState } from "react";
import {
  getAssetSubGroups,
  getStockGroupsList,
  postInventory,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddInventory = () => {
  const siteId = getItemInLocalStorage("SITEID");
  const userId = getItemInLocalStorage("UserId");
  const [groupList, setGroupList] = useState([]);
  const [subGroupList, setSubGroupList] = useState([]);

  const [formData, setFormData] = useState({
    site_Id: siteId,
    name: "",
    rate: "",
    availableQuantity: "",
    groupId: "",
    subGroupId: "",
    description: "",
    createdBy: userId,
    minStock: "",
    maxStock: "",
  });
  console.log(formData);
  // const handleChange = async (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleChange = async (e) => {
    const fetchSubGroups = async (groupID) => {
      try {
        const subGroupResponse = await getAssetSubGroups(groupID);
        console.log(subGroupResponse);
        setSubGroupList(
          subGroupResponse.map((item) => ({
            name: item.name,
            id: item.id,
          }))
        );
        console.log(subGroupResponse);
      } catch (error) {
        console.log(error);
      }
    };

    if (e.target.type === "select-one" && e.target.name === "groupId") {
      const groupID = Number(e.target.value);
      console.log("groupId:" + groupID);
      await fetchSubGroups(groupID);

      setFormData({
        ...formData,
        groupId: groupID,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const navigate = useNavigate();
  const handleAddInventory = async () => {
    const dataToSend = new FormData();
    dataToSend.append("item[site_id]", formData.site_Id);
    dataToSend.append("item[name]", formData.name);
    dataToSend.append("item[description]", formData.description);
    dataToSend.append("item[rate]", formData.rate);
    dataToSend.append("item[available_quantity]", formData.availableQuantity);
    dataToSend.append("item[group_id]", formData.groupId);
    dataToSend.append("item[sub_group_id]", formData.subGroupId);
    dataToSend.append("item[created_by_id]", formData.createdBy);
    dataToSend.append("item[min_stock]", formData.minStock);
    dataToSend.append("item[max_stock]", formData.maxStock);
    try {
      toast.loading("Adding New Stock please wait...")
      const AddInvResp = await postInventory(dataToSend);
      console.log(AddInvResp);
      toast.dismiss()
      navigate("/assets/stock-items");
    } catch (error) {
      console.log(error);
      toast.dismiss()
    }
  };
  const themeColor = useSelector((state) => state.theme.color);
  useEffect(() => {
    const fetchStockGroup = async () => {
        try {
        const stockResp = await getStockGroupsList();
        console.log(stockResp.data);
        setGroupList(stockResp.data);
      
      } catch (error) {
        console.log(error);
      }
    }
      fetchStockGroup();
  }, []);
  console.log(groupList);

  return (
    <section>
      <div className="m-2">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold p-2 bg-black rounded-full text-white"
        >
          Add Stock
        </h2>
        <div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
          <div className="flex  flex-col justify-around">
            <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-2 w-full">
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Name :
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  placeholder="Enter Stock Name"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Rate :
                </label>
                <input
                  type="text"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  placeholder="Enter Rate"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Available Quantity :
                </label>
                <input
                  type="text"
                  name="availableQuantity"
                  onChange={handleChange}
                  value={formData.availableQuantity}
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  placeholder="Enter Quantity"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Group :
                </label>
                <select
                  name="groupId"
                  value={formData.groupId}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option>Select Group</option>
                  {groupList.map((group) => (
                    <option value={group.id} key={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Sub Group :
                </label>
                <select
                  name="subGroupId"
                  value={formData.subGroupId}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option>Select Sub Group</option>
                  {subGroupList.map((subGroup) => (
                    <option value={subGroup.id} key={subGroup.id}>
                      {subGroup.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Min Stock Level :
                </label>
                <input
                  type="text"
                  name="minStock"
                  onChange={handleChange}
                  value={formData.minStock}
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  placeholder="Enter Minimum Stock Level"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Max Stock Level :
                </label>
                <input
                  type="text"
                  name="maxStock"
                  onChange={handleChange}
                  value={formData.maxStock}
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  placeholder="Enter Maximum Stock Level"
                />
              </div>
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="" className="font-semibold">
                Description :
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                id=""
                cols="30"
                rows="3"
                className="border p-1 px-4 border-gray-500 rounded-md"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-black text-white p-2 px-4 rounded-md font-medium"
                onClick={handleAddInventory}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddInventory;
