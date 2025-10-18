import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  getSiteAsset,
  getAssetGroups,
  getAssetSubGroups,
  UpdateMasters,
  getMastersDetails,
} from "../../api";
import { useParams } from "react-router-dom";
import { getHsns } from "../../api";

const EditMasters = () => {
  const { id } = useParams();
  const [assets, setAssets] = useState([]);
  const [InventoryType, setInventoryType] = useState("spares");
  const handleInventoryTypeChange = (e) => {
    setInventoryType(e.target.value);
  };
  const [criticalvalue, setcriticalvalue] = useState("critical");
  const handleCriticalChange = (e) => {
    setcriticalvalue(e.target.value);
  };
  const siteId = getItemInLocalStorage("SITEID");

  useEffect(() => {
    const fetchAssetsList = async () => {
      // getting all the services
      const assetListResp = await getSiteAsset();
      const asset = assetListResp.data.site_assets;
      console.log(assetListResp);
      const assetList = asset.map((a) => ({
        value: a.id,
        label: a.name,
      }));
      setAssets(assetList);
    };
    fetchAssetsList();
  }, [id]);
  const [assetGroups, setAssetGroup] = useState([]);
  const [assetSubGoups, setAssetSubGroups] = useState([]);
  const [hsnList, setHsnList] = useState([]);
  useEffect(() => {
    const fetchAssetGroups = async () => {
      const assetGroupResponse = await getAssetGroups();
      setAssetGroup(assetGroupResponse.data);
      // pass grp id in fn
      // fetchParentAsset(assetGroupResponse.data.asset_group_id_eq);
      // console.log(assetGroupResponse)
    };

    fetchAssetGroups();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    inventory_type: "",
    site_id: "",
    criticality: "",
    asset_group_id: "",
    asset_sub_group_id: "",
    asset_id: "",
    code: "",
    serial_number: "",
    quantity: "",
    min_stock_level: "",
    min_order_level: "",
    cgst_rate: "",
    sgst_rate: "",
    igst_rate: "",
    active: true,
    hsn_id: "",
    expiry_date: "",
    unit: "",
    cost: "",
    category: "",
  });
  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // Return date in yyyy-mm-dd format
  };
  useEffect(() => {
    const loadSubGroups = async (groupId) => {
      try {
        const subGroupResponse = await getAssetSubGroups(groupId);
        setAssetSubGroups(
          subGroupResponse.map((item) => ({ name: item.name, id: item.id }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    const fetcMasterDetails = async () => {
      try {
        const MastersDetailsResponse = await getMastersDetails(id);
        const data = MastersDetailsResponse.data;
        console.log(data);
        // Set radio states based on numeric or string values
        if (data.inventory_type !== undefined && data.inventory_type !== null) {
          setInventoryType(
            String(data.inventory_type) === "1" || data.inventory_type === 1
              ? "spares"
              : "consumable"
          );
        }
        if (data.criticality !== undefined && data.criticality !== null) {
          setcriticalvalue(
            String(data.criticality) === "1" || data.criticality === 1
              ? "critical"
              : "noncritical"
          );
        }

        setFormData((prev) => ({
          ...prev,
          name: data.name || "",
          code: data.code || "",
          serial_number: data.serial_number || "",
          quantity: data.quantity || "",
          min_stock_level: data.min_stock_level || "",
          min_order_level: data.min_order_level || "",
          cgst_rate: data.cgst_rate ?? "",
          sgst_rate: data.sgst_rate ?? "",
          expiry_date: data.expiry_date ? dateFormat(data.expiry_date) : "",
          igst_rate: data.igst_rate ?? "",
          unit: data.unit || "",
          cost: data.cost || "",
          hsn_id: data.hsn_id || "",
          site_id: data.site_id || "",
          asset_id: data.asset_id || "",
          asset_group_id: data.asset_group_id || "",
          asset_sub_group_id: data.asset_sub_group_id || "",
          category: data.category || "",
        }));

        if (data.asset_group_id) {
          await loadSubGroups(data.asset_group_id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetcMasterDetails();
  }, [id]);

  // Load HSN list for dropdown
  useEffect(() => {
    const loadHsns = async () => {
      try {
        const res = await getHsns(1, 100);
        const payload = res?.data || {};
        const rows = Array.isArray(payload) ? payload : payload?.hsns || [];
        setHsnList(rows);
      } catch (error) {
        console.log("Failed to fetch HSNs", error);
      }
    };
    loadHsns();
  }, []);
  const handleChange = async (e) => {
    const loadSubGroups = async (groupId) => {
      try {
        const subGroupResponse = await getAssetSubGroups(groupId);
        setAssetSubGroups(
          subGroupResponse.map((item) => ({ name: item.name, id: item.id }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (e.target.type === "select-one" && e.target.name === "asset_group_id") {
      const groupId = Number(e.target.value);
      await loadSubGroups(groupId);
      setFormData({
        ...formData,
        asset_group_id: groupId,
        asset_sub_group_id: "",
      });
    } else if (e.target.type === "select-one" && e.target.name === "hsn_id") {
      const selectedId = e.target.value ? Number(e.target.value) : "";
      const selected = hsnList.find((h) => String(h.id) === String(selectedId));
      const sanitizeRate = (val) => {
        if (val === null || val === undefined) return "";
        const match = String(val).match(/[-+]?[0-9]*\.?[0-9]+/);
        return match ? match[0] : String(val);
      };
      setFormData({
        ...formData,
        hsn_id: selectedId,
        sgst_rate: sanitizeRate(selected?.sgst_rate),
        cgst_rate: sanitizeRate(selected?.cgst_rate),
        igst_rate: sanitizeRate(selected?.igst_rate),
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const navigate = useNavigate();
  const handleMasters = async () => {
    const sendData = new FormData();
    sendData.append("inventory[name]", formData.name);
    sendData.append(
      "inventory[inventory_type]",
      InventoryType === "spares" ? 1 : 2
    );
    sendData.append("inventory[site_id]", siteId);
    sendData.append(
      "inventory[criticality]",
      criticalvalue === "critical" ? 1 : 2
    );
    sendData.append("inventory[asset_group_id]", formData.asset_group_id);
    sendData.append(
      "inventory[asset_sub_group_id]",
      formData.asset_sub_group_id
    );
    sendData.append("inventory[asset_id]", formData.asset_id);
    sendData.append("inventory[code]", formData.code);
    sendData.append("inventory[serial_number]", formData.serial_number);
    sendData.append("inventory[quantity]", formData.quantity);
    sendData.append("inventory[min_stock_level]", formData.min_stock_level);
    sendData.append("inventory[min_order_level]", formData.min_order_level);
    sendData.append("inventory[cgst_rate]", formData.cgst_rate);
    sendData.append("inventory[sgst_rate]", formData.sgst_rate);
    sendData.append("inventory[igst_rate]", formData.igst_rate);
    sendData.append("inventory[hsn_id]", formData.hsn_id);
    sendData.append("inventory[expiry_date]", formData.expiry_date);
    sendData.append("inventory[unit]", formData.unit);
    sendData.append("inventory[cost]", formData.cost);

    try {
      const mastersResp = await UpdateMasters(sendData, id);
      toast.success("Masters Updated Successfully");
      navigate("/assets/stock-items");
      console.log("Master  Response", mastersResp);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex ">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <div className="md:mx-10 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
          <h2
            className="text-center md:text-xl font-bold p-2 rounded-md text-white"
            style={{ background: "rgb(3 19 35)" }}
          >
            Edit Masters
          </h2>

          <div className="flex sm:flex-row flex-col justify-around items-center mt-4">
            <div className="w-full">
              <h2 className="border-b-2 border-black text font-medium mb-2">
                Basic Info
              </h2>
              <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-4 w-full">
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Inventory Type:
                  </label>
                  <div className="flex gap-4">
                    <div>
                      <input
                        type="radio"
                        id="spares"
                        name="InventoryType"
                        value="spares"
                        checked={InventoryType === "spares"}
                        onChange={handleInventoryTypeChange}
                        className="mr-2"
                      />
                      <label htmlFor="spares">Spares</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="consumable"
                        name="InventoryType"
                        value="consumable"
                        checked={InventoryType === "consumable"}
                        onChange={handleInventoryTypeChange}
                        className="mr-2"
                      />
                      <label htmlFor="consumable">Consumable</label>
                    </div>
                  </div>
                </div>

                {/* Criticality */}
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Criticality:
                  </label>
                  <div className="flex gap-4">
                    <div>
                      <input
                        type="radio"
                        id="critical"
                        name="criticality"
                        value="critical"
                        checked={criticalvalue === "critical"}
                        onChange={handleCriticalChange}
                        className="mr-2"
                      />
                      <label htmlFor="critical">Critical</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="nonCritical"
                        name="criticality"
                        value="noncritical"
                        checked={criticalvalue === "noncritical"}
                        onChange={handleCriticalChange}
                        className="mr-2"
                      />
                      <label htmlFor="nonCritical">Non Critical</label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Min.Order Level :
                  </label>
                  <input
                    type="text"
                    name="min_order_level"
                    id="min_order_level"
                    value={formData.min_order_level}
                    onChange={handleChange}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    placeholder="Enter Min.Order Level"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Select Unit :
                  </label>
                  <select
                    name="unit"
                    id="unit"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    value={formData.unit}
                    onChange={handleChange}
                  >
                    <option value="">Select Unit</option>
                    <option value="Ea">Ea</option>
                    <option value="Piece">Piece</option>
                    <option value="KG">KG</option>
                    <option value="Litre">Litre</option>
                    <option value="Box">Box</option>
                    <option value="Bottle">Bottle</option>
                    <option value="Packet">Packet</option>
                    <option value="Bag">Bag</option>
                    <option value="Qty">Qty</option>
                    <option value="Meter">Meter</option>
                    <option value="sq.Mtr">sq.Mtr</option>
                    <option value="cu.Mtr">cu.Mtr</option>
                    <option value="Feet">Feet</option>
                    <option value="sq.Ft">sq.Ft</option>
                    <option value="cu.Ft">cu.Ft</option>
                    <option value="Inches">Inches</option>
                    <option value="sq.Inches">sq.Inches</option>
                    <option value="Nos">Nos</option>
                    <option value="Pcs">Pcs</option>
                    <option value="Mm">Mm</option>
                    <option value="Size">Size</option>
                    <option value="Yards">Yards</option>
                    <option value="sq.Yards">sq.Yards</option>
                    <option value="Rs">Rs</option>
                    <option value="Kilometer">Kilometer</option>
                    <option value="Acre">Acre</option>
                    <option value="Miles">Miles</option>
                    <option value="Grams">Grams</option>
                    <option value="Brass">Brass</option>
                    <option value="Tonnes">Tonnes</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Expiry Date :
                  </label>
                  <input
                    type="date"
                    name="expiry_date"
                    id="expiry_date"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    value={formData.expiry_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Select Category :
                  </label>
                  <select
                    name="category"
                    id="category"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="Technical">Technical</option>
                    <option value="Non Technical">Non Technical</option>
                  </select>
                </div>
              </div>
              <h2 className="border-b-2 border-black text font-medium my-2">
                Tax Section
              </h2>
              <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-4 w-full">
                <div className="flex flex-col">
                  <label htmlFor="asset_id" className="font-semibold">
                    Asset Name:
                  </label>
                  <select
                    name="asset_id"
                    id="asset_id"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    value={formData.asset_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Asset Name</option>
                    {assets.map((asset) => (
                      <option value={asset.value} key={asset.value}>
                        {asset.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Name :
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Code :
                  </label>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    placeholder="Enter Code"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Serial Number :
                  </label>
                  <input
                    type="text"
                    name="serial_number"
                    id="serial_number"
                    value={formData.serial_number}
                    onChange={handleChange}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    placeholder="Enter Serial Number"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">Group </label>
                  <select
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    value={formData.asset_group_id}
                    onChange={handleChange}
                    name="asset_group_id"
                  >
                    <option value="">Select Group</option>
                    {assetGroups.map((assetGroup) => (
                      <option value={assetGroup.id} key={assetGroup.id}>
                        {assetGroup.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col ">
                  <label className="font-semibold">Subgroup</label>
                  <select
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    name="asset_sub_group_id"
                    value={formData.asset_sub_group_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Sub Group</option>
                    {assetSubGoups.map((subGroup) => (
                      <option value={subGroup.id} key={subGroup.id}>
                        {subGroup.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Quantity :
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    placeholder="Enter Quantity"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Min.Stock Level :
                  </label>
                  <input
                    type="text"
                    name="min_stock_level"
                    id="min_stock_level"
                    value={formData.min_stock_level}
                    onChange={handleChange}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    placeholder="Enter Min.Stock Level"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    SAC/HSN Code :
                  </label>
                  <select
                    name="hsn_id"
                    id="hsn_id"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    value={formData.hsn_id}
                    onChange={handleChange}
                  >
                    <option value="">Select SAC/HSN Code</option>
                    {hsnList.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.code} {h.category ? `- ${h.category}` : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Cost :
                  </label>
                  <input
                    type="text"
                    name="cost"
                    id="cost"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    placeholder="Enter Cost"
                    value={formData.cost}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    SGST Rate :
                  </label>
                  <input
                    type="text"
                    name="sgst_rate"
                    id="sgst_rate"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    placeholder="Enter SGST Rate"
                    value={formData.sgst_rate}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    CGST Rate :
                  </label>
                  <input
                    type="text"
                    name="cgst_rate"
                    id="cgst_rate"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    placeholder="Enter CGST Rate"
                    value={formData.cgst_rate}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    IGST Rate :
                  </label>
                  <input
                    type="text"
                    name="igst_rate"
                    id="igst_rate"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    placeholder="Enter IGST Rate"
                    value={formData.igst_rate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="sm:flex justify-center grid gap-2 my-5 ">
            <button
              className="bg-black text-white p-2 px-4 rounded-md font-medium"
              onClick={handleMasters}
            >
              Submit
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMasters;
