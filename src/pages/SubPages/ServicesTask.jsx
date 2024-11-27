import React, { useEffect, useState } from 'react'
import { getServicesRoutineList, getSoftServiceStatus } from '../../api';
import Table from '../../components/table/Table';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import Services from '../Services';
import Navbar from '../../components/Navbar';
import * as XLSX from "xlsx";
import { BsEye } from 'react-icons/bs';
import { DNA } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { Pagination } from "antd";

const ServicesTask = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
    const [routines, setRoutines]= useState([])
    const [filter, setFilter] = useState(false);
    const [searchRoutineText, setSearchRoutineCheck] = useState("")
    const [filteredRoutineData, setFilteredRoutineData] = useState([]);
    const [RoutineData, setRoutineData] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(10)
    const dateFormat = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short", // or 'long' for full month names
        year: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
        // // second: '2-digit'
        // hour12: true,
      });
    };
   
    const routineColumn = [
        {
          name: "Action",
          cell: (row) => (
            <div className="flex items-center gap-4">
              <Link to={`/service/checklist/${row.soft_service_id}/${row.id}`}>
                <BsEye size={15} />
              </Link>
              {/* <Link to={`/services/edit-routine/${row.id}`}>
                <BiEdit size={15} />
              </Link> */}
            </div>
          ),
        },
        {
          name: "Service Name",
          selector: (row) => row.soft_service_name,
          sortable: true,
        },
        {
          name: "Checklist Name",
          selector: (row) => row.checklist_name,
          sortable: true,
        },
        
        {
          name: "Start Date",
          selector: (row) => dateFormat(row.start_time),
          sortable: true,
        },
        // {
        //   name: "End Time",
        //   selector: (row) => row.end_time,
        //   sortable: true,
        // },
        {
          name: "Status",
          selector: (row) => row.status,
          sortable: true,
        },
        {
          name: "Assigned To",
          selector: (row) => row.assigned_to_name,
          sortable: true,
        },  
        
      ];
      const themeColor = useSelector((state)=> state.theme.color)

      useEffect(() => {
        try {
          const fetchServiceRoutine = async () => {
            const ServiceRoutineResponse = await getServicesRoutineList(pageNo, perPage);
            const filteredServiceTask = ServiceRoutineResponse.data.activities.filter(asset => asset.soft_service_name);
            console.log("task data",filteredServiceTask)
            console.log("task data resp",ServiceRoutineResponse)
            setFilteredRoutineData(filteredServiceTask);
            setTotal(ServiceRoutineResponse.data.total_pages);
            setRoutineData(filteredServiceTask)
            setRoutines(filteredServiceTask)
          };
          fetchServiceRoutine();
        } catch (error) {
          console.log(error);
        }
      }, [pageNo, perPage]);
         
      const handlePageChange = (page, pageSize) => {
        setPageNo(page);
        setPerPage(pageSize)
      };
      const handleStatusChange = async (status) => {
        setSelectedStatus(status);
        if(status==="all"){
          setFilteredRoutineData(RoutineData)
        }else{
        try {
          const respdata = await getSoftServiceStatus(status);
          const filteredServiceTask = respdata.data.activities.filter(asset => asset.soft_service_name);
          setFilteredRoutineData(filteredServiceTask);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      };
      const handleRoutineSearch = (event) => {
        const searchValue = event.target.value;
        setSearchRoutineCheck(searchValue);
        if (searchValue.trim() === "") {
          setFilteredRoutineData(routines);
        } else {
        const filteredResults = filteredRoutineData.filter((item) =>
         {item.soft_service_name && item.soft_service_name.toLowerCase().includes(searchValue.toLowerCase())}
        );
        setFilteredRoutineData(filteredResults);
        console.log(filteredResults)
        
      }
      };
    
      const exportToExcel = () => {
        
        const fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileName = "service Task Data.xlsx";
        const ws = XLSX.utils.json_to_sheet(filteredRoutineData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        const url = URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
      };
  return (
    <section className="flex "> 
    <Navbar /> 
   <div className="p-4 overflow-hidden w-full my-2 flex mx-3 flex-col">
     
     <Services />
       
      {filter && (
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
            <option value="">Select Area</option>
            <option value="unit1">Area 1</option>
            <option value="unit2">Area 2</option>
            <option value="unit2">Area 3</option>
          </select>

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
      )}
      <div className="flex sm:flex-row flex-col justify-between gap-2 my-5">
       <div className="md:flex justify-between grid grid-cols-2 items-center  gap-2 border border-gray-300 rounded-md px-3 p-2 w-auto">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="all"
                name="status"
                checked={selectedStatus === "all"}
                onChange={() => handleStatusChange("all")}
              />
              <label htmlFor="all" className="text-sm">
                All
              </label>
            </div>
           
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="pending"
                name="status"
                checked={selectedStatus === "pending"}
                onChange={() => handleStatusChange("pending")}
              />
              <label htmlFor="pending" className="text-sm">
                Pending
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="completed"
                name="status"
                checked={selectedStatus === "complete"}
                onChange={() => handleStatusChange("complete")}
              />
              <label htmlFor="completed" className="text-sm">
                Completed
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="completed"
                name="status"
                checked={selectedStatus === "overdue"}
                onChange={() => handleStatusChange("overdue")}
              />
              <label htmlFor="overdue" className="text-sm">
                Overdue
              </label>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col gap-2">
            <input
              type="text"
             placeholder="Search By name"
              className="border border-gray-400 md:w-96 placeholder:text-xs rounded-lg p-2"
              value={searchRoutineText}
          onChange={handleRoutineSearch}
            /></div>
          </div>
      <div className="flex flex-wrap justify-between items-center  ">
        {/* <input
          type="text"
          placeholder="Search By name"
          className="border-2 p-2 w-96 border-gray-300 rounded-lg "
          value={searchRoutineText}
          onChange={handleRoutineSearch}
        /> */}
        <div className="flex flex-wrap gap-2">
        
          {/* <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={exportToExcel}
style={{background: themeColor}}
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
      {routines.length !== 0 ?(
        <>
        <Table selectableRows columns={routineColumn} data={filteredRoutineData}  fixedHeader
        pagination={false}/>
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
      ):(
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
  </section>
  )
}

export default ServicesTask
