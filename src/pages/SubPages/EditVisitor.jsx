import React, { useState, useRef, useEffect } from "react";
import image from "/profile.png";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";

import toast from "react-hot-toast";
import {
  domainPrefix,
  editVisitorDetails,
  getSetupUsers,
  getVisitorDetails,
  postNewVisitor,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useNavigate, useParams } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import Navbar from "../../components/Navbar";

const EditVisitor = () => {
  const siteId = getItemInLocalStorage("SITEID");
  const userId = getItemInLocalStorage("UserId");
  const [behalf, setbehalf] = useState("Visitor");
  const inputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [visitors, setVisitors] = useState([
    { id: "", name: "", mobile: "", _destroy: "0" },
  ]);
  const [selectedFrequency, setSelectedFrequency] = useState("Once");
  const [selectedVisitorType, setSelectedVisitorType] = useState("Guest");
  const [hosts, setHosts] = useState([]);
  const [passStartDate, setPassStartDate] = useState("");
  const [passEndDate, setPassEndDate] = useState("");
  const [formData, setFormData] = useState({
    visitorName: "",
    mobile: "",
    purpose: "",
    comingFrom: "",
    vehicleNumber: "",
    expectedDate: "",
    expectedTime: "",
    hostApproval: false,
    goodsInward: false,
    host: "",
    passNumber: "",
    notes: "",
  });

  const { id } = useParams();
  useEffect(() => {
    const fetchVisitorDetails = async () => {
      try {
        const detailsResp = await getVisitorDetails(id);
        const editDetail = detailsResp.data;
        setDetails(detailsResp.data);
        console.log(editDetail);
        setFormData({
          ...formData,
          visitorName: editDetail.name,
          mobile: editDetail.contact_no,
          purpose: editDetail.purpose,
          host: editDetail.created_by_id,
          comingFrom: editDetail.coming_from,
          vehicleNumber: editDetail.vehicle_number,
          expectedDate: editDetail.expected_date,
          expectedTime: editDetail.expected_time,
          hostApproval: editDetail.skip_host_approval,
          goodsInward: editDetail.goods_inwards,
        });
        if (editDetail.extra_visitors) {
          setVisitors(
            editDetail.extra_visitors.map((visitor) => ({
              id: visitor.id,
              name: visitor.name,
              mobile: visitor.contact_no,
            }))
          );
        }
        setSelectedVisitorType(editDetail.visit_type);
        setSelectedFrequency(editDetail.frequency);
        const formattedStartPass = new Date(editDetail.start_pass)
          .toISOString()
          .split("T")[0];
        const formattedEndPass = new Date(editDetail.end_pass)
          .toISOString()
          .split("T")[0];
        setPassStartDate(formattedStartPass);
        setPassEndDate(formattedEndPass);
        setSelectedWeekdays(editDetail.working_days);
        console.log(detailsResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVisitorDetails();
  }, [id]);
  console.log(formData);
  const handleFrequencyChange = (e) => {
    setSelectedFrequency(e.target.value);
  };
  const handleVisitorTypeChange = (e) => {
    setSelectedVisitorType(e.target.value);
  };
  console.log(passEndDate);
  console.log(passStartDate);
  console.log(formData.expectedDate);

  const currentDates = new Date();
  const year = currentDates.getFullYear();
  const month = String(currentDates.getMonth() + 1).padStart(2, "0");
  const day = String(currentDates.getDate()).padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [details, setDetails] = useState({});
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

      // Update the selected weekdays list
      setSelectedWeekdays((prevSelectedWeekdays) =>
        prevSelectedWeekdays.includes(weekday)
          ? prevSelectedWeekdays.filter((day) => day !== weekday)
          : [...prevSelectedWeekdays, weekday]
      );
    }
  };
  const handleAddVisitor = (event) => {
    event.preventDefault();
    setVisitors([...visitors, { name: "", mobile: "" }]);
  };

  // const handleInputChange = (index, event) => {
  //   const { name, value } = event.target;
  //   const newVisitors = [...visitors];
  //   newVisitors[index][name] = value;
  //   setVisitors(newVisitors);
  // };
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedVisitors = [...visitors];
    updatedVisitors[index] = {
      ...updatedVisitors[index],
      [name]: value,
    };
    setVisitors(updatedVisitors);
  };

  // const handleRemoveVisitor = (index) => {
  //   const newVisitors = [...visitors];
  //   newVisitors.splice(index, 1);
  //   setVisitors(newVisitors);
  // };
  const handleRemoveVisitor = (index) => {
    setVisitors((prevVisitors) => {
      const updatedVisitors = [...prevVisitors];
      if (updatedVisitors[index].id) {
        updatedVisitors[index]._destroy = "1";
      } else {
        updatedVisitors.splice(index, 1);
      }
      return updatedVisitors;
    });
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };
  const themeColor = useSelector((state) => state.theme.color);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleEditVisitor = async () => {
    if (
      formData.visitorName === "" ||
      formData.purpose === "" ||
      formData.mobile === ""
    ) {
      return toast.error("All fields are Required");
    }

    const postData = new FormData();
    postData.append("visitor[site_id]", siteId);
    postData.append("visitor[created_by_id]", formData.host);
    postData.append("visitor[name]", formData.visitorName);
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
    postData.append("visitor[frequency]", selectedFrequency);
    selectedWeekdays.forEach((day) => {
      postData.append("visitor[working_days][]", day);
    });
    visitors.forEach((extraVisitor, index) => {
      if (extraVisitor.id) {
        postData.append(
          `visitor[extra_visitors_attributes][${index}][id]`,
          extraVisitor.id
        );
      }
      postData.append(
        `visitor[extra_visitors_attributes][${index}][name]`,
        extraVisitor.name
      );
      postData.append(
        `visitor[extra_visitors_attributes][${index}][contact_no]`,
        extraVisitor.mobile
      );
      if (extraVisitor._destroy) {
        postData.append(
          `visitor[extra_visitors_attributes][${index}][_destroy]`,
          extraVisitor._destroy
        );
      }
    });
    try {
      const visitResp = await editVisitorDetails(id, postData);
      console.log(visitResp);
      navigate(`/admin/passes/visitors/visitor-details/${visitResp.data.id}`);
      toast.success("Visitor Edited Successfully")
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const usersResp = await getSetupUsers();
      setHosts(usersResp.data);
      console.log(usersResp);
    };
    fetchUsers();
  }, []);

  return (
    <section className="flex">
        <Navbar />
        <div className=" w-full flex mx-3  flex-col overflow-hidden">
    <div className="flex justify-center items-center  w-full p-4">
      <div className="md:border border-gray-300 rounded-lg md:p-4 w-full md:mx-4 ">
       
        <h2
          style={{ background: themeColor }}
          className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white"
        >
          Edit visitor
        </h2>
        <br />

        <div
          onClick={handleImageClick}
          className="cursor-pointer flex justify-center items-center my-4"
        >
          {/* {imageFile ? (
            <img
              src={URL.createObjectURL(imageFile)}
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
          /> */}
           {details.visitor_files && details.visitor_files.length > 0 ? (
              details.visitor_files.map((doc, index) => (  
                <img src={domainPrefix + doc.document} alt="" className="w-48 h-48 rounded-full cursor-pointer"  onClick={() => window.open(domainPrefix + doc.document, "_blank")}/>
               ))
            ) : (
            <img src={image} alt="" className="w-48 h-48" />
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
                  id="staff"
                  name="attendance"
                  value="Support Staff"
                  checked={selectedVisitorType === "Support Staff"}
                  onChange={handleVisitorTypeChange}
                />
                <label htmlFor="staff" className="font-semibold ">
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
                  id="once"
                  name="frequency"
                  value="Once"
                  checked={selectedFrequency === "Once"}
                  onChange={handleFrequencyChange}
                />
                <label htmlFor="once" className="font-semibold">
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

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="visitorName" className="font-semibold">
              Visitor Name:
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

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="mobileNumber" className="font-semibold">
              Mobile Number :
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

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="" className="font-medium">
              Host :
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
                  {host.firstname} {host.lastname}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="additionalVisitor" className="font-semibold">
              Pass Number
            </label>
            <input
              value={formData.passNumber}
              onChange={handleChange}
              name="passNumber"
              type="number"
              id="additionalVisitor"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Pass number"
            />
          </div>

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="comingFrom" className="font-semibold">
              Coming from:
            </label>
            <input
              type="text"
              value={formData.comingFrom}
              onChange={handleChange}
              name="comingFrom"
              id="comingFrom"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Origin"
            />
          </div>

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="vehicleNumber" className="font-semibold">
              Vehicle Number:
            </label>
            <input
              type="text"
              value={formData.vehicleNumber}
              onChange={handleChange}
              name="vehicleNumber"
              id="vehicleNumber"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Vehicle Number"
            />
          </div>

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="notes" className="font-semibold">
              Notes:
            </label>
            <input
              type="text"
              id="notes"
              value={formData.notes}
              onChange={handleChange}
              name="notes"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Notes"
            />
          </div>

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="expectedDate" className="font-semibold">
              Expected Date:
            </label>
            <input
              type="date"
              value={formData.expectedDate}
              onChange={handleChange}
              name="expectedDate"
              id="expectedDate"
              className="border border-gray-400 p-2 rounded-md"
            />
          </div>

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="expectedTime" className="font-semibold">
              Expected Time:
            </label>
            <input
              type="time"
              value={formData.expectedTime}
              onChange={handleChange}
              name="expectedTime"
              id="expectedTime"
              className="border border-gray-400 p-2 rounded-md"
            />
          </div>

          <div className="grid gap-2 items-center w-full">
            <label htmlFor="purpose" className="font-semibold">
              Visit Purpose:
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

          <span>
            <input
              type="checkbox"
              id="approval"
              checked={formData.hostApproval}
              onChange={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  hostApproval: !prevState.hostApproval,
                }))
              }
            />
            &nbsp;<label htmlFor="approval">Skip Host Approval</label>
            &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              id="goods"
              checked={formData.goodsInward}
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
        <h2 className="font-medium border-b-2 mt-5 border-black">
          Additional Visitor
        </h2>
        <div className="grid md:grid-cols-3 gap-3 mt-5">
          {visitors
            .filter((visitor) => visitor._destroy !== "1")
            .map((visitor, index) => (
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
                  value={passEndDate ? passEndDate : todayDate}
                  onChange={(event) => setPassEndDate(event.target.value)}
                  className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                />
              </div>
            </div>
            <p className="font-medium">Select Permitted Days :</p>

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
            onClick={handleEditVisitor}
            className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
      </div>
    </div>
    </section>
  );
};

export default EditVisitor;
