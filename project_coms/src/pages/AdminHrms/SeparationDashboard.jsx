// ./src/components/SeparationDashboard.js
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const SeparationDashboard = () => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Separated Employees Count",
    },
    xAxis: {
      categories: ["Aug23", "Sep23", "Oct23", "Nov23", "Dec23", "Jan24"],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Employees",
      },
    },
    series: [
      {
        name: "Leaving Employees",
        data: [0, 0, 2, 0, 0, 2],
      },
    ],
  };
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <div className="p-2">
      <div style={{ background: themeColor }} className="p-2 rounded-md text-white mb-2">
        <div className="text-xl font-bold ">Separation Applications</div>
        <p className="">
          Employees who have requested for separation from the organisation are
          located here.
        </p>
      </div>
      <div className="flex justify-between gap-4">
        <div className="bg-white p-6 w-96 rounded-lg shadow-custom-all-sides z-10">
          <div className="text-center font-bold text-lg">
            Total Separation Requests
          </div>
          <div className="flex flex-col gap-8 justify-around items-center mt-10">
            <div className="text-center">
              <FaExclamationCircle
                className="mx-auto text-orange-500"
                size={32}
              />
              <div className="text-2xl mt-2">0</div>
              <div className="text-lg">Pending Request</div>
            </div>
            <div className="text-center">
              <FaCheckCircle className="mx-auto text-green-500" size={32} />
              <div className="text-2xl mt-2">10</div>
              <div className="text-lg">Approved Request</div>
            </div>
          </div>
        </div>
        <div className="w-1/3 bg-white rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        <div className="p-4 bg-white rounded-lg shadow-custom-all-sides">
          <div className="text-center font-bold text-lg">
            Top Resignation Reasons over last 6 months
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeparationDashboard;
