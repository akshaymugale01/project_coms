import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import image from "/profile.png";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import {
  domainPrefix,
  getHiddenForums,
  unhideForum,
  deleteForum,
} from "../../api/index";
import toast from "react-hot-toast";
import { FormattedDateToShowProperly } from "../../utils/dateUtils";

const HiddenForums = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [hiddenForum, setHiddenForum] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [dropdownState, setDropdownState] = useState([]);
  const [deleteForum, setDeletedForum] = useState([]);

  const toggleDropdown = (index) => {
    setDropdownState((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleForumVisibility = async (forumId) => {
    try {
      await unhideForum(forumId);
      setDropdownState([]); // Close all dropdowns
      toast.success("Post saved successfully");

      // Remove the unhidden forum from the list
      setHiddenForum((prevForums) =>
        prevForums.filter((forum) => forum.id !== forumId)
      );
    } catch (error) {
      console.error("Error hiding the forum", error);
      toast.error("Failed to hide the forum.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteForum(id);
      // Update the state immediately after a successful delete
      setDeletedForum((prevForums) =>
        prevForums.filter((report) => report.forum.id !== id)
      );
      setDropdownState([]); // Close all dropdowns
      toast.success("Forum deleted successfully");
    } catch (error) {
      console.error("Error deleting the forum:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const fetchHiddenForum = async () => {
    try {
      const res = await getHiddenForums();
      console.log("hidden forum:",res.data.hidden_forums[0].forums_image[0].document)
      if (!res || !res.data) {
        throw new Error("Invalid API response");
      }

      const data = res.data;

      if (data && Array.isArray(data.hidden_forums)) {
        setHiddenForum(data.hidden_forums);

        const likeCounts = {};
        const commentCounts = {};

        data.hidden_forums.forEach((forum) => {
          if (forum.id && forum.likes_count !== undefined) {
            likeCounts[forum.id] = forum.likes_count;
          }
          if (forum.id && forum.comment_count !== undefined) {
            commentCounts[forum.id] = forum.comment_count;
          }
        });

        setLikes(likeCounts);
        setComments(commentCounts);
      } else {
        setHiddenForum([]);
      }
    } catch (error) {
      console.error(
        "Error unable to fetch the hidden Forum:",
        error.message || error
      );
      setHiddenForum([]);
    }
  };

  useEffect(() => {
    fetchHiddenForum();
  }, []);

  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full my-4 md:mx-2 overflow-hidden flex-col">
        <div
          className="text-center text-xl font-bold my-0 p-2 bg-black rounded-md text-white mx-10"
          style={{ background: themeColor }}
        >
          <h2>Hidden Forum</h2>
        </div>
        <div className="flex justify-end">
          <Link
            to={`/communication/forum`}
            style={{ background: themeColor }}
            className="font-semibold px-4 mx-10 my-4 p-2 flex justify-center w-fit text-white items-center rounded-md gap-2"
          >
            Back
          </Link>
        </div>
        <div className="grid grid-cols-3 my-10">
          <div></div>
          <div className="flex flex-col justify-center items-center flex-wrap gap-5 w-full">
            {hiddenForum.map((forum, index) => {
              const likeCount = likes[forum.id] || forum.liked_count || 0;
              const commentCount =
                comments[forum.id] || forum.comment_count || 0;

              return (
                <div
                  key={forum.id} // Use serialId for key
                  className="shadow-custom-all-sides  rounded-md mb-10 md:w-full relative"
                >
                  <div className="flex justify-between gap-2 md:mx-8 my-5 mt-5">
                    <div className="flex gap-3">
                      <img
                        src={forum?.forum_profile_image || image}
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
                        className="inline-flex justify-center w-full text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full py-2 px-2"
                      >
                        <BsThreeDots size={15} />
                      </button>
                      {dropdownState[index] && (
                        <div className="absolute right-0 mt-0 w-28 flex justify-start rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1" role="none">
                            <button
                              className="text-gray-700 block px-4 py-2 text-sm"
                              onClick={() => handleForumVisibility(forum.id)} // Pass serialId here
                            >
                              Unhide
                            </button>
                            <button
                              className="text-gray-700 block px-4 py-2 text-sm"
                              onClick={() => handleDelete(forum.id)} // Pass serialId here
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="px-8 font-semibold">
                      {forum.thread_title || "No Title"}{" "}
                    </h3>
                    <p className="px-8 text-sm">
                      {forum?.thread_description || "No description available."}
                    </p>
                    {forum.forums_image && forum.forums_image.length > 0 && (
                      <div className="flex flex-col items-center px-10 py-10">
                        <img
                          src={domainPrefix + forum.forums_image[0].document}
                          className="w-full h-auto object-cover m-2 rounded-md"
                          alt="forum-content"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-start gap-5 mx-8 my-3">
                    <button>
                      <FcLike size={22} />
                      <span className="ml-0 text-sm text-gray-500">
                        {likeCount}
                      </span>
                    </button>
                    <button>
                      <FaRegComment
                        size={22}
                        className="w-6"
                        onClick={() => {
                          setForumId(forum?.id);
                          showModal(true);
                        }}
                      />
                      <span className="ml-0 justify-center text-sm text-gray-500">
                        {commentCount}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HiddenForums;
