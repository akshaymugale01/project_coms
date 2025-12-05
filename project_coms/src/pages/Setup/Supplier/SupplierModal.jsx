import React, { useState } from "react";
import ModalWrapper from "../../../containers/modals/ModalWrapper";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { postVendorCategory, postVendorType } from "../../../api";

const SupplierModal = ({ page, onclose, setAdded }) => {
  const [typeName, setTypeName] = useState("");
  const themeColor = useSelector((state) => state.theme.color);
  const [categoryName, setCategoryName] = useState("");
  const handleTypeSubmit = async () => {
    if (!typeName) {
      return toast.error("Please Enter Type");
    }
    const formData = new FormData();
    formData.append("name", typeName);
    try {
      const res = await postVendorType(formData);
      toast.success("Supplier type created Successfully");
      setAdded(true);
      onclose()
      setTypeName("")
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setAdded(false);
      }, 500);
    }
  };
  const handleCatSubmit = async () => {
    if (!categoryName) {
      return toast.error("Please Enter Category");
    }
    const formData = new FormData();
    formData.append("name", categoryName);
    try {
      const res = await postVendorCategory(formData);
      toast.success("Supplier category created Successfully");
      setAdded(true);
      onclose()
      setTypeName("")
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setAdded(false);
      }, 500);
    }
  };
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col gap-4 z-10">
        <h1 className="font-semibold text-center text-xl">
          {page === "type" ? "Create Type" : "Create Category"}
        </h1>
        <div className="grid items-center">
          {page === "type" ? (
            <div className="flex flex-col gap-4">
              <label htmlFor="" className="text-sm font-bold">
                Supplier Type Name :
              </label>
              <input
                type="text"
                name="typeName"
                id="typeName"
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
                placeholder="Enter Type Name"
                className="border rounded-md w-96 border-gray-500 p-1 px-2 placeholder:text-sm"
              />
              <button
                style={{ background: themeColor }}
                onClick={handleTypeSubmit}
                className="p-1 px-4 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <label htmlFor="" className="text-sm font-bold">
                Supplier Category Name :
              </label>
              <input
                type="text"
                name="categoryName"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter Category Name"
                className="border rounded-md border-gray-500 w-96 p-1 px-2 placeholder:text-sm"
              />
              <button
                style={{ background: themeColor }}
                onClick={handleCatSubmit}
                className="p-1 px-4 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default SupplierModal;
