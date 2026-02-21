import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  getAccountingAnalytics,
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
    invoiceStatusRows: [],
    paymentModesRows: [],
    paymentModesAmountRows: [],
    topCustomersRows: [],
  });
  const [dashboardMeta, setDashboardMeta] = useState({
    monthlyRevenue: null,
    monthlyExpenses: null,
    monthlyInvoices: null,
    totals: {},
  });
  const currentYear = new Date().getFullYear();
  const [dateRange, setDateRange] = useState({
    startDate: `${currentYear}-01-01`,
    endDate: `${currentYear}-12-31`,
  });

  useEffect(() => {
    fetchAccountingAnalytics(dateRange);
  }, []);

  const fetchAccountingAnalytics = async (range, retry = 0) => {
    try {
      setLoading(true);
      const toArray = (value) => (Array.isArray(value) ? value : []);
      const num = (...values) => {
        for (const value of values) {
          const parsed = Number(value);
          if (Number.isFinite(parsed)) return parsed;
        }
        return 0;
      };
      const normalizeMonthLabel = (rawLabel) => {
        const label = String(rawLabel || "").trim();
        if (!label) return null;
        if (/^\d+$/.test(label)) {
          const monthNumber = Number(label);
          if (monthNumber >= 1 && monthNumber <= 12) return monthLabels[monthNumber - 1];
        }
        const shortLabel = label.slice(0, 3).toLowerCase();
        return monthLabels.find((month) => month.toLowerCase() === shortLabel) || null;
      };
      const buildEmptyMonthSeries = () => {
        const result = {};
        monthLabels.forEach((month) => {
          result[month] = 0;
        });
        return result;
      };
      const normalizeMonthlySeries = (series, preferredKeys = []) => {
        if (!series) return null;
        const normalized = buildEmptyMonthSeries();

        if (Array.isArray(series)) {
          series.forEach((row) => {
            const month = normalizeMonthLabel(
              row?.month_name || row?.month || row?.label || row?.name || row?.key,
            );
            if (month) {
              normalized[month] += num(
                ...preferredKeys.map((key) => row?.[key]),
                row?.amount,
                row?.value,
                row?.total,
                0,
              );
            }
          });
          return normalized;
        }

        if (typeof series === "object") {
          Object.entries(series).forEach(([rawMonth, rawValue]) => {
            const month = normalizeMonthLabel(rawMonth);
            const value =
              typeof rawValue === "object" && rawValue !== null
                ? num(
                    ...preferredKeys.map((key) => rawValue?.[key]),
                    rawValue.amount,
                    rawValue.value,
                    rawValue.total,
                    0,
                  )
                : num(rawValue, 0);
            if (month) normalized[month] += value;
          });
          return normalized;
        }

        return null;
      };

      const response = await getAccountingAnalytics({
        start_date: range?.startDate,
        end_date: range?.endDate,
      });
      const payload = response?.data?.data || response?.data || {};
      const payloadObj = Array.isArray(payload) ? {} : payload;
      const analyticsRaw = payloadObj.analytics || payloadObj;
      const analytics = Array.isArray(analyticsRaw) ? {} : analyticsRaw;
      const trendRows = toArray(
        Array.isArray(payload)
          ? payload
          : analytics.monthly_trend ||
              analytics.monthlyTrend ||
              analytics.monthly_data ||
              analytics.monthlyData ||
              payloadObj.monthly_data ||
              payloadObj.monthlyData ||
              payloadObj.monthly_trend ||
              payloadObj.monthlyTrend,
      );
      const summary =
        payloadObj.summary ||
        analytics.summary ||
        payloadObj.totals ||
        analytics.totals ||
        payloadObj.stats ||
        analytics.stats ||
        {};

      const invoices = toArray(analytics.invoices || payloadObj.invoices);
      const payments = toArray(analytics.payments || payloadObj.payments);
      const journalEntries = toArray(
        analytics.journal_entries ||
          analytics.recent_journal_entries ||
          payloadObj.journal_entries ||
          payloadObj.recent_journal_entries,
      );
      const ledgers = toArray(analytics.ledgers || payloadObj.ledgers);
      const accountGroups = toArray(
        analytics.account_groups || analytics.accountGroups || payloadObj.account_groups || payloadObj.accountGroups,
      );
      const invoiceStatusRows = toArray(analytics.invoice_status || payloadObj.invoice_status);
      const paymentModesRows = toArray(analytics.payment_modes || payloadObj.payment_modes);
      const paymentModesAmountRows = toArray(
        analytics.payment_modes_amount || payloadObj.payment_modes_amount,
      );
      const topCustomersRows = toArray(analytics.top_customers || payloadObj.top_customers);

      setDashboardData({
        invoices,
        payments,
        journalEntries,
        ledgers,
        accountGroups,
        invoiceStatusRows,
        paymentModesRows,
        paymentModesAmountRows,
        topCustomersRows,
      });
      setDashboardMeta({
        monthlyRevenue: normalizeMonthlySeries(
          analytics.monthly_revenue ||
            analytics.monthlyRevenue ||
            analytics.monthly_trend ||
            analytics.monthlyTrend ||
            payloadObj.monthly_revenue ||
            payloadObj.monthlyRevenue ||
            trendRows,
          ["revenue", "income", "collected"],
        ),
        monthlyExpenses: normalizeMonthlySeries(
          analytics.monthly_expenses ||
            analytics.monthlyExpenses ||
            analytics.expense_trend ||
            analytics.expenseTrend ||
            analytics.monthly_trend ||
            analytics.monthlyTrend ||
            payloadObj.monthly_expenses ||
            payloadObj.monthlyExpenses ||
            trendRows,
          ["expense", "expenses"],
        ),
        monthlyInvoices: normalizeMonthlySeries(
          analytics.monthly_invoices ||
            analytics.monthlyInvoices ||
            payloadObj.monthly_invoices ||
            payloadObj.monthlyInvoices ||
            trendRows,
          ["invoice", "invoiced", "invoices", "amount", "value", "total"],
        ),
        totals: {
          totalInvoices: num(
            summary.total_invoices,
            analytics.total_invoices,
            payloadObj.total_invoices,
            invoiceStatusRows.reduce((sum, row) => sum + num(row?.count, 0), 0),
          ),
          totalPayments: num(
            summary.total_payments,
            analytics.total_payments,
            payloadObj.total_payments,
            paymentModesRows.reduce((sum, row) => sum + num(row?.count, 0), 0),
          ),
          totalExpenses: num(summary.total_expenses, analytics.total_expenses, payloadObj.total_expenses),
          totalRevenue: num(
            summary.total_revenue,
            analytics.total_revenue,
            payloadObj.total_revenue,
          ),
          totalJournalEntries: num(
            summary.journal_entries,
            analytics.total_journal_entries,
            payloadObj.total_journal_entries,
          ),
          totalLedgers: num(
            summary.active_ledgers,
            analytics.total_ledgers,
            payloadObj.total_ledgers,
            accountGroups.length,
          ),
        },
      });
      setLoading(false);
    } catch (error) {
      if (retry < 1) {
        setTimeout(() => {
          console.log("Retrying Accounting Analytics fetch", error);
          fetchAccountingAnalytics(range, retry + 1);
        }, 100);
      } else {
        console.error("Error fetching accounting analytics:", error);
        setLoading(false);
      }
    }
  };

  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const isExpenseEntry = (entry) => {
    const entryType = (entry?.entry_type || "").toString().toLowerCase();
    return entryType.includes("expense") || Boolean(entry?.expense_month) || Boolean(entry?.expense_year);
  };

  // Calculate monthly revenue from payments
  const getMonthlyRevenue = () => {
    if (dashboardMeta.monthlyRevenue) return dashboardMeta.monthlyRevenue;

    const monthlyData = {};
    monthLabels.forEach((month) => {
      monthlyData[month] = 0;
    });

    dashboardData.payments.forEach((payment) => {
      const date = new Date(payment.payment_date);
      const month = monthLabels[date.getMonth()];
      monthlyData[month] += parseFloat(payment.amount || 0);
    });

    return monthlyData;
  };

  // Calculate monthly expenses from journal entries
  const getMonthlyExpenses = () => {
    if (dashboardMeta.monthlyExpenses) return dashboardMeta.monthlyExpenses;

    const monthlyData = {};
    monthLabels.forEach((month) => {
      monthlyData[month] = 0;
    });

    dashboardData.journalEntries
      .filter((entry) => entry.status !== "cancelled")
      .filter(isExpenseEntry)
      .forEach((entry) => {
        const expenseMonthValue = entry?.expense_month;
        const monthIndex =
          typeof expenseMonthValue === "number"
            ? expenseMonthValue - 1
            : monthLabels.findIndex(
                (label) =>
                  label.toLowerCase() === String(expenseMonthValue || "").slice(0, 3).toLowerCase(),
              );

        const fallbackDate = entry?.entry_date ? new Date(entry.entry_date) : null;
        const resolvedMonthIndex =
          monthIndex >= 0 && monthIndex < 12
            ? monthIndex
            : fallbackDate && !Number.isNaN(fallbackDate.getTime())
              ? fallbackDate.getMonth()
              : -1;

        if (resolvedMonthIndex >= 0) {
          const month = monthLabels[resolvedMonthIndex];
          monthlyData[month] += parseFloat(
            entry.total_amount ??
              entry.total_debit ??
              entry.amount ??
              0,
          );
        }
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

    if (dashboardData.invoiceStatusRows.length) {
      dashboardData.invoiceStatusRows.forEach((row) => {
        const status = String(row?.status || "draft").toLowerCase();
        statusCount[status] = (statusCount[status] || 0) + Number(row?.count || 0);
      });
      return statusCount;
    }

    dashboardData.invoices.forEach((invoice) => {
      const status = invoice.status?.toLowerCase() || "draft";
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    return statusCount;
  };

  // Calculate payment method breakdown
  const getPaymentMethodBreakdown = () => {
    const methodCount = {};

    if (dashboardData.paymentModesAmountRows.length) {
      dashboardData.paymentModesAmountRows.forEach((row) => {
        const method = row?.mode || "Unknown";
        methodCount[method] = (methodCount[method] || 0) + parseFloat(row?.amount || 0);
      });
      return methodCount;
    }

    dashboardData.payments.forEach((payment) => {
      const method = payment.payment_method || "Unknown";
      methodCount[method] = (methodCount[method] || 0) + parseFloat(payment.amount || 0);
    });

    return methodCount;
  };

  // Calculate account group balance distribution
  const getAccountGroupDistribution = () => {
    const groupBalance = {};

    if (dashboardData.accountGroups.length) {
      dashboardData.accountGroups.forEach((group) => {
        const groupName = group.name || group.account_group_name || "Uncategorized";
        const balance = parseFloat(group.balance || group.current_balance || 0);
        groupBalance[groupName] = (groupBalance[groupName] || 0) + balance;
      });
      return groupBalance;
    }

    dashboardData.ledgers.forEach((ledger) => {
      const groupName = ledger.account_group_name || "Uncategorized";
      const balance = parseFloat(ledger.current_balance || 0);
      groupBalance[groupName] = (groupBalance[groupName] || 0) + balance;
    });

    return groupBalance;
  };

  const monthlyRevenue = getMonthlyRevenue();
  const monthlyExpenses = getMonthlyExpenses();
  const monthlyInvoices =
    dashboardMeta.monthlyInvoices ||
    Object.keys(monthlyRevenue).reduce((acc, month) => {
      acc[month] = dashboardData.invoices
        .filter((inv) => {
          const invMonth = new Date(inv.invoice_date).toLocaleString("default", {
            month: "short",
          });
          return invMonth === month;
        })
        .reduce((sum, inv) => sum + parseFloat(inv.total_amount || 0), 0);
      return acc;
    }, {});
  const invoiceStatus = getInvoiceStatusBreakdown();
  const paymentMethods = getPaymentMethodBreakdown();
  const accountGroups = getAccountGroupDistribution();
  const totalExpenses =
    dashboardMeta.totals?.totalExpenses ||
    Object.values(monthlyExpenses).reduce((sum, value) => sum + value, 0);
  const totalInvoices = dashboardMeta.totals?.totalInvoices || dashboardData.invoices.length;
  const totalPayments = dashboardMeta.totals?.totalPayments || dashboardData.payments.length;
  const totalJournalEntries =
    dashboardMeta.totals?.totalJournalEntries || dashboardData.journalEntries.length;
  const totalLedgers = dashboardMeta.totals?.totalLedgers || dashboardData.ledgers.length;
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };
  const applyDateFilter = () => {
    if (!dateRange.startDate || !dateRange.endDate) return;
    fetchAccountingAnalytics(dateRange);
  };

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
      {
        name: "Expenses",
        data: Object.values(monthlyExpenses),
        color: "#EF4444",
      },
    ],
    legend: {
      itemStyle: { color: "#9CA3AF" },
    },
  };

  // Monthly Expenses Line Chart
  const monthlyExpenseChart = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
    },
    title: {
      text: "Monthly Expenses Trend",
      style: { color: "#fff", fontSize: "16px" },
    },
    xAxis: {
      categories: Object.keys(monthlyExpenses),
      labels: { style: { color: "#9CA3AF" } },
    },
    yAxis: {
      title: {
        text: "Expenses (₹)",
        style: { color: "#9CA3AF" },
      },
      labels: { style: { color: "#9CA3AF" } },
      gridLineColor: "#374151",
    },
    tooltip: {
      pointFormat: "Expense: <b>₹{point.y:.2f}</b>",
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
        name: "Expenses",
        data: Object.values(monthlyExpenses),
        color: "#EF4444",
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
        data: Object.keys(monthlyRevenue).map((month) => monthlyInvoices[month] || 0),
        color: "#3B82F6",
      },
      {
        name: "Expenses Incurred",
        data: Object.values(monthlyExpenses),
        color: "#EF4444",
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
        if (dashboardData.topCustomersRows.length) {
          return dashboardData.topCustomersRows
            .slice(0, 5)
            .map((row) => row.customer_name || row.customer || row.name || "Unknown");
        }
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
          if (dashboardData.topCustomersRows.length) {
            return dashboardData.topCustomersRows
              .slice(0, 5)
              .map((row) => parseFloat(row.amount || row.total || row.value || 0));
          }
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
    { id: "monthly_expenses", label: "Monthly Expenses", icon: "💸" },
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
      case "monthly_expenses":
        return <HighchartsReact highcharts={Highcharts} options={monthlyExpenseChart} />;
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
      <div className="flex flex-wrap items-end gap-3 bg-gray-800 p-4 rounded-lg">
        <div>
          <label className="block text-xs text-gray-300 mb-1">From</label>
          <input
            type="date"
            name="startDate"
            value={dateRange.startDate}
            onChange={handleDateChange}
            className="px-3 py-2 rounded bg-gray-900 text-white border border-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-300 mb-1">To</label>
          <input
            type="date"
            name="endDate"
            value={dateRange.endDate}
            onChange={handleDateChange}
            className="px-3 py-2 rounded bg-gray-900 text-white border border-gray-600"
          />
        </div>
        <button
          onClick={applyDateFilter}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Apply
        </button>
      </div>

      {/* Chart Selection Buttons */}
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

      {/* Selected Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {renderSelectedChart()}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Total Invoices</p>
          <p className="text-2xl font-bold text-white">{totalInvoices}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Total Payments</p>
          <p className="text-2xl font-bold text-white">{totalPayments}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Total Expenses</p>
          <p className="text-2xl font-bold text-red-400">₹{totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Journal Entries</p>
          <p className="text-2xl font-bold text-white">{totalJournalEntries}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Active Ledgers</p>
          <p className="text-2xl font-bold text-white">{totalLedgers}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountingAnalyticsDashboard;
