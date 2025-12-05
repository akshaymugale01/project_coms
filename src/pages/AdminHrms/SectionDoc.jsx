import React, { useState, useRef, useEffect } from "react";
import EmployeeSections from "./EmployeeSections";
import EditEmployeeDirectory from "./EditEmployeeDirectory";
import Table from "../../components/table/Table";
import { Link, useParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FaDownload, FaTrash } from "react-icons/fa";
import Collapsible from "react-collapsible";
import CustomTrigger from "../../containers/CustomTrigger";
import { AddCircleOutline } from "react-ionicons";
import Modal from "react-modal";
import jsPDF from "jspdf";
import letter from "/letter.jpg";
import aadhar from "/aadhar.jpg";
import birth from "/birth.jpg";
import form16 from "/form16.jpg";
import pancard from "/pan-card.jpg";
import res from "/res.jpg";
import { MdExpandMore, MdExpandLess, MdDescription } from "react-icons/md";

import {
  FaIdCard,
  FaCertificate,
  FaFileContract,
  FaIdBadge,
  FaFileAlt,
} from "react-icons/fa";
import Accordion from "./Components/Accordion";
import {
  deleteEmployeeDocs,
  deleteEmployeeLetters,
  getEmployeeDocs,
  getEmployeeLetters,
  hrmsDomain,
  postEmployeeDocs,
  postEmployeeLetters,
} from "../../api";
import { dateFormat, dateTimeFormat } from "../../utils/dateUtils";
import { IoDocument } from "react-icons/io5";
import toast from "react-hot-toast";
import PdfViewer from "./Components/PdfViewer";

const lettersList = [
  {
    name: "Appointment Letter",
    icon: <FaFileAlt />,
    updatedOn: "2024-08-28",
    imageUrl: letter,
  },
];

