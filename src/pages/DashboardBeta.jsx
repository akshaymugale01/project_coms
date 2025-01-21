import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import HighchartsComponent from "../components/HighCharts";
import profile from "/vibe.jpeg";
import { getSiteAsset } from "../api";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const DashboardBeta = () => {
  const token = import.meta.env.VITE_TOKEN;
  const url = `https://reports.lockated.com/FM/custom.html?token=${token}&pms_site_id=1010&site_name=Multiple%20Sites%20Selected&society_id=3632`;

  const layout = [
    { i: "1", x: 0, y: 0, w: 4, h: 4 },
    { i: "2", x: 4, y: 0, w: 4, h: 4 },
    { i: "3", x: 8, y: 0, w: 4, h: 4 },
    { i: "4", x: 0, y: 0, w: 4, h: 4 },
    { i: "5", x: 4, y: 0, w: 4, h: 4 },
    { i: "chart1", x: 0, y: 10, w: 6.5, h: 10 },
    // Add more items as needed
  ];

  const [breakdownCount, setBreakdownCount] = useState([]);
  const [inUseCount, setInUseCount] = useState([]);
  const [totalAsset, setTotalAsset] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showData, setShowData] = useState("");
  const [breakDown, setBreakDown] = useState([]);
  const [inUse, setInUse] = useState([]);
  const [critical, setCritical] = useState([]);
  const [criticalBreakdown, setCriticalBreakdown] = useState([]);
  const [allAssets, setAllAssets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSiteAsset();
        const assets = response.data.site_assets;
        setFilteredData(assets);
        setTotalAsset(assets.length);
        const sortedData = assets.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        const breakdownAssets = assets.filter(
          (asset) => asset.breakdown === true
        );
        const inUseAssets = assets.filter((asset) => asset.breakdown === false);
        const criticalAsset = assets.filter((asset) => asset.critical === true);
        const criticalBreakdownAsset = assets.filter(
          (asset) => asset.critical === true && asset.breakdown === true
        );
        setAllAssets(assets);
        setBreakDown(breakdownAssets);
        setInUse(inUseAssets);
        setBreakdownCount(breakdownAssets.length);
        setCritical(criticalAsset.length);
        console.log(breakdownAssets.length);
        setInUseCount(inUseAssets.length);
        setCriticalBreakdown(criticalBreakdownAsset.length);
      } catch (error) {
        console.error("Error fetching siteAsset data:", error);
      }
    };
    fetchData();
  }, []);

  const showFilteredAssets = () => {
    if (showData === "breakdown") {
      setFilteredData(breakDown);
    } else if (showData === "inUse") {
      setFilteredData(inUse);
    } else {
      setFilteredData(allAssets);
    }
  };

  useEffect(() => {
    showFilteredAssets();
  }, [showData, allAssets, inUse, breakDown]);

  const chartOptions = {
    title: {
      text: "Sample Chart",
    },
    series: [
      {
        data: [1, 2, 3, 4, 5],
      },
    ],
  };
  return (
    <section className="flex w-screen">
      <Navbar />
      {/* <div className=" w-full flex lg:mx-3 flex-col overflow-hidden">
      <iframe
        src={url}
        title="Report"
       
        className='h-screen w-screen'
      />
      </div> */}
      <GridLayout
        className=""
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        isResizable={true}
        isDraggable={true}
      >
        <div
          key="1"
          className="bg-gradient-to-r from-red-700 via-red-500 to-pink-900 shadow-custom-all-sides flex flex-col text-white text-xl gap-5 rounded-lg items-center justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-white font-medium text-center flex flex-col">
              Total Asset Available
            </p>
            <p className="bg-white p-2 px-4 rounded-full text-black font-medium text-center w-44">
              {totalAsset}
            </p>
          </div>
        </div>
        <div
          key="2"
          className="bg-gradient-to-r from-green-700 to-green-500 shadow-custom-all-sides flex flex-col text-white text-xl gap-5 rounded-lg items-center justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-white font-medium text-center flex flex-col">
              Assets In Use
            </p>
            <p className="bg-white p-2 px-4 rounded-full text-black font-medium text-center w-44">
              {inUseCount}
            </p>
          </div>
        </div>
        <div
          key="3"
          className="bg-gradient-to-r from-red-500 to-red-300 shadow-custom-all-sides flex flex-col text-white text-xl gap-5 rounded-lg items-center justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-white font-medium text-center flex flex-col">
              Assets In Breakdown
            </p>
            <p className="bg-white p-2 px-4 rounded-full text-black font-medium text-center w-44">
              {breakdownCount}
            </p>
          </div>
        </div>
        <div
          key="4"
          className="bg-gradient-to-r from-orange-500 to-red-300 shadow-custom-all-sides flex flex-col text-white text-xl gap-5 rounded-lg items-center justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-white font-medium text-center flex flex-col">
              Critical Assets
            </p>
            <p className="bg-white p-2 px-4 rounded-full text-black font-medium text-center w-44">
              {critical}
            </p>
          </div>
        </div>
        <div
          key="5"
          className="bg-gradient-to-r from-orange-500 to-red-300 shadow-custom-all-sides flex flex-col text-white text-xl gap-5 rounded-lg items-center justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-white font-medium text-center flex flex-col">
             Critical Assets In Breakdown 
            </p>
            <p className="bg-white p-2 px-4 rounded-full text-black font-medium text-center w-44">
              {criticalBreakdown}
            </p>
          </div>
        </div>
       
     </GridLayout>
    </section>
  );
};

export default DashboardBeta;
