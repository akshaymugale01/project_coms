import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ImEarth } from "react-icons/im";
import { getItemInLocalStorage } from "../utils/localStorage";
import toast from "react-hot-toast";
import profile from "/profile.png";
import QR from "/QR.png";
import { QRCodeCanvas } from "qrcode.react";
import VCard from "vcard-creator";
import { useSelector } from "react-redux";
import { PiPlus, PiPlusCircle } from "react-icons/pi";
import AddBusinesscardModal from "./AddBusinesscardModal";
import html2canvas from "html2canvas";
import { sendBusinessCard } from "../api";
import { getBusinessCard } from "../api";
import businessCardTemplate from "/newCard.jpeg";
// import {postBusinessCard} from "../api";
// import businessCardTemplate from "/businessCardTemp.jpeg";
import VCLogo from "./SVG/VCLogo.svg";

const BusinessCard = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const elementRef = useRef(null);

  const [addCard, setAddCard] = useState(false);
  const [businessCards, setBusinessCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [recieverEmail, setRecieverEmail] = useState("");

  const [showVerifiedButtonSend, setShowVerifiedButtonSend] = useState("block");
  const [showVerifiedLoaderSend, setShowVerifiedLoaderSend] = useState("none");
  const user_id = getItemInLocalStorage("VIBEUSERID");
  const [sending, setSending] = useState(false);

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
      const binaryString = atob(imageData.split(",")[1]);
      const binaryData = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        binaryData[i] = binaryString.charCodeAt(i);
      }
      // Create a file object with binary data
      // const blob = await fetch(imageData).then((res) => res.blob());
      // const file = new File([blob], "business_card.png", { type: "image/png" });
      setSending(true);
      toast.loading("Sending business card please wait!");
      const file = new File([binaryData], "business_card.png", {
        type: "image/png",
      });

      const formData = new FormData();
      formData.append("emails", recieverEmail);
      formData.append("business_card", file);
      formData.append("user_id", user_id);

      try {
        const response = await sendBusinessCard(formData);
        if (response.success === true) {
          toast.dismiss();
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
          setSending(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setShowVerifiedButtonSend("block");
        setShowVerifiedLoaderSend("none");
        setSending(false);
        toast.dismiss();
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
  // const elementRef = useRef(null);

  const captureAndShare = async () => {
    if (elementRef.current) {
      const canvas = await html2canvas(elementRef.current);
      const imgDataUrl = canvas.toDataURL("image/png");
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(imgDataUrl)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const fetchBusinessCards = async () => {
    try {
      setLoading(true);
      const res = await getBusinessCard();
      setBusinessCards(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load business cards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessCards();
  }, []);

  const generateVCardData = (card) => {
    const vCard = new VCard();

    const [firstName = "", lastName = ""] = card.full_name?.split(" ") || [];

    vCard
      .addName(lastName, firstName)
      .addEmail(card.email_id || "")
      .addPhoneNumber(card.contact_number || "", "CELL")
      .addURL(card.website_url || "")
      .addAddress("", "", card.address || "", "", "", "", "");

    return vCard.toString();
  };

  const copyText = (text, msg) => {
    if (!text) {
      toast.error("Data not available");
      return;
    }
    navigator.clipboard.writeText(text);
    toast.success(msg);
  };

  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className=" w-full flex flex-col mx-3 overflow-hidden">
        <div className="flex justify-between my-2 border-b pb-1">
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
              className="bg-green-400 p-2 rounded-md border-2 border-green-400 text-white hover:bg-white hover:text-black transition-all duration-500 sm:col-span-2 font-medium"
              disabled={sending}
            >
              Share
            </button>
            {/* <button onClick={captureAndShare}>Whats app</button> */}
          </div>
          <button
            style={{ background: themeColor }}
            className="rounded-md flex items-center gap-2 p-2 text-white font-medium"
            onClick={() => setAddCard(true)}
          >
            <PiPlusCircle size={20} /> Add
          </button>
        </div>
        {/* LOADER */}
        {loading && <p className="mt-4">Loading business cards...</p>}

        {/* CARD LIST */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {businessCards.map((card) => (
            <div
              key={card.id}
              ref={elementRef}
              className="bCard flex flex-col md:flex-row gap-4 items-center p-6 rounded-2xl shadow-custom-all-sides w-fit"
            >
              {/* BUSINESS CARD */}
              <div
                style={{
                  backgroundImage: `url(${businessCardTemplate})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="h-48 w-80 rounded-2xl border border-gray-200"
              >
                <div className="mt-12 text-center">
                  <p className="font-bold text-lg">{card.full_name}</p>
                  <p className="text-sm font-medium">
                    {card.profession || "—"}
                  </p>
                </div>

                <div className="mt-9 flex justify-center gap-3">
                  <button
                    onClick={() =>
                      copyText(card.contact_number, "Phone copied")
                    }
                    className="bg-white p-2 rounded-md"
                  >
                    <div className="flex items-center gap-1">
                      <FaPhoneAlt />
                      <span>Phone</span>
                    </div>
                  </button>

                  <button
                    onClick={() => copyText(card.email_id, "Email copied")}
                    className="bg-white p-2 rounded-md"
                  >
                      <div className="flex items-center gap-1">
                    <MdEmail />
                      <span>Email</span>
                    </div>
                  </button>

                  <button
                    onClick={() => copyText(card.website_url, "Website copied")}
                    className="bg-white p-2 rounded-md"
                  >
                    <div className="flex items-center gap-1">
                    <ImEarth />
                      <span>Website</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* QR CODE */}
              <div className="bg-blue-400 p-2 rounded-2xl h-48 w-48 flex items-center justify-center">
                <QRCodeCanvas
                  value={generateVCardData(card)}
                  size={130}
                  includeMargin
                  className="rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {addCard && <AddBusinesscardModal onClose={() => setAddCard(false)} />}
    </section>
  );
};

export default BusinessCard;
