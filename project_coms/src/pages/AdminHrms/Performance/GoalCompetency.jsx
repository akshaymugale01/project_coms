import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaCheck, FaTrash } from "react-icons/fa";
import { PiPlus } from "react-icons/pi";
import { useSelector } from "react-redux";
import {
  deletePerformanceCompetency,
  deletePerformanceGoal,
  editPerformanceCompetencyDetails,
  editPerformanceGoalDetails,
  getPerformanceCompetency,
  getPerformanceCompetencyDetails,
  getPerformanceGoal,
  getPerformanceGoalDetails,
  postPerformanceCompetency,
  postPerformanceGoal,
} from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import Table from "../../../components/table/Table";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { dateTimeFormat } from "../../../utils/dateUtils";

const GoalCompetency = () => {
  const themeColor = useSelector((state) => state.theme.color);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddComModal, setShowAddComModal] = useState(false);
  const handleModalClose = () => {
    setShowAddModal(false);
    setIsEditing(false);
    setGoalCategory("");
  };
  const handleComModalClose = () => {
    setShowAddComModal(false);
    setIsComEditing(false);
    setCompetencyCategory("");
  };
  const columns = [
    {
      name: "Category Name",
      sortable: true,
      selector: (row) => row.category,
      title: (row) => {
        row.category;
      },
    },
    {
      name: "Created by",
      sortable: true,
      selector: (row) => row.created_by,
    },
    {
      name: "Updated on",
      sortable: true,
      selector: (row) => dateTimeFormat(row.updated_at),
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => (
        <p
          className={`font-medium ${
            row.status === "Active" ? "text-green-400" : "text-red-400"
          }`}
        >
          {row.status}
        </p>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditGoalModal(row.id)}>
            <BiEdit />
          </button>
          <button
            onClick={() => handleDeleteGoal(row.id)}
            className="text-red-400"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];
  const competencyColumns = [
    {
      name: "Category Name",
      sortable: true,
      selector: (row) => row.category,
    },
    {
      name: "Created by",
      sortable: true,
      selector: (row) => row.created_by,
    },
    {
      name: "Updated on",
      sortable: true,
      selector: (row) => dateTimeFormat(row.updated_at),
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => (
        <div>
          <p
            className={`font-medium ${
              row.status === "Active" ? "text-green-400" : "text-red-400"
            }`}
          >
            {row.status}
          </p>
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditComModal(row.id)}>
            <BiEdit />
          </button>
          <button
            onClick={() => handleDeleteCompetency(row.id)}
            className="text-red-400"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];
  const [isEditing, setIsEditing] = useState(false);
  const [GoalId, setGoalId] = useState("");

  const handleEditGoalModal = async (id) => {
    setGoalId(id);
    try {
      const res = await getPerformanceGoalDetails(id);
      setGoalCategory(res.category);
      setGoalStatus(res.status);
      setShowAddModal(true);
      setIsEditing(true);
    } catch (error) {
      console.log(error);
    }
  };
  const [isComEditing, setIsComEditing] = useState(false);
  const [comId, setComId] = useState("");

  const handleEditComModal = async (id) => {
    setComId(id);
    try {
      const res = await getPerformanceCompetencyDetails(id);
      setCompetencyCategory(res.category);
      setShowAddComModal(true);
      setIsComEditing(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await deletePerformanceGoal(id);
      fetchPerformanceGoal();
      toast.success("Category deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCompetency = async (id) => {
    try {
      await deletePerformanceCompetency(id);
      fetchPerformanceCompetency();
      toast.success("Category deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const [filteredGoals, setFilteredGoals] = useState([]);
  const [filteredCompetency, setFilteredCompetency] = useState([]);
  const [competency, setCompetency] = useState([]);
  const [Goals, setGoals] = useState([]);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchPerformanceGoal = async () => {
    try {
      const res = await getPerformanceGoal(hrmsOrgId);
      setFilteredGoals(res);
      setGoals(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPerformanceCompetency = async () => {
    try {
      const res = await getPerformanceCompetency(hrmsOrgId);
      setFilteredCompetency(res);
      setCompetency(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPerformanceGoal();
    fetchPerformanceCompetency();
  }, []);
  const [goalCategory, setGoalCategory] = useState("");
  const [goalStatus, setGoalStatus] = useState("Active");
  const handleAddGoalCategory = async () => {
    if (!goalCategory) {
      return toast.error("Please enter Category name");
    }
    const postData = new FormData();
    postData.append("category", goalCategory);
    postData.append("status", goalStatus);
    postData.append("organization", hrmsOrgId);
    try {
      if (isEditing) {
        const res = await editPerformanceGoalDetails(GoalId, postData);
        setShowAddModal(false);
        fetchPerformanceGoal();
        setGoalCategory("");
        setIsEditing(false);
        toast.success("Category name updated successfully");
      } else {
        const res = await postPerformanceGoal(postData);
        setShowAddModal(false);
        fetchPerformanceGoal();
        setGoalCategory("");
        toast.success("Category name created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [competencyCategory, setCompetencyCategory] = useState("");
  const [comStatus, setComStatus] = useState("Active");
  const handleAddCompetencyCategory = async () => {
    if (!competencyCategory) {
      return toast.error("Please enter Category name");
    }
    const postData = new FormData();
    postData.append("category", competencyCategory);
    postData.append("status", comStatus);
    postData.append("organization", hrmsOrgId);

    try {
      if (isComEditing) {
        const res = await editPerformanceCompetencyDetails(comId, postData);
        setShowAddComModal(false);
        fetchPerformanceCompetency();
        setCompetencyCategory("");
        toast.success("Category name updated successfully");
        setIsComEditing(false);
      } else {
        const res = await postPerformanceCompetency(postData);
        setShowAddComModal(false);
        fetchPerformanceCompetency();
        setCompetencyCategory("");
        toast.success("Category name created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [searchGoalText, setSearchGoalText] = useState("");
  const handleSearchGoal = (e) => {
    const searchValue = e.target.value;
    setSearchGoalText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredGoals(Goals);
    } else {
      const filteredResult = Goals.filter((items) =>
        items.category.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredGoals(filteredResult);
    }
  };
  const [searchComText, setSearchComText] = useState("");
  const handleSearchCom = (e) => {
    const searchValue = e.target.value;
    setSearchComText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredCompetency(competency);
    } else {
      const filteredResult = competency.filter((items) =>
        items.category.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCompetency(filteredResult);
    }
  };

  return (
    <div className="mb-5">
      <div>
        <h2 className="font-semibold mt-4">Goal Categories</h2>
        <div className="flex justify-between my-2 gap-2">
          <input
            type="text"
            value={searchGoalText}
            onChange={handleSearchGoal}
            id=""
            className="border border-gray-300 rounded-md w-full p-1"
            placeholder="Search by category name"
          />
          <button
            onClick={() => setShowAddModal(true)}
            style={{ background: themeColor }}
            className="p-2 text-white rounded-md flex items-center gap-2 px-2"
          >
            <PiPlus /> Goal{" "}
          </button>
        </div>
        <div>
          <Table columns={columns} data={filteredGoals} />
        </div>
        {showAddModal && (
          <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">Add Category</h2>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-medium">
                  Category <span className="text-red-500">*</span>{" "}
                </label>
                <input
                  type="text"
                  className="p-2 rounded-md border border-gray-300"
                  placeholder="Enter Category"
                  value={goalCategory}
                  onChange={(e) => setGoalCategory(e.target.value)}
                />
              </div>
              {isEditing && (
                <div className="mt-2">
                  <label htmlFor="" className="font-medium">
                    Status
                  </label>
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name=""
                        id=""
                        checked={goalStatus === "Active"}
                        onChange={() => setGoalStatus("Active")}
                      />
                      <label htmlFor="">Active</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name=""
                        id=""
                        checked={goalStatus === "Inactive"}
                        onChange={() => setGoalStatus("Inactive")}
                      />
                      <label htmlFor="">Inactive</label>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-end mt-5 border-t p-1">
                <button
                  onClick={handleModalClose}
                  className="border-2 font-semibold hover:bg-gray-700 flex items-center gap-2 hover:text-white duration-150 transition-all border-gray-700 p-1 rounded-full px-4 text-gray-700 cursor-pointer mr-2"
                >
                  <MdClose /> Cancel
                </button>
                <button
                  onClick={handleAddGoalCategory}
                  className="border-2 font-semibold hover:bg-blue-700 flex items-center gap-2 hover:text-white duration-150 transition-all border-blue-700 p-1 rounded-full px-4 text-blue-700 cursor-pointer"
                >
                  <FaCheck /> Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <h2 className="font-semibold">Competency Bank</h2>
        <div className="flex justify-between my-2 gap-2">
          <input
            type="text"
            name=""
            value={searchComText}
            onChange={handleSearchCom}
            id=""
            className="border border-gray-300 rounded-md w-full p-1"
            placeholder="Search by category name"
          />
          <button
            onClick={() => setShowAddComModal(true)}
            style={{ background: themeColor }}
            className="p-2 text-white rounded-md flex items-center gap-2 px-2"
          >
            <PiPlus /> Competency{" "}
          </button>
        </div>
        <div>
          <Table columns={competencyColumns} data={filteredCompetency} />
        </div>
        {showAddComModal && (
          <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">Add Category</h2>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-medium">
                  Category <span className="text-red-500">*</span>{" "}
                </label>
                <input
                  type="text"
                  className="p-2 rounded-md border border-gray-300"
                  placeholder="Enter Category"
                  value={competencyCategory}
                  onChange={(e) => setCompetencyCategory(e.target.value)}
                />
              </div>
              {isComEditing && (
                <div className="mt-2">
                  <label htmlFor="" className="font-medium">
                    Status
                  </label>
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name=""
                        id=""
                        checked={comStatus === "Active"}
                        onChange={() => setComStatus("Active")}
                      />
                      <label htmlFor="">Active</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name=""
                        id=""
                        checked={comStatus === "Inactive"}
                        onChange={() => setComStatus("Inactive")}
                      />
                      <label htmlFor="">Inactive</label>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-end mt-5 border-t p-1">
                <button
                  onClick={handleComModalClose}
                  className="border-2 font-semibold hover:bg-gray-700 flex items-center gap-2 hover:text-white duration-150 transition-all border-gray-700 p-1 rounded-full px-4 text-gray-700 cursor-pointer mr-2"
                >
                  <MdClose /> Cancel
                </button>
                <button
                  onClick={handleAddCompetencyCategory}
                  className="border-2 font-semibold hover:bg-blue-700 flex items-center gap-2 hover:text-white duration-150 transition-all border-blue-700 p-1 rounded-full px-4 text-blue-700 cursor-pointer"
                >
                  <FaCheck /> Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalCompetency;
