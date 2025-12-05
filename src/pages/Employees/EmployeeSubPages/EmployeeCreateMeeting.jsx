import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { MdOutlineContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import Select from "react-select";
import { Switch } from "../../../Buttons";
import { FaTimes } from "react-icons/fa";

const EmployeeCreateMeeting = () => {
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [emailOtherList, setEmailOtherList] = useState([]);
  const [otherEmails, setOtherEmails] = useState("");
  const [formData, setFormData] = useState({
    meeting: "",
    Attendees: [],
    repeat: false,
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

  const handleMeetingLinkCopy = () => {
    navigator.clipboard
      .writeText(formData.meeting)
      .then(() => {
        toast.success("Meeting Link Copied");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
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
  console.log(formData);

  const handleAddEmail = () => {
    // Validate the email before adding it to the list
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(otherEmails)) {
      setEmailOtherList([...emailOtherList, otherEmails]);
      setOtherEmails("");
    } else {
      // Show a toast notification if the email is not valid
      toast.error("Please enter a valid email address");
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    const updatedEmailList = emailOtherList.filter(
      (email) => email !== emailToRemove
    );
    setEmailOtherList(updatedEmailList);
    console.log("emailList");
    console.log(emailOtherList);
  };

  return (
    <section className="min-h-screen p-4 sm:p-0 flex flex-col md:flex-row">
      <div className="fixed hidden sm:block left-0 top-0 h-full md:static md:h-auto md:flex-shrink-0">
        <Navbar />
      </div>
      <div className="flex justify-center overflow-x-auto w-full sm:w-full">
        <div className="border border-gray-300 rounded-lg w-full m-5 px-8 flex h-fit md:mb-10 flex-col gap-5">
          <h2 className="text-center md:text-xl font-semibold my-2 p-2 bg-black rounded-full text-white">
            Create New Meeting
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="patientName" className="font-semibold">
                Meeting Topic :
              </label>
              <input
                type="text"
                name="meetingTopic"
                // value={formData.patientName}
                // onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm"
                placeholder="Enter Meeting Topic"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="patientName" className="font-semibold">
                Date :
              </label>
              <input
                type="date"
                name="date"
                // value={formData.patientName}
                // onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="patientName" className="font-semibold">
                Time :
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="time"
                  name="time"
                  // value={formData.patientName}
                  // onChange={handleInputChange}
                  className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                />
                -
                <input
                  type="time"
                  name="time"
                  // value={formData.patientName}
                  // onChange={handleInputChange}
                  className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">Description :</p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex md:flex-row flex-col justify-between md:items-center">
              <p className="font-medium">Meeting Link :</p>
              <select
                name="meeting"
                value={formData.meeting}
                onChange={(e) =>
                  setFormData({ ...formData, meeting: e.target.value })
                }
                id=""
                className="border-2 p-1 px-4 font-medium rounded-md border-black"
              >
                <option value="">Generate Link</option>
                <option value="zoom Link">Zoom Meeting</option>
                <option value="Team Link">Team Meeting</option>
              </select>
            </div>
            <div className="w-full flex gap-2 items-center">
              <input
                type="text"
                readOnly
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                value={formData.meeting}
              />
              <button onClick={handleMeetingLinkCopy}>
                <MdOutlineContentCopy size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Invite internal Attendees :</p>
              <Select
                options={options}
                isMulti
                value={formData.Attendees}
                onChange={(selectedOption) =>
                  setFormData({ ...formData, Attendees: selectedOption })
                }
              />
            </div>
            <div className="flex flex-col gap-2 my-2">
              <p className="font-medium">Invite External Attendees :</p>
              <div className="flex md:flex-row flex-col items-center gap-2">
                <input
                  type="email"
                  value={otherEmails}
                  onChange={(e) => setOtherEmails(e.target.value)}
                  name="otherEmails"
                  id=""
                  placeholder="Enter Email id"
                  className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                />
                <button
                  className="border-2 border-black font-medium p-1 px-4 rounded-md"
                  onClick={handleAddEmail}
                >
                  Add
                </button>
              </div>
              {emailOtherList.length > 0 && (
                <div
                  className=" flex items-center gap-2 border border-gray-400 rounded-md p-2"
                  // style={{
                  //   backgroundColor: "#fff",
                  //   borderRadius: 4,
                  //   border: "1px solid #ccc",
                  //   padding: 6,
                  // }}
                >
                  {emailOtherList.map((email, index) => (
                    <span
                      key={index}
                      className="bg-green-400 px-4 rounded-full flex gap-2 items-center text-white p-1"
                    >
                      {email}
                      <button
                        className="cl"
                        // style={{ padding: "0px 4px" }}
                        type="button"
                        onClick={() => handleRemoveEmail(email)}
                      >
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="my-2">
              <div className="flex items-center  gap-4">
                <p className="font-medium text-lg">Repeat</p>
                <Switch
                  checked={formData.repeat}
                  onChange={() =>
                    setFormData({ ...formData, repeat: !formData.repeat })
                  }
                />
              </div>
            </div>
            {formData.repeat && (
              <div className="flex flex-col gap-2">
                <div className="grid md:grid-cols-3 gap-4 ">
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
                <div className="flex gap-4 ">
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
          </div>
          <div className="flex justify-center my-5">
            <button className="bg-black p-1 px-4 text-white rounded-md">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeCreateMeeting;
