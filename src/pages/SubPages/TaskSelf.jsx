import React, { useState, useRef, useEffect } from "react";
// import "./EmployeeTaskSelf.css";
// import '../employee/EmployeeTaskSelf.css'


import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactSwitch from "react-switch";
import { ThreeDots } from "react-loader-spinner";
import Modal from "react-modal";
import { useMediaQuery } from "react-responsive";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SendDueDateFormat } from "../../../utils/employee/dateUtils";

function TaskSelf({ onClose }) {
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
        <span
          style={{ color: "#000", fontWeight: "bold", marginBottom: "0rem" }}
        >
          Urgent
        </span>
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

  const [task_topic, setTaskTopic] = useState("");
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

  const [selectedWeekdays, setSelectedWeekdays] = useState([]);

  const [weekdaysMap, setWeekdaysMap] = useState([
    { day: "Mon", index: 0, isActive: false },
    { day: "Tues", index: 1, isActive: false },
    { day: "Wed", index: 2, isActive: false },
    { day: "Thurs", index: 3, isActive: false },
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
        <label
          style={{
            color: "#000",
            fontWeight: "bold",
            marginBottom: "0rem",
            marginTop: "0px",
            fontWeight: 700,
          }}
        >
          Repeat
        </label>
        <div
          className="app"
          //  style={{ marginTop: '25px', marginLeft: '10px' }}
        >
          {/* <p style={{ color: '#000', fontWeight: 'bold', marginBottom: '0rem' }}>Urgent</p> */}
          <ReactSwitch checked={checkedRepeat === 1} onChange={handleChange} />
        </div>
      </>
    );
  }

  const createTask = () => {
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
      const user_id = localStorage.getItem("user_id");

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
      postDataToAPI(AddBoardChecklistTask, formData)
        .then((response) => {
          if (response.success) {
            setLoading(false);
            onClose();
            window.location.reload();
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
        })
        .catch((error) => {
          setLoading(false);
          setShowVerifiedButton("block");
          setShowVerifiedLoader("none");
        })
        .finally(() => {
          setLoading(false);
          setIsCreatingTask(false);
          setShowVerifiedButton("block");
          setShowVerifiedLoader("none");
        });
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

      const user_id = localStorage.getItem("user_id");
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
      postDataToAPI(AddBoardChecklistTask, formData)
        .then((response) => {
          if (response.success) {
            setLoading(false);
            onClose();
            window.location.reload();
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
        })
        .catch((error) => {
          setLoading(false);
          //alert('Please check your internet and try again!');
          setShowVerifiedButton("block");
          setShowVerifiedLoader("none");
        })
        .finally(() => {
          setIsCreatingTask(false);
          setLoading(false);
          setShowVerifiedButton("block");
          setShowVerifiedLoader("none");
        });
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
      const user_id = localStorage.getItem("user_id");
      const org_id = localStorage.getItem("organization_id");

      try {
        const params = {
          user_id: user_id,
          org_id: org_id,
        };

        const jsonData = await getDataFromAPI(GetUsers, params);

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
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      className="datepickers"
      onClick={onClick}
      value={value}
      ref={ref}
      placeholder="Select Date and Time"
      style={{
        backgroundColor: "white",
        color: "black",
        width: windowWidth <= 768 ? "150%" : "192%",
      }}
    />
  ));
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
      <ToastContainer limit={1} />
      {modalTaskSelfIsOpen && <TaskSelf onClose={closeTaskSelf} />}
      {/* {modalTaskRepeatDaysIsOpen && (
        <TaskRepeatDays
          open={openTaskRepeatDays}
        />
      )} */}
      <div className="popupself-background">
        <div className="popupself">
          <div class="modal-content">
            <div class="modal-body">
              <div
                class="pdEmplyself"
                style={{
                  overflowY: assignToOthers ? "scroll" : "scroll",
                  // , scrollbarWidth: 'thin'
                }}
              >
                <div
                  class="pdEmplyself-header "
                  // style={{ position: 'sticky', top: -20, zIndex: 10, background: assignToOthers ? 'linear-gradient(to right, white 68.6%, #132A3A 0%)' : 'linear-gradient(to right, white 68.7%, #132A3A 0%)' }}
                >
                  <div class="pdEmplyself-title">
                    <div class="col-md-12" style={{ display: "flex" }}>
                      <h2
                        class="col-md-8"
                        style={{ color: "#000", marginTop: "10px" }}
                      >
                        Create Task
                      </h2>
                      <img
                        onClick={onClose}
                        class=" col-md-5 closebtn"
                        src={ClosePopUp}
                        alt=""
                        style={{
                          maxWidth: "7%",
                          height: "7%",
                          marginLeft: width < 500 ? "0" : "265px",
                          top: "10px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <a onClick={handleSelfTask}>
                      {" "}
                      <button
                        className={`button-1a ${
                          isSelfTaskActive ? "active" : ""
                        }`}
                      >
                        Self Task
                      </button>{" "}
                    </a>
                    <a onClick={handleAssignToOthers}>
                      {" "}
                      <button
                        class={`button-2a ${
                          isAssignToOthersActive ? "active" : ""
                        }`}
                      >
                        Assign to others
                      </button>{" "}
                    </a>
                  </div>
                </div>

                <div
                  class="pdEmplyself-main col-md-12 row"
                  style={{ color: "black" }}
                >
                  <div class="col-md-6 " style={{ marginBottom: "0rem" }}>
                    <label style={{ marginTop: "20px", marginBottom: "0rem" }}>
                      Task Topic
                    </label>
                    <label style={{ color: "#f44336", marginBottom: "0rem" }}>
                      &nbsp; *{" "}
                    </label>
                    <br />
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
                      type="text"
                      spellcheck={true}
                      value={task_topic}
                      onChange={(e) => setTaskTopic(e.target.value)}
                    />
                  </div>
                  {/* <div class="col-md-6"  >
                                            <label style={{marginTop:'20px',  marginBottom: '0rem' }}>Due</label><br/>
                                            <input type="datetime-local" class="datepickers" value={due_date} onChange={(e) => setDueDate(e.target.value)} style={{backgroundColor:'white'}}/>
                                        </div> */}
                  <div className="col-md">
                    <label style={{ marginTop: "20px", marginBottom: "0rem" }}>
                      Due Date
                    </label>
                    <label style={{ color: "#f44336", marginBottom: "0rem" }}>
                      &nbsp; *{" "}
                    </label>
                    <br />
                    <DatePicker
                      selected={due_date}
                      onChange={(date) => setDueDate(date)}
                      showTimeSelect
                      timeIntervals={5}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      className="datepickers_date"
                      customInput={<CustomInput />}
                      minDate={new Date()}
                      filterTime={filterTime}
                    />
                  </div>

                  <div class="col-md-6 " style={{ marginBottom: "0rem" }}>
                    <label style={{ marginTop: "20px", marginBottom: "0rem" }}>
                      Task Description
                    </label>
                    <br />
                    <textarea
                      style={{ resize: "none" }}
                      type="text"
                      spellcheck={true}
                      value={task_description}
                      maxLength={250}
                      onChange={(e) => setTaskDescription(e.target.value)}
                    />
                  </div>
                  <div class="col-md-6">
                    <label style={{ marginTop: "20px", marginBottom: "0rem" }}>
                      Attachment
                    </label>
                    <br />
                    <input
                      style={{
                        border: "#929090 dotted 2px",
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
                    <div class="col-md-6">
                      <label
                        style={{ marginTop: "20px", marginBottom: "0rem" }}
                      >
                        Assign
                      </label>
                      <br />
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
                      <div class="row col-md-6 mt-4 ">
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
                          <label className="ml-2">Repeat</label>
                          <hr className="mb-0 mt-0"></hr>

                          <div className="col-md-12 row">
                            <div className="col-md-5 mt-3">
                              <div className="repeat">
                                <label className="mr-1">
                                  <span>FROM DATE</span>
                                </label>
                                <br></br>

                                <input
                                  value={from_due_date}
                                  spellcheck="true"
                                  onChange={(e) =>
                                    setFromDueDate(e.target.value)
                                  }
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
                            </div>
                            {/* <div className='col-md-2'></div> */}
                            <div className="col-md-5 mt-3">
                              <div className="repeat">
                                <label className="mr-1">
                                  <span>TO DATE</span>
                                </label>
                                <br></br>

                                <input
                                  value={to_due_date}
                                  spellcheck="true"
                                  onChange={(e) => setToDueDate(e.target.value)}
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
                            </div>
                          </div>

                          <div className="col-md-12 row">
                            <div className="col-md-4 mt-3">
                              <label className="mr-1">
                                <span>TIME</span>
                              </label>
                              <br></br>
                              <input
                                type="time"
                                value={taskTime}
                                onChange={(event) =>
                                  setTaskTime(event.target.value)
                                }
                              />
                            </div>
                            {/* <div className="col-md-6 mt-3">
                                <label className='mr-1'><span>TO DATE</span></label><br></br>
                                <input type="date" class="datepicker" min={todayDate} value={selectedToDate} onChange={(event) => setSelectedToDate(event.target.value)} />
                                </div> */}
                          </div>

                          <div className="col-md-12 ml-1 mt-4">
                            <div class="row mt-2 mb-1 ml-4">
                              <span>SELECT WORKING DAYS</span>
                              <div
                                class="row mt-0 mb-0 ml-4"
                                style={{ color: "#000" }}
                              >
                                <span
                                  style={{
                                    display: "flex",
                                    color: "#000",
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
                                      color: "#000",
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
                                    color: "#000",
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

                            <div className="row ml-4 m-3 mt-2 ">
                              {weekdaysMap.map((weekdayObj) => (
                                <div
                                  style={{
                                    width:
                                      screenWidth >= 1200 && screenWidth <= 1440
                                        ? "10%"
                                        : "",
                                    marginBottom: 4,
                                  }}
                                  key={weekdayObj.day}
                                  className={`btn mr-2 ${
                                    selectedWeekdays?.includes(weekdayObj.index)
                                      ? // &&
                                        // weekdayObj.isActive
                                        "btn btn-selected"
                                      : "btn btn-unselectedc"
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
                    </>
                  )}

                  <div class="col-md-6 mb-3 ">
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
                    <button
                      class="nextbtnself"
                      id="confirmEmployeeDetails"
                      type="button"
                      onClick={createTask}
                      style={{
                        display: showVerifiedButton,
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

                    <div
                      className="col-md-6 spinner-border text-success ml-2 mt-4"
                      style={{ opacity: 0.7, display: showVerifiedLoader }}
                      role="status"
                    >
                      <span className="sr-only"></span>
                    </div>
                  </div>

                  <div class="col-md-6 mt-4 imgtask">
                    {/* {assignToOthers ?
                      <img style={{ width: '80%', height: "125%", marginLeft: '40px', marginTop: '-100px' }} src={require('../../../Static/images/businesswoman leaning on big clock with arms crossed.png')} alt="" /> : <img style={{ width: '75%', height: "75%", marginLeft: '20px' }} src={require('../../../Static/images/laptop and charts.png')} alt="" />} */}
                    {assignToOthers ? (
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
                    )}
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

export default TaskSelf;
