import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import AllCourses from "./AllCourses";
import ApprovedCourses from "./ApprovedCourses";
import PendingCourses from "./PendingCourses";
import RejectedCourses from "./RejectedCourses";
import SkillGrowHeaderComponent from "./SkillGrowHeaderComponent";
function Course() {
  const [course, setCourse] = useState("all");
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <SkillGrowHeaderComponent/>
        <div className="flex flex-wrap gap-5 mt-3 mx-12">
          <div
            className={`p-3 text-slate-800 cursor-pointer ${
              course === "all" ? "border-b border-violet-800 text-violet-600 font-semibold" : " "
            }`}
            onClick={() => setCourse("all")}
          >
            All Courses
          </div>
          <div
            className={`p-3 text-slate-800 cursor-pointer ${
              course === "approvedCourses" ? "border-b border-violet-800 text-violet-600 font-semibold" : " "
            }`}
            onClick={() => setCourse("approvedCourses")}
          >
            Approved Courses
          </div>
          <div
            className={`p-3 text-slate-800 cursor-pointer ${
              course === "pendingCourses" ? "border-b border-violet-800 text-violet-600 font-semibold" : " "
            }`}
            onClick={() => setCourse("pendingCourses")}
          >
            Pending Courses
          </div>
          <div
            className={`p-3 text-slate-800 cursor-pointer ${
              course === "rejectedCourses" ? "border-b border-violet-800 text-violet-600" : " "
            }`}
            onClick={() => setCourse("rejectedCourses")}
          >
            Rejected Courses
          </div>
        </div>
        <div className="border-b border-inherit mx-12"> </div>
        {course === "all" && (
          <div>
            <AllCourses />
          </div>
        )}
        {course === "approvedCourses" && (
          <div>
            <ApprovedCourses />
          </div>
        )}
        {course === "pendingCourses" && (
          <div>
            <PendingCourses />
          </div>
        )}
        {course === "rejectedCourses" && (
          <div>
            <RejectedCourses />
          </div>
        )}
      </div>
    </section>
  );
}

export default Course;
