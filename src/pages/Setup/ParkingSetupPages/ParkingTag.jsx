import React, { useState } from "react";
//import Navbar from "../components/Navbar";
import Table from "../../../components/table/Table";

import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";

import ToggleSwitch from "../../../Buttons/ToggleSwitch";
//import Modal from "../containers/modals/Modal";
const ParkingTag = () => {
  const themeColor = useSelector((state)=> state.theme.color)

  const [tableData, setTableData] = useState([
    {
      id: 1,
      active: true,
      tname: "Urgent",
      tag_type: "others",
      MOM: true,
      Task: true,
      color: "#ffffff",
    },
  ]);
  const [createData, setCreateData] = useState({
  tname: "",
  tag_type: "",
  color: "",
  MOM: false,
  Task: false,
});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({});

    const openModal = (row) => {
      setSelectedRow(row);
      setFormData({ ...row });;
      setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    const handleChange = (e) => {
  const { id, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [id]: type === "checkbox" ? checked : value,
  }));
};
  const column = [
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-4">

          <button onClick={() => openModal(row)}>
            <BiEdit size={15} />
          </button>
           
        </div>
      ),

    },
    { name: "ID", selector: (row) => row.id, sortable: true },

    { name: "Active/Inactive", selector: (row) => row.active, sortable: true },
    { name: "Company Tag Name", selector: (row) => row.tname, sortable: true },
    { name: "Tag Type", selector: (row) => row.tag_type, sortable: true },
    { name: "MOM", selector: (row) => row.MOM, sortable: true },
    { name: "Task", selector: (row) => row.Task, sortable: true },
    { name: "Tag Colour", selector: (row) => row.color, sortable: true },

  ];
  

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: themeColor,
        color: "white",

        fontSize: "14px",
      },
    },
  };
  document.title = `Permit - My Citi Life`;
  const handleUpdate = () => {
  setTableData((prev) =>
    prev.map((item) =>
      item.id === selectedRow.id ? formData : item
    )
  );
  closeModal();
};
  return (
    <section className="flex ">
      {/* <Navbar /> */}
      <div className="w-full flex mx-3 flex-col overflow-hidden">

        <div className=" flex m-3 flex-row">
          <div className="flex gap-1 items-center flex-col">
            <label htmlFor="" className="font-semibold">Company Tag Name</label>
            <input
              type="text"
              placeholder="Enter Tag Name"
              className="border-2 p-2  border-gray-300 rounded-lg"
            />
            </div>
            <div className="flex gap-1 items-center flex-col">
            <label htmlFor="" className="font-semibold">Tag Type*</label>
            <select
              type="text"
              placeholder="Enter Tag Type"
              className="border-2 p-2 w-48 ml-2 border-gray-300 rounded-lg"
            />
            </div>
            <div className="ml-6">
         <label htmlFor="" className="font-semibold">Tag Color</label>
         <select name="" id="" className="border border-gray-400 p-2 rounded-md w-full">
          <option value="">Category1</option>
          <option value="">Category2</option>
         </select>
         </div>
            <div>
                <input
  type="checkbox"
  id="MOM"
  checked={formData.MOM || false}
  onChange={handleChange}
  className="ml-2"
/>
                <label htmlFor="" className="font-semibold ml-2">MOM</label>
            </div>
            <div>
                <input
  type="checkbox"
  id="Task"
  checked={formData.Task || false}
  onChange={handleChange}
  className="ml-4"
/>
                <label htmlFor="" className="font-semibold ml-2">Task</label>
            </div>
           {/* <button
                // to={"/admin/addnewpermit"}
                className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ height: '1cm' }}
            >
                <PiPlusCircle size={20} />
                Submit
            </button> */}



          </div>
          <Table
              columns={column}
              data={tableData}
              // customStyles={customStyle}
              responsive

              fixedHeader
              fixedHeaderScrollHeight="500px"
              pagination
              selectableRowsHighlight
              highlightOnHover
              
            />
            {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
          <div className="bg-white w-[400px] h-[400px] rounded-lg shadow-lg p-4 relative z-10">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              &times;
</button>

<h2 className="text-xl font-semibold mb-4">Edit Tag</h2>

<form>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      Company Tag Name*
    </label>

    <input
  id="tname"
  type="text"
  value={formData.tname || ""}
  onChange={handleChange}
  className="shadow appearance-none border rounded w-full py-2 px-3"
/>
  </div>

  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      Tag Type*
    </label>
                <select
  id="tag_type"
  value={formData.tag_type || ""}
  onChange={handleChange}
  className="shadow appearance-none border rounded w-full py-2 px-3"
>
  <option value="others">Others</option>
  <option value="important">Important</option>
</select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Tag Colour*
                </label>
                <select
  id="color"
  value={formData.color || ""}
  onChange={handleChange}
  className="shadow appearance-none border rounded w-full py-2 px-3"
>
  <option value="#ffffff">White</option>
  <option value="#ff0000">Red</option>
  <option value="#00ff00">Green</option>
</select>
              </div>
              <div>
                <input type="checkbox" className="ml-2"/>
                <label htmlFor="" className="font-semibold ml-2"><b>MOM</b></label>
                <input type="checkbox" className="ml-4"/>
                <label htmlFor="" className="font-semibold ml-2"><b>Task</b></label>
            </div>
            <div><br /></div>
              <div className="flex items-center justify-between">
                <button
  type="button"
  onClick={handleUpdate}
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Update
</button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>

    </section>
  );
};

export default ParkingTag;