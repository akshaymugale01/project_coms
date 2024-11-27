import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import { Link, NavLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaDownload } from 'react-icons/fa';
import { IoIosShareAlt } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { IoAddCircleOutline, IoClose } from 'react-icons/io5';
function EmployeeProjectCertificate() {
  const themeColor = useSelector((state) => state.theme.color);
  const [isModalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const generatePDF = () => {
    const input = document.getElementById('certificate-content');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210; // Width of A4 in mm
      const pageHeight = 295; // Height of A4 in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('certificate.pdf');
    });
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setFile(null);
    setUploading(false);
    setError(null);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setFile(null);
    }, 2000);
  };

  return (
    <section className='flex'>
      <Navbar/>
      <div className='w-full flex flex-col overflow-hidden'>
        <div className="flex justify-center my-2 w-full">
          <div className="sm:flex flex-wrap grid grid-cols-2 sm:flex-row text-sm gap-2 font-medium p-2 rounded-md text-white" style={{background:themeColor}}>
            <NavLink
              to={"/employee/certificate/project"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Certificate
            </NavLink>
            <NavLink
              to={"/employee/certificate/rr-certificate"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              RR Certificate
            </NavLink>
            <NavLink
              to={"/employee/certificate/course-request-approval"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Course Request & Approval
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-request-approval/request"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Project Request & Approval
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-tracking"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Project Tracking
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-repository"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Project Repository
            </NavLink>
            <NavLink
              to={"/employee/certificate/knowledge-base"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Knowledge Base
            </NavLink>
          </div>
        </div>
        <div className="flex justify-center my-2 w-full">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-1 sm:rounded-full rounded-md opacity-90 bg-gray-200">
            <NavLink
              to={"/employee/certificate/course"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Course Certificate
            </NavLink>
            <NavLink
              to={"/employee/certificate/project"}
              className={({ isActive }) => `p-1 ${
                isActive && "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Project Certificate
            </NavLink>
          </div>
        </div>
        <div className='flex justify-between md:flex-row flex-col my-2 mx-5'>
          <input
            type="text"
            placeholder="search"
            className="border w-96 p-2 border-gray-300 rounded-lg "
          />
          <button
            onClick={openModal}
            style={{background: themeColor}}
            className='border text-white border-gray-400 rounded-md px-4 p-2 flex gap-2 justify-center'
          >
            <IoAddCircleOutline size={22} />
            Upload Certificate
          </button>
        </div>
        <div className='border border-gray-400 rounded-md mx-5 my-2'>
          <div className='md:grid grid-cols-3'>
            <div className='relative px-5 py-5'>
              <Link to={''} >
                <img src='/Pro1.png' alt="Certificate" id='certificate-content'/>
              </Link>
              <div className='flex justify-between my-2'>
                <h2 className='text-lg font-semibold'>Internal CRM Project</h2>
                <p className='text-lg font-normal'>04 Aug, 2023</p>
              </div>
              <div className='absolute top-4 right-4'>
                <button className="p-2 bg-black text-white rounded-full">
                  <IoIosShareAlt size={20} />
                </button>
              </div>
              <div className='absolute bottom-16 right-4'>
                <button onClick={generatePDF} className="p-2 bg-black text-white rounded-full">
                  <FaDownload size={20} />
                </button>
              </div>
            </div>
            <div className='relative px-5 py-5'>
              <Link to={''} >
                <img src='/pro2.png' alt="Certificate" id='certificate-content'/>
              </Link>
              <div className='flex justify-between my-2'>
                <h2 className='text-lg font-semibold'>Skill Grow Project</h2>
                <p className='text-lg font-normal'>1 Sep 2023</p>
              </div>
              <div className='absolute top-4 right-4'>
                <button className="p-2 bg-black text-white rounded-full">
                  <IoIosShareAlt size={20} />
                </button>
              </div>
              <div className='absolute bottom-16 right-4'>
                <button onClick={generatePDF} className="p-2 bg-black text-white rounded-full">
                  <FaDownload size={20} />
                </button>
              </div>
            </div>
            <div className='relative px-5 py-5'>
              <Link to={''} >
                <img src='/pro3.png' alt="Certificate" id='certificate-content'/>
              </Link>
              <div className='flex justify-between my-2'>
                <h2 className='text-lg font-semibold'>Data Integration Project</h2>
                <p className='text-lg font-normal'>20 Mar, 2024</p>
              </div>
              <div className='absolute top-4 right-4'>
                <button className="p-2 bg-black text-white rounded-full">
                  <IoIosShareAlt size={20} />
                </button>
              </div>
              <div className='absolute bottom-16 right-4'>
                <button onClick={generatePDF} className="p-2 bg-black text-white rounded-full">
                  <FaDownload size={20} />
                </button>
              </div>
            </div>        
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg shadow-lg w-80 relative">
              <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <IoClose size={24} />
              </button>
              <h2 className="text-xl font-semibold mb-4">Upload Certificate</h2>
              <input
                type="text"
                placeholder="Certificate Name"
                className="border-2 p-2 mb-4 border-gray-300 rounded-lg w-full"
              />
              <input
                type="date"
                className="border-2 p-2 mb-4 border-gray-300 rounded-lg w-full"
              />
              <label
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                htmlFor="file-upload"
                className={`border-2 border-dashed p-4 mb-4 border-gray-300 rounded-lg w-full flex items-center justify-center cursor-pointer ${file ? 'bg-green-100' : ''}`}
              >
                {file ? (
                  <p>{file.name}</p>
                ) : (
                 <p>Uplaod Certificate</p>
                )}
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              {uploading && <p className="text-blue-500 mb-4">Uploading...</p>}
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="flex justify-end">
                <button onClick={handleUpload} className="px-4 py-2 bg-black text-white rounded-md">Upload</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default EmployeeProjectCertificate