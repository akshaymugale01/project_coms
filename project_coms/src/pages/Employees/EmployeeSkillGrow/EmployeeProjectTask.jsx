import React, { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Chart from "react-apexcharts";
import EmployeeProjectTaskView from "./EmployeeProjectTaskView";
import EmployeeProjectTaskProgress from "./EmployeeProjectTaskProgress";
import EmployeeProjectTaskCompleted from "./EmployeeProjectTaskCompleted";
import EmployeeProjectTaskOverDue from "./EmployeeProjectTaskOverDue";
import EmployeeProjectTaskReview from "./EmployeeProjectTaskReview";
import EmployeeProjectTaskReOpen from "./EmployeeProjectTaskReOpen";
import EmployeeProjectTaskCancel from "./EmployeeProjectTaskCancel";

function EmployeeProjectTask() {
  const [chartDropDown, setChartDropDown] = useState(null);
  const dropdownRefs = useRef([]);
  const [task, setTask] = useState("TotalTask");

  const handleClickOutside = (event) => {
    if (
      dropdownRefs.current.every((ref) => ref && !ref.contains(event.target))
    ) {
      setChartDropDown(null);
    }
  };
  const handleChartDropDownClick = (index) => {
    setChartDropDown(chartDropDown === index ? null : index);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const options = {
    chart: {
      type: "donut",
      height: 350,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels: ["Completed", "Incomplete"],
    colors: ["#645AFF", "#00C1D4"],
    legend: {
      position: "bottom",
    },
  };

  const series = [75, 25];

  const seriesLineColumn = [
    {
      name: "Closed",
      type: "line",
      data: [20, 32, 28, 50, 38, 35, 49],
    },
    {
      name: "New",
      type: "column",
      data: [12, 18, 20, 32, 19, 25, 30],
    },
  ];

  const optionsLineColumn = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    colors: ["#baa7ff"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    stroke: {
      width: [4, 0],
    },
    markers: {
      size: [0, 0],
      show: false,
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
    },
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    yaxis: {
      tickAmount: 6,
      labels: {
        formatter: function (val) {
          return parseInt(val);
        },
      },
    },
    legend: {
      show: false,
    },
  };

  const DevelopmentOptions = {
    series: [44, 65, 89, 75, 37, 63],
    chart: {
      height: 450,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: -10,
        offsetX: 0,
        dataLabels: {
          name: {
            fontSize: "16px",
            color: "green",
          },
          value: {
            fontSize: "25px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              return 373;
            },
          },
        },
      },
    },

    labels: [
      "Design",
      "Frontend",
      "Prototype",
      "Content",
      "Database",
      "Backend",
    ],
    legend: {
      show: true,
      fontSize: "16px",
      position: "bottom",
    },
    colors: ["#775DD0", "#00E396", "#F59E0B", "#3B82F6", "#9ea3a0", "#0a0101"],
  };

  return (
    <div className="">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 mx-5">
        <div
          className={`shadow-custom-all-sides rounded-md cursor-pointer ${
            task === "TotalTask"
              ? "text-violet-700 border-b border-violet-700"
              : ""
          }`}
          onClick={() => setTask("TotalTask")}
        >
          <div className="flex justify-between px-5 py-5">
            <p className="text-base text-gray-800 font-semibold">
              Task Summary
            </p>
          </div>
          <div className="mb-10">
            <div className="flex justify-center items-center mb-1">
              <h2 className="text-5xl font-semibold text-gray-500">27</h2>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-base text-gray-700">Total Task Count</p>
            </div>
          </div>
        </div>
        <div
          className={`shadow-custom-all-sides rounded-md cursor-pointer ${
            task === "TaskProgress"
              ? "text-violet-700 border-b border-violet-700"
              : ""
          }`}
          onClick={() => setTask("TaskProgress")}
        >
          <div className="flex justify-between px-5 py-5">
            <p className="text-base text-gray-800 font-semibold">In Progress</p>
          </div>
          <div className="mb-10">
            <div className="flex justify-center items-center mb-1">
              <h2 className="text-5xl font-semibold text-blue-500">6</h2>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-base text-gray-700">In Progress</p>
            </div>
          </div>
        </div>
        <div
          className={`shadow-custom-all-sides rounded-md cursor-pointer ${
            task === "TaskCompleted"
              ? "text-violet-700 border-b border-violet-700"
              : ""
          }`}
          onClick={() => setTask("TaskCompleted")}
        >
          <div className="flex justify-between px-5 py-5">
            <p className="text-base text-gray-800 font-semibold">Completed</p>
          </div>
          <div className="mb-10">
            <div className="flex justify-center items-center mb-1">
              <h2 className="text-5xl font-semibold text-green-500">7</h2>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-base text-gray-700">
                <span className="text-base text-gray-700 font-bold">3</span>{" "}
                Today Completed
              </p>
            </div>
          </div>
        </div>
        <div
          className={`shadow-custom-all-sides rounded-md cursor-pointer ${
            task === "TaskOverDue"
              ? "text-violet-700 border-b border-violet-700"
              : ""
          }`}
          onClick={() => setTask("TaskOverDue")}
        >
          <div className="flex justify-between px-5 py-5">
            <p className="text-base text-gray-800 font-semibold">Overdue</p>
          </div>
          <div className="mb-10">
            <div className="flex justify-center items-center mb-1">
              <h2 className="text-5xl font-semibold text-yellow-500">7</h2>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-base text-gray-700">Total OverDue</p>
            </div>
          </div>
        </div>
        <div
          className={`shadow-custom-all-sides rounded-md cursor-pointer ${
            task === "TaskReview"
              ? "text-violet-700 border-b border-violet-700"
              : ""
          }`}
          onClick={() => setTask("TaskReview")}
        >
          <div className="flex justify-between px-5 py-5">
            <p className="text-base text-gray-800 font-semibold">In Review</p>
          </div>
          <div className="mb-10">
            <div className="flex justify-center items-center mb-1">
              <h2 className="text-5xl font-semibold text-violet-500">2</h2>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-base text-gray-700">Total In Review</p>
            </div>
          </div>
        </div>
        <div
          className={`shadow-custom-all-sides rounded-md cursor-pointer ${
            task === "TaskReOpen"
              ? "text-violet-700 border-b border-violet-700"
              : ""
          }`}
          onClick={() => setTask("TaskReOpen")}
        >
          <div className="flex justify-between px-5 py-5">
            <p className="text-base text-gray-800 font-semibold">Re-Open</p>
          </div>
          <div className="mb-10">
            <div className="flex justify-center items-center mb-1">
              <h2 className="text-5xl font-semibold text-blcak-500">2</h2>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-base text-gray-700">Total Re-Open</p>
            </div>
          </div>
        </div>
        <div
          className={`shadow-custom-all-sides rounded-md cursor-pointer ${
            task === "TaskCancel"
              ? "text-violet-700 border-b border-violet-700"
              : ""
          }`}
          onClick={() => setTask("TaskCancel")}
        >
          <div className="flex justify-between px-5 py-5">
            <p className="text-base text-gray-800 font-semibold">Cancel</p>
          </div>
          <div className="mb-10">
            <div className="flex justify-center items-center mb-1">
              <h2 className="text-5xl font-semibold text-red-500">3</h2>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-base text-gray-700">Total Cancel</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1">
        {task === "TotalTask" && (
          <div>
            <EmployeeProjectTaskView />
          </div>
        )}
        {task === "TaskProgress" && (
          <div>
            <EmployeeProjectTaskProgress />
          </div>
        )}
        {task === "TaskCompleted" && (
          <div>
            <EmployeeProjectTaskCompleted/>
          </div>
        )}
        {task === "TaskOverDue" && (
          <div>
            <EmployeeProjectTaskOverDue />
          </div>
        )}
        {task === "TaskReview" && (
          <div>
            <EmployeeProjectTaskReview />
          </div>
        )}
        {task === "TaskReOpen" && (
          <div>
            <EmployeeProjectTaskReOpen />
          </div>
        )}
        {task === "TaskCancel" && (
          <div>
            <EmployeeProjectTaskCancel />
          </div>
        )}
      </div>
      <div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-1 gap-4 mx-5 mb-5">
        <div className="lg:col-span-4 md:col-span-4 col-span-1">
          <div className="shadow-custom-all-sides rounded-md h-auto">
            <div className="flex justify-between px-5 pt-5 pb-6">
              <p className="text-base text-gray-800 font-semibold">
                Task Summary
              </p>
              <button
                className="relative"
                onClick={() => handleChartDropDownClick(1)}
                ref={(el) => (dropdownRefs.current[1] = el)}
              >
                <BsThreeDotsVertical />
                {chartDropDown === 1 && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 text-start">
                    <h2 className="text-base font-semibold py-2 text-gray-800 px-4">
                      Setting
                    </h2>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another Action
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something Else Here
                    </a>
                  </div>
                )}
              </button>
            </div>
            <Chart
              options={optionsLineColumn}
              series={seriesLineColumn}
              type="line"
              height={350}
            />
          </div>
        </div>
        <div className="lg:col-span-2 md:col-span-2">
          <div className="shadow-custom-all-sides rounded-md h-full">
            <div className="flex justify-between px-5 pt-5 pb-6">
              <p className="text-base text-gray-800 font-semibold">
                Task Completion Status
              </p>
              <button
                className="relative"
                onClick={() => handleChartDropDownClick(2)}
                ref={(el) => (dropdownRefs.current[2] = el)}
              >
                <BsThreeDotsVertical />
                {chartDropDown === 2 && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 text-start">
                    <h2 className="text-base font-semibold py-2 text-gray-800 px-4">
                      Setting
                    </h2>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another Action
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something Else Here
                    </a>
                  </div>
                )}
              </button>
            </div>
            <div className="pb-5">
              <Chart
                options={options}
                series={series}
                type="donut"
                height={380}
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 md:col-span-2">
          <div className="shadow-custom-all-sides rounded-md h-full">
            <div className="flex justify-between px-5 pt-5 pb-6">
              <p className="text-base text-gray-800 font-semibold">
                Task Completion Status
              </p>
              <button
                className="relative"
                onClick={() => handleChartDropDownClick(3)}
                ref={(el) => (dropdownRefs.current[3] = el)}
              >
                <BsThreeDotsVertical />
                {chartDropDown === 3 && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 text-start">
                    <h2 className="text-base font-semibold py-2 text-gray-800 px-4">
                      Setting
                    </h2>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another Action
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something Else Here
                    </a>
                  </div>
                )}
              </button>
            </div>
            <div className="pb-5">
              <Chart
                options={DevelopmentOptions}
                series={DevelopmentOptions.series}
                type="radialBar"
                height={380}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProjectTask;
