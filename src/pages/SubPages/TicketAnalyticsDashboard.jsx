import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getTicketDashboard } from "../../api";
import { FaSpinner, FaTicketAlt, FaCheckCircle, FaClock, FaExclamationTriangle } from "react-icons/fa";

const TicketAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [ticketData, setTicketData] = useState({
    total: 0,
    by_status: {},
    by_priority: {},
    by_category: {},
    by_department: {},
    monthly_trend: {},
    resolution_time: {},
    user_tickets: 0,
  });

  useEffect(() => {
    fetchTicketAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTicketAnalytics = async (retry = 0) => {
    try {
      setLoading(true);
      const response = await getTicketDashboard();
      console.log("Ticket Analytics Data:", response.data);
      
      // Mock additional data - replace with actual API data when available
      const data = {
        total: response.data.total || 0,
        by_status: response.data.by_status || {},
        by_priority: {
          "High": 45,
          "Medium": 120,
          "Low": 85,
          "Critical": 15,
        },
        by_category: {
          "Hardware": 75,
          "Software": 95,
          "Network": 45,
          "Maintenance": 55,
          "Support": 65,
          "Other": 30,
        },
        by_department: {
          "IT": 120,
          "Facilities": 85,
          "HR": 45,
          "Finance": 35,
          "Operations": 80,
        },
        monthly_trend: {
          "Jan": 42,
          "Feb": 48,
          "Mar": 45,
          "Apr": 52,
          "May": 58,
          "Jun": 51,
          "Jul": 55,
          "Aug": 62,
          "Sep": 59,
          "Oct": 65,
          "Nov": 0,
          "Dec": 0,
        },
        resolution_time: {
          "< 2 hours": 85,
          "2-4 hours": 120,
          "4-8 hours": 95,
          "8-24 hours": 65,
          "> 24 hours": 45,
        },
        user_tickets: response.data.user_tickets || 0,
      };
      
      setTicketData(data);
      setLoading(false);
    } catch (error) {
      if (retry < 1) {
        setTimeout(() => {
          console.log("Retrying Ticket Analytics fetch", error);
          fetchTicketAnalytics(retry + 1);
        }, 100);
      } else {
        console.error("Error fetching ticket analytics:", error);
        setLoading(false);
      }
    }
  };

  // Calculate metrics
  const totalResolved = Object.entries(ticketData.by_status)
    .filter(([key]) => key.toLowerCase().includes('resolved') || key.toLowerCase().includes('closed'))
    .reduce((sum, [, value]) => sum + value, 0);
  
  const totalPending = Object.entries(ticketData.by_status)
    .filter(([key]) => key.toLowerCase().includes('pending') || key.toLowerCase().includes('open'))
    .reduce((sum, [, value]) => sum + value, 0);

  const resolutionRate = ticketData.total > 0 ? Math.round((totalResolved / ticketData.total) * 100) : 0;

  // Pie Chart - Status Distribution
  const statusPieChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Ticket Status Distribution",
      style: { color: "#fff", fontSize: "16px" },
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
          style: { color: "#fff", fontSize: "12px" },
        },
        showInLegend: true,
      },
    },
    legend: {
      itemStyle: { color: "#fff" },
    },
    series: [
      {
        name: "Tickets",
        colorByPoint: true,
        data: Object.entries(ticketData.by_status).map(([key, value], index) => ({
          name: key,
          y: value,
          color: ["#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6"][index % 5],
        })),
      },
    ],
  };

  // Pie Chart - Priority Distribution
  const priorityPieChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Ticket Priority Distribution",
      style: { color: "#fff", fontSize: "16px" },
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
          style: { color: "#fff", fontSize: "12px" },
        },
        showInLegend: true,
      },
    },
    legend: {
      itemStyle: { color: "#fff" },
    },
    series: [
      {
        name: "Priority",
        colorByPoint: true,
        data: [
          { name: "Critical", y: ticketData.by_priority["Critical"] || 0, color: "#DC2626" },
          { name: "High", y: ticketData.by_priority["High"] || 0, color: "#F59E0B" },
          { name: "Medium", y: ticketData.by_priority["Medium"] || 0, color: "#3B82F6" },
          { name: "Low", y: ticketData.by_priority["Low"] || 0, color: "#10B981" },
        ],
      },
    ],
  };

  // Bar Chart - Category Breakdown
  const categoryBarChart = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "Tickets by Category",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(ticketData.by_category),
      labels: {
        style: { color: "#fff" },
        rotation: -45,
      },
    },
    yAxis: {
      title: {
        text: "Number of Tickets",
        style: { color: "#fff" },
      },
      labels: {
        style: { color: "#fff" },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "Tickets: <b>{point.y}</b>",
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          style: { color: "#fff", textOutline: "none" },
        },
        colorByPoint: true,
      },
    },
    colors: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"],
    series: [
      {
        name: "Tickets",
        data: Object.values(ticketData.by_category),
      },
    ],
  };

  // Bar Chart - Department Wise
  const departmentBarChart = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
    },
    title: {
      text: "Tickets by Department",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(ticketData.by_department),
      labels: {
        style: { color: "#fff" },
      },
    },
    yAxis: {
      title: {
        text: "Number of Tickets",
        style: { color: "#fff" },
      },
      labels: {
        style: { color: "#fff" },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "Tickets: <b>{point.y}</b>",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          style: { color: "#fff", textOutline: "none" },
        },
        colorByPoint: true,
      },
    },
    colors: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
    series: [
      {
        name: "Tickets",
        data: Object.values(ticketData.by_department),
      },
    ],
  };

  // Line Chart - Monthly Trend
  const monthlyTrendChart = {
    chart: {
      type: "areaspline",
      backgroundColor: "transparent",
    },
    title: {
      text: "Monthly Ticket Trend",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(ticketData.monthly_trend),
      labels: {
        style: { color: "#fff" },
      },
    },
    yAxis: {
      title: {
        text: "Number of Tickets",
        style: { color: "#fff" },
      },
      labels: {
        style: { color: "#fff" },
      },
    },
    legend: {
      itemStyle: { color: "#fff" },
    },
    tooltip: {
      pointFormat: "Tickets: <b>{point.y}</b>",
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5,
      },
    },
    series: [
      {
        name: "Tickets Created",
        data: Object.values(ticketData.monthly_trend),
        color: "#3B82F6",
      },
    ],
  };

  // Column Chart - Resolution Time
  const resolutionTimeChart = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "Ticket Resolution Time Distribution",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(ticketData.resolution_time),
      labels: {
        style: { color: "#fff" },
      },
    },
    yAxis: {
      title: {
        text: "Number of Tickets",
        style: { color: "#fff" },
      },
      labels: {
        style: { color: "#fff" },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "Tickets: <b>{point.y}</b>",
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          style: { color: "#fff", textOutline: "none" },
        },
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "#10B981"],
            [1, "#059669"],
          ],
        },
      },
    },
    series: [
      {
        name: "Tickets",
        data: Object.values(ticketData.resolution_time),
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-white text-4xl" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Total Tickets</h3>
            <FaTicketAlt className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{ticketData.total}</p>
          <p className="text-sm opacity-80">All tickets in system</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Resolved</h3>
            <FaCheckCircle className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{totalResolved}</p>
          <p className="text-sm opacity-80">Successfully resolved</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Pending</h3>
            <FaClock className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{totalPending}</p>
          <p className="text-sm opacity-80">Awaiting resolution</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Resolution Rate</h3>
            <FaExclamationTriangle className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{resolutionRate}%</p>
          <p className="text-sm opacity-80">Average resolution rate</p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        {Object.entries(ticketData.by_status).slice(0, 4).map(([status, count]) => (
          <div key={status} className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
            <p className="text-sm opacity-80">{status}</p>
            <p className="text-3xl font-bold my-1">{count}</p>
          </div>
        ))}
      </div>

      {/* Pie Charts Row */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={statusPieChart} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={priorityPieChart} />
        </div>
      </div>

      {/* Bar Charts Row */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={categoryBarChart} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={departmentBarChart} />
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
        <HighchartsReact highcharts={Highcharts} options={monthlyTrendChart} />
      </div>

      {/* Resolution Time Chart */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
        <HighchartsReact highcharts={Highcharts} options={resolutionTimeChart} />
      </div>
    </div>
  );
};

export default TicketAnalyticsDashboard;
