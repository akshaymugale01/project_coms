import React, { useEffect, useState } from "react";
import { domainPrefix, getBroadcastDetails } from "../../../api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegFileAlt } from "react-icons/fa";
import { getItemInLocalStorage } from "../../../utils/localStorage";

const BroadcastDetails = () => {
  const [broadcastDetails, setBroadcastDetails] = useState([]);
  const userFisrt = getItemInLocalStorage("name");
  const userLast = getItemInLocalStorage("LASTNAME");
  const baseUrl = domainPrefix;
  const { id } = useParams();
  useEffect(() => {
    const fetchBroadcastDetails = async () => {
      try {
        const broadcastDetailsResp = await getBroadcastDetails(id);
        console.log(broadcastDetailsResp);
        setBroadcastDetails(broadcastDetailsResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBroadcastDetails();
  }, [id]);

  const dateFormat = (dateSting) => {
    const date = new Date(dateSting);
    return date.toLocaleString();
  };
  const themeColor = "rgb(3, 19 , 37)";

  const isImage = (filePath) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    const extension = filePath.split(".").pop().split("?")[0].toLowerCase();
    return imageExtensions.includes(extension);
  };
  const getFileName = (filePath) => {
    return filePath.split("/").pop().split("?")[0];
  };
  return (
    <section>
      <div className="m-2">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-semibold p-2 rounded-full text-white"
        >
          Broadcast Details
        </h2>
        <div className="my-2 mb-10 md:border-2 p-2 rounded-md border-gray-400 md:mx-20">
          <div className="flex justify-center m-5">
            <h1
              style={{ background: themeColor }}
              className="p-2 px-4 text-xl text-white rounded-md font-semibold"
            >
              {broadcastDetails.notice_title}
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">Description:</p>

            <div
              className="border-dotted border-2 rounded-md border-gray-400 p-3 text-left w-full break-words whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: broadcastDetails.notice_discription || "",
              }}
            />
          </div>

          <div className="grid  md:grid-cols-3 gap-4 my-4">
            <div className="grid grid-cols-2">
              <p className="font-medium ">Created By : </p>
              <p className="">
                {broadcastDetails.created_by}
              </p>
            </div>
            {/* <div className="grid grid-cols-2">
              <p className="font-medium ">Status Type:</p>
              <p className=""></p>
            </div> */}
            <div className="grid grid-cols-2">
              <p className="font-medium">Share With: </p>
              <p>
                {broadcastDetails.shared === "all"
                  ? "All"
                  : broadcastDetails.group_id
                  ? `Group: ${broadcastDetails.group_name || "Unknown"}`
                  : broadcastDetails.users && broadcastDetails.users.length > 0
                  ? "Individual"
                  : "Unknown"}
              </p>

              <p className=""></p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium ">Created On:</p>
              <p className="">{dateFormat(broadcastDetails.created_at)}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium ">End Date & Time :</p>
              <p className=" ">{dateFormat(broadcastDetails.expiry_date)}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium ">Important:</p>
              <p className="">{broadcastDetails.important ? "Yes" : "No"}</p>
            </div>
          </div>
          <div className="my-2 ">
            <p className="font-bold border-b-2 border-black my-2">
              Attachments
            </p>
            <div className="flex flex-wrap gap-4">
              {Array.isArray(broadcastDetails?.notice_image) &&
              broadcastDetails?.notice_image.length > 0 ? (
                broadcastDetails?.notice_image
                  .filter(
                    (img) => img && typeof img === "object" && img.document_url
                  )
                  .map((img, idx) => (
                    <img
                      key={idx}
                      src={baseUrl + img.document_url}
                      alt={`attachment-${idx}`}
                      className="w-40 h-44 object-cover rounded border"
                    />
                  ))
              ) : (
                <span className="text-gray-500">No images available</span>
              )}
            </div>
          </div>
          <div className="my-5">
            <p className="font-bold">Shared Members List</p>
            <p className="border-dashed border border-gray-400 p-2">
              {broadcastDetails.users && broadcastDetails.users.length > 0 ? (
                broadcastDetails.users.map((user) => (
                  <div key={user.id} className="user-item">
                    <p className="font-medium">Name: {user.name}</p>
                    <p>User ID: {user.user_id}</p>
                  </div>
                ))
              ) : (
                <p>No users to display</p>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BroadcastDetails;
