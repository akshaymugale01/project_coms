import React from "react";
import Navbar from "../../../components/Navbar";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import digitalMarketingImg from "/digitalMarketing.jpg";
import sixSigma from "/six sigma.jpg";

import reactImg from "/reactImg.png";
import figmaImg from "/figma.jpg";
import graphicImgImg from "/graphic.jpg";
import { IoTimeOutline } from "react-icons/io5";
import { RxTable } from "react-icons/rx";
function EmployeeCourseRequestApproval() {
  const themeColor = useSelector((state) => state.theme.color);
  const courses = [
    {
      id: 1,
      image: sixSigma,
      priceLevel: "Paid",
      skillLevel: "Level 2",
      title: "Lean Six Sigma Programme",
      instructor: "Anil Sharma",
      rating: "4.0 ★★★★,",
      reviews: 67788,
      price: "₹ 3000",
      language: "English",
      duration: "42 Days",
      lectures: "30 lectures",
      exam: "Exam included",
    },
    {
      id: 3,
      image: digitalMarketingImg,
      priceLevel: "Free",
      skillLevel: "Level 4",
      title: "Digital Marketing",
      instructor: "Sunil More",
      rating: "4.0 ★★★★,",
      reviews: 6788,
      price: "Free",
      language: "English",
      duration: "12 Days",
      lectures: 7,
      exam: "Exam not included",
    },
    {
      id: 2,
      image: reactImg,
      priceLevel: "Paid",
      skillLevel: "Level 3",
      title: "React Native",
      instructor: "Vivek Kumar",
      rating: "4.0 ★★★★,",
      reviews: 68788,
      price: "₹ 5000",
      language: "English",
      duration: "15 Days",
      lectures: 15,
      exam: "Exam included",
    },
    
    {
      id: 4,
      image: reactImg,
      priceLevel: "Paid",
      skillLevel: "Level 5",
      title: "Java and Spring Boot",
      instructor: "Max David",
      rating: "5.0 ★★★★★,",
      reviews: 67788,
      price: "₹ 25000",
      language: "English",
      duration: "2 Months",
      lectures: 30,
      exam: "Exam not included",
    },
    {
      id: 5,
      image: graphicImgImg,
      priceLevel: "Free",
      skillLevel: "Level 6",
      title: "PhotoGraphy",
      instructor: "Ajay Singh",
      rating: "4.7 ★★★★",
      reviews: 67788,
      price: "₹ 25000",
      language: "Hindi",
      duration: "10 Days",
      lectures: 10,
      exam: "Exam included",
    },
    {
      id: 6,
      image: reactImg,
      priceLevel: "Paid",
      skillLevel: "Level 7",
      title: "Mysql",
      instructor: "Niharika Singh",
      rating: "4.5 ★★★★",
      reviews: 47788,
      price: "₹ 10000",
      language: "Hindi",
      duration: "20 Days",
      lectures: 12,
      exam: "Exam included",
    },
    {
      id: 7,
      image: graphicImgImg,
      priceLevel: "Paid",
      skillLevel: "Level 8",
      title: "VFX And Gaming",
      instructor: "Vinay Kumar",
      rating: "4.5 ★★★★",
      reviews: 66788,
      price: "₹ 19000",
      language: "Hindi",
      duration: "30 Days",
      lectures: 15,
      exam: "Exam included",
    },
    {
      id: 8,
      image: digitalMarketingImg,
      priceLevel: "Free",
      skillLevel: "Level 9",
      title: "Accounting Courses",
      instructor: "Maya Kishan",
      rating: "4.4 ★★★★",
      reviews: 67708,
      price: "₹ 19000",
      language: "Hindi",
      duration: "14 Days",
      lectures: 10,
      exam: "Exam not  included",
    },
    {
      id: 9,
      image: figmaImg,
      priceLevel: "Free",
      skillLevel: "Level 10",
      title: "finance",
      instructor: "Vijay Sharma",
      rating: "4.0 ★★★★",
      reviews: 67889,
      price: "₹ 19000",
      language: "Hindi",
      duration: "14 Days",
      lectures: 12,
      level: "Available at Level 3",
      exam: "Exam included",
    },
  ];
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <div className="flex justify-center my-2 w-full">
          <div
            className="sm:flex flex-wrap grid grid-cols-2 sm:flex-row gap-2 text-sm font-medium p-2 rounded-md text-white"
            style={{ background: themeColor }}
          >
            <NavLink
              to={"/employee/certificate/course"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Certificate
            </NavLink>
            <NavLink
              to={"/employee/certificate/rr-certificate"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              RR Certificate
            </NavLink>
            <NavLink
              to={"/employee/certificate/course-request-approval"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Course Request & Approval
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-request-approval/request"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Project Request & Approval
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-tracking"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Project Tracking
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-repository"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Project Repository
            </NavLink>
            <NavLink
              to={"/employee/certificate/knowledge-base"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
            >
              Knowledge Base
            </NavLink>
          </div>
        </div>
        <div className=" mx-5">
          <h2 className="text-right font-medium ">
            Current Level :{" "}
            <span className="rounded-full border px-4 p-1 text-green-600 bg-green-400 bg-opacity-30 border-green-600">
              Level 3
            </span>
          </h2>
          <div className="xl:grid grid-cols-4 gap-2">
            <div className="col-span-3 mb-5">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:my-5">
                {courses.map((course, index) => (
                  <div
                    className="shadow-custom-all-sides rounded-md"
                    key={index}
                  >
                    <Link
                      //  to={"/employee/certificate/course-details"}
                      to={
                        course.priceLevel === "Paid"
                          ? "/employee/certificate/course-details"
                          : "/employee/certificate/course-details-free"
                      }
                    >
                      <div className="">
                        <div>
                          <img
                            src={course.image}
                            className="rounded-md h-48 w-full"
                          ></img>
                        </div>
                        <div className="px-3 pt-2">
                          <div className="flex justify-between pb-1">
                            <div className="bg-violet-100 text-violet-500 px-3 p-1 text-sm font-semibold rounded-md">
                              {course.skillLevel}
                            </div>
                            <div className="bg-green-100 text-green-500 p-1 px-3 text-sm font-semibold rounded-md">
                              {course.priceLevel}
                            </div>
                          </div>
                          <h2 className=" font-medium">{course.title}</h2>
                          <p className="mt-1">{course.instructor}</p>
                          <p className="mt-1">
                            {course.rating} ({course.reviews})
                          </p>
                          <div className="flex justify-between">
                            <p className=""> {course.price}</p>
                            <p>{course.language}</p>
                          </div>
                          <h2 className="text-right text-gray-400">
                            {course.exam}
                          </h2>
                          <div className="flex justify-between border-t border-gray-300 my-2 py-2">
                            <p className="flex gap-1">
                              <IoTimeOutline
                                className="text-red-500"
                                size={20}
                              />
                              <span className="text-gray-700 text-sm font-semibold">
                                {course.duration}
                              </span>
                            </p>
                            <p className="flex gap-1">
                              <RxTable className="text-blue-500" size={20} />
                              <span className="text-gray-700 text-sm font-semibold">
                                {course.lectures}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-1 md:my-5">
              <div className="shadow-custom-all-sides rounded-md py-5 px-5">
                <h2 className="text-lg font-semibold">Category</h2>
                <div className="mt-3">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="checkbox" className="text-gray-700">
                        All
                      </label>
                    </div>
                    <p>9</p>
                  </div>
                </div>
                <div className="mt-1">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="checkbox" className="text-gray-700">
                        Development
                      </label>
                    </div>
                    <p>3</p>
                  </div>
                </div>
                <div className="mt-1">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="checkbox" className="text-gray-700">
                        Design
                      </label>
                    </div>
                    <p>2</p>
                  </div>
                </div>
                <div className="mt-1">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="checkbox" className="text-gray-700">
                        Accounting
                      </label>
                    </div>
                    <p>1</p>
                  </div>
                </div>
                <div className="mt-1">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="checkbox" className="text-gray-700">
                        finance
                      </label>
                    </div>
                    <p>1</p>
                  </div>
                </div>
                <div className="mt-1">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="checkbox" className="text-gray-700">
                        PhotoGraphy
                      </label>
                    </div>
                    <p>1</p>
                  </div>
                </div>
                <div className="mt-1">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="checkbox" className="text-gray-700">
                        other
                      </label>
                    </div>
                    <p>1</p>
                  </div>
                </div>
              </div>
              <div className="shadow-custom-all-sides rounded-md py-5 px-5 my-5">
                <h2 className="text-lg font-semibold">Course Status</h2>
                <div className="gap-5 my-3">
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      New Courses
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      Applied Courses
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      Awaiting Approval
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      Approved
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      Started
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      Rejected
                    </label>
                  </div>
                </div>
              </div>
              <div className="shadow-custom-all-sides rounded-md py-5 px-5 my-5">
                <h2 className="text-lg font-semibold">Price Level</h2>
                <div className="gap-5 my-3">
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700 text-sm">
                      All
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700 text-sm">
                      Free
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700 text-sm">
                      Complimentary (Paid by Company)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700 text-sm">
                      Paid
                    </label>
                  </div>
                </div>
              </div>
              <div className="shadow-custom-all-sides rounded-md py-5 px-5 my-5">
                <h2 className="text-lg font-semibold">Skill Level</h2>
                <div className="my-3">
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      All Level
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      Level 1
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      Level 2
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      Level 3
                    </label>
                  </div>
                </div>
              </div>
              <div className="shadow-custom-all-sides rounded-md py-5 px-5 my-5">
                <h2 className="text-lg font-semibold">Language</h2>
                <div className="my-3">
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      English
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      Hindi
                    </label>
                  </div>
                </div>
              </div>
              <div className="shadow-custom-all-sides rounded-md py-5 px-5 my-5">
                <h2 className="text-lg font-semibold">Time</h2>
                <div className="my-3">
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      Full Time
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      Part Time
                    </label>
                  </div>
                </div>
              </div>
              <div className="shadow-custom-all-sides rounded-md py-5 px-5 my-5">
                <h2 className="text-lg font-semibold">Format</h2>
                <div className="my-3">
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      All
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      Offline
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="checkbox" className="text-gray-700">
                      Online
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default EmployeeCourseRequestApproval;
