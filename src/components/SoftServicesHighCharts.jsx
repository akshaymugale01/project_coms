import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getServicesTaskList, getSoftServiceDownload} from "../api";
import { useSelector } from "react-redux";
import { CirclesWithBar, DNA, ThreeDots } from "react-loader-spinner";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const SoftServiceHighCharts = () => {
  const [categoryData, setCategoryData] = useState({});
  const [statusData, setStatusData] = useState({});
  const [ticketTypes, setTicketTypes] = useState({});
  const [floorTickets, setFloorTickets] = useState({});
  const [unitTickets, setUnitTickets] = useState({});
  const themeColor = useSelector((state) => state.theme.color);
  useEffect(() => {
    const fetchTicketInfo = async () => {
      try {
        const ticketInfoResp = await getServicesTaskList();
        setStatusData(ticketInfoResp.data.by_status);
        setCategoryData(ticketInfoResp.data.by_building);

        // setTicketTypes(ticketInfoResp.data.by_type);
        setFloorTickets(ticketInfoResp.data.by_floor);
        setUnitTickets(ticketInfoResp.data.by_unit);
      } catch (error) {
        console.log("Error fetching ticket info:", error);
      }
    };

    fetchTicketInfo();
  }, []);

  // download api
  const handleSoftServiceDownload = async () => {
    toast.loading("Downloading Please Wait");
    try {
      const response = await getSoftServiceDownload();
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers["content-type"],
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Soft_Service_file.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Soft Service downloaded successfully");
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      console.error("Error downloading Soft Service:", error);
      toast.error("Something went wrong, please try again");
    }
  };

  const sortData = (data, order = "ascending") => {
    const sortedEntries = Object.entries(data).sort(([, a], [, b]) =>
      order === "ascending" ? b - a : a - b
    );
    return Object.fromEntries(sortedEntries);
  };

  const generatePieChartOptions = (title, data) => {
    const colors = {
      overdue: "#fbc02d", // Yellow
      complete: "#4caf50", // Green
      pending: "#f44336", // Red
    };

    return {
      chart: {
        type: "pie",
        borderRadius: 30,
      },
      title: {
        text: title,
      },
      series: [
        {
          name: title,
          colorByPoint: true,
          data: Object.keys(data).map((key) => ({
            name: key,
            y: data[key],
            color: colors[key] || "#607d8b", // Default to grey if no color is defined
          })),
        },
      ],
    };
  };

  // const generateBarChartOptions = (title, data,order) => {
  //   const sortedData = sortData(data, order);
  //   return {
  //     chart: {
  //       type: "bar",
  //       borderRadius: 30,
  //     },
  //     title: {
  //       text: title,
  //     },
  //     xAxis: {
  //       categories: Object.keys(sortedData),
  //       // categories: Object.keys(data),
  //       title: {
  //         text: null,
  //       },
  //     },
  //     yAxis: {
  //       min: 0,
  //       title: {
  //         text: "Tickets",
  //         // align: "high",
  //       },
  //       labels: {
  //         overflow: "justify",
  //       },
  //     },
  //     series: [
  //       {
  //         name: title,
  //         data: Object.values(sortedData),
  //         color: themeColor,
  //       },
  //     ],
  //   };
  // };

  const generateBarChartOptions = (title, data, order) => {
    const sortedData = sortData(data, order);

    return {
      chart: {
        type: "bar",
        borderRadius: 30,
      },
      title: {
        text: title,
      },
      xAxis: {
        categories: Object.keys(sortedData),
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Services",
        },
        labels: {
          overflow: "justify",
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y; // Display the y value (data value) on the bar
            },
            style: {
              textOutline: false, // Remove text outline (optional)
            },
          },
        },
      },
      series: [
        {
          name: title,
          data: Object.values(sortedData),
          color: themeColor,
        },
      ],
    };
  };

  const generateColumnChartOptions = (title, data, order = "ascending") => {
    const sortedData = sortData(data, order);
    const TicketsType = Object.keys(sortedData);
    const ticketValues = Object.values(sortedData);

    return {
      chart: {
        type: "column",
        borderRadius: 30,
      },
      title: {
        text: title,
      },
      xAxis: {
        categories: TicketsType,
        title: {
          text: "Building",
        },
        labels: {
          rotation: 0, // Ensures the text is straight (no rotation)
          style: {
            fontSize: "11px", // Adjust the font size for better readability
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Services",
        },
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y; // Display the y value (data value) on the bar
            },
            style: {
              textOutline: false, // Remove text outline (optional)
            },
          },
        },
      },
      series: [
        {
          name: "Soft Services by Building",
          data: ticketValues,
          color: themeColor,
        },
      ],
    };
  };
  const generateFloorColumnChartOptions = (
    title,
    data,
    order = "ascending"
  ) => {
    const sortedData = sortData(data, order);
    const floorTickets = Object.keys(sortedData);
    const ticketValues = Object.values(sortedData);

    return {
      chart: {
        type: "column",
        borderRadius: 30,
        // scrollablePlotArea: {
        //   minWidth: 700,
        //   scrollPositionX: 1
        // }
      },
      title: {
        text: title,
      },
      max: 10,
      scrollbar: {
        enabled: true,
      },
      xAxis: {
        categories: floorTickets,
        title: {
          text: "Floors",
        },
        labels: {
          rotation: 0, // Ensures the text is straight (no rotation)
          style: {
            fontSize: "12px", // Adjust the font size for better readability
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Services",
        },
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y; // Display the y value (data value) on the bar
            },
            style: {
              textOutline: false, // Remove text outline (optional)
            },
          },
        },
      },
      series: [
        {
          name: "Soft Services By Floor",
          data: ticketValues,
          color: themeColor,
        },
      ],
    };
  };
  const generateUnitColumnChartOptions = (title, data, order = "ascending") => {
    const sortedData = sortData(data, order); // Sort the data
    const unitTickets = Object.keys(sortedData);
    const ticketValues = Object.values(sortedData);

    return {
      chart: {
        type: "column",
        borderRadius: 30,
        scrollablePlotArea: {
          minWidth: unitTickets.length * 100, // Dynamically adjust scrollable area based on number of units
          scrollPositionX: 0, // Start the scroll from the left
        },
      },
      title: {
        text: title,
      },
      xAxis: {
        categories: unitTickets,
        title: {
          text: "Units",
        },
        scrollbar: {
          enabled: unitTickets.length > 10, // Enable scrollbar if there are more than 10 units
        },
        labels: {
          rotation: 0, // Ensures the text is straight (no rotation)
          style: {
            fontSize: "12px", // Adjust the font size for better readability
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Services",
        },
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y; // Display the y value (data value) on the bar
            },
            style: {
              textOutline: false, // Remove text outline (optional)
            },
          },
        },
      },
      series: [
        {
          name: "Soft Services by Units",
          data: ticketValues,
          color: themeColor,
        },
      ],
    };
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 mr-2  gap-2">
        <div className=" shadow-custom-all-sides rounded-md">
          <div className="flex justify-end p-3">
            <button
              className="rounded-md bg-gray-200 py-1 px-5"
              onClick={handleSoftServiceDownload}
            >
              <FaDownload />
            </button>
          </div>
          {statusData ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generatePieChartOptions(
                "Soft Services by Status",
                statusData
              )}
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <DNA
                visible={true}
                height="120"
                width="120"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          )}
        </div>

        <div className="bg-white shadow-custom-all-sides rounded-md">
          <div className="flex justify-end p-3">
            <button
              className="rounded-md bg-gray-200 py-1 px-5"
              onClick={handleSoftServiceDownload}
            >
              <FaDownload />
            </button>
          </div>
          {categoryData ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateBarChartOptions(
                "Soft Services by Building",
                categoryData
              )}
              order="descending"
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <DNA
                visible={true}
                height="120"
                width="120"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          )}
        </div>

        {/* <div className="bg-white shadow-custom-all-sides rounded-md">
          {ticketTypes ? <HighchartsReact
            highcharts={Highcharts}
            options={generateColumnChartOptions("Tickets by Type", ticketTypes)}
              order="ascending"

          /> : (
            <div className="flex justify-center items-center h-full">
              <DNA
                visible={true}
                height="120"
                width="120"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          )}
        </div> */}
      </div>
      {/* <div className="bg-white shadow-custom-all-sides rounded-md my-2 mr-2">
          {categoryData ? <HighchartsReact
            highcharts={Highcharts}
            options={generateColumnChartOptions("Soft Services by Building", categoryData)}
              order="ascending"

          /> : (
            <div className="flex justify-center items-center h-full">
              <DNA
                visible={true}
                height="120"
                width="120"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          )}
        </div> */}
      <div className="bg-white shadow-custom-all-sides rounded-md my-2 mr-2">
        <div className="flex justify-end p-3">
          <button
            className="rounded-md bg-gray-200 py-1 px-5"
            onClick={handleSoftServiceDownload}
          >
            <FaDownload />
          </button>
        </div>
        {floorTickets ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={generateFloorColumnChartOptions(
              "Soft Services by Floor",
              floorTickets
            )}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <DNA
              visible={true}
              height="120"
              width="120"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
      </div>
      <div className="flex justify-end p-3">
        <button
          className="rounded-md bg-gray-200 py-1 px-5"
          onClick={handleSoftServiceDownload}
        >
          <FaDownload  />
        </button>
      </div>
      <div className="bg-white shadow-custom-all-sides rounded-md my-2 mr-2">
        {unitTickets ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={generateUnitColumnChartOptions(
              "Soft Services by Unit",
              unitTickets
            )}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <DNA
              visible={true}
              height="120"
              width="120"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SoftServiceHighCharts;
