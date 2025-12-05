import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Selector from "../Selector";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";

const Modal = ({ onclose }) => {
  const [date, setDate] = useState(new Date());

  const options = {
    user: ["All", "Occupants", "Adimn", "technician", "Security"],
    department: [
      "Electrical, Security",
      "Help Desk",
      "Water Supply",
      "Operations",
    ],
  };
  const handleExport = () => {
    const currentDate = new Date();
    const options = { timeZone: "Asia/Kolkata" };
    const ISTDate = currentDate.toLocaleString("en-IN", options);
    const formattedISTDate = ISTDate.replace(/[/:]/g, "_");
    const fileName = `attendance_${formattedISTDate}.xlsx`;
    const data = [
      ["Site", "User Type", "Department", "Month"],
      ["Site 1", "Occupants", "Electrical", "Jan/2022"],
      ["Site 2", "Admin", "Help Desk", "Feb/2022"],
    ];

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "Attendance");

    XLSX.writeFile(wb, fileName);

    onclose();
  };
  const themeColor = useSelector((state)=> state.theme.color)
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white mt-10   p-4 px-8 flex flex-col rounded-md gap-5">
        <button className="place-self-end" onClick={onclose}>
          <AiOutlineClose />
        </button>
        <h1 style={{background:themeColor}} className="text-center font-bold text-white  p-2 rounded-md">
          Export Attendance
        </h1>
        <div>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label htmlFor="" className="font-xl">
                  Site:
                </label>
                <input
                  type="text"
                  className="border p-2 rounded-md placeholder:text-sm"
                  placeholder="Enter Site"
                />
              </div>
              <Selector
                heading={"User Type"}
                subHeading={"Choose User"}
                options={options.user}
              />
              <Selector
                heading={"Department"}
                subHeading={"Choose Department"}
                options={options.user}
              />
              <div>
                <h2 className=" cursor-pointer">Month</h2>

                <input
                  type="month"
                  name=""
                  id=""
                  value={date}
                  onChange={(e) => setDate(e.value)}
                  className="border rounded-md  p-2"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleExport}
            className=" font-semibold mt-10 text-white p-2 rounded-md max-w-sm"
            style={{background: themeColor}}
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
