import React from "react";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";

function EditBillingAddress() {
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex  flex-col overflow-hidden">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-10"
        >
         Edit Invoice Address Setup
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
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Building Name
                </label>
                <input
                  type="text"
                  name="buildingName"
                  placeholder="Enter Building Name"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="" className="font-semibold my-2">
                  Address
                </label>
                <textarea
                  name=""
                  id=""
                  cols="5"
                  rows="3"
                  placeholder="Enter Address"
                  className="border p-1 px-4 border-gray-500 rounded-md"
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
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Fax Number
                </label>
                <input
                  type="text"
                  placeholder="Enter Fax Number "
                  className="border p-1 px-4 border-gray-500 rounded-md"
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
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Registration No:
                </label>
                <input
                  type="text"
                  name="registration_no:"
                  placeholder="Enter Registration No:"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  PAN Number
                </label>
                <input
                  type="text"
                  placeholder="Enter PAN Number  "
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  GST Number
                </label>
                <input
                  type="test"
                  placeholder="Enter GST Number"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Cheque In Favour Of
                </label>
                <input
                  type="test"
                  placeholder="Enter Cheque In Favour Of"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
            </div>
            <div className="md:grid grid-cols-2 gap-5 my-3">
              <div className="flex flex-col col-span-2">
                <label htmlFor="" className="font-semibold my-2">
                  Notes
                </label>
                <textarea
                  name=""
                  id=""
                  cols="5"
                  rows="3"
                  placeholder="Notes "
                  className="border p-1 px-4 border-gray-500 rounded-md"
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
                  name=""
                  placeholder="Enter Bank & Branch Name"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                IFSC Code:
                </label>
                <input
                  type="text"
                  placeholder="Enter IFSC Code: "
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-center my-8 gap-2 ">
              <button
                style={{ background: themeColor }}
                className="bg-black text-white p-2 px-4 rounded-md font-medium"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditBillingAddress