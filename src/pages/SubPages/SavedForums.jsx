import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useRevalidator } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import image from "/profile.png";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import ForumCommentsModal from "../../containers/modals/ForumCommentModal";
import {
  likeForum,
  getSavedForum,
  unsaveForum,
  domainPrefix,
} from "../../api/index";
import { dateTimeFormat } from "../../utils/dateUtils";
import Communication from "../../pages/Communication";
import {
  PiArrowArcLeftBold,
  PiBookBookmark,
  PiPlusCircle,
} from "react-icons/pi";
import toast from "react-hot-toast";

function SavedForums() {
  const themeColor = useSelector((state) => state.theme.color);
  const [savedForums, setSavedForums] = useState([]);
  const [likes, setLikes] = useState({});
  const [isLiked, setIsLiked] = useState({});
  const [comments, setComments] = useState({});
  const [dropdownState, setDropdownState] = useState([]);
  const [modal, showModal] = useState(false);

  const [forumId, setForumId] = useState(null);
  const [forum, setForums] = useState([]);

  // Fetch saved forums from API

  const toggleDropdown = (index) => {
    setDropdownState((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleLikeToggle = async (forumId) => {
    try {
      const response = await likeForum(forumId);
      if (response.success) {
        setLikes((prevLikes) => ({
          ...prevLikes,
          [forumId]: response.liked_count,
        }));
        setIsLiked((prevIsLiked) => ({
          ...prevIsLiked,
          [forumId]: !prevIsLiked[forumId],
        }));
      }
    } catch (error) {
      console.error("Error toggling like:", error.message || error);
    }
  };

  const handleCommentAdded = (forumId, newCount) => {
    setComments((prev) => ({ ...prev, [forumId]: newCount }));
  };

  const handleDelete = async (id) => {
    try {
      await unsaveForum(id);
      setForums((prevForums) => prevForums.filter((forum) => forum.id !== id));
      toast.success("Forum deleted successfully");
      setDropdownState({});
    } catch (error) {
      console.error("Error deleting the post:", error);
      toast.error("Failed to delete the post. Please try again.");
    }
    fetchSavedPosts();
  };

  const fetchSavedPosts = async () => {
    try {
      const res = await getSavedForum();

      // Ensure that the response is in the expected format
      if (Array.isArray(res)) {
        setSavedForums(res); // Store API response in state

        // Initialize empty objects to store like counts and comment counts
        const likeCounts = {};
        const commentCounts = {};

        // Loop through the saved forums and extract the like and comment counts
        res.forEach((forum) => {
          if (forum.id && forum.likes_count !== undefined) {
            likeCounts[forum.id] = forum.likes_count;
          }
          if (forum.id && forum.comment_count !== undefined) {
            commentCounts[forum.id] = forum.comment_count;
          }
        });

        console.log(likeCounts); // Log like counts
        setLikes(likeCounts); // Set like counts in state

        console.log(commentCounts); // Log comment counts
        setComments(commentCounts); // Set comment counts in state
      } else {
        console.error("API response is not an array:", res);
        setSavedForums([]); // Clear saved forums if the response is not an array
      }
    } catch (error) {
      console.error("Error fetching saved posts:", error.message || error);
      setSavedForums([]); // Clear saved forums on error
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full my-0 flex md:mx-2 overflow-hidden flex-col">
        {/* Communication Component Placeholder */}
        {/* <Communication /> */}
        <div
          className="text-center text-xl font-bold my-0 p-2  bg-black rounded-md text-white mx-10"
          style={{ background: themeColor }}
        >
          <h2>Saved Forum</h2>
        </div>
        <div className="flex justify-end">
          <Link
            to={`/communication/forum`}
            style={{ background: themeColor }}
            className="font-semibold px-4 mx-10 my-4 p-2 flex justify-center w-fit text-white items-center  rounded-md gap-2"
          >
            <PiArrowArcLeftBold size={22} /> Go Back
          </Link>
        </div>

        <div className="my-0"> {/* Add Communication Component Here */} </div>
        {/* <h2 className="">Saved Forum</h2> */}
        {/* Forums Grid */}
        <div className="grid grid-cols-3 my-10">
          <div></div>
          <div className="flex flex-col justify-center items-center flex-wrap gap-5 w-full">
            {savedForums.map((item, index) => {
              const forum = item.forum;
              const likeCount = likes[forum.id] || forum.likes_count || 0; // Correct reference to likes_count
              const commentCount =
                comments[forum.id] || forum.comment_count || 0; // Correct reference to comment_count

              return (
                <div
                  key={forum.id}
                  className="shadow-custom-all-sides rounded-md mb-10 md:w-full relative"
                >
                  {/* Forum Header */}
                  <div className="flex justify-between gap-2 md:mx-8 my-5 mt-5">
                    <div className="flex gap-3">
                      <img
                        src={image}
                        alt="forum-profile"
                        className="w-10 h-10"
                      />
                      <div>
                        {/* <h2 className="text-md font-semibold">
                          {forum?.creator?.id}{" "}
                        </h2> */}
                        <h2 className="text-md  font-semibold">
                          {forum?.creator?.name || ""}
                        </h2>
                        <p className="text-xs font-normal">
                          {dateTimeFormat(item.created_at) || "Unknown Date"}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="inline-flex justify-center w-full text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full py-2 px-2"
                      >
                        <BsThreeDots size={15} />
                      </button>
                      {dropdownState[index] && (
                        <div className="absolute right-0 mt-0 w-28 flex justify-start rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1" role="none">
                            <a
                              href="#"
                              className="text-gray-700 block px-4 py-2 text-sm"
                              role="menuitem"
                            >
                              <button onClick={() => handleDelete(forum.id)}>
                                Remove
                              </button>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Forum Content */}
                  <div>
                    <h3 className="px-8 font-semibold">
                      {forum.thread_title || "No Title"}
                    </h3>
                    <p className="px-8 text-sm">
                      {forum.thread_description || "No description available."}
                    </p>
                    {forum.forums_image && forum.forums_image?.length > 0 && (
                      <div className="flex flex-col items-center">
                        <img
                          src={domainPrefix + forum.forums_image[0]?.document}
                          className="w-85 h-60 border object-cover mx-10 my-5 rounded-md"
                          alt="forum-content"
                        />
                      </div>
                    )}
                  </div>

                  {/* Forum Footer */}
                  <div className="flex justify-start gap-5 mx-8 my-3">
                    <button onClick={() => handleLikeToggle(forum.id)}>
                      <FcLike size={22} />
                      <span className="ml-1 text-sm text-gray-500">
                        {likeCount}
                      </span>
                    </button>
                    <button>
                      <FaRegComment
                        size={22}
                        className="w-6"
                        onClick={() => {
                          setForumId(forum.id);
                          showModal((prev) => !prev);
                        }}
                      />

                      <span className="ml-1 text-sm text-gray-500">
                        {commentCount}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Comments Modal */}
          <div className="col-span-1 md:mx-8 h-40">
            {modal && forumId && (
              <ForumCommentsModal
                onclose={() => {
                  showModal(false);
                  setForumId(null);
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

export default SavedForums;
