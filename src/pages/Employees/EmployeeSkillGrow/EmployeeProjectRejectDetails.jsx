import React from "react";
import Navbar from "../../../components/Navbar";
import { CiCalendar, CiFlag1 } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { LuPieChart } from "react-icons/lu";
import { BsDatabaseDash } from "react-icons/bs";
import profile1 from "/profile1.jpg";
import profile2 from "/profile2.jpg";
import profile3 from "/profile3.jpg";
import profile4 from "/profile4.jpg";
import profile5 from "/profile5.jpg";
import profile6 from "/profile6.jpg";
import Chart from "react-apexcharts";
import { FaRegFileLines } from "react-icons/fa6";
function EmployeeProjectRejectDetails() {
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
        stops: [0, 60],
      },
    },
    colors: ["#8b5cf6"], // violet-500 color
    labels: ["Progress"], // This is just for completeness, won't be displayed
  };

  const series = [0];

  const categoryBudget = [
    {
      id: 1,
      categoryName: "Research & Development",
      categoryBudget: "₹7,000",
      percent: "14%",
    },
    {
      id: 2,
      categoryName: "Product Development",
      categoryBudget: " ₹18,000",
      percent: "36%",
    },
    {
      id: 3,
      categoryName: "Legal & Compliance",
      categoryBudget: "₹5,000 ",
      percent: "10%",
    },
    {
      id: 4,
      categoryName: "Marketing & Sales",
      categoryBudget: "₹14,000 ",
      percent: "28%",
    },
    {
      id: 5,
      categoryName: "Miscellaneous",
      categoryBudget: "₹6,000 ",
      percent: "12%",
    },
  ];

  const task = [
    {
      id: 1,
      taskName: "Develop Product Design",
      startDate: "22/08/2024",
      endDate: "28/08/2024",
      delayDate: "",
      status: "pending",
      assignee: "Akshat Shrawat",
      progress: "0%",
    },
    {
      id: 2,
      taskName: "Conduct Product Testing",
      startDate: "29/08/2024",
      endDate: "4/09/2024",
      delayDate: "",
      status: "pending",
      assignee: "Raj Verma",
      progress: "0%",
    },
    {
      id: 3,
      taskName: "Launch Online Marketing Campaigns",
      startDate: "22/08/2024",
      endDate: "31/08/2024",
      delayDate: "",
      status: "pending",
      assignee: "Kunal Sah",
      progress: "0%",
    },
    {
      id: 4,
      taskName: "Support Sales Team Activities",
      startDate: "1/09/2024",
      endDate: "10/09/2024",
      delayDate: "",
      status: "pending",
      assignee: "Ravindar Sahani",
      progress: "0%",
    },
    {
      id: 5,
      taskName: "Manage Shipping Logistics",
      startDate: "11/09/2024",
      endDate: "16/09/2024",
      delayDate: "",
      status: "pending",
      assignee: "Vishal Sharma",
      progress: "0%",
    },
    {
      id: 6,
      taskName: "Develop and Procure Packaging",
      startDate: "17/092024",
      endDate: "21/09/2024",
      delayDate: "",
      status: "pending",
      assignee: "Harsh Thakur",
      progress: "0%",
    },
    {
      id: 7,
      taskName: "Obtain Necessary Licenses",
      startDate: "22/08/2024",
      endDate: "26/08/2024",
      delayDate: "",
      status: "pending",
      assignee: "Shantanu Kantak",
      progress: "0%",
    },
    {
      id: 8,
      taskName: "Seek Legal Consultation",
      startDate: "27/08/2024",
      endDate: "31/08/2024",
      delayDate: "",
      status: "pending",
      assignee: "Sameer Parmar",
      progress: "0%",
    },
    {
      id: 9,
      taskName: "Manage Unexpected Expenses",
      startDate: "22/08/2024",
      endDate: "22/09/2024",
      delayDate: "",
      status: "pending",
      assignee: "Ganesh Verma",
      progress: "0%",
    },
    {
      id: 10,
      taskName: "Handle Administrative Costs",
      startDate: "22/08/2024",
      endDate: "22/09/2024",
      delayDate: "",
      status: "pending",
      assignee: "Arjun Sahani",
      progress: "0%",
    },
  ];

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <div className=" flex justify-end">
          <p className="p-1 rounded-full border border-red-500 text-red-500 bg-opacity-30 bg-red-200 px-4 mx-5 mt-2">Rejected</p>
        </div>
        <div className="mx-5">
          <p className="font-medium">Reason for rejection</p>
          <p className="bg-gray-100 p-2 rounded-md">Overlapping with Existing Projects: The project is redundant or overlaps with other ongoing initiatives, leading to duplication of efforts.</p>
        </div>
        <div className="grid lg:grid-cols-4 gap-5 mb-5 mx-5 mt-5">
          <div className="col-span-2 ">
            <div className="shadow-custom-all-sides rounded-md py-4 h-full">
              <div className="flex justify-between px-5">
                <p className="text-lg font-semibold text-slate-800">
                  Project Summary
                </p>
              </div>
              <div className="border-t border-gray-400 mt-2 mb-5"></div>
              <div className="px-5 pb-8 pt-3">
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
                  22 Aug 2024
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
                  22 Sep 2024
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
              <div className="border-b border-thin flex justify-between py-3 mx-5">
                <div className="flex gap-2">
                  <MdOutlineCurrencyRupee
                    className="mt-1 text-violet-800"
                    size={20}
                  />
                  <p className="text-gray-500 font-medium text-base">Cost</p>
                </div>
                <p className="font-semibold text-base text-gray-800">
                  ₹ 50,000
                </p>
              </div>
              <div className="flex justify-between py-4 mx-5">
                <p className="text-gray-500 font-medium text-base">
                  Attachment
                </p>
                <p className="font-semibold text-base text-gray-800">
                  <FaRegFileLines size={20} />
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div className="shadow-custom-all-sides rounded-md bg-violet-500 text-white">
                <h2 className="text-xl font-semibold mx-5 py-2">
                  Estimate Time
                </h2>
                <div className="flex justify-between mx-5 my-3 pb-8">
                  <div>
                    <h2 className="text-4xl font-semibold">30 Days</h2>
                    <p className="text-base mx-1 my-1">22 Aug, Friday</p>
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
            <div className="shadow-custom-all-sides rounded-md mt-5">
              <div className="px-5 py-3">
                <h2 className="text-gray-500 font-semibold">Assignee</h2>
                <div className="flex gap-3 py-3">
                  <div>
                    <img
                      src={profile4}
                      className="w-12 h-12 rounded-full"
                      alt="Profile"
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold flex items-center">
                      Vinay Singh{" "}
                      <span className="text-gray-500"> (Owner)</span>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200"></div>
              <div className="px-5 py-3">
                <p className="text-gray-500 font-semibold">Team</p>
                <div className="flex sm:flex-wrap flex-wrap gap-2 my-4">
                  <img
                    src={profile4}
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
                    src={profile1}
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
          </div>
        </div>
        <div>
          <div className="shadow-custom-all-sides rounded-md mx-5">
            <div className="flex mx-5 py-3">
              <h2 className="text-lg font-semibold  text-slate-800">Budget</h2>
            </div>
            <div className="grid md:grid-cols-2 border-t border-gray-300 h-90">
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
                  <h2 className="text-3xl font-semibold mb-2">₹ 0</h2>
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
                  <h2 className="text-3xl font-semibold mb-2">₹ 0</h2>
                  <p className="text-base text-gray-700 ml-2">Remaining</p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <LuPieChart
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
          <div className="overflow-x-auto shadow-custom-all-sides rounded-md my-5 mx-5 pb-5">
            <table className="w-full bg-white border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoryBudget.map((budget) => (
                  <tr
                    key={budget.id}
                    className="hover:bg-gray-200 border-t border-gray-200"
                  >
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {budget.categoryName}
                    </td>
                    <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                      {budget.categoryBudget}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {budget.percent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mx-5 mb-10 ">
            <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b border-gray-300 pb-2">
              Project Task
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
              <div className="shadow-custom-all-sides rounded-md ">
                <div className="flex justify-between px-5 py-5">
                  <p className="text-base text-gray-800 font-semibold">
                    Task Summary
                  </p>
                </div>
                <div className="mb-10">
                  <div className="flex justify-center items-center mb-1">
                    <h2 className="text-5xl font-semibold text-gray-500">10</h2>
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="text-base text-gray-700">Total Task Count</p>
                  </div>
                </div>
              </div>
              <div className="shadow-custom-all-sides rounded-md">
                <div className="px-5 py-5">
                  <p className="text-base text-gray-800 font-semibold">
                    In Progress Task
                  </p>
                </div>
                <div className="mb-10">
                  <div className="flex justify-center items-center mb-1">
                    <h2 className="text-5xl font-semibold text-blue-500">0</h2>
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="text-base text-gray-700">In Progress</p>
                  </div>
                </div>
              </div>
              <div className="shadow-custom-all-sides rounded-md ">
                <div className="flex justify-between px-5 py-5">
                  <p className="text-base text-gray-800 font-semibold">
                    Completed Task
                  </p>
                </div>
                <div className="mb-10">
                  <div className="flex justify-center items-center mb-1">
                    <h2 className="text-5xl font-semibold text-green-500">0</h2>
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="text-base text-gray-700">
                      <span className="text-base text-gray-700 font-bold mx-2">
                        0
                      </span>
                      Today Completed
                    </p>
                  </div>
                </div>
              </div>
              <div className="shadow-custom-all-sides rounded-md ">
                <div className="flex justify-between px-5 py-5">
                  <p className="text-base text-gray-800 font-semibold">
                    Overdue Task
                  </p>
                </div>
                <div className="mb-10">
                  <div className="flex justify-center items-center mb-1">
                    <h2 className="text-5xl font-semibold text-yellow-500">
                      0
                    </h2>
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="text-base text-gray-700">Total OverDue</p>
                  </div>
                </div>
              </div>
              <div className="shadow-custom-all-sides rounded-md ">
                <div className="flex justify-between px-5 py-5">
                  <p className="text-base text-gray-800 font-semibold">
                    In Review Task
                  </p>
                </div>
                <div className="mb-10">
                  <div className="flex justify-center items-center mb-1">
                    <h2 className="text-5xl font-semibold text-violet-500">
                      0
                    </h2>
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="text-base text-gray-700">Total In Review</p>
                  </div>
                </div>
              </div>
              <div className="shadow-custom-all-sides rounded-md">
                <div className="flex justify-between px-5 py-5">
                  <p className="text-base text-gray-800 font-semibold">
                    Re-Open Task
                  </p>
                </div>
                <div className="mb-10">
                  <div className="flex justify-center items-center mb-1">
                    <h2 className="text-5xl font-semibold text-blcak-500">0</h2>
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="text-base text-gray-700">Total Re-Open</p>
                  </div>
                </div>
              </div>
              <div className="shadow-custom-all-sides rounded-md">
                <div className="flex justify-between px-5 py-5">
                  <p className="text-base text-gray-800 font-semibold">
                    Cancel Task
                  </p>
                </div>
                <div className="mb-10">
                  <div className="flex justify-center items-center mb-1">
                    <h2 className="text-5xl font-semibold text-red-500">0</h2>
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="text-base text-gray-700">Total Cancel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto shadow-custom-all-sides rounded-md my-5 mx-5 pb-5 mb-10">
            <table className="w-full bg-white border-gray-200">
              <thead>
                <tr>
                  {/* <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    View
                  </th> */}
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Task Name
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    End Date
                  </th>

                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Assignee
                  </th>
                </tr>
              </thead>
              <tbody>
                {task.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-gray-200 border-t border-gray-200"
                  >
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {task.taskName}
                    </td>
                    <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                      {task.startDate}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {task.endDate}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {task.status}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {task.progress}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {task.assignee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeProjectRejectDetails;
