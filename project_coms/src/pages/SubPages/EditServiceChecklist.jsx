import React, { useEffect, useState } from "react";
import { BiEdit, BiPlus } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { editChecklist, getChecklistDetails } from "../../api";
import { CloseCircle, CloseOutline } from "react-ionicons";

const EditServiceChecklist = () => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [update, setUpdate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [addNewQuestion, setAddNewQuestion] = useState([
    { id: "", name: "", type: "", options: ["", "", "", ""], _destroy: "0" },
  ]);

  const handleAddQuestionFields = () => {
  
    setAddNewQuestion([
      ...addNewQuestion,
      { name: "", type: "", options: ["", "", "", ""] },
    ]);
  };

  const handleRemoveQuestionFields = (index) => {
    // const newFields = [...addNewQuestion];
    // newFields.splice(index, 1);
    // setAddNewQuestion(newFields);
    setAddNewQuestion((prevQuest) => {
      const updatedQuest = [...prevQuest];
      if (updatedQuest.id) {
        updatedQuest._destroy = "1";
      } else {
      updatedQuest.splice(index, 1);
      }
      return updatedQuest;
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...addNewQuestion];
    if (field === "name" || field === "type") {
      newQuestions[index][field] = value;
    } else {
      newQuestions[index].options[field] = value;
    }
    setAddNewQuestion(newQuestions);
  };
  const siteId = getItemInLocalStorage("SITEID");
  const userId = getItemInLocalStorage("UserId");
  const { id } = useParams();
  useEffect(() => {
    const fetchServicesChecklistDetails = async () => {
      const checklistDetailsResponse = await getChecklistDetails(id);
      const data = checklistDetailsResponse.data;
      console.log(data);
      setName(data.name);
      setFrequency(data.frequency);
      setStartDate(data.start_date);
      setEndDate(data.end_date);
      setAddNewQuestion(
        data.questions.map((q) => ({
          id: q.id,
          name: q.name,
          type: q.qtype,
          options: [q.option1, q.option2, q.option3, q.option4],
        }))
      );
    };
    fetchServicesChecklistDetails();
  }, [id, update]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = {
    //   checklist: {
    //     site_id: siteId,
    //     occurs: "",
    //     name: name,
    //     start_date: startDate,
    //     end_date: endDate,
    //     user_id: userId,
    //   },
    //   frequency: frequency,
    //   ctype: "ppm",
    //   question: addNewQuestion.map((q) => ({
    //
    //     name: q.name,
    //     type: q.type,
    //     option1: q.options[0],
    //     option2: q.options[1],
    //     option3: q.options[2],
    //     option4: q.options[3],
    //     _destroy: q._destroy
    //   })),
    // };
    // console.log(data);
    const formData = new FormData();
    formData.append("checklist[site_id]", siteId);
    formData.append("checklist[occurs]", "");
    formData.append("checklist[name]", name);
    formData.append("checklist[start_date]", startDate);
    formData.append("checklist[end_date]", endDate);
    formData.append("checklist[user_id]", userId);
    formData.append("frequency", frequency);
    formData.append("ctype", "ppm");
    addNewQuestion.forEach((quest, index) => {
      if (quest.id) {
        formData.append(`question[][id]`, quest.id);
      }
      formData.append(`question[][name]`, quest.name);
      formData.append(`question[][type]`, quest.type);
      // quest.options.forEach((option, optIndex) => {
      //   formData.append(`question[options][${optIndex}]`, option);
      // });
      formData.append(`question[][option1]`, quest.options[0] || "");
      formData.append(`question[][option2]`, quest.options[1] || "");
      formData.append(`question[][option3]`, quest.options[2] || "");
      formData.append(`question[][option4]`, quest.options[3] || "");
      if (quest._destroy) {
        formData.append(
          `question[][_destroy]`,
          quest._destroy
        );
      }
    });

    try {
      toast.loading("Updating Checklist please wait!");
      const response = await editChecklist(formData, id);
      console.log(response);
      setUpdate(true);
      setIsEditing(!isEditing);
      toast.dismiss();
      toast.success("Checklist Updated Successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.dismiss();
    }
  };
  const themeColor = useSelector((state) => state.theme.color);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section>
      <div className="m-2">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold p-2  rounded-full text-white"
        >
          {isEditing ? "Edit Checklist Details" : "Soft Service Checklist Details"}
        </h2>
        <div className="lg:mx-20 my-5 mb-10 sm:border border-gray-400 md:p-5 md:px-10 rounded-lg sm:shadow-xl">
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
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-around">
              <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-2 w-full">
                <div className="flex flex-col">
                  <label htmlFor="name" className="font-semibold">
                    Name:
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      placeholder="Enter Checklist Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  ) : (
                    <input
                      readOnly
                      type="text"
                      name="name"
                      id="name"
                      className=" p-1 px-4  rounded-md outline-none bg-gray-100"
                      value={name}
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="frequency" className="font-semibold">
                    Frequency:
                  </label>
                  {isEditing ? (
                    <select
                      name="frequency"
                      id="frequency"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                    >
                      <option value="">Select Frequency</option>
                      <option value="One time">One Time</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="half yearly">Half yearly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  ) : (
                    <input
                      readOnly
                      type="text"
                      name="name"
                      id="name"
                      className=" p-1 px-4  rounded-md outline-none bg-gray-100"
                      value={frequency}
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="start_date" className="font-semibold">
                    Start Date:
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="start_date"
                      id="start_date"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  ) : (
                    <input
                      readOnly
                      type="text"
                      name="start_date"
                      id="start_date"
                      className=" p-1 px-4  rounded-md outline-none bg-gray-100"
                      value={startDate}
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="end_date" className="font-semibold">
                    End Date:
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="end_date"
                      id="end_date"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  ) : (
                    <input
                      readOnly
                      type="text"
                      name="end_date"
                      id="end_date"
                      className=" p-1 px-4  rounded-md outline-none bg-gray-100"
                      value={endDate}
                    />
                  )}
                </div>
              </div>
              <div>
                <div className="grid md:grid-cols-2 gap-4">
                  {addNewQuestion
                    .filter((que) => que._destroy !== "1")
                    .map((data, i) => (
                      <div key={i}>
                        <div className="my-5 ">
                          <h2 className="border-b-2 border-black text font-medium">
                            {isEditing
                              ? `Edit Question ${i + 1} `
                              : `Questions ${i + 1}`}
                          </h2>
                          <div className="my-2 grid gap-4  ">
                            {isEditing ? (
                              <input
                                type="text"
                                name={`question_${i}`}
                                id={`question_${i}`}
                                className="border p-1 px-4 border-gray-500 rounded-md"
                                placeholder="Add New Question"
                                value={data.name}
                                onChange={(e) =>
                                  handleQuestionChange(
                                    i,
                                    "name",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <input
                                readOnly
                                type="text"
                                name={`question_${i}`}
                                id={`question_${i}`}
                                className=" p-1 px-4  rounded-md outline-none bg-gray-100"
                                placeholder="Add New Question"
                                value={data.name}
                                // onChange={(e) =>
                                //   handleQuestionChange(i, "name", e.target.value)
                                // }
                              />
                            )}
                          </div>
                          <div className="my-2">
                            {isEditing ? (
                              <select
                                name={`type_${i}`}
                                id={`type_${i}`}
                                value={data.type}
                                onChange={(e) =>
                                  handleQuestionChange(
                                    i,
                                    "type",
                                    e.target.value
                                  )
                                }
                                className="border p-1 px-4 border-gray-500 rounded-md"
                              >
                                <option value="">Select Answer Type</option>
                                <option value="multiple">
                                  Multiple Choice Question
                                </option>
                                <option value="inbox">Input box</option>
                                <option value="description">
                                  Description box
                                </option>
                              </select>
                            ) : (
                              <input
                                readOnly
                                type="text"
                                name="start_date"
                                id="start_date"
                                className=" p-1 px-4  rounded-md outline-none bg-gray-100"
                                value={data.type}
                              />
                            )}
                            {data.type === "multiple" && (
                              <>
                                {isEditing ? (
                                  <div className="grid grid-cols-4 gap-4 my-2">
                                    <input
                                      type="text"
                                      name={`option1_${i}`}
                                      id={`option1_${i}`}
                                      className="border p-1 px-4 border-gray-500 rounded-md"
                                      placeholder="option 1"
                                      value={data.options[0] || ""}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          i,
                                          0,
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      type="text"
                                      name={`option2_${i}`}
                                      id={`option2_${i}`}
                                      className="border p-1 px-4 border-gray-500 rounded-md"
                                      placeholder="option 2"
                                      value={data.options[1] || ""}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          i,
                                          1,
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      type="text"
                                      name={`option3_${i}`}
                                      id={`option3_${i}`}
                                      className="border p-1 px-4 border-gray-500 rounded-md"
                                      placeholder="option 3"
                                      value={data.options[2] || ""}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          i,
                                          2,
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      type="text"
                                      name={`option4_${i}`}
                                      id={`option4_${i}`}
                                      className="border p-1 px-4 border-gray-500 rounded-md"
                                      placeholder="option 4"
                                      value={data.options[3] || ""}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          i,
                                          3,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-4 gap-4 my-2">
                                    <input
                                      type="text"
                                      name={`option1_${i}`}
                                      id={`option1_${i}`}
                                      className=" p-1 px-4  rounded-md outline-none bg-gray-100"
                                      placeholder="option 1"
                                      value={data.options[0] || ""}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          i,
                                          0,
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      type="text"
                                      name={`option2_${i}`}
                                      id={`option2_${i}`}
                                      className=" p-1 px-4  rounded-md outline-none bg-gray-100"
                                      placeholder="option 2"
                                      value={data.options[1] || ""}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          i,
                                          1,
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      type="text"
                                      name={`option3_${i}`}
                                      id={`option3_${i}`}
                                      className=" p-1 px-4  rounded-md outline-none bg-gray-100"
                                      placeholder="option 3"
                                      value={data.options[2] || ""}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          i,
                                          2,
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      type="text"
                                      name={`option4_${i}`}
                                      id={`option4_${i}`}
                                      className=" p-1 px-4  rounded-md outline-none bg-gray-100"
                                      placeholder="option 4"
                                      value={data.options[3] || ""}
                                      onChange={(e) =>
                                        handleQuestionChange(
                                          i,
                                          3,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                          {isEditing && (
                            <div className="flex justify-end gap-2">
                              <button
                                className="p-1 border-2 border-red-500 text-white hover:bg-white hover:text-red-500 bg-red-500 px-4 transition-all duration-300 rounded-md "
                                onClick={() => handleRemoveQuestionFields(i)}
                              >
                                <IoClose />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                {isEditing && (
                  <button
                    type="button"
                    className="p-1 border-2 border-black px-4 rounded-md my-2 flex gap-2 items-center"
                    onClick={() => handleAddQuestionFields()}
                  >
                    <BiPlus />
                    Add Question
                  </button>
                )}
              </div>
              <div className="flex justify-center">
                {isEditing && (
                  <button
                    type="submit"
                    className="bg-black text-white p-2 px-4 rounded-md font-medium"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditServiceChecklist;
