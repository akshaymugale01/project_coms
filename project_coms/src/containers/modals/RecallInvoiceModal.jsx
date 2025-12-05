import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { recallStatus, getCamBillingDataDetails } from "../../api";
import { useParams } from "react-router-dom";
const RecallInvoiceModal = ({ onclose, fetchCamBilling }) => {
  const themeColor = useSelector((state) => state.theme.color);
  const { id } = useParams();
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchCamBilling = async () => {
      try {
        const response = await getCamBillingDataDetails(id);
        setReason(response.data.recall_reason);
      } catch (err) {
        console.error("Failed to fetch Address Setup data:", err);
      }
    };
    fetchCamBilling(); // Call the API
  }, [id]);

  const handleSubmit = async () => {
    if (!reason) {
      toast.error("Reason is required");
      return;
    }
    const sendData = new FormData();
    sendData.append("cam_bill[recall_reason]", reason);
    sendData.append("cam_bill[status]", "recall"); // Add this line to set status to 'recall'

    try {
      const resp = await recallStatus(id, sendData);
      console.log(resp);
      toast.success("Status recall changed");
      onclose();
      fetchCamBilling();
    } catch (error) {
      console.error("Error: Recall did not change");
      toast.error("Failed to change recall status");
    }
  };

  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col w-80 justify-center">
        <h2 className="flex gap-4 items-center justify-center font-bold text-lg my-2">
          Recall Invoice
        </h2>
        <div className="border-t-2 border-black">
          <div className="md:grid grid-cols-2 gap-5 my-3">
            <div className="flex flex-col col-span-2">
              <label htmlFor="" className="font-semibold my-2">
                Reason
              </label>
              <textarea
                name="reason"
                id=""
                cols="5"
                rows="3"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter Reason"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t-2 py-5 border-black">
          <button
            onClick={handleSubmit}
            className="p-1 px-4 border-2 rounded-md text-white font-medium"
            style={{ background: themeColor }}
          >
            Submit
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default RecallInvoiceModal;
