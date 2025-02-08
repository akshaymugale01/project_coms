import React, { useEffect, useRef, useState } from "react";
import FileInput from "../../Buttons/FileInput";
import Switch from "../../Buttons/Switch";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  postEvents,
  getAssignedTo,
  getEventsDetails,
  editEventDetails,
} from "../../api";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const EditEvent = () => {
  const siteId = getItemInLocalStorage("SITEID");
  const [share, setShare] = useState("all");
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [formData, setFormData] = useState({
    site_id: siteId,
    event_name: "",
    venue: "",
    important: false,
    email_enabled: false,
    rsvp_enabled: false,
    description: "",
    start_date_time: "",
    end_date_time: "",
    user_ids: "",
    event_image: [],
  });

  console.log(formData);
  const fileInputRef = useRef(null);
  const themeColor = useSelector((state) => state.theme.color);
  const datePickerRef = useRef(null);
  const currentDate = new Date();

  const handleStartDateChange = (date) => {
    setFormData({ ...formData, start_date_time: date });
  };

  const handleEndDateChange = (date) => {
    setFormData({ ...formData, end_date_time: date });
  };

  const formatDateTime = (date) => {
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAssignedTo();
        const transformedUsers = response.data.map((user) => ({
          value: user.id,
          label: `${user.firstname} ${user.lastname}`,
        }));
        setUsers(transformedUsers);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };

    const fetchEvent = async () => {
      try {
        const res = await getEventsDetails(id);
        const response = res.data;
        setFormData({
          ...formData,
          event_name: response.event_name || '',
          description: response.discription || '',
          end_date_time: response.end_date_time
            ? new Date(response.end_date_time)
            : null,
          start_date_time: response.start_date_time
            ? new Date(response.start_date_time)
            : null,
          event_image: response.event_image || null,
          venue: response.venue || "",
          important: response.important || false,
          email_enabled: response.email_enabled || false,
          rsvp_enabled: response.rsvp_enabled || false,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
    fetchEvent();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleEditEvent = async () => {
    if (formData.event_name === "" || formData.start_date_time === "") {
      return toast.error("All fields are Required");
    }
    try {
      toast.loading("Creating Event Please Wait!");
      const formDataSend = new FormData();
      formDataSend.append("event[site_id]", formData.site_id);
      formDataSend.append("event[event_name]", formData.event_name);
      formDataSend.append("event[discription]", formData.description);
      formDataSend.append(
        "event[start_date_time]",
        formatDateTime(formData.start_date_time)
      );
      formDataSend.append(
        "event[end_date_time]",
        formatDateTime(formData.end_date_time)
      );
      formDataSend.append("event[venue]", formData.venue);
      formDataSend.append("event[user_ids]", formData.user_ids);

      // formData.user_ids.forEach((user_id) => {
      //   formDataSend.append("event[user_ids]", user_id);
      // });

      formData.event_image.forEach((file) => {
        formDataSend.append("attachfiles[]", file);
      });

      const response = await editEventDetails(id, formDataSend);
      toast.success("Event updated successfully");
      console.log("Response:", response.data);
      toast.dismiss();
      navigate("/communication/events");
    } catch (error) {
      console.log(error);
      toast.dismiss();
    }
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    const userIdsString = selectedIds.join(",");

    setFormData({ ...formData, user_ids: userIdsString });
  };

  const handleFileAttachment = (event) => {
    const selectedFiles = event.target.files;
    setFormData((prevData) => ({
      ...prevData,
      event_image: [...prevData.event_image, ...selectedFiles],
    }));
  };

  const filterTime = (time) => {
    const selectedDate = new Date(time);
    const currentDate = new Date();

    // Compare selected date with current date
    if (selectedDate.getTime() > currentDate.getTime()) {
      return true; // Future date
    } else if (selectedDate.getTime() === currentDate.getTime()) {
      // If selected date is today, compare times
      const selectedTime =
        selectedDate.getHours() * 60 + selectedDate.getMinutes();
      const currentTime =
        currentDate.getHours() * 60 + currentDate.getMinutes();
      return selectedTime >= currentTime; // Future time
    } else {
      return false; // Past date
    }
  };


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // const inputValue = type === 'checkbox' ? checked : type === 'radio' ? checked : value; 

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInputRsVpChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      rsvp_enabled: value,
    }));
  };


  const handleFileChange = (files, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: files,
    });
  };

  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-center">
          <div className=" my-5 mb-10 border w-full max-w-[70rem] border-gray-400 p-2 rounded-lg ">
            <h2
              style={{ background: "rgb(19 27 32)" }}
              className="text-center text-xl font-medium p-2  rounded-md text-white"
            >
              Edit Event
            </h2>
            <h2 className="border-b text-xl border-black my-6 font-semibold">
              Event Info
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Title :
                </label>
                <input
                  type="text"
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleChange}
                  id=""
                  placeholder="Enter Title"
                  className="border-gray-400 border p-2  rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Venue :
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  id=""
                  placeholder="Enter Venue"
                  className="border-gray-400 border p-2  rounded-md"
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                {/* <div > */}
                {/* <p className="font-medium mb-2">Start Time:</p> */}
                <DatePicker
                  selected={formData.start_date_time || null}
                  onChange={handleStartDateChange}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy h:mm aa"
                  placeholderText="Select start date & time"
                  ref={datePickerRef}
                  //   minDate={currentDate}
                  className="border border-gray-400 p-2 w-full rounded-md"
                />
                {/* </div> */}-{/* <div> */}
                {/* <p className="font-medium mb-2">End Time:</p> */}
                <DatePicker
                  selected={formData.end_date_time || null}
                  onChange={handleEndDateChange}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy h:mm aa"
                  placeholderText="Select end date & time"
                  ref={datePickerRef}
                  //   minDate={currentDate}
                  className="border border-gray-400 rounded-md p-2 w-full "
                />
                {/* </div> */}
              </div>
            </div>
            <div className="flex flex-col gap-2 my-2">
              <label htmlFor="" className="font-medium">
                Description:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                id=""
                rows="3"
                placeholder="Enter Description"
                className="border-gray-400 border px-2 p-1 rounded-md"
              />
            </div>

            <div className="flex gap-4 my-5">
              <div className="flex gap-2 items-center">
                <input type="checkbox"
                  name="important"
                  checked={formData.important}
                  onChange={handleInputChange}
                  id="imp" />
                <label htmlFor="imp" className="font-semibold">
                  Important
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="email_enabled"
                  id="email"
                  checked={formData.email_enabled}
                  onChange={handleInputChange}
                />
                <label htmlFor="email" className="font-semibold">
                  Send Email
                </label>
              </div>
            </div>

            {/* <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileAttachment}
            /> */}

            <div className="">
              <h2 className="border-b t border-black my-5 text-lg font-semibold">
                Share With
              </h2>
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row gap-2 w-full font-semibold p-2 ">
                  <h2
                    className={`p-1 ${share === "all" && "bg-black text-white"
                      } rounded-full px-6 cursor-pointer border-2 border-black`}
                    onClick={() => setShare("all")}
                  >
                    All
                  </h2>
                  <h2
                    className={`p-1 ${share === "individual" && "bg-black text-white"
                      } rounded-full px-4 cursor-pointer border-2 border-black`}
                    onClick={() => setShare("individual")}
                  >
                    Individuals
                  </h2>
                  <h2
                    className={`p-1 ${share === "groups" && "bg-black text-white"
                      } rounded-full px-4 cursor-pointer border-2 border-black`}
                    onClick={() => setShare("groups")}
                  >
                    Groups
                  </h2>
                </div>
                <div className="my-5 flex w-full">
                  {share === "individual" && (
                    <Select
                      options={users}
                      closeMenuOnSelect={false}
                      placeholder="Select User"
                      value={users.filter((user) =>
                        formData.user_ids.includes(user.value)
                      )}
                      onChange={handleSelectChange}
                      isMulti
                      className="w-full"
                    />
                  )}
                  {share === "groups" && <p>list of groups</p>}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h2 className="border-b text-xl border-black font-semibold">
                RSVP
              </h2>
              <div className="flex gap-4 mt-2">
                <div className="flex gap-2">
                  <input
                    type="radio"
                    checked={formData.rsvp_enabled === true}
                    onChange={() => handleInputRsVpChange(true)} // Set true for "Yes"
                    name="rsvp_enabled"
                    id="yes"
                  />
                  <label htmlFor="yes" className="text-lg">
                    Yes
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    checked={formData.rsvp_enabled === false}
                    onChange={() => handleInputRsVpChange(false)} // Set false for "No"
                    name="rsvp_enabled"
                    id="no"
                  />
                  <label htmlFor="no" className="text-lg">
                    No
                  </label>
                </div>
              </div>

            </div>
            <div>
              <h2 className="border-b text-xl border-black my-5 font-semibold">
                Upload Attachments
              </h2>
              <FileInputBox
                fieldName={"event_image"}
                handleChange={(files) => handleFileChange(files, "event_image")}
                fileType="image/*"
              />
            </div>
            <div className="flex justify-center mt-10 my-5">
              <button
                style={{ background: themeColor }}
                className="bg-black text-white p-2 rounded-md hover:bg-white  flex items-center gap-2 px-4"
                onClick={handleEditEvent}
              >
                <FaCheck /> Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditEvent;
