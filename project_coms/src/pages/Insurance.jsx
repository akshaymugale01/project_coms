import React, { useEffect, useState } from "react";

import { PiPlusCircle } from "react-icons/pi";
import { FaDownload, FaFile, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_URL, getPolicies } from "../api";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
const Insurance = () => {
  document.title = "Insurance - My Citi Life";
  const [page, setPage] = useState("Current Policies");
  const [isLoadingPolicy, setIsLoadingPolicy] = useState(true);
  const [isPolicyDetailOpen, setIsPolicyDetailOpen] = useState(false);
  const [selectedPolicyHolderName, setSelectedPolicyHolderName] =
    useState(null);
  const [selectedPolicyGender, setSelectedPolicyGender] = useState(null);
  const [selectedPolicyDob, setSelectedPolicyDob] = useState(null);
  const [selectedPolicyEmail, setSelectedPolicyEmail] = useState(null);
  const [selectedPolicyContactNo, setSelectedPolicyContactNo] = useState(null);
  const [selectedPolicyAddress, setSelectedPolicyAddress] = useState(null);
  const [selectedPolicyType, setSelectedPolicyType] = useState(null);
  const [
    selectedPolicyInquiryProviderName,
    setSelectedPolicyInquiryProviderName,
  ] = useState(null);
  const [selectedPolicyBeneficiaryName, setSelectedPolicyBeneficiaryName] =
    useState(null);
  const [selectedPolicyBeneficiaryDob, setSelectedPolicyBeneficiaryDob] =
    useState(null);
  const [selectedPolicyBeneficiaryGender, setSelectedPolicyBeneficiaryGender] =
    useState(null);
  const [
    selectedPolicyBeneficiaryRelation,
    setSelectedPolicyBeneficiaryRelation,
  ] = useState(null);
  const [
    selectedPolicyBeneficiaryContactInfo,
    setSelectedPolicyBeneficiaryContactInfo,
  ] = useState(null);
  const [selectedPolicyCoverageAmount, setSelectedPolicyCoverageAmount] =
    useState(null);
  const [selectedPolicyPremiunAmount, setSelectedPolicyPremiunAmount] =
    useState(null);
  const [selectedPolicyFrequency, setSelectedPolicyFrequency] = useState(null);
  const [selectedPolicyNextPaymentDate, setSelectedPolicyNextPaymentDate] =
    useState(null);
  const [selectedPolicyName, setSelectedPolicyName] = useState(null);
  const Get_Policy = async (policyCategory) => {
    const user_id = localStorage.getItem("VIBEUSERID");
    setIsLoadingPolicy(true);
    try {
      const data = await getPolicies(user_id);
      if (data.success) {
        setIsLoadingPolicy(false);
        return data.data.filter(
          (policy) => policy.policy_category === policyCategory
        );
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoadingPolicy(false);
    }
  };

  const onClosePolicyDetail = () => {
    setIsPolicyDetailOpen(false);
  };

  useEffect(() => {
    onBtnTogglePolicies("Current Policies");
    Get_Policy();
  }, []);
  const [policies, setPolicies] = useState([]);
  const onBtnTogglePolicies = async (type) => {
    setPage(type);
    let policyCategory = type === "Current Policies" ? "Existing" : "New";
    const policiesData = await Get_Policy(policyCategory);
    setPolicies(policiesData);
  };
  const handleDownload = (filename) => {
    console.log("call");
    if (!filename) {
      console.log("Filename is null or undefined, aborting download.");
      return;
    }

    const downloadLink = API_URL + filename;
    window.open(downloadLink, "_blank");
  };

  // const modalStyleTemplate = {
  //   content: {
  //     // width: isMobile ? "270px" : "750px",
  //     height: "520px",
  //     // height: 'auto',
  //     // (isSecondInputVisible) ? '350' : '40%',
  //     margin: "auto",
  //     backgroundColor: "#133953",
  //     //   backgroundColor: 'linear-gradient(to right,#153043 30%, #133953 70%)',
  //     color: "#fff",
  //     borderRadius: 5,
  //     overflowY: "auto",

  //     scrollbarWidth: "thin",
  //     scrollbarColor: "#888 #ddd",
  //     msOverflowStyle: "none",

  //     "&::-webkit-scrollbar": {
  //       width: "1px",
  //     },
  //     "&::-webkit-scrollbar-thumb": {
  //       backgroundColor: "#888",
  //     },
  //     "&::-webkit-scrollbar-thumb:hover": {
  //       backgroundColor: "#aaa",
  //     },
  //     border: "1px solid #133953",
  //   },
  //   overlay: {
  //     backgroundColor: "rgba(0, 0, 0, 0.3)", // This sets the background color to black with 10% opacity.
  //   },
  // };
  const onOpenPolicyDetail = (
    policyid,
    policyholderName,
    policyholderGender,
    policyholderEmail,
    policyholderDob,
    policyholderContact,
    policyholderAddress,
    policyType,
    policyName,
    policyBeneficiaryName,
    policyBeneficiaryDob,
    policyBeneficiaryContactNo,
    policyBeneficiaryGender,
    policyBeneficiaryRelation,
    policyInsuranceProvider,
    policyIdenticationproof,
    policyMedicalReport,
    policyCoverageAmount,
    policyPremiunAmount,
    policyFrequency,
    policyNextPaymentDate
  ) => {
    console.log("🚀 ~ onOpenPolicyDetail ~ policyid:", policyid);
    setSelectedPolicyHolderName(policyholderName);
    setSelectedPolicyGender(policyholderGender);
    setSelectedPolicyEmail(policyholderEmail);
    setSelectedPolicyDob(policyholderDob);
    setSelectedPolicyContactNo(policyholderContact);
    setSelectedPolicyAddress(policyholderAddress);
    setSelectedPolicyType(policyType);
    // setSelectedPolicyStartDate()
    // setSelectedPolicyEndDate()
    // setSelectedPolicyTerm()
    setSelectedPolicyName(policyName);
    setSelectedPolicyInquiryProviderName(policyInsuranceProvider);
    setSelectedPolicyBeneficiaryName(policyBeneficiaryName);
    setSelectedPolicyBeneficiaryDob(policyBeneficiaryDob);
    setSelectedPolicyBeneficiaryGender(policyBeneficiaryGender);
    setSelectedPolicyBeneficiaryRelation(policyBeneficiaryRelation);
    setSelectedPolicyBeneficiaryContactInfo(policyBeneficiaryContactNo);

    // setSelectedPolicyInsuredMemberName()
    // setSelectedPolicyInsuredMemberDob()
    // setSelectedPolicyInsuredMemberGender()
    // setSelectedPolicyInsuredMemberRelation()

    setSelectedPolicyCoverageAmount(policyCoverageAmount);
    setSelectedPolicyPremiunAmount(policyPremiunAmount);
    setSelectedPolicyFrequency(policyFrequency);
    setSelectedPolicyNextPaymentDate(policyNextPaymentDate);

    setIsPolicyDetailOpen(true);
  };
  const [isPolicyDetailRequestedOpen, setIsPolicyDetailRequestedOpen] =
    useState(false);

  const onOpenPolicyDetailRequested = (
    policyid,
    policyholderName,
    policyholderGender,
    policyholderEmail,
    policyholderDob,
    policyholderContact,
    policyholderAddress,
    policyType,
    policyName,
    policyBeneficiaryName,
    policyBeneficiaryDob,
    policyBeneficiaryContactNo,
    policyBeneficiaryGender,
    policyBeneficiaryRelation,
    policyInsuranceProvider,
    policyIdenticationproof,
    policyMedicalReport
  ) => {
    console.log("🚀 ~ onOpenPolicyDetail ~ policyid:", policyid);
    setSelectedPolicyHolderName(policyholderName);
    setSelectedPolicyGender(policyholderGender);
    setSelectedPolicyEmail(policyholderEmail);
    setSelectedPolicyDob(policyholderDob);
    setSelectedPolicyContactNo(policyholderContact);
    setSelectedPolicyAddress(policyholderAddress);
    setSelectedPolicyType(policyType);
    // setSelectedPolicyStartDate()
    // setSelectedPolicyEndDate()
    // setSelectedPolicyTerm()
    setSelectedPolicyName(policyName);
    setSelectedPolicyInquiryProviderName(policyInsuranceProvider);
    setSelectedPolicyBeneficiaryName(policyBeneficiaryName);
    setSelectedPolicyBeneficiaryDob(policyBeneficiaryDob);
    setSelectedPolicyBeneficiaryGender(policyBeneficiaryGender);
    setSelectedPolicyBeneficiaryRelation(policyBeneficiaryRelation);
    setSelectedPolicyBeneficiaryContactInfo(policyBeneficiaryContactNo);
    // setSelectedPolicyIdentificationProof(policyIdenticationproof);
    // setSelectedPolicyInsuredMemberName()
    // setSelectedPolicyInsuredMemberDob()
    // setSelectedPolicyInsuredMemberGender()
    // setSelectedPolicyInsuredMemberRelation()
    setIsPolicyDetailRequestedOpen(true);
  };

  const onClosePolicyDetailRequested = () => {
    setIsPolicyDetailRequestedOpen(false);
  };
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="my-5 flex md:flex-row flex-col justify-between items-center md:mx-5">
          <h2 className="font-semibold text-2xl">My Insurance Policy</h2>
          <div className="flex items-center gap-2">
            <Link
              to={"/insurance/add-policy"}
              className="border-2 font-semibold hover:bg-black hover:text-white duration-300 transition-all border-black p-1 px-4 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
            >
              <PiPlusCircle size={20} />
              Request New Policy
            </Link>
            <Link
              to={"/insurance/add-existing-policy"}
              className="border-2 font-semibold hover:bg-black hover:text-white duration-300 transition-all border-black p-1 px-4 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
            >
              <PiPlusCircle size={20} />
              Add Existing Policy
            </Link>
          </div>
        </div>

        <div className="border-2 md:mx-5 border-gray-400 rounded-md h-full">
          <div className="flex items-center gap-2 border-b p-2 py-0">
            <p
              className={`p-2 cursor-pointer transition-all duration-300  ${
                page === "Current Policies"
                  ? "font-medium border-b border-black"
                  : ""
              }`}
              onClick={() => onBtnTogglePolicies("Current Policies")}
            >
              Current Policies
            </p>
            <p
              className={`p-2 cursor-pointer  transition-all duration-300 ${
                page === "Requested Policies"
                  ? "font-medium border-b border-black"
                  : ""
              }`}
              onClick={() => onBtnTogglePolicies("Requested Policies")}
            >
              Requested Policies
            </p>
          </div>
          {page === "Current Policies" && (
            <div>
              {isLoadingPolicy ? (
                <div className=" m-4" style={{ textAlign: "center" }}>
                  <center className="m-4">
                    <div
                      className="spinner-border"
                      style={{ opacity: 0.3 }}
                      role="status"
                    >
                      <span className="sr-only"></span>
                    </div>
                    <br />
                    <span style={{ opacity: 0.6 }}>Please wait...</span>
                  </center>
                </div>
              ) : policies.length === 0 ? (
                <div className="col-md-12" style={{ textAlign: "center" }}>
                  <div className="m-4">
                    <center>
                      No Policies
                      <br />
                    </center>
                  </div>
                </div>
              ) : (
                policies.map((policy) => (
                  <div
                    key={policy.id}
                    className="rounded-lg p-4 border-2 border-gray-600 items-center m-2  grid grid-cols-3"
                  >
                    <div className="col-md-6">
                      <p
                        className="text-xl font-medium"
                        title={policy && policy.policy_name}
                      >
                        {policy &&
                        policy.policy_name &&
                        policy.policy_name.length > 20
                          ? policy.policy_name.slice(0, 20) + ".."
                          : policy && policy.policy_name}
                      </p>
                      <p
                        style={{
                          color: "#9d9fa1",
                          fontSize: "12px",
                          marginBottom: "0px",
                          margin: "0px",
                        }}
                      >
                        Policy Holder Name
                      </p>
                      <p
                        style={{
                          color: "black",
                          marginBottom: "10px",
                          margin: "0px",
                        }}
                      >
                        {policy.policyholder_name}
                      </p>
                    </div>
                    <div className="col-md-6 mt-2">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      ></div>
                      <div className="grid grid-cols-2">
                        <p className="w-fit text-gray-500">Covered by :</p>
                        <p>{policy.insurance_provider_name}</p>
                      </div>
                      <div className="grid grid-cols-2">
                        <p className="text-gray-500">Policy No :</p>
                        <p>{policy.policy_number}</p>
                      </div>
                      <div className="grid grid-cols-2">
                        <p className="text-gray-500">Policy Period :</p>
                        <p>
                          {policy.start_date} - {policy.end_date}
                        </p>
                      </div>
                    </div>
                    <div className="items-end flex-col gap-2 flex">
                      <button
                        className="bg-green-400 rounded-full p-1 px-4 text-white flex gap-2 items-center cursor-pointer"
                        onClick={() => handleDownload(policy.policy_document)}
                      >
                        {policy.policy_document && (
                          <>
                            <FaDownload /> Download
                          </>
                        )}
                      </button>
                      <button
                        className="bg-green-400 rounded-full p-1 px-3 text-white flex gap-2 items-center"
                        onClick={() =>
                          onOpenPolicyDetail(
                            policy.policy_name,
                            policy.policyholder_name,
                            policy.policyholder_gender,
                            policy.policyholder_email_address,
                            policy.policyholder_dob,
                            policy.policyholder_contact_number,
                            policy.policyholder_address,
                            policy.policy_type,
                            policy.policy_name,
                            policy.beneficiary_names,
                            policy.beneficiary_dob,
                            policy.beneficiary_contact_info,
                            policy.beneficiary_gender,
                            policy.beneficiary_relationships,
                            policy.insurance_provider_name,
                            policy.identification_proof,
                            policy.medical_report,
                            policy.coverage_amount,
                            policy.premium_amount,
                            policy.payment_frequency,
                            policy.next_payment_due_date
                          )
                        }
                      >
                        <BsEye size={18} /> View More
                      </button>
                    </div>

                    {isPolicyDetailOpen && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-xl overflow-y-auto max-h-[80%] w-[50rem]">
                          <div
                            className=""
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: 18,
                            }}
                            onClick={onClosePolicyDetail}
                          >
                            <h4 className="text-lg font-medium">
                              Policy Details
                            </h4>
                            <MdClose size={25} />
                          </div>
                          <hr style={{ borderColor: "#fff" }} />
                          <div className="col-md-12 row ">
                            <div className="col-md-4">
                              <u>
                                <b>Policy Holder Details : </b>
                              </u>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <p className="font-medium">Name </p>
                            <p className="col-md-8">
                              {" "}
                              : {selectedPolicyHolderName}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Gender : </div>
                            <div className="col-md-8">
                              : {selectedPolicyGender}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Date of Birth </div>
                            <div className="col-md-8">
                              {" "}
                              : {selectedPolicyDob}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Contact </div>
                            <div className="col-md-8">
                              : {selectedPolicyContactNo}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Email </div>
                            <div className="col-md-8">
                              : {selectedPolicyEmail}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Address </div>
                            <div className="col-md-8">
                              : {selectedPolicyAddress}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="col-md-4">
                              <u>
                                <b>Policy Details : </b>
                              </u>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Policy Type </div>
                            <div className="col-md-8">
                              {" "}
                              : {selectedPolicyType}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Policy Name </div>
                            <div className="col-md-8">
                              {" "}
                              : {selectedPolicyName}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Inquiry Provider Name
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyInquiryProviderName}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Coverage Amount
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyCoverageAmount}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Premium Amount
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyPremiunAmount}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Policy Frequency </div>
                            <div className="col-md-8">
                              : {selectedPolicyFrequency}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Next Payment Date
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyNextPaymentDate}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-4">
                            <div className="col-md-4">
                              <u>
                                <b>Policy Beneficiary Details : </b>
                              </u>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Beneficiary Name
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyBeneficiaryName}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Beneficiary DOB
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyBeneficiaryDob}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Beneficiary Gender
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyBeneficiaryGender}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Beneficiary Relation
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyBeneficiaryRelation}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Beneficiary Contact Info
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyBeneficiaryContactInfo}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {page === "Requested Policies" && (
            <div className="mypolicy-height">
              {isLoadingPolicy ? (
                <div className="col-md-12 m-4" style={{ textAlign: "center" }}>
                  <center className="m-4">
                    <div
                      className="spinner-border"
                      style={{ opacity: 0.3 }}
                      role="status"
                    >
                      <span className="sr-only"></span>
                    </div>
                    <br />
                    <span style={{ opacity: 0.6 }}>Please wait...</span>
                  </center>
                </div>
              ) : policies.length === 0 ? (
                <div className="col-md-12" style={{ textAlign: "center" }}>
                  <div className="m-4">
                    <center>
                      No Policies
                      <br />
                    </center>
                  </div>
                </div>
              ) : (
                policies.map((policy) => (
                  <div
                    key={policy.id}
                    className="rounded-lg p-4 border-2 border-gray-600 items-center m-2  grid grid-cols-3"
                  >
                    <div className="col-md-6">
                      <p
                        className="text-xl font-medium"
                        title={policy && policy.policy_name}
                      >
                        {policy &&
                        policy.policy_name &&
                        policy.policy_name.length > 20
                          ? policy.policy_name.slice(0, 20) + ".."
                          : policy && policy.policy_name}
                      </p>

                      <p
                        style={{
                          color: "#9d9fa1",
                          fontSize: "12px",
                          marginBottom: "0px",
                          margin: "0px",
                        }}
                      >
                        Policy Holder Name:
                      </p>
                      <p
                        style={{
                          color: "black",
                          marginBottom: "10px",
                          margin: "0px",
                        }}
                      >
                        {policy.policyholder_name}
                      </p>
                    </div>
                    <div className="col-md-6 mt-2">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        {/* <FaDownload style={{ color: '#10df95' }} /> */}
                      </div>
                      <div className="grid grid-cols-2">
                        <p className="text-gray-500">Covered by:</p>
                        <p className="text-gray-500">
                          {policy.insurance_provider_name}
                        </p>
                      </div>

                      <div className="grid grid-cols-2">
                        <p className="text-gray-500">Policy Period:</p>
                        <p>
                          {policy.start_date} - {policy.end_date}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="bg-green-400 rounded-full p-1 px-2 text-white flex gap-2 items-center"
                        onClick={() =>
                          onOpenPolicyDetailRequested(
                            policy.id,
                            policy.policyholder_name,
                            policy.policyholder_gender,
                            policy.policyholder_email_address,
                            policy.policyholder_dob,
                            policy.policyholder_contact_number,
                            policy.policyholder_address,
                            policy.policy_type,
                            policy.policy_name,
                            policy.beneficiary_names,
                            policy.beneficiary_dob,
                            policy.beneficiary_contact_info,
                            policy.beneficiary_gender,
                            policy.beneficiary_relationships,
                            policy.insurance_provider_name,
                            policy.identification_proof,
                            policy.medical_report
                          )
                        }
                      >
                        <BsEye /> View More
                      </button>
                    </div>

                    {isPolicyDetailRequestedOpen && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-xl hide-scrollbar overflow-y-auto max-h-[80%] w-[50rem]">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              fontSize: 18,
                            }}
                            onClick={onClosePolicyDetailRequested}
                          >
                            <MdClose />
                          </div>
                          <h4 className="font-medium">
                            Requested Policy Details
                          </h4>
                          <hr style={{ borderColor: "#fff" }} />
                          <div className="col-md-12 row ">
                            <div className="col-md-4">
                              <u className="font-medium">
                                Policy Holder Details :{" "}
                              </u>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Name </div>
                            <div className="col-md-8">
                              {" "}
                              : {selectedPolicyHolderName}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Gender </div>
                            <div className="col-md-8">
                              : {selectedPolicyGender}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Date of Birth </div>
                            <div className="col-md-8">
                              : {selectedPolicyDob}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Contact </div>
                            <div className="col-md-8">
                              : {selectedPolicyContactNo}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Email </div>
                            <div className="col-md-8">
                              : {selectedPolicyEmail}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Address </div>
                            <div className="col-md-8">
                              : {selectedPolicyAddress}
                            </div>
                          </div>
                          <div className="col-md-12 row mt-2">
                            <div className="col-md-4">
                              <u className="font-medium">Policy Details : </u>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Policy Type </div>
                            <div className="col-md-8">
                              : {selectedPolicyType}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Policy Name </div>
                            <div className="col-md-8">
                              : {selectedPolicyName}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Inquiry Provider Name{" "}
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyInquiryProviderName}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="font-medium">
                              <u>Policy Beneficiary Details : </u>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Beneficiary Name{" "}
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyBeneficiaryName}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Beneficiary DOB{" "}
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyBeneficiaryDob}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Beneficiary Gender{" "}
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyBeneficiaryGender}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Beneficiary Relation{" "}
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyBeneficiaryRelation}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">
                              Policy Beneficiary Contact Info{" "}
                            </div>
                            <div className="col-md-8">
                              : {selectedPolicyBeneficiaryContactInfo}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Insurance;
