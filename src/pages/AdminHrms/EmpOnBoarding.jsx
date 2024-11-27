import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import AdminHRMS from "./AdminHrms";
import OnBoardingTable from "./OnBoardingTable";
import { Link } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import OnBoardingCompleted from "./OnboardingCompleted";

const EmpOnboarding = () => {
  const [page, setPage] = useState("Pending");

  const data = {
    labels: ["Jan24", "Feb24", "Mar24", "Apr24", "May24", "Jun24"],
    datasets: [
      {
        label: "Employee Count",
        data: [1, 0, 1, 2, 2, 4],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const optionss = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Activation Status",
    },
    plotOptions: {
      pie: {
        innerSize: "50%",
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.y}",
        },
      },
    },
    series: [
      {
        name: "Portal Activation",
        data: [
          { name: "Activated", y: 30 },
          { name: "Not Activated", y: 5 },
        ],
      },
    ],
  };

  const columnChart = {
    chart: {
      type: "column",
    },
    title: {
      text: "Employee Count by Month",
    },
    xAxis: {
      categories: ["Jan24", "Feb24", "Mar24", "Apr24", "May24", "Jun24"],
      title: {
        text: "Month",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Employee Count",
      },
    },
    series: [
      {
        name: "Employee Count",
        data: [1, 0, 1, 2, 2, 4],
        color: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex ml-20">
      <AdminHRMS />
      <div className="flex flex-col w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Onboarding</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 md:col-span-1">
            {/* <h3 className="text-lg font-semibold mb-2">New Joinees Trend</h3>
            <Bar data={data} options={options} /> */}
            <HighchartsReact highcharts={Highcharts} options={columnChart} />
          </div>
          <div className="col-span-1 md:col-span-1 flex items-center flex-col ">
            <h3 className="text-lg font-semibold  mb-2">
              Self Onboarding Status
            </h3>
            <div className="flex flex-col items-center justify-end w-full">
              <ul className="">
                <li className="text-yellow-400">Invitation Sent (0)</li>
                <li className="text-yellow-500">Pending Approval (0)</li>
                <li className="text-purple-400">Not Invited (0)</li>
                <li className="text-red-400">Rejected (0)</li>
              </ul>
            </div>
          </div>
          <div className="">
            <HighchartsReact highcharts={Highcharts} options={optionss} />
          </div>
        </div>

        <div className=" w-full my-2 flex  overflow-hidden flex-col">
          <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
            <h2
              className={`p-1 ${
                page === "Pending" &&
                `bg-white font-medium text-blue-500 shadow-custom-all-sides`
              } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              onClick={() => setPage("Pending")}
            >
              Pending New Hires
            </h2>
            <h2
              className={`p-1 ${
                page === "Completed" &&
                "bg-white font-medium text-blue-500 shadow-custom-all-sides"
              } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
              onClick={() => setPage("Completed")}
            >
              Completed New Hires
            </h2>
          </div>
          {page === "Pending" && (
            <div>
              <OnBoardingTable />
            </div>
          )}
          {page === "Completed" && <OnBoardingCompleted />}
        </div>
      </div>
    </div>
  );
};

export default EmpOnboarding;
