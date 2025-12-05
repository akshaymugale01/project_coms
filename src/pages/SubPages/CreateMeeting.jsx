import React, { useEffect, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import Select from "react-select";
import Navbar from "../../components/Navbar";
import { Switch } from "../../Buttons";
import { FaLink, FaTimes } from "react-icons/fa";
import {
  CreateVibeMeeting,
  CreateVibeTeamMeeting,
  CreateVibeZoomMeeting,
  getAssignedTo,
  getVibeUsers,
} from "../../api";
import { useSelector } from "react-redux";
import { BiRightArrowAlt } from "react-icons/bi";
import ReactSwitch from "react-switch";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

const CreateMeeting = () => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingStartTime, setMeetingStartTime] = useState("");
  const [meetingEndTime, setMeetingEndTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [otherEmails, setOtherEmails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailOtherList, setEmailOtherList] = useState([]);
  const [users, setUsers] = useState([]);
  const [showGenerateLink, setShowGenerateLink] = useState(false);
  const [uuid, setuuid] = useState("");
  const [emails, setEmails] = useState([]);
  const [selectedToDate, setSelectedToDate] = useState("");
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [meet_id, setMeet_id] = useState("");
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const [subcategory, setSubcategory] = useState("");
  const [repeatMeet, setRepeatMeet] = useState(false);
  const [checkedRepeat, setCheckedRepeat] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  // const [behalf, setbehalf] = useState("self");
  // const screenWidth = window.innerWidth;
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
  useEffect(() => {
    const fetchAssignedTo = async () => {
      try {
        const response = await getAssignedTo();
        const transformedUsers = response.data.map((user) => ({
          value: user.id,
          label: `${user.firstname} ${user.lastname}`,
        }));
        setUsers(transformedUsers);
        // setUsers(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };
    fetchAssignedTo();
    console.log(users);
  }, []);

  useEffect(
    () => {
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
            // setEditableAssignTo(assignEmails);
            //     setEditableGuestTo(assignEmails);
            // setEditableParticipantTo(assignEmails);
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
    },
    [
      // setEmails,
      // setEditableAssignTo,
      // setEditableGuestTo,
      // setEditableParticipantTo,
    ]
  );

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
  var handleChangeSelectMeeting = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
  };

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
  const themeColor = useSelector((state) => state.theme.color);
  const today = new Date().toISOString().split("T")[0];
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
        {/* <label className="font-medium text-white">Repeat</label> */}
        <div className="app">
          {/* <ReactSwitch checked={checkedRepeat === 1} onChange={handleChange} /> */}
          <Switch checked={checkedRepeat === 1} onChange={handleChange} />
        </div>
      </div>
    );
  }

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

  const navigate = useNavigate();

  const handleSaveMeeting = async () => {
    const idList = selectedOption.map((email) => parseInt(email.value));
    const emailList = selectedOption.map((email) => email.label);

    if (!meetingTitle) {
      //alert('Please fill in all the fields before creating the task.');
      toast.error("Please fill the data to Create a Meeting.");
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
    // setLoadingMeet(true);
    toast.loading("Creating Meeting Please wait!");
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
    const internalEmails = emailList.join(",");
    // console.log(internalEmails)
    formData.append("email", internalEmails);
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
      navigate("/meetings");
      // setPopupDate(null);
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
        // setPopupDate(null);
        // setLoadingMeet(false);
      }
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Something went wrong please try again");
    }
  };

  return (
    <section className="min-h-screen p-4 sm:p-0 flex flex-col md:flex-row">
      <div className="fixed hidden sm:block left-0 top-0 h-full md:static md:h-auto md:flex-shrink-0">
        <Navbar />
      </div>
      <div className="flex justify-center overflow-x-auto w-full sm:w-full">
        <div className="border border-gray-300 rounded-lg w-full m-5 px-8 flex h-fit md:mb-10 flex-col gap-5">
          <h2
            style={{ background: themeColor }}
            className="text-center md:text-xl font-semibold my-2 p-2 bg-black rounded-full text-white"
          >
            Create New Meeting
          </h2>
          {/* <div className="grid grid-cols-4 items-center">
            <p className="font-semibold">For :</p>
            <div className="flex gap-5">
              <p
                className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                  behalf === "self" && "bg-black text-white"
                }`}
                onClick={() => setbehalf("self")}
              >
                Self
              </p>
              <p
                className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                  behalf === "others" && "bg-black text-white"
                }`}
                onClick={() => setbehalf("others")}
              >
                Others
              </p>
            </div>
            {behalf === "others" && (
              <Select
                options={users}
                placeholder="Select User"
                value={formData.on_behalf}
                onChange={(selectedOption) =>
                  setFormData({ ...formData, on_behalf: selectedOption })
                }
              />
            )}
          </div> */}
          <div className="grid md:grid-cols-3 gap-5">
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="patientName" className="font-semibold">
                Meeting Topic :
              </label>
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
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
                value={meetingDate}
                min={today}
                onChange={(e) => setMeetingDate(e.target.value)}
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
                  value={meetingStartTime}
                  onChange={(e) => setMeetingStartTime(e.target.value)}
                  className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                />
                -
                <input
                  type="time"
                  value={meetingEndTime}
                  onChange={(e) => setMeetingEndTime(e.target.value)}
                  className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">Description :</p>
            <textarea
              value={meetingDescription}
              onChange={(e) => setMeetingDescription(e.target.value)}
              cols="30"
              rows="2"
              className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <div className="my-2 flex justify-between gap-4 items-center w-full">
              <button
                style={{ background: themeColor }}
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
            <div className="w-full flex gap-2 items-center">
              <input
                type="text"
                readOnly
                className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                value={isLoading ? "Generating Meeting Link..." : meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
              />
              <button
                onClick={handleMeetingLinkCopy}
                className="border-2 border-blue-400 px-4 p-2 flex items-center gap-2 w-40 hover:bg-blue-500 hover:bg-opacity-10 transition duration-300 rounded-md text-blue-400 font-md"
              >
                <FaLink size={20} />
                Copy Link
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Invite internal Attendees :</p>
              <Select
                isMulti
                onChange={handleChangeSelectMeeting}
                options={emails}
                noOptionsMessage={() => "Email not available..."}
                // maxMenuHeight={90}
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
                    backgroundColor: state.isFocused ? "black" : "lightgreen",
                  }),
                }}
                menuPosition={"fixed"}
              />
            </div>
            <div className="flex flex-col gap-2 my-2">
              <p className="font-medium">Invite External Attendees :</p>
              <div className="flex md:flex-row flex-col items-center gap-2">
                <input
                  type="email"
                  value={otherEmails}
                  onChange={(e) => setOtherEmails(e.target.value)}
                  id=""
                  placeholder="Enter Email id"
                  className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                />
                <button
                  className="border-2 border-black hover:bg-black hover:bg-opacity-10 transition duration-300 font-medium p-1 px-4 rounded-md"
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
                <ToggleRepeatSwitch />
              </div>
            </div>
            {repeatMeet && (
              <div className="flex flex-col gap-2">
                <div className="grid md:grid-cols-3 gap-4 ">
                  <div className="flex flex-col">
                    <p className="font-medium">From :</p>
                    <input
                      type="date"
                      min={todayDate}
                      value={meetingDate}
                      onChange={(event) => setMeetingDate(event.target.value)}
                      className="border border-gray-400 p-2 rounded-md placeholder:text-sm w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium">To :</p>
                    <input
                      type="date"
                      min={todayDate}
                      value={selectedToDate}
                      onChange={(event) =>
                        setSelectedToDate(event.target.value)
                      }
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
            <button
              onClick={handleSaveMeeting}
              style={{ background: themeColor }}
              className="bg-black p-1 px-4 text-white rounded-md font-medium"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateMeeting;
