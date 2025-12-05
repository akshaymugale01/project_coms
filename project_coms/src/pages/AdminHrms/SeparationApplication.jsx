import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import AdminHRMS from "./AdminHrms";

import SeparationTable from "./SeparationTable";
import SeparationDashboard from "./SeparationDashboard";
import SeparationCompleted from "./SeparationCompleted";

const SeparationApplication = () => {
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

  return (
    <div className="flex ml-20">
      <AdminHRMS />
      <div className="flex flex-col w-full p-2 bg-white rounded-lg shadow-lg">
        <SeparationDashboard />

        <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
          <h2
            className={`p-1 ${
              page === "Pending" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("Pending")}
          >
            Pending Request
          </h2>
          <h2
            className={`p-1 ${
              page === "Completed" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Completed")}
          >
            Completed Request
          </h2>
        </div>
        {page === "Pending" && (
          <div>
            <SeparationTable />
          </div>
        )}
        {page === "Completed" && <SeparationCompleted />}
      </div>
    </div>
  );
};

export default SeparationApplication;
