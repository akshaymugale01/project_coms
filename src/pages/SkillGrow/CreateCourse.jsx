import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
function CreateCourse() {
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <section className="flex">
      <div className="w-full flex flex-col overflow-hidden">
        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold p-2 bg-black rounded-full text-white md:mx-20 my-5"
        >
          Create Course
        </h2>
        <div className="my-4">
          <div className="flex justify-center mb-5">
            <div className="flex justify-center items-center bg-gray-100 rounded-md w-full mx-5 h-32">
              <div className="">
                <div className="flex justify-center">
                  <NavLink
                    to={"/admin/skill-grow/create-course-details"}
                    className={({ isActive }) =>
                      `p-1 ${
                        isActive &&
                        "bg-blue-500 text-white"
                      } border-2 border-blue-500 rounded-full w-12 h-12 flex justify-center items-center`
                    }
                  >
                    1
                  </NavLink>
                </div>
                <h2 className="text-base font-medium text-gray-500 flex justify-center ">
                  Course Details
                </h2>
              </div>
              <div className="border border-gray-300 w-60 "></div>
              <div className="">
                <div className="flex justify-center">
                  <NavLink
                    to={"/admin/skill-grow/course-description"}
                    className={({ isActive }) =>
                      `p-1 ${
                        isActive &&
                        "bg-blue-500 text-white"
                      } border-2 border-blue-500 rounded-full w-12 h-12 flex justify-center items-center`
                    }
                  >
                    2
                  </NavLink>
                </div>
                <h2 className="text-base font-medium text-gray-500 mt-2 flex justify-center">
                  Description
                </h2>
              </div>
              <div className="border border-gray-300 w-60"></div>
              <div className="">
                <div className="flex justify-center">
                  <NavLink
                    to={"/admin/skill-grow/course-curriculum"}
                    className={({ isActive }) =>
                      `p-1 ${
                        isActive &&
                        "bg-blue-500 text-white"
                      } border-2 border-blue-500 rounded-full w-12 h-12 flex justify-center items-center`
                    }
                  >
                    3
                  </NavLink>
                </div>
                <h2 className="text-base font-medium text-gray-500 flex justify-center">
                  Curriculum
                </h2>
              </div>
              <div className="border border-gray-300 w-60"></div>
              <div className="">
                <div className="flex justify-center">
                  <NavLink
                    to={"/admin/skill-grow/create-faqs"}
                    className={({ isActive }) =>
                      `p-1 ${
                        isActive &&
                        "bg-blue-500 text-white"
                      } border-2 border-blue-500 rounded-full w-12 h-12 flex justify-center items-center`
                    }
                  >
                    4
                  </NavLink>
                </div>
                <h2 className="text-base font-medium text-gray-500 mt-2 flex justify-center">
                  FAQs
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateCourse;
