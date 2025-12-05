import React, { useEffect, useState } from "react";
import OrganisationSetting from "./OrganisationSetting";
import HRMSHelpCenter from "./HRMSHelpCenter";
import {
  editOrganizationAddress,
  getAllOrganizationAddress,
  getMyOrganizationAddress,
  getOrganizationAddress,
  postOrganizationAddress,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const AddressInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    country: "",
    stateProvince: "",
    city: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  useEffect(() => {
    const fetchOrgAddress = async () => {
      try {
        const addressRes = await getMyOrganizationAddress(hrmsOrgId);
        if (addressRes.length > 0) {
          const address = addressRes[0];
          setAddressId(address.id);
          setFormData({
            ...formData,
            addressLine1: address.address_line_1,
            addressLine2: address.address_line_2,
            city: address.city,
            country: address.country,
            stateProvince: address.state_or_province,
            zipCode: address.zip_code,
          });

          console.log(address);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrgAddress();
  }, []);

  const handleEditAddress = async () => {
    // Validate form fields before submission
    if (!formData.addressLine1) {
      toast.error("Address Line 1 is required");
      return;
    }
    if (!formData.city) {
      toast.error("City is required");
      return;
    }
    if (!formData.country) {
      toast.error("Country is required");
      return;
    }
    if (!formData.stateProvince) {
      toast.error("State/Province is required");
      return;
    }
    if (!formData.zipCode) {
      toast.error("Zip Code is required");
      return;
    }
    setIsEditing(false);
    const postData = new FormData();
    postData.append("address_line_1", formData.addressLine1);
    postData.append("address_line_2", formData.addressLine2);
    postData.append("city", formData.city);
    postData.append("country", formData.country);
    postData.append("state_or_province", formData.stateProvince);
    postData.append("zip_code", formData.zipCode);
    postData.append("organization", hrmsOrgId);

    try {
      if (addressId) {
        await editOrganizationAddress(addressId, postData);
        toast.success("Address updated successfully");
      } else {
        await postOrganizationAddress(postData);
        toast.success("Address added successfully");
      }
    } catch (error) {
      toast.error("An error occurred while updating the address");
      console.log(error);
    }
  };

  return (
    <div className="flex gap-2 justify-between ml-20">
      <OrganisationSetting />
      <div className=" py-6 bg-white rounded-lg w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6">Address Information</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2"
            >
              <BiEdit /> Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleEditAddress}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded-full flex items-center gap-2"
              >
                <FaCheck /> Save
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mb-4 px-4 py-2 border-2 border-red-500 text-red-400 rounded-full flex items-center gap-2"
              >
                <MdClose /> Cancel
              </button>
            </div>
          )}
        </div>
        <div>
          <div className="grid lg:grid-cols-2 gap-4 ">
            <div className=" ">
              <label className="block text-gray-700 font-medium">
                Address Line 1
              </label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200" : ""
                }`}
                readOnly={!isEditing}
              />
            </div>

            <div className="">
              <label className="block text-gray-700 font-medium">
                Address Line 2
              </label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200" : ""
                }`}
                readOnly={!isEditing}
              />
            </div>

            <div className="">
              <label className="block text-gray-700 font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200" : ""
                }`}
                readOnly={!isEditing}
              />
            </div>
            <div className="">
              <label className="block text-gray-700 font-medium">
                State/Province
              </label>
              <input
                type="text"
                name="stateProvince"
                value={formData.stateProvince}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200" : ""
                }`}
                readOnly={!isEditing}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Zip/Pin Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200" : ""
                }`}
                readOnly={!isEditing}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  !isEditing ? "bg-gray-200" : ""
                }`}
                readOnly={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
      <HRMSHelpCenter help={"basic"} />
    </div>
  );
};

export default AddressInformation;
