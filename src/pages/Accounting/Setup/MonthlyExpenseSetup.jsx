import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { createMonthlyExpense, deleteMonthlyExpense, getMonthlyExpenses, updateMonthlyExpense, calculateMonthlyExpenseTotal } from "../../../api/accountingApi";
import { getSites } from "../../../api";

const defaultRow = () => ({ id: undefined, category: "", amount: 0, isCustom: false });

const PREDEFINED_CATEGORIES = [
  "Fixed",
  "Unit Type",
  "Per Square Feet",
  "Expense Based",
  "Gymnasium",
  "Swimming Pool",
  "Utilities",
  "Lighting",
  "Elevators",
  "Maintenance",
  "Salaries",
  "Insurance",
  "Taxes",
  "Repairs",
  "Cleaning",
  "Security",
  "Landscaping",
  "Management Fees",
];

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

const MonthlyExpenseSetup = () => {
  const [loading, setLoading] = useState(true);
  const [sites, setSites] = useState([]);
  const [siteId, setSiteId] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1..12
  const [rows, setRows] = useState([defaultRow()]);
  const [customCategories, setCustomCategories] = useState([]);
  const [backendTotal, setBackendTotal] = useState(0);
  const [ledgerExpenses, setLedgerExpenses] = useState([]);
  const [journalEntryDetails, setJournalEntryDetails] = useState({});
  const [selectedJeList, setSelectedJeList] = useState(null); // ledger name or null
  const [showJeDetailModal, setShowJeDetailModal] = useState(false);

  // Custom date range
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [customFromDate, setCustomFromDate] = useState("");
  const [customToDate, setCustomToDate] = useState("");

  const allCategories = useMemo(() => [...PREDEFINED_CATEGORIES, ...customCategories], [customCategories]);

  // Derive effective params from custom date or year/month
  const getEffectiveParams = () => {
    if (useCustomDate && customFromDate && customToDate) {
      const from = new Date(customFromDate);
      const to = new Date(customToDate);
      return {
        year: from.getFullYear(),
        month: from.getMonth() + 1,
        end_month: to.getMonth() + 1,
        // If crosses year boundary, backend handles via end_month logic
      };
    }
    return { year, month };
  };

  // Fetch total from backend
  const fetchTotal = async () => {
    try {
      const params = { ...getEffectiveParams() };
      if (siteId) params.project_id = siteId;
      const res = await calculateMonthlyExpenseTotal(params);
      setBackendTotal(res?.data?.total || 0);
    } catch (e) {
      console.error('Failed to fetch total:', e);
      setBackendTotal(0);
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      const params = { ...getEffectiveParams() };
      if (siteId) params.project_id = siteId;

      const expenseRes = await getMonthlyExpenses(params);
      const resData = expenseRes?.data || {};

      // Backend now returns { data, ledger_expenses, journal_entry_details }
      const camData = resData.data || resData || [];
      const ledgerData = resData.ledger_expenses || [];
      const jeDetails = resData.journal_entry_details || {};

      setLedgerExpenses(Array.isArray(ledgerData) ? ledgerData : []);
      setJournalEntryDetails(jeDetails);

      // Extract custom categories from loaded CAM data
      if (Array.isArray(camData) && camData.length > 0) {
        const customCats = camData
          .map(r => r.category)
          .filter(cat => cat && !PREDEFINED_CATEGORIES.includes(cat))
          .filter((cat, idx, arr) => arr.indexOf(cat) === idx);
        setCustomCategories(customCats);
        setRows(camData.map(r => ({
          ...r,
          isCustom: !PREDEFINED_CATEGORIES.includes(r.category)
        })));
      } else {
        setRows([defaultRow()]);
      }

      await fetchTotal();
    } catch (e) {
      console.error(e);
      setRows([defaultRow()]);
      setLedgerExpenses([]);
      setJournalEntryDetails({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadSites = async () => {
      try {
        const res = await getSites();
        const list = res?.data?.data || res?.data || [];
        setSites(Array.isArray(list) ? list : []);
        if (!siteId && list?.length > 0) {
          const firstId = list[0]?.id ?? list[0]?.site_id ?? list[0]?.value;
          if (firstId) setSiteId(String(firstId));
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadSites();
  }, []);

  useEffect(() => {
    if (useCustomDate) {
      if (customFromDate && customToDate) load();
    } else {
      load();
    }
  }, [year, month, siteId, useCustomDate, customFromDate, customToDate]);

  const handleChange = (idx, field, value) => {
    setRows((prev) => prev.map((r, i) => {
      if (i !== idx) return r;
      if (field === 'category') {
        if (value === '__custom__') return { ...r, category: '', isCustom: true };
        return { ...r, category: value, isCustom: !PREDEFINED_CATEGORIES.includes(value) };
      }
      return { ...r, [field]: field === 'amount' ? Number(value || 0) : value };
    }));
  };

  const handleCustomCategoryBlur = (idx) => {
    const row = rows[idx];
    if (row.isCustom && row.category && !customCategories.includes(row.category)) {
      setCustomCategories(prev => [...prev, row.category]);
    }
  };

  const addRow = () => setRows((p) => [...p, defaultRow()]);

  const saveAll = async () => {
    try {
      const ops = rows.map((r) => {
        const payload = {
          monthly_expense: {
            year,
            month,
            category: r.category,
            amount: Number(r.amount || 0),
            ...(siteId ? { project_id: siteId, site_id: siteId } : {}),
          },
        };
        if (r.id) return updateMonthlyExpense(r.id, payload);
        return createMonthlyExpense(payload);
      });
      await Promise.all(ops);
      toast.success("Expenses saved");
      load();
    } catch (e) {
      console.error(e);
      toast.error("Failed to save expenses");
    }
  };

  const removeRow = async (idx) => {
    try {
      const row = rows[idx];
      if (row?.id) await deleteMonthlyExpense(row.id);
      setRows((p) => p.filter((_, i) => i !== idx));
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete");
    }
  };

  const viewJeDetails = (ledgerName) => {
    setSelectedJeList(ledgerName);
    setShowJeDetailModal(true);
  };

  // Computed totals
  const camTotal = rows.reduce((s, r) => s + Number(r.amount || 0), 0);
  const ledgerTotal = ledgerExpenses.reduce((s, r) => s + Number(r.amount || 0), 0);
  const grandTotal = camTotal + ledgerTotal;

  // Period label for display
  const periodLabel = useMemo(() => {
    if (useCustomDate && customFromDate && customToDate) {
      return `${new Date(customFromDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} – ${new Date(customToDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }
    return `${MONTH_NAMES[month - 1]} ${year}`;
  }, [useCustomDate, customFromDate, customToDate, month, year]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Monthly CAM Expenses</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-5 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Site</label>
            <select
              value={siteId}
              onChange={(e) => setSiteId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">All sites</option>
              {Array.isArray(sites) && sites.map((s) => {
                const id = s?.id ?? s?.site_id ?? s?.value;
                const name = s?.name ?? s?.site_name ?? s?.label ?? `Site ${id}`;
                return <option key={id} value={id}>{name}</option>;
              })}
            </select>
          </div>

          {!useCustomDate && (
            <>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Year</label>
                <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value || new Date().getFullYear()))} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Month</label>
                <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="w-full px-3 py-2 border rounded">
                  {MONTH_NAMES.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                </select>
              </div>
            </>
          )}

          {useCustomDate && (
            <>
              <div>
                <label className="block text-sm text-gray-600 mb-1">From Date</label>
                <input type="date" value={customFromDate} onChange={(e) => setCustomFromDate(e.target.value)} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">To Date</label>
                <input type="date" value={customToDate} onChange={(e) => setCustomToDate(e.target.value)} className="w-full px-3 py-2 border rounded" />
              </div>
            </>
          )}

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useCustomDate}
                onChange={(e) => {
                  setUseCustomDate(e.target.checked);
                  if (!e.target.checked) {
                    setCustomFromDate("");
                    setCustomToDate("");
                  }
                }}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">Custom Date Range</span>
            </label>
          </div>

          <div className="flex items-end justify-end">
            <button onClick={saveAll} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save All</button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">CAM Expenses</div>
          <div className="text-xl font-bold text-gray-800">₹{camTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          <div className="text-xs text-gray-400 mt-1">{rows.filter(r => r.category).length} categories</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Ledger Expenses (Journal Entries)</div>
          <div className="text-xl font-bold text-purple-700">₹{ledgerTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          <div className="text-xs text-gray-400 mt-1">{ledgerExpenses.length} ledger categories</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Grand Total</div>
          <div className="text-xl font-bold text-green-700">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          <div className="text-xs text-gray-400 mt-1">{periodLabel}</div>
        </div>
      </div> */}

      {/* CAM Monthly Expense Rows */}
      <div className="bg-white rounded-lg shadow p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">CAM Expense Rows</h2>
          <div className="text-sm text-gray-600">
            Subtotal: <span className="font-semibold">₹{camTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Category</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Amount (₹)</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Source</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((r, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2">
                    {r.isCustom ? (
                      <input
                        value={r.category}
                        onChange={(e) => handleChange(idx, 'category', e.target.value)}
                        onBlur={() => handleCustomCategoryBlur(idx)}
                        className="w-80 max-w-full px-3 py-2 border rounded"
                        placeholder="Enter custom category..."
                        autoFocus
                      />
                    ) : (
                      <select
                        value={r.category}
                        onChange={(e) => handleChange(idx, 'category', e.target.value)}
                        className="w-80 max-w-full px-3 py-2 border rounded"
                      >
                        <option value="">Select Category</option>
                        {allCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="__custom__">+ Add Custom Category</option>
                      </select>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <input type="number" value={r.amount} onChange={(e) => handleChange(idx, 'amount', e.target.value)} className="w-40 px-3 py-2 border rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      Manual
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button onClick={() => removeRow(idx)} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button onClick={addRow} className="px-4 py-2 border rounded hover:bg-gray-50">+ Add Row</button>
        </div>
      </div>

      {/* Ledger Expenses from Journal Entries */}
      {ledgerExpenses.length > 0 && (
        <div className="bg-white rounded-lg shadow p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Ledger Expenses
              <span className="ml-2 text-sm font-normal text-gray-500">(from Journal Entries)</span>
            </h2>
            <div className="text-sm text-gray-600">
              Subtotal: <span className="font-semibold text-purple-700">₹{ledgerTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Ledger / Category</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Amount (₹)</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Source</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ledgerExpenses.map((le, idx) => {
                  const details = journalEntryDetails[le.ledger_name || le.category] || [];
                  return (
                    <tr key={idx} className="bg-purple-50/30">
                      <td className="px-4 py-2">
                        <span className="font-medium text-gray-800">{le.ledger_name || le.category}</span>
                      </td>
                      <td className="px-4 py-2 text-right font-medium">
                        ₹{Number(le.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                          Journal Entry
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {details.length > 0 ? (
                          <button
                            onClick={() => viewJeDetails(le.ledger_name || le.category)}
                            className="text-sm text-blue-600 hover:text-blue-800 underline"
                          >
                            {details.length} {details.length === 1 ? 'entry' : 'entries'}
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Journal Entry Detail Modal */}
      {showJeDetailModal && selectedJeList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Journal Entries – {selectedJeList}</h2>
              <button
                onClick={() => { setShowJeDetailModal(false); setSelectedJeList(null); }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Entry #</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Amount (₹)</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Narration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(journalEntryDetails[selectedJeList] || []).map((je, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2 text-sm font-medium">#{je.entry_number || je.id}</td>
                      <td className="px-4 py-2 text-sm">{je.entry_date}</td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          je.status === 'posted' ? 'bg-green-100 text-green-800' :
                          je.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {je.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-right font-medium">
                        ₹{Number(je.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">{je.narration || '—'}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-4 py-2 text-sm" colSpan={3}>Total</td>
                    <td className="px-4 py-2 text-sm text-right">
                      ₹{(journalEntryDetails[selectedJeList] || []).reduce((sum, je) => sum + Number(je.amount || 0), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => { setShowJeDetailModal(false); setSelectedJeList(null); }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyExpenseSetup;
