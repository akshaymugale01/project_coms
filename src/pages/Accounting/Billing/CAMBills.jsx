import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { getCamSettings, getUnitCamConfigs, previewCamBills, generateCamBills, getCamBills, getMonthlyExpenses } from "../../../api/accountingApi";
import { buildAllocationPreview, makePeriod } from "../utils/cam";
import { getSites, getUnitDetails } from "../../../api";

const CAMBills = () => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [period, setPeriod] = useState("monthly"); // monthly, quarterly, half-yearly, yearly
  const [settings, setSettings] = useState(null);
  const [unitConfigs, setUnitConfigs] = useState([]);
  const [previewRows, setPreviewRows] = useState([]);
  const [persistedRows, setPersistedRows] = useState([]);
  const [sites, setSites] = useState([]);
  const [siteId, setSiteId] = useState("");
  const [allocation, setAllocation] = useState({ rows: [], totals: { days: 0, area: 0, areaDays: 0, expense: 0, daysInMonth: 0 } });

  const totalPreview = useMemo(() => previewRows.reduce((s, r) => s + Number(r.total_amount || 0), 0), [previewRows]);
  const totalPersisted = useMemo(() => persistedRows.reduce((s, r) => s + Number(r.total_amount || 0), 0), [persistedRows]);

  // Calculate period range based on selection
  const getPeriodParams = () => {
    let startMonth = month;
    let endMonth = month;
    
    switch (period) {
      case "quarterly":
        // Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Oct-Dec
        const quarter = Math.ceil(month / 3);
        startMonth = (quarter - 1) * 3 + 1;
        endMonth = quarter * 3;
        break;
      case "half-yearly":
        // H1: Jan-Jun, H2: Jul-Dec
        const half = month <= 6 ? 1 : 2;
        startMonth = half === 1 ? 1 : 7;
        endMonth = half === 1 ? 6 : 12;
        break;
      case "yearly":
        startMonth = 1;
        endMonth = 12;
        break;
      default: // monthly
        startMonth = month;
        endMonth = month;
    }
    
    return { startMonth, endMonth };
  };

  const periodLabel = useMemo(() => {
    const { startMonth, endMonth } = getPeriodParams();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    if (startMonth === endMonth) {
      return `${monthNames[startMonth - 1]} ${year}`;
    }
    return `${monthNames[startMonth - 1]} - ${monthNames[endMonth - 1]} ${year}`;
  }, [period, month, year]);

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
      
      // Fetch unit names for each row
      const rowsWithNames = await Promise.all(
        (Array.isArray(rows) ? rows : []).map(async (row) => {
          try {
            const unitRes = await getUnitDetails(row.unit_id);
            const unitData = unitRes?.data?.data || unitRes?.data;
            const unitName = unitData?.name || unitData?.flat || unitData?.flat_no || `Unit ${row.unit_id}`;
            return { ...row, flat_no: unitName, unit_name: unitName };
          } catch (err) {
            console.error(`Failed to fetch unit ${row.unit_id}:`, err);
            return row;
          }
        })
      );
      
      setPersistedRows(rowsWithNames);
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
        const { startMonth, endMonth } = getPeriodParams();
        let totalExpense = 0;
        
        // Fetch expenses for all months in the period
        for (let m = startMonth; m <= endMonth; m++) {
          const res = await getMonthlyExpenses({ year, month: m });
          const expenseRows = res?.data?.data || res?.data || [];
          totalExpense += Array.isArray(expenseRows) ? expenseRows.reduce((s, r) => s + Number(r.amount || 0), 0) : 0;
        }
        
        if (!unitConfigs || unitConfigs.length === 0) return;
        const { start, end } = makePeriod(year, month);
        
        // Fetch unit details for each unit to get the name
        const rowsWithNames = await Promise.all(
          unitConfigs.map(async (c) => {
            let unitName = `Unit ${c.unit_id}`;
            try {
              const unitRes = await getUnitDetails(c.unit_id);
              const unitData = unitRes?.data?.data || unitRes?.data;
              unitName = unitData?.name || unitData?.flat || unitData?.flat_no || `Unit ${c.unit_id}`;
            } catch (err) {
              console.error(`Failed to fetch unit ${c.unit_id}:`, err);
            }
            
            return {
              unit_id: c.unit_id,
              id: c.unit_id,
              flat: unitName,
              unit_name: unitName,
              carpet_area: c.carpet_area_sqft ?? c.carpet_area ?? 0,
              cam_start_date: c.cam_start_date,
            };
          })
        );
        
        // console.log("----unitConfigs----", unitConfigs);
        // console.log("----rowsWithNames----", rowsWithNames);
        const preview = buildAllocationPreview({ totalExpense, units: rowsWithNames, periodStart: start, periodEnd: end });
        setAllocation(preview);
      } catch (e) {
        console.error(e);
        setAllocation({ rows: [], totals: { days: 0, area: 0, areaDays: 0, expense: 0, daysInMonth: 0 } });
      }
    };
    run();
  }, [year, month, period, unitConfigs]);

  const doPreview = async () => {
    setLoading(true);
    try {
      if (!siteId) {
        toast.error("Please select a Site");
        return;
      }
      const { startMonth, endMonth } = getPeriodParams();
      const res = await previewCamBills({ year, month: startMonth, end_month: endMonth, site_id: siteId });
      const rows = res?.data?.data || res?.data || [];
      
      // Fetch unit names for each row
      const rowsWithNames = await Promise.all(
        (Array.isArray(rows) ? rows : []).map(async (row) => {
          try {
            const unitRes = await getUnitDetails(row.unit_id);
            const unitData = unitRes?.data?.data || unitRes?.data;
            const unitName = unitData?.name || unitData?.flat || unitData?.flat_no || `Unit ${row.unit_id}`;
            return { ...row, flat_no: unitName, unit_name: unitName };
          } catch (err) {
            console.error(`Failed to fetch unit ${row.unit_id}:`, err);
            return row;
          }
        })
      );
      
      setPreviewRows(rowsWithNames);
      if (!rows.length) toast("No billable units for selected period");
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
      const { startMonth, endMonth } = getPeriodParams();
      const res = await generateCamBills({ year, month: startMonth, end_month: endMonth, site_id: siteId });
      const rows = res?.data?.data || res?.data || [];
      
      // Fetch unit names for each row
      const rowsWithNames = await Promise.all(
        (Array.isArray(rows) ? rows : []).map(async (row) => {
          try {
            const unitRes = await getUnitDetails(row.unit_id);
            const unitData = unitRes?.data?.data || unitRes?.data;
            const unitName = unitData?.name || unitData?.flat || unitData?.flat_no || `Unit ${row.unit_id}`;
            return { ...row, flat_no: unitName, unit_name: unitName };
          } catch (err) {
            console.error(`Failed to fetch unit ${row.unit_id}:`, err);
            return row;
          }
        })
      );
      
      toast.success("Bills generated");
      setPreviewRows([]);
      setPersistedRows(rowsWithNames);
    } catch (e) {
      console.error(e);
      toast.error("Generate failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Accounting Bills</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site</label>
            <select
              value={siteId}
              onChange={(e) => setSiteId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Period Type</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="half-yearly">Half-Yearly (6 Months)</option>
              <option value="yearly">Yearly (12 Months)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <input 
              type="number" 
              value={year} 
              onChange={(e) => setYear(Number(e.target.value || new Date().getFullYear()))} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {period === "monthly" ? "Month" : "Starting Month"}
            </label>
            <input 
              type="number" 
              min={1} 
              max={12} 
              value={month} 
              onChange={(e) => setMonth(Number(e.target.value || 1))} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period Range</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-blue-50 text-sm font-medium text-blue-900">
              {periodLabel}
            </div>
          </div>
          <div className="md:col-span-2 flex items-end gap-3 justify-end">
            <button 
              onClick={doPreview} 
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium text-gray-700 transition-colors"
            >
              Preview
            </button>
            <button 
              onClick={doGenerate} 
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Expense Allocation Preview - Full Width */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Expense Allocation Preview</h2>
              <div className="text-sm text-white bg-blue-700 px-4 py-1 rounded-full">
                Monthly Expense Total: <span className="font-bold">₹{Number(allocation?.totals?.expense || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Flat</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Days</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Area (sqft)</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Area × Days</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Expense (Days)</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Expense (Area-Days)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allocation.rows.map((r, idx) => (
                    <tr key={r.unit_id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {/* {console.log("--------------",r)} */}
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {r.flat || r.unit_name || `Unit ${r.unit_id}`}
                        <span className="ml-2 text-xs text-gray-500">#{r.unit_id}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{r.activeDays}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{Number(r.area || 0)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{Number(r.areaDays || 0)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">₹{Number(r.daysShare || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">₹{Number(r.areaDaysShare || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-blue-50 border-t-2 border-blue-200">
                  <tr>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">Totals</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">{allocation.totals.days}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">{allocation.totals.area}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">{allocation.totals.areaDays}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">₹{Number(allocation.totals.expense || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                    <td className="px-4 py-3 text-sm font-bold text-blue-700">₹{Number(allocation.totals.expense || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="mt-3 text-xs text-gray-500 italic bg-yellow-50 p-2 rounded border-l-4 border-yellow-400">
              * Rounding per row may cause ±1 difference vs total.
            </div>
          </div>
        </div>

        {/* Preview and Persisted - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Preview <span className="ml-2 bg-green-700 px-2 py-1 rounded-full text-sm">({previewRows.length})</span>
                </h2>
                <div className="text-sm text-white bg-green-700 px-4 py-1 rounded-full">
                  Total: <span className="font-bold">₹{totalPreview.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Unit</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Area</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Days</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Base</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">GST</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previewRows.map((r, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {r.flat_no || r.unit_name || r.flat || `Unit ${r.unit_id}`}
                          <span className="ml-2 text-xs text-gray-500">#{r.unit_id}</span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">{Number(r.carpet_area_sqft || 0).toFixed(2)}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">{Number(r.active_days || 0)}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">₹{Number(r.base_amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">₹{Number(r.gst_amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-green-700">₹{Number(r.total_amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Persisted Section */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Persisted <span className="ml-2 bg-purple-700 px-2 py-1 rounded-full text-sm">({persistedRows.length})</span>
                </h2>
                <div className="text-sm text-white bg-purple-700 px-4 py-1 rounded-full">
                  Total: <span className="font-bold">₹{totalPersisted.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Unit</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Area</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Days</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Base</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">GST</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {persistedRows.map((r, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {r.flat_no || r.unit_name || r.flat || `Unit ${r.unit_id}`}
                          <span className="ml-2 text-xs text-gray-500">#{r.unit_id}</span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">{Number(r.carpet_area_sqft || 0).toFixed(2)}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">{Number(r.active_days || 0)}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">₹{Number(r.base_amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">₹{Number(r.gst_amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-purple-700">₹{Number(r.total_amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAMBills;
