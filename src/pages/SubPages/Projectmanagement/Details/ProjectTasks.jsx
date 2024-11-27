import React, { useState, useEffect, useRef } from "react";
import { BsEye, BsThreeDotsVertical } from "react-icons/bs";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import {
  addBoardChecklist,
  deleteProjectTask,
  deleteSection,
  getBoardSection,
  getOutsideUsers,
  getTaskUsersAssign,
  getVibeBoardData,
  GetVibeBoardTaskPermission,
  getVibeBoardUser,
  getVibeStatus,
  getVibeTaskChecklist,
  getVibeUsers,
  updateChecklistSequence,
  UpdateProjectSectionTitle,
  updateSalesView,
  UpdateTaskAction,
  updateTaskStatus,
  updateVibeUserTask,
} from "../../../../api";
import { getItemInLocalStorage } from "../../../../utils/localStorage";
import { useDispatch } from "react-redux";
import {
  fetchBoardDataSuccess,
  updateActiveView,
} from "../../../../features/Project/ProjectSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaCheck, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import RemainingTime from "../../../../utils/RemainingTime";
import LinearProgressBar from "../../../../components/LinearProgessBar";
import {
  dateFormat,
  ShowFormatedDueDateOnDateField,
} from "../../../../utils/dateUtils";
import DeleteSectionModal from "./DeleteSectionModal";
import toast from "react-hot-toast";
import TaskSelf from "../../../../containers/modals/SelfTask";
import ProjectTaskSelf from "./ProjectTaskSelf";
import Table from "../../../../components/table/Table";
import { FcDeleteRow } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import CreateProjectTask from "./CreateProjectTask";
import ProjectDetailsModal from "./ProjectDetailsModal";

