import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import FileInputBox from "../../../containers/Inputs/FileInputBox";
import toast from "react-hot-toast";
import { postCamBilling } from "../../../api";
import { useNavigate } from "react-router-dom";
import { getItemInLocalStorage } from "../../../utils/localStorage";
function BillingAddress() {
  const themeColor = useSelector((state) => state.theme.color);
  const buildings = getItemInLocalStorage("Building");
  const [formData, setFormData] = useState({
    title: "",
    buildingName: "",
    address: "",
    state: "",
    phone: "",
    fax: "",
    email: "",
    registrationNo: "",
    pan: "",
    gst: "",
    chequeInFavourOf: "",
    notes: "",
    accountNumber: "",
    accountName: "",
    accountType: "",
    bankBranchName: "",
    ifsc: "",
    signature: [], // For file input
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();
  const handleAddressSetup = async () => {
    if (!formData.title || formData.title.trim() === "") {
      toast.error("Title is required");
      return;
    }
    if (!formData.address || formData.address.trim() === "") {
      toast.error("Address is required");
      return;
    }
    if (!formData.phone) {
      toast.error("Phone number is required");
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Phone number must be 10 digits");
      return;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Valid email address is required");
      return;
    }
    if (!formData.gst || formData.gst.trim() === "") {
      toast.error("GST number is required");
      return;
    }
    const sendData = new FormData();
    sendData.append("address_setup[title]", formData.title);
    sendData.append("address_setup[address]", formData.address);
    sendData.append("address_setup[building_id]", formData.buildingName);
    sendData.append("address_setup[state]", formData.state);
    sendData.append("address_setup[phone_number]", formData.phone);
    sendData.append("address_setup[fax_number]", formData.fax);
    sendData.append("address_setup[registration_no]", formData.registrationNo);
    sendData.append("address_setup[email_address]", formData.email);
    sendData.append("address_setup[pan_number]", formData.pan);
    sendData.append(
      "address_setup[cheque_in_favour_of]",
      formData.chequeInFavourOf
    );
    sendData.append("address_setup[gst_number]", formData.gst);
    sendData.append("address_setup[account_number]", formData.accountNumber);
    sendData.append("address_setup[account_type]", formData.accountType);
    sendData.append("address_setup[ifsc_code]", formData.ifsc);
    sendData.append("address_setup[account_name]", formData.accountName);
    sendData.append("address_setup[bank_branch_name]", formData.bankBranchName);
    formData.signature.forEach((file, index) => {
      sendData.append(`attachments[]`, file);
    });
    try {
      const billing = await postCamBilling(sendData);
      toast.success("Address Setup Request Added");
      navigate("/admin/billing-setup");
      console.log("Address request Response", billing);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formData);

  const handleFileChange = (files, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
  };

  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex  flex-col overflow-hidden">
        <h2
          style={{ background: "rgb(3 19 37)" }}
          className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10"
        >
          Invoice Address Setup
        </h2>
        <div className="flex justify-center">
          <div className="sm:border border-gray-400 p-1 md:px-10 rounded-lg w-4/5 mb-14">
            <h2 className="border-b border-black my-5 font-semibold text-xl">
              Address Setup
            </h2>
            <div className="md:grid grid-cols-2 gap-5 my-3">
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Address Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Address Title"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="buildingName" className="font-semibold my-2">
                  Building Name
                </label>
                <select
                  name="buildingName"
                  id="buildingName"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.buildingName}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select building
                  </option>
                  {buildings?.map((building) => (
                    <option key={building.id} value={building.id}>
                      {building.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="" className="font-semibold my-2">
                  Address
                </label>
                <textarea
                  name="address"
                  id=""
                  cols="5"
                  rows="3"
                  placeholder="Enter Address"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="state" className="font-semibold my-2">
                  State
                </label>
                <select
                  name="state"
                  id="state"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select State
                  </option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">
                    Dadra and Nagar Haveli and Daman and Diu
                  </option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phone"
                  placeholder="Enter Phone Number "
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Fax Number
                </label>
                <input
                  type="text"
                  name="fax"
                  placeholder="Enter Fax Number "
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.fax}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Registration No:
                </label>
                <input
                  type="text"
                  name="registrationNo"
                  placeholder="Enter Registration No:"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.registrationNo}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  PAN Number
                </label>
                <input
                  type="text"
                  name="pan"
                  placeholder="Enter PAN Number  "
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.pan}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  GST Number
                </label>
                <input
                  type="test"
                  name="gst"
                  placeholder="Enter GST Number"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.gst}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Cheque In Favour Of
                </label>
                <input
                  type="test"
                  name="chequeInFavourOf"
                  placeholder="Enter Cheque In Favour Of"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.chequeInFavourOf}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="md:grid grid-cols-2 gap-5 my-3">
              <div className="flex flex-col col-span-2">
                <label htmlFor="" className="font-semibold my-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  id=""
                  cols="5"
                  rows="3"
                  placeholder="Notes "
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h2 className="border-b border-black my-5 font-semibold text-xl">
              Bank Details
            </h2>
            <div className="md:grid grid-cols-2 gap-5 my-3">
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Enter Account Number"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.accountNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Account Name
                </label>
                <input
                  type="text"
                  name="accountName"
                  placeholder="Enter Account Name"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.accountName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="accountType" className="font-semibold my-2">
                  Account type
                </label>
                <select
                  name="accountType"
                  id="accountType"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.accountType}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select Account type
                  </option>
                  <option value="current">Current</option>
                  <option value="savings">Savings</option>
                </select>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Bank & Branch Name
                </label>
                <input
                  type="text"
                  name="bankBranchName"
                  placeholder="Enter Bank & Branch Name"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.bankBranchName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  IFSC Code:
                </label>
                <input
                  type="text"
                  name="ifsc"
                  placeholder="Enter IFSC Code: "
                  className="border p-1 px-4 border-gray-500 rounded-md"
                  value={formData.ifsc}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col col-span-2 ">
                <label htmlFor="" className="font-semibold my-2">
                  Attach Signature:
                </label>
                <FileInputBox
                  handleChange={(files) => handleFileChange(files, "signature")}
                  fieldName={"signature"}
                />
              </div>
            </div>
            <div className="flex justify-center my-8 gap-2 ">
              <button
                onClick={handleAddressSetup}
                style={{ background: themeColor }}
                className="bg-black text-white p-2 px-4 rounded-md font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BillingAddress;
