import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

// import EmployeeProjectTask from "./EmployeeProjectTask";
// import EmployeeBudget from "./EmployeeBudget";
// import EmployeeFiles from "./EmployeeFiles";

// import EmployeeTeam from "./EmployeeTeam";

// import EmployeeProjectSummary from "./EmployeeProjectSummary";

import ProjectOverView from "./Details/ProjectOverView";
import { useSelector } from "react-redux";
import ProjectTasks from "./Details/ProjectTasks";
import {
  fetchBoardDataFailure,
  fetchBoardDataSuccess,
} from "../../../features/Project/ProjectSlice";
import {
  API_URL,
  getProjectAssignedUser,
  getVibeBoardData,
  GetVibeBoardTaskPermission,
  getVibeBoardUser,
  getVibeUsers,
  vibeMedia,
} from "../../../api";
import { useLocation, useParams } from "react-router-dom";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import profileImage from "/prof.jpg";
import { BsPlus } from "react-icons/bs";
import AssignUser from "./Details/AssignUser";
import { useDispatch } from "react-redux";
import { DNA } from "react-loader-spinner";
import ProjectTeam from "./Details/ProjectTeam";
import ProjectFiles from "./Details/ProjectFiles";
import ProjectSummary from "./Details/ProjectSummary";
function ProjectDetails(boardData) {
  const org_id = localStorage.getItem("VIBEORGID");
  const [users, setUsers] = useState([]);
  const [projectDetails, setProjectDetails] = useState("Overview");
  const dispatch = useDispatch();
  const [activeView, setActiveView] = useState("Kanban");
  const [createdById, setCreatedById] = useState(null);
  const [boardTemp, setboardTemp] = useState([]);
  const [boardCataName, setboardCataName] = useState([]);
  // const [boardData, setboardData] = useState({});
  const [board, setboard] = useState([]);
  const handleToggle = (section) => {
    setProjectDetails(section);
  };
  const [assign, setAssign] = useState(false);
  const user_id = getItemInLocalStorage("VIBEUSERID");
  // const boardData = useSelector((state) => state.board.data);
  console.log(boardData);
  const [usersAssignBoard3, setUsersAssignBoard3] = useState([]);
  const [usersAssignAlready, setUsersAssignAlready] = useState([]);
  const [showStatusChecklist1, setShowStatusChecklist1] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedEmail3, setSelectedEmail3] = useState("");
  const [id, setID] = useState("");
  const fetchOrg_assignAlready = async (taskid) => {
    try {
      const jsonData = await getProjectAssignedUser(user_id, taskid);
      if (jsonData.success) {
        console.log("GetTaskUsersAssign");
        console.log(jsonData.data);
        const usersData = jsonData.data;
        setUsersAssignBoard3(usersData);

        setUsersAssignAlready(usersData);

        setShowStatusChecklist1(jsonData.data.email);
        console.log(setShowStatusChecklist1);

        const selectedEmails = usersData.map((user) => ({
          value: user.user_id,
          label: user.email,
        }));
        setSelectedEmail(selectedEmails);

        const selectedEmailsTask = usersData.map((user) => ({
          value: user.user_id,
          label: user.email,
        }));
        setSelectedEmail3(selectedEmailsTask);

        const selectedEmailsisTaskAssignedTo = usersData.map((user) => ({
          email: user.id,
        }));
        const isTaskAssignedTo = selectedEmailsisTaskAssignedTo.some(
          (user) => user.email === parseInt(user_id, 10)
        );

        console.log(selectedEmailsisTaskAssignedTo);
        console.log(isTaskAssignedTo);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const [usersAssignBoard, setUsersAssignBoard] = useState([]);
  const [boardAssignedEmail, setboardAssignedEmail] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setID(searchParams.get("id"));
  }, [location.search]);
  const fetchOrg_assignData = async (board_id, taskid) => {
    try {
      const jsonData = await getVibeUsers(user_id);
      if (jsonData.success) {
        console.log(jsonData.data);
        const usersData = jsonData.data;
        setboardAssignedEmail(usersData.assign_to);

        setUsersAssignBoard3(usersData);

        setUsersAssignBoard(usersData);
        console.log(usersData);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const [allUsers, setAllUsers] = useState([]);
  const fetchOrg_AssignData_Checklist = async (boardMainId, boardAssigned) => {
    // const user_id = localStorage.getItem("user_id");

    // const params = {
    //   user_id: user_id,
    //   os: false,
    // };
    try {
      // GetUsers
      const jsonData = await getVibeUsers(user_id);
      if (jsonData.success) {
        console.log(jsonData.data);
        const usersData = jsonData.data;
        console.log(usersData);
        setAllUsers(usersData);
        const filteredUsersData = usersData.filter((user) => {
          
          return !boardAssigned.some(
            (assignee) => assignee.user_id === user.user_id
          );
        });

        setUsersAssignBoard(filteredUsersData);
        // setShouldFetchUsers(true);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleIconClick = (boardMainId, boardAssigned) => {
    console.log(boardAssigned)
    console.log(boardMainId)
    setAssign(true);
    // const formattedData = boardAssigned.map((assignee) => ({
    //   value: assignee.user_id,
    //   label: assignee.email,
    // }));
    // setSelectedEmail(formattedData);
    // console.log(formattedData);
    fetchOrg_AssignData_Checklist(boardMainId, boardAssigned);
    console.log(boardAssigned);
    // setShouldFetchUsers(true);
    setIsModalOpen(true);
  };
  console.log(usersAssignBoard);
  const added = useSelector((state) => state.added);
  const [idFromURL, setIdFromURL] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setID(searchParams.get("id"));
    const task_id = searchParams.get("t_id");
    if (searchParams.get("id")) {
      console.log("test");
      setIdFromURL(searchParams.get("id"));
      GetBoardData(searchParams.get("id"));
      localStorage.setItem("board_id", searchParams.get("id"));
      fetchData(searchParams.get("id"));
      // GetOutsiderViewPermissionUnique(searchParams.get('id'));
      // Get_OutsidersAccessGivenUser(searchParams.get('id'))
      GetTaskPermission(searchParams.get("id"));
      // if (task_id) {
      //   setTaskIdFromURL(task_id);
      // }
    }
  }, [added]);
  const GetTaskPermission = async (id) => {
    const params = {
      user_id: user_id,
      board_id: id,
    };
    try {
      const jsonData = await GetVibeBoardTaskPermission(user_id, id);
      if (jsonData.success) {
        console.log(jsonData.permissions);
        const usersData = jsonData.permissions;
        console.log("🚀 ~ GetTaskPermission ~ usersData:", usersData);
        setTaskAccessTo(usersData);

        // setUsersAssignBoardViewAccess(usersData)
        // setShouldFetchUsersViewAccess(true);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchData = async (board_id) => {
    // const params = {
    //   user_id: user_id,
    //   org_id: org_id,
    //   board_id: board_id
    // };
    try {
      const jsonData = await getVibeBoardUser(user_id, org_id, board_id);
      if (jsonData.success) {
        const usersData = jsonData.data;
        setUsers(usersData);
        // setShouldFetchUsers(true);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const GetBoardData = async (id) => {
    console.log("calling");
    try {
      console.log("called");
      const data = await getVibeBoardData(id, user_id);

      if (data.success) {
        console.log("Board data");
        console.log(data);
        setJsonData(data);
        console.log("Dispatching fetchBoardDataSuccess with data:", data);
        // dispatch(fetchBoardDataSuccess(data));
        console.log(data.board);
        // setboardData(data.board);
        const updatedView = data.board_view;
        console.log(updatedView);
        setActiveView(updatedView ? updatedView : "Kanban");
        console.log(data.board);
        setboard(data.board);
        setCreatedById(data.board.created_by.id);
        setboardTemp(data.board.template_name);
        setboardCataName(data.board.category_name);
        // setboardData(data);
        setboardAssignedEmail(data.board.assign_to);

        if (data.board.assign_to.length > 0) {
          setSelectedEmail(
            data.board.assign_to.map((email) => ({
              value: email.user_id,
              label: email.email,
            }))
          );
        }
      } else {
        console.log("Something went wrong");
        dispatch(fetchBoardDataFailure("Something went wrong"));
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch(fetchBoardDataFailure(error.message));
    }
  };

  console.log(boardData);
  return (
    <div className="w-full flex flex-col overflow-hidden">
      <div className="flex justify-between  my-2 mx-2">
        <div>
          <h2 className="text-2xl mx-2 font-semibold">
            {boardData?.boardData.board_name}
          </h2>
        </div>
        <div className="relative flex items-center pr-36">
          {boardData?.boardData.assign_to?.slice(0, 4).map((user, index) => (
            <img
              key={user.id}
              src={
                user.profile_picture
                  ? "https://vibecopilot.ai/api/media/" + user.profile_picture
                  : profileImage
              }
              className={`h-14 w-14 rounded-full border-4 border-white absolute left-${
                index * 2
              }`}
              style={{ left: `${index * 20}px` }}
              alt={` ${user.firstname}`}
            />
          ))}
          {boardData?.boardData.assign_to?.length > 4 ? (
            <div
              className="h-14 w-14 rounded-full absolute left-24 border-2 flex items-center justify-center cursor-pointer bg-gray-100 border-white"
              onClick={() =>
                handleIconClick(
                  boardData?.boardData.id,
                  boardData?.boardData.assign_to
                )
              }
            >
              {boardData?.boardData.assign_to.length - 4}+
            </div>
          ) : (
            <div
              className="h-14 w-14 rounded-full absolute left-24 border-2 flex items-center justify-center cursor-pointer bg-gray-100 border-white"
              onClick={() =>
                handleIconClick(
                  boardData?.boardData.id,
                  boardData?.boardData.assign_to
                )
              }
            >
              <BsPlus size={20} />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-5  mx-5 rounded-md">
        <div
          className={`p-3 text-slate-800 cursor-pointer ${
            projectDetails === "Overview"
              ? "text-violet-700 border-b border-violet-700"
              : ""
          }`}
          onClick={() => handleToggle("Overview")}
        >
          Overview
        </div>
        <div
          className={` p-3 text-center cursor-pointer ${
            projectDetails === "task"
              ? "text-violet-700 border-b border-violet-700"
              : ""
          }`}
          onClick={() => handleToggle("task")}
        >
          Task
        </div>
        {/* <div
          className={` p-3 text-center cursor-pointer  ${
            projectDetails === "budget"
              ? "text-violet-700 border-b border-violet-700"
              : ""
          }`}
          onClick={() => handleToggle("budget")}
        >
          Budget
        </div> */}
        <div
          className={` p-3 text-center cursor-pointer ${
            projectDetails === "files"
              ? "text-violet-700 border-b border-violet-700"
              : ""
          }`}
          onClick={() => handleToggle("files")}
        >
          Files
        </div>
        <div
          className={` p-3 text-center cursor-pointer ${
            projectDetails === "team"
              ? "text-violet-700 border-b border-violet-700"
              : ""
          }`}
          onClick={() => handleToggle("team")}
        >
          Team
        </div>
        <div
          className={` p-3 text-center cursor-pointer ${
            projectDetails === "summary"
              ? "text-violet-700 border-b border-violet-700"
              : ""
          }`}
          onClick={() => handleToggle("summary")}
        >
          Summary
        </div>
      </div>
      <div className="border-t border-gray-300 mb-2 mx-5"></div>
      {projectDetails === "Overview" && (
        <div>
         {boardData.boardData.created_at? <ProjectOverView boardData={boardData.boardData} /> : (<div className="flex justify-center items-center h-full">
            <DNA
              visible={true}
              height="120"
              width="120"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>) }
        </div>
      )}
      {projectDetails === "task" && (
        <div>
          <ProjectTasks />
        </div>
      )}
      {/* {projectDetails === "budget" && <div><EmployeeBudget /></div>} */}
      {projectDetails === "files" && <div> <ProjectFiles /> </div>}
      {projectDetails === "team" && <div><ProjectTeam team={boardData?.boardData.assign_to} /></div>}
      {projectDetails === "summary" && (
        <div><ProjectSummary /> </div>
      )}
      {assign && (
        <AssignUser
          onclose={() => setAssign(false)}
          assignTo={boardData?.boardData.assign_to}
          users={allUsers}
          id={id}
        />
      )}
    </div>
  );
}

export default ProjectDetails;
