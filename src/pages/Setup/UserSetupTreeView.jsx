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
  const [sites, setSites] = useState([]);
  const [units, setUnits] = useState([]);
  const [userData, setUserData] = useState([]);
  // const users = getItemInLocalStorage("UserId");
  const { id } = useParams();

  console.log(id);
  const fetchUserById = async () => {
    try {
      const user = await getUsersByID(id); // example ID
      console.log("Fetched user:", user.data);
      setUserData(user.data[0]); // or whatever state you're updating
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserById();
    }
  }, [id]);

  console.log("User data", userData);
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
          {/* Add other page components as needed */}
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-screen w-full md:w-2/5 lg:w-1/3 bg-white shadow-2xl overflow-y-auto z-50 transform transition-transform duration-300">
            <div className="h-full flex flex-col">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">User Profile</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <span className="text-2xl">✕</span>
                  </button>
                </div>
                <button
                  onClick={() => navigate(`/setup/users-edit-page/${id}`)}
                  className="w-full px-4 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                >
                  Edit User Details
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">

                {/* Profile Header */}
                <div className="flex items-center space-x-4 mb-6 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {userData.firstname?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">
                      {userData.firstname || "No data"}{" "}
                      {userData.lastname || ""}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {userData.department || "No department"}
                    </p>
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
                        <span className="text-gray-800">{userData.mobile || "Not provided"}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold text-gray-600 w-32 flex-shrink-0">📧 Email:</span>
                        <span className="text-gray-800 break-all">{userData.email || "Not provided"}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold text-gray-600 w-32 flex-shrink-0">🎂 Birth Date:</span>
                        <span className="text-gray-800">{userData.birth_date || "Not provided"}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold text-gray-600 w-32 flex-shrink-0">💼 Occupation:</span>
                        <span className="text-gray-800">{userData.occupation || "Not provided"}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold text-gray-600 w-32 flex-shrink-0">✅ Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          userData.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}>
                          {userData.status || "Unknown"}
                        </span>
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
                    {userData.family_member ? (
                      <ul className="space-y-2">
                        <li className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                            👤
                          </span>
                          <span className="text-gray-700">{userData.family_member}</span>
                        </li>
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-center py-4 italic">
                        No family members have been added
                      </p>
                    )}
                  </div>
                </div>

                {/* Access Rights (Optional) */}
                {/* <div>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-t-lg">
                    <h3 className="text-lg font-bold">Access Rights</h3>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-b-lg p-4 shadow-sm">
                    <div className="space-y-2">
                      <p><span className="font-semibold">Parking Slot:</span> {user.access.parking}</p>
                      <p><span className="font-semibold">Gym Access:</span> {user.access.gym}</p>
                      <p><span className="font-semibold">Clubhouse Access:</span> {user.access.clubhouse}</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default UserSetupTreeView;
