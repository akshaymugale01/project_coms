import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { editCompanyAssetDetails, getCompanyAssetDetails, postCompanyAsset,  } from "../../../api";
import { useParams } from "react-router-dom";

const EditCompanyAsset = ({ setCompanyAssetEditModal, fetchCompanyAssets, comAssetId }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    laptopBrand: "",
    mobile: "",
  });
  useEffect(() => {
    const fetchCompanyAssets = async () => {
      try {
        const res = await getCompanyAssetDetails(comAssetId);
        console.log(res)
        setFormData({
          ...formData,
          laptopBrand: res.asset_name,
          mobile: res.model_number,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanyAssets()
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditComAsset = async () => {
    if (!formData.laptopBrand) {
      return toast.error("Please provide laptop brand");
    }
    if (!formData.mobile) {
      return toast.error("Please provide mobile phone");
    }
    const postData = new FormData();
    postData.append("asset_name", formData.laptopBrand);
    postData.append("model_number", formData.mobile);
    postData.append("employee", id);
    try {
      await editCompanyAssetDetails(comAssetId, postData);
      setCompanyAssetEditModal(false);
      fetchCompanyAssets();
      toast.success("Company's Asset updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
  


  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
      <div class="max-h-screen bg-white p-4  w-[25rem] rounded-xl shadow-lg overflow-y-auto">
        <h2 className="text-xl font-medium mb-4 text-center border-b">Company Asset</h2>
        <div className="flex flex-col ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
            Which Company Laptop and Model Number? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="p-2 w-full border rounded-md placeholder:text-sm "
              placeholder="Enter laptop brand and Model Number"
              value={formData.laptopBrand}
              onChange={handleChange}
              name="laptopBrand"
            />
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className=" p-2 w-full border rounded-md placeholder:text-sm "
              placeholder="Enter mobile phone"
              value={formData.mobile}
              onChange={handleChange}
              name="mobile"
            />
          </div>

          <div className="flex mt-5 my-2 justify-center gap-2">
            <button
              type="button"
              onClick={() => setCompanyAssetEditModal(false)}
              className="border-2 border-red-500 text-red-500 rounded-full p-1 px-4 flex items-center gap-2"
            >
              <MdClose />
              Cancel
            </button>
            <button
              onClick={handleEditComAsset}
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






export default EditCompanyAsset
