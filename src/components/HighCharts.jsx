import React, { useEffect, useState, useCallback } from "react";
import Highcharts from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { getTicketDashboard, getTicketStatusDownload} from "../api";
import { useSelector } from "react-redux";
import { CirclesWithBar, DNA, ThreeDots } from "react-loader-spinner";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";
import HighchartsReact from "highcharts-react-official";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Exporting from "highcharts/modules/exporting";
import ExportData from "highcharts/modules/export-data";
import OfflineExporting from "highcharts/modules/offline-exporting";

Exporting(Highcharts);
ExportData(Highcharts);
OfflineExporting(Highcharts);

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const TicketHighCharts = () => {
  const [categoryData, setCategoryData] = useState({});
  const [statusData, setStatusData] = useState({});
  const [ticketTypes, setTicketTypes] = useState({});
  const [floorTickets, setFloorTickets] = useState({});
  const [unitTickets, setUnitTickets] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const themeColor = useSelector((state) => state.theme.color);
  
  // Chart type states for each chart
  const [statusChartType, setStatusChartType] = useState('pie');
  const [categoryChartType, setCategoryChartType] = useState('bar');
  const [typeChartType, setTypeChartType] = useState('column');
  const [floorChartType, setFloorChartType] = useState('column');
  const [unitChartType, setUnitChartType] = useState('column');

  // Format date for API call
  const formatDateForAPI = (date) => {
    if (!date) return null;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  // Fetch ticket data with optional date parameters
  const fetchTicketInfo = useCallback(async (startDateParam = null, endDateParam = null, retry = 0) => {
    try {
      setLoading(true);
      
      // Build query parameters
      let queryParams = {};
      if (startDateParam) {
        queryParams.start_date_eq = startDateParam;
      }
      if (endDateParam) {
        queryParams.end_date_eq = endDateParam;
      }

      const ticketInfoResp = await getTicketDashboard(queryParams);
      setStatusData(ticketInfoResp.data.by_status);
      setCategoryData(ticketInfoResp.data.by_category);
      setTicketTypes(ticketInfoResp.data.by_type);
      setFloorTickets(ticketInfoResp.data.by_floor);
      setUnitTickets(ticketInfoResp.data.by_unit);
      setLoading(false);
      // console.log("FullResponse", ticketInfoResp)
    } catch (error) {
      if (retry < 3) {
        setTimeout(() => {
          console.log("Error fetching ticket info:", error);
          fetchTicketInfo(startDateParam, endDateParam, retry + 1);
        }, 100);
        
      }else {
        console.error(
          "Failed to fetch ticket data after 3 attempts, please check your internet connection",
          error
        );
        toast.error("Failed to fetch ticket data, please check your internet connection");
        setLoading(false);
      }
      
    }
  }, []);

  useEffect(() => {
    // Initial fetch without date filters
    fetchTicketInfo();
  }, [fetchTicketInfo]);

  // Handle date filtering
  const handleDateFilter = async () => {
    if (endDate && startDate && endDate < startDate) {
      toast.error("End date cannot be before start date");
      return;
    }
    
    const formattedStartDate = formatDateForAPI(startDate);
    const formattedEndDate = formatDateForAPI(endDate);
    
    await fetchTicketInfo(formattedStartDate, formattedEndDate);
  };

  // Handle date change and auto-filter when both dates are selected
  const handleDateChange = (date, type) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    
    // Auto-filter when both dates are selected
    setTimeout(() => {
      if ((type === 'start' && date && endDate) || (type === 'end' && date && startDate)) {
        const formattedStartDate = formatDateForAPI(type === 'start' ? date : startDate);
        const formattedEndDate = formatDateForAPI(type === 'end' ? date : endDate);
        fetchTicketInfo(formattedStartDate, formattedEndDate);
      }
    }, 100);
  };

  // Clear date filters
  const clearDateFilters = () => {
    setStartDate(null);
    setEndDate(null);
    fetchTicketInfo();
  };


  

  // download section 
 const handleTicketStatusDownload = async (chartId) => {
   toast.loading("Downloading Please Wait");

   try {
     // 1. Download Excel
     const formattedStartDate = formatDateForAPI(startDate);
     const formattedEndDate = formatDateForAPI(endDate);

     const response = await getTicketStatusDownload(
       formattedStartDate,
       formattedEndDate
     );
     const url = window.URL.createObjectURL(
       new Blob([response.data], {
         type: response.headers["content-type"],
       })
     );

     const link = document.createElement("a");
     link.href = url;

     let filename = "ticket_file.xlsx";
     if (formattedStartDate && formattedEndDate) {
       filename = `tickets_${formattedStartDate.replace(
         /\//g,
         "-"
       )}_to_${formattedEndDate.replace(/\//g, "-")}.xlsx`;
     } else if (formattedStartDate) {
       filename = `tickets_from_${formattedStartDate.replace(/\//g, "-")}.xlsx`;
     } else if (formattedEndDate) {
       filename = `tickets_until_${formattedEndDate.replace(/\//g, "-")}.xlsx`;
     }

     link.setAttribute("download", filename);
     document.body.appendChild(link);
     link.click();
     link.remove();

     // 2. Download Chart Image
    //  const chartRef = Highcharts.charts.find(
    //    (chart) => chart?.renderTo?.id === chartId
    //  );
    //  if (chartRef) {
    //    chartRef.exportChartLocal({
    //      type: "image/png",
    //      filename: chartId,
    //    });
    //  }

     toast.success("Download complete");
     toast.dismiss();
   } catch (error) {
     toast.dismiss();
     console.error("Error downloading:", error);
     toast.error("Something went wrong, please try again");
   }
 };

  const sortData = (data, order = "ascending") => {
    const sortedEntries = Object.entries(data).sort(([, a], [, b]) =>
      order === "ascending" ? b - a : a - b
    );
    return Object.fromEntries(sortedEntries);
  };

  // Universal chart generator based on chart type
  const generateChartOptions = (title, data, chartType, order = "ascending") => {
    const sortedData = sortData(data, order);
    const categories = Object.keys(sortedData);
    const values = Object.values(sortedData);

    const baseConfig = {
      chart: {
        type: chartType,
        backgroundColor: "transparent",
        borderRadius: 30,
      },
      title: {
        text: title,
        style: { 
          color: "#fff", 
          fontSize: "16px",
          fontWeight: "600"
        },
      },
      legend: {
        itemStyle: { 
          color: "#fff",
          fontSize: "12px"
        },
      },
      exporting:{
        enabled:true,
        buttons: {
          contextButton: {
            theme: {
              fill: "transparent",
              symbolStroke: "#ffffff",
              states: {
                hover: {
                  fill: "#444"
                }
              }
            }
          }
        }
      },
    };

    // Pie chart specific config
    if (chartType === 'pie') {
      return {
        ...baseConfig,
        tooltip: {
          pointFormat: "{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          style: { color: "#fff" }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.y}",
              style: { 
                color: "#fff", 
                fontSize: "12px",
                textOutline: "none"
              },
            },
            showInLegend: true,
          },
        },
        series: [
          {
            name: title,
            colorByPoint: true,
            data: categories.map((key, index) => ({
              name: key,
              y: values[index],
            })),
          },
        ],
      };
    }

    // Line chart config
    if (chartType === 'line') {
      return {
        ...baseConfig,
        xAxis: {
          categories: categories,
          labels: {
            style: { color: "#fff", fontSize: "11px" },
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "Count",
            style: { color: "#fff", fontSize: "12px" },
          },
          labels: {
            style: { color: "#fff", fontSize: "11px" },
          },
          gridLineColor: "rgba(255, 255, 255, 0.1)",
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          style: { color: "#fff" }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
              style: {
                color: "#fff",
                textOutline: "none",
                fontSize: "11px"
              },
            },
            marker: {
              enabled: true,
              radius: 4
            }
          },
        },
        series: [
          {
            name: title,
            data: values,
            color: themeColor,
          },
        ],
      };
    }

    // Area chart config
    if (chartType === 'area') {
      return {
        ...baseConfig,
        xAxis: {
          categories: categories,
          labels: {
            style: { color: "#fff", fontSize: "11px" },
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "Count",
            style: { color: "#fff", fontSize: "12px" },
          },
          labels: {
            style: { color: "#fff", fontSize: "11px" },
          },
          gridLineColor: "rgba(255, 255, 255, 0.1)",
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          style: { color: "#fff" }
        },
        plotOptions: {
          area: {
            fillOpacity: 0.5,
            dataLabels: {
              enabled: true,
              style: {
                color: "#fff",
                textOutline: "none",
                fontSize: "11px"
              },
            },
            marker: {
              enabled: true,
              radius: 4
            }
          },
        },
        series: [
          {
            name: title,
            data: values,
            color: themeColor,
          },
        ],
      };
    }

    // Bar/Column chart config
    return {
      ...baseConfig,
      xAxis: {
        categories: categories,
        title: {
          text: null,
        },
        labels: {
          style: { color: "#fff", fontSize: "11px" },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Count",
          style: { color: "#fff", fontSize: "12px" },
        },
        labels: {
          style: { color: "#fff", fontSize: "11px" },
        },
        gridLineColor: "rgba(255, 255, 255, 0.1)",
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        style: { color: "#fff" }
      },
      plotOptions: {
        [chartType]: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y;
            },
            style: {
              color: "#fff",
              textOutline: "none",
              fontSize: "11px"
            },
          },
        },
      },
      series: [
        {
          name: title,
          data: values,
          color: themeColor,
        },
      ],
    };
  };

  const generatePieChartOptions = (title, data) => {
    return {
      chart: {
        type: "pie",
        backgroundColor: "transparent",
        borderRadius: 30,
      },
      title: {
        text: title,
        style: { 
          color: "#fff", 
          fontSize: "16px",
          fontWeight: "600"
        },
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.y}",
            style: { 
              color: "#fff", 
              fontSize: "12px",
              textOutline: "none"
            },
          },
          showInLegend: true,
        },
      },
      legend: {
        itemStyle: { 
          color: "#fff",
          fontSize: "12px"
        },
      },
      exporting:{
        enabled:true,
        buttons: {
          contextButton: {
            theme: {
              fill: "transparent",
              states: {
                hover: {
                  fill: "#444"
                }
              }
            }
          }
        }
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
        backgroundColor: "transparent",
        borderRadius: 30,
      },
      title: {
        text: title,
        style: { 
          color: "#fff", 
          fontSize: "16px",
          fontWeight: "600"
        },
      },
      xAxis: {
        categories: Object.keys(sortedData),
        title: {
          text: null,
        },
        labels: {
          style: { 
            color: "#fff",
            fontSize: "11px"
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Tickets",
          style: { 
            color: "#fff",
            fontSize: "12px"
          },
        },
        labels: {
          overflow: "justify",
          style: { 
            color: "#fff",
            fontSize: "11px"
          },
        },
        gridLineColor: "rgba(255, 255, 255, 0.1)",
      },
      legend: {
        itemStyle: { 
          color: "#fff",
          fontSize: "12px"
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y;
            },
            style: {
              color: "#fff",
              textOutline: "none",
              fontSize: "11px"
            },
          },
        },
      },
      exporting:{
        enabled:true,
        buttons: {
          contextButton: {
            theme: {
              fill: "transparent",
              states: {
                hover: {
                  fill: "#444"
                }
              }
            }
          }
        }
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
        backgroundColor: "transparent",
        borderRadius: 30,
      },
      title: {
        text: title,
        style: { 
          color: "#fff", 
          fontSize: "16px",
          fontWeight: "600"
        },
      },
      xAxis: {
        categories: TicketsType,
        title: {
          text: "Ticket Types",
          style: { 
            color: "#fff",
            fontSize: "12px"
          },
        },
        labels: {
          style: { 
            color: "#fff",
            fontSize: "11px"
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Tickets",
          style: { 
            color: "#fff",
            fontSize: "12px"
          },
        },
        labels: {
          style: { 
            color: "#fff",
            fontSize: "11px"
          },
        },
        gridLineColor: "rgba(255, 255, 255, 0.1)",
      },
      legend: {
        itemStyle: { 
          color: "#fff",
          fontSize: "12px"
        },
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y;
            },
            style: {
              color: "#fff",
              textOutline: "none",
              fontSize: "11px"
            },
          },
        },
      },
      exporting:{
        enabled:true,
        buttons: {
          contextButton: {
            theme: {
              fill: "transparent",
              states: {
                hover: {
                  fill: "#444"
                }
              }
            }
          }
        }
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
        backgroundColor: "transparent",
        borderRadius: 30,
      },
      title: {
        text: title,
        style: { 
          color: "#fff", 
          fontSize: "16px",
          fontWeight: "600"
        },
      },
      max: 10,
      scrollbar: {
        enabled: true,
      },
      xAxis: {
        categories: floorTickets,
        title: {
          text: "Floors",
          style: { 
            color: "#fff",
            fontSize: "12px"
          },
        },
        labels: {
          style: { 
            color: "#fff",
            fontSize: "11px"
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Tickets",
          style: { 
            color: "#fff",
            fontSize: "12px"
          },
        },
        labels: {
          style: { 
            color: "#fff",
            fontSize: "11px"
          },
        },
        gridLineColor: "rgba(255, 255, 255, 0.1)",
      },
      legend: {
        itemStyle: { 
          color: "#fff",
          fontSize: "12px"
        },
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y;
            },
            style: {
              color: "#fff",
              textOutline: "none",
              fontSize: "11px"
            },
          },
        },
      },
      exporting:{
        enabled:true,
        buttons: {
          contextButton: {
            theme: {
              fill: "transparent",
              states: {
                hover: {
                  fill: "#444"
                }
              }
            }
          }
        }
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
        backgroundColor: "transparent",
        borderRadius: 30,
        scrollablePlotArea: {
          minWidth: 700,
          scrollPositionX: 1,
        },
      },
      title: {
        text: title,
        style: { 
          color: "#fff", 
          fontSize: "16px",
          fontWeight: "600"
        },
      },
      max: 10,
      scrollbar: {
        enabled: true,
      },
      xAxis: {
        categories: unitTickets,
        title: {
          text: " Units",
          style: { 
            color: "#fff",
            fontSize: "12px"
          },
        },
        labels: {
          style: { 
            color: "#fff",
            fontSize: "11px"
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Tickets",
          style: { 
            color: "#fff",
            fontSize: "12px"
          },
        },
        labels: {
          style: { 
            color: "#fff",
            fontSize: "11px"
          },
        },
        gridLineColor: "rgba(255, 255, 255, 0.1)",
      },
      legend: {
        itemStyle: { 
          color: "#fff",
          fontSize: "12px"
        },
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y;
            },
            style: {
              color: "#fff",
              textOutline: "none",
              fontSize: "11px"
            },
          },
        },
      },
      exporting:{
        enabled:true,
        buttons: {
          contextButton: {
            theme: {
              fill: "transparent",
              states: {
                hover: {
                  fill: "#444"
                }
              }
            }
          }
        }
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
      {/* Date Filter Section */}
      {/* <div className="bg-white shadow-custom-all-sides rounded-md p-4 mr-2 mb-4"> */}
        {/* <div className="flex items-end justify-end gap-4"> */}
          {/* {(startDate || endDate) && (
            // <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            //   <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            //   <span>Filters Active</span>
            // </div>
          )} */}

          <div className="flex flex-wrap items-end gap-3 mb-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-white/100">From:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => handleDateChange(date, "start")}
                placeholderText="Start Date"
                dateFormat="dd/MM/yyyy"
                maxDate={endDate || new Date()}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-white/100">To:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => handleDateChange(date, "end")}
                placeholderText="End Date"
                dateFormat="dd/MM/yyyy"
                minDate={startDate}
                maxDate={new Date()}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleDateFilter}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Filtering..." : "Apply Filter"}
            </button>
            <button
              onClick={clearDateFilters}
              disabled={loading}
              className="px-4 py-2 bg-gray-500 text-white rounded-md text-sm font-medium hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Clear
            </button>
          </div>
        {/* </div> */}
      {/* // </div> */}

      <div className="grid md:grid-cols-2 mr-2 gap-2">
        <div className="bg-gray-800 shadow-custom-all-sides rounded-md">
          <div className="flex justify-between items-center p-3">
            <select
              value={statusChartType}
              onChange={(e) => setStatusChartType(e.target.value)}
              className="bg-gray-700 text-white rounded-md px-3 py-1.5 text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
            >
              <option value="pie">Pie</option>
              <option value="column">Column</option>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="area">Area</option>
            </select>
            <button
              className={`rounded-md py-1 px-5 flex items-center gap-2 text-sm font-medium transition-colors ${
                startDate || endDate
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={() => handleTicketStatusDownload("ticket-status-chart")}
              title={
                startDate || endDate
                  ? "Download filtered data"
                  : "Download all data"
              }
            >
              <FaDownload />
              {startDate || endDate ? "Filtered" : "All"}
            </button>
          </div>
          {statusData && Object.keys(statusData).length > 0 && !loading ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateChartOptions("Tickets by Status", statusData, statusChartType)}
              containerProps={{ id: "ticket-status-chart" }}
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

        <div className="bg-gray-800 shadow-custom-all-sides rounded-md">
          <div className="flex justify-between items-center p-3">
            <select
              value={categoryChartType}
              onChange={(e) => setCategoryChartType(e.target.value)}
              className="bg-gray-700 text-white rounded-md px-3 py-1.5 text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
            >
              <option value="pie">Pie</option>
              <option value="column">Column</option>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="area">Area</option>
            </select>
            <button
              className={`rounded-md py-1 px-5 flex items-center gap-2 text-sm font-medium transition-colors ${
                startDate || endDate
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={() =>
                handleTicketStatusDownload("ticket-category-chart")
              }
              title={
                startDate || endDate
                  ? "Download filtered data"
                  : "Download all data"
              }
            >
              <FaDownload />
              {startDate || endDate ? "Filtered" : "All"}
            </button>
          </div>
          {categoryData && Object.keys(categoryData).length > 0 && !loading ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateChartOptions(
                "Tickets by Category",
                categoryData,
                categoryChartType,
                "descending"
              )}
              containerProps={{ id: "ticket-category-chart" }}
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
        <div className="bg-gray-800 shadow-custom-all-sides rounded-md">
          <div className="flex justify-between items-center p-3">
            <select
              value={typeChartType}
              onChange={(e) => setTypeChartType(e.target.value)}
              className="bg-gray-700 text-white rounded-md px-3 py-1.5 text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
            >
              <option value="pie">Pie</option>
              <option value="column">Column</option>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="area">Area</option>
            </select>
            <button
              className={`rounded-md py-1 px-5 flex items-center gap-2 text-sm font-medium transition-colors ${
                startDate || endDate
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={() => handleTicketStatusDownload("ticket-type-chart")}
              title={
                startDate || endDate
                  ? "Download filtered data"
                  : "Download all data"
              }
            >
              <FaDownload />
              {startDate || endDate ? "Filtered" : "All"}
            </button>
          </div>
          {ticketTypes && Object.keys(ticketTypes).length > 0 && !loading ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateChartOptions(
                "Tickets by Type",
                ticketTypes,
                typeChartType,
                "ascending"
              )}
              containerProps={{ id: "ticket-type-chart" }}
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
        <div className="bg-gray-800 shadow-custom-all-sides rounded-md">
          <div className="flex justify-between items-center p-3">
            <select
              value={floorChartType}
              onChange={(e) => setFloorChartType(e.target.value)}
              className="bg-gray-700 text-white rounded-md px-3 py-1.5 text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
            >
              <option value="pie">Pie</option>
              <option value="column">Column</option>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="area">Area</option>
            </select>
            <button
              className={`rounded-md py-1 px-5 flex items-center gap-2 text-sm font-medium transition-colors ${
                startDate || endDate
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={() => handleTicketStatusDownload("ticket-floor-chart")}
              title={
                startDate || endDate
                  ? "Download filtered data"
                  : "Download all data"
              }
            >
              <FaDownload />
              {startDate || endDate ? "Filtered" : "All"}
            </button>
          </div>
          {floorTickets && Object.keys(floorTickets).length > 0 && !loading ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateChartOptions(
                "Tickets by Floor",
                floorTickets,
                floorChartType
              )}
              containerProps={{ id: "ticket-floor-chart" }}
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
      <div className="bg-gray-800 shadow-custom-all-sides rounded-md my-2 mr-2">
        <div className="flex justify-between items-center p-3">
          <select
            value={unitChartType}
            onChange={(e) => setUnitChartType(e.target.value)}
            className="bg-gray-700 text-white rounded-md px-3 py-1.5 text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
          >
            <option value="pie">Pie</option>
            <option value="column">Column</option>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="area">Area</option>
          </select>
          <button
            className={`rounded-md py-1 px-5 flex items-center gap-2 text-sm font-medium transition-colors ${
              startDate || endDate
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
            onClick={() => handleTicketStatusDownload("ticket-unit-chart")}
            title={
              startDate || endDate
                ? "Download filtered data"
                : "Download all data"
            }
          >
            <FaDownload />
            {startDate || endDate ? "Filtered" : "All"}
          </button>
        </div>
        {unitTickets && Object.keys(unitTickets).length > 0 && !loading ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={generateChartOptions(
              "Tickets by Unit",
              unitTickets,
              unitChartType
            )}
            containerProps={{ id: "ticket-unit-chart" }}
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
