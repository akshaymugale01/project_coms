import { useEffect, useState } from "react";
import { editInventory, getAssetSubGroups, getInventoryDetails, getAssetGroups } from "../../api";
import { useParams } from "react-router-dom";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const EditStocks = () => {
  const { id } = useParams();
  const [groupList, setGroupList] = useState([]);
  const [subGroupList, setSubGroupList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    rate: "",
    available_quantity: "",
    group_id: "",
    sub_group_id: "",
    description: "",
    min_stock: "",
    max_stock: "",
  });

  console.log(formData)

  useEffect(() => {
    const fetchStockDetails = async () => {
      const stockDetails = await getInventoryDetails(id);
      setFormData(stockDetails.data);
      console.log(stockDetails)
      fetchSubGroups(stockDetails.data.group_id);
    };
    const fetchSubGroups = async (groupId) => {
      try {
        const subGroupResponse = await getAssetSubGroups(groupId);
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
    fetchStockDetails();
  }, [id]);

  useEffect(() => {
    const fetchAssetGroups = async () => {
      try {
        const resp = await getAssetGroups();
        const payload = resp?.data;
        const rows = Array.isArray(payload)
          ? payload
          : payload?.data || payload?.asset_groups || [];
        setGroupList(rows);
      } catch (error) {
        console.log("Failed to fetch asset groups", error);
      }
    };
    fetchAssetGroups();
  }, []);



  const handleChange = async (e) => {
    const { name, value, type } = e.target;
    const loadSubGroups = async (groupID) => {
      try {
        const subGroupResponse = await getAssetSubGroups(groupID);
        const list = Array.isArray(subGroupResponse)
          ? subGroupResponse
          : subGroupResponse?.data || subGroupResponse?.sub_groups || [];
        setSubGroupList(list.map((item) => ({ name: item.name, id: item.id })));
      } catch (error) {
        console.log("Failed to fetch sub groups", error);
      }
    };

    if (type === "select-one" && name === "group_id") {
      const groupID = value ? Number(value) : "";
      setFormData((prev) => ({ ...prev, group_id: groupID, sub_group_id: "" }));
      setSubGroupList([]);
      if (groupID && !Number.isNaN(groupID)) {
        await loadSubGroups(groupID);
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const siteId = getItemInLocalStorage("SITEID");
  const userId = getItemInLocalStorage("UserId");
  const handleAddInventory = async () => {
    const dataToSend = new FormData();
    dataToSend.append("item[site_id]", siteId);
    dataToSend.append("item[name]", formData.name);
    dataToSend.append("item[description]", formData.description);
    dataToSend.append("item[rate]", formData.rate);
    dataToSend.append("item[available_quantity]", formData.available_quantity);
    dataToSend.append("item[group_id]", formData.group_id);
    dataToSend.append("item[sub_group_id]", formData.sub_group_id);
    dataToSend.append("item[created_by_id]", userId);
    dataToSend.append("item[min_stock]", formData.min_stock);
    dataToSend.append("item[max_stock]", formData.max_stock);
    try {
      const editInvResp = await editInventory(dataToSend, id);
      console.log(editInvResp);
      toast.success("Inventory Edited Successfully");
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <section>
      <div className="m-2">
        <h2 style={{background: 'rgb(3 19 35)'}} className="text-center text-xl font-bold p-2 rounded-full text-white">
          Edit Stock
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
                  value={formData.name}
                  onChange={handleChange}
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
                  name="available_quantity"
                  value={formData.available_quantity}
                  onChange={handleChange}
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
                  name="group_id"
                  value={formData.group_id}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Group</option>
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
                  name="sub_group_id"
                  value={formData.sub_group_id}
                  onChange={handleChange}
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  disabled={!formData.group_id}
                >
                  <option value="">Select Sub Group</option>
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
                  name="min_stock"
                  onChange={handleChange}
                  value={formData.min_stock}
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
                  name="max_stock"
                  onChange={handleChange}
                  value={formData.max_stock}
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

export default EditStocks;
