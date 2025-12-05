import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { FaDownload } from "react-icons/fa";
import Detail from "../../../containers/Detail";
import {
  generateVibeMeetingSummary,
  getVibeMeetingDetails,
  vibeMedia,
} from "../../../api";
import { useParams } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import Table from "../../../components/table/Table";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import MeetingSummaryModal from "../../../containers/modals/MeetingSummaryModal";
import MeetingTaskModal from "../../../containers/modals/MeetingTaskModal";

const MeetingDetails = () => {
  const { id } = useParams();

  const [meetingDetail, setMeetingDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState({});
  const [summaryModal, setSummaryModal] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [completed_task, setcompleted_task] = useState([]);
  const user_id = getItemInLocalStorage("VIBEUSERID");
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const detailsResp = await getVibeMeetingDetails(user_id, id);
        console.log(detailsResp);
        setMeetingDetail(detailsResp.data);
        setIsLoading(false);
        setSummary(detailsResp.summery);
        console.log(detailsResp.summery.meet_summery);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const meetingDetails = [
    { title: "Title :", description: meetingDetail.title },
    { title: "Date :", description: meetingDetail.from_date },
    { title: "Start Time :", description: meetingDetail.from_time },
    { title: "End Time :", description: meetingDetail.to_time },
    {
      title: "Status :",
      description: meetingDetail.status_complete ? "Completed" : "Upcoming",
    },
    { title: "Purpose :", description: meetingDetail.purpose },
  ];

  const columns = [
    {
      name: "Name",
      selector: (row) => row.firstname + " " + row.lastname,
      sortable: true,
    },

    {
      name: "Phone No.",
      selector: (row) => row.phone_no,
      sortable: true,
    },
    {
      name: "Email id",
      selector: (row) => row.email,
      sortable: true,
    },
  ];

  const GenerateSummary = async (id) => {
    const user_id = getItemInLocalStorage("VIBEUSERID");

    const formData = new FormData();
    formData.append("meet_id", id);
    formData.append("user_id", user_id);
    try {
      toast.loading("Generating Summary Please wait...");
      const summaryResp = await generateVibeMeetingSummary(formData);
      console.log(summaryResp);
      toast.dismiss();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again later");
    }
  };
  const externalParticipant = meetingDetail?.other_participant_email;
  const emailArray = externalParticipant
    ? externalParticipant.split(",").filter((email) => email.trim() !== "")
    : [];
  console.log(emailArray);

  const downloadFile = (filePath) => {
    toast.loading("File Downloading...");
    fetch(filePath)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute(
          "download",
          filePath.substring(filePath.lastIndexOf("/") + 1)
        );
        document.body.appendChild(link);
        link.click();
        toast.dismiss();
        toast.success("File downloaded Successfully");

        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        toast.error("Something Went Wrong Please Try Again later");
      });
  };

  function filterAndSplitString(inputString) {
    if (inputString) {
      const filteredString = inputString.replace(/[^\w\d,]+/g, " ");
      const resultArray = filteredString.split(",");
      return resultArray;
    } else {
      return [];
    }
  }
  const onOpenTask = (task) => {
    setcompleted_task(filterAndSplitString(task));
    console.log(task);

    setIsTaskOpen(true);
  };
  const onCloseTask = () => {
    setIsTaskOpen(false);
  };

  const themeColor = useSelector((state) => state.theme.color);
  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col justify-around ">
          <Detail heading={"Meeting Details"} details={meetingDetails} />
          <div className="my-5">
            <div className="border border-gray-500 my-2" />
            <div className="flex  md:flex-row flex-col md:items-center justify-end gap-4 mx-2">
              {meetingDetail?.status_complete && (
                <>
                  {!meetingDetail?.meeting_processed ? (
                    <button
                      className="border-2 border-black p-1 px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-300 rounded-md font-medium"
                      onClick={() => GenerateSummary(id)}
                    >
                      Generate Summary
                    </button>
                  ) : (
                    <>
                      <button
                        className="border-2 border-black p-1 px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-300 rounded-md font-medium"
                        onClick={() => setSummaryModal(true)}
                      >
                        Summary
                      </button>

                      <button
                        className="border-2 border-black p-1 px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-300 rounded-md font-medium"
                        onClick={() => onOpenTask(summary.meet_tasks)}
                      >
                        Task
                      </button>

                      <button
                        className="border-2 border-black p-1 px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-300 rounded-md font-medium flex items-center justify-center gap-2"
                        onClick={() =>
                          downloadFile(vibeMedia + "/" + summary.meet_video)
                        }
                      >
                        <FaDownload />
                        Meeting Video
                      </button>

                      <button
                        className="border-2 border-black p-1 px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-300 rounded-md font-medium flex items-center justify-center gap-2"
                        onClick={() =>
                          downloadFile(
                            vibeMedia + "/" + summary.meet_transcript
                          )
                        }
                      >
                        <FaDownload />
                        Meeting Transcript
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="border border-gray-500 my-2" />
            <div className="my-5 mx-2">
              <h2 className="text-lg font-medium mx-2">
                Internal Attendees List
              </h2>
              <Table
                responsive
                columns={columns}
                data={meetingDetail.participant}
              />
            </div>
            <div className="flex flex-col m-2 border-2 border-gray-300 p-2 rounded-md">
              <h2 className="font-medium text-lg">External Attendees Email:</h2>
              {emailArray.length !== 0 ? (
                <p className="flex gap-2 flex-wrap">
                  {emailArray.map((email, index) => (
                    <span
                      key={index}
                      style={{ background: themeColor }}
                      className="bg-green-800 w-fit p-1 px-4 shadow-custom-all-sides rounded-full text-white"
                    >
                      {email}
                    </span>
                  ))}
                </p>
              ) : (
                <p className="font-medium text-center">
                  No External Attendees Invited
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <DNA
            visible={true}
            height="120"
            width="120"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
      {summaryModal && (
        <MeetingSummaryModal
          onclose={() => setSummaryModal(false)}
          meetingTitle={meetingDetail.title}
          meetingDate={meetingDetail.from_date}
          startTime={meetingDetail.from_time}
          endTime={meetingDetail.to_time}
          summaryData={summary.meet_summery}
        />
      )}
      {isTaskOpen && (
        <MeetingTaskModal
          onclose={() => setIsTaskOpen(false)}
          meetingTitle={meetingDetail.title}
          meetingDate={meetingDetail.from_date}
          startTime={meetingDetail.from_time}
          endTime={meetingDetail.to_time}
          meetingTask={completed_task}
          themeColor={themeColor}
        />
      )}
    </>
  );
};

export default MeetingDetails;
