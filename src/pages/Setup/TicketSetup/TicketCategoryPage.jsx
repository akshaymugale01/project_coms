import React, { useEffect, useState } from "react";
// import TicketCategorySetup from './TicketCategorySetup';
import { useSelector } from "react-redux";
// import Table from "../../components/table/Table";
import { Link } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";

// import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import FileInputBox from "../../../containers/Inputs/FileInputBox";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Select from "react-select";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { getSetupUsers, postHelpDeskCategoriesSetup } from "../../../api";

const TicketCategoryPage = ({ handleToggleCategoryPage, setCatAdded }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [engineers, setEngineers] = useState([]);
  const [categoryAdded, setCategoryAdded] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    engineer: [],
    minTat: "",
  });

  const handleCheckboxChange = () => {
    // setIsChecked(!isChecked);
  };

  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const themeColor = useSelector((state) => state.theme.color);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const deleteFaq = (index) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
  };

  const handleFaqChange = (index, type, value) => {
    const newFaqs = faqs.map((faq, i) => {
      if (i === index) {
        return { ...faq, [type]: value };
      }
      return faq;
    });
    setFaqs(newFaqs);
  };
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
  console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const siteId = getItemInLocalStorage("SITEID");

  const handleAddCategory = async () => {
    if (formData.category === "") {
      return toast.error("Please provide category");
    }
    const sendData = new FormData();
    sendData.append("helpdesk_category[society_id]", siteId);
    sendData.append("helpdesk_category[of_phase]", "pms");
    sendData.append("helpdesk_category[name]", formData.category);
    sendData.append("helpdesk_category[tat]", formData.minTat);
    const engineers = Array.isArray(formData.engineer) ? formData.engineer : [];
    engineers.forEach((workerId, index) => {
      sendData.append(`complaint_worker[assign_to][]`, workerId);
    });
    try {
      const resp = await postHelpDeskCategoriesSetup(sendData);
      setCatAdded(true);
      handleToggleCategoryPage();
      setFormData({ ...formData, category: "", minTat: "", engineer: [] });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setCatAdded(false);
      }, 500);
    }
  };

  const engineerOptions = engineers.map((engineer) => ({
    value: engineer.id,
    label: `${engineer.firstname} ${engineer.lastname}`,
  }));

  useEffect(() => {
    const fetchSetupUser = async () => {
      try {
        const userResp = await getSetupUsers();
        const filteredTechnician = userResp.data.filter(
          (tech) => tech.user_type === "pms_technician"
        );

        setEngineers(filteredTechnician);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSetupUser();
  }, []);
  return (
    <div className="">
      {/* <h1 className="text-2xl font-bold mb-4">Dynamic FAQ Form</h1> */}
      <div className="grid md:grid-cols-3 gap-4 ">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Enter Category </label>
          <input
            type="text"
            className="border p-2 w-full rounded-md"
            placeholder="Enter Category"
            value={formData.category}
            onChange={handleChange}
            name="category"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Select Engineer</label>
          <Select
            isMulti
            options={engineerOptions}
            value={engineerOptions.filter((opt) =>
              formData.engineer.includes(opt.value)
            )}
            onChange={(selected) =>
              setFormData({
                ...formData,
                engineer: selected ? selected.map((opt) => opt.value) : [],
              })
            }
            placeholder="Select Engineer"
            className="w-full"
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Response Time (min)</label>
          <input
            type="number"
            className="border p-2 w-full rounded-md"
            placeholder="Response Time"
            value={formData.minTat}
            onChange={handleChange}
            name="minTat"
          />
        </div>
      </div>
      {/* <div className="form-group">
          <label className="block mb-2">Enable Sites</label>
          <select type="text" className="border p-2 w-full" placeholder='Enable Sites' 
          >
            <option value="">vibe site 1</option>
            <option value="">vibe site 2</option>
          </select>
        </div> */}
      {/* {isChecked && (
           <div className="form-group">
            <label className="block mb-2">Enter  Vendor Email</label>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Enter some text"
        /></div>
      )} */}

      {/* <div className="flex items-center mb-4">
        <input
          id="toggleInput"
          type="checkbox"
          className="mr-2"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="toggleInput" className="text-gray-700">
          Vendor Email
        </label>
      </div> */}

      {/* <div className="form-group  "> */}
      {/* <label className="block mb-2">Response Time (min)</label> */}
      {/* <input type="file" className="border p-2 w-full" /> */}
      {/* <FileInputBox/> */}
      {/* </div> */}
      {/* <h2 className="text-xl mt-2 font-semibold mb-4">FAQs</h2> */}
      {/* <div>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2">Question</label>
            <textarea
              rows="3"
              className="border p-2 w-full mb-2"
              value={faq.question}
              placeholder='Question'
              onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
            ></textarea>
            <label className="block mb-2">Answer</label>
            <textarea
              rows="3"
              className="border p-2 w-full mb-2"
              value={faq.answer}
              placeholder='Answer'
              onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
            ></textarea>
            <button
              className="bg-red-500 text-white px-4 py-2"
              onClick={() => deleteFaq(index)}
              
            >
              Delete
            </button>
          </div>
        ))}
      </div> */}

      {/* <button
        className="bg-blue-500 text-white px-4 py-2"
        style={{background:themeColor}}
        onClick={addFaq}
      >
        Add Question/Answer
      </button>
      */}
      <div className="flex justify-center my-2 gap-4">
        <button
          className=" font-semibold hover:bg-black hover:text-white transition-all  p-2 px-4 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
          style={{ background: themeColor }}
          onClick={handleAddCategory}
        >
          Add
        </button>
        <button
          onClick={handleToggleCategoryPage}
          className="  px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Cancel
        </button>
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

export default TicketCategoryPage;
