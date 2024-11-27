import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DataTable from "react-data-table-component";
import { ImEye } from "react-icons/im";
import { Link } from "react-router-dom";
import Modal from "../containers/modals/Modal";
import { getAttendance } from "../api";
import Table from "../components/table/Table";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
const Attendance = () => {
  const [modal, setModal] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const attendanceResponse = await getAttendance();
        console.log(attendanceResponse.data);
        setAttendanceData(attendanceResponse.data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchAttendance();
  }, []);

 const timeFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };
 const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
 })
  };

  const TotalHours = (punchedIn, punchedOut) => {
    const punchedInDate = new Date(punchedIn);
    const punchedOutDate = new Date(punchedOut);
    const diffMs = punchedOutDate - punchedInDate; 
    const diffHrs = diffMs / (1000 * 60 * 60); 
    return diffHrs.toFixed(2); 
  };
  const column = [
    // {
    //   name: "Actions",

    //   selector: (row) => row.action,
    // },

    { name: "Name", selector: (row) => row.attendance_of_name, sortable: true },
    { name: "Date", selector: (row) => dateFormat(row.created_at), sortable: true },
    { name: "Punch In", selector: (row) => timeFormat(row.punched_in_at), sortable: true },
    { name: "Punch Out",  selector: (row) => row.punched_out_at ? timeFormat(row.punched_out_at) : "", sortable:true },
    { name: "Total Hours Worked",  selector: (row) => {
      if (row.punched_in_at && row.punched_out_at) {
        return TotalHours(row.punched_in_at, row.punched_out_at);
      } else {
        return "";
      }
    }, sortable: true }
  ];
 

  
  document.title = `Attendance - Vibe Connect`;
  const themeColor = useSelector((state)=> state.theme.color)

  const exportAllToExcel = async () => {
    
    const mappedData = attendanceData.map((attend) => ({
      Name: attend.attendance_of_name,
Date: dateFormat(attend.created_at),
"Punch In" : timeFormat(attend.punched_in_at),
 "Punch Out" :attend.punched_out_at ? timeFormat(attend.punched_out_at) : "-",
"Total Hours Worked":attend.punched_out_at ? TotalHours(attend.punched_in_at, attend.punched_out_at) : "-"

    }));
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileName = "attendance_data.xlsx";
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
  return (
    <section className="flex ">
      <Navbar />
      <div className="w-full flex md:mx-3 flex-col overflow-hidden">
        {/* <div className="flex  justify-start gap-4 my-5  ">
          <div className="shadow-xl rounded-full border-4 border-gray-400 w-52  px-6 flex flex-col items-center">
            <p className="font-semibold text-lg">Total Employees</p>
            <p className="text-center font-semibold text-lg ">{attendanceData.length}</p>
          </div>
          <div className="shadow-xl rounded-full border-4 border-green-400 w-52  px-6 flex flex-col items-center">
            <p className="font-semibold text-lg">Present</p>
            <p className="text-center font-semibold text-lg ">0</p>
          </div>
          <div className="shadow-xl rounded-full border-4 border-red-400 w-52  px-6 flex flex-col items-center">
            <p className="font-semibold text-lg">Absent</p>
            <p className="text-center font-semibold text-lg ">0</p>
          </div>

          <div className="shadow-xl rounded-full border-4 border-orange-400 w-52  px-6 flex flex-col items-center">
            <p className="font-semibold text-lg">On Leave</p>
            <p className="text-center font-semibold text-lg ">0</p>
          </div>
        </div> */}
        <div className=" flex mx-3 flex-col my-5 ">
          <div className="flex md:flex-row flex-col justify-between items-center">
            <input
              type="text"
              placeholder="Search By Name"
              className="border-2 p-2 md:w-96 border-gray-300 rounded-lg"
            />
            <button
              className="bg-black w-20 rounded-lg text-white p-2 my-5"
              // onClick={() => setModal(true)}
              onClick={ exportAllToExcel}
              style={{background:themeColor}}
            >
              Export
            </button>
          </div>

         <Table  columns={column} data={attendanceData}/>
        </div>
      </div>
      {/* {modal && <Modal onclose={() => setModal(false)} />} */}
    </section>
  );
};

export default Attendance;
