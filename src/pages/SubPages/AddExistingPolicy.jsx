import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { postExistingInsPolicy } from "../../api";
import { useNavigate } from "react-router-dom";

const AddExistingPolicy = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [insuredMembers, setInsuredMembers] = useState([
    { name: "", dateOfBirth: "", gender: "", relationship: "" },
  ]);
  const [emailError, setEmailError] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [insuranceProviderName, setInsuranceProviderName] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [policyStartDate, setPolicyStartDate] = useState("");
  const [policyEndDate, setPolicyEndDate] = useState("");
  const [policyStatus, setPolicyStatus] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [premiumAmount, setPremiumAmount] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");
  const [nextPaymentDueDate, setNextPaymentDueDate] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryRelationship, setBeneficiaryRelationship] = useState("");
  const [beneficiaryContact, setBeneficiaryContact] = useState("");
  const [policyDocument, setPolicyDocument] = useState(null);
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, "0");
    setMaxDate(`${yyyy}-${mm}-${dd}`);
  }, []);
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

  const handleContactNumberChange = (e) => {
    const value = e.target.value;
    // Check if the length is less than or equal to 10
    if (value.length <= 10) {
      setContactNumber(value);
    }
  };
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
const navigate = useNavigate()
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

    if (!policyDocument) {
      toast.error("Policy Document is required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (!insuranceProviderName) {
      toast.error("Insurance Provider Name is required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (!coverageAmount) {
      toast.error("Coverage Amount is required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    if (!premiumAmount) {
      toast.error("Premium Amount is required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    if (!paymentFrequency) {
      toast.error("Payment Frequency is required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (
      !policyType ||
      !policyStartDate ||
      !policyEndDate ||
      !policyStatus ||
      !policyType ||
      !policyNumber ||
      !policyName
    ) {
      toast.error("Policy details are required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (!beneficiaryRelationship || !beneficiaryName || !beneficiaryContact) {
      toast.error("Beneficiary Details are required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

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
    formData.append("policy_category", "Existing");
    formData.append("policy_number", policyNumber);
    formData.append("policy_name", policyName);
    formData.append("insurance_provider_name", insuranceProviderName);
    formData.append("policy_type", policyType);
    formData.append("start_date", policyStartDate);
    formData.append("end_date", policyEndDate);
    formData.append("policy_status", policyStatus);
    formData.append("policyholder_name", fullName);
    formData.append("policyholder_dob", dob);
    formData.append("policyholder_gender", gender);
    formData.append("policyholder_address", address);
    formData.append("policyholder_contact_number", contactNumber);
    formData.append("policyholder_email_address", emailAddress);
    formData.append("coverage_amount", coverageAmount);
    formData.append("premium_amount", premiumAmount);
    formData.append("payment_frequency", paymentFrequency);
    formData.append("next_payment_due_date", nextPaymentDueDate);
    formData.append("beneficiary_names", beneficiaryName);
    formData.append("beneficiary_relationships", beneficiaryRelationship);
    formData.append("beneficiary_contact_info", beneficiaryContact);
    // formData.append('beneficiary_dob', beneficiaryDob);
    // formData.append('beneficiary_gender', beneficiaryGender);
    // formData.append('insured_members', insuredMembers);
    formData.append(
      "insured_members",
      JSON.stringify(formattedMembers.length ? formattedMembers : [])
    );
    formData.append("policy_document", policyDocument);
   
    try {
      const res = await postExistingInsPolicy(formData);

      if (res.success) {
        
        navigate("/insurance")
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
          <div className="container-fluid">
            <div>
              <div>
                <div>
                  <h5
                    className="p-2 text-white text-center font-medium rounded-md"
                    style={{ background: themeColor }}
                  >
                    Add Your Existing Policy
                  </h5>
                </div>

                {/* -----------------------------New Fields------------------------------------ */}
                <div className="grid md:grid-cols-3 gap-2 my-2 mt-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">
                      Policyholder Full Name:
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="border rounded-md p-2 "
                      placeholder="Enter policyholder name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">
                      Policyholder Date of Birth:
                    </label>
                    <input
                      type="date"
                      value={dob}
                      max={maxDate}
                      onChange={(e) => setDob(e.target.value)}
                      className="border rounded-md p-2 "
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="gender" className="font-medium">
                      Policyholder Gender:
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
                    <label className="font-medium">Policyholder Address:</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="border rounded-md p-2"
                      placeholder="Policyholder Address"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-medium">
                      Policyholder Contact Number:
                    </label>
                    <input
                      type="text"
                      value={contactNumber}
                      onChange={handleContactNumberChange}
                      required
                      maxLength="10"
                      className="border rounded-md p-2"
                      placeholder="Enter contact number"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-medium">
                      Policyholder Email Address:
                    </label>

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
                    <label className="font-medium">Policy Number:</label>
                    <input
                      type="text"
                      value={policyNumber}
                      onChange={(e) => setPolicyNumber(e.target.value)}
                      require
                      placeholder="Policy Number"
                      className="border rounded-md p-2"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Policy Name:</label>
                    <input
                      type="text"
                      value={policyName}
                      onChange={(e) => setPolicyName(e.target.value)}
                      required
                      placeholder="Policy Name"
                      className="border rounded-md p-2"
                    />
                  </div>
                  {/* </div> */}

                  <div className="flex flex-col gap-2">
                    <label className="font-medium">
                      Insurance Provider Name:
                    </label>
                    <input
                      type="text"
                      value={insuranceProviderName}
                      onChange={(e) => setInsuranceProviderName(e.target.value)}
                      required
                      className="border rounded-md p-2"
                      placeholder="Insurance provider name"
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
                    <label className="font-medium">Start Date:</label>
                    <input
                      type="date"
                      value={policyStartDate}
                      onChange={(e) => setPolicyStartDate(e.target.value)}
                      required
                      className="border rounded-md p-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">End Date:</label>
                    <input
                      type="date"
                      value={policyEndDate}
                      onChange={(e) => setPolicyEndDate(e.target.value)}
                      required
                      className="border rounded-md p-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Policy Status:</label>

                    <select
                      id="policyType"
                      value={policyStatus}
                      onChange={(e) => setPolicyStatus(e.target.value)}
                      required
                      className="border rounded-md p-2"
                    >
                      <option value="" disabled>
                        Select your Policy Status
                      </option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12 mt-2 border-b">
                  <label className="font-semibold text-lg">
                    {" "}
                    Insured Member
                  </label>
                </div>
                {insuredMembers.map((member, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-3 gap-2 border my-1 p-1 rounded-md"
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
                        placeholder="Enter name of Insured Member"
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
                        placeholder="Enter relationship"
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
                <div className="col-md-12 mt-2 ">
                  <button
                    className="bg-green-400 rounded-md text-white p-2"
                    onClick={addInsuredMember}
                  >
                    Add Insured Member
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Coverage Amount:</label>
                    <input
                      type="number"
                      value={coverageAmount}
                      onChange={(e) => setCoverageAmount(e.target.value)}
                      required
                      className="border rounded-md p-2"
                      placeholder="Coverage Amount"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Premium Amount:</label>
                    <input
                      type="number"
                      value={premiumAmount}
                      onChange={(e) => setPremiumAmount(e.target.value)}
                      required
                      className="border rounded-md p-2"
                      placeholder="Premium Amount"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Payment Frequency:</label>

                    <select
                      value={paymentFrequency}
                      onChange={(e) => setPaymentFrequency(e.target.value)}
                      required
                      className="border rounded-md p-2"
                    >
                      <option value="" disabled>
                        Select Payment Frequency
                      </option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">
                      Next Payment Due Date:
                    </label>
                    <input
                      type="date"
                      value={nextPaymentDueDate}
                      onChange={(e) => setNextPaymentDueDate(e.target.value)}
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
                      placeholder="Beneficiary Name"
                    />
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
                      placeholder=" Beneficiary Relationship"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">
                      Beneficiary Contact Information:
                    </label>
                    <input
                      type="text"
                      value={beneficiaryContact}
                      onChange={(e) => setBeneficiaryContact(e.target.value)}
                      required
                      className="border rounded-md p-2"
                      placeholder=" Beneficiary Contact"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">
                      Policy Document Upload:
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setPolicyDocument(e.target.files[0])}
                      required
                      className="border rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="flex justify-center w-full my-4">
                  <button
                    style={{ background: themeColor }}
                    className="text-white rounded-md px-4 p-2"
                    onClick={handleNext}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddExistingPolicy;
