import React, { useEffect, useState } from "react";
import { getVendorCategory, getVendorsType, postVendors } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useSelector } from "react-redux";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MultiSelect from "../AdminHrms/Components/MultiSelect";
const AddSupplier = () => {
  const siteId = getItemInLocalStorage("SITEID");
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log(siteId);
  const [formData, setFormData] = useState({
    vendor_name: "",
    company_name: "",
    mobile: "",
    email: "",
    secondary_mobile: "",
    secondary_email: "",
    gstin_number: "",
    pan_number: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    address2: "",
    account_name: "",
    account_number: "",
    bank_branch_name: "",
    ifsc_code: "",
    website_url: "",
    district: "",
    attachments: [],
    vtype: "",
    type: "",
    category: "",
    complianceApplicable: false,
    // firstanme: "abc",
    // lastname: "wer",
  });
  console.log(formData);

  const handleFileChange = (files, fieldName) => {
    // Changed to receive 'files' directly
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!formData.company_name) {
      return toast.error("Company Name is Required");
    }
    if (!formData.vendor_name) {
      return toast.error("Supplier name is required");
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error("Invalid email address!");
    }
    if (
      formData.secondary_email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.secondary_email)
    ) {
      return toast.error("Invalid Secondary Email!");
    }

    const sendData = new FormData();
    sendData.append("vendor[site_id]", siteId);
    sendData.append("vendor[vendor_name]", formData.vendor_name);
    sendData.append("vendor[company_name]", formData.company_name);
    sendData.append("vendor[mobile]", formData.mobile);
    sendData.append("vendor[email]", formData.email);
    sendData.append("vendor[secondary_mobile]", formData.secondary_mobile);
    sendData.append("vendor[secondary_email]", formData.secondary_email);
    sendData.append("vendor[gstin_number]", formData.gstin_number);
    sendData.append("vendor[pan_number]", formData.pan_number);
    sendData.append("vendor[address]", formData.address);
    sendData.append("vendor[address2]", formData.address2);
    sendData.append("vendor[country]", formData.country);
    sendData.append("vendor[state]", formData.state);
    sendData.append("vendor[city]", formData.city);
    sendData.append("vendor[pincode]", formData.pincode);
    sendData.append("vendor[account_name]", formData.account_name);
    sendData.append("vendor[account_number]", formData.account_number);
    sendData.append("vendor[bank_branch_name]", formData.bank_branch_name);
    sendData.append("vendor[ifsc_code]", formData.ifsc_code);
    sendData.append("vendor[vendor_supplier_id]", formData.type);
    sendData.append("vendor[vendor_categories_id]", formData.category);

    sendData.append("vendor[website_url]", formData.website_url);
    sendData.append("vendor[district]", formData.district);
    formData.attachments.forEach((file, index) => {
      sendData.append(`attachments[]`, file);
    });

    try {
      toast.loading("Adding Supplier please wait!");
      const response = await postVendors(sendData);
      toast.dismiss();
      toast.success("New Supplier Added Successfully!");
      navigate(`/suppliers/supplier-details/${response.data.id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Error Adding New Supplier");
    }
  };
  const themeColor = 'rgb(3 19 37)'
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([
    { label: "Child Labour Prohibition And Regulation Act 1986", value: "1" },
    { label: "The payment of bonus Act, 1965", value: "2" },
    { label: "Shops And Commercial Establishments Act", value: "3" },
    { label: "The Professional Tax Act, 1975", value: "4" },
  ]);

  const handleSelect = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <section>
      <div className="m-2">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold p-2  rounded-full text-white"
        >
          Add Supplier
        </h2>
        <div className="md:mx-20 my-5 mb-10 border border-gray-400 p-5 px-10 rounded-lg shadow-xl">
          <h2 className="border-b text-center text-xl border-black mb-6 font-semibold">
            Company Details
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Company Name : <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                id=""
                placeholder="Company Name"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Vendor Name : <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="vendor_name"
                value={formData.vendor_name}
                onChange={handleChange}
                id=""
                placeholder="Company Name"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Primary Phone :
              </label>
              <input
                type="tel"
                name="mobile"
                id=""
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Phone"
                className="border p-1 px-4 border-gray-500 rounded-md"
                pattern="[0-9]*"
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Secondary Phone :
              </label>

              <input
                type="tel"
                name="secondary_mobile"
                id=""
                value={formData.secondary_mobile}
                onChange={handleChange}
                placeholder="Secondary Phone"
                className="border p-1 px-4 border-gray-500 rounded-md"
                pattern="[0-9]*"
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Primary Email : <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id=""
                placeholder="Primary Email"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Secondary Email : <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="secondary_email"
                id=""
                value={formData.secondary_email}
                onChange={handleChange}
                placeholder="Secondary Email"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                PAN :
              </label>
              <input
                type="text"
                name="pan_number"
                id=""
                value={formData.pan_number}
                onChange={handleChange}
                placeholder="PAN"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Select Supplier Type:
              </label>
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
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Select Category:
              </label>
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
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Website :
              </label>

              <input
                type="url"
                name="website_url"
                value={formData.website_url}
                onChange={handleChange}
                id=""
                className="border p-1 px-4 border-gray-500 rounded-md"
                placeholder="Enter Website URL"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                GST Number :
              </label>

              <input
                type="text"
                name="gstin_number"
                value={formData.gstin_number}
                onChange={handleChange}
                id=""
                className="border p-1 px-4 border-gray-500 rounded-md"
                placeholder="Enter GST Number"
              />
            </div>
            {/* <div className="flex items-center mt-5 gap-2">
              <input
                type="checkbox"
                name=""
                id=""
                value={formData.complianceApplicable}
                onChange={() =>
                  setFormData({
                    ...formData,
                    complianceApplicable: !formData.complianceApplicable,
                  })
                }
              />
              <label htmlFor="" className="font-medium">
                Compliance applicable :
              </label>
            </div> */}
            {formData.complianceApplicable && (
              <MultiSelect
                title="Select Compliance Categories"
                options={options}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                handleSelect={handleSelect}
                disabled={false} // Set to true if you want to disable the dropdown
                setOptions={setOptions}
                searchOptions={options} // Pass the original options for search filtering
                compTitle="Select Compliance Categories" // Default title when no option is selected
              />
            )}
          </div>
          <h2 className="border-b text-center text-xl my-5 border-black mb-6 font-semibold">
            Address
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Address Line 1 :
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                id=""
                placeholder="Address"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Address Line 2 :
              </label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                id=""
                placeholder="Address"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                District :
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                id=""
                placeholder="District"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                City :
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                id=""
                placeholder=" Enter City"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                State :
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                id=""
                placeholder="Enter State"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Pin code :
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                id=""
                placeholder="Enter Pincode"
                className="border p-1 px-4 border-gray-500 rounded-md"
                pattern="[0-9]*"
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Enter Country :
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                id=""
                placeholder="Country"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
          </div>
          <h2 className="border-b text-center text-xl my-5 border-black mb-6 font-semibold">
            Bank Details
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Account Name :
              </label>
              <input
                type="text"
                name="account_name"
                value={formData.account_name}
                onChange={handleChange}
                id=""
                placeholder="Enter Account Name"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Account Number :
              </label>
              <input
                type="text"
                name="account_number"
                value={formData.account_number}
                id=""
                onChange={handleChange}
                placeholder="Enter Account Number"
                className="border p-1 px-4 border-gray-500 rounded-md"
                pattern="[0-9]*"
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Bank & Branch Name :
              </label>
              <input
                type="text"
                name="bank_branch_name"
                value={formData.bank_branch_name}
                onChange={handleChange}
                id=""
                placeholder=" Enter Bank & Branch"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                IFSC Code :
              </label>
              <input
                type="text"
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={handleChange}
                id=""
                placeholder="IFSC"
                className="border p-1 px-4 border-gray-500 rounded-md"
              />
            </div>
          </div>
          <h2 className="border-b text-center text-xl my-5 border-black mb-6 font-semibold">
            Attachments
          </h2>
          <FileInputBox
            handleChange={(files) => handleFileChange(files, "attachments")}
            fieldName={"attachments"}
            isMulti={true}
          />
          <div className="flex gap-5 justify-center items-center my-4">
            <button
              onClick={handleSubmit}
              className="bg-black text-white hover:bg-gray-700 font-semibold text-xl py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddSupplier;
