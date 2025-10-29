import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FaSpinner, FaBullhorn, FaEnvelope, FaUsers, FaChartLine } from "react-icons/fa";

const CommunicationAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [commData, setCommData] = useState({
    totalAnnouncements: 0,
    totalNotifications: 0,
    totalMessages: 0,
    activeUsers: 0,
    byCategory: {},
    byDepartment: {},
    monthlyTrend: {},
    readUnread: {},
  });

  useEffect(() => {
    fetchCommunicationAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCommunicationAnalytics = async (retry = 0) => {
    try {
      setLoading(true);
      
      // Mock data - replace with actual API calls
      const data = {
        totalAnnouncements: 145,
        totalNotifications: 2340,
        totalMessages: 1567,
        activeUsers: 456,
        byCategory: {
          "Emergency": 25,
          "General": 95,
          "Events": 45,
          "Maintenance": 35,
          "HR Updates": 55,
          "Policy": 30,
        },
        byDepartment: {
          "Administration": 120,
          "Facilities": 95,
          "HR": 85,
          "IT": 75,
          "Operations": 110,
          "Security": 65,
        },
        monthlyTrend: {
          "Jan": 180,
          "Feb": 195,
          "Mar": 210,
          "Apr": 225,
          "May": 240,
          "Jun": 220,
          "Jul": 235,
          "Aug": 250,
          "Sep": 245,
          "Oct": 260,
          "Nov": 0,
          "Dec": 0,
        },
        readUnread: {
          "Read": 1850,
          "Unread": 490,
          "Archived": 560,
        },
        engagementRate: {
          "High": 320,
          "Medium": 580,
          "Low": 250,
        },
        responseTime: {
          "< 1 hour": 450,
          "1-4 hours": 680,
          "4-24 hours": 520,
          "> 24 hours": 290,
        },
      };
      
      setCommData(data);
      setLoading(false);
    } catch (error) {
      if (retry < 1) {
        setTimeout(() => {
          console.log("Retrying Communication Analytics fetch", error);
          fetchCommunicationAnalytics(retry + 1);
        }, 100);
      } else {
        console.error("Error fetching communication analytics:", error);
        setLoading(false);
      }
    }
  };

  const totalCommunications = commData.totalAnnouncements + commData.totalNotifications + commData.totalMessages;
  const readRate = (commData.readUnread.Read + commData.readUnread.Archived) > 0
    ? Math.round((commData.readUnread.Read / (commData.readUnread.Read + commData.readUnread.Unread + commData.readUnread.Archived)) * 100)
    : 0;

  // Pie Chart - Communication Types
  const commTypePieChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Communication Types Distribution",
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
        name: "Count",
        colorByPoint: true,
        data: [
          { name: "Announcements", y: commData.totalAnnouncements, color: "#3B82F6" },
          { name: "Notifications", y: commData.totalNotifications, color: "#10B981" },
          { name: "Messages", y: commData.totalMessages, color: "#F59E0B" },
        ],
      },
    ],
  };

  // Pie Chart - Read/Unread Status
  const readStatusPieChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Message Read Status",
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
        name: "Messages",
        colorByPoint: true,
        data: [
          { name: "Read", y: commData.readUnread.Read || 0, color: "#10B981" },
          { name: "Unread", y: commData.readUnread.Unread || 0, color: "#EF4444" },
          { name: "Archived", y: commData.readUnread.Archived || 0, color: "#6B7280" },
        ],
      },
    ],
  };

  // Donut Chart - Engagement Rate
  const engagementDonutChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "User Engagement Rate",
      style: { color: "#fff", fontSize: "16px" },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        innerSize: "60%",
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
        name: "Users",
        colorByPoint: true,
        data: [
          { name: "High Engagement", y: commData.engagementRate?.High || 0, color: "#10B981" },
          { name: "Medium Engagement", y: commData.engagementRate?.Medium || 0, color: "#F59E0B" },
          { name: "Low Engagement", y: commData.engagementRate?.Low || 0, color: "#EF4444" },
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
      text: "Communications by Category",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(commData.byCategory),
      labels: {
        style: { color: "#fff" },
        rotation: -45,
      },
    },
    yAxis: {
      title: {
        text: "Number of Communications",
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
      pointFormat: "Count: <b>{point.y}</b>",
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
    colors: ["#DC2626", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#6B7280"],
    series: [
      {
        name: "Communications",
        data: Object.values(commData.byCategory),
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
      text: "Communications by Department",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(commData.byDepartment),
      labels: {
        style: { color: "#fff" },
      },
    },
    yAxis: {
      title: {
        text: "Number of Communications",
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
      pointFormat: "Count: <b>{point.y}</b>",
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
    colors: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"],
    series: [
      {
        name: "Communications",
        data: Object.values(commData.byDepartment),
      },
    ],
  };

  // Area Chart - Monthly Trend
  const monthlyTrendChart = {
    chart: {
      type: "areaspline",
      backgroundColor: "transparent",
    },
    title: {
      text: "Monthly Communication Trend",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(commData.monthlyTrend),
      labels: {
        style: { color: "#fff" },
      },
    },
    yAxis: {
      title: {
        text: "Number of Communications",
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
      pointFormat: "Communications: <b>{point.y}</b>",
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5,
      },
    },
    series: [
      {
        name: "Total Communications",
        data: Object.values(commData.monthlyTrend),
        color: "#3B82F6",
      },
    ],
  };

  // Column Chart - Response Time
  const responseTimeChart = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "Response Time Distribution",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(commData.responseTime || {}),
      labels: {
        style: { color: "#fff" },
      },
    },
    yAxis: {
      title: {
        text: "Number of Responses",
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
      pointFormat: "Responses: <b>{point.y}</b>",
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
            [0, "#8B5CF6"],
            [1, "#6D28D9"],
          ],
        },
      },
    },
    series: [
      {
        name: "Responses",
        data: Object.values(commData.responseTime || {}),
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
            <h3 className="text-lg font-medium">Total Communications</h3>
            <FaBullhorn className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{totalCommunications}</p>
          <p className="text-sm opacity-80">All communications sent</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Announcements</h3>
            <FaBullhorn className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{commData.totalAnnouncements}</p>
          <p className="text-sm opacity-80">Total announcements</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Notifications</h3>
            <FaEnvelope className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{commData.totalNotifications}</p>
          <p className="text-sm opacity-80">Total notifications</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Active Users</h3>
            <FaUsers className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{commData.activeUsers}</p>
          <p className="text-sm opacity-80">Engaged users</p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Messages</p>
              <p className="text-3xl font-bold my-1">{commData.totalMessages}</p>
            </div>
            <FaEnvelope className="text-2xl text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Read Rate</p>
              <p className="text-3xl font-bold my-1">{readRate}%</p>
            </div>
            <FaChartLine className="text-2xl text-green-400" />
          </div>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Unread</p>
              <p className="text-3xl font-bold my-1">{commData.readUnread.Unread || 0}</p>
            </div>
            <div className="text-2xl text-red-400">📧</div>
          </div>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Archived</p>
              <p className="text-3xl font-bold my-1">{commData.readUnread.Archived || 0}</p>
            </div>
            <div className="text-2xl text-gray-400">📁</div>
          </div>
        </div>
      </div>

      {/* Pie Charts Row */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={commTypePieChart} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={readStatusPieChart} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={engagementDonutChart} />
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

      {/* Response Time Chart */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
        <HighchartsReact highcharts={Highcharts} options={responseTimeChart} />
      </div>
    </div>
  );
};

export default CommunicationAnalyticsDashboard;
