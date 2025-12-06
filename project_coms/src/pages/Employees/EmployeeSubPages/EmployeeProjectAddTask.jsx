import React, { useState } from "react";

import Select from "react-select";

import FileInputBox from "../../../containers/Inputs/FileInputBox";
import { Switch } from "../../../Buttons";
const EmployeeProjectAddTask = () => {
  const [assign, setAssign] = useState("self");
  const [selectedOption, setSelectedOption] = useState("");
  const [repeat, setRepeat] = useState(false);
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [formData, setFormData] = useState({
    meeting: "",
    Attendees: [],
    repeat: false,
    on_behalf: "",
  });

  const [weekdaysMap, setWeekdaysMap] = useState([
    { day: "Mon", index: 0, isActive: false },
    { day: "Tue", index: 1, isActive: false },
    { day: "Wed", index: 2, isActive: false },
    { day: "Thu", index: 3, isActive: false },
    { day: "Fri", index: 4, isActive: false },
    { day: "Sat", index: 5, isActive: false },
    { day: "Sun", index: 6, isActive: false },
  ]);
  console.log(selectedWeekdays);

  const handleWeekdaySelection = (weekday) => {
    console.log(`Selected day: ${weekday}`);

    // Find the index of the selected day
    const index = weekdaysMap.find((dayObj) => dayObj.day === weekday)?.index;

    if (index !== undefined) {
      // Toggle the isActive status of the selected day
      const updatedWeekdaysMap = weekdaysMap.map((dayObj) =>
        dayObj.index === index
          ? { ...dayObj, isActive: !dayObj.isActive }
          : dayObj
      );

      // Update the weekdaysMap with the modified isActive status
      setWeekdaysMap(updatedWeekdaysMap);

      // Update the selected weekdays list
      setSelectedWeekdays((prevSelectedWeekdays) =>
        prevSelectedWeekdays.includes(index)
          ? prevSelectedWeekdays.filter((day) => day !== index)
          : [...prevSelectedWeekdays, index]
      );
    }
  };

  const options = [
    {
      value: "Akshat",
      label: "Akshat",
      email: "akshat.shrawat@vibecopilot.ai",
    },
    { value: "Kunal", label: "Kunal", email: "kunal.sah@vibecopilot.ai" },
    { value: "Anurag", label: "Anurag", email: "anurag.sharma@vibecopilot.ai" },
  ];
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-2xl bg-black text-white w-full text-center font-medium  my-5">
        Create Task
      </h1>
      <div className=" my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
      {/* <div className="border-2 border-gray-400 rounded-md w-full mx-10 p-4"> */}
        <div>
          <button
            onClick={() => setAssign("self")}
            className={` border border-black  rounded p-2  ${
              assign === "self" ? "bg-black text-white" : ""
            }`}
          >
            self task
          </button>
          <button
            onClick={() => setAssign("other")}
            className={`ml-3  rounded p-2 border border-black ${
              assign === "other" ? "bg-black text-white" : ""
            }`}
          >
            Assign to others
          </button>

          <div className="grid md:grid-cols-2  gap-2 my-2">
            <div className="flex flex-col">
              <label className="font-medium mb-2">Task Topic :</label>
              <input
                type="text"
                name=""
                id=""
                placeholder=""
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-2">Due Date :</label>
              <input
                type="date"
                name=""
                id=""
                placeholder="Select Date and Time"
                className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
              />
            </div>
          </div>
        </div>
        {/* <div className="grid sm:grid-cols-2 grid-cols-2 gap-2 my-2"> */}
        <div className="flex flex-col">
          <label className="font-medium mb-2">Task Description :</label>
          <textarea
            type="text"
            name=""
            id=""
            placeholder=""
            className="border p-1 px-4 border-gray-500 rounded-md placeholder:text-sm"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium my-2 ">Attachment :</label>
          <FileInputBox />
        </div>
        {assign === "other" && (
          <div className="flex md:flex-row flex-col justify-between gap-2 my-2 items-center">
            <div className="flex flex-col w-full">
              <label htmlFor="gender" className="font-medium mt-4">
                Assign :
              </label>
              <Select
                options={options}
                isMulti
                //   value={formData.Attendees}
                //   onChange={(selectedOption) =>
                //     setFormData({ ...formData, Attendees: selectedOption })
                //   }
              />
            </div>
            <div className="flex   gap-2 my-2">
              <div className="flex flex-col mx-2">
                <label htmlFor="gender" className="text-sm mt-4">
                  Urgent
                </label>
                <Switch />
              </div>
              <div className="flex flex-col">
                <label htmlFor="gender" className="text-sm mt-4">
                  Repeat
                </label>
                <Switch
                  checked={formData.repeat}
                  onChange={() =>
                    setFormData({ ...formData, repeat: !formData.repeat })
                  }
                />
              </div>
            </div>
          </div>
        )}
        {formData.repeat && (
          <div className="flex flex-col gap-2">
            <div className="grid md:grid-cols-4 gap-4 ">
              <div className="flex flex-col">
                <p className="font-medium">From :</p>
                <input
                  type="date"
                  name=""
                  id=""
                  className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-medium">To :</p>
                <input
                  type="date"
                  name=""
                  id=""
                  className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                />
              </div>
            </div>
            <p className="font-medium">Select Working Days :</p>

            <div className="flex flex-wrap gap-4 ">
              {weekdaysMap.map((weekdayObj) => (
                <button
                  key={weekdayObj.day}
                  className={` rounded-md p-2 px-4 shadow-custom-all-sides font-medium ${
                    selectedWeekdays?.includes(weekdayObj.index)
                      ? // &&
                        // weekdayObj.isActive
                        "bg-green-400 text-white "
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleWeekdaySelection(weekdayObj.day);
                  }}
                >
                  <a>{weekdayObj.day}</a>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center my-4">
          <button className="bg-black p-1 px-4 border-2 rounded-md text-white font-sm    transition-all duration-300">
            Create Task
          </button>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
};




export default EmployeeProjectAddTask
