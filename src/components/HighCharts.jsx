import React, { useEffect, useState } from "react";
import Highcharts from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { getTicketDashboard, getTicketStatusDownload} from "../api";
import { useSelector } from "react-redux";
import { CirclesWithBar, DNA, ThreeDots } from "react-loader-spinner";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";
import HighchartsReact from "highcharts-react-official";

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const TicketHighCharts = () => {
  const [categoryData, setCategoryData] = useState({});
  const [statusData, setStatusData] = useState({});
  const [ticketTypes, setTicketTypes] = useState({});
  const [floorTickets, setFloorTickets] = useState({});
  const [unitTickets, setUnitTickets] = useState({});
  const themeColor = useSelector((state) => state.theme.color);


  useEffect(() => {
    const fetchTicketInfo = async (retry = 0) => {
      try {
        const ticketInfoResp = await getTicketDashboard();
        setStatusData(ticketInfoResp.data.by_status);
        setCategoryData(ticketInfoResp.data.by_category);
        setTicketTypes(ticketInfoResp.data.by_type);
        setFloorTickets(ticketInfoResp.data.by_floor);
        setUnitTickets(ticketInfoResp.data.by_unit);
        // console.log("FullResponse", ticketInfoResp)
      } catch (error) {
        if (retry < 3) {
          setTimeout(() => {
            console.log("Error fetching ticket info:", error);
            fetchTicketInfo(retry + 1);
          }, 100);
          
        }else {
          console.error(
            "Failed to fetch ticket data after 3 attempts, please check your internet connection",
            error
          );
          toast.error("Failed to fetch ticket data, please check your internet connection");
        }
        
      }
    };
    fetchTicketInfo();
  }, []);


  

  // download section 
  const handleTicketStatusDownload = async () => {
    toast.loading("Downloading Please Wait");
    try {
      const response = await getTicketStatusDownload();
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers["content-type"],
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ticket_file.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Ticket downloaded successfully");
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      console.error("Error downloading Ticket:", error);
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
          text: "Tickets",
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
          text: "Ticket Types",
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Tickets",
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
          name: "Tickets",
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
      },
      yAxis: {
        min: 0,
        title: {
          text: "Tickets",
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
          name: "Tickets By Floor",
          data: ticketValues,
          color: themeColor,
        },
      ],
    };
  };
  const generateUnitColumnChartOptions = (title, data, order = "ascending") => {
    const sortedData = sortData(data, order);
    const unitTickets = Object.keys(sortedData);
    const ticketValues = Object.values(sortedData);

    return {
      chart: {
        type: "column",
        borderRadius: 30,
        scrollablePlotArea: {
          minWidth: 700,
          scrollPositionX: 1,
        },
      },
      title: {
        text: title,
      },
      max: 10,
      scrollbar: {
        enabled: true,
      },
      xAxis: {
        categories: unitTickets,
        title: {
          text: " Units",
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Tickets",
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
          name: "Tickets by Units",
          data: ticketValues,
          color: themeColor,
        },
      ],
    };
  };
  HighchartsAccessibility(Highcharts);
  return (
    <div>
      <div className="bg-white grid md:grid-cols-2 mr-2  gap-2">
        <div className=" shadow-custom-all-sides rounded-md">
          <div className="flex justify-end p-3">
          <button
            className="rounded-md bg-gray-200 py-1 px-5"
            onClick={handleTicketStatusDownload}
          >
            <FaDownload />
          </button>
          </div>
          {statusData ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generatePieChartOptions("Tickets by Status", statusData)}
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
            onClick={handleTicketStatusDownload}
          >
            <FaDownload />
          </button>
        </div>
          {categoryData ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateBarChartOptions(
                "Tickets by Category",
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
        <div className="bg-white shadow-custom-all-sides rounded-md">
        <div className="flex justify-end p-3">
          <button
            className="rounded-md bg-gray-200 py-1 px-5"
            onClick={handleTicketStatusDownload}
          >
            <FaDownload />
          </button>
        </div>
          {ticketTypes ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateColumnChartOptions(
                "Tickets by Type",
                ticketTypes
              )}
              order="ascending"
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
            onClick={handleTicketStatusDownload}
          >
            <FaDownload />
          </button>
        </div>
          {floorTickets ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateFloorColumnChartOptions(
                "Tickets by Floor",
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
      </div>
      <div className="bg-white shadow-custom-all-sides rounded-md my-2 mr-2">
      <div className="flex justify-end p-3">
          <button
            className="rounded-md bg-gray-200 py-1 px-5"
            onClick={handleTicketStatusDownload}
          >
            <FaDownload />
          </button>
        </div>
        {unitTickets ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={generateUnitColumnChartOptions(
              "Tickets by Unit",
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

export default TicketHighCharts;
