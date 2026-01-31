import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { createMonthlyExpense, deleteMonthlyExpense, getMonthlyExpenses, updateMonthlyExpense, calculateMonthlyExpenseTotal, getJournalEntries } from "../../../api/accountingApi";

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

const MonthlyExpenseSetup = () => {
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1..12
  const [rows, setRows] = useState([defaultRow()]);
  const [customCategories, setCustomCategories] = useState([]);
  const [backendTotal, setBackendTotal] = useState(0); // Store backend-calculated total
  const [journalEntries, setJournalEntries] = useState([]);
  const [selectedJournalEntry, setSelectedJournalEntry] = useState(null);
  const [showJournalModal, setShowJournalModal] = useState(false);

  const allCategories = useMemo(() => [...PREDEFINED_CATEGORIES, ...customCategories], [customCategories]);

  // Fetch total from backend
  const fetchTotal = async (yr, mo) => {
    try {
      const res = await calculateMonthlyExpenseTotal({ year: yr, month: mo });
      setBackendTotal(res?.data?.total || 0);
    } catch (e) {
      console.error('Failed to fetch total:', e);
      setBackendTotal(0);
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      const [expenseRes, journalRes] = await Promise.all([
        getMonthlyExpenses({ year, month }),
        getJournalEntries()
      ]);
      
      const data = expenseRes?.data?.data || expenseRes?.data || [];
      const allJournals = journalRes?.data?.data || journalRes?.data || [];
      
      // Filter journal entries for the selected month/year
      const monthNames = ["January", "February", "March", "April", "May", "June", 
                          "July", "August", "September", "October", "November", "December"];
      const filteredJournals = Array.isArray(allJournals) ? allJournals.filter(j => {
        const expenseMonth = j.expense_month;
        const expenseYear = parseInt(j.expense_year);
        const targetMonth = monthNames.indexOf(expenseMonth) + 1;
        return targetMonth === month && expenseYear === year;
      }) : [];
      
      setJournalEntries(filteredJournals);
      
      // Extract custom categories from loaded data
      if (Array.isArray(data) && data.length > 0) {
        const customCats = data
          .map(r => r.category)
          .filter(cat => cat && !PREDEFINED_CATEGORIES.includes(cat))
          .filter((cat, idx, arr) => arr.indexOf(cat) === idx); // unique
        setCustomCategories(customCats);
        setRows(data.map(r => ({
          ...r,
          isCustom: !PREDEFINED_CATEGORIES.includes(r.category)
        })));
      } else {
        setRows([defaultRow()]);
      }
      
      // Fetch backend total
      await fetchTotal(year, month);
    } catch (e) {
      console.error(e);
      setRows([defaultRow()]);
      setJournalEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [year, month]);

  const handleChange = (idx, field, value) => {
    setRows((prev) => prev.map((r, i) => {
      if (i !== idx) return r;
      
      if (field === 'category') {
        // Check if selecting custom option
        if (value === '__custom__') {
          return { ...r, category: '', isCustom: true };
        }
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
        const payload = { monthly_expense: { year, month, category: r.category, amount: Number(r.amount || 0) } };
        if (r.id) return updateMonthlyExpense(r.id, payload);
        return createMonthlyExpense(payload);
      });
      await Promise.all(ops);
      toast.success("Expenses saved");
      await load();
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

  const getJournalEntriesForCategory = (category) => {
    if (!category) return [];
    return journalEntries.filter(je => {
      const lines = je.entry_lines || je.journal_entry_lines || [];
      return lines.some(line => {
        const ledgerName = line.ledger?.name || line.ledger_name;
        return ledgerName === category;
      });
    });
  };

  const viewJournalEntry = (entry) => {
    setSelectedJournalEntry(entry);
    setShowJournalModal(true);
  };

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

      <div className="bg-white rounded-lg shadow p-5 mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Year</label>
          <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value || new Date().getFullYear()))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Month</label>
          <input type="number" min={1} max={12} value={month} onChange={(e) => setMonth(Number(e.target.value || 1))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="md:col-span-2 flex items-end justify-end">
          <button onClick={saveAll} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save All</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Expense Rows</h2>
          <div className="text-sm text-gray-600">Total: <span className="font-semibold">₹{backendTotal.toFixed(2)}</span></div>
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
              {rows.map((r, idx) => {
                const relatedJournals = getJournalEntriesForCategory(r.category);
                return (
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
                      {relatedJournals.length > 0 ? (
                        <div className="space-y-1">
                          {relatedJournals.map((je, jIdx) => (
                            <div key={jIdx} className="flex items-center gap-2">
                              <span className="text-xs text-gray-600">JE #{je.entry_number || je.id}</span>
                              <button
                                onClick={() => viewJournalEntry(je)}
                                className="text-xs text-blue-600 hover:text-blue-800 underline"
                              >
                                View
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Manual entry</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button onClick={() => removeRow(idx)} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button onClick={addRow} className="px-4 py-2 border rounded hover:bg-gray-50">+ Add Row</button>
        </div>
      </div>

      {/* Journal Entry View Modal */}
      {showJournalModal && selectedJournalEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Journal Entry #{selectedJournalEntry.entry_number || selectedJournalEntry.id}</h2>
              <button
                onClick={() => { setShowJournalModal(false); setSelectedJournalEntry(null); }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Entry Date</label>
                  <div className="text-sm text-gray-900">{selectedJournalEntry.entry_date}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedJournalEntry.status === 'posted' ? 'bg-green-100 text-green-800' : 
                      selectedJournalEntry.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedJournalEntry.status}
                    </span>
                  </div>
                </div>
                {selectedJournalEntry.invoice_number && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
                    <div className="text-sm text-gray-900">{selectedJournalEntry.invoice_number}</div>
                  </div>
                )}
                {selectedJournalEntry.expense_month && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expense Period</label>
                    <div className="text-sm text-gray-900">{selectedJournalEntry.expense_month} {selectedJournalEntry.expense_year}</div>
                  </div>
                )}
              </div>

              {selectedJournalEntry.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <div className="text-sm text-gray-900">{selectedJournalEntry.description}</div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Entry Lines</label>
                <table className="min-w-full divide-y divide-gray-200 border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Ledger</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Debit</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Credit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {(selectedJournalEntry.entry_lines || selectedJournalEntry.journal_entry_lines || []).map((line, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 text-sm">{line.ledger?.name || line.ledger_name || 'Unknown'}</td>
                        <td className="px-4 py-2 text-sm text-right">₹{Number(line.debit || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="px-4 py-2 text-sm text-right">₹{Number(line.credit || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-semibold">
                      <td className="px-4 py-2 text-sm">Total</td>
                      <td className="px-4 py-2 text-sm text-right">
                        ₹{(selectedJournalEntry.entry_lines || selectedJournalEntry.journal_entry_lines || []).reduce((sum, line) => sum + Number(line.debit || 0), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-2 text-sm text-right">
                        ₹{(selectedJournalEntry.entry_lines || selectedJournalEntry.journal_entry_lines || []).reduce((sum, line) => sum + Number(line.credit || 0), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => { setShowJournalModal(false); setSelectedJournalEntry(null); }}
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
