import React, { useEffect, useState } from "react";
import OrganisationSetting from "./OrganisationSetting";
import HRMSHelpCenter from "./HRMSHelpCenter";
import {
  editMyOrganization,
  getAllHrmsOrganisation,
  getMyOrganization,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const BasicInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [formData, setFormData] = useState({
    companyName: "",
    contactNumber: "",
    retirementAge: "",
    minEmployeeAge: "",
    inactiveAccessDays: "",
    lastWorkingDateBeforeResignation: false,
    probationPeriod: "",
    unauthorizedAbsenceRate: "",
    overwriteEmail: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    const fetchAllOrganization = async () => {
      try {
        const response = await getMyOrganization(hrmsOrgId);
        setFormData({
          ...formData,
          companyName: response.name,
          contactNumber: response.contact_number,
          minEmployeeAge: response.minimum_age_required_for_joining,
          retirementAge: response.retirement_age,
          inactiveAccessDays:
            response.portal_access_on_deactivation_in_no_of_days,
          overwriteEmail: response.override_old_email,
          lastWorkingDateBeforeResignation:
            response.can_relieve_before_last_working_day,
          probationPeriod: response.default_probation_period,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllOrganization();
  }, []);

  const HandleEditMyOrganization = async () => {
    // Validate fields before submission
    if (!formData.companyName) {
      toast.error("Company name is required");
      return;
    }
    if (!formData.contactNumber) {
      toast.error("Contact number is required");
      return;
    }
    if (!formData.retirementAge) {
      toast.error("Retirement age is required");
      return;
    }
    if (!formData.minEmployeeAge) {
      toast.error("Minimum age required for joining is required");
      return;
    }
    if (formData.inactiveAccessDays === "") {
      toast.error("Inactive access days is required");
      return;
    }

    if (!formData.probationPeriod) {
      toast.error("Probation period is required");
      return;
    }

    const postData = new FormData();
    postData.append("name", formData.companyName);
    postData.append("contact_number", formData.contactNumber);
    postData.append("retirement_age", formData.retirementAge);
    postData.append(
      "minimum_age_required_for_joining",
      formData.minEmployeeAge
    );
    postData.append(
      "portal_access_on_deactivation_in_no_of_days",
      formData.inactiveAccessDays
    );
    postData.append(
      "can_relieve_before_last_working_day",
      formData.lastWorkingDateBeforeResignation
    );
    postData.append("override_old_email", formData.overwriteEmail);
    postData.append("default_probation_period", formData.probationPeriod);

    try {
      const res = await editMyOrganization(hrmsOrgId, postData);
      toast.success("Organization details updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("An error occurred while updating the organization");
      console.log(error);
    }
  };

  return (
    <div className="flex ml-20 justify-between">
      <OrganisationSetting />

      <div className="p-6 bg-white rounded-lg w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mb-4 px-4 py-1 bg-blue-500 text-white rounded-full flex items-center gap-2"
            >
              <BiEdit /> Edit
            </button>
          ) : (
            <div className="flex gap-2 items-center">
              <button
                onClick={HandleEditMyOrganization}
                className="mb-4 px-4 py-1 bg-green-500 text-white rounded-full flex items-center gap-2"
              >
                <FaCheck /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="mb-4 px-4 py-1 border-2 border-red-500 text-red-400 rounded-full flex items-center gap-2"
              >
                <MdClose /> Cancel
              </button>
            </div>
          )}
        </div>
        <div>
          <div className="grid w-full gap-2">
            <div className="mb-2">
              <label className="block text-gray-700 font-medium">
                Registered name of your Company{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200 text-gray-500" : ""
                }`}
                readOnly={!isEditing}
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-medium">
                Company contact number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200 text-gray-500" : ""
                }`}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-medium">
                Company's retirement age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="retirementAge"
                value={formData.retirementAge}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200 text-gray-500" : ""
                }`}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-medium">
                Minimum Age for a person to be an employee{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="minEmployeeAge"
                value={formData.minEmployeeAge}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200 text-gray-500" : ""
                }`}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-medium">
                Inactive employees Access Days from last working date{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="inactiveAccessDays"
                value={formData.inactiveAccessDays}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200 text-gray-500" : ""
                }`}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-medium">
                Last working date can be before resignation date?
              </label>
              <div
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200" : ""
                }`}
              >
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="lastWorkingDateBeforeResignation"
                    value="true"
                    checked={formData.lastWorkingDateBeforeResignation === true}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        lastWorkingDateBeforeResignation: true,
                      })
                    }
                    disabled={!isEditing}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name="lastWorkingDateBeforeResignation"
                    value="false"
                    checked={
                      formData.lastWorkingDateBeforeResignation === false
                    }
                    onChange={() =>
                      setFormData({
                        ...formData,
                        lastWorkingDateBeforeResignation: false,
                      })
                    }
                    disabled={!isEditing}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-medium">
                Default Probation period (in days){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="probationPeriod"
                value={formData.probationPeriod}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200 text-gray-500" : ""
                }`}
                readOnly={!isEditing}
              />
            </div>

            {/* <div className="mb-2">
              <label className="block text-gray-700 font-medium">
                Unauthorized Absence Rate
              </label>
              <input
                type="number"
                name="unauthorizedAbsenceRate"
                value={formData.unauthorizedAbsenceRate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200" : ""
                }`}
                readOnly={!isEditing}
              />
            </div> */}

            <div className="mb-2">
              <label className="block text-gray-700 font-medium">
                Do you want to overwrite old email ID if the same ID is used?
              </label>
              <div
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200" : ""
                }`}
              >
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="overwriteEmail"
                    value="true"
                    checked={formData.overwriteEmail === true}
                    onChange={() =>
                      setFormData({ ...formData, overwriteEmail: true })
                    }
                    disabled={!isEditing}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name="overwriteEmail"
                    value="false"
                    checked={formData.overwriteEmail === false}
                    onChange={() =>
                      setFormData({ ...formData, overwriteEmail: false })
                    }
                    disabled={!isEditing}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bg-white p-6 rounded-lg border border-gray-200 ">
          <h2 className="text-xl font-semibold mb-4">VibeCopilot</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between">
              <span className="font-medium">Location :</span>
              <span>Mumbai, Maharashtra</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">No. Of Employees::</span>
              <span>20</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Authorised Signatory::</span>
              <span>ABC</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">No. of Admins::</span>
              <span>3</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">No. Of Payrolls Run::</span>
              <span>12</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Part Of My Citi Life Since::</span>
              <span>23/20/2023</span>
            </div>
          </div>
        </div> */}
      </div>
      <HRMSHelpCenter help={"basic"} />
    </div>
  );
};

export default BasicInformation;
