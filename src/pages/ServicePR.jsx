import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/table/Table";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { PiPlusCircle } from "react-icons/pi";
import WO from "./Wo";
import { Link } from "react-router-dom";
import { getServicePR } from "../api";
//import Modal from "../containers/modals/Modal";
const ServicePR = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState("pr");
  const [servicesPr, setServicesPr] = useState([]);
  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchServicePR = async () => {
      try {
        const servicePrResp = await getServicePR();
        setServicesPr(servicePrResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServicePR();
  }, []);

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const column = [
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/servicepr-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/edit-servicepr/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "PR No.", selector: (row) => row.pr, sortable: true },
    { name: "Ref No.", selector: (row) => row.ref, sortable: true },
    { name: "Supplier Name", selector: (row) => row.type, sortable: true },
    { name: "Created By", selector: (row) => row.for, sortable: true },
    {
      name: "Created On",
      selector: (row) => dateFormat(row.created_at),
      sortable: true,
    },
    { name: "Last Approved By", selector: (row) => row.desg, sortable: true },
    { name: "Approved Status", selector: (row) => row.status, sortable: true },
    { name: "PR Amount", selector: (row) => row.total_amount, sortable: true },
    { name: "Active/Inactive", selector: (row) =>
      <div>
        <input type="checkbox" name="" id="" />
      </div>
    },
  ];

  document.title = `Service PR - Vibe Connect`;

  return (
    <section className="flex ">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-center w-full my-2">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-1 sm:rounded-full rounded-md bg-gray-200">
            <h2
              className={`p-1 ${
                page === "pr" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              onClick={() => setPage("pr")}
            >
              Service PR
            </h2>
            <h2
              className={`p-1 ${
                page === "wo" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer transition-all duration-300 ease-linear`}
              onClick={() => setPage("wo")}
            >
              WO
            </h2>
          </div>
        </div>
        {page === "pr" && (
          <div className="flex flex-col w-full">
            <div className=" flex my-3 justify-between flex-col w-full">
              <div className="flex justify-between gap-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-2 p-2 w-96 border-gray-300 rounded-lg"
                />
                <div className="flex items-center gap-3">
                  <Link
                    to={"/admin/add-service-pr"}
                    className="font-semibold  hover:text-white transition-all  p-2 rounded-md cursor-pointer text-center text-white flex items-center w-20 gap-2 justify-center"
                    style={{ background: themeColor }}
                  >
                    <PiPlusCircle size={20} />
                    Add
                  </Link>
                  <button
                    onClick={handleButtonClick}
                    className=" font-semibold  hover:text-white transition-all  p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                    style={{ background: themeColor }}
                  >
                    Filter
                  </button>
                </div>

                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black bg-opacity-50"></div>
                    <div className="bg-white p-5 rounded-md z-50 w-full max-w-md mx-auto">
                      <h2 className="text-xl font-bold mb-4">PR Details</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="font-semibold flex items-center">
                            Reference Number
                          </label>
                          <input
                            type="text"
                            className="border p-2 rounded-md w-full"
                            placeholder="Enter Reference Number"
                          />
                        </div>
                        <div>
                          <label className="font-semibold flex items-center">
                            PR Number
                          </label>
                          <input
                            type="text"
                            className="border p-2 rounded-md w-full"
                            placeholder="Enter PR Number"
                          />
                        </div>
                        <div>
                          <label className="font-semibold flex items-center">
                            Supplier Name
                          </label>
                          <input
                            type="text"
                            className="border p-2 rounded-md w-full"
                            placeholder="Enter Supplier Name"
                          />
                        </div>
                        <div>
                          <label className="font-semibold flex items-center">
                            Approval Status
                          </label>

                          <select className="border p-2 rounded-md w-full">
                            <option value="">Select Status</option>
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={closeModal}
                          className="bg-red-500 text-white p-2 rounded-md mr-2"
                        >
                          Close
                        </button>
                        <button className="bg-blue-500 text-white p-2 rounded-md">
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Table
              columns={column}
              data={servicesPr}
              //   customStyles={customStyle}
              responsive
            />
          </div>
        )}
        {page === "wo" && <WO />}
      </div>
    </section>
  );
};

export default ServicePR;
