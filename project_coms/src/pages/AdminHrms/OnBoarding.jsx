import { React, useEffect, useState } from "react";
import Table from "../../components/table/Table";
import ReportDetailsList from "./ReportDetailsList";

const OnBoarding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeType, setEmployeeType] = useState("all");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleGenerateReport = () => {
    console.log(
      "Generating report with parameters:",
      startDate,
      endDate,
      employeeType
    );
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
    setStartDate("");
    setEndDate("");
    setEmployeeType("all");
  };

  const columns1 = [
    {
      name: "Sr. No",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Report Name",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "view",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button
            onClick={() => openModal()}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Generate
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      Label: "Onboarding Resources Report",
      Location: "1",
      City: "Mumbai",
      State: "Maharashtra",
      Country: "India",
    },
    // Add more data as needed
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="flex gap-3 ml-20">
      <ReportDetailsList />
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 w-96 rounded-lg shadow-lg">
            <span
              className="absolute top-0 right-0 m-4 text-xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="text-lg font-bold mb-4">
              Generate Offboarding Task Report
            </h2>
            <form onSubmit={handleGenerateReport}>
              <div className="mb-4">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select End Date *
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <p className="block text-sm font-medium text-gray-700 mb-1">
                  Which Employees Do You Want to Include in this Report?
                </p>
                <label className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="employeeType"
                    value="all"
                    checked={employeeType === "all"}
                    onChange={() => setEmployeeType("all")}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">All Employees</span>
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="employeeType"
                    value="some"
                    checked={employeeType === "some"}
                    onChange={() => setEmployeeType("some")}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Some Employees</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="employeeType"
                    value="specific"
                    checked={employeeType === "specific"}
                    onChange={() => setEmployeeType("specific")}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Specific Employees</span>
                </label>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg mr-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  Generate Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex justify-between my-5"></div>
        <Table columns={columns1} data={data} isPagination={true} />
      </div>
    </section>
  );
};

export default OnBoarding;
