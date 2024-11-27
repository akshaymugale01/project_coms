import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import { postAddress } from "../../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddAddressesSetup() {
  const themeColor = useSelector((state) => state.theme.color);

  const [formData, setFormData] = useState({
    title: "",
    buildingName: "",
    email: "",
    state: "",
    street: "",
    city: "",
    phone: "",
    pinCode: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const navigate = useNavigate()
  const handleAddressSubmit = async() => {
    const sendData = new FormData();
    sendData.append("address[address_title]", formData.title);
    sendData.append("address[building_name]", formData.buildingName);
    sendData.append("address[street_name]", formData.street);
    sendData.append("address[email_address]", formData.email);
    sendData.append("address[state]", formData.state);
    sendData.append("address[city]", formData.city);
    sendData.append("address[phone_number]", formData.phone);
    sendData.append("address[pin_code]", formData.pinCode);

    try {
        const addresResp = await postAddress(sendData)
        toast.success("Address Added Successfully")
navigate("/admin/addresses-setup")
        console.log(addresResp)
    } catch (error) {
        console.log(error)
    }
  };

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
          Add Address Setup
        </h2>
        <div className="flex justify-center">
          <div className="sm:border border-gray-400 p-1 md:px-10 rounded-lg w-4/5 mb-14">
            <h2 className="border-b border-black my-5 font-semibold text-xl">
              Address Setup
            </h2>
            <div className="md:grid grid-cols-3 gap-5 my-3">
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Address Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
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
                  value={formData.buildingName}
                  onChange={handleChange}
                  name="buildingName"
                  placeholder="Enter Building Name"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Phone Number
                </label>
                <input
                  type="number"
                  value={formData.phone}
                  onChange={handleChange}
                  name="phone"
                  placeholder="Enter Phone Number "
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter Email Address"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Street Name
                </label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={handleChange}
                  name="street"
                  placeholder="Enter Street Name"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  name="city"
                  placeholder="Enter City"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  name="state"
                  placeholder="Enter State"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Pin Code
                </label>
                <input
                  type="text"
                  value={formData.pinCode}
                  onChange={handleChange}
                  name="pinCode"
                  placeholder="Enter Pin Code"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>

              {/* <div className="flex flex-col ">
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
                  placeholder="Enter Fax Number"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
            </div>
            <div className="md:grid grid-cols-2 gap-5 my-3">
              <div className="flex flex-col">
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
              </div> */}
            </div>
            <div className="flex justify-center my-8 gap-2 ">
              <button onClick={handleAddressSubmit} className="bg-black text-white p-2 px-4 rounded-md font-medium">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddAddressesSetup;
