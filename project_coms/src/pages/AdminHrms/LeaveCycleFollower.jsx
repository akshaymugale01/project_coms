import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";

const LeavecycleFollower = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const columns = [
    {
      name: "view",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link
          //  to={`/admin/hrms-tasks-details/${row.id}`}
           >
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "ROLLOVER DATE",
      selector: (row) => row.Date,
      sortable: true,
    },
    {
      name: "RUN DATE",
      selector: (row) => row.Requested_Timings,
      sortable: true,
    },
    {
      name: "NO OF EMPLOYEES PROCESSED",
      selector: (row) => row.actual,
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
      Reason: "hj",
      Requested_Timings: "09:30 AM",
      actual: "11:30 AM",
      Date: "23/10/2024",
      Comment: "abc",
      status: "Upcoming",
    },
    {
      Name: "person 1",
      Reason: "hj",
      Requested_Timings: "09:30 AM",
      actual: "11:30 AM",
      Date: "23/10/2024",
      Comment: "abc",
      status: "Upcoming",
    },
  ];

  return (
    <section className="flex">
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-between my-2">
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
          />
          <button
            onClick={openModal}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Generate Rollover
          </button>
        </div>
        <Table columns={columns} data={data} isPagination={true} />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4 text-center">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-headline">
                    Generate Rollover
                    </h3>
                    <div className="flex justify-start gap-4 my-5">
                      <label htmlFor="">Effective Date of Rollover *</label>
                      <input type="date"  className="border border-gray-400 p-2 rounded-md"/>
                    </div>
                  </div>
                </div>
                <p className="text-red-800">Warning: Only run the rollover at the end of your annual leave cycle. Once the rollover is run, all balances are updated, and the changes cannot be reversed.</p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LeavecycleFollower;