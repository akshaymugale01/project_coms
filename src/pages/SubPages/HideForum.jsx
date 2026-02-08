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
  deleteForum as deleteForumApi,
} from "../../api";
import toast from "react-hot-toast";
import { FormattedDateToShowProperly } from "../../utils/dateUtils";

const HiddenForums = () => {
  const themeColor = useSelector((state) => state.theme.color);

  const [hiddenForums, setHiddenForums] = useState([]);
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownIndex((prev) => (prev === index ? null : index));
  };

  // 🔹 Fetch hidden forums
  const fetchHiddenForums = async () => {
    try {
      const res = await getHiddenForums();

      if (res?.data?.hidden_forums) {
        setHiddenForums(res.data.hidden_forums);
      } else {
        setHiddenForums([]);
      }
    } catch (error) {
      console.error("Failed to fetch hidden forums", error);
      toast.error("Failed to load hidden forums");
    }
  };

  useEffect(() => {
    fetchHiddenForums();
  }, []);

  // 🔹 Unhide forum
  const handleUnhide = async (forumId) => {
    try {
      await unhideForum(forumId);
      toast.success("Forum unhidden successfully");

      setHiddenForums((prev) =>
        prev.filter((forum) => forum.id !== forumId)
      );
      setDropdownIndex(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to unhide forum");
    }
  };

  // 🔹 Delete forum
  const handleDelete = async (forumId) => {
    try {
      await deleteForumApi(forumId);
      toast.success("Forum deleted successfully");

      setHiddenForums((prev) =>
        prev.filter((forum) => forum.id !== forumId)
      );
      setDropdownIndex(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete forum");
    }
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full my-4 md:mx-2 overflow-hidden flex-col">
        <div
          className="text-center text-xl font-bold p-2 rounded-md text-white mx-10"
          style={{ background: themeColor }}
        >
          Hidden Forums
        </div>

        <div className="flex justify-end">
          <Link
            to="/communication/forum"
            style={{ background: themeColor }}
            className="font-semibold px-4 mx-10 my-4 p-2 text-white rounded-md"
          >
            Back
          </Link>
        </div>

        <div className="grid grid-cols-3 my-10">
          <div />
          <div className="flex flex-col gap-6">
            {hiddenForums.length === 0 && (
              <p className="text-center text-gray-500">
                No hidden forums available
              </p>
            )}

            {hiddenForums.map((forum, index) => (
              <div
                key={forum.id}
                className="shadow-custom-all-sides rounded-md p-4 relative"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <img
                      src={image}
                      className="w-10 h-10"
                      alt="profile"
                    />
                    <div>
                      <h2 className="font-semibold">
                        {forum.created_by_name?.firstname}{" "}
                        {forum.created_by_name?.lastname}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {FormattedDateToShowProperly(forum.created_at)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleDropdown(index)}
                    className="p-2"
                  >
                    <BsThreeDots size={16} />
                  </button>

                  {dropdownIndex === index && (
                    <div className="absolute right-4 top-12 bg-white shadow rounded-md w-28">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => handleUnhide(forum.id)}
                      >
                        Unhide
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => handleDelete(forum.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <h3 className="font-semibold mt-4">
                  {forum.thread_title}
                </h3>
                <p className="text-sm mt-1">
                  {forum.thread_description}
                </p>

                {forum.forums_image?.length > 0 && (
                  <img
                    src={domainPrefix + forum.forums_image[0].document}
                    className="w-full rounded-md mt-4"
                    alt="forum"
                  />
                )}

                <div className="flex gap-6 mt-4 text-gray-500">
                  <span className="flex items-center gap-1">
                    <FcLike /> {forum.liked_count || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRegComment /> {forum.comment_count || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div />
        </div>
      </div>
    </section>
  );
};

export default HiddenForums;
