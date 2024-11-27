import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar";
import { domainPrefix, getStaffDetails } from "../../../api";
import { useParams } from "react-router-dom";
import image from "/profile.png";
import {
  dateFormat,
  FormattedDateToShowProperly,
  SendDateFormat,
} from "../../../utils/dateUtils";
import { FaRegFileAlt } from "react-icons/fa";
import Table from "../../../components/table/Table";
import { BiQr } from "react-icons/bi";
import VisitorQRCode from "../../../containers/modals/VisitorQRCode";
const StaffDetails = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [details, setDetails] = useState({});
  const [qrModal, setQrmodal] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getStaffDetails(id);
        setDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const scheduleArray = details.working_schedule
    ? Object.keys(details.working_schedule).map((day) => ({
        day: day,
        start_time: details.working_schedule[day].start_time,
        end_time: details.working_schedule[day].end_time,
      }))
    : [];
  const columns = [
    {
      name: "Sr. no.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Days",
      selector: (row) => row.day,
      sortable: true,
    },
    {
      name: "Start Time",
      selector: (row) => row.start_time,
      sortable: true,
    },
    {
      name: "End Time",
      selector: (row) => row.end_time,
      sortable: true,
    },
  ];

  const isImage = (filePath) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    const extension = filePath.split(".").pop().split("?")[0].toLowerCase();
    return imageExtensions.includes(extension);
  };
  const getFileName = (filePath) => {
    return filePath.split("/").pop().split("?")[0];
  };

  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className=" w-full flex mx-3 flex-col overflow-hidden mb-10">
        <div className="flex flex-col gap-2 my-2">
          <h2
            style={{
              background: themeColor,
            }}
            className="text-center w-full text-white font-semibold rounded-md text-lg p-2 px-4 "
          >
            Staff Details
          </h2>
          <div className="flex justify-end">
            <button
              onClick={() => setQrmodal(true)}
              className="border-2 border-black rounded-full px-2 p-1 flex items-center gap-2"
            >
              {" "}
              <BiQr /> QR code
            </button>
          </div>
          <div className="flex justify-center">
            {details.profile_picture && details.profile_picture !== null ? (
              // details.visitor_files.map((doc, index) => (
              <img
                src={domainPrefix + details.profile_picture.url}
                alt=""
                className="w-48 h-48 rounded-full cursor-pointer"
                onClick={() =>
                  window.open(
                    domainPrefix + details.profile_picture.url,
                    "_blank"
                  )
                }
              />
            ) : (
              // ))
              <img src={image} alt="" className="w-48 h-48" />
            )}
          </div>
          <div className="md:grid  px-2 flex flex-col grid-cols-3 gap-5  border-gray-400 border rounded-xl p-2 py-4 bg-gray-50">
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Name : </p>
              <p className="text-sm">
                {details.firstname} {details.lastname}
              </p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Unit : </p>
              <p className="text-sm">{details.unit_name}</p>
            </div>

            {/* <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">department: </p>
              <p className="">Security</p>
            </div> */}
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Mobile : </p>
              <p className="text-sm">{details.mobile_no}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Email : </p>
              <p className="text-sm">{details.email}</p>
            </div>

            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Staff Id : </p>
              <p className="text-sm">{details.staff_id}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Work Type : </p>
              <p className="text-sm">{details.work_type}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Status : </p>
              <p className="text-sm">
                {details.status ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Supplier name : </p>
              <p className="text-sm">{details.vendor_name}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Valid From : </p>
              <p className="text-sm">{dateFormat(details.valid_from)}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Valid Till : </p>
              <p className="text-sm">{dateFormat(details.valid_till)}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Status : </p>
              <p className="text-sm">
                {details.status ? (
                  <span className="text-green-400">Active</span>
                ) : (
                  <span className="text-red-400">Inactive</span>
                )}
              </p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Created on : </p>
              <p className="text-sm">
                {FormattedDateToShowProperly(details.created_at)}
              </p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Updated on : </p>
              <p className="text-sm">
                {FormattedDateToShowProperly(details.updated_at)}
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-medium border-b border-gray-300 mb-2">
              Working Schedule
            </h2>
            <Table columns={columns} data={scheduleArray} />
          </div>
          <div>
            <h2 className="font-medium border-b border-gray-300">
              Attachments
            </h2>
            <div className="p-2 flex flex-wrap gap-4 items-center justify-center">
              {details.staff_documents && details.staff_documents.length > 0 ? (
                details.staff_documents.map((staff, index) => (
                  <div key={staff.id} className="">
                    {isImage(domainPrefix + staff.document) ? (
                      <img
                        src={domainPrefix + staff.document}
                        alt={`Attachment`}
                        className="w-40 h-28 object-cover rounded-md"
                        onClick={() =>
                          window.open(domainPrefix + staff.document, "_blank")
                        }
                      />
                    ) : (
                      <a
                        href={domainPrefix + staff.document}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="attachment-link hover:text-blue-400 transition-all duration-300  flex flex-col  "
                      >
                        <FaRegFileAlt size={50} />
                        {getFileName(staff.document)}
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center w-full">No Attachments</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {qrModal && (
        <VisitorQRCode
          QR={domainPrefix + details.qr_code_image_url}
          onClose={() => setQrmodal(false)}
        />
      )}
    </section>
  );
};

export default StaffDetails;
