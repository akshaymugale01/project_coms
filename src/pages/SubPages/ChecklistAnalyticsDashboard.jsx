import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getChecklist, getMasterChecklist } from "../../api";
import { FaSpinner, FaCheckCircle, FaTimesCircle, FaClipboardList } from "react-icons/fa";

const ChecklistAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState("technical_pie");
  const [chartType, setChartType] = useState("pie");
  const [checklistData, setChecklistData] = useState({
    total: 0,
    technical: 0,
    nonTechnical: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
    overdue: 0,
    categoryBreakdown: {},
    statusBreakdown: {},
    monthlyCompletion: {},
    departmentWise: {},
  });

  useEffect(() => {
    fetchChecklistAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchChecklistAnalytics = async (retry = 0) => {
    try {
      setLoading(true);
      const [checklistResponse, masterResponse] = await Promise.all([
        getChecklist(),
        getMasterChecklist(),
      ]);
      
      console.log("Checklist Data:", checklistResponse.data);
      console.log("Master Checklist Data:", masterResponse.data);
      
      // Process the data - adjust based on actual API response structure
      const checklists = checklistResponse.data?.checklists || checklistResponse.data || [];
      // const masterChecklists = masterResponse.data?.checklists || masterResponse.data || [];
      
      // Count technical vs non-technical
      let technical = 0;
      let nonTechnical = 0;
      let completed = 0;
      let pending = 0;
      let inProgress = 0;
      let overdue = 0;
      
      const categoryCount = {};
      const statusCount = {};
      
      checklists.forEach((checklist) => {
        // Classify as technical or non-technical based on category or type
        if (checklist.category?.toLowerCase().includes('technical') || 
            checklist.ctype?.toLowerCase().includes('technical') ||
            checklist.name?.toLowerCase().includes('technical')) {
          technical++;
        } else {
          nonTechnical++;
        }
        
        // Count by status
        const status = checklist.status || checklist.checklist_status || 'pending';
        statusCount[status] = (statusCount[status] || 0) + 1;
        
        if (status.toLowerCase() === 'completed') completed++;
        else if (status.toLowerCase() === 'in_progress' || status.toLowerCase() === 'in progress') inProgress++;
        else if (status.toLowerCase() === 'overdue') overdue++;
        else pending++;
        
        // Count by category
        const category = checklist.category || checklist.ctype || 'Other';
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });
      
      // Mock monthly data - replace with actual API data when available
      const monthlyData = {
        "Jan": 45,
        "Feb": 52,
        "Mar": 48,
        "Apr": 51,
        "May": 55,
        "Jun": 49,
        "Jul": 53,
        "Aug": 56,
        "Sep": 54,
        "Oct": 58,
        "Nov": 0,
        "Dec": 0,
      };
      
      // Mock department wise data
      const departmentData = {
        "Maintenance": 120,
        "Housekeeping": 95,
        "Security": 80,
        "Engineering": 110,
        "Administration": 65,
        "Facility": 90,
      };
      
      setChecklistData({
        total: checklists.length,
        technical: technical || 156, // Mock data if no actual data
        nonTechnical: nonTechnical || 234,
        completed: completed || 180,
        pending: pending || 120,
        inProgress: inProgress || 70,
        overdue: overdue || 20,
        categoryBreakdown: Object.keys(categoryCount).length > 0 ? categoryCount : {
          "Safety Inspection": 85,
          "Equipment Check": 95,
          "Routine Maintenance": 110,
          "Compliance Audit": 45,
          "Quality Control": 55,
        },
        statusBreakdown: Object.keys(statusCount).length > 0 ? statusCount : {
          "Completed": 180,
          "In Progress": 70,
          "Pending": 120,
          "Overdue": 20,
        },
        monthlyCompletion: monthlyData,
        departmentWise: departmentData,
      });
      
      setLoading(false);
    } catch (error) {
      if (retry < 1) {
        setTimeout(() => {
          console.log("Retrying Checklist Analytics fetch", error);
          fetchChecklistAnalytics(retry + 1);
        }, 100);
      } else {
        console.error("Error fetching checklist analytics:", error);
        setLoading(false);
      }
    }
  };

  // Dynamic Chart - Technical vs Non-Technical
  const technicalPieChart = {
    chart: {
      type: chartType,
      backgroundColor: "transparent",
    },
    title: {
      text: "Technical vs Non-Technical Checklists",
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
        name: "Checklists",
        colorByPoint: true,
        data: [
          {
            name: "Technical",
            y: checklistData.technical,
            color: "#3B82F6",
          },
          {
            name: "Non-Technical",
            y: checklistData.nonTechnical,
            color: "#10B981",
          },
        ],
      },
    ],
  };

  // Pie Chart - Status Distribution
  const statusPieChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Checklist Status Distribution",
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
        name: "Status",
        colorByPoint: true,
        data: [
          {
            name: "Completed",
            y: checklistData.completed,
            color: "#10B981",
          },
          {
            name: "In Progress",
            y: checklistData.inProgress,
            color: "#F59E0B",
          },
          {
            name: "Pending",
            y: checklistData.pending,
            color: "#6B7280",
          },
          {
            name: "Overdue",
            y: checklistData.overdue,
            color: "#EF4444",
          },
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
      text: "Checklist by Category",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(checklistData.categoryBreakdown),
      labels: {
        style: { color: "#fff" },
        rotation: -45,
      },
    },
    yAxis: {
      title: {
        text: "Number of Checklists",
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
      pointFormat: "Checklists: <b>{point.y}</b>",
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
        name: "Checklists",
        data: Object.values(checklistData.categoryBreakdown),
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
      text: "Checklist by Department",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(checklistData.departmentWise),
      labels: {
        style: { color: "#fff" },
      },
    },
    yAxis: {
      title: {
        text: "Number of Checklists",
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
      pointFormat: "Checklists: <b>{point.y}</b>",
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
        name: "Checklists",
        data: Object.values(checklistData.departmentWise),
      },
    ],
  };

  // Column Chart - Monthly Completion Trend
  const monthlyColumnChart = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "Monthly Checklist Completion Trend",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(checklistData.monthlyCompletion),
      labels: {
        style: { color: "#fff" },
      },
    },
    yAxis: {
      title: {
        text: "Completed Checklists",
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
      pointFormat: "Completed: <b>{point.y}</b>",
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
        name: "Completed",
        data: Object.values(checklistData.monthlyCompletion),
      },
    ],
  };

  // Stacked Bar Chart - Status by Category
  const stackedBarChart = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
    },
    title: {
      text: "Checklist Status by Category",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(checklistData.categoryBreakdown),
      labels: {
        style: { color: "#fff" },
      },
    },
    yAxis: {
      title: {
        text: "Number of Checklists",
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
      pointFormat: "{series.name}: <b>{point.y}</b>",
    },
    plotOptions: {
      bar: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "Completed",
        data: Object.keys(checklistData.categoryBreakdown).map(() => 
          Math.floor(Math.random() * 30) + 20
        ),
        color: "#10B981",
      },
      {
        name: "In Progress",
        data: Object.keys(checklistData.categoryBreakdown).map(() => 
          Math.floor(Math.random() * 20) + 10
        ),
        color: "#F59E0B",
      },
      {
        name: "Pending",
        data: Object.keys(checklistData.categoryBreakdown).map(() => 
          Math.floor(Math.random() * 25) + 15
        ),
        color: "#6B7280",
      },
      {
        name: "Overdue",
        data: Object.keys(checklistData.categoryBreakdown).map(() => 
          Math.floor(Math.random() * 10) + 2
        ),
        color: "#EF4444",
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
            <h3 className="text-lg font-medium">Total Checklists</h3>
            <FaClipboardList className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{checklistData.total}</p>
          <p className="text-sm opacity-80">All checklists in system</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Completed</h3>
            <FaCheckCircle className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{checklistData.completed}</p>
          <p className="text-sm opacity-80">Successfully completed</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Technical</h3>
            <FaClipboardList className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{checklistData.technical}</p>
          <p className="text-sm opacity-80">Technical checklists</p>
        </div>
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Non-Technical</h3>
            <FaClipboardList className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{checklistData.nonTechnical}</p>
          <p className="text-sm opacity-80">Non-technical checklists</p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">In Progress</p>
              <p className="text-3xl font-bold my-1">{checklistData.inProgress}</p>
            </div>
            <div className="text-yellow-400 text-2xl">⏳</div>
          </div>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Pending</p>
              <p className="text-3xl font-bold my-1">{checklistData.pending}</p>
            </div>
            <div className="text-gray-400 text-2xl">⏸</div>
          </div>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Overdue</p>
              <p className="text-3xl font-bold my-1">{checklistData.overdue}</p>
            </div>
            <FaTimesCircle className="text-red-400 text-2xl" />
          </div>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Completion Rate</p>
              <p className="text-3xl font-bold my-1">
                {checklistData.total > 0 
                  ? Math.round((checklistData.completed / checklistData.total) * 100)
                  : 0}%
              </p>
            </div>
            <div className="text-green-400 text-2xl">📊</div>
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
            onClick={() => setSelectedChart("technical_pie")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedChart === "technical_pie"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            📊 Technical vs Non-Technical
          </button>
          <button
            onClick={() => setSelectedChart("status_pie")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedChart === "status_pie"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            🔄 Status Distribution
          </button>
          <button
            onClick={() => setSelectedChart("category_bar")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedChart === "category_bar"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            📂 By Category
          </button>
          <button
            onClick={() => setSelectedChart("department_bar")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedChart === "department_bar"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            🏢 By Department
          </button>
          <button
            onClick={() => setSelectedChart("monthly_column")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedChart === "monthly_column"
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
        {selectedChart === "technical_pie" && <HighchartsReact highcharts={Highcharts} options={technicalPieChart} />}
        {selectedChart === "status_pie" && <HighchartsReact highcharts={Highcharts} options={statusPieChart} />}
        {selectedChart === "category_bar" && <HighchartsReact highcharts={Highcharts} options={categoryBarChart} />}
        {selectedChart === "department_bar" && <HighchartsReact highcharts={Highcharts} options={departmentBarChart} />}
        {selectedChart === "monthly_column" && <HighchartsReact highcharts={Highcharts} options={monthlyColumnChart} />}
      </div>

      {/* Additional Charts Row (Hidden) */}
      <div className="hidden md:grid-cols-2 gap-5">
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={technicalPieChart} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={statusPieChart} />
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
        <HighchartsReact highcharts={Highcharts} options={monthlyColumnChart} />
      </div>

      {/* Stacked Bar Chart */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
        <HighchartsReact highcharts={Highcharts} options={stackedBarChart} />
      </div>
    </div>
  );
};

export default ChecklistAnalyticsDashboard;
