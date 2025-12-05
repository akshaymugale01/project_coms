import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { PiPlusCircle } from "react-icons/pi";
import DataTable from "react-data-table-component";
import { Switch } from "../../Buttons";
import AssetGroupModal from "../../containers/modals/AssetGroupModal";
import AssetSubGroupModal from "../../containers/modals/AssetSubGroupModal";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAssetGroups, getAssetSubGroups, getStockGroupsList, getSubGroupsList } from "../../api";
import Table from "../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import EditAssetGroup from "../../containers/modals/EditAssetGroup";

const AssetGroup = () => {
  const [groupModal, setGroupModal] = useState(false);
  const [subGroupModal, setsubGroupModal] = useState(false);
  const [group, setGroup] = useState([]);
  const [stockGroup, setStockGroup] = useState([])
  const [stockSubGroup, setStockSubGroup] = useState([])
  const [subGroup, setSubGroup] = useState([]);
  const [page,setPage] = useState("asset")
  const [editGroup, setEditGroup] = useState(false)
  const [assetId, setAssetId] = useState("")
  useEffect(() => {
    const fetchGroups = async () => {
      const groupResponse = await getAssetGroups();
      console.log(groupResponse);
      setGroup(groupResponse.data);
    };
    const fetchSubGroups = async () => {
      const subGroupResponse = await getSubGroupsList();
      setSubGroup(subGroupResponse.data);
      console.log(subGroupResponse);
    };
    const fetchStockGroups = async () => {
      const stockGroupResponse = await getStockGroupsList();
      setStockGroup(stockGroupResponse.data);
      console.log(stockGroupResponse);
    };
    fetchStockGroups()
    fetchGroups();
    fetchSubGroups();
  }, []);

  const handleAssetGroupEdit = (id)=>{
    setEditGroup(true)
    setAssetId(id)
  }

  const groupColumns = [
    {
      name: "Sr. No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Group Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          {/* <Link to={`/admin/passes/visitors/visitor-details/${row.id}`}>
            <BsEye size={15} />
          </Link> */}
          <button onClick={()=>handleAssetGroupEdit(row.id)}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
  ];
  const stockGroupColumns = [
    {
      name: "Sr. No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Group Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
   
  ];

  // const groupData = groups.map((group, index) => ({
  //   serial_number: index + 1,
  //   group_name: group,
  // }));
  const subGroupColumns = [
    {
      name: "Sr. No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Group Name",
      selector: (row) => row.group_name,
      sortable: true,
    },
    {
      name: "Sub Group Name",
      selector: (row) => row.name,
      sortable: true,
    },
  ];

  

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "black",
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
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 mb-5 flex-col overflow-hidden">

      <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
          <h2
            className={`p-1 ${
              page === "asset" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("asset")}
          >
            Asset
          </h2>
          <h2
            className={`p-1 ${
              page === "stock" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("stock")}
          >
            Stock
          </h2>
         
        </div>
        <div className="mt-5 flex justify-end items-center gap-4">
          <button
            onClick={() => setGroupModal(true)}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-300 ease-in-out transition-all border-black p-1 px-4 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add Group
          </button>
          <button
            onClick={() => setsubGroupModal(true)}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-300 ease-in-out transition-all border-black p-1 px-4 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add Sub Group
          </button>
        </div>
        {page === "asset" && <div className=" my-2">
          <Table
            columns={groupColumns}
            data={group}
            isPagination={true}
            height={"300px"}
            title={"Groups"}
          />
          <Table
            columns={subGroupColumns}
            data={subGroup}
            isPagination={true}
            height={"300px"}
            title={"Sub Groups"}
          />
        </div>}
        {page === "stock" && <div className=" my-2">
          <Table
            columns={stockGroupColumns}
            data={stockGroup}
            isPagination={true}
            height={"300px"}
            title={"Groups"}
          />
          <Table
            columns={subGroupColumns}
            data={subGroup}
            isPagination={true}
            height={"300px"}
            title={"Sub Groups"}
          />
        </div>}
      </div>
      {groupModal && <AssetGroupModal onclose={() => setGroupModal(false)} />}
      {subGroupModal && (
        <AssetSubGroupModal assetGroup={group} stockGroup={stockGroup} onclose={() => setsubGroupModal(false)} />
      )}
      {editGroup && <EditAssetGroup id={assetId} onclose={()=> setEditGroup(false)} />}
    </section>
  );
};

export default AssetGroup;
