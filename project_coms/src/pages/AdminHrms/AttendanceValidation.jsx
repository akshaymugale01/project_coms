import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Table from "../../components/table/Table";
import AdminHRMS from "./AdminHrms";
import { GrHelpBook } from "react-icons/gr";

const AttendanceValidation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const columns = [
    {
      name: "Generated At",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const data = [
    {
      Name: "person 1",
      Location: "11-07-2024 08-07-2024",
      Label: "07-07-2024",
      status: "Completed",
      Country: "India",
    },
  ];

  const handleRunValidation = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    setIsModalOpen(false);
  };

  return (
    <section className="flex ml-20">
      <AdminHRMS />
      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex justify-between my-5">
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
          />
          <button
            onClick={handleRunValidation}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Run Validation
          </button>
        </div>
        <Table columns={columns} data={data} isPagination={true} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Biometric Validation</h2>
            <div className="mb-4">
              <label className="block mb-1">Start Date *</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-400 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">End Date *</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-400 rounded-lg p-2 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleModalClose}
                className="border-2 border-gray-400 rounded-lg p-2 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white rounded-lg p-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium">
            <GrHelpBook size={20} />
            <h2>Help Center</h2>
          </div>
          <div className=" ">
            {/* <p className="font-medium">Help Center</p> */}
            <ul style={listItemStyle} className="flex flex-col gap-2">
              <li>
                <ul style={listItemStyle}>
                  <li>
                    The system automatically performs daily checks for the
                    current date, noting instances such as Present, Absent,
                    Half-days, Late Arrivals, Early Departures, Leaves etc based
                    on check-in/check-out times.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    In case there are updates to Attendance Policy,
                    Shift/Roster, Biometric Sync, etc., that apply
                    retrospectively, administrators must manually validate
                    attendance for previous dates to ensure these changes are
                    correctly reflected.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Administrators can validate attendance for a maximum period
                    of 30 days at once.{" "}
                  </li>
                </ul>
              </li>

              <li>
                <p>
                  For additional information, please Click Here{" "}
                  <a href="#" className="text-blue-400">
                    Click Here{" "}
                  </a>{" "}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendanceValidation;
