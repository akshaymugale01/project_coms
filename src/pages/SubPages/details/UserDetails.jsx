import React, { useEffect, useState } from "react";
import Detail from "../../../containers/Detail";
import { editComplaintsDetails, getComplaintsDetails } from "../../../api";
import { useParams } from "react-router-dom";
import moment from "moment";
import { BiAngry, BiEdit, BiHappy, BiSad, BiSmile } from "react-icons/bi";
import toast from "react-hot-toast";
import ReopenModal from "../../../containers/modals/ReopenModal";
import TicketCloseModal from "../../../containers/modals/CloseModal";
import { MdOutlineSentimentNeutral } from "react-icons/md";
import { useSelector } from "react-redux";

const UserDetails = () => {
  // const navigate = useNavigate()
  const { id } = useParams();
  const [ticketinfo, setTicketInfo] = useState([]);
  const [modal, setModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [reopenStatusId, setReopenStatusId] = useState("");
  const [closeStatusId, setCloseStatusID] = useState("");
  const themeColor = useSelector((state) => state.theme.color);
  const [formData, setFormData] = useState({
    comment: "",
    of_phase: "pms",
    documents: [],
  });
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const FileChange = async (event) => {
    const files = event.target.files;
    const base64Array = [];

    for (const file of files) {
      const base64 = await convertFileToBase64(file);
      base64Array.push(base64);
    }
    console.log("Array base64-", base64Array);
    const formattedBase64Array = base64Array.map((base64) => {
      return base64.split(",")[1];
    });
    console.log("Format", formattedBase64Array);
    setFormData({
      ...formData,
      documents: formattedBase64Array,
    });
  };
  const saveEditDetails = async () => {
    if (!formData.comment) {
      return toast.error("Please add a comment. Thanks. ");
    }
    try {
      const updatedData = {
        complaint_log: {
          complaint_id: id,
          comment: formData.comment,
        },
        complaint_comment: {
          docs: formData.documents,
        },
      };
      await editComplaintsDetails(updatedData);
      setFormData({
        comment: "",
        documents: [],
      });

      console.log("Edited Ticket Details:", updatedData);
      toast.success("Updated Successfully");
    } catch (error) {
      console.error("Error Saving in details update: ", error);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await getComplaintsDetails(id);
      console.log(response.data);
      setTicketInfo(response.data);
      setReopenStatusId(response.data.reopen_status_id);
      setCloseStatusID(response.data.close_status_id);
    };
    fetchDetails();
  }, [formData.comment]);

  const getTimeAgo = (timestamp) => {
    const createdTime = moment(timestamp);
    const now = moment();
    const diff = now.diff(createdTime, "minutes");
    if (diff < 60) {
      return `${diff} minutes ago`;
    } else if (diff < 1440) {
      return `${Math.floor(diff / 60)} hours ago`;
    } else {
      return `${Math.floor(diff / 1440)} days ago`;
    }
  };

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust the format as needed
  };

  const smielyRating = [
    { icon: <BiAngry size={30} />, defaultColor: "red" },
    { icon: <BiSad size={30} />, defaultColor: "orange" },
    { icon: <MdOutlineSentimentNeutral size={30} />, defaultColor: "black" },
    { icon: <BiSmile size={30} />, defaultColor: "grey" },
    { icon: <BiHappy size={30} />, defaultColor: "green" },
  ];

  const ticketDetails = [
    { title: "Site Owner  :", description: ticketinfo.responsible_person },
    { title: "Ticket No  :", description: ticketinfo.ticket_number },
    { title: "Title  :", description: ticketinfo.heading },
    { title: "Status  :", description: ticketinfo.issue_status },
    { title: "Site  :", description: ticketinfo.site_name },
    { title: "Issue Type  :", description: ticketinfo.issue_type },
    { title: "Assigned To  :", description: ticketinfo.assigned_to },
    { title: "Building Name  :", description: ticketinfo.building_name },
    // { title: "Customer Name:", description: ticketinfo.customer },
    { title: "Floor Name  :", description: ticketinfo.floor_name },
    { title: "Unit :", description: ticketinfo.unit },
    { title: "Category  :", description: ticketinfo.category_type },

    { title: "Sub category  :", description: ticketinfo.sub_category },

    { title: "Total time  :", description: getTimeAgo(ticketinfo.created_at) },

    { title: "Created By  :", description: ticketinfo.created_by },
    { title: "Created On  :", description: dateFormat(ticketinfo.created_at) },
    { title: "Updated On  :", description: dateFormat(ticketinfo.updated_at) },
    // {title: "Rating :", description : ticketinfo.rating === 1 ?  <BiAngry size={0}  style={{ color: "red" }} /> :ticketinfo.rating === 2 ? <BiSad size={50} /> : ticketinfo.rating === 3 ?<MdOutlineSentimentNeutral size={50} /> : ticketinfo.rating === 4 ?  <BiSmile size={50} />: ticketinfo.rating === 5 ? <BiHappy size={30} /> : null }
    {
      title: "Rating :",
      description:
        ticketinfo.rating >= 1 && ticketinfo.rating <= 5 ? (
          <>
            {React.cloneElement(smielyRating[ticketinfo.rating - 1].icon, {
              style: {
                color: smielyRating[ticketinfo.rating - 1].defaultColor,
              },
            })}
          </>
        ) : null,
    },
  ];
  const domainPrefix = "https://admin.vibecopilot.ai";
  
  return (
    <div className="">
      <div className="flex flex-col justify-around ">
        {ticketinfo.current_fixed_state === "complete" && (
          <div className="flex justify-end items-center gap-2 m-2">
            <button
              className="bg-black  rounded-md px-4  hover:bg-white  border-2  transition-all duration-300 font-medium text-white p-2 "
              onClick={() => setModal(true)}
              style={{background: themeColor}}
            >
              Re open
            </button>

            <button
              className="bg-red-400  rounded-md px-4  hover:bg-white hover:text-black border-2  transition-all duration-300 font-medium text-white p-2 "
              onClick={() => setCloseModal(true)}
              
            >
              Close
            </button>
          </div>
        )}
        <div className="">
          {/* <h2 className="text-center mb-2 bg-black text-white font-semibold text-lg p-2 px-4 ">
            Ticket Details
          </h2> */}
          <Detail details={ticketDetails} heading={"Ticket Details"} />
        </div>
        <div className="flex flex-col gap-2">
          <h2
            style={{ background: themeColor }}
            className="text-center  text-white font-semibold mt-5 text-lg p-2 px-4 "
          >
            Additional Info
          </h2>
          <div className="px-4 flex flex-col gap-1 justify-center  ">
            <p className="font-medium">Description :</p>
            <p className="text-wrap bg-gray-200 p-2 rounded-md">
              {ticketinfo.text}
            </p>
          </div>
          <div className="px-4 flex flex-col gap-1 justify-center  ">
            <label htmlFor="addComment" className="font-medium">
              Add Comment :
            </label>
            <div className="flex justify-between gap-4">
              <textarea
                name="text"
                value={formData.comment}
                className="border p-1 px-2 border-gray-400 rounded-md w-96"
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
              />
            </div>
          </div>
          <input
            type="file"
            name="documents"
            id="documents"
            onChange={FileChange}
            multiple
            className="file:bg-black file:text-white m-4 file:rounded-full file:p-2 file:px-4 file:font-semibold bg-gray-300 p-2 rounded-full"
          />
          <div className="flex mx-4">
            <button
              onClick={saveEditDetails}
              className="border-2 border-black p-2 mx-2  rounded-md hover:bg-black hover:text-white font-medium transition-all duration-300"
            >
              Comment
            </button>
          </div>
        </div>
        {/* <div className="border " /> */}
        <h2
          style={{ background: themeColor }}
          className="text-center   text-white font-semibold my-5 text-lg p-2 px-4 "
        >
          Attachments
        </h2>
        <div className="flex  sm:flex-row flex-col items-center ">
          {ticketinfo.documents &&
            ticketinfo.documents.map((doc, index) => (
              <div key={index} className="flex justify-start p-4">
                <a
                  href={domainPrefix + doc.document}
                  target="_blank"
                  className="inline-block  w-40"
                >
                  <img
                    src={domainPrefix + doc.document}
                    alt={`Attachment ${index}`}
                    // width={"25%"}
                    className="w-40 h-40 object-cover rounded-md"
                  />
                </a>
              </div>
            ))}
        </div>

        {/* <div className="border m-10" /> */}
        <h2
          style={{ background: themeColor }}
          className="text-center text-white font-semibold my-5 text-lg p-2 px-4 "
        >
          Logs
        </h2>
        {/* <div className="border m-10 " /> */}

        {ticketinfo.complaint_logs &&
          ticketinfo.complaint_logs.map((log) => (
            <div className="md:flex mx-4 justify-center " key={log.id}>
              <ol className="relative  border-gray-200 w-full">
                <li className="mb-6 sm:mb-10 md:ms-6">
                  <div className="items-center justify-between p-4  border border-gray-200 rounded-lg shadow-sm sm:flex  dark:border-gray-600">
                    <time className="mb-1 text-xs font-normal text-gray-900 sm:order-last sm:mb-0">
                      {dateFormat(log.created_at)}
                    </time>
                    <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                      {" "}
                      {log.priority && (
                        <div className="text-sm font-semibold flex gap-2 text-gray-900 dark:text-gray mb-5">
                          Priority :{" "}
                          <p className="font-semibold text-gray-900 dark:text-gray">
                            {" "}
                            {log.priority}{" "}
                          </p>
                        </div>
                      )}
                      {log.log_comment && (
                        <div className="text-sm font-semibold flex gap-2 text-gray-900 dark:text-gray mb-5">
                          Comment :{" "}
                          <p className="font-semibold text-gray-900 dark:text-gray ">
                            {log.log_comment}
                          </p>
                        </div>
                      )}
                      {log.log_status && (
                        <div className="text-sm font-semibold flex gap-2 text-gray-900 dark:text-gray mb-5">
                          Status:{" "}
                          <p className="font-semibold text-gray-900 dark:text-gray">
                            {log.log_status}
                          </p>
                        </div>
                      )}
                      <div className="flex gap-4">
                        <p className="font-medium text-black">Log By:</p>
                        <p className="font-medium text-black">{log.log_by}</p>
                      </div>
                      <div className="flex w-fit justify-center flex-wrap">
                        {log.documents &&
                          log.documents.map((doc, index) => (
                            <div key={index} className="p-4 ">
                              <a
                                href={domainPrefix + doc.document}
                                target="_blank"
                              >
                                <img
                                  src={domainPrefix + doc.document}
                                  alt={`Attachment ${index}`}
                                  // style={{
                                  //   width: "20%",
                                  //   height: "auto",
                                  //   maxWidth: "100%",
                                  // }}
                                  className="w-40 h-40 object-cover rounded-md"
                                />
                              </a>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          ))}
      </div>
      {modal && (
        <ReopenModal
          reopenStatusId={reopenStatusId}
          onclose={() => setModal(false)}
        />
      )}
      {closeModal && (
        <TicketCloseModal
          closeStatusId={closeStatusId}
          onclose={() => setCloseModal(false)}
        />
      )}
    </div>
  );
};

export default UserDetails;
