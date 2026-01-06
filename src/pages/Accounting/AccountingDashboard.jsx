import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  getAccountingInvoices,
  getAccountingPayments,
  getJournalEntries,
  getOverdueInvoices,
} from "../../api/accountingApi";
import AccountingAnalyticsDashboard from "./AccountingAnalyticsDashboard";
import Navbar from "../../components/Navbar";

const AccountingDashboard = () => {
  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalPayments: 0,
    overdueInvoices: 0,
    totalRevenue: 0,
    pendingAmount: 0,
    recentInvoices: [],
    recentPayments: [],
    recentJournalEntries: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [invoicesRes, paymentsRes, journalRes, overdueRes] =
        await Promise.all([
          getAccountingInvoices(),
          getAccountingPayments(),
          getJournalEntries(),
          getOverdueInvoices(),
        ]);

      const invoices = invoicesRes.data.data || invoicesRes.data || [];
      const payments = paymentsRes.data.data || paymentsRes.data || [];
      const journalEntries = journalRes.data.data || journalRes.data || [];
      const overdueInvoices = overdueRes.data.data || overdueRes.data || [];

      const totalRevenue = payments.reduce(
        (sum, payment) => sum + parseFloat(payment.amount || 0),
        0
      );

      const pendingAmount = invoices
        .filter((inv) => inv.status !== "paid")
        .reduce((sum, inv) => sum + parseFloat(inv.total_amount || 0), 0);

      setStats({
        totalInvoices: invoices.length,
        totalPayments: payments.length,
        overdueInvoices: overdueInvoices.length,
        totalRevenue,
        pendingAmount,
        recentInvoices: invoices.slice(0, 5),
        recentPayments: payments.slice(0, 5),
        recentJournalEntries: journalEntries.slice(0, 5),
      });
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const modules = [
    {
      name: "Account Groups",
      path: "/accounting/account-groups",
      icon: "📁",
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Ledgers",
      path: "/accounting/ledgers",
      icon: "📒",
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Tax Rates",
      path: "/accounting/tax-rates",
      icon: "💹",
      color: "bg-purple-100 text-purple-600",
    },
    {
      name: "Journal Entries",
      path: "/accounting/journal-entries",
      icon: "📝",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      name: "Invoices",
      path: "/accounting/invoices",
      icon: "🧾",
      color: "bg-red-100 text-red-600",
    },
    {
      name: "Payments",
      path: "/accounting/payments",
      icon: "💳",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      name: "Reports",
      path: "/accounting/reports",
      icon: "📊",
      color: "bg-pink-100 text-pink-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="flex">
      <Navbar />
    <div className="w-full flex mx-3 mb-10 flex-col overflow-hidden p-6 bg-white/80 mt-2">
      <h1 className="text-3xl font-bold mb-6">Accounting Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Invoices</p>
              <p className="text-2xl font-bold">{stats.totalInvoices}</p>
            </div>
            <div className="text-4xl">🧾</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">
                ₹{parseFloat(stats.totalRevenue).toFixed(2)}
              </p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Amount</p>
              <p className="text-3xl font-bold text-orange-600">
                ₹{parseFloat(stats.pendingAmount).toFixed(2)}
              </p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Overdue Invoices</p>
              <p className="text-2xl font-bold text-red-600">
                {stats.overdueInvoices}
              </p>
            </div>
            <div className="text-4xl">⚠️</div>
          </div>
        </div>
      </div>

      {/* Quick Access Modules */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {modules.map((module) => (
            <Link
              key={module.path}
              to={module.path}
              className={`${module.color} rounded-lg p-4 text-center hover:shadow-lg transition-shadow`}
            >
              <div className="text-3xl mb-2">{module.icon}</div>
              <p className="text-sm font-medium">{module.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Invoices</h2>
            <Link
              to="/accounting/invoices"
              className="text-blue-600 text-sm hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentInvoices.length === 0 ? (
              <p className="text-gray-500 text-sm">No invoices yet</p>
            ) : (
              stats.recentInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <p className="font-medium">{invoice.invoice_number}</p>
                    <p className="text-sm text-gray-500">
                      {invoice.customer_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ₹{parseFloat(invoice.total_amount || 0).toFixed(2)}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        invoice.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : invoice.status === "overdue"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Payments</h2>
            <Link
              to="/accounting/payments"
              className="text-blue-600 text-sm hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentPayments.length === 0 ? (
              <p className="text-gray-500 text-sm">No payments yet</p>
            ) : (
              stats.recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <p className="font-medium">{payment.reference || "N/A"}</p>
                    <p className="text-sm text-gray-500 capitalize">
                      {payment.payment_method?.replace("_", " ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">
                      ₹{parseFloat(payment.amount || 0).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(payment.payment_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Journal Entries */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Journal Entries</h2>
          <Link
            to="/accounting/journal-entries"
            className="text-blue-600 text-sm hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Reference
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Description
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats.recentJournalEntries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                    No journal entries yet
                  </td>
                </tr>
              ) : (
                stats.recentJournalEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-4 py-3">{entry.reference}</td>
                    <td className="px-4 py-3">
                      {new Date(entry.entry_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {entry.description || "-"}
                    </td>
                    <td className="px-4 py-3">
                      ₹{parseFloat(entry.total_amount || 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          entry.status === "posted"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Accounting Analytics</h2>
        <div className="bg-gray-900 p-5 rounded-lg shadow-custom-all-sides">
          <AccountingAnalyticsDashboard />
        </div>
      </div>
    </div>
    </section>
  );
};

export default AccountingDashboard;
