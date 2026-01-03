import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  getAccountingInvoices,
  getAccountingPayments,
  getJournalEntries,
  getLedgers,
  getAccountGroups,
} from "../../api/accountingApi";
import { FaSpinner } from "react-icons/fa";

const AccountingAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState("monthly_revenue");
  const [dashboardData, setDashboardData] = useState({
    invoices: [],
    payments: [],
    journalEntries: [],
    ledgers: [],
    accountGroups: [],
  });

  useEffect(() => {
    fetchAccountingAnalytics();
  }, []);

  const fetchAccountingAnalytics = async (retry = 0) => {
    try {
      setLoading(true);
      const [invoicesRes, paymentsRes, journalRes, ledgersRes, groupsRes] =
        await Promise.all([
          getAccountingInvoices(),
          getAccountingPayments(),
          getJournalEntries(),
          getLedgers(),
          getAccountGroups(),
        ]);

      const data = {
        invoices: invoicesRes.data.data || invoicesRes.data || [],
        payments: paymentsRes.data.data || paymentsRes.data || [],
        journalEntries: journalRes.data.data || journalRes.data || [],
        ledgers: ledgersRes.data.data || ledgersRes.data || [],
        accountGroups: groupsRes.data.data || groupsRes.data || [],
      };

      setDashboardData(data);
      setLoading(false);
    } catch (error) {
      if (retry < 1) {
        setTimeout(() => {
          console.log("Retrying Accounting Analytics fetch", error);
          fetchAccountingAnalytics(retry + 1);
        }, 100);
      } else {
        console.error("Error fetching accounting analytics:", error);
        setLoading(false);
      }
    }
  };

  // Calculate monthly revenue from payments
  const getMonthlyRevenue = () => {
    const monthlyData = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    months.forEach((month) => {
      monthlyData[month] = 0;
    });

    dashboardData.payments.forEach((payment) => {
      const date = new Date(payment.payment_date);
      const month = months[date.getMonth()];
      monthlyData[month] += parseFloat(payment.amount || 0);
    });

    return monthlyData;
  };

  // Calculate invoice status breakdown
  const getInvoiceStatusBreakdown = () => {
    const statusCount = {
      draft: 0,
      sent: 0,
      paid: 0,
      overdue: 0,
      cancelled: 0,
    };

    dashboardData.invoices.forEach((invoice) => {
      const status = invoice.status?.toLowerCase() || "draft";
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    return statusCount;
  };

  // Calculate payment method breakdown
  const getPaymentMethodBreakdown = () => {
    const methodCount = {};

    dashboardData.payments.forEach((payment) => {
      const method = payment.payment_method || "Unknown";
      methodCount[method] = (methodCount[method] || 0) + parseFloat(payment.amount || 0);
    });

    return methodCount;
  };

  // Calculate account group balance distribution
  const getAccountGroupDistribution = () => {
    const groupBalance = {};

    dashboardData.ledgers.forEach((ledger) => {
      const groupName = ledger.account_group_name || "Uncategorized";
      const balance = parseFloat(ledger.current_balance || 0);
      groupBalance[groupName] = (groupBalance[groupName] || 0) + balance;
    });

    return groupBalance;
  };

  const monthlyRevenue = getMonthlyRevenue();
  const invoiceStatus = getInvoiceStatusBreakdown();
  const paymentMethods = getPaymentMethodBreakdown();
  const accountGroups = getAccountGroupDistribution();

  // Monthly Revenue Line Chart
  const monthlyRevenueChart = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
    },
    title: {
      text: "Monthly Revenue Trend",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(monthlyRevenue),
      labels: { style: { color: "#9CA3AF" } },
    },
    yAxis: {
      title: {
        text: "Revenue (₹)",
        style: { color: "#9CA3AF" },
      },
      labels: { style: { color: "#9CA3AF" } },
      gridLineColor: "#374151",
    },
    tooltip: {
      pointFormat: "Revenue: <b>₹{point.y:.2f}</b>",
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false,
        },
        enableMouseTracking: true,
      },
    },
    series: [
      {
        name: "Revenue",
        data: Object.values(monthlyRevenue),
        color: "#10B981",
      },
    ],
    legend: {
      itemStyle: { color: "#9CA3AF" },
    },
  };

  // Invoice Status Pie Chart
  const invoiceStatusPieChart = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Invoice Status Distribution",
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
        name: "Invoices",
        colorByPoint: true,
        data: [
          { name: "Draft", y: invoiceStatus.draft, color: "#6B7280" },
          { name: "Sent", y: invoiceStatus.sent, color: "#3B82F6" },
          { name: "Paid", y: invoiceStatus.paid, color: "#10B981" },
          { name: "Overdue", y: invoiceStatus.overdue, color: "#EF4444" },
          { name: "Cancelled", y: invoiceStatus.cancelled, color: "#F59E0B" },
        ],
      },
    ],
  };

  // Payment Method Column Chart
  const paymentMethodChart = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "Payment Methods Distribution",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(paymentMethods).map((method) =>
        method.replace("_", " ").toUpperCase()
      ),
      labels: { style: { color: "#9CA3AF" } },
    },
    yAxis: {
      title: {
        text: "Amount (₹)",
        style: { color: "#9CA3AF" },
      },
      labels: { style: { color: "#9CA3AF" } },
      gridLineColor: "#374151",
    },
    tooltip: {
      pointFormat: "Amount: <b>₹{point.y:.2f}</b>",
    },
    series: [
      {
        name: "Payment Amount",
        data: Object.values(paymentMethods),
        color: "#8B5CF6",
      },
    ],
    legend: {
      itemStyle: { color: "#9CA3AF" },
    },
  };

  // Account Group Balance Bar Chart
  const accountGroupChart = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
    },
    title: {
      text: "Account Group Balance Distribution",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(accountGroups),
      labels: { style: { color: "#9CA3AF" } },
    },
    yAxis: {
      title: {
        text: "Balance (₹)",
        style: { color: "#9CA3AF" },
      },
      labels: { style: { color: "#9CA3AF" } },
      gridLineColor: "#374151",
    },
    tooltip: {
      pointFormat: "Balance: <b>₹{point.y:.2f}</b>",
    },
    series: [
      {
        name: "Balance",
        data: Object.values(accountGroups),
        color: "#F59E0B",
      },
    ],
    legend: {
      itemStyle: { color: "#9CA3AF" },
    },
  };

  // Invoice vs Payment Comparison Chart
  const invoiceVsPaymentChart = {
    chart: {
      type: "area",
      backgroundColor: "transparent",
    },
    title: {
      text: "Invoices vs Payments Trend",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(monthlyRevenue),
      labels: { style: { color: "#9CA3AF" } },
    },
    yAxis: {
      title: {
        text: "Amount (₹)",
        style: { color: "#9CA3AF" },
      },
      labels: { style: { color: "#9CA3AF" } },
      gridLineColor: "#374151",
    },
    tooltip: {
      shared: true,
      pointFormat: "<b>{series.name}: ₹{point.y:.2f}</b><br/>",
    },
    plotOptions: {
      area: {
        fillOpacity: 0.3,
      },
    },
    series: [
      {
        name: "Payments Received",
        data: Object.values(monthlyRevenue),
        color: "#10B981",
      },
      {
        name: "Invoices Issued",
        data: Object.keys(monthlyRevenue).map((month) => {
          return dashboardData.invoices
            .filter((inv) => {
              const invMonth = new Date(inv.invoice_date).toLocaleString("default", {
                month: "short",
              });
              return invMonth === month;
            })
            .reduce((sum, inv) => sum + parseFloat(inv.total_amount || 0), 0);
        }),
        color: "#3B82F6",
      },
    ],
    legend: {
      itemStyle: { color: "#9CA3AF" },
    },
  };

  // Top 5 Customers by Invoice Value
  const topCustomersChart = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "Top 5 Customers by Invoice Value",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: (() => {
        const customerTotals = {};
        dashboardData.invoices.forEach((invoice) => {
          const customer = invoice.customer_name || "Unknown";
          customerTotals[customer] =
            (customerTotals[customer] || 0) + parseFloat(invoice.total_amount || 0);
        });
        return Object.entries(customerTotals)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map((entry) => entry[0]);
      })(),
      labels: { style: { color: "#9CA3AF" } },
    },
    yAxis: {
      title: {
        text: "Total Invoice Amount (₹)",
        style: { color: "#9CA3AF" },
      },
      labels: { style: { color: "#9CA3AF" } },
      gridLineColor: "#374151",
    },
    tooltip: {
      pointFormat: "Amount: <b>₹{point.y:.2f}</b>",
    },
    series: [
      {
        name: "Invoice Total",
        data: (() => {
          const customerTotals = {};
          dashboardData.invoices.forEach((invoice) => {
            const customer = invoice.customer_name || "Unknown";
            customerTotals[customer] =
              (customerTotals[customer] || 0) + parseFloat(invoice.total_amount || 0);
          });
          return Object.entries(customerTotals)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map((entry) => entry[1]);
        })(),
        color: "#EC4899",
      },
    ],
    legend: {
      itemStyle: { color: "#9CA3AF" },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-white text-4xl" />
      </div>
    );
  }

  const chartOptions = [
    { id: "monthly_revenue", label: "Monthly Revenue", icon: "📈" },
    { id: "invoice_status", label: "Invoice Status", icon: "📊" },
    { id: "payment_methods", label: "Payment Methods", icon: "💳" },
    { id: "account_groups", label: "Account Groups", icon: "📂" },
    { id: "invoice_vs_payment", label: "Invoices vs Payments", icon: "📉" },
    { id: "top_customers", label: "Top Customers", icon: "👥" },
  ];

  const renderSelectedChart = () => {
    switch (selectedChart) {
      case "monthly_revenue":
        return <HighchartsReact highcharts={Highcharts} options={monthlyRevenueChart} />;
      case "invoice_status":
        return <HighchartsReact highcharts={Highcharts} options={invoiceStatusPieChart} />;
      case "payment_methods":
        return <HighchartsReact highcharts={Highcharts} options={paymentMethodChart} />;
      case "account_groups":
        return <HighchartsReact highcharts={Highcharts} options={accountGroupChart} />;
      case "invoice_vs_payment":
        return <HighchartsReact highcharts={Highcharts} options={invoiceVsPaymentChart} />;
      case "top_customers":
        return <HighchartsReact highcharts={Highcharts} options={topCustomersChart} />;
      default:
        return <HighchartsReact highcharts={Highcharts} options={monthlyRevenueChart} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Chart Selection Buttons */}
      <div className="flex flex-wrap gap-2">
        {chartOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedChart(option.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ₹{
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

      {/* Selected Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {renderSelectedChart()}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Total Invoices</p>
          <p className="text-2xl font-bold text-white">{dashboardData.invoices.length}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Total Payments</p>
          <p className="text-2xl font-bold text-white">{dashboardData.payments.length}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Journal Entries</p>
          <p className="text-2xl font-bold text-white">{dashboardData.journalEntries.length}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Active Ledgers</p>
          <p className="text-2xl font-bold text-white">{dashboardData.ledgers.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountingAnalyticsDashboard;
