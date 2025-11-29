import { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Navbar from "../../components/Navbar";
import DataTable from "react-data-table-component";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  getFloors,
  getSites,
  getUnits,
  getBuildings,
  postSetupUsers,
  getUsersByID,
  // handleSaveEdit,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import UserSetupTreeServiceDesk from "./UserSetupTreeServiceDesk";
import VisitorSetup from "./VisitorSetup";
import UserSetupTree from "./UserSetupTree";
import UserSetupTreeVisitor from "./UserSetpupTreeVisitor";
import UserSetupTreeAmenities from "./UserSetupTreeAmenities";
import UserSetupTreeCommunication from "./UserSetupTreeCommunication";

const UserSetupTreeView = () => {
  const siteId = getItemInLocalStorage("SITEID");
  const navigate = useNavigate();
  const [page, setPage] = useState("ServiceDesk");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sites, setSites] = useState([]);
  const [units, setUnits] = useState([]);
  const [userData, setUserData] = useState([]);
  const { id } = useParams();

  console.log(id);
  
  // Helper function to safely render object or string values
      const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc?.[part], obj) || "Not provided";
};

  const renderValue = (value) => {

    if (!value) return "Not provided";
    if (typeof value === "object" && value !== null) {
      return value.name || value.id || "Not provided";
    }
    return value;
  };
  
  // Convert DD/MM/YYYY to YYYY-MM-DD for date input
  const convertToDateInputFormat = (dateString) => {
    if (!dateString) return "";
    // If in DD/MM/YYYY format, convert to YYYY-MM-DD
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    }
    // If already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    return dateString;
  };
  
  // Convert date to display format (DD/MM/YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    // If in DD/MM/YYYY format
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      return dateString;
    }
    // If in YYYY-MM-DD format, convert to DD/MM/YYYY
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    }
    return dateString;
  };
  
  const fetchUserById = async () => {
    try {
      const user = await getUsersByID(id);
      console.log("Fetched user:", user.data);
      console.log("User members:", user.data[0]?.user_member);
      setUserData(user.data[0] || {}); // or whatever state you're updating
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserById();
    }
  }, [id]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Add your save API call here
      // await updateUser(id, userData);
      
      // After successful save, refresh the data and exit edit mode
      await fetchUserById();
      setIsEditMode(false);
    } catch (err) {
      console.error("Error saving user:", err);
      // Optionally show error message to user
    }
  };

  const handleCancelEdit = () => {
    // Reset to original data
    fetchUserById();
    setIsEditMode(false);
  };

  console.log("User data", userData);
  console.log("User members in state:", userData?.user_member);
  
  return (
    <section className="flex">
      {/* Navbar stays visible */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex flex-col w-full mt-3 px-4">
        {/* Top Row: Sidebar Button + Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          {/* Sidebar Toggle Button */}
          <button
            onClick={() => {
              setIsSidebarOpen(true);
              setIsEditMode(false); // Reset edit mode when opening
              fetchUserById();
            }}
            className="bg-gray-800 text-white px-6 py-2.5 rounded-lg shadow-lg hover:bg-gray-900 transition-all duration-200 font-medium hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Open Profile
          </button>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3 bg-gray-100 p-2 rounded-xl shadow-md">
            {[
              { name: "ServiceDesk" },
              { name: "Visitors" },
              { name: "Amenities Bookings" },
              { name: "Communication" },
            ].map((tab) => (
              <button
                key={tab.name}
                className={`px-6 py-2.5 rounded-lg cursor-pointer text-center transition-all duration-300 font-medium ${
                  page === tab.name
                    ? "bg-gray-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
                }`}
                onClick={() => setPage(tab.name)}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Page Content */}
        <div className="w-full overflow-x-auto mt-10">
          {page === "ServiceDesk" && <UserSetupTreeServiceDesk />}
          {page === "Visitors" && <UserSetupTreeVisitor />}
          {page === "Amenities Bookings" && <UserSetupTreeAmenities />}
        </div>

        <div className="w-full overflow-x-auto">
          {page === "Communication" && <UserSetupTreeCommunication />}
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={() => {
              if (!isEditMode) {
                setIsSidebarOpen(false);
              }
            }}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-screen w-full md:w-2/5 lg:w-1/3 bg-white shadow-2xl overflow-y-auto z-50 transform transition-transform duration-300">
            <div className="h-full flex flex-col">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    {isEditMode ? "Edit User Profile" : "User Profile"}
                  </h2>
                  <button
                    onClick={() => {
                      if (!isEditMode) {
                        setIsSidebarOpen(false);
                      }
                    }}
                    className={`text-white hover:bg-white/20 rounded-full p-2 transition-colors ${
                      isEditMode ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isEditMode}
                  >
                    <span className="text-2xl">✕</span>
                  </button>
                </div>
                
                {!isEditMode ? (
                  <button
                    onClick={handleEditClick}
                    className="w-full px-4 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                  >
                    Edit User Details
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">

                {/* Profile Header */}
                <div className="flex items-center space-x-4 mb-6 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {userData.firstname?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="flex-1">
                    {!isEditMode ? (
                      <>
                        <h3 className="text-xl font-bold text-gray-800">
                          {userData.firstname || "No data"}{" "}
                          {userData.lastname || ""}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {userData.user_type ? userData.user_type.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "No user type"}
                        </p>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={userData.firstname || ""}
                          onChange={(e) => setUserData({...userData, firstname: e.target.value})}
                          className="text-xl font-bold text-gray-800 border-b-2 border-blue-400 focus:outline-none bg-transparent w-full mb-1"
                          placeholder="First Name"
                        />
                        <input
                          type="text"
                          value={userData.lastname || ""}
                          onChange={(e) => setUserData({...userData, lastname: e.target.value})}
                          className="text-sm text-gray-600 border-b-2 border-blue-300 focus:outline-none bg-transparent w-full"
                          placeholder="Last Name"
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Personal Info */}
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-3 rounded-t-lg">
                    <h3 className="text-lg font-bold flex items-center">
                      <span className="mr-2">👤</span>
                      Personal Information
                    </h3>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-b-lg p-4 shadow-sm">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="font-semibold text-gray-600 w-32 flex-shrink-0">📱 Contact:</span>
                        {!isEditMode ? (
                          <span className="text-gray-800">{userData.mobile || "Not provided"}</span>
                        ) : (
                          <input
                            type="tel"
                            value={userData.mobile || ""}
                            onChange={(e) => setUserData({...userData, mobile: e.target.value})}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                            placeholder="Mobile number"
                          />
                        )}
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold text-gray-600 w-32 flex-shrink-0">📧 Email:</span>
                        {!isEditMode ? (
                          <span className="text-gray-800 break-all">{userData.email || "Not provided"}</span>
                        ) : (
                          <input
                            type="email"
                            value={userData.email || ""}
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                            placeholder="Email address"
                          />
                        )}
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold text-gray-600 w-32 flex-shrink-0">🎂 Birth Date:</span>
                        {!isEditMode ? (
                          <span className="text-gray-800">{formatDate(userData.birth_date)}</span>
                        ) : (
                          <input
                            type="date"
                            value={convertToDateInputFormat(userData.birth_date) || ""}
                            onChange={(e) => setUserData({...userData, birth_date: e.target.value})}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                          />
                        )}
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold text-gray-600 w-32 flex-shrink-0">✅ Status:</span>
                        {!isEditMode ? (
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            userData.status === true ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                          }`}>
                            {userData.status === true ? "Active" : "Inactive"}
                          </span>
                        ) : (
                          <select
                            value={userData.status ? "true" : "false"}
                            onChange={(e) => setUserData({...userData, status: e.target.value === "true"})}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                          >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Family Members */}
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-3 rounded-t-lg">
                    <h3 className="text-lg font-bold flex items-center">
                      <span className="mr-2">👨‍👩‍👧‍👦</span>
                      Family Members
                    </h3>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-b-lg p-4 shadow-sm">
                    {userData.user_member && userData.user_member.length > 0 ? (
                      <ul className="space-y-2">
                        {userData.user_member.map((member, index) => (
                          <li key={index} className="flex flex-col p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center mb-2">
                              <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                                👤
                              </span>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-800">{member.member_name || "N/A"}</p>
                                <p className="text-sm text-gray-600">{member.relation || ""}</p>
                              </div>
                            </div>
                            <div className="ml-11 text-sm space-y-1">
                              {member.member_type && (
                                <p className="text-gray-600"><span className="font-medium">Type:</span> {member.member_type}</p>
                              )}
                              {member.contact_no && (
                                <p className="text-gray-600"><span className="font-medium">Contact:</span> {member.contact_no}</p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-center py-4 italic">
                        No family members have been added
                      </p>
                    )}
                  </div>
                </div>


                    {/* Residence Details */}
<div className="mb-6">
  <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-3 rounded-t-lg">
    <h3 className="text-lg font-bold flex items-center">
      <span className="mr-2">🏢</span>
      Residence Details
    </h3>
  </div>

  <div className="bg-white border border-gray-200 rounded-b-lg p-4 shadow-sm space-y-2">

    {[
{ label: "Tower", key: "building.name" },
{ label: "Floor", key: "floor.name" },
{ label: "Unit", key: "unit.name" },

      { label: "Moving Date", key: "moving_date" },
      { label: "Occupancy Type", key: "occupancy_type" },
      { label: "Pets", key: "pets" },
      { label: "Blood Group", key: "blood_group" },
      { label: "Profession", key: "profession" },
    ].map((item, i) => (
      <div key={i} className="flex justify-between border-b pb-1">
        <span className="font-medium text-gray-600">{item.label}:</span>
       <span className="text-gray-800">{getNestedValue(userData, item.key)}</span>

      </div>
    ))}

  </div>
</div>

{/* Utility & Service Information */}
<div className="mb-6">
  <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-3 rounded-t-lg">
    <h3 className="text-lg font-bold flex items-center">
      <span className="mr-2">⚙️</span>
      Utility & Service Information
    </h3>
  </div>

  <div className="bg-white border border-gray-200 rounded-b-lg p-4 shadow-sm space-y-2">
    {[
      { label: "MGL Customer Number", key: "mgl_no" },
      { label: "Adani Electricity Account Number", key: "adani_no" },
      { label: "Internet Provider Name", key: "internet_provider" },
      { label: "Internet ID", key: "internet_id" },
    ].map((item, i) => (
      <div key={i} className="flex justify-between border-b pb-1">
        <span className="font-medium text-gray-600">{item.label}:</span>
        <span className="text-gray-800">{renderValue(userData[item.key])}</span>
      </div>
    ))}
  </div>
</div>

{/* Resident Services / Vendor Details */}
<div className="mb-6">
  <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-3 rounded-t-lg">
    <h3 className="text-lg font-bold flex items-center">
      <span className="mr-2">🛠️</span>
      Resident Services / Vendor Details
    </h3>
  </div>

  <div className="bg-white border border-gray-200 rounded-b-lg p-4 shadow-sm">
    {userData.vendor_details && userData.vendor_details.length > 0 ? (
      <ul className="space-y-3">
        {userData.vendor_details.map((vendor, i) => (
          <li key={i} className="p-3 bg-gray-50 rounded border">

            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-600">Service Type:</span>
              <span className="text-gray-800">{renderValue(vendor.service_type)}</span>
            </div>

            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-600">Name:</span>
              <span className="text-gray-800">{renderValue(vendor.name)}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Number:</span>
              <span className="text-gray-800">{renderValue(vendor.number)}</span>
            </div>

          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-center italic">No Vendor Details Found</p>
    )}
  </div>
</div>

{/* Vehicle Details */}
<div className="mb-6">
  <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-3 rounded-t-lg">
    <h3 className="text-lg font-bold flex items-center">
      <span className="mr-2">🚗</span>
      Vehicle Details
    </h3>
  </div>

  <div className="bg-white border border-gray-200 rounded-b-lg p-4 shadow-sm">
    {userData.vehicle_details && userData.vehicle_details.length > 0 ? (
      <ul className="space-y-3">
        {userData.vehicle_details.map((v, i) => (
          <li key={i} className="p-3 bg-gray-50 rounded border">

            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-600">Vehicle Type:</span>
              <span className="text-gray-800">{renderValue(v.vehicle_type)}</span>
            </div>

            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-600">Vehicle Number:</span>
              <span className="text-gray-800">{renderValue(v.vehicle_no)}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Parking Slot No:</span>
              <span className="text-gray-800">{renderValue(v.parking_slot)}</span>
            </div>

          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-center italic">No Vehicle Details Found</p>
    )}
  </div>
</div>


              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default UserSetupTreeView;