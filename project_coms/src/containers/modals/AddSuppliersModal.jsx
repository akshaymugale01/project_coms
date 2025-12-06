import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import Select from "react-select";
import toast from "react-hot-toast";
import { postVendors, getVendorsType, getVendorCategory } from "../../api";
import { useNavigate } from "react-router-dom";

const AddSuppliers = ({ onclose, fetchVendors }) => {
  // const supplierOptions = [
  //   { value: "ppm", label: "PPM" },
  //   { value: "manufacturer", label: "Manufacturer" },
  //   { value: "amc", label: "AMC" },
  // ];

  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
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

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  const validateRequired = (value) => {
    return (
      value !== null && value !== undefined && value.toString().trim() !== ""
    );
  };

  const validateAlphaNumeric = (value) => {
    const alphaNumRegex = /^[a-zA-Z0-9\s]*$/;
    return alphaNumRegex.test(value);
  };

  const validateOnlyNumbers = (value) => {
    const numberRegex = /^[0-9]*$/;
    return numberRegex.test(value);
  };

  const validateGST = (gst) => {
    // GST format: 2 digits state code + 10 alphanumeric PAN + 1 entity code + 1 check digit + 1 default 'Z'
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
  };

  const validatePAN = (pan) => {
    // PAN format: 5 letters + 4 digits + 1 letter
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validatePincode = (pincode) => {
    const pincodeRegex = /^[0-9]{6}$/;
    return pincodeRegex.test(pincode);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s\-_.&()]+$/;
    return nameRegex.test(name) && name.length >= 2;
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "companyName":
      case "venderName":
        if (value && !validateName(value)) {
          error = "Name should contain only letters, spaces, and basic punctuation";
        } else if (value && value.length < 2) {
          error = "Name should be at least 2 characters long";
        }
        break;
      case "primaryEmail":
        if (value && !validateEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "primaryPhone":
      case "secondaryPhone":
        if (value && !validateMobileNumber(value)) {
          error = "Please enter a valid 10-digit mobile number";
        }
        break;
      case "GSTNumber":
        if (value && !validateGST(value)) {
          error = "Please enter a valid GST number (15 characters)";
        }
        break;
      case "PANNumber":
        if (value && !validatePAN(value)) {
          error = "Please enter a valid PAN number (e.g., ABCDE1234F)";
        }
        break;
      case "pincode":
        if (value && !validatePincode(value)) {
          error = "Please enter a valid 6-digit pincode";
        }
        break;
      case "country":
      case "state":
      case "city":
        if (value && !validateName(value)) {
          error = "Please enter valid characters only";
        }
        break;
      case "addressLine1":
      case "addressLine2":
        if (value && !/^[a-zA-Z0-9\s\-_.,#/()]+$/.test(value)) {
          error = "Please enter valid address characters only";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const updateValidationError = (fieldName, error) => {
    setValidationErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const clearValidationError = (fieldName) => {
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle specific input restrictions
    if (name === "primaryPhone" || name === "secondaryPhone") {
      // Only allow numbers for phone fields
      if (value && !validateOnlyNumbers(value)) {
        updateValidationError(name, "Only numbers are allowed");
        return;
      }
    }

    if (name === "pincode") {
      // Only allow numbers for pincode
      if (value && !validateOnlyNumbers(value)) {
        updateValidationError(name, "Only numbers are allowed");
        return;
      }
    }

    if (name === "GSTNumber") {
      // Convert to uppercase for GST
      const upperValue = value.toUpperCase();
      setFormData({
        ...formData,
        [name]: upperValue,
      });
      
      // Validate GST
      const validationError = validateField(name, upperValue);
      if (validationError) {
        updateValidationError(name, validationError);
      } else {
        clearValidationError(name);
      }
      return;
    }

    if (name === "PANNumber") {
      // Convert to uppercase for PAN
      const upperValue = value.toUpperCase();
      setFormData({
        ...formData,
        [name]: upperValue,
      });
      
      // Validate PAN
      const validationError = validateField(name, upperValue);
      if (validationError) {
        updateValidationError(name, validationError);
      } else {
        clearValidationError(name);
      }
      return;
    }

    // Real-time validation for other fields
    const validationError = validateField(name, value);
    if (validationError) {
      updateValidationError(name, validationError);
    } else {
      clearValidationError(name);
    }

    setFormData({
      ...formData,
      [name]: value,
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
    // Enhanced form validation
    const errors = {};

    // Validate required fields
    if (!validateRequired(formData.companyName)) {
      errors.companyName = "Please Enter Company Name";
    } else if (!validateName(formData.companyName)) {
      errors.companyName = "Please enter a valid company name";
    }

    if (!validateRequired(formData.venderName)) {
      errors.venderName = "Please Enter Vendor Name";
    } else if (!validateName(formData.venderName)) {
      errors.venderName = "Please enter a valid vendor name";
    }

    if (!validateRequired(formData.primaryEmail)) {
      errors.primaryEmail = "Please Enter Primary Email Id";
    } else if (!validateEmail(formData.primaryEmail)) {
      errors.primaryEmail = "Please enter a valid email address";
    }

    if (!validateRequired(formData.primaryPhone)) {
      errors.primaryPhone = "Please Enter Primary Phone Number";
    } else if (!validateMobileNumber(formData.primaryPhone)) {
      errors.primaryPhone = "Please enter a valid 10-digit phone number";
    }

    // Validate optional fields if they have values
    if (formData.secondaryPhone && !validateMobileNumber(formData.secondaryPhone)) {
      errors.secondaryPhone = "Please enter a valid 10-digit secondary phone number";
    }

    if (formData.GSTNumber && !validateGST(formData.GSTNumber)) {
      errors.GSTNumber = "Please enter a valid GST number";
    }

    if (formData.PANNumber && !validatePAN(formData.PANNumber)) {
      errors.PANNumber = "Please enter a valid PAN number";
    }

    if (formData.pincode && !validatePincode(formData.pincode)) {
      errors.pincode = "Please enter a valid 6-digit pincode";
    }

    if (formData.country && !validateName(formData.country)) {
      errors.country = "Please enter a valid country name";
    }

    if (formData.state && !validateName(formData.state)) {
      errors.state = "Please enter a valid state name";
    }

    if (formData.city && !validateName(formData.city)) {
      errors.city = "Please enter a valid city name";
    }

    // Update validation errors
    setValidationErrors(errors);

    // If there are errors, show first error and return
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
      return;
    }

    // Original submission logic
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
      toast.loading("Adding Supplier Please Wait!");
      const response = await postVendors(PostData);
      toast.dismiss();
      toast.success("New Supplier Added Successfully!");
      fetchVendors();
      onclose();
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Error Adding New Supplier");
    }
  };

  // Helper component for validation error display
  const ValidationError = ({ error }) => {
    if (!error) return null;
    return <span className="text-red-500 text-xs mt-1 block">{error}</span>;
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
              <div className="flex flex-col">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  id=""
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm ${
                    validationErrors.companyName ? "border-red-500" : ""
                  }`}
                />
                <ValidationError error={validationErrors.companyName} />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="venderName"
                  placeholder="Vendor Name"
                  id=""
                  value={formData.venderName}
                  onChange={handleChange}
                  className={`border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm ${
                    validationErrors.venderName ? "border-red-500" : ""
                  }`}
                />
                <ValidationError error={validationErrors.venderName} />
              </div>
              <div className="flex flex-col">
                <input
                  type="email"
                  name="primaryEmail"
                  id=""
                  value={formData.primaryEmail}
                  onChange={handleChange}
                  placeholder="Primary Email"
                  className={`border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm ${
                    validationErrors.primaryEmail ? "border-red-500" : ""
                  }`}
                />
                <ValidationError error={validationErrors.primaryEmail} />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="primaryPhone"
                  id=""
                  value={formData.primaryPhone}
                  onChange={handleChange}
                  placeholder="Primary Phone"
                  maxLength="10"
                  onInput={(e) => {
                    // Only allow numbers
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  className={`border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm ${
                    validationErrors.primaryPhone ? "border-red-500" : ""
                  }`}
                />
                <ValidationError error={validationErrors.primaryPhone} />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="secondaryPhone"
                  id=""
                  value={formData.secondaryPhone}
                  onChange={handleChange}
                  placeholder="Secondary Phone"
                  maxLength="10"
                  onInput={(e) => {
                    // Only allow numbers
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  className={`border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm ${
                    validationErrors.secondaryPhone ? "border-red-500" : ""
                  }`}
                />
                <ValidationError error={validationErrors.secondaryPhone} />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="GSTNumber"
                  id=""
                  value={formData.GSTNumber}
                  onChange={handleChange}
                  placeholder="GST Number"
                  maxLength="15"
                  className={`border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm ${
                    validationErrors.GSTNumber ? "border-red-500" : ""
                  }`}
                />
                <ValidationError error={validationErrors.GSTNumber} />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="PANNumber"
                  id=""
                  value={formData.PANNumber}
                  onChange={handleChange}
                  placeholder="PAN Number"
                  maxLength="10"
                  className={`border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm ${
                    validationErrors.PANNumber ? "border-red-500" : ""
                  }`}
                />
                <ValidationError error={validationErrors.PANNumber} />
              </div>
              <div className="flex flex-col">
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
              <div className="flex flex-col">
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
              <div className="flex flex-col">
                <input
                  type="text"
                  name="country"
                  id=""
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className={`border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm ${
                    validationErrors.country ? "border-red-500" : ""
                  }`}
                />
                <ValidationError error={validationErrors.country} />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="state"
                  id=""
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className={`border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm ${
                    validationErrors.state ? "border-red-500" : ""
                  }`}
                />
                <ValidationError error={validationErrors.state} />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="city"
                  id=""
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={`border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm ${
                    validationErrors.city ? "border-red-500" : ""
                  }`}
                />
                <ValidationError error={validationErrors.city} />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="pincode"
                  id=""
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  maxLength="6"
                  onInput={(e) => {
                    // Only allow numbers
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  className={`border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm ${
                    validationErrors.pincode ? "border-red-500" : ""
                  }`}
                />
                <ValidationError error={validationErrors.pincode} />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="addressLine1"
                  id=""
                  value={formData.addressLine1}
                  onChange={handleChange}
                  placeholder="Address line 1"
                  className={`border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm ${
                    validationErrors.addressLine1 ? "border-red-500" : ""
                  }`}
                />
                <ValidationError error={validationErrors.addressLine1} />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="addressLine2"
                  id=""
                  value={formData.addressLine2}
                  onChange={handleChange}
                  placeholder="Address line 2"
                  className={`border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm ${
                    validationErrors.addressLine2 ? "border-red-500" : ""
                  }`}
                />
                <ValidationError error={validationErrors.addressLine2} />
              </div>
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
