import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  CreateVibeMeeting,
  CreateVibeTeamMeeting,
  CreateVibeZoomMeeting,
  UpdateVibeTask,
  deleteVibeCalenderTask,
  getVibeCalendar,
  getVibeCalenderEventsNew,
  getVibeUsers,
  postCalendarTask,
  postNewCalendarEvent,
  postOutlookAuth,
} from "../api";
import { getItemInLocalStorage } from "../utils/localStorage";
import "./style/Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FaArrowRight, FaPlus, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";

const localizer = momentLocalizer(moment);
import profile from "/profile.png";

import "react-datepicker/dist/react-datepicker.css";
import ReactSwitch from "react-switch";
import { AiOutlineClose } from "react-icons/ai";
import { PiPlusBold } from "react-icons/pi";
import MeertingDropdownButton from "../containers/MeetingDropdown";
import MeetingDropdownButton from "../containers/MeetingDropdown";
import { BiRightArrow, BiRightArrowAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import { MdOutlineContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Calender = () => {
  const vibeUserId = getItemInLocalStorage("VIBEUSERID");
  const [popupDate, setPopupDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [areCheckboxesChecked, setAreCheckboxesChecked] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("task");
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [selectedCategories, setSelectedCategories] = useState({
    Task: true,
    Meeting: true,
    Event: true,
    Outlook: true,
    Gmail: true,
  });
  const [taskTitle, setTaskTitle] = useState("");
  const [due_date, setDueDate] = useState(new Date());
  const [task_description, setTaskDescription] = useState("");
  const [attachments, setAttachment] = useState([]);
  const [eventAttachment, setEventAttachment] = useState([]);
  const [emails, setEmails] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingStartTime, setMeetingStartTime] = useState("");
  const [meetingEndTime, setMeetingEndTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [otherEmails, setOtherEmails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailOtherList, setEmailOtherList] = useState([]);
  const [loadingMeet, setLoadingMeet] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [fileUpload, setFileUpload] = useState(false);
  const [showGenerateLink, setShowGenerateLink] = useState(false);
  const [uuid, setuuid] = useState("");
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [selectedToDate, setSelectedToDate] = useState("");
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [meet_id, setMeet_id] = useState("");
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const [subcategory, setSubcategory] = useState("");
  // edit
  const [editableTitle, setEditableTitle] = useState("");
  const [editableDescription, setEditableDescription] = useState("");
  const [editableAssignTo, setEditableAssignTo] = useState([]);
  const [editableGuestTo, setEditableGuestTo] = useState([]);
  const [editableParticipantTo, setEditableParticipantTo] = useState([]);
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [editableStart, setEditableStart] = useState("");
  const [editableEnd, setEditableEnd] = useState("");
  const [editableStartTime, setEditableStartTime] = useState("");
  const [editableEndTime, setEditableEndTime] = useState("");
  const [editableMeetingLink, setEditableMeetingLink] = useState("");
  const user_id = localStorage.getItem("VIBEUSERID");
  // refs
  const dropdownRef = useRef();
  const fileInputRef = useRef(null);

  function incrementDate(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Increment the day by 1
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  function decrementDate(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate() - 1); // Increment the day by 1
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const currentDates = new Date();
  const year = currentDates.getFullYear();
  const month = String(currentDates.getMonth() + 1).padStart(2, "0");
  const day = String(currentDates.getDate()).padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;

  const [weekdaysMap, setWeekdaysMap] = useState([
    { day: "Mon", index: 0, isActive: false },
    { day: "Tue", index: 1, isActive: false },
    { day: "Wed", index: 2, isActive: false },
    { day: "Thu", index: 3, isActive: false },
    { day: "Fri", index: 4, isActive: false },
    { day: "Sat", index: 5, isActive: false },
    { day: "Sun", index: 6, isActive: false },
  ]);

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

  useEffect(() => {
    const fetchCalenderData = async () => {
      try {
        const calendarDataResponse = await getVibeCalenderEventsNew(vibeUserId);
        const validCategories = ["Task", "Event", "Meeting"];
        const formattedEvents = calendarDataResponse.data
          .filter((event) => validCategories.includes(event.category))
          .map((event) => {
            const start =
              event.category === "Task" ? event.due_date : event.from_datetime;
            const end = incrementDate(event.to_date);
            const category = event.category;
            const start_time = event.from_time;
            const end_time = event.to_time;
            const description = event.description;
            const meeting_link = event.meet_link;
            const id = event.id;
            const sub_category = event.sub_category;

            const assign_to_emails = Array.isArray(event.assign_to_data)
              ? event.assign_to_data.map((assignee) => ({
                  label: assignee.email,
                  value: assignee.id,
                }))
              : [];

            const guest_to_emails = Array.isArray(event.guest_data)
              ? event.guest_data.map((guest) => ({
                  label: guest.email,
                  value: guest.id,
                }))
              : [];

            const participant_to_emails = Array.isArray(event.participant_data)
              ? event.participant_data.map((participant) => ({
                  label: participant.email,
                  value: participant.id,
                }))
              : [];

            return {
              title: event.title,
              start,
              end,
              category,
              sub_category,
              id,
              start_time,
              end_time,
              description,
              assign_to_emails,
              guest_to_emails,
              participant_to_emails,
              meeting_link,
            };
          });

        setEvents(formattedEvents);
        console.log(formattedEvents);
        console.log(calendarDataResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCalenderData();
  }, [popupDate]);

  useEffect(() => {
    const getTaskAssign = async () => {
      const user_id = getItemInLocalStorage("VIBEUSERID");
      const org_id = getItemInLocalStorage("VIBEORGID");
      const orgg_id = localStorage.getItem("VIBEORGID");
      console.log("user : ", user_id);
      console.log("ord : ", org_id);
      console.log("orgid : ", orgg_id);

      try {
        // const params = {
        //   user_id: user_id,
        //   org_id: org_id,
        // };

        const VibeUserResponse = await getVibeUsers(user_id);
        console.log(VibeUserResponse);

        //   const jsonData = await getDataFromAPI(GetUsers, params);

        if (VibeUserResponse.success) {
          const users = VibeUserResponse.data;
          const assignEmails = users.map((user) => ({
            value: user.user_id,
            label: user.email,
          }));

          setEmails(assignEmails);
          setEditableAssignTo(assignEmails);
          //     setEditableGuestTo(assignEmails);
          setEditableParticipantTo(assignEmails);
          //     // Store the emails in local storage
          //     localStorage.setItem("assignEmails", JSON.stringify(assignEmails));
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // const assignEmailsFromStorage = localStorage.getItem("assignEmails");

    // if (assignEmailsFromStorage) {
    //   setEmails(JSON.parse(assignEmailsFromStorage));
    // } else {
    getTaskAssign();
    // }
  }, [
    // setEmails,
    setEditableAssignTo,
    // setEditableGuestTo,
    setEditableParticipantTo,
  ]);

  useEffect(() => {
    if (selectedItem) {
      console.log("------------------watch this-");
      console.log(selectedItem);
      console.log(selectedItem.sub_category);
      setEditableTitle(selectedItem.title);
      setEditableStart(selectedItem.start);
      setEditableEnd(decrementDate(selectedItem.end));
      // setEditableCategory(selectedItem.category);
      setEditableStartTime(selectedItem.start_time);
      setEditableEndTime(selectedItem.end_time);
      setEditableDescription(selectedItem.description);
      setEditableMeetingLink(selectedItem.meeting_link);
      // console.log(setEditableMeetingLink(selectedItem.meeting_link));
      setEditableAssignTo(selectedItem.assign_to_emails);
      setEditableGuestTo(selectedItem.guest_to_emails);
      setEditableParticipantTo(selectedItem.participant_to_emails);
      setId(selectedItem.id);
      setCategory(selectedItem.category);
      setSubcategory(selectedItem.extendedProps.sub_category);
      console.log(selectedItem.extendedProps.sub_category);
      console.log(subcategory);
      // console.log(microevents);
      //   setMicroTitle(selectedItem.title);
      //   setMicroDescription(selectedItem.description);
      //   setMicroStartTime(selectedItem.start);
      //   setMicroEndTime(selectedItem.end);
      //   setMicroInvites(selectedItem.participant_to_emails);

      //   setGmailTitle(selectedItem.title);
      //   setGmailDescription(selectedItem.description);
      //   setGmailStartTime(selectedItem.start);
      //   setGmailEndTime(selectedItem.end);
      //   setGmailInvites(selectedItem.participant_to_emails);
    }
  }, [selectedItem]);

  const calendarRef = useRef();
  const handleDateClick = (arg, date) => {
    setPopupDate(arg.dateStr);
    console.log("date clicked");
    setSelectedDate(new Date(arg.dateStr));

    if (date instanceof Date && !isNaN(date)) {
      setSelectedDate(date);

      const selectedMonth = date.getMonth() + 1;
      const selectedYear = date.getFullYear();

      console.log(
        `Selected Date: ${date.getDate()}, Month: ${selectedMonth}, Year: ${selectedYear}`
      );
    }
  };
  const handleViewChange = (info) => {
    const currentView = info.view;
    if (currentView) {
      const currentStartDate = currentView.currentStart;
      const currentMonth = currentView.currentStart.getMonth();
      const currentYear = currentView.currentStart.getFullYear();
      const currentDate = currentStartDate.getDate();
      console.log(
        `Current Date: ${currentDate}, Month: ${
          currentMonth + 1
        }, Year: ${currentYear}`
      );
    }
  };
  const [filteredEvents, setFilteredEvents] = useState([]);
  useEffect(() => {
    filterEvents();
  }, [selectedCategories]);
  const filterEvents = () => {
    const filtered = events.filter((event) => {
      // console.log(event.extendedProps.sub_category);
      return (
        selectedCategories[event.category] ||
        (selectedCategories.Rescheduled &&
          event.extendedProps.sub_category === "reschedule")
      );
    });
    setFilteredEvents(filtered);
  };
  const handleButtonToggle = (buttonType) => {
    setActiveButton(buttonType);
  };

  function formatDateTimedif(inputDate) {
    const date = new Date(inputDate);
    console.log(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const handleEventClick = (eventInfo) => {
    const pattern = /@gmail\.com$/;
    const clickedItem = eventInfo.event.toPlainObject();
    console.log(clickedItem);
    console.log("item clicked");
    if (clickedItem.extendedProps.category === "Task") {
      setActiveButton("task");
    } else if (clickedItem.extendedProps.category === "Event") {
      setActiveButton("event");
    } else if (clickedItem.extendedProps.category === "Meeting") {
      setActiveButton("meeting");
    } else if (pattern.test(clickedItem.extendedProps.organizer)) {
      setActiveButton("gmail");
    } else {
      setActiveButton("outlook");
    }

    if (clickedItem.extendedProps.category === "Task") {
      setSubcategory(clickedItem.extendedProps.sub_category);
      setDueDate(new Date(formatDateTimedif(clickedItem.start)));

      setSelectedItem({
        ...clickedItem,
        isEditing: true,
        start_time: formatDateTimedif(clickedItem.start),
        end_time: clickedItem.extendedProps.end_time,
        // title:clickedItem.extendedProps.title,
        description: clickedItem.extendedProps.description,
        assign_to_emails: clickedItem.extendedProps.assign_to_emails,
        guest_to_emails: clickedItem.extendedProps.guest_to_emails,
        participant_to_emails: clickedItem.extendedProps.participant_to_emails,
        category: clickedItem.extendedProps.category,
        subcategory: clickedItem.extendedProps.sub_category,
        meeting_link: clickedItem.extendedProps.meeting_link,
      });
    } else {
      setSelectedItem({
        ...clickedItem,
        isEditing: true,
        start_time: clickedItem.extendedProps.start_time,
        end_time: clickedItem.extendedProps.end_time,
        description: clickedItem.extendedProps.description,
        assign_to_emails: clickedItem.extendedProps.assign_to_emails,
        guest_to_emails: clickedItem.extendedProps.guest_to_emails,
        participant_to_emails: clickedItem.extendedProps.participant_to_emails,
        category: clickedItem.extendedProps.category,
        subcategory: clickedItem.extendedProps.sub_category,
        meeting_link: clickedItem.extendedProps.meeting_link,
      });
    }
  };

  const handleCheckboxChange = (event) => {
    console.log("checkbox");
    const updatedSelectedCategories = {
      ...selectedCategories,
      [event.target.name]: event.target.checked,
    };

    // Check if any checkbox is checked
    const anyCheckboxChecked = Object.values(updatedSelectedCategories).some(
      (isChecked) => isChecked
    );

    setAreCheckboxesChecked(anyCheckboxChecked);
    setSelectedCategories(updatedSelectedCategories);
    console.log("event", selectedCategories.Event);
    console.log("task", selectedCategories.Task);
    console.log("outlook", selectedCategories.Outlook);
    console.log("meeting", selectedCategories.Meeting);
    console.log("gmail", selectedCategories.Gmail);
    console.log("checkbox end");
  };
  const themeColor = useSelector((state) => state.theme.color);

  const currentDate = new Date();
  const currentTime = `${currentDate.getHours()}:${String(
    currentDate.getMinutes()
  ).padStart(2, "0")}`;
  const maxTime = `23:59`;
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
  const navigate = useNavigate();
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      className="datepickers"
      onClick={onClick}
      value={value}
      ref={ref}
      style={{
        backgroundColor: "white",
        color: "#000000",
        borderRadius: 4,
        border: "#747272 solid 1px",
        height: 40,
        fontSize: 14,
        paddingLeft: 10,
        // width: windowWidth <= 768 ? "100%" : "%",
      }}
    />
  ));
  const handleFileAttachment = (event) => {
    const selectedFiles = event.target.files;
    const newAttachments = Array.from(selectedFiles);
    setAttachment(newAttachments);
    console.log("testing attachment");
    console.log(newAttachments);
    console.log(selectedFiles);
    console.log(event);
    setFileUpload(true);
  };

  const handleEventFileAttachment = (event) => {
    const selectedFiles = event.target.files;
    const newAttachments = Array.from(selectedFiles);
    setEventAttachment(newAttachments);
    console.log(eventAttachment);
  };

  var handleChangeSelect = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
  };

  var handleChangeSelectEvent = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
  };

  var handleChangeSelectMeeting = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const handleSaveTask = async () => {
    if (!taskTitle) {
      //alert('Please fill in all the fields before creating the task.');
      toast.error("All fields are required");
      return;
    }
    const user_id = localStorage.getItem("VIBEUSERID");
    setLoading(true);
    console.log(task_description);
    const formData = new FormData();
    formData.append("task_topic", taskTitle);
    formData.append("due_date", formatDate(due_date));
    formData.append("created_by", user_id);
    formData.append("user_id", user_id);
    formData.append("task_description", task_description);
    attachments.forEach((file, index) => {
      console.log(file);
      formData.append("attachments", file);
    });
    const idList = selectedOption.map((email) => parseInt(email.value));
    idList.forEach((id) => {
      formData.append("assign_to", id);
    });
    try {
      toast.loading("Creating New Event Please Wait! ");
      const response = await postCalendarTask(formData);
      console.log(response);
      toast.dismiss();
      toast.success("New Task Created Successfully");
      setPopupDate(null);
      console.log(formData);
      // window.location.reload();
    } catch (error) {
      console.log(error);
      toast.dismiss();
    }
  };

  const handleSaveEvent = async () => {
    const idList = selectedOption.map((email) => parseInt(email.value));

    if (!eventTitle) {
      toast.error("Please fill in all the fields before creating the task.");
      return;
    }
    if (eventEndDate < eventStartDate) {
      toast.error(
        "Selected event end date should be greater than the start date.",
        {
          position: "top-center",
          autoClose: 2000,
        }
      );
      return;
    }
    if (eventEndTime <= eventStartTime) {
      toast.error(
        "Selected event end time should be greater than the start time.",
        {
          position: "top-center",
          autoClose: 2000,
        }
      );
      return;
    }

    const user_id = localStorage.getItem("VIBEUSERID");
    setLoadingEvent(true);
    const formData = new FormData();
    formData.append("title", eventTitle);
    formData.append("from_date", eventStartDate);
    formData.append("to_date", eventEndDate);
    formData.append("from_time", eventStartTime);
    formData.append("to_time", eventEndTime);
    formData.append("user_id", user_id);
    formData.append("description", eventDescription);
    eventAttachment.forEach((file) => {
      formData.append("attachment", file); // Append each file
    });
    const id = idList.join(",");

    formData.append("guest_ids", id);
    try {
      toast.loading("Creating New Event Please Wait! ");
      const response = await postNewCalendarEvent(formData);
      console.log(response);
      toast.dismiss();
      toast.success("New Event Created Successfully");
      setPopupDate(null);
      console.log(formData);
    } catch (error) {
      console.log(error);
      toast.dismiss();
    }
  };

  const [isSingleDayRange, setIsSingleDayRange] = useState(true);
  const today = new Date().toISOString().split("T")[0];
  const handleStartDateChange = (e) => {
    const selectedStartDate = new Date(e.target.value);
    const minDate = new Date();

    if (selectedStartDate < minDate) {
      setEventStartDate(getFormattedDate(minDate));
      setEventEndDate("");
    } else {
      setEventStartDate(e.target.value);
    }

    const selectedEndDate = new Date(eventEndDate);
    setIsSingleDayRange(
      selectedStartDate.toDateString() === selectedEndDate.toDateString()
    );
  };

  // Handle end date change
  const handleEndDateChange = (e) => {
    const selectedEndDate = new Date(e.target.value);
    const selectedStartDate = new Date(eventStartDate);

    if (selectedEndDate < selectedStartDate) {
      setEventEndDate(eventStartDate);
    } else {
      setEventEndDate(e.target.value);
    }

    setIsSingleDayRange(
      selectedStartDate.toDateString() === selectedEndDate.toDateString()
    );
  };
  const ZoomCreateMeeting = async () => {
    if (!meetingTitle || !meetingDate) {
      toast.error(
        "Please fill in Title and Date before creating the Meeting Link."
      );
      return;
    }

    const formData = new FormData();
    formData.append("agenda", meetingTitle);
    formData.append("date", meetingDate);
    setIsLoading(true);
    try {
      const response = await CreateVibeZoomMeeting(formData);
      if (response.success) {
        console.log(response.data[0].meet_link);
        setMeetingLink(response.data[0].meet_link);
        setuuid(response.data[0].uuid);
        setMeet_id(response.data[0].meet_id);
        setIsLoading(false);
        setLinkGenerated(true);
        setShowGenerateLink(false);
      } else {
        console.log("unsuccess");
      }
    } catch (error) {
      console.log("error creating meeting link ");
    }
  };

  const GenerateMeet = () => {
    ZoomCreateMeeting();
  };

  const TeamCreateMeeting = async () => {
    if (!meetingTitle || !meetingDate) {
      alert("Please fill in Title and Date before creating the Meeting Link.");
      return;
    }
    const user_id = getItemInLocalStorage("VIBEUSERID");
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("agenda", meetingTitle);
    formData.append("start_time", meetingStartTime);
    setIsLoading(true);
    try {
      const TeamMeetResponse = await CreateVibeTeamMeeting(formData);
      console.log(TeamMeetResponse);
      if (TeamMeetResponse.success) {
        console.log(TeamMeetResponse.data[0].meet_link);
        setMeetingLink(TeamMeetResponse.data[0].meet_link);
        setuuid(TeamMeetResponse.data[0].uuid);
        setMeet_id(TeamMeetResponse.data[0].meet_id);
        setIsLoading(false);
        setLinkGenerated(true);
        setShowGenerateLink(false);
      } else {
        console.log("unsuccess");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const TeamGenerateMeet = () => {
    TeamCreateMeeting();
  };

  const handleAddEmail = () => {
    // Validate the email before adding it to the list

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(otherEmails)) {
      setEmailOtherList([...emailOtherList, otherEmails]);

      setOtherEmails("");
    } else {
      toast.error("Please Enter a valid Email ID");
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

  const [checkedRepeat, setCheckedRepeat] = useState(0);
  const [repeatMeet, setRepeatMeet] = useState(false);

  function ToggleRepeatSwitch() {
    const handleChange = (val) => {
      setCheckedRepeat(val ? 1 : 0);
    };

    console.log(checkedRepeat);
    if (checkedRepeat === 1) {
      console.log("asdfghjk");
      setRepeatMeet(true);
    }
    if (checkedRepeat === 0) {
      console.log("cancel");
      setRepeatMeet(false);
    }

    return (
      <div className="flex flex-col gap-2">
        <label className="font-medium text-white">Repeat</label>
        <div className="app">
          <ReactSwitch checked={checkedRepeat === 1} onChange={handleChange} />
        </div>
      </div>
    );
  }

  const handleMeetingLinkCopy = () => {
    navigator.clipboard
      .writeText(meetingLink)
      .then(() => {
        toast.success("Meeting Link Copied");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleSaveMeeting = async () => {
    const idList = selectedOption.map((email) => parseInt(email.value));

    if (!meetingTitle) {
      //alert('Please fill in all the fields before creating the task.');
      return;
    }
    if (meetingEndTime < meetingStartTime) {
      toast.error(
        "Selected meeting end time should be greater than start time.",
        { position: "top-center", autoClose: 2000 }
      );
      return;
    }
    const user_id = localStorage.getItem("VIBEUSERID");
    setLoadingMeet(true);
    const formData = new FormData();
    formData.append("title", meetingTitle);
    formData.append("from_date", meetingDate);
    formData.append("from_time ", meetingStartTime);
    formData.append("to_time", meetingEndTime);
    formData.append("user_id", user_id);
    formData.append("purpose", meetingDescription);
    formData.append("meet_link", meetingLink);
    formData.append("uuid", uuid);
    formData.append("meet_id", meet_id);
    const otheremails = emailOtherList.join(",");
    formData.append("other_emails", otheremails);
    console.log(otheremails);
    const id = idList.join(",");
    formData.append("participent_ids", id);
    formData.append("to__date", selectedToDate);
    const mainWeek = selectedWeekdays.join(",");
    formData.append("included_weekdays", mainWeek);
    formData.append("repeat_meeting", repeatMeet);
    setIsCreatingMeeting(true);
    toast.loading("Creating Meeting Please wait!");
    try {
      const meetingResp = await CreateVibeMeeting(formData);
      toast.dismiss();
      toast.success("Meeting Created Successfully");
      setPopupDate(null);
      if (meetingResp.success) {
        setMeetingTitle("");
        setMeetingDate("");
        setMeetingStartTime("");
        setMeetingEndTime("");
        setMeetingDescription("");
        setMeetingLink("");
        setuuid("");
        setMeet_id("");
        setEmailOtherList("");
        // setSelectedToDate('');
        setSelectedWeekdays("");
        // setRepeatMeet('');
        setPopupDate(null);
        setLoadingMeet(false);
      }
    } catch (error) {
      toast.dismiss();
    }
  };

  const handleChangeUpdate = (selectedOptions) => {
    setEditableAssignTo(selectedOptions);
    console.log(selectedOptions);
  };

  const handleUpdateTask = async () => {
    console.log(subcategory);

    const assignToIds = editableAssignTo.map(
      (assignEmails) => assignEmails.value
    );

    const formData = new FormData();
    // formData.append('task_topic', editableTitle);
    // formData.append('due_date', formatDate(due_date));
    // formData.append('user_id', user_id);
    // formData.append('task_description', editableDescription);
    // formData.append('assign_to', assignToIds);
    // formData.append('id', id);
    // formData.append('category', category);
    // attachments.forEach((file, index) => {
    //     formData.append('attachments', file);
    // });
    // console.log(id)

    if (category === "Task" && subcategory && subcategory === "subtask") {
      console.log("subtask-------------------------");
      formData.append("user_id", user_id);
      formData.append("task_id", id);
      formData.append("task_topic", editableTitle);
      formData.append("due_date", SendDueDateFormat(due_date));
      formData.append("assign_to", assignToIds);

      putDataToAPI(Update_User_SubTask, formData)
        .then((response) => {
          if (response.success) {
            window.location.reload();
          } else {
            console.log("unsuccess");
          }
        })
        .catch((error) => {
          console.error("Please check your internet and try again!", error);
        })
        .finally(() => {
          setSelectedItem(false);
        });
    } else if (
      category === "Task" &&
      subcategory &&
      subcategory === "subtaskchild"
    ) {
      console.log("subtaskchild-----------------------");
      formData.append("user_id", user_id);
      formData.append("child_task_id", id);
      formData.append("due_date", SendDueDateFormat(due_date));
      formData.append("assign_to", assignToIds);

      // putDataToAPI(UpdateSubTask_Child, formData)
      //   .then((response) => {
      //     if (response.success) {
      //       window.location.reload();
      //     } else {
      //       console.log("unsuccess");
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Please check your internet and try again!", error);
      //   })
      //   .finally(() => {
      //     setSelectedItem(false);
      //   });
    } else {
      console.log("task -----------------------");

      formData.append("task_topic", editableTitle);
      formData.append("due_date", formatDate(due_date));
      formData.append("user_id", user_id);
      formData.append("task_description", editableDescription);
      formData.append("assign_to", assignToIds);
      formData.append("id", id);
      formData.append("category", category);
      attachments.forEach((file, index) => {
        formData.append("attachments", file);
      });
      console.log(id);

      // putDataToAPI(UpdateCalendarEvent, formData)
      //   .then((response) => {
      //     if (response.success) {
      //       window.location.reload();
      //     } else {
      //       console.log("unsuccess");
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Please check your internet and try again!", error);
      //   })
      //   .finally(() => {
      //     setSelectedItem(false);
      //   });
      const UpdateTaskResponse = await UpdateVibeTask(formData);

      console.log(UpdateTaskResponse);
    }
  };
  const handleChangeUpdateEvent = (selectedOptions) => {
    setEditableGuestTo(selectedOptions);
    console.log(selectedOptions);
  };
  const handleUpdateEvent = () => {
    const guestToIds = editableGuestTo.map(
      (assignEmails) => assignEmails.value
    );
    if (editableEnd < editableStart) {
      toast.error(
        "Selected event end date should be greater than the start date.",
        {
          position: "top-center",
          autoClose: 2000,
        }
      );
      return;
    }
    if (editableEndTime <= editableStartTime) {
      toast.error(
        "Selected event end time should be greater than the start time.",
        {
          position: "top-center",
          autoClose: 2000,
        }
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", editableTitle);
    formData.append("from_date", editableStart);
    formData.append("to_date", editableEnd);
    formData.append("from_time", editableStartTime);
    formData.append("to_time", editableEndTime);
    formData.append("user_id", user_id);
    formData.append("description", editableDescription);
    formData.append("attachment", eventAttachment);
    formData.append("guest_ids", guestToIds);
    // const id = idList.join(',');

    // formData.append('participent_ids', id);
    formData.append("id", id);
    formData.append("category", category);
    attachments.forEach((file, index) => {
      // formData.append(attachments${index}, file); // Append each file individually with a unique key
      formData.append("attachments", file);
    });

    putDataToAPI(UpdateCalendarEvent, formData)
      .then((response) => {
        if (response.success) {
          //  alert("Event Updated !")

          //   onClose();
          window.location.reload();
        } else {
          console.log("unsuccess");
        }
      })
      .catch((error) => {
        //alert('Please check your internet and try again!');
      })
      .finally(() => {
        setSelectedItem(false);
      });
  };

  const handleChangeUpdateMeeting = (selectedOptions) => {
    setEditableParticipantTo(selectedOptions);
    console.log(selectedOptions);
  };

  const handleUpdateMeeting = () => {
    const participantToIds = editableParticipantTo.map(
      (assignEmails) => assignEmails.value
    );
    if (editableEndTime < editableStartTime) {
      toast.error(
        "Selected meeting end time should be greater than start time.",
        { position: "top-center", autoClose: 2000 }
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", editableTitle);
    formData.append("from_date", editableStart);
    formData.append("from_time ", editableStartTime);
    formData.append("to_time", editableEndTime);
    formData.append("user_id", user_id);
    formData.append("purpose", editableDescription);
    formData.append("meet_link", editableMeetingLink);
    formData.append("participent_ids", participantToIds);
    formData.append("id", id);
    formData.append("category", category);
    attachments.forEach((file, index) => {
      //formData.append(attachments${index}, file); // Append each file individually with a unique key
      formData.append("attachments", file);
    });
    // const otheremails = emailOtherList.join(',');
    // formData.append('other_emails', otheremails);

    putDataToAPI(UpdateCalendarEvent, formData)
      .then((response) => {
        if (response.success) {
          //  alert("Meeting Updated !")

          //   onClose();
          window.location.reload();
        } else {
          console.log("unsuccess");
        }
      })
      .catch((error) => {
        //alert('Please check your internet and try again!');
      })
      .finally(() => {
        setSelectedItem(false);
      });
  };

  const getInitialStartDate = () => {
    const today = new Date();
    const pastDate = new Date(today.setDate(today.getDate() - 30));
    return pastDate.toISOString().split("T")[0];
  };
  const [startDate, setStartDate] = useState(getInitialStartDate());
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const handleStartDateChange1 = (e) => {
    const newStartDate = e.target.value;

    setStartDate(newStartDate);
  };
  const handleEndDateChange1 = (e) => {
    const newEndDate = e.target.value;
    console.log(e.target.value);
    setEndDate(newEndDate);
  };
  const handlePlanMyCalendarClick = () => {
    // setIsModalOpen(true);
    navigate("/calendar/employeeSchedule");
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen &&
        !event.target.closest("#sync-dropdown") &&
        !event.target.closest(".fc-filterDropdown-button")
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const filteredEvents1 = events.filter((event) => {
    const eventStart = new Date(event.start).toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
    const eventEnd = event.end; // Convert to YYYY-MM-DD format

    // Include events that start or end on the endDate
    return (
      (eventStart >= startDate && eventStart <= endDate) ||
      (eventEnd >= startDate && eventEnd <= endDate) ||
      (eventStart <= startDate && eventEnd >= endDate)
    );
  });
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(startDate); // Move to the new start date
      calendarApi.gotoDate(endDate);
    }
    console.log("🚀 ~ useEffect ~ startDate:", startDate);
    console.log("🚀 ~ useEffect ~ endDate:", endDate);
  }, [startDate, endDate]);

  const renderEventContent = (eventInfo) => {
    const container = document.createElement("div");
    container.className = "fc-event-main-frame";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "space-between";
    container.style.gap = "2px";

    // Add event time
    if (!eventInfo.event.allDay) {
      const timeEl = document.createElement("div");
      timeEl.className = "fc-event-time";
      timeEl.innerHTML = eventInfo.timeText;
      container.appendChild(timeEl);
    }

    // Add event dot
    const dotEl = document.createElement("div");
    dotEl.className = "fc-daygrid-event-dot";
    container.appendChild(dotEl);

    // Event title
    const titleEl = document.createElement("div");
    titleEl.className = "fc-event-title-container";
    const title = document.createElement("div");
    title.className = "fc-event-title fc-sticky";
    const fullTitle = eventInfo.event.title;
    title.innerText =
      fullTitle.length > 10 ? fullTitle.substring(0, 10) + "..." : fullTitle;
    titleEl.appendChild(title);
    container.appendChild(titleEl);

    // Reschedule indicator
    if (
      eventInfo.event.extendedProps &&
      eventInfo.event.extendedProps.sub_category === "reschedule"
    ) {
      const rescheduleButton = document.createElement("div");
      rescheduleButton.innerHTML = "🔴"; // Red dot icon
      rescheduleButton.className = "reschedule-button";
      rescheduleButton.title = "Rescheduled task";
      rescheduleButton.onclick = (e) => {
        e.stopPropagation();
        handleRescheduleClick(eventInfo.event);
      };
      container.appendChild(rescheduleButton);
    }

    // Wrap everything in a harness div
    const harness = document.createElement("div");
    harness.className = "fc-daygrid-event-harness";
    harness.appendChild(container);

    return { domNodes: [harness] };
  };

  const handleDeleteTask = async (user_id, category, id) => {
    const deleteResp = await deleteVibeCalenderTask(user_id, category, id);

    if (deleteResp.success) {
      console.log("successfully delete");
      window.location.reload();
    }
  };
  const signInOutlook = async () => {
    try {
      const loginUrl =
        "https://vibecopilot.ai/api/outlook-login/?from_local=true&redirect_to=calender";

      window.location.href = loginUrl;
      getQueryParam();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getQueryParam = (name) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
  };
  const codeParameter = getQueryParam("code");
  const exchangeCodeForAccessToken = async (code) => {
    console.log(code);
    try {
      
      const redirectUri = "https://app.myciti.life/calendar";
      const apiUrl = `https://vibecopilot.ai/api/get-outlook-token/?code=${code}&redirect_uri=${redirectUri}`;
      // const apiUrl = `https://app.myciti.life/api/get-outlook-token/?code=${code}&redirect_uri=${redirectUri}`;

      const response = await fetch(apiUrl);

      if (response.status === 200) {
        const data = await response.json();
        console.log(data.data.access_token);
        console.log(data);
        const accessToken = data.data.access_token;
        console.log("Access Token:", accessToken);
        // You can use the 'accessToken' for further requests.
        // AddMetaAuthData()
        AddOutlookAuthData(accessToken, "Outlook", 3, userPictureUrl);
      } else {
        console.error("Failed to fetch access token. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };
  const AddOutlookAuthData = async (token, platform, id, userPictureUrl) => {
    console.log(token);
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("token", token);
    formData.append("metaplatform", platform);
    formData.append("outlook_id", id);
    formData.append("profile_picture_url", userPictureUrl);
    try {
      const res = await  postOutlookAuth(formData);

      if (res.success) {
        console.log("Success");
        //   window.location.href='http://localhost:3000/employee/outlook';
        window.location.href = "https://vibecopilot.ai/employee/calender";
      }
    } catch (error) {
      //toast.error('Please Check Your Internet , Try again! ', { position: "top-center", autoClose: 2000 })
    } finally {
    }
  };
  useEffect(() => {
    if (codeParameter) {
      // Call exchangeCodeForAccessToken if the 'code' parameter is present
      exchangeCodeForAccessToken(codeParameter);
    }
  }, [codeParameter]);
  const syncWithOutlook = () => {
    // Add logic to sync with Outlook
    console.log("Syncing with Outlook...");
    signInOutlook();
  };

  const syncWithGmail = () => {
    console.log("Syncing with Gmail...");
    signIn();
    // handleAuthProcess();
  };

  const signIn = () => {
    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    const form = document.createElement("form");
    form.setAttribute("method", "GET");
    form.setAttribute("action", oauth2Endpoint);

    const params = {
      client_id:
        "339274559462-6r06f0d9aqubhnhqmvrkjaqs8nikiidd.apps.googleusercontent.com",
      redirect_uri: "https://app.myciti.life/calendar",
      
      response_type: "token",
      
      scope:
        "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send",
      
      include_granted_scopes: "true",
      state: "pass-through-value",
    };

    for (const p in params) {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    
  };
  return (
    <section className="flex relative">
      <Navbar />
      <div className="p-2 w-full flex md:mx-2 overflow-hidden flex-col">
        <button
          className="z-50 p-4 rounded-full shadow-custom-all-sides"
          style={{
            position: "absolute",
            right: "60px",
            bottom: "70px",
            background: themeColor,

            color: "white",
          }}
          onClick={() => setPopupDate(new Date())}
        >
          <FaPlus size={20} />
        </button>
        <div className="shadow-custom-all-sides mb-2 rounded-xl p-2 flex items-center gap-4">
          <label className="font-medium">
            Start Date :&nbsp;
            <input
              className="border p-1 px-2 rounded-md border-gray-400"
              type="date"
              value={startDate}
              onChange={handleStartDateChange1}
            />
          </label>
          <label className="font-medium">
            End Date :&nbsp;
            <input
              className="border p-1 px-2 rounded-md border-gray-400"
              type="date"
              value={endDate}
              onChange={handleEndDateChange1}
            />
          </label>
        </div>
        <div className=" rounded-xl shadow-custom-all-sides p-2">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev",
              center: "title",
              right:
                "next dayGridMonth,timeGridWeek,timeGridDay customDropdown filterDropdown planMyCalendar",
            }}
            customButtons={{
              customDropdown: {
                text: `My Calendar`,
                click: function (event) {
                  const rect = event.currentTarget.getBoundingClientRect();
                  // setDropdownPosition({
                  //   top: rect.bottom - 0,
                  //   left: rect.left - 0,
                  // });
                  setIsListOpen((prevState) => !prevState);
                },
              },
              planMyCalendar: {
                text: `Plan My Day`,
                click: handlePlanMyCalendarClick,
              },
              filterDropdown: {
                text: "Sync ▾",
                click: function (event) {
                  setIsDropdownOpen((prevState) => !prevState);
                },
              },
            }}
            views={{
              fortnightlyView: {
                type: "dayGrid",
                duration: { weeks: 2 },
                buttonText: "fortnight",
              },
            }}
            dateClick={handleDateClick}
            initialDate={selectedDate}
            datesSet={handleViewChange}
            // events={areCheckboxesChecked ? filteredEvents : events}
            events={
              areCheckboxesChecked
                ? filteredEvents
                : startDate && endDate
                ? filteredEvents1
                : events
            }
            eventBackgroundColor={(events) =>
              events.extendedProps.category === "Task" ? "red" : "green"
            }
            eventTextColor="white"
            eventClick={handleEventClick}
            height={"90vh"}
            allDayText="All Day"
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }}
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }}
            eventContent={renderEventContent}
            // style={{ zIndex: 1 }}
          />

          <div
            id="sync-dropdown"
            className=" dropdown z-20"
            style={{
              display: isDropdownOpen ? "block" : "none",
              position: "absolute",
              right: "140px",
              top: "130px",
            }}
          >
            <ul
              className="dropdown-menu pl-1 mt-1 custom-dropdown p-2 px-4 bg-white text-black shadow-custom-all-sides"
              style={{
                // background: ,
                borderRadius: 8,
                display: "block",
              }}
            >
              <li className="m-2">
                <a
                  className="hover:text-gray-500"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    syncWithOutlook();
                    setIsDropdownOpen(false);
                  }}
                >
                  <label className="cursor-pointer">Sync Outlook</label>
                </a>
              </li>
              <li className="mx-2">
                <a
                  className="hover:text-gray-500"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    syncWithGmail();
                    setIsDropdownOpen(false);
                  }}
                >
                  <label className="cursor-pointer">Sync Gmail</label>
                </a>
              </li>
            </ul>
          </div>
        {isListOpen && (
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              // top: `${dropdownPosition.top}px`,
              // left: `${dropdownPosition.left}px`,
              right: "245px",
              top: "130px",
              // width: 150,
              // padding: "5px",
              borderRadius: 4,
              background: "white",
            }}
            className="shadow-custom-all-sides w-auto px-4 my-1 z-20"
            aria-labelledby="dropdownMenu2"
          >
            {Object.keys(selectedCategories).map((category) => (
              <div className="dropdown-item" key={category}>
                <input
                  type="checkbox"
                  name={category}
                  checked={selectedCategories[category]}
                  onChange={handleCheckboxChange}
                  id={category}
                  style={{ marginRight: "10px" }}
                />
                <label style={{ fontWeight: "normal" }} htmlFor={category}>
                  {category}
                </label>
              </div>
            ))}
          </div>
        )}
        </div>
        {/* modal */}
        {popupDate && (
          <div className="  fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50 p-10 ">
            <div
              style={{ background: themeColor }}
              className=" md:w-auto w-full  p-4 md:px-10  flex flex-col rounded-md  overflow-auto max-h-[100%]"
            >
              <button
                className="place-self-end fixed p-1 rounded-full  bg-white"
                onClick={() => setPopupDate(null)}
              >
                <AiOutlineClose size={20} />
              </button>
              <div className="flex justify-center">
                <div className="flex justify-between gap-5 p-1 items-center bg-gray-200 mx-10 w-fit rounded-full">
                  <button
                    className={` ${
                      activeButton === "task" &&
                      " bg-white text-blue-400 shadow-custom-all-sides"
                    } font-medium px-4 rounded-full`}
                    onClick={() => handleButtonToggle("task")}
                  >
                    Task
                  </button>
                  <button
                    className={` ${
                      activeButton === "event" &&
                      " bg-white text-blue-400 shadow-custom-all-sides"
                    } font-medium  px-4 rounded-full`}
                    onClick={() => handleButtonToggle("event")}
                  >
                    Event
                  </button>
                  <button
                    className={`${
                      activeButton === "meeting" &&
                      " bg-white text-blue-400 shadow-custom-all-sides"
                    } font-medium px-4 rounded-full`}
                    onClick={() => handleButtonToggle("meeting")}
                  >
                    Meeting
                  </button>
                </div>
              </div>
              &nbsp;&nbsp;
              {activeButton === "task" && (
                <div>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className=" ">
                        <label className="font-medium text-white">
                          Task Topic
                        </label>
                        <br />
                        <input
                          value={taskTitle}
                          onChange={(e) => setTaskTitle(e.target.value)}
                          className="rounded-sm p-2 outline-none w-full border border-gray-400 "
                          type="text"
                          placeholder="Enter Task"
                          spellCheck="true"
                        />
                      </div>

                      <div className="">
                        <label className="font-medium text-white">Date</label>
                        <br />
                        <DatePicker
                          selected={due_date}
                          onChange={(date) => setDueDate(date)}
                          showTimeSelect
                          dateFormat="dd/MM/yyyy h:mm aa"
                          timeIntervals={5}
                          minDate={new Date()}
                          // minTime={currentTime}
                          // maxTime={maxTime}
                          filterTime={filterTime}
                          className="rounded-sm p-2 outline-none w-full border border-gray-400"

                          // customInput={<CustomInput />}
                        />
                      </div>
                    </div>

                    <div className="w-full ">
                      <label className="font-medium text-white">
                        Task Description
                      </label>
                      <br />
                      <textarea
                        className="w-full border border-gray-400 rounded-sm p-2"
                        type="text"
                        rows={3}
                        spellCheck="true"
                        value={task_description}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder="Describe Task"
                      />
                    </div>
                    {/* { subcategory?(<></>):( */}
                    <div className="flex gap-2 w-full justify-between">
                      {/* <label className="font-medium">Attachment</label> */}
                      <br />
                      {/* <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileAttachment}
                        /> */}
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer flex items-center border-2  bg-transparent rounded-md text-white font-medium  px-4 transition duration-300 ease-in-out hover:bg-black border-white  "
                      >
                        {!fileUpload ? (
                          <span className="flex items-center gap-2 text-white">
                            <PiPlusBold /> Attachment
                          </span>
                        ) : (
                          <span>
                            {attachments
                              .map((file) => `${file.name.slice(0, 10)}...`)
                              .join(", ")}
                          </span>
                        )}
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          ref={fileInputRef}
                          onChange={handleFileAttachment}
                          multiple
                        />
                      </label>

                      <div className="w-full">
                        {/* <label
                          className="font-medium"
                        >
                          Assign
                        </label> */}
                        {/* <br /> */}
                        <Select
                          isMulti
                          onChange={handleChangeSelect}
                          options={emails}
                          noOptionsMessage={() => "Email not available..."}
                          maxMenuHeight={90}
                          placeholder="Assign To"
                          styles={{
                            placeholder: (baseStyles, state) => ({
                              ...baseStyles,
                              color: "black",
                            }),
                            clearIndicator: (baseStyles) => ({
                              ...baseStyles,
                              color: "red",
                            }),
                            dropdownIndicator: (baseStyles) => ({
                              ...baseStyles,
                              color: "black",
                            }),
                            control: (baseStyles) => ({
                              ...baseStyles,
                              borderColor: "darkblue",
                            }),
                            multiValueRemove: (baseStyles, state) => ({
                              ...baseStyles,
                              color: state.isFocused ? "red" : "gray",
                              backgroundColor: state.isFocused
                                ? "black"
                                : "lightgreen",
                            }),
                          }}
                          menuPosition={"fixed"}
                        />
                      </div>
                    </div>

                    <div className=" flex justify-center ">
                      <button
                        className="text-white border-2 border-white font-medium rounded-md w-full p-2 shadow-custom-all-sides"
                        style={{
                          background: themeColor,
                        }}
                        onClick={handleSaveTask}
                      >
                        {/* {loading ? (
                          <div
                          // style={{
                          //   display: "flex",
                          //   justifyContent: "center",
                          //   alignItems: "center",
                          //   height: "100%",
                          // }}
                          >
                            <ThreeDots color="#fff" height={25} width={50} />
                          </div>
                        ) : ( */}
                        Create Task
                        {/* )} */}
                        {/* Save */}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {activeButton === "event" && (
                <div
                  className={`content ${
                    activeButton === "event" ? "active" : ""
                  }`}
                >
                  <div>
                    <div className="" style={{ color: "black" }}>
                      <div class="" style={{ marginBottom: "0rem" }}>
                        <label className="font-medium text-white">
                          Event Topic
                        </label>
                        <br />
                        <input
                          value={eventTitle}
                          onChange={(e) => setEventTitle(e.target.value)}
                          // style={{
                          //   borderRadius: 4,
                          //   border: "#747272 solid 1px",
                          //   height: 40,
                          //   fontSize: 14,
                          //   paddingLeft: 10,
                          //   color: "#000",
                          //   width: "100%",
                          // }}
                          className="border-gray-400 border w-full p-1 rounded-md"
                          type="text"
                          spellCheck="true"
                          placeholder="Enter Event Topic "
                        />
                      </div>

                      <div className="my-1 ">
                        <label className="font-medium text-white"> Date</label>
                        <br />
                        <div className="flex gap-2 items-center">
                          <input
                            type="date"
                            // style={{ width: "50%" }}
                            value={eventStartDate}
                            //  onChange={(e) => setEventStartDate(e.target.value)}
                            onChange={handleStartDateChange}
                            min={today}
                            className="border-gray-400 border w-full p-1 rounded-md"
                          ></input>
                          -
                          <input
                            type="date"
                            // style={{ width: "50%", marginLeft: "10px" }}
                            value={eventEndDate}
                            // onChange={(e) => setEventEndDate(e.target.value)}
                            onChange={handleEndDateChange}
                            min={today}
                            className="border-gray-400 border w-full p-1 rounded-md"
                          ></input>
                        </div>
                      </div>
                      <div className="my-1">
                        <label className="font-medium text-white"> Time</label>
                        <br />
                        <div style={{ display: "flex" }}>
                          <input
                            type="time"
                            style={{ width: "50%" }}
                            value={eventStartTime}
                            onChange={(e) => setEventStartTime(e.target.value)}
                            className="border-gray-400 border w-full p-1 rounded-md"
                          ></input>

                          <input
                            type="time"
                            style={{ width: "50%", marginLeft: "10px" }}
                            value={eventEndTime}
                            onChange={(e) => setEventEndTime(e.target.value)}
                            className="border-gray-400 border w-full p-1 rounded-md"
                          ></input>
                        </div>
                      </div>
                      <div className="">
                        <label className="font-medium text-white">
                          Event Description
                        </label>
                        <br />
                        <textarea
                          // style={{
                          //   resize: "none",
                          //   height: "40px",
                          //   paddingTop: "8px",
                          // }}
                          className="border-gray-400 border w-full p-1 rounded-md"
                          type="text"
                          placeholder="Describe Event"
                          value={eventDescription}
                          onChange={(e) => setEventDescription(e.target.value)}
                          spellCheck="true"
                        />
                      </div>

                      <div className="flex flex-col w-full gap-2 justify-between ">
                        <div>
                          {/* <label>Attachment</label> */}
                          {/* <br />   */}
                          <input
                            //value={eventAttachment}
                            //onChange={(e) => setEventAttachment(e.target.value)}
                            onChange={handleEventFileAttachment}
                            ref={fileInputRef}
                            type="file"
                            multiple
                          />

                          {/* <label
                            htmlFor="event-file-upload"
                            className="relative cursor-pointer flex items-center border-2  bg-transparent rounded-md font-medium p-2 px-4 transition duration-300 ease-in-out hover:bg-black border-white hover:text-white "
                          >
                            {!fileUpload ? (
                              <span className="flex items-center gap-2 text-white">
                                <PiPlusBold /> Attachment
                              </span>
                            ) : (
                              <span>
                                {attachments
                                  .map((file) => `${file.name.slice(0, 10)}...`)
                                  .join(", ")}
                              </span>
                            )}
                            <input
                              id="event-file-upload"
                              type="file"
                              className="sr-only"
                              ref={fileInputRef}
                              
                              onChange={handleEventFileAttachment}
                              multiple
                            />
                          </label> */}
                        </div>

                        <div className="w-full">
                          {/* <label
                            style={{ marginTop: "10px", marginBottom: "0rem" }}
                          >
                            Guests
                          </label> */}
                          {/* <br /> */}
                          <Select
                            isMulti
                            onChange={handleChangeSelectEvent}
                            options={emails}
                            noOptionsMessage={() => "Email not available..."}
                            maxMenuHeight={90}
                            styles={{
                              placeholder: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "black",
                              }),
                              clearIndicator: (baseStyles) => ({
                                ...baseStyles,
                                color: "red",
                              }),
                              dropdownIndicator: (baseStyles) => ({
                                ...baseStyles,
                                color: "black",
                              }),
                              control: (baseStyles) => ({
                                ...baseStyles,
                                borderColor: "darkblue",
                              }),
                              multiValueRemove: (baseStyles, state) => ({
                                ...baseStyles,
                                color: state.isFocused ? "red" : "gray",
                                backgroundColor: state.isFocused
                                  ? "black"
                                  : "lightgreen",
                              }),
                            }}
                            menuPosition={"fixed"}
                          />
                        </div>
                      </div>

                      <div className="flex justify-center my-2 ">
                        <button
                          className="text-white font-medium rounded-md w-full p-2 shadow-custom-all-sides"
                          style={{
                            background: themeColor,
                          }}
                          onClick={handleSaveEvent}
                        >
                          {/* {loadingEvent ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                              }}
                            >
                              <ThreeDots color="#fff" height={25} width={50} />
                            </div>
                          ) : ( */}
                          Create Event
                          {/* )} */}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeButton === "meeting" && (
                <div
                  className={`content ${
                    activeButton === "meeting" ? "active" : ""
                  }`}
                >
                  <div className="flex- flex-col">
                    <div className="grid md:grid-cols-2 gap-2">
                      <div>
                        <label className="font-medium text-white">
                          Meeting Topic
                        </label>
                        <br />
                        <input
                          value={meetingTitle}
                          onChange={(e) => setMeetingTitle(e.target.value)}
                          className="border-gray-400 border w-full p-1 rounded-md"
                          type="text"
                        />
                      </div>
                      <div className="">
                        <label className="font-medium text-white"> Date</label>
                        <br />
                        <input
                          type="date"
                          value={meetingDate}
                          min={today}
                          onChange={(e) => setMeetingDate(e.target.value)}
                          className="border-gray-400 border w-full p-1 rounded-md"
                        ></input>
                      </div>

                      <div>
                        <label className="font-medium text-white">
                          Meeting Description
                        </label>
                        <br />
                        <textarea
                          value={meetingDescription}
                          onChange={(e) =>
                            setMeetingDescription(e.target.value)
                          }
                          className="border-gray-400 border w-full p-1 rounded-md resize-none"
                          cols={1}
                          rows={1}
                          type="text"
                          spellCheck="true"
                        />
                      </div>
                      <div>
                        <label className="font-medium text-white">Time</label>
                        <br />
                        <div className="flex items-center gap-1">
                          <input
                            type="time"
                            value={meetingStartTime}
                            onChange={(e) =>
                              setMeetingStartTime(e.target.value)
                            }
                            className="border-gray-400 border w-full p-1 rounded-md"
                          ></input>
                          -
                          <input
                            type="time"
                            value={meetingEndTime}
                            onChange={(e) => setMeetingEndTime(e.target.value)}
                            className="border-gray-400 border w-full p-1 rounded-md"
                          ></input>
                        </div>
                      </div>
                    </div>
                    {/* Meeting Link */}

                    <div className="">
                      <label className="font-medium text-white">
                        Meeting Link
                      </label>
                      <div className="grid grid-cols-12 gap-2">
                        {" "}
                        {/* Parent div with relative positioning */}
                        <input
                          readOnly
                          value={
                            isLoading
                              ? "Generating Meeting Link..."
                              : meetingLink
                          }
                          onChange={(e) => setMeetingLink(e.target.value)}
                          style={{
                            borderRadius: 4,
                            border: "#747272 solid 1px",
                            height: 40,
                            fontSize: 14,

                            color: "#000",
                            width: "100%",
                          }}
                          className="col-span-11 px-1"
                          type="text"
                        />
                        <button
                          onClick={handleMeetingLinkCopy}
                          className="col-span-1 text-white"
                        >
                          <MdOutlineContentCopy size={20} />
                        </button>
                      </div>
                      {/*  */}
                      <div className="my-2 flex justify-between gap-4 items-center w-full">
                        <button
                          className="font-medium p-1 hover:text-white hover:bg-black transition-all duration-300 rounded-md shadow-custom-all-sides flex items-center gap-2 text-white"
                          onClick={() => setShowGenerateLink(!showGenerateLink)}
                        >
                          Generate Link
                          <BiRightArrowAlt size={20} />
                        </button>
                        {showGenerateLink && (
                          <div className="flex gap-2  ">
                            <button
                              onClick={GenerateMeet}
                              className="bg-green-400 p-1 transition-all duration-300 rounded-md font-medium text-white hover:bg-green-500"
                            >
                              {" "}
                              Zoom Meet
                            </button>
                            <button
                              className="bg-blue-400  transition-all duration-300 hover:bg-blue-500  p-1 rounded-md font-medium text-white"
                              onClick={TeamGenerateMeet}
                            >
                              {" "}
                              Team Meet
                            </button>
                          </div>
                        )}
                      </div>
                      {/* <MeetingDropdownButton /> */}
                    </div>

                    {/* Invites */}
                    <div className="my-2">
                      <label className="font-medium text-white">Invites</label>
                      <br />
                      <Select
                        isMulti
                        onChange={handleChangeSelectMeeting}
                        options={emails}
                        noOptionsMessage={() => "Email not available..."}
                        maxMenuHeight={90}
                        styles={{
                          placeholder: (baseStyles, state) => ({
                            ...baseStyles,
                            color: "black",
                          }),
                          clearIndicator: (baseStyles) => ({
                            ...baseStyles,
                            color: "red",
                          }),
                          dropdownIndicator: (baseStyles) => ({
                            ...baseStyles,
                            color: "black",
                          }),
                          control: (baseStyles) => ({
                            ...baseStyles,
                            borderColor: "darkblue",
                          }),
                          multiValueRemove: (baseStyles, state) => ({
                            ...baseStyles,
                            color: state.isFocused ? "red" : "gray",
                            backgroundColor: state.isFocused
                              ? "black"
                              : "lightgreen",
                          }),
                        }}
                        menuPosition={"fixed"}
                      />
                    </div>
                    {/* other email */}
                    <div className="flex ">
                      <div className="flex w-full ">
                        <div className="w-full">
                          <label className="font-medium text-white">
                            Add Other Emails
                          </label>
                          <div className="flex gap-2 items-center">
                            <input
                              className=""
                              value={otherEmails}
                              onChange={(e) => setOtherEmails(e.target.value)}
                              style={{
                                borderRadius: 4,
                                border: "#747272 solid 1px",
                                height: 40,
                                fontSize: 14,
                                paddingLeft: 10,
                                color: "#000",
                                width: "calc(100% - 50px)", // Adjust the width to leave space for the remove icon
                              }}
                              type="text"
                            />
                            <div className="col-md-1">
                              <button
                                className="btn btn-outline-secondary ml-1 text-white"
                                type="button"
                                onClick={handleAddEmail}
                              >
                                <FaArrowRight />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <ToggleRepeatSwitch />
                    </div>
                    {emailOtherList.length > 0 && (
                      <div className=" bg-white  rounded-sm my-2 p-1 grid grid-cols-2 gap-4">
                        {emailOtherList.map((email, index) => (
                          <span
                            key={index}
                            className="flex items-center justify-between gap-2 text-sm  bg-green-200 p-1 pl-2 rounded-full"
                          >
                            {email}
                            <button
                              className=" bg-red-400 p-1 text-white rounded-full"
                              type="button"
                              onClick={() => handleRemoveEmail(email)}
                            >
                              <FaTimes />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    {repeatMeet ? (
                      <div className="my-2">
                        <label className="font-medium text-white">Repeat</label>
                        <hr></hr>

                        <div className="grid grid-cols-2">
                          <div className="">
                            <label className="text-white font-medium">
                              <span>From Date</span>
                            </label>
                            <br></br>
                            <input
                              type="date"
                              className="p-1 rounded-md"
                              min={todayDate}
                              value={meetingDate}
                              onChange={(event) =>
                                setMeetingDate(event.target.value)
                              }
                            />
                          </div>
                          <div className="">
                            <label className="text-white font-medium">
                              <span>To Date</span>
                            </label>
                            <br></br>
                            <input
                              type="date"
                              className="p-1 rounded-md"
                              min={todayDate}
                              value={selectedToDate}
                              onChange={(event) =>
                                setSelectedToDate(event.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className=" ml-1 mt-4">
                          <div class="flex flex-col md:flex-row my-1 font-medium text-white w-full">
                            <span>SELECT WORKING DAYS</span>
                            {/* <div class="flex ">
                              <span
                                style={{
                                  display: "flex",
                                  marginRight: 14,
                                  fontFamily:
                                    "SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,Courier New, monospace",
                                }}
                              >
                                [{" "}
                                <i
                                  className="fas fa-info-circle"
                                  title="Detail"
                                  style={{
                                    fontSize: 14,
                                    marginTop: 5,
                                  }}
                                ></i>
                                &nbsp;
                                <p
                                  className="mr-2 mb-2 rounded-md "
                                  style={{
                                    width: 10,
                                    height: 10,
                                    paddingBottom: 4,
                                    marginTop: 7,
                                    backgroundColor: "#0A9F6A",
                                  }}
                                ></p>
                                Selected
                              </span>
                              <span
                                style={{
                                  display: "grid grid-cols-2 gap-2",

                                  fontFamily:
                                    "SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,Courier New, monospace",
                                }}
                                className="w-full"
                              >
                                <p
                                  className="rounded-md bg-white "
                                  style={{
                                    width: 10,
                                    height: 10,
                                    paddingBottom: 4,
                                    marginTop: 7,

                                    border: "1px solid #cdcdcd",
                                  }}
                                ></p>
                                Deselected]
                              </span>
                            </div> */}
                          </div>

                          <div className="flex gap-4 flex-wrap">
                            {weekdaysMap.map((weekdayObj) => (
                              <div
                                key={weekdayObj.day}
                                className={`rounded-md p-2 px-4 shadow-custom-all-sides font-medium cursor-pointer  ${
                                  selectedWeekdays?.includes(weekdayObj.index)
                                    ? // &&
                                      // weekdayObj.isActive
                                      "bg-green-400 text-white "
                                    : "bg-white"
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleWeekdaySelection(weekdayObj.day);
                                }}
                              >
                                <a>{weekdayObj.day}</a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="flex w-full justify-center my-2">
                      <button
                        className="p-1 text-white w-full font-medium rounded-md shadow-custom-all-sides"
                        style={{
                          background: themeColor,
                        }}
                        onClick={handleSaveMeeting}
                      >
                        Create Meeting
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Update Pop Up */}
      {selectedItem && (
        <div className="  fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50 p-10 ">
          <div
            style={{ background: themeColor }}
            className=" md:w-auto w-full  p-4 md:px-10  flex flex-col rounded-md  overflow-auto max-h-[100%]"
          >
            <button
              className="place-self-end fixed p-1 rounded-full  bg-white"
              onClick={() => setSelectedItem(null)}
            >
              <AiOutlineClose size={20} />
            </button>
            <div className="flex justify-center">
              <div className="flex justify-between gap-5 p-1 items-center bg-gray-200 px-2 mx-10 w-fit rounded-full">
                <button
                  className={` ${
                    activeButton === "task" &&
                    " bg-white text-blue-400 shadow-custom-all-sides"
                  } font-medium px-4 rounded-full`}
                  onClick={() => handleButtonToggle("task")}
                  disabled={activeButton !== "task"}
                >
                  Task
                </button>
                <button
                  className={` ${
                    activeButton === "event" &&
                    " bg-white text-blue-400 shadow-custom-all-sides"
                  } font-medium px-4 rounded-full`}
                  onClick={() => handleButtonToggle("event")}
                  disabled={activeButton !== "event"}
                >
                  Event
                </button>
                <button
                  className={` ${
                    activeButton === "meeting" &&
                    " bg-white text-blue-400 shadow-custom-all-sides"
                  } font-medium px-4 rounded-full`}
                  onClick={() => handleButtonToggle("meeting")}
                  disabled={activeButton !== "meeting"}
                >
                  Meeting
                </button>

                <button
                  className={` ${
                    activeButton === "outlook" &&
                    " bg-white text-blue-400 shadow-custom-all-sides"
                  } font-medium px-4 rounded-full`}
                  onClick={() => handleButtonToggle("outlook")}
                  disabled={activeButton !== "outlook"}
                >
                  Outlook
                </button>

                <button
                  className={` ${
                    activeButton === "gmail" &&
                    " bg-white text-blue-400 shadow-custom-all-sides"
                  } font-medium px-4 rounded-full`}
                  onClick={() => handleButtonToggle("gmail")}
                  disabled={activeButton !== "gmail"}
                >
                  Gmail
                </button>
              </div>
            </div>
            &nbsp;&nbsp;
            {activeButton === "task" && (
              <div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-medium text-white">
                        Task Topic
                      </label>
                      <br />
                      <input
                        value={editableTitle}
                        onChange={(e) => setEditableTitle(e.target.value)}
                        className="rounded-sm p-2 outline-none w-full border border-gray-400 "
                        type="text"
                        placeholder="Enter Task"
                        spellCheck="true"
                      />
                    </div>

                    <div className="w-full flex flex-col">
                      <label className="font-medium text-white"> Date</label>

                      <DatePicker
                        // selected={editableStart}
                        // onChange={(start) => setEditableStart(start)}

                        selected={due_date}
                        onChange={(date) => setDueDate(date)}
                        showTimeSelect
                        dateFormat="dd/MM/yyyy h:mm aa"
                        timeIntervals={5}
                        minDate={new Date()}
                        // minTime={currentTime}
                        // maxTime={maxTime}
                        filterTime={filterTime}
                        className="rounded-sm p-2 outline-none w-full border border-gray-400"
                        // customInput={<CustomInput />}
                      />
                    </div>
                  </div>
                  <div className="w-full ">
                    <label className="font-medium text-white">
                      Task Description
                    </label>
                    <br />
                    <textarea
                      className="w-full border border-gray-400 rounded-sm p-2"
                      type="text"
                      rows={3}
                      spellCheck="true"
                      value={editableDescription}
                      onChange={(e) => setEditableDescription(e.target.value)}
                      placeholder="Describe Task"
                    />
                  </div>
                  <div class="col-md-6">
                    <label className="font-medium text-white">Attachment</label>
                    <br />
                    <input
                      ref={fileInputRef}
                      value={selectedItem.attachments}
                      type="file"
                      onChange={handleFileAttachment}
                      className="text-white"
                    />
                  </div>
                  <div class="col-md-6">
                    <label className="text-white font-medium">Assign</label>
                    {/* <br /> */}
                    <Select
                      isMulti
                      onChange={handleChangeUpdate}
                      value={editableAssignTo}
                      options={emails}
                      noOptionsMessage={() => "Email not available..."}
                      maxMenuHeight={90}
                      placeholder="Assign To"
                      styles={{
                        //   placeholder: (baseStyles, state) => ({
                        //     ...baseStyles,
                        //     color: "black",
                        //   }),
                        clearIndicator: (baseStyles) => ({
                          ...baseStyles,
                          color: "red",
                        }),
                        //   dropdownIndicator: (baseStyles) => ({
                        //     ...baseStyles,
                        //     color: "black",
                        //   }),
                        //   control: (baseStyles) => ({
                        //     ...baseStyles,
                        //     borderColor: "darkblue",
                        //   }),
                        //   multiValueRemove: (baseStyles, state) => ({
                        //     ...baseStyles,
                        //     color: state.isFocused ? "red" : "gray",
                        //     backgroundColor: state.isFocused
                        //       ? "black"
                        //       : "lightgreen",
                        //   }),
                      }}
                      menuPosition={"fixed"}
                    />
                  </div>

                  <div className=" flex justify-end gap-4 ">
                    <button
                      className="bg-white font-medium rounded-full p-1 px-4 "
                      onClick={() => handleUpdateTask()}
                    >
                      Update
                    </button>

                    <button
                      className="bg-red-400 text-white font-medium rounded-full p-1 px-4 "
                      onClick={() => handleDeleteTask(user_id, category, id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeButton === "event" && (
              <div>
                <div>
                  <div className="">
                    <div>
                      <label className="text-white font-medium">
                        Event Topic
                      </label>
                      <br />
                      <input
                        value={editableTitle}
                        onChange={(e) => setEditableTitle(e.target.value)}
                        className="border-gray-400 border w-full p-1 rounded-md"
                        type="text"
                        spellCheck="true"
                        placeholder="Enter Event Topic "
                      />
                    </div>

                    <div className="my-1">
                      <label className="text-white"> Date</label>
                      <br />
                      <div className="flex gap-2 items-center">
                        <input
                          type="date"
                          value={editableStart}
                          onChange={(e) => setEditableStart(e.target.value)}
                          min={today}
                          className="border-gray-400 border w-full p-1 rounded-md"
                        ></input>
                        <input
                          type="date"
                          // style={{ width: "50%", marginLeft: "10px" }}
                          value={editableEnd}
                          onChange={(e) => setEditableEnd(e.target.value)}
                          min={today}
                          className="border-gray-400 border w-full p-1 rounded-md"
                        ></input>
                      </div>
                    </div>
                    <div className="my-1">
                      <label className="font-medium text-white"> Time</label>
                      <br />
                      <div style={{ display: "flex" }}>
                        <input
                          type="time"
                          style={{ width: "50%" }}
                          value={editableStartTime}
                          onChange={(e) => setEditableStartTime(e.target.value)}
                          className="border-gray-400 border w-full p-1 rounded-md"
                        ></input>
                        <input
                          type="time"
                          style={{ width: "50%", marginLeft: "10px" }}
                          value={editableEndTime}
                          onChange={(e) => setEditableEndTime(e.target.value)}
                          className="border-gray-400 border w-full p-1 rounded-md"
                        ></input>
                      </div>
                    </div>
                    <div className="">
                      <label className="font-medium text-white">
                        Event Description
                      </label>
                      <br />
                      <textarea
                        // style={{
                        //   resize: "none",
                        //   height: "40px",
                        //   paddingTop: "8px",
                        // }}
                        className="border-gray-400 border w-full p-1 rounded-md"
                        type="text"
                        value={editableDescription}
                        onChange={(e) => setEditableDescription(e.target.value)}
                        spellCheck="true"
                      />
                    </div>

                    <div className="flex flex-col w-full gap-2 justify-between ">
                      {/* <label style={{ marginTop: "10px", marginBottom: "0rem" }}>
                      Attachment
                    </label>
                    <br /> */}
                      <input
                        // style={{
                        //   border: "#929090 dotted 2px",
                        //   height: "55px",
                        //   color: "black",
                        //   padding: "10px",
                        // }}
                        value={eventAttachment}
                        //onChange={(e) => setEventAttachment(e.target.value)}
                        onChange={handleEventFileAttachment}
                        ref={fileInputRef}
                        type="file"
                        multiple
                      />
                    </div>
                    {/* <div class="col-md-6"> */}
                    {/* <label style={{ marginTop: "10px", marginBottom: "0rem" }}>
                      Guests
                    </label>
                    <br /> */}
                    <Select
                      isMulti
                      onChange={handleChangeUpdateEvent}
                      value={editableGuestTo}
                      options={emails}
                      noOptionsMessage={() => "Email not available..."}
                      maxMenuHeight={90}
                      styles={{
                        placeholder: (baseStyles, state) => ({
                          ...baseStyles,
                          color: "black",
                        }),
                        clearIndicator: (baseStyles) => ({
                          ...baseStyles,
                          color: "red",
                        }),
                        dropdownIndicator: (baseStyles) => ({
                          ...baseStyles,
                          color: "black",
                        }),
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderColor: "darkblue",
                        }),
                        multiValueRemove: (baseStyles, state) => ({
                          ...baseStyles,
                          color: state.isFocused ? "red" : "gray",
                          backgroundColor: state.isFocused
                            ? "black"
                            : "lightgreen",
                        }),
                      }}
                      menuPosition={"fixed"}
                    />
                    {/* </div> */}
                    <div className="flex justify-end gap-4 my-2 ">
                      <button
                        className="bg-white font-medium rounded-full p-1 px-4 "
                        onClick={handleUpdateEvent}
                      >
                        Update
                      </button>

                      <button
                        className="bg-red-400 text-white font-medium rounded-full p-1 px-4 "
                        onClick={() => handleDeleteTask(user_id, category, id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeButton === "meeting" && (
              <div
                className={`content ${
                  activeButton === "meeting" ? "active" : ""
                }`}
              >
                <div className="">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="">
                      <label className="text-white font-medium ">
                        Meeting Topic
                      </label>
                      <br />
                      <input
                        value={editableTitle}
                        onChange={(e) => setEditableTitle(e.target.value)}
                        style={{
                          borderRadius: 4,
                          border: "#747272 solid 1px",
                          height: 40,
                          fontSize: 14,
                          paddingLeft: 10,
                          color: "#000",
                          width: "100%",
                        }}
                        type="text"
                        spellcheck="true"
                      />
                    </div>

                    <div>
                      <label className="text-white font-medium"> Date</label>
                      <br />
                      <input
                        type="date"
                        value={editableStart}
                        min={today}
                        onChange={(e) => setEditableStart(e.target.value)}
                        style={{
                          borderRadius: 4,
                          border: "#747272 solid 1px",
                          height: 40,
                          fontSize: 16,
                          paddingLeft: 10,
                          color: "#000",
                          width: "100%",
                          resize: "none",
                        }}
                      ></input>
                    </div>

                    <div class="col-md-6 " style={{ marginBottom: "0rem" }}>
                      <label className="font-medium text-white">
                        Meeting Description
                      </label>
                      <br />
                      <textarea
                        value={editableDescription}
                        onChange={(e) => setEditableDescription(e.target.value)}
                        style={{
                          borderRadius: 4,
                          border: "#747272 solid 1px",
                          height: 40,
                          fontSize: 14,
                          paddingLeft: 10,
                          color: "#000",
                          width: "100%",
                          resize: "none",
                          paddingTop: "8px",
                        }}
                        type="text"
                        spellcheck="true"
                      />
                    </div>
                    <div
                      class="col-md-6  "
                      style={{ marginBottom: "0rem", maxWidth: "100%" }}
                    >
                      <label className="font-medium text-white">Time</label>
                      <br />
                      <div style={{ display: "flex" }}>
                        <input
                          type="time"
                          value={editableStartTime}
                          onChange={(e) => setEditableStartTime(e.target.value)}
                          style={{
                            borderRadius: 4,
                            border: "#747272 solid 1px",
                            height: 40,
                            fontSize: 16,
                            paddingLeft: 10,
                            color: "#000",
                            width: "50%",
                            resize: "none",
                          }}
                        ></input>
                        <input
                          type="time"
                          value={editableEndTime}
                          onChange={(e) => setEditableEndTime(e.target.value)}
                          style={{
                            borderRadius: 4,
                            border: "#747272 solid 1px",
                            height: 40,
                            fontSize: 16,
                            paddingLeft: 10,
                            color: "#000",
                            width: "50%",
                            resize: "none",
                            marginLeft: "10px",
                          }}
                        ></input>
                      </div>
                    </div>
                  </div>
                  {/* Meeting Link */}
                  <div>
                    <label className="text-white font-medium">
                      Meeting Link
                    </label>
                    <br />
                    <input
                      //value={meetingLink}
                      value={editableMeetingLink}
                      // onChange={(e) => setMeetingLink(e.target.value)}
                      onChange={(e) => setEditableMeetingLink(e.target.value)}
                      style={{
                        borderRadius: 4,
                        border: "#747272 solid 1px",
                        height: 40,
                        fontSize: 14,
                        paddingLeft: 10,
                        color: "#000",
                        width: "100%",
                      }}
                      type="text"
                    ></input>
                  </div>
                  {/* Invites */}
                  <div class="col-md-12 p-0">
                    <label className="font-medium text-white">Invites</label>
                    <br />
                    <Select
                      isMulti
                      onChange={handleChangeUpdateMeeting}
                      value={editableParticipantTo}
                      options={emails}
                      noOptionsMessage={() => "Email not available..."}
                      maxMenuHeight={90}
                      styles={{
                        placeholder: (baseStyles, state) => ({
                          ...baseStyles,
                          color: "black",
                        }),
                        clearIndicator: (baseStyles) => ({
                          ...baseStyles,
                          color: "red",
                        }),
                        dropdownIndicator: (baseStyles) => ({
                          ...baseStyles,
                          color: "black",
                        }),
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderColor: "darkblue",
                        }),
                        multiValueRemove: (baseStyles, state) => ({
                          ...baseStyles,
                          color: state.isFocused ? "red" : "gray",
                          backgroundColor: state.isFocused
                            ? "black"
                            : "lightgreen",
                        }),
                      }}
                      menuPosition={"fixed"}
                    />
                  </div>

                  <div className="flex justify-end gap-4 my-2">
                    <button
                      className="bg-white font-medium rounded-full p-1 px-4 "
                      onClick={handleUpdateMeeting}
                    >
                      Update
                    </button>

                    <button
                      className="bg-red-400 text-white font-medium rounded-full p-1 px-4 "
                      onClick={() => handleDeleteTask(user_id, category, id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div
              className={`content ${
                activeButton === "outlook" ? "active" : ""
              }`}
            >
              <div className="meeting-div" style={{ display: "block" }}>
                {/* <div class=" col-md-12 row" style={{ color: "black" }}>
                  <div class="col-md-6 " style={{ marginBottom: "0rem" }}>
                    <label style={{ marginTop: "10px", marginBottom: "0rem" }}>
                      Meeting Topic
                    </label>
                    <br />
                    <input
                      value={microTitle}
                      readOnly
                      // onChange={(e) => setEditableTitle(e.target.value)}
                      style={{
                        borderRadius: 4,
                        border: "#747272 solid 1px",
                        height: 40,
                        fontSize: 14,
                        paddingLeft: 10,
                        color: "#000",
                        width: "100%",
                      }}
                      type="text"
                    />
                  </div>
                  <div className="col-md datepickerinput">
                    <label style={{ marginTop: "10px", marginBottom: "0rem" }}>
                      {" "}
                      Date
                    </label>
                    <br />
                    <input
                      // type='date'
                      value={formatToIST(microStartTime)}
                      readOnly
                      // onChange={(e) => setEditableStart(e.target.value)}
                      style={{
                        borderRadius: 4,
                        border: "#747272 solid 1px",
                        height: 40,
                        fontSize: 16,
                        paddingLeft: 10,
                        color: "#000",
                        width: "100%",
                        resize: "none",
                      }}
                    ></input>
                  </div>

                  <div class="col-md-6 " style={{ marginBottom: "0rem" }}>
                    <label style={{ marginTop: "10px", marginBottom: "0rem" }}>
                      Meeting Description
                    </label>
                    <br />
                    <textarea
                      value={microDescription}
                      readOnly
                      // onChange={(e) => setEditableDescription(e.target.value)}
                      style={{
                        borderRadius: 4,
                        border: "#747272 solid 1px",
                        height: 40,
                        fontSize: 14,
                        paddingLeft: 10,
                        color: "#000",
                        width: "100%",
                        resize: "none",
                        paddingTop: "8px",
                      }}
                      type="text"
                    />
                  </div>
                  <div
                    class="col-md-6  "
                    style={{ marginBottom: "0rem", maxWidth: "100%" }}
                  >
                    <label style={{ marginTop: "10px", marginBottom: "0rem" }}>
                      Time
                    </label>
                    <br />
                    <div style={{ display: "flex" }}>
                      <input
                        // type='time'
                        value={convertUTCtoIST(microStartTime)}
                        readOnly
                        // onChange={(e) => setEditableStartTime(e.target.value)}
                        style={{
                          borderRadius: 4,
                          border: "#747272 solid 1px",
                          height: 40,
                          fontSize: 16,
                          paddingLeft: 10,
                          color: "#000",
                          width: "50%",
                          resize: "none",
                        }}
                      ></input>
                      <input
                        // type='time'
                        value={convertUTCtoIST(microEndTime)}
                        readOnly
                        // onChange={(e) => setEditableEndTime(e.target.value)}
                        style={{
                          borderRadius: 4,
                          border: "#747272 solid 1px",
                          height: 40,
                          fontSize: 16,
                          paddingLeft: 10,
                          color: "#000",
                          width: "50%",
                          resize: "none",
                          marginLeft: "10px",
                        }}
                      ></input>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label style={{ marginTop: "10px", marginBottom: "0rem" }}>
                      Invites
                    </label>
                    <br />
                    <input
                      value={microInvites}
                      readOnly
                      // onChange={(e) => setEditableStart(e.target.value)}
                      style={{
                        borderRadius: 4,
                        border: "#747272 solid 1px",
                        height: 40,
                        fontSize: 16,
                        paddingLeft: 10,
                        color: "#000",
                        width: "100%",
                        resize: "none",
                      }}
                    ></input>
                  </div>

                  <div
                    class="row col-md-12"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  ></div>
                </div> */}
              </div>
            </div>
            {/* <div
              className={`content ${activeButton === "gmail" ? "active" : ""}`}
            >
              <div className="meeting-div" style={{ display: "block" }}>
                <div class=" col-md-12 row" style={{ color: "black" }}>
                  <div class="col-md-6 " style={{ marginBottom: "0rem" }}>
                    <label style={{ marginTop: "10px", marginBottom: "0rem" }}>
                      Meeting Topic
                    </label>
                    <br />
                    <input
                      value={gmailTitle}
                      readOnly
                      // onChange={(e) => setEditableTitle(e.target.value)}
                      style={{
                        borderRadius: 4,
                        border: "#747272 solid 1px",
                        height: 40,
                        fontSize: 14,
                        paddingLeft: 10,
                        color: "#000",
                        width: "100%",
                      }}
                      type="text"
                    />
                  </div>
                  <div className="col-md datepickerinput">
                    <label style={{ marginTop: "10px", marginBottom: "0rem" }}>
                      {" "}
                      Date
                    </label>
                    <br />
                    <input
                      // type='date'
                      value={formatToIST(gmailStartTime)}
                      readOnly
                      // onChange={(e) => setEditableStart(e.target.value)}
                      style={{
                        borderRadius: 4,
                        border: "#747272 solid 1px",
                        height: 40,
                        fontSize: 16,
                        paddingLeft: 10,
                        color: "#000",
                        width: "100%",
                        resize: "none",
                      }}
                    ></input>
                  </div>

                  <div class="col-md-6 " style={{ marginBottom: "0rem" }}>
                    <label style={{ marginTop: "10px", marginBottom: "0rem" }}>
                      Meeting Description
                    </label>
                    <br />
                    <textarea
                      value={gmailDescription}
                      readOnly
                      // onChange={(e) => setEditableDescription(e.target.value)}
                      style={{
                        borderRadius: 4,
                        border: "#747272 solid 1px",
                        height: 40,
                        fontSize: 14,
                        paddingLeft: 10,
                        color: "#000",
                        width: "100%",
                        resize: "none",
                        paddingTop: "8px",
                      }}
                      type="text"
                    />
                  </div>
                  <div
                    class="col-md-6  "
                    style={{ marginBottom: "0rem", maxWidth: "100%" }}
                  >
                    <label style={{ marginTop: "10px", marginBottom: "0rem" }}>
                      Time
                    </label>
                    <br />
                    <div style={{ display: "flex" }}>
                      <input
                        // type='time'
                        value={formatTimeFromDate(gmailStartTime)}
                        readOnly
                        // onChange={(e) => setEditableStartTime(e.target.value)}
                        style={{
                          borderRadius: 4,
                          border: "#747272 solid 1px",
                          height: 40,
                          fontSize: 16,
                          paddingLeft: 10,
                          color: "#000",
                          width: "50%",
                          resize: "none",
                        }}
                      ></input>
                      <input
                        // type='time'
                        value={formatTimeFromDate(gmailEndTime)}
                        readOnly
                        // onChange={(e) => setEditableEndTime(e.target.value)}
                        style={{
                          borderRadius: 4,
                          border: "#747272 solid 1px",
                          height: 40,
                          fontSize: 16,
                          paddingLeft: 10,
                          color: "#000",
                          width: "50%",
                          resize: "none",
                          marginLeft: "10px",
                        }}
                      ></input>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label style={{ marginTop: "10px", marginBottom: "0rem" }}>
                      Invites
                    </label>
                    <br />
                    <input
                      value={gmailInvites}
                      readOnly
                      // onChange={(e) => setEditableStart(e.target.value)}
                      style={{
                        borderRadius: 4,
                        border: "#747272 solid 1px",
                        height: 40,
                        fontSize: 16,
                        paddingLeft: 10,
                        color: "#000",
                        width: "100%",
                        resize: "none",
                      }}
                    ></input>
                  </div>

                  <div
                    class="row col-md-12"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  ></div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </section>
  );
};

export default Calender;