function ProjectTasks() {
  const themeColor = useSelector((state) => state.theme.color);
  const user_id = getItemInLocalStorage("VIBEUSERID");
  const [taskDynamicStatus, settaskDynamicStatus] = useState([]);
  const [taskMoreStatusId, settaskMoreStatusId] = useState([]);
  const [taskMoreStatusList, settaskMoreStatusList] = useState([]);
  const [taskMoreStatusIdList, settaskMoreStatusIdList] = useState([]);
  const [createdById, setCreatedById] = useState(null);
  const [id, setID] = useState("");
  const [fontColor, setFontColor] = useState("black");
  const [board, setboard] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [boardCataName, setboardCataName] = useState([]);
  const [boardData, setboardData] = useState([]);
  const [show, setShow] = useState(true);
  const [boardAssignedEmail, setboardAssignedEmail] = useState([]);
  const [boardTemp, setboardTemp] = useState([]);
  const [chartDropDown, setChartDropDown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const dropdownRefs = useRef([]);
  const [task, setTask] = useState("TotalTask");
  const [taskFilter, setTaskFilter] = useState([]);
  const [selectedStatusIds, setSelectedStatusIds] = useState([]);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editedSectionTitle, setEditedSectionTitle] = useState("");
  const [createdTaskid, setCreatedTaskId] = useState(null);
  const [showStatus, setshowStatus] = useState(true);
  const cardRefs = useRef({});
  const [isAssignedTo, setIsAssignedTo] = useState(false);
  const [isBoardCreatedby, setIsBoardCreatedby] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [sections, setSections] = useState([]);
  const [taskMoreStatus, settaskMoreStatus] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskMoreSection, settaskMoreSection] = useState([]);
  const [taskMoreSectionList, settaskMoreSectionList] = useState([]);
  const [taskMoreSectionIdList, settaskMoreSectionIdList] = useState([]);

  const Get_BoardSection = async () => {
    try {
      const response = await getBoardSection(user_id, id);

      if (response.success) {
        console.log("success");
        console.log(response.data);

        const sectionOptionsdata = response.data.map((section) => ({
          value: section.id,
          label: section.name,
        }));

        settaskMoreSectionList(
          sectionOptionsdata.map((option) => option.label)
        );
        settaskMoreSectionIdList(
          sectionOptionsdata.map((option) => option.value)
        );
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const to_show_section_on_details = async (section) => {
    console.log("-----------------------------");
    console.log(section);
    settaskMoreSection(section);
    // settaskMoreSectionId(section.id)
  };
  console.log(filteredItems);
  const handleCheckboxChangeStatus = (event) => {
    const selectedStatusId = event.target.value;
    console.log(`Checkbox selected: ${selectedStatusId}`);
    setSelectedStatusIds((prevSelectedStatusIds) => {
      if (prevSelectedStatusIds.includes(selectedStatusId)) {
        return prevSelectedStatusIds.filter((id) => id !== selectedStatusId);
      } else {
        return [...prevSelectedStatusIds, selectedStatusId];
      }
    });
  };
  const Get_Status = async () => {
    try {
      const response = await getVibeStatus(user_id);
      if (response.success) {
        console.log("success");
        console.log(response.data);
        settaskMoreStatus(response.data[0].status_name);
        settaskMoreStatusId(response.data[0].id);
        const statusOptionsdata = response.data.map((status) => ({
          value: status.id,
          label: status.status_name,
        }));
        settaskDynamicStatus(statusOptionsdata);
        settaskMoreStatusList(statusOptionsdata.map((option) => option.label));
        settaskMoreStatusIdList(
          statusOptionsdata.map((option) => option.value)
        );
        console.log(response.data[0].status_name);
        console.log(response.data[0].id);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [optionsOutsiderView, setOptionsOutsiderView] = useState([]);
  const [selectedEmailOutsiderView, setSelectedEmailOutsiderView] = useState(
    []
  );
  useEffect(() => {
    Get_Status();
    GetUsersDataOutsider();
  }, []);
  const GetUsersDataOutsider = async () => {
    // const user_id= localStorage.getItem('user_id');
    // const org_id= localStorage.getItem('organization_id');
    try {
      //  const params = {
      //    user_id: user_id,
      //   //  org_id:org_id,
      //   //  os:false
      //  };

      const jsonData = await getOutsideUsers(user_id);

      if (jsonData.success) {
        const users = jsonData.data;
        console.log("🚀 ~ GetUsersDataOutsider ~ users:", users);
        const AssignEmailsOutsider = users.map((user) => ({
          value: user.id,
          label: user.email,
        }));

        setOptionsOutsiderView(AssignEmailsOutsider);
        console.log("-----heyyyy");
        console.log(selectedEmailOutsiderView);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRefs.current.every((ref) => ref && !ref.contains(event.target))
    ) {
      setChartDropDown(null);
    }
  };
  const handleChartDropDownClick = (index) => {
    setChartDropDown(chartDropDown === index ? null : index);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const options = {
    chart: {
      type: "donut",
      height: 350,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels: ["Completed", "Incomplete"],
    colors: ["#645AFF", "#00C1D4"],
    legend: {
      position: "bottom",
    },
  };

  const series = [75, 25];

  const seriesLineColumn = [
    {
      name: "Closed",
      type: "line",
      data: [20, 32, 28, 50, 38, 35, 49],
    },
    {
      name: "New",
      type: "column",
      data: [12, 18, 20, 32, 19, 25, 30],
    },
  ];

  const optionsLineColumn = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    colors: ["#baa7ff"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    stroke: {
      width: [4, 0],
    },
    markers: {
      size: [0, 0],
      show: false,
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
    },
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    yaxis: {
      tickAmount: 6,
      labels: {
        formatter: function (val) {
          return parseInt(val);
        },
      },
    },
    legend: {
      show: false,
    },
  };

  const DevelopmentOptions = {
    series: [44, 65, 89, 75, 37, 63],
    chart: {
      height: 450,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: -10,
        offsetX: 0,
        dataLabels: {
          name: {
            fontSize: "16px",
            color: "green",
          },
          value: {
            fontSize: "25px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              return 373;
            },
          },
        },
      },
    },

    labels: [
      "Design",
      "Frontend",
      "Prototype",
      "Content",
      "Database",
      "Backend",
    ],
    legend: {
      show: true,
      fontSize: "16px",
      position: "bottom",
    },
    colors: ["#775DD0", "#00E396", "#F59E0B", "#3B82F6", "#9ea3a0", "#0a0101"],
  };
  const taskView = useSelector((state) => state.board.activeView);
  console.log("view", taskView);
  const dispatch = useDispatch();
  const [activeView, setActiveView] = useState("Kanban");

  const handleViewChange = async (view) => {
    setActiveView(view);

    console.log(`Clicked and active view: ${view}`);

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("board_view", view);
    formData.append("board_name", "custom_board");
    try {
      const res = await updateSalesView(formData);
      if (res.success) {
        dispatch(updateActiveView(view));
      }
    } catch (error) {
    } finally {
    }
  };
  const [isLoading, setIsLoading] = useState(true);
  const [jsonData, setJsonData] = useState(null);
  const extractTasks = (boardData) => {
    return boardData.flatMap((section) =>
      section.tasks.map((task) => ({
        sectionId: section.id,
        sectionTitle: section.title,
        taskId: task.id,
        taskTopic: task.task_topic,
        taskDescription: task.task_description,
        taskSequence: task.sequence,
        deadLine: task.task_due_date,
        taskStatus: task.task_status,
        taskCreatedBy: task.task_created_by,
        taskCreatedAt: task.task_created_at,
        urgentStatus: task.urgent_status,
      }))
    );
  };
  const columns = [
    {
      name: "Action",
      selector: (row) => (
        <div>
          <BsEye size={15} />
        </div>
      ),
    },
    { name: "Task Topic", selector: (row) => row.taskTopic, sortable: true },
    {
      name: "Section Title",
      selector: (row) => row.sectionTitle,
      sortable: true,
    },
    // { name: 'Task ID', selector: row => row.taskId, sortable: true },
    // { name: 'Task Description', selector: row => row.taskDescription },
    {
      name: "Status",
      selector: (row) => (
        <div className="flex justify-center w-full">
          <p
            style={{ background: row.taskStatus?.color }}
            className="text-center p-1 px-2 rounded-full text-xs text-white"
          >
            {row.taskStatus.status_name}
          </p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Deadline",
      selector: (row) => dateFormat(row.deadLine),
      sortable: true,
    },
    {
      name: "urgent",
      selector: (row) =>
        row.urgentStatus ? <p className="text-red-400">YES</p> : "NO",
      sortable: true,
    },
    {
      name: "Created By",
      selector: (row) =>
        `${row.taskCreatedBy.firstname} ${row.taskCreatedBy.lastname}`,
      sortable: true,
    },
    {
      name: "Created on",
      selector: (row) => dateFormat(row.taskCreatedAt),
      sortable: true,
    },
    {
      name: "",
      selector: (row) => (
        <div className="text-red-400 cursor-pointer">
          <MdDeleteForever
            size={25}
            onClick={(event) => openModalDeleteTask(row.taskId, event)}
          />
        </div>
      ),
    },
  ];

  const [selectedStatusId, setSelectedStatusId] = useState("all");
  const [filteredTasksList, setFilteredTasksList] = useState([]);
  const taskDynamicStatusWithAll = [
    { value: "all", label: "All" },
    ...taskDynamicStatus,
  ];
  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setSelectedStatusId(selectedStatus);

    if (selectedStatus === "all") {
      setFilteredTasksList(tasksList);
    } else {
      const filteredTasks = tasksList.filter(
        (task) => task.taskStatus.id.toString() === selectedStatus
      );
      setFilteredTasksList(filteredTasks);
    }
  };

  const [tasksList, setTasks] = useState([]);

  useEffect(() => {
    if (boardData && boardData.length > 0) {
      setTasks(extractTasks(boardData));
    }
  }, [boardData]);
  const GetBoardData = async (id) => {
    setIsLoading(true);
    try {
      //   const params = {
      //     board_id: id,
      //     user_id: localStorage.getItem("user_id"),
      //   };
      console.log("called");
      const data = await getVibeBoardData(id, user_id);

      if (data.success) {
        console.log("Board data");
        console.log(data);
        setJsonData(data);
        dispatch(fetchBoardDataSuccess(data));
        console.log(data);
        const updatedView = data.board_view;
        console.log(updatedView);
        setActiveView(updatedView ? updatedView : "Kanban");
        setboard(data.board);
        setCreatedById(data.board.created_by.id);
        setboardTemp(data.board.template_name);
        setboardCataName(data.board.category_name);
        setboardData(data.data);
        setboardAssignedEmail(data.board.assign_to);

        if (data.board.assign_to.length > 0) {
          setSelectedEmail(
            data.board.assign_to.map((email) => ({
              value: email.user_id,
              label: email.email,
            }))
          );
        }

        setIsLoading(false);
      } else {
        console.log("Something went wrong");
        dispatch(fetchBoardDataFailure("Something went wrong"));
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch(fetchBoardDataFailure(error.message));
      setIsLoading(false);
    }
  };
  const [idFromURL, setIdFromURL] = useState(null);
  const [users, setUsers] = useState([]);
  const [taskAccessTo, setTaskAccessTo] = useState([]);
  const [taskidFromURL, setTaskIdFromURL] = useState(null);
  const fetchData = async (board_id) => {
    const org_id = localStorage.getItem("VIBEORGID");

    try {
      const jsonData = await getVibeBoardUser(user_id, org_id, board_id);
      if (jsonData.success) {
        const usersData = jsonData.data;
        setUsers(usersData);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const GetTaskPermission = async (id) => {
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

  useEffect(() => {
    if (jsonData && jsonData.success) {
      setboard(jsonData.board);
      setboardData(jsonData.data);
      console.log(jsonData.data);
      console.log(jsonData.board);

      const isCreatedBy =
        jsonData.board.created_by.user_id === parseInt(user_id, 10);
      setIsBoardCreatedby(isCreatedBy);
      console.log(jsonData.board.created_by.user_id);

      const isAssignedTo = jsonData.board.assign_to.some(
        (user) => user.user_id === parseInt(user_id, 10)
      );
      setIsAssignedTo(isAssignedTo); //board assignee
      console.log(isAssignedTo);

      if (isCreatedBy || isAssignedTo) {
        setShow(false);
      } else {
        setShow(true);
      }
    }
  }, [jsonData]);
  const [taskAdded, setTaskAdded] = useState(false);
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
      if (task_id) {
        setTaskIdFromURL(task_id);
      }
    }
  }, [location.search, taskAdded]);
  const UpdateCheckListSequence = async (checklist_id, sequence) => {
    const formData = new FormData();
    formData.append("checklist_id", checklist_id);
    formData.append("sequence", sequence);

    try {
      const response = await updateChecklistSequence(formData);
      console.log(response);
      if (response.success) {
        console.log("Success");
      } else {
        console.log("unable to update");
      }
    } catch (error) {
      toast.error("Please Check Your Internet , Try again! ", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const Update_Task_Checklist = async (user_id, taskid, checklistid) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("task_id", taskid);
    formData.append("check_id", checklistid);

    try {
      const res = await UpdateTaskAction(formData);

      if (res.success) {
        console.log("Success");
      }
    } catch (error) {
      toast.error("Please Check Your Internet , Try again! ", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
    }
  };
  const Updatetaskchecklist = async (taskid, checklistid) => {
    Update_Task_Checklist(user_id, taskid, checklistid);
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("task_id", taskid);
    formData.append("checklist_id", checklistid);
    try {
      const response = await Updatetaskchecklist(formData);
      // console.log(response);
      if (response.success) {
        console.log("Success");
      } else {
        console.log("unable to update");
      }
    } catch (error) {
      toast.error("Please Check Your Internet , Try again! ", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const onDragEndTask = (result) => {
    console.log(result);
    if (!result.destination) return;

    if (
      result.destination.index === result.source.index &&
      result.type === "COLUMN"
    )
      return;

    const { source, destination, draggableId, type } = result;

    if (type === "COLUMN") {
      const sourceIndex = boardData.findIndex(
        (e) => e.id === draggableId
      );
      console.log(sourceIndex)
      console.log("column")
      const movedSection = boardData[sourceIndex];
      const newData = [...boardData];
      newData.splice(sourceIndex, 1);
      newData.splice(destination.index, 0, movedSection);

      setboardData(newData);

      if (source.index > destination.index) {
        const otherIndex = destination.index - 1;
        const rightIndex = destination.index;
        const rightChecklistId = parseInt(boardData[rightIndex]?.sequence);
        const otherChecklistId = parseInt(boardData[otherIndex]?.sequence);

        console.log("Checklist left if:", otherChecklistId);
        console.log("Checklist right if:", rightChecklistId);
        const mean = (otherChecklistId + rightChecklistId) / 2;
        console.log("Mean:", mean);

        if (!otherChecklistId) {
          console.log("first index");
          const mean = (0 + rightChecklistId) / 2;
          console.log("Mean if:", mean);

          newData[destination.index].sequence = mean;
          setboardData(newData);
          console.log(boardData);
          UpdateCheckListSequence(result.draggableId.split("_")[1], mean);

          return;
        }
        console.log("------");
        newData[destination.index].sequence = mean;
        setboardData(newData);
        console.log(boardData);

        UpdateCheckListSequence(result.draggableId.split("_")[1], mean);
      } else {
        const leftIndex = destination.index;
        const rightIndex = destination.index + 1;

        const leftChecklistId = parseInt(boardData[leftIndex]?.sequence);
        const rightChecklistId = parseInt(boardData[rightIndex]?.sequence);

        console.log("Checklist Left else:", leftChecklistId);
        console.log("Checklist Right else:", rightChecklistId);
        const mean = (leftChecklistId + rightChecklistId) / 2;
        console.log("Mean:", mean);

        if (!rightChecklistId) {
          console.log("last index");
          console.log("last index", leftChecklistId + 1);
          newData[destination.index].sequence = mean + 1;
          setboardData(newData);
          console.log(boardData);
          UpdateCheckListSequence(result.draggableId.split("_")[1], mean + 1);
          return;
        }
        console.log("cjdcjdc");
        newData[destination.index].sequence = mean;
        setboardData(newData);
        console.log(boardData);

        UpdateCheckListSequence(result.draggableId.split("_")[1], mean);
      }
    } else {
      console.log("mil ja kahi");
      const sourceSectionIndex = boardData.findIndex(
        (e) => e.id.toString() === source.droppableId
      );
      const destinationSectionIndex = boardData.findIndex(
        (e) => e.id.toString() === destination.droppableId
      );

      if (sourceSectionIndex === -1 || destinationSectionIndex === -1) {
        console.log("Invalid section index");
        return;
      }

      const sourceSection = boardData[sourceSectionIndex];
      const destinationSection = boardData[destinationSectionIndex];

      const sourceTasks = sourceSection.tasks;
      const destinationTasks = destinationSection.tasks;

      if (source.droppableId === destination.droppableId) {
        const reorderedTasks = Array.from(sourceTasks);
        const [movedTask] = reorderedTasks.splice(source.index, 1);
        console.log("moving");
        reorderedTasks.splice(destination.index, 0, movedTask);

        const updatedSection = { ...sourceSection, tasks: reorderedTasks };
        const newData = [...boardData];
        newData.splice(sourceSectionIndex, 1, updatedSection);
        console.log("salamat rahe");
        if (source.index > destination.index) {
          const otherIndex = destination.index - 1;
          const rightIndex = destination.index;
          const rightChecklistId = parseInt(
            boardData[destinationSectionIndex].tasks[rightIndex]?.sequence
          );
          const otherChecklistId = parseInt(
            boardData[destinationSectionIndex].tasks[otherIndex]?.sequence
          );

          console.log("Checklist left if:", otherChecklistId);
          console.log("Checklist right if:", rightChecklistId);
          const mean = (otherChecklistId + rightChecklistId) / 2;
          console.log("Mean:", mean);

          if (!otherChecklistId) {
            console.log("first index");
            const mean = (0 + rightChecklistId) / 2;
            console.log("Mean if:", mean);

            Updatetaskchecklist(
              result.draggableId.split("_")[1],
              result.destination.droppableId.split("_")[1],
              mean
            );
            newData[destinationSectionIndex].tasks[rightIndex].sequence = mean; // Update sequence for the dragged task
            setboardData(newData);

            return;
          }
          console.log("------");
          Updatetaskchecklist(
            result.draggableId.split("_")[1],
            result.destination.droppableId.split("_")[1],
            mean
          );
          newData[destinationSectionIndex].tasks[rightIndex].sequence = mean;
          setboardData(newData);
        } else {
          const leftIndex = destination.index;
          const rightIndex = destination.index + 1;

          const leftChecklistId = parseInt(
            boardData[destinationSectionIndex].tasks[leftIndex]?.sequence
          );
          const rightChecklistId = parseInt(
            boardData[destinationSectionIndex].tasks[rightIndex]?.sequence
          );

          console.log("Checklist Left else:", leftChecklistId);
          console.log("Checklist Right else:", rightChecklistId);
          const mean = (leftChecklistId + rightChecklistId) / 2;
          console.log("Mean:", mean);

          if (!rightChecklistId) {
            console.log("last index");
            console.log("last index", leftChecklistId + 1);
            Updatetaskchecklist(
              result.draggableId.split("_")[1],
              result.destination.droppableId.split("_")[1],
              mean
            );
            newData[destinationSectionIndex].tasks[leftIndex].sequence =
              mean + 1; // Update sequence for the dragged task
            setboardData(newData);
            //

            return;
          }
          console.log("cjdcjdc");

          Updatetaskchecklist(
            result.draggableId.split("_")[1],
            result.destination.droppableId.split("_")[1],
            mean
          );
          newData[destinationSectionIndex].tasks[leftIndex].sequence = mean; // Update sequence for the dragged task
          setboardData(newData);
        }
        setboardData(newData);
      } else {
        console.log("dostana------");
        const [movedTask] = sourceTasks.splice(source.index, 1);
        destinationTasks.splice(destination.index, 0, movedTask);

        const updatedSourceSection = { ...sourceSection, tasks: sourceTasks };
        const updatedDestinationSection = {
          ...destinationSection,
          tasks: destinationTasks,
        };

        const newData = [...boardData];
        newData.splice(sourceSectionIndex, 1, updatedSourceSection);
        newData.splice(destinationSectionIndex, 1, updatedDestinationSection);

        if (source.index > destination.index) {
          const otherIndex = destination.index - 1;
          const rightIndex = destination.index;
          console.log(`right index ${rightIndex}`);
          const rightChecklistId = parseInt(
            boardData[destinationSectionIndex].tasks[rightIndex]?.sequence
          );
          const otherChecklistId = parseInt(
            boardData[destinationSectionIndex].tasks[otherIndex]?.sequence
          );
          console.log(boardData);
          console.log("Checklist left if:", otherChecklistId);
          console.log("Checklist right if:", rightChecklistId);
          const mean = (otherChecklistId + rightChecklistId) / 2;
          console.log("Mean:", mean);

          if (!otherChecklistId) {
            console.log("first index");
            const mean = (0 + rightChecklistId) / 2;
            console.log("Mean if:", mean);
            Updatetaskchecklist(
              result.draggableId.split("_")[1],
              result.destination.droppableId.split("_")[1],
              mean
            );
            newData[destinationSectionIndex].tasks[rightIndex].sequence = mean; // Update sequence for the dragged task
            setboardData(newData);

            return;
          }

          Updatetaskchecklist(
            result.draggableId.split("_")[1],
            result.destination.droppableId.split("_")[1],
            mean
          );
          newData[destinationSectionIndex].tasks[rightIndex].sequence = mean; // Update sequence for the dragged task
          setboardData(newData);
        } else {
          const leftIndex = destination.index;
          const rightIndex = destination.index + 1;

          const leftChecklistId = parseInt(
            boardData[destinationSectionIndex].tasks[leftIndex]?.sequence
          );
          const rightChecklistId = parseInt(
            boardData[destinationSectionIndex].tasks[rightIndex]?.sequence
          );
          console.log(`right index ----${rightIndex}`);
          console.log(boardData.tasks);

          console.log("Checklist Left else:", leftChecklistId);
          console.log("Checklist Right else:", rightChecklistId);
          const mean = (leftChecklistId + rightChecklistId) / 2;
          console.log("Mean:", mean);

          if (!rightChecklistId) {
            console.log("last index");
            console.log("last index", leftChecklistId + 1);
            // newData[destination.index].sequence = mean + 1;
            Updatetaskchecklist(
              result.draggableId.split("_")[1],
              result.destination.droppableId.split("_")[1],
              mean
            );
            updatedDestinationSection.tasks[leftIndex].sequence = mean + 1; // Update sequence for the dragged task
            setboardData(newData);

            return;
          }

          Updatetaskchecklist(
            result.draggableId.split("_")[1],
            result.destination.droppableId.split("_")[1],
            mean
          );
          updatedDestinationSection.tasks[leftIndex].sequence = mean; // Update sequence for the dragged task
          setboardData(newData);
        }

        setboardData(newData);
      }
    }
  };
  const [selectedSectionTitles, setSelectedSectionTitles] = useState([]);

  const filteredTasks = (boardData) => {
    if (taskFilter.length === 0) {
      return boardData;
    }

    const isFilterCreatedByMe = taskFilter.includes("Created by me");
    const isFilterAssignedtome = taskFilter.includes("Assigned to me");

    const filteredTasks = boardData.map((section) => {
      return {
        ...section,
        tasks: section.tasks.filter((task) => {
          const createdByUserId = task.task_created_by?.id;
          const orgstatus = task.task_status;

          if (isFilterCreatedByMe && isFilterAssignedtome) {
            // Both checkboxes selected, show all tasks
            return true;
          } else if (isFilterCreatedByMe && createdByUserId) {
            // Only "Created by me" selected
            return createdByUserId.toString() === user_id.toString();
          } else if (isFilterAssignedtome && createdByUserId) {
            // Only "Assigned to me" selected
            return createdByUserId.toString() !== user_id.toString();
          }

          return false;
        }),
      };
    });

    console.log("Filtered sections:", filteredTasks.length);
    console.log(
      "Filtered tasks:",
      filteredTasks.reduce((total, section) => total + section.tasks.length, 0)
    );
    console.log(user_id.toString());

    return filteredTasks;
  };
  useEffect(() => {
    const allSectionTitles = boardData.map((section) =>
      section.title.toLowerCase()
    );
    setSelectedSectionTitles(allSectionTitles);
  }, []);
  const shouldRenderSection = (section) => {
    if (selectedSectionTitles.length === 0) {
      return true; // Hide all sections when no checkboxes are selected
    } else {
      const lowercaseTitle = section.title.toLowerCase();
      return selectedSectionTitles.includes(lowercaseTitle);
    }
  };
  const filteredTaskData = boardData.map((section) => {
    const tasksFilteredByCreated = filteredTasks([section]);
    const filteredTasksByStatus = tasksFilteredByCreated[0].tasks.filter(
      (task) => {
        return (
          selectedStatusIds.length === 0 ||
          selectedStatusIds.includes(String(task.task_status.id))
        );
      }
    );

    return {
      ...section,
      tasks: filteredTasksByStatus,
    };
  });

  useEffect(() => {
    if (filteredTaskData) {
      // Apply filtering
      const filtered = filteredTaskData.map((section) => ({
        ...section,
        tasks: section.tasks.filter((task) => {
          // Check if task or its title is undefined before accessing the title property
          return task.task_topic
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }),
      }));

      // Set filtered data only if searchQuery has changed
      if (JSON.stringify(filtered) !== JSON.stringify(filteredItems)) {
        setFilteredItems(filtered);
      }
    }
  }, [searchQuery, filteredTaskData, filteredItems]);
  console.log(filteredItems);
  const handleIconClickSectionTitle = (sectionId, currentTitle) => {
    setEditingSectionId(sectionId);
    setEditedSectionTitle(currentTitle);
  };
  const handleSectionTitleChange = (e) => {
    setEditedSectionTitle(e.target.value);
  };
  const UpdateSectionTitle = async (section_id, section_title) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("check_id", section_id);
    formData.append("name", section_title);
    console.log(section_id);
    try {
      const response = await UpdateProjectSectionTitle(formData);
      console.log(response);
      if (response.success) {
        console.log("Success");
        // window.location.reload();
      } else {
        console.log("unable to update");
      }
    } catch (error) {}
  };
  // -----------------Delete Section
  const [isModalOpenDeleteSection, setIsModalOpenDeleteSection] =
    useState(false);

  const [taskDeleteIDSection, setTaskDeleteIDSection] = useState("");
  function openModalDeleteSection(taskId, event) {
    event.stopPropagation();
    console.log(taskId);
    const numericId = taskId.split("_")[1];
    setTaskDeleteIDSection(numericId);
    setIsModalOpenDeleteSection(true);
  }

  function closeModalDeleteSection() {
    setIsModalOpenDeleteSection(false);
  }
  const handleDeleteSection = async () => {
    //   deleteDataFromAPI(`${DeleteSection}?check_id=${taskDeleteIDSection}&user_id=${user_id}`)
    await deleteSection(taskDeleteIDSection, user_id)
      .then((res) => {
        if (res.success) {
          // window.location.reload();
          toast.success("Section Deleted Successfully");
          console.log("Task deleted successfully");
          closeModalDeleteSection();
          GetBoardData(id);
        } else {
          if (res.success === false)
            toast.error("Task has been Failed to delete task", {
              position: "top-center",
              autoClose: 2000,
            });
          // window.location.reload();
          closeModalDeleteSection();
          console.error("Failed to delete task.");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };
  const handleAddSection = () => {
    createChecklist(sectionName);
    console.log("Adding section:", sectionName);

    const newSection = {
      id: sections.length + 1,
      name: sectionName,
    };

    setSections([...sections, newSection]);

    setSectionName("");
    setShowInput(false);
    // window.location.reload();
  };
  const createChecklist = async (sectionName) => {
    console.log(sectionName);
    if (sectionName.length > 20) {
      toast.error("Section name should not exceed 20 characters", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    const formData = new FormData();
    formData.append("board", idFromURL);
    formData.append("name", sectionName);

    try {
      const res = await addBoardChecklist(formData);

      if (res.success) {
        console.log("Success");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Please Check Your Internet , Try again! ", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
    }
  };
  const [modalTaskSelfIsOpen, setTaskSelfModalIsOpen] = useState(false);

  const openTaskSelf = (section_id) => {
    localStorage.setItem("section", section_id);

    closeTaskSelf();
    setTaskSelfModalIsOpen(true);
  };

  const closeTaskSelf = () => {
    setTaskSelfModalIsOpen(false);
  };
  const openEmployeeTaskOthers = () => {
    closeTaskOthers();
    setTaskSelfModalIsOpen(true);
  };
  const closeTaskOthers = () => {
    setTaskOthersModalIsOpen(false);
  };
  const [isModalChatOpen, setIsModalChatOpen] = useState(false);
  const [isModalOpenDeleteTask, setIsModalOpenDeleteTask] = useState(false);
  const [taskDeleteID, setTaskDeleteID] = useState("");
  function openModalDeleteTask(taskId, event) {
    event.stopPropagation();
    console.log(taskId);
    setTaskDeleteID(taskId);
    setIsModalOpenDeleteTask(true);
    setIsModalChatOpen(false);
  }

  function closeModalDeleteTask() {
    setIsModalOpenDeleteTask(false);
    setIsModalChatOpen(false);
  }

  const handleDeleteTask = async () => {
    setboardData((prevTaskList) => {
      console.log(prevTaskList);

      const updatedTaskList = JSON.parse(JSON.stringify(prevTaskList));

      const boardIndex = updatedTaskList.findIndex((board) =>
        board.tasks.some((task) => task.id === taskDeleteID)
      );

      if (boardIndex !== -1) {
        const taskIndex = updatedTaskList[boardIndex].tasks.findIndex(
          (task) => task.id === taskDeleteID
        );

        if (taskIndex !== -1) {
          updatedTaskList[boardIndex].tasks.splice(taskIndex, 1);
        }
      }

      return updatedTaskList;
    });

    // deleteDataFromAPI(`${DeleteTask}?task_id=${taskDeleteID.split("_")[1]}&user_id=${user_id}`)
    const taskId = taskDeleteID.split("_")[1];
    await deleteProjectTask(taskId, user_id)
      .then((res) => {
        if (res.success) {
          // window.location.reload();
          toast.success("Task has been moved to Trash", {
            position: "top-center",
            autoClose: 2000,
          });
          console.log("Task deleted successfully");
          closeModalDeleteTask();
        } else {
          if (res.success === false)
            toast.error("Task has been Failed to delete", {
              position: "top-center",
              autoClose: 2000,
            });
          window.location.reload();
          console.error("Failed to delete task.");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };
  const [createTaskInList, setCreateTaskInList] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [taskTopicText, setTaskTopicText] = useState("");
  const [taskid, setTaskID] = useState("");
  const [createdBy_id, setcreatedBy_id] = useState("");
  const [createdFirstName, setCreatedFirstName] = useState("");
  const [endDate, setEndDate] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [createdSecondName, setCreatedSecondName] = useState("");
  const [chatsData, setChatsData] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const openChatModal = (
    taskId,
    createdFirst,
    createdSecond,
    createdDate,
    due_dte,
    created_by_id,
    start_date,
    end_date
  ) => {
    setStartDate(start_date);
    setEndDate(end_date);
    const dateTimeString = due_dte ? due_dte.split("+")[0] : "";

    const targetDate = new Date(dateTimeString);

    setCreatedFirstName(createdFirst);
    setCreatedSecondName(createdSecond);
    setCreatedDate(createdDate);
    setDueDate(due_dte ? targetDate : "");
    setcreatedBy_id(created_by_id);
    setChatsData([]);
    fetchOrg_assignAlready(id, taskId.split("_")[1]);
    // Get_Task_Attachment(taskId.split("_")[1]);
    // Get_Checklist_Task(taskId.split("_")[1]);
    // setTaskIdForTaskCheckList(taskId.split("_")[1]);
    const actualTaskId = taskId.split("_")[1];
    setCurrentTaskId(actualTaskId);
    // Get_SubChecklist_Tasks(currentTaskId);
    // get_Maintask_data_dependencies(actualTaskId);
    console.log("oko ok koo ");
    const task = boardData
      .flatMap((section) => section.tasks)
      .find((task) => task.id.toString() === taskId);
    if (task) {
      const section = boardData.find((section) =>
        section.tasks.some((t) => t.id.toString() === taskId)
      );
      if (section) {
        setSectionName(section.title);
      }
      setTaskTopicText(task.task_topic);
      setTaskDescription(task.task_description);
      setTaskStatus(task.task_status);
      //   to_show_status_on_details(task.task_status);
      to_show_section_on_details(section.title);
      //   setAttachments(task.attachments || []);
      //   setAssignedDate(task.due_date || "");
      //   // Add your code to open the chat modal here
      //   console.log(taskId);
      //   Get_Profile();
      //   Get_Chat_nd_Activities(taskId.split("_")[1]);
      //   GetTaskChat(taskId.split("_")[1]);
      //   Get_Checklist_Task(taskId.split("_")[1]);
      setTaskID(taskId.split("_")[1]);
      //   settaskidForSocket(taskId.split("_")[1]);
      //   GetComment(taskId.split("_")[1]);
      Get_BoardSection();
      setIsModalChatOpen(true);
    }
  };
  const [usersAssignBoard3, setUsersAssignBoard3] = useState([]);
  const [usersAssignAlready, setUsersAssignAlready] = useState([]);
  const [showStatusChecklist1, setShowStatusChecklist1] = useState([]);
  const [selectedEmail3, setSelectedEmail3] = useState("");
  const fetchOrg_assignAlready = async (id, taskid) => {
    const user_id = localStorage.getItem("user_id");
    try {
      const jsonData = await getTaskUsersAssign(user_id, taskid);
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

  const UpdateUserTask = async (taskid) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("task_id", taskid);
    formData.append("task_topic", taskTopicText);
    formData.append("task_description", taskDescription);
    // formData.append('due_date',dueDate);

    try {
      const response = await updateVibeUserTask(formData);
      console.log(response);
      if (response.success) {
        console.log("Success");
        // window.location.reload();
      } else {
        console.log("unable to update");
      }
    } catch (error) {}
  };
  console.log(taskTopicText);
  const [usersAssignBoard, setUsersAssignBoard] = useState([]);
  const fetchOrg_assignData = async (board_id, taskid) => {
    const org_id = localStorage.getItem("VIBEORGID");
    const params = {
      user_id: user_id,
    };
    try {
      const jsonData = await getVibeUsers(user_id);
      if (jsonData.success) {
        console.log(jsonData.data);
        const usersData = jsonData.data;
        setboardAssignedEmail(usersData.assign_to);

        setUsersAssignBoard3(usersData);

        setUsersAssignBoard(usersData);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const handleIconClick3 = () => {
    fetchOrg_assignAlready(id, taskid);
    fetchOrg_assignData(id, taskid);
    setIsModalOpen3(true);
    //setSelectedEmail(email);
  };
  const [isCompleted, setIsCompleted] = useState(false);
  const [itemtaskTopicText, setItemTaskTopicText] = useState([]);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const Get_Checklist_Task = async (task_id, checksubtaskid) => {
    try {
      const data = await getVibeTaskChecklist(user_id, task_id);

      if (data.success) {
        const taskTopics = data.data;
        setItems(taskTopics);

        const extractedNames = data.data.map((item) => item.name);

        setItemTaskTopicText(extractedNames);
        console.log(extractedNames);

        const extractedChecklist = data.data.map((item) => item.completed);

        setIsCompleted(extractedChecklist);
        console.log(extractedChecklist);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const Update_Assigned_Task = async (idList3) => {
    const formData = new FormData();
    formData.append("task_id", taskid);
    formData.append("user_id", user_id);

    const assignToValues = idList3.join(",");

    formData.append("assign_to", assignToValues);

    try {
      const response = await updateVibeUserTask(formData);
      console.log(response);
      if (response.success) {
        console.log("Success");
        Get_Checklist_Task(taskid);
      } else {
        console.log("unable to update");
      }
    } catch (error) {
      // toast.error('Please Check Your Internet , Try again! ',{position: "top-center",autoClose: 2000})
    }
  };
  const handleConfirmClick3 = () => {
    const idList3 = selectedEmail3.map((email) => parseInt(email.value));
    console.log(idList3);
    Update_Assigned_Task(idList3);

    console.log(selectedEmail3);
    const labelList = selectedEmail3.map((email) => email.label).join(", ");
    console.log(labelList);
    setShowStatusChecklist1(labelList);
    // setIsDropdownOpen3(false);
    setIsModalOpen3(false);
  };

  const [isModalOpennn, setIsModalOpennn] = useState(false);
  const [TempdueDate, setTempdueDate] = useState(null);
  const [isModalOpenn, setIsModalOpenn] = useState(false);
  const handleDateChange1 = async (date) => {
    setTempdueDate(date);
  };
  const [taskStatus, setTaskStatus] = useState("");

  return (
    <div className="mx-2 ">
      {modalTaskSelfIsOpen && (
        <ProjectTaskSelf
          onClose={closeTaskSelf}
          open={openEmployeeTaskOthers}
          BoardAssignedemails={boardAssignedEmail}
          setCreatedTaskId={setCreatedTaskId}
        />
      )}
      {createTaskInList && (
        <CreateProjectTask
          onClose={() => setCreateTaskInList(false)}
          open={openEmployeeTaskOthers}
          BoardAssignedemails={boardAssignedEmail}
          setCreatedTaskId={setCreatedTaskId}
          setTaskAdded={setTaskAdded}
        />
      )}
      {isModalChatOpen && (
        <ProjectDetailsModal
          onclose={() => setIsModalChatOpen(false)}
          setTaskTopicText={setTaskTopicText}
          taskTopicText={taskTopicText}
          UpdateUserTask={() => UpdateUserTask(taskid)}
          taskid={taskid}
          createdBy_id={createdBy_id}
          selectedEmail={selectedEmail}
          handleIconClick3={handleIconClick3}
          isModalOpen3={isModalOpen3}
          selectedEmail3={selectedEmail3}
          usersAssignBoard3={usersAssignBoard3}
          setSelectedEmail3={setSelectedEmail3}
          handleConfirmClick3={handleConfirmClick3}
          setIsModalOpen3={setIsModalOpen3}
          setIsModalOpennn={setIsModalOpennn}
          isModalOpennn={isModalOpennn}
          handleDateChange1={handleDateChange1}
          TempdueDate={TempdueDate}
          dueDate={dueDate}
          setTaskDescription={setTaskDescription}
          taskDescription={setTaskDescription}
          setDueDate={setDueDate}
          taskStatus={taskStatus}
          taskMoreStatus={taskMoreStatus}
          setIsModalOpenn={setIsModalOpenn}
          setTaskStatus={setTaskStatus}
          GetBoardData={GetBoardData}
          isModalOpenn={isModalOpenn}
          taskMoreStatusList={taskMoreStatusList}
          taskMoreStatusIdList={taskMoreStatusIdList}
          // UpdatetaskStatus={UpdatetaskStatus}
          currentTaskId={currentTaskId}
          taskMoreSectionIdList={taskMoreSectionIdList}
          taskMoreSection={taskMoreSection}
          settaskMoreSection={settaskMoreSection}
          taskMoreSectionList={taskMoreSectionList}
        />
      )}

      <div className="grid grid-cols-1 w-full">
        <div className="flex items-center justify-between w-full ">
          <div className="flex gap-4 mb-2">
            <div className="flex gap-4 bg-gray-200 w-32 rounded-md">
              <button
                className={`transition-all duration-150 ${
                  taskView === "Kanban"
                    ? "shadow-custom-all-sides font-medium bg-white p-1 rounded-md"
                    : "mx-1"
                }`}
                title="Kanban View"
                onClick={() => handleViewChange("Kanban")}
              >
                Kanban
              </button>
              <button
                className={`transition-all duration-150 ${
                  taskView === "List"
                    ? "shadow-custom-all-sides font-medium bg-white p-1 px-4 rounded-md"
                    : ""
                }`}
                title="List View"
                onClick={() => handleViewChange("List")}
              >
                List
              </button>
            </div>

            {activeView === "Kanban" && (
              <div className="flex items-center gap-2 border rounded-md p-1 px-2">
                {taskDynamicStatus.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <label
                      style={{ color: "black" }}
                      className="flex items-center gap-2"
                    >
                      <input
                        name="filterStatus"
                        type="checkbox"
                        value={option.value}
                        onChange={handleCheckboxChangeStatus}
                      />
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
            {activeView === "List" && (
              <div className="flex items-center gap-2 border rounded-md p-1 px-2">
                {taskDynamicStatusWithAll.map((option, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="statusFilter"
                      value={option.value.toString()}
                      checked={selectedStatusId === option.value.toString()}
                      onChange={handleStatusChange}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )}
          </div>
          {activeView === "List" && (
            <button
              className="p-1 px-4 rounded-md text-white flex items-center gap-2 "
              style={{ background: themeColor }}
              onClick={() => setCreateTaskInList(true)}
            >
              <BiPlus /> Add Task
            </button>
          )}
        </div>
        {activeView === "Kanban" && (
          <section
            style={{
              overflowX: "auto",
              overflowY: "scroll",
            }}
            className="scrollable-content section-table-height
          "
          >
            {/* board-height */}

            <div className="">
              <DragDropContext onDragEnd={onDragEndTask}>
                <Droppable
                  droppableId="board"
                  direction="horizontal"
                  type="COLUMN"
                >
                  {(providedSection) => (
                    <div
                      className=""
                      style={{
                        display: "flex",
                        // marginTop: "40px",
                        alignItems: "flex-start",
                        flexWrap: "nowrap",
                      }}
                      {...providedSection.droppableProps}
                      ref={providedSection.innerRef}
                    >
                      {isLoading ? (
                        <div
                          className=""
                          style={{ textAlign: "center", color: fontColor }}
                        >
                          <center className="">
                            <div
                              className="spinner-border"
                              style={{ opacity: 0.3 }}
                              role="status"
                            >
                              <span className="sr-only"></span>
                            </div>
                            <br />
                            <span style={{ opacity: 0.6, color: fontColor }}>
                              Please wait...
                            </span>
                          </center>
                        </div>
                      ) : filteredItems.length > 0 ? (
                        filteredItems.map(
                          (section, index) =>
                            shouldRenderSection(
                              section,
                              selectedSectionTitles
                            ) && (
                              <Draggable
                                key={section.id.toString()}
                                draggableId={section.id.toString()}
                                index={index}
                              >
                                {(providedSection, snapshotSection) => (
                                  <div
                                    className=" "
                                    ref={providedSection.innerRef}
                                    {...providedSection.draggableProps}
                                    {...providedSection.dragHandleProps}
                                    style={{
                                      ...providedSection.draggableProps.style,
                                      opacity: snapshotSection.isDragging
                                        ? "0.7"
                                        : "1",
                                      marginRight: 10,
                                    }}
                                  >
                                    <Droppable
                                      key={section.id}
                                      droppableId={section.id}
                                    >
                                      {(provided) => (
                                        <div
                                          {...provided.droppableProps}
                                          className=" primary-color-shade1"
                                          ref={provided.innerRef}
                                        >
                                          <div
                                            className="p-2 text-white rounded-md text-center my-2 w-72 flex items-center justify-between"
                                            style={{
                                              background: themeColor,
                                            }}
                                          >
                                            {editingSectionId === section.id ? (
                                              <div className="flex items-center">
                                                <input
                                                  type="text"
                                                  value={editedSectionTitle}
                                                  onChange={
                                                    handleSectionTitleChange
                                                  }
                                                  onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                      e.preventDefault();
                                                      setEditingSectionId(null);
                                                      UpdateSectionTitle(
                                                        section.id,
                                                        editedSectionTitle
                                                      );
                                                    }
                                                  }}
                                                  onBlur={() => {
                                                    setEditingSectionId(null);
                                                    UpdateSectionTitle(
                                                      section.id,
                                                      editedSectionTitle
                                                    );
                                                  }}
                                                  style={{
                                                    background: "#132A3A",
                                                    border: "none",
                                                    width: "90%",
                                                    color: "white",
                                                    paddingLeft: 4,
                                                    paddingRight: 4,
                                                    borderRadius: 4,
                                                  }}
                                                  autoFocus
                                                />
                                                <span
                                                  onClick={() => {
                                                    setIsEditing(false);
                                                    UpdateSectionTitle(
                                                      section.id,
                                                      editedSectionTitle
                                                    );
                                                  }}
                                                >
                                                  <FaCheck
                                                    className="cursor-pointer"
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
                                              <div className="flex items-center gap-2">
                                                <b>{section.title}</b>
                                                <span
                                                  onClick={() =>
                                                    handleIconClickSectionTitle(
                                                      section.id,
                                                      section.title
                                                    )
                                                  }
                                                >
                                                  <FaPencilAlt
                                                    className="cursor-pointer"
                                                    style={{
                                                      //   marginLeft: 10,
                                                      fontSize: 14,
                                                    }}
                                                    title="Edit"
                                                  />
                                                </span>
                                              </div>
                                            )}
                                            <FaTrashAlt
                                              title="Delete Section"
                                              className="cursor-pointer "
                                              style={{ fontSize: 14 }}
                                              onClick={(event) =>
                                                openModalDeleteSection(
                                                  section.id,
                                                  event
                                                )
                                              }
                                            />
                                          </div>

                                          <div
                                            className=" "
                                            style={{
                                              maxHeight: 400,
                                              overflow: "auto",
                                            }}
                                          >
                                            {/* <div className="board-height " > */}

                                            {/* <div className="upcoming-height-trash  " style={{}}> */}
                                            {section.tasks.map(
                                              (task, index) => {
                                                const isHighlighted =
                                                  task.id.split("_")[1] ===
                                                  taskidFromURL; // Replace 'specifiedID' with the ID you want to match
                                                const isCreatedTaskId =
                                                  task.id.split("_")[1] ==
                                                  createdTaskid;

                                                if (
                                                  !cardRefs.current[task.id]
                                                ) {
                                                  cardRefs.current[task.id] = {
                                                    element: null,
                                                    isHighlighted: false,
                                                  };
                                                  cardRefs.current[task.id] = {
                                                    element: null,
                                                    isCreatedTaskId: false,
                                                  };
                                                }

                                                cardRefs.current[
                                                  task.id
                                                ].isHighlighted = isHighlighted;
                                                cardRefs.current[
                                                  task.id
                                                ].isCreatedTaskId =
                                                  isCreatedTaskId;

                                                console.log(
                                                  "🚀 ~ useEffect ~ createdTaskId:",
                                                  isCreatedTaskId
                                                );

                                                return (
                                                  <Draggable
                                                    key={task.id.toString()}
                                                    draggableId={task.id.toString()}
                                                    index={index}
                                                  >
                                                    {(provided, snapshot) => (
                                                      <div
                                                        // ref={provided.innerRef}
                                                        ref={(el) => {
                                                          provided.innerRef(el);
                                                          cardRefs.current[
                                                            task.id
                                                          ].element = el;
                                                          if (
                                                            (isHighlighted &&
                                                              el) ||
                                                            (isCreatedTaskId &&
                                                              el)
                                                          ) {
                                                            el.scrollIntoView({
                                                              behavior:
                                                                "smooth",
                                                              block: "center",
                                                            });
                                                            localStorage.removeItem(
                                                              "createdTaskId"
                                                            );
                                                          }
                                                        }}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                          ...provided
                                                            .draggableProps
                                                            .style,
                                                          opacity:
                                                            snapshot.isDragging
                                                              ? "0.7"
                                                              : "1",
                                                          color: "#000",
                                                        }}
                                                      >
                                                        <div
                                                          // ref={cardRef}
                                                          className="shadow-custom-all-sides rounded-xl m-2"
                                                          style={{
                                                            animation:
                                                              isHighlighted
                                                                ? "color 5s"
                                                                : "none",
                                                            // borderRadius: 6,
                                                            color: "black",
                                                            fontSize: "16",
                                                            minHeight: 30,
                                                            marginBottom: 8,
                                                            padding: 6,
                                                            // marginTop: 2,
                                                            // marginLeft: 3,
                                                            // marginRight: 3,
                                                            backgroundColor:
                                                              "white",
                                                          }}
                                                          // onClick={() => openChatModal(task.id)}
                                                          onClick={() =>
                                                            openChatModal(
                                                              task.id,
                                                              task
                                                                .task_created_by
                                                                .firstname,
                                                              task
                                                                .task_created_by
                                                                .lastname,
                                                              task.task_created_at,
                                                              task.task_due_date,
                                                              task
                                                                .task_created_by
                                                                .id,
                                                              task.start_date,
                                                              task.end_date
                                                            )
                                                          }
                                                        >
                                                          <div
                                                            className=""
                                                            style={{
                                                              display: "flex",
                                                              justifyContent:
                                                                "flex-end",
                                                            }}
                                                          >
                                                            {task.urgent_status ===
                                                              true && (
                                                              <span
                                                                style={{
                                                                  backgroundColor:
                                                                    "#00b272",
                                                                  color: "#fff",
                                                                  borderRadius:
                                                                    "0px 6px 0px 10px",
                                                                  fontSize: 12,
                                                                  margin:
                                                                    "-6px",
                                                                }}
                                                                className="pr-2 pl-2"
                                                              >
                                                                <b>Urgent</b>
                                                              </span>
                                                            )}
                                                          </div>
                                                          {task.task_topic}
                                                          {/* <div style={{textAlign:'center', fontSize:10,borderRadius:20,color:'white',padding:'1px',marginTop:'4px',width:'64px',backgroundColor: statusColors[task.task_status.toLowerCase()] || '#245272'}}>
                                                                        {task.task_status}
                                                              </div> */}
                                                          {showStatus ? (
                                                            <div
                                                              style={{
                                                                display: "flex",
                                                              }}
                                                            >
                                                              <div
                                                                onClick={(
                                                                  e
                                                                ) => {
                                                                  e.stopPropagation();
                                                                  setshowStatus(
                                                                    false
                                                                  );
                                                                }}
                                                                className="px-4 font-medium"
                                                                style={{
                                                                  textAlign:
                                                                    "center",
                                                                  cursor:
                                                                    "pointer",
                                                                  fontSize: 10,
                                                                  borderRadius: 20,
                                                                  color:
                                                                    "white",
                                                                  //   padding:
                                                                  //     "1px",
                                                                  marginTop:
                                                                    "4px",
                                                                  width: "auto",
                                                                  backgroundColor: `${task.task_status.color}`,
                                                                }}
                                                              >
                                                                {
                                                                  task
                                                                    .task_status
                                                                    .status_name
                                                                }
                                                              </div>
                                                              {task.reopened_count >
                                                              0 ? (
                                                                <div
                                                                  className="mt-1"
                                                                  style={{
                                                                    width: 90,
                                                                    textAlign:
                                                                      "center",
                                                                    marginLeft: 0,
                                                                    fontSize: 10,
                                                                    cursor:
                                                                      "default",
                                                                    backgroundColor:
                                                                      "#d33115",
                                                                    borderRadius: 10,
                                                                    color:
                                                                      "white",
                                                                  }}
                                                                >
                                                                  {" "}
                                                                  Reopened :{" "}
                                                                  {
                                                                    task.reopened_count
                                                                  }
                                                                </div>
                                                              ) : (
                                                                <div></div>
                                                              )}
                                                            </div>
                                                          ) : (
                                                            <div
                                                              style={{
                                                                display: "flex",
                                                              }}
                                                            >
                                                              <div
                                                                onClick={(
                                                                  e
                                                                ) => {
                                                                  e.stopPropagation();
                                                                  setshowStatus(
                                                                    true
                                                                  );
                                                                }}
                                                                className="mr-1"
                                                                style={{
                                                                  textAlign:
                                                                    "center",
                                                                  cursor:
                                                                    "pointer",
                                                                  fontSize: 5,
                                                                  borderRadius: 10,
                                                                  color:
                                                                    "white",
                                                                  padding:
                                                                    "1px",
                                                                  marginTop:
                                                                    "4px",
                                                                  width: "36px",
                                                                  height: "8px",
                                                                  backgroundColor: `${task.task_status.color}`,
                                                                }}
                                                              ></div>
                                                              {task.reopened_count >
                                                              0 ? (
                                                                <div
                                                                  className="mt-1"
                                                                  style={{
                                                                    width: 90,
                                                                    textAlign:
                                                                      "center",
                                                                    marginLeft: 0,
                                                                    fontSize: 10,
                                                                    cursor:
                                                                      "default",
                                                                    backgroundColor:
                                                                      "#d33115",
                                                                    borderRadius: 10,
                                                                    color:
                                                                      "white",
                                                                  }}
                                                                >
                                                                  {" "}
                                                                  Reopened :{" "}
                                                                  {
                                                                    task.reopened_count
                                                                  }
                                                                </div>
                                                              ) : (
                                                                <div></div>
                                                              )}
                                                            </div>
                                                          )}
                                                          <div className=" row col-md-12 mt-1">
                                                            {section.title !==
                                                              "Done" &&
                                                              section.title !==
                                                                "In Review" && (
                                                                <div
                                                                  className="col-md-6 p-0"
                                                                  style={{
                                                                    fontSize: 13,
                                                                    display:
                                                                      "flex",
                                                                    justifyContent:
                                                                      "flex-start",
                                                                  }}
                                                                >
                                                                  {/* {calculateRemainingTime(task.task_due_date)} */}
                                                                  <RemainingTime
                                                                    dueDate={
                                                                      task.task_due_date
                                                                    }
                                                                  />
                                                                </div>
                                                              )}
                                                          </div>

                                                          <div
                                                            className=" row col-md-12"
                                                            style={{
                                                              fontSize: 13,
                                                              cursor: "default",
                                                            }}
                                                          >
                                                            Created By :{" "}
                                                            {
                                                              task
                                                                .task_created_by
                                                                .firstname
                                                            }{" "}
                                                            {
                                                              task
                                                                .task_created_by
                                                                .lastname
                                                            }
                                                          </div>
                                                          {/* <div className=' row col-md-12' style={{fontSize:13}}>Assign By : {task.task_created_by.firstname} {task.creattask_created_byed_by.lastname}</div> */}
                                                          <div className="m-1 mt-2">
                                                            <LinearProgressBar
                                                              style={{
                                                                borderRadius: 4,
                                                                height: 6,
                                                              }}
                                                              variant="determinate"
                                                              value={
                                                                task.progress_percentage
                                                              }
                                                            />
                                                          </div>
                                                          <div className="">
                                                            <div
                                                              className=""
                                                              style={{
                                                                fontSize: 13,
                                                              }}
                                                            >
                                                              {task.division}
                                                            </div>
                                                            {/* <div className='col-md-6'style={{fontSize:13,display:'flex', justifyContent:'flex-end'}}>{calculateRemainingTime(task.due_date)}</div> */}
                                                            <div
                                                              className=""
                                                              style={{
                                                                fontSize: 13,
                                                                display: "flex",
                                                                justifyContent:
                                                                  "flex-end",
                                                              }}
                                                            >
                                                              {`${task.progress_percentage}%`}{" "}
                                                            </div>
                                                          </div>

                                                          <div className="">
                                                            <div
                                                              className=""
                                                              style={{
                                                                fontSize: 10,
                                                                paddingTop:
                                                                  "6px",
                                                                color:
                                                                  "darkgray",
                                                              }}
                                                            >
                                                              {ShowFormatedDueDateOnDateField(
                                                                task.task_due_date
                                                              )}
                                                            </div>

                                                            {task
                                                              .task_created_by
                                                              .id ===
                                                            user_id ? (
                                                              <div
                                                                className="flex justify-end"
                                                                onClick={(
                                                                  event
                                                                ) =>
                                                                  openModalDeleteTask(
                                                                    task.id,
                                                                    event
                                                                  )
                                                                }
                                                              >
                                                                <FaTrashAlt
                                                                  className="text-red-400 cursor-pointer"
                                                                  style={{
                                                                    fontSize: 14,

                                                                    marginBottom: 4,
                                                                    cursor:
                                                                      "pointer",
                                                                  }}
                                                                ></FaTrashAlt>
                                                              </div>
                                                            ) : null}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    )}
                                                  </Draggable>
                                                );
                                              }
                                            )}
                                            {provided.placeholder}
                                          </div>

                                          {!show ? (
                                            <div
                                              className="shadow-custom-all-sides flex cursor-pointer items-center justify-center gap-1 py-[10px]  opacity-90 mb-4  rounded-lg bg-white  text-[#555] font-medium text-[15px]"
                                              onClick={() =>
                                                openTaskSelf(section.id)
                                              }
                                            >
                                              <i
                                                className="fa fa-plus ml-2 mr-2"
                                                style={{}}
                                              ></i>{" "}
                                              Add Task
                                            </div>
                                          ) : null}
                                        </div>
                                      )}
                                    </Droppable>
                                  </div>
                                )}
                              </Draggable>
                            )
                        )
                      ) : (
                        <div
                          className="col-md-12"
                          style={{ textAlign: "center" }}
                        >
                          <div className="m-4">
                            <center>
                              No Tasks
                              <br />
                            </center>
                          </div>
                        </div>
                      )}
                      {providedSection.placeholder}

                      {!show ? (
                        <div
                          className="w-full"
                          style={{
                            borderRadius: 15,
                            backgroundColor: "white",
                            color: "black",
                            // padding: "15px",
                          }}
                        >
                          <div>
                            {!showInput ? (
                              <div
                                className="flex w-40 items-center justify-center mt-2 cursor-pointer"
                                style={{
                                  fontSize: "16",
                                  padding: 6,
                                  border: "2px solid #30678edc",
                                  borderRadius: 6,
                                  //   height: 40,
                                  color: "black",
                                }}
                                onClick={() => setShowInput(true)}
                              >
                                <i className="fa fa-plus ml-2 mr-2"></i> Add
                                Section
                              </div>
                            ) : (
                              <div className="w-fit">
                                <input
                                  type="text"
                                  spellcheck="true"
                                  value={sectionName}
                                  onChange={(e) =>
                                    setSectionName(e.target.value)
                                  }
                                  placeholder="Enter section name"
                                  className="col-md-12 mb-2"
                                  style={{
                                    fontSize: "16",
                                    padding: 6,
                                    border: "2px solid #30678edc",
                                    borderRadius: 6,
                                    height: 40,
                                    color: "#fff",
                                    backgroundColor: "#133953",
                                  }}
                                />
                                <br></br>
                                <div className="flex items-center gap-2 justify-end">
                                  <button
                                    onClick={handleAddSection}
                                    className="border-2 p-1 px-4 border-green-400 rounded-md bg-green-400 text-white"
                                  >
                                    Add
                                  </button>
                                  <button
                                    onClick={() => setShowInput(false)}
                                    className="border-2 p-1 px-4 border-red-400 text-red-400 rounded-md"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </section>
        )}
        {activeView === "List" && (
          <section
            style={{}}
            className=" my-2
          "
          >
            {/* board-height */}
            {/* <Table columns={columns} data={tasksList} /> */}
            <Table
              columns={columns}
              data={
                filteredTasksList.length > 0 ? filteredTasksList : tasksList
              }
            />
          </section>
        )}
      </div>
      <div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-1 gap-4 mt-3 mb-5">
        <div className="lg:col-span-4 md:col-span-4 col-span-1">
          <div className="shadow-custom-all-sides rounded-md h-auto">
            <div className="flex justify-between px-5 pt-5 pb-6">
              <p className="text-base text-gray-800 font-semibold">
                Task Summary
              </p>
              <button
                className="relative"
                onClick={() => handleChartDropDownClick(1)}
                ref={(el) => (dropdownRefs.current[1] = el)}
              >
                <BsThreeDotsVertical />
                {chartDropDown === 1 && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 text-start">
                    <h2 className="text-base font-semibold py-2 text-gray-800 px-4">
                      Setting
                    </h2>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another Action
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something Else Here
                    </a>
                  </div>
                )}
              </button>
            </div>
            <Chart
              options={optionsLineColumn}
              series={seriesLineColumn}
              type="line"
              height={350}
            />
          </div>
        </div>
        <div className="lg:col-span-2 md:col-span-2">
          <div className="shadow-custom-all-sides rounded-md h-full">
            <div className="flex justify-between px-5 pt-5 pb-6">
              <p className="text-base text-gray-800 font-semibold">
                Task Completion Status
              </p>
              <button
                className="relative"
                onClick={() => handleChartDropDownClick(2)}
                ref={(el) => (dropdownRefs.current[2] = el)}
              >
                <BsThreeDotsVertical />
                {chartDropDown === 2 && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 text-start">
                    <h2 className="text-base font-semibold py-2 text-gray-800 px-4">
                      Setting
                    </h2>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another Action
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something Else Here
                    </a>
                  </div>
                )}
              </button>
            </div>
            <div className="pb-5">
              <Chart
                options={options}
                series={series}
                type="donut"
                height={380}
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 md:col-span-2">
          <div className="shadow-custom-all-sides rounded-md h-full">
            <div className="flex justify-between px-5 pt-5 pb-6">
              <p className="text-base text-gray-800 font-semibold">
                Task Completion Status
              </p>
              <button
                className="relative"
                onClick={() => handleChartDropDownClick(3)}
                ref={(el) => (dropdownRefs.current[3] = el)}
              >
                <BsThreeDotsVertical />
                {chartDropDown === 3 && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 text-start">
                    <h2 className="text-base font-semibold py-2 text-gray-800 px-4">
                      Setting
                    </h2>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another Action
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something Else Here
                    </a>
                  </div>
                )}
              </button>
            </div>
            <div className="pb-5">
              <Chart
                options={DevelopmentOptions}
                series={DevelopmentOptions.series}
                type="radialBar"
                height={380}
              />
            </div>
          </div>
        </div>
      </div>
      {isModalOpenDeleteSection && (
        <DeleteSectionModal
          onclose={closeModalDeleteSection}
          handleDeleteSection={handleDeleteSection}
          title={"Do you want to Delete Section?"}
        />
      )}
      {isModalOpenDeleteTask && (
        <DeleteSectionModal
          onclose={closeModalDeleteTask}
          handleDeleteSection={handleDeleteTask}
          title={"Do you want to Delete Task?"}
        />
      )}
    </div>
  );
}

export default ProjectTasks;
