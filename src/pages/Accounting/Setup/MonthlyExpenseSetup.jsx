import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { createMonthlyExpense, deleteMonthlyExpense, getMonthlyExpenses, updateMonthlyExpense } from "../../../api/accountingApi";

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

  const total = useMemo(() => rows.reduce((s, r) => s + Number(r.amount || 0), 0), [rows]);
  const allCategories = useMemo(() => [...PREDEFINED_CATEGORIES, ...customCategories], [customCategories]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getMonthlyExpenses({ year, month });
      const data = res?.data?.data || res?.data || [];
      
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
    } catch (e) {
      console.error(e);
      setRows([defaultRow()]);
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
          <div className="text-sm text-gray-600">Total: <span className="font-semibold">₹{total.toFixed(2)}</span></div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Category</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Amount (₹)</th>
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
    </div>
  );
};

export default MonthlyExpenseSetup;