const SectionDoc = () => {
  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [addDoc, setAddDoc] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    doc: [],
  });
  const [letterData, setLetterData] = useState({
    name: "",
    letters: [],
  });

  const handleFileChange = (e) => {
    const selectedFile = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      doc: selectedFile,
    }));
  };
  const handleLetterChange = (e) => {
    const selectedFile = Array.from(e.target.files);
    setLetterData((prevData) => ({
      ...prevData,
      letters: selectedFile,
    }));
  };

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
  const [lettersModal, setLettersModal] = useState(false);
  const openLetterModal = (item) => {
    setCurrentItem(item);
    setLettersModal(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentItem(null);
  };
  const closeLetterModal = () => {
    setLettersModal(false);
    setCurrentItem(null);
  };

  // const downloadPDF = () => {
  //   if (!currentItem) return;

  //   const doc = new jsPDF();
  //   doc.text(`Name: ${currentItem.document_name}`, 10, 10);
  //   doc.text(`Updated On: ${currentItem.updated_date}`, 10, 20);
  //   doc.addImage(currentItem.document_file, "PNG", 10, 30, 180, 0);
  //   doc.save(`${currentItem.document_name}.pdf`);
  // };
  const [addLetter, setAddLetter] = useState(false);
  const [deleteDocModal, setDeleteDocModal] = useState(false);
  const openLetter = () => {
    setAddLetter(true);
  };
  const closeLetter = () => {
    setAddLetter(false);
  };
  const [documentList, setDocumentList] = useState([]);
  const [lettersList, setLettersList] = useState([]);
  const fetchEmployeeDocs = async () => {
    try {
      const res = await getEmployeeDocs(id);
      setDocumentList(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchEmployeeLetters = async () => {
    try {
      const res = await getEmployeeLetters(id);
      setLettersList(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEmployeeDocs();
    fetchEmployeeLetters();
  }, []);

  const capitalize = (name) => {
    const capital = `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;
    return capital;
  };

  const handleAddEmployeeDocs = async () => {
    const postData = new FormData();
    postData.append("document_name", formData.name);
    postData.append("employee", id);
    formData.doc.forEach((file) => {
      postData.append("document_file", file);
    });
    try {
      await postEmployeeDocs(postData);
      fetchEmployeeDocs();
      toast.success(`${formData.name} added in employee document`);
      setAddDoc(false);
      setFormData({ ...formData, name: "", doc: [] });
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddEmployeeLetters = async () => {
    if (!letterData.name) {
      toast.error("Please provide the letter name.");
      return;
    }
    if (!letterData.letters || letterData.letters.length === 0) {
      toast.error("Please upload  document.");
      return;
    }
    const postData = new FormData();
    postData.append("document_name", letterData.name);
    postData.append("employee", id);
    letterData.letters.forEach((file) => {
      postData.append("letter_file", file);
    });
    try {
      await postEmployeeLetters(postData);
      fetchEmployeeLetters();
      toast.success(`${letterData.name} added in employee letters`);
      setAddLetter(false);
      setLetterData({ ...letterData, name: "", letters: [] });
    } catch (error) {
      console.log(error);
    }
  };
  const [docDelId, setDocDelId] = useState("");
  const [letterDelId, setLetterDelId] = useState("");
  const handleDeleteDocModal = async (id) => {
    console.log(id);
    setDocDelId(id);
    setDeleteDocModal(true);
  };
  const handleDeleteLetterModal = async (id) => {
    setLetterDelId(id);
    setDeleteLetter(true);
  };

  const handleDeleteEmployeeDoc = async () => {
    try {
      await deleteEmployeeDocs(docDelId);
      fetchEmployeeDocs();
      setDeleteDocModal(false);
      toast.success("Employee document deleted successfully ");
    } catch (error) {
      console.log(object);
    }
  };
  const [deleteLetter, setDeleteLetter] = useState(false);
  const handleDeleteEmployeeLetter = async () => {
    try {
      await deleteEmployeeLetters(letterDelId);
      fetchEmployeeLetters();
      setDeleteLetter(false);
      toast.success("Employee letter deleted successfully ");
    } catch (error) {
      console.log(object);
    }
  };
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <div className="flex flex-col ml-20">
      <EditEmployeeDirectory />
      <div className="flex">
        <div className="">
          <EmployeeSections empId={id} />
        </div>
        <div className="flex flex-col w-full p-2 mb-10">
          <Accordion
            icon={MdDescription}
            title={"Employee Documents"}
            content={
              <div className="border-b border-gray-200 mb-1">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <div className="flex justify-end items-center mb-2">
                    <button
                      onClick={openDocs}
                      className="text-blue-500 px-2 border-2 rounded-full border-blue-500 flex gap-2 items-center p-1 "
                    >
                      <AddCircleOutline /> Add
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documentList.map((doc, index) => (
                      <div
                        key={doc.id}
                        className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center "
                      >
                        <div className="text-3xl mb-2 text-blue-600">
                          <IoDocument />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {capitalize(doc.document_name)}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Updated On: {dateFormat(doc.updated_date)}
                        </p>
                        <div className="flex justify-end w-full ">
                          <a
                            href={hrmsDomain + doc.document_file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-blue-400 px-2 hover:bg-yellow-100 border rounded-l-md p-1"
                          >
                            <BsEye />
                          </a>
                          <button
                            className="p-1  px-2 border border-blue-400 rounded-r-md text-red-500 hover:bg-red-100"
                            onClick={() => handleDeleteDocModal(doc.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
          <Accordion
            title="Employee Letters"
            icon={MdDescription}
            content={
              <div className="bg-green-100 p-4 rounded-lg mb-1">
                <div className="flex justify-end items-center mb-2">
                  {/* <h2 className="text-xl font-semibold">Employee Letters</h2> */}
                  <button
                    onClick={openLetter}
                    className="text-green-500 px-2 border-2 rounded-full border-green-500 flex gap-2 items-center p-1 "
                  >
                    <AddCircleOutline /> Add
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lettersList.map((letter, index) => (
                    <div
                      key={letter.id}
                      className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center "
                      onClick={() => openModal(letter)}
                    >
                      <div className="text-3xl mb-2 text-green-600">
                        <FaFileAlt />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {capitalize(letter?.document_name)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Updated On: {dateFormat(letter?.updated_date)}
                      </p>
                      <div className="flex justify-end w-full ">
                        {/* <button
                          className="border-blue-400 px-2 hover:bg-yellow-100 border rounded-l-md p-1"
                          onClick={() => openLetterModal(doc)}
                        >
                          <BsEye />
                        </button> */}
                        <a
                          href={hrmsDomain + letter.letter_file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-blue-400 px-2 hover:bg-yellow-100 border rounded-l-md p-1"
                        >
                          <BsEye />
                        </a>
                        <button
                          className="p-1  px-2 border border-blue-400 rounded-r-md text-red-500 hover:bg-red-100"
                          onClick={() => handleDeleteLetterModal(letter.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </div>
      </div>
      {/* {modalIsOpen && (
        <PdfViewer
          fileUrl={hrmsDomain + currentItem.document_file}
          onClose={closeModal}
        />
      )} */}
      {/* {lettersModal && (
        <PdfViewer
          fileUrl={hrmsDomain + currentItem.letter_file}
          onClose={closeLetterModal}
        />
      )} */}

      <Modal
        isOpen={addDoc}
        onRequestClose={closeDocs}
        contentLabel="add Document "
        className="fixed inset-0 flex flex-col items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col h-auto max-h-[80vh] overflow-y-auto">
          {/* <h2 className="text-2xl font-semibold mb-4">{currentItem?.name}</h2> */}
          <h2 className="font-medium text-xl border-b border-gray-3">
            Add Document
          </h2>
          <div className="flex flex-col gap-3 mt-2 ">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="" className="font-medium">
                Document name
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Document name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="border-2 border-dashed p-2 mt-2 rounded">
              <input type="file" name="" id="" onChange={handleFileChange} />
            </div>
            <div className="flex justify-end w-full gap-2">
              <button
                onClick={handleAddEmployeeDocs}
                className="bg-blue-400 text-white p-1 px-2 w-full rounded-md"
              >
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
          {/* <h2 className="text-2xl font-semibold mb-4">{currentItem?.name}</h2> */}
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
                value={letterData.name}
                onChange={(e) =>
                  setLetterData({ ...letterData, name: e.target.value })
                }
                name="name"
              />
            </div>
            <div className="border-2 border-dashed p-2 mt-2">
              <input type="file" name="" id="" onChange={handleLetterChange} />
            </div>
            <div className="flex justify-end w-full gap-2">
              <button
                className="bg-blue-400 text-white p-1 px-2 w-full rounded-md"
                onClick={handleAddEmployeeLetters}
              >
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
      <Modal
        isOpen={deleteDocModal}
        onRequestClose={() => setDeleteDocModal(true)}
        // contentLabel="add Document "
        className="fixed inset-0 flex flex-col items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col h-auto max-h-[80vh] overflow-y-auto">
          {/* <h2 className="text-2xl font-semibold mb-4">{currentItem?.name}</h2> */}
          <h2 className="font-medium text-xl border-b border-gray-3">
            Delete Document
          </h2>
          <div className="flex flex-col gap-2">
            <p className="font-medium mt-2">
              Are you sure you want to delete this document?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="rounded-full px-4 p-1 bg-green-400 text-white"
                onClick={handleDeleteEmployeeDoc}
              >
                Yes
              </button>
              <button
                className="rounded-full px-4 p-1 bg-red-400 text-white"
                onClick={() => setDeleteDocModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={deleteLetter}
        onRequestClose={() => setDeleteLetter(true)}
        // contentLabel="add Document "
        className="fixed inset-0 flex flex-col items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col h-auto max-h-[80vh] overflow-y-auto">
          {/* <h2 className="text-2xl font-semibold mb-4">{currentItem?.name}</h2> */}
          <h2 className="font-medium text-xl border-b border-gray-3">
            Delete Document
          </h2>
          <div className="flex flex-col gap-2">
            <p className="font-medium mt-2">
              Are you sure you want to delete this Letter?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="rounded-full px-4 p-1 bg-green-400 text-white"
                onClick={handleDeleteEmployeeLetter}
              >
                Yes
              </button>
              <button
                className="rounded-full px-4 p-1 bg-red-400 text-white"
                onClick={() => setDeleteLetter(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SectionDoc;
