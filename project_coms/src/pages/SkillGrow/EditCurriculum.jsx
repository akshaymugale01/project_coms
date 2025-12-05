import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { HiMinus } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { PiVideoLight } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import EditCourse from "./EditCourse";

function EditCurriculum() {
  const [curriculum, setCurriculum] = useState(false);
  const [editLectureTitle, setEditLectureTitle] = useState(false);
  const [sections, setSections] = useState([]);
  const [editTopic, setEditTopic] = useState(false);

  const addSection = () => {
    const newSection = { id: sections.length };
    setSections([...sections, newSection]);
  };

  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <EditCourse />
        <div className="flex justify-center">
          <div className="border-2 border-gray-300 rounded-md w-4/5 p-4 mb-8">
            <h2 className="border-b border-gray-300 py-2 text-gray-600 text-2xl font-semibold mb-5 text-center">
              Edit Course Curriculum
            </h2>
            <div className="md:grid grid-cols-1 gap-4">
              <div className="flex justify-end">
                <button
                  className="border-2 border-gray-400 rounded-md p-1 px-4 hover:bg-black hover:text-white"
                  onClick={() => setEditLectureTitle(!editLectureTitle)}
                >
                  Edit Topic
                </button>
              </div>
              {editLectureTitle && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white rounded-md w-96">
                    <div className="flex justify-between p-3 bg-gray-200 rounded-md">
                      <h2 className="text-lg font-semibold text-gray-500">
                        Edit Topic
                      </h2>
                      <button
                        className=" text-gray-500"
                        onClick={() => setEditLectureTitle(!editLectureTitle)}
                      >
                        <IoClose size={24} />
                      </button>
                    </div>
                    <div className="p-3">
                      <label
                        className="block text-base font-medium text-gray-700 mb-2"
                        htmlFor="topicName"
                      >
                        Topic Name
                      </label>
                      <input
                        type="text"
                        name="topicName"
                        id="topicName"
                        placeholder="Enter Course Title"
                        className="border p-1 py-2 border-gray-500 rounded-md w-full"
                      />
                    </div>
                    <div className="mx-3 mt-2 mb-5">
                      <button className="border-2 border-gray-400 rounded-md p-2 px-5 w-full hover:bg-black hover:text-white">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="border-2 border-gray-500 rounded-md w-full">
                <div className="flex justify-between mx-5 py-3 cursor-pointer">
                  <h2>Intro</h2>
                  <p onClick={() => setCurriculum(!curriculum)}>
                    {curriculum ? (
                      <HiMinus className="text-gray-400 " />
                    ) : (
                      <FaPlus className="text-gray-400 " />
                    )}
                  </p>
                </div>
                <div>
                  {curriculum && (
                    <div className="p-4 bg-gray-100">
                      <div className="flex justify-between mb-2">
                        <div className="flex gap-2">
                          <PiVideoLight className="mt-1" size={20} />
                          <h2>Introduction</h2>
                        </div>
                        <div className="flex gap-2">
                          <h2>12m 30s</h2>
                          <button
                            className="bg-green-100 rounded-full w-8 h-8 flex justify-center items-center"
                            onClick={() => setEditTopic(!editTopic)}
                          >
                            <BiEdit size={15} className="text-green-400" />
                          </button>
                          {editTopic && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                              <div className="bg-white rounded-md w-96">
                                <div className="flex justify-between p-3 bg-gray-200 rounded-md">
                                  <h2 className="text-lg font-semibold text-gray-500">
                                    Edit Point
                                  </h2>
                                  <button
                                    className=" text-gray-500"
                                    onClick={() => setEditTopic(!editTopic)}
                                  >
                                    <IoClose size={24} />
                                  </button>
                                </div>
                                <div className="p-3 w-full">
                                  <label
                                    className="block text-base font-medium text-gray-700 mb-2"
                                    htmlFor="pointName"
                                  >
                                    Point Name
                                  </label>
                                  <input
                                    type="text"
                                    name="pointName"
                                    id="pointName"
                                    placeholder="Enter Course Title"
                                    className="border p-1 py-1 border-gray-500 rounded-md w-full"
                                  />
                                </div>
                                <div className="p-3 w-full">
                                  <label
                                    className="block text-base font-medium text-gray-700 mb-2"
                                    htmlFor="videoLink"
                                  >
                                    Video link
                                  </label>
                                  <input
                                    type="text"
                                    name="videoLink"
                                    id="videoLink"
                                    placeholder="Enter Video Link"
                                    className="border p-1 py-1 border-gray-500 rounded-md w-full"
                                  />
                                </div>
                                <div className="p-3 w-full">
                                  <label
                                    className="block text-base font-medium text-gray-700 mb-2"
                                    htmlFor="topicTime"
                                  >
                                    point Time
                                  </label>
                                  <input
                                    type="time"
                                    name="pointTime"
                                    id="pointTime"
                                    placeholder="Enter Course Title"
                                    className="border p-1 py-1 border-gray-500 rounded-md w-full"
                                  />
                                </div>
                                <div className="mx-3 my-5">
                                  <button className="border-2 border-gray-400 rounded-md p-2 px-5 w-full hover:bg-black hover:text-white">
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          <button className="bg-red-100 rounded-full w-8 h-8 flex justify-center items-center">
                            <RiDeleteBin5Line
                              size={15}
                              className="text-red-400"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="my-4 space-y-4">
                        {sections.map((section) => (
                          <div
                            key={section.id}
                            className=" border-2 border-gray-300 rounded-md"
                          >
                            <div className="flex">
                              <div className="p-3 w-full">
                                <label
                                  className="block text-base font-medium text-gray-700 mb-2"
                                  htmlFor="pointName"
                                >
                                  Point Name
                                </label>
                                <input
                                  type="text"
                                  name="pointName"
                                  id="pointName"
                                  placeholder="Enter Course Title"
                                  className="border p-1 py-1 border-gray-500 rounded-md w-full"
                                />
                              </div>
                              <div className="p-3 w-full">
                                <label
                                  className="block text-base font-medium text-gray-700 mb-2"
                                  htmlFor="videoLink"
                                >
                                  Video link
                                </label>
                                <input
                                  type="text"
                                  name="videoLink"
                                  id="videoLink"
                                  placeholder="Enter Video Link"
                                  className="border p-1 py-1 border-gray-500 rounded-md w-full"
                                />
                              </div>
                              <div className="p-3 w-full">
                                <label
                                  className="block text-base font-medium text-gray-700 mb-2"
                                  htmlFor="pointTime"
                                >
                                  Point Time
                                </label>
                                <input
                                  type="time"
                                  name="pointTime"
                                  id="pointTime"
                                  placeholder="Enter Course Title"
                                  className="border p-1 py-1 border-gray-500 rounded-md w-full"
                                />
                              </div>
                              <div className="flex items-center mt-5 mr-3">
                                <button
                                  className="text-red-300"
                                  onClick={() => removeSection(section.id)}
                                >
                                  <RiDeleteBin5Line size={24} />
                                </button>
                              </div>
                            </div>
                            <button className="border-2 border-gray-400 rounded-md p-1 px-4 ml-3 mb-3 hover:bg-black hover:text-white">
                              Submit
                            </button>
                          </div>
                        ))}
                      </div>
                      <div>
                        <button
                          className="border-2 border-gray-300 rounded-md p-1 px-4 hover:bg-black hover:text-white"
                          onClick={addSection}
                        >
                          Add Point
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between  border-t border-gray-300 py-5 mt-5">
              <Link to={`/admin/skill-grow/edit-course-description`}
                className="border-2 border-gray-400 rounded-md p-1 px-5 hover:bg-black hover:text-white"
              >
                Previous
              </Link>
              <Link to={`/admin/skill-grow/edit-faqs`}
                className="border-2 border-gray-400 rounded-md p-1 px-5 hover:bg-black hover:text-white"
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditCurriculum;
