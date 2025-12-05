import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { NavLink } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaDownload } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { useSelector } from "react-redux";
import { IoAddCircleOutline, IoClose } from "react-icons/io5";

function EmployeeCourseCertificate() {
  const themeColor = useSelector((state) => state.theme.color);
  const [isModalOpen, setModalOpen] = useState(false);
  const [certificateName, setCertificateName] = useState("");
  const [certificateDate, setCertificateDate] = useState("");
  const [file, setFile] = useState(null);

  const generatePDF = () => {
    const input = document.getElementById("certificate-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210; // Width of A4 in mm
      const pageHeight = 295; // Height of A4 in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("certificate.pdf");
    });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCertificateName("");
    setCertificateDate("");
    setFile(null);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <div className="flex justify-center my-2 w-full">
          <div
            className="sm:flex flex-wrap grid grid-cols-2 sm:flex-row gap-2 text-sm font-medium p-2 rounded-md text-white"
            style={{ background: themeColor }}
          >
            <NavLink
              to={"/employee/certificate/course"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Certificate
            </NavLink>
            <NavLink
              to={"/employee/certificate/rr-certificate"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              RR Certificate
            </NavLink>
            <NavLink
              to={"/employee/certificate/course-request-approval"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Course Request & Approval
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-request-approval/request"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Project Request & Approval
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-tracking"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Project Tracking
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-repository"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Project Repository
            </NavLink>
            <NavLink
              to={"/employee/certificate/knowledge-base"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Knowledge Base
            </NavLink>
          </div>
        </div>
        <div className="flex justify-center my-2 w-full">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-1  sm:rounded-full rounded-md opacity-90 bg-gray-200">
            <NavLink
              to={"/employee/certificate/course"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Course Certificate
            </NavLink>
            <NavLink
              to={"/employee/certificate/project"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Project Certificate
            </NavLink>
          </div>
        </div>
        <div className="flex justify-between md:flex-row flex-col mx-5 m-2">
          <input
            type="text"
            placeholder="search"
            className="border p-2 border-gray-300 rounded-lg w-96"
          />
          <button
            onClick={openModal}
            style={{ background: themeColor }}
            className="border-2 text-white rounded-md px-4 p-2 flex gap-2 justify-center"
          >
            <IoAddCircleOutline size={22} />
            Upload Certificate
          </button>
        </div>
        <div className="border border-gray-400 rounded-md mx-5 my-2 p-4">
          <div className="md:grid grid-cols-3 gap-4">
          <div>
              <div className="relative p-5">
                <img
                  src="/py3.png"
                  alt="Certificate"
                  id="certificate-content"
                />

                <div className="absolute top-2 right-3">
                  <button className="p-2 bg-black text-white rounded-full">
                    <IoIosShareAlt size={20} />
                  </button>
                </div>
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={generatePDF}
                    className="p-2 bg-black text-white rounded-full"
                  >
                    <FaDownload size={20} />
                  </button>
                </div>
              </div>
                <div className="flex justify-between ">
                  <h2 className=" font-medium">Python Advance Programming</h2>
                  <p className="text-sm font-medium">13 Sep, 2023</p>
                </div>
            </div>
            <div>
              <div className="relative p-5">
                <img
                  src="/py2.png"
                  alt="Certificate"
                  id="certificate-content"
                />

                <div className="absolute top-2 right-3">
                  <button className="p-2 bg-black text-white rounded-full">
                    <IoIosShareAlt size={20} />
                  </button>
                </div>
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={generatePDF}
                    className="p-2 bg-black text-white rounded-full"
                  >
                    <FaDownload size={20} />
                  </button>
                </div>
              </div>
                <div className="flex justify-between ">
                  <h2 className=" font-medium">Python Advance Programming</h2>
                  <p className="text-sm font-medium">13 Sep, 2023</p>
                </div>
            </div>
            <div>
              <div className="relative p-5">
                <img
                  src="/py3.png"
                  alt="Certificate"
                  id="certificate-content"
                />

                <div className="absolute top-2 right-3">
                  <button className="p-2 bg-black text-white rounded-full">
                    <IoIosShareAlt size={20} />
                  </button>
                </div>
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={generatePDF}
                    className="p-2 bg-black text-white rounded-full"
                  >
                    <FaDownload size={20} />
                  </button>
                </div>
              </div>
                <div className="flex justify-between ">
                  <h2 className=" font-medium">Python Advance Programming</h2>
                  <p className="text-sm font-medium">13 Sep, 2023</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-80 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <IoClose size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Upload Certificate</h2>
            <input
              type="text"
              placeholder="Certificate Name"
              value={certificateName}
              onChange={(e) => setCertificateName(e.target.value)}
              className="border-2 p-2 mb-4 border-gray-300 rounded-lg w-full"
            />
            <input
              type="date"
              value={certificateDate}
              onChange={(e) => setCertificateDate(e.target.value)}
              className="border-2 p-2 mb-4 border-gray-300 rounded-lg w-full"
            />
            <label
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
              htmlFor="file-upload"
              className="border-2 border-dashed p-4 mb-4 border-gray-300 rounded-lg w-full flex items-center justify-center cursor-pointer"
            >
              {file ? <p>{file.name}</p> : <p>Upload Certificate</p>}
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default EmployeeCourseCertificate;
