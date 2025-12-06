import React, { useState, useRef, useEffect } from "react";
import AdminHRMS from "./AdminHrms";
import { FaChevronDown } from "react-icons/fa";
import {
  editEmployeeDetails,
  getEmployeeDetails,
  getUserDetails,
  hrmsDomain,
} from "../../api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const EditEmployeeDirectory = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const { id } = useParams();
  const inputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageClick = () => {
    inputRef.current.click();
  };
  const [details, setDetails] = useState({});

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      handleEditEmployeeBasicInfo(file);
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [empDetails, setEmpDetails] = useState({});
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const res = await getEmployeeDetails(id);
        setEmpDetails(res);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchEmployeeDetail = async () => {
      try {
        const res = await getUserDetails(id);
        // setEmpDetails(res);
        setDetails(res);
        setProfilePhoto(res?.employee?.profile_photo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployeeDetails();
    fetchEmployeeDetail();
  }, []);

  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const handleEditEmployeeBasicInfo = async (file) => {
    const editData = new FormData();
    editData.append("first_name", details?.employee?.first_name);
    editData.append("last_name", details?.employee?.last_name);
    editData.append("email_id", details?.employee?.email_id);
    editData.append("mobile", details?.employee?.mobile);
    editData.append("gender", details?.employee?.gender);
    editData.append("date_of_birth", details?.employee?.date_of_birth);
    editData.append("blood_group", details?.employee?.blood_group);
    editData.append("pan", details?.employee?.pan);
    editData.append(
      "aadhar_number",
      details?.employee?.aadhar_number.replace(/\D/g, "")
    );
    editData.append("marital_status", details?.employee?.marital_status);
    editData.append(
      "emergency_contact_name",
      details?.employee?.emergency_contact_name
    );
    editData.append(
      "emergency_contact_no",
      details?.employee?.emergency_contact_no
    );
    editData.append("organization", hrmsOrgId);
    editData.append("profile_photo", file);
    try {
      await editEmployeeDetails(id, editData);

      toast.success("Profile photo updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong please try again");
    }
  };
  return (
    <div className="flex">
      <AdminHRMS />
      <div className=" w-full p-4">
        {/* <h1 className="text-2xl font-semibold mb-4">Employee Directory</h1> */}
        <div className="bg-white border-gray-400 border-b border-dashed p-2">
          <div className="flex shadow-custom-all-sides p-2  rounded-xl ">
            <div
              onClick={handleImageClick}
              className="cursor-pointer w-64 my-4"
            >
              {imageFile ? (
                <img
                  src={imagePreview}
                  alt={details?.employee?.first_name}
                  className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
                />
              ) : profilePhoto ? (
                <img
                  src={hrmsDomain + profilePhoto}
                  alt={details?.employee?.first_name}
                  className="border-4 border-gray-300 rounded-full w-40 h-40 object-cover"
                />
              ) : (
                <div
                  style={{ background: themeColor }}
                  className="flex items-center justify-center rounded-full w-40 h-40"
                >
                  <span className="text-4xl font-semibold text-white from-neutral-100">
                    {empDetails?.first_name?.charAt(0).toUpperCase() || ""}
                    {""}
                    {empDetails?.last_name?.charAt(0).toUpperCase() || ""}
                  </span>
                </div>
              )}
              <input
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
                 accept="image/*"
              />
            </div>
            <div className="w-full">
              <div className="flex justify-between items-center gap-2">
                <h1 className="text-xl font-semibold mb-4 border-b pb-2 w-full">
                  {empDetails?.first_name} {empDetails?.last_name}
                </h1>
                <div className="relative inline-block text-left mb-2">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-end gap-2 justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 "
                  >
                    Actions
                    <FaChevronDown />
                  </button>
                </div>{" "}
              </div>
              {isOpen && (
                <div className="origin-top-right absolute right-2 mt-1 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <button>Hold</button>
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {/* Upload Statutory Settings */}
                      <button>Deactivate</button>
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {/* Upload Documents */}
                      <button>Delete Employee</button>
                    </a>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 p-2 px-2 bg-gray-50 items-center border rounded-xl">
                <div className="grid grid-cols-2 items-center">
                  <p className="font-medium">Joined on :</p>
                  <p className="text-sm font-medium">
                    {details?.employment_info?.joining_date}
                  </p>
                </div>

                <div className="grid grid-cols-2 items-center">
                  <p className="font-medium">Mobile No :</p>
                  <p className="text-sm font-medium">
                    +91-{details?.employee?.mobile}
                  </p>
                </div>
                <div className="grid grid-cols-2 items-center">
                  <p className="font-medium">Department:</p>
                  <p className="text-sm font-medium">
                    {details?.employment_info?.department_name}
                  </p>
                </div>

                <div className="grid grid-cols-2 items-center">
                  <p className="font-medium">Branch Location:</p>
                  <p className="text-sm font-medium">
                    {details?.employment_info?.branch_location_name}
                  </p>
                </div>
                <div className="grid grid-cols-2 items-center">
                  <p className="font-medium">Email:</p>
                  <p className="text-sm font-medium">{empDetails.email_id}</p>
                </div>
                <div className="grid grid-cols-2 items-center">
                  <p className="font-medium">Designation:</p>
                  <p className="text-sm font-medium">
                    {details?.employment_info?.designation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeDirectory;
