import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { postPantry } from "../../api";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddPantry = () => {

  const navigate = useNavigate(); // Initialize navigate at the top level
  const themeColor = useSelector((state) => state.theme.color);
  const userId = getItemInLocalStorage("UserId");

  const [formData, setFormData] = useState({
    item_name: "",
    stock: "",
    description: "",
    created_by_id: "",
    status: "",
    attachfiles: [],
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (files, fieldName) => {
    // Changed to receive 'files' directly
    setFormData({
      ...formData,
      [fieldName]: files,
    });
    console.log(fieldName);
  };
  

  const handleSubmit = async () => {
    try {
      const sendData = new FormData();
      sendData.append("pantry[item_name]", formData.item_name);
      sendData.append("pantry[created_by_id]", userId);
      sendData.append("pantry[stock]", formData.stock);
      sendData.append("pantry[description]", formData.description);

      formData.attachfiles.forEach((file) => {
        sendData.append("attachfiles[]", file);
      });

      const resp = await postPantry(sendData);

      if (resp.status === 200 || resp.status === 201) {
        toast.success("Pantry Created Successfully");
        // Navigate("/admin");
        navigate("/admin/fb");
      } else {
        toast.error("Failed to create pantry. Please try again.");
      }
    } catch (error) {
      console.error("Error while creating pantry:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <section className="min-h-screen p-4 sm:p-0 flex  md:flex-row">
      <Navbar />

      <div className="border border-gray-300 rounded-lg w-full md:mx-20 px-8 flex flex-col my-2 gap-5">

        <h2
          style={{ background: "rgb(19 27 32)" }}
          className="text-center md:text-xl font-bold p-2 my-2 bg-black rounded-md text-white"
        >
          Add New Item
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="name" className="font-semibold">
              Name :
            </label>
            <input
              type="text"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Item Name"
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="stock" className="font-semibold">
              Stock :
            </label>
            <input
              type="text"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Stock"
            />
          </div>

        </div>
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="stock" className="font-semibold">
            Description :
          </label>
          <textarea
            name="description"
            id=""
            cols="30"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded-md"
          ></textarea>
        </div>
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="stock" className="font-semibold">
            Upload Image :
          </label>
          <FileInputBox
            handleChange={(files) =>
              handleFileChange(files, "attachfiles")
            }
            fieldName={"attachfiles"}
            isMulti={true}
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-black text-white hover:bg-gray-700 font-semibold text-xl py-1 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddPantry;
