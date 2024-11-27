import React, { useState } from "react";
import { Link } from "react-router-dom";
import interview from "/01.jpg";
import pic1 from "/profile1.jpg";
import pic2 from "/profile2.jpg";
import pic3 from "/profile3.jpg";
import pic4 from "/profile4.jpg";
import building from "/building.jpg";
import owners from "/owners.jpg";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Communication from "../Communication";
import CreateGroup from "./CreateGroup";
import { PiPlusCircle } from "react-icons/pi";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
function Groups() {
  const themeColor = useSelector((state) => state.theme.color);
  const [createModal, setCreateModal] = useState(false);
  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <Communication />
        <div className="flex justify-between md:flex-row flex-col my-2 gap-3">
          <input
            type="text"
            placeholder="Search by group name"
            className="border p-2 w-full border-gray-300 rounded-lg "
          />
          {/* <Link
          to={`/admin/communication-create-group`}
          style={{background:themeColor}}
          className=" font-semibold text-white px-4 p-1 flex gap-2 items-center justify-center rounded-md"
        >
          Create Group
        </Link> */}
          <button
            onClick={() => setCreateModal(true)}
            style={{ background: themeColor }}
            className=" font-semibold text-white px-4 p-1 justify-center flex items-center gap-2 rounded-md"
          >
            <PiPlusCircle size={20} /> Create
          </button>
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* <div className="md:grid grid-cols-4 mx-3 gap-5 my-3"> */}
            <Link to={"/admin/communication-group-details"}>
              <div className="flex flex-col my-3 w-80 max-h-96">
                <div className="border border-gray-100 rounded-xl bg-blue-50 ">
                  <img
                    src={owners}
                    className=" rounded-t-xl h-40 w-full"
                    alt="forum-profile"
                  />
                  <div className="m-2">
                    <div className="flex justify-between">
                      <h2 className="text-lg font-medium ">owners</h2>
                      <p className="text-sm text-gray-500">09/11/2024</p>
                    </div>
                    {/* <p className="text-base font-thin text-center">
                    {" "}
                    Private Group
                  </p> */}
                    <div className="flex gap-5 items-center">
                      <div className="grid grid-cols-2">
                        <p className=" text-gray-500 text-center">Members :</p>
                        <h2 className="text-gray-500 text-center">50</h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center">
                    <div className="">
                      <p className=" text-gray-500 text-sm px-2">
                        The Owners Group is a dedicated community for all
                        property owners within the building or complex. This
                        group serves as a platform...
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-end gap-2 p-2">
                    <div className="flex justify-center">
                      <div className="relative ">
                        <img
                          src={pic1}
                          className="w-10 h-10 rounded-full "
                          alt="forum-profile"
                        />
                      </div>
                      <div className="relative right-4">
                        <img
                          src={pic2}
                          className="w-10 h-10 rounded-full "
                          alt="forum-profile"
                        />
                      </div>
                      <div className="relative right-8">
                        <img
                          src={pic3}
                          className="w-10 h-10 rounded-full "
                          alt="forum-profile"
                        />
                      </div>
                      <div className="relative right-12">
                        <img
                          src={pic4}
                          className="w-10 h-10 rounded-full "
                          alt="forum-profile"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600">
                        <BiEdit size={18} />
                      </button>
                      <button className="text-red-600">
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to={"/admin/communication-group-details"}>
              <div className="flex flex-col my-3 w-80 max-h-96">
                <div className="border border-gray-100 rounded-xl bg-blue-50 ">
                  <img
                    src={building}
                    className=" rounded-t-xl h-40 w-full"
                    alt="forum-profile"
                  />
                  <div className="m-2">
                    <div className="flex justify-between">
                      <h2 className="text-lg font-medium ">A wing Members</h2>
                      <p className="text-sm text-gray-500">07/11/2024</p>
                    </div>
                    {/* <p className="text-base font-thin text-center">
                    {" "}
                    Private Group
                  </p> */}
                    <div className="flex gap-5 items-center">
                      <div className="grid grid-cols-2">
                        <p className=" text-gray-500 text-center">Members :</p>
                        <h2 className="text-gray-500  text-center">20</h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center">
                    <div className="">
                      <p className=" text-gray-500 text-sm px-2">
                        The A Wing Members group is a dedicated space for
                        individuals residing or working in the A Wing.
                      </p>
                    </div>

                    {/* <div className="border-t border-black">
                    <div className="flex justify-center my-3">
                      <Link
                        to={"/admin/communication-group-details"}
                        className="border-2 border-grey-500 rounded-md p-1 px-4 bg-green-500 text-white"
                      >
                        Join Group
                      </Link>
                    </div>
                  </div> */}
                  </div>
                  <div className="flex justify-between items-end gap-2 p-2">
                    <div className="flex justify-center">
                      <div className="relative ">
                        <img
                          src={pic1}
                          className="w-10 h-10 rounded-full "
                          alt="forum-profile"
                        />
                      </div>
                      <div className="relative right-4">
                        <img
                          src={pic2}
                          className="w-10 h-10 rounded-full "
                          alt="forum-profile"
                        />
                      </div>
                      <div className="relative right-8">
                        <img
                          src={pic3}
                          className="w-10 h-10 rounded-full "
                          alt="forum-profile"
                        />
                      </div>
                      <div className="relative right-12">
                        <img
                          src={pic4}
                          className="w-10 h-10 rounded-full "
                          alt="forum-profile"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600">
                        <BiEdit size={18} />
                      </button>
                      <button className="text-red-600">
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to={"/admin/communication-group-details"}>
              <div className="flex flex-col my-3 w-80">
                <div className="border border-gray-100 rounded-xl bg-blue-50">
                  <img
                    src={interview}
                    className=" rounded-t-xl h-40 w-full"
                    alt="forum-profile"
                  />
                  <div className="m-2">
                    <div className="flex justify-between">
                      <h2 className="text-lg font-medium ">All in the Mind</h2>
                      <p className="text-sm text-gray-500">07/11/2024</p>
                    </div>
                    {/* <p className="text-base font-thin text-center">
                    {" "}
                    Private Group
                  </p> */}
                    <div className="flex gap-5 items-center">
                      <div className="grid grid-cols-2">
                        <p className=" text-gray-500 text-center">Members :</p>
                        <h2 className=" text-gray-500 text-center">50</h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center">
                    <div className="">
                      <p className=" text-gray-500 text-sm px-2">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Pariatur error magnam nisi, omnis quia repudiandae
                        veritatis, autem vel...
                      </p>
                    </div>

                    {/* <div className="border-t border-black">
                    <div className="flex justify-center my-3">
                      <Link
                        to={"/admin/communication-group-details"}
                        className="border-2 border-grey-500 rounded-md p-1 px-4 bg-green-500 text-white"
                      >
                        Join Group
                      </Link>
                    </div>
                  </div> */}
                  </div>
                  <div className="flex justify-between items-end gap-2 p-2">
                    <div className="flex justify-center">
                      <div className="relative ">
                        <img
                          src={pic1}
                          className="w-10 h-10 rounded-full "
                          alt="forum-profile"
                        />
                      </div>
                      <div className="relative right-4">
                        <img
                          src={pic2}
                          className="w-10 h-10 rounded-full "
                          alt="forum-profile"
                        />
                      </div>
                      <div className="relative right-8">
                        <img
                          src={pic3}
                          className="w-10 h-10 rounded-full "
                          alt="forum-profile"
                        />
                      </div>
                      <div className="relative right-12">
                        <img
                          src={pic4}
                          className="w-10 h-10 rounded-full "
                          alt="forum-profile"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600">
                        <BiEdit size={18} />
                      </button>
                      <button className="text-red-600">
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {createModal && <CreateGroup onclose={() => setCreateModal(false)} />}
    </section>
  );
}

export default Groups;
