import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import Navbar from "../../components/Navbar";
import Webcam from "react-webcam";
import image from "/profile.png";
import { getAllUnits, getAllVendors, postStaff } from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { initialSchedule } from "../../utils/initialFormData";

const EmployeeAddStaff = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [units, setUnits] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [errors, setErrors] = useState({}); // <-- NEW STATE FOR ERRORS

  const handleOpenCamera = () => setShowWebcam(true);
  const handleCloseCamera = () => setShowWebcam(false);

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

  // ===== VALIDATION FUNCTION =====
  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!formData.unit.trim()) newErrors.unit = "Unit selection is required";
    if (!formData.workType.trim()) newErrors.workType = "Work type is required";

    setErrors(newErrors);

    // return TRUE only if no errors
    return Object.keys(newErrors).length === 0;
  };

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setShowWebcam(false);
    setCapturedImage(imageSrc);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCapturedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "firstName" || name === "lastName") {
      value = value.replace(/[^a-zA-Z]/g, "");
    }

    if (name === "email") {
      value = value.replace(/\s/g, "");
    }

    if (name === "mobile") {
      value = value.replace(/\D/g, "");
    }

    setFormData({ ...formData, [name]: value });

    // Remove field error once user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const unitRes = await getAllUnits();
        setUnits(unitRes.data);
      } catch (error) {}
    };
    const fetchVendors = async () => {
      try {
        const vendorResp = await getAllVendors();
        setVendors(vendorResp.data);
      } catch (error) {}
    };
    fetchUnits();
    fetchVendors();
  }, []);

  const handleFileChange = (files, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: files,
    });
  };

  const navigate = useNavigate();

  const handleAddStaff = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields!");
      return;
    }

    const sendData = new FormData();

    sendData.append("staff[firstname]", formData.firstName);
    sendData.append("staff[lastname]", formData.lastName);
    sendData.append("staff[mobile_no]", formData.mobile);
    sendData.append("staff[email]", formData.email);
    sendData.append("staff[units]", formData.unit);
    sendData.append("staff[work_type]", formData.workType);
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

    if (capturedImage) {
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      sendData.append("staff[profile_picture]", blob, "staff_image.jpg");
    }

    formData.documents.forEach((docs) => {
      sendData.append("attachfiles[]", docs);
    });

    try {
      await postStaff(sendData);
      toast.success("Staff Created Successfully");
      navigate("/admin/passes/staff");
    } catch (error) {}
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-center items-center my-2 w-full p-2">
          <div className="border border-gray-300 rounded-lg p-4 w-full mx-4">
            <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-lg mb-4 text-white">
              Add Staff
            </h2>

            {/* PROFILE IMAGE */}
            <div className="flex justify-center">
              {!showWebcam ? (
                <div className="flex flex-col items-center">
                  <button onClick={handleOpenCamera}>
                    <img
                      src={capturedImage || image}
                      className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
                    />
                  </button>
                  <p className="text-gray-400">Or</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="fileInput"
                  />
                  <label htmlFor="fileInput" className="text-blue-400 cursor-pointer">
                    Upload from device
                  </label>
                </div>
              ) : (
                <div>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="rounded-full w-60 h-60 object-cover"
                  />
                  <div className="flex gap-2 justify-center my-2">
                    <button onClick={capture} className="bg-green-500 text-white px-4 py-1 rounded">
                      Capture
                    </button>
                    <button onClick={handleCloseCamera} className="bg-red-500 text-white px-4 py-1 rounded">
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* FORM SECTION */}
            <div className="grid md:grid-cols-3 gap-5">

              {/* ==== FIRST NAME ==== */}
              <div className="grid gap-1">
                <label className="font-semibold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`border p-2 rounded-md ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter First Name"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>

              {/* ==== LAST NAME ==== */}
              <div className="grid gap-1">
                <label className="font-semibold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`border p-2 rounded-md ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Last Name"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>

              {/* ==== EMAIL ==== */}
              <div className="grid gap-1">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 rounded-md border-gray-300"
                  placeholder="Enter Email"
                />
              </div>

              {/* ==== MOBILE ==== */}
              <div className="grid gap-1">
                <label className="font-semibold">Mobile</label>
                <input
                  type="text"
                  maxLength={10}
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`border p-2 rounded-md ${
                    errors.mobile ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Mobile Number"
                />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
              </div>

              {/* ==== UNIT ==== */}
              <div className="grid gap-1">
                <label className="font-semibold">Unit</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className={`border p-2 rounded-md ${
                    errors.unit ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Unit</option>
                  {units.map((unit) => (
                    <option value={unit.id} key={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
                {errors.unit && <p className="text-red-500 text-sm">{errors.unit}</p>}
              </div>

              {/* ==== WORK TYPE ==== */}
              <div className="grid gap-1">
                <label className="font-semibold">Work Type</label>
                <input
                  type="text"
                  name="workType"
                  value={formData.workType}
                  onChange={handleChange}
                  className={`border p-2 rounded-md ${
                    errors.workType ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Work Type"
                />
                {errors.workType && <p className="text-red-500 text-sm">{errors.workType}</p>}
              </div>

              {/* ==== SUPPLIER ==== */}
              <div className="grid gap-1">
                <label className="font-semibold">Select Supplier</label>
                <select
                  name="vendorId"
                  value={formData.vendorId}
                  onChange={handleChange}
                  className="border p-2 rounded-md border-gray-300"
                >
                  <option value="">Select Vendor</option>
                  {vendors.map((vendor) => (
                    <option value={vendor.id} key={vendor.id}>
                      {vendor.company_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ==== VALID DATES ==== */}
              <div className="grid gap-1">
                <label className="font-semibold">Valid From</label>
                <input
                  type="date"
                  name="validFrom"
                  value={formData.validFrom}
                  onChange={handleChange}
                  className="border p-2 rounded-md border-gray-300"
                />
              </div>
              <div className="grid gap-1">
                <label className="font-semibold">Valid Till</label>
                <input
                  type="date"
                  name="validTill"
                  value={formData.validTill}
                  onChange={handleChange}
                  className="border p-2 rounded-md border-gray-300"
                />
              </div>
            </div>

            {/* DOCUMENTS */}
            <div className="mt-3">
              <label className="font-semibold">Documents</label>
              <FileInputBox
                handleChange={(files) => handleFileChange(files, "documents")}
                fieldName={"documents"}
                isMulti={true}
              />
            </div>

            {/* WORKING SCHEDULE */}
            <div className="mt-4">
              <h2 className="border-b border-gray-300 font-medium">Working Schedule</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Select Days</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(formData.workingSchedule).map((day) => (
                    <tr key={day}>
                      <td className="border px-2 py-1 text-center">
                        <input
                          type="checkbox"
                          checked={formData.workingSchedule[day].selected}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              workingSchedule: {
                                ...prev.workingSchedule,
                                [day]: {
                                  ...prev.workingSchedule[day],
                                  selected: !prev.workingSchedule[day].selected,
                                },
                              },
                            }))
                          }
                        />
                      </td>
                      <td className="border px-2 py-1 text-center">{day}</td>
                      <td className="border px-2 py-1 text-center">
                        <input
                          type="time"
                          value={formData.workingSchedule[day].start_time}
                          disabled={!formData.workingSchedule[day].selected}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              workingSchedule: {
                                ...prev.workingSchedule,
                                [day]: {
                                  ...prev.workingSchedule[day],
                                  start_time: e.target.value,
                                },
                              },
                            }))
                          }
                          className="border border-gray-400 p-1 rounded-md"
                        />
                      </td>
                      <td className="border px-2 py-1 text-center">
                        <input
                          type="time"
                          value={formData.workingSchedule[day].end_time}
                          disabled={!formData.workingSchedule[day].selected}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              workingSchedule: {
                                ...prev.workingSchedule,
                                [day]: {
                                  ...prev.workingSchedule[day],
                                  end_time: e.target.value,
                                },
                              },
                            }))
                          }
                          className="border border-gray-400 p-1 rounded-md"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-center my-4">
              <button
                onClick={handleAddStaff}
                className="text-white bg-black hover:bg-white hover:text-black border-2 border-black font-semibold py-2 px-4 rounded transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeAddStaff;
