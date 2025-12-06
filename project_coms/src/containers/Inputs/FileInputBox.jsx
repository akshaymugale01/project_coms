import React, { useState } from "react";
import { BiUpload, BiFile, BiTrash } from "react-icons/bi";
import {
  FaFileImage,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileAlt,
} from "react-icons/fa";

const getFileIcon = (fileType) => {
  if (fileType.startsWith("image/")) {
    return <FaFileImage size={24} />;
  } else if (fileType === "application/pdf") {
    return <FaFilePdf size={24} />;
  } else if (
    fileType === "application/msword" ||
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return <FaFileWord size={24} />;
  } else if (
    fileType === "application/vnd.ms-excel" ||
    fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return <FaFileExcel size={24} />;
  } else {
    return <FaFileAlt size={24} />;
  }
};

const FileInputBox = ({ handleChange, fieldName, isMulti,  fileType = "*" }) => {
  const [files, setFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    const newFileURLs = selectedFiles.map((file) => URL.createObjectURL(file));
    setFileURLs(newFileURLs);

    if (handleChange) {
      handleChange(selectedFiles);
    }
  };
  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedFileURLs = fileURLs.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setFileURLs(updatedFileURLs);

    if (handleChange) {
      handleChange(updatedFiles);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor={`file-upload-${fieldName}`}
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <BiUpload className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span>
          </p>
        </div>
        <input
          id={`file-upload-${fieldName}`}
          type="file"
          className="hidden"
          multiple={isMulti}
          onChange={handleFileChange}
          accept={fileType}
        />
      </label>
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div key={index} className="flex flex-col items-center">
              <a
                href={fileURLs[index]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                {file.type.startsWith("image/") ? (
                  <img
                    src={fileURLs[index]}
                    alt={file.name}
                    className="max-w-xs max-h-40 mt-2 rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center mt-2">
                    {getFileIcon(file.type)}
                    <p className="text-sm mt-1">{file.name}</p>
                  </div>
                )}
              </a>
              <button
                onClick={() => handleRemoveFile(index)}
                className="mt-2 text-red-500"
              >
                <BiTrash size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileInputBox;
