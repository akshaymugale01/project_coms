import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { camBillingStatus } from "../../api";
import { useParams } from "react-router-dom";
const CAMBillingPaymentStatusModal = ({ onclose }) => {
  const themeColor = useSelector((state) => state.theme.color);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    status: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  console.log(formData);
  const handleSubmit = async () => {
    const sendData = new FormData();
    sendData.append("cam_bill[status]", formData.paid);
    sendData.append("cam_bill[comments]", formData.comments);

    try {
      const resStatus = await camBillingStatus(id, sendData);
      toast.success("Status Change Successfully");
      console.log(resStatus);
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("failed to change status");
    }
  };

  console.log(id);
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col md:w-96 bg-white rounded-lg p-4">
        <h2 className="text-center font-bold text-xl text-gray-800 mb-2">
          Edit Status
        </h2>
        <div className="border-t border-gray-300 mb-6"></div>
        <div className="grid grid-cols-1 space-y-3">
          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Select Status
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          {/* Notes */}
          <div className="flex flex-col md:col-span-3">
            <label
              htmlFor="Notes"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Comment
            </label>
            <textarea
              name="comments"
              id="Notes"
              cols="5"
              rows="2"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Message"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end border-t border-gray-300 pt-4 mt-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-all duration-200 shadow-md"
            style={{ background: themeColor }}
          >
            Submit
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CAMBillingPaymentStatusModal;
