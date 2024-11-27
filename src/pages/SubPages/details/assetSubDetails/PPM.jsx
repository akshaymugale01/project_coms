import React, { useEffect, useState } from "react";
import { domainPrefix, getAssetPPMs } from "../../../../api";
import { Link, useParams } from "react-router-dom";
import Table from "../../../../components/table/Table";
import { BsEye } from "react-icons/bs";
import { dateTimeFormat } from "../../../../utils/dateUtils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegFileAlt } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const PPM = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [ppmDetails, setPPMDetails] = useState([]);
  const [ppmFor, setPPMFor] = useState("schedule");
  const [ppmData, setPPMData] = useState([]);
  const [filteredPPMData, setFilteredPPMData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const fetchPPMData = async () => {
    try {
      const ppmRes = await getAssetPPMs(id);
      setFilteredPPMData(ppmRes.data.activities);
      setPPMData(ppmRes.data.activities);
      console.log(ppmRes.data.activities);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPPMDetails = async () => {
    const PPMDetailsResp = await getAssetPPMs(id);
    const filteredData = PPMDetailsResp.data.activities.filter((activity) => {
      const activityDate = formatDate(activity.start_time); // Extract date from start_time

      console.log("show date", activityDate);
      return (
        activityDate === selectedDate &&
        activity.status !== "pending" &&
        activity.status !== "overdue"
      ); // Match with the selected date and 'complete' status
    });

    console.log("logs data", filteredData);
    setPPMDetails(filteredData); // Set filtered data
  };
  useEffect(() => {
    fetchPPMData();
    fetchPPMDetails();
  }, [id]);
  useEffect(() => {
    fetchPPMDetails();
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  // Decrease date by 1 day
  const handlePrevDate = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1); // Decrease by 1 day
    setSelectedDate(prevDate.toISOString().split("T")[0]); // Update selectedDate
  };

  // Increase date by 1 day
  const handleNextDate = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1); // Increase by 1 day
    setSelectedDate(nextDate.toISOString().split("T")[0]); // Update selectedDate
  };

  // Function to format the date from start_time
  // Function to format the date from start_time
  const formatDate = (isoString) => {
    return isoString.split("T")[0]; // Extract YYYY-MM-DD part directly from ISO string
  };

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const filterByDateRange = (data) => {
    if (startDate && endDate) {
      console.log(data);
      return data.filter((item) => {
        console.log(item.start_time);
        const itemDate = new Date(item.start_time).setHours(0, 0, 0, 0);
        const start = startDate.setHours(0, 0, 0, 0);
        const end = endDate.setHours(23, 59, 59, 999);
        return itemDate >= start && itemDate <= end;
      });
    }
    return data;
  };

  const PPMColumn = [
    {
      name: "View",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/assets/routine-task-details/${id}/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
      maxWidth: "2rem",
    },
    {
      name: "Checklist",
      selector: (row) => row.checklist?.name,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => dateFormat(row.start_time),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Assigned To",
      selector: (row) => row.assigned_name,
      sortable: true,
    },
  ];
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchText.trim() === "") {
      setFilteredPPMData(ppmData);
    } else {
      const filteredResult = ppmData.filter((item) =>
        item.assigned_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredPPMData(filteredResult);
    }
  };

  const isImage = (filePath) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    const extension = filePath.split(".").pop().split("?")[0].toLowerCase();
    return imageExtensions.includes(extension);
  };
  const getFileName = (filePath) => {
    return filePath.split("/").pop().split("?")[0];
  };
  return (
    <div className="flex justify-center items-center my-10 md:p-0 p-2">
      <div className="w-full my-2">
        <div className="flex items-center gap-4 border-b border-gray-200">
          <button
            className={`font-medium ${
              ppmFor === "schedule"
                ? "text-black border-b border-black"
                : "text-gray-400"
            }`}
            onClick={() => setPPMFor("schedule")}
          >
            Schedule
          </button>
          <button
            className={`font-medium ${
              ppmFor === "logs"
                ? "border-b border-black text-black"
                : "text-gray-400"
            }`}
            onClick={() => setPPMFor("logs")}
          >
            Logs
          </button>
        </div>

        {ppmFor === "schedule" && (
          <div className="flex flex-col w-full">
            <div className="z-20 w-full flex gap-2 justify-between md:flex-row flex-col">
              <input
                type="text"
                name=""
                value={searchText}
                onChange={handleSearch}
                id=""
                placeholder="Search by assigned to"
                className="p-2 border-gray-300 rounded-md w-full  my-2 outline-none border"
              />
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setStartDate(update[0]);
                  setEndDate(update[1]);
                  setFilteredPPMData(filterByDateRange(ppmData));
                }}
                isClearable={true}
                placeholderText="Search by Date range"
                className="p-2 border-gray-300 rounded-md w-64  my-2 outline-none border"
              />
            </div>
            <Table columns={PPMColumn} data={filteredPPMData} />
          </div>
        )}

        {ppmFor === "logs" && (
          <div className="">
            <div className="flex gap-4 justify-end my-2">
              <button
                onClick={handlePrevDate}
                className="bg-gray-200 px-2 rounded-md py-2"
              >
                <HiArrowLeft />
              </button>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="p-1 border-gray-300 rounded-md w-64  outline-none border"
              />

              <button
                onClick={handleNextDate}
                className="bg-gray-200 px-2 rounded-md py-2"
              >
                <HiArrowRight />
              </button>
            </div>
            <div>
              {ppmDetails.map((task, index) => {
                // Check if there are any submissions
                const hasSubmissions =
                  task.activity_log?.submissions?.length > 0;

                // Only render the entire block if there are submissions
                return (
                  hasSubmissions && (
                    <div
                      key={task.id}
                      className="my-4 flex flex-col bg-gray-50 shadow-custom-all-sides p-4 rounded-md gap-2"
                    >
                      <div className="grid grid-cols-12">
                        <div className="col-span-11 items-center">
                          <p className="font-medium">Checklist Name :</p>
                          <p className="w-full">
                            {task.checklist?.name || "No Checklist Name"}
                          </p>
                        </div>
                      </div>

                      {task.activity_log.submissions.map(
                        (submission, subIndex) =>
                          submission && (
                            <div key={submission.id} className="my-2">
                              <div className="flex gap-4 items-center bg-green-100 mb-2 p-2 rounded-md">
                                <p className="font-medium">
                                  Question {subIndex + 1}:
                                </p>
                                <p>
                                  {submission.question?.name || "No Question"}
                                </p>
                              </div>

                              <div className="flex gap-4 items-center bg-blue-100 mb-2 p-2 rounded-md">
                                <p className="font-medium">Answer :</p>
                                <p>{submission.value || "No Answer"}</p>
                              </div>

                              <span className="font-medium text-gray-500">
                                Attachments :
                              </span>
                              <div className="flex gap-4 flex-wrap my-4 items-center text-center">
                                {submission.question_attachments?.length > 0 ? (
                                  submission.question_attachments.map(
                                    (attachment, i) => (
                                      <img
                                        key={i}
                                        src={domainPrefix + attachment.document}
                                        alt={`Attachment ${i + 1}`}
                                        className="w-40 h-28 object-cover rounded-md"
                                        onClick={() =>
                                          window.open(
                                            domainPrefix + attachment.document,
                                            "_blank"
                                          )
                                        }
                                      />
                                    )
                                  )
                                ) : (
                                  <p>No Attachments</p>
                                )}
                              </div>

                              <div className="flex justify-between">
                                <p>
                                  <span className="font-medium text-gray-500">
                                    Performed by:
                                  </span>
                                  <span className="font-medium text-gray-500">
                                    {task.assigned_name || "Unknown"}
                                  </span>
                                </p>
                                <p className="text-sm text-gray-500">
                                  {dateTimeFormat(submission.updated_at) ||
                                    "No timestamp available"}
                                </p>
                              </div>
                            </div>
                          )
                      )}

                      <p>
                        <span className="font-medium">Comment : </span>
                        <span className="text-violet-500 font-medium">
                          {task.comment ? task.comment : "No Comment"}{" "}
                        </span>
                      </p>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PPM;
