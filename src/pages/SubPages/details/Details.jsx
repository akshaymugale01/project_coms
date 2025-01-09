import React, { useEffect, useState } from "react";
import Detail from "../../../containers/Detail";
import {
  editComplaintsDetails,
  getCARItems,
  getComplaintsDetails,
} from "../../../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";

import { BiAngry, BiHappy, BiSad, BiSmile } from "react-icons/bi";
import { MdAddCircleOutline, MdOutlineSentimentNeutral } from "react-icons/md";
import { useSelector } from "react-redux";
import CARAddItemsModal from "../../../containers/modals/CARAddItemsModal";
import Table from "../../../components/table/Table";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import ApprovalModal from "../../../containers/modals/ApprovalModal";

const TicketDetails = () => {
  const navigate = useNavigate();
  const siteId = getItemInLocalStorage("SITEID");
  const userId = getItemInLocalStorage("UserId");
  const { id } = useParams();
  const [approval, setApproval] = useState(false)
  const [ticketinfo, setTicketInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [feat, setFeat] = useState("");
  const [formData, setFormData] = useState({
    comment: "",
    of_phase: "pms",
    documents: [],
  });

  // console.log(formData);

  const getAllowedFeatures = () => {
    const storedFeatures = getItemInLocalStorage("FEATURES");
    if (storedFeatures) {
      setFeat(storedFeatures.map((feature) => feature.feature_name));
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await getComplaintsDetails(id);
      // console.log(response.data);
      setTicketInfo(response.data);
    };
    const fetchCARItems = async () => {
      const itemsResp = await getCARItems(id);
      setItems(itemsResp.data);
    };
    fetchDetails();
    fetchCARItems();
    getAllowedFeatures();
  }, [showModal]);

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
    // { title: "Title  :", description: ticketinfo.heading },
    { title: "Status  :", description: ticketinfo.issue_status },
    { title: "Site  :", description: ticketinfo.site_name },
    { title: "Issue Type  :", description: ticketinfo.issue_type },
    { title: "Assigned To  :", description: ticketinfo.assigned_to },
    { title: "Building Name  :", description: ticketinfo.building_name },
    // { title: "Customer Name:", description: ticketinfo.customer },
    { title: "Category  :", description: ticketinfo.category_type },
    { title: "Priority  :", description: ticketinfo.priority },
    { title: "Floor Name  :", description: ticketinfo.floor_name },
    { title: "Sub category  :", description: ticketinfo.sub_category },
    // { title: "Related To  :", description: ticketinfo.issue_related_to },
    { title: "Related To  :", description: ticketinfo.issue_type_id },
    { title: "Unit  :", description: ticketinfo.unit },
    { title: "Total time  :", description: getTimeAgo(ticketinfo.created_at) },

    // {
    //   title: "Response Breached  :",
    //   description: ticketinfo.response_breached ? "Yes" : "No",
    // },
    // {
    //   title: " Resolution Breached  :",
    //   description: ticketinfo.resolution_breached ? "Yes" : "No",
    // },
    { title: "Created By  :", description: ticketinfo.created_by },
    { title: "Created On  :", description: dateFormat(ticketinfo.created_at) },
    { title: "Updated On  :", description: dateFormat(ticketinfo.updated_at) },
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
  const ItemColumn = [
    { name: "Name", selector: (row) => row.item_name, sortable: true },
    { name: "Rate", selector: (row) => row.rate, sortable: true },
  ];
  const domainPrefix = "https://app.myciti.life";

  console.log(ticketinfo);
  const themeColor = useSelector((state) => state.theme.color);
  const logs = [{ title: "logs", description: " " }];
  return (
    <div className="">
      {showModal && <CARAddItemsModal onclose={() => setShowModal(false)} />}
        {approval && <ApprovalModal onclose={()=> setApproval(false)} issueStatusId={ticketinfo.issue_status_id} />}

      <div className="flex flex-col justify-around">
        <div className="flex justify-end m-1 gap-2">
          {feat.includes("items") && (
            <button
              onClick={() => setShowModal(true)}
              className="border-2 border-black  flex gap-2 p-1 rounded-md items-center px-4"
            >
              <MdAddCircleOutline />
              Add Items
            </button>
          )}
          <Link
            to={`/edit/${id}`}
            className="border-2 border-black flex gap-2 p-1 rounded-md items-center px-4 "
          >
            <BiEdit size={20} />
            Edit
          </Link>
        </div>
        <div className="">
          <Detail
            details={ticketDetails}
            heading={"Ticket Details"}
            title={ticketinfo.heading}
          />
        </div>
        <div className="flex flex-col  flex-wrap gap-2">
          <h2
            style={{ background: "rgb(19 27 32)" }}
            className="text-center  text-white font-semibold mt-5 text-lg p-2 px-4 "
          >
            Additional Info
          </h2>
          <div className="px-4 flex flex-col gap-1 justify-center">
            <p className="font-medium">Description :</p>
            <p className="text-wrap bg-gray-200 p-2 rounded-md">
              {ticketinfo.text}
            </p>
          </div>
          <div className="px-4 flex flex-col gap-1 justify-center">
            <p className="font-medium">Impact :</p>
            <p className="text-wrap bg-gray-200 p-2 rounded-md">
              {ticketinfo.impact}
            </p>
          </div>
          <div className="px-4 flex flex-col gap-1 justify-center">
            <p className="font-medium">Root Cause :</p>
            <p className="text-wrap bg-gray-200 p-2 rounded-md ">
              {ticketinfo.root_cause}
            </p>
          </div>
          <div className="px-4 flex flex-col gap-1 justify-center">
            <p className="font-medium">Corrective Action :</p>
            <p className="text-wrap bg-gray-200 p-2 rounded-md">
              {ticketinfo.corrective_action}
            </p>
          </div>
          <div className="px-4 flex flex-col gap-1 justify-center">
            <p className="font-medium">Proactive/Reactive :</p>
            <p className="text-wrap bg-gray-200 p-2 rounded-md">
              {ticketinfo.proactive_reactive
                ? ticketinfo.proactive_reactive
                : "Reactive"}
            </p>
          </div>
          <div className="px-4 flex flex-col gap-1 justify-center">
            <p className="font-medium">Correction :</p>
            <p className="text-wrap bg-gray-200 p-2 rounded-md">
              {ticketinfo.correction}
            </p>
          </div>
        </div>
        {/* <div className="border " /> */}

        {feat.includes("items") && (
          <div className="">
            {ticketinfo.territory_manager_id === userId && (
              <div className="flex justify-end mx-2 mt-2">
                <button
                  className="p-1 px-4 rounded-md text-white"
                  style={{ background: themeColor }}
                  onClick={()=> setApproval(true)}
                >
                  Approve
                </button>
              </div>
            )}
          </div>
        )}
        {feat.includes("items") && (
          <div className="m-2">
            <h2 className="font-medium ">Approval Requests</h2>
            <Table columns={ItemColumn} data={items} />
          </div>
        )}
        <h2
          style={{ background: "rgb(19 27 32)" }}
          className="text-center   text-white font-semibold my-5 text-lg p-2 px-4 "
        >
          Attachments
        </h2>
        <div className="flex sm:flex-row flex-col items-center ">
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
                    alt={`Attachment`}
                    // width={"25%"}
                    className="w-40 h-40 object-cover rounded-md"
                    // className="w-full"
                  />
                </a>
              </div>
            ))}
        </div>

        <h2
          style={{ background: "rgb(19 27 32)" }}
          className="text-center  text-white font-semibold my-5 text-lg p-2 px-4 "
        >
          Logs
        </h2>
        {/* <div className="border m-10 " /> */}

        {ticketinfo.complaint_logs &&
          ticketinfo.complaint_logs.map((log) => (
            <div className="md:flex  justify-center " key={log.id}>
              <ol className="relative  border-gray-200 w-full">
                <li className="mb-6 sm:mb-10 md:ms-6">
                  <div className="items-center justify-between p-4  border border-gray-200 rounded-lg shadow-sm sm:flex  dark:border-gray-600">
                    <time className="mb-1 text-xs font-normal text-gray-900 sm:order-last sm:mb-0">
                      {dateFormat(log.created_at)}
                    </time>
                    <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                      {" "}
                      {log.priority && (
                        <div className="text-sm font-semibold text-gray-900 dark:text-gray mb-5">
                          Priority :{" "}
                          <a
                            href="#"
                            className="font-semibold text-gray-900 dark:text-gray hover:underline"
                          >
                            {" "}
                            {log.priority}{" "}
                          </a>
                        </div>
                      )}
                      {log.log_comment && (
                        <div className="text-sm font-semibold text-gray-900 dark:text-gray mb-5">
                          Comment :{" "}
                          <a
                            href="#"
                            className="font-semibold text-gray-900 dark:text-gray hover:underline"
                          >
                            {log.log_comment}
                          </a>
                        </div>
                      )}
                      {log.log_status && (
                        <div className="text-sm font-semibold text-gray-900 dark:text-gray mb-5">
                          Status:{" "}
                          <a
                            href="#"
                            className="font-semibold text-gray-900 dark:text-gray hover:underline"
                          >
                            {log.log_status}
                          </a>
                        </div>
                      )}
                      {log.log_by && (
                        <div className="flex gap-4">
                          <p className="font-medium text-black">Log By:</p>
                          <p className="font-medium text-black">{log.log_by}</p>
                        </div>
                      )}
                      {log.documents &&
                        log.documents.map((doc, index) => (
                          <div key={index} className="flex justify-start p-4">
                            <a
                              href={domainPrefix + doc.document}
                              target="_blank"
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
                  </div>
                </li>
              </ol>
            </div>
          ))}
        <h2
          style={{ background: "rgb(19 27 32)" }}
          className="text-center  text-white font-semibold my-5 text-lg p-2 px-4 "
        >
          Escalations
        </h2>
        {/* <div className="border m-10 " /> */}
        <div className="px-4 mb-10">
          {ticketinfo.escalations &&
            ticketinfo.escalations.map((esclate) => (
              <div
                className="md:flex rounded-md justify-between border p-4 border-black mb-5"
                key={esclate.id}
              >
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-x-5 items-center">
                    <p className="font-semibold">Esclation Level :</p>
                    <p>{esclate.level}</p>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <p className="font-semibold">Esclated To :</p>
                    <p>{esclate.esc_to}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <p className="text-sm mt-5 sm:mt-0 font-semibold text-gray-500">
                    {dateFormat(esclate.esc_on)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
