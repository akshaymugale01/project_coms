import React from "react";
import Navbar from "../../components/Navbar";
import profile5 from "/profile5.jpg";
import react from "/reactImg.png";
import graphic from "/graphic.jpg";
import ReactApexChart from "react-apexcharts";
import { IoBookOutline } from "react-icons/io5";
function InstructorDetails() {
  const instructorCourses = [
    {
      id: 1,
      course: react,
      courseName: "React Basic",
      startDate: "20 Apr, 2024",
      enrolled: "70",
      rating: "3.5",
      review: "30",
      status: "Completed",
    },
    {
      id: 2,
      course: react,
      courseName: "React Native",
      startDate: "2 June, 2024",
      enrolled: "80",
      rating: "3.7",
      review: "40",
      status: "Completed",
    },
    {
      id: 3,
      course: react,
      courseName: "React Advance",
      startDate: "12 July, 2024",
      rating: "3.7",
      review: "37",
      enrolled: "82",
      status: "Live",
    },
    {
      id: 4,
      course: graphic,
      courseName: "Graphic Design",
      startDate: "2 Aug, 2024",
      enrolled: "0",
      rating: "0.0",
      review: "0.0",
      status: "Pending",
    },
  ];

  const getStatus = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-400";
      case "completed":
        return "text-blue-400";
      case "live":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };
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
        "1 Aug",
        "2 Aug",
        "3 Aug",
        "4 Aug",
        "5 Aug",
        "6 Aug",
        "7 Aug",
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
      data: [200, 210, 215, 220, 230, 240, 254],
    },
  ];
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <h2 className="text-2xl font-semibold mx-5 text-gray-600 mt-5">
          Instructor Detail
        </h2>
        <div className="grid grid-cols-3 gap-5 mx-5">
          <div className="col-span-2 mt-5">
            <div className="shadow-custom-all-sides rounded-md">
              <div className="bg-gray-100 py-3">
                <h2 className="text-xl font-semibold text-gray-800 mx-5">
                  Personal Information
                </h2>
              </div>
              <div className="mx-10 my-5">
                <img src={profile5} className="h-20 w-20 rounded-full"></img>
                <div className="grid grid-cols-2 py-5">
                  <div className="flex gap-4">
                    <h2 className="text-lg font-medium text-gray-500">Name</h2>
                    <p className="text-gray-500 text-base mt-1">
                      Radha Panchal
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="text-lg font-medium text-gray-500">
                      Join Date:
                    </h2>
                    <p className="text-gray-500 text-base mt-1">4 Apr, 2024</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="text-lg font-medium text-gray-500">
                      Courses
                    </h2>
                    <p className="text-gray-500 text-base mt-1">4</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="text-lg font-medium text-gray-500">
                      Employees
                    </h2>
                    <p className="text-gray-500 text-base mt-1">254</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="text-lg font-medium text-gray-500">
                      Rating:
                    </h2>
                    <p className="text-gray-500 text-base mt-1">3.9</p>
                  </div>
                  <div className="col-span-2 flex gap-2 my-1">
                    <h2 className="text-lg font-medium text-gray-500 ">
                      Description:
                    </h2>
                    <p className="text-gray-500 text-base mt-1">
                      Experienced Software Engineer and Mentor in Tech
                      Development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 my-5">
            <div className="bg-white p-4 rounded-lg shadow-custom-all-sides">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-700">
                  Employees Enrollment
                </h2>
                <div className="text-green-500 text-sm">
                  0.20% <span className="text-green-500">↑</span> vs last Week
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-4">254</div>
              <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="area"
                height={190}
              />
            </div>
          </div>
        </div>
        <div
          className={`shadow-custom-all-sides rounded-md cursor-pointer h-36 m-2 mx-5`}
        >
          <div className="flex justify-between mx-5 py-3">
            <p className="text-sm font-medium text-gray-600">COURSES</p>
            <IoBookOutline size={20} className="text-violet-500" />
          </div>
          <p className="text-4xl font-semibold text-center">4</p>
          <p className="text-base text-gray-600 text-center">Total Courses</p>
        </div>
        <div className="grid grid-cols-1">
          <div className="mx-5 mb-10 shadow-custom-all-sides rounded-md">
            <h2 className="text-xl font-medium text-gray-600 mx-5 my-5">
              Courses List
            </h2>
            <table className="w-full bg-white border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Enrolled
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Review
                  </th>
                  <th className="px-6 py-5 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {instructorCourses.map((courses) => (
                  <tr
                    key={courses.id}
                    className="hover:bg-gray-200 border-b border-gray-200"
                  >
                    <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                      <div className="flex gap-2">
                        <span>
                          <img
                            src={courses.course}
                            alt={courses}
                            className="h-14 w-24 rounded-md"
                          ></img>
                        </span>
                        <span className="py-1">
                          <p className="text-base font-medium">
                            {courses.courseName}
                          </p>
                          <p className="text-sm">{courses.startDate}</p>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {courses.enrolled}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {courses.rating}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {courses.review}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      <span className={` ${getStatus(courses.status)}`}>
                        {courses.status}
                      </span>
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

export default InstructorDetails;
