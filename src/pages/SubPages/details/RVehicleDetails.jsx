import React, { useEffect, useState } from "react";

import image from "/profile.png";
import { useSelector } from "react-redux";
import { FaQrcode } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import qr from "/QR.png";
import ModalWrapper from "../../../containers/modals/ModalWrapper";
import { domainPrefix, getRegisteredVehicleDetails } from "../../../api";
import axios from "axios";
import vibeLogo from "/vibe.png";
import { FormattedDateToShowProperly } from "../../../utils/dateUtils";
const RVehicleDetails = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [qrCode, setQrCode] = useState(false);
  const { id } = useParams();
  const [details, setDetails] = useState([]);

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
      // const floorX = buildingX + textSectionWidth;
      // const unitX = floorX + textSectionWidth;

      doc.text(`Slot: ${details.slot_name}`, buildingX, locationInfoY);
      // doc.text(`Floor: ${details.floor_name}`, floorX, locationInfoY);
      // doc.text(`Unit: ${details.unit_name}`, unitX, locationInfoY);

      const pageHeight = doc.internal.pageSize.height;
      const logoTextWidth = doc.getTextWidth(logoText);

      doc.text(logoText, pageWidth - logoTextWidth - 10, pageHeight - 10);
      doc.save(`${details.slot_name}.pdf`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRVehicles = async () => {
      try {
        const res = await getRegisteredVehicleDetails(id);
        console.log(res);
        setDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRVehicles();
  }, []);

  return (
    <div className="w-screen p-2">
      <div className="flex flex-col gap-2">
        <h2
          style={{
            background: "rgb(3 19 37)",
          }}
          className="text-center w-full text-white font-semibold rounded-md text-lg p-2 px-4 "
        >
          Registered Vehicle Details
        </h2>
        <div className="flex gap-2 justify-end">
          <button
            className="flex gap-2 items-center justify-center border-2 border-black px-4 p-1 rounded-full hover:bg-black hover:text-white transition-all duration-500"
            onClick={() => setQrCode(true)}
          >
            <FaQrcode /> QR Code
          </button>
          <Link
            to={`/admin/edit-rvehicles/${id}`}
            className="flex gap-2 items-center border-2 border-black px-4 p-1 rounded-full hover:bg-black transition-all duration-300 hover:text-white"
          >
            <BiEditAlt />
            Edit Details
          </Link>
        </div>
        <div className="md:grid px-4 flex flex-col grid-cols-3 gap-5 gap-x-4 border p-2 border-gray-200 bg-gray-50 rounded-md">
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Slot Name : </p>
            <p className="">{details.slot_number}</p>
          </div>
          {/* <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Parking Slot : </p>
            <p className="">15</p>
          </div> */}
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Vehicle Category : </p>
            <p className="">{details.vehicle_category}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Vehicle Type : </p>
            <p className="">{details.vehicle_type}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Sticker Number: </p>
            <p className="">{details.sticker_number}</p>
          </div>
          {/* <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">OTP : </p>
            <p className="">{details.otp}</p>
          </div> */}
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Category : </p>
            <p className="">{details.category}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Registration No. : </p>
            <p className="">{details.registration_number}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Active/Inactive : </p>
            <p className="">{details.status ? "Active" : "Inactive"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Insurance Number : </p>
            <p className="">{details.insurance_number}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Insurance Valid Till : </p>
            <p className="">{details.insurance_valid_till}</p>
          </div>
          {details.user_name && <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Person Name : </p>
            <p className="">{`${details.user_name.firstname} ${details.user_name.lastname}`}</p>
          </div>}
          {details.created_by_name && <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Created by : </p>
            <p className="">{`${details.created_by_name.firstname} ${details.created_by_name.lastname}`}</p>
          </div>}
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Created on : </p>
            <p className="text-sm">{FormattedDateToShowProperly(details.created_at)}</p>
          </div>
           <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Updated on : </p>
            <p className="text-sm">{FormattedDateToShowProperly(details.updated_at)}</p>
          </div>
        </div>
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
  );
};

export default RVehicleDetails;
