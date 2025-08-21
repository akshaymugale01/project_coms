import { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Navbar from "../../components/Navbar";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
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
      <div className="flex flex-col w-full mt-3">
        {/* Top Row: Sidebar Button + Tabs */}
        <div className="flex">
          {/* Sidebar Toggle Button */}
          <div className="ml-2">
            <button
              onClick={() => {
                setIsSidebarOpen(true);
                fetchUserById(); // optional if data isn't already loaded
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
            >
              Open Profile
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 sm:rounded-full rounded-md opacity-90 bg-gray-200 mx-auto">
            {[
              "ServiceDesk",
              "Visitors",
              "Amenities Bookings",
              "Communication",
            ].map((tab) => (
              <h2
                key={tab}
                className={`px-9 py-2 rounded-full cursor-pointer text-center transition-all duration-300 ease-linear ${
                  page === tab
                    ? "bg-white text-blue-500 shadow-custom-all-sides"
                    : "text-gray-700"
                }`}
                onClick={() => setPage(tab)}
              >
                {tab}
              </h2>
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
        <div className="fixed top-0 ml-10 left-10 h-screen md:w-1/3 bg-white shadow-lg overflow-y-auto z-50 transition-transform duration-300">
          <div className="p-6 h-full flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="self-end mb-4 text-gray-500 hover:text-gray-700"
            >
              ✕ Close
            </button>

            {/* Profile Header */}
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={"No profile found"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {userData.firstname || "No data"}{" "}
                  {" " + userData.lastname || "No data"}
                </h2>
                <p className="text-sm text-gray-500">
                  {userData.department || ""}
                </p>
              </div>
            </div>

            {/* Personal Info */}
            <div className="mb-6">
              <div className="border text-center">
                <h3 className="text-md font-bold text-gray-700 m-2">
                  Personal Information
                </h3>
              </div>
              <div className="space-y-1 text-gray-700 mt-4">
                <p>
                  <span className="font-semibold">Contact No:</span>{" "}
                  {userData.mobile || "No data"}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {userData.email || ""}
                </p>
                <p>
                  <span className="font-semibold">Occupation:</span>{" "}
                  {userData.occupation || ""}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {userData.status || ""}
                </p>
              </div>
            </div>

            {/* Family Members */}
            <div className="mb-6">
              <div className="border text-center">
                <h3 className="text-md font-bold text-gray-700 m-2">
                  Family Members
                </h3>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-5">
                {/*  {user.family.map((member, index) => ( */}
                <li>
                  {/* {member.name}{" "} */}
                  <span className="text-gray-500">
                    {userData.family_member || ""}
                    {/* ({member.relation} || "") */}
                  </span>
                </li>
                {/* ))} */}
              </ul>
            </div>

            {/* Access Rights (Optional) */}
            {/* <div>
          <div className="border text-center">
            <h3 className="text-md font-bold text-gray-700 m-2">Access Rights</h3>
          </div>
          <div className="space-y-1 text-sm text-gray-700 mt-5">
            <p><span className="font-semibold">Parking Slot:</span> {user.access.parking}</p>
            <p><span className="font-semibold">Gym Access:</span> {user.access.gym}</p>
            <p><span className="font-semibold">Clubhouse Access:</span> {user.access.clubhouse}</p>
          </div>
        </div> */}
          </div>
        </div>
      )}
    </section>
  );
};

export default UserSetupTreeView;
