import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ImEarth } from "react-icons/im";
import toast from "react-hot-toast";
import profile from "/profile.png";
import QR from "/QR.png";
import { QRCodeCanvas } from "qrcode.react";
import VCard from "vcard-creator";
import { useSelector } from "react-redux";
import { PiPlus, PiPlusCircle } from "react-icons/pi";
import AddBusinesscardModal from "../AddBusinesscardModal";
import html2canvas from "html2canvas";
import { sendBusinessCard } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
const EmployeeBusinessCard = () => {
  const user = getItemInLocalStorage("user");
  const [isQRVisible, setIsQRVisible] = useState(false);
  const Email = user.email;
  const handleEmailCopy = () => {
    navigator.clipboard
      .writeText(Email)
      .then(() => {
        toast.success("Email id Copied");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  const Phone = "9930337986";
  const handlePhoneCopy = () => {
    navigator.clipboard
      .writeText(Phone)
      .then(() => {
        toast.success("Phone Number Copied");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  const web = "www.google.com";
  const handleWebCopy = () => {
    navigator.clipboard
      .writeText(web)
      .then(() => {
        toast.success("Website Link Copied");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  const toggleQRVisibility = () => {
    setIsQRVisible(!isQRVisible);
  };

  const generateVCardData = () => {
    // Create a new vCard
    const vCard = new VCard();

    // Add vCard fields
    vCard
      .addName(user.lastname, user.firstname)
      .addEmail(user.email)
      .addPhoneNumber("9930337983", "CELL")
      .addURL("https://vibecopilot.ai/");

    // Return the formatted vCard string
    return vCard.toString();
  };
  const themeColor = useSelector((state) => state.theme.color);
  const [addCard, setAddCard] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [recieverEmail, setRecieverEmail] = useState("");

  const [showVerifiedButtonSend, setShowVerifiedButtonSend] = useState("block");
  const [showVerifiedLoaderSend, setShowVerifiedLoaderSend] = useState("none");
  const user_id = getItemInLocalStorage("VIBEUSERID");
  const [sending, setSending] = useState(false);
  //Will configure for multiple cards
  const sendNewBusinessCard = async () => {
    const content = document.querySelector(".bCard");
    const canvas = await html2canvas(content);
    const imageData = canvas.toDataURL("image/png");

    if (recieverEmail === "") {
      toast.error("Please Enter Email", {
        position: "top-center",
        autoClose: 2000,
      });
    } else if (!isEmailValid) {
      toast.error("Invalid Email", { position: "top-center", autoClose: 2000 });
    } else {
      setShowVerifiedButtonSend("none");
      setShowVerifiedLoaderSend("block");

      // Decode Base64 to binary
      toast.loading("Sending business card please wait!");
      setSending(true);
      const binaryString = atob(imageData.split(",")[1]);
      const binaryData = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        binaryData[i] = binaryString.charCodeAt(i);
      }

      // Create a file object with binary data
      // const blob = await fetch(imageData).then((res) => res.blob());
      // const file = new File([blob], "business_card.png", { type: "image/png" });
      const file = new File([binaryData], "business_card.png", {
        type: "image/png",
      });

      const formData = new FormData();
      formData.append("emails", recieverEmail);
      formData.append("business_card", file);
      formData.append("user_id", user_id);

      try {
        const response = await sendBusinessCard(formData);
        toast.dismiss();
        if (response.success === true) {
          toast.success("Business sent successfully to their email", {
            position: "top-center",
            autoClose: 2000,
          });
          setSending(false);
          setRecieverEmail("");
          setShowVerifiedButtonSend("block");
          setShowVerifiedLoaderSend("none");
        } else {
          setShowVerifiedButtonSend("block");
          setShowVerifiedLoaderSend("none");
          setSending(false)
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.error("Error:", error);
        setShowVerifiedButtonSend("block");
        setShowVerifiedLoaderSend("none");
        setSending(false);
      }
    }
  };
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const onChangeRecieverEmail = (event) => {
    // setRecieverEmail(event.target.value);
    const inputValue = event.target.value;

    // Always update the email input value
    setRecieverEmail(inputValue);

    // Set validity state based on regex check, but allow empty strings
    if (inputValue === "" || emailRegex.test(inputValue)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };
  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className=" w-full flex flex-col mx-3 overflow-hidden">
        <div className="flex justify-between my-2 border-b pb-2">
          <div className="grid md:grid-cols-12  gap-5 w-full">
            <input
              type="email"
              name=""
              value={recieverEmail}
              onChange={onChangeRecieverEmail}
              id=""
              placeholder="Enter Email to share business card"
              className="p-2 border border-gray-500 rounded-md sm:col-span-4"
            />
            <button
              onClick={sendNewBusinessCard}
              className="bg-green-400 p-2 rounded-md border-2 border-green-400  text-white hover:bg-white hover:text-black transition-all duration-500 sm:col-span-2 font-medium"
              disabled={sending}
            >
              Share
            </button>
          </div>
          <button
            style={{ background: themeColor }}
            className="rounded-md flex items-center gap-2 p-2 text-white font-medium"
            onClick={() => setAddCard(true)}
          >
            <PiPlusCircle size={20} /> Add
          </button>
        </div>
        <div className="bCard relative flex flex-col md:flex-row gap-4 justify-center md:justify-start  md:border-2 border-gray-500 w-fit  md:px-4 py-10  rounded-2xl">
          <div className="bg-white  rounded-full z-10 h-20 w-20 absolute left-[10rem]  md:left-[8.5rem] top-2 shadow-custom-all-sides">
            <img src={profile} alt="" />
          </div>
          <div
            className=" bg-custom-gradient relative shadow-custom-all-sides h-48 w-80 rounded-2xl cursor-pointer"
            // onClick={toggleQRVisibility}
          >
            <div className="flex flex-col justify-center my-2">
              <p className="text-center font-bold text-white mt-10 text-lg">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-center font-medium text-white ">Profession</p>
            </div>
            <div>
              <p className="text-center text-xs text-white">
                testing description of card
              </p>
            </div>
            <div className="mt-5 flex justify-center gap-1 md:gap-2 ">
              <button
                className="bg-white p-2 flex justify-center items-center gap-2 rounded-l-md font-medium"
                onClick={handlePhoneCopy}
              >
                <FaPhoneAlt /> Phone
              </button>
              <button
                className="bg-white p-2 flex justify-center items-center gap-2  font-medium"
                onClick={handleEmailCopy}
              >
                <MdEmail size={20} /> Email
              </button>
              <button
                className="bg-white p-2 flex justify-center items-center gap-2  font-medium rounded-r-md"
                onClick={handleWebCopy}
              >
                <ImEarth /> Website
              </button>
            </div>
          </div>
          {/* for now */}
          {/* <div className="bg-black p-4 w-fit rounded-md shadow-custom-all-sides">
            <img src={QR} alt="QR Code" className="h-40 min-w-40" />
          </div> */}
          <div className="bg-black p-2 flex justify-center items-center rounded-2xl shadow-custom-all-sides h-48 w-48">
            <QRCodeCanvas
              value={generateVCardData()} // Generate vCard and set as QR code value
              renderAs="canvas"
              size="130"
              includeMargin={true}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
      {addCard && <AddBusinesscardModal onClose={() => setAddCard(false)} />}
    </section>
  );
};

export default EmployeeBusinessCard;
