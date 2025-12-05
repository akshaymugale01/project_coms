import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import MyDateTable from "../../../../containers/MyDateTable";
import { useSelector } from "react-redux";
import { getAssetReadingDetails } from "../../../../api";
import Table from "../../../../components/table/Table";

const getDateArray = (start, end) => {
  let arr = [];
  let dt = new Date(start);
  while (dt <= new Date(end)) {
    arr.push(new Date(dt).toISOString().split("T")[0]);
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};
const tasks = [
  { name: "Consumption 1", start: "2024-06-01", end: "2024-06-05" },
  { name: "Consumption 2", start: "2024-06-03", end: "2024-06-08" },
  { name: "Consumption 3", start: "2024-06-07", end: "2024-06-15" },
];

const Readings = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [readings, setReadings] = useState([])
  const themeColor = useSelector((state) => state.theme.color);
  const [dates, setDates] = useState([]);
  // const dates =
  const handleDateRangeSubmit = () => {
    if (startDate && endDate) {
      const newDates = getDateArray(startDate, endDate);
      setDates(newDates);
    }
  };
  const handleReset = () => {
    setDates([]);
  };
const {id} = useParams()
useEffect(()=> {
  const fetchReading = async()=>{
   try {
     const readingResp = await getAssetReadingDetails(id)
     console.log(readingResp.data)
     setReadings(readingResp.data)
   } catch (error) {
    console.log(error)
   }
  }
  fetchReading()
},[])

const dateFormat = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short", // or 'long' for full month names
    year: "numeric",
    
  });
};
const TimeFormat = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    // second: '2-digit'
    hour12: true,
  });
};
const column = [
  {
    name: "Date",
    selector: (row) => dateFormat(row.created_at),
    sortable: true,
  },
  {
    name: "Time",
    selector: (row) => TimeFormat(row.created_at),
    sortable: true,
  },
  {
    name: "Parameter",
    selector: (row) => row.asset_param_name,
    sortable: true,
  },
  {
    name: "Opening",
    selector: (row) => row.opening,
    sortable: true,
  },
  {
    name: "Closing",
    selector: (row) => row.value,
    sortable: true,
  },
  {
    name: "Consumption",
    selector: (row) => row.consumption,
    sortable: true,
  },
  {
    name: "Submitted by",
    selector: (row) => row.user_name,
    sortable: true,
  },

  

]
  return (
    <div className="p-4">
      {/* <div className="flex md:flex-row flex-col gap-2 items-center my-2">
        <div>
          <label htmlFor="startDate" className="font-medium">
            From :{" "}
          </label>
          <input
            type="date"
            className="border border-gray-400 px-4 rounded-md"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <span>-</span>
        <div>
          <label htmlFor="endDate" className="font-medium">
            To :{" "}
          </label>
          <input
            type="date"
            className="border border-gray-400 px-4 rounded-md"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          className="px-4 border-2 border-black rounded-md"
          onClick={handleDateRangeSubmit}
        >
          Apply
        </button>
        <button
          className="px-4 border-2 border-black rounded-md"
          onClick={handleReset}
        >
          Reset
        </button>
      </div> */}
      {/* <div className="overflow-x-auto">
        <table className="min-w-full bg-white ">
          <thead className="">
            <tr style={{ background: themeColor }} className="text-white ">
              <th className="px-4 py-2 border min-w-96">Consumption</th>
              {readings.map((date) => (
                <th key={date} className="px-4 py-2 border min-w-40">
                  {dateFormat(date.created_at)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.name}>
                <td className="px-4 py-2 border">{task.name}</td>
                {dates.map((date) => {
                  const isActive = date >= task.start && date <= task.end;
                  return (
                    <td
                      key={date}
                      className={`px-4 py-2 border ${
                        isActive ? "bg-blue-500" : ""
                      }`}
                    ></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      
      <Table columns={column} data={readings} />

      {/* <iframe src={`https://admin.vibecopilot.ai/show_readings?asset_id=${id}&wv=true&token=efe990d24b0379af8b5ba3d0a986ac802796bc2e0db15552`} width="100%" height="600px"></iframe> */}
    </div>
  );
};

export default Readings;