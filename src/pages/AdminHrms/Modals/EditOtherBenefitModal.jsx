import React, { useEffect, useState } from "react";
import { editOtherBenefitDetails, getOtherBenefitDetails } from "../../../api";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../../utils/localStorage";

const EditOtherBenefitModal = ({ editId, onClose, fetchOtherBenefits }) => {
  const [formData, setFormData] = useState({
    label: "",
    inReport: false,
    affectAttendance: false,
  });
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  useEffect(() => {
    const fetchOtherBenefitDetails = async () => {
      try {
        const res = await getOtherBenefitDetails(editId);
        setFormData({
          ...formData,
          affectAttendance: res.attendance_effects_eligibility,
          inReport: res.include_in_salary_reports,
          label: res.custom_label,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherBenefitDetails()
  }, []);
  const handleEditBenefits = async () => {
    if (!formData.label) {
      return toast.error("Please provide benefit name");
    }
    const postData = new FormData();
    postData.append("custom_label", formData.label);
    postData.append("include_in_salary_reports", formData.inReport);
    postData.append(
      "attendance_effects_eligibility",
      formData.affectAttendance
    );
    postData.append("organization", hrmsOrgId);
    try {
      const res = await editOtherBenefitDetails(editId,postData);
      toast.success("Other benefit updated successfully");
      fetchOtherBenefits();
      onClose()
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
      <div class="max-h-screen h-80vh bg-white p-4 w-96 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Allowance</h2>
        <div >
          <div className="mb-4">
            <label
              htmlFor="deductionLabel"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              What would you want to call this Benefit? *
            </label>
            <input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter deduction label"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="showInCTC"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Do you want to include this in salary reports? *
            </label>

            <div className="flex items-center">
              <input
                type="radio"
                name="inReport"
                checked={formData.inReport === true}
                onChange={() => setFormData({ ...formData, inReport: true })}
                className="mr-2"
              />
              Yes
              <input
                type="radio"
                name="inReport"
                checked={formData.inReport === false}
                onChange={() => setFormData({ ...formData, inReport: false })}
                className="ml-4 mr-2"
              />
              No
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="frequency"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Do you want attendance to effect the eligibility?*
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                name="attendanceEffect"
                checked={formData.affectAttendance === true}
                onChange={() =>
                  setFormData({ ...formData, affectAttendance: true })
                }
                className="mr-2"
              />
              Yes
              <input
                type="radio"
                name="attendanceEffect"
                checked={formData.affectAttendance === false}
                onChange={() =>
                  setFormData({ ...formData, affectAttendance: false })
                }
                className="ml-4 mr-2"
              />
              No
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black mr-4"
            >
              Cancel
            </button>
            <button
             
              onClick={handleEditBenefits}
              className="bg-blue-500 text-white font-semibold p-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOtherBenefitModal;
