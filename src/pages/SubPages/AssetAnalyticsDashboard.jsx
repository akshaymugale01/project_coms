import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  getBreakCount,
  getInUseAssetBreakDown,
  getTotalAssetCount,
  getPPMOverDueCount,
  getPPMpendingCount,
  getPPMCompleteCount,
  getRoutineScheduledCount,
  getRoutineOverdueCount,
  getRoutineCompleteCount,
  getPPMScheduleCount,
  getRoutinePendingCount,
} from "../../api";
import { FaSpinner, FaCube, FaCheckCircle, FaTools, FaExclamationCircle } from "react-icons/fa";

const AssetAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [assetData, setAssetData] = useState({
    totalAssets: 0,
    inUse: 0,
    breakdown: 0,
    ppmScheduled: 0,
    ppmOverdue: 0,
    ppmPending: 0,
    ppmComplete: 0,
    routineScheduled: 0,
    routineOverdue: 0,
    routineComplete: 0,
    routinePending: 0,
  });

  useEffect(() => {
    fetchAssetAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAssetAnalytics = async () => {
    try {
      setLoading(true);
      const [
        totalCount,
        inUseCount,
        breakdownCount,
        ppmSchedule,
        ppmOverdue,
        ppmPending,
        ppmComplete,
        routineSchedule,
        routineOverdue,
        routineComplete,
        routinePending,
      ] = await Promise.all([
        getTotalAssetCount(),
        getInUseAssetBreakDown(),
        getBreakCount(),
        getPPMScheduleCount(),
        getPPMOverDueCount(),
        getPPMpendingCount(),
        getPPMCompleteCount(),
        getRoutineScheduledCount(),
        getRoutineOverdueCount(),
        getRoutineCompleteCount(),
        getRoutinePendingCount(),
      ]);

      setAssetData({
        totalAssets: totalCount.data.total_asset_count || 0,
        inUse: inUseCount.data.in_use_breakdown_count || 0,
        breakdown: breakdownCount.data.breakdown_count || 0,
        ppmScheduled: ppmSchedule.data.ppm_schedule_count || 0,
        ppmOverdue: ppmOverdue.data.ppm_overdue_count || 0,
        ppmPending: ppmPending.data.ppm_pending_count || 0,
        ppmComplete: ppmComplete.data.ppm_complete_count || 0,
        routineScheduled: routineSchedule.data.routine_scheduled_count || 0,
        routineOverdue: routineOverdue.data.routine_overdue_count || 0,
        routineComplete: routineComplete.data.routine_complete_count || 0,
        routinePending: routinePending.data.routine_pending_count || 0,
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching asset analytics:", error);
      setLoading(false);
    }
  };

  // Calculate metrics
  const totalPPM = assetData.ppmScheduled + assetData.ppmOverdue + assetData.ppmPending + assetData.ppmComplete;
  const totalRoutine = assetData.routineScheduled + assetData.routineOverdue + assetData.routineComplete + assetData.routinePending;
  const assetHealthRate = assetData.totalAssets > 0 
    ? Math.round((assetData.inUse / assetData.totalAssets) * 100) 
    : 0;

  // Pie Chart - Asset Status
  const assetStatusPieChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Asset Status Distribution",
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
        name: "Assets",
        colorByPoint: true,
        data: [
          { name: "In Use", y: assetData.inUse, color: "#10B981" },
          { name: "Breakdown", y: assetData.breakdown, color: "#EF4444" },
        ],
      },
    ],
  };

  // Pie Chart - PPM Status
  const ppmStatusPieChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "PPM Status Distribution",
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
        name: "PPM",
        colorByPoint: true,
        data: [
          { name: "Complete", y: assetData.ppmComplete, color: "#10B981" },
          { name: "Scheduled", y: assetData.ppmScheduled, color: "#3B82F6" },
          { name: "Pending", y: assetData.ppmPending, color: "#F59E0B" },
          { name: "Overdue", y: assetData.ppmOverdue, color: "#EF4444" },
        ],
      },
    ],
  };

  // Pie Chart - Routine Task Status
  const routineStatusPieChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Routine Task Status Distribution",
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
        name: "Routine",
        colorByPoint: true,
        data: [
          { name: "Complete", y: assetData.routineComplete, color: "#10B981" },
          { name: "Scheduled", y: assetData.routineScheduled, color: "#3B82F6" },
          { name: "Pending", y: assetData.routinePending, color: "#F59E0B" },
          { name: "Overdue", y: assetData.routineOverdue, color: "#EF4444" },
        ],
      },
    ],
  };

  // Bar Chart - PPM vs Routine Comparison
  const comparisonBarChart = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "PPM vs Routine Task Comparison",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: ["Complete", "Scheduled", "Pending", "Overdue"],
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
      itemStyle: { color: "#fff" },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}</b>",
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          style: { color: "#fff", textOutline: "none" },
        },
      },
    },
    series: [
      {
        name: "PPM",
        data: [assetData.ppmComplete, assetData.ppmScheduled, assetData.ppmPending, assetData.ppmOverdue],
        color: "#3B82F6",
      },
      {
        name: "Routine",
        data: [assetData.routineComplete, assetData.routineScheduled, assetData.routinePending, assetData.routineOverdue],
        color: "#10B981",
      },
    ],
  };

  // Stacked Bar Chart - Maintenance Status
  const stackedMaintenanceChart = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
    },
    title: {
      text: "Maintenance Task Status Overview",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: ["PPM Tasks", "Routine Tasks"],
      labels: {
        style: { color: "#fff" },
      },
    },
    yAxis: {
      title: {
        text: "Number of Tasks",
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
          enabled: true,
          style: { color: "#fff", textOutline: "none" },
        },
      },
    },
    series: [
      {
        name: "Complete",
        data: [assetData.ppmComplete, assetData.routineComplete],
        color: "#10B981",
      },
      {
        name: "Scheduled",
        data: [assetData.ppmScheduled, assetData.routineScheduled],
        color: "#3B82F6",
      },
      {
        name: "Pending",
        data: [assetData.ppmPending, assetData.routinePending],
        color: "#F59E0B",
      },
      {
        name: "Overdue",
        data: [assetData.ppmOverdue, assetData.routineOverdue],
        color: "#EF4444",
      },
    ],
  };

  // Donut Chart - Total Tasks Overview
  const totalTasksDonutChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Total Maintenance Tasks Overview",
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
        name: "Tasks",
        colorByPoint: true,
        data: [
          { name: "PPM Tasks", y: totalPPM, color: "#3B82F6" },
          { name: "Routine Tasks", y: totalRoutine, color: "#10B981" },
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
            <h3 className="text-lg font-medium">Total Assets</h3>
            <FaCube className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{assetData.totalAssets}</p>
          <p className="text-sm opacity-80">All assets in system</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">In Use</h3>
            <FaCheckCircle className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{assetData.inUse}</p>
          <p className="text-sm opacity-80">Operational assets</p>
        </div>
        <div className="bg-gradient-to-br from-red-600 to-red-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Breakdown</h3>
            <FaExclamationCircle className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{assetData.breakdown}</p>
          <p className="text-sm opacity-80">Non-operational</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 shadow-custom-all-sides border py-4 px-5 rounded-md flex flex-col text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Health Rate</h3>
            <FaTools className="text-3xl opacity-80" />
          </div>
          <p className="text-4xl font-bold my-2">{assetHealthRate}%</p>
          <p className="text-sm opacity-80">Asset health status</p>
        </div>
      </div>

      {/* PPM & Routine Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <p className="text-sm opacity-80">Total PPM</p>
          <p className="text-3xl font-bold my-1">{totalPPM}</p>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <p className="text-sm opacity-80">PPM Complete</p>
          <p className="text-3xl font-bold my-1">{assetData.ppmComplete}</p>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <p className="text-sm opacity-80">Total Routine</p>
          <p className="text-3xl font-bold my-1">{totalRoutine}</p>
        </div>
        <div className="bg-gray-700 shadow-custom-all-sides border py-3 px-4 rounded-md text-white">
          <p className="text-sm opacity-80">Routine Complete</p>
          <p className="text-3xl font-bold my-1">{assetData.routineComplete}</p>
        </div>
      </div>

      {/* Pie Charts Row */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={assetStatusPieChart} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={ppmStatusPieChart} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={routineStatusPieChart} />
        </div>
      </div>

      {/* Comparison Charts */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={comparisonBarChart} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
          <HighchartsReact highcharts={Highcharts} options={totalTasksDonutChart} />
        </div>
      </div>

      {/* Stacked Maintenance Chart */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-custom-all-sides">
        <HighchartsReact highcharts={Highcharts} options={stackedMaintenanceChart} />
      </div>
    </div>
  );
};

export default AssetAnalyticsDashboard;
