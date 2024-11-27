import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaQrcode } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import qr from "/QR.png";
import VisitorQRCode from "../../../containers/modals/VisitorQRCode";
import AssetQrCode from "./assetSubDetails/AssetQrCode";
import ModalWrapper from "../../../containers/modals/ModalWrapper";
import Navbar from "../../../components/Navbar";
import { domainPrefix, getPatrollingDetails } from "../../../api";
import {
  convertToIST,
  dateTimeFormat,
  SendDateFormat,
} from "../../../utils/dateUtils";
import axios from "axios";
import vibeLogo from "/vibe.png";
import Table from "../../../components/table/Table";
const PatrollingDetails = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [qrCode, setQrCode] = useState(false);
  const [details, setDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getPatrollingDetails(id);
        setDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [id]);
  const handlePrintQRCode = async () => {
    const doc = new jsPDF();
    const logoText = "Vibeconnect";
    try {
      const response = await axios.get(
        domainPrefix + details.qr_code_image_url,
        { responseType: "blob" }
      );
      const blob = response.data;
      const qrCodeDataURL = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      // Calculate the center position for the QR code
      const qrCodeSize = 180;
      const qrCodeX = (doc.internal.pageSize.width - qrCodeSize) / 2;
      const qrCodeY = 40;

      doc.addImage(
        qrCodeDataURL,
        "PNG",
        qrCodeX,
        qrCodeY,
        qrCodeSize,
        qrCodeSize
      );

      // Load the Vibe logo image
      const logoResponse = await axios.get(vibeLogo, { responseType: "blob" });
      const logoBlob = logoResponse.data;
      const logoDataURL = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(logoBlob);
      });

      // Calculate the center position for the Vibe logo
      const logoSize = 20;
      const logoX = qrCodeX + (qrCodeSize - logoSize) / 2;
      const logoY = qrCodeY + (qrCodeSize - logoSize) / 2;

      // Add greyish background with rounded corners behind the logo
      const backgroundMargin = 5;
      const backgroundX = logoX - backgroundMargin;
      const backgroundY = logoY - backgroundMargin;
      const backgroundSize = logoSize + 2 * backgroundMargin;
      const cornerRadius = 5;

      doc.setFillColor(255, 255, 255); // Set fill color to light grey
      doc.roundedRect(
        backgroundX,
        backgroundY,
        backgroundSize,
        backgroundSize,
        cornerRadius,
        cornerRadius,
        "F"
      );

      doc.addImage(logoDataURL, "PNG", logoX, logoY, logoSize, logoSize);

      doc.setFontSize(16);
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(100);
      // doc.text(assetName, 105, 10, null, null, "center");

      // Adding heading and border at the bottom
      const heading = "Location";
      const pageWidth = doc.internal.pageSize.width;
      const headingY = 230;

      doc.setFontSize(14);
      doc.text(heading, 105, headingY, null, null, "center");
      doc.line(10, headingY + 5, pageWidth - 10, headingY + 5); // Draw border line

      // Adding building, floor, and unit name in a single row below the heading
      const locationInfoY = headingY + 20;
      doc.setFontSize(12);
      doc.setTextColor(50);

      // Calculating positions for equal spacing
      const textWidth = pageWidth - 20; // 10 units padding on each side
      const textSectionWidth = textWidth / 3;
      const buildingX = 10;
      const floorX = buildingX + textSectionWidth;
      const unitX = floorX + textSectionWidth;

      doc.text(`Building: ${details.building_name}`, buildingX, locationInfoY);
      doc.text(`Floor: ${details.floor_name}`, floorX, locationInfoY);
      doc.text(`Unit: ${details.unit_name}`, unitX, locationInfoY);

      const pageHeight = doc.internal.pageSize.height;
      const logoTextWidth = doc.getTextWidth(logoText);

      doc.text(logoText, pageWidth - logoTextWidth - 10, pageHeight - 10);
      doc.save(`${details.building_name}.pdf`);
    } catch (error) {
      console.log(error);
    }
  };

  const PatrollingColumn = [
    {
      name: " Name",
      selector: (row) => row.user_name,
      sortable: true,
    },
    {
      name: "Expected Time",
      selector: (row) => dateTimeFormat(row.expected_time),
      sortable: true,
    },
    {
      name: "Actual Time",
      selector: (row) =>
        row.actual_time ? dateTimeFormat(row.actual_time) : "",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  return (
    <section className="flex">
      <Navbar />
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex flex-col gap-2">
          <h2
            style={{
              background: themeColor,
            }}
            className="text-center w-full text-white font-semibold text-lg p-2 px-4 my-2 rounded-md"
          >
            Patrolling Details
          </h2>
          <div className="flex gap-2 justify-end">
            <button
              className="flex gap-2 items-center justify-center border-2 border-black px-4 p-1 rounded-full hover:bg-black hover:text-white transition-all duration-500"
              onClick={() => setQrCode(true)}
            >
              <FaQrcode /> QR Code
            </button>
            <Link
              to={`/admin/edit-patrolling/${id}`}
              className="flex gap-2 items-center border-2 border-black px-4 p-1 rounded-full hover:bg-black transition-all duration-300 hover:text-white"
            >
              <BiEditAlt />
              Edit Details
            </Link>
          </div>
          <div className="md:grid  px-4 flex flex-col grid-cols-3 gap-5 gap-x-4 bg-gray-100 p-2 rounded-md">
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Building : </p>
              <p className="text-sm">{details.building_name}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Floor : </p>
              <p className="text-sm">{details.floor_name}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Unit : </p>
              <p className="text-sm">{details.unit_name}</p>
            </div>

            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Start Date: </p>
              <p className="text-sm">{SendDateFormat(details.start_date)}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">End Date : </p>
              <p className="">{SendDateFormat(details.end_date)}</p>
            </div>
            {details.time_intervals && (
              <div className="grid grid-cols-2 ">
                <p className="font-semibold text-sm">Time Interval : </p>
                <p className="">{details.time_intervals}hr</p>
              </div>
            )}
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Start Time : </p>
              <p className="">{convertToIST(details.start_time)}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">End Time : </p>
              <p className="">{convertToIST(details.end_time)}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Created on : </p>
              <p className="">{SendDateFormat(details.created_at)}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Updated on : </p>
              <p className="">{SendDateFormat(details.updated_at)}</p>
            </div>
            {details.specific_times && (
              <div className="grid grid-cols-2 ">
                <p className="font-semibold text-sm">Specific Time : </p>
                <div className="flex gap-2 items-center">
                  {details.specific_times &&
                    details.specific_times.map((time, index) => {
                      const hour = parseInt(time, 10);
                      const period = hour >= 12 ? "PM" : "AM";
                      const formattedHour = hour % 12 || 12; // Convert to 12-hour format
                      return <p key={index}>{`${formattedHour} ${period},`}</p>;
                    })}
                </div>
              </div>
            )}
          </div>
          <h2 className="font-medium border-b border-gray-400">Logs</h2>
          <Table columns={PatrollingColumn} data={details.patrolling_logs} />
        </div>
        {qrCode && (
          <ModalWrapper onclose={() => setQrCode(false)}>
            <div className="mx-4 flex flex-col justify-between items-center gap-10">
              <div id="qrCodeElement">
                <img
                  src={domainPrefix + details.qr_code_image_url}
                  alt="qr"
                  width={200}
                  className="border shadow-xl rounded-md"
                />
              </div>
              <button
                className="px-4 w-full border-2 border-black rounded-md flex justify-center items-center gap-2 py-1"
                onClick={handlePrintQRCode}
                // onClick={() => downloadFile(QR)}
              >
                <FaQrcode />
                Print QR Code
              </button>
            </div>
          </ModalWrapper>
        )}
      </div>
    </section>
  );
};

export default PatrollingDetails;
