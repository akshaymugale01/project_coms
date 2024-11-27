import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import image from "/profile.png";
import interview from "/01.jpg";
import { FcLike } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
// import EscalationSetupModal from '../../containers/modals/IncidentSetupModal/EscalationSetupModal';
import ForumCommentsModal from "../../containers/modals/ForumCommentModal";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Communication from "../Communication";
import { PiPlusCircle } from "react-icons/pi";
import { getForum } from "../../api";

function Forum() {
  const themeColor = useSelector((state) => state.theme.color);
  const [modal, showModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [forums, setForums] = useState([]);
  const fetchForums = async () => {
    try {
      const res = await getForum();
      console.log(res);
    } catch (error) {
      console.log(error);
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
          {/* <input
            type="text"
            placeholder="Search"
            className="border p-2 w-full border-gray-300 rounded-lg "
          /> */}
          <Link
            to={`/admin/create-forum`}
            style={{ background: themeColor }}
            className="font-semibold px-4 p-1 flex text-white items-center justify-center rounded-md gap-2"
          >
            <PiPlusCircle size={20} /> Create
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="shadow-lg rounded-md mb-10 md:w-3/5 relative">
            <div className="flex justify-between gap-2 md:mx-8 my-5 mt-5">
              <div className="flex gap-3">
                <img src={image} className="w-10 h-10" alt="forum-profile" />
                <div className="">
                  <h2 className="text-md font-semibold">Vinay</h2>
                  <p className="text-xs font-normal">9 November at 23:29</p>
                </div>
              </div>
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={toggleDropdown}
                  type="button"
                  className="inline-flex justify-center w-full border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <BsThreeDots size={15} />
                </button>
                {isOpen && (
                  <div
                    className="absolute right-0 mt-3 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                        Save post
                      </a>
                      <a
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                      >
                        Delete
                      </a>
                      <a
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                      >
                        Hide post
                      </a>
                      <a
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                      >
                        Block
                      </a>
                      <a
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                      >
                        Report post
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="px-8">
                I'm thrilled to share that I've completed a graduate certificate
                course in project management with the president's honor roll.
              </p>
              <img
                src={interview}
                className="w-4/5 h-3/5 mx-8 my-3 rounded-md"
                alt="forum-profile"
              />
            </div>
            <div className="flex justify-start gap-5 mx-8 my-3">
              <div className="flex gap-3 mb-5">
                <button>
                  <FcLike size={22} />
                </button>
                <button>
                  <FaComment size={22} onClick={() => showModal(true)} />
                </button>
                <button>
                  <IoMdShareAlt size={22} />
                </button>
              </div>
              {modal && <ForumCommentsModal onclose={() => showModal(false)} />}
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-20">
          <div className="shadow-xl rounded-md  md:w-3/5 relative">
            <div className="flex justify-between gap-2 mx-8 my-5 mt-5">
              <div className="flex gap-3">
                <img src={image} className="w-10 h-10" alt="forum-profile" />
                <div className="">
                  <h2 className="text-md font-semibold">Vinay</h2>
                  <p className="text-xs font-normal">9 November at 23:29</p>
                </div>
              </div>
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={toggleDropdown}
                  type="button"
                  className="inline-flex justify-center w-full border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <BsThreeDots size={15} />
                </button>
                {isOpen && (
                  <div
                    className="absolute right-0 mt-3 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                        Save post
                      </a>
                      <a
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                      >
                        Delete
                      </a>
                      <a
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                      >
                        Hide post
                      </a>
                      <a
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                      >
                        Block
                      </a>
                      <a
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                      >
                        Report post
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="px-8">
                I'm thrilled to share that I've completed a graduate certificate
                course in project management with the president's honor roll.
              </p>
              <img
                src={interview}
                className="w-4/5 h-3/5 mx-8 my-3 rounded-md"
                alt="forum-profile"
              />
            </div>
            <div className="flex justify-start gap-5 mx-8 my-3">
              <div className="flex gap-3 mb-5">
                <button>
                  <FcLike size={22} />
                </button>
                <button>
                  <FaComment size={22} onClick={() => showModal(true)} />
                </button>
                <button>
                  <IoMdShareAlt size={22} />
                </button>
              </div>
              {modal && <ForumCommentsModal onclose={() => showModal(false)} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Forum;
