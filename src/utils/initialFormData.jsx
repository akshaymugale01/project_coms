import { getItemInLocalStorage } from "./localStorage";
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;
const siteID = getItemInLocalStorage("SITEID")
export const initialAddAssetFormData = {
    
    site_id: siteID,
    building_id: "",
    floor_id: "",
    unit_id: "",
    name: "",
    latitude: "",
    longitude: "",
    serial_number: "",
    model_number: "",
    purchase_cost: "",
    capacity: "",
    unit: "",
    asset_group_id: "",
    asset_sub_group_id: "",
    asset_type: "",
    purchased_on: "",
    breakdown: false,
    critical: false,
    installation: "",
    warranty: false,
    warranty_start: "",
    warranty_expiry: "",
    is_meter: false,
    // meter_type: "",
    applicable_meter_category: "",
    parent_meter: "",
    meter_category: "",
    vendor_id: "",
    oem_name:"",
    parent_asset_id:"",
    asset_number: "",
    equipment_id: "",
    comprehensive : "",
    invoice: [],
    insurance: [],
    manuals: [],
    others: [],
  };

  export const initialSchedule = {
    Sunday: { selected: false, start_time: '', end_time: '' },
    Monday: { selected: false, start_time: '', end_time: '' },
    Tuesday: { selected: false, start_time: '', end_time: '' },
    Wednesday: { selected: false, start_time: '', end_time: '' },
    Thursday: { selected: false, start_time: '', end_time: '' },
    Friday: { selected: false, start_time: '', end_time: '' },
    Saturday: { selected: false, start_time: '', end_time: '' },
  };