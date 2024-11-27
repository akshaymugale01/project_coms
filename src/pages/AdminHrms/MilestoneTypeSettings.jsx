import React, { useEffect, useState } from "react";
import OrganisationSetting from "./OrganisationSetting";
import { useSelector } from "react-redux";
import { PiPlusCircle } from "react-icons/pi";
import {
  deleteMilestoneType,
  editMilestoneTypeDetails,
  getMilestoneType,
  getMilestoneTypeDetails,
  postMilestoneType,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import Table from "../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import HRMSHelpCenter from "./HRMSHelpCenter";
import toast from "react-hot-toast";

const MilestoneTypeSettings = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const columns = [
    {
      name: "Name Of Milestone",
      selector: (row) => row.name,
      sortable: true,
      width: "400px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditModal(row.id)}>
            <BiEdit size={15} />
          </button>
          <button
            onClick={() => handleDeleteMileStone(row.id)}
            className="text-red-400"
          >
            <FaTrash size={15} />
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteMileStone = async (id) => {
    try {
      await deleteMilestoneType(id);
      fetchAllTypes();
      toast.success("Milestone type deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const [types, setTypes] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchAllTypes = async () => {
    try {
      const res = await getMilestoneType(hrmsOrgId);
      setTypes(res);
      setFilteredTypes(res);
    } catch (error) {
      console.log(error);
    }
  };
  const [typeId, setTypeId] = useState("");
  const handleEditModal = async (id) => {
    setTypeId(id);
    try {
      const res = await getMilestoneTypeDetails(id);
      setTypeName(res.name);
      setDescription(res.description);
      setShowEditModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllTypes();
  }, []);

  const handleEditType = async () => {
    const editData = new FormData();
    editData.append("name", typeName);
    editData.append("description", description);
    editData.append("organization", hrmsOrgId);
    try {
      const res = await editMilestoneTypeDetails(typeId, editData);
      fetchAllTypes();
      setShowEditModal(false);
      toast.success("Milestone Type created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const [typeName, setTypeName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddMilestoneType = async () => {
    if (!typeName) {
      return toast.success("Please provide Milestone name");
    }
    const postData = new FormData();
    postData.append("name", typeName);
    postData.append("description", description);
    postData.append("organization", hrmsOrgId);
    try {
      const res = await postMilestoneType(postData);
      toast.success("Milestone Type created successfully");
      fetchAllTypes();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredTypes(types);
    } else {
      const filteredResults = types.filter((type) =>
        type.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredTypes(filteredResults)
    }
  };

  return (
    <section className="flex ml-20">
      <OrganisationSetting />
      <div className=" w-full flex m-3 flex-col overflow-hidden">
        <div className=" flex justify-between gap-2 my-2 mt-5">
          <input
            type="text"
            placeholder="Search by name "
            className="border border-gray-400 w-full placeholder:text-sm rounded-lg p-2"
              value={searchText}
              onChange={handleSearch}
          />
          <button
            onClick={() => setShowModal(true)}
            style={{ background: themeColor }}
            className="border-2 font-semibold hover:bg-black text-white duration-150 transition-all p-2 rounded-md cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>
        <Table columns={columns} data={filteredTypes} isPagination={true} />
      </div>
      <HRMSHelpCenter help={"calendar"} />
      {showModal && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-xl w-96">
              <h1 className="text-xl font-medium mb-4 border-b">
                Add Milestone Type
              </h1>
              <div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border rounded-md p-2"
                    placeholder="Enter Milestone name"
                    value={typeName}
                    onChange={(e) => setTypeName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Description
                  </label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                    className="border rounded-md p-2"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-center gap-2 border-t mt-1 p-1 w-full">
                  <button
                    className="border-red-400 border-2 rounded-md  text-red-400 p-2 px-4 w-full"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-400 text-white p-2 px-4 rounded-md w-full"
                    onClick={handleAddMilestoneType}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showEditModal && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-xl w-96">
              <h1 className="text-xl font-medium mb-4 border-b">
                Edit Milestone Type
              </h1>
              <div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border rounded-md p-2"
                    placeholder="Enter Milestone name"
                    value={typeName}
                    onChange={(e) => setTypeName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-medium">
                    Description
                  </label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                    className="border rounded-md p-2"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-center gap-2 border-t mt-1 p-1 w-full">
                  <button
                    className="border-red-400 border-2 rounded-md  text-red-400 p-2 px-4 w-full"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-400 text-white p-2 px-4 rounded-md w-full"
                    onClick={handleEditType}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MilestoneTypeSettings;
