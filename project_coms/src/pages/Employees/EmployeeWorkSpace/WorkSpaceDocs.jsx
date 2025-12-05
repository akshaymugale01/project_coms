import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import {
  FaIdCard,
  FaCertificate,
  FaFileContract,
  FaIdBadge,
  FaFileAlt,
} from "react-icons/fa";
import EmployeePortal from "../../../components/navbars/EmployeePortal";
import Modal from "react-modal";
import jsPDF from "jspdf";
import letter from "/letter.jpg";
import aadhar from "/aadhar.jpg";
import birth from "/birth.jpg";
import form16 from "/form16.jpg";
import pancard from "/pan-card.jpg";
import res from "/res.jpg";
import { AddCircleOutline } from "react-ionicons";

const documentList = [
  {
    name: "Adhaar Card",
    icon: <FaIdCard />,
    updatedOn: "2024-08-28",
    type: "Document",
    imageUrl: aadhar,
  },
  {
    name: "Birth Certificate",
    icon: <FaCertificate />,
    updatedOn: "2024-08-28",
    type: "Document",
    imageUrl: birth,
  },
  {
    name: "Form 16 ",
    icon: <FaFileContract />,
    updatedOn: "2024-08-28",
    type: "Document",
    imageUrl: form16,
  },
  {
    name: "PAN Card",
    icon: <FaIdBadge />,
    updatedOn: "2024-08-28",
    type: "Document",
    imageUrl: pancard,
  },
  {
    name: "Resume",
    icon: <FaFileAlt />,
    updatedOn: "2024-08-28",
    type: "Document",
    imageUrl: res,
  },
];

const lettersList = [
  {
    name: "Appointment Letter",
    icon: <FaFileAlt />,
    updatedOn: "2024-08-28",
    imageUrl: letter,
  },
];

const WorkSpaceDocs = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [addDoc, setAddDoc] = useState(false);
  const openDocs = () => {
    setAddDoc(true);
  };
  const closeDocs = () => {
    setAddDoc(false);
  };
  const openModal = (item) => {
    setCurrentItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentItem(null);
  };

  const downloadPDF = () => {
    if (!currentItem) return;

    const doc = new jsPDF();
    doc.text(`Name: ${currentItem.name}`, 10, 10);
    doc.text(`Updated On: ${currentItem.updatedOn}`, 10, 20);
    // Add image if necessary
    doc.addImage(currentItem.imageUrl, "PNG", 10, 30, 180, 0);
    doc.save(`${currentItem.name}.pdf`);
  };
  const [addLetter, setAddLetter] = useState(false);
  const openLetter = () => {
    setAddLetter(true);
  };
  const closeLetter = () => {
    setAddLetter(false);
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full  flex flex-col md:mx-4 overflow-hidden">
        <EmployeePortal />
        <div className="bg-blue-100 p-4 rounded-lg shadow-md my-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold ">Employee Documents</h2>
            <button className="text-white text-xl ">
              <AddCircleOutline onClick={openDocs} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentList.map((doc, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center cursor-pointer"
                onClick={() => openModal(doc)}
              >
                <div className="text-3xl mb-2 text-blue-600">{doc.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {doc.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Updated On: {doc.updatedOn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Letters Section */}
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold ">Employee Letters</h2>
            <button className="text-white text-xl ">
              <AddCircleOutline onClick={openLetter} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lettersList.map((letter, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center cursor-pointer"
                onClick={() => openModal(letter)}
              >
                <div className="text-3xl mb-2 text-green-600">
                  {letter.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {letter.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Updated On: {letter.updatedOn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Document Details"
          className="fixed inset-0 flex flex-col items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col h-auto max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">{currentItem?.name}</h2>
            {/* <div className="text-3xl mb-4">
              {currentItem?.icon}
            </div> */}
            {currentItem?.imageUrl && (
              <img
                src={currentItem.imageUrl}
                alt={currentItem.name}
                className="w-full max-h-60 object-contain mb-4"
              />
            )}
            <p className="text-lg mb-4">Updated On: {currentItem?.updatedOn}</p>
            <div className="flex justify-between">
              <button
                onClick={downloadPDF}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Download PDF
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={addDoc}
          onRequestClose={closeDocs}
          contentLabel="add Document "
          className="fixed inset-0 flex flex-col items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col h-auto max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">{currentItem?.name}</h2>
            <h2 className="font-medium text-xl border-b border-gray-3">
              Add Document
            </h2>
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-col ">
                <label htmlFor="" className="font-medium">
                  Document name
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-1 rounded-md"
                  placeholder="Document name"
                />
              </div>
              <div className="border-2 border-dashed p-2 mt-2">
                <input type="file" name="" id="" />
              </div>
              <div className="flex justify-end w-full gap-2">
                <button className="bg-blue-400 text-white p-1 px-2 w-full rounded-md">
                  Save
                </button>
                <button
                  className="bg-red-400 text-white p-1 px-2 w-full rounded-md"
                  onClick={closeDocs}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={addLetter}
          onRequestClose={closeLetter}
          contentLabel="add Document "
          className="fixed inset-0 flex flex-col items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col h-auto max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">{currentItem?.name}</h2>
            <h2 className="font-medium text-xl border-b border-gray-3">
              Add Letter
            </h2>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex flex-col ">
                <label htmlFor="" className="font-medium">
                  Letter name
                </label>
                <input
                  type="text"
                  className="border border-gray-400 p-1 rounded-md"
                  placeholder="Document name"
                />
              </div>
              <div className="border-2 border-dashed p-2 mt-2">
                <input type="file" name="" id="" />
              </div>
              <div className="flex justify-end w-full gap-2">
                <button className="bg-blue-400 text-white p-1 px-2 w-full rounded-md">
                  Save
                </button>
                <button
                  className="bg-red-400 text-white p-1 px-2 w-full rounded-md"
                  onClick={closeLetter}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default WorkSpaceDocs;
