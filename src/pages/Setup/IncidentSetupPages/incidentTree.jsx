import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import {
  IoMdArrowDropdownCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { getIncidentCatDetails, getIncidentTags } from "../../../api";
import SubSubCategorySetupModal from "../../../containers/modals/IncidentSetupModal.jsx/IncidentSetupSubSubCatModal";
import IncidentSetCategoryModal from "../../../containers/modals/IncidentSetupModal.jsx/IncidentSetupCatModal";
import SubCategorySetupModal from "../../../containers/modals/IncidentSetupModal.jsx/IncidentSetupSubCatModal";
// import IncidentSecCategoryModal from "../../../containers/modals/IncidentSetupModal.jsx/IncidentSecCategoryModal";
import SecondarySubCategorySetupModal from "../../../containers/modals/IncidentSetupModal.jsx/IncidentSecSubCatModal";
// import SecSubSubSubModal from "../../../containers/modals/IncidentSetupModal.jsx/SecSubSubSubModal";

const TreeNode = ({ node, fetchIncidentTree }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modal, showModal] = useState(false);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  const [catId, setCatId] = useState("");
  const [tagType, setTagType] = useState("");
  const handleEdit = async (id) => {
    try {
      const res = await getIncidentCatDetails(id);
      setCatId(res.data.id);
      setTagType(res.data.tag_type);
      showModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(typeof fetchIncidentTree);
  console.log("Parent fetchIncidentTree:", fetchIncidentTree);
  return (
    <div className="pl-2  border-gray-300 ">
      <div className="grid grid-cols-2 items-center space-x-2 border-b p-2">
        <div className="flex items-center">
          {node.children && node.children.length > 0 && (
            <button
              onClick={toggleExpand}
              className="text-sm text-green-600 focus:outline-none"
            >
              {isExpanded ? (
                <IoMdArrowDropdownCircle size={20} className="text-red-400" />
              ) : (
                <IoMdArrowDroprightCircle size={20} />
              )}
            </button>
          )}
          {/* IncidentSubSubCategory */}
          <span className="font-medium mx-1">{node.name}</span>
          {node.tag_type === "IncidentCategory" ? (
            <span className="text-gray-400 text-xs">(Category)</span>
          ) : node.tag_type === "incidentCategory" ? (
            <span className="text-gray-400 text-xs">(Category)</span>
          ) : node.tag_type === "IncidentSubCategory" ? (
            <span className="text-gray-400 text-xs">(Sub Category)</span>
          ) : node.tag_type === "incidentSubCategory" ? (
            <span className="text-gray-400 text-xs">(Sub Category)</span>
          ) : node.tag_type === "IncidentSubSubCategory" ? (
            <span className="text-gray-400 text-xs">(Sub Sub Category)</span>
          ) : node.tag_type === "IncidentSecondaryCategory" ? (
            <span className="text-gray-400 text-xs">(Secondary Category)</span>
          ) : node.tag_type === "IncidentSecondarySubCategory" ? (
            <span className="text-gray-400 text-xs">
              (Secondary Sub Category)
            </span>
          ) : node.tag_type === "IncidentSecondarySubSubCategory" ? (
            <span className="text-gray-400 text-xs">
              (Secondary Sub Sub Category)
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => handleEdit(node.id)}
            className="ml-auto text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            <BiEdit size={15} />
          </button>
        </div>
      </div>

      {isExpanded && node.children && node.children.length > 0 && (
        <div className="mt-2">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}

      {modal &&
        (tagType === "incidentCategory" || tagType === "IncidentCategory") && (
          <IncidentSetCategoryModal
            onclose={() => showModal(false)}
            catId={catId}
            fetchIncidentCategory={fetchIncidentTree}
          />
        )}
      {modal &&
        (tagType === "IncidentSubCategory" ||
          tagType === "incidentSubCategory") && (
          <SubCategorySetupModal
            onclose={() => showModal(false)}
            fetchIncidentSubCategory={fetchIncidentTree}
            subCatId={catId}
          />
        )}
      {modal &&
        (tagType === "IncidentSubSubCategory" ||
          tagType === "incidentSubSubCategory") && (
          <SubSubCategorySetupModal
            onclose={() => showModal(false)}
            subSubCatId={catId}
            fetchIncidentSubSubCategoryTree={fetchIncidentTree}
          />
        )}
      {modal && tagType === "IncidentSecondaryCategory" && (
        <IncidentSecCategoryModal
          onclose={() => showModal(false)}
          catId={catId}
          fetchIncidentCategory={fetchIncidentTree}
        />
      )}
      {modal && tagType === "IncidentSecondarySubCategory" && (
        <SecondarySubCategorySetupModal
          onclose={() => showModal(false)}
          catId={catId}
          fetchIncidentCategory={fetchIncidentTree}
        />
      )}
      {modal && tagType === "IncidentSecondarySubSubCategory" && (
        <SecSubSubSubModal
          onclose={() => showModal(false)}
          catId={catId}
          fetchIncidentCategory={fetchIncidentTree}
        />
      )}
    </div>
  );
};
export default TreeNode;