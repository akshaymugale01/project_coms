import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";


import DocumentPro from "./DocumentPro";
import DocumentCommon from "./DocumentCommon";
import SharedwithMe from "./SharedwithMe";

const DocumentMain = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [page, setPage] = useState("Personal")



  return (
    <section className="flex">
      <Navbar/>
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
      <div className="flex justify-center my-2 w-full">
      <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-1 sm:rounded-full rounded-md bg-gray-200">
            <h2
              className={`p-1 ${
                page === "Personal" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              onClick={() => setPage("Personal")}
            >
             Personal
            </h2>
            <h2
              className={`p-1 ${
                page === "Common" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer transition-all duration-300 ease-linear`}
              onClick={() => setPage("Common")}
            >
              Common
            </h2>
            <h2
              className={`p-1 ${
                page === "share" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer transition-all duration-300 ease-linear`}
              onClick={() => setPage("share")}
            >
              Shared with me
            </h2>
          </div>
        </div>
        {page === "Personal" && <>
      <DocumentPro/>

         </>}
         {page === "Common" && <DocumentCommon/>}
         {page === "share" && <SharedwithMe/>}
      </div>
    </section>
  );
};

export default DocumentMain;