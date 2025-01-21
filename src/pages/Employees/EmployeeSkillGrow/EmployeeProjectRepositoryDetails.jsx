import React from "react";
import Navbar from "../../../components/Navbar";
import { CiCalendar, CiFlag1 } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
// import { LuPieChart } from "react-icons/lu";
import { BsDatabaseDash } from "react-icons/bs";
import profile1 from "/profile1.jpg";
import profile2 from "/profile2.jpg";
import profile3 from "/profile3.jpg";
import profile4 from "/profile4.jpg";
import profile5 from "/profile5.jpg";
import profile6 from "/profile6.jpg";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { LucidePieChart } from "lucide-react";
function EmployeeProjectRepositoryDetails() {
  const options = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },
        dataLabels: {
          showOn: "always",
          name: {
            show: false,
          },
          value: {
            formatter: function (val) {
              return parseInt(val) + "%";
            },
            color: "#111",
            fontSize: "36px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#f59e0b"], // yellow-500 color
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    colors: ["#8b5cf6"], // violet-500 color
    labels: ["Progress"], // This is just for completeness, won't be displayed
  };

  const series = [100];

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Total Budget", "Total Spent", "Remaining", "Over Spent"],
    colors: ["#7E37D8", "#2980b9", "#27ae60", "#e74c3c"],
    legend: {
      position: "bottom",
    },
    tooltip: {
      y: {
        formatter: (val) => `₹ ${val}`,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const chartSeries = [50000, 40000, 10000, 0];

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <div className="grid lg:grid-cols-4 gap-5 mb-10 mx-5 mt-5">
          <div className="col-span-2 ">
            <div className="shadow-custom-all-sides rounded-md py-4">
              <div className="flex justify-between px-5">
                <p className="text-lg font-semibold text-slate-800">
                  Project Summary
                </p>
              </div>
              <div className="border-t border-gray-400 mt-2 mb-5"></div>
              <div className="px-5 pb-5">
                <p className="text-base text-gray-500">
                  Give a high-level overview of the product / project you re
                  working on, its goals, etc..Elaborate on the target audience
                  of your project/product, link out to additional resources.
                  Vivamus pretium laoreet massa eu euismod. Nunc accumsan id
                  odio sed luctus. Suspendisse a lacus sed ex consequat interdum
                  quis non eros. Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Debitis labore nam fuga sapiente vel iste
                  animiicta ab at placeat sint.
                </p>
              </div>
              <div className="border-b border-thin mt-3 flex justify-between py-3 mx-5">
                <div className="flex gap-2">
                  <CiCalendar className="mt-1 text-violet-800" size={20} />
                  <p className="text-gray-500 font-semibold text-base">
                    Start Date
                  </p>
                </div>
                <p className="font-semibold text-sm text-gray-800">
                  22 July 2024
                </p>
              </div>
              <div className="border-b border-thin flex justify-between py-3 mx-5">
                <div className="flex gap-2">
                  <CiCalendar className="mt-1 text-violet-800" size={20} />
                  <p className="text-gray-500 font-medium text-base">
                    End Date
                  </p>
                </div>
                <p className="font-semibold text-sm text-gray-800">
                  22 Aug 2024
                </p>
              </div>
              <div className="border-b border-thin flex justify-between py-3 mx-5">
                <div className="flex gap-2">
                  <IoTimeOutline className="mt-1 text-violet-800" size={20} />
                  <p className="text-gray-500 font-medium text-base">
                    Estimate Time
                  </p>
                </div>
                <p className="font-semibold text-sm text-gray-800">30 Days</p>
              </div>
              <div className="flex justify-between py-3 mx-5">
                <div className="flex gap-2">
                  <MdOutlineCurrencyRupee
                    className="mt-1 text-violet-800"
                    size={20}
                  />
                  <p className="text-gray-500 font-medium text-base">Cost</p>
                </div>
                <p className="font-semibold text-base text-gray-800">
                  ₹ 18,000
                </p>
              </div>
            </div>
            <div className="shadow-custom-all-sides rounded-md mt-5">
              <div className="px-5 py-3">
                <h2 className="text-gray-500 font-semibold">Assignee</h2>
                <div className="flex gap-3 py-3">
                  <div>
                    <img
                      src={profile1}
                      className="w-12 h-12 rounded-full"
                      alt="Profile"
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold flex items-center">
                      Riya Yadav<span className="text-gray-500"> (Owner)</span>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200"></div>
              <div className="px-5 py-3">
                <p className="text-gray-500 font-semibold">Team</p>
                <div className="flex sm:flex-wrap flex-wrap gap-2 my-4">
                  <img
                    src={profile1}
                    className="w-9 h-9 mt-1 rounded-full"
                    alt="Profile"
                  />
                  <img
                    src={profile2}
                    className="w-9 h-9 mt-1 rounded-full"
                    alt="Profile"
                  />
                  <img
                    src={profile3}
                    className="w-9 h-9 mt-1 rounded-full"
                    alt="Profile"
                  />
                  <img
                    src={profile4}
                    className="w-9 h-9 mt-1 rounded-full"
                    alt="Profile"
                  />
                  <img
                    src={profile5}
                    className="w-9 h-9 mt-1 rounded-full"
                    alt="Profile"
                  />
                  <img
                    src={profile6}
                    className="w-9 h-9 mt-1 rounded-full"
                    alt="Profile"
                  />
                </div>
              </div>
            </div>
            <div className="shadow-custom-all-sides rounded-md mt-5">
              <Link to={"/employee/certificate/project-task-completed"}>
                <div className="flex justify-between px-5 py-5">
                  <p className="text-base text-gray-800 font-semibold">
                   Total Completed Task
                  </p>
                </div>
                <div className="mb-10">
                  <div className="flex justify-center items-center mb-1">
                    <h2 className="text-5xl font-semibold text-green-500">17</h2>
                  </div>
                  <div className="flex justify-center items-center pb-8">
                    <p className="text-base text-gray-700">
                      <span className="text-base text-gray-700 font-bold">
                        8
                      </span>
                      Today Completed
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div className="shadow-custom-all-sides rounded-md bg-violet-500 text-white">
                <h2 className="text-xl font-semibold mx-5 py-2">
                  Completed Date
                </h2>
                <div className="flex justify-between mx-5 my-3 pb-8">
                  <div>
                    <h2 className="text-4xl font-semibold">40 Days</h2>
                    <p className="text-base mx-1 my-1">15 Aug, Friday</p>
                  </div>
                  <div className="text-6xl">
                    <CiFlag1 />
                  </div>
                </div>
              </div>
              <div className="shadow-custom-all-sides rounded-md">
                <h2 className="text-lg font-semibold mx-5 py-3 text-slate-800">
                  Overall Progress
                </h2>
                <Chart
                  options={options}
                  series={series}
                  type="radialBar"
                  height={350}
                />
              </div>
            </div>
            <div className="shadow-custom-all-sides rounded-md">
              <div className="flex mx-5 py-3">
                <h2 className="text-lg font-semibold  text-slate-800">
                  Budget
                </h2>
              </div>
              <div className="grid md:grid-cols-2 border-t border-gray-300">
                <div className="flex justify-between gap-5 items-center p-5 px-10">
                  <div>
                    <h2 className="text-3xl font-semibold mb-2">₹ 50,000</h2>
                    <p className="text-base text-gray-700 ml-2">Total Budget</p>
                  </div>
                  <div className="bg-violet-100 rounded-full p-3">
                    <MdOutlineCurrencyRupee
                      className="items-center text-violet-400"
                      size={30}
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-5 items-center p-5 px-10 border-l border-gray-300">
                  <div>
                    <h2 className="text-3xl font-semibold mb-2">₹ 40,000</h2>
                    <p className="text-base text-gray-700 ml-2">Total Spent</p>
                  </div>
                  <div className="bg-blue-100 rounded-full p-3">
                    <FiShoppingCart
                      className="items-center text-blue-400"
                      size={30}
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-5 items-center p-5 px-10 border-l border-t border-gray-300">
                  <div>
                    <h2 className="text-3xl font-semibold mb-2">₹ 10,000</h2>
                    <p className="text-base text-gray-700 ml-2">Remaining</p>
                  </div>
                  <div className="bg-green-100 rounded-full p-3">
                    <LucidePieChart
                      className="items-center text-green-400"
                      size={30}
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-5 items-center p-5 px-10 border-l border-t border-gray-300">
                  <div>
                    <h2 className="text-3xl font-semibold mb-2">₹ 0</h2>
                    <p className="text-base text-gray-700 ml-2">Over Spent</p>
                  </div>
                  <div className="bg-red-100 rounded-full p-3">
                    <BsDatabaseDash
                      className="items-center text-red-400"
                      size={30}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-custom-all-sides rounded-md my-5 p-5">
              <h2 className="text-lg font-semibold text-slate-800 mb-5">
                Budget
              </h2>
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="pie"
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeProjectRepositoryDetails;
