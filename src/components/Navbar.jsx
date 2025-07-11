import React, { useEffect, useState } from "react";
import { HiMenuAlt3, HiOutlineIdentification } from "react-icons/hi";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { menus } from "../utils/menus";
import { PiFiles, PiSignOutBold } from "react-icons/pi";
import { getItemInLocalStorage } from "../utils/localStorage";
import {
  FaFaceGrinTongueSquint,
  FaMoneyBill1Wave,
  FaMoneyBillTrendUp,
} from "react-icons/fa6";
import image from "/profile.png";
import {
  BsBroadcast,
  BsBuilding,
  BsCheckCircle,
  BsFileRuled,
  BsMailboxFlag,
  BsMoon,
  BsPass,
  BsPersonCircle,
  BsPersonWorkspace,
  BsSun,
  BsTicketPerforated,
  BsXCircle,
} from "react-icons/bs";
import {
  MdFastfood,
  MdManageAccounts,
  MdOutlineDashboard,
  MdOutlinePolicy,
  MdOutlineSocialDistance,
  MdOutlineStarRate,
} from "react-icons/md";
import { HiBellAlert, HiMiniTicket, HiMiniUser } from "react-icons/hi2";
import {
  RiBillLine,
  RiReservedLine,
  RiSettings4Line,
  RiUserLocationFill,
} from "react-icons/ri";
import { LuSettings2 } from "react-icons/lu";
import {
  IoBusinessOutline,
  IoCashOutline,
  IoDocumentTextOutline,
  IoFastFoodOutline,
  IoFitness,
} from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import {
  AiOutlineAudit,
  AiOutlineFieldTime,
  AiOutlineUser,
} from "react-icons/ai";
import { TiBusinessCard } from "react-icons/ti";
import {
  FaBirthdayCake,
  FaBriefcaseMedical,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCar,
  FaDollarSign,
  FaFileInvoice,
  FaFileWord,
  FaRegFile,
  FaRegFileAlt,
  FaRegFilePowerpoint,
  FaTasks,
  FaUser,
  FaUserFriends,
  FaWrench,
} from "react-icons/fa";
import { IoIosPeople, IoMdSettings } from "react-icons/io";
import { useSelector } from "react-redux";
import { ImFileText2 } from "react-icons/im";
import { FcMoneyTransfer } from "react-icons/fc";
import { GrCertificate } from "react-icons/gr";
import { persistor } from "../store/store";
import { LucideParkingSquare } from "lucide-react";
import {
  getAmenitiesBooking,
  getAmenityBookNotification,
  getVibeBackground,
  markNotificationAsRead,
} from "../api";
import { toast } from "react-toastify";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [feat, setFeat] = useState("");
  const navigate = useNavigate();
  const themeColor = useSelector((state) => state.theme.color);
  const fontSize = useSelector((state) => state.fontSize);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [lastNotificationIds, setLastNotificationIds] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [lastFetchedCount, setLastFetchedCount] = useState(0);
  const countNotification = getItemInLocalStorage("shownNotificationIds");
  const [bgImage ,setBgImage] = useState("")

  // console.log("asfd", countNotification);

  // const fetchNotifications = async () => {
  //   try {
  //     const response = await getAmenityBookNotification();
  //     const notifications = response.data?.notifications || [];

  //     console.log("Fetched notifications:", notifications);

  //     const unreadNotifications = notifications.filter(
  //       (notification) => notification.read === "0"
  //     );

  //     setNotifications(unreadNotifications);
  //     setLoading(false);

  //     setNewNotificationCount(unreadNotifications.length);
  //   } catch (error) {
  //     console.error("Error fetching notifications:", error);
  //   }
  // };

  const SHOWN_NOTIFICATION_KEY = "shownNotificationIds";
  const getShownNotificationIds = () => {
    try {
      const stored = localStorage.getItem(SHOWN_NOTIFICATION_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

      useEffect(() => {
        const BgImage = async () => {
          const resp = await getVibeBackground();
          console.log("resp", resp);
          const image = resp?.data[2]?.image;
          setBgImage(image);
        };
        BgImage();
      }, []);

  const fetchNotifications = async () => {
    try {
      const response = await getAmenityBookNotification();
      const fetched = response.data?.notifications || [];

      const unread = fetched.filter((n) => n.read === "0");
      setNotifications(fetched);

      const shownIds = getShownNotificationIds();
      const newUnread = unread.filter((n) => !shownIds.includes(n.id));

      if (newUnread.length > 0) {
        newUnread.forEach((notif) => {
          toast.info(`🔔 ${notif.message}`);
        });

        const updatedIds = [
          ...new Set([...shownIds, ...newUnread.map((n) => n.id)]),
        ];
        localStorage.setItem(
          SHOWN_NOTIFICATION_KEY,
          JSON.stringify(updatedIds)
        );
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // On Repeat
  //   useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchNotifications();
  //   }, 30000); // every 30 seconds

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleBellClick = async () => {
    if (!popupOpen) {
      setLoading(true);
      await fetchNotifications();
    }
    setPopupOpen(!popupOpen);
  };

  const handleNotificationClick = async (id) => {
    try {
      await markNotificationAsRead(id);
      // Optionally update local state for UI feedback
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: "1" } : n))
      );
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".notification-dropdown") && popupOpen) {
        setPopupOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [popupOpen]);

  // const unreadCount = countNotification?.length;
  const unreadCount = notifications.filter((n) => n.read === "0").length;

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };
  const presentStatus = true;
  const currentTime = new Date().getHours();

  useEffect(() => {
    const userType = getItemInLocalStorage("USERTYPE");
    setUser(userType);

    // console.log("feattures",feat);

    getAllowedFeatures();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("COMPANYID");
    localStorage.removeItem("HRMSORGID");
    localStorage.removeItem("board_id");
    localStorage.removeItem("menuState");
    localStorage.removeItem("Name");
    localStorage.removeItem("LASTNAME");
    localStorage.removeItem("USERTYPE");
    localStorage.removeItem("user");
    localStorage.removeItem("UNITID");
    localStorage.removeItem("Building");
    localStorage.removeItem("categories");
    localStorage.removeItem("SITEID");
    localStorage.removeItem("STATUS");
    localStorage.removeItem("complaint");
    localStorage.removeItem("UserId");
    localStorage.removeItem("VIBETOKEN");
    localStorage.removeItem("VIBEUSERID");
    localStorage.removeItem("VIBEORGID");
    localStorage.removeItem("FEATURES");
    localStorage.removeItem("shownNotificationIds");
    persistor.purge(["board"]).then(() => {
      navigate("/login");
      // window.location.reload();
    });
    // navigate("/login");
    // window.location.reload();
  };
  const siteId = getItemInLocalStorage("SITEID");
  const UserType = getItemInLocalStorage("USERTYPE");

  const getAllowedFeatures = () => {
    const storedFeatures = getItemInLocalStorage("FEATURES");
    // console.log("ffaf", storedFeatures);
    if (storedFeatures) {
      setFeat(storedFeatures.map((feature) => feature.feature_name));
    }
  };

  const firstName = getItemInLocalStorage("Name");
  const lastName = getItemInLocalStorage("LASTNAME");
  const handleNavigation = () => {
    // Replace this with your actual URL
    const url =
      "https://reports.lockated.com/FM/index.html?token=74805184912721105b2b2c64a3dd62d50a16931e6f08edab&pms_site_id=1010,2628,2630,2631,2632,2642,2643,2644,2645,2662,2663,2664,2665,2666,2667,2668,2714,2718,2719,2748,2770,2773,2793,2794,2803,2808,2814,2822&site_name=Multiple%20Sites%20Selected&society_id=3632,3712,3716,3719,3720,3734,null,3735,3736,3732,null,3729,3730,3728,null,null,3727,3747,3726,null,3766,null,3779,3780,3784,3786,3785,null";
    window.location.href = url;
  };
  return (
    <section className="flex gap-6 sticky top-0 left-0 bottom-0 h-screen z-20">
      <div
        style={{
          background: "rgb(3 19 37)",
          // background: `url(${bgImage})`
        }}
        className={`p-[8px] max-h-screen ${
          open ? "w-full md:w-60" : "w-20"
        } duration-500 text-gray-100 px-4 shadow-2xl overflow-y-auto h-screen custom-scrollbar left-0`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="py-3 gap-3 flex justify-between items-center">
          {/* Bell Icon */}
          <div className="relative cursor-pointer" onClick={handleBellClick}>
            <HiBellAlert className="text-lg font-semibold" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            )}
          </div>

          {/* Sidebar Menu Toggle */}
          <HiMenuAlt3
            size={26}
            className={`cursor-pointer transition-transform duration-200 ${
              open ? "rotate-90" : ""
            }`}
            onClick={() => setSidebarOpen(!open)} // sidebar state, NOT affecting popupOpen
          />
        </div>

        {/* Notification Dropdown */}
        {popupOpen && (
          <div className="absolute p-3 right-0 mt-2 w-64 bg-gray-700 border rounded shadow-lg z-50 max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif.id)}
                  className={`p-3 border-b last:border-0 rounded-md text-gray-500 cursor-pointer hover:bg-green-200 ${
                    notif.read === "0"
                      ? "hover:bg-blue-300 text-white font-semibold"
                      : ""
                  }`}
                >
                  {notif.message}
                </div>
              ))
            )}
          </div>
        )}

        <div className="flex flex-col h-full gap-4 mb-5 relative">
          {/* admin */}
          {user === "pms_admin" && (
            <>
              {/* <Link  className=" text-white" >
          
        </Link> */}
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive
                      ? `flex p-2 gap-3.5 rounded-md group items-center font-medium text-sm`
                      : `group flex items-center gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md text-sm`
                  }`
                }
              >
                <div>{React.createElement(BsPersonCircle, { size: "25" })}</div>
                <h2
                  className={`whitespace-pre duration-300 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {firstName} {lastName}
                </h2>

                {/* <div className="flex gap-3 items-center bg-white p-1 rounded-full px-2">
                  {presentStatus ? (
                    <p className="font-bold text-green-500 " title="Present">
                      P
                    </p>
                  ) : (
                    <p className="font-bold text-red-500 " title="Absent">
                      A
                    </p>
                  )}

                  {currentTime >= 6 && currentTime < 18 ? (
                    <BsSun className="text-yellow-500" size={18} title="Day" />
                  ) : (
                    <BsMoon className="text-gray-500" size={18} title="Night" />
                  )}
                </div> */}

                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {firstName} {lastName}
                </h2>
              </NavLink>

              <NavLink
                to={"/dashboard"}
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? `text-black bg-white flex p-2  gap-3.5 rounded-md group items-center  font-medium text-sm`
                      : ` group flex items-center  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md text-sm`
                  }`
                }
              >
                <div>
                  {React.createElement(MdOutlineDashboard, { size: "20" })}
                </div>
                <h2
                  className={`whitespace-pre duration-300 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  Dashboard
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  Dashboard
                </h2>
              </NavLink>
              {/* {feat.includes("face_recognition") && (
                <NavLink
                  to={"/reports"}
                  // to={"https://reports.lockated.com/FM/index.html?token=74805184912721105b2b2c64a3dd62d50a16931e6f08edab&pms_site_id=1010,2628,2630,2631,2632,2642,2643,2644,2645,2662,2663,2664,2665,2666,2667,2668,2714,2718,2719,2748,2770,2773,2793,2794,2803,2808,2814,2822&site_name=Multiple%20Sites%20Selected&society_id=3632,3712,3716,3719,3720,3734,null,3735,3736,3732,null,3729,3730,3728,null,null,3727,3747,3726,null,3766,null,3779,3780,3784,3786,3785,null"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? `text-black bg-white flex p-2  gap-3.5 rounded-md group items-center  font-medium `
                        : ` group flex items-center  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md text-sm`
                    }`
                  }
                >
                  <div>
                    {React.createElement(MdOutlineDashboard, { size: "20" })}
                  </div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Dashboard(Beta)
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Dashboard(Beta)
                  </h2>
                </NavLink>
              )} */}

              <>
                {/* {feat.includes("project_task") && (
                  <NavLink
                    to={"/project-management"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? `text-black bg-white flex p-2  gap-3.5 rounded-md group items-center  font-medium text-sm`
                          : ` group flex items-center  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md text-sm`
                      }`
                    }
                  >
                    <div>
                      {React.createElement(MdManageAccounts, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Project Management
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Project management
                    </h2>
                  </NavLink>
                )} */}
                {/* {feat.includes("project_task") && (
                  <NavLink
                    to={"/Task-management"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>{React.createElement(FaTasks, { size: "20" })}</div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Task Management
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Task management
                    </h2>
                  </NavLink>
                )} */}
                {/* {feat.includes("calendar") && (
                  <NavLink
                    to={"/calendar"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(FaCalendarCheck, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Calendar
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Calendar
                    </h2>
                  </NavLink>
                )} */}
                {feat.includes("service_tickets") && (
                  <NavLink
                    to={"/tickets"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(BsTicketPerforated, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Service Desk
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Service Desk
                    </h2>
                  </NavLink>
                )}
                {/* {feat.includes("additional-services") && (
                  <NavLink
                    to={"/additional-services"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(BsTicketPerforated, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Additional Services
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Additional Services
                    </h2>
                  </NavLink>
                )} */}
                {feat.includes("additional-services") && (
                  <NavLink
                    to={"/additional-services"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(FaFileInvoice, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Additional Services
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Additional Services
                    </h2>
                  </NavLink>
                )}

                {feat.includes("skill_grow") && (
                  <NavLink
                    to={"/admin/skill-grow"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(GrCertificate, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Skill Grow
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Skill Grow
                    </h2>
                  </NavLink>
                )}
                {feat.includes("face_recognition") && (
                  <NavLink
                    to={"/attendance"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(BsFileRuled, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Attendance
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Attendance
                    </h2>
                  </NavLink>
                )}
                {UserType !== "security_guard" &&
                  feat.includes("communication") && (
                    <NavLink
                      to={"/communication/events"}
                      className={({ isActive }) =>
                        ` ${
                          isActive
                            ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                            : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                        }`
                      }
                    >
                      <div>
                        {React.createElement(BsBroadcast, { size: "20" })}
                      </div>
                      <h2
                        className={`whitespace-pre duration-300 ${
                          !open && "opacity-0 translate-x-28 overflow-hidden"
                        }`}
                      >
                        Communication
                      </h2>
                      <h2
                        className={`${
                          open && "hidden"
                        } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                      >
                        Communication
                      </h2>
                    </NavLink>
                  )}
                {feat.includes("meeting") && (
                  <NavLink
                    to={"/meetings"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(IoIosPeople, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Meeting
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Meeting
                    </h2>
                  </NavLink>
                )}

                {feat.includes("amenities") && (
                  <NavLink
                    to={"/bookings"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(AiOutlineFieldTime, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Amenities
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Amenities
                    </h2>
                  </NavLink>
                )}

                {/* {feat.includes("about_us") && (
                  <NavLink
                    to={"/about_us"}
                    className={({ isActive }) =>
                      ` ${isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(AiOutlineFieldTime, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                        }`}
                    >
                      About Us
                    </h2>
                    <h2
                      className={`${open && "hidden"
                        } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      About Us
                    </h2>
                  </NavLink>
                )} */}
                {feat.includes("business_cards") && (
                  <NavLink
                    to={"/admin/business-card"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(TiBusinessCard, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Business Card
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Business Card
                    </h2>
                  </NavLink>
                )}
                {feat.includes("incidents") && (
                  <NavLink
                    to={"/admin/incidents"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(FaFileInvoice, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Incidents
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Incidents
                    </h2>
                  </NavLink>
                )}

                {feat.includes("bookings_request") && (
                  <NavLink
                    to={"/admin/booking-request"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(FaCalendarAlt, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Booking & Request
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Booking & Request
                    </h2>
                  </NavLink>
                )}
                {feat.includes("doctors") && (
                  <NavLink
                    to={"/doctor-appointments"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(FaBriefcaseMedical, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Doctor Appointment
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Doctor Appointment
                    </h2>
                  </NavLink>
                )}
                {feat.includes("insurances") && (
                  <NavLink
                    to={"/insurance"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(MdOutlinePolicy, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Insurance
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Insurance
                    </h2>
                  </NavLink>
                )}
                {feat.includes("additional-service-OSR") && (
                  <NavLink
                    to={"/ors-dashboard"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(RiReservedLine, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Additional Services(OSR)
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Additional Services(OSR)
                    </h2>
                  </NavLink>
                )}
                {feat.includes("fitout") && (
                  <NavLink
                    to={"/fitout/setup/page"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(FaWrench, {
                        size: "20",
                      })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Fit Out
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Fit Out
                    </h2>
                  </NavLink>
                )}
                {feat.includes("document_pro") && (
                  <NavLink
                    to={"/documents"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(IoDocumentTextOutline, {
                        size: "20",
                      })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Document Pro
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Document Pro
                    </h2>
                  </NavLink>
                )}

                {feat.includes("hrms") && (
                  <NavLink
                    to={"/admin/hrms/dashboard"}
                    // to={"/admin/hrms/employee-onboarding"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(FaUserFriends, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      HRMS
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      HRMS
                    </h2>
                  </NavLink>
                )}
                {feat.includes("gatepass") && (
                  <NavLink
                    to={"/admin/passes"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>{React.createElement(BsPass, { size: "20" })}</div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Passes
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Passes
                    </h2>
                  </NavLink>
                )}
                {feat.includes("contacts") && (
                  <NavLink
                    to={"/business"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(IoBusinessOutline, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Contact Book
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Contact Book
                    </h2>
                  </NavLink>
                )}
                {feat.includes("birthday") && (
                  <NavLink
                    to={"/birthday"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(FaBirthdayCake, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Birthday
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Birthday
                    </h2>
                  </NavLink>
                )}
                {feat.includes("permits") && (
                  <NavLink
                    to={"/admin/permit"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(FaRegFileAlt, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Permit
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Permit
                    </h2>
                  </NavLink>
                )}
                {feat.includes("audits") && (
                  <NavLink
                    to={"/admin/audit"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(AiOutlineAudit, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Audit
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Audit
                    </h2>
                  </NavLink>
                )}

                {feat.includes("assets") && (
                  <NavLink
                    to={"/assets"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>{React.createElement(BsBuilding, { size: "20" })}</div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Asset
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Asset
                    </h2>
                  </NavLink>
                )}

                {feat.includes("soft_services") && (
                  <NavLink
                    to={"/services"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(LuSettings2, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Soft Services
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Soft Services
                    </h2>
                  </NavLink>
                )}
                {feat.includes("fnb") && (
                  <NavLink
                    to={"/admin/fb"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(IoFastFoodOutline, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      F&B
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      F&B
                    </h2>
                  </NavLink>
                )}
                {feat.includes("mailroom") && (
                  <NavLink
                    to={"/mail-room"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(BsMailboxFlag, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Mail Room
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Mail Room
                    </h2>
                  </NavLink>
                )}
                {feat.includes("field_sense") && (
                  <NavLink
                    to={"/admin/field-sense-meeting"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(RiUserLocationFill, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Field Sense
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Field Sense
                    </h2>
                  </NavLink>
                )}
                {feat.includes("transport") && (
                  <NavLink
                    to={"/admin/transportation"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>{React.createElement(FaCar, { size: "20" })}</div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Transportation
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Transportation
                    </h2>
                  </NavLink>
                )}
                {feat.includes("integration") && (
                  <NavLink
                    to={"/integration"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(MdOutlineSocialDistance, {
                        size: "20",
                      })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Integration
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Integration
                    </h2>
                  </NavLink>
                )}

                {feat.includes("purchase_order") && (
                  <NavLink
                    to={"/admin/purchase"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>{React.createElement(PiFiles, { size: "20" })}</div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Purchase
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Purchase
                    </h2>
                  </NavLink>
                )}

                {feat.includes("work_order") && (
                  <NavLink
                    to={"/admin/service-pr"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>{React.createElement(PiFiles, { size: "20" })}</div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Service PR/WO
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Service PR/WO
                    </h2>
                  </NavLink>
                )}

                {feat.includes("vendors") && (
                  <NavLink
                    to={"/suppliers"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(AiOutlineUser, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Suppliers
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Suppliers
                    </h2>
                  </NavLink>
                )}

                {feat.includes("bills_pay") && (
                  <NavLink
                    to={"/admin/bill-pay"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>{React.createElement(RiBillLine, { size: "20" })}</div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Bill Pay
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Bill Pay
                    </h2>
                  </NavLink>
                )}

                {feat.includes("personal_finance") && (
                  <NavLink
                    to={"/admin/advance-salary-request"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(FcMoneyTransfer, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Advance Salary
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Advance Salary
                    </h2>
                  </NavLink>
                )}

                {feat.includes("other_bills") && (
                  <NavLink
                    to={"/admin/other-bills"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(ImFileText2, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Other Bills
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Other Bills
                    </h2>
                  </NavLink>
                )}

                {/* {feat.includes("personal_finance") && (
                  <NavLink
                    to={"/personal-finance"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(FaMoneyBillTrendUp, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Personal Financial
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Personal Financial
                    </h2>
                  </NavLink>
                )} */}

                {feat.includes("fitness") && (
                  <NavLink
                    to={"/admin/fitness"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>{React.createElement(IoFitness, { size: "20" })}</div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Fitness
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Fitness
                    </h2>
                  </NavLink>
                )}

                {/* {feat.includes("cam_bill") && ( */}
                {feat.includes("cam_bill") && (
                  <NavLink
                    to={"/admin/cam-billing"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(FaMoneyBill1Wave, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      CAM Billing
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      CAM Billing
                    </h2>
                  </NavLink>
                )}

                {feat.includes("parking") && (
                  <NavLink
                    to={"/admin/parking"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(LucideParkingSquare, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Parking
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Parking
                    </h2>
                  </NavLink>
                )}
              </>
              {/* } */}

              {siteId === 25 && (
                <NavLink
                  to={"/setup/users-setup"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>
                    {React.createElement(AiOutlineUser, { size: "20" })}
                  </div>

                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Users
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Users
                  </h2>
                </NavLink>
              )}
            </>
          )}

          {/* user */}
          {user !== "pms_admin" && (
            <>
              {/* {siteId === 25 ? */}
              <NavLink
                // to={`/profile`}
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? `flex p-2  gap-3.5 rounded-md group items-center  font-medium`
                      : // ? `text-black bg-white flex p-2  gap-3.5 rounded-md group items-center  font-medium ${fontSize}`
                        ` group flex items-center  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md text-sm`
                  }`
                }
              >
                <div>{React.createElement(BsPersonCircle, { size: "25" })}</div>
                <h2
                  className={`whitespace-pre duration-300 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {firstName} {lastName}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {firstName} {lastName}
                </h2>
              </NavLink>
              {siteId === 10 && (
                <NavLink
                  to={"/employee/dashboard"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>
                    {React.createElement(MdOutlineDashboard, { size: "20" })}
                  </div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Dashboard
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Dashboard
                  </h2>
                </NavLink>
              )}
              {feat.includes("project_task") && (
                <NavLink
                  to={"/project-management"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? `text-black bg-white flex p-2  gap-3.5 rounded-md group items-center  font-medium text-sm`
                        : ` group flex items-center  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md text-sm`
                    }`
                  }
                >
                  <div>
                    {React.createElement(MdManageAccounts, { size: "20" })}
                  </div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Project Management
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Project management
                  </h2>
                </NavLink>
              )}
              {feat.includes("task_management") && (
                <NavLink
                  to={"/Task-management"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>{React.createElement(FaTasks, { size: "20" })}</div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Task Management
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Task management
                  </h2>
                </NavLink>
              )}

              {feat.includes("calendar") && (
                <NavLink
                  to={"/calendar"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>
                    {React.createElement(FaCalendarCheck, { size: "20" })}
                  </div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Calendar
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Calendar
                  </h2>
                </NavLink>
              )}
              {feat.includes("my_tickets") && (
                <NavLink
                  to={"/mytickets"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>{React.createElement(HiMiniTicket, { size: "20" })}</div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    My Ticket
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    My Ticket
                  </h2>
                </NavLink>
              )}
              {feat.includes("skill_grow") && (
                <NavLink
                  to={"/employee/certificate"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>
                    {React.createElement(GrCertificate, { size: "20" })}
                  </div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Skill Grow
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Skill Grow
                  </h2>
                </NavLink>
              )}
              {feat.includes("hrms") && (
                <NavLink
                  to={"/employee-portal"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>
                    {React.createElement(BsPersonWorkspace, { size: "20" })}
                  </div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    MyWorkplace
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Calendar
                  </h2>
                </NavLink>
              )}
              {feat.includes("face_recognition") && (
                <NavLink
                  to={"/employee-attendance"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>{React.createElement(BsFileRuled, { size: "20" })}</div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Attendance
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Attendance
                  </h2>
                </NavLink>
              )}
              {UserType !== "security_guard" &&
                feat.includes("communication") && (
                  <NavLink
                    to={"/employee/communication/events"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(BsBroadcast, { size: "20" })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Communication
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Communication
                    </h2>
                  </NavLink>
                )}
              {feat.includes("meeting") && (
                <NavLink
                  to={"/meetings"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>{React.createElement(IoIosPeople, { size: "20" })}</div>

                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Meeting
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Meeting
                  </h2>
                </NavLink>
              )}

              {UserType !== "security_guard" &&
                feat.includes("workspace_bookings") && (
                  <NavLink
                    to={"/employees/booking"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(AiOutlineFieldTime, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Workspace Bookings
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Bookings
                    </h2>
                  </NavLink>
                )}
              {UserType !== "security_guard" &&
                feat.includes("business_cards") && (
                  <NavLink
                    to={"/employees/businesscard"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(TiBusinessCard, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Business Card
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Business Card
                    </h2>
                  </NavLink>
                )}
              {/* {feat.includes("bookings") && (
                <NavLink
                  to={"/employee/booking-request"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>
                    {React.createElement(FaCalendarAlt, { size: "20" })}
                  </div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Booking & Request
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Booking & Request
                  </h2>
                </NavLink>
              )} */}
              {feat.includes("doctors") && (
                <NavLink
                  to={"/doctor-appointments"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>
                    {React.createElement(FaBriefcaseMedical, { size: "20" })}
                  </div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Doctor Appointment
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Doctor Appointment
                  </h2>
                </NavLink>
              )}
              {feat.includes("insurances") && (
                <NavLink
                  to={"/insurance"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>
                    {React.createElement(MdOutlinePolicy, { size: "20" })}
                  </div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Insurance
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Insurance
                  </h2>
                </NavLink>
              )}
              {UserType !== "security_guard" &&
                feat.includes("document_pro") && (
                  <NavLink
                    to={"/documents"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(IoDocumentTextOutline, {
                        size: "20",
                      })}
                    </div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Document Pro
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Document Pro
                    </h2>
                  </NavLink>
                )}

              {feat.includes("gatepass") && (
                <NavLink
                  to={"/employee/passes"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>{React.createElement(BsPass, { size: "20" })}</div>

                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Passes
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Passes
                  </h2>
                </NavLink>
              )}
              {feat.includes("birthday") && (
                <NavLink
                  to={"/birthday"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>
                    {React.createElement(FaBirthdayCake, { size: "20" })}
                  </div>

                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Birthday
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Birthday
                  </h2>
                </NavLink>
              )}
              {feat.includes("pantry") && (
                <NavLink
                  to={"/employees/pantry"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>{React.createElement(MdFastfood, { size: "20" })}</div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Pantry
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Pantry
                  </h2>
                </NavLink>
              )}
              {feat.includes("field_sense") && (
                <NavLink
                  to={"/employee/field-sense-meeting"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>
                    {React.createElement(RiUserLocationFill, { size: "20" })}
                  </div>
                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Field Sense
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Field Sense
                  </h2>
                </NavLink>
              )}
              {feat.includes("transport") && (
                <NavLink
                  to={"/employees/transportation"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>{React.createElement(FaCar, { size: "20" })}</div>

                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Transportation
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Transportation
                  </h2>
                </NavLink>
              )}

              {feat.includes("parking") && (
                <NavLink
                  to={"/employees/parking"}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                        : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                    }`
                  }
                >
                  <div>
                    {React.createElement(LucideParkingSquare, { size: "20" })}
                  </div>

                  <h2
                    className={`whitespace-pre duration-300 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Parking
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    Parking
                  </h2>
                </NavLink>
              )}

              {/* : */}
              <>
                {/* {feat.includes("hrms") && (
                  <NavLink
                    to={"/hrms-onboarding"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>{React.createElement(FaUser, { size: "20" })}</div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      HRMS
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      HRMS
                    </h2>
                  </NavLink>
                )} */}

                {UserType !== "security_guard" && feat.includes("bills") && (
                  <NavLink
                    to={"/employee/bill-pay"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>{React.createElement(RiBillLine, { size: "20" })}</div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Bill Pay
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Bill Pay
                    </h2>
                  </NavLink>
                )}
                {feat.includes("personal_finance") && (
                  <NavLink
                    to={"/personal-finance"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(FaMoneyBillTrendUp, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Personal Financial
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Personal Financial
                    </h2>
                  </NavLink>
                )}
                {UserType !== "security_guard" &&
                  feat.includes("advance_salary") && (
                    <NavLink
                      to={"/employee/advance-salary"}
                      className={({ isActive }) =>
                        ` ${
                          isActive
                            ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                            : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                        }`
                      }
                    >
                      <div>
                        {React.createElement(FcMoneyTransfer, { size: "20" })}
                      </div>
                      <h2
                        className={`whitespace-pre duration-300 ${
                          !open && "opacity-0 translate-x-28 overflow-hidden"
                        }`}
                      >
                        Advance Salary
                      </h2>
                      <h2
                        className={`${
                          open && "hidden"
                        } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                      >
                        Advance Salary
                      </h2>
                    </NavLink>
                  )}
                {feat.includes("integration") && (
                  <NavLink
                    to={"/integration"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(MdOutlineSocialDistance, {
                        size: "20",
                      })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Integration
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Integration
                    </h2>
                  </NavLink>
                )}

                {feat.includes("fitness") && (
                  <NavLink
                    to={"/employee/fitness"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>{React.createElement(IoFitness, { size: "20" })}</div>
                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Fitness
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Fitness
                    </h2>
                  </NavLink>
                )}
                {UserType !== "security_guard" && feat.includes("salary") && (
                  <NavLink
                    to={"/employee-salary"}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                          : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                      }`
                    }
                  >
                    <div>
                      {React.createElement(IoCashOutline, { size: "20" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Salary
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      Salary
                    </h2>
                  </NavLink>
                )}
              </>
              {/* } */}
            </>
          )}
          {user === "pms_admin" && siteId !== 25 && (
            <NavLink
              to={"/setup"}
              className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                    : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                }`
              }
            >
              <div>{React.createElement(RiSettings4Line, { size: "20" })}</div>
              <h2
                className={`whitespace-pre duration-300 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Setup
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                Setup
              </h2>
            </NavLink>
          )}
          <div className="border border-white" />
          <div className=" ">
            <NavLink
              to={"/settings"}
              className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black bg-white flex p-2  gap-3.5 rounded-md group items-center text-sm font-medium"
                    : " group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md "
                }`
              }
            >
              <div>{React.createElement(IoMdSettings, { size: "20" })}</div>
              <h2
                className={`whitespace-pre duration-300 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Settings
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                Settings
              </h2>
            </NavLink>
            <button
              onClick={handleLogout}
              className="font-semibold flex items-center rounded-md px-2 py-2 hover:bg-white hover:text-black transition-all duration-300 ease-in-out my-2 gap-4"
            >
              <PiSignOutBold size={20} />
              {open && "Logout"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
