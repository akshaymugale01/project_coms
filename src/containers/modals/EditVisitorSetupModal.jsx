import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import toast from "react-hot-toast";
import {
  editStaffCategory,
  editVisitorCategory,
  updateVisitorSubCategory,
  getVisitorCategories,
} from "../../api";
import { useSelector } from "react-redux";
import { domainPrefix } from "../../api";

const EditVisitorSetupModal = ({ onclose, item, setAdded, page }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [visitorCategories, setVisitorCategories] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);

  /* ================= PREFILL ================= */

  useEffect(() => {
    if (!item) return;

    setName(item.name || "");

    // Normalize Code safely
    if (item.code) {
      const upperCode = item.code.toUpperCase();
      if (upperCode.includes("PLAN")) setCode("PLANNED");
      else if (upperCode.includes("UNPLAN")) setCode("UNPLANNED");
      else setCode("OTHERS");
    }

    // Parent category
    setParentCategoryId(
      item.visitor_category_id ||
        item.visitor_category?.id ||
        ""
    );

    // Prefill icon preview
    if (page === "visitorCategories" && item.icon) {
      setIconPreview(`${domainPrefix}${item.icon}`);
    }

    if (page === "visitorSubCategories" && item.iconv2) {
      setIconPreview(`${domainPrefix}${item.iconv2}`);
    }
  }, [item, page]);

  /* ================= LOAD CATEGORIES ================= */

  useEffect(() => {
    const loadCategories = async () => {
      if (page === "visitorSubCategories") {
        try {
          const res = await getVisitorCategories();
          const data =
            res?.data?.visitor_categories || res?.data || [];
          setVisitorCategories(data);
        } catch {
          toast.error("Failed to load categories");
        }
      }
    };

    loadCategories();
  }, [page]);

  /* ================= ICON CHANGE ================= */

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIconFile(file);
    setIconPreview(URL.createObjectURL(file));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!name.trim()) return toast.error("Please enter a name");
    if (!item?.id) return toast.error("Item ID missing");

    try {
      /* -------- Staff Category -------- */
      if (page === "visitor") {
        const formData = new FormData();
        formData.append("name", name);

        await editStaffCategory(item.id, formData);
        toast.success("Staff Category updated successfully");
      }

      /* -------- Visitor Category -------- */
      if (page === "visitorCategories") {
        if (!code) return toast.error("Select code type");

        const formData = new FormData();
        formData.append("visitor_category[name]", name);
        formData.append("visitor_category[code]", code);

        if (iconFile) {
          formData.append("visitor_category[icon]", iconFile);
        }

        await editVisitorCategory(item.id, formData);
        toast.success("Visitor Category updated successfully");
      }

      /* -------- Visitor Sub Category -------- */
      if (page === "visitorSubCategories") {
        if (!parentCategoryId)
          return toast.error("Select parent category");

        const formData = new FormData();
        formData.append(
          "visitor_sub_category[name]",
          name
        );
        formData.append(
          "visitor_sub_category[visitor_category_id]",
          parentCategoryId
        );

        // ✅ FIXED KEY HERE
        if (iconFile) {
          formData.append(
            "visitor_sub_category[icon]",
            iconFile
          );
        }

        await updateVisitorSubCategory(item.id, formData);
        toast.success(
          "Visitor Sub Category updated successfully"
        );
      }

      setAdded((prev) => !prev);
      onclose();
    } catch (error) {
      console.error(error);
      toast.error("Update failed. Please try again.");
    }
  };

  /* ================= TITLE ================= */

  const getTitle = () => {
    if (page === "visitor") return "Edit Staff Category";
    if (page === "visitorCategories")
      return "Edit Visitor Category";
    if (page === "visitorSubCategories")
      return "Edit Sub Category";
    return "Edit";
  };

  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col gap-4 min-w-[380px]">
        <h2 className="border-b border-gray-300 pb-3 text-center font-semibold text-xl">
          {getTitle()}
        </h2>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 font-medium">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Code */}
        {page === "visitorCategories" && (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 font-medium">
              Code
            </label>
            <select
              value={code}
              onChange={(e) =>
                setCode(e.target.value)
              }
              className="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="">
                Select Code Type
              </option>
              <option value="PLANNED">
                PLANNED
              </option>
              <option value="UNPLANNED">
                UNPLANNED
              </option>
              <option value="OTHERS">
                OTHERS
              </option>
            </select>
          </div>
        )}

        {/* Parent Category */}
        {page === "visitorSubCategories" && (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 font-medium">
              Parent Category
            </label>
            <select
              value={parentCategoryId}
              onChange={(e) =>
                setParentCategoryId(
                  e.target.value
                )
              }
              className="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="">
                Select Category
              </option>
              {visitorCategories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                >
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Icon */}
        {(page === "visitorCategories" ||
          page ===
            "visitorSubCategories") && (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 font-medium">
              Icon
            </label>

            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
              {iconPreview ? (
                <img
                  src={iconPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">
                  No Preview
                </span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleIconChange}
              className="text-sm"
            />
          </div>
        )}

        {/* Submit */}
        <div className="border-t border-gray-200 pt-3">
          <button
            className="text-white rounded-md px-6 py-2 w-full font-medium"
            onClick={handleSubmit}
            style={{
              background: themeColor,
            }}
          >
            Save
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditVisitorSetupModal;