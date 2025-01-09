import React, { useEffect, useState } from "react";
import { getSoftServices, softServiceDownloadQrCode } from "../../api";
import { BiEdit, BiFilterAlt } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";
import Table from "../../components/table/Table";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Services from "../Services";
import Navbar from "../../components/Navbar";
import * as XLSX from "xlsx";
import { DNA } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";

const ServicePage = () => {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [servicess, setServices] = useState([]);
  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const column = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/services/service-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/services/edit-service/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },

    {
      name: "Service Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Building",
      selector: (row) => row.building_name,
      sortable: true,
    },
    {
      name: "Floor",
      selector: (row) => row.floor_name,
      sortable: true,
    },
    {
      name: "Unit",
      selector: (row) => row?.units.map((unit) => (
        <div className="flex gap-2">
          <p key={unit.id}>{unit.name},</p>
        </div>
      )),
      sortable: true,
    },

    {
      name: "Created by",
      selector: (row) => row.user_name,
      sortable: true,
    },

    {
      name: "Created On",
      selector: (row) => dateFormat(row.created_at),
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceResponse = await getSoftServices();
        const sortedServiceData = serviceResponse.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setFilteredData(sortedServiceData);
        setServices(sortedServiceData);
        console.log(serviceResponse);
      } catch (error) {
        console.log(error);
      }
    };

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);

    fetchService();
  }, []);
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredData(servicess);
    } else {
      const filteredResults = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filteredResults);
    }
  };
  const exportToExcel = () => {
    const mappedData = filteredData.map((serv) => ({
      "Service Name": serv.name,
      building: serv.building_name,
      Floor: serv.floor_name,
      Unit: serv.unit_name,
      "Created On": dateFormat(serv.created_at),
    }));
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileName = "service_data.xlsx";
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
  const themeColor = useSelector((state) => state.theme.color);


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
      const response = await softServiceDownloadQrCode(selectedRows);
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
    <section className="flex ">
      <Navbar />
      <div className="p-4 overflow-hidden w-full my-2 flex mx-3 flex-col">
        <Services />
        <div>
          {/* {filter && (
              <div className="flex items-center justify-center gap-2">
                <div>
                  <label htmlFor="" className="font-medium">
                    Service Name:{" "}
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter Service Name"
                    className="border p-1 placeholder:text-sm px-4 border-gray-500 rounded-md"
                  />
                </div>

               

                <select className="border p-1 px-4 border-gray-500 rounded-md">
                  <option value="">Select Building</option>
                  <option value="unit1">Building 1</option>
                  <option value="unit2">Building 2</option>
                  <option value="unit2">Building 3</option>
                </select>
                <button className="bg-black p-1 px-4 text-white rounded-md">
                  Apply
                </button>
              </div>
            )} */}
        </div>
        <div className="flex flex-wrap justify-between items-center my-2 ">
          <input
            type="text"
            placeholder="Search By Service name"
            className="border-2 p-2 w-96 border-gray-300 rounded-lg"
            value={searchText}
            onChange={handleSearch}
          />
          <div className="flex flex-wrap md:my-0 my-2 gap-2">
            {/* <button
              className="text-lg font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md"
              onClick={() => setOmitColumn(!omitColumn)}
            >
              <IoFilterOutline />
              Filter Columns
            </button> */}
            {/* <button
                  className="text-lg font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md"
                  onClick={() => setFilter(!filter)}
                >
                  <BiFilterAlt />
                  Filter
                </button> */}

            <Link
              to={"/services/add-service"}
              className="bg-black  rounded-lg flex font-semibold  items-center gap-2 text-white p-2 "
              style={{ background: themeColor }}
            >
              <IoAddCircleOutline size={20} />
              Add
            </Link>
            <button
              style={{ background: themeColor }}
              className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center"
              onClick={handleQrDownload}
            >
              <FaDownload />
              QR Code
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              onClick={exportToExcel}
              style={{ background: themeColor }}
            >
              Export
            </button>
            {/* <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownloadQRCode}
            disabled={selectedRows.length === 0}
          >
            Download QR Code
          </button> */}
          </div>
        </div>
        {/* {servicess.length !== 0 ? (
          <Table columns={column} data={filteredData} onSelectedRows={handleSelectedRows} selectableRow={true}/>
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
        )} */}
        {servicess.length !== 0 ? (
          <Table
            columns={column}
            data={filteredData}
            onSelectedRows={handleSelectedRows}
            selectableRow={true}
          />
        ) : loading ? (
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
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-lg">No Records!</p>
          </div>
        )}
        {/* <DataTable
          selectableRows
          columns={column.filter((col) => visibleColumns.includes(col.name))}
          data={filteredData}
          customStyles={customStyle}
          responsive
          onSelectedRowsChange={handleRowSelected}
          fixedHeader
          // fixedHeaderScrollHeight="500px"
          pagination
          selectableRowsHighlight
          highlightOnHover
          omitColumn={column}
        /> */}
      </div>
    </section>
  );
};

export default ServicePage;
