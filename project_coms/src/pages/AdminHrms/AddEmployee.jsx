import React, { useEffect, useState } from "react";
import AdminHRMS from "./AdminHrms";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import AddEmployeeDetailsList from "./AddEmployeeDetailsList";
import { GrHelpBook } from "react-icons/gr";
import Select from "react-select";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  getPaymentModeList,
  postEmployeeAddress,
  postEmployeeFamily,
  postEmployeeOnBoarding,
  postEmployeePaymentInfo,
} from "../../api";
import toast from "react-hot-toast";
import { ImFileText2 } from "react-icons/im";
import Employment from "./Employment";
import OnboardingSalary from "./Salary";
import Statutory from "./Statutory";
import { MdOutlineWork } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";

const paymentOptions = [
  { value: "salary", label: "Salary" },
  { value: "expense", label: "Expense" },
  { value: "offcycle", label: "Off-Cycle" },
];

const AddEmployee = () => {
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [steps, setSteps] = useState("basic");
  const listItemStyle = {
    listStyleType: "disc",
    color: "gray",
    fontSize: "14px",
    fontWeight: 500,
  };
  const themeColor = useSelector((state) => state.theme.color);

  const [empId, setEmpId] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    mobile: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    pan: "",
    aadhar: "",
    esic: "",
    maritalStatus: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    code: "",
    paymentMode: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
  });
  console.log(formData);
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

      setFormData({ ...formData, aadhar: formattedValue });

      // For sending to API, store unformatted value
      // (You might want to store rawValue in another state or use it directly when sending API requests)
      setRawAadhar(rawValue);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   const upperCaseValue = value.toUpperCase();

  //   const panRegex = /^[A-Z]{0,5}[0-9]{0,4}[A-Z]{0,1}$/;

  //   if (name === "pan") {
  //     if (panRegex.test(upperCaseValue)) {
  //       setFormData({ ...formData, [name]: upperCaseValue });
  //     } else {
  //       console.log("Invalid PAN format");
  //     }
  //   } else {
  //     setFormData({ ...formData, [name]: upperCaseValue });
  //   }
  // };

  const [disableNext, setDisableNext] = useState(true);
  const [disableSave, setDisableSave] = useState(false);
  const handleAddEmployee = async () => {
    if (!formData.firstName.trim()) {
      toast.error("First Name is required!");
      return;
    }
    if (!formData.lastName.trim()) {
      toast.error("Last Name is required!");
      return;
    }
    if (!formData.emailId.trim() || !/\S+@\S+\.\S+/.test(formData.emailId)) {
      toast.error("A valid Email ID is required!");
      return;
    }
    if (
      !formData.mobile.trim() ||
      formData.mobile.length !== 10 ||
      !/^\d+$/.test(formData.mobile)
    ) {
      toast.error("A valid 10-digit Mobile Number is required!");
      return;
    }
    if (!formData.gender) {
      toast.error("Gender is required!");
      return;
    }
    if (!formData.dob) {
      toast.error("Date of Birth is required!");
      return;
    }
    if (!formData.paymentMode) {
      toast.error("Please select Payment mode");
      return;
    }
    const postData = new FormData();
    postData.append("first_name", formData.firstName);
    postData.append("last_name", formData.lastName);
    postData.append("email_id", formData.emailId);
    postData.append("mobile", formData.mobile);
    postData.append("gender", formData.gender);
    postData.append("date_of_birth", formData.dob);
    postData.append("blood_group", formData.bloodGroup);
    postData.append("pan", formData.pan);
    postData.append("aadhar_number", rawAadhar);
    postData.append("marital_status", formData.maritalStatus);
    postData.append("emergency_contact_name", formData.emergencyContactName);
    postData.append("emergency_contact_no", formData.emergencyContactNumber);
    postData.append("status", true);
    postData.append("organization", hrmsOrgId);
    try {
      const empRes = await postEmployeeOnBoarding(postData);
      setEmpId(empRes.id);
      const postFamily = new FormData();
      postFamily.append("employee", empRes.id);
      postFamily.append("father_name", formData.fatherName);
      postFamily.append("mother_name", formData.motherName);
      postFamily.append("spouse_name", formData.spouseName);
      try {
        const famRes = await postEmployeeFamily(postFamily);
      } catch (error) {
        console.log(error);
      }
      const postAddress = new FormData();
      postAddress.append("employee", empRes.id);
      postAddress.append("address_line_1", formData.address1);
      postAddress.append("address_line_2", formData.address2);
      postAddress.append("country", formData.country);
      postAddress.append("state_province", formData.state);
      postAddress.append("city", formData.city);
      postAddress.append("zip_code", formData.code);
      try {
        const addressRes = await postEmployeeAddress(postAddress);
      } catch (error) {
        console.log(error);
      }
      const postPayment = new FormData();
      postPayment.append("payments_mode", formData.paymentMode);
      postPayment.append("employee", empRes.id);
      // Backend team working on more fields
      try {
        const paymentRes = await postEmployeePaymentInfo(postPayment);
      } catch (error) {
        console.log(error);
      }
      setDisableNext(false);
      setDisableSave(true);
      toast.success("Basic Info saved Successfully");
    } catch (error) {
      // console.log(error);
      // toast.error("Failed to add employee. Please try again.");
      if (error.response && error.response.data && error.response.data.errors) {
        // Loop through all errors and display them
        const errorMessages = error.response.data.errors;
        Object.keys(errorMessages).forEach((key) => {
          errorMessages[key].forEach((msg) => {
            toast.error(`${key}: ${msg}`);
          });
        });
      } else {
        toast.error("Failed to add employee. Please try again.");
      }
      console.log(error);
    }
  };

  const [paymentModeList, setPaymentModeList] = useState([]);
  useEffect(() => {
    const fetchPaymentModeList = async () => {
      try {
        const res = await getPaymentModeList();
        setPaymentModeList(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPaymentModeList();
  }, []);

  return (
    <div className="flex ml-20 justify-between">
      {/* <AddEmployeeDetailsList /> */}
      <div className="flex">
        <AdminHRMS />
        <div className="w-56 h-full bg-white  p-4 mt-9 border-r">
          <ul className="space-y-2">
            <li className="font-bold text-lg">Steps</li>

            <button
              className={`flex items-center gap-2 p-2 w-full  rounded-md ${
                steps === "basic"
                  ? " text-white bg-blue-500 font-medium cursor-pointer"
                  : "text-white bg-gray-400 font-medium cursor-not-allowed"
              }`}
              // disabled={steps !== "basic"}
              onClick={() => setSteps("basic")}
            >
              <div>{React.createElement(ImFileText2, { size: "20" })}</div>
              Basics
            </button>
            <div className="border-b border-gray-400 w-full" />
            <button
              className={`flex items-center gap-2 p-2 w-full  rounded-md ${
                steps === "employment"
                  ? " text-white bg-blue-500 font-medium cursor-pointer"
                  : "text-white bg-gray-400 font-medium cursor-not-allowed"
              }`}
              onClick={() => setSteps("employment")}
              // disabled={steps !== "employment"}
            >
              <div>{React.createElement(MdOutlineWork, { size: "20" })}</div>
              Employment
            </button>
            <div className="border-b border-gray-400 w-full" />
            <button
              className={`flex items-center gap-2 p-2  w-full rounded-md ${
                steps === "salary"
                  ? " text-white bg-blue-500 font-medium cursor-pointer"
                  : "text-white bg-gray-400 font-medium cursor-not-allowed"
              }`}
              onClick={() => setSteps("salary")}
              // disabled={steps !== "salary"}
            >
              <div>{React.createElement(FcMoneyTransfer, { size: "20" })}</div>
              Salary
            </button>
            <div className="border-b border-gray-400 w-full" />
            <button
              className={`flex items-center gap-2 p-2  w-full rounded-md ${
                steps === "statutory"
                  ? " text-white bg-blue-500 font-medium cursor-pointer"
                  : "text-white bg-gray-400 font-medium cursor-not-allowed"
              }`}
              // disabled={steps !== "statutory"}
              onClick={() => setSteps("statutory")}
            >
              <div>{React.createElement(ImFileText2, { size: "20" })}</div>
              Statutory
            </button>
          </ul>
        </div>
      </div>

      {steps === "basic" && (
        <div className="w-full py-6 px-2 bg-white rounded-lg ">
          <h2 className="border-b text-center text-xl border-black mb-6 font-bold mt-2">
            Employee Basic Information
          </h2>
          <div>
            <div className="grid xl:grid-cols-3 gap-2 gap-y-4 mt-5">
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  First Name<span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="First name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  name="firstName"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name<span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Last name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  name="lastName"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Email ID<span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Email"
                  required
                  value={formData.emailId}
                  onChange={handleChange}
                  name="emailId"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  type="tel"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  name="mobile"
                  maxLength={13}
                  pattern="[0-9]*"
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight"
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Gender<span className="text-red-400">*</span>
                </label>
                <select
                  className="border border-gray-400 p-2 rounded-md"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  name="gender"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  className="border border-gray-400 p-2 rounded-md"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  name="dob"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Blood Group <span className="text-red-400">*</span>
                </label>
                <select
                  className="border border-gray-400 p-2 rounded-md"
                  required
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  name="bloodGroup"
                >
                  <option value="">Select Blood Group</option>

                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="AB-">AB-</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="O+">O+</option>
                </select>
              </div>

              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  PAN
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="PAN "
                  value={formData.pan}
                  onChange={handleChange}
                  name="pan"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Aadhar No.
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  // placeholder="Aadhar Number"
                  value={formData.aadhar}
                  name="aadhar"
                  onChange={handleChange}
                  maxLength={14}
                  placeholder="xxxx-xxxx-xxxx"
                />
              </div>
              {/* <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  ESIC No.
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  // placeholder="Aadhar Number"
                  value={formData.esic}
                  name="esic"
                  onChange={handleChange}
                  maxLength={17}
                  placeholder="ESIC no."
                />
              </div> */}
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Marital Status
                </label>
                <select
                  className="border border-gray-400 p-2 rounded-md"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  name="maritalStatus"
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widow">Widow</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Emergency Contact Name"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  name="emergencyContactName"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Emergency Contact No.
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Emergency Contact Number"
                  value={formData.emergencyContactNumber}
                  onChange={handleChange}
                  name="emergencyContactNumber"
                  pattern="[0-9]*"
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight"
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </div>

            <h2 className="border-b text-center text-xl border-black  mb-6 font-bold mt-2">
              Family Information
            </h2>
            <div className="grid xl:grid-cols-3 gap-2 mt-5">
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Father's Name
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Father's Name"
                  value={formData.fatherName}
                  onChange={handleChange}
                  name="fatherName"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Mother's Name
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Mother's Name"
                  value={formData.motherName}
                  onChange={handleChange}
                  name="motherName"
                />
              </div>
              {formData.maritalStatus === "Married" && (
                <div className="grid gap-2 items-center w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Spouse's Name
                  </label>
                  <input
                    type="text"
                    className="border border-gray-400 p-2 rounded-md"
                    placeholder="Spouse's Name"
                    value={formData.spouseName}
                    onChange={handleChange}
                    name="spouseName"
                  />
                </div>
              )}
            </div>

            <h2 className="border-b text-center text-xl  border-black mb-6 font-bold mt-2">
              Address Information
            </h2>
            <div className="grid xl:grid-cols-3 gap-2 mt-5">
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Address Line 1
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Address Line 1"
                  maxLength="150"
                  value={formData.address1}
                  onChange={handleChange}
                  name="address1"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Address Line 2
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Address Line 2"
                  maxLength="150"
                  value={formData.address2}
                  onChange={handleChange}
                  name="address2"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  name="city"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  State/Province
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="State/Province"
                  value={formData.state}
                  onChange={handleChange}
                  name="state"
                />
              </div>

              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Zip / Pin Code
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Zip / Pin Code"
                  value={formData.code}
                  onChange={handleChange}
                  name="code"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Country"
                  onChange={handleChange}
                  value={formData.country}
                  name="country"
                />
              </div>
            </div>

            <h2 className="border-b text-center text-xl border-black mb-6 font-bold mt-2">
              Payment Information
            </h2>
            <div className="grid gap-4">
              {/* { <div className="flex flex-col gap-2">
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
                menuPlacement="top"
              />
            </div> } */}
              <div className="grid lg:grid-cols-3 gap-2">
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Mode <span className="text-red-400">*</span>
                  </label>
                  <select
                    className="border border-gray-400  p-2  rounded-md"
                    required
                    value={formData.paymentMode}
                    onChange={handleChange}
                    name="paymentMode"
                  >
                    <option value="">Select payment Mode</option>
                    {paymentModeList &&
                      paymentModeList.map((payment) => (
                        <option value={payment.id} key={payment.id}>
                          {payment.mode_name}
                        </option>
                      ))}
                  </select>
                </div>
                {formData.paymentMode === "3" && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Bank Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="bankName"
                        id=""
                        className="border border-gray-400  p-2  rounded-md"
                        placeholder="Enter bank name"
                        value={formData.bankName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Bank Account Number{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        id=""
                        className="border border-gray-400  p-2  rounded-md"
                        placeholder="Enter bank account no."
                        value={formData.accountNumber}
                        onChange={handleChange}
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
                        className="border border-gray-400  p-2  rounded-md"
                        placeholder="Enter IFSC"
                        value={formData.ifsc}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5 mt-5"></div>

            <div className="flex gap-5 justify-end items-center my-4">
              <button
                type="submit"
                // style={{ background: themeColor }}
                onClick={handleAddEmployee}
                className={`px-4 py-2  text-white font-medium rounded-md flex items-center gap-2 ${
                  disableSave
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-400"
                }`}
                disabled={disableSave}
              >
                Save
              </button>
              <button
                type="submit"
                onClick={() => setSteps("employment")}
                className={`px-4 py-2  text-white font-medium  rounded-md flex items-center gap-2 ${
                  disableNext
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-400"
                }`}
                disabled={disableNext}
              >
                Next <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
      {steps === "employment" && (
        <Employment setSteps={setSteps} empId={empId} />
      )}
      {steps === "salary" && (
        <OnboardingSalary empId={empId} setSteps={setSteps} />
      )}
      {steps === "statutory" && <Statutory empId={empId} />}

      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col  bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium">
            <GrHelpBook size={20} />
            <h2>Tool Tips</h2>
          </div>
          <div className=" ">
            <ul style={listItemStyle} className="flex flex-col gap-2">
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Add basic employee details such as Name, Email ID, Contact
                    Number, Gender, DoB, PAN and AADHAR Number.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Add Family Information such as Father's Name, Senior Citizen
                    applicable, Disability Level etc{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>Add employee's Payment Information </li>
                </ul>
              </li>

              {/* <li>
                <p>
                  Any custom fields added in Organisation {">"} Organisation
                  Settings {">"} Employee Fields {">"} Personal Details will be
                  reflected on the page{" "}
                </p>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
