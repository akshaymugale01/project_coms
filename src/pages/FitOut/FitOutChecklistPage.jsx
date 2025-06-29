import React, { useEffect, useState } from "react";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  getFitOutCategoriesSetup,
  getFitoutSubCategoriesSetup,
  postFitoutChecklist,
} from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
const FitOutChecklistPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [description, setDescription] = useState("");
  // const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      qnumber: "",
      qtype: "",
      descr: "",
      img_mandatory: false,
      quest_mandatory: true,
      active: true,
      options: [],
    },
  ]);
  const [answer, setAnswer] = useState([
    {
      qnumber: "",
      qtype: "",
      descr: "",
      img_mandatory: false,
      quest_mandatory: true,
      active: true,
      options: [],
    },
  ]);

  console.log("questions", questions);
  const SiteId = getItemInLocalStorage("siteId");
  const [formData, setFormData] = useState({
    title: "",
    snag_audit_category_id: "",
    snag_audit_sub_category_id: "",
    site_id: SiteId,
    user_id: "",
    check_type: "",
    resource_id: "",
    resource_type: "",
    description: "",
    company_id: "",
    active: true,
  });

  console.log("formData", formData);
  const fetchCatData = async () => {
    try {
      // setLoading(true);

      // Fetch Bookings
      const Response = await getFitOutCategoriesSetup();
      console.log("Category:", Response?.data);
      setCategory(Response?.data || []);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setError(`Failed to fetch data: ${error.message || error}`);
      // setLoading(false);
    }
  };

  const fetchSubCatData = async (categoryId) => {
    const Response = await getFitoutSubCategoriesSetup(categoryId);
    console.log("Subcategory Response:", Response?.data);
    setSubcategory(Response?.data || []);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnswerChange = (e) => {
    setAnswer({ ...answer, [e.target.name]: e.target.value });
  };

  const handleQuestChange = (e) => {
    setQuestions({ ...questions, [e.target.name]: e.target.value });
  };

  // console.log("category", category);
  useEffect(() => {
    fetchCatData();
    fetchSubCatData(category);
  }, []);

  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions([
        ...questions,
        { id: questions.length + 1, text: "", answerType: "Text", options: [] },
      ]);
    } else {
      toast.error("Maximun 5 Questions are allowed");
    }
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleQuestionChange = (id, field, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };
  const handleOptionChange = (id, index, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              options: q.options.map((opt, i) => (i === index ? value : opt)),
            }
          : q
      )
    );
  };

  const addOption = (id) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const removeOption = (id, index) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? { ...q, options: q.options.filter((_, i) => i !== index) }
          : q
      )
    );
  };

  const handleNumQuestionsChange = (e) => {
    const newCount = parseInt(e.target.value);
    setNumQuestions(newCount);
    setQuestions(
      Array.from({ length: newCount }, (_, i) => ({
        id: i + 1,
        text: "",
        answerType: "Text",
        options: [],
      }))
    );
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("snag_checklist[name]", formData.title);
    data.append(
      "snag_checklist[snag_audit_category_id]",
      formData.snag_audit_category_id
    );
    data.append(
      "snag_checklist[snag_audit_sub_category_id]",
      formData.snag_audit_sub_category_id
    );
    data.append("snag_checklist[site_id]", formData.site_id);
    data.append("snag_checklist[user_id]", formData.user_id);
    data.append("snag_checklist[check_type]", formData.check_type);
    data.append("snag_checklist[resource_id]", formData.resource_id);
    data.append("snag_checklist[resource_type]", formData.resource_type);
    data.append("snag_checklist[description]", formData.description);
    data.append("snag_checklist[company_id]", formData.company_id);
    data.append("snag_checklist[active]", formData.active);
    questions.forEach((q, i) => {
      const prefix = `snag_checklist[snag_questions_attributes][${i}]`;
      data.append(`${prefix}[qnumber]`, i + 1);
      data.append(`${prefix}[qtype]`, q.answerType);
      data.append(`${prefix}[descr]`, q.text);
      data.append(`${prefix}[img_mandatory]`, false);
      data.append(`${prefix}[quest_mandatory]`, true);
      data.append(`${prefix}[active]`, true);
      q.options.forEach((opt, j) => {
        // data.append(`${prefix}[snag_quest_options_attributes][${j}][question_id]`, q.id);
        data.append(
          `${prefix}[snag_quest_options_attributes][${j}][qname]`,
          opt
        );
        data.append(
          `${prefix}[snag_quest_options_attributes][${j}][active]`,
          true
        );
        data.append(
          `${prefix}[snag_quest_options_attributes][${j}][company_id]`,
          formData.company_id
        );
        data.append(
          `${prefix}[snag_quest_options_attributes][${j}][option_type]`,
          q.answerType
        );
      });
    });
    try {
      const response = await postFitoutChecklist(data);
      console.log("Checklist created successfully:", response);
      toast.success("Checklist created!");
      navigate("/fitout/checklist/list");
    } catch (error) {
      console.error("Error creating checklist:", error);
      toast.error("Failed to create checklist");
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Fitout Checklist
        </h1>

        {/* Checklist Form */}
        <div className="border rounded-lg p-6 shadow-md bg-white mt-4">
          <h2 className="text-lg font-semibold text-orange-600 flex items-center">
            ➕ Add Checklist
          </h2>

          {/* Category Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <select
              name="snag_audit_category_id"
              value={formData.snag_audit_category_id}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Category *</option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {/* <select
              name="snag_audit_sub_category_id"
              value={formData.snag_audit_sub_category_id}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              disabled={!formData.snag_audit_category_id}
            >
              <option value="">Select Subcategory *</option>
              {subcategory.map((subCat) => (
                <option key={subCat.id} value={subCat.id}>
                  {subCat.name}
                </option>
              ))}
            </select> */}
          </div>
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title *"
            className="border p-2 rounded w-full mt-4"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Checklist Description"
            className="border p-2 rounded w-full mt-4 h-24"
          ></textarea>
          {/* Deadline & Assigned To */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-semibold">Deadline</label>
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block font-semibold">Assign To</label>
            <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className="border p-2 rounded w-full">
              <option value="">Select User</option>
              <option value="john_doe">John Doe</option>
              <option value="jane_smith">Jane Smith</option>
            </select>
          </div>
        </div> */}

          {/* Priority Level */}
          {/* <div className="mt-4">
          <label className="block font-semibold">Priority Level</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 rounded w-full">
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div> */}

          {/* Number of Questions */}
          <div className="flex items-center gap-4 mt-6">
            <label className="font-semibold">Number of Questions:</label>
            <select
              value={questions.qnumber}
              onChange={handleNumQuestionsChange}
              className="border p-2 rounded"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span className="text-lg font-semibold">→ {questions.length}</span>
          </div>

          {/* Question List */}
          <div className="mt-4">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className="flex flex-col gap-4 mt-4 p-4 bg-gray-100 rounded-md"
              >
                {/* Question Input */}
                <textarea
                  placeholder="Enter your Question"
                  value={questions?.descr}
                  onChange={(e) =>
                    handleQuestionChange(q.id, "text", e.target.value)
                  }
                  className="border p-2 rounded w-full"
                ></textarea>
                {/* Answer Type Dropdown */}
                <select
                  value={q.answerType}
                  onChange={(e) =>
                    handleQuestionChange(q.id, "answerType", e.target.value)
                  }
                  className="border p-2 rounded"
                >
                  <option value="Text">Text</option>
                  <option value="Yes/No">Yes/No</option>
                  <option value="Multiple Choice">Multiple Choice</option>
                </select>

                {/* Answer Fields Based on Answer Type */}
                {q.answerType === "Text" && (
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    placeholder="User will type their answer here"
                  />
                )}
                {q.answerType === "Yes/No" && (
                  <select className="border p-2 rounded w-full">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                )}

                {q.answerType === "Multiple Choice" && (
                  <div className="flex flex-col gap-2">
                    {q.options.map((option, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(q.id, i, e.target.value)
                          }
                          placeholder={`Option ${i + 1}`}
                          className="border p-2 rounded w-full"
                        />
                        <button
                          onClick={() => removeOption(q.id, i)}
                          className="text-red-600 text-lg"
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addOption(q.id)}
                      className="text-blue-600"
                    >
                      + Add Option
                    </button>
                  </div>
                )}

                {/* Mandatory Checkbox */}
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Mandatory
                </label>

                {/* Remove Question Button */}
                {questions.length > 1 && (
                  <button
                    onClick={() => removeQuestion(q.id)}
                    className="text-red-600 text-xl"
                  >
                    x
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Question Button */}
          <div className="flex justify-end">
            <button
              onClick={addQuestion}
              className="mt-4 bg-green-700 text-white  py-2 px-4 rounded"
            >
              + Add Question
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleSubmit}
              className="bg-gray-700 text-white py-2 px-6 rounded"
            >
              Create Checklist
            </button>
            <button className="border border-gray-700 text-white bg-red-500 py-2 px-6 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitOutChecklistPage;
