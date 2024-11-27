import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { postChecklist } from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cron from "../../components/Cron";
import CronChecklist from "../../components/Cron";
import { useSelector } from "react-redux";

const AddServicesChecklist = () => {
  const today = new Date().toISOString().split("T")[0];
  const toDay = new Date();
  const year = toDay.getFullYear();
  const month = String(toDay.getMonth() + 1).padStart(2, "0");
  const day = String(toDay.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);
  const [prioritylevel, setPrioritylevel] = useState("");
  const [graceperiodvalue, setGraceperiodvalue] = useState("");
  const [graceperiodunit, setGraceperiodunit] = useState("");
  const [addNewQuestion, setAddNewQuestion] = useState([
    { name: "", type: "", options: ["", "", "", ""], value_types: ["", "", "", ""] },
  ]);
  
  const handleAddQuestionFields = () => {
    setAddNewQuestion([
      ...addNewQuestion,
      { name: "", type: "", options: ["", "", "", ""] ,value_types: ["", "", "", ""]},
    ]);
  };

  const handleRemoveQuestionFields = (index) => {
    const newFields = [...addNewQuestion];
    newFields.splice(index, 1);
    setAddNewQuestion(newFields);
  };

  const navigate = useNavigate();
  const handleQuestionChange = (index, field, value, optionIndex = null) => {
    const newQuestions = [...addNewQuestion];
  
    if (field === "name" || field === "type") {
      newQuestions[index][field] = value;
    } else if (field === "option") {
      newQuestions[index].options[optionIndex] = value;
    } else if (field === "value_type") {
      newQuestions[index].value_types[optionIndex] = value;
    }
  
    setAddNewQuestion(newQuestions);
  };
  
  const siteId = getItemInLocalStorage("SITEID");
  const userId = getItemInLocalStorage("UserId");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      checklist: {
        site_id: siteId,
        occurs: "",
        name: name,
        start_date: startDate,
        end_date: endDate,
        priority_level: prioritylevel,
        grace_period_value: graceperiodvalue,
        grace_period_unit: graceperiodunit,
        user_id: userId,
        ctype: "soft_service",
      },
      frequency: frequency,
      question: addNewQuestion.map((q) => ({
        name: q.name,
        type: q.type,
        option1: q.options[0],
      value_type1: q.value_types[0],
      option2: q.options[1],
      value_type2: q.value_types[1],
      option3: q.options[2],
      value_type3: q.value_types[2],
      option4: q.options[3],
      value_type4: q.value_types[3],
      })),
    };
    console.log(data);
    if (startDate >= endDate) {
      return toast.error("Start date must be before End date ")
    }

    try {
      const response = await postChecklist(data);
      toast.success("Checklist Created Successfully");
      navigate("/services/checklist");
      console.log(response);
      //   if (response.ok) {
      //     console.log("Checklist saved successfully!");
      //   } else {
      //     console.error("Error saving checklist");
      //   }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const themeColor = useSelector((state) => state.theme.color);

  return (
    <section>
      <div className="m-2">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold p-2 bg-black rounded-full text-white"
        >
          Add Checklist
        </h2>
        <div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-around">
              <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-2 w-full">
                <div className="flex flex-col">
                  <label htmlFor="name" className="font-semibold">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    placeholder="Enter Checklist Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="frequency" className="font-semibold">
                    Frequency:
                  </label>
                  <select
                    name="frequency"
                    id="frequency"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
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
                  <label htmlFor="start_date" className="font-semibold">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    name="start_date"
                    id="start_date"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={today}

                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="end_date" className="font-semibold">
                    End Date:
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    id="end_date"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={today}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="prioritylevel" className="font-semibold">Priority Level</label>
                  <select
                    name="prioritylevel"
                    id="prioritylevel"
                    value={prioritylevel}
                    onChange={(e) => setPrioritylevel(e.target.value)}
                    className="border p-1 px-4 border-gray-500 rounded-md">
                    <option value="">Select Priority level</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="grace_period_value" className="font-semibold">Grace Period Value</label>
                  <input
                    name="grace_period_value"
                    id="grace_period_value"
                    type="text"
                    value={graceperiodvalue}
                    onChange={(e) => setGraceperiodvalue(e.target.value)}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    placeholder="Enter Grace Period Value"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="grace_period_unit" className="font-semibold">Grace Period Unit</label>
                  <input
                     name="grace_period_unit"
                     id="grace_period_unit"
                     type="text"
                     value={graceperiodunit}
                     onChange={(e) => setGraceperiodunit(e.target.value)}
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    placeholder="Enter Grace Period Unit" />
                </div>
              </div>
              <div>
                {addNewQuestion.map((data, i) => (
                  <div key={i}>
                    <div className="my-5">
                      <h2 className="border-b-2 border-black text font-medium">
                        Add New Question
                      </h2>
                      <div className="my-2 grid gap-4">
                        <input
                          type="text"
                          name={`question_${i}`}
                          id={`question_${i}`}
                          className="border p-1 px-4 border-gray-500 rounded-md"
                          placeholder="Add New Question"
                          value={data.name}
                          onChange={(e) =>
                            handleQuestionChange(i, "name", e.target.value)
                          }
                        />
                      </div>
                      <div className="my-2">
                        <select
                          name={`type_${i}`}
                          id={`type_${i}`}
                          value={data.type}
                          onChange={(e) =>
                            handleQuestionChange(i, "type", e.target.value)
                          }
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        >
                          <option value="">Select Answer Type</option>
                          <option value="multiple">
                            Multiple Choice Question
                          </option>
                          <option value="inbox">Input box</option>
                          <option value="description">Description box</option>
                        </select>
                        {data.type === "multiple" && (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2">
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        name={`option1_${i}`}
        id={`option1_${i}`}
        className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="option 1"
        value={data.options[0]}
        onChange={(e) => handleQuestionChange(i, "option", e.target.value, 0)}
      />
      <select
        name={`value_type1_${i}`}
        id={`value_type1_${i}`}
        className={`border p-1 border-gray-500 rounded-md ${data.value_types[0] === 'P' ? 'bg-green-400' : data.value_types[0] === 'N' ? 'bg-red-400' : ''}`}
        value={data.value_types[0]}
        onChange={(e) => handleQuestionChange(i, "value_type", e.target.value, 0)}
      >
        <option value="">Select</option>
        <option value="P">P</option>
        <option value="N">N</option>
      </select>
    </div>
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        name={`option2_${i}`}
        id={`option2_${i}`}
        className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="option 2"
        value={data.options[1]}
        onChange={(e) => handleQuestionChange(i, "option", e.target.value, 1)}
      />
      <select
        name={`value_type2_${i}`}
        id={`value_type2_${i}`}
        className={`border p-1 border-gray-500 rounded-md ${data.value_types[1] === 'P' ? 'bg-green-400' : data.value_types[1] === 'N' ? 'bg-red-400' : ''}`}
        value={data.value_types[1]}
        onChange={(e) => handleQuestionChange(i, "value_type", e.target.value, 1)}
      >
        <option value="">Select</option>
        <option value="P" >P</option>
        <option value="N" >N</option>
      </select>
    </div>
    
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        name={`option3_${i}`}
        id={`option3_${i}`}
        className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="option 3"
        value={data.options[2]}
        onChange={(e) => handleQuestionChange(i, "option", e.target.value, 2)}
      />
      <select
        name={`value_type3_${i}`}
        id={`value_type3_${i}`}
        className={`border p-1 border-gray-500 rounded-md ${data.value_types[2] === 'P' ? 'bg-green-400' : data.value_types[2] === 'N' ? 'bg-red-400' : ''}`}
        value={data.value_types[2]}
        onChange={(e) => handleQuestionChange(i, "value_type", e.target.value, 2)}
      >
        <option value="">Select</option>
        <option value="P">P</option>
        <option value="N">N</option>
      </select>
    </div>
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        name={`option4_${i}`}
        id={`option4_${i}`}
        className="border p-1 px-4 border-gray-500 rounded-md"
        placeholder="option 4"
        value={data.options[3]}
        onChange={(e) => handleQuestionChange(i, "option", e.target.value, 3)}
      />
      <select
        name={`value_type4_${i}`}
        id={`value_type4_${i}`}
        className={`border p-1 border-gray-500 rounded-md ${data.value_types[3] === 'P' ? 'bg-green-400' : data.value_types[3] === 'N' ? 'bg-red-400' : ''}`}
        value={data.value_types[3]}
        onChange={(e) => handleQuestionChange(i, "value_type", e.target.value, 3)}
      >
        <option value="">Select</option>
        <option value="P">P</option>
        <option value="N">N</option>
      </select>
    </div>
  </div>
)}

                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          className="p-1 border-2 border-red-500 text-white hover:bg-white hover:text-red-500 bg-red-500 px-4 transition-all duration-300 rounded-md "
                          onClick={() => handleRemoveQuestionFields(i)}
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="p-1 border-2 border-black px-4 rounded-md my-2 flex gap-2 items-center"
                  onClick={() => handleAddQuestionFields()}
                >
                  <BiPlus />
                  Add Question
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-black text-white p-2 px-4 rounded-md font-medium"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddServicesChecklist;
