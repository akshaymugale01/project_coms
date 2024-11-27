import React from "react";
import Navbar from "../../components/Navbar";
import SkillGrowHeaderComponent from "./SkillGrowHeaderComponent";
import { IoBookOutline } from "react-icons/io5";
import { FiUserCheck, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
function SkillGrowDashboard() {
  const chartOptions = {
    chart: {
      type: "area",
      height: 150,
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#34d399"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: [
        "12 July","13 July","14 July","15 July","16 July","17 July","18 July",
        "19 July","20 July","21 July","22 July","23 July","24 July","25 July",
        "26 July","27 July","28 July","29 July","30 July","31 July","01 Aug",
        "02 Aug","03 Aug","04 Aug","05 Aug","06 Aug","07 Aug","08 Aug","09 Aug",
        ,"10 Aug","11 Aug"
      ],
      labels: {
        show: true,
      },
    },
    tooltip: {
      enabled: true,
      marker: {
        show: false,
      },
    },
  };

  const chartSeries = [
    {
      name: "Active Employees",
      data: [570, 580, 590, 585, 587, 590, 591,
             596, 599, 595, 602, 594, 601, 605, 
             609, 612, 620, 630, 640, 650, 640, 
             650, 655, 650, 660, 663, 670, 665,
             668, 670
      ],
    },
  ];
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <SkillGrowHeaderComponent />
        <h2 className="text-2xl font-semibold mx-5 my-5">Courses</h2>
        <div className="grid grid-cols-3 gap-5 mx-5 my-2">
          <div className="col-span-3">
            <div className="grid grid-cols-3 gap-5">
              <div className="shadow-custom-all-sides rounded-md w-full h-40">
                <div className="flex justify-between mx-5 py-3">
                  <p className="text-sm font-medium text-gray-600">COURSES</p>
                  <IoBookOutline size={20} className="text-violet-500" />
                </div>
                <p className="text-4xl font-semibold text-center">104</p>
                <p className="text-base text-gray-600 text-center">
                  Total Courses
                </p>
              </div>
              <div className="shadow-custom-all-sides rounded-md w-full h-40">
                <div className="flex justify-between mx-5 py-3">
                  <p className="text-sm font-medium text-gray-600">EMPLOYEE</p>
                  <FiUsers size={20} className="text-violet-500" />
                </div>
                <p className="text-4xl font-semibold text-center">670</p>
                <p className="text-base text-gray-600 text-center">
                  Total Employees
                </p>
              </div>
              <div className="shadow-custom-all-sides rounded-md  w-full h-40">
                <div className="flex justify-between mx-5 py-3">
                  <p className="text-sm font-medium text-gray-600">
                    INSTRUCTOR
                  </p>
                  <FiUserCheck size={20} className="text-violet-500" />
                </div>
                <p className="text-4xl font-semibold text-center">75</p>
                <p className="text-base text-gray-600 text-center">
                  Total Instructors
                </p>
              </div>
            </div>
            <div className="col-span-3 my-5">
              <div className="bg-white p-4 rounded-lg shadow-custom-all-sides">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Active Employees
                  </h2>
                  <div className="text-green-500 text-sm">
                    0.20% <span className="text-green-500">↑</span> vs last Months
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-4">670</div>
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="area"
                  height={190}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5 my-5">
              <div className="shadow-custom-all-sides rounded-md">
                <h2 className="border-b border-gray-300 py-5 text-gray-700 font-semibold px-5">
                  Popular Instructor
                </h2>
                <Link
                  to={"/admin/skill-grow/instructor-details"}
                  className="flex gap-3 mx-5 border-b border-gray-300 py-5"
                >
                  <img
                    src="/profile5.jpg"
                    className="h-12 w-12 rounded-full"
                  ></img>
                  <div>
                    <h2 className="text-gray-600 font-semibold">
                      Radha Panchal
                    </h2>
                    <p className="text-gray-500 text-base">
                      <span className="font-semibold mr-1">4</span>Courses,
                      <span className="font-semibold ml-2 mr-1">254</span>
                      Employees
                      <span className="font-semibold ml-2 mr-1">230</span>
                      Reviews
                    </p>
                  </div>
                </Link>
                <Link
                  to={"/admin/skill-grow/instructor-details"}
                  className="flex gap-3 mx-5 border-b border-gray-300 py-5"
                >
                  <img
                    src="/profile3.jpg"
                    className="h-12 w-12 rounded-full"
                  ></img>
                  <div>
                    <h2 className="text-gray-600 font-semibold">Anil Sharma</h2>
                    <p className="text-gray-500 text-base text-nowrap">
                      <span className="font-semibold mr-1">7</span>Courses,
                      <span className="font-semibold ml-2 mr-1">314</span>
                      Employees
                      <span className="font-semibold ml-2 mr-1">350</span>
                      Reviews
                    </p>
                  </div>
                </Link>
                <Link
                  to={"/admin/skill-grow/instructor-details"}
                  className="flex gap-3 mx-5 border-b border-gray-300 py-5"
                >
                  <img
                    src="/profile1.jpg"
                    className="h-12 w-12 rounded-full"
                  ></img>
                  <div>
                    <h2 className="text-gray-600 font-semibold">Suman Singh</h2>
                    <p className="text-gray-500 text-base overflow-hidden">
                      <span className="font-semibold mr-1">2</span>Courses,
                      <span className="font-semibold ml-2 mr-1">54</span>
                      Employees
                      <span className="font-semibold ml-2 mr-1">20</span>
                      Reviews
                    </p>
                  </div>
                </Link>
                <Link
                  to={"/admin/skill-grow/instructor-details"}
                  className="flex gap-3 mx-5 border-b border-gray-300 py-5"
                >
                  <img
                    src="/profile2.jpg"
                    className="h-12 w-12 rounded-full"
                  ></img>
                  <div>
                    <h2 className="text-gray-600 font-semibold">
                      Kalpana Gupta
                    </h2>
                    <p className="text-gray-500 text-base overflow-hidden">
                      <span className="font-semibold mr-1">3</span>Courses,
                      <span className="font-semibold ml-2 mr-1">140</span>
                      Employees
                      <span className="font-semibold ml-2 mr-1">90</span>
                      Reviews
                    </p>
                  </div>
                </Link>
                <Link
                  to={"/admin/skill-grow/instructor-details"}
                  className="flex gap-3 mx-5 py-5"
                >
                  <img
                    src="/profile1.jpg"
                    className="h-12 w-12 rounded-full"
                  ></img>
                  <div>
                    <h2 className="text-gray-600 font-semibold">Sandip More</h2>
                    <p className="text-gray-500 text-base overflow-hidden">
                      <span className="font-semibold mr-1">2</span>Courses,
                      <span className="font-semibold ml-2 mr-1">90</span>
                      Employees
                      <span className="font-semibold ml-2 mr-1">80</span>
                      Reviews
                    </p>
                  </div>
                </Link>
              </div>
              <div className="shadow-custom-all-sides rounded-md">
                <h2 className="border-b border-gray-300 py-5 text-gray-700 font-semibold px-5">
                  Recent Courses
                </h2>
                <div className="flex gap-3 mx-5 border-b border-gray-300 py-5">
                  <img src="/figma.jpg" className="h-14 w-20 rounded-md"></img>
                  <div>
                    <h2 className="text-gray-600 font-semibold text-base">
                      Figma Design
                    </h2>
                    <div className="flex gap-2 my-1">
                      <img
                        src="/profile2.jpg"
                        className="h-7 w-7 rounded-full"
                      ></img>
                      <h2 className="text-gray-600 text-sm">Kalpana Gupta</h2>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mx-5 border-b border-gray-300 py-5">
                  <img
                    src="/digitalMarketing.jpg"
                    className="h-14 w-20 rounded-md"
                  ></img>
                  <div>
                    <h2 className="text-gray-600 font-semibold text-base">
                      Digital Marketing
                    </h2>
                    <div className="flex gap-2 my-1">
                      <img
                        src="/profile3.jpg"
                        className="h-7 w-7 rounded-full"
                      ></img>
                      <h2 className="text-gray-600 text-sm">Anil Sharma</h2>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mx-5 border-b border-gray-300 py-5">
                  <img
                    src="/graphic.jpg"
                    className="h-14 w-20 rounded-md"
                  ></img>
                  <div>
                    <h2 className="text-gray-600 font-semibold text-base">
                      Graphic Design
                    </h2>
                    <div className="flex gap-2 my-1">
                      <img
                        src="/profile5.jpg"
                        className="h-7 w-7 rounded-full"
                      ></img>
                      <h2 className="text-gray-600 text-sm">Radha Panchal</h2>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mx-5 border-b border-gray-300 py-5">
                  <img
                    src="/reactImg.png"
                    className="h-14 w-20 rounded-md"
                  ></img>
                  <div>
                    <h2 className="text-gray-600 font-semibold text-base">
                      Basic React
                    </h2>
                    <div className="flex gap-2 my-1">
                      <img
                        src="/profile4.jpg"
                        className="h-7 w-7 rounded-full"
                      ></img>
                      <h2 className="text-gray-600 text-sm">Sandip More</h2>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mx-5 border-b border-gray-300 py-5">
                  <img
                    src="/digitalMarketing.jpg"
                    className="h-14 w-20 rounded-md"
                  ></img>
                  <div>
                    <h2 className="text-gray-600 font-semibold text-base">
                      Advance Digital Marketing
                    </h2>
                    <div className="flex gap-2 my-1">
                      <img
                        src="/profile1.jpg"
                        className="h-7 w-7 rounded-full"
                      ></img>
                      <h2 className="text-gray-600 text-sm">Suman Singh</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shadow-custom-all-sides rounded-md">
                <h2 className="border-b border-gray-300 py-5 text-gray-700 font-semibold px-5">
                  Activity
                </h2>
                <div className="flex gap-3 mx-5 mt-5">
                  <div>
                    <img
                      src="/profile1.jpg"
                      className="h-12 w-12 rounded-full"
                    ></img>
                    <div className=" mx-5 border-l border-gray-300 h-16"></div>
                  </div>
                  <div>
                    <h2 className="text-gray-600 font-semibold">Riya Yadav</h2>
                    <p className="text-gray-500 text-base">
                      Just buy the courses”Build React Application Tutorial”
                    </p>
                    <p className="text-gray-500 text-sm ">2m ago</p>
                  </div>
                </div>
                <div className="flex gap-3 mx-5">
                  <div>
                    <img
                      src="/profile4.jpg"
                      className="h-12 w-12 rounded-full"
                    ></img>
                    <div className="ml-5 border-l border-gray-300 h-16"></div>
                  </div>
                  <div>
                    <h2 className="text-gray-600 font-semibold">Vinay Singh</h2>
                    <p className="text-gray-500">
                      Comment on “Bootstrap Tutorial” Says “Hi,I m irene...
                    </p>
                    <p className="text-gray-500 text-sm">1 hour ago</p>
                  </div>
                </div>
                <div className="flex gap-3 mx-5">
                  <div>
                    <img
                      src="/profile5.jpg"
                      className="h-12 w-12 rounded-full"
                    ></img>
                    <div className="ml-5 border-l border-gray-300 h-16"></div>
                  </div>
                  <div>
                    <h2 className="text-gray-600 font-semibold">Priya Dogra</h2>
                    <p className="text-gray-500">
                      Just share your article on Social Media..
                    </p>
                    <p className="text-gray-500 text-sm">2 month ago</p>
                  </div>
                </div>
                <div className="flex gap-3 mx-5 pb-5">
                  <div>
                    <img
                      src="/profile3.jpg"
                      className="h-12 w-12 rounded-full"
                    ></img>
                  </div>
                  <div>
                    <h2 className="text-gray-600 font-semibold">Karan Gupta</h2>
                    <p className="text-gray-500 ">
                      Just buy the courses "Build React Application Tutorial
                    </p>
                    <p className="text-gray-500 text-sm">2m ago</p>
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

export default SkillGrowDashboard;
