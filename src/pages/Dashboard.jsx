import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { getTicketDashboard, getVibeCalendar } from "../api";
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
const Dashboard = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const vibeUserId = getItemInLocalStorage("VIBEUSERID");
  const [feat, setFeat] = useState("");
  const [site, setSite] = useState(false);
  const [siteData, setSiteData] = useState([]);
  const dropdownRef = useRef(null);
  const [siteName, setSiteName] = useState("");
  console.log(vibeUserId);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const calendarResponse = await getVibeCalendar(vibeUserId);
        console.log(calendarResponse);
      } catch (error) {
        console.log(error);
      }
    };
    getAllowedFeatures();
    fetchCalendar();
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
    const fetchSiteData = async () => {
      try {
        const response = await getSiteData();
        setSiteData(response.data.sites);
        console.log(response.data.sites);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      console.error("Error fetching data:", error);
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
      //   style={{
      //   background: `url(${wave})`,
      //   // backgroundSize: "100% 100% ",
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "center",
      // }}
    >
      <Navbar />
      <div className=" w-full flex lg:mx-3 flex-col overflow-hidden">
        <header
          style={{ background: themeColor }}
          className="w-full h-10 rounded-md  my-1 flex justify-between items-center"
        >
          <div></div>
          <nav>
            <h1 className="text-white text-center text-xl ml-5">
              Vibe Connect
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
        <div className="m-5">
          <TicketDashboard />
        </div>
        <div className="w-full flex mx-3 flex-col p-2  ">
          <HighchartsComponent />
        </div>
        {feat.includes("soft_services") && (
          <div className="w-full flex mx-3 flex-col p-2  ">
            <h2 className="border-b-2 border-black font-medium mb-10">
              Soft Services
            </h2>
            <SoftServiceHighCharts />
          </div>
        )}
        {feat.includes("assets") && (
          <div className="w-full flex flex-col p-2  ">
            <h2 className="border-b-2 border-black font-medium mb-2">Asset</h2>
            <AssetDashboard />
          </div>
        )}

        {feat.includes("communication") && (
          <div className="w-full flex mx-3 flex-col p-2 mb-10 ">
            <h2 className="border-b-2 border-black font-medium">
              Communication
            </h2>
            <CommunicationDashboard />
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;