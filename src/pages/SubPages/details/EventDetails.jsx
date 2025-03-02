import React, { useEffect, useState } from "react";
import { BiCalendarExclamation, BiLike } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import wave from "/wave.png";
import { HiLocationMarker } from "react-icons/hi";
import { domainPrefix, getEventsDetails } from "../../../api";
import { useParams } from "react-router-dom";
import { FaRegFileAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../../utils/localStorage";

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState([]);
  const userFirst = getItemInLocalStorage("Name");
  const userLast = getItemInLocalStorage("LASTNAME");
  const { id } = useParams();
  const formattedDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventDetailsResp = await getEventsDetails(id);
        console.log(eventDetailsResp);
        setEventDetails(eventDetailsResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEventDetails();
  }, [id]);

  console.log("Details:", eventDetails)
  const isImage = (filePath) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    const extension = filePath.split(".").pop().split("?")[0].toLowerCase();
    return imageExtensions.includes(extension);
  };
  const getFileName = (filePath) => {
    return filePath.split("/").pop().split("?")[0];
  };

  const themeColor = useSelector((state) => state.theme.color)
  return (
    <section>
      <div className="m-2">
        <h2 style={{ background: "rgb(19 27 38)" }} className="text-center text-xl font-bold p-2 bg-black rounded-full text-white">
          Event Details
        </h2>
        <div className="my-2 mb-10 border-2 p-2 rounded-md border-gray-400">
          <div className="my-5 flex flex-col sm:grid gap-2 grid-cols-12  border-2 sm:mx-5 p-2 rounded-md border-gray-400">
            {eventDetails.event_image && eventDetails.event_image.length > 0 && (
              <div className="rounded-md col-span-6 sm:max-h-[28rem] w-full">
                {isImage(domainPrefix + eventDetails.event_image[0].document) ? (
                  <img
                    src={domainPrefix + eventDetails.event_image[0].document}
                    alt="event image"
                    className="rounded-md col-span-6 sm:max-h-[28rem] w-full cursor-pointer"
                    onClick={() => window.open(domainPrefix + eventDetails.event_image[0].document, "_blank")}
                  />
                ) : (<a
                  href={domainPrefix + eventDetails.event_image[0].document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:text-blue-400 transition-all duration-300  text-center flex flex-col items-center"
                >
                  <FaRegFileAlt size={50} />
                  {getFileName(eventDetails.event_image[0].document)}
                </a>)}
              </div>
            )}
            <div className="col-span-6 py-2 px-4 rounded-md bg-gray-100">
              <h1 className="text-2xl font-semibold text-center">
                {eventDetails.event_name}
              </h1>
              <div className="flex flex-col gap-5 w-full justify-around my-2">
                <p className="text-lg font-medium">Created By: {userFirst}{userLast}</p>
                <div className="flex flex-col gap-5">
                  <p className="flex gap-1 items-center font-medium">
                    <HiLocationMarker /> Location: <div> {eventDetails.venue} </div>
                  </p>

                  <div className="grid grid-cols-2">
                    <p className="flex gap-1 items-center font-medium">
                      <BiCalendarExclamation /> Start Date & Time:
                    </p>
                    <p>{formattedDate(eventDetails.start_date_time)}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="flex gap-1 items-center font-medium">
                      <BiCalendarExclamation /> End Date & Time:
                    </p>
                    <p>{formattedDate(eventDetails.end_date_time)}</p>
                  </div>

                  {/* <p className="flex gap-1 items-center font-medium">
                    <BiLike /> Coming :
                  </p> */}
                  <div className="flex gap-2">
                    <p className="font-bold me-2">RSVP :</p>
                    <p
                      className={`font-semibold ${eventDetails.rsvp_enabled ? "text-green-500" : "text-red-500"}`}
                    >
                      {eventDetails.rsvp_enabled ? "Yes" : "No"}
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mx-10 m-5">
            <div className="flex flex-col gap-2">
              <p className="font-medium">Description:</p>
              <p className="border-dotted border-2 rounded-md border-gray-400 p-2">
                {eventDetails.discription}
              </p>
            </div>


            <div>
              <div>
                <h1 className="text-xl font-semibold">Shared With (Member)</h1>
                <div className="border-dotted border-2 rounded-md border-gray-400 p-2">
                  {eventDetails.users && eventDetails.users.length > 0 ? (
                    eventDetails.users.map((user) => (
                      <div key={user.id} className="user-item">
                        <p className="font-medium">Name: {user.name}</p>
                        <p>User ID: {user.user_id}</p>
                      </div>
                    ))
                  ) : (
                    <p>No users to display</p>
                  )}
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold">Shared With (Group)</h1>
                <div className="border-dotted border-2 rounded-md border-gray-400 p-2">
                  {eventDetails.group_id || 'Na'}
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Feedback</h1>
              <div className="border-dotted border-2 rounded-md border-gray-400 p-2">

              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
