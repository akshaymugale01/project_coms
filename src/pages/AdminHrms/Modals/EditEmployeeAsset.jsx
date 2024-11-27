import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import {
  editEmployeeAssetDetails,
  getEmployeeAssetDetails,
  
} from "../../../api";
import { useParams } from "react-router-dom";

const EditEmployeeAsset = ({
    setAssetEditModal,
  fetchEmployeeAssets,
  empAssetID,
}) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    laptopBrand: "",
    retrievalEmail: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditEmpAsset = async () => {
    if (!formData.laptopBrand) {
      return toast.error("Please provide laptop brand");
    }
    if (!formData.retrievalEmail) {
      return toast.error("Please provide retrieval email");
    }
    const postData = new FormData();
    postData.append("laptop_brand", formData.laptopBrand);
    postData.append("email_id", formData.retrievalEmail);
    postData.append("employee", id);
    try {
      await editEmployeeAssetDetails(empAssetID, postData);
      setAssetEditModal(false);
      fetchEmployeeAssets();
      toast.success("Employee's Asset updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchEmployeeAssetDetails = async () => {
      try {
        const res = await getEmployeeAssetDetails(empAssetID);
        setFormData({
          ...formData,
          laptopBrand: res.laptop_brand,
          retrievalEmail: res.email_id,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployeeAssetDetails();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
      <div class="max-h-screen bg-white p-4  w-[25rem] rounded-xl shadow-lg overflow-y-auto">
        <h2 className="text-xl font-medium mb-4 text-center border-b">Asset</h2>
        <div className="flex flex-col ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Which brand Laptop?
            </label>
            <input
              type="text"
              className="p-2 w-full border rounded-md placeholder:text-sm "
              placeholder="Enter laptop brand"
              value={formData.laptopBrand}
              onChange={handleChange}
              name="laptopBrand"
            />
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Retrieve email ID <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className=" p-2 w-full border rounded-md placeholder:text-sm "
              placeholder="Enter email ID"
              value={formData.retrievalEmail}
              onChange={handleChange}
              name="retrievalEmail"
            />
          </div>

          <div className="flex mt-5 my-2 justify-center gap-2">
            <button
              type="button"
              onClick={() => setAssetModal(false)}
              className="border-2 border-red-500 text-red-500 rounded-full p-1 px-4 flex items-center gap-2"
            >
              <MdClose />
              Cancel
            </button>
            <button
              onClick={handleEditEmpAsset}
              className="bg-green-500 text-white font-semibold rounded-full p-1 px-4 flex items-center gap-2"
            >
              <FaCheck />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeAsset;
