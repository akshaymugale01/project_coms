import React, { useState, useEffect } from "react";

import boy from "/boy.png";
import girl from "/girl.png";
import lady from "/lady.png";
import oldlady from "/oldlady.png";
import oldman from "/oldman.png";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { postExistingInsPolicy } from "../../api";

const AddPolicy = () => {
  const [formData, setFormData] = useState({
    criticalDisease: false,
  });
  const themeColor = useSelector((state) => state.theme.color);
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [insuranceProviderName, setInsuranceProviderName] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [policyStartDate, setPolicyStartDate] = useState("");
  const [policyEndDate, setPolicyEndDate] = useState("");
  const [policyTerm, setPolicyTerm] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryDob, setBeneficiaryDob] = useState("");
  const [beneficiaryGender, setBeneficiaryGender] = useState("");
  const [beneficiaryRelationship, setBeneficiaryRelationship] = useState("");
  const [beneficiaryContact, setBeneficiaryContact] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [policyDocument, setPolicyDocument] = useState(null);
  const [identificationProof, setIdentificationProof] = useState(null);
  const [medicalReports, setMedicalReports] = useState(null);
  const [otherDocuments, setOtherDocuments] = useState(null);

  const [insuredMembers, setInsuredMembers] = useState([
    { name: "", dateOfBirth: "", gender: "", relationship: "" },
  ]);

  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, "0");
    setMaxDate(`${yyyy}-${mm}-${dd}`);
  }, []);
  const handleContactNumberChange = (e) => {
    const value = e.target.value;
    // Check if the length is less than or equal to 10
    if (value.length <= 10) {
      setContactNumber(value);
    }
  };
  const [emailError, setEmailError] = useState("");
  const handleEmailChange = (e) => {
    const value = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
    setEmailAddress(value);
  };

  const handleAadharNumberChange = (e) => {
    const value = e.target.value;
    // Check if the length is less than or equal to 10
    if (value.length <= 15) {
      setIdentificationNumber(value);
    }
  };

  const handlePolicyStartDateChange = (e) => {
    const value = e.target.value;
    setPolicyStartDate(value);
    if (policyEndDate && value > policyEndDate) {
      toast.error("Policy start date cannot be greater than policy end date", {
        position: "top-center",
        autoClose: 2000,
      });
      setPolicyStartDate("");
    } else if (policyEndDate) {
      calculatePolicyTerm(value, policyEndDate);
    }
  };

  const handlePolicyEndDateChange = (e) => {
    const value = e.target.value;
    setPolicyEndDate(value);
    if (policyStartDate && value < policyStartDate) {
      toast.error("Policy end date cannot be less than policy start date", {
        position: "top-center",
        autoClose: 2000,
      });
      setPolicyEndDate("");
    } else if (policyStartDate) {
      calculatePolicyTerm(policyStartDate, value);
    }
  };

  const calculatePolicyTerm = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    setPolicyTerm(`${diffYears.toFixed(1)} year${diffYears > 1 ? "s" : ""}`);
  };

  const addInsuredMember = () => {
    setInsuredMembers([
      ...insuredMembers,
      { name: "", dateOfBirth: "", gender: "", relationship: "" },
    ]);
  };

  const deleteInsuredMember = (index) => {
    setInsuredMembers(insuredMembers.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const newInsuredMembers = [...insuredMembers];
    newInsuredMembers[index][field] = value;
    setInsuredMembers(newInsuredMembers);
  };

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleNext = async () => {
    if (
      !fullName ||
      !dob ||
      !gender ||
      !address ||
      !contactNumber ||
      !emailAddress
    ) {
      toast.error("PolicyHolder details are required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (!identificationProof) {
      toast.error("Identification is required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (!medicalReports) {
      toast.error("Medical Report is required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (!policyType || !policyStartDate || !policyEndDate) {
      toast.error("Policy details are required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (
      !beneficiaryRelationship ||
      !beneficiaryName ||
      !beneficiaryContact ||
      !beneficiaryDob ||
      !beneficiaryGender
    ) {
      toast.error("Beneficiary Details are required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    // if(!formattedMembers){
    //   toast.error('All fields are required', { position: 'top-center', autoClose: 2000 });
    //   return;
    // }
    // Log individual fields

    // const formattedMembers = insuredMembers.map(member => ({
    //   name: member.name,
    //   dob: member.dateOfBirth,
    //   gender: member.gender,
    //   relationship_to_policyholder: member.relationship
    // }));

    const formattedMembers = insuredMembers
      .map((member) => ({
        name: member.name,
        dob: member.dateOfBirth,
        gender: member.gender,
        relationship_to_policyholder: member.relationship,
      }))
      .filter(
        (member) =>
          member.name ||
          member.dob ||
          member.gender ||
          member.relationship_to_policyholder
      );

    const user_id = localStorage.getItem("VIBEUSERID");

    const formData = new FormData();
    formData.append("user", user_id); // Replace with a valid user ID from your database
    formData.append("user_id", user_id);
    formData.append("policy_category", "New");
    // formData.append("policy_number", policyNumber);
    // formData.append("policy_name", policyName);
    // formData.append("insurance_provider_name", insuranceProviderName);
    formData.append("policy_type", policyType);
    formData.append("start_date", policyStartDate);
    formData.append("end_date", policyEndDate);
    // formData.append('policy_status', 'active');
    formData.append("policyholder_name", fullName);
    formData.append("policyholder_dob", dob);
    formData.append("policyholder_gender", gender);
    formData.append("policyholder_address", address);
    formData.append("policyholder_contact_number", contactNumber);
    formData.append("policyholder_email_address", emailAddress);
    // formData.append('coverage_amount', '50000.00');
    // formData.append('premium_amount', '500.00');
    // formData.append('payment_frequency', 'monthly');
    // formData.append('next_payment_due_date', '2024-07-01');
    formData.append("beneficiary_names", beneficiaryName);
    formData.append("beneficiary_relationships", beneficiaryRelationship);
    formData.append("beneficiary_contact_info", beneficiaryContact);
    formData.append("beneficiary_dob", beneficiaryDob);
    formData.append("beneficiary_gender", beneficiaryGender);
    formData.append(
      "insured_members",
      JSON.stringify(formattedMembers.length ? formattedMembers : [])
    );
    // formData.append("policy_document  ", policyDocument);
    formData.append("identification_proof", identificationProof);
    formData.append("medical_report", medicalReports);
    setLoading(true);
    try {
      const res = await postExistingInsPolicy(formData);

      if (res.success) {
        console.log("Success");
        navigate("/insurance");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen p-4 sm:p-0 flex flex-col md:flex-row">
      <div className="fixed hidden sm:block left-0 top-0 h-full md:static md:h-auto md:flex-shrink-0">
        <Navbar />
      </div>
      <div className="flex justify-center my-5 overflow-x-auto w-full sm:w-full">
        <div className="border border-gray-300 rounded-lg w-full mx-5 p-2 flex flex-col mb-5 gap-5">
          <h2
            style={{ background: themeColor }}
            className="text-center md:text-xl font-bold  p-2 bg-black rounded-md text-white"
          >
            Add Policy
          </h2>
          <section className="content">
            <div className="container-fluid">
              <div>
                <div className=" row p-2">
                  {/* -----------------------------New Fields------------------------------------ */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">Full Name:</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="border rounded-md p-2"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">Date of Birth:</label>
                      <input
                        type="date"
                        value={dob}
                        max={maxDate}
                        onChange={(e) => setDob(e.target.value)}
                        className="border rounded-md p-2"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-medium" htmlFor="gender">
                        Gender:
                      </label>
                      <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="border rounded-md p-2"
                      >
                        <option value="" disabled>
                          Select your gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-medium">Address:</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="border rounded-md p-2"
                        placeholder="Enter address"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">Contact Number:</label>
                      <input
                        type="number"
                        value={contactNumber}
                        onChange={handleContactNumberChange}
                        required
                        maxLength="10"
                        className="border rounded-md p-2"
                        placeholder="Enter contact number"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label>Email Address:</label>
                      {/* {emailError && (
                        <span style={{ color: "red" }}>{emailError}</span>
                      )} */}
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={handleEmailChange}
                        required
                        className="border rounded-md p-2"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">Aadhar Number:</label>
                      <input
                        type="number"
                        // placeholder="(e.g., Social Security Number, National ID)"
                        value={identificationNumber}
                        onChange={handleAadharNumberChange}
                        required
                        className="border rounded-md p-2"
                        placeholder="Enter aadhar number"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">Policy Type:</label>
                      <select
                        id="policyType"
                        value={policyType}
                        onChange={(e) => setPolicyType(e.target.value)}
                        required
                        className="border rounded-md p-2"
                      >
                        <option value="" disabled>
                          Select your Policy type
                        </option>
                        <option value="individual">Individual</option>
                        <option value="family">Family</option>
                        <option value="group">Group</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">Policy Start Date:</label>
                      <input
                        type="date"
                        value={policyStartDate}
                        onChange={handlePolicyStartDateChange}
                        required
                        className="border rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">Policy End Date:</label>
                      <input
                        type="date"
                        value={policyEndDate}
                        onChange={handlePolicyEndDateChange}
                        required
                        className="border rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">Policy Term: </label>
                      <input
                        type="text"
                        placeholder="Ex: 1 year, 5 years"
                        value={policyTerm}
                        onChange={(e) => setPolicyTerm(e.target.value)}
                        required
                        className="border rounded-md p-2"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-medium">Beneficiary Name:</label>
                      <input
                        type="text"
                        value={beneficiaryName}
                        onChange={(e) => setBeneficiaryName(e.target.value)}
                        required
                        className="border rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">
                        Beneficiary Date of Birth:
                      </label>
                      <input
                        type="date"
                        value={beneficiaryDob}
                        onChange={(e) => setBeneficiaryDob(e.target.value)}
                        required
                        className="border rounded-md p-2"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="gender" className="font-medium">
                        Beneficiary Gender:
                      </label>
                      <select
                        id="beneficiaryGender"
                        value={beneficiaryGender}
                        onChange={(e) => setBeneficiaryGender(e.target.value)}
                        required
                        className="border rounded-md p-2"
                      >
                        <option value="" disabled>
                          Select your gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">
                        Beneficiary Relationship to Policyholder:
                      </label>
                      <input
                        type="text"
                        value={beneficiaryRelationship}
                        onChange={(e) =>
                          setBeneficiaryRelationship(e.target.value)
                        }
                        required
                        className="border rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">
                        Beneficiary Contact:
                      </label>
                      <input
                        type="text"
                        value={beneficiaryContact}
                        onChange={(e) => setBeneficiaryContact(e.target.value)}
                        required
                        className="border rounded-md p-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="col-md-12 mt-2">
                    <label className="font-medium">
                      {" "}
                      <u>Insured Member</u>{" "}
                    </label>
                  </div>
                  {insuredMembers.map((member, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-2 my-2 border rounded-md p-1"
                    >
                      <div className="flex flex-col gap-2">
                        <label className="font-medium">
                          Name of Insured Member:
                        </label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                          }
                          required
                          className="border rounded-md p-2"
                          placeholder="Enter insured member name"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-medium">
                          Date of Birth of Insured Member:
                        </label>
                        <input
                          type="date"
                          value={member.dateOfBirth}
                          onChange={(e) =>
                            handleChange(index, "dateOfBirth", e.target.value)
                          }
                          required
                          className="border rounded-md p-2"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-medium">
                          Gender of Insured Member:
                        </label>
                        <select
                          value={member.gender}
                          onChange={(e) =>
                            handleChange(index, "gender", e.target.value)
                          }
                          required
                          className="border rounded-md p-2"
                        >
                          <option value="" disabled>
                            Select your gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-medium">
                          Relationship to Policyholder:
                        </label>
                        <input
                          type="text"
                          value={member.relationship}
                          onChange={(e) =>
                            handleChange(index, "relationship", e.target.value)
                          }
                          required
                          className="border rounded-md p-2"
                          placeholder="Enter Relationship"
                        />
                      </div>
                      <div className="flex items-end justify-end col-span-2 p-2">
                        <button
                          className="text-red-500"
                          onClick={() => deleteInsuredMember(index)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2">
                  <button
                    className="bg-green-400 text-white rounded-md p-2"
                    onClick={addInsuredMember}
                  >
                    Add Insured Member
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">
                      Identification Proof Upload:
                    </label>
                    <input
                      type="file"
                      // value={identificationProof}
                      onChange={(e) =>
                        setIdentificationProof(e.target.files[0])
                      }
                      required
                      className="border rounded-md p-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Medical Reports: required</label>
                    <input
                      className="border rounded-md p-2"
                      type="file"
                      // value={medicalReports}
                      onChange={(e) => setMedicalReports(e.target.files[0])}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-center my-2 mt-4">
                  <button
                    style={{ background: themeColor }}
                    className="text-white rounded-md p-2"
                    type="button"
                    onClick={handleNext}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default AddPolicy;
