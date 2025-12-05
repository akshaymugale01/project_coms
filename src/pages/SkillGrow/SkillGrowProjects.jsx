import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SkillGrowAllProjects from "./SkillGrowAllProjects";
import SkillGrowApprovedProjects from "./SkillGrowApprovedProjects";
import SkillGrowPendingProjects from "./SkillGrowPendingProjects";
import SkillGrwoRejectedProjects from "./SkillGrwoRejectedProjects";
import SkillGrowHeaderComponent from "./SkillGrowHeaderComponent";
function SkillGrowProjects() {
  const [projects, setProjects] = useState("allProjects");
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <SkillGrowHeaderComponent/>
        <div className="flex flex-wrap gap-5 mt-3 mx-12">
          <div
            className={`p-3 text-slate-800 cursor-pointer ${
              projects === "allProjects"
                ? "text-violet-600 border-b border-violet-600 font-semibold"
                : ""
            }`}
            onClick={() => setProjects("allProjects")}
          >
            All Projects
          </div>
          <div
            className={`p-3 text-slate-800 cursor-pointer ${
              projects === "approvedProjects"
                ? "text-violet-600 border-b border-violet-600  font-semibold"
                : ""
            }`}
            onClick={() => setProjects("approvedProjects")}
          >
            Approved Projects
          </div>
          <div
            className={`p-3 text-slate-800 cursor-pointer ${
              projects === "pendingProjects"
                ? "text-violet-600 border-b border-violet-600  font-semibold"
                : ""
            }`}
            onClick={() => setProjects("pendingProjects")}
          >
            Pending Projects
          </div>
          <div
            className={`p-3 text-slate-800 cursor-pointer ${
              projects === "rejectedProjects"
                ? "text-violet-600 border-b border-violet-600  font-semibold"
                : ""
            }`}
            onClick={() => setProjects("rejectedProjects")}
          >
            Rejected Projects
          </div>
        </div>
        <div className="border-b border-gray-200 mx-12 mb-2"></div>
        {projects === "allProjects" && <div> <SkillGrowAllProjects/> </div>}
        {projects === "approvedProjects" && <div> <SkillGrowApprovedProjects/> </div>}
        {projects === "pendingProjects" && <div> <SkillGrowPendingProjects/> </div>}
        {projects === "rejectedProjects" && <div> <SkillGrwoRejectedProjects/> </div>}
      </div>
    </section>
  );
}

export default SkillGrowProjects;
