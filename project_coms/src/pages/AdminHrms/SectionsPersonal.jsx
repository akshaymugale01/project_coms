import React, { useEffect, useState } from "react";
import EmployeeSections from "./EmployeeSections";
import EditEmployeeDirectory from "./EditEmployeeDirectory";
import Table from "../../components/table/Table";
import { BiEdit } from "react-icons/bi";

import Select from "react-select";

import {
  editEmployeeAddressDetails,
  editEmployeeDetails,
  editEmployeeFamilyDetails,
  getEmployeeAddressDetails,
  getEmployeeDetails,
  getEmployeeFamilyDetails,
  getEmployeePaymentInfo,
  getHrmsUserRole,
  postEmployeeAddress,
  postEmployeeFamily,
} from "../../api";
import { useParams } from "react-router-dom";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import Accordion from "./Components/Accordion";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdClose, MdFamilyRestroom, MdOutlinePayment } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaCheck, FaHome } from "react-icons/fa";

const SectionsPersonal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isFamEditing, setIsFamEditing] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleSelectChange = (selected) => {
    setSelectedOptions(selected); // Update the state with the selected options
  };
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const [paymentData, setPaymentData] = useState({
    paymentMode: "Cash",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    closeModal();
  };

  const column = [
    {
      name: "Payment Type",
      selector: (row) => row.Payment_Type,
      sortable: true,
    },
    { name: "Payment Mode", selector: (row) => row.mode, sortable: true },
    { name: "Bank Name", selector: (row) => row.name, sortable: true },
    {
      name: "Bank Account Number",
      selector: (row) => row.account,
      sortable: true,
    },
    { name: "Bank IFSC Code", selector: (row) => row.ifsc, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={openModal}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      Payment_Type: "Salary",
      mode: "Bank Transfer",
      name: "State Bank of India",
      account: "12356",
      ifsc: "BK4568",
    },
  ];
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    pan: "",
    aadhar: "",
    maritalStatus: "",
    bloodGroup: "",
    emergencyContactName: "",
    emergencyContactNo: "",
    userType:"",
    status:false
  });
  const [familyData, setFamilyData] = useState({
    fatherName: "",
    motherName: "",
    spouseName: "",
    familyId: "",
  });

  const [addressData, setAddressData] = useState({
    addressId: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    code: "",
  });
  const fetchEmployeeDetails = async () => {
    try {
      const res = await getEmployeeDetails(id);
      const rawAadharValue = res?.aadhar_number?.replace(/\D/g, "");
      console.log(rawAadharValue);
      setFormData({
        ...formData,
        firstName: res?.first_name,
        lastName: res?.last_name,
        email: res?.email_id,
        mobile: res?.mobile,
        gender: res?.gender,
        dob: res?.date_of_birth,
        pan: res?.pan,
        bloodGroup: res?.blood_group,
        status: res?.status,
        // aadhar: rawAadharValue.match(/.{1,4}/g)?.join("-") || "",
        aadhar: rawAadharValue?.match(/.{1,4}/g)?.join("-") || "",
        maritalStatus: res?.marital_status,
        emergencyContactName: res?.emergency_contact_name,
        emergencyContactNo: res?.emergency_contact_no,
        userType: res?.user_type
      });
      
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchEmployeeFamilyDetails = async () => {
    try {
      const res = await getEmployeeFamilyDetails(id);

      const familyData = res[0];

      const familyObject = {
        fatherName: familyData?.father_name || "",
        motherName: familyData?.mother_name || "",
        spouseName: familyData?.spouse_name || "",
        familyId: familyData?.id,
      };

      setFamilyData(familyObject);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployeeAddressDetails = async () => {
    try {
      const res = await getEmployeeAddressDetails(id);
      const address = res[0];
      const addressObj = {
        address1: address?.address_line_1 || "",
        address2: address?.address_line_2 || "",
        country: address?.country || "",
        addressId: address?.id,
        city: address?.city,
        state: address?.state_province,
        code: address?.zip_code,
      };

      setAddressData(addressObj);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployeePaymentInfo = async () => {
    try {
      const res = await getEmployeePaymentInfo(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
    fetchEmployeeFamilyDetails();
    fetchEmployeeAddressDetails();
    fetchEmployeePaymentInfo();
    fetchUserRoles()
  }, []);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const [rawAadhar, setRawAadhar] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "aadhar") {
      const rawValue = value.replace(/\D/g, "");
      const formattedValue =
        rawValue
          .match(/.{1,4}/g)
          ?.join("-")
          .slice(0, 14) || "";
      setFormData((prevData) => ({
        ...prevData,
        aadhar: formattedValue,
      }));
      setRawAadhar(rawValue);
      console.log(rawValue);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const handleEditEmployeeBasicInfo = async () => {
    const editData = new FormData();
    editData.append("first_name", formData.firstName);
    editData.append("last_name", formData.lastName);
    editData.append("email_id", formData.email);
    editData.append("mobile", formData.mobile);
    editData.append("gender", formData.gender);
    editData.append("date_of_birth", formData.dob);
    editData.append("blood_group", formData.bloodGroup);
    editData.append("pan", formData.pan);
    editData.append("aadhar_number", formData.aadhar.replace(/\D/g, ""));
    editData.append("marital_status", formData.maritalStatus);
    editData.append("emergency_contact_name", formData.emergencyContactName);
    editData.append("emergency_contact_no", formData.emergencyContactNo);
    editData.append("user_type", formData.userType);
    editData.append("status", formData.status);
    editData.append("organization", hrmsOrgId);
    try {
      const res = await editEmployeeDetails(id, editData);
      setIsEditing(false);
      console.log(res);
      toast.success("Personal details updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong please try again");
    }
  };

  const handleFamChange = (e) => {
    setFamilyData({ ...familyData, [e.target.name]: e.target.value });
  };

  const handleEditFamily = async () => {
    const postData = new FormData();
    postData.append("father_name", familyData.fatherName);
    postData.append("mother_name", familyData.motherName);
    postData.append("spouse_name", familyData.spouseName);
    postData.append("employee", id);
    try {
      if (familyData.familyId) {
        const res = await editEmployeeFamilyDetails(
          familyData.familyId,
          postData
        );
        toast.success("Family details updated successfully");
      } else {
        const res = await postEmployeeFamily(postData);
        toast.success("Family details updated successfully");
      }
      setIsFamEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong please try again");
    }
  };

  const handleAddressChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleEditAddress = async () => {
    if (!addressData.address1) {
      toast.error("Address Line 1 is required");
      return;
    }
    if (!addressData.address2) {
      toast.error("Address Line 2 is required");
      return;
    }
    if (!addressData.country) {
      toast.error("Country is required");
      return;
    }
    if (!addressData.state) {
      toast.error("State/Province is required");
      return;
    }
    if (!addressData.city) {
      toast.error("City is required");
      return;
    }
    if (!addressData.code) {
      toast.error("ZIP Code is required");
      return;
    }
    const postAddress = new FormData();
    postAddress.append("address_line_1", addressData.address1);
    postAddress.append("address_line_2", addressData.address2);
    postAddress.append("country", addressData.country);
    postAddress.append("state_province", addressData.state);
    postAddress.append("city", addressData.city);
    postAddress.append("zip_code", addressData.code);
    postAddress.append("employee", id);
    try {
      if (addressData.addressId) {
        const res = await editEmployeeAddressDetails(
          addressData.addressId,
          postAddress
        );
        toast.success("Address details updated successfully");
      } else {
        const res = await postEmployeeAddress(postAddress);
        toast.success("Address details updated successfully");
      }
      setIsAddressEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong please try again");
    }
  };

  const paymentOptions = [
    { value: "salary", label: "Salary" },
    { value: "expense", label: "Expense" },
    { value: "offcycle", label: "Off-Cycle" },
  ];
  const [roles, setRoles] = useState([]);
  const fetchUserRoles = async () => {
    try {
      const res = await getHrmsUserRole(hrmsOrgId);
      setRoles(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col ml-20">
      <EditEmployeeDirectory />
      <div className="flex">
        <div className="">
          <EmployeeSections empId={id} />
        </div>
        <div className="w-full p-2 bg-white rounded-lg  mb-5">
          <Accordion
            icon={RiContactsBook2Line}
            title={"Basic Information"}
            content={
              <>
                <div className="flex justify-end gap-2">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        className="border-2 rounded-full p-1 transition-all duration-150 hover:bg-opacity-30 border-green-400  px-4 text-green-400 mb-2 hover:bg-green-300 font-semibold flex items-center gap-2 "
                        onClick={handleEditEmployeeBasicInfo}
                      >
                        <FaCheck /> Save
                      </button>
                      <button
                        type="button"
                        className="border-2 rounded-full p-1 border-red-400  px-4 text-red-400 mb-2 hover:bg-opacity-30 hover:bg-red-300 font-semibold flex items-center gap-2 "
                        onClick={() => setIsEditing(false)}
                      >
                        <MdClose /> Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="bg-blue-500 text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded-full flex items-center gap-2 "
                      onClick={() => setIsEditing(true)}
                    >
                      <BiEdit /> Edit
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name *
                    </label>
                    <input
                      type="text"
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="First Name"
                      value={formData.firstName}
                      required
                      readOnly={!isEditing}
                      onChange={handleChange}
                      name="firstName"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      value={formData.lastName}
                      placeholder="Last Name"
                      required
                      readOnly={!isEditing}
                      name="lastName"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email ID *
                    </label>
                    <input
                      type="email"
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      readOnly={!isEditing}
                      name="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile
                    </label>
                    <input
                      type="tel"
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      name="mobile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender *
                    </label>
                    <select
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      required
                      disabled={!isEditing}
                      value={formData.gender}
                      onChange={handleChange}
                      name="gender"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      required
                      readOnly={!isEditing}
                      value={formData.dob}
                      onChange={handleChange}
                      name="dob"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      PAN
                    </label>
                    <input
                      type="text"
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="PAN NUMBER"
                      readOnly={!isEditing}
                      value={formData.pan}
                      onChange={handleChange}
                      name="pan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Aadhar No
                    </label>
                    <input
                      type="text"
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Aadhar Number"
                      readOnly={!isEditing}
                      value={formData.aadhar}
                      onChange={handleChange}
                      name="aadhar"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Marital Status
                    </label>
                    <select
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      disabled={!isEditing}
                      onChange={handleChange}
                      value={formData.maritalStatus}
                      name="maritalStatus"
                    >
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <select
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      disabled={!isEditing}
                      onChange={handleChange}
                      value={formData.userType}
                      name="userType"
                    >
                     <option value="">Select Role</option>
                     {roles.map((role)=>(
                      <option value={role.id} key={role.id}>{role.label}</option>
                     ))}
                    </select>
                  </div>
                </div>
              </>
            }
          />

          <Accordion
            icon={MdFamilyRestroom}
            title={"Family Information"}
            content={
              <>
                <div className="flex justify-end gap-2">
                  {isFamEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={handleEditFamily}
                        className="border-2 rounded-full p-1 transition-all duration-150 hover:bg-opacity-30 border-green-400  px-4 text-green-400 mb-2 hover:bg-green-300 font-semibold flex items-center gap-2 "
                      >
                        <FaCheck /> Save
                      </button>
                      <button
                        type="button"
                        className="border-2 rounded-full p-1 border-red-400  px-4 text-red-400 mb-2 hover:bg-opacity-30 hover:bg-red-300 font-semibold flex items-center gap-2 "
                        onClick={() => setIsFamEditing(false)}
                      >
                        <MdClose /> Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="bg-blue-500 text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded-full flex items-center gap-2"
                      onClick={() => setIsFamEditing(true)}
                    >
                      <BiEdit /> Edit
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Father's Name
                    </label>
                    <input
                      type="text"
                      value={familyData.fatherName}
                      onChange={handleFamChange}
                      name="fatherName"
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isFamEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Father's Name"
                      readOnly={!isFamEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mother's Name
                    </label>
                    <input
                      type="text"
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isFamEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Mother's Name"
                      value={familyData.motherName}
                      onChange={handleFamChange}
                      name="motherName"
                      readOnly={!isFamEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Spouse's Name
                    </label>
                    <input
                      type="text"
                      name="spouseName"
                      value={familyData.spouseName}
                      onChange={handleFamChange}
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isFamEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Spouse's Name"
                      readOnly={!isFamEditing}
                    />
                  </div>
                </div>
              </>
            }
          />

          <Accordion
            icon={FaHome}
            title={"Address Information"}
            content={
              <>
                <div className="flex justify-end gap-2">
                  {isAddressEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={handleEditAddress}
                        className="border-2 rounded-full p-1 transition-all duration-150 hover:bg-opacity-30 border-green-400  px-4 text-green-400 mb-2 hover:bg-green-300 font-semibold  "
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="border-2 rounded-full p-1 border-red-400  px-4 text-red-400 mb-2 hover:bg-opacity-30 hover:bg-red-300 font-semibold  "
                        onClick={() => setIsAddressEditing(false)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="bg-blue-500 text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded-full flex items-center gap-2"
                      onClick={() => setIsAddressEditing(true)}
                    >
                      <BiEdit /> Edit
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      value={addressData.address1}
                      onChange={handleAddressChange}
                      name="address1"
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isAddressEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Address Line 1"
                      maxLength="150"
                      readOnly={!isAddressEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      value={addressData.address2}
                      name="address2"
                      onChange={handleAddressChange}
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isAddressEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Address Line 2"
                      maxLength="150"
                      readOnly={!isAddressEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      value={addressData.city}
                      name="city"
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isAddressEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="City"
                      readOnly={!isAddressEditing}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={addressData.state}
                      onChange={handleAddressChange}
                      name="state"
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isAddressEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="State/Province"
                      readOnly={!isAddressEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Zip / Pin Code
                    </label>
                    <input
                      type="text"
                      value={addressData.code}
                      name="code"
                      onChange={handleAddressChange}
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isAddressEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Zip / Pin Code"
                      readOnly={!isAddressEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <input
                      type="text"
                      value={addressData.country}
                      onChange={handleAddressChange}
                      name="country"
                      className={`mt-1 p-2 w-full border rounded-md ${
                        !isAddressEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Country"
                      readOnly={!isAddressEditing}
                    />
                  </div>
                </div>
              </>
            }
          />

          <Accordion
            icon={MdOutlinePayment}
            title={"Payment Information"}
            content={
              <>
                <Table columns={column} data={data} isPagination={true} />
              </>
            }
          />

          {modalIsOpen && (
            <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
              <div className="max-h-screen bg-white p-8 w-96 rounded-lg shadow-lg overflow-y-auto">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-bold mb-4">Edit Payment Type</h2>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor=""
                      className="block text-sm font-medium text-gray-700"
                    >
                      Payment Type
                    </label>
                    <Select
                      id="paymentType"
                      options={paymentOptions}
                      isMulti // Enables multiple selection
                      value={selectedOptions}
                      onChange={handleSelectChange}
                      placeholder="Select payment type(s)"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Mode <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="mt-1 p-2 w-full border rounded-md"
                      value={paymentData.paymentMode}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          paymentMode: e.target.value,
                        })
                      }
                    >
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>
                  {paymentData.paymentMode === "Bank Transfer" && (
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-2 mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Bank Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="bankName"
                          id=""
                          className="border border-gray-300  p-2  rounded-md"
                          placeholder="Enter bank name"
                          // value={formData.bankName}
                          // onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Bank Account Number{" "}
                          <span className="text-red-300">*</span>
                        </label>
                        <input
                          type="text"
                          name="accountNumber"
                          id=""
                          className="border border-gray-400  p-2  rounded-md"
                          placeholder="Enter bank account no."
                          // value={formData.accountNumber}
                          // onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Bank IFSC code <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="ifsc"
                          id=""
                          className="border border-gray-300  p-2  rounded-md"
                          placeholder="Enter IFSC"
                          // value={formData.ifsc}
                          // onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex mt-2 justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="border-2 border-red-500 text-red-500 px-4 p-1 rounded-full"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 text-white p-1 px-5 rounded-full"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionsPersonal;
