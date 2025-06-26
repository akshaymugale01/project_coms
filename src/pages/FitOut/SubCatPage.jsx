import React, { useEffect, useState } from "react";
// import TicketCategorySetup from './TicketCategorySetup';
import { useSelector } from "react-redux";
// import Table from "../../components/table/Table";
import { Link } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";

// import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import {
  getFitOutCategoriesSetup,
  getHelpDeskCategoriesSetup,
  postFitOutSubCategoriesSetup,
  postHelpDeskSubCategoriesSetup,
} from "../../api";
const SubCatPage = ({ handleToggleCategoryPage1, setCAtAdded }) => {
  //   const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);
  const themeColor = useSelector((state) => state.theme.color);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const openModal1 = () => setIsModalOpen1(true);
  const closeModal1 = () => setIsModalOpen1(false);
  // const [inputValue, setInputValue] = useState("");

  const [isOpen, setIsOpen] = useState({
    building: false,
    wing: false,
    zone: false,
    floor: false,
    room: false,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    building: [],
    wing: [],
    zone: [],
    floor: [],
    room: [],
  });

  const options = {
    building: [
      "HDFC Ergo Bhandup",
      "Test Building 111",
      "Tower 101",
      "Sarova Nirvana",
      "Jeevandeep",
      "Test Twin Tower",
      "Decker Bldg",
      "PMT Wing",
    ],
    wing: [
      "Wing 1 - HDFC Ergo Bhandup",
      "Test Building 1111 - Test Building 111",
      "Wing 2 - HDFC Ergo Bhandup",
    ],
    floor: [
      "Floor 1 - Area 1 - Wing 1 - HDFC Ergo Bhandup",
      "Floor 2 - Area 1 - Wing 1 - HDFC Ergo Bhandup",
    ],
    zone: [
      "Area 1 - Wing 1 - HDFC Ergo Bhandup",
      "Area 1 - Wing 2 - HDFC Ergo Bhandup",
    ],
    room: ["Room 1", "Room 2", "Room 3", "Room 4"],
  };

  const toggleSelect = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleOptionChange = (section, value) => {
    if (selectedOptions[section].includes(value)) {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [section]: prevState[section].filter((option) => option !== value),
      }));
    } else {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [section]: [...prevState[section], value],
      }));
    }
  };
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    // categories: "",
    fitout_category_name: "",
    fitout_category_id: "",
    name: [],
    subCategory: [],
    active: true,
    bhk_prices: {
      "2BHK": "",
      "3BHK": "",
      "4BHK": "",
    },
    fitout_text: "",
  });

  console.log("FormData", formData);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const catResp = await getFitOutCategoriesSetup();
        setCategories(catResp.data);
        // console.log("catResp", catResp)
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);
  const handleAddSubCat = async () => {
    if (!formData.fitout_category_id) {
      return toast.error("Please select a category!");
    }

    if (formData.name.length === 0 && !inputValue.trim()) {
      return toast.error("Please add at least one subcategory!");
    }

    // If there's text in input, add it to the list first
    let finalSubcategories = [...formData.name];
    if (inputValue.trim()) {
      finalSubcategories = [...formData.name, inputValue.trim()];
    }

    const sendData = new FormData();
    sendData.append(
      "fitout_subcategory[fitout_category_id]",
      formData.fitout_category_id
    );
    sendData.append(
      "fitout_subcategory[fitout_category_name]",
      formData.fitout_category_name
    );
    // sendData.append(
    //   "fitout_subcategory[bhk_prices]",
    //   JSON.stringify(formData.bhk_prices)
    // );
    // Convert name array into comma-separated string
    if (Array.isArray(finalSubcategories)) {
        finalSubcategories.forEach((tag) => {
          sendData.append("name_tags[]", tag);
        });
      } else {
        console.error("finalSubcategories is not an array:", finalSubcategories);
      }

    try {
      const resp = await postFitOutSubCategoriesSetup(sendData);
      // await fetchSubCategories();
      console.log(resp);
      toast.success("Sub Category Added Successfully");
      setFormData({
        fitout_category_id: "",
        fitout_category_name: "",
        name: [],
        subCategory: [],
        active: true,
        bhk_prices: {
          "2BHK": "",
          "3BHK": "",
          "4BHK": "",
        },
        fitout_text: "",
      });
      setInputValue(""); // Clear input after successful submission
       setCAtAdded(Date.now());
    } catch (error) {
      console.log(error);
    }
  };

  const [inputValue, setInputValue] = useState("");

  const handleBHKPriceChange = (bhkType, value) => {
    setFormData((prev) => ({
      ...prev,
      bhk_prices: {
        ...prev.bhk_prices,
        [bhkType]: value,
      },
    }));
  };

  // const AddSubCat = (e) => {
  //   if (e.key === "Enter" && inputValue.trim()) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       name: [...prevFormData.name, inputValue.trim()],
  //     }));
  //     setTimeout(() => setInputValue(""), 0);
  //   }
  // };
  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fitout_category_id") {
      // Convert value to string for comparison
      const selectedCategory = categories.find(
        (cat) => String(cat.id) === value
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        fitout_category_id: value, // Store ID
        fitout_category_name: selectedCategory ? selectedCategory.name : "", // Store Name
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    <div className=" ">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <select
            className="border p-2 rounded-md"
            value={formData.fitout_category_id}
            onChange={handleChange}
            name="fitout_category_id"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          value={inputValue} 
          name="name"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim()) {
              e.preventDefault();
              setFormData((prevFormData) => ({
                ...prevFormData,
                name: [...prevFormData.name, inputValue.trim()],
              }));
              setInputValue("");
            }
          }}
          placeholder="Enter Sub Category"
          className="border p-2 rounded-md"
        />
        {/* <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            value={formData.bhk_prices["2BHK"] || ""}
            onChange={(e) => handleBHKPriceChange("2BHK", e.target.value)}
            placeholder="2BHK Price"
            className="border p-1 rounded-md"
          />
          <input
            type="number"
            value={formData.bhk_prices["3BHK"] || ""}
            onChange={(e) => handleBHKPriceChange("3BHK", e.target.value)}
            placeholder="3BHK Price"
            className="border p-1 rounded-md"
          />
          <input
            type="number"
            value={formData.bhk_prices["4BHK"] || ""}
            onChange={(e) => handleBHKPriceChange("4BHK", e.target.value)}
            placeholder="4BHK Price"
            className="border p-1 rounded-md"
          />
          <input
            type="number"
            value={formData.bhk_prices["Flat RK"] || ""}
            onChange={(e) => handleBHKPriceChange("Flat RK", e.target.value)}
            placeholder="Flat RK Price"
            className="border p-1 rounded-md"
          />
          <input
            type="number"
            value={formData.bhk_prices["Flat 1RK"] || ""}
            onChange={(e) => handleBHKPriceChange("Flat 1RK", e.target.value)}
            placeholder="Flat 1RK Price"
            className="border p-1 rounded-md"
          />
        </div> */}

        {/* <input
          type="text"
          value={formData.fitout_text}
          placeholder="Enter Description"
          className="border p-1 rounded-md"
        /> */}
      </div>
      <div className="flex item-center justify-center py-3 gap-2">
        <button
          style={{ background: themeColor }}
          type="button"
          className="px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={() => {
            if (inputValue.trim()) {
              setFormData((prevFormData) => ({
                ...prevFormData,
                name: [...prevFormData.name, inputValue.trim()],
              }));
              setInputValue("");
            } else {
              toast.error("Please enter a subcategory name!");
            }
          }}
        >
          Add to List
        </button>
        <button
          style={{ background: themeColor }}
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleAddSubCat}
        >
          Submit
        </button>
        <button
          onClick={handleToggleCategoryPage1}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Cancel
        </button>
      </div>

      {/* <div className="flex flex-wrap gap-2 border border-gray-300 p-1 my-2 rounded-md"> */}
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.name.length > 0 && (
          <div>
            {formData.name.map((subCat, index) => (
              <div key={index} className="border p-4 my-2 rounded-md shadow">
                <h3 className="text-lg font-semibold">Subcategory: {subCat}</h3>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={subCat}
                    readOnly
                    className="border p-2 rounded-md"
                  />
                  <input
                    type="text"
                    value={formData.fitout_category_name}
                    readOnly
                    className="border p-2 rounded-md"
                  />
                </div>

                <button
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      name: prev.name.filter((_, i) => i !== index),
                    }));
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* </div> */}

      {isModalOpen1 && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeModal1}
          ></div>
          <div className="bg-white  rounded-lg shadow-lg p-4  z-10 w-2/3">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal1}
            >
              <FaTimes size={25} />
            </button>
            <h2 className="font-semibold mb-4">Edit Sub Category</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="">
                <label className=" mb-2">Category</label>
                <select type="text" className="border p-2 w-full" />
              </div>
              <div className="">
                <label className=" mb-2">Sub Category</label>
                <input className="border p-2 w-full"></input>
              </div>

              <form className="">
                {Object.keys(options).map((section) => (
                  <div key={section} className="">
                    <div className="flex flex-col">
                      <span>
                        <div></div>
                        <input type="checkbox" />
                        &nbsp; &nbsp;<label htmlFor="">{section}</label>
                        <br />
                      </span>
                      <span className="flex flex-col">
                        {/* <div className="mr-2">Select {section}:</div> */}
                        <br />
                        <div className="relative">
                          <input
                            type="text"
                            readOnly
                            value={selectedOptions[section].join(", ")}
                            onClick={() => toggleSelect(section)}
                            className="cursor-pointer mt-2 p-2 border border-gray-300 rounded-md w-full"
                          />
                          &nbsp;
                          {isOpen[section] && (
                            <div className="absolute top-full z-10 mt-1 w-full rounded-md shadow-lg bg-white border border-gray-300">
                              {options[section].map((option) => (
                                <label key={option} className="block p-2">
                                  <input
                                    type="checkbox"
                                    value={option}
                                    checked={selectedOptions[section].includes(
                                      option
                                    )}
                                    onChange={() =>
                                      handleOptionChange(section, option)
                                    }
                                    className="mr-2"
                                  />
                                  {option}
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      </span>
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div>
        <span className="flex justify-center mb-2 gap-4">
          {/* <Link
              to={"/admin/add-rvehicles"}
              className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
              style={{ height: "1cm" }}
            >
              <PiPlusCircle size={20} />
              Add
            </Link> */}
        </span>
      </div>
      {/* <Table
          responsive
          //   selectableRows
          columns={columns}
          data={data}
          isPagination={true}
        /> */}
    </div>
  );
};

export default SubCatPage;
