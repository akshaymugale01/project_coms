import React, { useState, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import * as XLSX from "xlsx";
import mammoth from "mammoth";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer = ({ fileUrl, onClose }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [docText, setDocText] = useState("");
  const [excelData, setExcelData] = useState(null);

  // Helper function to get the file type
  const getFileType = (url) => {
    const extension = url.split(".").pop().toLowerCase();
    return extension;
  };

  const fileType = getFileType(fileUrl);

  useEffect(() => {
    if (fileType === "docx") {
      // Process .docx files
      fetch(fileUrl)
        .then((res) => res.arrayBuffer())
        .then((buffer) => {
          mammoth.extractRawText({ arrayBuffer: buffer }).then((result) => {
            setDocText(result.value);
          });
        });
    } else if (["xlsx", "xls", "csv"].includes(fileType)) {
      // Process Excel files
      fetch(fileUrl)
        .then((res) => res.arrayBuffer())
        .then((buffer) => {
          const workbook = XLSX.read(buffer, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
          setExcelData(jsonData);
        });
    }
  }, [fileUrl, fileType]);

  const renderViewer = () => {
    switch (fileType) {
      case "pdf":
        return (
          <div className="pdf-viewer h-[600px] overflow-y-auto">
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          </div>
        );

      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <img src={fileUrl} alt="Preview" className="w-full h-auto" />;

      case "xlsx":
      case "xls":
      case "csv":
        return (
          <div className="excel-viewer h-[600px] overflow-y-auto">
            {excelData ? (
              <table className="table-auto border-collapse border border-gray-400 w-full">
                <tbody>
                  {excelData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-400 p-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>Loading Excel data...</div>
            )}
          </div>
        );

      case "docx":
        return (
          <div className="docx-viewer h-[600px] overflow-y-auto">
            {docText ? <pre>{docText}</pre> : <div>Loading Word document...</div>}
          </div>
        );

      default:
        return <div>Unsupported file type</div>;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-xl hide-scrollbar w-[50rem] max-h-[95%] overflow-y-auto">
        <div className="flex justify-between mb-4 items-center">
          <h3 className="font-semibold">Preview Document</h3>
          <button onClick={onClose} className="border-2 rounded-full border-red-400 text-red-400 px-4 p-1">
            Close
          </button>
        </div>
        {renderViewer()}
      </div>
    </div>
  );
};

export default PdfViewer;
