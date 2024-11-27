import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import Select from "react-select";
import toast from "react-hot-toast";
import { postVendors, getVendorsType,  getVendorCategory} from "../../api";
import { useNavigate } from "react-router-dom";

const AddSuppliers = ({ onclose, fetchVendors }) => {
  // const supplierOptions = [
  //   { value: "ppm", label: "PPM" },
  //   { value: "manufacturer", label: "Manufacturer" },
  //   { value: "amc", label: "AMC" },
  // ];

  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    companyName: "",
    venderName: "",
    primaryEmail: "",
    primaryPhone: "",
    secondaryPhone: "",
    GSTNumber: "",
    PANNumber: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    addressLine1: "",
    addressLine2: "",
    type: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchType = async () => {
      try {
        const typeRes = await getVendorsType();
        setTypes(typeRes.data.suppliers);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCategory = async () => {
      try {
        const catRes = await getVendorCategory();
        setCategories(catRes.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchType();
    fetchCategory();
  }, []);


  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (formData.companyName === "") {
      return toast.error("Please Enter Company Name");
    }
    if (formData.venderName === "") {
      return toast.error("Please Enter Vender Name");
    }
    if (formData.primaryEmail === "") {
      return toast.error("Please Enter Primary Email Id");
    }

    if (formData.primaryPhone === "") {
      return toast.error("Please Enter Primary Phone Number");
    }
    if (formData.secondaryEmail && !validateEmail(formData.secondaryEmail)) {
      return toast.error("Please Enter a Valid Secondary Email Id");
    }
  
    if (formData.secondaryPhone && !validatePhone(formData.secondaryPhone)) {
      return toast.error("Please Enter a Valid Secondary Phone Number");
    }
  
    const PostData = new FormData();
    PostData.append("vendor[company_name]", formData.companyName);
    PostData.append("vendor[vendor_name]", formData.venderName);
    PostData.append("vendor[mobile]", formData.primaryPhone);
    PostData.append("vendor[email]", formData.primaryEmail);
    PostData.append("vendor[secondary_mobile]", formData.secondaryPhone);
    PostData.append("vendor[pan_number]", formData.PANNumber);
    PostData.append("vendor[gstin_number]", formData.GSTNumber);
    PostData.append("vendor[country]", formData.country);
    PostData.append("vendor[state]", formData.state);
    PostData.append("vendor[city]", formData.city);
    PostData.append("vendor[pincode]", formData.pincode);
    PostData.append("vendor[address]", formData.addressLine1);
    PostData.append("vendor[address2]", formData.addressLine2);
    PostData.append("vendor[vendor_supplier_id]", formData.type);
    PostData.append("vendor[vendor_categories_id]", formData.category);
    try {
      const response = await postVendors(PostData);
      toast.dismiss();
      toast.success("New Supplier Added Successfully!");
      fetchVendors()
      onclose();
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Error Adding New Supplier");
    }
  };

  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col justify-center">
        <h2 className="flex gap-4 items-center justify-center font-bold text-lg">
          Add New Supplier
        </h2>
        <div>
          <div>
            <h2 className="font-medium border-b-2 border-black">
              Company Info
            </h2>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-2 my-2">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                id=""
                value={formData.companyName}
                onChange={handleChange}
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
              <input
                type="text"
                name="venderName"
                placeholder="Vender Name"
                id=""
                value={formData.venderName}
                onChange={handleChange}
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
              <input
                type="text"
                name="primaryEmail"
                id=""
                value={formData.primaryEmail}
                onChange={handleChange}
                placeholder="Primary Email"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
              <input
                type="text"
                name="primaryPhone"
                id=""
                value={formData.primaryPhone}
                onChange={handleChange}
                placeholder="Primary Phone"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
              <input
                type="text"
                name="secondaryPhone"
                id=""
                value={formData.secondaryPhone}
                onChange={handleChange}
                placeholder="Secondary Phone"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
              <input
                type="text"
                name="GSTNumber"
                id=""
                value={formData.GSTNumber}
                onChange={handleChange}
                placeholder="GST Number"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
              <input
                type="text"
                name="PANNumber"
                id=""
                value={formData.PANNumber}
                onChange={handleChange}
                placeholder="PAN Number"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
              <select
                className="border p-1 px-4 border-gray-500 rounded-md"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select Supplier Type</option>
                {types.map((type) => (
                  <option value={type.id} key={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              <select
                className="border p-1 px-4 border-gray-500 rounded-md"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option value={cat.id} key={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {/* <Select
                isMulti
                name="vendor"
                options={supplierOptions}
                className="basic-multi-select border-gray-500 rounded-md"
                classNamePrefix="select"
                placeholder="Select Supplier Type"
              /> */}
            </div>
            <h2 className="font-medium border-b-2 border-black">Address</h2>
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-2 my-2">
              <input
                type="text"
                name="country"
                id=""
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
              <input
                type="text"
                name="state"
                id=""
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
              <input
                type="text"
                name="city"
                id=""
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
              <input
                type="text"
                name="pincode"
                id=""
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
              <input
                type="text"
                name="addressLine1"
                id=""
                value={formData.addressLine1}
                onChange={handleChange}
                placeholder="Address line 1"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
              <input
                type="text"
                name="addressLine2"
                id=""
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Address line 2"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <button
            className="bg-black p-1 px-4 border-2 rounded-md text-white font-medium border-black hover:bg-white hover:text-black transition-all duration-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddSuppliers;
