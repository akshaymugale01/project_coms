import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import Navbar from "../../components/Navbar";
import Webcam from "react-webcam";
import image from "/profile.png";
import {
  domainPrefix,
  editStaffDetails,
  getAllUnits,
  getStaffDetails,
  getVendors,
  postStaff,
} from "../../api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { initialSchedule } from "../../utils/initialFormData";
import { SendDateFormat } from "../../utils/dateUtils";
import { Switch } from "../../Buttons";
const EmployeeAddStaff = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [units, setUnits] = useState([]);
  const [vendors, setVendors] = useState([]);

  const handleOpenCamera = () => {
    setShowWebcam(true);
  };

  const handleCloseCamera = () => {
    setShowWebcam(false);
  };

  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    unit: "",
    workType: "",
    staffId: "",
    vendorId: "",
    validFrom: "",
    validTill: "",
    status: true,
    documents: [],
    workingSchedule: initialSchedule,
 
  });
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const initializeWorkingSchedule = (apiSchedule) => {
    return daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        selected: !!apiSchedule[day], // true if the day exists in the API data
        start_time: apiSchedule[day]?.start_time || "",
        end_time: apiSchedule[day]?.end_time || "",
      };
      return acc;
    }, {});
  };
  useEffect(() => {
    const fetchEditDetails = async () => {
      try {
        const res = await getStaffDetails(id);
        const editData = res.data;
        setFormData({
          ...formData,
          firstName: editData.firstname,
          lastName: editData.lastname,
          email: editData.email,
          mobile: editData.mobile_no,
          status: editData.status,
          unit: editData.unit_id,
          validFrom: SendDateFormat(editData.valid_from),
          validTill: SendDateFormat(editData.valid_till),
          vendorId: editData.vendor_id,
          workType: editData.work_type,
          
          workingSchedule: initializeWorkingSchedule(editData.working_schedule),
        });
        setCapturedImage(domainPrefix + editData.profile_picture.url);

        console.log(editData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEditDetails();
  }, []);

  const handleCheckboxChange = (day) => {
    setFormData((prevState) => ({
      ...prevState,
      workingSchedule: {
        ...prevState.workingSchedule,
        [day]: {
          ...prevState.workingSchedule[day],
          selected: !prevState.workingSchedule[day].selected,
        },
      },
    }));
  };

  const handleTimeChange = (day, type, value) => {
    setFormData((prevState) => ({
      ...prevState,
      workingSchedule: {
        ...prevState.workingSchedule,
        [day]: {
          ...prevState.workingSchedule[day],
          [type]: value,
        },
      },
    }));
  };
  console.log(formData);

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setShowWebcam(false);
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCapturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const unitRes = await getAllUnits();
        setUnits(unitRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchVendors = async () => {
      try {
        const vendorResp = await getVendors();
        setVendors(vendorResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVendors();
    fetchUnits();
  }, []);

  const handleFileChange = (files, fieldName) => {
    // Changed to receive 'files' directly
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
  };
  const navigate = useNavigate();
  const handleEditStaff = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.mobile ||
      !formData.unit ||
      !formData.workType
    ) {
      return toast.error("All fields are required!");
    }
    const sendData = new FormData();
    sendData.append("staff[firstname]", formData.firstName);
    sendData.append("staff[lastname]", formData.lastName);
    sendData.append("staff[mobile_no]", formData.mobile);
    sendData.append("staff[email]", formData.email);
    sendData.append("staff[units]", formData.unit);
    sendData.append("staff[work_type]", formData.workType);
    // sendData.append("staff[staff_id]", formData.staffId);
    sendData.append("staff[status]", formData.status);
    sendData.append("staff[unit_id]", formData.unit);
    sendData.append("staff[vendor_id]", formData.vendorId);
    sendData.append("staff[valid_from]", formData.validFrom);
    sendData.append("staff[valid_till]", formData.validTill);
    Object.keys(formData.workingSchedule).forEach((day) => {
      sendData.append(
        `staff[working_schedule][${day}][selected]`,
        formData.workingSchedule[day].selected ? "1" : "0"
      );
      sendData.append(
        `staff[working_schedule][${day}][start_time]`,
        formData.workingSchedule[day].start_time
      );
      sendData.append(
        `staff[working_schedule][${day}][end_time]`,
        formData.workingSchedule[day].end_time
      );
    });
    // if (capturedImage) {
    //   const response = await fetch(capturedImage);
    //   const blob = await response.blob();
    //   sendData.append("staff[profile_picture]", blob, "staff_image.jpg");
    // }

    if (capturedImage) {
      try {
        const response = await fetch(capturedImage);
        const blob = await response.blob();
        sendData.append("staff[profile_picture]", blob, "staff_image.jpg");
      } catch (error) {
        console.error("Failed to fetch the profile picture:", error);
        return toast.error("Failed to upload the profile picture.");
      }
    }
    formData.documents.forEach((docs) => {
      sendData.append("attachfiles[]", docs);
    });
    try {
      const res = await editStaffDetails(id, sendData);
      toast.success("Staff Edited Successfully");
      navigate(`/admin/passes/staff-details/${id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-center items-center my-2 w-full ">
          <div className="border border-gray-300 rounded-lg p-4 w-full mx-4">
            <h2
              className="text-center md:text-xl font-semibold p-2 bg-black rounded-lg mb-4 text-white"
              style={{ background: themeColor }}
            >
              Edit Staff
            </h2>
            <div className="flex justify-center">
              {!showWebcam ? (
                <div className="flex flex-col items-center">
                  <button onClick={handleOpenCamera}>
                    <img
                      src={capturedImage || image}
                      alt="Uploaded"
                      className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
                    />
                  </button>
                  <p className="text-gray-400">Or</p>
                  <div className="">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="fileInput"
                    />
                    <label
                      htmlFor="fileInput"
                      className="text-blue-400 cursor-pointer"
                    >
                      Upload from device
                    </label>
                  </div>
                </div>
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
            <div className="grid md:grid-cols-3 gap-5">
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="firstName" className="font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  className="border p-2 rounded-md border-gray-300"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="lastName" className="font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  className="border p-2 rounded-md border-gray-300"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="border p-2 rounded-md border-gray-300"
                />
              </div>
              {/* <div className="grid gap-2 items-center w-full">
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="border p-2 rounded-md border-gray-300"
                />
              </div> */}
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="mobile" className="font-semibold">
                  Mobile
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  className="border p-2 rounded-md border-gray-300"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="unit" className="font-semibold">
                  Unit
                </label>
                <select
                  id="unit"
                  value={formData.unit}
                  name="unit"
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Unit</option>
                  {units.map((unit) => (
                    <option value={unit.id} key={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2 items-center w-full">
                <label htmlFor="workType" className="font-semibold">
                  Work Type
                </label>
                {/* <select
                  id="workType"
                  name="workType"
                  value={formData.workType}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Work Type</option>
                </select> */}
                <input
                  type="text"
                  id="workType"
                  name="workType"
                  value={formData.workType}
                  onChange={handleChange}
                  placeholder="Enter work type"
                  className="border p-2 rounded-md border-gray-300"
                />
              </div>
              {/* <div className="grid gap-2 items-center w-full">
                <label htmlFor="staffId" className="font-semibold">
                  Staff ID
                </label>
                <input
                  type="text"
                  id="staffId"
                  name="staffId"
                  value={formData.staffId}
                  onChange={handleChange}
                  placeholder="Enter Staff ID"
                  className="border p-2 rounded-md border-gray-300"
                />
              </div> */}
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="vendorName" className="font-semibold">
                  Select Supplier
                </label>
                <select
                  name="vendorId"
                  id=""
                  value={formData.vendorId}
                  className="border p-2 rounded-md border-gray-300"
                  onChange={handleChange}
                >
                  <option value="">Select Vendor</option>
                  {vendors.map((vendor) => (
                    <option value={vendor.id} key={vendor.id}>
                      {vendor.company_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="validFrom" className="font-semibold">
                  Valid From
                </label>
                <input
                  type="date"
                  id="validFrom"
                  name="validFrom"
                  value={formData.validFrom}
                  onChange={handleChange}
                  className="border p-2 rounded-md border-gray-300"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="validTill" className="font-semibold">
                  Valid Till
                </label>
                <input
                  type="date"
                  id="validTill"
                  name="validTill"
                  value={formData.validTill}
                  onChange={handleChange}
                  className="border p-2 rounded-md border-gray-300"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="status" className="font-semibold">
                  Active/Inactive
                </label>
               <div className="flex items-center gap-4">
                <p>Inactive</p>
                <Switch checked={formData.status} onChange={()=>setFormData({...formData, status: !formData.status})} />
                <p>Active</p>
               </div>
              </div>
            </div>
            <div className="grid gap-2 items-center w-full mt-2">
              <label htmlFor="" className="font-semibold">
                Documents
              </label>
              <FileInputBox
                handleChange={(files) => handleFileChange(files, "documents")}
                fieldName={"documents"}
                isMulti={true}
              />
            </div>

            <div className="mt-4">
              <h2 className="border-b border-gray-300 font-medium">
                Working Schedule
              </h2>
              <table className="w-full ">
                <thead>
                  <tr>
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2">Select Days</th>
                    <th className="px-4 py-2">Start Time</th>
                    <th className="px-4 py-2">End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(formData.workingSchedule).map((day) => (
                    <tr key={day}>
                      <td className="border px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={formData.workingSchedule[day].selected}
                          onChange={() => handleCheckboxChange(day)}
                        />
                      </td>
                      <td className="border px-4 py-2 text-center">{day}</td>
                      <td className="border px-4 py-2 text-center">
                        <input
                          type="time"
                          className="border border-gray-400 p-2 rounded-md"
                          value={formData.workingSchedule[day].start_time}
                          onChange={(e) =>
                            handleTimeChange(day, "start_time", e.target.value)
                          }
                          disabled={!formData.workingSchedule[day].selected}
                        />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input
                          type="time"
                          className="border border-gray-400 p-2 rounded-md"
                          value={formData.workingSchedule[day].end_time}
                          onChange={(e) =>
                            handleTimeChange(day, "end_time", e.target.value)
                          }
                          disabled={!formData.workingSchedule[day].selected}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-5 justify-center items-center my-4">
              <button
                type="submit"
                onClick={handleEditStaff}
                className="text-white bg-black hover:bg-white hover:text-black border-2 border-black font-semibold py-2 px-4 rounded transition-all duration-300"
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

export default EmployeeAddStaff;
