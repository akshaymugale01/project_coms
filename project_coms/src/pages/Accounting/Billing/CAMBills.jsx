import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { getCamSettings, getUnitCamConfigs, previewCamBills, generateCamBills, getCamBills, getMonthlyExpenses } from "../../../api/accountingApi";
import { buildAllocationPreview, makePeriod } from "../utils/cam";
import { getSites } from "../../../api";

const CAMBills = () => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [settings, setSettings] = useState(null);
  const [unitConfigs, setUnitConfigs] = useState([]);
  const [previewRows, setPreviewRows] = useState([]);
  const [persistedRows, setPersistedRows] = useState([]);
  const [sites, setSites] = useState([]);
  const [siteId, setSiteId] = useState("");
  const [allocation, setAllocation] = useState({ rows: [], totals: { days: 0, area: 0, areaDays: 0, expense: 0, daysInMonth: 0 } });

  const totalPreview = useMemo(() => previewRows.reduce((s, r) => s + Number(r.total_amount || 0), 0), [previewRows]);
  const totalPersisted = useMemo(() => persistedRows.reduce((s, r) => s + Number(r.total_amount || 0), 0), [persistedRows]);

  const loadSettingsAndUnits = async () => {
    try {
      const [sRes, uRes, sitesRes] = await Promise.all([
        getCamSettings(),
        getUnitCamConfigs(),
        getSites(),
      ]);
      setSettings(sRes?.data?.data || sRes?.data || null);
      setUnitConfigs(uRes?.data?.data || uRes?.data || []);
      const siteList = sitesRes?.data?.data || sitesRes?.data || [];
      setSites(Array.isArray(siteList) ? siteList : []);
      if (!siteId && Array.isArray(siteList) && siteList.length > 0) {
        const firstId = siteList[0]?.id || siteList[0]?.site_id || siteList[0]?.value;
        if (firstId) setSiteId(String(firstId));
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to load CAM settings or unit configs");
    }
  };

  const loadPersistedBills = async () => {
    try {
      const params = { year, month };
      if (siteId) params.site_id = siteId;
      const res = await getCamBills(params);
      const rows = res?.data?.data || res?.data || [];
      setPersistedRows(Array.isArray(rows) ? rows : []);
    } catch (e) {
      console.error(e);
      setPersistedRows([]);
    }
  };

  useEffect(() => {
    loadSettingsAndUnits();
  }, []);

  useEffect(() => {
    loadPersistedBills();
  }, [year, month, siteId]);

  useEffect(() => {
    // Load monthly expense and prepare allocation preview table
    const run = async () => {
      try {
        const res = await getMonthlyExpenses({ year, month });
        const expenseRows = res?.data?.data || res?.data || [];
        const totalExpense = Array.isArray(expenseRows) ? expenseRows.reduce((s, r) => s + Number(r.amount || 0), 0) : 0;
        if (!unitConfigs || unitConfigs.length === 0) return;
        const { start, end } = makePeriod(year, month);
        const rows = unitConfigs.map((c) => ({
          unit_id: c.unit_id,
          id: c.unit_id,
          flat: c.flat || c.name || c.flat_no || c.unit_id,
          carpet_area: c.carpet_area_sqft ?? c.carpet_area ?? 0,
          cam_start_date: c.cam_start_date,
        }));
        const preview = buildAllocationPreview({ totalExpense, units: rows, periodStart: start, periodEnd: end });
        setAllocation(preview);
      } catch (e) {
        console.error(e);
        setAllocation({ rows: [], totals: { days: 0, area: 0, areaDays: 0, expense: 0, daysInMonth: 0 } });
      }
    };
    run();
  }, [year, month, unitConfigs]);

  const doPreview = async () => {
    setLoading(true);
    try {
      if (!siteId) {
        toast.error("Please select a Site");
        return;
      }
      const res = await previewCamBills({ year, month, site_id: siteId });
      const rows = res?.data?.data || res?.data || [];
      setPreviewRows(Array.isArray(rows) ? rows : []);
      if (!rows.length) toast("No billable units for selected month");
    } catch (e) {
      console.error(e);
      toast.error("Preview failed");
    } finally {
      setLoading(false);
    }
  };

  const doGenerate = async () => {
    setLoading(true);
    try {
      if (!siteId) {
        toast.error("Please select a Site");
        return;
      }
      const res = await generateCamBills({ year, month, site_id: siteId });
      const rows = res?.data?.data || res?.data || [];
      toast.success("Bills generated");
      setPreviewRows([]);
      setPersistedRows(Array.isArray(rows) ? rows : []);
    } catch (e) {
      console.error(e);
      toast.error("Generate failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Accounting Bills</h1>

      <div className="bg-white rounded-lg shadow p-5 mb-4 grid grid-cols-1 md:grid-cols-6 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Site</label>
          <select
            value={siteId}
            onChange={(e) => setSiteId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select site</option>
            {sites.map((s) => {
              const id = s?.id || s?.site_id || s?.value;
              const name = s?.name || s?.site_name || s?.label || `Site ${id}`;
              return (
                <option key={id} value={id}>{name}</option>
              );
            })}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Year</label>
          <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value || new Date().getFullYear()))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Month</label>
          <input type="number" min={1} max={12} value={month} onChange={(e) => setMonth(Number(e.target.value || 1))} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="md:col-span-3 lg:col-span-3 flex items-end gap-2 justify-end">
          <button onClick={doPreview} className="px-4 py-2 border rounded hover:bg-gray-50">Preview</button>
          <button onClick={doGenerate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>Generate</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Expense Allocation Preview</h2>
            <div className="text-sm text-gray-600">Monthly Expense Total: <span className="font-semibold">₹{Number(allocation?.totals?.expense || 0).toFixed(2)}</span></div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Flat</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Days</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Area (sqft)</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Area × Days</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Expense (Days)</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Expense (Area-Days)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allocation.rows.map((r) => (
                  <tr key={r.unit_id}>
                    <td className="px-4 py-2">{r.flat}</td>
                    <td className="px-4 py-2">{r.activeDays}</td>
                    <td className="px-4 py-2">{Number(r.area || 0)}</td>
                    <td className="px-4 py-2">{Number(r.areaDays || 0)}</td>
                    <td className="px-4 py-2">{Number(r.daysShare || 0).toFixed(0)}</td>
                    <td className="px-4 py-2">{Number(r.areaDaysShare || 0).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 font-medium">Totals</td>
                  <td className="px-4 py-2 font-medium">{allocation.totals.days}</td>
                  <td className="px-4 py-2 font-medium">{allocation.totals.area}</td>
                  <td className="px-4 py-2 font-medium">{allocation.totals.areaDays}</td>
                  <td className="px-4 py-2 font-medium">{Number(allocation.totals.expense || 0).toFixed(0)}</td>
                  <td className="px-4 py-2 font-medium">{Number(allocation.totals.expense || 0).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Rounding per row may cause ±1 difference vs total.
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Preview ({previewRows.length})</h2>
            <div className="text-sm text-gray-600">Total: <span className="font-semibold">₹{totalPreview.toFixed(2)}</span></div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Unit</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Area (sqft)</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Active Days</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Base (₹)</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">GST (₹)</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {previewRows.map((r, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2">{r.unit_id}</td>
                    <td className="px-4 py-2">{Number(r.carpet_area_sqft || 0).toFixed(2)}</td>
                    <td className="px-4 py-2">{Number(r.active_days || 0)}</td>
                    <td className="px-4 py-2">{Number(r.base_amount || 0).toFixed(2)}</td>
                    <td className="px-4 py-2">{Number(r.gst_amount || 0).toFixed(2)}</td>
                    <td className="px-4 py-2">{Number(r.total_amount || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Persisted ({persistedRows.length})</h2>
            <div className="text-sm text-gray-600">Total: <span className="font-semibold">₹{totalPersisted.toFixed(2)}</span></div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Unit</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Area (sqft)</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Active Days</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Base (₹)</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">GST (₹)</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {persistedRows.map((r, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2">{r.unit_id}</td>
                    <td className="px-4 py-2">{Number(r.carpet_area_sqft || 0).toFixed(2)}</td>
                    <td className="px-4 py-2">{Number(r.active_days || 0)}</td>
                    <td className="px-4 py-2">{Number(r.base_amount || 0).toFixed(2)}</td>
                    <td className="px-4 py-2">{Number(r.gst_amount || 0).toFixed(2)}</td>
                    <td className="px-4 py-2">{Number(r.total_amount || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAMBills;
