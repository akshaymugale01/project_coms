import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import image from "/profile.png";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import ForumCommentsModal from "../../containers/modals/ForumCommentModal";
import {
  domainPrefix,
  GetAllReportedForum,
  deleteForum,
  hideForum,
} from "../../api/index";
import { FormattedDateToShowProperly } from "../../utils/dateUtils";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";

function ReportForum() {
  const themeColor = useSelector((state) => state.theme?.color || "#000000"); // Safe access
  const [reportedForum, setReportedForum] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [dropdownState, setDropdownState] = useState([]);
  const [modal, showModal] = useState(false);
  const [forumId, setForumId] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownState((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteForum(id);
      // Update the state immediately after a successful delete
      setReportedForum((prevForums) =>
        prevForums.filter((report) => report.forum.id !== id)
      );
      setDropdownState([]);
      toast.success("Forum deleted successfully");
    } catch (error) {
      console.error("Error deleting the forum:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleVisibility = async () => {
    await hideForum();
  };
  const fetchReportedForum = async () => {
    try {
      const res = await GetAllReportedForum();
      if (Array.isArray(res)) {
        setReportedForum(res);
        const likeCounts = {};
        const commentCounts = {};
        res.forEach((item) => {
          const { forum } = item;
          if (forum?.id) {
            likeCounts[forum.id] = forum.likes_count || 0;
            commentCounts[forum.id] = forum.comment_count || 0;
          }
        });

        setLikes(likeCounts);
        setComments(commentCounts);
      } else {
        console.error("Unexpected API response format:", res);
      }
    } catch (error) {
      console.error("Error fetching reported forums:", error.message || error);
      setReportedForum([]);
    }
  };

  useEffect(() => {
    fetchReportedForum();
  }, []);

  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full my-0 flex md:mx-2 overflow-hidden flex-col">
        <div
          className="text-center text-xl font-bold my-0 p-2 bg-black rounded-md text-white mx-10"
          style={{ background: themeColor }}
        >
          <h2>Reported Forums</h2>
        </div>
        <div className="flex justify-end">
          <Link
            to={`/admin/hidden_forums`}
            style={{ background: themeColor }}
            className="font-semibold px-4 mx-10 my-2 p-2 flex justify-center w-fit text-white items-center rounded-md gap-2"
          >
            Hidden Forum
          </Link>
        </div>

        <div className="grid grid-cols-3 my-10">
          <div></div>
          <div className="flex flex-col justify-center items-center flex-wrap gap-5 w-full">
            {reportedForum.map((item, index) => {
              const { forum, reported_by, reason } = item; // Use serialId from item
              const likeCount = likes[forum?.id] || 0;
              const commentCount = comments[forum?.id] || 0;

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
                          {forum?.created_by_name || "Unknown User"}
                        </h2>
                        <p className="text-xs font-normal">
                          {FormattedDateToShowProperly(item.created_at) ||
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
                              onClick={() => handleVisibility(forum.id)} // Pass serialId here
                            >
                              Hide
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
                    <h3 className="px-8 flex font-semibold">
                      <p className="mt-1 text-sm">{reason}</p>
                    </h3>
                    <p className="px-8 text-sm">
                      {forum?.thread_description || "No description available."}
                    </p>
                    {forum.forum_images && forum.forum_images.length > 0 && (
                      <div className="flex flex-col items-center px-10 py-5">
                        <img
                          src={domainPrefix + forum.forum_images[0]}
                          className="w-85 h-60 object-cover mx-10 my-5 rounded-md"
                          alt="forum-content"
                        />
                      </div>
                    )}
                  </div>
                  <div className="">
                    <h3 className="px-8 font-semibold">Reported By</h3>
                    <p className="px-8 mb-5 text-sm">
                      {reported_by?.user_name || "No user name available"}
                    </p>
                  </div>

                  {/* <div className="flex justify-start gap-5 mx-8 my-3">
                    <button>
                      <FcLike size={22} />
                      <span className="ml-0 text-sm text-gray-500">
                        {likes[item.id] || 0}
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
                        {comments[item.id] || 0}
                      </span>
                    </button>
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReportForum;












      //       return (
      //           <div
      //             key={forum.id}
      //             className="shadow-custom-all-sides rounded-md mb-10 md:w-full relative"
      //           >
      //             <div>
      //               <div className="flex justify-between gap-2 md:mx-8 my-5 mt-5">
      //                 <div className="flex gap-3">
      //                   <img
      //                     src={image}
      //                     alt="forum-profile"
      //                     className="w-10 h-10"
      //                   />
      //                   <div>
      //                     <h2 className="text-md font-semibold">
      //                       {forum.created_by_name?.firstname}{" "}
      //                       {forum.created_by_name?.lastname || ""}
      //                     </h2>
      //                     <p className="text-xs font-normal">
      //                       {FormattedDateToShowProperly(forum.created_at) ||
      //                         "Unknown Date"}
      //                     </p>
      //                   </div>
      //                 </div>

      //                 <div className="relative">
      //                   <button
      //                     onClick={() => toggleDropdown(index)}
      //                     className="inline-flex justify-center w-full text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full py-2 px-2"
      //                   >
      //                     <BsThreeDots size={15} />
      //                   </button>
      //                   {dropdownState[index] && (
      //                     <div className="absolute right-0 mt-0 w-28 flex justify-start rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
      //                       <div
      //                         className="text-gray-700 block px-4 py-2 text-sm"
      //                         role="none"
      //                       >
      //                         <button
      //                           className="text-gray-700 block px-4 py-2 text-sm"
      //                           onClick={() => handleForumVisibility(forum?.id)}
      //                         >
      //                           Unhide
      //                         </button>
      //                       </div>
      //                     </div>
      //                   )}
      //                 </div>
      //               </div>

      //               <div>
      //                 <h3 className="px-8 font-semibold">
      //                   {forum.thread_title || "No Title"}
      //                 </h3>
      //                 <p className="px-8 text-sm">
      //                   {forum.thread_description ||
      //                     "No description available."}
      //                 </p>
      //                 {forum.forums_image && forum.forums_image.length > 0 && (
      //                   <div className="flex flex-col items-center px-10">
      //                     <img
      //                       src={domainPrefix + forum.forums_image[0].document}
      //                       className=" w-full h-auto object-cover m-2 rounded-md"
      //                       alt="forum-content"
      //                     />
      //                   </div>
      //                 )}
      //               </div>
      //             </div>
      //             <div className="flex justify-start gap-5 mx-8 my-3">
      //               <button>
      //                 <FcLike size={22} />
      //                 <span className="ml-1 text-sm text-gray-500">
      //                   {likeCount}
      //                 </span>
      //               </button>
      //               <button>
      //                 <FaRegComment size={22} className="w-6" />
      //                 <span className="ml-1 text-sm text-gray-500">
      //                   {commentCount}
      //                 </span>
      //               </button>
      //             </div>
      //           </div>
      //         );
      //       })}
      //     </div>
      //   </div>
      // </div>