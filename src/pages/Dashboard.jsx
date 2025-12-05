import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { getTicketDashboard, getVibeBackground } from "../api";
import {
  getItemInLocalStorage,
  setItemInLocalStorage,
} from "../utils/localStorage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import wave from "/wave.png";
import HighchartsComponent from "../components/HighCharts";
import TicketDashboard from "./SubPages/TicketDashboard";
import CommunicationDashboard from "./SubPages/CommunicationDashboard";
import SoftServiceHighCharts from "../components/SoftServicesHighCharts";
import { getSiteData, siteChange } from "../api";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import AssetDashboard from "./SubPages/AssetDashboard";
import VisitorsDashboard from "./SubPages/Projectmanagement/VisitorsDashboard";
import VisitorsAnalyticsDashboard from "./SubPages/Projectmanagement/VisitorsAnalyticsDashboard";
import ChecklistAnalyticsDashboard from "./SubPages/ChecklistAnalyticsDashboard";
import TicketAnalyticsDashboard from "./SubPages/TicketAnalyticsDashboard";
import AssetAnalyticsDashboard from "./SubPages/AssetAnalyticsDashboard";
import CommunicationAnalyticsDashboard from "./SubPages/CommunicationAnalyticsDashboard";
import HRMSDashboard from "./AdminHrms/HRMSDashboard";
import OSRDashboard from "./OSR/OSRDashboard";
import SkillGrowDashboard from "./SkillGrow/SkillGrowDashboard";
const Dashboard = () => {
  const themeColor = useSelector((state) => state.theme.color);
  // const vibeUserId = getItemInLocalStorage("UserId");
  const [feat, setFeat] = useState("");
  const [site, setSite] = useState(false);
  const [siteData, setSiteData] = useState([]);
  const dropdownRef = useRef(null);
  const [siteName, setSiteName] = useState("");
  const [bgImage, setBgImage] = useState("");
  // console.log(vibeUserId);
  const contentRef = useRef(null);

  useEffect(() => {
    // const fetchCalendar = async () => {
    //   try {
    //     const calendarResponse = await getVibeCalendar(vibeUserId);
    //     console.log(calendarResponse);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    getAllowedFeatures();
    // fetchCalendar();
  }, []);

  useEffect(() => {
    const BgImage = async () => {
      const resp = await getVibeBackground();
      console.log("resp", resp);
      const image = resp?.data[1]?.image;
      setBgImage(image);
    };
    BgImage();
  }, []);

  const getAllowedFeatures = () => {
    const storedFeatures = getItemInLocalStorage("FEATURES");
    if (storedFeatures) {
      setFeat(storedFeatures.map((feature) => feature.feature_name));
    }
  };

  const toggleFullScreen = () => {
    const element = contentRef.current;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      element.requestFullscreen().catch((err) => {
        console.log(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    }
  };
  // const currentDate = new Date();
  // const datePickerRef = useRef(null);
  // const [dueDate, setDueDate] = useState(null);
  // const handleDateChange1 = async (date) => {
  //   setDueDate(date); // Update the selected date in the state
  //   Update_Task_Duedate(user_id, taskid, date);
  // };

  const toggleSite = () => {
    setSite(!site);
  };

  useEffect(() => {
    const fetchSiteData = async (retry = 0) => {
      try {
        const response = await getSiteData();
        setSiteData(response?.data?.sites);
        console.log("Site Data", response?.data?.sites);
      } catch (error) {
        if (retry < 3) {
          setTimeout(() => {
            console.error("Error fetching Site data:", error);
            fetchSiteData(retry + 1);
          }, 100);
        } else {
          console.error(
            "Failed to fetch site data after 3 attempts, please check your internet connection",
            error
          );
        }
      }
    };
    fetchSiteData();
  }, []);

  const site_name = getItemInLocalStorage("SITENAME");
  const handleSiteChange = async (id, site) => {
    try {
      const response = await siteChange(id);
      setItemInLocalStorage("SITEID", id);
      setItemInLocalStorage("SITENAME", site);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching sitechange data:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSite(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <section
      className="flex"
      ref={contentRef}
      style={{
        // background: `url(${bgImage || wave})`,
        background: `rgb(3 19 37)`,
        // backgroundSize: "100% 100% ",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <div className=" w-full flex lg:mx-3 flex-col bg-gray-900 overflow-hidden">
        <header
          style={{ background: "rgb(17, 24, 39)" }}
          className="w-full h-10 rounded-md  my-1 flex justify-between items-center"
        >
          <div></div>
          <nav>
            <h1 className="text-white text-center text-xl ml-5">
              {/* Dashboard Name */}
            </h1>
          </nav>

          <div className="relative" ref={dropdownRef}>
            <div
              onClick={toggleSite}
              className="cursor-pointer flex items-center gap-2 font-medium p-2 text-white"
            >
              <FaBuilding />
              {/* <h2>{siteName}</h2> */}
              <h2>{site_name}</h2>
              <div className="">
                {site
                  ? React.createElement(MdExpandLess, { size: "30" })
                  : React.createElement(MdExpandMore, { size: "30" })}
              </div>
            </div>
            {site && (
              <div className="absolute right-0 bg-white border-2 rounded shadow-md max-h-80 w-80 overflow-y-auto z-10 px-5 space-y-2 py-2">
                {siteData.map((site, index) => (
                  <button
                    key={site.id}
                    onClick={() => {
                      handleSiteChange(site.id, site.name_with_region);
                      setSiteName(site.name_with_region);
                    }}
                    className="hover:text-gray-300"
                  >
                    {site.name_with_region}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>
        {/* Tickets Dashboard */}
        <div className="m-5">
          <h2 className="text-white text-xl font-semibold mb-3">Tickets Dashboard</h2>
          <div className="bg-gray-800 p-5 rounded-lg shadow-custom-all-sides">
            <TicketDashboard />
          </div>
        </div>

        {/* Ticket Analytics Dashboard */}
        {/* <div className="m-5">
          <h2 className="text-white text-xl font-semibold mb-3">Ticket Analytics</h2>
          <div className="bg-gray-900 p-5 rounded-lg shadow-custom-all-sides">
            <TicketAnalyticsDashboard />
          </div>
        </div> */}

           {/* Highcharts Component */}
        <div className="m-5">
          <h2 className="text-white text-xl font-semibold mb-3">Tickect Analytics</h2>
          <div className="bg-gray-800 p-5 rounded-lg shadow-custom-all-sides">
            <HighchartsComponent />
          </div>
        </div>
        {/* Visitors Dashboard */}
        <div className="m-5">
          <h2 className="text-white text-xl font-semibold mb-3">Visitors Dashboard</h2>
          <div className="bg-gray-800 p-5 rounded-lg shadow-custom-all-sides">
            <VisitorsDashboard />
          </div>
        </div>

        {/* Visitors Analytics Dashboard - Comprehensive Charts */}
        <div className="m-5">
          <h2 className="text-white text-xl font-semibold mb-3">Visitors Analytics</h2>
          <div className="bg-gray-900 p-5 rounded-lg shadow-custom-all-sides">
            <VisitorsAnalyticsDashboard />
          </div>
        </div>

        {/* Checklist Analytics Dashboard */}
        <div className="m-5">
          <h2 className="text-white text-xl font-semibold mb-3">Checklist Analytics</h2>
          <div className="bg-gray-900 p-5 rounded-lg shadow-custom-all-sides">
            <ChecklistAnalyticsDashboard />
          </div>
        </div>

        {/* Assets Dashboard - includes charts */}
        {/* {feat.includes("assets") && (
          <div className="m-5">
            <h2 className="text-white text-xl font-semibold mb-3">Assets Dashboard</h2>
            <AssetDashboard />
          </div>
        )} */}

        {/* Asset Analytics Dashboard */}
        {feat.includes("assets") && (
          <div className="m-5">
            <h2 className="text-white text-xl font-semibold mb-3">Asset Analytics</h2>
            <div className="bg-gray-900 p-5 rounded-lg shadow-custom-all-sides">
              <AssetAnalyticsDashboard />
            </div>
          </div>
        )}

        {/* HRMS Dashboard - includes charts */}
        {feat.includes("hrms") && (
          <div className="m-5">
            <h2 className="text-white text-xl font-semibold mb-3">HRMS Dashboard</h2>
            <HRMSDashboard />
          </div>
        )}

        {/* OSR Dashboard - includes info cards and tables */}
        {feat.includes("osr") && (
          <div className="m-5">
            <h2 className="text-white text-xl font-semibold mb-3">OSR (On-Site Request)</h2>
            <OSRDashboard />
          </div>
        )}

        {/* SkillGrow Dashboard - includes charts and cards */}
        {feat.includes("skill_grow") && (
          <div className="m-5">
            <h2 className="text-white text-xl font-semibold mb-3">SkillGrow Dashboard</h2>
            <SkillGrowDashboard />
          </div>
        )}

     

        {/* Soft Services Dashboard */}
        {feat.includes("soft_services") && (
          <div className="m-5">
            <h2 className="text-white text-xl font-semibold mb-3">Soft Services</h2>
            <div className="bg-gray-800 p-5 rounded-lg shadow-custom-all-sides">
              <SoftServiceHighCharts />
            </div>
          </div>
        )}

        {/* Communication Dashboard */}
        {/* {feat.includes("communication") && (
          <div className="m-5">
            <h2 className="text-white text-xl font-semibold mb-3">Communication</h2>
            <div className="bg-gray-800 p-5 rounded-lg shadow-custom-all-sides">
              <CommunicationDashboard />
            </div>
          </div>
        )} */}

        {/* Communication Analytics Dashboard */}
        {feat.includes("communication") && (
          <div className="m-5">
            <h2 className="text-white text-xl font-semibold mb-3">Communication Analytics</h2>
            <div className="bg-gray-900 p-5 rounded-lg shadow-custom-all-sides">
              <CommunicationAnalyticsDashboard />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
