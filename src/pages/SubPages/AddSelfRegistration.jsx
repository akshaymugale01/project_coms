import React, { useState, useRef, useCallback, useEffect } from "react";
import image from "/profile.png";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import { getHostList, postNewVisitor } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Navbar from "../../components/Navbar";
const translations = {
  English: {
    title: "Self Registration",
    Visitor: "Visitor Type",
    visitorName: "Visitor Name",
    mobile: "Mobile Number",
    host: "Host",
    comingFrom: "Coming From",
    purpose: "Visit Purpose",
    selectPurpose: "Select Purpose",
    meeting: "Meeting",
    delivery: "Delivery",
    personal: "Personal",
    fitout: "Fitout Staff",
    other: "Other",
    cancel: "Cancel",
    submit: "Submit",
    guest: "Guest",
    visitorNamePlaceholder: "Enter Visitor Name",
    mobilePlaceholder: "Enter 10 digit mobile number",
    comingFromPlaceholder: "Enter Origin",
    hostPlaceholder: "Search Host...",
    capture: "Capture",
    close: "Close",
  },
  Hindi: {
    title: "स्वयं पंजीकरण",
    Visitor: "आगंतुक प्रकार",
    visitorName: "आगंतुक का नाम",
    mobile: "मोबाइल नंबर",
    host: "होस्ट",
    comingFrom: "कहां से आए हैं",
    purpose: "आने का उद्देश्य",
    selectPurpose: "उद्देश्य चुनें",
    meeting: "मीटिंग",
    delivery: "डिलीवरी",
    personal: "व्यक्तिगत",
    fitout: "फिटआउट स्टाफ",
    other: "अन्य",
    cancel: "रद्द करें",
    submit: "सबमिट",
    guest: "अतिथि",
    visitorNamePlaceholder: "आगंतुक का नाम दर्ज करें",
    mobilePlaceholder: "10 अंकों का मोबाइल नंबर दर्ज करें",
    comingFromPlaceholder: "कहां से आए हैं दर्ज करें",
    hostPlaceholder: "होस्ट खोजें...",
    capture: "कैप्चर करें",
    close: "बंद करें",
  },
  Marathi: {
    title: "स्वयं नोंदणी",
    Visitor: "पाहुण्याचा प्रकार",
    visitorName: "पाहुण्याचे नाव",
    mobile: "मोबाईल क्रमांक",
    host: "होस्ट",
    comingFrom: "कोठून आले",
    purpose: "भेटीचा उद्देश",
    selectPurpose: "उद्देश निवडा",
    meeting: "बैठक",
    delivery: "डिलिव्हरी",
    personal: "वैयक्तिक",
    fitout: "फिटआउट कर्मचारी",
    other: "इतर",
    cancel: "रद्द करा",
    submit: "सबमिट करा",
    guest: "पाहुणे",
    visitorNamePlaceholder: "पाहुण्याचे नाव प्रविष्ट करा",
    mobilePlaceholder: "10 अंकी मोबाईल क्रमांक प्रविष्ट करा",
    comingFromPlaceholder: "कोठून आले ते प्रविष्ट करा",
    hostPlaceholder: "होस्ट शोधा...",
    capture: "कॅप्चर करा",
    close: "बंद करा",
  },
};
const AddSelfRegistration = () => {
  const [language, setLanguage] = useState("English");
  const t = translations[language];
  const [selectedVisitorType, setSelectedVisitorType] = useState(
    "Guest-SelfRegistration",
  );
  const [showWebcam, setShowWebcam] = useState(false);
  const [hosts, setHosts] = useState([]);
  const siteId = getItemInLocalStorage("SITEID");
  const [capturedImage, setCapturedImage] = useState(null);
  const location = useLocation();

  // console.log(id);
  const [formData, setFormData] = useState({
    visitorName: "",
    mobile: "",
    purpose: "",
    comingFrom: "",
    host: "",
  });

  console.log("Host", hosts);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenCamera = () => {
    setShowWebcam(true);
  };

  const handleCloseCamera = () => {
    setShowWebcam(false);
  };

  const handleVisitorTypeChange = (e) => {
    setSelectedVisitorType(e.target.value);
  };
  const themeColor = useSelector((state) => state.theme.color);
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setShowWebcam(false);
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const pathSegments = location.pathname.split("/");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!token) {
          console.error("Site ID or token is missing in the URL");
          return;
        }

        console.log("Extracted site_id:", siteId);
        console.log("Extracted token:", token);
        const usersResp = await getHostList(siteId);
        console.log("API Response:", usersResp.data);

        if (usersResp.data.hosts) {
          setHosts(usersResp.data.hosts);
        } else {
          console.error("Hosts data missing in response:", usersResp.data);
        }
      } catch (error) {
        console.error(
          "Error fetching hosts:",
          error.response ? error.response.data : error,
        );
      }
    };

    fetchUsers();
  }, [location]);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        if (!siteId) return;

        const response = await getHostList(siteId);

        if (response?.data?.hosts) {
          setHosts(response.data.hosts);
        } else {
          setHosts([]);
        }
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };

    fetchHosts();
  }, [siteId]);

  const hostOptions = hosts.map((host) => ({
    value: host.id,
    label: host.full_name || host.name,
  }));

  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!formData.visitorName || !formData.mobile || !formData.purpose) {
      return toast.error("All fields are required");
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      return toast.error("Mobile number must be 10 digits");
    }

    if (!formData.host) {
      return toast.error("Please select Host");
    }

    const postData = new FormData();

    postData.append("visitor[created_by_id]", siteId);
    postData.append("visitor[name]", formData.visitorName);
    postData.append("visitor[contact_no]", formData.mobile);
    postData.append("visitor[purpose]", formData.purpose);
    postData.append("visitor[coming_from]", formData.comingFrom);
    postData.append("visitor[visit_type]", selectedVisitorType);

    // ✅ Correct host param
    postData.append("visitor[host_ids][]", formData.host);

    if (capturedImage) {
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      postData.append("visitor[profile_pic]", blob, "visitor.jpg");
    }

    try {
      toast.loading("Creating visitor...");
      const visitResp = await postNewVisitor(postData);

      console.log("Created Visitor:", visitResp.data);

      toast.dismiss();
      toast.success("Self Registration Added Successfully");
      navigate(`/admin/passes/visitors`);
    } catch (error) {
      toast.dismiss();
      console.log(error.response?.data || error);
    }
  };
  return (
      // <section className="flex">
      //       <Navbar />
    <div className="m-3 justify-center items-center w-full md:mx-5">
      <div className="md:border rounded-lg md:p-4 w-full">
        <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
          {t.title}
        </h2>
        <br />
        <div className="flex justify-center">
          {!showWebcam ? (
            <button onClick={handleOpenCamera}>
              <img
                src={capturedImage || image}
                alt="Uploaded"
                className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
              />
            </button>
          ) : (
            <div>
              <div className="rounded-full">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="rounded-full w-60 h-60 object-cover"
                />
              </div>
              <div className="flex gap-2 justify-center my-2 items-center">
                <button
                  onClick={capture}
                  className="bg-green-400 rounded-md text-white p-1 px-4"
                >
                  {t.capture}
                </button>
                <button
                  onClick={handleCloseCamera}
                  className="bg-red-400 rounded-md text-white p-1 px-4"
                >
                  {t.close}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="absolute right-20 top-30">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border p-2 rounded"
            placeholder="Select Language"
          >
            <option value="" disabled>
              Select Language
            </option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Marathi">Marathi</option>
          </select>
        </div>

        <div className="flex md:flex-row flex-col  my-5 gap-10">
          <div className="flex gap-2 flex-col">
            <h2 className="font-semibold">{t.Visitor} :</h2>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="Guest"
                  name="attendance"
                  value="Guest"
                  checked={selectedVisitorType === "Guest-SelfRegistration"}
                  onChange={handleVisitorTypeChange}
                />
                <label htmlFor="Guest" className="font-semibold ">
                  {t.guest}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="grid gap-2 items-center w-full">
            <label className="font-semibold">{t.visitorName}</label>
            <input
              type="text"
              name="visitorName"
              value={formData.visitorName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder={t.visitorNamePlaceholder}
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="mobileNumber" className="font-semibold">
              {t.mobile} :
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                if (value.length <= 10) {
                  setFormData({ ...formData, mobile: value });
                }
              }}
              className="border p-2 rounded w-full"
              placeholder={t.mobilePlaceholder}
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="" className="font-semibold">
              {t.host} :
            </label>
            <Select
              options={hostOptions}
              placeholder={t.hostPlaceholder}
              onChange={(selectedOption) =>
                setFormData({ ...formData, host: selectedOption?.value })
              }
              isSearchable
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="comingFrom" className="font-semibold">
              {t.comingFrom} :
            </label>
            <input
              type="text"
              id="comingFrom"
              className="border border-gray-400 p-2 rounded-md"
              placeholder={t.comingFromPlaceholder}
              name="comingFrom"
              value={formData.comingFrom}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="purpose" className="font-semibold">
              {t.purpose} :
            </label>
            <select
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded-md"
            >
              <option value="">{t.selectPurpose}</option>
              <option value="Meeting">{t.meeting}</option>
              <option value="Delivery">{t.delivery}</option>
              <option value="Personal">{t.personal}</option>
              <option value="Fitout Staff">{t.fitout}</option>
              <option value="Other">{t.other}</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 justify-end items-center my-4 mb-10 md:mx-5">
          <button
            className="bg-gray-300 text-black hover:bg-gray-400 font-semibold py-2 px-4 rounded"
            onClick={() => navigate(`/admin/passes/visitors`)}
          >
            {t.cancel}
          </button>
          <button
            className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            {t.submit}
          </button>
        </div>
      </div>
    </div>
    // </section>
  );
};

export default AddSelfRegistration;
