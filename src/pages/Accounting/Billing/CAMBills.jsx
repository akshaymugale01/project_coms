import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  getCamSettings,
  getUnitCamConfigs,
  previewCamBills,
  generateCamBills,
  getCamBills,
  getMonthlyExpenses,
  getCamIncomeExpenseSummary,
  getReconciliationReport,
  getIncomeEntries,
  getAccountingInvoices,
  getAccountingPayments,
  getJournalEntries,
  getMonthlyIncome,
  calculateIncomeAllocation,
  calculateExpenseAllocation,
  calculateIncomeVsExpense,
  getIncomeByCategory,
  getExpenseByCategory,
  getDailyIncomeReport,
  getDailyExpenseReport,
  getUnitWiseIncomeSummary,
  getUnitWiseExpenseSummary,
  calculateMonthlyExpenseTotal,
  getMonthlyIncomeTotal,
} from "../../../api/accountingApi";
import { makePeriod } from "../utils/cam";
import { getSites } from "../../../api";

// Build unit_id -> unit_name map from allocation rows (backend already includes unit names)
const unitNameMapFromAllocationRows = (rows) => {
  const map = {};
  (Array.isArray(rows) ? rows : []).forEach((r) => {
    if (r?.unit_id != null) {
      map[r.unit_id] = r.unit_name || r.flat || `Unit ${r.unit_id}`;
    }
  });
  return map;
};

