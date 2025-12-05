import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { BiEdit } from "react-icons/bi";
import Table from "../../components/table/Table";
import OrganisationSetting from "./OrganisationSetting";
import HRMSHelpCenter from "./HRMSHelpCenter";
import { useSelector } from "react-redux";
import { getMyHRMSEmployees } from "../../api";
import HolidayModal from "./HolidayModal";

const Holiday = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const themeColor = useSelector((state) => state.theme.color);

  const data = [
    {
      Name: "Holi",
      Date: "23/10/2024",
      type: "Mandatory",
      apply: "all",
    },
  ];

  const columns = [
    {
      name: "Holiday Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.Date,
      sortable: true,
    },
    {
      name: "Type Of Holiday",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Applies To",
      selector: (row) => row.apply,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => setIsModalOpen1(true)}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
  ];
  const closeModal = () => setIsModalOpen(false);

  const handleSave = (newHoliday) => {
    setData([...data, newHoliday]);
    closeModal();
  };

  return (
    <section className="flex ml-20">
      <OrganisationSetting />
      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex gap-2 justify-end my-5 w-full">
          <input
            type="month"
            name=""
            id=""
            className="border border-gray-400 w-32 placeholder:text-sm rounded-lg p-2"
          />
          <button
            style={{ background: themeColor }}
            className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
          >
            Download Report
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>
        <Table columns={columns} data={data} isPagination={true} />
      </div>
      <HRMSHelpCenter help={"holiday"} />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-[50rem]">
            <h2 className="text-xl font-bold mb-4">Add Holiday</h2>
            <HolidayModal onSave={handleSave} onClose={closeModal} />
          </div>
        </div>
      )}
      {isModalOpen1 && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-full ">
            <h2 className="text-xl font-bold mb-4">Edit Holiday</h2>
            <HolidayModal
              onSave={handleSave}
              onClose={() => setIsModalOpen1(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Holiday;
