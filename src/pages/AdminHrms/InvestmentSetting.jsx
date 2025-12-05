import React, { useState, useRef, useEffect } from "react";
import AdminHRMS from "./AdminHrms";
import image from "/profile.png";
import PayrollSettingDetailsList from "./PayrollSettingDetailsList";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { editInvestmentSetting, getInvestmentSetting } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";

const InvestmentSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    employeeAccessLevel: "Invisible",
    investmentDeclarationDayLimit: "",
    proofSubmissionMonth: "",
    lockInvestment: false,
    investmentProofSoftCopy: false,
    mailerForProof: false,
    enable80GOption: false,
    emailOnProofApproval: false,
    activatePromissoryDeclaration: false,
    houseRentalAgreementMandatory: false,
    autoTaxDeclarationApproval: false,
    manageEmpTaxRegime: false,
    id: "",
  });
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchInvestmentSetting = async () => {
    try {
      const res = await getInvestmentSetting(hrmsOrgId);
      const data = res[0];
      console.log(res);
      setFormData({
        ...formData,
        employeeAccessLevel: data.employee_access,
        investmentDeclarationDayLimit:
          data.investment_declaration_edit_days_limit,
        proofSubmissionMonth: data.investment_proof_submission_month,
        lockInvestment: data.lock_investment_declaration_during_payroll,
        investmentProofSoftCopy: data.collect_investment_proof_soft_copies,
        mailerForProof: data.send_mailer_for_investment_proof,
        enable80GOption: data.enable_80g_donation_option,
        emailOnProofApproval: data.email_notification_on_proof_approval,
        activatePromissoryDeclaration: data.activate_promissory_declarations,
        houseRentalAgreementMandatory: data.house_rental_agreement_mandatory,
        autoTaxDeclarationApproval: data.auto_approval_for_tax_declaration,
        manageEmpTaxRegime: data.manage_employee_tax_regime,
        id: data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvestmentSetting();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditInvestmentSetting = async () => {
    const editData = new FormData();
    editData.append("employee_access", formData.employeeAccessLevel);
    editData.append(
      "investment_declaration_edit_days_limit",
      formData.investmentDeclarationDayLimit
    );
    editData.append(
      "investment_proof_submission_month",
      formData.proofSubmissionMonth
    );
    editData.append(
      "lock_investment_declaration_during_payroll",
      formData.lockInvestment
    );
    editData.append(
      "collect_investment_proof_soft_copies",
      formData.investmentProofSoftCopy
    );
    editData.append(
      "send_mailer_for_investment_proof",
      formData.mailerForProof
    );
    editData.append("enable_80g_donation_option", formData.enable80GOption);
    editData.append(
      "email_notification_on_proof_approval",
      formData.emailOnProofApproval
    );
    editData.append(
      "activate_promissory_declarations",
      formData.activatePromissoryDeclaration
    );
    editData.append(
      "house_rental_agreement_mandatory",
      formData.houseRentalAgreementMandatory
    );
    editData.append(
      "auto_approval_for_tax_declaration",
      formData.autoTaxDeclarationApproval
    );
    editData.append("manage_employee_tax_regime", formData.manageEmpTaxRegime);
    editData.append("organization", hrmsOrgId);
    try {
      const res = await editInvestmentSetting(formData.id, editData);
      toast.success("Investment setting updated successfully");
      fetchInvestmentSetting();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  console.log(formData);

  return (
    <div className="flex gap-4 ml-20">
      <PayrollSettingDetailsList />
      <div className="p-2">
        <div className="bg-white  rounded py-4">
          <div className="container mx-auto py-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold mb-2">
                Investment Settings
              </h2>
              <div className="flex justify-end">
                {isEditing ? (
                  <div className="flex gap-2 justify-center my-2">
                    <button
                      className="border-2 border-green-400 text-green-400 rounded-full p-1 px-4 flex items-center gap-2"
                      onClick={handleEditInvestmentSetting}
                    >
                      <FaCheck /> Save
                    </button>
                    <button
                      className="border-2 border-red-400 text-red-400 rounded-full p-1 px-4 flex items-center gap-2"
                      onClick={() => setIsEditing(false)}
                    >
                      <MdClose /> Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md flex gap-2 items-center"
                  >
                    <BiEdit /> Edit
                  </button>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                What level of access do your employees have on their Investment
                Declarations?
              </label>
              <div className="flex items-center gap-5">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="invisible"
                    name="access"
                    checked={formData.employeeAccessLevel === "Invisible"}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        employeeAccessLevel: "invisible",
                      })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="invisible">Invisible</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="viewOnly"
                    name="access"
                    checked={formData.employeeAccessLevel === "View Only"}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        employeeAccessLevel: "View Only",
                      })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="viewOnly">View Only</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="manage"
                    name="access"
                    checked={formData.employeeAccessLevel === "Manage"}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        employeeAccessLevel: "Manage",
                      })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="manage">Manage</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                For new joinee, do you want to set days limit upto how many days
                the Investment declaration page edit option should be available?
              </label>
              <input
                type="number"
                className={`w-full px-3 py-2 border border-gray-100 rounded-md ${
                  !isEditing ? "bg-gray-100 text-gray-400" : ""
                }`}
                readOnly={!isEditing}
                value={formData.investmentDeclarationDayLimit}
                onChange={handleChange}
                name="investmentDeclarationDayLimit"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                From what month onwards employees will submit their actual
                investment proof?
              </label>
              <select
                className="border p-2 w-full rounded-md"
                disabled={!isEditing}
                value={formData.proofSubmissionMonth}
                name="proofSubmissionMonth"
                onChange={handleChange}
              >
                <option value="December">December</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Do you want to lock investment declaration option while running
                payroll?
              </label>
              <div className="flex items-center gap-2">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="lockYes"
                    name="lock"
                    checked={formData.lockInvestment === true}
                    onChange={() =>
                      setFormData({ ...formData, lockInvestment: true })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="lockYes">Yes</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="lockNo"
                    name="lock"
                    checked={formData.lockInvestment === false}
                    onChange={() =>
                      setFormData({ ...formData, lockInvestment: false })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="lockNo">No</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Would you like to collect employee's Investment proof in soft
                copies through Employee's Self service portal?
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="proofYes"
                    name="proof"
                    checked={formData.investmentProofSoftCopy === true}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        investmentProofSoftCopy: true,
                      })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="proofYes">Yes</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="proofNo"
                    name="proof"
                    checked={formData.investmentProofSoftCopy === false}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        investmentProofSoftCopy: false,
                      })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="proofNo">No</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Do you want to send mailer to employee to submit investment
                proof?
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="mailerYes"
                    name="mailer"
                    checked={formData.mailerForProof === true}
                    onChange={() =>
                      setFormData({ ...formData, mailerForProof: true })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="mailerYes">Yes</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="mailerNo"
                    name="mailer"
                    checked={formData.mailerForProof === false}
                    onChange={() =>
                      setFormData({ ...formData, mailerForProof: false })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="mailerNo">No</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Do you want to enable 80G Donation option under Investment
                Declaration?
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="donationYes"
                    name="donation"
                    checked={formData.enable80GOption === true}
                    onChange={() =>
                      setFormData({ ...formData, enable80GOption: true })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="donationYes">Yes</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="donationNo"
                    name="donation"
                    checked={formData.enable80GOption === false}
                    onChange={() =>
                      setFormData({ ...formData, enable80GOption: false })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="donationNo">No</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Do employee receive email notification when Admin approves the
                proof?
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="notificationYes"
                    name="notification"
                    checked={formData.emailOnProofApproval === true}
                    onChange={() =>
                      setFormData({ ...formData, emailOnProofApproval: true })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="notificationYes">Yes</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="notificationNo"
                    name="notification"
                    checked={formData.emailOnProofApproval === false}
                    onChange={() =>
                      setFormData({ ...formData, emailOnProofApproval: false })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="notificationNo">No</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Would you like to activate promissory declarations for
                employees?
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="promissoryYes"
                    name="promissory"
                    checked={formData.activatePromissoryDeclaration === true}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        activatePromissoryDeclaration: true,
                      })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="promissoryYes">Yes</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="promissoryNo"
                    name="promissory"
                    checked={formData.activatePromissoryDeclaration === false}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        activatePromissoryDeclaration: false,
                      })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="promissoryNo">No</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Is House Rental Agreement Mandatory?
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="rentalYes"
                    name="rental"
                    checked={formData.houseRentalAgreementMandatory === true}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        houseRentalAgreementMandatory: true,
                      })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="rentalYes">Yes</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="rentalNo"
                    name="rental"
                    checked={formData.houseRentalAgreementMandatory === false}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        houseRentalAgreementMandatory: false,
                      })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="rentalNo">No</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Do you want to activate auto approval for tax declaration?
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="autoApprovalYes"
                    name="autoApproval"
                    checked={formData.autoTaxDeclarationApproval === true}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        autoTaxDeclarationApproval: true,
                      })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="autoApprovalYes">Yes</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="autoApprovalNo"
                    name="autoApproval"
                    checked={formData.autoTaxDeclarationApproval === false}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        autoTaxDeclarationApproval: false,
                      })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="autoApprovalNo">No</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Do you want to activate manage employee tax regime?
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="taxRegimeYes"
                    name="taxRegime"
                    checked={formData.manageEmpTaxRegime === true}
                    onChange={() =>
                      setFormData({ ...formData, manageEmpTaxRegime: true })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="taxRegimeYes">Yes</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="taxRegimeNo"
                    name="taxRegime"
                    checked={formData.manageEmpTaxRegime === false}
                    onChange={() =>
                      setFormData({ ...formData, manageEmpTaxRegime: false })
                    }
                    className="mr-2"
                    disabled={!isEditing}
                  />
                  <label htmlFor="taxRegimeNo">No</label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-center items-center my-4">
            <div className="flex justify-between">
              {isEditing && (
                <div className="flex gap-2 justify-center my-2">
                  <button
                    className="border-2 border-green-400 text-green-400 rounded-full p-1 px-4 flex items-center gap-2"
                    onClick={handleEditInvestmentSetting}
                  >
                    <FaCheck /> Save
                  </button>
                  <button
                    className="border-2 border-red-400 text-red-400 rounded-full p-1 px-4 flex items-center gap-2"
                    onClick={() => setIsEditing(false)}
                  >
                    <MdClose /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSetting;
