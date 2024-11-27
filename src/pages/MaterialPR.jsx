import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/table/Table";
import { ImEye } from "react-icons/im";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { PiPlusCircle } from "react-icons/pi";

import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getLOI } from "../api";
import { Switch } from "antd";
import Purchase from "./Purchase";
//import Modal from "../containers/modals/Modal";
const MaterialPR = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loi, setLoi] = useState([]);
  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchLoi = async () => {
      try {
        const loiResp = await getLOI();
        const sortedLoi = loiResp.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        const filteredLoi = sortedLoi.filter((loi)=> loi.loi_type === "PR")
        setLoi(filteredLoi);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLoi();
  }, []);
  const dateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const column = [
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/materialpr-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/edit-materialpr/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },

    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "PR No.", selector: (row) => row.pr_no, sortable: true },
    { name: "Ref No.", selector: (row) => row.reference, sortable: true },
    {
      name: "Supplier Name",
      selector: (row) => row.vendor_name,
      sortable: true,
    },
    {
      name: "Created By",
      selector: (row) =>
        `${row.created_by_name.firstname} ${row.created_by_name.lastname}`,
      sortable: true,
    },

    {
      name: "Created On",
      selector: (row) => dateString(row.created_at),
      sortable: true,
    },
    { name: "Last Approved By", selector: (row) => row.desg, sortable: true },
    { name: "Approved Status", selector: (row) => row.is_approved? "Approved": "Pending", sortable: true },
    {
      name: "PR Amount",
      selector: (row) => {
        const totalAmount = row.loi_items
          ? row.loi_items.reduce(
              (sum, item) => sum + (Number(item.total_amount) || 0),
              0
            )
          : " ";
        return totalAmount === 0 ? " " : totalAmount;
      },
      sortable: true,
    },
    { name: "Active/Inactive", selector: (row) => <Switch />, sortable: true },
  ];

  document.title = `Permit - Vibe Connect`;
  return (
    <section className="flex ">
      <Navbar />
      <div className="p-4 w-full flex md:mx-2 overflow-hidden flex-col">
        <Purchase />
        {/* <div className="my-2"> */}
        <div className=" w-full flex mx-2 flex-col overflow-hidden">
          <div className="flex md:flex-row flex-col gap-5 justify-between my-2">
            <input
              type="text"
              placeholder="Search"
              className="border-2 p-2 w-96 border-gray-300 rounded-lg"
            />
            <Link
              to={"/admin/purchase/add-material-pr"}
              style={{ background: themeColor }}
              className=" font-semibold  hover:text-white transition-all text-white p-2 rounded-md  cursor-pointer text-center flex items-center gap-2 justify-center"
              // style={{ height: '1cm' }}
            >
              <PiPlusCircle size={20} />
              Add
            </Link>
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

        <Table columns={column} data={loi} />
      </div>
      {/* </div> */}
    </section>
  );
};

export default MaterialPR;
