import React, { useEffect, useState } from "react";
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
  getIncidentSubTags,
  getIncidentTags,
  getIncidentTreeNode,
  postIncidentTags,
} from "../../../api";
import toast from "react-hot-toast";
// import TreeNode from "./IncidentTree";
import TreeNode from "./incidentTree";
import SubSubSubCategorySetupModal from "../../../containers/modals/IncidentSetupModal.jsx/IncidentSetupSubSubSubCatModal";

const IncidentSecondaryCategorySetup = () => {
  const [modal, showModal] = useState(false);
  const [addSubSubCat, setAddSubSubCat] = useState(false);
  const [addSubCat, setAddSubCat] = useState(false);

  const [addCategory, setAddCategory] = useState(false);
  const [cat, SetCat] = useState("");
  const companyId = getItemInLocalStorage("COMPANYID");
  const handleAddCategory = async () => {
    const payload = {
      name: cat,
      active: true,
      // "parent_id": null,
      tag_type: "IncidentSecondaryCategory",
      resource_id: companyId,
      resource_type: "Pms::CompanySetup",
      // "comment": "Covers all types of plumbing problems."
    };
    try {
      const res = await postIncidentTags(payload);
      toast.success("Incident Secondary Category Created successfully!");
      fetchCategoryTree();
      SetCat("");
      setAddCategory(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [categories, setCategories] = useState([]);
  const fetchIncidentSecondaryCategory = async () => {
    try {
      const res = await getIncidentTags("IncidentSecondaryCategory");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchIncidentSecondaryCategory();
  }, []);
  const [treeData, setTreeData] = useState([]);
  const fetchCategoryTree = async () => {
    try {
      const res = await getIncidentTreeNode("IncidentSecondaryCategory");
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
    fetchCategoryTree();
  }, []);
  const [formData, setFormData] = useState({
    categoryId: "",
    SubCategory: "",
  });

  useEffect(() => {
    const fetchIncidentCategory = async () => {
      try {
        const res = await getIncidentTags("IncidentSecondaryCategory");
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIncidentCategory();
  }, []);

  const handleAddSecSubCategory = async () => {
    const payload = {
      name: formData.SubCategory,
      active: true,
      parent_id: formData.categoryId,
      tag_type: "IncidentSecondarySubCategory",
      resource_id: companyId,
      resource_type: "Pms::CompanySetup",
    };
    try {
      const res = await postIncidentTags(payload);
      toast.success("Incident Secondary Sub Category Created successfully!");
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

  const [subSubData, setSubSubData] = useState({
    categoryId: "",
    SubCategoryId: "",
    subSubCategory: "",
  });
  const [addSubSubSubCat, setAddSubSubSubCat] = useState(false);

  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    const fetchIncidentCategory = async () => {
      try {
        const res = await getIncidentTags("IncidentSecondaryCategory");
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIncidentCategory();
  }, []);
  const handleSubSubCategoryChange = async (e) => {
    const fetchIncidentSubCategory = async (parentId) => {
      try {
        const res = await getIncidentSubTags(
          "IncidentSecondarySubCategory",
          parentId
        );
        setSubCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (e.target.type === "select-one" && e.target.name === "categoryId") {
      const catId = Number(e.target.value);
      await fetchIncidentSubCategory(catId);
      setSubSubData({ ...subSubData, categoryId: catId });
    } else {
      setSubSubData({ ...subSubData, [e.target.name]: e.target.value });
    }
  };

  const handleAddSubSubCategory = async () => {
    const payload = {
      name: subSubData.subSubCategory,
      active: true,
      parent_id: subSubData.SubCategoryId,
      tag_type: "IncidentSecondarySubSubCategory",
      resource_id: companyId,
      resource_type: "Pms::CompanySetup",
    };
    try {
      const res = await postIncidentTags(payload);
      toast.success(
        "Incident Secondary Sub Sub Category Created successfully!"
      );
      fetchCategoryTree();
      setSubSubData({
        ...subSubData,
        categoryId: "",
        SubCategoryId: "",
        subSubCategory: "",
      });
      setAddSubSubCat(false);
    } catch (error) {
      console.log(error);
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
                placeholder="Secondary Category"
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
        {/* subcat */}
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
                <option value="">Select Secondary Category</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Secondary Sub Category"
                className="border p-2 w-full border-gray-300 rounded-lg"
                value={formData.SubCategory}
                name="SubCategory"
                onChange={handleChange}
              />
              <button
                className="bg-indigo-800 text-white p-2 flex gap-2 items-center rounded-md"
                onClick={handleAddSecSubCategory}
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
        <div className="flex justify-end gap-2">
          {!addCategory && (
            <button
              className="bg-indigo-800 p-2 rounded-md text-white flex items-center gap-2"
              onClick={() => setAddCategory(true)}
            >
              <PiPlusCircle /> Add Secondary Category
            </button>
          )}
          {!addSubCat && (
            <button
              className="bg-indigo-800 p-2 rounded-md text-white flex items-center gap-2"
              onClick={() => setAddSubCat(true)}
            >
              <PiPlusCircle /> Add Secondary Sub Category
            </button>
          )}
        </div>

        {/* <div>
          <Table columns={column} data={categories} isPagination={true} />
        </div> */}
      </div>
      {modal && <SubSubSubCategorySetupModal onclose={() => showModal(false)} />}
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

export default IncidentSecondaryCategorySetup;
