import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegComment } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import image from "/profile.png";
import interview from "/01.jpg";
import ForumCommentsModal from "../../containers/modals/ForumCommentModal";
import Navbar from "../../components/Navbar";
import Communication from "../Communication";
import { PiPlusCircle } from "react-icons/pi";
import { PiWarningFill } from "react-icons/pi";
import {
  getForum,
  likeForum,
  deleteForum,
  hideForum,
  PostSavedForum,
  domainPrefix,
} from "../../api/index";
import { PiBookBookmark, PiEye } from "react-icons/pi";
import { FormattedDateToShowProperly } from "../../utils/dateUtils";
import { toast } from "react-hot-toast";

function Forum() {
  const themeColor = useSelector((state) => state.theme.color);
  const [modal, showModal] = useState(false);
  const [comments, setComments] = useState({});
  const [forums, setForums] = useState([]);
  const [forumId, setForumId] = useState(null);
  // const [userLikes, setUserLikes] = useState({});
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState({});
  const [dropdownState, setDropdownState] = useState({});
  const [savedPosts, setSavedPosts] = useState([]);
  const [hiddenForum, setHiddenForum] = useState([]);
  const [likedByUser, setLikedByUser] = useState({});
  const [isRed, setIsRed] = useState({}); //
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  const currentUserId = () => {
    return localStorage.getItem("UserId");
  };

  // const toggleDropdown = (index) => {
  //   setDropdownState((prevState) => ({
  //     ...prevState,
  //     [index]: !prevState[index],
  //   }));
  // };

  const handleCommentAdded = (forumId, newCount) => {
    setComments((prev) => ({ ...prev, [forumId]: newCount }));
  };

  const handleDelete = async (id) => {
    try {
      await deleteForum(id);
      setForums((prevForums) => prevForums.filter((forum) => forum.id !== id));
      toast.success("Forum deleted successfully");
      setDropdownState({});
    } catch (error) {
      console.error("Error deleting the post:", error);
      toast.error("Failed to delete the post. Please try again.");
    }
  };

  const handleSavePost = async (forumId) => {
    try {
      await PostSavedForum(forumId);
      setSavedPosts((prevSavedPosts) => [...prevSavedPosts, forumId]);
      toast.success("Post saved successfully");
    } catch (error) {
      console.error("Error saving the post:", error);
      toast.error("Failed to save the post. Please try again.");
    }
  };

  // Hide Functionality Inside Report section
  const handleForumVisibility = async (forumId) => {
    try {
      await hideForum(forumId);
      toast.success("Post saved successfully");
      setHiddenForum();
    } catch (error) {
      console.error("Error hidding the forum", error);
      toast.error("Failed to hidding the forum.");
    }
    fetchForums();
  };

  const handleLikeToggle = async (forumId) => {
    const wasLiked = likedByUser[forumId];
    try {
      const response = await likeForum(forumId);
      if (response.success) {
        setLikes((prevLikes) => ({
          ...prevLikes,
          [forumId]: response.liked_count,
        }));
        setLikedByUser((prevLikedByUser) => ({
          ...prevLikedByUser,
          [forumId]: !wasLiked,
        }));
        setIsRed((prevIsRed) => ({
          ...prevIsRed,
          [forumId]: !wasLiked,
        }));
        toast.success(wasLiked ? "Post liked" : "Post Unliked");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to update like status");
    }
  };

  const fetchForums = async () => {
    try {
      const res = await getForum();
      setForums(res.data);
      const likeCounts = {};
      const userLikeStatuses = {};

      res.data.forEach((forum) => {
        if (forum.id) {
          likeCounts[forum.id] = forum.liked_count || 0;
          userLikeStatuses[forum.id] = forum.likes?.filter(
            (like) => like.user_id === currentUserId() && like.liked_count > 0
          );
        }
      });

      setLikes(likeCounts);
      setLikedByUser(userLikeStatuses);
      setIsRed(userLikeStatuses);

      const commentCounts = res.data.reduce((acc, forum) => {
        if (forum.id && forum.comment_count !== undefined) {
          acc[forum.id] = forum.comment_count;
        }
        return acc;
      }, {});

      setComments(commentCounts);
    } catch (error) {
      console.error("Error fetching forums:", error);
      toast.error("Failed to load forums");
    }
  };

  useEffect(() => {
    fetchForums();
  }, []);

  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <Communication />
        <div className="flex justify-end md:flex-row flex-col my-2 gap-3">
          <Link
            to={`/admin/create-forum`}
            style={{ background: themeColor }}
            className="font-semibold px-2 p-2 flex text-white items-center justify-center rounded-md gap-2"
          >
            <PiPlusCircle size={20} /> Create
          </Link>
          <Link
            to={`/communication/forum/saved_forum`}
            style={{ background: themeColor }}
            className="font-semibold px-2 p-2 flex text-white items-center justify-center rounded-md gap-2"
          >
            <PiBookBookmark size={20} /> Saved
          </Link>

          <Link
            to={`/communication/forum/reported_forum`}
            style={{ background: themeColor }}
            className="font-semibold px-2 p-2 flex text-white items-center justify-center rounded-md gap-2"
          >
            <PiWarningFill size={20} /> Reported
          </Link>
          <Link
            to={`/communication/forum/hidden_forum`}
            style={{ background: themeColor }}
            className="font-semibold px-2 p-2 flex justify-center text-white items-center rounded-md gap-2"
          >
            Hidden
            <PiEye size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-3 my-5">
          <div></div>
          <div className="flex flex-col justify-center items-center flex-wrap gap-5 w-full">
            {forums.map((forum, index) => (
              <div
                key={forum.id}
                className="shadow-custom-all-sides rounded-md mb-10 md:w-full relative"
              >
                <div className="flex justify-between gap-2 md:mx-8 my-5 mt-5">
                  <div className="flex gap-3">
                    <img
                      src={image}
                      className="w-10 h-10"
                      alt="forum-profile"
                    />
                    <div>
                      <h2 className="text-md font-semibold">
                        {forum.created_by_name?.firstname}{" "}
                        {forum.created_by_name?.lastname || ""}
                      </h2>
                      <p className="text-xs font-normal">
                        {FormattedDateToShowProperly(forum.created_at) ||
                          "Unknown Date"}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(index)}
                      type="button"
                      className="inline-flex justify-center w-full text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full py-2 px-2"
                    >
                      <BsThreeDots size={15} />
                    </button>
                    {activeDropdown === index && (
                      <div
                        className="absolute right-0 mt-0 w-28 flex justify-start rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                      >
                        <div className="py-1" role="none">
                          <a
                            href="#"
                            className="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                          >
                            <button
                              onClick={() => {
                                handleSavePost(forum.id);
                                toggleDropdown(index); // Close dropdown
                              }}
                            >
                              Save
                            </button>
                          </a>
                          <a
                            href="#"
                            className="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                          >
                            <button
                              onClick={() => {
                                handleDelete(forum.id);
                                toggleDropdown(index); // Close dropdown
                              }}
                            >
                              Delete
                            </button>
                          </a>
                          <a
                            href="#"
                            className="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                          >
                            <button
                              onClick={() => {
                                handleForumVisibility(forum.id);
                                toggleDropdown(index); // Close dropdown
                              }}
                            >
                              Hide
                            </button>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="px-8 font-semibold">
                    {forum.thread_title || "No Title"}
                  </h3>
                  <p className="px-8 text-sm">
                    {forum.thread_description || "No description available."}
                  </p>
                  {forum.forums_image && forum.forums_image.length > 0 && (
                    <div className="flex flex-col items-center px-10 py-5">
                      <img
                        src={domainPrefix + forum.forums_image[0].document}
                        className=" w-full h-auto object-cover m-2 rounded-md"
                        alt="forum-content"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-start gap-5 mx-8 my-3">
                  <div className="flex gap-3 mb-5">
                    <div className="flex flex-col">
                      <div className="flex flex-col">
                        <button
                          aria-label={likes[forum.id] > 0 ? "Unlike post" : "Like post"}
                          key={forum.id}
                          onClick={() => handleLikeToggle(forum.id)}
                          className="flex items-center focus:outline-none"
                          // aria-label={
                          //   userLikes[forum.id] ? "Unlike post" : "Like post"
                          // }
                        >
                          <div className="relative">
                            <FaRegHeart
                              size={22}
                               className="relative z-10"
                              style={{
                                color:likes[forum.id] > 0 ? "red" : "black",
                                transition: "color 0.2s ease",
                              }}
                            />
                            <div
                              className="absolute inset-0 z-0"
                              style={{
                                backgroundColor: likes[forum.id] > 0 
                                  ? "red"
                                  : "white",
                                clipPath:
                                  "path('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z')",
                                transform: "scale(1.1)",
                                transition: "background-color 0.2s ease",
                              }}
                            />
                          </div>
                        </button>
                        <span className="text-sm text-gray-500 flex justify-center">
                          {likes[forum.id] || 0}
                        </span>
                      </div>
                    </div>
                    <button>
                      <FaRegComment
                        className="w-6"
                        size={22}
                        onClick={() => {
                          setForumId(forum.id);
                          showModal((prev) => !prev);
                        }}
                      />
                      <span className="ml-1 flex text-sm text-gray-500">
                        {comments[forum.id] || 0}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-1 md:mx-8 h-40">
            {modal && forumId && (
              <ForumCommentsModal
                onclose={() => {
                  showModal(false);
                  setForumId(null); // Reset the forumId when modal closes
                }}
                forumId={forumId}
                onCommentAdded={handleCommentAdded}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Forum;

// pending
// const handleClickOutside = (event) => {
//   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//     setIsOpen(false);
//   }
// };

// useEffect(() => {
//   document.addEventListener("mousedown", handleClickOutside);

//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }, []);

{
  /* <Link
            to={`/admin/hidden_forums`}
            style={{ background: themeColor }}
            className="font-semibold px-4 p-1 flex text-white items-center justify-center rounded-md gap-2"
          >
            <PiEye size={20} /> Hidden
          </Link> */
}
