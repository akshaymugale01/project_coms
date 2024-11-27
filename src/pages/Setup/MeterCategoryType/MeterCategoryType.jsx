import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Table from "../../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import Navbar from "../../../components/Navbar";
import AddGroupMeterCategoryTypeModal from "./AddGroupMeterCategoryTypeModal";
import EditGroupMeterCategoryTypeModal from "./EditGroupMeterCategoryTypeModal";
import AddSubGroupMeterCategoryTypeModal from "./AddSubGroupMeterCategoryTypeModal";
import EditSubGroupMeterCategoryTypeModal from "./EditSubGroupMeterCategoryTypeModal";
import AddSubSubGroupMeterCategoryTypeModal from "./AddSubSubGroupMeterCategoryTypeModal";
import EditSubSubGroupMeterCategoryTypeModal from "./EditSubSubGroupMeterCategoryTypeModal";
import { useSelector } from "react-redux";

function MeterCategoryType() {
  const [addGroupModal, setAddGroupModal] = useState(false);
  const [editGroupModal, setEditGroupModal] = useState(false);
  const [addSubGroupModal, setAddSubGroupModal] = useState(false);
  const [editSubGroupModal, setEditSubGroupModal] = useState(false);
  const [addSubSubGroupModal, setAddSubSubGroupModal] = useState(false);
  const [editSubSubGroupModal, setEditSubSubGroupModal] = useState(false);
  const themeColor = useSelector((state) => state.theme.color);
  const meterColumns = [
    {
      name: "Sr. No",
      selector: (row, index) => row.srNo,
      sortable: true,
    },
    {
      name: "Group Name",
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: "Description",
    //   selector: (row) => row.description,
    //   sortable: true,
    // },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => setEditGroupModal(!editGroupModal)}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
  ];

  const meterData = [
    {
      srNo: 1,
      name: "Board",
    },
    {
      srNo: 2,
      name: "DG",
    },
    {
      srNo: 3,
      name: "Renewable",
    },
    {
      srNo: 4,
      name: "Fresh Water",
    },
    {
      srNo: 5,
      name: "Recycled",
    },
  ];

  const subMeterColumns = [
    {
      name: "Sr. No",
      selector: (row, index) => row.srNo,
      sortable: true,
    },
    {
      name: "Group Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Sub Group Name",
      selector: (row) => row.subGroupName,
      sortable: true,
    },
    // {
    //   name: "Description",
    //   selector: (row) => row.description,
    //   sortable: true,
    // },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => setEditSubGroupModal(!editSubGroupModal)}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
  ];

  const subMeterData = [
    {
      srNo: 1,
      name: "Board",
      subGroupName: "HT",
    },
    {
      srNo: 2,
      name: "Board",
      subGroupName: "VCB",
    },
    {
      srNo: 3,
      name: "Board",
      subGroupName: "Transformer",
    },
    {
      srNo: 4,
      name: "Board",
      subGroupName: "LT",
    },
    {
      srNo: 5,
      name: "DG",
      subGroupName: "Solar",
    },
    {
      srNo: 6,
      name: "DG",
      subGroupName: "Bio Methanol",
    },
    {
      srNo: 7,
      name: "DG",
      subGroupName: "Wind",
    },
    {
      srNo: 8,
      name: "Fresh Water",
      subGroupName: "Source (Input)",
    },
    {
      srNo: 9,
      name: "Fresh Water",
      subGroupName: "Destination (Output)",
    },
  ];
  const subSubMeterColumns = [
    {
      name: "Sr. No",
      selector: (row, index) => row.srNo,
      sortable: true,
    },
    {
      name: "Group Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Sub Group Name",
      selector: (row) => row.subGroupName,
      sortable: true,
    },
    {
      name: "Sub Sub Group Name",
      selector: (row) => row.subSubGroupName,
      sortable: true,
    },
    // {
    //   name: "Description",
    //   selector: (row) => row.description,
    //   sortable: true,
    // },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button
            onClick={() => setEditSubSubGroupModal(!editSubSubGroupModal)}
          >
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
  ];

  const subSubMeterData = [
    {
      srNo: 1,
      name: "Fresh Water",
      subGroupName: "Source (Input)",
      subSubGroupName: "Municipal Corporation",
    },
    {
      srNo: 2,
      name: "Fresh Water",
      subGroupName: "Source (Input)",
      subSubGroupName: "Tanker",
    },
    {
      srNo: 3,
      name: "Fresh Water",
      subGroupName: "Source (Input)",
      subSubGroupName: "Borewell",
    },
    {
      srNo: 4,
      name: "Fresh Water",
      subGroupName: "Source (Input)",
      subSubGroupName: "Rainwater",
    },
  ];
  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col w-full overflow-hidden px-5">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold p-2 rounded-full text-white my-5"
        >
          Meter Category Type
        </h2>
        <div className="py-3">
          <div className="mt-5 flex justify-between items-center gap-4">
            <h2 className="font-medium my-3 text-xl">Category Type</h2>
            <button
              className="border-2 font-semibold  p-1 px-4 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
              onClick={() => setAddGroupModal(!addGroupModal)}
              style={{ background: themeColor }}
            >
              <PiPlusCircle size={20} />
              Add Category Type
            </button>
          </div>
          <Table columns={meterColumns} data={meterData} isPagination={true} />
        </div>
        <div className="py-3">
          <div className="mt-5 flex justify-between items-center gap-4">
            <h2 className="font-medium my-3 text-xl">Sub Category Type</h2>
            <button
              className="border-2 font-semibold  p-1 px-4 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
              onClick={() => setAddSubGroupModal(!addSubGroupModal)}
              style={{ background: themeColor }}
            >
              <PiPlusCircle size={20} />
              Add Sub Category Type
            </button>
          </div>
          <Table
            columns={subMeterColumns}
            data={subMeterData}
            isPagination={true}
          />
        </div>
        <div className="py-3">
          <div className="mt-5 flex justify-between items-center gap-4">
            <h2 className="font-medium my-3 text-xl">Sub Sub Meter Type Category</h2>
            <button
              className="border-2 font-semibold  p-1 px-4 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
              onClick={() => setAddSubSubGroupModal(!addSubSubGroupModal)}
              style={{ background: themeColor }}
            >
              <PiPlusCircle size={20} />
              Add Sub Sub Category Type
            </button>
          </div>
          <Table
            columns={subSubMeterColumns}
            data={subSubMeterData}
            isPagination={true}
          />
        </div>
      </div>
      {addGroupModal && (
        <AddGroupMeterCategoryTypeModal
          onclose={() => setAddGroupModal(false)}
        />
      )}
      {editGroupModal && (
        <EditGroupMeterCategoryTypeModal
          onclose={() => setEditGroupModal(false)}
        />
      )}
      {addSubGroupModal && (
        <AddSubGroupMeterCategoryTypeModal
          onclose={() => setAddSubGroupModal(false)}
        />
      )}
      {editSubGroupModal && (
        <EditSubGroupMeterCategoryTypeModal
          onclose={() => setEditSubGroupModal(false)}
        />
      )}
      {addSubSubGroupModal && (
        <AddSubSubGroupMeterCategoryTypeModal
          onclose={() => setAddSubSubGroupModal(false)}
        />
      )}
      {editSubSubGroupModal && (
        <EditSubSubGroupMeterCategoryTypeModal
          onclose={() => setEditSubSubGroupModal(false)}
        />
      )}
    </div>
  );
}

export default MeterCategoryType;
