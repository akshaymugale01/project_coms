import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { IoAddCircleOutline, IoFilterOutline } from "react-icons/io5";
import { BsEye, BsFilterLeft } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MdOutlineWidgets } from "react-icons/md";

// import { serviceColumns } from "../utils/assetColumns";
import { BiEdit, BiFilter, BiFilterAlt } from "react-icons/bi";
import Table from "../components/table/Table";
import {
  getAssetPPMList,
  getServicesChecklist,
  getServicesRoutineList,
  getSoftServices,
} from "../api";
// import jsPDF from "jspdf";
// import QRCode from "qrcode.react";

const Services = () => {
  const [searchPPMText, setSearchPPMCheck] = useState("");

  // const [visibleColumns, setVisibleColumns] = useState(serviceColumns);
  const [selectedRows, setSelectedRows] = useState([]);

  const [filteredPPMData, setFilteredPPMData] = useState([]);

  const [page, setPage] = useState("service");
  const [services, setServices] = useState([]);

  const [ppms, setPPms] = useState([]);
  // const [routines, setRoutines]= useState([])

  const PPMColumn = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          {/* <Link to={`/services/checklist-details/${row.id}`}>
            <BsEye size={15} />
          </Link> */}
          <Link to={`/services/edit-ppm/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Occurs",
      selector: (row) => row.occurs,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.start_date,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.end_date,
      sortable: true,
    },
    {
      name: "Frequency",
      selector: (row) => row.frequency,
      sortable: true,
    },
    {
      name: "Assigned To",
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: "No. Of Questions",
      selector: (row) => row.questions.length,
      sortable: true,
    },
  ];

  // useEffect(() => {
  //   try {
  //     const fetchServicePPM = async () => {
  //       const ServicePPMResponse = await getAssetPPMList();
  //       setFilteredPPMData(ServicePPMResponse.data.checklists);
  //       setPPms(ServicePPMResponse.data.checklists);
  //     };
  //     fetchServicePPM();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

 
  const handlePPMSearch = (event) => {
    const searchValue = event.target.value;
    setSearchPPMCheck(searchValue);
    if (searchValue.trim() === "") {
      setFilteredPPMData(ppms);
    } else {
      const filteredResults = filteredPPMData.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredPPMData(filteredResults);
      console.log(filteredResults);
      console.log(filteredData);
    }
  };

  const customStyle = {
    headCells: {
      style: {
        backgroundColor: "black",
        color: "white",
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
      },
    },
  };

  return (
    <section>
      {/* <section className="flex "> */}
      {/* <Navbar /> */}
      {/* <div className="p-4 overflow-hidden w-full my-2 flex mx-3 flex-col">
        */}
        <div className="flex justify-center w-full"> 
      <div className="sm:flex grid grid-cols-2 text-sm md:text-base sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200 ">
        <NavLink
          to={"/services/soft-service"}
          className={({ isActive }) =>
            `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Service
        </NavLink>
        <NavLink
          to={"/services/checklist"}
          className={({ isActive }) =>
            ` md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Checklist
        </NavLink>
        <NavLink
          to={"/services/tasks"}
          className={({ isActive }) =>
            ` md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
              isActive && "bg-white text-blue-500 shadow-custom-all-sides"
            }`
          }
        >
          Task
        </NavLink>
       
      </div>
      <Link to={"/services/overview"} className="lg:absolute right-0 mx-8 shadow-custom-all-sides p-1 rounded-full cursor-pointer  hover:text-blue-500 transition-all duration-300 bg-gray-200 "><MdOutlineWidgets size={30} /></Link>

      </div>
      
    </section>
  );
};

export default Services;
