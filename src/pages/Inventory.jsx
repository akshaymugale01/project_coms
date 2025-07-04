import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { API_URL, getInventory, getMasters, getVibeBackground, ImportMasters } from "../api";
import Table from "../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import AssetNav from "../components/navbars/AssetNav";
import Navbar from "../components/Navbar";
import { getItemInLocalStorage } from "../utils/localStorage";
import GRN from "./GRN";
import GDN from "./GDN";
import { BsEye } from "react-icons/bs";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import FileInputBox from "../containers/Inputs/FileInputBox";

const Inventory = () => {
  const [stocks, setStocks] = useState([]);
  const [masters, setMasters] = useState([]);
  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [page, setPage] = useState("Masters");
  useEffect(() => {
    const fetchInventory = async () => {
     try {
       const invResp = await getInventory();
       const sortedInvData = invResp.data.sort((a, b) => {
         
        return new Date(b.created_at) - new Date(a.created_at);
      });
       setStocks(sortedInvData);
       setFilteredData(sortedInvData)
       console.log(invResp);
     } catch (error) {
      console.log(error)
     }
    };
    fetchInventory();
  }, []);
  useEffect(() => {
    const fetchInventory = async () => {
     try {
       const invResp = await getMasters();
       const sortedInvData = invResp.data.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
       setMasters(sortedInvData);
       console.log(invResp);
     } catch (error) {
      console.log(error)
     }
    };
    fetchInventory();
  }, []);

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // Return date in yyyy-mm-dd format
  };
  const [setshowImport, setShowImportModal] = useState(false);
  const openModalImport = () => setShowImportModal(true);
  const closeModalImport = () => setShowImportModal(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [importStatus, setImportStatus] = useState("");
  const handleFileChange = (files) => {
    setSelectedFiles(files);
  };
  const handleImportMasters = async () => {
    if (selectedFiles.length === 0) {
      setImportStatus("No files selected.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await ImportMasters(formData);
      if (response.status === 200) {
        setImportStatus("Masters successfully imported!");
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
  const columnsmaster = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/master-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/edit-masters/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Code", selector: (row) => row.code, sortable: true },
    { name: "Serial number", selector: (row) => row.serial_number, sortable: true },
    { name: "Type", selector: (row) => row.inventory_type==1?"Spares":"Consumable", sortable: true },
    { name: "Group", selector: (row) => row.asset_group, sortable: true },
    { name: "Sub Group", selector: (row) => row.asset_sub_group, sortable: true },
    { name: "Category", selector: (row) => row.category, sortable: true },
    { name: "Manufacturer", selector: (row) => row.Manufacturer, sortable: true },
    { name: "Criticality", selector: (row) => row.criticality==1?"Critical":"Non-Critical", sortable: true },
    { name: "Unit", selector: (row) => row.unit, sortable: true },
    { name: "Cost", selector: (row) => row.cost, sortable: true },
    { name: "SAC/HSN Code", selector: (row) => row.hsn_id, sortable: true },
    { name: "Min Stock Level", selector: (row) => row.min_stock_level, sortable: true },
    { name: "Min Order Level", selector: (row) => row.min_order_level, sortable: true },
    // { name: "Description", selector: (row) => row.description, sortable: true },
    {
      name: " Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    // { name: "Rate", selector: (row) => row.rate, sortable: true },
    { name: "Asset", selector: (row) => row.asset_id, sortable: true },
    { name: "Status", selector: (row) => (row.active==true)?"Active":"Inactive", sortable: true },
    { name: "Expiry Date", selector: (row) => dateFormat(row.expiry_date), sortable: true },

   
    // { name: "Added On", selector: (row) => dateFormat(row.created_at), sortable: true },
   
  ];
  // const data=[
  //   {
  //     name:"Tissue paper",
  //     Code:"TP001	",
  //     Serial:"ABC12",
  //     Type:"Consumable	",
  //     group_name:"Electrical Equipments	",
  //     sub_group_name:"DG Sets",
  //     Category:"Technical",
  //     Manufacturer:"",
  //     Criticality:"Critical",
  //     Unit:"Box",
  //     Cost:"50.0",
  //     SAC:"Category 2 HSN 1234",
  //     min_stock:"10",
  //     min_order:"10",
  //     available_quantity:"80.0",
  //     Asset:"",
  //     Status:"",
  //     Expiry:"",
  //   },
  //   {
  //     name:"mouse",
  //     Code:"TP001	",
  //     Serial:"ABC12",
  //     Type:"Consumable	",
  //     group_name:"Electrical Equipments	",
  //     sub_group_name:"DG Sets",
  //     Category:"Technical",
  //     Manufacturer:"",
  //     Criticality:"Critical",
  //     Unit:"Box",
  //     Cost:"50.0",
  //     SAC:"Category 2 HSN 1234",
  //     min_stock:"10",
  //     min_order:"10",
  //     available_quantity:"80.0",
  //     Asset:"Laptop",
  //     Status:"",
  //     Expiry:"",
  //   },
  //   {
  //     name:"Paper Cups",
  //     Code:"TP001	",
  //     Serial:"ABC12",
  //     Type:"Consumable	",
  //     group_name:"	",
  //     sub_group_name:"",
  //     Category:"",
  //     Manufacturer:"",
  //     Criticality:"Critical",
  //     Unit:"Box",
  //     Cost:"50.0",
  //     SAC:"Category 2 HSN 1234",
  //     min_stock:"10",
  //     min_order:"10",
  //     available_quantity:"80.0",
  //     Asset:"",
  //     Status:"",
  //     Expiry:"",
  //   },
  //   {
  //     name:"ac vents",
  //     Code:"TP001	",
  //     Serial:"ABC12",
  //     Type:"Consumable	",
  //     group_name:"Electrical Equipments	",
  //     sub_group_name:"DG Sets",
  //     Category:"Non-Technical",
  //     Manufacturer:"",
  //     Criticality:"Critical",
  //     Unit:"Box",
  //     Cost:"50.0",
  //     SAC:"Category 2 HSN 1234",
  //     min_stock:"10",
  //     min_order:"10",
  //     available_quantity:"80.0",
  //     Asset:"",
  //     Status:"",
  //     Expiry:"",
  //   },
  // ]
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/stock-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/edit-stock/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Description", selector: (row) => row.description, sortable: true },
    {
      name: "Available Quantity",
      selector: (row) => row.available_quantity,
      sortable: true,
    },
    { name: "Rate", selector: (row) => row.rate, sortable: true },
    { name: "Group", selector: (row) => row.group_name, sortable: true },
    { name: "Sub Group", selector: (row) => row.sub_group_name, sortable: true },
    { name: "Min Order Level", selector: (row) => row.min_stock, sortable: true },
    { name: "Max Order Level", selector: (row) => row.max_stock, sortable: true },
    { name: "Added On", selector: (row) => dateFormat(row.created_at), sortable: true },
   
  ];

  const defaultImage = { index: 0, src: "" };
  let selectedImageSrc = defaultImage.src;
  let selectedImageIndex = defaultImage.index;
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const Get_Background = async () => {
    try {
      // const params = {
      //   user_id: user_id,
      // };
      const user_id = getItemInLocalStorage("VIBEUSERID");
      console.log(user_id);
      const data = await getVibeBackground(user_id);

      if (data.success) {
        console.log("sucess");

        console.log(data.data);
        selectedImageSrc = API_URL + data.data.image;

        selectedImageIndex = data.data.index;

        // Now, you can use selectedImageSrc and selectedImageIndex as needed
        console.log("Received response:", data);

        // For example, update state or perform any other actions
        setSelectedImage(selectedImageSrc);
        setSelectedIndex(selectedImageIndex);
        console.log("Received selectedImageSrc:", selectedImageSrc);
        console.log("Received selectedImageIndex:", selectedImageIndex);
        console.log(selectedImage);
        // dispatch(setBackground(selectedImageSrc));
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // Call the function to get the background image when the component mounts
    Get_Background();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredData(stocks);
    } else {
      const filteredResults = stocks.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filteredResults);
      console.log(filteredResults);
      
    }
  };

  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileName = "Stocks Data.xlsx";
    const ws = XLSX.utils.json_to_sheet(stocks);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };
const themeColor = useSelector((state)=> state.theme.color)
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
        <div className=" w-full my-2 flex  overflow-hidden flex-col">
          <div className="flex w-full">
            <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
            <h2
                className={`p-1 ${
                  page === "Masters" &&
                  `bg-white font-medium text-blue-500 shadow-custom-all-sides`
                } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
                onClick={() => setPage("Masters")}
              >
                Masters
              </h2>
              <h2
                className={`p-1 ${
                  page === "stocks" &&
                  `bg-white font-medium text-blue-500 shadow-custom-all-sides`
                } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
                onClick={() => setPage("stocks")}
              >
                Stocks
              </h2>
              <h2
                className={`p-1 ${
                  page === "grn" &&
                  "bg-white font-medium text-blue-500 shadow-custom-all-sides"
                } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
                onClick={() => setPage("grn")}
              >
                GRN
              </h2>
              <h2
                className={`p-1 ${
                  page === "gdn" &&
                  "bg-white font-medium text-blue-500 shadow-custom-all-sides"
                } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
                onClick={() => setPage("gdn")}
              >
                GDN
              </h2>
            </div>
          </div>
          <div>
            {/* {page === "scheduled" && <ScheduledAudit/> }
        {page === "conducted" && <ConductedAudit/> }
        {page === "checklists" && <AuditChecklist/> } */}
          </div>
        </div>
        {page === "Masters" && (
          <>
            <div className="flex md:flex-row flex-col justify-between items-center my-2 gap-2  ">
              <input
                type="text"
                placeholder="Search "
                className="border-2 p-2 md:w-96 border-gray-300 rounded-lg placeholder:text-sm"
                  value={searchText}
                  onChange={handleSearch}
              />
              <div className="md:flex grid grid-cols-2 sm:flex-row my-2 flex-col gap-2">
                <Link
                style={{ background: themeColor }}
                  to={"/admin/add-masters"}
                  className="bg-black  text-sm rounded-lg flex justify-center font-semibold items-center gap-2 text-white py-2 px-4  transition-all duration-300 "
                >
                  <IoAddCircleOutline size={20} />
                  Add
                </Link>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  style={{ background: themeColor }}
                  onClick={openModalImport}
                >
                  Import
                </button>
                {/* <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={exportToExcel}
                >
                  Export
                </button> */}
                {/* <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleDownloadQRCode}
      disabled={selectedRows.length === 0}
    >
      Download QR Code
    </button> */}
     {setshowImport && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl mb-4">Bulk Upload</h2>
            {/* Advanced Filter Fields */}
         <FileInputBox handleChange={handleFileChange} fieldName="checklist" isMulti={true}/>
         
            <div className="mt-4 flex justify-end space-x-4">
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
                onClick={handleImportMasters}
              >
                Import
              </button>
            </div>
            {importStatus && <p className="mt-4 text-center">{importStatus}</p>}
        </div>
        </div>
      )}
              </div>
            </div>
            <Table columns={columnsmaster} data={masters} />
          </>
        )}
        {page === "stocks" && (
          <>
            <div className="flex md:flex-row flex-col justify-between items-center my-2 gap-2  ">
              <input
                type="text"
                placeholder="Search By Stock name"
                className="border-2 p-2 md:w-96 border-gray-300 rounded-lg placeholder:text-sm"
                  value={searchText}
                  onChange={handleSearch}
              />
              <div className="md:flex grid grid-cols-2 sm:flex-row my-2 flex-col gap-2">
                <Link
                style={{ background: themeColor }}
                  to={"/admin/add-stock"}
                  className="bg-black  text-sm rounded-lg flex justify-center font-semibold items-center gap-2 text-white py-2 px-4  transition-all duration-300 "
                >
                  <IoAddCircleOutline size={20} />
                  Add
                </Link>
                {/* <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={exportToExcel}
                >
                  Export
                </button> */}
                {/* <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleDownloadQRCode}
      disabled={selectedRows.length === 0}
    >
      Download QR Code
    </button> */}
              </div>
            </div>
            <Table columns={columns} data={filteredData} />
          </>
        )}
        {page === "grn" && <GRN />}
        {page === "gdn" && <GDN />}
      </div>
    </section>
  );
};

export default Inventory;
