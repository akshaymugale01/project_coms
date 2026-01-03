import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  getTrialBalance,
  getBalanceSheet,
  getProfitAndLoss,
  getLedgerStatement,
  getUnitStatement,
  getReceivablesSummary,
} from "../../api/accountingApi";
import Navbar from "../../components/Navbar";

const AccountingReports = () => {
  const [activeReport, setActiveReport] = useState("trial_balance");
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    ledger_id: "",
    unit_id: "",
  });

  const reportTypes = [
    { id: "trial_balance", name: "Trial Balance", icon: "📊" },
    { id: "balance_sheet", name: "Balance Sheet", icon: "📈" },
    { id: "profit_and_loss", name: "Profit & Loss", icon: "💰" },
    { id: "ledger_statement", name: "Ledger Statement", icon: "📝" },
    { id: "unit_statement", name: "Unit Statement", icon: "🏢" },
    { id: "receivables_summary", name: "Receivables Summary", icon: "💳" },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const generateReport = async () => {
    setLoading(true);
    setReportData(null);

    try {
      let response;
      const params = {
        start_date: filters.start_date,
        end_date: filters.end_date,
        ledger_id: filters.ledger_id,
        unit_id: filters.unit_id,
      };

      switch (activeReport) {
        case "trial_balance":
          response = await getTrialBalance(params);
          break;
        case "balance_sheet":
          response = await getBalanceSheet(params);
          break;
        case "profit_and_loss":
          response = await getProfitAndLoss(params);
          break;
        case "ledger_statement":
          response = await getLedgerStatement(params);
          break;
        case "unit_statement":
          response = await getUnitStatement(params);
          break;
        case "receivables_summary":
          response = await getReceivablesSummary(params);
          break;
        default:
          throw new Error("Invalid report type");
      }

      setReportData(response.data);
      toast.success("Report generated successfully");
    } catch (error) {
      toast.error("Failed to generate report");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderReportContent = () => {
    if (!reportData) {
      return (
        <div className="text-center py-12 text-gray-500">
          <p>Configure filters and click "Generate Report" to view data</p>
        </div>
      );
    }

    // Trial Balance Report
    if (activeReport === "trial_balance") {
      return (
        <div>
          <h3 className="text-lg font-semibold mb-4">Trial Balance Report</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ledger
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Debit
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Credit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportData.ledgers?.map((ledger, index) => (
                <tr key={index}>
                  <td className="px-6 py-2">{ledger.name}</td>
                  <td className="px-6 py-4 text-right">
                    ${parseFloat(ledger.debit || 0).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    ${parseFloat(ledger.credit || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td className="px-6 py-4">Total</td>
                <td className="px-6 py-4 text-right">
                  ${parseFloat(reportData.total_debit || 0).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  ${parseFloat(reportData.total_credit || 0).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    // Balance Sheet Report
    if (activeReport === "balance_sheet") {
      return (
        <div>
          <h3 className="text-lg font-semibold mb-4">Balance Sheet</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-700">Assets</h4>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {reportData.assets?.map((asset, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{asset.name}</td>
                      <td className="px-4 py-2 text-right">
                        ${parseFloat(asset.amount || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-4 py-2">Total Assets</td>
                    <td className="px-4 py-2 text-right">
                      ${parseFloat(reportData.total_assets || 0).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-red-700">
                Liabilities & Equity
              </h4>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {reportData.liabilities?.map((liability, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{liability.name}</td>
                      <td className="px-4 py-2 text-right">
                        ${parseFloat(liability.amount || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-4 py-2">Total Liabilities & Equity</td>
                    <td className="px-4 py-2 text-right">
                      ${parseFloat(reportData.total_liabilities || 0).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    // Profit & Loss Report
    if (activeReport === "profit_and_loss") {
      return (
        <div>
          <h3 className="text-lg font-semibold mb-4">Profit & Loss Statement</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-green-50">
                <td className="px-6 py-3 font-semibold" colSpan="2">
                  Revenue
                </td>
              </tr>
              {reportData.revenue?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-2 pl-10">{item.name}</td>
                  <td className="px-6 py-2 text-right">
                    ${parseFloat(item.amount || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-green-100 font-semibold">
                <td className="px-6 py-2">Total Revenue</td>
                <td className="px-6 py-2 text-right">
                  ${parseFloat(reportData.total_revenue || 0).toFixed(2)}
                </td>
              </tr>
              <tr className="bg-red-50">
                <td className="px-6 py-3 font-semibold" colSpan="2">
                  Expenses
                </td>
              </tr>
              {reportData.expenses?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-2 pl-10">{item.name}</td>
                  <td className="px-6 py-2 text-right">
                    ${parseFloat(item.amount || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-red-100 font-semibold">
                <td className="px-6 py-2">Total Expenses</td>
                <td className="px-6 py-2 text-right">
                  ${parseFloat(reportData.total_expenses || 0).toFixed(2)}
                </td>
              </tr>
              <tr className="bg-blue-100 font-bold text-lg">
                <td className="px-6 py-3">Net Profit/Loss</td>
                <td className="px-6 py-3 text-right">
                  ${parseFloat(reportData.net_profit || 0).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    // Generic report display for other types
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {reportTypes.find((r) => r.id === activeReport)?.name}
        </h3>
        <pre className="bg-gray-50 p-4 rounded overflow-auto">
          {JSON.stringify(reportData, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <section className="flex">
      <Navbar />
    <div className="w-full flex mx-3 mb-10 flex-col overflow-hidden p-6 bg-white/80 mt-2">
      <h1 className="text-2xl font-bold mb-6">Accounting Reports</h1>

      <div className="grid grid-cols-6 gap-3 mb-6">
        {reportTypes.map((report) => (
          <button
            key={report.id}
            onClick={() => setActiveReport(report.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeReport === report.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <div className="text-2xl mb-1">{report.icon}</div>
            <div className="text-xs font-medium">{report.name}</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Report Filters</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="start_date"
              value={filters.start_date}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              value={filters.end_date}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {(activeReport === "ledger_statement") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ledger ID
              </label>
              <input
                type="text"
                name="ledger_id"
                value={filters.ledger_id}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          )}
          {(activeReport === "unit_statement") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit ID
              </label>
              <input
                type="text"
                name="unit_id"
                value={filters.unit_id}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          )}
          <div className="flex items-end">
            <button
              onClick={generateReport}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Generating..." : "Generate Report"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          renderReportContent()
        )}
      </div>
    </div>
    </section>
  );
};

export default AccountingReports;
