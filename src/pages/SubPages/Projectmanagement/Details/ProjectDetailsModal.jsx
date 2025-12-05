import React, { useRef, useState } from "react";
import { AiOutlineClose, AiOutlineUserAdd } from "react-icons/ai";
import { FaCheck, FaComment, FaComments, FaLongArrowAltRight, FaPencilAlt, FaRegCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import Select from "react-select";
import { getItemInLocalStorage } from "../../../../utils/localStorage";
import DatePicker from "react-datepicker";
import { SendDueDateFormat } from "../../../../utils/dateUtils";
import { Updatetaskchecklist, updateTaskStatus, updateVibeUserTask } from "../../../../api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { toggle } from "../../../../features/Project/Added";
const ProjectDetailsModal = ({
  onclose,
  taskTopicText,
  setTaskTopicText,
  UpdateUserTask,
  taskDescription,
  setTaskDescription,
  taskid,
  createdBy_id,
  handleIconClick3,
  selectedEmail,
  isModalOpen3,
  setIsModalOpen3,
  selectedEmail3,
  usersAssignBoard3,
  setSelectedEmail3,
  handleConfirmClick3,
  setIsModalOpennn,
  isModalOpennn,
  TempdueDate,
  dueDate,
  handleDateChange1,
  setDueDate, 
  setIsModalOpenn,
  taskStatus,
  taskMoreStatus, 
  setTaskStatus,
  settaskMoreStatus,
  isModalOpenn,
  taskMoreStatusList,
  taskMoreStatusIdList ,
  currentTaskId,
  settaskMoreStatusId,
  GetBoardData,
  taskMoreSectionList,
  taskMoreSectionIdList,
  taskMoreSection,
  settaskMoreSection
}) => {
  const user_id = getItemInLocalStorage("VIBEUSERID");
  const themeColor = useSelector((state) => state.theme.color);
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false);

  const datePickerRef = useRef(null);

  const inputRef = useRef();
  const handleIconClickText = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const options3 = usersAssignBoard3.map((user) => ({
    value: user.user_id,
    label: user.email,
  }));
  const handleDropdownItemClick3 = (selectedOption) => {
    setSelectedEmail3(selectedOption);
    console.log(selectedOption);
  };
console.log(selectedEmail)

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

const Update_Task_Duedate = async (user_id, taskid, dueDate) => {
  if (!dueDate) {
    return;
  }
  const formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("task_id", taskid);
  formData.append("due_date", SendDueDateFormat(dueDate));

  try {
    const res = await  updateVibeUserTask(formData);

    if (res.success) {
      console.log("Success");
      setDueDate(dueDate);
    }
  } catch (error) {
    toast.error("Please Check Your Internet , Try again! ", {
      position: "top-center",
      autoClose: 2000,
    });
  } finally {
  }
};

const handleModalClose = ()=>{
  setIsModalOpennn(false)
}
const [newStatus, setNewStatus] = useState({
  value: taskStatus,
  label: taskStatus,
});
console.log(newStatus)

const handleStatusChange = (selectedOption) => {
  console.log(selectedOption);
  setNewStatus(selectedOption);
};
const openModall = (taskupdateid, currentTaskStatus) => {
  console.log(currentTaskStatus)
  console.log(currentTaskStatus);
  console.log(taskupdateid);
  setIsModalOpenn(true);
  
  setNewStatus({ value: currentTaskStatus, label: currentTaskStatus });
};
const statusOptions = taskMoreStatusList.map((status, index) => ({
  value: taskMoreStatusIdList[index],
  label: status,
}));

const UpdatetaskStatus = async (taskid) => {
  if (newStatus.value=== taskMoreStatus) {
    setIsModalOpenn(false);
    return;
  }
  if (!newStatus.value) {
    newStatus.value = taskStatus;
  }

  console.log(newStatus.value);
  setTaskStatus(newStatus.value);

  const formData = new FormData();

  formData.append("task_id", currentTaskId);
  formData.append("status", newStatus.value);
  formData.append("user_id", user_id);

  try {
    const response = await  updateTaskStatus(formData);
    console.log(response);
    if (response.success) {
      if (response.status !== 123) {
        setIsModalOpenn(false)
        settaskMoreStatus(newStatus.label);
        settaskMoreStatusId(newStatus.value);
        console.log("boardData")
        GetBoardData(id);
        toast.success("Status updated successfully")
      }
      
      if (response.status === 123) {
        // alert(response.message)
        toast.error(`${response.message}`, {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }
      if (response.status === 124) {
        // alert(response.message)
        toast.error(`${response.message}`, {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }
    } else {
      console.log("boardData2")
      alert("unable to update")
    }
  } catch (error) {}
};
const [taskSection, setTaskSection] = useState("");
const [newSections, setNewSections] = useState({
  value: taskSection,
  label: taskSection,
});

const [isModalOpenSection, setIsModalOpenSection] = useState(false);
const openModalSection = (taskupdateid, currentTaskSection) => {
  console.log(currentTaskSection);
  console.log(taskupdateid);
  setNewSections({ value: currentTaskSection, label: currentTaskSection });
  setIsModalOpenSection(true);
  
};

const closeModalSection = () => {
  setIsModalOpenSection(false);
  
  setNewSections({ value: "", label: "" });
};

const handleSectionChange = (selectedOption) => {
  console.log(selectedOption);
  setNewSections(selectedOption);
};

const sectionOptions = taskMoreSectionList.map((section, index) => ({
  value: taskMoreSectionIdList[index],
  label: section,
}));

const UpdatetaskSection = async (taskid) => {
  if (!newSections.value) {
    newSections.value = taskStatus;
  }

  console.log(newSections.value);
  setTaskSection(newSections.value);

  const formData = new FormData();

  formData.append("task_id", taskid);
  formData.append("user_id", user_id);
  formData.append("checklist_id", newSections.value);

  try {
    const response = await Updatetaskchecklist(formData);
    console.log(response);
    if (response.success) {
      //alert('Success');
      dispatch(toggle())
      console.log(newSections.label);
      console.log(newSections.value);

      settaskMoreSection(newSections.label);
    
      closeModalSection();
      if (response.status === 403) {
        // alert(response.message)
        toast.error(`${response.message}`, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } else {
      //alert("unable to update")
    }
  } catch (error) {}
};



  return (
    <div>
      {/* <Modal
          isOpen={isModalChatOpen}
          onRequestClose={closeChatModal}
          contentLabel="Add Project Name Popup Modal"
          style={modalStyleChatName}
        > */}
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50 p-10 ">
        <div
          style={{ background: themeColor }}
          className=" md:w-auto w-full  p-4 md:px-10  flex flex-col rounded-lg  max-h-[100%] hide-scrollbar "
        >
          <button
            className="place-self-end fixed p-1 rounded-full z-30  bg-white"
            onClick={onclose}
          >
            <AiOutlineClose size={20} />
          </button>
          <div className="overflow-auto hide-scrollbar mt-5">
            <div
              className=""
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div
                style={{
                  position: "relative",
                  color: "#fff",
                  height: "48%",
                  width: 600,
                  marginRight: "1%",
                }}
              >
                <div
                  className=""
                  style={{
                    textAlign: "start",
                    fontSize: "20px",
                    borderRadius: 8,
                    transition: "background-color 0.3s ease",
                    padding: "2px",
                  }}
                >
                  {isEditing ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <input
                        ref={inputRef}
                        spellcheck="true"
                        value={taskTopicText}
                        onChange={(e) => setTaskTopicText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            setIsEditing(false);
                            UpdateUserTask(taskid, taskTopicText);
                          }
                        }}
                        onBlur={() => {
                          setIsEditing(false);
                          UpdateUserTask(taskid, taskTopicText);
                        }}
                        style={{
                          // border: "none",
                          width: "95%",

                          paddingLeft: 4,
                          paddingRight: 4,
                        }}
                        className="bg-transparent outline-none border-b border-gray-300"
                      />
                      <span
                        onClick={() => {
                          setIsEditing(false);
                          UpdateUserTask(taskid, taskTopicText);
                        }}
                      >
                        <FaCheck
                          style={{
                            marginLeft: 20,
                            marginRight: 20,
                            fontSize: 14,
                            color: "white",
                          }}
                          className="cursor-pointer"
                        />
                      </span>
                    </div>
                  ) : (
                    <div
                      onClick={() => setIsEditing(true)}
                      className="flex gap-2 items-center"
                    >
                      {taskTopicText}
                      <span onClick={handleIconClickText}>
                        <FaPencilAlt
                          style={{ fontSize: 14 }}
                          title="Edit"
                          className="cursor-pointer"
                        />
                      </span>
                    </div>
                  )}
                </div>

                {/* assign */}
                <div className="flex-wrap" style={{ display: "flex" }}>
                  <div className="">
                    {createdBy_id === user_id ||
                    (Array.isArray(selectedEmail) &&
                      selectedEmail.some(
                        (item) => item.value === user_id
                      )) ? (
                      <div
                        className="pl-2 flex gap-2 mx-2 p-1 items-center hover:shadow-custom-all-sides  rounded-md duration-200 transition-all"
                        style={{
                          // height: "20",
                          // width: "20",
                          color: "white",
                          // borderRadius: 10,
                          backgroundColor: "",
                          // padding: "5px",
                          cursor: "pointer",
                        }}
                        onClick={handleIconClick3}
                      >
                       
                        <AiOutlineUserAdd size={20}  /> 
                        Assign
                      </div>
                    ) : (
                      <div
                        className="pl-2 text-gray-400 mx-2 cursor-not-allowed flex gap-2 items-center  p-1 "
                        style={{
                          height: "20",
                          width: "20",

                          // padding: "5px",
                        
                        }}
                      >
                        
                        <AiOutlineUserAdd size={20}  /> 
                        Assign
                      </div>
                    )}

                    {isModalOpen3 && (
                      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50 p-10 ">
                      <div
                        style={{ background: themeColor }}
                        className=" md:w-auto w-full  p-4 md:px-10  flex flex-col rounded-lg  max-h-[100%] hide-scrollbar "
                      >
      
                        <div className="overflow-auto hide-scrollbar my-2">
                            <div className="modal-header">
                              <h5 className="modal-title mb-2">Select Email Task</h5>
                            </div>
                            <div className="modal-body">
                              <Select
                                isMulti
                                options={options3}
                                value={selectedEmail3}
                                onChange={handleDropdownItemClick3}
                                isSearchable={true}
                                menuPortalTarget={document.body}
                                menuPosition="fixed"
                                styles={{
                                  menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999,
                                  }),
                                  menu: (provided) => ({
                                    ...provided,
                                    zIndex: 9999,
                                  }),

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
                                  option: (baseStyles) => ({
                                    ...baseStyles,
                                    color: "black",
                                  }),
                                  multiValueRemove: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: state.isFocused ? "red" : "gray",
                                    backgroundColor: state.isFocused
                                      ? "black"
                                      : "lightgreen",
                                  }),
                                }}
                              />
                            </div>

                            <div
                              className="my-2 flex gap-2 justify-end"
                           
                            >
                              <button
                                type="button"
                                className="bg-green-400 hover:bg-green-500 transition-all duration-200 text-white rounded-full p-1 px-4"
                                onClick={handleConfirmClick3}
                                disabled={!selectedEmail3}
                              >
                                Confirm
                              </button>
                              <button
                                type="button"
                                className="bg-red-400 hover:bg-red-500 transition-all duration-200 text-white rounded-full p-1 px-4"
                                onClick={()=>setIsModalOpen3(false)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  
                   <div className="">
                    {createdBy_id === user_id ||
                    // // || board.assign_to
                    (Array.isArray(selectedEmail) &&
                      selectedEmail.some(
                        (item) => item.value === user_id
                      )) ? (
                      <div
                        className="flex items-center gap-2 text-white cursor-pointer rounded-md hover:shadow-custom-all-sides p-1 transition-all duration-200"
                        onClick={()=>setIsModalOpennn(true)} // Attach onClick to the div
                      >
                        {" "}
                        <FaRegCalendarAlt
                         
                        />
                        {"Due Date"}
                      </div>
                    ) : (
                      <div
                       className="flex items-center gap-2 text-gray-400 cursor-not-allowed p-1"
                      >
                        <FaRegCalendarAlt
                          
                        />

                        {"Due Date"}
                      </div>
                    )}

                    <br />
                    {isModalOpennn && (
                      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50 p-10 ">
                      <div
                        style={{ background: themeColor }}
                        className=" md:w-auto w-full  p-2 md:px-5  flex flex-col rounded-lg  max-h-[100%] hide-scrollbar "
                      >
      
                        <div className="overflow-auto hide-scrollbar my-2">
                            <div className="modal-header">
                             
                              <h5 className="my-2 font-medium">Select Due Date</h5>
                            
                            </div>
                            <div
                              className="modal-body"
                              style={{ textAlign: "center" }}
                            >
                              <DatePicker
                                selected={TempdueDate ? TempdueDate : dueDate}
                                className="p-1 rounded-md w-60 text-black"
                                onChange={handleDateChange1}
                                showTimeSelect
                                dateFormat="dd/MM/yyyy h:mm aa"
                                ref={datePickerRef}
                                // minDate={currentDate}
                                timeIntervals={5}
                                minDate={new Date()}
                                // minTime={currentTime}
                                // maxTime={maxTime}
                                filterTime={filterTime}
                                placeholderText="Select Date and Time"
                              />
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                              <button
                                type="button"
                                className="bg-green-400 hover:bg-green-500 transition-all duration-200 text-white rounded-full p-1 px-4"
                                onClick={() => {
                                  Update_Task_Duedate(
                                    user_id,
                                    taskid,
                                    TempdueDate
                                  );
                                  handleModalClose();
                                  datePickerRef.current.setOpen(false);
                                }}
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="bg-red-400 hover:bg-red-500 transition-all duration-200 text-white rounded-full p-1 px-4"
                                onClick={()=> setIsModalOpennn(false)}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mx-2 ">
                    {(() => {
                      return createdBy_id === user_id ||
                        (Array.isArray(selectedEmail) &&
                          selectedEmail.some(
                            (item) =>
                              item.value === user_id
                          )) ? (
                        <div
                          className="flex items-center gap-2 text-white  cursor-pointer hover:shadow-custom-all-sides p-1 rounded-md"
                         
                          onClick={(e) => {
                            e.stopPropagation();
                            openModall(taskid, taskMoreStatus);
                          }}
                        >
                          <FaLongArrowAltRight
                            style={{ fontSize: 20}}
                          />{" "}
                          {taskMoreStatus.length > 8
                            ? `${taskMoreStatus.slice(0, 8)}..`
                            : taskMoreStatus}
                        </div>
                      ) : (
                        <div
                          className="flex items-center gap-2 text-gray-400 cursor-not-allowed p-1"
                          // style={{
                          //   textAlign: "center",
                          //   boxShadow: "0 2px 4px #0a283c",
                          //   backgroundColor: "#132A3A",
                          //   borderRadius: 10,
                          //   padding: "5px",
                          //   cursor: "pointer",
                          //   color: "#767676",
                          // }}
                        >
                          <FaLongArrowAltRight
                            style={{ fontSize: 20}}
                          />{" "}
                          
                          {taskMoreStatus.length > 8
                            ? `${taskMoreStatus.slice(0, 8)}..`
                            : taskMoreStatus}
                        </div>
                      );
                    })()}

                    
                   
                    {isModalOpenn && <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50 p-10 ">
                      <div
                        style={{ background: themeColor }}
                        className=" md:w-auto w-full  p-2 md:px-5  flex flex-col rounded-lg  max-h-[100%] hide-scrollbar "
                      >
      
                        <div className="overflow-auto hide-scrollbar my-2">
                      <h4 style={{ color: "white" }} className="my-2">Update Task Status</h4>
                      <Select
                        value={newStatus}
                        onChange={handleStatusChange}
                        className="w-64"
                        options={statusOptions}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          menu: (provided) => ({ ...provided, zIndex: 9999 }),

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
                          option: (baseStyles) => ({
                            ...baseStyles,
                            color: "black",
                          }),
                        }}
                        menuPortalTarget={document.body}
                      />
                      <div style={{ display: "flex", justifyContent: "end" }} className="my-2 gap-2">
                        <button
                          className="bg-green-400 hover:bg-green-500 transition-all duration-200 text-white rounded-full p-1 px-4"
                          onClick={() =>
                            UpdatetaskStatus(user_id, taskid, newStatus.value)
                          }
                        >
                          Save
                        </button>
                        <button className="bg-red-400 hover:bg-red-500 transition-all duration-200 text-white rounded-full p-1 px-4" onClick={()=>setIsModalOpenn(false)}>
                          Cancel
                        </button>
                      </div>
                      </div>
                      </div>
                      </div>}
                    {/* </Modal> */}
                  </div>

                  <div className="">
                    <div
                      className="flex items-center gap-2 p-1 hover:shadow-custom-all-sides rounded-md"
                      style={{
                        // textAlign: "start",
                        
                        backgroundColor: "",
                   
                        // padding: "5px",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                       
                        openModalSection(taskid, taskMoreSection);
                      }}
                      title={taskMoreSection}
                    >
                      <FaLongArrowAltRight
                        style={{ fontSize: 20, color: "white" }}
                      />{" "}
                      {taskMoreSection.length > 6
                        ? `${taskMoreSection}`
                        : taskMoreSection}
                    </div>

                    
                    {/* <Modal
                      isOpen={isModalOpenSection}
                      onRequestClose={closeModalSection}
                      style={customStyles}
                      contentLabel="Update Task Section"
                    > */}
                   {isModalOpenSection &&
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50 p-10 ">
                      <div
                        style={{ background: themeColor }}
                        className=" md:w-auto w-full  p-2 md:px-5  flex flex-col rounded-lg  max-h-[100%] hide-scrollbar "
                      >
                        <div className="overflow-auto hide-scrollbar my-2">
                      <h4 style={{ color: "white" }} className="my-2">Update Task Section</h4>
                      <Select
                        value={newSections}
                        onChange={handleSectionChange}
                        options={sectionOptions}
                        className="w-64"
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          menu: (provided) => ({ ...provided, zIndex: 9999 }),

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
                          option: (baseStyles) => ({
                            ...baseStyles,
                            color: "black",
                          }),
                        }}
                        menuPortalTarget={document.body}
                      />
                     
                      <div style={{ display: "flex", justifyContent: "end" }} className="gap-2 my-2">
                        <button
                           className="bg-green-400 hover:bg-green-500 transition-all duration-200 text-white rounded-full p-1 px-4"
                          onClick={() =>
                            UpdatetaskSection(taskid, newStatus.value)
                          }
                        >
                          Save
                        </button>
                        <button
                           className="bg-red-400 hover:bg-red-500 transition-all duration-200 text-white rounded-full p-1 px-4"
                          onClick={closeModalSection}
                        >
                          Cancel
                        </button>
                      </div>
                      </div>
                      </div>
                      </div>}
                    {/* </Modal> */}
                  </div>
                {/* <div className="flex"> */}
                  <div >
                    <div
                     className="flex items-center gap-2 p-1 ml-2"
                      // onClick={openModalChat} //for tab and mbl
                      // onClick={openModalChatWeb}
                      // onClick={isWideScreen ? openModalChatWeb :  openModalChat}
                      // onClick={() => {
                      //   // handleToggleComments("chat");
                      //   handleCloseChatModal();
                      //   isWideScreen ? openModalChatWeb() : openModalChat();
                      // }}
                    >
                      <FaComments
                        style={{
                          fontSize: 20,
                          color: "white",
                          marginRight: "6",
                          textAlign: "center",
                        }}
                      />
                      {"   "}Chat
                    </div>
                  </div>
                  <div className=" ">
                    <div
                      className="flex gap-2 items-start ml-4 p-1"
                      // onClick={openModalChat} //for tab and mbl
                      // onClick={openModalChatWeb}
                      // onClick={isWideScreen ? openModalChatWeb :  openModalChat
                      // }
                      // onClick={() => {
                      //   // handleToggleComments("comments");
                      //   handleCloseCommentModal();
                      //   isWideScreen ? openModalChatWeb() : openModalChat();
                      // }}

                      // onClick={handleToggleComments}
                    >
                      <FaComment
                        style={{
                          fontSize: 20,
                          color: "white",
                          marginRight: "6",
                          textAlign: "center",
                        }}
                      />
                      {"   "}Comments
                    </div>
                  </div>
                  {/* {isModalOpenSubDateRequest && (
                    <div
                      className="modal"
                      style={{ display: "block", height: "450px" }}
                    >
                      <div className="modal-dialog">
                        <div
                          className="modal-content"
                          style={{ background: "#133953" }}
                        >
                          <div className="modal-header">
                           
                            <h5 className="modal-title">
                              Select Request Due Date{" "}
                            </h5>
                            <button
                              type="button"
                              className=" btn_clo close"
                              onClick={handleModalCloseSubDateRequest}
                            >
                              <span>&times;</span>
                            </button>
                          </div>
                          <div
                            className="modal-body"
                            style={{ textAlign: "center" }}
                          >
                            <DatePicker
                              selected={subTaskDueDateRequest}
                              onChange={(date) =>
                                setSubTaskDueDateRequest(date)
                              }
                              showTimeSelect
                              dateFormat="dd/MM/yyyy h:mm aa"
                              timeIntervals={5}
                              ref={datePickerRefSubDateRequest}
                              minDate={new Date()}
                              // minTime={currentTime}
                              // maxTime={maxTime}
                              filterTime={filterTime}
                              placeholderText="Select Date and Time Request"
                            />
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => {
                                handleDateChangeSubDateRequest(
                                  taskid,
                                  subTaskDueDateRequest
                                );
                                handleModalCloseSubDateRequest();
                                datePickerRefSubDateRequest.current.setOpen(
                                  false
                                );
                              }}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={handleModalCloseSubDateRequest}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )} */}

                  <div className="flex items-start gap-2 text-white  cursor-pointer hover:shadow-custom-all-sides p-1 ml-2 rounded-md ">
                    <div
                      // style={{
                      //   height: "20",
                      //   width: "20",
                      //   color: "white",
                      //   borderRadius: 10,
                      
                     
                      //   // padding: "5px",
                      //   cursor: "pointer",
                      // }}
                      //  onClick={() => { handleIconClickMainTaskDependency(taskid)}}
                      // onClick={handleIconClickMainTaskDependency}
                    >
                      Dependency
                    </div>
                  </div>
                  {/* {isModalOpenMainTaskDependency && (
                    <div
                      className="modal "
                      tabIndex="-1"
                      role="dialog"
                      style={{ display: "block", height: "auto" }}
                    >
                      <div className="modal-dialog " role="document">
                        <div
                          className="modal-content back_ground"
                          style={{ background: "#133953" }}
                        >
                          <div className="modal-header">
                            <h5 className="modal-title">Select Dependency</h5>
                            <button
                              type="button"
                              className="btn_clo close"
                              data-dismiss="modal"
                              aria-label="Close"
                              onClick={closeModalMainTaskDependency}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                           
                            <Select
                              isMulti
                              value={selectedMainTasks}
                              onChange={handleChangeSelectMainTitle}
                              options={optionsMain}
                              placeholder="Select tasks..."
                              isSearchable={true}
                              menuPortalTarget={document.body}
                              menuPosition="fixed"
                              noOptionsMessage={() => "Tasks not available..."}
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                                menu: (provided) => ({
                                  ...provided,
                                  zIndex: 9999,
                                }),
                                placeholder: (base) => ({
                                  ...base,
                                  color: "black",
                                }),
                                clearIndicator: (base) => ({
                                  ...base,
                                  color: "red",
                                }),
                                dropdownIndicator: (base) => ({
                                  ...base,
                                  color: "black",
                                }),
                                control: (base) => ({
                                  ...base,
                                  borderColor: "darkblue",
                                }),
                                multiValueRemove: (base, { isFocused }) => ({
                                  ...base,
                                  color: isFocused ? "red" : "gray",
                                  backgroundColor: isFocused
                                    ? "black"
                                    : "lightgreen",
                                }),
                                option: (base) => ({
                                  ...base,
                                  color: "black",
                                }),
                                // menu: base => ({
                                //   ...base,
                                //   // maxHeight: '150px', // Adjust the height as needed
                                //   overflowY: 'auto'
                                // })
                              }}
                            />
                          </div>
                          <div
                            className="modal-footer"
                            style={{ paddingTop: 54 }}
                          >
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={closeModalMainTaskDependency}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                handleConfirmClickDependency();
                              }}
                              disabled={!selectedMainTasks.length}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )} */}
                {/* </div> */}
                </div>


                {/* {isMobileScreen ? (
                  <>
                    <Modal
                      isOpen={isChatOpenn}
                      onRequestClose={closeModalChat}
                      style={customStylesChatbox}
                      contentLabel="chat box"
                    >
                      <button className="close" onClick={closeModalChat}>
                        &times;
                      </button>
                      {!showComments ? (
                        <>
                          <div
                            style={{
                              borderRadius: 5,
                              textAlign: "center",
                            }}
                          >
                            CHAT & ACTIVITY
                          </div>
                          <hr />
                          <div
                            className="chat-container"
                            ref={chatContainerRef}
                          >
                            {chatsData.length === 0 ? (
                              <div
                                style={{
                                  textAlign: "center",
                                  paddingTop: "20px",
                                }}
                              >
                                No chats available
                              </div>
                            ) : (
                              chatsData.map((chat) => (
                                <div
                                  key={chat.id}
                                  className={
                                    chat.sender_id?.toString() ===
                                    localStorage.getItem("user_id").toString()
                                      ? "my-chat"
                                      : "other-chat"
                                  }
                                >
                                  <div
                                    className="abc"
                                    style={{
                                      borderRadius: 5,
                                      backgroundColor: "#30678edc",
                                      color: "#fff",
                                      padding: "4px 10px",
                                    }}
                                  >
                                    <b style={{ color: "#10DF95" }}>
                                     
                                      {chat.sender_id?.toString() ===
                                      localStorage.getItem("user_id").toString()
                                        ? "You"
                                        : `${chat.username}`}
                                    </b>
                                    <br />
                                   
                                    {renderMessageContent(
                                      chat.message,
                                      chat.file_size
                                    )}
                                  </div>
                                  <span
                                    style={{ fontSize: 10, color: "#ededed" }}
                                  >
                                    {new Date(chat.created_at).toLocaleString()}
                                  </span>
                                </div>
                              ))
                            )}

                           
                          </div>

                          <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                            style={{ display: "none" }}
                            onChange={handleFileChangeForChatFile}
                            ref={fileInputRef}
                          />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <div
                              style={{ position: "relative", width: "100%" }}
                            >
                              <input
                                placeholder="Type your message here..."
                                spellCheck="true"
                                style={{
                                  color: "white",
                                  borderRadius: 4,
                                  fontSize: 16,
                                  backgroundColor: "#30678e76",
                                  paddingLeft: 40, // Adjust padding to accommodate the icon
                                  padding: 8,
                                  width: "100%",
                                  border: "none",
                                }}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                
                                tabIndex="0"
                              />
                              <FaPaperclip
                                onClick={() => fileInputRef.current.click()}
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  right: 10,
                                  transform: "translateY(-50%)",
                                  fontSize: 20,
                                  color: "white",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                            <FaPaperPlane
                              onClick={() => {
                                send_msg(message);
                                handleSubmit();
                              }}
                              style={{
                                marginTop: 10,
                                marginLeft: 8,
                                fontSize: 20,
                                color: "white",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              borderRadius: 5,
                              textAlign: "center",
                            }}
                          >
                            COMMENTS
                          </div>
                          <hr />
                          <div className="chat-container">
                            {commentsData.length === 0 ? (
                              <div
                                style={{
                                  textAlign: "center",
                                  paddingTop: "20px",
                                }}
                              >
                                No comments available
                              </div>
                            ) : (
                              commentsData.map((coment) => (
                                <div
                                  key={coment.id}
                                  className={
                                    coment.sender_id.toString() ===
                                    localStorage.getItem("user_id").toString()
                                      ? "my-chat"
                                      : "other-chat"
                                  }
                                >
                                  <div
                                    className="abc"
                                    style={{
                                      borderRadius: 5,
                                      backgroundColor: "#30678edc",
                                      color: "#fff",
                                      padding: "4px 10px",
                                    }}
                                  >
                                    <b style={{ color: "#10DF95" }}>
                                     
                                      {coment.username}
                                    </b>
                                    <br />
                                    {coment.message}
                                  </div>
                                  <span
                                    style={{ fontSize: 10, color: "#ededed" }}
                                  >
                                    {new Date(
                                      coment.created_at
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <input
                              placeholder="Type your message here..."
                              spellcheck="true"
                              style={{
                                color: "white",
                                marginRight: 8,
                                borderRadius: 4,
                                fontSize: 16,
                                backgroundColor: "#30678e76",
                                paddingLeft: 10,
                                padding: 8,
                                width: "100%",
                                border: "none",
                              }}
                              value={addComent}
                              onChange={(e) => setAddComent(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  send_Comment(addComent);
                                  // handleSubmitComment()
                                }
                              }}
                              tabIndex="0"
                            />
                            <FaPaperPlane
                              onClick={() => {
                                send_Comment(addComent);
                                // handleSubmitComment();
                              }}
                              style={{
                                marginTop: 10,
                                fontSize: 20,
                                color: "white",
                              }}
                            />
                          </div>
                        </>
                      )}
                    </Modal>
                  </>
                ) : (
                  <>
                    <Modal
                      isOpen={isChatOpenn}
                      onRequestClose={closeModalChat}
                      style={customStylesChatbox}
                      contentLabel="chat box"
                    >
                     
                      <button
                        type="button"
                        className=" btn_clo close"
                        onClick={closeModalChat}
                      >
                        <span>&times;</span>
                      </button>
                      {!showComments ? (
                        <>
                          <div
                            style={{
                              borderRadius: 5,
                              textAlign: "center",
                            }}
                          >
                            CHAT & ACTIVITY
                          </div>
                          <hr />
                          <div className="chat-container">
                            {chatsData.length === 0 ? (
                              <div
                                style={{
                                  textAlign: "center",
                                  paddingTop: "20px",
                                }}
                              >
                                No chats available
                              </div>
                            ) : (
                              chatsData.map((chat) => (
                                <div
                                  key={chat.id}
                                  className={
                                    chat.sender_id?.toString() ===
                                    localStorage.getItem("user_id").toString()
                                      ? "my-chat"
                                      : "other-chat"
                                  }
                                >
                                  <div
                                    className="abc"
                                    style={{
                                      borderRadius: 5,
                                      backgroundColor: "#30678edc",
                                      color: "#fff",
                                      padding: "4px 10px",
                                    }}
                                  >
                                    <b style={{ color: "#10DF95" }}>
                                       
                                      {chat.sender_id?.toString() ===
                                      localStorage.getItem("user_id").toString()
                                        ? "You"
                                        : `${chat.username}`}
                                    </b>
                                    <br />
                                   
                                    {renderMessageContent(
                                      chat.message,
                                      chat.file_size
                                    )}
                                  </div>
                                  <span
                                    style={{ fontSize: 10, color: "#ededed" }}
                                  >
                                    {new Date(chat.created_at).toLocaleString()}
                                  </span>
                                </div>
                              ))
                            )}

                            <div>
                              {messages.filter((chat) => !chat.read).map((chat) => (

                                        <div
                                          key={chat.id}
                                          
                                          className={
                                            chat.sender_id.toString() ===
                                              localStorage.getItem('user_id').toString()
                                              ? 'my-chat'
                                              : 'other-chat'
                                          }
                                          
                                          
                                        >
                                          
                                          <div
                                            className="abc"
                                            style={{
                                              borderRadius: 5,
                                              backgroundColor: '#30678edc',
                                              color: '#fff',
                                              padding: '4px 10px',
                                            }}
                                          >
                                            <b style={{ color: '#10DF95' }}>
                                            
                                               {chat.firstname} {chat.lastname}
                                            </b>
                                            <br />
                                            {chat.message}
                                          </div>
                                          <span style={{ fontSize: 10, color: '#ededed' }}> 
                                          
                                           
                                          
                                            {new Date().toLocaleString()}
                                          </span>

                                        </div>
                                        ))}
                            </div>
                          </div>

                          <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                            style={{ display: "none" }}
                            onChange={handleFileChangeForChatFile}
                            ref={fileInputRef}
                          />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <div
                              style={{ position: "relative", width: "100%" }}
                            >
                              <input
                                placeholder="Type your message here..."
                                spellCheck="true"
                                style={{
                                  color: "white",
                                  borderRadius: 4,
                                  fontSize: 16,
                                  backgroundColor: "#30678e76",
                                  paddingLeft: 40, // Adjust padding to accommodate the icon
                                  padding: 8,
                                  width: "100%",
                                  border: "none",
                                }}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                // onKeyDown={(e) => {
                                //   if (e.key === 'Enter') {
                                //     send_msg(message);
                                //     handleSubmit();
                                //   }
                                // }}
                                tabIndex="0"
                              />
                              <FaPaperclip
                                onClick={() => fileInputRef.current.click()}
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  right: 10,
                                  transform: "translateY(-50%)",
                                  fontSize: 20,
                                  color: "white",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                            <FaPaperPlane
                              onClick={() => {
                                send_msg(message);
                                handleSubmit();
                              }}
                              style={{
                                marginTop: 10,
                                marginLeft: 8,
                                fontSize: 20,
                                color: "white",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              borderRadius: 5,
                              textAlign: "center",
                            }}
                          >
                            COMMENTS
                          </div>
                          <hr />
                          <div className="chat-container">
                            {commentsData.length === 0 ? (
                              <div
                                style={{
                                  textAlign: "center",
                                  paddingTop: "20px",
                                }}
                              >
                                No comments available
                              </div>
                            ) : (
                              commentsData.map((coment) => (
                                <div
                                  key={coment.id}
                                  className={
                                    coment.sender_id.toString() ===
                                    localStorage.getItem("user_id").toString()
                                      ? "my-chat"
                                      : "other-chat"
                                  }
                                >
                                  <div
                                    className="abc"
                                    style={{
                                      borderRadius: 5,
                                      backgroundColor: "#30678edc",
                                      color: "#fff",
                                      padding: "4px 10px",
                                    }}
                                  >
                                    <b style={{ color: "#10DF95" }}>
                    
                                      {coment.username}
                                    </b>
                                    <br />
                                    {coment.message}
                                  </div>
                                  <span
                                    style={{ fontSize: 10, color: "#ededed" }}
                                  >
                                    {new Date(
                                      coment.created_at
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <input
                              placeholder="Type your message here..."
                              spellcheck="true"
                              style={{
                                color: "white",
                                marginRight: 8,
                                borderRadius: 4,
                                fontSize: 16,
                                backgroundColor: "#30678e76",
                                paddingLeft: 10,
                                padding: 8,
                                width: "100%",
                                border: "none",
                              }}
                              value={addComent}
                              onChange={(e) => setAddComent(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  send_Comment(addComent);
                                  // handleSubmitComment()
                                }
                              }}
                              tabIndex="0"
                            />
                            <FaPaperPlane
                              onClick={() => {
                                send_Comment(addComent);
                                // handleSubmitComment();
                              }}
                              style={{
                                marginTop: 10,
                                fontSize: 20,
                                color: "white",
                              }}
                            />
                          </div>
                        </>
                      )}
                    </Modal>
                  </>
                )} */}

                {/* {taskDescription !== undefined ? (
                  <div
                    className="col md-12 "
                    style={{
                      backgroundColor: "#133953",
                      borderRadius: 5,
                      maxWidth: "100%",
                      wordWrap: "break-word",
                      wordBreak: "break-all",
                      padding: "3px",
                      paddingLeft: 6,
                    }}
                    // onMouseEnter={(e) => e.target.style.background = '#132A3A'} onMouseLeave={(e) => e.target.style.background = '#133953'}
                  >
                    {isEditingDesc ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <input
                          ref={inputRef}
                          spellcheck="true"
                          value={taskDescription}
                          onChange={(e) => setTaskDescription(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              setIsEditingDesc(false);
                              UpdateUserTask(taskid, taskDescription);
                            }
                          }}
                          onBlur={() => {
                            setIsEditingDesc(false);
                            UpdateUserTask(taskid, taskDescription);
                          }}
                          style={{
                            background: "#132A3A",
                            border: "none",
                            width: "100%",
                            color: "white",
                            paddingLeft: 4,
                            paddingRight: 4,
                            borderRadius: 4,
                          }}
                        />
                        <span
                          onClick={() => {
                            setIsEditingDesc(false);
                            UpdateUserTask(taskid, taskDescription);
                          }}
                        >
                          <FaCheck
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 14,
                              color: "white",
                            }}
                          />
                        </span>
                      </div>
                    ) : (
                      <div onClick={() => setIsEditingDesc(true)}>
                        {taskDescription}
                        <FaPencilAlt
                          onClick={handleIconClickDesc}
                          style={{ marginLeft: 10, fontSize: 14 }}
                          title="Edit"
                        />
                      </div>
                    )}
                  </div>
                ) : null} */}

                {/* <br></br>
                <div
                  className="row col-md-12 "
                  style={{ fontSize: 14, cursor: "default" }}
                >
                  <div className="col-md-12 mb-1" style={{ cursor: "default" }}>
                    Start Date : {SendDateFormat(startDate)}
                  </div>
                  <div className="col-md-12 mb-1" style={{ cursor: "default" }}>
                    End Date : {SendDateFormat(endDate)}
                  </div>
                  <div className="col-md-12 mb-1" style={{ cursor: "default" }}>
                    {" "}
                    Created By : {createdFirstName} {createdSecondName}
                  </div>
                  <div className="col-md-12 mb-1" style={{ cursor: "default" }}>
                    {" "}
                    Created Date : {FormattedDateToShowProperly(createdDate)}
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className="col mb-1" style={{ cursor: "default" }}>
                      {" "}
                      Due Date :{" "}
                      {dueDate && FormattedDateToShowProperly(dueDate)}
                    </div>
                    &nbsp;
                    {createdBy_id.toString() !== user_id && dueDate ? (
                      <img
                        title="Request to change Due Date"
                        className="mr-2 ml-0 "
                        src={require("../../../../Static/images/calendar_update.png")}
                        style={{ width: 16, height: 16 }}
                        onMouseEnter={() =>
                          setIsHoveredRequestedDateSubtask(true)
                        }
                        onMouseLeave={() =>
                          setIsHoveredRequestedDateSubtask(false)
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDueDateClickSubDateRequest();
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="col-md-12 mb-1" style={{ cursor: "default" }}>
                    {" "}
                    Assign To : {showStatusChecklist1}{" "}
                  </div>
                  <div className="col-md-12 mb-1" style={{ cursor: "default" }}>
                    {" "}
                    Depend On : {showTaskTitleMainDependency}{" "}
                  </div>
                </div>
                <br></br>

                <div style={{ margin: 4 }}>
                  <div className="col-md-12 row">
                    <div
                      className="col-md-12 p-1"
                      //  onMouseEnter={(e) => e.target.style.background = '#132A3A'}
                      //   onMouseLeave={(e) => e.target.style.background = '#133953'}
                      style={{ borderRadius: 4, cursor: "default" }}
                    >
                      Checklist
                    </div>
                  </div>
                  <Modal
                    isOpen={isModalOpenDelete}
                    onRequestClose={closeModalDelete}
                    contentLabel="Modal"
                    style={customStylesDelete}
                  >
                    <div>
                      <div
                        className="col-md-12 p-1"
                        style={{
                          color: "white",
                          borderRadius: 4,
                          backgroundColor: checklistDeleteHovered
                            ? "rgba(0, 0, 0, 0.4)"
                            : "initial",
                        }}
                        onMouseEnter={handleChecklistDeleteMouseEnter}
                        onMouseLeave={handleChecklistDeleteMouseLeave}
                      >
                        Delete
                      </div>
                    </div>
                  </Modal>
                  <hr style={taglineStyle}></hr>
                  {items.map((item, i) => (
                    <div
                      key={i}
                      className="col-md-12 row m-1 p-1"
                      style={{ borderRadius: 4, backgroundColor: "#30678edc" }}
                    >
                      <div
                        htmlFor={`item-${i}`}
                        style={{
                          fontSize: "normal",
                          cursor: "default",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        className="col-md-12 pl-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemToggleSubChecklist(i, item.id);
                        }}
                      >
                        <div
                          className="col-md-12  ml-1 mb-2"
                          style={{
                            textAlign: "start",
                            borderRadius: 8,
                            transition: "background-color 0.3s ease",
                            padding: "2px",
                          }}
                        >
                          <div
                            className="col-md-12 row m-0"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <span
                              title={
                                item.completed === true
                                  ? "Click to Mark as Incomplete"
                                  : "Click to Mark as Completed"
                              }
                              className={` ${
                                !item.completed ? "not-completed" : "completed"
                              }`}
                              onClick={() =>
                                handleToggleCompletion(
                                  item.id,
                                  item.completed,
                                  i
                                )
                              }
                              style={{
                                justifyContent: "flex-end",
                                fontSize: 16,
                              }}
                            >
                              {item.completed ? (
                                <i
                                  className="fa fa-check-circle pt-1"
                                  style={{ fontSize: 14 }}
                                ></i>
                              ) : null}{" "}
                              {item.completed === true
                                ? "Completed"
                                : "Mark as Completed"}
                            </span>
                            {item.created_by.toString() ===
                            user_id.toString() ? (
                              <>
                                <FaTrashAlt
                                  title="Delete Checklist"
                                  className="FaIcon ml-3 mt-1 "
                                  style={{ fontSize: 14 }}
                                  onClick={(event) =>
                                    openModalDeleteTaskCheckList(item.id, event)
                                  }
                                />
                              </>
                            ) : (
                              <></>
                            )}
                          </div>

                          {editingIndex === i ? (
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                              className="m-1"
                            >
                              <textarea
                                className="col-md-11 "
                                spellCheck="true"
                                ref={inputRefItem}
                                value={itemtaskTopicText[i] || ""} // Use empty string if value is null or undefined
                                onChange={(e) => {
                                  const updatedText = e.target.value;
                                  const updatedArray = [...itemtaskTopicText];
                                  updatedArray[i] = updatedText;
                                  setItemTaskTopicText(updatedArray);
                                }}
                                style={{
                                  background: "#132A3A",
                                  border: "none",
                                  color: "white",
                                  paddingLeft: 4,
                                  paddingRight: 4,
                                  borderRadius: 4,
                                }}
                              />
                              <span
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (itemtaskTopicText[i] !== "") {
                                    UpdateItemTask(
                                      item.id,
                                      itemtaskTopicText[i]
                                    );
                                  } else {
                                    toast.info("Task name can't be empty", {
                                      position: "top-center",
                                      autoClose: 2000,
                                    });
                                  }
                                  setIsEditingItem(false); // Use true if you want to keep editing after clicking the checkmark
                                }}
                              >
                                <FaCheck
                                  className="FaIcon"
                                  style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    fontSize: 14,
                                    cursor: "pointer",
                                  }}
                                />
                              </span>
                            </div>
                          ) : (
                            <div
                              onClick={() => setEditingIndex(i)}
                              className=" m-1  "
                              style={{ wordBreak: "break-all" }}
                            >
                              {itemtaskTopicText[i]}
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleIconClickTextItem();
                                  setEditingIndex(i);
                                }}
                              >
                                <FaPencilAlt
                                  className="FaIcon"
                                  style={{
                                    marginLeft: 10,
                                    fontSize: 14,
                                    cursor: "pointer",
                                  }}
                                  title="Edit"
                                />
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Modal
                        isOpen={isModalOpenCheck}
                        onRequestClose={closeModalCheck}
                        style={customStyles}
                        contentLabel="Update Task Status CheckList"
                      >
                        <h4 style={{ color: "white" }}>
                          Update Task Status CheckList
                        </h4>
                        <Select
                          value={newStatusCheck}
                          onChange={handleStatusChangeCheck}
                          options={statusOptionsSub}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            menu: (provided) => ({ ...provided, zIndex: 9999 }),

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
                            option: (baseStyles) => ({
                              ...baseStyles,
                              color: "black",
                            }),
                          }}
                          menuPortalTarget={document.body}
                        />
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <button
                            className="mt-4 mr-2 p-1"
                            style={{ color: "#fff" }}
                            onClick={() =>
                              Update_CheckList_Status(
                                item.id,
                                checkid,
                                "details"
                              )
                            }
                          >
                            Save
                          </button>

                          <button
                            className="mt-4 mr-2 p-1"
                            style={{ color: "#fff" }}
                            onClick={closeModalCheck}
                          >
                            Cancel
                          </button>
                        </div>
                      </Modal>
                    </div>
                  ))}

                  <div className="col-md-12 row m-0 p-1 inputIconContainer">
                    <FaPlusCircle style={{ color: "#cdcdcd" }} />
                    <input
                      type="text"
                      spellcheck="true"
                      className="taskInput"
                      onKeyPress={handleAddItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      value={newItem}
                      placeholder="Add New Checklist"
                      style={{ backgroundColor: "#133953", color: "white" }}
                      title="Add New Checklist"
                    />
                    <button
                      className="pr-2 pl-2"
                      onClick={handleAddItem}
                      style={{ color: "#fff" }}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <br></br> */}

                {/* <div className="col-md-12 row pr-0">
                  <div
                    className="col-md-2 p-1"
                    style={{ borderRadius: 4, cursor: "default" }}
                  >
                    Sub Task
                  </div>
                  <div
                    className="col-md-10 p-1"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                   
                    <div className="" style={{ position: "absolute" }}>
                      {shouldDisplaySpan && (
                        <span
                          className="pr-2 pl-2 p-1"
                          style={{
                            fontSize: 14,
                            backgroundColor: "rgb(253 253 202 / 10%)",
                            borderRadius: 2,
                            color: "#d1d1d1",
                          }}
                        >
                          Note: Please set a Due Date to track the task.
                          
                        </span>
                      )}
                      <FaInfoCircle
                        className="info-icon ml-1"
                        style={{
                          fontSize: 16,
                          color: "#fff",
                          cursor: "pointer",
                        }}
                        onClick={toggleSpanVisibility}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                  
                  </div>
                </div>
                <div>
                  <hr style={taglineStyle} />
                  {subTaskItems.length > 0 && (
                    <>
                    
                      <div className="subtasks-container">
                        {currentTaskId && renderSubtasks(subTaskItems, 1)}
                      </div>
                    </>
                  )}

                  <div className="col-md-12 row m-0 p-1 inputIconContainer">
                   
                    <input
                      type="text"
                      spellCheck="true"
                      className="taskInput"
                      onKeyPress={handleAddItem}
                      onChange={(e) =>
                        setnewSubtasksOnlyForLevelOne(e.target.value)
                      }
                      value={newSubtasksOnlyForLevelOne}
                      placeholder="Add New Subtask"
                      style={{
                        backgroundColor: "rgb(82 129 161 / 0%)",
                        color: "white",
                        marginRight: 4,
                        border: "1px solid rgb(82 129 161)",
                        borderRadius: 4,
                      }}
                      title="Add New Subtask"
                      maxLength={150}
                    />

                    {loadingAddSubtask ? (
                      <button className="pr-2 pl-2" style={{ color: "#fff" }}>
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                          }}
                        >
                          <ThreeDots
                            color="#fff"
                            height={24}
                            width={46}
                            style={{}}
                          />
                        </span>
                      </button>
                    ) : (
                      <button
                        className="pr-2 pl-2"
                        style={{ color: "#fff" }}
                        onClick={() =>
                          Add_Checklist_Subtask_if_no_subtask(
                            newSubtasksOnlyForLevelOne
                          )
                        }
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div> */}

                <br></br>

                {/* <div className="p-1">
                  <div className="col-md-12 row">
                    <div className="col-md-12 " style={{ cursor: "default" }}>
                      <span>Attachment</span>
                    </div>
                   
                  </div>
                  <hr style={taglineStyle}></hr>
                  
                  {files.map((file, index) => (
                    <div key={index} className="row m-0 p-1">
                      <div
                        className="col-md-10 "
                        style={{
                          cursor: "default",
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        {file.task_attachment &&
                        file.task_attachment.includes("/")
                          ? decodeURIComponent(
                              file.task_attachment.split("/")[5]
                            )
                          : file.name}
                      </div>

                      <div className="col-md-2 ">
                        <FaDownload
                          className="mr-3"
                          onClick={() =>
                            handleOnDownload(`${file.task_attachment}`)
                          }
                          title="Download Attachments"
                        />
                        
                        <FaTrashAlt
                          onClick={() => handleRemoveFile(file.id, taskid)}
                          title="Delete"
                        />
                        
                      </div>
                    </div>
                  ))}

                  <div
                    className="row"
                    style={{ paddingBottom: 25, cursor: "pointer" }}
                    title="Attach Files"
                  >
                    <FaSearchPlus
                      className="col-md-1 mt-1"
                      onClick={() => handleIconClicks()}
                    />
                    <div
                      style={{ color: "#cdcdcd" }}
                      onClick={handleIconClicks}
                    >
                      Add Attachment{" "}
                    </div>
                    <input
                      type="file"
                      ref={fileInput}
                      style={{ display: "none" }}
                      placeholder="select file"
                      onChange={(event) => handleFileChange(taskid, event)}
                      multiple
                    />
                  </div>
                </div> */}
              </div>

              {/* {isWideScreen && isChatVisible && (
                <div className="" style={{ width: 350, marginRight: "1%" }}>
                  <div className="customStylesChatboxWeb">
                    {!showComments ? (
                      <>
                        <div
                          className="row"
                          style={{
                            borderRadius: 5,
                          }}
                        >
                          <span
                            className="col-md-2"
                            style={{ textAlign: "left" }}
                          >
                            <FaArrowLeft onClick={closeChatModalWeb} />
                          </span>
                          <span className="col-md-1"></span>
                          <span
                            className="col-md-9"
                            style={
                              {
                                // textAlign: 'center',
                              }
                            }
                          >
                            CHAT & ACTIVITY{" "}
                          </span>
                        </div>
                        <hr />

                        <div className="chat-container" ref={chatContainerRef}>
                          {chatsData.length === 0 ? (
                            <div
                              style={{
                                textAlign: "center",
                                paddingTop: "20px",
                              }}
                            >
                              No chats available
                            </div>
                          ) : (
                            chatsData.map((chat) => (
                              <div
                                key={chat.id}
                                className={
                                  chat.sender_id?.toString() ===
                                  localStorage.getItem("user_id").toString()
                                    ? "my-chat"
                                    : "other-chat"
                                }
                              >
                                <div
                                  className="abc"
                                  style={{
                                    borderRadius: 5,
                                    backgroundColor: "#30678edc",
                                    color: "#fff",
                                    padding: "4px 10px",
                                  }}
                                >
                                  <b style={{ color: "#10DF95" }}>
                                    {chat.sender_id?.toString() ===
                                    localStorage.getItem("user_id").toString()
                                      ? "You"
                                      : `${chat.username}`}
                                  </b>
                                  <br />
                                  {renderMessageContent(
                                    chat.message,
                                    chat.file_size
                                  )}
                                </div>
                                <span
                                  style={{ fontSize: 10, color: "#ededed" }}
                                >
                                  {new Date(chat.created_at).toLocaleString()}
                                </span>
                              </div>
                            ))
                          )}

                          <div>
                           
                          </div>
                        </div>
                        <input
                          type="file"
                          accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                          style={{ display: "none" }}
                          onChange={handleFileChangeForChatFile}
                          ref={fileInputRef}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <div style={{ position: "relative", width: "100%" }}>
                            <input
                              placeholder="Type your message here..."
                              spellCheck="true"
                              style={{
                                color: "white",
                                borderRadius: 4,
                                fontSize: 16,
                                backgroundColor: "#30678e76",
                                paddingLeft: 40, // Adjust padding to accommodate the icon
                                padding: 8,
                                width: "100%",
                                border: "none",
                              }}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              // onKeyDown={(e) => {
                              //   if (e.key === 'Enter') {
                              //     send_msg(message);
                              //     handleSubmit();
                              //   }
                              // }}
                              tabIndex="0"
                            />
                            <FaPaperclip
                              onClick={() => fileInputRef.current.click()}
                              style={{
                                position: "absolute",
                                top: "50%",
                                right: 10,
                                transform: "translateY(-50%)",
                                fontSize: 20,
                                color: "white",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                          <FaPaperPlane
                            onClick={() => {
                              send_msg(message);
                              handleSubmit();
                            }}
                            style={{
                              marginTop: 10,
                              marginLeft: 8,
                              fontSize: 20,
                              color: "white",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="row"
                          style={{
                            borderRadius: 5,
                          }}
                        >
                          <span
                            className="col-md-2"
                            style={{ textAlign: "left" }}
                          >
                            <FaArrowLeft onClick={closeChatModalWeb} />
                          </span>
                          <span className="col-md-1"></span>
                          <span
                            className="col-md-9"
                            style={
                              {
                                // textAlign: 'center',
                              }
                            }
                          >
                            COMMENTS
                          </span>
                        </div>
                        <hr />

                        <div className="chat-container">
                          {commentsData.length === 0 ? (
                            <div
                              style={{
                                textAlign: "center",
                                paddingTop: "20px",
                              }}
                            >
                              No comments available
                            </div>
                          ) : (
                            commentsData.map((coment) => (
                              <div
                                key={coment.id}
                                className={
                                  coment.sender_id.toString() ===
                                  localStorage.getItem("user_id").toString()
                                    ? "my-chat"
                                    : "other-chat"
                                }
                              >
                                <div
                                  className="abc"
                                  style={{
                                    borderRadius: 5,
                                    backgroundColor: "#30678edc",
                                    color: "#fff",
                                    padding: "4px 10px",
                                  }}
                                >
                                  <b style={{ color: "#10DF95" }}>
                                    
                                    {coment.username}
                                  </b>
                                  <br />
                                  {coment.message}
                                </div>
                                <span
                                  style={{ fontSize: 10, color: "#ededed" }}
                                >
                                  {new Date(coment.created_at).toLocaleString()}
                                </span>
                              </div>
                            ))
                          )}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <input
                            placeholder="Type your message here..."
                            spellcheck="true"
                            style={{
                              color: "white",
                              marginRight: 8,
                              borderRadius: 4,
                              fontSize: 16,
                              backgroundColor: "#30678e76",
                              paddingLeft: 10,
                              padding: 8,
                              width: "100%",
                              border: "none",
                            }}
                            value={addComent}
                            onChange={(e) => setAddComent(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                send_Comment(addComent);
                                // handleSubmitComment()
                              }
                            }}
                            tabIndex="0"
                          />
                          <FaPaperPlane
                            onClick={() => {
                              send_Comment(addComent);
                              // handleSubmitComment();
                            }}
                            style={{
                              marginTop: 10,
                              fontSize: 20,
                              color: "white",
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )} */}

              {/* <div style={{ display: "block" }}>
               
                <button
                  className="close"
                  onClick={closeChatModal}
                  style={{ position: "fixed" }}
                >
                  &times;
                </button>

                <div style={{ marginBottom: "6%" }}>&nbsp;</div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
