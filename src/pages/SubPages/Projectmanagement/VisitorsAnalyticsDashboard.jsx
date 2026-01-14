import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getVisitorDashboard } from "../../../api";
import { FaSpinner, FaUsers, FaUserCheck, FaUserClock, FaCar, FaTruck, FaCalendarAlt } from "react-icons/fa";

const VisitorsAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState("visitor_type_pie");
  const [chartType, setChartType] = useState("pie");
  const [dashboardData, setDashboardData] = useState({
    total: 0,
    today_in: 0,
    today_out: 0,
    in: 0,
    out: 0,
    expected: 0,
    unexpected: 0,
    staff_total: 0,
    staff_in: 0,
    staff_out: 0,
    vehicles: 0,
    delivery_breakdown: {},
    purpose_breakdown: {},
    hourly_visits: {},
    monthly_visits: {},
    visitor_type_breakdown: {},
    weekly_trend: {},
  });

  useEffect(() => {
    fetchVisitorAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchVisitorAnalytics = async (retry = 0) => {
    try {
      setLoading(true);
      const response = await getVisitorDashboard();
      console.log("Visitor Analytics Data:", response.data);
      
      const apiData = response.data;
      
      // Map API response to dashboard state - use API data when available
      const data = {
        total: apiData.total || 0,
        today_in: apiData.today_in || 0,
        today_out: apiData.today_out || 0,
        in: apiData.in || 0,
        out: apiData.out || 0,
        expected: apiData.expected_v || apiData.expected || 0,
        unexpected: apiData.unexpected_v || apiData.unexpected || 0,
        staff_total: apiData.staff_total || 0,
        staff_in: apiData.staff_in || 0,
        staff_out: apiData.staff_out || 0,
        vehicles: apiData.vehicles || 0,
        // Use API data for breakdowns if available, otherwise fallback to calculated data
        delivery_breakdown: apiData.delivery_breakdown || apiData.delivery_by_platform || {},
        purpose_breakdown: apiData.purpose_breakdown || {
          "Meeting": apiData.meeting_count || 0,
          "Delivery": apiData.delivery_count || 0,
          "Interview": apiData.interview_count || 0,
          "Site Visit": apiData.site_visit_count || 0,
          "Maintenance": apiData.maintenance_count || 0,
          "Other": apiData.other_count || 0,
        },
        hourly_visits: apiData.hourly_visits || apiData.hourly_trend || {},
        monthly_visits: apiData.monthly_visits || apiData.monthly_trend || {},
        visitor_type_breakdown: apiData.visitor_type_breakdown || apiData.by_visitor_type || {},
        weekly_trend: apiData.weekly_trend || {},
      };
      
      setDashboardData(data);
      setLoading(false);
    } catch (error) {
      if (retry < 1) {
        setTimeout(() => {
          console.log("Retrying Visitor Analytics fetch", error);
          fetchVisitorAnalytics(retry + 1);
        }, 100);
      } else {
        console.error("Error fetching visitor analytics:", error);
        setLoading(false);
      }
    }
  };

  // Dynamic Chart - Visitor Type Distribution
  const visitorTypePieChart = {
    chart: {
      type: chartType,
      backgroundColor: "transparent",
    },
    title: {
      text: "Visitor Type Distribution",
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
          style: { color: "#fff" },
        },
      },
    },
    series: [
      {
        name: "Visitors",
        colorByPoint: true,
        data: [
          {
            name: "Expected",
            y: dashboardData.expected || 34,
            color: "#F59E0B",
          },
          {
            name: "Unexpected",
            y: dashboardData.unexpected || 5480,
            color: "#EAB308",
          },
        ],
      },
    ],
  };

  // Pie Chart - Staff Distribution
  const staffPieChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Staff In/Out Distribution",
      style: { color: "#fff", fontSize: "16px" },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
          style: { color: "#fff" },
        },
      },
    },
    series: [
      {
        name: "Staff",
        colorByPoint: true,
        data: [
          {
            name: "Staff In",
            y: dashboardData.staff_in || 0,
            color: "#10B981",
          },
          {
            name: "Staff Out",
            y: dashboardData.staff_out || 0,
            color: "#EF4444",
          },
        ],
      },
    ],
  };

  // Pie Chart - In/Out Distribution
  const inOutPieChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Visitor In/Out Status",
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
          style: { color: "#fff" },
        },
      },
    },
    series: [
      {
        name: "Visitors",
        colorByPoint: true,
        data: [
          {
            name: "Currently In",
            y: dashboardData.in || 0,
            color: "#3B82F6",
          },
          {
            name: "Currently Out",
            y: dashboardData.out || 0,
            color: "#8B5CF6",
          },
        ],
      },
    ],
  };

  // Bar Chart - Delivery Visitors Breakdown
  const deliveryBarChart = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "Delivery Visitors by Platform",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(dashboardData.delivery_breakdown || {}),
      labels: {
        style: { color: "#fff" },
        rotation: -45,
      },
    },
    yAxis: {
      title: {
        text: "Number of Deliveries",
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
      pointFormat: "Deliveries: <b>{point.y}</b>",
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
    colors: [
      "#10B981",
      "#3B82F6",
      "#F59E0B",
      "#EF4444",
      "#8B5CF6",
      "#EC4899",
      "#14B8A6",
      "#F97316",
      "#6366F1",
      "#A855F7",
      "#84CC16",
      "#06B6D4",
      "#F43F5E",
      "#8B5A3C",
      "#059669",
    ],
    series: [
      {
        name: "Deliveries",
        data: Object.values(dashboardData.delivery_breakdown || {}),
      },
    ],
  };

  // Bar Chart - Purpose Breakdown
  const purposeBarChart = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
    },
    title: {
      text: "Visitor Purpose Distribution",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(dashboardData.purpose_breakdown || {}),
      labels: {
        style: { color: "#fff" },
      },
    },
    yAxis: {
      title: {
        text: "Number of Visitors",
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
      pointFormat: "Visitors: <b>{point.y}</b>",
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
        name: "Visitors",
        data: Object.values(dashboardData.purpose_breakdown || {}),
      },
    ],
  };

  // Line Chart - Hourly Visits Trend
  const hourlyLineChart = {
    chart: {
      type: "areaspline",
      backgroundColor: "transparent",
    },
    title: {
      text: "Hourly Visitor Trend (Today)",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(dashboardData.hourly_visits || {}),
      labels: {
        style: { color: "#fff" },
      },
    },
    yAxis: {
      title: {
        text: "Number of Visitors",
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
      pointFormat: "Visitors: <b>{point.y}</b>",
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5,
      },
    },
    series: [
      {
        name: "Visitors",
        data: Object.values(dashboardData.hourly_visits || {}),
        color: "#3B82F6",
      },
    ],
  };

  // Column Chart - Monthly Visits
  const monthlyColumnChart = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "Monthly Visitor Trend (Current Year)",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(dashboardData.monthly_visits || {}),
      labels: {
        style: { color: "#fff" },
      },
    },
    yAxis: {
      title: {
        text: "Number of Visitors",
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
      pointFormat: "Total Visitors: <b>{point.y}</b>",
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
            [0, "#3B82F6"],
            [1, "#1E40AF"],
          ],
        },
      },
    },
    series: [
      {
        name: "Visitors",
        data: Object.values(dashboardData.monthly_visits || {}),
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

  const chartOptions = [
    { id: "visitor_type_pie", label: "Visitor Type", icon: "📊", type: "pie" },
    { id: "in_out_pie", label: "In/Out Status", icon: "🔄", type: "pie" },
    { id: "staff_pie", label: "Staff Distribution", icon: "👥", type: "pie" },
    { id: "delivery_column", label: "Delivery Platforms", icon: "📦", type: "column" },
    { id: "purpose_bar", label: "Visit Purpose", icon: "📝", type: "bar" },
    { id: "hourly_line", label: "Hourly Trend", icon: "📈", type: "line" },
    { id: "monthly_column", label: "Monthly Trend", icon: "📅", type: "column" },
  ];

  const renderSelectedChart = () => {
    switch (selectedChart) {
      case "visitor_type_pie":
        return <HighchartsReact highcharts={Highcharts} options={visitorTypePieChart} />;
      case "in_out_pie":
        return <HighchartsReact highcharts={Highcharts} options={inOutPieChart} />;
      case "staff_pie":
        return <HighchartsReact highcharts={Highcharts} options={staffPieChart} />;
      case "delivery_column":
        return <HighchartsReact highcharts={Highcharts} options={deliveryBarChart} />;
      case "purpose_bar":
        return <HighchartsReact highcharts={Highcharts} options={purposeBarChart} />;
      case "hourly_line":
        return <HighchartsReact highcharts={Highcharts} options={hourlyLineChart} />;
      case "monthly_column":
        return <HighchartsReact highcharts={Highcharts} options={monthlyColumnChart} />;
      default:
        return <HighchartsReact highcharts={Highcharts} options={visitorTypePieChart} />;
    }
  };

  return (
    <div className="space-y-5">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-5 gap-5">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Total Visitors</h3>
            <FaUsers className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{dashboardData.total || 0}</p>
          <p className="text-sm opacity-80">All time visitors</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Total In</h3>
            <FaUserCheck className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{dashboardData.in || 0}</p>
          <p className="text-sm opacity-80">Currently inside</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Total Out</h3>
            <FaUserClock className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{dashboardData.out || 0}</p>
          <p className="text-sm opacity-80">Checked out</p>
        </div>
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Expected</h3>
            <FaUserClock className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{dashboardData.expected || 0}</p>
          <p className="text-sm opacity-80">Pre-registered visitors</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Unexpected</h3>
            <FaUsers className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{dashboardData.unexpected || 0}</p>
          <p className="text-sm opacity-80">Walk-in visitors</p>
        </div>
      </div>

      {/* Chart Type Selector and Chart Selection Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
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
        </div>
        <div className="flex flex-wrap gap-2">
          {chartOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedChart(option.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedChart === option.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Chart Display */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-custom-all-sides">
        {renderSelectedChart()}
      </div>

      {/* Additional Stats Cards */}
      <div className="grid md:grid-cols-6 gap-5">
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white text-center">
          <p className="text-sm opacity-80">Today&apos;s In</p>
          <p className="text-3xl font-bold my-1">{dashboardData.today_in || 0}</p>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white text-center">
          <p className="text-sm opacity-80">Today&apos;s Out</p>
          <p className="text-3xl font-bold my-1">{dashboardData.today_out || 0}</p>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white text-center">
          <p className="text-sm opacity-80">Staff Total</p>
          <p className="text-3xl font-bold my-1">{dashboardData.staff_total || 0}</p>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white text-center">
          <p className="text-sm opacity-80">Staff In</p>
          <p className="text-3xl font-bold my-1">{dashboardData.staff_in || 0}</p>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white text-center">
          <p className="text-sm opacity-80">Staff Out</p>
          <p className="text-3xl font-bold my-1">{dashboardData.staff_out || 0}</p>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white text-center">
          <p className="text-sm opacity-80">Total Vehicles</p>
          <p className="text-3xl font-bold my-1">{dashboardData.vehicles || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default VisitorsAnalyticsDashboard;
