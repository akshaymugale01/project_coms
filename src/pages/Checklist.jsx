import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { API_URL, ChecklistImport, downloadSampleChecklist, exportChecklist, getChecklist, getChecklistTemplate, getVibeBackground } from "../api";
import Table from "../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import AssetNav from "../components/navbars/AssetNav";
import Navbar from "../components/Navbar";
import { getItemInLocalStorage } from "../utils/localStorage";
import { DNA } from "react-loader-spinner";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import FileInputBox from "../containers/Inputs/FileInputBox";
import { FiDownload, FiUpload } from "react-icons/fi";
import { FaCopy, FaDownload } from "react-icons/fa";
import Switch from "../Buttons/Switch";
import DatePicker from 'react-datepicker';
import { BsEye } from "react-icons/bs";

const Checklist = () => {
  const [checklists, setChecklists] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [searchText, setSearchText] = useState("")
  const [setshowImport, setShowImportModal] = useState(false);
  const openModalImport = () => setShowImportModal(true);
  const closeModalImport = () => setShowImportModal(false);
  const [setshowDownload, setShowDownloadModal] = useState(false);
  const openModalDownload = () => setShowDownloadModal(true);
  const closeModalDownload = () => setShowDownloadModal(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [importStatus, setImportStatus] = useState("");
  const handleFileChange = (files) => {
    setSelectedFiles(files);
  };
  const handleImportChecklist = async () => {
    if (selectedFiles.length === 0) {
      setImportStatus("No files selected.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await ChecklistImport(formData);
      if (response.status === 200) {
        setImportStatus("Checklist successfully imported!");
        // Optionally, refresh checklist data
        await getChecklist();
      } else {
        setImportStatus("Failed to import checklist.");
      }
    } catch (error) {
      console.error("Error importing checklist:", error);
      setImportStatus("An error occurred during import.");
    }
  };
  const handleDownload = async () => {
    try {
      // Call the exportChecklist function
      const response = await downloadSampleChecklist();

      // Create a Blob and download URL for the file
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create an anchor element for the download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "sample_format_checklist.xlsx"; // Name of the downloaded file
      link.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Failed to export checklist:", error);
      alert("Error exporting checklist. Please try again.");
    }
  };
  
  
const themeColor = "rgb(3 19 37)";
  useEffect(() => {
    const fetchChecklist = async () => {
     try {
       const checklist = await getChecklist();
       const sortedChecklists = checklist?.data?.checklists.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
       setChecklists(sortedChecklists);
       console.log(checklist?.data?.checklists)
       setFilteredData(sortedChecklists)
     } catch (error) {
      console.log(error)
     }
    };
    fetchChecklist();
    console.log(checklists);
  }, []);

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },

    {
      name: "frequency",
      selector: (row) => row.frequency,
      sortable: true,
    },
    { name: "Start Date", selector: (row) => row.start_date, sortable: true },
    { name: "End Date", selector: (row) => row.end_date, sortable: true },
    {
      name: "No. of Groups",
      selector: (row) => row?.groups?.length,
      sortable: true,
    },
   
    {
      name: "Associations",
      selector: (row) => (
        <div>
          <Link to={`/assets/associate-checklist/${row.id}`} className=" px-4 bg-green-400 text-white rounded-full">Associate</Link>
        </div>
      ),
      sortable: true,
    },
    // {
    //   name: "Active",
    //   selector: (row) => (
    //     <Switch/>
    //   ),
    //   sortable: true,
    // },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/edit-checklist/${row.id}`}>
            <BsEye size={15} />
          </Link>
          {/* <button className="text-red-400">
            <MdDeleteForever size={25} />
          </button> */}
          {/* <button onClick={openModalDownload}><FaDownload size={15}/></button> */}
          
          <Link to={`/admin/copy-checklist/${row.id}`}>
          <FaCopy size={15}/>
          </Link>
        </div>
      ),
    },
  ];

  const defaultImage = { index: 0, src: "" };
  let selectedImageSrc = defaultImage.src;
  let selectedImageIndex = defaultImage.index;
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [selectedIndex, setSelectedIndex] = useState(null);
  // const Get_Background = async () => {
  //   try {
  //     // const params = {
  //     //   user_id: user_id,
  //     // };
  //     const user_id = getItemInLocalStorage("VIBEUSERID");
  //     console.log(user_id);
  //     const data = await getVibeBackground(user_id);

  //     if (data.success) {
  //       console.log("sucess");

  //       console.log(data.data);
  //       selectedImageSrc = API_URL + data.data.image;

  //       selectedImageIndex = data.data.index;

  //       // Now, you can use selectedImageSrc and selectedImageIndex as needed
  //       console.log("Received response:", data);

  //       // For example, update state or perform any other actions
  //       setSelectedImage(selectedImageSrc);
  //       setSelectedIndex(selectedImageIndex);
  //       console.log("Received selectedImageSrc:", selectedImageSrc);
  //       console.log("Received selectedImageIndex:", selectedImageIndex);
  //       console.log(selectedImage);
  //       // dispatch(setBackground(selectedImageSrc));
  //     } else {
  //       console.log("Something went wrong");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  // useEffect(() => {
  //   // Call the function to get the background image when the component mounts
  //   Get_Background();
  // }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    if (searchValue.trim() === "") {
      setFilteredData(checklists);
    } else {
      const filteredResults = checklists.filter(
        (item) =>
          
          item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filteredResults);
    }
  };

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleExport = async () => {
    try {
      // Call the exportChecklist function
      const response = await exportChecklist();

      // Create a Blob and download URL for the file
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create an anchor element for the download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "export_checklist.xlsx"; // Name of the downloaded file
      link.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Failed to export checklist:", error);
      alert("Error exporting checklist. Please try again.");
    }
  };
  return (
    <section
      className="flex"
      style={{
        background: `url(${selectedImage})no-repeat center center / cover`,
      }}
    >
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <AssetNav />
      <div className="flex md:flex-row flex-col justify-between items-center my-2 gap-2  ">
        <input
          type="text"
          placeholder="Search By name"
          className="border-2 p-2 md:w-96 border-gray-300 rounded-lg placeholder:text-sm"
            value={searchText}
            onChange={handleSearch}
        />
        <div className="md:flex grid grid-cols-2 sm:flex-row  flex-col gap-2">
          <Link
            to={"/admin/add-checklist"}
            className="bg-black  text-sm rounded-lg flex justify-center font-semibold items-center gap-2 text-white py-2 px-4 transition-all duration-300 "
            style={{ background: themeColor }}
        >
            <IoAddCircleOutline size={20} />
            Add
          </Link>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex justify-center items-center gap-2"
            onClick={openModalImport}
            style={{ background: themeColor }}
          >
         <FiDownload size={15}/> Import
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex justify-center items-center gap-2"
            onClick={handleExport}
            style={{ background: themeColor }}
          >
           <FiUpload size={15} /> Export
          </button>
         
        </div>
      </div>
      {checklists.length !== 0 ?<Table columns={columns} data={filteredData} isPagination={true} /> 
     : (
      <div className="flex justify-center items-center h-full">
        <DNA
          visible={true}
          height="120"
          width="120"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    )}
    </div>
    {setshowImport && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold text-center mb-4">Bulk Upload</h2>
            {/* Advanced Filter Fields */}
         <FileInputBox handleChange={handleFileChange} fieldName="checklist" isMulti={true}/>
         
            <div className="mt-4 flex justify-end space-x-4">
              <button
              onClick={handleDownload}
              className="bg-red-500 text-white px-4 py-2 rounded"
              style={{ background: themeColor }}
              >
                Download Sample Format
              </button>
              <button
                onClick={closeModalImport}
                className="bg-red-500 text-white px-4 py-2 rounded"
                style={{ background: themeColor }}
              >
                Cancel
              </button>
              <button
                
                className="bg-green-500 text-white px-4 py-2 rounded"
                style={{ background: themeColor }}
                onClick={handleImportChecklist}
              >
                Import
              </button>
            </div>
            {importStatus && <p className="mt-4 text-center">{importStatus}</p>}
        </div>
        </div>
      )}
       {setshowDownload && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl mb-4">Report</h2>
            {/* Advanced Filter Fields */}
         
            <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            isClearable={true}
            placeholderText="Enter Date"
            className="border p-1 px-4 border-gray-500 w-64 rounded-md" 
          />
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={closeModalDownload}
                className="bg-red-500 text-white px-4 py-2 rounded"
                style={{ background: themeColor }}
              >
                Cancel
              </button>
              <button
                
                className="bg-green-500 text-white px-4 py-2 rounded"
                style={{ background: themeColor }}
              >
                Export
              </button>
            </div>
         
        </div>
        </div>
      )}
    </section>
  );
};

export default Checklist;
