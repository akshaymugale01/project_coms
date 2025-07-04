import React, { useEffect, useState } from "react";
import { BiEdit, BiPlus } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { CloseCircle, CloseOutline } from "react-ionicons";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  deleteQuestionChecklist,
  editChecklist,
  getAssignedTo,
  getChecklistDetails,
  getChecklistGroupReading,
  getHostList,
  getMasterChecklist,
  getSiteAsset,
  getVendors,
  postChecklist,
} from "../../api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import Select from "react-select";
import Cron from "react-js-cron";
import "react-js-cron/dist/styles.css";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";

const EditChecklist = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [update, setUpdate] = useState(false);
  const categories = getItemInLocalStorage("categories");
  const [assignedUser, setAssignedUser] = useState([]);
  const [catid, setcatid] = useState("");
  const [assignid, setassignid] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const toDay = new Date();
  const year = toDay.getFullYear();
  const [hosts, setHosts] = useState([]);
  const [masters, setMasters] = useState([]);
  const [selectedOptionssupervisior, setSelectedOptionssupervisior] = useState(
    []
  );
  const [optionssupervisior, setOptionssupervisior] = useState([]);
  const month = String(toDay.getMonth() + 1).padStart(2, "0");
  const day = String(toDay.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const [supplierid, setsupplierid] = useState("");
  const [masterid, setmasterid] = useState("");
  const [site, setSites] = useState([]);
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);
  const [lockOverdueTask, setLockOverdueTask] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [ticketType, setTicketType] = useState("Question");
  const [submitDays, setSubmitDays] = useState(0);
  const [submitHours, setSubmitHours] = useState(0);
  const [submitMinutes, setSubmitMinutes] = useState(0);
  const [extensionDays, setExtensionDays] = useState(0);
  const [extensionHours, setExtensionHours] = useState(0);
  const [extensionMinutes, setExtensionMinutes] = useState(0);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  // Handle radio button change
  const handleTicketTypeChange = (event) => {
    setTicketType(event.target.value);
  };
  const handleLockOverdueTaskChange = (e) => {
    setLockOverdueTask(e.target.value);
  };
  const [cronExpression, setCronExpression] = useState("0 0 * * *");

  const handleCronChange = (newCron) => {
    setCronExpression(newCron);
  };

  useEffect(() => {
    const fetchAssignedTo = async () => {
      try {
        const response = await getAssignedTo();
        const supervisors = response.data.map((host) => ({
          value: host.id,
          label: host.firstname + " " + host.lastname,
        }));
        setAssignedUser(response.data);
        setOptionssupervisior(supervisors);
        console.log("users", response.data);
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };

    fetchAssignedTo();
  }, []);
  useEffect(() => {
    const fetchSiteOwners = async () => {
      try {
        const resp = await getChecklistGroupReading();

        setSites(resp.data);
      } catch (error) {
        console.log("Error fetching site owners:", error);
      }
    };
    fetchSiteOwners();
  }, []);

  // useEffect(() => {
  //   const fetchServicesChecklistDetails = async () => {
  //     const checklistDetailsResponse = await getChecklistDetails(masterid);
  //     const data = checklistDetailsResponse.data;
  //     console.log(data);
  //     setName(data.name);
  //     setFrequency(data.frequency);
  //     setStartDate(data.start_date);
  //     setEndDate(data.end_date);
  //     setAddNewQuestion(
  //       data.questions.map((q) => ({
  //         id: q.id,
  //         name: q.name,
  //         type: q.qtype,
  //         options: [q.option1, q.option2, q.option3, q.option4],
  //         value_types:[q.value_type1,q.value_type2,q.value_type3,q.value_type4],
  //         question_mandatory:q.question_mandatory,
  //         reading:q.reading,
  //         showHelpText:q.help_text_enbled,
  //         help_text:q.help_text
  //       }))
  //     );
  //   };
  //   fetchServicesChecklistDetails();
  // }, [masterid]);
  const [sections, setSections] = useState([
    {
      group: "",

      questions: [
        {
          id: "",
          name: "",
          type: "",
          options: ["", "", "", ""],
          value_types: ["", "", "", ""],
          question_mandatory: false,
          reading: false,
          help_text: "",
          showHelpText: false,
          image_for_question: [],
          weightage: "",
          rating: false,
          _destroy: "0",
        },
      ],
    },
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        group: "",
        questions: [
          {
            id: "",
            name: "",
            type: "",
            options: ["", "", "", ""],
            value_types: ["", "", "", ""],
            question_mandatory: false,
            reading: false,
            help_text: "",
            showHelpText: false,
            image_for_question: [],
            weightage: "",
            rating: false,
            _destroy: "0",
          },
        ],
      },
    ]);
  };

  const removeSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const addQuestion = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions.push({
      name: "",
      type: "",
      options: ["", "", "", ""],
      value_types: ["", "", "", ""],
      question_mandatory: false,
      reading: false,
      help_text: "",
      showHelpText: false,
      image_for_question: [],
      weightage: "",
      rating: false,
      _destroy: "0",
    });
    setSections(updatedSections);
  };

  const handleDeleteQuestion = async (id, questionId) => {
    try {
      // Call the deleteQuestionChecklist API
      await deleteQuestionChecklist(id, questionId);
      console.log("Question deleted successfully");
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const removeQuestion = (sectionIndex, questionIndex) => {
    const updatedSections = [...sections];
    const question = updatedSections[sectionIndex].questions[questionIndex];

    if (question.id) {
      // Mark for soft deletion
      updatedSections[sectionIndex].questions[questionIndex]._destroy = "1";
    } else {
      // Remove the question entirely for new entries
      updatedSections[sectionIndex].questions.splice(questionIndex, 1);
    }

    setSections(updatedSections);
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleQuestionChange = (
    sectionIndex,
    questionIndex,
    field,
    value,
    optionIndex = null
  ) => {
    const updatedSections = [...sections]; // Shallow copy of sections
    const updatedQuestions = [...updatedSections[sectionIndex].questions]; // Shallow copy of questions in that section

    // Deep copy the specific question being modified
    const updatedQuestion = { ...updatedQuestions[questionIndex] };

    if (field === "name" || field === "type") {
      updatedQuestion[field] = value;
    } else if (field === "option") {
      const updatedOptions = [...updatedQuestion.options];
      updatedOptions[optionIndex] = value;
      updatedQuestion.options = updatedOptions;
    } else if (field === "value_type") {
      const updatedValueTypes = [...updatedQuestion.value_types];
      updatedValueTypes[optionIndex] = value;
      updatedQuestion.value_types = updatedValueTypes;
    } else if (
      field === "question_mandatory" ||
      field === "reading" ||
      field === "showHelpText" ||
      field === "rating"
    ) {
      updatedQuestion[field] = value;
    } else if (field === "help_text") {
      updatedQuestion.help_text = value;
    } else if (field === "image_for_question") {
      updatedQuestion.image_for_question = [...value]; // Ensure it's a new array
    } else if (field === "weightage") {
      updatedQuestion.weightage = value;
    }

    // Update the questions array with the modified question
    updatedQuestions[questionIndex] = updatedQuestion;
    updatedSections[sectionIndex].questions = updatedQuestions;

    // Update the sections state
    setSections(updatedSections);
  };

  useEffect(() => {
    const fetchServicesChecklistDetails = async () => {
      const checklistDetailsResponse = await getChecklistDetails(id);
      const data = checklistDetailsResponse.data;
      console.log(data);
      setName(data.name);
      setFrequency(data.frequency);
      setStartDate(data.start_date);
      setEndDate(data.end_date);
      setsupplierid(data.supplier_id);
      setLockOverdueTask(data.lock_overdue);
      setTicketType(data.ticket_level_type);
      setassignid(data.assigned_to);
      setCreateTicket(data.ticket_enabled);
      setCronExpression(data?.checklist_cron?.expression || "0 0 * * *");
      setWeightage(data.weightage_enabled);
      setSelectedOptionssupervisior(
        data.supervisors?.map((sup) => ({
          value: sup,
          label: sup,
        })) || []
      );
      setSections(
        data.groups.map((group) => ({
          group: group.group_id,
          questions: group.questions.map((q) => ({
            id: q.id,
            name: q.name,
            type: q.qtype,
            options: [q.option1, q.option2, q.option3, q.option4],
            value_types: [
              q.value_type1,
              q.value_type2,
              q.value_type3,
              q.value_type4,
            ],
            question_mandatory: q.question_mandatory,
            reading: q.reading,
            showHelpText: q.help_text_enbled,
            help_text: q.help_text,
            rating: q.rating,
            weightage: q.weightage,
            image_for_question: [],
          })),
        }))
      );

      const totalMinutes = data.grace_period;
      const days = Math.floor(totalMinutes / (24 * 60));
      const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
      const minutes = totalMinutes % 60;
      console.log({ days, hours, minutes });
      setSubmitDays(days);
      setSubmitHours(hours);
      setSubmitMinutes(minutes);
      const totalExtensionMinutes = data.grace_period_unit;
      const extDays = Math.floor(totalExtensionMinutes / (24 * 60));
      const extHours = Math.floor((totalExtensionMinutes % (24 * 60)) / 60);
      const extMinutes = totalExtensionMinutes % 60;

      setExtensionDays(extDays);
      setExtensionHours(extHours);
      setExtensionMinutes(extMinutes);
    };

    fetchServicesChecklistDetails();
  }, [id, update]);

  const siteId = getItemInLocalStorage("SITEID");
  const userId = getItemInLocalStorage("UserId");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate required fields
    if (!name || !frequency) {
      return toast.error("Name and Frequency are required");
    }

    if (startDate >= endDate) {
      return toast.error("Start date must be before End date");
    }

    // Prepare FormData for file uploads
    const formData = new FormData();

    // Add checklist data
    formData.append("checklist[site_id]", siteId);
    formData.append("checklist[weightage_enabled]", weightage);
    formData.append("checklist[occurs]", "");
    formData.append("checklist[name]", name);
    formData.append("checklist[start_date]", startDate);
    formData.append("checklist[end_date]", endDate);
    formData.append("checklist[user_id]", userId);
    formData.append("checklist[cron_expression]", cronExpression);
    formData.append("checklist[grace_period]", convertedSubmitMinutes);
    formData.append("checklist[grace_period_unit]", convertedExtensionMinutes);
    formData.append("checklist[supplier_id]", supplierid);
    formData.append("checklist[lock_overdue]", lockOverdueTask === "true");
    formData.append("checklist[ctype]", "routine");
    formData.append("checklist[ticket_enabled]", createTicket);
    formData.append("checklist[ticket_level_type]", ticketType);
    formData.append("checklist[category_id]", catid);
    formData.append("assigned_to", assignid);

    // Add supervisor IDs
    selectedOptionssupervisior.forEach((option) => {
      formData.append(`checklist[supervisior_id][]`, option.value);
    });

    // Add frequency
    formData.append("frequency", frequency);

    // Add sections and questions
    sections.forEach((section, sectionIndex) => {
      formData.append(`groups[][group]`, section.group);

      section.questions.forEach((q, questionIndex) => {
        if (q.id) {
          formData.append(`groups[][questions][][id]`, q.id);
        }
        formData.append(`groups[][questions][][name]`, q.name);
        formData.append(`groups[][questions][][type]`, q.type);
        formData.append(`groups[][questions][][reading]`, q.reading);
        formData.append(
          `groups[][questions][][question_mandatory]`,
          q.mandatory
        );
        formData.append(
          `groups[][questions][][help_text_enbled]`,
          q.showHelpText
        );
        formData.append(`groups[][questions][][help_text]`, q.help_text || "");
        formData.append(`groups[][questions][][weightage]`, q.weightage);
        formData.append(`groups[][questions][][rating]`, q.rating);

        // Add options and value types
        q.options.forEach((option, optionIndex) => {
          formData.append(`groups[][questions][][options][]`, option || "");
          formData.append(
            `groups[][questions][][value_types][]`,
            q.value_types[optionIndex] || ""
          );
        });
        if (q._destroy) {
          formData.append(`groups[][questions][][_destroy]`, q._destroy);
        }

        // Handle file uploads for each question
        if (q.image_for_question && q.image_for_question.length > 0) {
          q.image_for_question.forEach((file) => {
            formData.append(
              `groups[][questions][][image_for_question_${
                questionIndex + 1
              }][]`,
              file
            );
          });
        }
      });
    });

    try {
      const response = await editChecklist(formData, id);
      console.log(response);
      toast.success("Routine Checklist Updated");
      setUpdate(true);
      setIsEditing(!isEditing);
      toast.dismiss();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update checklist");
    }
  };

  const handleChangesupervisior = (selected) => {
    setSelectedOptionssupervisior(selected);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResp = await getHostList(siteId);
        const supervisors = usersResp.data.hosts.map((host) => ({
          value: host.id,
          label: host.name,
        }));
        console.log(usersResp);
        setHosts(usersResp.data.hosts);
        // setOptionssupervisior(supervisors);
        console.log(usersResp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [siteId]);
  const themeColor = "rgb(3 19 37)";

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const supplierResp = await getVendors(); // Call API to get suppliers
        console.log(supplierResp);
        setSuppliers(supplierResp.data); // Set the fetched suppliers in state
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        toast.error("Failed to load suppliers");
      }
    };

    fetchSuppliers(); // Execute the function to fetch suppliers
  }, []);
  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const masterResp = await getMasterChecklist(); // Call API to get suppliers
        const mastershow = masterResp.data.checklists.map((check) => ({
          value: check.id,
          label: check.name,
        }));
        console.log("Masters checklist", masterResp);
        console.log("mastershow", mastershow);
        setMasters(mastershow);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        toast.error("Failed to load suppliers");
      }
    };

    fetchMasters(); // Execute the function to fetch suppliers
  }, []);

  const [createNew, setCreateNew] = useState(false);
  const [createTicket, setCreateTicket] = useState(false);
  const [weightage, setWeightage] = useState(false);

  const handleToggle = (type) => {
    switch (type) {
      case "createNew":
        setCreateNew(!createNew);
        break;
      case "createTicket":
        setCreateTicket(!createTicket);
        break;
      case "weightage":
        setWeightage(!weightage);
        break;
      default:
        break;
    }
  };

  const convertedSubmitMinutes =
    parseInt(submitDays) * 1440 +
    parseInt(submitHours) * 60 +
    parseInt(submitMinutes);
  // setTotalSubmitMinutes(convertedSubmitMinutes);

  const convertedExtensionMinutes =
    parseInt(extensionDays) * 1440 +
    parseInt(extensionHours) * 60 +
    parseInt(extensionMinutes);
  // setTotalExtensionMinutes(convertedExtensionMinutes);

  return (
    <section>
      <div className="m-2">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold p-2  rounded-full text-white"
        >
          {isEditing ? " Edit  Checklist" : "Routine Checklist Details"}
        </h2>
        <div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
          <div className="flex justify-end">
            {!isEditing ? (
              <button
                className="flex items-center gap-2 font-medium p-1 px-4 rounded-full border-2 border-black"
                onClick={toggleEdit}
              >
                <BiEdit /> Edit
              </button>
            ) : (
              <button
                className="flex items-center gap-2 font-medium p-1 px-4 rounded-full bg-red-400 text-white"
                onClick={toggleEdit}
              >
                <CloseOutline /> Cancel
              </button>
            )}
          </div>
          <div className="py-4">
            {/* Main Grid for all Toggles */}
            <div className="grid grid-cols-2 gap-4 items-start">
              {/* Create New Toggle */}
              {/* <div className="flex items-center">
          <span className="mr-2">Create New</span>
          <div
            onClick={() => handleToggle('createNew')}
            className={`w-10 h-4 flex items-center bg-gray-300 rounded-full  cursor-pointer ${
              createNew ? 'bg-green-500' : ''
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                createNew ? 'translate-x-6' : ''
              }`}
            />
          </div>
        </div> */}

              {/* Create Ticket Toggle */}
              <div className="flex items-center">
                <span className="mr-2">Create Ticket</span>
                <div
                  onClick={() => handleToggle("createTicket")}
                  className={`w-10 h-4 flex items-center bg-gray-300 rounded-full  cursor-pointer ${
                    createTicket ? "bg-green-500" : ""
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                      createTicket ? "translate-x-6" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Weightage Toggle */}
              <div className="flex items-center">
                <span className="mr-2">Weightage</span>
                <div
                  onClick={() => handleToggle("weightage")}
                  className={`w-10 h-4 flex items-center bg-gray-300 rounded-full  cursor-pointer ${
                    weightage ? "bg-green-500" : ""
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                      weightage ? "translate-x-6" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Show Weightage and Rating Fields if Weightage is on */}
              {/* Show Select Template if Create New is on */}
              {createNew && (
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Select Template</label>
                  <select
                    value={masterid}
                    onChange={(e) => setmasterid(e.target.value)}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  >
                    <option value="">Select from the existing Template</option>
                    {masters.map((m) => (
                      <option value={m.value} key={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {/* Show Checklist Level, Question Level, and Select Fields if Create Ticket is on */}
              {createTicket && (
                <div className="flex flex-col justify-center gap-1 mb-2">
                  {/* Radio Buttons */}
                  <div className="flex  gap-4 ">
                    <div className="flex items-center mt-2">
                      <input
                        type="radio"
                        id="checklist"
                        name="ticketType"
                        value="Checklist"
                        checked={ticketType === "Checklist"}
                        onChange={handleTicketTypeChange}
                        className="mr-2"
                      />
                      <label htmlFor="checklist">Checklist Level</label>
                    </div>
                    <div className="flex items-center mt-2">
                      <input
                        type="radio"
                        id="question"
                        name="ticketType"
                        value="Question"
                        checked={ticketType === "Question"}
                        onChange={handleTicketTypeChange}
                        className="mr-2"
                      />
                      <label htmlFor="question">Question Level</label>
                    </div>
                  </div>

                  {/* Select Fields */}
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">Select Assigned To</label>
                    <select
                      value={assignid}
                      onChange={(e) => setassignid(e.target.value)}
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    >
                      <option value="">Select Assigned To</option>
                      {assignedUser?.map((assign) => (
                        <option key={assign.id} value={assign.id}>
                          {assign.firstname} {assign.lastname}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">Select Category</label>
                    <select
                      value={catid}
                      onChange={(e) => setcatid(e.target.value)}
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    >
                      <option value="">Select Category</option>
                      {categories?.map((category) => (
                        <option
                          onClick={() => console.log("checking-category")}
                          value={category.id}
                          key={category.id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex  flex-col justify-around">
            <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-2 w-full">
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Name :
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`border p-1 px-4 border-gray-500 rounded-md ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                  placeholder="Enter Checklist Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Frequency :
                </label>
                <select
                  name="frequency"
                  id="frequency"
                  className={`border p-1 px-4 border-gray-500 rounded-md ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">Select Frequency</option>

                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="half yearly">Half yearly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Start Date :
                </label>
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  className={`border p-1 px-4 border-gray-500 rounded-md ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={today}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  End Date :
                </label>
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  className={`border p-1 px-4 border-gray-500 rounded-md ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={today}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <div className=" my-4  bg-white ">
                <h2 className="font-semibold mb-2 border-b-2 border-black pb-1">
                  Edit Groups
                </h2>

                {sections.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="mb-8 p-5 border rounded-lg bg-gray-50 shadow-sm"
                  >
                    {/* Section Header */}
                    <div className="flex border border-gray-400 p-3 mb-3 rounded-md justify-between">
                      <div className="flex flex-col gap-1 mb-4 w-full">
                        <label className="font-semibold">
                          Group {sectionIndex + 1}
                        </label>
                        <select
                          value={section.group}
                          className={`border p-1 px-4 border-gray-500 rounded-md ${
                            !isEditing ? "bg-gray-200" : ""
                          }`}
                          onChange={(e) =>
                            handleSectionChange(
                              sectionIndex,
                              "group",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                        >
                          <option value="">Select Group</option>
                          {site.map((supplier) => (
                            <option value={supplier.id} key={supplier.id}>
                              {supplier.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <button
                          className="p-1 border-2 border-red-500 text-white hover:bg-white hover:text-red-500 bg-red-500 px-4 transition-all duration-300 rounded-md "
                          onClick={() => removeSection(sectionIndex)}
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>

                    {/* Questions */}
                    {section.questions
                      .filter((que) => que._destroy !== "1")
                      .map((question, questionIndex) => (
                        <div
                          key={questionIndex}
                          className="border border-gray-400 rounded-md p-3 mb-3"
                        >
                          <div className="grid gap-4">
                            <input
                              type="text"
                              placeholder="Enter Question Name"
                              value={question.name}
                              className={`border p-1 px-4 w-64 border-gray-500 rounded-md ${
                                !isEditing ? "bg-gray-200" : ""
                              }`}
                              onChange={(e) =>
                                handleQuestionChange(
                                  sectionIndex,
                                  questionIndex,
                                  "name",
                                  e.target.value
                                )
                              }
                              disabled={!isEditing}
                            />

                            <select
                              value={
                                question.reading ? "Numeric" : question.type
                              }
                              className={`border p-1 px-4 w-64 border-gray-500 rounded-md ${
                                !isEditing ? "bg-gray-200" : ""
                              }`}
                              onChange={(e) =>
                                handleQuestionChange(
                                  sectionIndex,
                                  questionIndex,
                                  "type",
                                  e.target.value
                                )
                              }
                              disabled={question.reading}
                            >
                              <option value="">Select Answer Type</option>
                              <option value="multiple">
                                Multiple Choice Question
                              </option>
                              <option value="inbox">Input box</option>
                              <option value="description">
                                Description box
                              </option>
                              <option value="Numeric">Numeric</option>
                            </select>
                            {question.type === "multiple" &&
                              !question.reading && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2">
                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                      type="text"
                                      name={`option1_${questionIndex}`}
                                      id={`option1_${questionIndex}`}
                                      className={`border p-1 px-4  border-gray-500 rounded-md ${
                                        !isEditing ? "bg-gray-200" : ""
                                      }`}
                                      placeholder="option 1"
                                      value={question.options[0]}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          sectionIndex,
                                          questionIndex,
                                          "option",
                                          e.target.value,
                                          0
                                        )
                                      }
                                      disabled={!isEditing}
                                    />
                                    <select
                                      name={`value_type1_${questionIndex}`}
                                      id={`value_type1_${questionIndex}`}
                                      className={`border p-1 border-gray-500 rounded-md ${
                                        question.value_types[0] === "P"
                                          ? "bg-green-400"
                                          : question.value_types[0] === "N"
                                          ? "bg-red-400"
                                          : ""
                                      }`}
                                      value={question.value_types[0]}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          sectionIndex,
                                          questionIndex,
                                          "value_type",
                                          e.target.value,
                                          0
                                        )
                                      }
                                      disabled={!isEditing}
                                    >
                                      <option value="">Select</option>
                                      <option value="P">P</option>
                                      <option value="N">N</option>
                                    </select>
                                  </div>
                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                      type="text"
                                      name={`option2_${questionIndex}`}
                                      id={`option2_${questionIndex}`}
                                      className={`border p-1 px-4  border-gray-500 rounded-md ${
                                        !isEditing ? "bg-gray-200" : ""
                                      }`}
                                      placeholder="option 2"
                                      value={question.options[1]}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          sectionIndex,
                                          questionIndex,
                                          "option",
                                          e.target.value,
                                          1
                                        )
                                      }
                                      disabled={!isEditing}
                                    />
                                    <select
                                      name={`value_type2_${questionIndex}`}
                                      id={`value_type2_${questionIndex}`}
                                      className={`border p-1 border-gray-500 rounded-md ${
                                        question.value_types[1] === "P"
                                          ? "bg-green-400"
                                          : question.value_types[1] === "N"
                                          ? "bg-red-400"
                                          : ""
                                      }`}
                                      value={question.value_types[1]}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          sectionIndex,
                                          questionIndex,
                                          "value_type",
                                          e.target.value,
                                          1
                                        )
                                      }
                                      disabled={!isEditing}
                                    >
                                      <option value="">Select</option>
                                      <option value="P">P</option>
                                      <option value="N">N</option>
                                    </select>
                                  </div>

                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                      type="text"
                                      name={`option3_${questionIndex}`}
                                      id={`option3_${questionIndex}`}
                                      className={`border p-1 px-4  border-gray-500 rounded-md ${
                                        !isEditing ? "bg-gray-200" : ""
                                      }`}
                                      placeholder="option 3"
                                      value={question.options[2]}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          sectionIndex,
                                          questionIndex,
                                          "option",
                                          e.target.value,
                                          2
                                        )
                                      }
                                      disabled={!isEditing}
                                    />
                                    <select
                                      name={`value_type3_${questionIndex}`}
                                      id={`value_type3_${questionIndex}`}
                                      className={`border p-1 border-gray-500 rounded-md ${
                                        question.value_types[2] === "P"
                                          ? "bg-green-400"
                                          : question.value_types[2] === "N"
                                          ? "bg-red-400"
                                          : ""
                                      }`}
                                      value={question.value_types[2]}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          sectionIndex,
                                          questionIndex,
                                          "value_type",
                                          e.target.value,
                                          2
                                        )
                                      }
                                      disabled={!isEditing}
                                    >
                                      <option value="">Select</option>
                                      <option value="P">P</option>
                                      <option value="N">N</option>
                                    </select>
                                  </div>
                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                      type="text"
                                      name={`option4_${questionIndex}`}
                                      id={`option4_${questionIndex}`}
                                      className={`border p-1 px-4  border-gray-500 rounded-md ${
                                        !isEditing ? "bg-gray-200" : ""
                                      }`}
                                      placeholder="option 4"
                                      value={question.options[3]}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          sectionIndex,
                                          questionIndex,
                                          "option",
                                          e.target.value,
                                          3
                                        )
                                      }
                                      disabled={!isEditing}
                                    />
                                    <select
                                      name={`value_type4_${questionIndex}`}
                                      id={`value_type4_${questionIndex}`}
                                      className={`border p-1 border-gray-500 rounded-md ${
                                        question.value_types[3] === "P"
                                          ? "bg-green-400"
                                          : question.value_types[3] === "N"
                                          ? "bg-red-400"
                                          : ""
                                      }`}
                                      value={question.value_types[3]}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          sectionIndex,
                                          questionIndex,
                                          "value_type",
                                          e.target.value,
                                          3
                                        )
                                      }
                                      disabled={!isEditing}
                                    >
                                      <option value="">Select</option>
                                      <option value="P">P</option>
                                      <option value="N">N</option>
                                    </select>
                                  </div>
                                </div>
                              )}
                            <div className="flex gap-8">
                              <div>
                                <label className="flex items-center gap-1">
                                  <input
                                    type="checkbox"
                                    checked={question.question_mandatory}
                                    onChange={(e) =>
                                      handleQuestionChange(
                                        sectionIndex,
                                        questionIndex,
                                        "question_mandatory",
                                        e.target.checked
                                      )
                                    }
                                    disabled={!isEditing}
                                  />
                                  <span className="font-semibold text-medium">
                                    Mandatory
                                  </span>
                                </label>
                              </div>
                              <div>
                                <label className="flex items-center gap-1">
                                  <input
                                    type="checkbox"
                                    checked={question.reading}
                                    onChange={(e) =>
                                      handleQuestionChange(
                                        sectionIndex,
                                        questionIndex,
                                        "reading",
                                        e.target.checked
                                      )
                                    }
                                    disabled={!isEditing}
                                  />
                                  <span className="font-semibold text-medium">
                                    Reading
                                  </span>
                                </label>
                              </div>
                              <div>
                                <label className="flex items-center gap-1">
                                  <input
                                    type="checkbox"
                                    checked={question.showHelpText}
                                    onChange={(e) =>
                                      handleQuestionChange(
                                        sectionIndex,
                                        questionIndex,
                                        "showHelpText",
                                        e.target.checked
                                      )
                                    }
                                    disabled={!isEditing}
                                  />

                                  <span className="font-semibold text-medium">
                                    Help Text
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                          {question.showHelpText && (
                            <div className="flex flex-col gap-2 my-2">
                              <input
                                type="text"
                                placeholder="Enter Help text"
                                value={question.help_text}
                                className={`border p-1 px-4  border-gray-500 rounded-md ${
                                  !isEditing ? "bg-gray-200" : ""
                                }`}
                                onChange={(e) =>
                                  handleQuestionChange(
                                    sectionIndex,
                                    questionIndex,
                                    "help_text",
                                    e.target.value
                                  )
                                }
                                disabled={!isEditing}
                              />

                              <FileInputBox
                                handleChange={(files) =>
                                  handleQuestionChange(
                                    sectionIndex,
                                    questionIndex,
                                    "image_for_question",
                                    files
                                  )
                                }
                                fieldName={`image_for_question_${
                                  questionIndex + 1
                                }`}
                                isMulti={true}
                              />
                            </div>
                          )}
                          {weightage && (
                            <div className=" grid grid-cols-4 gap-4">
                              <div className="flex flex-col gap-1">
                                <label className="font-semibold">
                                  Weightage
                                </label>
                                <input
                                  type="number"
                                  className={`border p-1 px-4  border-gray-500 rounded-md ${
                                    !isEditing ? "bg-gray-200" : ""
                                  }`}
                                  value={question.weightage}
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      sectionIndex,
                                      questionIndex,
                                      "weightage",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter weightage value"
                                  disabled={!isEditing}
                                />
                              </div>

                              {/* <label className="block text-gray-700">Rating</label> */}
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id="rating"
                                  checked={question.rating}
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      sectionIndex,
                                      questionIndex,
                                      "rating",
                                      e.target.checked
                                    )
                                  }
                                  className="mr-2"
                                  disabled={!isEditing}
                                />
                                <label htmlFor="rating"> Rating</label>
                              </div>
                            </div>
                          )}
                          <div className="flex justify-end ">
                            <button
                              className="p-1 border-2 border-red-500 text-white hover:bg-white hover:text-red-500 bg-red-500 px-4 transition-all duration-300 rounded-md "
                              onClick={async () => {
                                await handleDeleteQuestion(id, question.id); // Delete the question via API
                                removeQuestion(sectionIndex, questionIndex); // Update the UI after deletion
                              }}
                            >
                              <IoClose />
                            </button>
                          </div>
                        </div>
                      ))}

                    {/* Add Question Button */}
                    <button
                      className="p-1 border-2 border-black px-4 rounded-md my-2 flex gap-2 items-center"
                      onClick={() => addQuestion(sectionIndex)}
                    >
                      Add Question
                    </button>
                  </div>
                ))}
                <button
                  className="p-1 border-2 border-black px-4 rounded-md my-2 flex gap-2 items-center"
                  onClick={addSection}
                >
                  Add Group
                </button>
              </div>
            </div>
            <h2 className="border-b-2 border-black text font-medium">
              Schedules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div className="flex flex-col gap-4">
                {/* Allowed Time to Submit */}
                <div>
                  <label className="font-semibold">
                    Allowed time to submit
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      className={`border p-1 px-2  border-gray-500 rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Enter Days"
                      value={submitDays}
                      onChange={(e) => setSubmitDays(Number(e.target.value))}
                      disabled={!isEditing}
                    />
                    <input
                      type="number"
                      className={`border p-1 px-2  border-gray-500 rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Enter Hours"
                      value={submitHours}
                      onChange={(e) => setSubmitHours(Number(e.target.value))}
                      disabled={!isEditing}
                    />
                    <input
                      type="number"
                      className={`border p-1 px-2  border-gray-500 rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Enter Minutes"
                      value={submitMinutes}
                      onChange={(e) => setSubmitMinutes(Number(e.target.value))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Extension Time */}
                <div className="flex flex-col mr-2">
                  <label className="font-semibold">Extension Time</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      className={`border p-1 px-2  border-gray-500 rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Enter Days"
                      value={extensionDays}
                      onChange={(e) => setExtensionDays(e.target.value)}
                      disabled={!isEditing}
                    />
                    <input
                      type="number"
                      className={`border p-1 px-2  border-gray-500 rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Enter Hours"
                      value={extensionHours}
                      onChange={(e) => setExtensionHours(e.target.value)}
                      disabled={!isEditing}
                    />
                    <input
                      type="number"
                      className={`border p-1 px-2  border-gray-500 rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      placeholder="Enter Minutes"
                      value={extensionMinutes}
                      onChange={(e) => setExtensionMinutes(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Lock Overdue Task</label>
                  <select
                    name="lockOverdueTask"
                    id="lockOverdueTask"
                    className={`border p-1 px-4  border-gray-500 rounded-md ${
                      !isEditing ? "bg-gray-200" : ""
                    }`}
                    value={lockOverdueTask}
                    onChange={handleLockOverdueTaskChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select Lock Status</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-4 ml-20">
                <div className="flex flex-col ml-20">
                  <label className="font-semibold">Supervisors</label>
                  <Select
                    value={selectedOptionssupervisior}
                    onChange={handleChangesupervisior}
                    options={optionssupervisior}
                    isMulti
                    isSearchable
                    placeholder="Select Supervisors"
                    isDisabled={!isEditing}
                  />
                </div>

                <div className="flex flex-col ml-20">
                  <label className="font-semibold">Supplier</label>
                  <select
                    className={`border p-1 px-4  border-gray-500 rounded-md ${
                      !isEditing ? "bg-gray-200" : ""
                    }`}
                    value={supplierid}
                    onChange={(e) => setsupplierid(e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map((supplier) => (
                      <option value={supplier.id} key={supplier.id}>
                        {supplier.company_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <h2 className="border-b-2 border-black text font-medium">
              Cron Setting
            </h2>
            <div className="my-2 border-2 border-dashed flex items-center p-2 rounded-md border-gray-300">
              <Cron
                value={cronExpression}
                setValue={handleCronChange}
                disabled={!isEditing}
                className={`${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>
            {isEditing ? (
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="bg-black text-white p-2 px-4 rounded-md font-medium"
                >
                  Save
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditChecklist;
