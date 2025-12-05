import React, { useState } from "react";
import PayrollSettingDetailsList from "./PayrollSettingDetailsList";
import Table from "../../components/table/Table";
import { PiPlusCircle } from "react-icons/pi";
import { GrHelpBook } from "react-icons/gr";

const PF = () => {
  const [LIN, setLIN] = useState("");
  const [isESIC, setIsESIC] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const [isEditing, setIsEditing] = useState(false);

  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const data = [
    {
      Name: "Mittu Panda",
      applicable: "yes",
    },
  ];
  const columns = [
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Allowances Applicable",
      selector: (row) => row.applicable,
      sortable: true,
    },
  ];
  return (
    <div className="flex gap-4 ml-20">
      <PayrollSettingDetailsList />

      <div className="w-2/3 p-8 bg-white rounded-lg">
        {/* <h2 className="text-2xl font-bold mb-6">PF Settings</h2> */}
        {/* <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6">PF Settings</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">
            Is your company elgible for Gratuity?
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              name="esic"
              checked={isESIC}
              onChange={() => setIsESIC(true)}
              className="mr-2"
              disabled={!isEditing}
            />{" "}
            Yes
            <input
              type="radio"
              name="esic"
              checked={!isESIC}
              onChange={() => setIsESIC(false)}
              className="ml-4 mr-2"
              disabled={!isEditing}
            />{" "}
            No
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            PF Admin Charge (% rate)
          </label>
          <input
            type="text"
            value="0.5%"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              !isEditing ? "bg-gray-200" : ""
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            PF EDLI Charge (% rate)
          </label>
          <input
            type="text"
            value="0.5%"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              !isEditing ? "bg-gray-200" : ""
            }`}
          />
        </div> */}
        <p className="font-bold mt-8 mb-4">PF Templates</p>
        <div className="flex justify-end mb-1">
          <button
            onClick={openModal}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add Template
          </button>
        </div>
        <Table columns={columns} data={data} isPagination={true} />
        {modalIsOpen && (
          <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
            <div class="max-h-screen h-30 bg-white p-8 w-96 rounded-lg shadow-lg overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Add New PF Template</h2>
              <form>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    What is the label *
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    What are the allowances applicable for PF deduction *
                  </label>
                  <select
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">HRA</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black mr-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold p-2 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col shadow-custom-all-sides bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium">
            <GrHelpBook size={20} />
            <h2>Help Center</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PF;
