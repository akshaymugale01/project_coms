import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { Link, useRevalidator } from "react-router-dom";
import {
  PiArrowArcLeftBold,
  PiBookBookmark,
  PiPlusCircle,
} from "react-icons/pi";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { postForum } from "../../api";
import toast from "react-hot-toast";

function CreateForum() {
  const navigate = useNavigate();
  const themeColor = useSelector((state) => state.theme.color);
  const [errors, setErrors] = useState({});


  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: "",
    description: "",
    attachments: "",
  });

const validateForm = () => {
  if (
    !formData.title.trim() ||
    !formData.category ||
    !formData.description.trim()
  ) {
    return false;
  }
  return true;

};

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    setFormData((prevFormData) => ({
      ...prevFormData,
      attachments: file,
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateForum = async () => {
      if (!validateForm()) {
    toast.error("Please fill all mandatory fields");
    return;
  }
    const postData = new FormData();
   
    postData.append("forum[thread_title]", formData.title);
    postData.append("forum[thread_category]", formData.category);
    postData.append("forum[thread_tags]", formData.tags);
    postData.append("forum[thread_description]", formData.description);
    postData.append("forum[thread_description]", formData.description);

    if (formData.attachments) {
      postData.append("attachfiles[]", formData.attachments);
    }
    try {
      const res = await postForum(postData);
      toast.success("Forum created successfully");
      navigate("/communication/forum");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex mx-3 flex-col overflow-hidden mb-5">
        <div className="flex justify-center">
          <div className="border border-gray-400 rounded-md my-5 w-4/5">
            <h2
              style={{ background: themeColor }}
              className="text-center text-xl font-bold my-2 p-2  rounded-md text-white mx-2"
            >
              Create Forum
            </h2>
            <div className="md:grid grid-cols-3 mx-5 gap-5 mt-5 mb-2">
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter Title "
                  className="border p-2 px-4 border-gray-400 rounded-md"
                  onChange={handleChange}
                  value={formData.title}
                  name="title"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Category
                </label>
                <select
                  className="border p-2 px-4 border-gray-400 rounded-md"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category </option>
                  <option value="General">General</option>
                  <option value="Discussion">Discussion</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Support">Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="#tags"
                  className="border p-2 px-4 border-gray-400 rounded-md"
                  value={formData.tags}
                  name="tags"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols mx-5 gap-5 my-2">
              <div className="flex flex-col ">
                <label htmlFor="" className="font-semibold my-2">
                  Thread Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  id=""
                  cols="5"
                  rows="3"
                  placeholder="Description"
                  className="border p-2 px-4 border-gray-400 rounded-md"
                />
              </div>
            </div>
            <div className="mx-5 flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Forum profile picture
              </label>
              <input
                type="file"
                className="border p-2 rounded-md"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex justify-center my-4 gap-2">
              <button
                onClick={handleCreateForum}
                style={{ background: themeColor }}
                className="bg-black h text-white p-2 px-4 rounded-md font-medium"
              >
                Create Forum
              </button>
            </div >
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateForum;
