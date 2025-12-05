import React, { useEffect, useState } from "react";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import {
  API_URL,
  getOutsideUsers,
  getProjectUsers,
  getVibeUserBoard,
  updateVibeBoardDate,
} from "../../../api";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import BoardDeleteModal from "../../../containers/modals/BoardDeleteModal";
import BoardDueDateModal from "../../../containers/modals/BoardDueDateModal";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../../utils/capitalize";
import projectHolder from "/pro.jpg";
import { truncateText } from "../../../utils/truncateUtils";
const ProjectBoard = () => {
  const [isLoadingProjectList, setIsLoadingProjectList] = useState(true);
  const [emails, setEmails] = useState([]);
  const [emailsOutsider, setEmailsOutsider] = useState([]);
  const [board_id_for_Temp, setboard_id_for_Temp] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [dueDateUpdate, setDueDateUpdate] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [isModalOpenProjectDate, setIsModalProjectDateOpen] = useState(false);
  const openProjectDateModal = () => {
    setIsModalProjectDateOpen(true);
  };

  const closeProjectDateModal = () => {
    setIsModalProjectDateOpen(false);
    setEditingProjectId(null);
    setIsEditingDate(false);
  };
  var count = 0;
  const user_id = getItemInLocalStorage("VIBEUSERID");
  useEffect(() => {
    GetUsersData();
    GetUsersDataOutsider();

    if (count === 0) {
      GetBoards();
    }
  }, [count]);
  const GetBoards = async () => {
    setIsLoadingProjectList(true);
    try {
      const jsonData = await getVibeUserBoard(user_id);

      if (jsonData.success) {
        console.log(jsonData.data);
        // setProjectList(jsonData.data);
        setProjectList(jsonData.data.boards);

        count = count + 1;
        setIsLoadingProjectList(false);
      } else {
        console.log("Something went wrong");
        setIsLoadingProjectList(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoadingProjectList(false);
    }
  };
  const orgId = getItemInLocalStorage("VIBEORGID");
  const GetUsersData = async () => {
    try {
      const jsonData = await getProjectUsers(user_id, orgId);
      if (jsonData.success) {
        const users = jsonData.data;
        const AssignEmails = users.map((user) => ({
          value: user.user_id,
          label: user.email,
        }));

        setEmails(AssignEmails);
        console.log("-----heyyyy");
        console.log(emails);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const GetUsersDataOutsider = async () => {
    try {
      const jsonData = await getOutsideUsers(user_id);

      if (jsonData.success) {
        const users = jsonData.data;
        const AssignEmailsOutsider = users.map((user) => ({
          value: user.id,
          label: user.email,
        }));

        setEmailsOutsider(AssignEmailsOutsider);
        console.log("-----heyyyy");
        console.log(emailsOutsider);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDelete = (event, boardId) => {
    event.stopPropagation();
    setBoardToDelete(boardId);
    setIsModalOpenConfirm(true);
  };
  const handleDeleteOnCancel = () => {
    setIsModalOpenConfirm(false);
  };

  const handleEditDateClick = (projectId, dueDate, e) => {
    e.stopPropagation();
    setEditingProjectId(projectId);
    setDueDateUpdate(dueDate || "");
    openProjectDateModal();
    setIsEditingDate(true);
  };

  const handleDueDateChangeUpdate = (e) => {
    console.log(e.target.value);
    e.stopPropagation();
    setDueDateUpdate(e.target.value);
  };

  const handleUpdateDate = (projectId, e) => {
    e.stopPropagation();
    Update_Board_Date(projectId, dueDateUpdate);
    setEditingProjectId(null);
    setIsEditingDate(false);
  };
  const Update_Board_Date = async (projectId, projectDate) => {
    // alert(projectId)
    setEditingProjectId(projectId);
    setDueDateUpdate(projectDate);

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("board_id", projectId);
    formData.append("due_date", projectDate);

    try {
      const response = await updateVibeBoardDate(formData);
      console.log(response);
      if (response.success) {
        console.log("Success");
        goToProject(board_id_for_Temp);
        GetBoards();
        setEditingProjectId(null);
        closeProjectDateModal();
      } else {
        console.log("unable to update");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const goToProject = (id) => {
    // if (!isEditingDate) {
    navigate(`/project-management/customBoard/?id=${id}`);
    // }
  };

  return (
    <div className="mb-10">
      {isLoadingProjectList ? (
        <div className="m-4" style={{ textAlign: "center" }}>
          <center className="m-4">
            <div
              className="spinner-border"
              style={{ opacity: 0.3 }}
              role="status"
            >
              <span className="sr-only"></span>
            </div>
            <br />
            <span style={{ opacity: 0.6 }}>Please wait...</span>
          </center>
        </div>
      ) : projectList.length > 0 ? (
        <div className="grid md:grid-cols-4 gap-3 ">
          {projectList.map((project) => {
            console.log(project);
            return (
              <div
                className="my-2 min-h-96 max-w-96 bg-white shadow-custom-all-sides rounded-md  hover:bg-gray-100 transition-all duration-300 cursor-pointer flex flex-col"
                key={project.id}
                onClick={() => goToProject(project.id)}
              >
                {/* <div className="w-full"> */}
                <img
                  src={project.image ? API_URL + project.image : projectHolder}
                  alt=""
                  className=" min-h-40 rounded-t-md"
                />
                {/* </div> */}
                {/*  */}
                <div className="flex flex-col justify-between my-2 h-full px-2">
                  <div className="flex w-full">
                    {/* <div className="w-full"> */}
                    <div className="w-full">
                      <div className="flex md:flex-row flex-col justify-between w-full">
                        <div className="text-gray-700 font-medium mx-2 border-b border-gray-300 w-full">
                          <p>{project.board_name}</p>{" "}
                        </div>
                      </div>
                      <div className="flex md:flex-row flex-col justify-between w-full mt-2">
                        <div className="text-gray-500 text-sm">
                          <p>{truncateText(project?.summery, 100)}</p>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      className="grid grid-cols-2 gap-4"
                      style={{
                        fontSize: 14,
                        color: "#707070",
                        gridTemplateColumns: "auto 1fr",
                      }}
                    >
                      <p className="font-medium">Created by : </p>
                      <p className="">
                        {project.created_by.firstname}{" "}
                        {project.created_by.lastname}
                      </p>
                    </div>
                    <div
                      className="grid grid-cols-2 gap-6"
                      style={{
                        fontSize: 14,
                        color: "#707070",
                        gridTemplateColumns: "auto 1fr",
                      }}
                      title={project.assign_to
                        .map((assignee, index) => assignee.email)
                        .join(", ")}
                    >
                      <p className="font-medium">Assign To : </p>
                      <p>
                        {" "}
                        {project.assign_to.map((assignee, index) => {
                          if (index < 2) {
                            return (
                              <span key={index}>
                                {truncateText(assignee.email, 20)}
                                {index < project.assign_to.length - 1 && ", "}
                              </span>
                            );
                          } else if (index === 2) {
                            return (
                              <span key={index}>
                                +{project.assign_to.length - 2}
                              </span>
                            );
                          } else {
                            return null; // Hide additional emails
                          }
                        })}
                      </p>
                    </div>

                    {project.created_by.user_id === user_id ? (
                      <div className="flex justify-between my-2">
                        {project.created_by.user_id === user_id ? (
                          <div
                            className="flex text-sm gap-2 items-center "
                            // style={{ fontSize: 14, color: "#000" }}
                          >
                            <p className="font-medium">Project Timeline : </p>
                            {editingProjectId === project.id ? (
                              <>
                                {project.due_date}
                                {isModalOpenProjectDate && (
                                  <BoardDueDateModal
                                    closeProjectDateModal={
                                      closeProjectDateModal
                                    }
                                    dueDateUpdate={dueDateUpdate}
                                    handleDueDateChangeUpdate={
                                      handleDueDateChangeUpdate
                                    }
                                    handleUpdateDate={handleUpdateDate}
                                    project={project}
                                  />
                                )}
                              </>
                            ) : (
                              <div className="flex gap-2 items-center">
                                {" "}
                                {project.due_date || (
                                  <span style={{ color: "gray" }}>
                                    {" "}
                                    No Timeline
                                  </span>
                                )}
                                <button
                                  
                                  onClick={(e) => {
                                    // e.preventDefault();
                                    e.stopPropagation();
                                    handleEditDateClick(
                                      project.id,
                                      project.due_date,
                                      e
                                    );
                                  }}
                                  style={{ color: "gray" }}
                                >
                                  <FaPencilAlt style={{ marginBottom: 4 }} />
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            <div
                              className="flex items-center gap-2"
                              style={{ fontSize: 14, color: "#000" }}
                            >
                              <p className="font-medium">Project Timeline : </p>
                              {project.due_date}
                            </div>
                          </>
                        )}
                        <FaTrashAlt
                          onClick={(event) => handleDelete(event, project.id)}
                          className="cursor-pointer text-red-400"
                          title="Delete Board"
                        ></FaTrashAlt>
                      </div>
                    ) : (
                      <div
                        className="flex items-center gap-2  my-2"
                        style={{ fontSize: 14, color: "#000" }}
                      >
                        <p className="font-medium">Project Timeline : </p>
                        {project.due_date}
                      </div>
                    )}
                    {/* <ConfirmModal
                              isOpen={isModalOpenConfirm}
                              boardId={boardToDelete}
                              onCancel={(event, boardId) => {
                                event.stopPropagation();
                                setIsModalOpenConfirm(false);
                                handleDeleteOnCancel(boardId);
                              }}
                            /> */}

                    {isModalOpenConfirm && (
                      <BoardDeleteModal
                        boardId={boardToDelete}
                        onCancel={(event, boardId) => {
                          event.stopPropagation();
                          setIsModalOpenConfirm(false);
                          handleDeleteOnCancel(boardId);
                        }}
                      />
                    )}
                  </div>
                  {/* </div> */}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="col-md-12" style={{ textAlign: "center" }}>
          <div class="m-4">
            <center>
              No Entries
              <br />
            </center>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectBoard;
