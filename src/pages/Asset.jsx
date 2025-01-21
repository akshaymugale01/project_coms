import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { IoAddCircleOutline, IoFilterOutline } from "react-icons/io5";
import { BsEye, BsFilterLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import * as XLSX from "xlsx";
import { columnsData } from "../utils/assetColumns";
import { BiEdit, BiFilter, BiFilterAlt } from "react-icons/bi";
import {
  API_URL,
  getFloors,
  getPerPageSiteAsset,
  getSiteAsset,
  getSiteSearchedAsset,
  getUnits,
  getVibeBackground,
  downloadQrCode,
} from "../api";
import { getItemInLocalStorage } from "../utils/localStorage";
import AMC from "./SubPages/AMC";
import Meter from "./Meter";
import { useSelector } from "react-redux";
import Inventory from "./Inventory";
import Checklist from "./Checklist";
import RoutineTask from "./RoutineTask";
import Table from "../components/table/Table";

import bridge from "/bridge.jpg";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import PPMActivity from "./SubPages/PPMActivity";
import { CirclesWithBar, DNA, ThreeDots } from "react-loader-spinner";
import AssetNav from "../components/navbars/AssetNav";
import ImportAssetModal from "../containers/modals/ImportAssetModal";
import { Pagination } from "antd";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";

// import jsPDF from "jspdf";
// import QRCode from "qrcode.react";

const Asset = () => {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState(false);
  // const [omitColumn, setOmitColumn] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(columnsData);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [floors, setFloors] = useState([]);
  const [unitName, setUnitName] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [page, setPage] = useState("assets");
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const themeColor = useSelector((state) => state.theme.color);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(value)
        ? prevSelectedOptions.filter((option) => option !== value)
        : [...prevSelectedOptions, value]
    );
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    // const timer = setTimeout(() => {
    //   setLoading(false);
    // }, 3000);

    // return () => clearTimeout(timer);

  }, []);

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  document.title = `Assets - My Citi Life`;
  const column = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/assets/asset-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/assets/edit-asset/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Asset Name",
      selector: (row) => row.name,
      sortable: true,
      width: "150px",
    },

    {
      name: "Building",
      selector: (row) => row.building_name,
      sortable: true,
    },

    { name: "Floor", selector: (row) => row.floor_name, sortable: true },
    { name: "Unit", selector: (row) => row.unit_name, sortable: true },
    {
      name: "Asset Number",
      selector: (row) => row.asset_number,
      sortable: true,
    },
    {
      name: "Equipment Id",
      selector: (row) => row.equipemnt_id,
      sortable: true,
    },
    {
      name: "OEM Name",
      selector: (row) => row.oem_name,
      sortable: true,
    },

    {
      name: "Serial Number",
      selector: (row) => row.serial_number,
      sortable: true,
    },

    {
      name: "Model Number",
      selector: (row) => row.model_number,
      sortable: true,
    },

    {
      name: "Group",
      selector: (row) => row.group_name,
      sortable: true,
    },
    {
      name: "Sub Group",
      selector: (row) => row.sub_group_name,
      sortable: true,
    },
    {
      name: "Purchase Date",
      selector: (row) => row.purchased_on,
      sortable: true,
    },

    {
      name: "Purchase Cost",
      selector: (row) => row.purchase_cost,
      sortable: true,
    },

    {
      name: "Critical",
      selector: (row) => (row.critical ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row.breakdown ? (
          <p className="bg-red-400 p-1 px-2 rounded-full text-white">
            Breakdown
          </p>
        ) : (
          <p className="bg-green-400 p-1 px-2 rounded-full text-white">
            In Use
          </p>
        ),
      sortable: true,
    },
    {
      name: "Capacity",
      selector: (row) => row.capacity,
      sortable: true,
    },

    {
      name: "Created On",
      selector: (row) => dateFormat(row.created_at),
      sortable: true,
    },
    {
      name: "Updated On",
      selector: (row) => dateFormat(row.updated_at),
      sortable: true,
    },
    {
      name: "Warranty",
      selector: (row) => (row.warranty_start === null ? "No" : "Yes"),
      sortable: true,
    },
    {
      name: "W Start",
      selector: (row) => row.warranty_start,
      sortable: true,
    },

    {
      name: "Installation Date",
      selector: (row) => row.installation,
      sortable: true,
    },
    {
      name: "W Expiry",
      selector: (row) => row.warranty_expiry,
      sortable: true,
    },

    {
      name: "Meter Configured",
      selector: (row) => (row.is_meter ? "Yes" : "No"),
      sortable: true,
    },

    {
      name: "Supplier",
      selector: (row) => row.vendor_name,
      sortable: true,
    },
  ];

  const [filteredData, setFilteredData] = useState([]);

  // const handleSearch = (e) => {
  //   const searchValue = e.target.value;
  //   setSearchText(searchValue);

  //   if (searchValue.trim() === "") {
  //     setFilteredData(assets);
  //   } else {
  //     const filteredResults = assets.filter(
  //       (item) =>
  //         item.building_name
  //           .toLowerCase()
  //           .includes(searchValue.toLowerCase()) ||
  //         item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         (item.oem_name &&
  //           item.oem_name.toLowerCase().includes(searchValue.toLowerCase())) ||
  //         (item.unit_name &&
  //           item.unit_name.toLowerCase().includes(searchValue.toLowerCase()))
  //     );
  //     setFilteredData(filteredResults);
  //   }
  // };

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    try {
      const response = await getSiteSearchedAsset(searchValue);

      setFilteredData(response.data.site_assets);
      setTotal(response.data.total_count);
      console.log(response);
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPerPageSiteAsset(pageNo, perPage);

        setFilteredData(response.data.site_assets);

        setAssets(response.data.site_assets);
        setTotal(response.data.total_count);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pageNo, perPage]);

  const handlePageChange = (page, pageSize) => {
    setPageNo(page);
    setPerPage(pageSize);
  };

  const exportToExcel = () => {
    const mappedData = filteredData.map((asset) => ({
      "Asset Name": asset.name,
      "Asset Type": asset.asset_type,
      "Serial No.": asset.serial_number,
      "Model No.": asset.model_number,
      Description: asset.description,
      Building: asset.building_name,
      Floor: asset.floor_name,
      Unit: asset.unit_name,
      Vendor: asset.vendor_name,
      "Asset Group": asset.group_name,
      "Asset Sub Group": asset.sub_group_name,
      "Purchased On": asset.purchased_on,
      "Purchased Cost": asset.purchase_cost,
      Critical: asset.critical ? "Yes" : "No",
      Breakdown: asset.breakdown ? "Yes" : "No",
      "Meter Configured": asset.is_meter ? "Yes" : "No",
      "Created On": dateFormat(asset.created_at),
      "Updated On": dateFormat(asset.updated_at),
      Comment: asset.remarks,
      Installation: asset.installation,
      "Warranty Start": asset.warranty_start,
      "Warranty Expiry": asset.warranty_expiry,
    }));
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileName = "asset_data.xlsx";
    const ws = XLSX.utils.json_to_sheet(mappedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const buildings = getItemInLocalStorage("Building");

  const handleFilterApply = () => {
    let filteredResults = [...filteredData];

    if (selectedBuilding) {
      filteredResults = filteredResults.filter(
        (item) => item.building_id === parseInt(selectedBuilding, 10)
      );
    }

    if (selectedFloor) {
      filteredResults = filteredResults.filter(
        (item) => item.floor_id === parseInt(selectedFloor, 10)
      );
    }

    if (selectedUnit) {
      filteredResults = filteredResults.filter(
        (item) => item.unit_id === parseInt(selectedUnit, 10)
      );
    }

    setFilteredData(filteredResults);
    console.log("Filtered Results:", filteredResults);
  };

  const handleFilterReset = () => {
    setSelectedBuilding("");
    setSelectedFloor("");
    setSelectedUnit("");
    setFilteredData(assets);
  };

  const handleBuildingChange = async (e) => {
    const buildingId = e.target.value;
    setSelectedBuilding(buildingId);
    const response = await getFloors(buildingId);
    setFloors(response.data.map((item) => ({ name: item.name, id: item.id })));
    setSelectedFloor(""); // Reset floor and unit when building changes
    setUnitName([]);
    setSelectedUnit("");
  };

  const handleFloorChange = async (e) => {
    const floorId = e.target.value;
    setSelectedFloor(floorId);
    const response = await getUnits(floorId);
    setUnitName(
      response.data.map((item) => ({ name: item.name, id: item.id }))
    );
    setSelectedUnit(""); // Reset unit when floor changes
  };

  const handleUnitChange = (e) => {
    const unitId = e.target.value;
    setSelectedUnit(unitId);
  };

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

  console.log(uploadModal);

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRows = (rows) => {
    const selectedId = rows.map((row) => row.id);
    console.log(selectedId);
    setSelectedRows(selectedId);
  };

  const handleQrDownload = async () => {
    if (selectedRows.length === 0) {
      return toast.error("Please select at least one data.");
    }

    console.log(selectedRows);
    toast.loading("Qr code downloading, please wait!");

    try {
      const response = await downloadQrCode(selectedRows);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "qr_codes.pdf");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.parentNode.removeChild(link);
      console.log(response);
      toast.dismiss();
      toast.success("Qr code downloaded successfully");
    } catch (error) {
      toast.dismiss();
      console.error("Error downloading Qr code:", error);
      toast.error("Something went wrong, please try again");
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

        {filter && page === "assets" && (
          <div className="flex flex-col md:flex-row mt-1 items-center justify-center gap-2">
            <select
              name="building_name"
              value={selectedBuilding}
              id="building_name"
              onChange={handleBuildingChange}
              className="border p-1 px-4 max-w-44 w-44 border-gray-500 rounded-md"
            >
              <option value="">Select Building</option>
              {buildings?.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.name}
                </option>
              ))}
            </select>

            <select
              onChange={handleFloorChange}
              value={selectedFloor}
              name="floor_name"
              className="border p-1 px-4 max-w-44 w-44 border-gray-500 rounded-md"
            >
              <option value="">Select Floor</option>
              {floors?.map((floor) => (
                <option value={floor.id} key={floor.id}>
                  {floor.name}
                </option>
              ))}
            </select>
            <select
              value={selectedUnit}
              onChange={handleUnitChange}
              name="unit_name"
              className="border p-1 px-4 max-w-44 w-44 border-gray-500 rounded-md"
            >
              <option value="">Select Unit</option>
              {unitName?.map((unit) => (
                <option value={unit.id} key={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
            <button
              className=" p-1 px-4 text-white rounded-md"
              onClick={handleFilterApply}
              style={{ background: themeColor }}
            >
              Apply
            </button>
            <button
              className="bg-red-400 p-1 px-4 text-white rounded-md"
              onClick={handleFilterReset}
            >
              Reset
            </button>
          </div>
        )}
        {/* {page === "assets" && (
          <> */}
        <div className="flex md:flex-row flex-col justify-between md:items-center my-2 gap-2  ">
          <input
            type="text"
            placeholder="Search By Building, Asset, Unit or OEM Name"
            className=" p-2 md:w-96 border-gray-300 rounded-md placeholder:text-sm outline-none border "
            value={searchText}
            onChange={handleSearch}
          />
          <div className="md:flex grid grid-cols-2 sm:flex-row my-2 flex-col gap-2">
            <Link
              to={"/assets/add-asset"}
              style={{ background: themeColor }}
              className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center"
            >
              <IoAddCircleOutline />
              Add Asset
            </Link>
            <button
              style={{ background: themeColor }}
              className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center"
              onClick={handleQrDownload}
            >
              <FaDownload />
              QR Code
            </button>
            <div className="" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ background: themeColor }}
                className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center w-full"
              >
                Hide Columns
                {dropdownOpen ? <IoIosArrowDown /> : <MdKeyboardArrowRight />}
              </button>
              {dropdownOpen && (
                <div className="absolute mt-2 bg-white border rounded shadow-md w-64 max-h-64 overflow-y-auto z-10">
                  {columnsData.map((column) => (
                    <label
                      key={column}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={column}
                        checked={selectedOptions.includes(column)}
                        onChange={handleCheckboxChange}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">{column}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button
              className=" font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
              onClick={() => setFilter(!filter)}
              style={{ background: themeColor }}
            >
              <BiFilterAlt />
              Filter
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              onClick={() => setUploadModal(true)}
              style={{ background: themeColor }}
            >
              Import
            </button>
            {/* <Link
            to={"/assets/asset-utilities"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              style={{ background: themeColor }}
            >
              Utilities
            </Link> */}
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

        {assets.length !== 0 ? (
          <>
            <Table
              selectableRows
              columns={column.filter((col) => !selectedOptions.includes(col.name))}
              data={filteredData}
              fixedHeader
              pagination={false}
              selectableRow={true}
              onSelectedRows={handleSelectedRows}
            />
            <div className="bg-white mb-10 p-2 flex justify-end">
              <Pagination
                current={pageNo}
                total={total}
                pageSize={perPage}
                onChange={handlePageChange}
                responsive
                showSizeChanger
                onShowSizeChange={handlePageChange}
              />
            </div>
          </>
        ) : assets.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-lg">No Records!</p>
          </div>
        ) : (
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

        {/* </>
        )} */}
        {page === "AMC" && <AMC />}
        {page === "meter" && <Meter />}
        {page === "checklist" && <Checklist />}
        {page === "inventory" && <Inventory />}
        {page === "routine" && <RoutineTask />}
        {page === "PPM" && <PPMActivity />}
        {uploadModal && (
          <ImportAssetModal onClose={() => setUploadModal(false)} />
        )}
      </div>
    </section>
  );
};

export default Asset;
