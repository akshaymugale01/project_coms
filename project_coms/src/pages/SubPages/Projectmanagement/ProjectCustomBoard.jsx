import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../components/Navbar";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import {
  API_URL,
  getVibeBackground,
  getVibeBoardData,
  GetVibeBoardTaskPermission,
  getVibeBoardUser,
} from "../../../api";
import ProjectOverview from "./ProjectDetails";
import ProjectDetails from "./ProjectDetails";
import { useDispatch } from "react-redux";
import {
  fetchBoardDataFailure,
  fetchBoardDataSuccess,
} from "../../../features/Project/ProjectSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ProjectCustomBoard = () => {
  const dispatch = useDispatch();
  const defaultImage = { index: 0, src: "" };
  let selectedImageSrc = defaultImage.src;
  let selectedImageIndex = defaultImage.index;
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [boardData, setboardData] = useState({});
  const [jsonData, setJsonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [activeView, setActiveView] = useState("Kanban");
  const [board, setboard] = useState([]);
  const [createdById, setCreatedById] = useState(null);
  const [taskAccessTo, setTaskAccessTo] = useState([]);
  const [boardTemp, setboardTemp] = useState([]);
  const [boardCataName, setboardCataName] = useState([]);
  const [boardAssignedEmail, setboardAssignedEmail] = useState([]);
  const [id, setID] = useState("");
  const [idFromURL, setIdFromURL] = useState(null);
  const [users, setUsers] = useState([]);
  const [shouldFetchUsers, setShouldFetchUsers] = useState(false);
  const added = useSelector((state) => state.added);
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
  const [isDropdownOpenSection, setIsDropdownOpenSection] = useState(false);
  const dropdownRefSection = useRef(null);

  useEffect(() => {
    const handleClickOutsideSection = (event) => {
      if (
        dropdownRefSection.current &&
        !dropdownRefSection.current.contains(event.target)
      ) {
        // Clicked outside the dropdown, close it
        setIsDropdownOpenSection(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutsideSection);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSection);
    };
  }, []);

  const handleCheckboxChangeSectionTitle = (title) => {
    const lowercaseTitle = title.toLowerCase();

    if (selectedSectionTitles.includes(lowercaseTitle)) {
      setSelectedSectionTitles(
        selectedSectionTitles.filter((t) => t !== lowercaseTitle)
      );
    } else {
      setSelectedSectionTitles([...selectedSectionTitles, lowercaseTitle]);
    }
  };
  const org_id = localStorage.getItem("VIBEORGID");
  const GetTaskPermission = async (id) => {
    const params = {
      user_id: user_id,
      board_id: id,
    };
    try {
      const jsonData = await GetVibeBoardTaskPermission(userId, id);
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
        setShouldFetchUsers(true);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const location = useLocation();
  const [taskidFromURL, setTaskIdFromURL] = useState(null);
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
    
  }, [location.search, added]);
  const user_id = getItemInLocalStorage("VIBEUSERID");

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
        // console.log("Dispatching fetchBoardDataSuccess with data:", data);
        dispatch(fetchBoardDataSuccess(data));
        console.log(data);
        const updatedView = data.board_view;
        console.log(updatedView);
        setActiveView(updatedView ? updatedView : "Kanban");
        setboard(data.board);
        setCreatedById(data.board.created_by.id);
        setboardTemp(data.board.template_name);
        setboardCataName(data.board.category_name);
        // setboardData(data);
        setboardData(data.board);
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
  const [show, setShow] = useState(true);
  const userId = getItemInLocalStorage("VIBEUSERID");
  const [isAssignedTo, setIsAssignedTo] = useState(false);
  const [isBoardCreatedby, setIsBoardCreatedby] = useState(false);
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
        (user) => user.user_id === parseInt(userId, 10)
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
  console.log(board);
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex  flex-col p-2 mb-10 ">
        <section className="my-2">
          <ProjectDetails boardData={board} />
        </section>
      </div>
    </section>
  );
};

export default ProjectCustomBoard;
