import React, { useEffect, useState } from "react";
import { editFixedDeductionDetails, getFixedDeductionDetails } from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

const EditFixedDeductionModal = ({ EditId, fetchFixedDeduction, closeModal }) => {
  const [customLabel, setCustomLabel] = useState("");
  const [effectAttendance, setEffectAttendance] = useState(false);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");

  useEffect(() => {
    const fetchDeductions = async () => {
      try {
        const res = await getFixedDeductionDetails(EditId);
        setCustomLabel(res.custom_label);
        setEffectAttendance(res.attendance_affects_eligibility);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeductions();
  }, []);

  const handleEditFixedDeduction = async () => {
    if (!customLabel) {
      return toast.error("Please provide custom label");
    }

    const postData = new FormData();
    postData.append("custom_label", customLabel);
    postData.append("attendance_affects_eligibility", effectAttendance);
    postData.append("organization", hrmsOrgId);
    try {
      const res = await editFixedDeductionDetails(EditId,postData);
      fetchFixedDeduction();
      closeModal()
      toast.success("Deduction updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error updating deduction");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
      <div class="max-h-screen h-30 bg-white p-2 w-[30rem] px-3 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Deduction</h2>
        <div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              What would you want to call this deduction?{" "}
              <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Custom label"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Do you want attendance to effect the eligibility?{" "}
              <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="affectAttendance"
                  id="yes"
                  checked={effectAttendance}
                  onChange={() => setEffectAttendance(true)}
                />
                <label htmlFor="yes">Yes</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="affectAttendance"
                  id="no"
                  checked={!effectAttendance}
                  onChange={() => setEffectAttendance(false)}
                />
                <label htmlFor="yes">No</label>
              </div>
            </div>
          </div>
          <div className="flex mt-2 justify-end gap-2 p-1 border-t">
            <button
              type="button"
              onClick={closeModal}
              className="border-2 font-semibold hover:bg-red-400 hover:text-red-500 hover:bg-opacity-30 flex items-center gap-2 duration-150 transition-all border-red-400 rounded-full p-1 px-3 text-red-400"
            >
              <MdClose /> Cancel
            </button>
            <button
              type="button"
              onClick={handleEditFixedDeduction}
              className="border-2 font-semibold hover:bg-green-400 hover:text-green-500 hover:bg-opacity-30 flex items-center gap-2  duration-150 transition-all border-green-400 rounded-full p-1 px-3 text-green-400"
            >
              <FaCheck /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFixedDeductionModal;
