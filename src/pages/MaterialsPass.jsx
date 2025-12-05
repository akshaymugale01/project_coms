import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
//import Navbar from "../../../components/Navbar";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
// import MaterialsModal from "../../containers/modals/MaterialsModal";
import { IoAddCircleOutline } from "react-icons/io5";
import Table from "../components/table/Table";
import MaterialsModal from "../containers/modals/MaterialsModal";

const MaterialPass = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);
  const [modal, showModal] = useState(false);

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/material-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/edit-material/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Person Name",
      selector: (row) => row.person_name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "No. of Items",
      selector: (row) => row.items,
      sortable: true,
    },

    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Vehicle Number",
      selector: (row) => row.v_number,
      sortable: true,
    },
    {
      name: "Created By",
      selector: (row) => row.createby,
      sortable: true,
    },
    {
      name: "Created on",
      selector: (row) => row.createon,
      sortable: true,
    },
    {
      name: "Attachments",
      selector: (row) => row.attachments,
      sortable: true,
    },
    {
      name: "Cancellation",
      selector: (row) =>
        row.status === "Upcoming" && (
          <button className="text-red-400 font-medium">Cancel</button>
        ),
      sortable: true,
    },
    {
      name: "Approval",
      selector: (row) =>
        row.status === "Upcoming" && (
          <div className="flex justify-center gap-2">
            <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full">
              <TiTick size={20} />
            </button>
            <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full">
              <IoClose size={20} />
            </button>
          </div>
        ),
      sortable: true,
    },
  ];

  //custom style
  const customStyle = {
    headRow: {
      style: {
        backgroundColor: themeColor,
        color: "white",

        fontSize: "10px",
      },
    },
    headCells: {
      style: {
        textTransform: "upperCase",
      },
    },
  };
  const data = [
    {
      id: 1,
      person_name: "Mittu",
      type: "abc",
      items: "05",
      description: "ABG",
      v_number: "890",
      createby: "JKL",
      createon: "IOP",
      attachments: "YU",
    },
    {
      id: 2,
      person_name: "Mittu",
      type: "abc",
      items: "05",
      description: "ABG",
      v_number: "890",
      createby: "JKL",
      createon: "IOP",
      attachments: "YU",
    },
    {
      id: 3,
      person_name: "Mittu",
      type: "abc",
      items: "05",
      description: "ABG",
      v_number: "890",
      createby: "JKL",
      createon: "IOP",
      attachments: "YU",
    },
  ];

  return (
    <section className="flex">
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex md:flex-row flex-col gap-5 justify-between mt-10 my-2">
          <div className="sm:flex grid grid-cols-2 items-center justify-center  gap-4 border border-gray-300 rounded-md px-3 p-2 w-auto">
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
                id="upcomming"
                name="status"
                // checked={selectedStatus === "open"}
                checked={
                  selectedStatus === "upcomming" ||
                  selectedStatus === "upcomming"
                }
                // onChange={() => handleStatusChange("open")}
              />
              <label htmlFor="open" className="text-sm">
                upcomming
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="completed"
                name="status"
                checked={selectedStatus === "completed"}
                onChange={() => handleStatusChange("completed")}
              />
              <label htmlFor="completed" className="text-sm">
                Completed
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="cancelled"
                name="status"
                checked={selectedStatus === "cancelled"}
                //   onChange={() => handleStatusChange("cancelled")}
              />
              <label htmlFor="completed" className="text-sm">
                Cancelled
              </label>
            </div>
          </div>
          <div>
            <div className="flex gap-4 justify-end w-full">
              <button
                className="bg-black w-20 rounded-lg flex font-semibold items-center gap-2 text-white p-2"
                onClick={() => showModal(true)}
              >
                <IoAddCircleOutline size={20} />
                Add
              </button>
            </div>
          </div>
        </div>
        <Table columns={columns} data={data} isPagination={true} />
      </div>
      {modal && <MaterialsModal onclose={()=> showModal(false)} />}
    </section>
  );
};

export default MaterialPass;
