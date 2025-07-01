import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
// import { ChevronLeft } from "lucide-react"
import { domainPrefix, getUserOtp } from "../api/index";
// import Image from "next/image"

const OtpAndQr = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("v");
  // const {id} = useParams();
  console.log("id:", id);
  const [userData, setUserData] = useState({});
  //const [otp, setOtp] = useState("");
  //const [qrCode, setQrCode] = useState('');
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState("");
  const [otpDigits, setOtpDigits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Prevent API call if id is null
      try {
        const response = await getUserOtp(id);
        
        setUserData(response.data);
        setOtpDigits(response.data.otp.toString().split(""));
        setQrCodeImageUrl(response.data.qr_code_image_url);

        console.log("OTP Digits:", response.data.otp.toString().split(""));
        console.log("QR Code URL:", response.data.qr_code_image_url);
      } catch (error) {
        console.error("Error fetching OTP data:", error);
      }
    };
    fetchData();
  }, [id]);

  console.log("Visitor Details", userData);

  const QR_Code = domainPrefix +  userData.qr_code || ""
  const Profile_Picture = domainPrefix + userData.profile_picture || ""

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-3 pb-8">
      {/* Mobile frame */}
      <div className="relative max-w-lg w-full bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-4">
          <button className="p-1">
            {/* <ChevronLeft className="h-5 w-5" /> */}
          </button>
          <h1 className="text-xl font-bold text-center flex-1 mr-6">
            Visiting Pass
          </h1>
        </div>

        {/* Main content */}
        <div className="px-6 pb-6">
          {/* Visitor card */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex items-center">
            <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
              {/* <Image
                src="/placeholder.svg?height=48&width=48"
                alt="Profile"
                width={48}
                height={48}
                className="object-cover"
              /> */}
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                <img
                  src={ Profile_Picture }
                  alt="Profile Picture"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <h2 className="font-bold text-lg">
                {" "}
                Name : <span>{userData.name}</span>
              </h2>
              <p className="font-medium text-xs">
                Purpose:
                <span className="font-normal text-gray-600 mx-1">
                  {userData.purpose}
                </span>
              </p>
              <p className="font-medium text-xs">
                Type:{" "}
                <span className="font-normal text-gray-600 mx-1">
                  {userData.visit_type}
                </span>
              </p>
              <p className="font-medium text-xs">
                Host:
                <span className="font-normal text-gray-600 mx-1">
                  {userData.hosts?.length ? userData.hosts[0].full_name : "N/A"}
                </span>
              </p>
            </div>
            <div className="text-xs text-gray-500">
              {userData.wing} {userData.floor}
            </div>
          </div>

          {/* Date section */}
          <div className="flex justify-between mb-6">
            <div className="bg-yellow-100 rounded-lg p-2 text-center w-[45%]">
              <p className="text-xs font-medium">Start Date</p>
              <p className="text-sm font-bold">
                {userData.pass_start_date || ""}
              </p>
            </div>

            {/* Company logo */}
            {/* <div className="flex items-center justify-center">
              <div className="h-12 w-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <span className="font-serif text-xl">V</span>
              </div>
            </div> */}

            <div className="bg-yellow-100 rounded-lg p-2 text-center w-[45%]">
              <p className="text-xs font-medium">End Date</p>
              <p className="text-sm font-bold">
                {userData.pass_end_date || ""}
              </p>
            </div>
          </div>

          {/* Company details */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500">Company Details</p>
            <h2 className="text-xl font-bold">Bhoomi Celestia</h2>
            <p className="text-xs text-gray-500">+1 Companies</p>
          </div>

          {/* QR code section */}
          <div className="text-center mb-6">
            <p className="text-sm font-medium mb-2">Scan QR For Entry</p>

            <div className="flex justify-center mb-2">
              <div className="h-40 w-40 bg-white border border-gray-300 flex items-center justify-center">
                <img
                  // src={domainPrifix+qrCodeImageUrl[0].}
                  //  src={qrCodeImageUrl}

                  src={QR_Code}
                  alt="QR Code"
                  width={140}
                  height={140}
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">Or</p>
            <p className="text-sm font-medium mb-2">OTP</p>
            <div className="flex justify-center space-x-2">
              {Array.isArray(otpDigits) &&
                otpDigits.map((digit, index) => (
                  <div
                    key={index}
                    className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center shadow-sm"
                  >
                    {digit}
                  </div>
                ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-400">
            Powered by MyCiti.Life
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpAndQr;
