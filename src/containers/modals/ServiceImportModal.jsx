import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { useSelector } from "react-redux";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";
// import {
//   downloadServiceImportSample,
//   uploadServiceImport,
// } from "../../api";

const ServiceImportModal = ({ onclose, fetchCamBilling }) => {
  const themeColor = useSelector((state) => state.theme.color);
  const [upload, setUpload] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ DOWNLOAD SAMPLE FORMAT
//   const handleDownload = async () => {
//     toast.loading("Downloading sample file...");
//     try {
//       const resp = await downloadServiceImportSample();

//       const blob = new Blob([resp.data], {
//         type: resp.headers["content-type"],
//       });

//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "service_import_sample.xlsx");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       toast.dismiss();
//       toast.success("Sample downloaded successfully");
//     } catch (error) {
//       toast.dismiss();
//       console.error("Download error:", error);
//       toast.error("Failed to download sample file");
//     }
//   };

  // ✅ HANDLE FILE CHANGE
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      toast.error("Please upload a valid Excel (.xlsx) file");
      return;
    }

    setUpload(file);
  };

  // ✅ SUBMIT IMPORT
  // const handleSubmit = async () => {
  //   if (!upload) {
  //     return toast.error("Please select a file first");
  //   }

  //   const sendData = new FormData();
  //   sendData.append("file", upload);

  //   try {
  //     setLoading(true);
  //     toast.loading("Uploading file...");

  //     await uploadServiceImport(sendData);

  //     toast.dismiss();
  //     toast.success("Service imported successfully");

  //     onclose();
  //     fetchCamBilling(); // refresh list
  //   } catch (error) {
  //     toast.dismiss();
  //     console.error("Upload error:", error);
  //     toast.error("Import failed. Please check file format.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col justify-center w-96">
        <h2 className="flex justify-center font-bold text-lg my-3">
          Import Service
        </h2>

        <div className="border-t border-gray-300 pt-4">
          <div className="mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".xlsx"
              className="w-full"
            />
          </div>

          <button
            onClick={handleDownload}
            className="font-semibold text-white px-4 py-2 flex gap-2 items-center justify-center rounded-md w-full mb-4"
            style={{ background: themeColor }}
          >
            <FaDownload />
            Download Sample Format
          </button>
        </div>

        <div className="flex justify-end border-t pt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-md text-white font-medium"
            style={{ background: themeColor }}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ServiceImportModal;
