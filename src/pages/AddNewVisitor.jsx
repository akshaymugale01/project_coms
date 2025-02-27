import React, { useState, useRef, useEffect, useCallback } from "react";
import image from "/profile.png";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../utils/localStorage";
import toast from "react-hot-toast";
import {
  getAllUnits,
  getBuildings,
  getFloors,
  getfloorsType,
  getHostList,
  getParkingConfig,
  getSetupUsers,
  getUnits,
  getVisitorByNumber,
  getVisitorStaffCategory,
  postNewGoods,
  postNewVisitor,
  postVisitorOTPApi,
} from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import Webcam from "react-webcam";
import FileInputBox from "../containers/Inputs/FileInputBox";
const AddNewVisitor = () => {
  const siteId = getItemInLocalStorage("SITEID");
  const userId = getItemInLocalStorage("UserId");
  const [behalf, setbehalf] = useState("Visitor");
  const inputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [visitors, setVisitors] = useState([{ name: "", contact_no: "" }]);
  const [selectedFrequency, setSelectedFrequency] = useState("Once");
  const [selectedVisitorType, setSelectedVisitorType] = useState("Guest");
  const [hosts, setHosts] = useState([]);
  const [passStartDate, setPassStartDate] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [slots, setSlots] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const webcamRef = useRef(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  // const history = useHistory();
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const handleOpenCamera = () => {
    setShowWebcam(true);
  };
  console.log("floors", floors);
  console.log("Units", units);
  const handleCloseCamera = () => {
    setShowWebcam(false);
  };
  // const capture = useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   console.log(imageSrc);
  //   setShowWebcam(false);
  //   setCapturedImage(imageSrc);
  // }, [webcamRef]);
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc); // Save captured image
    setShowWebcam(false); // Close the webcam after capturing
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Save uploaded image file
      setCapturedImage(null); // Reset captured image if uploading a file
    }
  };
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0"); // Ensure two digits
    const minutes = now.getMinutes().toString().padStart(2, "0"); // Ensure two digits
    return `${hours}:${minutes}`;
  };
  const [staffCategories, setStaffCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const mobile = searchParams.get("mobile");
  // const [formData, setFormData] = useState(null);
  
  const [passEndDate, setPassEndDate] = useState("");
  const [formData, setFormData] = useState({
    visitorName: "",
    mobile: "",
    purpose: "",
    comingFrom: "",
    vehicleNumber: "",
    expectedDate: new Date().toISOString().split("T")[0],
    expectedTime: getCurrentTime(),
    hostApproval: false,
    goodsInward: false,
    host: "",
    profile_picture: "",
    passNumber: "",
    noOfGoods: "",
    goodsDescription: "",
    goodsAttachments: [],
    supportCategory: "",
    slotNumber: "",
    vhost_id: "",
    building_id: "",
    unit_id: "",
    floor_id: "",
  });

  const fetchDetails = async () => {
    if (!mobile) return;
    try {
      const details = await getVisitorByNumber(mobile);
      if (details?.data) {
        const data = details?.data
        setFormData({
          ...formData,
          visitorName: data.name,
          mobile: data.contact_no,
          purpose: data.purpose,
          comingFrom: data.coming_from,
          vehicleNumber: data.vehicle_no,
          vhost_id: data.vhost_id,
          expectedDate: data.expected_date,
          expectedTime: data.expected_time,
          hostApproval: data.skip_host_approval,
          goodsInward: data.goods_inwards,
          host: data.created_by_id,
          supportCategory: data.support_category_id,
          additionalVisitors: visitors,
          passNumber: data.pass_number,
          building_id: data.building_id,
          unit_id: data.unit_id,
          floor_id: data.floor_id,
          noOfGoods: data.no_of_goods,
          goodsDescription: data.goods_description,
          goodsAttachments: data.goods_attachments,
        });

        setVisitors(data.extra_visitors || []);
      } else {
        console.warn("No visitor data found");
        setFormData({}); 
        setVisitors([]);
      }
    } catch (error) {
      console.error("Error fetching visitor details:", error);
      setFormData({}); 
      setVisitors([]);
    }
  };

  console.log("User", visitors);

  useEffect(() => {
    fetchDetails();
  }, [mobile]);
  console.log("By Mobile Number", formData);
  console.log("By Visitor", visitors);
  const handleFrequencyChange = (e) => {
    setSelectedFrequency(e.target.value);
  };
  const handleVisitorTypeChange = (e) => {
    setSelectedVisitorType(e.target.value);
  };
  const currentDates = new Date();
  const year = currentDates.getFullYear();
  const month = String(currentDates.getMonth() + 1).padStart(2, "0");
  const day = String(currentDates.getDate()).padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [weekdaysMap, setWeekdaysMap] = useState([
    { day: "Mon", index: 0, isActive: false },
    { day: "Tue", index: 1, isActive: false },
    { day: "Wed", index: 2, isActive: false },
    { day: "Thu", index: 3, isActive: false },
    { day: "Fri", index: 4, isActive: false },
    { day: "Sat", index: 5, isActive: false },
    { day: "Sun", index: 6, isActive: false },
  ]);
  console.log(selectedWeekdays);
  const handleWeekdaySelection = (weekday) => {
    console.log(`Selected day: ${weekday}`);
    const index = weekdaysMap.find((dayObj) => dayObj.day === weekday)?.index;
    if (index !== undefined) {
      const updatedWeekdaysMap = weekdaysMap.map((dayObj) =>
        dayObj.index === index
          ? { ...dayObj, isActive: !dayObj.isActive }
          : dayObj
      );
      setWeekdaysMap(updatedWeekdaysMap);
      setSelectedWeekdays((prevSelectedWeekdays) =>
        prevSelectedWeekdays.includes(weekday)
          ? prevSelectedWeekdays.filter((day) => day !== weekday)
          : [...prevSelectedWeekdays, weekday]
      );
      // setSelectedWeekdays((prevSelectedWeekdays) =>
      //   prevSelectedWeekdays.includes(index)
      //     ? prevSelectedWeekdays.filter((day) => day !== index)
      //     : [...prevSelectedWeekdays, index]
      // );
    }
  };
  const handleAddVisitor = (event) => {
    event.preventDefault();
    setVisitors([...visitors, { name: "", mobile: "" }]);
  };
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newVisitors = [...visitors];
    newVisitors[index][name] = value;
    setVisitors(newVisitors);
  };
  const handleRemoveVisitor = (index) => {
    const newVisitors = [...visitors];
    newVisitors.splice(index, 1);
    setVisitors(newVisitors);
  };
  const getHeadingText = () => {
    switch (behalf) {
      case "Visitor":
        return "NEW VISITOR";
      case "Delivery":
        return "DELIVERY & SUPPORT STAFF";
      case "Cab":
        return "CAB";
      default:
        return "CREATE VISITOR";
    }
  };
  const themeColor = useSelector((state) => state.theme.color);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  const otp = generateOtp();
  const handleFileChange = (files, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
  };
  const navigate = useNavigate();
  const createNewVisitor = async () => {
    if (
      formData.visitorName === "" ||
      formData.purpose === "" ||
      formData.mobile === ""
    ) {
      return toast.error("All fields are Required");
    }
    const mobilePattern = /^\d{10}$/;
    if (!mobilePattern.test(formData.mobile)) {
      return toast.error("Mobile number must be  10 digits.");
    }
    if (!formData.host) {
      toast.error("Host Must be Present!");
      return;
    }
    const postData = new FormData();
    postData.append("visitor[site_id]", siteId);
    postData.append("visitor[created_by_id]", formData.host);
    postData.append("visitor[name]", formData.visitorName);
    postData.append(
      "visitor[visitor_staff_category_id]",
      formData.supportCategory
    );
    postData.append("visitor[contact_no]", formData.mobile);
    postData.append("visitor[purpose]", formData.purpose);
    postData.append("visitor[start_pass]", passStartDate);
    postData.append("visitor[end_pass]", passEndDate);
    postData.append("visitor[coming_from]", formData.comingFrom);
    postData.append("visitor[vehicle_number]", formData.vehicleNumber);
    postData.append("visitor[expected_date]", formData.expectedDate);
    postData.append("visitor[expected_time]", formData.expectedTime);
    postData.append("visitor[skip_host_approval]", formData.hostApproval);
    postData.append("visitor[goods_inwards]", formData.goodsInward);
    postData.append("visitor[visit_type]", selectedVisitorType);
    postData.append("visitor[pass_number]", formData.passNumber);
    postData.append("visitor[frequency]", selectedFrequency);
    postData.append("visitor[parking_slot]", formData.slotNumber);
    postData.append("visitor[vhost_id]", formData.host);
    postData.append("visitor[building_id]", formData.building_id);
    postData.append("visitor[unit_id]", formData.unit_id);
    postData.append("visitor[floor_id]", formData.floor_id);
    if (capturedImage) {
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      postData.append("visitor[profile_pic]", blob, "visitor_image.jpg");
    } else if (imageFile) {
      postData.append("visitor[profile_pic]", imageFile, imageFile.name);
    }
    const blob = await fetch(capturedImage).then((res) => res.blob());
    selectedWeekdays.forEach((day) => {
      postData.append("visitor[working_days][]", day);
    });
    if (visitors.length > 0) {
      visitors.forEach((extraVisitor, index) => {
        if (extraVisitor.name || extraVisitor.mobile) {
          if (extraVisitor.name) {
            postData.append(
              `visitor[extra_visitors_attributes][${index}][name]`,
              extraVisitor.name
            );
          }
          if (extraVisitor.mobile) {
            postData.append(
              `visitor[extra_visitors_attributes][${index}][contact_no]`,
              extraVisitor.mobile
            );
          }
        }
      });
    }
    try {
      toast.loading("Creating new visitor Please wait!");
      const visitResp = await postNewVisitor(postData);
      const postGoods = new FormData();
      formData.goodsAttachments.forEach((docs) => {
        postGoods.append("goods_files[]", docs);
      });
      postGoods.append("goods_in_out[visitor_id]", visitResp.data.id);
      postGoods.append("goods_in_out[no_of_goods]", formData.noOfGoods);
      postGoods.append("goods_in_out[description]", formData.noOfGoods);
      postGoods.append("goods_in_out[ward_type]", "in");
      postGoods.append("goods_in_out[vehicle_no]", formData.vehicleNumber);
      postGoods.append("goods_in_out[person_name]", formData.visitorName);
      postGoods.append("goods_in_out[created_by_id]", userId);
      try {
        const goodsRes = await postNewGoods(postGoods);
        console.log(goodsRes);
      } catch (error) {
        console.log(error);
      }
      console.log(visitResp);
      navigate("/admin/passes/visitors");
      toast.dismiss();
      toast.success("Visitor Added Successfully");
    } catch (error) {
      console.log(error);
      toast.dismiss();
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResp = await getHostList(siteId);
        const unitsRes = await getBuildings();
        const floors = await getfloorsType();
        const unitsget = await getAllUnits();
        fetchDetails();
        setHosts(usersResp.data.hosts);
        setBuildings(unitsRes.data);
        setFloors(floors.data);
        setUnits(unitsget.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchVisitorCategory = async () => {
      try {
        const visitorCat = await getVisitorStaffCategory();
        setStaffCategories(visitorCat.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchParkingConfig = async () => {
      try {
        const parkingRes = await getParkingConfig();
        setSlots(parkingRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
    fetchVisitorCategory();
    fetchParkingConfig();
  }, []);
  console.log("buildings", buildings);
  useEffect(() => {
    if (selectedBuilding) {
      const filteredFloors = floors.filter(
        (floor) => floor.building_id === Number(selectedBuilding)
      );
      const filteredUnits = units.filter(
        (unit) => unit.building_id === Number(selectedBuilding)
      );

      const combinedData = filteredFloors.map((floor) => ({
        floorId: floor.id,
        floorName: floor.name,
        units: filteredUnits.filter((unit) => unit.floor_id === floor.id),
      }));
      setFilteredData(combinedData);
    } else {
      setFilteredData([]);
    }
  }, [selectedBuilding, floors, units]);
  const filteredFloors = floors.filter(
    (floor) => floor.building_id === Number(selectedBuilding)
  );
  // Filter Units based on selected Floor
  const filteredUnits = units.filter(
    (unit) => unit.floor_id === Number(selectedFloor)
  );
  const handleBuildingChange = (e) => {
    const selectedBuildingId = e.target.value;
    const selectedUnitId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      building_id: selectedBuildingId,
      floor_id: "", // Reset floor selection
      unit_id: "", // Reset unit selection
    }));
    setSelectedBuilding(selectedBuildingId);
  };
  const handleUnitChange = (unitId) => {
    setFormData((prev) => ({
      ...prev,
      unit_id: unitId,
    }));
    setSelectedUnit(unitId);
  };
  return (
    <div className="flex justify-center items-center  w-full p-4">
      <div className="md:border border-gray-300 rounded-lg md:p-4 w-full md:mx-4 ">
        <h2
          style={{ background: "themeColor" }}
          className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white"
        >
          {getHeadingText()}
        </h2>
        <br />
        <div className="flex justify-center">
          {!showWebcam ? (
            <div className="flex flex-col items-center">
              {/* Button to Open Camera */}
              <button onClick={handleOpenCamera}>
                <img
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : capturedImage || image
                  }
                  alt="Uploaded or Captured"
                  className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
                />
              </button>
              {/* Upload Image from Local */}
              <div className="mt-4">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-400 rounded-md text-white p-1 px-4"
                >
                  Upload Image
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          ) : (
            <div>
              {/* Webcam Section */}
              <div className="rounded-full">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="rounded-full w-60 h-60 object-cover"
                />
              </div>
              {/* Webcam Buttons */}
              <div className="flex gap-2 justify-center my-2 items-center">
                <button
                  onClick={capture}
                  className="bg-green-400 rounded-md text-white p-1 px-4"
                >
                  Capture
                </button>
                <button
                  onClick={handleCloseCamera}
                  className="bg-red-400 rounded-md text-white p-1 px-4"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex md:flex-row flex-col  my-5 gap-10">
          <div className="flex gap-2 flex-col">
            <h2 className="font-semibold">Visitor Type :</h2>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="Guest"
                  name="attendance"
                  value="Guest"
                  checked={selectedVisitorType === "Guest"}
                  onChange={handleVisitorTypeChange}
                />
                <label htmlFor="Guest" className="font-semibold ">
                  Guest
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="Support Staff"
                  name="attendance"
                  value="Support Staff"
                  checked={selectedVisitorType === "Support Staff"}
                  onChange={handleVisitorTypeChange}
                />
                <label htmlFor="Support Staff" className="font-semibold ">
                  Support Staff
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="font-semibold">Visiting Frequency :</h2>
            <div className="flex items-center gap-4 ">
              <div className="flex items-center gap-2 ">
                <input
                  type="radio"
                  id="Once"
                  name="frequency"
                  value="Once"
                  checked={selectedFrequency === "Once"}
                  onChange={handleFrequencyChange}
                />
                <label htmlFor="Once" className="font-semibold">
                  Once
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="Frequently"
                  name="frequency"
                  value="Frequently"
                  checked={selectedFrequency === "Frequently"}
                  onChange={handleFrequencyChange}
                />
                <label htmlFor="Frequently" className="font-semibold ">
                  Frequently
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {selectedVisitorType === "Support Staff" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="" className="font-medium">
                Select Support Staff Category :
              </label>
              <select
                className="border border-gray-400 p-2 rounded-md"
                value={formData.supportCategory}
                onChange={handleChange}
                name="supportCategory"
              >
                <option value="">Select Category</option>
                {staffCategories.map((staffCat) => (
                  <option value={staffCat.id} key={staffCat.id}>
                    {staffCat.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="visitorName" className="font-semibold">
                Visitor Name:{" "}
                <label className="text-red-500 font-semibold">*</label>
              </label>
              <input
                type="text"
                value={formData.visitorName}
                onChange={handleChange}
                name="visitorName"
                id="visitorName"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Visitor Name"
              />
            </div>
          )}
          {behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="mobileNumber" className="font-semibold">
                Mobile Number :{" "}
                <label className="text-red-500 font-semibold">*</label>
              </label>
              <input
                type="number"
                value={formData.mobile}
                onChange={handleChange}
                name="mobile"
                id="mobileNumber"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Mobile Number"
              />
            </div>
          )}
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="" className="font-medium">
              Host : <label className="text-red-500 font-semibold">*</label>
            </label>
            <select
              className="border border-gray-400 p-2 rounded-md"
              value={formData.host}
              onChange={handleChange}
              name="host"
            >
              <option value="">Select Person to meet</option>
              {hosts.map((host) => (
                <option value={host.id} key={host.id}>
                  {host.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-medium">
              Select Building: <span className="text-red-500">*</span>
            </label>
            <select
              className="border p-3 border-gray-300 rounded-md w-full"
              value={formData.building_id}
              onChange={handleBuildingChange} // Updated event handler
            >
              <option value="">Select Building</option>
              {buildings.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.name}
                </option>
              ))}
            </select>
          </div>
          {filteredData.length > 0 && (
            <div className="border border-gray-300 rounded-md p-3 mt-3">
              <h3 className="font-semibold mb-2">Select Unit</h3>

              {/* Single Unit Dropdown */}
              <select
                className="border p-3 border-gray-300 rounded-md w-full mt-2"
                value={formData.unit_id || ""}
                onChange={(e) => handleUnitChange(e.target.value)}
              >
                <option value="">Select Unit</option>
                {filteredData.flatMap((floor) =>
                  floor.units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {`Floor: ${floor.floorName} - Unit: ${unit.name}`}
                    </option>
                  ))
                )}
              </select>
            </div>
          )}
          {/* Select Floor */}
          {/* <div>
            <label className="font-medium">
              Select Floor: <span className="text-red-500">*</span>
            </label>
            <select
              className="border p-3 border-gray-300 rounded-md w-full"
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              disabled={!selectedBuilding} // Disable if no building selected
            >
              <option value="">Select Floor</option>
              {filteredFloors.map((floor) => (
                <option key={floor.id} value={floor.id}>
                  {floor.name}
                </option>
              ))}
            </select>
          </div> */}
          {/* Select Unit */}
          {/* <div>
            <label className="font-medium">
              Select Unit: <span className="text-red-500">*</span>
            </label>
            <select
              className="border p-3 border-gray-300 rounded-md w-full"
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              disabled={!selectedFloor} // Disable if no floor selected
            >
              <option value="">Select Unit</option>
              {filteredUnits.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div> */}
          {behalf !== "Delivery" && behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="additionalVisitor" className="font-semibold">
                Pass Number
              </label>
              <input
                type="text"
                value={formData.passNumber}
                onChange={handleChange}
                name="passNumber"
                id="additionalVisitor"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Pass number"
              />
            </div>
          )}
          {behalf !== "Delivery" && behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="comingFrom" className="font-semibold">
                Coming from:
              </label>
              <input
                type="text"
                id="comingFrom"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Origin"
                value={formData.comingFrom}
                name="comingFrom"
                onChange={handleChange}
              />
            </div>
          )}
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="vehicleNumber" className="font-semibold">
              Vehicle Number:
            </label>
            <input
              type="text"
              id="vehicleNumber"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Vehicle Number"
              value={formData.vehicleNumber}
              name="vehicleNumber"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="slotNumber" className="font-semibold">
              Select parking Slot
            </label>
            <select
              name="slotNumber"
              value={formData.slotNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Slot</option>
              {slots.map((slot) => (
                <option value={slot.id} key={slot.id}>
                  {slot.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="expectedDate" className="font-semibold">
              Expected Date:
            </label>
            <input
              type="date"
              id="expectedDate"
              className="border border-gray-400 p-2 rounded-md"
              value={formData.expectedDate}
              onChange={handleChange}
              name="expectedDate"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="expectedTime" className="font-semibold">
              Expected Time:
            </label>
            <input
              type="time"
              id="expectedTime"
              value={formData.expectedTime}
              onChange={handleChange}
              name="expectedTime"
              className="border border-gray-400 p-2 rounded-md"
            />
          </div>
          {behalf !== "Delivery" && behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="purpose" className="font-semibold">
                Visit Purpose:{" "}
                <label className="text-red-500 font-semibold">*</label>
              </label>
              <select
                id="purpose"
                value={formData.purpose}
                onChange={handleChange}
                name="purpose"
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">Select Purpose</option>
                <option value="Meeting">Meeting</option>
                <option value="Delivery">Delivery</option>
                <option value="Personal">Personal</option>
                <option value="Fitout Staff">Fitout Staff</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}
          <span>
            <input
              type="checkbox"
              value={formData.hostApproval}
              checked={formData.hostApproval}
              onChange={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  hostApproval: !prevState.hostApproval,
                }))
              }
              id="hostApproval"
            />
            &nbsp;<label htmlFor="hostApproval">Skip Host Approval</label>
            &nbsp;&nbsp;&nbsp;
            <input
              id="goods"
              type="checkbox"
              value={formData.goodsInward}
              onChange={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  goodsInward: !prevState.goodsInward,
                }))
              }
            />
            &nbsp;&nbsp;<label htmlFor="goods">Goods Inwards</label>
          </span>
        </div>
        {formData.goodsInward && (
          <>
            <div className="grid grid-cols-3 gap-2  my-2">
              <div className="flex flex-col gap-2">
                <p className="font-medium">No. of Goods :</p>
                <input
                  type="number"
                  name="noOfGoods"
                  id=""
                  className="border border-gray-400 p-2 rounded-md w-full"
                  placeholder="Enter Number "
                  value={formData.noOfGoods}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <p className="font-medium ">Description :</p>
                <textarea
                  name="goodsDescription"
                  id=""
                  value={formData.goodsDescription}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md w-full"
                  rows={1}
                  placeholder="Enter Description"
                ></textarea>
              </div>
            </div>

            <FileInputBox
              handleChange={(files) =>
                handleFileChange(files, "goodsAttachments")
              }
              fieldName={"goodsAttachments"}
              isMulti={true}
            />
          </>
        )}
        <h2 className="font-medium border-b-2 mt-5 border-black">
          Additional Visitor
        </h2>
        <div className="grid md:grid-cols-3 gap-3 mt-5">
          {visitors.map((visitor, index) => (
            <div key={index}>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="" className="font-semibold">
                  Name:
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="border border-gray-400 p-2 rounded-md"
                  value={visitor.name}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              &nbsp;&nbsp;
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="" className="font-semibold">
                  Mobile:
                </label>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  name="mobile"
                  className="border border-gray-400 p-2 rounded-md"
                  value={visitor.mobile}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <button onClick={() => handleRemoveVisitor(index)}>
                  <FaTrash />
                </button>
                &nbsp;
              </div>
            </div>
          ))}

          <div>
            <button
              onClick={handleAddVisitor}
              className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
            >
              Add Additional Visitor
            </button>
          </div>
        </div>
        {selectedFrequency === "Frequently" && (
          <div className="flex flex-col gap-2 my-2">
            <div className="grid md:grid-cols-3 gap-4 ">
              <div className="flex flex-col">
                <p className="font-medium"> Pass Valid From :</p>
                <input
                  type="date"
                  min={todayDate}
                  value={passStartDate}
                  onChange={(event) => setPassStartDate(event.target.value)}
                  className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-medium">Pass Valid To :</p>
                <input
                  type="date"
                  min={todayDate}
                  value={passEndDate}
                  onChange={(event) => setPassEndDate(event.target.value)}
                  className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                />
              </div>
            </div>
            <p className="font-medium">Select Permitted Days:</p>

            <div className="flex gap-4 flex-wrap ">
              {weekdaysMap.map((weekdayObj) => (
                <button
                  key={weekdayObj.day}
                  className={` rounded-md p-2 px-4 shadow-custom-all-sides font-medium ${
                    selectedWeekdays?.includes(weekdayObj.day)
                      ? // &&
                        // weekdayObj.isActive
                        "bg-green-400 text-white "
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleWeekdaySelection(weekdayObj.day);
                  }}
                >
                  <a>{weekdayObj.day}</a>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-5 justify-center items-center my-4 mb-10">
          <button
            onClick={createNewVisitor}
            className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewVisitor;
