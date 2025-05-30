import React, { useState, useRef, useEffect, useCallback } from "react";
import image from "/profile.png";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import toast from "react-hot-toast";
import { getHostList, getSetupUsers, postNewVisitor } from "../../../api";
import { useNavigate } from "react-router-dom";
import FileInputBox from "../../../containers/Inputs/FileInputBox";

const EmployeeAddVisitor = () => {
  const siteId = getItemInLocalStorage("SITEID");
  const userId = getItemInLocalStorage("UserId");
  const [behalf, setbehalf] = useState("Visitor");
  const inputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [visitors, setVisitors] = useState([{ name: "", mobile: "" }]);
  const [hosts, setHosts] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState("Once");
  const [selectedVisitorType, setSelectedVisitorType] = useState("Guest");
  const [passStartDate, setPassStartDate] = useState("");
  const [passEndDate, setPassEndDate] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);

  const [formData, setFormData] = useState({
    visitorName: "",
    vhost_id: "",
    mobile: "",
    purpose: "",
    comingFrom: "",
    pass_number: "",
    vehicleNumber: "",
    expectedDate: new Date().toISOString().split("T")[0],
    expectedTime: "",
    hostApproval: false,
    goodsInward: false,
  });
  console.log(formData);
  const themeColor = useSelector((state) => state.theme.color);
  const handleFrequencyChange = (e) => {
    setSelectedFrequency(e.target.value);
  };
  const handleVisitorTypeChange = (e) => {
    setSelectedVisitorType(e.target.value);
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


  const fetchUsers = async () => {
    try {
      const usersResp = await getHostList(siteId);
      setHosts(usersResp.data.hosts);
      console.log(usersResp);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {

    fetchUsers();
  }, [])

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


  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();


  const createNewVisitor = async () => {
    // Check for required fields
    if (
      formData.visitorName === "" ||
      formData.purpose === "" ||
      formData.mobile === "" ||
      formData.vhost_id === ""
    ) {
      return toast.error("All fields are required");
    }
  
    // Validate mobile number
    const mobilePattern = /^\d{10}$/;
    if (!mobilePattern.test(formData.mobile)) {
      return toast.error("Mobile number must be 10 digits.");
    }
  
    // Prepare FormData
    const postData = new FormData();
    postData.append("visitor[site_id]", siteId);
    postData.append("visitor[created_by_id]", userId);
    postData.append("visitor[name]", formData.visitorName);
  
    // Handle profile_pic (file upload)
    if (imageFile) {
      postData.append("visitor[profile_pic]", imageFile, "visitor_image.jpg");
    } else if (capturedImage) {
      try {
        const response = await fetch(capturedImage); // Fetch the captured image
        const blob = await response.blob(); // Convert to blob
        postData.append("visitor[profile_pic]", blob, "visitor_image.jpg");
      } catch (error) {
        console.error("Error while processing the captured image:", error);
      }
    }
  
    // Append other form data
    postData.append("visitor[contact_no]", formData.mobile);
    postData.append("visitor[purpose]", formData.purpose);
    postData.append("visitor[start_pass]", passStartDate);
    postData.append("visitor[end_pass]", passEndDate);
    postData.append("visitor[coming_from]", formData.comingFrom);
    postData.append("visitor[vehicle_number]", formData.vehicleNumber);
    postData.append("visitor[expected_date]", formData.expectedDate);
    postData.append("visitor[expected_time]", formData.expectedTime);
    postData.append("visitor[pass_number]", formData.pass_number);
    postData.append("visitor[vhost_id]", formData.vhost_id);
    postData.append("visitor[skip_host_approval]", formData.hostApproval);
    postData.append("visitor[goods_inwards]", formData.goodsInward);
    postData.append("visitor[visit_type]", selectedVisitorType);
    postData.append("visitor[frequency]", selectedFrequency);
  
    // Add selected weekdays
    selectedWeekdays.forEach((day) => {
      postData.append("visitor[working_days][]", day);
    });
    // Only send extra visitors if there are any
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
  
    // Send the data to the backend
    try {
      const visitResp = await postNewVisitor(postData);
      console.log(visitResp);
      navigate("/employee/passes/visitors");
      toast.success("Visitor Added Successfully");
    } catch (error) {
      console.error("Error while creating visitor:", error);
      toast.error("Failed to create visitor. Please try again.");
    }
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
    }
  };
  const userType = getItemInLocalStorage("USERTYPE");
  return (
    <div className="flex justify-center items-center  w-full p-4">
      <div className="md:border border-gray-300 rounded-lg md:p-4 w-full md:mx-4 ">
        <h2
          style={{ background: "rgb(19 27 38)" }}
          className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white"
        >
          {getHeadingText()}
        </h2>
        <br />

        {behalf !== "Cab" && behalf !== "Delivery" && (
          <div
            onClick={handleImageClick}
            className="cursor-pointer flex justify-center items-center my-4"
          >
            {imageFile ? (
              <img
                src={URL.createObjectURL(imageFile)}
                // src={imageFile || image}
                alt="Uploaded"
                className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
              />
            ) : (
              <img
                src={image}
                alt="Default"
                className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
              />
            )}
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
              accept=".jpg, .jpeg, .png"
            />
          </div>
        )}
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
                Support Category :
              </label>
              <select className="border border-gray-400 p-2 rounded-md">
                <option value="">Select Support Staff Category</option>
                <option value="">Test Category</option>
                <option value="">Test Category - 2</option>
                <option value="">Test Category - 3</option>
              </select>
            </div>
          )}
          {behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="visitorName" className="font-semibold">
                Visitor Name:
              </label>
              <input
                value={formData.visitorName}
                onChange={handleChange}
                type="text"
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
                Mobile Number:
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
              Host : <label>*</label>
            </label>
            <select
              className="border border-gray-400 p-2 rounded-md"
              value={formData.vhost_id}
              onChange={handleChange}
              name="vhost_id"
            >
              <option value="">Select Person to meet</option>
              {hosts.map((host) => (
                <option value={host.id} key={host.id}>
                  {host.name}
                </option>
              ))}
            </select>
          </div>
          {behalf !== "Delivery" && behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="additionalVisitor" className="font-semibold">
                Pass Number
              </label>
              <input
                type="text" // Change this to "text" instead of "pass_number"
                id="additionalVisitor"
                name="pass_number" // Add a name attribute for easier identification
                value={formData.pass_number || ""} // Ensure it has a fallback value
                onChange={handleChange} // Add onChange handler
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
              className="border border-gray-400 p-2 rounded-md"
              onChange={handleChange}
              name="expectedTime"
              value={formData.expectedTime}
            />
          </div>

          {behalf !== "Delivery" && behalf !== "Cab" && (
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="purpose" className="font-semibold">
                Visit Purpose:
              </label>
              <select
                id="purpose"
                className="border border-gray-400 p-2 rounded-md"
                value={formData.purpose}
                onChange={handleChange}
                name="purpose"
              >
                <option value="">Select Purpose</option>
                <option value="Meeting">Meeting</option>
                <option value="Delivery">Delivery</option>
                <option value="Personal">Personal</option>
                <option value="Fitout Staff">Fitout Staff</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}
        </div>
        <span className="my-2">
          {userType !== "security_guard" && (
            <>
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
              &nbsp;<label htmlFor="">Skip Host Approval</label>
              &nbsp;&nbsp;&nbsp;
            </>
          )}
          <input
            type="checkbox"
            id="goods"
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
        {formData.goodsInward && (
          <>
            <div className="grid grid-cols-3 gap-2  my-2">
              <div className="flex flex-col gap-2">
                <p className="font-medium">No. of Goods :</p>
                <input
                  type="number"
                  name=""
                  id=""
                  className="border border-gray-400 p-2 rounded-md w-full"
                  placeholder="Enter Number "
                />
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <p className="font-medium ">Description :</p>
                <textarea
                  name=""
                  id=""
                  className="border border-gray-400 p-2 rounded-md w-full"
                  rows={1}
                  placeholder="Enter Description"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Attachments Related to goods </p>
              <FileInputBox />
            </div>
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
                  className={` rounded-md p-2 px-4 shadow-custom-all-sides font-medium ${selectedWeekdays?.includes(weekdayObj.day)
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
        <div className="flex gap-5 justify-center items-center my-4">
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

export default EmployeeAddVisitor;
