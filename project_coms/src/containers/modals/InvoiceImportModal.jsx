import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { useSelector } from "react-redux";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";
import { downloadCamBillImport, uploadCamBillingImport } from "../../api";
const InvoiceImportModal = ({ onclose, fetchCamBilling }) => {
  const themeColor = useSelector((state) => state.theme.color);

  const handleDownload = async () => {
    toast.loading("Downloading please wait");
    try {
      const resp = await downloadCamBillImport(); // Await the API call
      console.log(resp); // Log the response to ensure it contains the file blob and headers

      const url = window.URL.createObjectURL(
        new Blob([resp.data], {
          // Use `resp.data` to access the file blob
          type: resp.headers["content-type"], // Access headers from `resp.headers`
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cam_invoice_file.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Cam Billing downloaded successfully");
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      console.error("Error downloading Ticket:", error);
      toast.error("Something went wrong, please try again");
    }
  };
  const [upload, setUpload] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    setUpload(files); // Store files as an array
  };

  console.log(upload);

  const handleSubmit = async () => {
    const sendData = new FormData();
    upload.forEach((file) => {
      sendData.append("file", file);
    });

    try {
      const resp = await uploadCamBillingImport(sendData);
      onclose();
      fetchCamBilling();
      console.log(resp);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col justify-center w-80">
        <h2 className="flex gap-4 items-center justify-center font-bold text-lg my-2">
          Import Invoice
        </h2>
        <div className="border-t-2 border-black">
          <div className="my-2">
            <div className="my-5 w-full">
              <input
                type="file"
                onChange={handleFileChange}
                multiple // Allows multiple files to be selected
              />
            </div>
            <button
              onClick={handleDownload}
              className="font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md w-full"
              style={{ background: themeColor }}
            >
              <FaDownload />
              Sample
            </button>
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

export default InvoiceImportModal;
