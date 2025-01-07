import React, { useEffect, useState } from "react";
import Switch from "../../Buttons/Switch";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  getAssetGroups,
  getAssetSubGroups,
  getFloors,
  getGroups,
  getParentAsset,
  getUnits,
  getVendors,
  postSiteAsset,
} from "../../api";
import { BiCross, BiPlus } from "react-icons/bi";
import { IoAddCircle, IoAddCircleOutline, IoClose } from "react-icons/io5";
import AddSuppliers from "../../containers/modals/AddSuppliersModal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Selector from "../../containers/Selector";
import { initialAddAssetFormData } from "../../utils/initialFormData";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { IoMdClose } from "react-icons/io";

const AddAsset = () => {
  const buildings = getItemInLocalStorage("Building");
  const [meterType, setMeterType] = useState("");
  const [warranty, setWarranty] = useState(false);
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);
  const [addConsumptionFields, setAddConsumptionFields] = useState([{}]);
  const [addNonConsumptionFields, setAddNonConsumptionFields] = useState([{}]);
  const [addSupplierModal, showAddSupplierMOdal] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState(initialAddAssetFormData);
  const [assetGroups, setAssetGroup] = useState([]);
  const [assetSubGoups, setAssetSubGroups] = useState([]);
  const [parentAsset, setParentAsset] = useState([]);
  console.log(formData);
  const themeColor = useSelector((state) => state.theme.color);
  const fetchVendors = async () => {
    try {
      const vendorResp = await getVendors();
      setVendors(vendorResp.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchAssetGroups = async () => {
      const assetGroupResponse = await getGroups();
      
      const data = assetGroupResponse.data
      console.log("Groups", data);
      setAssetGroup(assetGroupResponse.data);
      // pass grp id in fn
      // fetchParentAsset(assetGroupResponse.data.asset_group_id_eq);
      // console.log(assetGroupResponse)
    };

    fetchVendors();
    fetchAssetGroups();
  }, []);

  const handleChange = async (e) => {
    async function fetchFloor(floorID) {
      console.log(floorID);
      try {
        const build = await getFloors(floorID);
        setFloors(build.data.map((item) => ({ name: item.name, id: item.id })));
      } catch (e) {
        console.log(e);
      }
    }

    async function getUnit(UnitID) {
      try {
        const unit = await getUnits(UnitID);
        setUnits(unit.data.map((item) => ({ name: item.name, id: item.id })));
        console.log(unit);
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSubGroups = async (groupId) => {
      try {
        const subGroupResponse = await getAssetSubGroups(groupId);
        console.log(subGroupResponse);
        setAssetSubGroups(
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

    const fetchParentAsset = async (grpID) => {
      const parentAssetResp = await getParentAsset(grpID);
      console.log(parentAssetResp.data.site_assets);
      setParentAsset(parentAssetResp.data.site_assets);
    };

    if (e.target.type === "select-one" && e.target.name === "building_id") {
      const BuildID = Number(e.target.value);
      await fetchFloor(BuildID);

      setFormData({
        ...formData,
        building_id: BuildID,
      });
    } else if (
      e.target.type === "select-one" &&
      e.target.name === "floor_name"
    ) {
      const UnitID = Number(e.target.value);
      await getUnit(UnitID);
      setFormData({
        ...formData,
        floor_id: UnitID,
      });
    } else if (
      e.target.type === "select-one" &&
      e.target.name === "asset_group_id"
    ) {
      const groupId = Number(e.target.value);
      console.log("groupId:" + groupId);
      const name = e.target.name
      console.log("groupNam:" + name);
      await fetchSubGroups(groupId);
      await fetchParentAsset(groupId);
      setFormData({
        ...formData,
        asset_group_id: groupId,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleConsumptionAddFields = () => {
    setAddConsumptionFields([...addConsumptionFields, {}]);
  };
  const handleRemoveConsumptionFields = (index) => {
    const newFields = [...addConsumptionFields];
    newFields.splice(index, 1);
    setAddConsumptionFields(newFields);
  };
  const handleNonConsumptionAddFields = () => {
    setAddNonConsumptionFields([...addNonConsumptionFields, {}]);
  };
  const handleRemoveNonConsumptionFields = (index) => {
    const newFields = [...addNonConsumptionFields];
    newFields.splice(index, 1);
    setAddNonConsumptionFields(newFields);
  };

  // const handleFileChange = (event, fieldName) => {
  //   const files = Array.from(event.target.files);
  //   setFormData({
  //     ...formData,
  //     [fieldName]: files,
  //   });
  // };

  const handleFileChange = (files, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // if (formData.warranty_start >= formData.warranty_expiry) {
    //   toast.error("Warranty Start Date must be before Expiry Date.");
    //   return;
    // }

    // if (formData.warranty_start < formData.purchased_on || formData.installation < formData.purchased_on) {
    //   toast.error(
    //     "Warranty Start Date and Commissioning Date must be after or equal to Purchase Date."
    //   );
    //   return;
    // }

    if (formData.building_id === "") {
      return toast.error("Please Select Building Name");
    }
    if (formData.name === "") {
      return toast.error("Please Enter Asset Name");
    }
    if (formData.oem_name === "") {
      return toast.error("Please Enter ORM Name");
    }
    if (formData.asset_number === "") {
      return toast.error("Please Enter Asset Number");
    }
    if (formData.equipment_id === "") {
      return toast.error("Please Enter Equipment Id");
    }
    if (formData.purchase_cost === "") {
      return toast.error("Please Enter Purchase Cost");
    }
    if (formData.asset_group_id === "") {
      return toast.error("Please Select Group");
    }
    if (formData.asset_sub_group_id === "") {
      return toast.error("Please Select Sub Group");
    }
    if (
      formData.warranty_start &&
      formData.warranty_expiry &&
      formData.warranty_start >= formData.warranty_expiry
    ) {
      toast.error("Warranty Start Date must be before Expiry Date.");
      return;
    }

    if (
      formData.warranty_start &&
      formData.purchased_on &&
      formData.warranty_start < formData.purchased_on
    ) {
      toast.error(
        "Warranty Start Date and Commissioning Date must be after or equal to Purchase Date."
      );
      return;
    }

    if (
      formData.installation &&
      formData.purchased_on &&
      formData.installation < formData.purchased_on
    ) {
      toast.error("Installation Date must be after or equal to Purchase Date.");
      return;
    }

    try {
      toast.loading("Creating Asset Please Wait!");
      const formDataSend = new FormData();

      formDataSend.append("site_asset[site_id]", formData.site_id);
      formDataSend.append("site_asset[building_id]", formData.building_id);
      formDataSend.append("site_asset[floor_id]", formData.floor_id);
      formDataSend.append("site_asset[unit_id]", formData.unit_id);
      formDataSend.append("site_asset[name]", formData.name);
      formDataSend.append("site_asset[oem_name]", formData.oem_name);
      formDataSend.append("site_asset[latitude]", formData.latitude);
      formDataSend.append("site_asset[longitude]", formData.longitude);
      formDataSend.append("site_asset[asset_number]", formData.asset_number);
      formDataSend.append("site_asset[equipemnt_id]", formData.equipment_id);
      formDataSend.append("site_asset[serial_number]", formData.serial_number);
      formDataSend.append("site_asset[model_number]", formData.model_number);
      formDataSend.append("site_asset[purchased_on]", formData.purchased_on);
      formDataSend.append("site_asset[purchase_cost]", formData.purchase_cost);
      formDataSend.append("site_asset[comprehensive]", formData.comprehensive);

      formDataSend.append(
        "site_asset[asset_group_id]",
        formData.asset_group_id
      );
      formDataSend.append(
        "site_asset[asset_sub_group_id]",
        formData.asset_sub_group_id
      );
      formDataSend.append(
        "site_asset[parent_asset_id]",
        formData.parent_asset_id
      );
      formDataSend.append("site_asset[installation]", formData.installation);
      formDataSend.append(
        "site_asset[warranty_expiry]",
        formData.warranty_expiry
      );
      // formDataSend.append("site_asset[user_id]", 2);
      formDataSend.append("site_asset[critical]", formData.critical);
      formDataSend.append("site_asset[capacity]", formData.capacity);
      formDataSend.append("site_asset[breakdown]", formData.breakdown);
      formDataSend.append("site_asset[is_meter]", formData.is_meter);
      formDataSend.append("site_asset[asset_type]", formData.asset_type);
      formDataSend.append("site_asset[vendor_id]", formData.vendor_id);
      consumptionData.forEach((item) => {
        formDataSend.append("asset_params[][name]", item.name);
        formDataSend.append("asset_params[][order]", item.order);
        formDataSend.append(
          "asset_params[][unit_type]",
          item.unit_type
        );
        formDataSend.append("asset_params[][digit]", item.digit);
        formDataSend.append(
          "asset_params[][alert_below]",
          item.alert_below
        );
        formDataSend.append(
          "asset_params[][alert_above]",
          item.alert_above
        );
        formDataSend.append(
          "asset_params[][min_val]",
          item.min_val
        );
        formDataSend.append(
          "asset_params[][max_val]",
          item.max_val
        );
        formDataSend.append(
          "asset_params[][multiplier_factor]",
          item.multiplier_factor
        );
        formDataSend.append(
          "asset_params[][dashboard_view]",
          item.dashboard_view
        );
        formDataSend.append(
          "asset_params[][consumption_view]",
          item.consumption_view
        );
        formDataSend.append(
          "asset_params[][check_prev]",
          item.check_prev
        );
      });

      formData.invoice.forEach((file, index) => {
        formDataSend.append(`purchase_invoices[]`, file);
      });
      formData.insurance.forEach((file, index) => {
        console.log("-----------------");
        console.log(index);
        console.log(file);
        formDataSend.append(`insurances[]`, file);
      });
      formData.manuals.forEach((file, index) => {
        formDataSend.append(`manuals[]`, file);
      });
      formData.others.forEach((file, index) => {
        formDataSend.append(`other_files[]`, file);
      });

      formDataSend.append("site_asset[uom]", formData.unit);
      formDataSend.append(
        "site_asset[warranty_start]",
        formData.warranty_start
      );
      // formDataSend.append("site_asset[installation]", formData.installation);
      // console.log(formDataSend);
      const response = await postSiteAsset(formDataSend);
      toast.success("Asset Created Successfully");
      console.log("Response:", response.data);
      toast.dismiss();
      navigate(`/assets/asset-details/${response.data.id}`);
      window.scrollTo(0, 0);
    } catch (error) {
      toast.dismiss();
      console.error("Error:", error);
    }
  };

  const [meterCategory, setMeterCategory] = useState("");

  const [subMeterCategory, setSubMeterCategory] = useState("");

  const handleMeterCategoryChange = (e) => {
    setMeterCategory(e.target.value);
  };
  const handleSubMeterCategoryChange = (e) => {
    setSubMeterCategory(e.target.value);
  };

  const [consumption, setConsumption] = useState("");
  const handleConsumptionChange = (e) => {
    setConsumption(e.target.value);
  };

  // Consumption
  const [consumptionData, setConsumptionData] = useState([]);

  const handleAddConsumption = () => {
    setConsumptionData((prev) => [
      ...prev,
      {
        name: "",
        order: "",
        unit_type: "",
        digit: "",
        alert_below: "",
        alert_above: "",
        min_val: "",
        max_val: "",
        multiplier_factor: "",
        dashboard_view: false,
        consumption_view: false,
        check_prev: false,
      },
    ]);
  };

  const handleRemoveConsumption = (index) => {
    setConsumptionData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAssetParamsChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    setConsumptionData((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [name]: type === "checkbox" ? checked : value }
          : item
      )
    );
  };

  return (
    // <section>
    //   <div className="m-2">
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <h2
          style={{ background: "rgb(19 27 32)" }}
          className="text-center text-xl font-bold p-2 rounded-full text-white"
        >
          Add Asset
        </h2>
        <div className="md:mx-16 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
          <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
            Location Details
          </h2>
          <div className="flex sm:flex-row flex-col justify-around items-center">
            <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-2 w-full">
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select Building :{" "}
                  <span className="text-red-500 font-medium">*</span>
                </label>
                <select
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  onChange={handleChange}
                  value={formData.building_id}
                  name="building_id"
                >
                  <option value="">Select Building</option>
                  {buildings?.map((building) => (
                    <option key={building.id} value={building.id}>
                      {building.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select Floor :
                </label>
                <select
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  onChange={handleChange}
                  value={formData.fl}
                  name="floor_name"
                >
                  <option value="">Select Floor</option>
                  {floors?.map((floor) => (
                    <option value={floor.id} key={floor.id}>
                      {floor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Select Unit :
                </label>
                <select
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  name="unit_id"
                  value={formData.unit_id}
                  onChange={handleChange}
                >
                  <option value="">Select Unit</option>
                  {units?.map((unit) => (
                    <option value={unit.id} key={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 mb-1 font-medium">
                  Latitude
                </label>
                <input
                  type="number"
                  name="latitude"
                  id=""
                  onChange={handleChange}
                  value={formData.latitude}
                  placeholder="Latitude"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 mb-1 font-medium">
                  Longitude
                </label>
                <input
                  type="number"
                  name="longitude"
                  id=""
                  onChange={handleChange}
                  value={formData.longitude}
                  placeholder="Longitude"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="my-5">
            <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
              Asset Info
            </h2>
            <div className="flex sm:flex-row flex-col justify-around items-center">
              <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-4 w-full">
                <div className="flex flex-col">
                  <label className="block text-gray-700 mb-1 font-medium">
                    Asset Name
                    <span className="text-red-500 font-medium">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={formData.name}
                    placeholder="Asset Name"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 mb-1 font-medium">
                    OEM Name
                    <span className="text-red-500 font-medium">*</span>
                  </label>
                  <input
                    type="text"
                    name="oem_name"
                    id="oem_name"
                    onChange={handleChange}
                    value={formData.oem_name}
                    placeholder="OEM Name"
                    className="border p-1 px-4 border-gray-500 rounded-md w-full placeholder:text-gray-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 mb-1 font-medium">
                    Asset Number
                    <span className="text-red-500 font-medium">*</span>
                  </label>
                  <input
                    type="number"
                    name="asset_number"
                    id="asset_number"
                    onChange={handleChange}
                    value={formData.asset_number}
                    placeholder="Asset Number"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 mb-1 font-medium">
                    Equipment Id
                    <span className="text-red-500 font-medium">*</span>
                  </label>
                  <input
                    type="text"
                    name="equipment_id"
                    id="equipment_id"
                    onChange={handleChange}
                    value={formData.equipment_id}
                    placeholder="Equipment Id"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 mb-1 font-medium">
                    Model Number
                  </label>
                  <input
                    type="text"
                    name="model_number"
                    id="model_number"
                    value={formData.model_number}
                    onChange={handleChange}
                    placeholder="Model Number "
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 mb-1 font-medium">
                    Serial Number
                  </label>
                  <input
                    type="text"
                    name="serial_number"
                    id="serial_number"
                    value={formData.serial_number}
                    onChange={handleChange}
                    placeholder="Serial Number "
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 mb-1 font-medium">
                    Purchase Cost
                    <span className="text-red-500 font-medium">*</span>
                  </label>
                  <input
                    type="text"
                    name="purchase_cost"
                    id="purchase_cost"
                    value={formData.purchase_cost}
                    onChange={handleChange}
                    placeholder="Purchase Cost"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 mb-1 font-medium">
                    Capacity
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="capacity"
                      id="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      placeholder="Capacity"
                      className="border p-1 px-4 border-gray-500 w-1/2 rounded-l-md"
                    />
                    <input
                      type="text"
                      name="unit"
                      id="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      placeholder="Unit of measurement"
                      className="border p-1 px-4 border-gray-500 rounded-r-md w-1/2 placeholder:text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 mb-1 font-medium">
                    Group
                    <span className="text-red-500 font-medium">*</span>
                  </label>
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
                <div className="flex flex-col">
                  <label className="block text-gray-700 mb-1 font-medium">
                    Sub Group
                    <span className="text-red-500 font-medium">*</span>
                  </label>
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

                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="" className="font-medium text-sm ">
                    Purchased Date:
                  </label>
                  <input
                    type="date"
                    name="purchased_on"
                    id="purchased_on"
                    value={formData.purchased_on}
                    onChange={handleChange}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <p>Breakdown</p>
                  <Switch
                    checked={!formData.breakdown}
                    onChange={() =>
                      setFormData((prevState) => ({
                        ...prevState,
                        breakdown: !prevState.breakdown,
                      }))
                    }
                  />
                  <p>In Use</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold">Critical:</p>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      id="yes"
                      checked={formData.critical === true}
                      onChange={() =>
                        setFormData({ ...formData, critical: true })
                      }
                      className="checked:accent-black"
                    />
                    <label htmlFor="yes">Yes</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      id="no"
                      checked={formData.critical === false}
                      onChange={() =>
                        setFormData({ ...formData, critical: false })
                      }
                      className="checked:accent-black"
                    />
                    <label htmlFor="no">No</label>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_meter}
                    // onClick={() => setMeterApplicable(!meterApplicable)}
                    onChange={() =>
                      setFormData((prevState) => ({
                        ...prevState,
                        is_meter: !prevState.is_meter,
                      }))
                    }
                    name="is_meter"
                    id="meterApplicable"
                  />
                  <label htmlFor="meterApplicable">Meter Applicable</label>
                </div>
                {formData.is_meter && (
                  <>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">Meter Type:</p>
                      <div className="flex gap-2">
                        <input
                          type="radio"
                          checked={formData.asset_type === "parent"}
                          onChange={() =>
                            setFormData({ ...formData, asset_type: "parent" })
                          }
                          id="parent"
                          className="checked:accent-black"
                          onClick={() => setMeterType("parent")}
                        />
                        <label htmlFor="parent">Parent</label>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="radio"
                          checked={formData.asset_type === "sub"}
                          onChange={() =>
                            setFormData({ ...formData, asset_type: "sub" })
                          }
                          id="sub"
                          onClick={() => setMeterType("sub")}
                          className="checked:accent-black"
                        />
                        <label
                          htmlFor="sub"
                          onClick={() => setMeterType("sub")}
                        >
                          Sub
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {formData.is_meter && meterType === "sub" && (
                  <select
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    name="parent_asset_id"
                    onChange={handleChange}
                    value={formData.parent_asset_id}
                  >
                    <option value="">Select Parent Meter Type </option>
                    {parentAsset &&
                      parentAsset.map((parent) => (
                        <option value={parent.id} key={parent.id}>
                          {parent.name}
                        </option>
                      ))}
                  </select>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1">
              <div className="mt-4">
                <select
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  name="comprehensive"
                  value={formData.comprehensive}
                  onChange={handleChange}
                >
                  <option value="">Select Asset Type</option>
                  <option value="true">Comprehensive</option>
                  <option value="false">Non-Comprehensive</option>
                </select>
              </div>
            </div>
          </div>
          <div className="my-5 w-full">
            <p className="border-b border-black font-semibold">
              Warranty Details
            </p>
            <div className="flex  flex-col gap-4 my-2  justify-between">
              <div className="flex gap-4 my-2">
                <p className="font-semibold">Under Warranty: </p>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    onChange={() =>
                      setFormData({ ...formData, warranty: true })
                    }
                    checked={formData.warranty === true}
                    id="inWarranty"
                    // onClick={() => setWarranty(true)}
                    className="checked:accent-black"
                  />
                  <label htmlFor="inWarranty">Yes</label>
                </div>
                <div className="flex  gap-2">
                  <input
                    type="radio"
                    id="notInWarranty"
                    checked={formData.warranty === false}
                    onChange={() =>
                      setFormData({ ...formData, warranty: false })
                    }
                    // onClick={() => setWarranty(false)}
                    className="checked:accent-black"
                  />
                  <label htmlFor="notInWarranty">No</label>
                </div>
              </div>

              {formData.warranty && (
                <div className="flex md:flex-row flex-col md:items-center my-2 gap-5">
                  <div className="md:flex grid grid-cols-2 items-center gap-2 ">
                    <label htmlFor="" className="font-medium text-sm">
                      Warranty Start Date :
                    </label>
                    <input
                      type="date"
                      name="warranty_start"
                      value={formData.warranty_start}
                      onChange={handleChange}
                      id="warranty_start"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="md:flex grid grid-cols-2 items-center gap-2 ">
                    <label htmlFor="" className="font-medium text-sm">
                      Expiry Date :
                    </label>
                    <input
                      type="date"
                      name="warranty_expiry"
                      value={formData.warranty_expiry}
                      onChange={handleChange}
                      id="warranty_expiry"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                  <div className="md:flex grid grid-cols-2 items-center gap-2 ">
                    <label htmlFor="" className="font-medium text-sm">
                      Commissioning Date :
                    </label>
                    <input
                      type="date"
                      value={formData.installation}
                      onChange={handleChange}
                      name="installation"
                      id=""
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="my-5">
              <p className="border-b border-black font-semibold">
                Supplier Contact Details
              </p>
              <div className="flex md:items-center md:justify-between flex-col md:flex-row">
                <div className="flex flex-col my-2">
                  <label htmlFor="" className="block text-gray-700 mb-1">
                    Select Supplier:
                  </label>
                  <select
                    className="border p-1 px-4 border-gray-500 rounded-md w-full"
                    value={formData.vendor_id}
                    onChange={handleChange}
                    name="vendor_id"
                  >
                    <option value="">Select Supplier</option>
                    {vendors.map((vendor) => (
                      <option value={vendor.id} key={vendor.id}>
                        {vendor.vendor_name} - {vendor.company_name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="p-1 border-2 border-black px-4 rounded-md hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-1"
                  onClick={() => showAddSupplierMOdal(true)}
                >
                  <IoAddCircle size={20} /> Add Supplier
                </button>
                {addSupplierModal && (
                  <AddSuppliers
                    onclose={() => showAddSupplierMOdal(false)}
                    fetchVendors={fetchVendors}
                  />
                )}
              </div>
            </div>
            {/* <div className="my-5">
              <p className="border-b border-black font-semibold">
                Meter Category Type
              </p>
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex flex-col mt-4 w-full">
                  <label className="block text-gray-700 mb-1">
                    Select Meter Category Type
                  </label>
                  <select
                    className="border p-1 px-4 border-gray-500 rounded-md w-full"
                    name="meter_category"
                    onChange={handleMeterCategoryChange}
                    value={meterCategory}
                  >
                    <option value="">Select Meter Category</option>
                    <option value="Board">Board</option>
                    <option value="DG">DG</option>
                    <option value="Renewable">Renewable</option>
                    <option value="FreshWater">Fresh Water</option>
                    <option value="Recycled">Recycled</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  {meterCategory === "Board" && (
                    <div className="mt-4 w-full">
                      <label className="block text-gray-700 mb-1">Board</label>
                      <select
                        className="border p-1 px-4 border-gray-500 rounded-md w-full"
                        name="meter_category"
                      >
                        <option value="">Select Sub Board</option>
                        <option value="">HT</option>
                        <option value="">VCB</option>
                        <option value="">Transformer</option>
                        <option value="">LT</option>
                      </select>
                    </div>
                  )}
                  {meterCategory === "DG" && (
                    <div className="mt-4 w-full">
                      <label className="block text-gray-700 mb-1">
                        Select Sub DG
                      </label>
                      <select
                        className="border p-1 px-4 border-gray-500 rounded-md w-full"
                        name="meter_category"
                      >
                        <option value="">Select DG</option>
                      </select>
                    </div>
                  )}
                  {meterCategory === "Renewable" && (
                    <div className="mt-4 w-full">
                      <label className="block text-gray-700 mb-1">
                        Renewable
                      </label>
                      <select
                        className="border p-1 px-4 border-gray-500 rounded-md w-full"
                        name="meter_category"
                      >
                        <option value="">Select Sub Renewable</option>
                        <option value="">Solar</option>
                        <option value="">Bio Methanol</option>
                        <option value="">Wind</option>
                      </select>
                    </div>
                  )}
                  {meterCategory === "FreshWater" && (
                    <div className="mt-4 w-full">
                      <label className="block text-gray-700 mb-1 ">
                        Fresh Water
                      </label>
                      <select
                        className="border p-1 px-4 border-gray-500 rounded-md w-full"
                        name="meter_category"
                        onChange={handleSubMeterCategoryChange}
                        value={subMeterCategory}
                      >
                        <option value="">SelectFresh Water</option>
                        <option value="sourceInput">Source (Input)</option>
                        <option value="">Destination (Output)</option>
                      </select>
                    </div>
                  )}
                  {meterCategory === "Recycled" && (
                    <div className="mt-4 w-full">
                      <label className="block text-gray-700 mb-1">
                        Recycled
                      </label>
                      <select
                        className="border p-1 px-4 border-gray-500 rounded-md w-full"
                        name="meter_category"
                      >
                        <option value="">Select Recycled</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  {subMeterCategory === "sourceInput" && (
                    <div className="mt-4 w-full">
                      <label className="block text-gray-700 mb-1 ">
                        Sub Fresh Water
                      </label>
                      <select
                        className="border p-1 px-4 border-gray-500 rounded-md w-full"
                        name=""
                      >
                        <option value="">Select Fresh Water</option>
                        <option value="">Municipal Corporation</option>
                        <option value="">Tanker</option>
                        <option value="">Borewell</option>
                        <option value="">Rainwater</option>
                        <option value="">Jackwell</option>
                        <option value="">Pump</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div> */}
          </div>
          <div className="my-5">
            <p className="border-b border-black font-semibold">
              CONSUMPTION ASSET MEASURE
            </p>
            <div className="flex flex-col mt-4 w-full">
              <select
                className="border p-1 px-4 border-gray-500 rounded-md w-fit"
                name="meter_category"
                onChange={handleConsumptionChange}
                value={consumption}
              >
                <option value="">Select Consumption Asset Measure Type</option>
                <option value="ConsumptionAssetMeasureType">
                  Consumption Asset Measure Type
                </option>
                <option value="nonConsumption">
                  Non Consumption Asset Measure Type
                </option>
              </select>
            </div>
            <div className="flex flex-col">
              {consumption === "ConsumptionAssetMeasureType" && (
                <div className="my-5 space-y-3">
                  {consumptionData.map((con, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 gap-5 p-5 border rounded-md sm:grid-cols-2 lg:grid-cols-3"
                    >
                      <div className="flex flex-col">
                        <label
                          htmlFor={`name-${index}`}
                          className="font-medium"
                        >
                          Name :
                        </label>
                        <input
                          type="text"
                          name="name"
                          id={`name-${index}`}
                          value={con.name}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Name"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`order-${index}`}
                          className="font-medium"
                        >
                          Sequence :
                        </label>
                        <input
                          type="text"
                          name="order"
                          id={`order-${index}`}
                          value={con.order}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Enter Sequence"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`unit-${index}`}
                          className="font-medium"
                        >
                          Unit Type :
                        </label>
                        <input
                          type="text"
                          name="unit_type"
                          id={`unit-${index}`}
                          value={con.unit_type}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Enter Unit Type"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`digit-${index}`}
                          className="font-medium"
                        >
                          Input Character Limit :
                        </label>
                        <input
                          type="text"
                          name="digit"
                          id={`digit-${index}`}
                          value={con.digit}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Input Character Limit"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`alert_below-${index}`}
                          className="font-medium"
                        >
                          Alert Below :
                        </label>
                        <input
                          type="text"
                          name="alert_below"
                          id={`alert_below-${index}`}
                          value={con.alert_below}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Alert Below Value"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`alert_above-${index}`}
                          className="font-medium"
                        >
                          Alert Above :
                        </label>
                        <input
                          type="text"
                          name="alert_above"
                          id={`alert_above-${index}`}
                          value={con.alert_above}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Alert Above Value"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`min_val-${index}`}
                          className="font-medium"
                        >
                          Min :
                        </label>
                        <input
                          type="text"
                          name="min_val"
                          id={`min_val-${index}`}
                          value={con.min_val}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Min Value"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`max_val-${index}`}
                          className="font-medium"
                        >
                          Max :
                        </label>
                        <input
                          type="text"
                          name="max_val"
                          id={`max_val-${index}`}
                          value={con.max_val}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Max Value"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`multiplier_factor-${index}`}
                          className="font-medium"
                        >
                          Multiplier Factor :
                        </label>
                        <input
                          type="text"
                          name="multiplier_factor"
                          id={`multiplier_factor-${index}`}
                          value={con.multiplier_factor}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Multiplier Factor"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="dashboard_view"
                          id={`dashboard_view-${index}`}
                          checked={con.dashboard_view}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                        />
                        <label htmlFor={`dashboard_view-${index}`}>
                          Dashboard View
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="consumption_view"
                          id={`consumption_view-${index}`}
                          checked={con.consumption_view}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                        />
                        <label htmlFor={`consumption_view-${index}`}>
                          Consumption View
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="check_prev"
                          id={`check_prev-${index}`}
                          checked={con.check_prev}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                        />
                        <label htmlFor={`check_prev-${index}`}>
                          Check previous Reading
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveConsumption(index)}
                        className="col-span-1 text-red-600 underline mt-2 sm:col-span-2 lg:col-span-3 flex justify-start items-center"
                      >
                        <IoMdClose size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    className="border border-black rounded-md py-2 px-3 my-2"
                    onClick={handleAddConsumption}
                  >
                    <IoAddCircleOutline />
                  </button>
                </div>
              )}
               {consumption === "nonConsumption" && (
                <div className="my-5 space-y-3">
                  {consumptionData.map((con, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 gap-5 p-5 border rounded-md sm:grid-cols-2 lg:grid-cols-3"
                    >
                      <div className="flex flex-col">
                        <label
                          htmlFor={`name-${index}`}
                          className="font-medium"
                        >
                          Name :
                        </label>
                        <input
                          type="text"
                          name="name"
                          id={`name-${index}`}
                          value={con.name}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Name"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`order-${index}`}
                          className="font-medium"
                        >
                          Sequence :
                        </label>
                        <input
                          type="text"
                          name="order"
                          id={`order-${index}`}
                          value={con.order}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Enter Sequence"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`unit-${index}`}
                          className="font-medium"
                        >
                          Unit Type :
                        </label>
                        <input
                          type="text"
                          name="unit_type"
                          id={`unit-${index}`}
                          value={con.unit_type}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Enter Unit Type"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`digit-${index}`}
                          className="font-medium"
                        >
                          Input Character Limit :
                        </label>
                        <input
                          type="text"
                          name="digit"
                          id={`digit-${index}`}
                          value={con.digit}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Input Character Limit"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`alert_below-${index}`}
                          className="font-medium"
                        >
                          Alert Below :
                        </label>
                        <input
                          type="text"
                          name="alert_below"
                          id={`alert_below-${index}`}
                          value={con.alert_below}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Alert Below Value"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`alert_above-${index}`}
                          className="font-medium"
                        >
                          Alert Above :
                        </label>
                        <input
                          type="text"
                          name="alert_above"
                          id={`alert_above-${index}`}
                          value={con.alert_above}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Alert Above Value"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`min_val-${index}`}
                          className="font-medium"
                        >
                          Min :
                        </label>
                        <input
                          type="text"
                          name="min_val"
                          id={`min_val-${index}`}
                          value={con.min_val}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Min Value"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`max_val-${index}`}
                          className="font-medium"
                        >
                          Max :
                        </label>
                        <input
                          type="text"
                          name="max_val"
                          id={`max_val-${index}`}
                          value={con.max_val}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Max Value"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor={`multiplier_factor-${index}`}
                          className="font-medium"
                        >
                          Multiplier Factor :
                        </label>
                        <input
                          type="text"
                          name="multiplier_factor"
                          id={`multiplier_factor-${index}`}
                          value={con.multiplier_factor}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                          placeholder="Multiplier Factor"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="dashboard_view"
                          id={`dashboard_view-${index}`}
                          checked={con.dashboard_view}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                        />
                        <label htmlFor={`dashboard_view-${index}`}>
                          Dashboard View
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="consumption_view"
                          id={`consumption_view-${index}`}
                          checked={con.consumption_view}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                        />
                        <label htmlFor={`consumption_view-${index}`}>
                          Consumption View
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="check_prev"
                          id={`check_prev-${index}`}
                          checked={con.check_prev}
                          onChange={(e) => handleAssetParamsChange(index, e)}
                        />
                        <label htmlFor={`check_prev-${index}`}>
                          Check previous Reading
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveConsumption(index)}
                        className="col-span-1 text-red-600 underline mt-2 sm:col-span-2 lg:col-span-3 flex justify-start items-center"
                      >
                        <IoMdClose size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    className="border border-black rounded-md py-2 px-3 my-2"
                    onClick={handleAddConsumption}
                  >
                    <IoAddCircleOutline />
                  </button>
                </div>
              )}
            </div>
          </div>
          <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
            Attachments
          </h2>
          <div className="flex flex-col gap-2">
            <div>
              <p className="border-b border-black my-1 font-semibold">
                Purchase Invoice
              </p>
              <FileInputBox
                handleChange={(files) => handleFileChange(files, "invoice")}
                fieldName={"invoice"}
              />
            </div>
            <div>
              <p className="border-b border-black my-1 font-semibold">
                Insurance Details
              </p>
              <FileInputBox
                handleChange={(files) => handleFileChange(files, "insurance")}
                fieldName={"insurance"}
              />
            </div>
            <div>
              <p className="border-b border-black my-1 font-semibold">
                Manuals
              </p>
              <FileInputBox
                handleChange={(files) => handleFileChange(files, "manuals")}
                fieldName={"manuals"}
              />
            </div>
            <div>
              <p className="border-b border-black my-1 font-semibold">
                Other Files
              </p>
              <FileInputBox
                handleChange={(files) => handleFileChange(files, "others")}
                fieldName={"others"}
                isMulti={true}
              />
            </div>
          </div>
          <div className="sm:flex justify-center grid gap-2 my-5 ">
            <button
              className="bg-black text-white p-2 px-4 rounded-md font-medium"
              onClick={handleSubmit}
            >
              Save & Show Details
            </button>
            {/* <button className=" border-black border-2  p-2 px-4 rounded-md font-medium">
              Save & Add PPM
            </button>
            <button className="border-black border-2 p-2 px-4 rounded-md font-medium">
              Save & Add AMC
            </button>
            <button
              className=" border-black border-2  p-2 px-4 rounded-md font-medium"
              onClick={handleSaveAndCreate}
            >
              Save & Create New Asset
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAsset;
