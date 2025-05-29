import React, { useEffect, useState } from "react";
import image from "/profile.png"; // Default profile image
import { addComment, getComments, deleteComment } from "../../api/index";
import { MessageSquare } from "lucide-react";
import { dateTimeFormat } from "../../utils/dateUtils";
import { BiTrash } from "react-icons/bi";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../utils/localStorage";
const ForumCommentsModal = ({ onclose, forumId, onCommentAdded }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState(null);

  // Function to fetch comments from the API
  const fetchComments = async () => {
    try {
      const response = await getComments(forumId);
      console.log("Fetched comments response:", response);
      setComments(response); // Set comments directly from the response
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Fetch comments when forumId changes
  useEffect(() => {
    if (forumId) {
      fetchComments();
    }

    const user = JSON.parse(localStorage.getItem("user"));
    setUserData(user);
  }, [forumId]);

  const handleSubmit = async () => {
    const trimmedComment = newComment.trim();
    if (!trimmedComment) return alert("Comment cannot be empty!");
    setIsSubmitting(true);

    try {
      const tempId = `temp-${Date.now()}`;
      const newCommentObject = {
        id: tempId,
        comment: trimmedComment,
        created_at: new Date().toISOString(),
        user: {
          id: userData.id,
          fullname: userData.fullname,
        },
        user_avatar: image,
      };

      setComments((prev) => [...prev, newCommentObject]);
      setNewComment("");

      await addComment(forumId, trimmedComment, userData.id);
      await fetchComments();
      if (onCommentAdded) onCommentAdded(forumId, comments.length + 1);
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
      setComments((prev) => prev.filter((c) => !c.id.startsWith("temp-")));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(forumId, id); // Call delete API

      // Remove the deleted comment from the comments state
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );

      toast.success("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  const user_type = getItemInLocalStorage("USERTYPE");
  const user_id = getItemInLocalStorage("UserId");

  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
      <div className="max-h-screen  bg-white p-2 w-[40rem] rounded-xl shadow-lg overflow-y-auto">
        <div className="flex flex-col justify-center">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
            <h2 className="flex items-center gap-2 justify-center font-medium text-xl p-0">
              Comment
            </h2>
            <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
              {comments.length}
            </span>
          </div>
          {/* Comments List */}
          <div className="space-y-4 mb-6 max-h-[calc(40vh-200px)] overflow-y-auto custom-scrollbar">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id || `comment-${Date.now()}-${Math.random()}`}
                  className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex mx-6 items-center gap-3 mb-2">
                    <img
                      src={comment.user_avatar || image}
                      alt={comment.user_name || "User avatar"}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {comment.user_fullname ||
                          comment.employee_name ||
                          comment.user_id}
                      </p>
                      <p className="text-xs text-gray-500">
                        {dateTimeFormat(comment.created_at)}
                      </p>
                    </div>
                    {user_type === "pms_admin" ? (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="ml-auto text-red-600 text-sm"
                      >
                        <BiTrash /> {/* Button for admin */}
                      </button>
                    ) : user_id === comment.user_id ? (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="ml-auto text-red-600 text-sm"
                      >
                        <BiTrash /> {/* Button for regular user */}
                      </button>
                    ) : null}
                  </div>
                  <p className="text-gray-700 ml-11">{comment.comment}</p>
                </div>
              ))
            ) : (
              <div key="no-comments" className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No comments yet</p>
                <p className="text-gray-400 text-sm">
                  Be the first to share your thoughts!
                </p>
              </div>
            )}
          </div>
          {/* Comment Input */}
          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
              className="w-10 h-10 rounded-full object-cover"
              alt="Your avatar"
            />
            <div className="flex-1 space-y-3">
              <textarea
                placeholder="Add your comment..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-none text-gray-700 placeholder-gray-400"
                rows={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200 font-medium"
                  onClick={onclose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !newComment.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Posting...
                    </>
                  ) : (
                    "Post Comment"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumCommentsModal;
