import React, { useState } from "react";
import Select from "react-select";
import CreateCourse from "./CreateCourse";
import Navbar from '../../components/Navbar';
import { Link } from "react-router-dom";
function CreateCourseDetails() {
  const [paid, setPaid] = useState(false);

  const handlePriceLevelChange = (event) => {
    setPaid(event.target.value === "paid");
  };
  const instructorOptions = [
    { value: "anil-sharma", label: "Anil Sharma" },
    { value: "radha-panchal", label: "Radha Panchal" },
    { value: "rohan-sahani", label: "Rohan Sahani" },
  ];
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <CreateCourse />
        <div className="flex justify-center">
          <div className="border-2 border-gray-300 rounded-md w-full mx-5 p-4 mb-8">
            <h2 className="border-b border-gray-300 py-2 text-gray-600 text-2xl font-semibold mb-5 text-center">
              Create Course
            </h2>
            <div className="md:grid grid-cols-3 gap-4 md:mx-10">
              <div className="flex flex-col">
                <label className="text-base mb-2" htmlFor="courseTitle">
                  Course Title
                </label>
                <input
                  type="text"
                  name="courseTitle"
                  id="courseTitle"
                  placeholder="Enter Course Title"
                  className="border p-1 py-2 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-base mb-2" htmlFor="instructorName">
                  Instructor Name
                </label>
                <Select
                  className=" hover:border-black"
                  options={instructorOptions}
                  placeholder="Select Instructor"
                  classNamePrefix="react-select"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-base mb-2" htmlFor="language">
                  Language
                </label>
                <select
                  name="language"
                  id="language"
                  className="border p-1 py-2 border-gray-500 rounded-md w-full"
                >
                  <option value="">Select Language</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-base  mb-2" htmlFor="courseLevel">
                  Course Level
                </label>
                <select
                  name="courseLevel"
                  id="courseLevel"
                  className="border p-1 py-2 border-gray-500 rounded-md w-full"
                >
                  <option value="">Select Course Level</option>
                  <option value="all">All Levels</option>
                  <option value="beginner">Level 1</option>
                  <option value="intermediate">Level 2</option>
                  <option value="advanced">Level 3</option>
                  <option value="advanced">Level 4</option>
                  <option value="advanced">Level 5</option>
                </select>
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-base mb-2" htmlFor="totalLectures">
                  Total Lectures
                </label>
                <input
                  type="number"
                  name="totalLectures"
                  id="totalLectures"
                  placeholder="Enter Total Lectures"
                  className="border p-1 py-2 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-base mb-2" htmlFor="courseDuration">
                  Course Duration
                </label>
                <input
                  type="text"
                  name="courseDuration"
                  id="courseDuration"
                  placeholder="Enter Course Duration"
                  className="border p-1 py-2 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-base mb-2" htmlFor="priceLevel">
                  Price Level
                </label>
                <select
                  name="priceLevel"
                  id="priceLevel"
                  className="border p-1 py-2 border-gray-500 rounded-md"
                  onChange={handlePriceLevelChange}
                >
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              {paid && (
                <div className="flex flex-col">
                  <label className="text-base mb-2" htmlFor="coursePrice">
                    Course Price
                  </label>
                  <input
                    type="number"
                    name="coursePrice"
                    id="coursePrice"
                    placeholder="Enter Course Price"
                    className="border p-1 py-2 border-gray-500 rounded-md w-full"
                  />
                </div>
              )}
              <div className="col-span-3">
                <label
                  htmlFor="file-upload"
                  className="border-2 border-dashed p-4 mb-4 border-gray-300 rounded-lg w-full flex items-center justify-center cursor-pointer"
                >
                  Upload Course Image
                </label>
                <input type="file" className="hidden" id="file-upload" />
              </div>
            </div>
            <div className="flex justify-end  border-t border-gray-300 py-5 mt-5">
              <Link to={`/admin/skill-grow/course-description`}
                type="submit"
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

export default CreateCourseDetails;
