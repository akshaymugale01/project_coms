import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { getFloors, getUnits,getVendors, postNewPermit } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";

const AddNewPermit = () => {
  const buildings = getItemInLocalStorage("Building");
  const userId = getItemInLocalStorage("UserId");

  const [vendors, setVendors] = useState([]);
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  const [showEntityList, setShowEntityList] = useState(false);
  const [activities, setActivities] = useState([
    { activity: "", sub_activity: "", category_of_hazards: "", risks: "" },
  ]);
 
  useEffect(() => {
    const fetchVendors = async () => {
      const vendorResp = await getVendors();
      setVendors(vendorResp.data);
    };

   
    fetchVendors();
    
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    site_id: "",
    unit_id: "",
    permit_for: "",
    building_id: "",
    floor_id: "",
    room_id: "",
    client_specific: "",
    entity: "",
    copy_to_string: "",
    permit_type: "",
    vendor_id: "",
    issue_date_and_time: "",
    expiry_date_and_time: "",
    comment: "",
    permit_status: "",
    extention_status: true,
    created_by_id: "",
    permit_activities: []
  });
  const handleNewPermit = async() => {
    const sendData = new FormData();
    sendData.append("permit[name]", formData.name);
    sendData.append("permit[contact_number]", formData.contact_number);
    // sendData.append("permit[site_id]", formData.site_id);
    // sendData.append("permit[unit_id]", formData.unit_id);
    sendData.append("permit[permit_for]", formData.permit_for);
    sendData.append("permit[building_id]", formData.building_id);
    sendData.append("permit[floor_id]", formData.floor_id);
    // sendData.append("permit[room_id]", formData.room_id);
    sendData.append("permit[client_specific]", formData.client_specific);
    sendData.append("permit[entity]", formData.entity);
    sendData.append("permit[copy_to_string]", formData.copy_to_string);
    sendData.append("permit[permit_type]", formData.permit_type);
    sendData.append("permit[vendor_id]", formData.vendor_id);
    // sendData.append("permit[issue_date_and_time]", formData.issue_date_and_time);
    sendData.append("permit[expiry_date_and_time]", formData.expiry_date_and_time);
    sendData.append("permit[comment]", formData.comment);
    // sendData.append("permit[permit_status]", formData.permit_status);
    // sendData.append("permit[extention_status]", formData.extention_status);
    sendData.append("permit[created_by_id]", userId);
    
    activities.forEach((activity) => {
      sendData.append(`permit[permit_activities][][activity]`, activity.activity);
      sendData.append(`permit[permit_activities][][sub_activity]`, activity.sub_activity);
      sendData.append(`permit[permit_activities][][category_of_hazards]`, activity.category_of_hazards);
      sendData.append(`permit[permit_activities][][risks]`, activity.risks);
    });

    // formData.permit_attachments.forEach((file) => {
    //     sendData.append("attachfiles[]", file)
    // });
    try {
        const billResp = await postNewPermit(sendData)
        toast.success("Permit Added Successfully")
        navigate("/admin/permit")
        console.log("Permit response",billResp)
    } catch (error) {
        console.log(error)
    }
  };
  const handleChange = async (e) => {
    async function fetchFloor(floorID) {
      console.log(floorID)
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
    if (e.target.type === "select-one" && e.target.name === "building_id") {
      const BuildID = Number(e.target.value);
      await fetchFloor(BuildID);

      setFormData({
        ...formData,
        building_id: BuildID,
      });
    } 
    else if (
      e.target.type === "select-one" &&
      e.target.name === "floor_name"
    ) 
    {
      const UnitID = Number(e.target.value);
      await getUnit(UnitID);
      setFormData({
        ...formData,
        floor_id: UnitID,
      });
    }
    
    
    else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newActivities = [...activities];
    newActivities[index][name] = value;
    setActivities(newActivities);
  };

  const handleAddActivity = () => {
    setActivities([
      ...activities,
      {
        
        activity: "",
        subActivity: "",
        hazardCategory: "",
        risks: "",
      },
    ]);
    
  };

  const handleDeleteActivity = (index) => {
    const removeActivities = [...activities];
    removeActivities.splice(index, 1);
    setActivities(removeActivities);
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setShowEntityList(value === "client");
    
    // Update formData with the selected value
    setFormData((prevData) => ({
      ...prevData,
      client_specific: value,
    }));
  };

  return (
    <section>
      <div className="m-2">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold p-2 rounded-full text-white"
        >
          New Permit
        </h2>
        <div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
          <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
            PERMIT REQUESTOR DETAILS
          </h2>
          <h1 className="font-semibold">Requestor Details :</h1>

          <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
            {/* Requestor details input fields */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    type="text"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="contact-number"
                  >
                    Contact Number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="contact-number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    name="contact_number"
                    type="text"
                    placeholder="Enter Contact Number"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="site"
                  >
                    Site
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="site"
                    type="text"
                    placeholder="Business Bay"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="department"
                  >
                    Department
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="department"
                    type="text"
                    placeholder="Department"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="unit"
                  >
                    Unit
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="unit"
                    type="text"
                    placeholder="Unit"
                    name="unit_id"
                    value={formData.unit_id}
                    onChange={handleChange}>
                    <option value="">Select Unit</option>
                    {units?.map((unit) => (
                      <option value={unit.id} key={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
               
              </div>
            </div>
          </div>

          <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
            BASIC DETAILS
          </h2>

          <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
            {/* Basic details input fields */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="permit-for"
                  >
                    Permit For
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="permit-for"
                    type="text"
                    onChange={handleChange}
                    value={formData.permit_for}
                    name="permit_for"
                    placeholder="Enter Permit For"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="building"
                  >
                    Building
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="building"
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
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="wing"
                  >
                    Wing
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="wing"
                  >
                    <option>Select Building First</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="area"
                  >
                    Area
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="area"
                  >
                    <option>Select Floor First</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="floor"
                  >
                    Floor
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="floor"
                    onChange={handleChange}
                    value={formData.floor_id}
                    name="floor_id"
                  >
                    <option value="">Select Floor</option>
                  {floors?.map((floor) => (
                    <option value={floor.id} key={floor.id}>
                      {floor.name}
                    </option>
                  ))}
                  </select>
                </div>
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="room"
                  >
                    Room
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="room"
                  >
                    <option>Select Wing First</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="type"
                  >
                    Client Specific
                  </label>
                  <div className="flex items-center">
                    <input
                      className="mr-2 leading-tight"
                      type="radio"
                      id="internal"
                      name="client_specific"
                      value="internal"
                      checked={formData.client_specific === "internal"}
                      onChange={handleRadioChange}
                    />
                    <label
                      className="text-gray-700 font-bold mr-4"
                      htmlFor="internal"
                    >
                      Internal
                    </label>
                    <input
                      className="mr-2 leading-tight"
                      type="radio"
                      id="client"
                      name="client_specific"
                      value="client"
                      checked={formData.client_specific === "client"}
                      onChange={handleRadioChange}
                    />
                    <label className="text-gray-700 font-bold" htmlFor="client">
                      Client
                    </label>
                  </div>
                </div>
                {showEntityList && (
                  <div className="col-span-2 md:col-span-1">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="entity-list"
                    >
                      List of Entity
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="entity-list"
                      onChange={handleChange}
                      value={formData.entity}
                      name="entity"
                      
                    >
                      <option value="">Select Entity</option>
                      <option value="RISING ASSOSIATES">RISING ASSOSIATES</option>
                      <option value="ABS Professional Services">ABS Professional Services</option>
                      <option value="Apex Fund Services LLP">Apex Fund Services LLP</option>
                    </select>
                  </div>
                )}
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="copy-to"
                  >
                    Copy To
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="copy-to"
                    type="text"
                    onChange={handleChange}
                    value={formData.copy_to_string}
                    name="copy_to_string"
                    placeholder="Copy To"
                  />
                </div>
              </div>
            </div>
          </div>

          <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
            PERMIT DETAILS
          </h2>

          <h3 className="font-semibold">Select Permit Type</h3>
          {/* Permit details input fields */}
          <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="col-span-1">
                <input
                  type="radio"
                  id="cold-work"
                  name="permit_type"
                  value="Cold Work"
                  checked={formData.permit_type === "Cold Work"}
        onChange={(e) => setFormData({ ...formData, permit_type: e.target.value })}
                />
                <label
                  className="text-gray-700 font-bold ml-2"
                  htmlFor="cold-work"
                >
                  Cold Work
                </label>
              </div>
              <div className="col-span-1">
                <input
                  type="radio"
                  id="confined-space-work"
                  name="permit_type"
                  value="Confined Space Work"
                  checked={formData.permit_type === "Confined Space Work"}
        onChange={(e) => setFormData({ ...formData, permit_type: e.target.value })}
                />
                <label
                  className="text-gray-700 font-bold ml-2"
                  htmlFor="confined-space-work"
                >
                  Confined Space Work
                </label>
              </div>
              <div className="col-span-1">
                <input
                  type="radio"
                  id="electrical-work"
                  name="permit-type"
                  value="Electrical Work"
                  checked={formData.permit_type === "Electrical Work"}
        onChange={(e) => setFormData({ ...formData, permit_type: e.target.value })}
                />
                <label
                  className="text-gray-700 font-bold ml-2"
                  htmlFor="electrical-work"
                >
                  Electrical Work
                </label>
              </div>
              <div className="col-span-1">
                <input
                  type="radio"
                  id="excavation-work"
                  name="permit_type"
                  value="Excavation Work"
                  checked={formData.permit_type === "Excavation Work"}
        onChange={(e) => setFormData({ ...formData, permit_type: e.target.value })}
                />
                <label
                  className="text-gray-700 font-bold ml-2"
                  htmlFor="excavation-work"
                >
                  Excavation Work
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="col-span-1">
                <input
                  type="radio"
                  id="height-work"
                  name="permit_type"
                  value="Height Work"
                  checked={formData.permit_type === "Height Work"}
        onChange={(e) => setFormData({ ...formData, permit_type: e.target.value })}
                />
                <label
                  className="text-gray-700 font-bold ml-2"
                  htmlFor="height-work"
                >
                  Height Work
                </label>
              </div>
              <div className="col-span-1">
                <input
                  type="radio"
                  id="hot-work"
                  name="permit_type"
                  value="Hot Work"
                  checked={formData.permit_type === "Hot Work"}
        onChange={(e) => setFormData({ ...formData, permit_type: e.target.value })}
                />
                <label
                  className="text-gray-700 font-bold ml-2"
                  htmlFor="hot-work"
                >
                  Hot Work
                </label>
              </div>
              <div className="col-span-1">
                <input
                  type="radio"
                  id="radiology-work"
                  name="permit_type"
                  value="Radiology Work"
                  checked={formData.permit_type === "Radiology Work"}
        onChange={(e) => setFormData({ ...formData, permit_type: e.target.value })}
                />
                <label
                  className="text-gray-700 font-bold ml-2"
                  htmlFor="radiology-work"
                >
                  Radiology Work
                </label>
              </div>
              <div className="col-span-1">
                <input
                  type="radio"
                  id="loading-unloading-work"
                  name="permit_type"
                  value="Loading, Unloading Hazardous Material Work"
                  checked={formData.permit_type === "Loading, Unloading Hazardous Material Work"}
        onChange={(e) => setFormData({ ...formData, permit_type: e.target.value })}
                />
                <label
                  className="text-gray-700 font-bold ml-2"
                  htmlFor="loading-unloading-work"
                >
                  Loading, Unloading Hazardous Material Work
                </label>
              </div>
            </div>
          </div>

          <h3 className="font-semibold">Enter Permit Description</h3>

          <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
            {/* Permit details input fields */}
            <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
              {activities.map((activity, index) => (
                <div key={activity.id} className="mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="col-span-1">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor={`activity-${index}`}
                      >
                        Activity*
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={`activity-${index}`}
                        type="text"
                        placeholder="Select Activity"
                        name="activity"
                        value={activity.activity}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                    <div className="col-span-1">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor={`sub-activity-${index}`}
                      >
                        Sub Activity*
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={`sub-activity-${index}`}
                        type="text"
                        placeholder="Select Sub Activity"
                        name="sub_activity"
                        value={activity.sub_activity}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="col-span-1">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor={`hazard-category-${index}`}
                      >
                        Category of Hazards*
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={`hazard-category-${index}`}
                        type="text"
                        placeholder="Select Category of Hazards"
                        name="category_of_hazards"
                        value={activity.category_of_hazards}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                    <div className="col-span-1">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor={`risks-${index}`}
                      >
                        Risks*
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={`risks-${index}`}
                        type="text"
                        placeholder="Enter Risks"
                        name="risks"
                        value={activity.risks}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                  </div>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => handleDeleteActivity(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleAddActivity}
                >
                  Add Activity
                </button>
              </div>
            </div>

            <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="vendor"
                  >
                    Vendor
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="vendor"
                    type="text"
                    value={formData.vendor_id}
                    onChange={handleChange}
                    name="vendor_id"
                    placeholder="Enter Vendor">
                        <option value="">Select Vendor</option>
                     {vendors.map((vendor) => (
                      <option value={vendor.id} key={vendor.id}>
                        {vendor.vendor_name}
                      </option>
                    ))}
                    </select>
                 
                </div>
                <div className="col-span-1">
  <label
    className="block text-gray-700 font-bold mb-2"
    htmlFor="expiryDateTime"
  >
    Expiry Date&Time*
  </label>
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="expiryDateTime"
    value={formData.expiry_date_and_time}
    onChange={handleChange}
    name="expiry_date_and_time"
    type="datetime-local"
    placeholder="dd-mm-yyyy --:--"
  />
</div>

              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="col-span-2">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="comment"
                  >
                    Comment (Optional)
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    name="comment"
                    placeholder="Enter Comment"
                  />
                </div>
              </div>
            </div>
          </div>

          <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
            ATTACHMENTS
          </h3>
          {/* <input type="file" /> */}
          <FileInputBox />

          {/* Submit button */}
          <div className="sm:flex justify-center grid gap-2 my-5 ">
            <button
              className="bg-black text-white p-2 px-4 rounded-md font-medium"
                onClick={handleNewPermit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddNewPermit;
