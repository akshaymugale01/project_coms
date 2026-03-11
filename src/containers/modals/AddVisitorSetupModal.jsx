import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import toast from "react-hot-toast";
import {
  postStaffCategory,
  postVisitorCategory,
  postVisitorSubCategory,
  getVisitorCategories,
} from "../../api";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../utils/localStorage";

const AddVisitorSetupModal = ({ onclose, setAdded, page }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [icon, setIcon] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [visitorCategories, setVisitorCategories] = useState([]);
  const themeColor = useSelector((state) => state.theme.color);
  const token = getItemInLocalStorage("TOKEN");
  const siteId = getItemInLocalStorage("SITEID");

  /* Load visitor categories for sub-category parent dropdown */
  useEffect(() => {
    const loadCategories = async () => {
      if (page === "visitorSubCategories") {
        try {
          const res = await getVisitorCategories(1, 10, siteId,token);

          const data =
            res?.data?.visitor_categories ||
            res?.data ||
            [];

          setVisitorCategories(data);
        } catch (error) {
          console.log(error);
          toast.error("Failed to load categories");
        }
      }
    };

    loadCategories();
  }, [page, siteId]);


  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIcon(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

 const handleSubmit = async () => {
  if (!name.trim()) return toast.error("Please enter a name");

  try {
    if (page === "visitor") {
      const formData = new FormData();
      formData.append("name", name);
      await postStaffCategory(formData);
      toast.success("Staff Category created successfully");
    }

    if (page === "visitorCategories") {
      if (!code) return toast.error("Please select a code type");

      const formData = new FormData();
      formData.append("visitor_category[name]", name);
      formData.append("visitor_category[code]", code);
      formData.append("visitor_category[site_id]", siteId); // ✅ IMPORTANT FIX

      if (icon) {
        formData.append("visitor_category[icon_attributes][image]", icon);
      }

      await postVisitorCategory(formData, token, siteId); // ✅ PASS siteId

      toast.success("Visitor Category created successfully");
    }

    if (page === "visitorSubCategories") {
      if (!parentCategoryId)
        return toast.error("Please select a parent category");

      const formData = new FormData();
      formData.append("visitor_sub_category[name]", name);
      formData.append(
        "visitor_sub_category[visitor_category_id]",
        parentCategoryId
      );
      formData.append("visitor_sub_category[site_id]", siteId); // ✅ IMPORTANT FIX

      if (icon) {
        formData.append("visitor_sub_category[iconv2_attributes][image]", icon);
      }

      await postVisitorSubCategory(formData);

      toast.success("Visitor Sub Category created successfully");
    }

    setAdded((prev) => !prev);
    onclose();
  } catch (error) {
    console.error(error);
    toast.error("Failed to create. Please try again.");
  }
};

  const getTitle = () => {
    if (page === "visitor") return "Add Staff Category";
    if (page === "visitorCategories") return "Add Visitor Category";
    if (page === "visitorSubCategories") return "Add Sub Category";
    return "Add";
  };

  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col gap-4 min-w-[380px]">
        {/* Title */}
        <h2 className="border-b border-gray-300 pb-3 text-center font-semibold text-xl">
          {getTitle()}
        </h2>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Code - only for Visitor Categories */}
        {page === "visitorCategories" && (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 font-medium">Code</label>
            <select
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="">Select Code Type</option>
              <option value="PLANNED">PLANNED</option>
              <option value="UNPLANNED">UNPLANNED</option>
              <option value="OTHERS">OTHERS</option>
            </select>
          </div>
        )}

        {/* Parent Category - only for Visitor Sub Categories */}
        {page === "visitorSubCategories" && (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 font-medium">Parent Category</label>
            <select
              value={parentCategoryId}
              onChange={(e) => setParentCategoryId(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="">Select Category</option>
              {visitorCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Icon - for Visitor Categories and Sub Categories */}
        {(page === "visitorCategories" ||
          page === "visitorSubCategories") && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Icon</label>

              <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
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
            </div>
          )}

        {/* Submit */}
        <div className="border-t border-gray-200 pt-3 flex justify-center">
          <button
            className="text-white rounded-md px-6 py-2 w-full font-medium"
            onClick={handleSubmit}
            style={{ background: themeColor }}
          >
            Submit
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddVisitorSetupModal;