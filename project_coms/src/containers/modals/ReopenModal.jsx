import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { IoAddCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { editComplaintsDetails, getComplaintsDetails } from "../../api";
import toast from "react-hot-toast";

const ReopenModal = ({ onclose, reopenStatusId }) => {
  const [formData, setFormData] = useState({
    comment: "",
    of_phase: "pms",
    documents: [],
    log_status: "",
    complaint_status_id: "",
  });
  const { id } = useParams();

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const FileChange = async (event) => {
    const files = event.target.files;
    const base64Array = [];

    for (const file of files) {
      const base64 = await convertFileToBase64(file);
      base64Array.push(base64);
    }
    console.log("Array base64-", base64Array);
    const formattedBase64Array = base64Array.map((base64) => {
      return base64.split(",")[1];
    });
    console.log("Format", formattedBase64Array);
    setFormData({
      ...formData,
      documents: formattedBase64Array,
    });
  };

  const handleReopenTicket = async () => {
    if (!formData.comment) {
      return toast.error("Please add a comment. Thanks. ");
    }
    try {
      const updatedData = {
        complaint_log: {
          complaint_id: id,
          comment: formData.comment,
          complaint_status_id: reopenStatusId,
          //   log_status: "Re Open"
        },
        complaint_comment: {
          docs: formData.documents,
        },
      };
      await editComplaintsDetails(updatedData);
      setFormData({
        comment: "",
        documents: [],
      });
      console.log("Edited Ticket Details:", updatedData);
      onclose();
      window.location.reload();
      toast.success("Updated Successfully");
    } catch (error) {
      console.error("Error Saving in details update: ", error);
    }
  };

  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col justify-center">
        <h2 className="flex gap-4 items-center justify-center mb-5 font-bold text-lg">
          <IoAddCircle size={20} />
          Add Comment
        </h2>
        <div className="flex flex-col item-center justify-center mb-5 gap-5">
          <div className="px-4 flex flex-col gap-1 justify-center">
            <label htmlFor="addComment" className="font-medium">
              Add Comment :
            </label>
            <div className="flex justify-between gap-4">
              <textarea
                name="text"
                value={formData.comment}
                className="border p-1 px-2 border-gray-400 rounded-md w-96"
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
              />
            </div>
          </div>
          <input
            type="file"
            name="documents"
            id="documents"
            onChange={FileChange}
            multiple
            className="file:bg-black file:text-white file:rounded-full file:p-2 file:px-4 file:font-semibold bg-gray-300 p-2 rounded-full"
          />
        </div>
        <button
          className="bg-black p-2 px-4 text-white rounded-md my-5"
          onClick={handleReopenTicket}
        >
          Submit
        </button>
      </div>
    </ModalWrapper>
  );
};

export default ReopenModal;
