import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import EditCourse from "./EditCourse";

function EditFAQs() {
  const [addFAQs, setAddFAQs] = useState(false);
  const [editFAQs, setEditFAQs] = useState(false);
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <EditCourse />
        <div className="flex justify-center">
          <div className="border-2 border-gray-300 rounded-md w-4/5 p-4 mb-8">
            <h2 className="border-b border-gray-300 py-2 text-gray-600 text-2xl font-semibold mb-5 text-center">
              Edit Course FAQs
            </h2>
            <div className="flex justify-end">
              <button
                className="border-2 border-gray-400 rounded-md p-1 px-4 hover:bg-black hover:text-white"
                onClick={() => setAddFAQs(!addFAQs)}
              >
                Add FAQs
              </button>
              <div className="flex justify-end">
                {addFAQs && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-md w-96">
                      <div className="flex justify-between p-3 bg-gray-200 rounded-md">
                        <h2 className="text-lg font-semibold text-gray-500">
                          Add FAQs
                        </h2>
                        <button
                          className=" text-gray-500"
                          onClick={() => setAddFAQs(!addFAQs)}
                        >
                          <IoClose size={24} />
                        </button>
                      </div>
                      <div className="px-3 mt-2">
                        <label
                          className="block text-base font-medium text-gray-700 mb-2"
                          htmlFor="question"
                        >
                          Question
                        </label>
                        <input
                          type="text"
                          name="question"
                          id="question"
                          placeholder="Enter your question"
                          className="border p-1 py-2 border-gray-500 rounded-md w-full"
                        />
                      </div>
                      <div className="p-3">
                        <label
                          className="block text-base font-medium text-gray-700 mb-2"
                          htmlFor="answer"
                        >
                          Answer
                        </label>
                        <textarea
                          name="answer"
                          id="answer"
                          placeholder="Enter your answer"
                          className="border p-1 py-2 border-gray-500 rounded-md w-full"
                        />
                      </div>
                      <div className="mx-3 mt-2 mb-5">
                        <button className="border-2 border-gray-400 rounded-md p-2 px-5 w-full hover:bg-black hover:text-white">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="border-2 border-gray-300 rounded-md my-3">
              <div className="flex justify-between mx-5 my-3">
                <h2 className="text-lg font-semibold text-gray-500">
                  How Digital Marketing Work?
                </h2>
                <div className="flex gap-3">
                  <button
                    className="bg-green-100 rounded-full w-8 h-8 flex justify-center items-center"
                    onClick={() => setEditFAQs(!editFAQs)}
                  >
                    <BiEdit size={15} className="text-green-400" />
                  </button>
                  {editFAQs && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white rounded-md w-96">
                        <div className="flex justify-between p-3 bg-gray-200 rounded-md">
                          <h2 className="text-lg font-semibold text-gray-500">
                            Edit FAQs
                          </h2>
                          <button
                            className=" text-gray-500"
                            onClick={() => setEditFAQs(!editFAQs)}
                          >
                            <IoClose size={24} />
                          </button>
                        </div>
                        <div className="px-3 mt-2">
                          <label
                            className="block text-base font-medium text-gray-700 mb-2"
                            htmlFor="question"
                          >
                            Question
                          </label>
                          <input
                            type="text"
                            name="question"
                            id="question"
                            placeholder="Enter your question"
                            className="border p-1 py-2 border-gray-500 rounded-md w-full"
                          />
                        </div>
                        <div className="p-3">
                          <label
                            className="block text-base font-medium text-gray-700 mb-2"
                            htmlFor="answer"
                          >
                            Answer
                          </label>
                          <textarea
                            name="answer"
                            id="answer"
                            placeholder="Enter your answer"
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
                  <button className="bg-red-100 rounded-full w-8 h-8 flex justify-center items-center">
                    <RiDeleteBin5Line size={15} className="text-red-400" />
                  </button>
                </div>
              </div>
              <p className="mx-5 text-gray-500 mb-3">
                Comfort reached gay perhaps chamber his six detract besides add.
                Moonlight newspaper up its enjoyment agreeable depending. Timed
                voice share led him to widen noisy young. At weddings believed
                laughing although the material does the exercise of. Up attempt
                offered ye civilly so sitting to. She new course gets living
                within Elinor joy. She rapturous suffering concealed.
              </p>
            </div>
            <div className="flex justify-between border-t border-gray-300 py-5 mt-5">
              <Link to={`/admin/skill-grow/edit-curriculum`}
                className="border-2 border-gray-400 rounded-md p-1 px-5 hover:bg-black hover:text-white"
              >
                Previous
              </Link>
              <button
                type="submit"
                className="border-2 border-gray-400 rounded-md p-1 px-5 hover:bg-black hover:text-white"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditFAQs;