const CAMBills = () => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [period, setPeriod] = useState("monthly"); // monthly, quarterly, half-yearly, yearly, custom
  const [customFromDate, setCustomFromDate] = useState("");
  const [customToDate, setCustomToDate] = useState("");
  const [settings, setSettings] = useState(null);
  const [unitConfigs, setUnitConfigs] = useState([]);
  const [previewRows, setPreviewRows] = useState([]);
  const [persistedRows, setPersistedRows] = useState([]);
  const [sites, setSites] = useState([]);
  const [siteId, setSiteId] = useState("");
  const [overviewMode, setOverviewMode] = useState("expense"); // expense | income | income_vs_expense
  const [allocation, setAllocation] = useState({ rows: [], totals: { days: 0, area: 0, areaDays: 0, expense: 0, daysInMonth: 0 } });
  const [incomeTotal, setIncomeTotal] = useState({ received: 0, invoiced: 0 });
  const [unitOutstandingById, setUnitOutstandingById] = useState({});
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [selectedExpenseCategories, setSelectedExpenseCategories] = useState([]);
  const [showExpenseDropdown, setShowExpenseDropdown] = useState(false);
  const [billsViewMode, setBillsViewMode] = useState("preview"); // preview | persisted
  
  // Income categories and detailed tracking
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [selectedIncomeCategories, setSelectedIncomeCategories] = useState([]);
  const [showIncomeDropdown, setShowIncomeDropdown] = useState(false);
  const [incomeBreakdown, setIncomeBreakdown] = useState({
    invoices: 0,
    payments: 0,
    journalEntries: 0,
    incomeEntries: 0,
    byCategory: {}
  });
  const [incomeAllocationData, setIncomeAllocationData] = useState({ rows: [], totals: { days: 0, income: 0 } });
  
  // Backend calculated data
  const [backendExpenseTotal, setBackendExpenseTotal] = useState(0);
  const [backendIncomeTotal, setBackendIncomeTotal] = useState(0);
  const [backendIncomeAllocation, setBackendIncomeAllocation] = useState({ rows: [], totals: {} });
  const [backendExpenseAllocation, setBackendExpenseAllocation] = useState({ rows: [], totals: {} });
  const [backendIncomeVsExpense, setBackendIncomeVsExpense] = useState({ rows: [], totals: {} });
  const [dailyIncomeData, setDailyIncomeData] = useState([]);
  const [dailyExpenseData, setDailyExpenseData] = useState([]);
  const [calculationsLoading, setCalculationsLoading] = useState(false);
  
  // Unit-wise actual income (actual income received per unit from income_entries & invoices)
  const [unitWiseIncome, setUnitWiseIncome] = useState({});

  const totalPreview = useMemo(() => (Array.isArray(previewRows) ? previewRows : []).reduce((s, r) => s + Number(r.total_amount || 0), 0), [previewRows]);
  const totalPersisted = useMemo(() => (Array.isArray(persistedRows) ? persistedRows : []).reduce((s, r) => s + Number(r.total_amount || 0), 0), [persistedRows]);

  // Use backend data if available, fallback to frontend calculation
  const incomeAllocation = useMemo(() => {
    // Prefer backend calculated data
    if (backendIncomeAllocation?.rows?.length > 0) {
      return backendIncomeAllocation;
    }
    
    // Fallback to frontend calculation
    let totalIncome = backendIncomeTotal || 0;
    if (totalIncome === 0) {
      if (!Array.isArray(selectedIncomeCategories) || selectedIncomeCategories.length === 0 || selectedIncomeCategories.length === (Array.isArray(incomeCategories) ? incomeCategories : []).length) {
        totalIncome = Number(incomeTotal?.invoiced || 0);
      } else {
        (Array.isArray(selectedIncomeCategories) ? selectedIncomeCategories : []).forEach(cat => {
          totalIncome += Number(incomeBreakdown?.byCategory?.[cat] || 0);
        });
      }
    }
    
    const totalDays = Number(allocation?.totals?.days || 0);
    const baseRows = Array.isArray(allocation?.rows) ? allocation.rows : [];

    const rows = baseRows.map((r) => ({
      ...r,
      incomeShare: totalDays > 0 ? (Number(totalIncome || 0) * Number(r.activeDays || 0)) / totalDays : 0,
    }));

    return {
      rows,
      totals: {
        days: totalDays,
        area: Number(allocation?.totals?.area || 0),
        areaDays: Number(allocation?.totals?.areaDays || 0),
        income: Number(totalIncome || 0),
      },
    };
  }, [allocation, incomeTotal, incomeBreakdown, selectedIncomeCategories, incomeCategories]);

  const incomeVsExpenseRows = useMemo(() => {
    const baseRows = Array.isArray(allocation?.rows) ? allocation.rows : [];
    const incomeRows = Array.isArray(incomeAllocation?.rows) ? incomeAllocation.rows : [];
    return baseRows.map((r) => {
      const unitRow = unitOutstandingById?.[r.unit_id];
      const outstanding = unitRow?.outstanding ?? (unitRow ? (Number(unitRow.total_billed || 0) - Number(unitRow.total_received || 0)) : 0);

      return {
        ...r,
        incomeShare: incomeRows.find((x) => x.unit_id === r.unit_id)?.incomeShare || 0,
        outstanding,
        received: unitRow?.total_received ?? 0,
        billed: unitRow?.total_billed ?? 0,
      };
    });
  }, [allocation, incomeAllocation, unitOutstandingById]);

  const incomeVsExpenseTotals = useMemo(() => {
    const income = Number(incomeTotal?.received || 0);
    const expense = Number(allocation?.totals?.expense || 0);
    return {
      income,
      expense,
      net: income - expense,
      invoiced: Number(incomeTotal?.invoiced || 0),
    };
  }, [incomeTotal, allocation?.totals?.expense]);

  // Calculate period range based on selection
  const getPeriodParams = () => {
    if (period === "custom" && customFromDate && customToDate) {
      const from = new Date(customFromDate);
      const to = new Date(customToDate);
      return {
        startMonth: from.getMonth() + 1,
        endMonth: to.getMonth() + 1,
        customYear: from.getFullYear(),
        customEndYear: to.getFullYear(),
        isCustom: true,
      };
    }

    let startMonth = month;
    let endMonth = month;
    
    switch (period) {
      case "quarterly": {
        // Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Oct-Dec
        const quarter = Math.ceil(month / 3);
        startMonth = (quarter - 1) * 3 + 1;
        endMonth = quarter * 3;
        break;
      }
      case "half-yearly": {
        // H1: Jan-Jun, H2: Jul-Dec
        const half = month <= 6 ? 1 : 2;
        startMonth = half === 1 ? 1 : 7;
        endMonth = half === 1 ? 6 : 12;
        break;
      }
      case "yearly":
        startMonth = 1;
        endMonth = 12;
        break;
      default: // monthly
        startMonth = month;
        endMonth = month;
    }
    
    return { startMonth, endMonth, isCustom: false };
  };

  const getPeriodDateRange = () => {
    if (period === "custom" && customFromDate && customToDate) {
      return { from_date: customFromDate, to_date: customToDate };
    }
    const { startMonth, endMonth } = getPeriodParams();
    const from = new Date(year, startMonth - 1, 1);
    const to = new Date(year, endMonth, 0);
    const toYMD = (d) => {
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${d.getFullYear()}-${mm}-${dd}`;
    };
    return { from_date: toYMD(from), to_date: toYMD(to) };
  };

  const periodLabel = useMemo(() => {
    if (period === "custom" && customFromDate && customToDate) {
      const fmtDate = (d) => {
        const dt = new Date(d);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${dt.getDate()} ${monthNames[dt.getMonth()]} ${dt.getFullYear()}`;
      };
      return `${fmtDate(customFromDate)} - ${fmtDate(customToDate)}`;
    }
    const { startMonth, endMonth } = getPeriodParams();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    if (startMonth === endMonth) {
      return `${monthNames[startMonth - 1]} ${year}`;
    }
    return `${monthNames[startMonth - 1]} - ${monthNames[endMonth - 1]} ${year}`;
  }, [period, month, year, customFromDate, customToDate]);

  const loadSettingsAndUnits = async () => {
    try {
      const [sRes, uRes, sitesRes] = await Promise.all([
        getCamSettings(),
        getUnitCamConfigs(),
        getSites(),
      ]);
      setSettings(sRes?.data?.data || sRes?.data || null);
      const unitConfigsData = uRes?.data?.data || uRes?.data || [];
      setUnitConfigs(Array.isArray(unitConfigsData) ? unitConfigsData : []);
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
      const { startMonth, endMonth, isCustom, customYear } = getPeriodParams();
      const effectiveYear = isCustom ? customYear : year;
      const params = { year: effectiveYear, month: startMonth };
      if (siteId) params.site_id = siteId;
      const res = await getCamBills(params);
      const rows = res?.data?.data || res?.data || [];
      const rowsArray = Array.isArray(rows) ? rows : [];

      // Unit names from backend allocation API (no /units/:id calls)
      let unitNameMap = {};
      if (siteId) {
        try {
          const allocRes = await calculateExpenseAllocation({
            year: effectiveYear,
            month: startMonth,
            end_month: endMonth,
            site_id: siteId,
          });
          const allocData = allocRes?.data?.data || allocRes?.data || {};
          unitNameMap = unitNameMapFromAllocationRows(allocData.rows || []);
        } catch (err) {
          console.error("Expense allocation for unit names failed:", err);
        }
      }

      const rowsWithNames = rowsArray.map((row) => {
        const unitName = unitNameMap[row.unit_id] || row.unit_name || row.flat_no || `Unit ${row.unit_id}`;
        return { ...row, flat_no: unitName, unit_name: unitName };
      });

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
  }, [year, month, siteId, period, customFromDate, customToDate]);

  useEffect(() => {
    // Single source: backend total endpoint for categories + total, then allocation with same categories
    const run = async () => {
      try {
        const { startMonth, endMonth, isCustom, customYear } = getPeriodParams();
        const effectiveYear = isCustom ? customYear : year;

        // Income summary from backend (for income total display only)
        let totalIncomeReceived = 0;
        let totalIncomeInvoiced = 0;
        if (siteId) {
          for (let m = startMonth; m <= endMonth; m++) {
            try {
              const incomeRes = await getCamIncomeExpenseSummary({ year: effectiveYear, month: m, project_id: siteId });
              totalIncomeReceived += Number(incomeRes?.data?.data?.receipts_total ?? incomeRes?.data?.data?.receiptsTotal ?? 0);
              totalIncomeInvoiced += Number(incomeRes?.data?.data?.bills_total ?? incomeRes?.data?.data?.billsTotal ?? 0);
            } catch (e) {
              console.error(e);
            }
          }
        }
        setIncomeTotal({ received: totalIncomeReceived, invoiced: totalIncomeInvoiced });

        if (!siteId) {
          setExpenseCategories([]);
          setAllocation({ rows: [], totals: { days: 0, area: 0, areaDays: 0, expense: 0, daysInMonth: 0 } });
          setBackendExpenseTotal(0);
          return;
        }

        // 1) Categories + total from backend (GET monthly_expenses/total)
        // Now supports year/month/end_month params and includes journal entry categories
        const totalRes = await calculateMonthlyExpenseTotal({
          year: effectiveYear,
          month: startMonth,
          end_month: endMonth,
          project_id: siteId,
        });
        const totalData = totalRes?.data || {};
        const backendTotal = Number(totalData.total || 0);
        const categoriesHash = totalData.categories || {};
        let categoriesFromBackend = Object.keys(categoriesHash).filter(Boolean).sort();

        // Fallback: if no categories for this site, try expense_by_category endpoint
        if (categoriesFromBackend.length === 0) {
          try {
            const catRes = await getExpenseByCategory({ 
              year: effectiveYear, 
              month: startMonth, 
              end_month: endMonth, 
              site_id: siteId 
            });
            const catData = catRes?.data?.data || {};
            categoriesFromBackend = Object.keys(catData).filter(Boolean).sort();
          } catch (e) {
            console.error(e);
          }
        }

        // Secondary fallback: get category names from index
        if (categoriesFromBackend.length === 0) {
          try {
            const indexRes = await getMonthlyExpenses({ year: effectiveYear, month: startMonth });
            const indexRows = indexRes?.data?.data || indexRes?.data || [];
            const set = new Set();
            (Array.isArray(indexRows) ? indexRows : []).forEach((row) => {
              if (row.category) set.add(row.category);
            });
            categoriesFromBackend = Array.from(set).sort();
          } catch (e) {
            console.error(e);
          }
        }

        setExpenseCategories(categoriesFromBackend);
        setBackendExpenseTotal(backendTotal);

        const currentSelected = Array.isArray(selectedExpenseCategories) ? selectedExpenseCategories : [];
        const validSelected = currentSelected.filter((c) => categoriesFromBackend.includes(c));
        if (validSelected.length === 0 && categoriesFromBackend.length > 0) {
          setSelectedExpenseCategories(categoriesFromBackend);
        } else if (validSelected.length !== currentSelected.length) {
          setSelectedExpenseCategories(validSelected.length > 0 ? validSelected : categoriesFromBackend);
        }

        // 2) Allocation from backend only (POST calculate_expense_allocation) with same categories
        const categoriesToUse =
          currentSelected.length > 0 && currentSelected.every((c) => categoriesFromBackend.includes(c))
            ? currentSelected
            : categoriesFromBackend;

        const allocRes = await calculateExpenseAllocation({
          year: effectiveYear,
          month: startMonth,
          end_month: endMonth,
          site_id: siteId,
          categories: categoriesToUse,
        });
        const allocData = allocRes?.data?.data || allocRes?.data || {};
        const rows = allocData.rows || [];
        const totals = allocData.totals || { days: 0, area: 0, areaDays: 0, expense: 0, daysInMonth: 0 };
        setAllocation({ rows: Array.isArray(rows) ? rows : [], totals });
      } catch (e) {
        console.error(e);
        setExpenseCategories([]);
        setAllocation({ rows: [], totals: { days: 0, area: 0, areaDays: 0, expense: 0, daysInMonth: 0 } });
        setBackendExpenseTotal(0);
        setIncomeTotal({ received: 0, invoiced: 0 });
      }
    };
    run();
  }, [year, month, period, selectedExpenseCategories, siteId, customFromDate, customToDate]);

  useEffect(() => {
    const run = async () => {
      try {
        if (!siteId) {
          setUnitOutstandingById({});
          return;
        }

        const { from_date, to_date } = getPeriodDateRange();
        const res = await getReconciliationReport({ from_date, to_date, site_id: siteId });
        const unitRows = res?.data?.unit_outstanding || [];
        const byId = {};
        (Array.isArray(unitRows) ? unitRows : []).forEach((u) => {
          if (!u?.unit_id) return;
          byId[u.unit_id] = u;
        });
        setUnitOutstandingById(byId);
      } catch (e) {
        console.error(e);
        setUnitOutstandingById({});
      }
    };
    run();
  }, [year, month, period, siteId, customFromDate, customToDate]);

  // Fetch detailed income data from multiple sources
  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const { from_date, to_date } = getPeriodDateRange();
        const { startMonth, endMonth, isCustom, customYear } = getPeriodParams();
        const effectiveYear = isCustom ? customYear : year;
        const params = { from_date, to_date };
        if (siteId) params.site_id = siteId;

        // Fetch income from multiple sources + backend categories
        const [incomeEntriesRes, invoicesRes, paymentsRes, incomeCatRes] = await Promise.allSettled([
          getIncomeEntries(params),
          getAccountingInvoices(),
          getAccountingPayments(),
          getIncomeByCategory({ 
            year: effectiveYear, 
            month: startMonth, 
            end_month: endMonth, 
            from_date, 
            to_date, 
            site_id: siteId 
          }),
        ]);

        const incomeEntries = incomeEntriesRes.status === 'fulfilled' 
          ? (incomeEntriesRes.value?.data?.data || incomeEntriesRes.value?.data || []) 
          : [];
        const invoices = invoicesRes.status === 'fulfilled' 
          ? (invoicesRes.value?.data?.data || invoicesRes.value?.data || []) 
          : [];
        const payments = paymentsRes.status === 'fulfilled' 
          ? (paymentsRes.value?.data?.data || paymentsRes.value?.data || []) 
          : [];
        const backendIncomeCategories = incomeCatRes.status === 'fulfilled'
          ? (incomeCatRes.value?.data?.data || {})
          : {};

        // Calculate income from different sources
        const incomeEntriesTotal = Array.isArray(incomeEntries)
          ? incomeEntries.reduce((sum, e) => sum + Number(e.amount || 0), 0)
          : 0;

        // Filter invoices for the period (paid/received)
        const periodStart = new Date(from_date);
        const periodEnd = new Date(to_date);
        const filteredInvoices = Array.isArray(invoices) 
          ? invoices.filter(inv => {
              const invDate = new Date(inv.invoice_date || inv.created_at);
              return invDate >= periodStart && invDate <= periodEnd;
            })
          : [];
        const invoicesTotal = filteredInvoices.reduce((sum, inv) => sum + Number(inv.total_amount || inv.amount || 0), 0);

        // Filter payments for the period
        const filteredPayments = Array.isArray(payments)
          ? payments.filter(pay => {
              const payDate = new Date(pay.payment_date || pay.created_at);
              return payDate >= periodStart && payDate <= periodEnd;
            })
          : [];
        const paymentsTotal = filteredPayments.reduce((sum, pay) => sum + Number(pay.amount || 0), 0);

        // Build categories - use backend categories as primary source, merge with frontend data
        const byCategory = {};

        // Add backend income categories first (includes journal entry credit lines by ledger name)
        if (typeof backendIncomeCategories === 'object' && backendIncomeCategories !== null) {
          Object.entries(backendIncomeCategories).forEach(([cat, amount]) => {
            if (cat) {
              byCategory[cat] = Number(amount || 0);
            }
          });
        }

        // Process income entries for categories (frontend supplement)
        if (Array.isArray(incomeEntries)) {
          incomeEntries.forEach(entry => {
            const cat = entry.source_type || entry.category || 'Other Income';
            if (!byCategory[cat]) {
              byCategory[cat] = (byCategory[cat] || 0) + Number(entry.amount || 0);
            }
          });
        }

        // Process invoices for categories (frontend supplement)
        if (Array.isArray(filteredInvoices)) {
          filteredInvoices.forEach(inv => {
            const cat = inv.invoice_type || inv.category || 'Invoices';
            if (!byCategory[cat]) {
              byCategory[cat] = (byCategory[cat] || 0) + Number(inv.total_amount || inv.amount || 0);
            }
          });
        }

        // Add payments as a category
        if (paymentsTotal > 0 && !byCategory['Payments Received']) {
          byCategory['Payments Received'] = paymentsTotal;
        }

        const newIncomeCategories = Object.keys(byCategory).filter(Boolean).sort();
        const safeIncomeCategories = Array.isArray(newIncomeCategories) ? newIncomeCategories : [];
        setIncomeCategories(safeIncomeCategories);
        
        // Initialize selected categories if empty or update with new categories
        if (selectedIncomeCategories.length === 0 && safeIncomeCategories.length > 0) {
          setSelectedIncomeCategories(safeIncomeCategories);
        } else {
          // Keep only valid selections
          const validSelected = selectedIncomeCategories.filter(c => safeIncomeCategories.includes(c));
          if (validSelected.length === 0 && safeIncomeCategories.length > 0) {
            setSelectedIncomeCategories(safeIncomeCategories);
          } else if (validSelected.length !== selectedIncomeCategories.length) {
            setSelectedIncomeCategories(validSelected.length > 0 ? validSelected : safeIncomeCategories);
          }
        }

        setIncomeBreakdown({
          invoices: invoicesTotal,
          payments: paymentsTotal,
          incomeEntries: incomeEntriesTotal,
          journalEntries: 0,
          byCategory,
          total: invoicesTotal + paymentsTotal + incomeEntriesTotal
        });

      } catch (e) {
        console.error('Failed to fetch income data:', e);
        setIncomeBreakdown({ invoices: 0, payments: 0, incomeEntries: 0, journalEntries: 0, byCategory: {}, total: 0 });
      }
    };

    fetchIncomeData();
  }, [year, month, period, siteId, customFromDate, customToDate]);

  // Fetch backend calculations for Income & Expense Reports
  useEffect(() => {
    const fetchBackendCalculations = async () => {
      setCalculationsLoading(true);
      try {
        const { from_date, to_date } = getPeriodDateRange();
        const { startMonth, endMonth, isCustom, customYear } = getPeriodParams();
        const effectiveYear = isCustom ? customYear : year;
        const safeExpenseCatsForParams = Array.isArray(selectedExpenseCategories) ? selectedExpenseCategories : [];
        const safeIncomeCatsForParams = Array.isArray(selectedIncomeCategories) ? selectedIncomeCategories : [];
        const baseParams = { 
          year: effectiveYear, 
          month: startMonth, 
          end_month: endMonth,
          from_date, 
          to_date,
          categories: overviewMode === 'expense' 
            ? safeExpenseCatsForParams.join(',') 
            : safeIncomeCatsForParams.join(',')
        };
        if (siteId) {
          baseParams.site_id = siteId;
          baseParams.project_id = siteId;
        }

        // Fetch totals from backend - pass selected categories for filtering
        const safeExpenseCats = Array.isArray(selectedExpenseCategories) ? selectedExpenseCategories : [];
        const safeIncomeCats = Array.isArray(selectedIncomeCategories) ? selectedIncomeCategories : [];
        const [expenseTotalRes, incomeTotalRes] = await Promise.allSettled([
          calculateMonthlyExpenseTotal({ 
            year: effectiveYear, 
            month: startMonth, 
            end_month: endMonth, 
            project_id: siteId,
            categories: safeExpenseCats.join(',')
          }),
          getMonthlyIncomeTotal({ 
            year: effectiveYear, 
            month: startMonth, 
            end_month: endMonth, 
            site_id: siteId,
            categories: safeIncomeCats.join(',')
          })
        ]);

        if (expenseTotalRes.status === 'fulfilled') {
          setBackendExpenseTotal(Number(expenseTotalRes.value?.data?.total || expenseTotalRes.value?.data?.data?.total || 0));
        }
        if (incomeTotalRes.status === 'fulfilled') {
          setBackendIncomeTotal(Number(incomeTotalRes.value?.data?.total || incomeTotalRes.value?.data?.data?.total || 0));
        }

        // Fetch allocation calculations based on mode
        // Expense allocation is already fetched in the main useEffect (single source) — skip duplicate API call
        if (overviewMode === 'income') {
          try {
            const incomeAllocRes = await calculateIncomeAllocation(baseParams);
            const allocData = incomeAllocRes?.data?.data || incomeAllocRes?.data || {};
            const incomeRows = allocData.rows || allocData.units || [];
            setBackendIncomeAllocation({
              rows: Array.isArray(incomeRows) ? incomeRows : [],
              totals: allocData.totals || { days: 0, income: 0 }
            });
          } catch (e) {
            console.error('Backend income allocation failed, using frontend:', e);
          }
        } else if (overviewMode === 'income_vs_expense') {
          try {
            const comparisonRes = await calculateIncomeVsExpense({
              ...baseParams,
              expense_categories: safeExpenseCats.join(','),
              income_categories: safeIncomeCats.join(',')
            });
            const compData = comparisonRes?.data?.data || comparisonRes?.data || {};
            const compRows = compData.rows || compData.units || [];
            setBackendIncomeVsExpense({
              rows: Array.isArray(compRows) ? compRows : [],
              totals: compData.totals || { income: 0, expense: 0, net: 0 }
            });
          } catch (e) {
            console.error('Backend income vs expense failed, using frontend:', e);
          }
        }

        // Fetch daily reports
        try {
          const [dailyIncomeRes, dailyExpenseRes] = await Promise.allSettled([
            getDailyIncomeReport({ ...baseParams, group_by: 'day' }),
            getDailyExpenseReport({ ...baseParams, group_by: 'day' })
          ]);
          
          if (dailyIncomeRes.status === 'fulfilled') {
            const incomeData = dailyIncomeRes.value?.data?.data || dailyIncomeRes.value?.data || [];
            setDailyIncomeData(Array.isArray(incomeData) ? incomeData : []);
          }
          if (dailyExpenseRes.status === 'fulfilled') {
            const expenseData = dailyExpenseRes.value?.data?.data || dailyExpenseRes.value?.data || [];
            setDailyExpenseData(Array.isArray(expenseData) ? expenseData : []);
          }
        } catch (e) {
          console.error('Daily reports failed:', e);
        }

        // Fetch unit-wise actual income (actual income received per unit)
        try {
          const unitIncomeRes = await getUnitWiseIncomeSummary({ ...baseParams });
          const rawUnitIncomeData = unitIncomeRes?.data?.data || unitIncomeRes?.data || [];
          const unitIncomeData = Array.isArray(rawUnitIncomeData) ? rawUnitIncomeData : [];
          const incomeByUnit = {};
          unitIncomeData.forEach(item => {
            if (item && item.unit_id != null) {
              incomeByUnit[item.unit_id] = item.amount || 0;
            }
          });
          setUnitWiseIncome(incomeByUnit);
        } catch (e) {
          console.error('Unit-wise income fetch failed:', e);
          setUnitWiseIncome({});
        }

      } catch (e) {
        console.error('Backend calculations failed:', e);
      } finally {
        setCalculationsLoading(false);
      }
    };
    fetchBackendCalculations();
  }, [year, month, period, siteId, overviewMode, selectedExpenseCategories, selectedIncomeCategories, customFromDate, customToDate]);

  const toggleExpenseCategory = (category) => {
    setSelectedExpenseCategories((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      if (safePrev.includes(category)) {
        return safePrev.filter((c) => c !== category);
      }
      return [...safePrev, category];
    });
  };

  const toggleIncomeCategory = (category) => {
    setSelectedIncomeCategories((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      if (safePrev.includes(category)) {
        return safePrev.filter((c) => c !== category);
      }
      return [...safePrev, category];
    });
  };

  const selectedExpenseLabel = useMemo(() => {
    const safeExpenseCategories = Array.isArray(expenseCategories) ? expenseCategories : [];
    const safeSelectedExpenseCategories = Array.isArray(selectedExpenseCategories) ? selectedExpenseCategories : [];
    if (safeExpenseCategories.length === 0) return "No expenses";
    if (safeSelectedExpenseCategories.length === 0 || safeSelectedExpenseCategories.length === safeExpenseCategories.length) {
      return "All expenses";
    }
    if (safeSelectedExpenseCategories.length === 1) {
      return safeSelectedExpenseCategories[0];
    }
    return `${safeSelectedExpenseCategories.length} selected`;
  }, [expenseCategories, selectedExpenseCategories]);

  const selectedIncomeLabel = useMemo(() => {
    const safeIncomeCategories = Array.isArray(incomeCategories) ? incomeCategories : [];
    const safeSelectedIncomeCategories = Array.isArray(selectedIncomeCategories) ? selectedIncomeCategories : [];
    if (safeIncomeCategories.length === 0) return "No income";
    if (safeSelectedIncomeCategories.length === 0 || safeSelectedIncomeCategories.length === safeIncomeCategories.length) {
      return "All income";
    }
    if (safeSelectedIncomeCategories.length === 1) {
      return safeSelectedIncomeCategories[0];
    }
    return `${safeSelectedIncomeCategories.length} selected`;
  }, [incomeCategories, selectedIncomeCategories]);

  // Calculate selected income total - prefer backend calculated values
  const selectedIncomeTotal = useMemo(() => {
    // Use backend total if available
    if (backendIncomeTotal > 0) {
      return backendIncomeTotal;
    }
    const safeSelectedIncomeCategories = Array.isArray(selectedIncomeCategories) ? selectedIncomeCategories : [];
    const safeIncomeCategories = Array.isArray(incomeCategories) ? incomeCategories : [];
    // Fallback to frontend calculation
    if (safeSelectedIncomeCategories.length === 0 || safeSelectedIncomeCategories.length === safeIncomeCategories.length) {
      return Number(incomeTotal?.invoiced || 0) + Number(incomeBreakdown?.total || 0);
    }
    let total = 0;
    safeSelectedIncomeCategories.forEach(cat => {
      total += Number(incomeBreakdown?.byCategory?.[cat] || 0);
    });
    return total;
  }, [selectedIncomeCategories, incomeCategories, incomeTotal, incomeBreakdown, backendIncomeTotal]);

  // Single source: allocation total from backend (matches unit allocation table)
  const selectedExpenseTotal = useMemo(() => {
    return Number(allocation?.totals?.expense ?? backendExpenseTotal ?? 0);
  }, [allocation?.totals?.expense, backendExpenseTotal]);

  const doPreview = async () => {
    setLoading(true);
    try {
      if (!siteId) {
        toast.error("Please select a Site");
        return;
      }
      if (period === "custom" && (!customFromDate || !customToDate)) {
        toast.error("Please select both From and To dates");
        return;
      }
      const { startMonth, endMonth, isCustom, customYear } = getPeriodParams();
      const effectiveYear = isCustom ? customYear : year;
      const res = await previewCamBills({ year: effectiveYear, month: startMonth, end_month: endMonth, site_id: siteId });
      const rows = res?.data?.data || res?.data || [];
      const rowsArray = Array.isArray(rows) ? rows : [];

      // Unit names from backend allocation (no /units/:id calls)
      let unitNameMap = {};
      try {
        const allocRes = await calculateExpenseAllocation({
          year: effectiveYear,
          month: startMonth,
          end_month: endMonth,
          site_id: siteId,
        });
        const allocData = allocRes?.data?.data || allocRes?.data || {};
        unitNameMap = unitNameMapFromAllocationRows(allocData.rows || []);
      } catch (err) {
        console.error("Expense allocation for unit names failed:", err);
      }

      const rowsWithNames = rowsArray.map((row) => {
        const unitName = unitNameMap[row.unit_id] || row.unit_name || row.flat_no || `Unit ${row.unit_id}`;
        return { ...row, flat_no: unitName, unit_name: unitName };
      });

      setPreviewRows(rowsWithNames);
      if (!rowsArray.length) toast("No billable units for selected period");
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
      if (period === "custom" && (!customFromDate || !customToDate)) {
        toast.error("Please select both From and To dates");
        return;
      }
      const { startMonth, endMonth, isCustom, customYear } = getPeriodParams();
      const effectiveYear = isCustom ? customYear : year;
      const res = await generateCamBills({ year: effectiveYear, month: startMonth, end_month: endMonth, site_id: siteId });
      const rows = res?.data?.data || res?.data || [];
      const rowsArray = Array.isArray(rows) ? rows : [];

      // Unit names from backend allocation (no /units/:id calls)
      let unitNameMap = {};
      try {
        const allocRes = await calculateExpenseAllocation({
          year: effectiveYear,
          month: startMonth,
          end_month: endMonth,
          site_id: siteId,
        });
        const allocData = allocRes?.data?.data || allocRes?.data || {};
        unitNameMap = unitNameMapFromAllocationRows(allocData.rows || []);
      } catch (err) {
        console.error("Expense allocation for unit names failed:", err);
      }

      const rowsWithNames = rowsArray.map((row) => {
        const unitName = unitNameMap[row.unit_id] || row.unit_name || row.flat_no || `Unit ${row.unit_id}`;
        return { ...row, flat_no: unitName, unit_name: unitName };
      });

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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Accounting Bills - Income & Expense Reports</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site</label>
            <select
              value={siteId}
              onChange={(e) => setSiteId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select site</option>
              {Array.isArray(sites) && sites.map((s) => {
                const id = s?.id || s?.site_id || s?.value;
                const name = s?.name || s?.site_name || s?.label || `Site ${id}`;
                return (
                  <option key={id} value={id}>{name}</option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={overviewMode}
              onChange={(e) => setOverviewMode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="expense">Expense Report</option>
              <option value="income">Income Report</option>
              <option value="income_vs_expense">Income vs Expense</option>
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
              <option value="custom">Custom Date Range</option>
            </select>
          </div>
          {period !== "custom" ? (
            <>
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
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                <input 
                  type="date" 
                  value={customFromDate}
                  onChange={(e) => setCustomFromDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                <input 
                  type="date" 
                  value={customToDate}
                  onChange={(e) => setCustomToDate(e.target.value)}
                  min={customFromDate}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </>
          )}
        </div>

        {/* Category Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Expense Categories - show when expense or income_vs_expense mode */}
          {(overviewMode === "expense" || overviewMode === "income_vs_expense") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Expense Categories
                </span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => { setShowExpenseDropdown((prev) => !prev); setShowIncomeDropdown(false); }}
                  className="w-full flex items-center justify-between px-3 py-2 border border-red-300 rounded-md bg-red-50 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <span className="text-gray-700 truncate mr-2">{selectedExpenseLabel}</span>
                  <span className="text-gray-500 text-xs">▼</span>
                </button>
                {showExpenseDropdown && (
                  <div className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg text-sm">
                    {(!Array.isArray(expenseCategories) || expenseCategories.length === 0) && (
                      <div className="px-3 py-2 text-gray-400 text-xs">No expenses for this period</div>
                    )}
                    {Array.isArray(expenseCategories) && expenseCategories.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 px-3 py-1 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-red-600 border-gray-300 rounded"
                          checked={selectedExpenseCategories.includes(cat)}
                          onChange={() => toggleExpenseCategory(cat)}
                        />
                        <span className="text-gray-700">{cat}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Income Categories - show when income or income_vs_expense mode */}
          {(overviewMode === "income" || overviewMode === "income_vs_expense") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Income Categories
                </span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => { setShowIncomeDropdown((prev) => !prev); setShowExpenseDropdown(false); }}
                  className="w-full flex items-center justify-between px-3 py-2 border border-green-300 rounded-md bg-green-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <span className="text-gray-700 truncate mr-2">{selectedIncomeLabel}</span>
                  <span className="text-gray-500 text-xs">▼</span>
                </button>
                {showIncomeDropdown && (
                  <div className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg text-sm">
                    {(!Array.isArray(incomeCategories) || incomeCategories.length === 0) && (
                      <div className="px-3 py-2 text-gray-400 text-xs">No income data for this period</div>
                    )}
                    {Array.isArray(incomeCategories) && incomeCategories.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 px-3 py-1 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-green-600 border-gray-300 rounded"
                          checked={selectedIncomeCategories.includes(cat)}
                          onChange={() => toggleIncomeCategory(cat)}
                        />
                        <span className="text-gray-700">{cat}</span>
                        {incomeBreakdown?.byCategory?.[cat] > 0 && (
                          <span className="ml-auto text-xs text-green-600">
                            ₹{Number(incomeBreakdown.byCategory[cat]).toLocaleString('en-IN')}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period Range</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-blue-50 text-sm font-medium text-blue-900">
              {periodLabel}
            </div>
          </div>

          <div className="flex items-end gap-3">
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Expense Summary Card */}
          <div className={`p-4 rounded-lg border-2 ${overviewMode === "expense" ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"} relative`}>
            {calculationsLoading && <div className="absolute top-2 right-2 w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>}
            <div className="flex items-center justify-between">
              <div>
                {/* <p className="text-sm text-gray-600">Total Expenses {backendExpenseTotal > 0 && <span className="text-xs text-blue-500">(Backend)</span>}</p> */}
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">
                  ₹{Number(selectedExpenseTotal || allocation?.totals?.expense || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-xl">📉</span>
              </div>
            </div>
            {/* <p className="text-xs text-gray-500 mt-2">
              {expenseCategories.length === 0 
                ? "No expenses for this period" 
                : selectedExpenseCategories.length === 0 || selectedExpenseCategories.length === expenseCategories.length 
                  ? `All categories (${expenseCategories.length})` 
                  : `${selectedExpenseCategories.length} of ${expenseCategories.length} categories`}
            </p> */}
          </div>

          {/* Income Summary Card */}
          <div className={`p-4 rounded-lg border-2 ${overviewMode === "income" ? "border-green-500 bg-green-50" : "border-gray-200 bg-gray-50"} relative`}>
            {calculationsLoading && <div className="absolute top-2 right-2 w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>}
            <div className="flex items-center justify-between">
              <div>
                {/* <p className="text-sm text-gray-600">Total Income {backendIncomeTotal > 0 && <span className="text-xs text-blue-500">(Backend)</span>}</p> */}
                <p className="text-sm text-gray-600">Total Income </p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{Number(selectedIncomeTotal || incomeTotal?.invoiced || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">📈</span>
              </div>
            </div>
            {/* <p className="text-xs text-gray-500 mt-2">
              {selectedIncomeCategories.length === incomeCategories.length ? "All categories" : `${selectedIncomeCategories.length} categories`}
              {incomeTotal?.received > 0 && (
                <span className="ml-2">| Received: ₹{Number(incomeTotal.received).toLocaleString('en-IN')}</span>
              )}
            </p> */}
          </div>

          {/* Net Summary Card */}
          <div className={`p-4 rounded-lg border-2 ${overviewMode === "income_vs_expense" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-gray-50"} relative`}>
            {calculationsLoading && <div className="absolute top-2 right-2 w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Net (Income - Expense)</p>
                <p className={`text-2xl font-bold ${(selectedIncomeTotal - selectedExpenseTotal) >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ₹{Number((selectedIncomeTotal || 0) - (selectedExpenseTotal || 0)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${(selectedIncomeTotal - selectedExpenseTotal) >= 0 ? "bg-green-100" : "bg-red-100"}`}>
                <span className="text-xl">{(selectedIncomeTotal - selectedExpenseTotal) >= 0 ? "✓" : "⚠"}</span>
              </div>
            </div>
            {/* <p className="text-xs text-gray-500 mt-2">
              {(selectedIncomeTotal - selectedExpenseTotal) >= 0 ? "Surplus" : "Deficit"} for {periodLabel}
            </p> */}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Overview Table (Expense / Income / Income vs Expense) */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div
            className={
              overviewMode === "expense"
                ? "bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 rounded-t-lg"
                : overviewMode === "income"
                  ? "bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 rounded-t-lg"
                  : "bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4 rounded-t-lg"
            }
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                {overviewMode === "expense"
                  ? "Expense Report - Unit Allocation"
                  : overviewMode === "income"
                    ? "Income Report - Unit Allocation"
                    : "Income vs Expense Comparison"}
                {calculationsLoading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
              </h2>
              {overviewMode === "expense" && (
                <div className="text-sm text-white bg-red-700 px-4 py-1 rounded-full">
                  {selectedExpenseCategories.length === 0 || selectedExpenseCategories.length === expenseCategories.length
                    ? "Total Expense"
                    : "Selected Categories"}
                  :{" "}
                  <span className="font-bold">₹{Number(selectedExpenseTotal || allocation?.totals?.expense || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              )}
              {overviewMode === "income" && (
                <div className="text-sm text-white bg-green-700 px-4 py-1 rounded-full">
                  {selectedIncomeCategories.length === 0 || selectedIncomeCategories.length === incomeCategories.length
                    ? "Total Income"
                    : "Selected Categories"}
                  :{" "}
                  <span className="font-bold">₹{Number(selectedIncomeTotal || incomeTotal?.invoiced || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              )}
              {overviewMode === "income_vs_expense" && (
                <div className="text-sm text-white bg-indigo-700 px-4 py-1 rounded-full">
                  Income: <span className="font-bold">₹{Number(selectedIncomeTotal).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className="mx-2">|</span>
                  Expense: <span className="font-bold">₹{Number(selectedExpenseTotal).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className="mx-2">|</span>
                  Net: <span className="font-bold">₹{Number(selectedIncomeTotal - selectedExpenseTotal).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              )}
            </div>
            {overviewMode !== "expense" && (
              <div className="mt-1 text-xs text-white/90">
                Receipts (Income Received) total for period: ₹{Number(incomeTotal?.received || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            )}
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
                    {overviewMode === "expense" && (
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Expense (Days)</th>
                    )}
                    {overviewMode === "income" && (
                      <>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Income (Allocated)</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider bg-green-50">Actual Received</th>
                      </>
                    )}
                    {overviewMode === "income_vs_expense" && (
                      <>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Expense (Days)</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Income (Allocated)</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider bg-green-50">Actual Received</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider bg-red-50">Outstanding</th>
                      </>
                    )}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {overviewMode === "expense" && Array.isArray(allocation?.rows) && allocation.rows.map((r, idx) => (
                    <tr key={r.unit_id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {r.flat || r.unit_name || `Unit ${r.unit_id}`}
                        <span className="ml-2 text-xs text-gray-500">#{r.unit_id}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{r.activeDays}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{Number(r.area || 0)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{Number(r.areaDays || 0)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">₹{Number(r.daysShare || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                    </tr>
                  ))}

                  {overviewMode === "income" && Array.isArray(incomeAllocation?.rows) && incomeAllocation.rows.map((r, idx) => (
                    <tr key={r.unit_id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {r.flat || r.unit_name || `Unit ${r.unit_id}`}
                        <span className="ml-2 text-xs text-gray-500">#{r.unit_id}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{r.activeDays}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{Number(r.area || 0)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{Number(r.areaDays || 0)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">₹{Number(r.incomeShare || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-700 bg-green-50">
                        ₹{Number(unitWiseIncome[r.unit_id] || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                  ))}

                  {overviewMode === "income_vs_expense" && Array.isArray(incomeVsExpenseRows) && incomeVsExpenseRows.map((r, idx) => (
                    <tr key={r.unit_id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {r.flat || r.unit_name || `Unit ${r.unit_id}`}
                        <span className="ml-2 text-xs text-gray-500">#{r.unit_id}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{r.activeDays}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{Number(r.area || 0)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{Number(r.areaDays || 0)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">₹{Number(r.daysShare || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">₹{Number(r.incomeShare || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-700 bg-green-50">
                        ₹{Number(unitWiseIncome[r.unit_id] || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-red-700 bg-red-50">
                        ₹{Number((r.daysShare || 0) - (unitWiseIncome[r.unit_id] || 0)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot className={overviewMode === "expense" ? "bg-red-50 border-t-2 border-red-200" : overviewMode === "income" ? "bg-green-50 border-t-2 border-green-200" : "bg-indigo-50 border-t-2 border-indigo-200"}>
                  <tr>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">Totals</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">{allocation?.totals?.days || 0}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">{allocation?.totals?.area || 0}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">{allocation?.totals?.areaDays || 0}</td>
                    {overviewMode === "expense" && (
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">₹{Number(selectedExpenseTotal || allocation?.totals?.expense || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    )}
                    {overviewMode === "income" && (
                      <>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">₹{Number(selectedIncomeTotal || incomeTotal?.invoiced || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="px-4 py-3 text-sm font-bold text-green-700 bg-green-100">
                          ₹{Object.values(unitWiseIncome).reduce((sum, val) => sum + Number(val || 0), 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </>
                    )}
                    {overviewMode === "income_vs_expense" && (
                      <>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">₹{Number(selectedExpenseTotal || allocation?.totals?.expense || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">₹{Number(selectedIncomeTotal || incomeTotal?.received || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="px-4 py-3 text-sm font-bold text-green-700 bg-green-100">
                          ₹{Object.values(unitWiseIncome).reduce((sum, val) => sum + Number(val || 0), 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-red-700 bg-red-100">
                          ₹{(Number(selectedExpenseTotal || allocation?.totals?.expense || 0) - Object.values(unitWiseIncome).reduce((sum, val) => sum + Number(val || 0), 0)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </>
                    )}
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="mt-3 text-xs text-gray-500 italic bg-yellow-50 p-2 rounded border-l-4 border-yellow-400">
              * Rounding per row may cause ±1 difference vs total.
            </div>
          </div>
        </div>

        {/* Preview and Persisted - Toggle View */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          {/* Toggle Header */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-white">CAM Bills</h2>
                {/* Toggle Slider */}
                <div className="flex items-center bg-gray-600 rounded-full p-1">
                  <button
                    onClick={() => setBillsViewMode("preview")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      billsViewMode === "preview"
                        ? "bg-green-500 text-white shadow-md"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Preview ({previewRows.length})
                  </button>
                  <button
                    onClick={() => setBillsViewMode("persisted")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      billsViewMode === "persisted"
                        ? "bg-purple-500 text-white shadow-md"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Generated ({persistedRows.length})
                  </button>
                </div>
              </div>
              <div className={`text-sm text-white px-4 py-1 rounded-full ${billsViewMode === "preview" ? "bg-green-600" : "bg-purple-600"}`}>
                Total: <span className="font-bold">
                  ₹{(billsViewMode === "preview" ? totalPreview : totalPersisted).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            {/* GST Rate Display */}
            {settings?.gst_rate_percent > 0 && (
              <div className="mt-2 text-xs text-gray-300">
                GST Rate: {settings.gst_rate_percent}% | Rate per sqft: ₹{settings?.rate_per_sqft || 0}
              </div>
            )}
          </div>
          
          <div className="p-6">
            {/* Info Banner */}
            <div className={`mb-4 p-3 rounded-lg text-sm ${billsViewMode === "preview" ? "bg-green-50 border border-green-200" : "bg-purple-50 border border-purple-200"}`}>
              <div className="flex items-center gap-2">
                <span className={billsViewMode === "preview" ? "text-green-600" : "text-purple-600"}>ℹ️</span>
                <span className={billsViewMode === "preview" ? "text-green-700" : "text-purple-700"}>
                  {billsViewMode === "preview" 
                    ? "Preview shows calculated bills (not saved). Click 'Generate' to save." 
                    : "Generated shows saved bills from database."}
                </span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Unit</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Area (sqft)</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Days</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Base Amount</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">GST ({settings?.gst_rate_percent || 0}%)</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(billsViewMode === "preview" ? previewRows : persistedRows).length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-3 py-8 text-center text-gray-500">
                        {billsViewMode === "preview" 
                          ? "Click 'Preview' to calculate bills for this period" 
                          : "No generated bills for this period"}
                      </td>
                    </tr>
                  ) : (
                    (billsViewMode === "preview" ? previewRows : persistedRows).map((r, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {r.flat_no || r.unit_name || r.flat || `Unit ${r.unit_id}`}
                          <span className="ml-2 text-xs text-gray-500">#{r.unit_id}</span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">{Number(r.carpet_area_sqft || 0).toFixed(2)}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">{Number(r.active_days || 0)}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">₹{Number(r.base_amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">₹{Number(r.gst_amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className={`px-3 py-2 whitespace-nowrap text-sm font-medium ${billsViewMode === "preview" ? "text-green-700" : "text-purple-700"}`}>
                          ₹{Number(r.total_amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {(billsViewMode === "preview" ? previewRows : persistedRows).length > 0 && (
                  <tfoot className={billsViewMode === "preview" ? "bg-green-50 border-t-2 border-green-200" : "bg-purple-50 border-t-2 border-purple-200"}>
                    <tr>
                      <td className="px-3 py-2 text-sm font-bold text-gray-900">Total</td>
                      <td className="px-3 py-2 text-sm font-bold text-gray-900">
                        {(billsViewMode === "preview" ? previewRows : persistedRows).reduce((s, r) => s + Number(r.carpet_area_sqft || 0), 0).toFixed(2)}
                      </td>
                      <td className="px-3 py-2 text-sm font-bold text-gray-900">-</td>
                      <td className="px-3 py-2 text-sm font-bold text-gray-900">
                        ₹{(billsViewMode === "preview" ? previewRows : persistedRows).reduce((s, r) => s + Number(r.base_amount || 0), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-3 py-2 text-sm font-bold text-gray-900">
                        ₹{(billsViewMode === "preview" ? previewRows : persistedRows).reduce((s, r) => s + Number(r.gst_amount || 0), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className={`px-3 py-2 text-sm font-bold ${billsViewMode === "preview" ? "text-green-700" : "text-purple-700"}`}>
                        ₹{(billsViewMode === "preview" ? totalPreview : totalPersisted).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAMBills;
