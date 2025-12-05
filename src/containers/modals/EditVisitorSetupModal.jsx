import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import toast from "react-hot-toast";
import { getVisitorCategoryDetails, editVisitorCategory } from "../../api";
import { useSelector } from "react-redux";
const EditVisitorSetupModal = ({ onclose, catId, setAdded }) => {
  const [editCategory, setEditCategory] = useState("");
  const themeColor = useSelector((state) =>state.theme.color)

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const categoryRes = await getVisitorCategoryDetails(catId);
        console.log(catId);
        console.log(categoryRes);
        setEditCategory(categoryRes.data.category.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryDetails();
  }, [catId]);
  const handleSubmit = async () => {
    if (!editCategory) {
      return toast.error("Enter Category Name");
    }
    const formData = new FormData();
    formData.append("name", editCategory);
    try {
      const editCat = await editVisitorCategory(catId, formData);
      toast.success("Visitor Category  updated Successfully");
      setAdded(true);
      onclose();
      setEditCategory("");
    } catch (error) {
      console.log(error);
    }finally {
      setTimeout(() => {
        setAdded(false);
      }, 500);
    }
  };

  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col">
        <h2 className="border-b border-gray-400  pb-2 flex justify-center font-semibold text-xl w-full">
          Edit Category Name
        </h2>
        <div className="grid grid-cols-1 my-5">
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-600 font-medium">Category Name</label>
            <input
              type="text"
              name="editCategory"
              id="editCategory"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              placeholder="Enter Visitor Category"
              className="border rounded-md md:w-96 border-gray-500 p-2 px-2"
            />
          </div>
        </div>
        <div className="flex justify-center border-t border-gray-500 w-full">
          <div className="w-96 my-3">
            <button
              onClick={handleSubmit}
              className=" border-2 border-gray-500 text-white rounded-md px-4 p-1 w-full"
              style={{background: themeColor}}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditVisitorSetupModal;