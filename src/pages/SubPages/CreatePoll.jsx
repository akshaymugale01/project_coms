import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Select from "react-select";
import { FaCheck, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAssignedTo, postPolls } from "../../api";
import { MdClose } from "react-icons/md";

function CreatePolls() {
  const themeColor = useSelector((state) => state.theme.color);
  const [pollInput, setPollInput] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [selectedUserOption, setSelectedUserOption] = useState([]);
  const [pollsOption, setPollsOption] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    setCurrentDate(formattedDate);
  }, []);

  const navigate = useNavigate();

  const handleAddPolls = (event) => {
    event.preventDefault();

    if (pollInput.trim() !== "") {
      if (pollsOption.length < 5) {
        setPollsOption([...pollsOption, { pollOption: pollInput }]);
        setPollInput(""); // Clear the input after adding the poll option
      } else {
        toast.error("You can only add up to 5 options");
      }
    } else {
      toast.error("Please enter a poll option");
    }
  };

  const handleUserChangeSelect = (selectedUserOption) => {
    setSelectedUserOption(selectedUserOption);
    const targetGroups = selectedUserOption.map((user) => user.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      target_groups: targetGroups,
    }));
  };

  useEffect(() => {
    const fetchAssignedTo = async () => {
      const assignedToList = await getAssignedTo();
      const user = assignedToList.data.map((u) => ({
        value: u.id,
        label: `${u.firstname} ${u.lastname}`,
      }));
      setAssignedTo(user);
    };
    fetchAssignedTo();
  }, []);

  const handleRemovePolls = (index) => {
    const newPollsOption = [...pollsOption];
    newPollsOption.splice(index, 1);
    setPollsOption(newPollsOption);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    visibility: "",
    target_groups: [], // Array to store selected target groups
    poll_options_attributes: {}, // Object to store poll options
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const sendData = new FormData();
    sendData.append("poll[title]", formData.title);
    sendData.append("poll[description]", formData.description);
    sendData.append("poll[start_date]", currentDate);
    sendData.append("poll[end_date]", formData.end_date);
    sendData.append("poll[visibility]", formData.visibility);

    // Append target groups (assumed to be single value for simplicity)
    formData.target_groups.forEach((group) => {
      sendData.append("poll[target_groups]", group);
    });

    // Create poll_options_attributes with proper indexing
    pollsOption.forEach((option, index) => {
      sendData.append(
        `poll[poll_options_attributes][${index + 1}][content]`,
        option.pollOption
      );
    });

    try {
      const pollresp = await postPolls(sendData); // Call the API with the form data
      toast.success("Poll Added Successfully");
      navigate("/communication/polls");
      console.log(pollresp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="my-5 mb-10 border border-gray-200 p-2 m-5 px-2 rounded-lg">
          <h2
            className="text-center text-xl font-bold  p-2 bg-black rounded-md text-white"
            style={{ background: themeColor }}
          >
            Create Polls
          </h2>

          <div className="md:grid grid-cols-3 gap-5 my-5">
            <div className="flex flex-col">
              <label className="font-semibold my-2">Poll Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Enter Poll Title"
                className="border p-2 px-4 border-gray-400 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold my-2">Poll Options</label>
              <div className="flex xl:flex-row flex-col gap-3 ">
                <input
                  type="text"
                  placeholder="Poll Options"
                  className="border p-2 w-96 px-4 border-gray-400 rounded-md"
                  value={pollInput}
                  onChange={(e) => setPollInput(e.target.value)}
                  disabled={pollsOption.length >= 5}
                />
                <button
                  className="border-2 border-black rounded-md p-2 px-4"
                  onClick={handleAddPolls}
                  disabled={pollsOption.length >= 5}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold my-2">Visibility</label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleFormChange}
                className="border py-2 px-4 border-gray-400 rounded-md"
              >
                <option value="">Select Visibility</option>
                <option value="Public">Public</option>
                <option value="Restricted">Restricted</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold my-2">Start Date/Time</label>
              <input
                type="date"
                name="start_date"
                value={currentDate}
                readOnly
                className="border p-2 px-4 border-gray-400 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold my-2">End Date/Time</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleFormChange}
                className="border p-2 px-4 border-gray-400 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold my-2">Target Groups/Roles</label>
            <Select
              isMulti
              value={selectedUserOption}
              onChange={handleUserChangeSelect}
              options={assignedTo}
              noOptionsMessage={() => "No Users Available"}
              placeholder="Select Users"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold my-2">Poll Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              cols="5"
              rows="3"
              placeholder="Description"
              className="border p-2 px-4 border-gray-400 rounded-md"
            />
          </div>
         {pollsOption.length !== 0 && <div className="flex items-center gap-2 flex-wrap border rounded-md p-2 my-2">
            {pollsOption.map((option, index) => (
              <div key={index} className="flex">
                <div className="flex xl:flex-row flex-col gap-3 items-center bg-blue-400 p-1 rounded-md">
                {/* <label className=" text-white">Option - {index + 1}</label> */}
                  {/* <input
                    type="text"
                    value={option.pollOption}
                    readOnly
                    className="border p-2 w-full px-4 border-gray-400 rounded-md"
                  /> */}
                  <p className="bg-green-400 rounded-md text-white p-1">{option.pollOption}</p>
                  <button
                    className="rounded-full bg-red-400 text-white p-1"
                    onClick={() => handleRemovePolls(index)}
                  >
                    <MdClose />
                  </button>
                </div>
              </div>
            ))}
          </div>}

          <div className="flex justify-center my-5 gap-2">
            <button
              onClick={handleSubmit}
              className="bg-black text-white p-2 px-4 rounded-md font-medium flex items-center gap-2"
              style={{ background: themeColor }}
            >
              <FaCheck /> Create Poll
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreatePolls;
