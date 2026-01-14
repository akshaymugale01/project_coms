import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FaSpinner, FaBullhorn, FaEnvelope, FaUsers, FaChartLine, FaCalendarAlt, FaEye, FaEyeSlash, FaClock } from "react-icons/fa";
import { getCommunicationDashboard } from "../../api";

const CommunicationAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState("comm_types");
  const [chartType, setChartType] = useState("pie");
  const [commData, setCommData] = useState({
    total_notices: 0,
    active_notices: 0,
    inactive_notices: 0,
    today_notices: 0,
    this_week_notices: 0,
    this_month_notices: 0,
    by_type: {},
    by_category: {},
    monthly_trend: {},
    view_stats: { total_views: 0, unique_viewers: 0 },
    recent_notices: [],
  });

  useEffect(() => {
    fetchCommunicationAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCommunicationAnalytics = async (retry = 0) => {
    try {
      setLoading(true);
      const response = await getCommunicationDashboard();
      console.log("Communication Dashboard Data:", response.data);
      
      // Map API response to state
      const apiData = response.data;
      const data = {
        total_notices: apiData.total_notices || 0,
        active_notices: apiData.active_notices || 0,
        inactive_notices: apiData.inactive_notices || 0,
        today_notices: apiData.today_notices || 0,
        this_week_notices: apiData.this_week_notices || 0,
        this_month_notices: apiData.this_month_notices || 0,
        by_type: apiData.by_type || {},
        by_category: apiData.by_category || {},
        monthly_trend: apiData.monthly_trend || {},
        view_stats: apiData.view_stats || { total_views: 0, unique_viewers: 0 },
        recent_notices: apiData.recent_notices || [],
        // Keep legacy fields for backward compatibility
        totalAnnouncements: apiData.total_announcements || apiData.by_type?.announcement || 0,
        totalNotifications: apiData.total_notifications || apiData.by_type?.notification || 0,
        totalMessages: apiData.total_messages || apiData.by_type?.message || 0,
        activeUsers: apiData.unique_viewers || apiData.view_stats?.unique_viewers || 0,
        readUnread: {
          Read: apiData.read_count || apiData.view_stats?.total_views || 0,
          Unread: apiData.unread_count || Math.max(0, (apiData.total_notices || 0) - (apiData.read_count || 0)),
          Archived: apiData.archived_count || apiData.inactive_notices || 0,
        },
        engagementRate: apiData.engagement_rate || {},
        responseTime: apiData.response_time || {},
        byDepartment: apiData.by_department || apiData.by_category || {},
        monthlyTrend: apiData.monthly_trend || {},
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

  // Calculate totals from API data
  const totalCommunications = commData.total_notices || (commData.totalAnnouncements + commData.totalNotifications + commData.totalMessages);
  const readRate = commData.view_stats?.total_views && commData.total_notices
    ? Math.round((commData.view_stats.total_views / commData.total_notices) * 100)
    : (commData.readUnread?.Read || 0) > 0
    ? Math.round((commData.readUnread.Read / (commData.readUnread.Read + commData.readUnread.Unread + commData.readUnread.Archived)) * 100)
    : 0;

  // Dynamic Chart - Communication Types (by_type from API)
  const typeData = Object.entries(commData.by_type || {}).map(([name, value], index) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    y: value,
    color: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"][index % 6],
  }));
  
  const commTypePieChart = {
    chart: {
      type: chartType,
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
        data: typeData.length > 0 ? typeData : [
          { name: "Announcements", y: commData.totalAnnouncements || 0, color: "#3B82F6" },
          { name: "Notifications", y: commData.totalNotifications || 0, color: "#10B981" },
          { name: "Messages", y: commData.totalMessages || 0, color: "#F59E0B" },
        ],
      },
    ],
  };

  // Pie Chart - Active/Inactive Status
  const readStatusPieChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Notice Status Distribution",
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
        name: "Notices",
        colorByPoint: true,
        data: [
          { name: "Active", y: commData.active_notices || 0, color: "#10B981" },
          { name: "Inactive", y: commData.inactive_notices || 0, color: "#EF4444" },
        ],
      },
    ],
  };

  // Donut Chart - Time Period Distribution
  const engagementDonutChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Notices by Time Period",
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
        name: "Notices",
        colorByPoint: true,
        data: [
          { name: "Today", y: commData.today_notices || 0, color: "#10B981" },
          { name: "This Week", y: commData.this_week_notices || 0, color: "#F59E0B" },
          { name: "This Month", y: commData.this_month_notices || 0, color: "#3B82F6" },
        ],
      },
    ],
  };

  // Bar Chart - Category Breakdown (by_category from API)
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
      categories: Object.keys(commData.by_category || commData.byCategory || {}),
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
        data: Object.values(commData.by_category || commData.byCategory || {}),
      },
    ],
  };

  // Bar Chart - By Type (horizontal bar)
  const departmentBarChart = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
    },
    title: {
      text: "Communications by Type",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(commData.by_type || commData.byDepartment || {}),
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
        data: Object.values(commData.by_type || commData.byDepartment || {}),
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
      categories: Object.keys(commData.monthly_trend || commData.monthlyTrend || {}),
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
        data: Object.values(commData.monthly_trend || commData.monthlyTrend || {}),
        color: "#3B82F6",
      },
    ],
  };

  // Column Chart - View Statistics
  const responseTimeChart = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "View Statistics",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: ["Total Views", "Unique Viewers"],
      labels: {
        style: { color: "#fff" },
      },
    },
    yAxis: {
      title: {
        text: "Count",
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
        name: "Views",
        data: [
          commData.view_stats?.total_views || 0,
          commData.view_stats?.unique_viewers || 0,
        ],
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
            <h3 className="text-lg font-medium">Total Notices</h3>
            <FaBullhorn className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{totalCommunications}</p>
          <p className="text-sm opacity-80">All notices sent</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Active Notices</h3>
            <FaEye className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{commData.active_notices || 0}</p>
          <p className="text-sm opacity-80">Currently active</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Inactive Notices</h3>
            <FaEyeSlash className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{commData.inactive_notices || 0}</p>
          <p className="text-sm opacity-80">Archived/Disabled</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Unique Viewers</h3>
            <FaUsers className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{commData.view_stats?.unique_viewers || 0}</p>
          <p className="text-sm opacity-80">Engaged users</p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Today&apos;s Notices</p>
              <p className="text-3xl font-bold my-1">{commData.today_notices || 0}</p>
            </div>
            <FaCalendarAlt className="text-2xl text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">This Week</p>
              <p className="text-3xl font-bold my-1">{commData.this_week_notices || 0}</p>
            </div>
            <FaClock className="text-2xl text-green-400" />
          </div>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">This Month</p>
              <p className="text-3xl font-bold my-1">{commData.this_month_notices || 0}</p>
            </div>
            <FaCalendarAlt className="text-2xl text-orange-400" />
          </div>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Views</p>
              <p className="text-3xl font-bold my-1">{commData.view_stats?.total_views || 0}</p>
            </div>
            <FaEye className="text-2xl text-purple-400" />
          </div>
        </div>
      </div>

      {/* Chart Type Selector and Chart Selection */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          <option value="pie">Pie</option>
          <option value="column">Column</option>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="area">Area</option>
        </select>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedChart("comm_types")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedChart === "comm_types"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            📊 Communication Types
          </button>
          <button
            onClick={() => setSelectedChart("read_status")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedChart === "read_status"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            📧 Active/Inactive
          </button>
          <button
            onClick={() => setSelectedChart("engagement")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedChart === "engagement"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            📈 Time Period
          </button>
          <button
            onClick={() => setSelectedChart("category")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedChart === "category"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            📂 By Category
          </button>
          <button
            onClick={() => setSelectedChart("department")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedChart === "department"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            🏢 By Type
          </button>
          <button
            onClick={() => setSelectedChart("monthly")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedChart === "monthly"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            📅 Monthly Trend
          </button>
        </div>
      </div>

      {/* Selected Chart Display */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-custom-all-sides mb-5">
        {selectedChart === "comm_types" && <HighchartsReact highcharts={Highcharts} options={commTypePieChart} />}
        {selectedChart === "read_status" && <HighchartsReact highcharts={Highcharts} options={readStatusPieChart} />}
        {selectedChart === "engagement" && <HighchartsReact highcharts={Highcharts} options={engagementDonutChart} />}
        {selectedChart === "category" && <HighchartsReact highcharts={Highcharts} options={categoryBarChart} />}
        {selectedChart === "department" && <HighchartsReact highcharts={Highcharts} options={departmentBarChart} />}
        {selectedChart === "monthly" && <HighchartsReact highcharts={Highcharts} options={monthlyTrendChart} />}
      </div>

      {/* Additional Charts Row (Hidden) */}
      <div className="hidden md:grid-cols-3 gap-5">
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
