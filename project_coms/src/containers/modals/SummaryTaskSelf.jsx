import React, { useState, useRef, useEffect } from "react";

// import '../employee/EmployeeTaskSelf.css'

// import { getDataFromAPI, postDataToAPI } from '../../../Api/api_Methods';
// import { AddBoardChecklistTask, GetUsers } from '../../../Api/api_Urls';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactSwitch from "react-switch";
// import { ThreeDots } from 'react-loader-spinner';
// import Modal from 'react-modal';
// import { useMediaQuery } from 'react-responsive';

import { SendDueDateFormat } from "../../utils/dateUtils";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { getVibeUsers, postCalendarTask } from "../../api";

function SummaryTaskSelf({ onClose, taskName }) {
  // const [modalTaskRepeatDaysIsOpen, setTaskRepeatDaysModalIsOpen] = useState('');

  // const openTaskRepeatDays = () => {
  //   console.log("hi")
  //   closeTaskRepeatDays();
  //   setTaskRepeatDaysModalIsOpen(true);
  // };

  // const closeTaskRepeatDays = () => {
  //   setTaskRepeatDaysModalIsOpen(false);
  // };

  const [modalTaskSelfIsOpen, setTaskSelfModalIsOpen] = useState("");
  const closeTaskSelf = () => {
    setTaskSelfModalIsOpen(false);
  };

  const [isAssignToOthersActive, setAssignToOthersActive] = useState(false);
  const [isSelfTaskActive, setSelfTaskActive] = useState(true);

  const handleSelfTask = () => {
    setAssignToOthers(!assignToOthers);
    setAssignToOthersActive(false);
    setSelfTaskActive(true);
  };
  const [assignToOthers, setAssignToOthers] = useState(false);

  const handleAssignToOthers = () => {
    setAssignToOthers(true);
    setAssignToOthersActive(true);
    setSelfTaskActive(false);
  };

  const [checked, setChecked] = useState(0);
  function ToggleSwitch() {
    const handleChange = (val) => {
      setChecked(val ? 1 : 0);
    };

    console.log(checked);
    return (
      <>
        <span className="font-medium text-white">Urgent</span>
        <div
          className="app"
          //  style={{ marginTop: '25px', marginLeft: '10px' }}
        >
          {/* <p style={{ color: '#000', fontWeight: 'bold', marginBottom: '0rem' }}>Urgent</p> */}
          <ReactSwitch checked={checked === 1} onChange={handleChange} />
        </div>
      </>
    );
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;
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
  // const filterTime = (time) => {
  //   const selectedDate = new Date(time);
  //   const currentDate = new Date();
  //   const currentDateTime = new Date();

  //   // Compare selected date with current date
  //   if (selectedDate.getTime() > currentDateTime.getTime()) {
  //     return true; // Future date/time
  //   } else if (
  //     selectedDate.getFullYear() === currentDate.getFullYear() &&
  //     selectedDate.getMonth() === currentDate.getMonth() &&
  //     selectedDate.getDate() === currentDate.getDate()
  //   ) {
  //     // If selected date is today, set the time to the current time
  //     selectedDate.setHours(currentDate.getHours());
  //     selectedDate.setMinutes(currentDate.getMinutes());
  //     return true;
  //   } else {
  //     return false; // Past date/time
  //   }
  // };

  const [task_topic, setTaskTopic] = useState(taskName);
  // const [due_date, setDueDate] = useState(new Date());
  const [due_date, setDueDate] = useState(null);
  const [from_due_date, setFromDueDate] = useState(new Date());
  const [to_due_date, setToDueDate] = useState(new Date());
  const [task_description, setTaskDescription] = useState("");
  const [attachments, setAttachment] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [taskTime, setTaskTime] = useState("");

  var handleChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const fileInputRef = useRef(null);

  const handleFileAttachment = (event) => {
    const selectedFile = event.target.files;
    const newAttachments = Array.from(selectedFile);
    setAttachment(newAttachments);
  };

  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const [showVerifiedButton, setShowVerifiedButton] = useState("block");
  const [showVerifiedLoader, setShowVerifiedLoader] = useState("none");

  const [loading, setLoading] = useState(false);

  // const createTask = () => {

  //   if (isCreatingTask) {
  //     return; // If the task is already being created, do nothing
  //   }
  //   setLoading(true);

  //   if (!selectedOption) {

  //     if (!task_topic) {
  //       //alert('Please fill in all the fields before creating the task.');
  //       return;
  //     };
  //     const user_id = localStorage.getItem('user_id');

  //     setShowVerifiedButton("none");
  //     setShowVerifiedLoader("block");

  //     const formData = new FormData();
  //     formData.append('task_topic', task_topic);
  //     formData.append('due_date', formatDate(due_date));
  //     formData.append('created_by', user_id);
  //     formData.append('task_description', task_description);
  //     formData.append('urgent_status', checked === 0 ? false : true);
  //     attachments.forEach((file, index) => {
  //       formData.append(`attachments`, file);
  //     });

  //     formData.append('assign_to', user_id);

  //     setIsCreatingTask(true);
  //     postDataToAPI(AddBoardChecklistTask, formData)
  //       .then(response => {
  //         if (response.success) {

  //           setLoading(false);
  //           onClose();
  //           window.location.reload();
  //         } else {
  //           setLoading(false);
  //           console.log("unsuccess");
  //         }
  //       })
  //       .catch(error => {
  //         setLoading(false);
  //         //alert('Please check your internet and try again!');

  //       })
  //       .finally(() => {
  //         setLoading(false);
  //         setIsCreatingTask(false);
  //       });

  //   } else {

  //     const idList = selectedOption.map((email) => parseInt(email.value));

  //     if (!task_topic) {
  //       //alert('Please fill in all the fields before creating the task.');
  //       return;
  //     };
  //     const user_id = localStorage.getItem('user_id');

  //     setLoading(true);
  //     const formData = new FormData();
  //     formData.append('task_topic', task_topic);
  //     formData.append('due_date', formatDate(due_date));
  //     formData.append('created_by', user_id);
  //     formData.append('task_description', task_description);
  //     formData.append('urgent_status', checked === 0 ? false : true);
  //     attachments.forEach((file, index) => {
  //       formData.append(`attachments`, file);
  //     });
  //     idList.forEach((id) => {
  //       formData.append('assign_to', id);
  //     });
  //     setIsCreatingTask(true);
  //     postDataToAPI(AddBoardChecklistTask, formData)
  //       .then(response => {
  //         if (response.success) {
  //           setLoading(false);

  //           onClose();

  //           window.location.reload();

  //         } else {
  //           setLoading(false);
  //           console.log("unsuccess");
  //         }
  //       })
  //       .catch(error => {
  //         setLoading(false);
  //         //alert('Please check your internet and try again!');

  //       })
  //       .finally(() => {
  //         setIsCreatingTask(false);
  //         setLoading(false);
  //       });
  //   }

  // }

  const [selectedDateRepeat, setSelectedDateRepeat] = useState(null);
  const [selectedToDateRepeat, setSelectedToDateRepeat] = useState(null);
  const [selectedWeekdaysRepeat, setSelectedWeekdaysRepeat] = useState([]);
  // -----------------------------------------

  // const mainWeek = selectedWeekdays.join(",");

  const screenWidth = window.innerWidth;
  const previousWidth = useRef(window.innerWidth);
  const [modalWidth, setModalWidth] = useState("900px");
  useEffect(() => {
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    const currentWidth = window.innerWidth;

    if (currentWidth !== previousWidth.current) {
      if (currentWidth <= 767) {
        setModalWidth("270px");
      } else if (currentWidth <= 1024) {
        setModalWidth("600px");
      } else {
        setModalWidth("720px");
      }

      previousWidth.current = currentWidth;
    }
  };
  const themeColor = useSelector((state) => state.theme.color);

  const [selectedWeekdays, setSelectedWeekdays] = useState([]);

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
      <>
        <label className="font-medium text-white">Repeat</label>
        <div
          className=""
          //  style={{ marginTop: '25px', marginLeft: '10px' }}
        >
          {/* <p style={{ color: '#000', fontWeight: 'bold', marginBottom: '0rem' }}>Urgent</p> */}
          <ReactSwitch checked={checkedRepeat === 1} onChange={handleChange} />
        </div>
      </>
    );
  }

  const createTask = async () => {
    console.log(taskTime);
    console.log(selectedWeekdays);
    console.log(repeatMeet);
    console.log(due_date);
    console.log(to_due_date);

    if (assignToOthers && (!selectedOption || selectedOption.length === 0)) {
      toast.error("Please select someone to assign the task to.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    if (isCreatingTask) {
      return; // If the task is already being created, do nothing
    }

    setLoading(true);

    if (!selectedOption) {
      console.log(isAssignToOthersActive);
      if (!task_topic) {
        toast.error("Please fill Task Topic.", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }
      if (!due_date) {
        toast.error("Please select Due Date.", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }
      const user_id = localStorage.getItem("VIBEUSERID");

      setShowVerifiedButton("none");
      setShowVerifiedLoader("block");

      const formData = new FormData();
      formData.append("task_topic", task_topic);
      formData.append("due_date", SendDueDateFormat(due_date));
      formData.append("created_by", user_id);
      formData.append("user_id", user_id);
      formData.append("task_description", task_description);
      formData.append("urgent_status", checked === 0 ? false : true);
      attachments.forEach((file, index) => {
        formData.append("attachments", file);
      });

      formData.append("assign_to", user_id);
      formData.append("from_due_date", from_due_date);
      formData.append("to_due_date", to_due_date);
      formData.append("to_time_date", taskTime);
      const mainWeek = selectedWeekdays.join(",");
      formData.append("included_weekdays", mainWeek);
      formData.append("repeat_task", repeatMeet);

      setIsCreatingTask(true);
      //   postDataToAPI(AddBoardChecklistTask, formData)
      //     .then((response) => {
      //       if (response.success) {
      //         setLoading(false);
      //         onClose();
      //         window.location.reload();
      //       } else {
      //         setLoading(false);
      //         console.log("unsuccess");
      //         setShowVerifiedButton("block");
      //         setShowVerifiedLoader("none");
      //         if (response.status === 422) {
      //           toast.error(`${response.message}`, {
      //             style: {
      //               width: "500px",
      //             },
      //             position: "top-center",
      //             autoClose: 5000,
      //           });
      //         }
      //       }
      //     })
      //     .catch((error) => {
      //       setLoading(false);
      //       setShowVerifiedButton("block");
      //       setShowVerifiedLoader("none");
      //     })
      //     .finally(() => {
      //       setLoading(false);
      //       setIsCreatingTask(false);
      //       setShowVerifiedButton("block");
      //       setShowVerifiedLoader("none");
      //     });
      try {
        toast.loading("Creating New Task Please Wait!")
        const response = await postCalendarTask(formData);
        console.log(response);
        toast.dismiss()
        onClose()
        toast.success("Task Created Successfully")
      } catch (error) {
        console.log(error);
        toast.error("Error Creating Task");
      }
    } else {
      const idList = selectedOption.map((email) => parseInt(email.value));

      if (!task_topic) {
        toast.error("Please fill Task Topic.", {
          position: "top-center",
          autoClose: 2000,
        });

        //alert('Please fill in all the fields before creating the task.');
        return;
      }
      if (!due_date) {
        toast.error("Please select Due Date.", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }
      if (!idList) {
        toast.error("Please fill Assign someone.", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }

      const user_id = localStorage.getItem("VIBEUSERID");
      setShowVerifiedButton("none");
      setShowVerifiedLoader("block");
      setLoading(true);
      const formData = new FormData();
      formData.append("task_topic", task_topic);
      formData.append("due_date", SendDueDateFormat(due_date));
      formData.append("created_by", user_id);
      formData.append("user_id", user_id);
      formData.append("task_description", task_description);
      formData.append("urgent_status", checked === 0 ? false : true);
      attachments.forEach((file, index) => {
        formData.append("attachments", file);
      });
      const idString = idList.join(",");
      // idList.forEach((id) => {
      formData.append("assign_to", idString);
      // });
      formData.append("redirect_link", "/employee/myBoard");
      formData.append("where_to", "myboard");
      formData.append("from_due_date", from_due_date);
      formData.append("to_due_date", to_due_date);
      formData.append("to_time_date", taskTime);
      const mainWeek = selectedWeekdays.join(",");
      formData.append("included_weekdays", mainWeek);
      formData.append("repeat_task", repeatMeet);

      setIsCreatingTask(true);
      try {
        const response = await postCalendarTask(formData);
        console.log(response);

        if (response.success) {
          setLoading(false);
          onClose();
        //   window.location.reload();
        } else {
          setLoading(false);
          console.log("unsuccess");
          setShowVerifiedButton("block");
          setShowVerifiedLoader("none");
          if (response.status === 422) {
            toast.error(`${response.message}`, {
              style: {
                width: "500px",
              },
              position: "top-center",
              autoClose: 5000,
            });
          }
        }
      } catch (error) {
        setLoading(false);
        //alert('Please check your internet and try again!');
        setShowVerifiedButton("block");
        setShowVerifiedLoader("none");
      } finally {
        setIsCreatingTask(false);
        setLoading(false);
        setShowVerifiedButton("block");
        setShowVerifiedLoader("none");
      }
    }
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

  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const getTaskAssign = async () => {
      const user_id = localStorage.getItem("VIBEUSERID");
      const org_id = localStorage.getItem("organization_id");

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
          // Store the emails in local storage
          localStorage.setItem("assignEmails", JSON.stringify(assignEmails));
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getTaskAssign();
  }, [setEmails]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //   const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  //     <input
  //       className="p-2 w-full rounded-md"
  //       onClick={onClick}
  //       value={value}
  //       ref={ref}
  //       placeholder="Select Date and Time"
  //       style={{
  //         backgroundColor: "white",
  //         color: "black",
  //       }}
  //     />
  //   ));
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {modalTaskSelfIsOpen && <TaskSelf onClose={closeTaskSelf} />}
      {/* {modalTaskRepeatDaysIsOpen && (
        <TaskRepeatDays
          open={openTaskRepeatDays}
        />
      )} */}
      <div className="  fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50 p-10 ">
        <div
          style={{ background: themeColor }}
          className=" md:w-auto w-full  p-4 md:px-10  flex flex-col rounded-md  overflow-auto max-h-[100%]"
        >
          <button
            className="place-self-end fixed p-1 rounded-full z-30  bg-white"
            onClick={onClose}
          >
            <AiOutlineClose size={20} />
          </button>
          <div className="">
            <div className="px-2">
              <div>
                <div>
                  <div
                    style={{
                      overflowY: assignToOthers ? "scroll" : "scroll",
                      // , scrollbarWidth: 'thin'
                    }}
                  >
                    <div

                    // style={{ position: 'sticky', top: -20, zIndex: 10, background: assignToOthers ? 'linear-gradient(to right, white 68.6%, #132A3A 0%)' : 'linear-gradient(to right, white 68.7%, #132A3A 0%)' }}
                    >
                      <div>
                        <div style={{ display: "flex" }} className="my-2">
                          <h2 className="font-medium text-xl text-white border-b border-white w-full">
                            Create Task
                          </h2>
                        </div>
                        <div className=" flex justify-center w-full">
                          <div className="bg-gray-200 mx-5 rounded-full w-fit">
                            <a onClick={handleSelfTask}>
                              {" "}
                              <button
                                className={`p-1 ${
                                  isSelfTaskActive &&
                                  "bg-white text-blue-500 shadow-custom-all-sides"
                                } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
                              >
                                Self Task
                              </button>{" "}
                            </a>
                            <a onClick={handleAssignToOthers}>
                              {" "}
                              <button
                                className={`p-1 ${
                                  isAssignToOthersActive &&
                                  "bg-white text-blue-500 shadow-custom-all-sides"
                                } rounded-full px-4 cursor-pointer text-center  transition-all duration-300 ease-linear`}
                              >
                                Assign to others
                              </button>{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ color: "black" }} className="my-2">
                      <div className="flex  justify-around gap-2">
                        <div className="flex flex-col w-full">
                          <div>
                            <label className="text-white font-medium">
                              Task Topic
                            </label>
                            <label
                              style={{ color: "#f44336", marginBottom: "0rem" }}
                            >
                              &nbsp; *{" "}
                            </label>
                          </div>
                          <input
                            placeholder="Enter Task Topic"
                            style={{
                              //   borderRadius: 4,
                              border: "#747272 solid 1px",
                              //   height: 40,
                              fontSize: 14,
                              paddingLeft: 10,
                              color: "#000",
                              width: "100%",
                            }}
                            className="p-2 rounded-md outline-none"
                            type="text"
                            spellCheck={true}
                            value={task_topic}
                            onChange={(e) => setTaskTopic(e.target.value)}
                          />
                        </div>
                        {/* <div class="col-md-6"  >
                                            <label style={{marginTop:'20px',  marginBottom: '0rem' }}>Due</label><br/>
                                            <input type="datetime-local" class="datepickers" value={due_date} onChange={(e) => setDueDate(e.target.value)} style={{backgroundColor:'white'}}/>
                                        </div> */}
                        <div className="flex flex-col w-full">
                          <div>
                            <label className="font-medium text-white">
                              Due Date
                            </label>
                            <label
                              style={{ color: "#f44336", marginBottom: "0rem" }}
                            >
                              &nbsp; *{" "}
                            </label>
                          </div>

                          <DatePicker
                            selected={due_date}
                            onChange={(date) => setDueDate(date)}
                            showTimeSelect
                            timeIntervals={5}
                            dateFormat="dd/MM/yyyy h:mm aa"
                            // customInput={<CustomInput />}
                            minDate={new Date()}
                            filterTime={filterTime}
                            className="p-2 rounded-md outline-none"
                            placeholderText="Select Date & Time"
                          />
                        </div>
                      </div>

                      <div className="my-2 flex flex-col">
                        <label className="font-medium text-white ">
                          Task Description
                        </label>

                        <textarea
                          style={{ resize: "none" }}
                          className=" rounded-md px-2 outline-none"
                          placeholder="Describe Task"
                          rows={3}
                          type="text"
                          spellCheck={true}
                          value={task_description}
                          maxLength={250}
                          onChange={(e) => setTaskDescription(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium text-white">
                          Attachment
                        </label>

                        <input
                          style={{
                            border: "white dotted 2px",
                            height: "100px",
                            color: "white",
                            padding: "35px 65px",
                          }}
                          ref={fileInputRef}
                          
                          type="file"
                          multiple
                          onChange={handleFileAttachment}
                        />
                      </div>

                      {assignToOthers && (
                        <div className="mt-2">
                          <label className="font-medium text-white ">
                            Assign
                          </label>

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
                      )}

                      {assignToOthers && (
                        <>
                          <div className="flex gap-4">
                            <div className="col-md-3 ">
                              <ToggleSwitch />
                            </div>
                            <div className="col-md-3 p-0">
                              {/* <button className='pr-2 pl-2' onClick={openUpdateModal}>Repeat</button> */}
                              <ToggleRepeatSwitch />
                            </div>
                          </div>
                          {repeatMeet ? (
                            <div
                              className="col-md-12 mt-2"
                              style={{
                                backgroundColor: "rgb(76 98 113 / 9%)",
                                borderRadius: 4,
                              }}
                            >
                              <label className="text-white font-medium">
                                Repeat
                              </label>
                              <hr className="mb-0 mt-0"></hr>

                              <div className="">
                                <div className="grid grid-cols-2 w-full gap-4 my-2">
                                  <div className="w-full flex flex-col">
                                    <label className="font-medium text-white">
                                      <span>FROM DATE</span>
                                    </label>

                                    <input
                                      value={from_due_date}
                                      spellCheck="true"
                                      onChange={(e) =>
                                        setFromDueDate(e.target.value)
                                      }
                                      className="w-full outline-none"
                                      style={{
                                        borderRadius: 4,
                                        border: "#747272 solid 1px",
                                        height: 40,
                                        fontSize: 14,
                                        paddingLeft: 10,
                                        color: "#000",
                                        width: "100%",
                                      }}
                                      type="date"
                                    />
                                  </div>

                                  {/* <div className='col-md-2'></div> */}

                                  <div className="flex w-full flex-col">
                                    <label className="font-medium text-white">
                                      <span>TO DATE</span>
                                    </label>

                                    <input
                                      value={to_due_date}
                                      spellcheck="true"
                                      onChange={(e) =>
                                        setToDueDate(e.target.value)
                                      }
                                      className="outline-none"
                                      style={{
                                        borderRadius: 4,
                                        border: "#747272 solid 1px",
                                        height: 40,
                                        fontSize: 14,
                                        paddingLeft: 10,
                                        color: "#000",
                                        width: "100%",
                                      }}
                                      type="date"
                                    />
                                  </div>

                                  <div className="flex flex-col ">
                                    <label className="font-medium text-white">
                                      <span>TIME</span>
                                    </label>

                                    <input
                                      type="time"
                                      value={taskTime}
                                      
                                      onChange={(event) =>
                                        setTaskTime(event.target.value)
                                      }
                                      className="p-2 rounded-md outline-none"
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-md-6 mt-3">
                                <label className='mr-1'><span>TO DATE</span></label><br></br>
                                <input type="date" class="datepicker" min={todayDate} value={selectedToDate} onChange={(event) => setSelectedToDate(event.target.value)} />
                                </div> */}

                              <div className="">
                                <div className="flex">
                                  <span className="text-white font-medium">
                                    SELECT WORKING DAYS
                                  </span>
                                  <div className="text-white mx-2 flex">
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
                                        className="mr-2 mb-2 "
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
                                        display: "flex",

                                        fontFamily:
                                          "SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,Courier New, monospace",
                                      }}
                                    >
                                      <p
                                        className="mr-2 mb-2 "
                                        style={{
                                          width: 10,
                                          height: 10,
                                          paddingBottom: 4,
                                          marginTop: 7,
                                          backgroundColor: "#fff",
                                          border: "1px solid #cdcdcd",
                                        }}
                                      ></p>
                                      Deselected]
                                    </span>
                                  </div>
                                </div>

                                <div className="flex gap-4 flex-wrap">
                                  {weekdaysMap.map((weekdayObj) => (
                                    <div
                                      className={`rounded-md p-2 px-4 shadow-custom-all-sides font-medium cursor-pointer  ${
                                        selectedWeekdays?.includes(
                                          weekdayObj.index
                                        )
                                          ? // &&
                                            // weekdayObj.isActive
                                            "bg-green-400 text-white "
                                          : "bg-white"
                                      }`}
                                      key={weekdayObj.day}
                                      //   className={`btn mr-2 ${
                                      //     selectedWeekdays?.includes(
                                      //       weekdayObj.index
                                      //     )
                                      //       ? // &&
                                      //         // weekdayObj.isActive
                                      //         "btn btn-selected"
                                      //       : "btn btn-unselectedc"
                                      //   }`}
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
                        </>
                      )}

                      <div className="col-md-6 mb-3 ">
                        {/* <button class="nextbtnself" id="confirmEmployeeDetails" type='submit' onClick={createTask}
                    >
                    {loading ? (
                      <div
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', }}>
                        <ThreeDots color="#fff" height={25} width={50} />
                      </div>
                    ) : (
                      "Create Task"
                    )}
                    
                    </button> */}
                        <div className="flex justify-center w-full">
                          <button
                            className="my-2 w-full border border-white shadow-custom-all-sides p-2 rounded-md text-white font-medium"
                            id="confirmEmployeeDetails"
                            type="button"
                            onClick={createTask}
                            style={{
                           
                              background: themeColor,
                            }}
                          >
                            {/* {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                          <ThreeDots color="#fff" height={25} width={50} />
                        </div>
                      ) : (
                        "Create Task"
                      )} */}
                            Create Task
                          </button>
                        </div>
                        {/* <div
                          className="col-md-6 spinner-border text-success ml-2 mt-4"
                          style={{ opacity: 0.7, display: showVerifiedLoader }}
                          role="status"
                        >
                          <span className="sr-only"></span>
                          </div> */}
                        </div>

                      {/* <div className="col-md-6 mt-4 imgtask"> */}
                        {/* {assignToOthers ?
                      <img style={{ width: '80%', height: "125%", marginLeft: '40px', marginTop: '-100px' }} src={require('../../../Static/images/businesswoman leaning on big clock with arms crossed.png')} alt="" /> : <img style={{ width: '75%', height: "75%", marginLeft: '20px' }} src={require('../../../Static/images/laptop and charts.png')} alt="" />} */}
                        {/* {assignToOthers ? (
                      <img
                        style={{
                          width: "70%",
                          height: "125%",
                          marginLeft: "120px",
                          marginTop: "-90px",
                        }}
                        src={require("../../../Static/images/businesswoman leaning on big clock with arms crossed.png")}
                        alt=""
                      />
                    ) : (
                      <img
                        style={{
                          width: "75%",
                          height: "75%",
                          marginLeft: "20px",
                        }}
                        src={require("../../../Static/images/laptop and charts.png")}
                        alt=""
                      />
                    )} */}
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryTaskSelf;
