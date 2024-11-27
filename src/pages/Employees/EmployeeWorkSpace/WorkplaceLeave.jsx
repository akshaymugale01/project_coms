import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import EmployeePortal from "../../../components/navbars/EmployeePortal";
import Table from "../../../components/table/Table";
import { BsEye } from "react-icons/bs";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const WorkplaceLeave = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4 cursor-pointer">
          <BsEye onClick={openDetailAdd} />
        </div>
      ),
    },
    {
      name: "Leave Category",
      selector: (row) => row.leave_category,
      sortable: true,
    },
    {
      name: "Opening Balance",
      selector: (row) => row.opening_balance,
      sortable: true,
    },
    {
      name: "Leave Taken",
      selector: (row) => row.leave_taken,
      sortable: true,
    },
    {
      name: "Closing Balance",
      selector: (row) => row.closing_balance,
      sortable: true,
    },
    {
      name: "Leave Status",
      selector: (row) => row.leave_status,
      sortable: true,
    },
    {
      name: "Leave Dates",
      selector: (row) => row.leave_dates,
      sortable: true,
      minWidth: "13rem",
    },
  ];

  const data = [
    {
      id: 1,
      leave_category: "Sick Leave",
      opening_balance: "10",
      leave_taken: "2",
      closing_balance: "8",
      leave_status: "Approved",
      leave_dates: "2024-08-21 to 2024-08-22",
    },
    {
      id: 2,
      leave_category: "Casual Leave",
      opening_balance: "5",
      leave_taken: "1",
      closing_balance: "4",
      leave_status: "Pending",
      leave_dates: "2024-08-25",
    },
    {
      id: 3,
      leave_category: "Annual Leave",
      opening_balance: "15",
      leave_taken: "5",
      closing_balance: "10",
      leave_status: "Rejected",
      leave_dates: "2024-08-10 to 2024-08-14",
    },
    // Add more data entries as needed
  ];
  const themeColor = useSelector((state) => state.theme.color);
  const [addModal, setAddModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const openAdd = () => {
    setAddModal(true);
  };
  const openDetailAdd = () => {
    setDetailModal(true);
  };
  const closeDetailModal = () => {
    setDetailModal(false);
  };
  const close = () => {
    setAddModal(false);
  };
  return (
    <section className="flex">
      <Navbar />
      <div className="p-2 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <EmployeePortal />
        <div className="my-2">
          <div className="w-full flex justify-between my-2 gap-2">
            <input
              type="text"
              name=""
              id=""
              className="border border-gray-400 p-2 rounded-md w-full"
              placeholder="Search by category"
            />
            <button
              className="p-1  text-white rounded-md px-4"
              style={{ background: themeColor }}
              onClick={openAdd}
            >
              Apply
            </button>
          </div>
          <div className="z-50">
           
            {addModal && (
              <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm">
                <div className="bg-white mt-10   p-4 px-8 flex flex-col rounded-md gap-5">
                  {/* <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col h-auto max-h-[80vh] overflow-y-auto z-50"> */}
                  <h2 className="text-2xl font-semibold ">Apply Leave</h2>

                  <div className="grid grid-cols-2 gap-2 ">
                    <div className="flex flex-col ">
                      <label htmlFor="" className="font-medium">
                        Select leave category
                      </label>
                      <select
                        name=""
                        id=""
                        className="border border-gray-400 p-1 rounded-md"
                      >
                        <option value="">Select Category</option>
                        <option value="">Sick leave</option>
                        <option value="">Casual leave</option>
                        <option value="">Annual leave</option>
                      </select>
                    </div>
                    <div className="flex flex-col ">
                      <label htmlFor="" className="font-medium">
                        Select date range
                      </label>
                      <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                          setDateRange(update);
                        }}
                        isClearable={true}
                        placeholderText="Select leave date range"
                        className="p-1 border-gray-300 rounded-md w-full outline-none border"
                      />
                    </div>
                    <div className="flex flex-col ">
                      <label htmlFor="" className="font-medium">
                        Are there any half days?
                      </label>
                      <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <input type="radio" name="half" id="Yes" />
                          <label htmlFor="Yes">Yes</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" name="half" id="no" />
                          <label htmlFor="no">No</label>
                        </div>
                      </div>
                    </div>
                  </div>
                    <div className="flex flex-col ">
                      <label htmlFor="" className="font-medium">
                        Reason for leave
                      </label>
                    <textarea name="" id="" rows={3} placeholder="Enter Reason"   className="p-1 border-gray-300 rounded-md w-full outline-none border" ></textarea>
                    </div>
                    <div className="flex justify-end w-full gap-2">
                      <button className="bg-blue-400 text-white p-1 px-2 w-full rounded-md">
                        Save
                      </button>
                      <button
                        className="bg-red-400 text-white p-1 px-2 w-full rounded-md"
                        onClick={close}
                      >
                        Close
                      </button>
                    </div>
                </div>
              </div>
            )}
            {detailModal && (
              <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm">
                <div className="bg-white mt-10   p-4 px-8 flex flex-col rounded-md gap-5">
                  {/* <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col h-auto max-h-[80vh] overflow-y-auto z-50"> */}
                  <h2 className="text-2xl font-semibold "> Leave Details</h2>

                  <div className="grid  gap-2 ">
                    <div className="grid grid-cols-2 gap-4 w-96">
                      <label htmlFor="" className="font-medium">
                     Leave category :
                      </label>
                    <p className="font-medium text-sm">Sick leave</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-96">
                      <label htmlFor="" className="font-medium">
                     Leave Dates :
                      </label>
                    <p className="font-medium text-sm">2024-08-21 to 2024-08-22</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-96">
                      <label htmlFor="" className="font-medium">
                     Half days :
                      </label>
                    <p className="font-medium text-sm">No</p>
                    </div>
                    
                   
                    <div className="flex flex-col ">
                      <label htmlFor="" className="font-medium">
                        Reason for leave
                      </label>
                   <p className="border bg-gray-100 p-2 rounded-md">Not feeling well</p>
                    </div>
                  </div>
                    <div className="flex justify-end w-full gap-2">
                      
                      <button
                        className="bg-red-400 text-white p-1 px-2 w-full rounded-md"
                        onClick={closeDetailModal}
                      >
                        Close
                      </button>
                    </div>
                </div>
              </div>
            )}
           
          </div>
          <Table columns={columns} data={data} />
        </div>
      </div>
    </section>
  );
};

export default WorkplaceLeave;
