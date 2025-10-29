import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getVisitorDashboard } from "../../../api";
import { FaSpinner } from "react-icons/fa";

const VisitorsAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
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
      
      // Simulating additional data - replace with actual API data when available
      const data = {
        ...response.data,
        // Mock data for charts - replace with actual API data
        delivery_breakdown: {
          "Swiggy/Swiggy I": 403,
          "Zepto": 245,
          "Zomato": 192,
          "Blinkit": 190,
          "Amazon": 110,
          "D Mart": 39,
          "Flipkart": 26,
          "Jio Mart": 22,
          "Other": 16,
          "Urban Clap": 12,
          "Big Basket": 9,
          "Box8": 8,
          "Domino's": 7,
          "Myntra": 5,
          "Country Delight": 1,
        },
        purpose_breakdown: {
          "Meeting": response.data.meeting_count || 0,
          "Delivery": response.data.delivery_count || 0,
          "Interview": response.data.interview_count || 0,
          "Site Visit": response.data.site_visit_count || 0,
          "Maintenance": response.data.maintenance_count || 0,
          "Other": response.data.other_count || 0,
        },
        hourly_visits: {
          "00:00": 5,
          "03:00": 2,
          "06:00": 15,
          "09:00": 45,
          "12:00": 120,
          "15:00": 95,
          "18:00": 80,
          "21:00": 25,
        },
        monthly_visits: {
          "Jan": 450,
          "Feb": 520,
          "Mar": 480,
          "Apr": 510,
          "May": 550,
          "Jun": 490,
          "Jul": 530,
          "Aug": 560,
          "Sep": 540,
          "Oct": 580,
          "Nov": 0,
          "Dec": 0,
        },
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

  // Pie Chart - Visitor Type Distribution
  const visitorTypePieChart = {
    chart: {
      type: "pie",
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

  return (
    <div className="space-y-5">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <h3 className="text-lg font-medium">Total Visitors</h3>
          <p className="text-4xl font-bold my-2">{dashboardData.total || 5514}</p>
          <p className="text-sm opacity-80">All time visitors</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <h3 className="text-lg font-medium">Today&apos;s In</h3>
          <p className="text-4xl font-bold my-2">{dashboardData.today_in || 0}</p>
          <p className="text-sm opacity-80">Checked in today</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <h3 className="text-lg font-medium">Expected</h3>
          <p className="text-4xl font-bold my-2">{dashboardData.expected || 34}</p>
          <p className="text-sm opacity-80">Pre-registered visitors</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <h3 className="text-lg font-medium">Unexpected</h3>
          <p className="text-4xl font-bold my-2">{dashboardData.unexpected || 5480}</p>
          <p className="text-sm opacity-80">Walk-in visitors</p>
        </div>
      </div>

      {/* Pie Charts Row */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={visitorTypePieChart} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={inOutPieChart} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={staffPieChart} />
        </div>
      </div>

      {/* Delivery Breakdown Bar Chart */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
        <HighchartsReact highcharts={Highcharts} options={deliveryBarChart} />
      </div>

      {/* Purpose and Hourly Charts */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={purposeBarChart} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={hourlyLineChart} />
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
        <HighchartsReact highcharts={Highcharts} options={monthlyColumnChart} />
      </div>

      {/* Additional Stats Cards */}
      <div className="grid md:grid-cols-5 gap-5">
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white text-center">
          <p className="text-sm opacity-80">Total Staff</p>
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
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white text-center">
          <p className="text-sm opacity-80">Total In</p>
          <p className="text-3xl font-bold my-1">{dashboardData.in || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default VisitorsAnalyticsDashboard;
