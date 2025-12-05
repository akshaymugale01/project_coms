import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  addGmailAuthenticate,
  API_URL,
  getGmailAuthenticate,
  getVibeBackground,
  getVibeUsers,
  postCalendarTask,
  updateLoginGmailStatus,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  FaCalendarAlt,
  FaInbox,
  FaPaperPlane,
  FaPen,
  FaSignOutAlt,
  FaTasks,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import GmailComposeModal from "../../containers/modals/IntegrationModal/GmailComposeModal";
import DatePicker from "react-datepicker";
import Select from "react-select";
import toast from "react-hot-toast";
const Gmail = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const user_id = getItemInLocalStorage("VIBEUSERID");
  const [number, setNumber] = useState(30);
  const [selectedTab, setSelectedTab] = useState("Inbox");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [to, setTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentURL = window.location.href;
  const defaultImage = { index: 0, src: "" };
  let selectedImageSrc = defaultImage.src;
  let selectedImageIndex = defaultImage.index;
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [filteredMessages, setFilteredMessages] = useState(messages);
  const [showPopup, setShowPopup] = useState(false);
  const [isGmailCompose, setIsGmailCompose] = useState(false);
  const [taskTitle, setTaskTitle] = useState(""); // State for task title
  const [due_date, setDueDate] = useState(new Date());
  const [task_description, setTaskDescription] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingStartTime, setMeetingStartTime] = useState("");
  const [meetingEndTime, setMeetingEndTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [activeButton, setActiveButton] = useState("task");
  const [attachments, setAttachment] = useState([]);
  const [eventAttachment, setEventAttachment] = useState([]);
  const [emails, setEmails] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  useEffect(() => {
    const getTaskAssign = async () => {
      // const user_id = localStorage.getItem("user_id");
      // const org_id = localStorage.getItem("organization_id");

      try {
        // const params = {
        //   user_id: user_id,
        //   org_id: org_id,
        // };

        const jsonData = await getVibeUsers(user_id);

        if (jsonData.success) {
          const users = jsonData.data;
          const assignEmails = users.map((user) => ({
            value: user.user_id,
            label: user.email,
          }));

          setEmails(assignEmails);
          //setEditableAssignTo(assignEmails);
          //setEditableGuestTo(assignEmails);
          //setEditableParticipantTo(assignEmails);
          // Store the emails in local storage
          localStorage.setItem("assignEmails", JSON.stringify(assignEmails));
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const assignEmailsFromStorage = localStorage.getItem("assignEmails");

    if (assignEmailsFromStorage) {
      setEmails(JSON.parse(assignEmailsFromStorage));
    } else {
      getTaskAssign();
    }
  }, [setEmails]);

  const handleFileAttachment = (event) => {
    const selectedFiles = event.target.files;
    const newAttachments = Array.from(selectedFiles);
    setAttachment(newAttachments);
  };

  const handleEventFileAttachment = (event) => {
    const selectedFiles = event.target.files;
    const newAttachments = Array.from(selectedFiles);
    setEventAttachment(newAttachments);
  };
  var handleChangeSelect = (selectedOption) => {
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

  const handleSaveTask = () => {
    if (!taskTitle) {
      //alert('Please fill in all the fields before creating the task.');
      return;
    }
    const formData = new FormData();
    formData.append("task_topic", taskTitle);
    formData.append("due_date", formatDate(due_date));
    formData.append("created_by", user_id);
    formData.append("user_id", user_id);
    formData.append("task_description", task_description);
    attachments.forEach((file, index) => {
      formData.append("attachments", file);
    });
    if (selectedOption) {
      const idList = selectedOption.map((email) => parseInt(email.value));
      idList.forEach((id) => {
        formData.append("assign_to", id);
      });
    }
    try {
      const response = postCalendarTask(formData);
      console.log(response);
      toast.success("Task created Successfully");
      setShowPopup(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleButtonToggle = (type) => {
    setActiveButton(type);
  };

  useEffect(() => {
    setFilteredMessages(messages);
  }, [messages]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === "search") {
      setSearchTerm(value);

      const lowercasedValue = value.toLowerCase();
      const filtered = messages.filter((message) => {
        const from = message.payload.headers
          .find((header) => header.name === "From")
          ?.value.toLowerCase();
        const subject = message.payload.headers
          .find((header) => header.name === "Subject")
          ?.value.toLowerCase();
        const snippet = message.snippet.toLowerCase();
        return (
          from.includes(lowercasedValue) ||
          subject.includes(lowercasedValue) ||
          snippet.includes(lowercasedValue)
        );
      });

      setFilteredMessages(filtered);
    }
  };

  const AddGmailAuth = async (
    state,
    access_token,
    token_type,
    expires_in,
    scope,
    expires_at
  ) => {
    const formData1 = new FormData();
    formData1.append("user_id", user_id.toString());
    formData1.append("platform", "Gmail");
    formData1.append("access_token", access_token.toString());
    formData1.append("expires_at", expires_at.toString());
    formData1.append("expires_in", expires_in.toString());
    formData1.append("scope", scope.toString());
    formData1.append("state", state.toString());
    formData1.append("token_type", token_type.toString());

    try {
      const res = await addGmailAuthenticate(formData1);

      if (res.status === 200) {
        const data = await res.json();
        if (data.success) {
          console.log("Success");
        } else {
          console.error("API returned an error:", data.message);
        }
      } else {
        console.error("API request failed with status:", res.status);
        const errorText = await res.text();
        console.error("Response body:", errorText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  var authInfo;
  const urlParams = new URLSearchParams(currentURL.split("#")[1]);
  useEffect(() => {
    if (urlParams.size === 0) {
      GetAuth();
    } else {
      const state = urlParams.get("state");
      const access_token = urlParams.get("access_token");
      const token_type = urlParams.get("token_type");

      const expires_in = urlParams.get("expires_in");
      const scope = urlParams.get("scope");

      const currentTime = Date.now();

      authInfo = {
        state,
        access_token,
        token_type,
        expires_in,
        scope,
        expires_at: currentTime + expires_in * 1000,
      };

      // Convert the object to a JSON string
      const authInfoJSON = JSON.stringify(authInfo);

      // Store the JSON string in localStorage
      localStorage.setItem("authInfo", authInfoJSON);
      console.log("Stored authInfo:", localStorage.getItem("authInfo"));

      console.log("nahh-------------");
      AddGmailAuth(
        state,
        access_token,
        token_type,
        expires_in,
        scope,
        currentTime + expires_in * 1000
      );

      if (authInfoJSON) {
        const authInfo = JSON.parse(authInfoJSON);
        console.log("Retrieved Access Token:: ", authInfo.access_token);

        // Check if token has expired
        if (Date.now() > authInfo.expires_at) {
          // Handle token expiration - perhaps reauthenticate or fetch new token with refresh token
          UpdateStatus();
          window.location.href = "/employee/settings";
          console.error("Token has expired.");
          // return;
        }
        console.log("--------jag rahe na rahe");
        // Make an authenticated API request using the access_token
        getMessages(number, authInfo.access_token);
      } else {
        console.log("No authInfo in localStorage on Component Load");
      }
    }
  }, [number]);

  const Get_Background = async () => {
    try {
      const user_id = getItemInLocalStorage("VIBEUSERID");
      console.log(user_id);
      const data = await getVibeBackground(user_id);

      if (data.success) {
        console.log("sucess");

        console.log(data.data);
        selectedImageSrc = API_URL + data.data.image;

        selectedImageIndex = data.data.index;

        console.log("Received response:", data);

        setSelectedImage(selectedImageSrc);
        setSelectedIndex(selectedImageIndex);
        console.log("Received selectedImageSrc:", selectedImageSrc);
        console.log("Received selectedImageIndex:", selectedImageIndex);
        console.log(selectedImage);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    Get_Background();
  }, []);
  useEffect(() => {
    console.log(authInfo);
    GetAuth();

    if (authInfo) {
      console.log("Fetching------------");
      getMessages(
        number,
        authInfo.access_token,
        selectedTab === "Inbox" ? "INBOX" : "SENT"
      );
    }
  }, [selectedTab]);

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      className="w-full"
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
        // width: windowWidth <= 768 ? '100%' : '140%'
      }}
    />
  ));

  const GetAuth = async () => {
    try {
      const response = await getGmailAuthenticate("Gmail");
      console.log(response);
      if (response.success) {
        console.log("success");
        console.log(response);
        console.log(response.data);
        if (response.login_status) {
          if (Date.now() > response.data.expires_at) {
            console.error("Token has expired.");
            UpdateStatus();
          }
          console.log("---------------------------");
          console.log(response.data.access_token);

          getMessages(number, response.data.access_token);
        } else {
          // window.location.href = '/integration';
          console.log("redirecting");
        }
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const UpdateStatus = async () => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("platform", "Gmail");

    try {
      const response = await updateLoginGmailStatus(formData);
      console.log(response);
      if (response.success) {
        console.log("Success");
        // window.location.href = '/integration';
        console.log("running");
      } else {
        console.log("unable to update");
      }
    } catch (error) {
      // toast.error('Please Check Your Internet , Try again! ',{position: "top-center",autoClose: 2000})
    }
  };

  const getMessages = (number, accessToken) => {
    console.log("Access Token: ", accessToken);
    setIsLoading(true);

    fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${number}`,
      {
        method: "GET",
        headers: new Headers({ Authorization: `Bearer ${accessToken}` }),
      }
    )
      .then((data) => data.json())
      .then((info) => {
        console.log(info);
        const messagesPromises = info.messages.map((message) =>
          fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
            {
              method: "GET",
              headers: new Headers({ Authorization: `Bearer ${accessToken}` }),
            }
          ).then((data) => data.json())
        );

        Promise.all(messagesPromises)
          .then((messageInfos) => {
            console.log(messageInfos);
            const filteredMessages = messageInfos.filter((messageInfo) => {
              //   messageInfo.labelIds.includes('INBOX')
              // );
              if (selectedTab === "Inbox") {
                // Filter messages for the Inbox tab
                return messageInfo.labelIds.includes("INBOX");
              } else if (selectedTab === "Sent") {
                // Filter messages for the Sent tab
                return messageInfo.labelIds.includes("SENT");
              }
              // You can add more conditions for other tabs if needed
            });
            setMessages(filteredMessages);
            console.log(filteredMessages);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching message details:", error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        // window.location.href = '/employee/settings';
      });
  };
  const onTabClick = (tabName) => {
    setSelectedTab(tabName);

    GetAuth();
  };

  const logout = () => {
    UpdateStatus();
    const storedAuthInfo = localStorage.getItem("authInfo");
    console.log(storedAuthInfo);

    fetch(
      `https://oauth2.googleapis.com/revoke?token=${storedAuthInfo.access_token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then(() => {
        localStorage.removeItem("authInfo");
        if (localStorage.getItem("authInfo") === null) {
          console.log(
            "'authInfo' has been successfully removed from localStorage."
          );
        } else {
          console.error("'authInfo' removal from localStorage failed.");
        }
        // alert(authInfo);
        UpdateStatus();
        window.location.href = "/integration";
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const onCloseCompose = () => {
    setIsGmailCompose(false);
  };
  console.log(selectedTab);

  const handleAddClick = (id) => {
    const selected = messages.find((message) => message.id === id);
    if (selected) {
      const taskTitle =
        selected.payload.headers.find((header) => header.name === "Subject")
          ?.value || "No Subject";
      const taskDescription = selected.snippet || "No Snippet";
      setTaskTitle(taskTitle);
      setTaskDescription(taskDescription);
      setEventTitle(taskTitle);
      setEventDescription(taskDescription);
      setMeetingTitle(taskTitle);
      setMeetingDescription(taskDescription);
      setShowPopup(!showPopup);
    } else {
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  var handleChangeSelectEvent = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
  };

  const handleSaveEvent = () => {
    if (!eventTitle) {
      //alert('Please fill in all the fields before creating the task.');
      return;
    }
    const user_id = localStorage.getItem("user_id");

    const formData = new FormData();
    formData.append("title", eventTitle);
    formData.append("from_date", eventStartDate);
    formData.append("to_date", eventEndDate);
    formData.append("from_time", eventStartTime);
    formData.append("to_time", eventEndTime);
    formData.append("user_id", user_id);
    formData.append("description", eventDescription);
    //formData.append('attachment', eventAttachment);

    eventAttachment.forEach((file, index) => {
      //formData.append(`attachment${index}`, file); // Append each file individually with a unique key
      formData.append("attachment", file);
    });
    if (selectedOption) {
      const idList = selectedOption.map((email) => parseInt(email.value));
      const id = idList.join(",");

      formData.append("guest_ids", id);
    }

    setIsCreatingEvent(true);
    postDataToAPI(CreateEvent, formData)
      .then((response) => {
        if (response.success) {
          console.log(user_id);
          // alert("Event created !")

          // onClose();
          window.location.reload();
        } else {
          console.log("unsuccess");
        }
      })
      .catch((error) => {
        //alert('Please check your internet and try again!');
      })
      .finally(() => {
        setIsCreatingEvent(false);
      });

    console.log(formData);
  };

  return (
    <section
      className="w-full"
      // style={{
      //   background: `url(${selectedImage})no-repeat center center / cover`,
      // }}
    >
      {isGmailCompose && <GmailComposeModal onCloseCompose={onCloseCompose} />}
      {/* <Navbar /> */}
      <div className=" w-full  flex md:mx-2 overflow-hidden   flex-col">
        <div className="">
          <div
            className={`flex justify-between rounded-md bg-black bg-opacity-30 backdrop-blur-sm p-2 shadow-custom-all-sides my-1`}
          >
            <div className={`flex gap-4 `}>
              <h5
                className={`flex gap-2 items-center cursor-pointer px-2 ${
                  selectedTab === "Inbox"
                    ? "bg-white shadow-custom-all-sides rounded px-2"
                    : "text-white"
                }`}
                onClick={() => onTabClick("Inbox")}
              >
                <FaInbox /> Inbox{" "}
              </h5>
              <h5
                className={`flex gap-2 items-center cursor-pointer   px-2 ${
                  selectedTab === "Sent"
                    ? "bg-white  shadow-custom-all-sides rounded px-2"
                    : "text-white"
                }`}
                onClick={() => onTabClick("Sent")}
              >
                <FaPaperPlane /> Sent
              </h5>
            </div>
            
            <div className="flex justify-end gap-4">
              <button
                className="flex items-center gap-2 bg-white font-medium shadow-custom-all-sides rounded-md p-1 px-4"
                onClick={() => setIsGmailCompose(true)}
              >
                <FaPen className="mr-2" />
                Compose
              </button>
         
              <div
                onClick={logout}
                style={{ cursor: "pointer" }}
                className=" right-5 bottom-10 flex items-center gap-2 bg-white p-1 px-4 rounded-md shadow-custom-all-sides font-medium "
              >
                <FaSignOutAlt /> Logout
              </div>
            </div>
          </div>
          <div className="border-b-2 border-white" />
          <div className="bg-black bg-opacity-30 backdrop-blur-sm p-2 rounded-md shadow-custom-all-sides my-1 max-h-screen overflow-scroll">
            <div className="flex items-center md:flex-row flex-col justify-between">
              <div className="my-2 w-full mr-4 ">
                <input
                  // type="text"
                  className="rounded-md p-1 px-2 md:w-96 outline-none"
                  type="search"
                  spellCheck="true"
                  placeholder="Search  "
                  value={searchTerm}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
              </div>
              <div>
                <div id="total" className="text-white font-medium">
                  Emails: {messages.length}
                </div>
                <input
                  type="range"
                  id="number"
                  value={number}
                  max="500"
                  min="1"
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                />
              </div>
            </div>
            {isLoading ? (
              <div className="col-md-12 m-4" style={{ textAlign: "center" }}>
                <center className="m-4">
                  <div
                    className="spinner-border"
                    style={{ opacity: 0.3 }}
                    role="status"
                  >
                    <span className="sr-only"></span>
                  </div>
                  <br />
                  <span className="text-white">Please wait....</span>
                </center>
              </div>
            ) : (
              <>
                {selectedTab === "Inbox" && (
                  <div
                    className="flex flex-col gap-2 rounded-md mb-4"
                    style={{
                      overflowY: "scroll",
                      overflowX: "hidden",
                    }}
                  >
                    {filteredMessages.map((messageInfo) => {
                      console.log(messageInfo);
                      const result = {
                        Date: "",
                        From: "",
                        Subject: "",
                      };

                      messageInfo.payload.headers.forEach((header) => {
                        if (header.name === "Date") {
                          // result.Date = header.value;
                          const date = new Date(header.value);
                          const options = {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          };
                          result.Date = date.toLocaleString(undefined, options); // Format date and time with month name
                        } else if (header.name === "From") {
                          result.From = header.value;
                        } else if (header.name === "Subject") {
                          result.Subject = header.value;
                        }
                      });

                      return (
                        <div
                          className="bg-white p-2 "
                          style={{
                            borderRadius: 5,
                            boxShadow: " 2px 2px #55555515",
                          }}
                          key={messageInfo.id}
                        >
                          <div className="flex justify-between">
                            <div
                              className="col-md-7 "
                              style={{ marginRight: 20, fontWeight: 600 }}
                            >
                              <p>{result.From} </p>
                            </div>
                            <div className="col-md-3">
                              <span style={{ fontSize: 14 }}>
                                {result.Date}
                              </span>
                            </div>

                            <button
                              className="font-medium px-2 text-white rounded-md shadow-custom-all-sides"
                              onClick={() => {
                                handleAddClick(messageInfo.id);
                              }}
                              style={{
                                background: themeColor,
                              }}
                            >
                              Add
                            </button>
                          </div>
                          <div>{result.Subject} </div>
                          <div style={{ color: "#6d6d6d" }}>
                            <a
                              // target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#6d6d6d" }}
                              href={`https://mail.google.com/mail/u/0/#inbox/${messageInfo.id}`}
                            >
                              {messageInfo.snippet}
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {selectedTab === "Sent" && (
                  <div
                    className="flex flex-col gap-2 rounded-md mb-4"
                    style={{
                      overflowY: "scroll",
                      overflowX: "hidden",
                    }}
                  >
                    {filteredMessages.map((messageInfo) => {
                      const result = {
                        Date: "",
                        To: "",
                        Subject: "",
                      };
                      messageInfo.payload.headers.forEach((header) => {
                        if (header.name === "Date") {
                          // result.Date = header.value;
                          const date = new Date(header.value);
                          const options = {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          };
                          result.Date = date.toLocaleString(undefined, options);
                        } else if (header.name === "To") {
                          result.From = header.value;
                        } else if (header.name === "Subject") {
                          result.Subject = header.value;
                        }
                      });

                      return (
                        <div
                          className="bg-white p-2 "
                          style={{
                            borderRadius: 5,
                            boxShadow: " 2px 2px #55555515",
                          }}
                          key={messageInfo.id}
                        >
                          <div className="flex justify-between">
                            <div className="font-medium">
                              <p>{result.From} </p>
                            </div>
                            <div className="col-md-4">
                              <span style={{ fontSize: 14 }}>
                                {result.Date}
                              </span>
                            </div>
                            <div className="flex gap-2 items-center">
                              {" "}
                              <FaCalendarAlt
                                className="pull-right"
                                style={{ marginRight: "8px" }}
                              />
                              <FaTasks className="pull-right" />{" "}
                            </div>
                          </div>
                          <div style={{ fontWeight: 500 }}>
                            {result.Subject}{" "}
                          </div>
                          <div style={{ color: "#6d6d6d" }}>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#6d6d6d" }}
                              href={`https://mail.google.com/mail/u/0/#inbox/${messageInfo.id}`}
                            >
                              {messageInfo.snippet}
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

           
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50 p-10">
          <div
            style={{ background: themeColor }}
            className="md:w-auto w-full p-4  flex flex-col rounded-md overflow-auto max-h-[100%] hide-scrollbar"
          >
            <div className="">
              <div className="flex justify-evenly bg-gray-100 rounded-full p-1 ">
                <button
                  className={`font-medium ${
                    activeButton === "task" &&
                    "bg-white text-blue-400 shadow-custom-all-sides px-8 rounded-full"
                  }`}
                  onClick={() => handleButtonToggle("task")}
                >
                  Task
                </button>
                <button
                  className={`font-medium ${
                    activeButton === "event" &&
                    "bg-white text-blue-400 shadow-custom-all-sides px-8 rounded-full"
                  }`}
                  onClick={() => handleButtonToggle("event")}
                >
                  Event
                </button>
                <button
                  className={`font-medium ${
                    activeButton === "meeting" &&
                    "bg-white text-blue-400 shadow-custom-all-sides px-8 rounded-full"
                  }`}
                  onClick={() => handleButtonToggle("meeting")}
                >
                  Meeting
                </button>
              </div>
              {/* <img
                          width="20px"
                          height="20px"
                          src={ClosePopUp}
                          alt=""
                          style={{
                            display: "flex",
                            alignSelf: "center",
                            cursor: "pointer",
                            marginLeft: "auto",
                          }}
                          
                        /> */}
            </div>
            &nbsp;&nbsp;
            {activeButton === "task" && (
              <div
                className={`content ${activeButton === "task" ? "active" : ""}`}
              >
                <div id="taskDiv">
                  <div id="taskDiv">
                    <div className="flex gap-2">
                      <div class="col-md-6 " style={{ marginBottom: "0rem" }}>
                        <label className="text-white font-medium">
                          Task Topic
                        </label>

                        <input
                          style={{
                            borderRadius: 4,
                            border: "#747272 solid 1px",
                            height: 40,
                            fontSize: 14,
                            paddingLeft: 10,
                            color: "#000",
                            width: "100%",
                          }}
                          value={taskTitle}
                          spellCheck="true"
                          onChange={(e) => setTaskTitle(e.target.value)}
                          type="text"
                        />
                      </div>

                      <div className="">
                        <label className="font-medium text-white"> Date</label>
                        <br />
                        <DatePicker
                          selected={due_date}
                          onChange={(date) => setDueDate(date)}
                          showTimeSelect
                          dateFormat="dd/MM/yyyy h:mm aa"
                          // className="datepickers_date"
                          customInput={<CustomInput />}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col my-2">
                      <label className="text-white font-medium">
                        Task Description
                      </label>

                      <textarea
                        style={{ resize: "none", borderRadius: 4 }}
                        className="p-2"
                        type="text"
                        //value={selectedMessage.snippet}
                        rows={4}
                        value={task_description}
                        onChange={(e) => setTaskDescription(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-white font-medium">
                        Attachment
                      </label>

                      <input
                        className="text-center p-4"
                        style={{
                          border: "#929090 dotted 2px",
                          // height: "100px",
                          color: "white",
                          // padding: "35px 65px",
                        }}
                        ref={fileInputRef}
                        //value={selectedItem.attachments}
                        type="file"
                        onChange={handleFileAttachment}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-medium text-white">Assign</label>

                      <Select
                        isMulti
                        onChange={handleChangeSelect}
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
                    <div className="flex justify-end gap-2 my-2">
                      <button
                        className="bg-white text-black p-1 px-4 rounded-full"
                        onClick={handleSaveTask}
                      >
                        Save
                      </button>
                      <button
                        className="bg-red-400 text-white p-1 px-4 rounded-full"
                        onClick={closePopup}
                      >
                        Close
                      </button>
                    </div>
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
                <div id="eventDiv">
                  <div
                    class="pdEmplyself-main col-md-12 row"
                    style={{ color: "black" }}
                  >
                    <div class="col-md-6 " style={{ marginBottom: "0rem" }}>
                      <label
                        style={{
                          marginTop: "20px",
                          marginBottom: "0rem",
                        }}
                      >
                        Event Topic
                      </label>
                      <br />
                      <input
                        value={eventTitle}
                        spellCheck="true"
                        onChange={(e) => setEventTitle(e.target.value)}
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
                    {/* <div class="col-md-6"  >
                                                    <label style={{marginTop:'20px',  marginBottom: '0rem' }}>Due</label><br/>
                                                    <input type="datetime-local" class="datepickers" value={due_date} onChange={(e) => setDueDate(e.target.value)} style={{backgroundColor:'white'}}/>
                                                    </div> */}
                    <div className="col-md">
                      <label
                        style={{
                          marginTop: "20px",
                          marginBottom: "0rem",
                        }}
                      >
                        {" "}
                        Date
                      </label>
                      <br />
                      <div style={{ display: "flex" }}>
                        <input
                          type="date"
                          style={{ width: "50%" }}
                          value={eventStartDate}
                          onChange={(e) => setEventStartDate(e.target.value)}
                        ></input>
                        <input
                          type="date"
                          style={{ width: "50%", marginLeft: "10px" }}
                          value={eventEndDate}
                          onChange={(e) => setEventEndDate(e.target.value)}
                        ></input>
                      </div>
                      {/* <DatePicker

                                                            showTimeSelect
                                                            dateFormat="dd/MM/yyyy h:mm aa"
                                                            // className="datepickers_date"
                                                            customInput={<CustomInput />}
                                                        /> */}
                    </div>

                    <div class="col-md-6 " style={{ marginBottom: "0rem" }}>
                      <label
                        style={{
                          marginTop: "20px",
                          marginBottom: "0rem",
                        }}
                      >
                        Event Description
                      </label>
                      <br />
                      <textarea
                        style={{ resize: "none", height: "40px" }}
                        type="text"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                      />
                    </div>
                    <div className="col-md">
                      <label
                        style={{
                          marginTop: "20px",
                          marginBottom: "0rem",
                        }}
                      >
                        {" "}
                        Time
                      </label>
                      <br />
                      <div style={{ display: "flex" }}>
                        <input
                          type="time"
                          style={{ width: "50%" }}
                          value={eventStartTime}
                          onChange={(e) => setEventStartTime(e.target.value)}
                        ></input>
                        <input
                          type="time"
                          style={{ width: "50%", marginLeft: "10px" }}
                          value={eventEndTime}
                          onChange={(e) => setEventEndTime(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <label
                        style={{
                          marginTop: "20px",
                          marginBottom: "0rem",
                        }}
                      >
                        Attachment
                      </label>
                      <br />
                      <input
                        style={{
                          border: "#929090 dotted 2px",
                          height: "55px",
                          color: "black",
                          padding: "10px",
                        }}
                        ref={fileInputRef}
                        //value={eventAttachment}
                        //onChange={(e) => setEventAttachment(e.target.value)}
                        onChange={handleEventFileAttachment}
                        type="file"
                        multiple
                      />
                    </div>
                    <div class="col-md-6">
                      <label
                        style={{
                          marginTop: "20px",
                          marginBottom: "0rem",
                        }}
                      >
                        Guests
                      </label>
                      <br />
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
                    <div
                      class="col-md-12"
                      style={{
                        display: "flex",
                        alignSelf: "flex-end",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        style={{
                          marginTop: "10px",
                          marginBottom: "0rem",
                          padding: "5px 10px",
                          width: "30%",
                        }}
                        onClick={handleSaveEvent}
                      >
                        Save
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
                <div className="meeting-div" style={{ display: "block" }}>
                  <div class=" col-md-12 row" style={{ color: "black" }}>
                    <div class="col-md-6 " style={{ marginBottom: "0rem" }}>
                      <label
                        style={{
                          marginTop: "20px",
                          marginBottom: "0rem",
                        }}
                      >
                        Meeting Topic
                      </label>
                      <br />
                      <input
                        value={meetingTitle}
                        spellCheck="true"
                        onChange={(e) => setMeetingTitle(e.target.value)}
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
                      <label
                        style={{
                          marginTop: "20px",
                          marginBottom: "0rem",
                        }}
                      >
                        {" "}
                        Date
                      </label>
                      <br />
                      <input
                        type="date"
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
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
                      {/* <DatePicker 
                                                            dateFormat="dd/MM/yyyy h:mm aa"
                                                            // className="datepickers_date"
                                                            customInput={<CustomInput />}
                                                        /> */}
                    </div>

                    <div class="col-md-6 " style={{ marginBottom: "0rem" }}>
                      <label
                        style={{
                          marginTop: "20px",
                          marginBottom: "0rem",
                        }}
                      >
                        Meeting Description
                      </label>
                      <br />
                      <textarea
                        value={meetingDescription}
                        onChange={(e) => setMeetingDescription(e.target.value)}
                        style={{
                          borderRadius: 4,
                          border: "#747272 solid 1px",
                          height: 40,
                          fontSize: 14,
                          paddingLeft: 10,
                          color: "#000",
                          width: "100%",
                          resize: "none",
                        }}
                        type="text"
                      />
                    </div>
                    <div
                      class="col-md-6  "
                      style={{
                        marginBottom: "0rem",
                        maxWidth: "100%",
                      }}
                    >
                      <label
                        style={{
                          marginTop: "20px",
                          marginBottom: "0rem",
                        }}
                      >
                        Time
                      </label>
                      <br />
                      <div style={{ display: "flex" }}>
                        <input
                          type="time"
                          value={meetingStartTime}
                          onChange={(e) => setMeetingStartTime(e.target.value)}
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
                          value={meetingEndTime}
                          onChange={(e) => setMeetingEndTime(e.target.value)}
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
                      <label
                        style={{
                          marginTop: "20px",
                          marginBottom: "0rem",
                        }}
                      >
                        Invites
                      </label>
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
                    <div class="col-md-6">
                      <label
                        style={{
                          marginTop: "20px",
                          marginBottom: "0rem",
                        }}
                      >
                        Meeting Link
                      </label>
                      <br />
                      <input
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
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
                    <div
                      class="col-md-12"
                      style={{
                        display: "flex",
                        alignSelf: "flex-end",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        style={{
                          marginTop: "10px",
                          marginBottom: "0rem",
                          padding: "5px 10px",
                          display: showVerifiedButton,
                          width: "30%",
                        }}
                        onClick={handleSaveMeeting}
                      >
                        Save
                      </button>
                      <div
                        className=" spinner-border text-success ml-2 mt-4"
                        style={{
                          opacity: 0.7,
                          display: showVerifiedLoader,
                        }}
                        role="status"
                      >
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gmail;
