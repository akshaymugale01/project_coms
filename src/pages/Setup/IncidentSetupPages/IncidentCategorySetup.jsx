import React, { useCallback, useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import Table from "../../../components/table/Table";
import { RiDeleteBinLine } from "react-icons/ri";
import IncidentSetCategoryModal from "../../../containers/modals/IncidentSetupModal.jsx/IncidentSetupCatModal";
import { PiPlusCircle } from "react-icons/pi";
import { MdClose } from "react-icons/md";
import { FaCheck, FaTrash } from "react-icons/fa";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import {
  deleteIncidentTags,
  getIncidentSubTags,
  getIncidentTags,
  getIncidentTreeNode,
  postIncidentTags,
} from "../../../api";
import toast from "react-hot-toast";
// import Tree from "./IncidentTree";
// import TreeNode from "./IncidentTree";
import TreeNode from "./incidentTree";

const IncidentCategorySetup = () => {
  const [modal, showModal] = useState(false);

  const [CatId, setCatId] = useState("");
  const handleDeleteCategory = async (id) => {
    try {
      await deleteIncidentTags(id);
      toast.success("Category deleted successfully");
      fetchIncidentCategory();
    } catch (error) {
      console.log(error);
    }
  };

  const [addCategory, setAddCategory] = useState(false);
  const [cat, SetCat] = useState("");
  const companyId = getItemInLocalStorage("COMPANYID");
  const handleAddCategory = async () => {
    const payload = {
      name: cat,
      active: true,
      // "parent_id": null,
      tag_type: "IncidentCategory",
      resource_id: companyId,
      resource_type: "Pms::CompanySetup",
      // "comment": "Covers all types of plumbing problems."
    };
    try {
      const res = await postIncidentTags(payload);
      toast.success("Incident Category Created successfully!");
      fetchIncidentCategory();
      fetchCategoryTree();
      SetCat("");
      setAddCategory(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [categories, setCategories] = useState([]);
  const fetchIncidentCategory = useCallback(async () => {
    try {
      const res = await getIncidentTags("IncidentCategory");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [])
  const [treeData, setTreeData] = useState([]);
  const fetchCategoryTree = async () => {
    try {
      const res = await getIncidentTreeNode("IncidentCategory");
      const sortedCat = res.data.sort((a, b) => {
        return b.created_at - a.created_at;
      });
      setTreeData(res.data);
      console.log(sortedCat);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchIncidentCategory();
    fetchCategoryTree();
  }, []);

  // const companyId = getItemInLocalStorage("COMPANYID");
  const handleAddSubCategory = async () => {
    const payload = {
      name: formData.SubCategory,
      active: true,
      parent_id: formData.categoryId,
      tag_type: "IncidentSubCategory",
      resource_id: companyId,
      resource_type: "Pms::CompanySetup",
    };
    try {
      const res = await postIncidentTags(payload);
      toast.success("Incident Sub Category Created successfully!");
      fetchCategoryTree();
      setFormData({ ...formData, categoryId: "", SubCategory: "" });
      setAddSubCat(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [subCategories, setSubCategories] = useState([]);
  const [addSubCat, setAddSubCat] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: "",
    SubCategory: "",
  });

  // const handleAddSubSubCategory = async () => {
  //   const payload = {
  //     name: subSubCatData.subSubCategory,
  //     active: true,
  //     parent_id: subSubCatData.SubCategoryId,
  //     tag_type: "IncidentSubSubCategory",
  //     resource_id: companyId,
  //     resource_type: "Pms::CompanySetup",
  //   };
  //   try {
  //     const res = await postIncidentTags(payload);
  //     toast.success("Incident Sub Sub Category Created successfully!");
  //     // fetchIncidentCategory();
  //     fetchCategoryTree();
  //     setSubSubCatData({
  //       ...subSubCatData,
  //       categoryId: "",
  //       SubCategoryId: "",
  //       subSubCategory: "",
  //     });
  //     setAddSubSubCat(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const [addSubSubCat, setAddSubSubCat] = useState(false);
  const [subSubCatData, setSubSubCatData] = useState({
    categoryId: "",
    SubCategoryId: "",
    subSubCategory: "",
  });

  useEffect(() => {
    const fetchIncidentCategory = async () => {
      try {
        const res = await getIncidentTags("IncidentCategory");
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIncidentCategory();
  }, []);
  const handleSubSubCatChange = async (e) => {
    const fetchIncidentSubCategory = async (parentId) => {
      try {
        const res = await getIncidentSubTags("IncidentSubCategory", parentId);
        setSubCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (e.target.type === "select-one" && e.target.name === "categoryId") {
      const catId = Number(e.target.value);
      await fetchIncidentSubCategory(catId);
      setSubSubCatData({ ...subSubCatData, categoryId: catId });
    } else {
      setSubSubCatData({ ...subSubCatData, [e.target.name]: e.target.value });
    }
  };
  return (
    <section className="mx-2">
      <div className="w-full flex flex-col gap-2 overflow-hidden">
        <div className="flex justify-end">
          {addCategory && (
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                placeholder="Category"
                className="border p-2 w-full border-gray-300 rounded-lg"
                value={cat}
                onChange={(e) => SetCat(e.target.value)}
              />
              <button
                className="bg-indigo-800 text-white p-2 flex gap-2 items-center rounded-md"
                onClick={handleAddCategory}
              >
                <FaCheck /> Submit
              </button>
              <button
                className="bg-gray-800 text-white flex items-center gap-2 p-2 rounded-md"
                onClick={() => setAddCategory(false)}
              >
                <MdClose /> Cancel
              </button>
            </div>
          )}
        </div>
        {/* sub Cat */}
        <div className="flex justify-end">
          {addSubCat && (
            <div className="flex items-center gap-2 w-full">
              <select
                name="categoryId"
                id=""
                value={formData.categoryId}
                onChange={handleChange}
                className="border p-2 px-4 border-gray-300 rounded-md w-full"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="SubCategory"
                className="border p-2 w-full border-gray-300 rounded-lg"
                value={formData.SubCategory}
                onChange={handleChange}
                name="SubCategory"
              />
              <button
                className="bg-indigo-800 text-white p-2 flex gap-2 items-center rounded-md"
                onClick={handleAddSubCategory}
              >
                <FaCheck /> Submit
              </button>
              <button
                className="bg-gray-800 text-white flex items-center gap-2 p-2 rounded-md"
                onClick={() => setAddSubCat(false)}
              >
                <MdClose /> Cancel
              </button>
            </div>
          )}
        </div>
        {/* subsubcat */}
        <div className="flex justify-end">
          {addSubSubCat && (
            <div className="flex items-center gap-2 w-full">
              <select
                name="categoryId"
                id=""
                value={subSubCatData.categoryId}
                onChange={handleSubSubCatChange}
                className="border p-2 px-4 border-gray-300 rounded-md w-full"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                name="SubCategoryId"
                value={subSubCatData.SubCategoryId}
                id=""
                className="border p-2 w-full border-gray-300 rounded-lg"
                onChange={handleSubSubCatChange}
              >
                <option value="">Select Sub Category</option>
                {subCategories.map((subCategory) => (
                  <option value={subCategory.id} key={subCategory.id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Sub Sub Category"
                className="border p-2 w-full border-gray-300 rounded-lg"
                value={subSubCatData.subSubCategory}
                onChange={handleSubSubCatChange}
                name="subSubCategory"
              />

              <button
                className="bg-indigo-800 text-white p-2 flex gap-2 items-center rounded-md"
                onClick={handleAddSubSubCategory}
              >
                <FaCheck /> Submit
              </button>
              <button
                className="bg-gray-800 text-white flex items-center gap-2 p-2 rounded-md"
                onClick={() => setAddSubSubCat(false)}
              >
                <MdClose /> Cancel
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          {!addCategory && (
            <button
              className="bg-indigo-800 p-2 rounded-md text-white flex items-center gap-2"
              onClick={() => setAddCategory(true)}
            >
              <PiPlusCircle /> Add Category
            </button>
          )}
          {!addSubCat && (
            <button
              className="bg-indigo-800 p-2 rounded-md text-white flex items-center gap-2"
              onClick={() => setAddSubCat(true)}
            >
              <PiPlusCircle /> Add Sub Category
            </button>
          )}
          {/* {!addSubSubCat && (
            <button
              className="bg-indigo-700 p-2 rounded-md text-white flex items-center gap-2"
              onClick={() => setAddSubSubCat(true)}
            >
              <PiPlusCircle /> Add Sub Sub Category
            </button>
          )} */}
        </div>
        {/* <div>
          <Table columns={column} data={categories} isPagination={true} />
        </div> */}
      </div>
      {modal && (
        <IncidentSetCategoryModal
          onclose={() => showModal(false)}
          catId={CatId}
          // fetchIncidentCategory={fetchIncidentCategory}
        />
      )}

      <div className="p-4 rounded-xl my-2 mb-10">
        {treeData?.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            fetchIncidentTree={fetchCategoryTree}
          />
        ))}
      </div>
    </section>
  );
};

export default IncidentCategorySetup;