import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import image from "/profile.png";
import interview from "/01.jpg";
import { FcLike } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import ForumCommentsModal from "../../../containers/modals/ForumCommentModal";
import EmployeeCommunication from "./EmployeeCommunication";
import Navbar from "../../../components/Navbar";
function EmployeeForum() {
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
  return (
    <div className="flex ">
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <EmployeeCommunication />
        <div className="flex justify-between md:flex-row flex-col my-5 gap-y-3">
          {/* <input
          type="text"
          placeholder="search"
          className="border-2 p-2 w-70 border-gray-300 rounded-lg "
        /> */}
          {/* { <Link to={`/employee/employee-communication-create-forum`} className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center justify-center rounded-md ">
          Create Forum
        </Link> } */}
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
    </div>
  );
}

export default EmployeeForum;
