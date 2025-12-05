import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import EditCourse from "./EditCourse";

function EditCourseDescription() {
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <EditCourse />
        <div className="flex justify-center">
          <div className="border-2 border-gray-300 rounded-md w-4/5 p-4 mb-8">
            <h2 className="border-b border-gray-300 py-2 text-gray-600 text-2xl font-semibold mb-5 text-center">
              Edit Course Description
            </h2>
            <div className="grid grid-cols-1">
              <div className="p-3">
                <label className="text-base mb-2" htmlFor="courseHighlights">
                  Course Highlights
                </label>
                <textarea
                  name="courseHighlights"
                  id="courseHighlights"
                  placeholder="Enter course highlights"
                  className="border p-1 py-2 border-gray-500 rounded-md w-full mt-2"
                />
              </div>

              <div className="p-3">
                <label className="text-base mb-2" htmlFor="keyLearningOutcomes">
                  Key Learning Outcomes
                </label>
                <textarea
                  name="keyLearningOutcomes"
                  id="keyLearningOutcomes"
                  placeholder="Enter key learning outcomes"
                  className="border p-1 py-2 border-gray-500 rounded-md w-full mt-2"
                />
              </div>

              <div className="p-3">
                <label className="text-base mb-2" htmlFor="targetAudience">
                  Target Audience
                </label>
                <textarea
                  name="targetAudience"
                  id="targetAudience"
                  placeholder="Enter target audience"
                  className="border p-1 py-2 border-gray-500 rounded-md w-full mt-2"
                />
              </div>

              <div className="p-3">
                <label className="text-base mb-2" htmlFor="requirements">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  id="requirements"
                  placeholder="Enter requirements"
                  className="border p-1 py-2 border-gray-500 rounded-md w-full mt-2"
                />
              </div>
            </div>
            <div className="flex justify-between border-t border-gray-300 py-5 mt-5">
              <Link to={`/admin/skill-grow/edit-course-details`}
                className="border-2 border-gray-400 rounded-md p-1 px-5 hover:bg-black hover:text-white"
              >
                Previous
              </Link>
              <Link to={`/admin/skill-grow/edit-curriculum`}
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

export default EditCourseDescription;
