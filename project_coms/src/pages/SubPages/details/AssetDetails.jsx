import React, { useEffect, useState } from "react";
import {
  AMCDetails,
  ActivityFeed,
  Assetinfo,
  History,
  PPM,
  Readings,
} from "./assetSubDetails";
import { getSiteAssetDetails } from "../../../api";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import AssetDetailsLogs from "./assetSubDetails/AssetDetailsLogs";
import CostOfOwnership from "./assetSubDetails/CostOfOwnership";
import AssetsDetailsAssociated from "./assetSubDetails/AssetsDetailsAssociated";

const AssetDetails = () => {
  const [page, setPage] = useState("assetInfo");
  const [asset, setAsset] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const details = await getSiteAssetDetails(id);
        setAsset(details.data);
      } catch (error) {
        console.error("Error fetching site asset details:", error);
      }
    };

    getDetails();
  }, [id]);
  console.log("asset", asset)

  return (
    // <section className="md:px-10 ">
    //   <div className="p-4 w-full my-2 flex mx-5 flex-col ">
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <div className="md:flex justify-center ">
          <div className="sm:flex grid grid-cols-2 flex-row gap-2 md:gap-10  font-medium p-2 rounded-md sm:rounded-full bg-gray-100">
            <h2
              className={`p-1 ${
                page === "assetInfo" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
              onClick={() => setPage("assetInfo")}
            >
              Asset Info
            </h2>
            <h2
              className={`p-1 ${
                page === "AMCDetails" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              onClick={() => setPage("AMCDetails")}
            >
              AMC Details
            </h2>
            <h2
              className={`p-1 ${
                page === "readings" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              onClick={() => setPage("readings")}
            >
              Readings
            </h2>
            <h2
              className={`p-1 ${
                page === "ppm" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              onClick={() => setPage("ppm")}
            >
              PPM
            </h2>
            {/* <h2
              className={`p-1 ${
                page === "logs" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              onClick={() => setPage("logs")}
            >
              Logs
            </h2> */}
            {/* <h2
              className={`p-1 ${
                page === "activityFeed" && "bg-white text-blue-500"
              } rounded-full  cursor-pointer text-center`}
              onClick={() => setPage("activityFeed")}
            >
              Activity Feed
            </h2> */}
            {/* <h2
              className={`p-1 ${
                page === "history" && "bg-white text-blue-500"
              } rounded-full px-4 cursor-pointer text-center`}
              onClick={() => setPage("history")}
            >
              History Card
            </h2> */}
            {/* <h2
              className={`p-1 ${
                page === "costOfOwnership" && "bg-white text-blue-500"
              } rounded-full px-4 cursor-pointer text-center`}
              onClick={() => setPage("costOfOwnership")}
            >
              Cost Of Ownership
            </h2>
            <h2
              className={`p-1 ${
                page === "associated" && "bg-white text-blue-500"
              } rounded-full px-4 cursor-pointer text-center`}
              onClick={() => setPage("associated")}
            >
              Associated Assets
            </h2> */}
          </div>
        </div>
        {page === "assetInfo" && (
          <div>
            <Assetinfo assetData={asset} />
          </div>
        )}
        {page === "AMCDetails" && (
          <div>
            <AMCDetails />
          </div>
        )}
        {page === "readings" && (
          <div>
            <Readings />
          </div>
        )}
        {page === "ppm" && (
          <div>
            <PPM />
          </div>
        )}
        {page === "activityFeed" && (
          <div>
            <ActivityFeed />
          </div>
        )}
         {page === "logs" && (
          <div>
            <AssetDetailsLogs />
          </div>
        )}
        {page === "history" && (
          <div>
            <History />
          </div>
        )}
        {page === "costOfOwnership" && (
          <div>
            <CostOfOwnership />
          </div>
        )}
        {page === "associated" && (
          <div>
            <AssetsDetailsAssociated />
          </div>
        )}
      </div>
    </section>
  );
};

export default AssetDetails;
