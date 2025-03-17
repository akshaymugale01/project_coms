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
  const themeColor = useSelector((state) => state.theme.color);

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
            <p className="border-dotted border-2 rounded-md border-gray-400 p-3 text-left w-full break-words whitespace-pre-line">
              {broadcastDetails.notice_discription}
            </p>
          </div>

          <div className="grid  md:grid-cols-3 gap-4 my-4">
            <div className="grid grid-cols-2">
              <p className="font-medium ">Created By : </p>
              <p className="">
                {userFisrt}
                {userLast}
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
            {broadcastDetails.notice_image &&
              broadcastDetails.notice_image.length > 0 && (
                <div className="rounded-md ">
                  {isImage(
                    domainPrefix + broadcastDetails.notice_image[0].document
                  ) ? (
                    <img
                      src={
                        domainPrefix + broadcastDetails.notice_image[0].document
                      }
                      alt="event image"
                      className="rounded-md max-h-52"
                      onClick={() =>
                        window.open(
                          domainPrefix +
                            broadcastDetails.notice_image[0].document,
                          "_blank"
                        )
                      }
                    />
                  ) : (
                    <a
                      href={
                        domainPrefix + broadcastDetails.notice_image[0].document
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" hover:text-blue-400 transition-all duration-300  text-center flex flex-col items-center"
                    >
                      <FaRegFileAlt size={50} />
                      {getFileName(broadcastDetails.notice_image[0].document)}
                    </a>
                  )}
                </div>
              )}
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
