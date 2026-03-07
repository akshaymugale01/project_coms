import React, { useState, useEffect, act } from "react";
import { toast } from "react-hot-toast";
import {
  getTrialBalance,
  getBalanceSheet,
  getProfitAndLoss,
  getLedgerStatement,
  getUnitStatement,
  getUnitStatementDetailed,
  getUnitCamStatement,
  getReceivablesSummary,
  downloadExpensesMIS,
  downloadIncomeMIS,
  downloadIndividualMIS,
  importExpensesMIS,
  importIncomeMIS,
  getLedgers,
  importIndividualMIS,
  exportCamStatementPdf,
} from "../../api/accountingApi";
import { getAllUnits } from "../../api/index";
import Navbar from "../../components/Navbar";
import FileInput from "../../Buttons/FileInput";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

const AccountingReports = () => {
  const [activeReport, setActiveReport] = useState("trial_balance");
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [misBusy, setMisBusy] = useState(false);
  const [expensesMisFile, setExpensesMisFile] = useState(null);
  const [incomeMisFile, setIncomeMisFile] = useState(null);
  const [individualMisFile, setIndividualMisFile] = useState(null);
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: new Date().toISOString().split('T')[0],
    ledger_id: "",
    unit_id: "",
  });
  const [filterDownloadMis, setFilterDownloadMis] = useState({
    mis_type: "",
    start_date: "",
    end_date: new Date().toISOString().split('T')[0],
  });
  const [individualMisFilters, setIndividualMisFilters] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  console.log("filters", filters?.unit_id);
  const [units, setUnits] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [filteredLedgers, setFilteredLedgers] = useState([]);

  // Fetch units and ledgers on mount
  useEffect(() => {
    fetchUnits();
    fetchLedgers();
  }, []);

  console.log("ledgers", ledgers);

  // Filter ledgers when unit changes
  useEffect(() => {
    if (filters.unit_id) {
      const filtered = ledgers.filter(
        (ledger) => String(ledger?.unit?.id) === String(filters.unit_id)
      );
      setFilteredLedgers(filtered);
      // Reset ledger selection if current selection is not in filtered list
      if (filters.ledger_id && !filtered.find(l => String(l.id) === String(filters.ledger_id))) {
        setFilters(prev => ({ ...prev, ledger_id: "" }));
      }
    } else {
      setFilteredLedgers(ledgers);
    }
  }, [filters.unit_id, ledgers]);

  const fetchUnits = async () => {
    try {
      const response = await getAllUnits();
      setUnits(response.data.data || response.data || []);
    } catch (error) {
      console.error("Failed to fetch units", error);
    }
  };

  const fetchLedgers = async () => {
    try {
      const response = await getLedgers();
      const ledgerData = response.data.data || response.data || [];
      setLedgers(ledgerData);
      setFilteredLedgers(ledgerData);
    } catch (error) {
      console.error("Failed to fetch ledgers", error);
    }
  };

  const reportTypes = [
    { id: "trial_balance", name: "Trial Balance", icon: "📊" },
    { id: "balance_sheet", name: "Balance Sheet", icon: "📈" },
    { id: "profit_and_loss", name: "Profit & Loss", icon: "💰" },
    { id: "ledger_statement", name: "Ledger Statement", icon: "📝" },
    { id: "unit_statement", name: "Unit Statement", icon: "🏢" },
    { id: "receivables_summary", name: "Receivables Summary", icon: "💳" },
    { id: "accounting_statements", name: "Accounting Statements (MIS)", icon: "📁" },
  ];
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleMisTypeChange = (e) => {
    const { name, value } = e.target;
    setFilterDownloadMis(prev => ({ ...prev, [name]: value }));
  }

  // const downloadReport = () => {
  //   if (!filters.start_date) {
  //     toast.error("Please select start date");
  //     return;
  //   }

  //   if (!filters.end_date) {
  //     toast.error("Please select end date");
  //   }
  //   setLoading(true);
  //   setReportData(null);

  // }

  const generateReport = async () => {
    if (!filters.start_date) {
      toast.error("Please select start date");
      return;
    }

    if (!filters.end_date) {
      toast.error("Please select end date");
      return;
    }

    // For MIS reports, trigger download instead of generating report
    if (activeReport === "accounting_statements") {
      if (!filterDownloadMis.mis_type) {
        toast.error("Please select MIS type");
        return;
      }
      handleMisDownload(filterDownloadMis.mis_type);
      return;
    }

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
          response = await getUnitCamStatement(params);
          break;
        case "receivables_summary":
          response = await getReceivablesSummary(params);
          break;
        default:
          throw new Error("Invalid report type");
      }
      const responseData = response?.data || {};
      const normalizedData =
        activeReport === "unit_statement"
          ? (responseData?.data || responseData)
          : responseData;
      console.log("response data.....", responseData);
      setReportData(normalizedData);
      toast.success("Report generated successfully");
    } catch (error) {
      toast.error("Failed to generate report");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getMisParams = (kind) => {
    if (kind === "individual") {
      return {
        year: individualMisFilters.year,
        month: individualMisFilters.month,
      };
    }
    return {
      start_date: filters.start_date,
      end_date: filters.end_date,
    };
  };

  const extractFilename = (contentDisposition, fallbackName) => {
    if (!contentDisposition) return fallbackName;

    const match = contentDisposition.match(/filename\*?=([^;]+)/i);
    if (!match) return fallbackName;

    let value = match[1].trim();
    value = value.replace(/^UTF-8''/i, "");
    value = value.replace(/^"|"$/g, "");
    try {
      return decodeURIComponent(value);
    } catch (_) {
      return value;
    }
  };

  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const getUnitLabel = (unitName) => {
    const normalized = unitName == null ? "" : String(unitName).trim();
    return normalized || "Organization-wide";
  };

  const exportTrialBalanceSheet = () => {
    if (activeReport !== "trial_balance" || !reportData) {
      toast.error("Generate trial balance first");
      return;
    }

    const reportRows = Array.isArray(reportData.report_data) ? reportData.report_data : [];
    const totals = reportData.totals || {};

    const dynamicKeys = Array.from(
      reportRows.reduce((acc, row) => {
        Object.keys(row || {}).forEach((key) => acc.add(key));
        return acc;
      }, new Set())
    );

    const preferredKeys = ["ledger_name", "unit_name", "side", "balance"];
    const extraKeys = dynamicKeys.filter((key) => !preferredKeys.includes(key));
    const detailHeaders = ["Ledger Name", "Unit Name", "Side", "Balance", "Debit", "Credit", ...extraKeys.map((key) => key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))];

    const selectedUnitName = filters.unit_id
      ? units.find((u) => String(u.id) === String(filters.unit_id))?.name
      : "";

    const detailRows = reportRows.map((row) => {
      const side = String(row?.side || "").toLowerCase();
      const balance = parseFloat(row?.balance || 0);
      const debit = side === "debit" ? balance.toFixed(2) : "0.00";
      const credit = side === "credit" ? balance.toFixed(2) : "0.00";

      return [
        row?.ledger_name || "-",
        getUnitLabel(row?.unit_name),
        row?.side || "-",
        balance.toFixed(2),
        debit,
        credit,
        ...extraKeys.map((key) => {
          const value = row?.[key];
          if (value === null || value === undefined) return "";
          if (typeof value === "object") return JSON.stringify(value);
          return value;
        }),
      ];
    });

    const sheetData = [
      ["Trial Balance Report"],
      [],
      ["From Date", filters.start_date || reportData.from_date || "-"],
      ["To Date", filters.end_date || reportData.to_date || "-"],
      ["Unit", getUnitLabel(selectedUnitName)],
      ["Total Debit", parseFloat(totals.total_debit || 0).toFixed(2)],
      ["Total Credit", parseFloat(totals.total_credit || 0).toFixed(2)],
      [],
      detailHeaders,
      ...detailRows,
    ];

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();

    const columnCount = detailHeaders.length;
    const cols = detailHeaders.map((header, colIdx) => {
      const maxLen = Math.max(
        String(header).length,
        ...detailRows.map((row) => String(row[colIdx] ?? "").length)
      );
      return { wch: Math.min(Math.max(maxLen + 2, 14), 40) };
    });
    ws["!cols"] = cols;
    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: Math.max(columnCount - 1, 1) } }];
    ws["!autofilter"] = {
      ref: `A9:${XLSX.utils.encode_col(Math.max(columnCount - 1, 0))}9`,
    };

    XLSX.utils.book_append_sheet(wb, ws, "Trial Balance");
    const filename = `trial_balance_${filters.start_date || "from"}_${filters.end_date || "to"}.xlsx`;
    XLSX.writeFile(wb, filename);
    toast.success("Trial balance exported as XLSX");
  };

  const exportBalanceSheet = () => {
    if (activeReport !== "balance_sheet" || !reportData) {
      toast.error("Generate balance sheet first");
      return;
    }

    const liabilities = Array.isArray(reportData.liabilities) ? reportData.liabilities : [];
    const assets = Array.isArray(reportData.assets) ? reportData.assets : [];

    const liabilityExtraKeys = Array.from(
      liabilities.reduce((acc, row) => {
        Object.keys(row || {}).forEach((key) => acc.add(key));
        return acc;
      }, new Set())
    ).filter((key) => !["group_name", "group_code", "balance"].includes(key));

    const assetExtraKeys = Array.from(
      assets.reduce((acc, row) => {
        Object.keys(row || {}).forEach((key) => acc.add(key));
        return acc;
      }, new Set())
    ).filter((key) => !["group_name", "group_code", "balance"].includes(key));

    const liabilityHeaders = [
      "Group Name",
      "Group Code",
      "Balance",
      ...liabilityExtraKeys.map((key) =>
        key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      ),
    ];
    const assetHeaders = [
      "Group Name",
      "Group Code",
      "Balance",
      ...assetExtraKeys.map((key) =>
        key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      ),
    ];

    const selectedUnitName = filters.unit_id
      ? units.find((u) => String(u.id) === String(filters.unit_id))?.name
      : "";

    const liabilityRows = liabilities.map((item) => [
      item.group_name || "-",
      item.group_code || "-",
      parseFloat(item.balance || 0).toFixed(2),
      ...liabilityExtraKeys.map((key) => {
        const value = item?.[key];
        if (value === null || value === undefined) return "";
        if (typeof value === "object") return JSON.stringify(value);
        return value;
      }),
    ]);

    const assetRows = assets.map((item) => [
      item.group_name || "-",
      item.group_code || "-",
      parseFloat(item.balance || 0).toFixed(2),
      ...assetExtraKeys.map((key) => {
        const value = item?.[key];
        if (value === null || value === undefined) return "";
        if (typeof value === "object") return JSON.stringify(value);
        return value;
      }),
    ]);

    const sheetData = [
      ["Balance Sheet Report"],
      [],
      ["From Date", filters.start_date || reportData.from_date || "-"],
      ["To Date", filters.end_date || reportData.to_date || "-"],
      ["Unit", getUnitLabel(selectedUnitName)],
      ["Total Liabilities & Equity", parseFloat(reportData.total_liabilities || 0).toFixed(2)],
      ["Total Assets", parseFloat(reportData.total_assets || 0).toFixed(2)],
      [],
      ["Liabilities & Equity"],
      liabilityHeaders,
      ...liabilityRows,
      ["Total Liabilities & Equity", "", parseFloat(reportData.total_liabilities || 0).toFixed(2)],
      [],
      ["Assets"],
      assetHeaders,
      ...assetRows,
      ["Total Assets", "", parseFloat(reportData.total_assets || 0).toFixed(2)],
    ];

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();

    const maxCols = Math.max(liabilityHeaders.length, assetHeaders.length, 3);
    const allDataRows = [...liabilityRows, ...assetRows];
    ws["!cols"] = Array.from({ length: maxCols }, (_, colIdx) => {
      const maxLen = Math.max(
        colIdx < liabilityHeaders.length ? String(liabilityHeaders[colIdx]).length : 0,
        colIdx < assetHeaders.length ? String(assetHeaders[colIdx]).length : 0,
        ...allDataRows.map((row) => String(row[colIdx] ?? "").length)
      );
      return { wch: Math.min(Math.max(maxLen + 2, 14), 40) };
    });

    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: maxCols - 1 } },
      { s: { r: 8, c: 0 }, e: { r: 8, c: maxCols - 1 } },
      { s: { r: 13 + liabilityRows.length, c: 0 }, e: { r: 13 + liabilityRows.length, c: maxCols - 1 } },
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Balance Sheet");
    const filename = `balance_sheet_${filters.start_date || "from"}_${filters.end_date || "to"}.xlsx`;
    XLSX.writeFile(wb, filename);
    toast.success("Balance sheet exported as XLSX");
  };

  const exportProfitAndLoss = () => {
    if (activeReport !== "profit_and_loss" || !reportData) {
      toast.error("Generate profit & loss first");
      return;
    }

    const income = Array.isArray(reportData.income) ? reportData.income : [];
    const expenses = Array.isArray(reportData.expenses) ? reportData.expenses : [];

    const incomeExtraKeys = Array.from(
      income.reduce((acc, row) => {
        Object.keys(row || {}).forEach((key) => acc.add(key));
        return acc;
      }, new Set())
    ).filter((key) => !["group_name", "group_code", "balance"].includes(key));

    const expenseExtraKeys = Array.from(
      expenses.reduce((acc, row) => {
        Object.keys(row || {}).forEach((key) => acc.add(key));
        return acc;
      }, new Set())
    ).filter((key) => !["group_name", "group_code", "balance"].includes(key));

    const incomeHeaders = [
      "Group Name",
      "Group Code",
      "Amount",
      ...incomeExtraKeys.map((key) =>
        key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      ),
    ];
    const expenseHeaders = [
      "Group Name",
      "Group Code",
      "Amount",
      ...expenseExtraKeys.map((key) =>
        key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      ),
    ];

    const selectedUnitName = filters.unit_id
      ? units.find((u) => String(u.id) === String(filters.unit_id))?.name
      : "";

    const incomeRows = income.map((item) => [
      item.group_name || "-",
      item.group_code || "-",
      parseFloat(item.balance || 0).toFixed(2),
      ...incomeExtraKeys.map((key) => {
        const value = item?.[key];
        if (value === null || value === undefined) return "";
        if (typeof value === "object") return JSON.stringify(value);
        return value;
      }),
    ]);

    const expenseRows = expenses.map((item) => [
      item.group_name || "-",
      item.group_code || "-",
      parseFloat(item.balance || 0).toFixed(2),
      ...expenseExtraKeys.map((key) => {
        const value = item?.[key];
        if (value === null || value === undefined) return "";
        if (typeof value === "object") return JSON.stringify(value);
        return value;
      }),
    ]);

    const sheetData = [
      ["Profit & Loss Report"],
      [],
      ["From Date", filters.start_date || reportData.from_date || "-"],
      ["To Date", filters.end_date || reportData.to_date || "-"],
      ["Unit", getUnitLabel(selectedUnitName)],
      ["Total Revenue", parseFloat(reportData.total_income || 0).toFixed(2)],
      ["Total Expenses", parseFloat(reportData.total_expenses || 0).toFixed(2)],
      ["Net Profit/Loss", parseFloat(reportData.net_profit || 0).toFixed(2)],
      [],
      ["Revenue"],
      incomeHeaders,
      ...incomeRows,
      ["Total Revenue", "", parseFloat(reportData.total_income || 0).toFixed(2)],
      [],
      ["Expenses"],
      expenseHeaders,
      ...expenseRows,
      ["Total Expenses", "", parseFloat(reportData.total_expenses || 0).toFixed(2)],
      [],
      ["Net Profit/Loss", "", parseFloat(reportData.net_profit || 0).toFixed(2)],
    ];

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();

    const maxCols = Math.max(incomeHeaders.length, expenseHeaders.length, 3);
    const allRows = [...incomeRows, ...expenseRows];
    ws["!cols"] = Array.from({ length: maxCols }, (_, colIdx) => {
      const maxLen = Math.max(
        colIdx < incomeHeaders.length ? String(incomeHeaders[colIdx]).length : 0,
        colIdx < expenseHeaders.length ? String(expenseHeaders[colIdx]).length : 0,
        ...allRows.map((row) => String(row[colIdx] ?? "").length)
      );
      return { wch: Math.min(Math.max(maxLen + 2, 14), 40) };
    });

    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: maxCols - 1 } },
      { s: { r: 9, c: 0 }, e: { r: 9, c: maxCols - 1 } },
      { s: { r: 14 + incomeRows.length, c: 0 }, e: { r: 14 + incomeRows.length, c: maxCols - 1 } },
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Profit & Loss");
    const filename = `profit_and_loss_${filters.start_date || "from"}_${filters.end_date || "to"}.xlsx`;
    XLSX.writeFile(wb, filename);
    toast.success("Profit & Loss exported as XLSX");
  };

  const exportUnitStatementPdf = async () => {
    if (activeReport !== "unit_statement" || !reportData) {
      toast.error("Generate unit statement first");
      return;
    }

    if (!filters.unit_id) {
      toast.error("Please select a unit");
      return;
    }

    try {
      setMisBusy(true);
      
      // Call backend API to generate PDF
      const params = {
        unit_id: filters.unit_id,
        start_date: filters.start_date,
        end_date: filters.end_date
      };

      const response = await exportCamStatementPdf(params);
      
      // Check if response is actually an error JSON (blob with JSON content)
      if (response.data.type === 'application/json') {
        const text = await response.data.text();
        const errorData = JSON.parse(text);
        throw new Error(errorData.error || 'PDF generation failed');
      }
      
      // Create download link
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const safeUnit = (reportData.unit?.name || "statement")
        .toString()
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[^\w-]/g, "");
      
      link.setAttribute('download', `cam_statement_${safeUnit}_${filters.start_date || "from"}_${filters.end_date || "to"}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("CAM statement PDF downloaded successfully");
    } catch (error) {
      console.error('PDF export error:', error);
      
      // Handle axios error responses
      if (error.response?.data) {
        // If error.response.data is a Blob, try to parse it as JSON
        if (error.response.data instanceof Blob) {
          try {
            const text = await error.response.data.text();
            const errorData = JSON.parse(text);
            toast.error(`PDF export failed: ${errorData.error}`);
            return;
          } catch (parseError) {
            // If parsing fails, just show generic error
          }
        }
      }
      
      toast.error(`PDF export failed: ${error.message || 'Unknown error'}`);
    } finally {
      setMisBusy(false);
    }
  };

  const handleMisDownload = async (kind) => {
    setMisBusy(true);
    try {
      const params = getMisParams(kind);
      let res;
      let fallbackName;

      if (kind === "expenses") {
        res = await downloadExpensesMIS(params);
        fallbackName = "expenses_mis.xlsx";
      } else if (kind === "income") {
        res = await downloadIncomeMIS(params);
        fallbackName = "income_mis.xlsx";
      } else if (kind === "individual") {
        res = await downloadIndividualMIS(params);
        fallbackName = "individual_mis.xlsx";
      } else {
        throw new Error("Invalid MIS type");
      }

      const filename = extractFilename(res.headers?.["content-disposition"], fallbackName);
      downloadBlob(res.data, filename);
      toast.success("MIS downloaded");
    } catch (error) {
      toast.error("Failed to download MIS");
      console.error(error);
    } finally {
      setMisBusy(false);
    }
  };

  const handleMisImport = async (kind) => {
    setMisBusy(true);
    try {
      let res;
      if (kind === "expenses") {
        if (!expensesMisFile) {
          toast.error("Select Expenses MIS file first");
          return;
        }
        res = await importExpensesMIS(expensesMisFile);
      } else if (kind === "income") {
        if (!incomeMisFile) {
          toast.error("Select Income MIS file first");
          return;
        }
        res = await importIncomeMIS(incomeMisFile);
      } else if (kind === "individual") {
        if (!individualMisFile) {
          toast.error("Select Individual MIS file first");
          return;
        }
        res = await importIndividualMIS(individualMisFile, individualMisFilters.year, individualMisFilters.month);
      } else {
        throw new Error("Invalid MIS import type");
      }

      const created = res?.data?.created;
      const updated = res?.data?.updated;
      const errors = res?.data?.errors;

      if (Array.isArray(errors) && errors.length > 0) {
        toast.error(`Imported with ${errors.length} errors`);
      } else {
        toast.success(
          `Import successful${typeof created === "number" || typeof updated === "number"
            ? ` (created ${created || 0}, updated ${updated || 0})`
            : ""
          }`
        );
      }
    } catch (error) {
      const message = error?.response?.data?.error || "Failed to import MIS";
      toast.error(message);
      console.error(error);
    } finally {
      setMisBusy(false);
    }
  };

  const renderReportContent = () => {
    // Show MIS section directly without needing to generate report
    if (activeReport === "accounting_statements") {
      return (
        <div>
          <h3 className="text-lg font-semibold mb-4">MIS Report (Excel)</h3>
          {/* Expense MIS */}
          {(filterDownloadMis?.mis_type === "expenses") && (
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => handleMisDownload("expenses")}
                disabled={misBusy}
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 disabled:bg-gray-400"
              >
                Download Expenses MIS
              </button>

              <div className="grid grid-cols-2 gap-6">
                <div className="border rounded p-4">
                  <div className="font-medium mb-2">Import Expenses MIS</div>
                  <div className="flex items-center gap-3">
                    <FileInput
                      accept=".xlsx,.xls"
                      className=""
                      handleFileChange={(e) => setExpensesMisFile(e.target.files?.[0] || null)}
                    />
                    <button
                      onClick={() => handleMisImport("expenses")}
                      disabled={misBusy || !expensesMisFile}
                      className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 disabled:bg-gray-400"
                    >
                      Import
                    </button>
                  </div>
                </div>
              </div>
            </div>

          )}

          {/* Imcome MIS */}
          {(filterDownloadMis?.mis_type === "income") && (
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => handleMisDownload("income")}
                disabled={misBusy}
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-900 disabled:bg-gray-400"
              >
                Download Income MIS
              </button>
              <div className="grid grid-cols-2 gap-6">
                <div className="border rounded p-4">
                  <div className="font-medium mb-2">Import Income MIS</div>
                  <div className="flex items-center gap-3">
                    <FileInput
                      accept=".xlsx,.xls"
                      className=""
                      handleFileChange={(e) => setIncomeMisFile(e.target.files?.[0] || null)}
                    />
                    <button
                      onClick={() => handleMisImport("income")}

                      disabled={misBusy || !incomeMisFile}
                      className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 disabled:bg-gray-400"
                    >
                      Import
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Individual MIS */}
          {(filterDownloadMis.mis_type === "individual") && (
            <div className="mb-6">
              {/* Year and Month Filters */}


              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleMisDownload("individual")}
                  disabled={misBusy}
                  className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-900 disabled:bg-gray-400"
                >
                  Download Individual MIS
                </button>
                <div className="grid grid-cols-2 gap-6">
                  <div className="border rounded p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <select
                          value={individualMisFilters.year}
                          onChange={(e) => setIndividualMisFilters(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                          className="px-3 py-2 border rounded min-w-[120px]"
                        >
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                        <select
                          value={individualMisFilters.month}
                          onChange={(e) => setIndividualMisFilters(prev => ({ ...prev, month: parseInt(e.target.value) }))}
                          className="px-3 py-2 border rounded min-w-[120px]"
                        >
                          {[
                            { value: 1, label: "January" },
                            { value: 2, label: "February" },
                            { value: 3, label: "March" },
                            { value: 4, label: "April" },
                            { value: 5, label: "May" },
                            { value: 6, label: "June" },
                            { value: 7, label: "July" },
                            { value: 8, label: "August" },
                            { value: 9, label: "September" },
                            { value: 10, label: "October" },
                            { value: 11, label: "November" },
                            { value: 12, label: "December" },
                          ].map(month => (
                            <option key={month.value} value={month.value}>{month.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="font-medium mb-2">Individual MIS contains both Income and Expenses data</div>
                    <div className="flex item-center gap-3">
                      <FileInput
                        accept=".xlsx,.xls"
                        className=""
                        handleFileChange={(e) => setIndividualMisFile(e.target.files?.[0] || null)}
                      />
                      <button
                        onClick={() => handleMisImport("individual")}
                        disabled={misBusy || !individualMisFile}
                        className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 disabled:bg-gray-400"
                      >
                        Import
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

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
                  Unit Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Side
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
              {reportData.report_data?.map((ledger, index) => (
                <tr key={index}>
                  <td className="px-6 py-2">{ledger.ledger_name}</td>
                  <td className="px-6 py-2 text-right">{getUnitLabel(ledger.unit_name)}</td>
                  <td className="px-6 py-2 text-right">{ledger.side}</td>
                  {(ledger.side === "debit" ?
                    <td className="px-6 py-4 text-right">
                      ₹{parseFloat(ledger.balance || 0).toFixed(2)}
                    </td>
                    :
                    <td className="px-6 py-4 text-right">₹0.00</td>
                  )}
                  {(ledger.side === "credit" ?
                    <td className="px-6 py-4 text-right">
                      ₹{parseFloat(ledger.balance || 0).toFixed(2)}
                    </td>
                    :
                    <td className="px-6 py-4 text-right">₹0.00</td>
                  )}
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td className="px-6 py-4">Total</td>
                <td></td>
                <td></td>
                <td className="px-6 py-4 text-right">
                  ₹{parseFloat(reportData.totals?.total_debit || 0).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  ₹{parseFloat(reportData.totals?.total_credit || 0).toFixed(2)}
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
              <h4 className="font-semibold mb-3 text-red-700">
                Liabilities & Equity
              </h4>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {reportData.liabilities?.map((liability, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{liability.group_name}: {liability.group_code}</td>
                      <td className="px-4 py-2 text-right">
                        ₹{parseFloat(liability.balance || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-4 py-2">Total Liabilities & Equity</td>
                    <td className="px-4 py-2 text-right">
                      ₹{parseFloat(reportData.total_liabilities || 0).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-700">Assets</h4>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {reportData.assets?.map((asset, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{asset.group_name} : {asset.group_code}</td>
                      <td className="px-4 py-2 text-right">
                        ₹{parseFloat(asset.balance || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-4 py-2">Total Assets</td>
                    <td className="px-4 py-2 text-right">
                      ₹{parseFloat(reportData.total_assets || 0).toFixed(2)}
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
              {reportData.income?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-2 pl-10">{item.group_name} : {item.group_code}</td>
                  <td className="px-6 py-2 text-right">
                    ₹{parseFloat(item.balance || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-green-100 font-semibold">
                <td className="px-6 py-2">Total Revenue</td>
                <td className="px-6 py-2 text-right">
                  ₹{parseFloat(reportData.total_income || 0).toFixed(2)}
                </td>
              </tr>
              <tr className="bg-red-50">
                <td className="px-6 py-3 font-semibold" colSpan="2">
                  Expenses
                </td>
              </tr>
              {reportData.expenses?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-2 pl-10">{item.group_name} : {item.group_code}</td>
                  <td className="px-6 py-2 text-right">
                    ₹{parseFloat(item.balance || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-red-100 font-semibold">
                <td className="px-6 py-2">Total Expenses</td>
                <td className="px-6 py-2 text-right">
                  ₹{parseFloat(reportData.total_expenses || 0).toFixed(2)}
                </td>
              </tr>
              <tr className="bg-blue-100 font-bold text-lg">
                <td className="px-6 py-3">Net Profit/Loss</td>
                <td className="px-6 py-3 text-right">
                  ₹{parseFloat(reportData.net_profit || 0).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    // Ledger Statement Report
    if (activeReport === "ledger_statement") {
      return (
        <div>
          <h3 className="text-lg font-semibold mb-4">Ledger Statement</h3>

          {/* Ledger Info Card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-xs text-gray-500 mb-1">Ledger Name</p>
              <p className="font-semibold text-blue-800">{reportData.ledger?.name || "-"}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Ledger Code</p>
              <p className="font-semibold">{reportData.ledger?.code || "-"}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-xs text-gray-500 mb-1">Opening Balance</p>
              <p className="font-semibold text-green-700">₹{parseFloat(reportData.opening_balance || 0).toFixed(2)}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-xs text-gray-500 mb-1">Closing Balance</p>
              <p className="font-semibold text-purple-700">₹{parseFloat(reportData.closing_balance || 0).toFixed(2)}</p>
            </div>
          </div>

          {/* Date Range */}
          <div className="flex gap-4 mb-4 text-sm text-gray-600">
            <span><strong>From:</strong> {reportData.from_date ? new Date(reportData.from_date).toLocaleDateString() : "-"}</span>
            <span><strong>To:</strong> {reportData.to_date ? new Date(reportData.to_date).toLocaleDateString() : "-"}</span>
          </div>

          {/* Transactions Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entry Number</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Debit</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Credit</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {/* Opening Balance Row */}
                <tr className="bg-green-50">
                  <td className="px-4 py-3" colSpan="3">
                    <span className="font-medium text-green-700">Opening Balance</span>
                  </td>
                  <td className="px-4 py-3 text-right">-</td>
                  <td className="px-4 py-3 text-right">-</td>
                  <td className="px-4 py-3 text-right font-medium text-green-700">
                    ₹{parseFloat(reportData.opening_balance || 0).toFixed(2)}
                  </td>
                </tr>

                {/* Transaction Rows */}
                {reportData.transactions?.length > 0 ? (
                  reportData.transactions.map((txn, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {txn.date ? new Date(txn.date).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-blue-600">
                        {txn.entry_number || "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {txn.description || "-"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {parseFloat(txn.debit || 0) > 0 ? (
                          <span className="text-red-600">₹{parseFloat(txn.debit).toFixed(2)}</span>
                        ) : "-"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {parseFloat(txn.credit || 0) > 0 ? (
                          <span className="text-green-600">₹{parseFloat(txn.credit).toFixed(2)}</span>
                        ) : "-"}
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        ₹{parseFloat(txn.balance || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      No transactions found for this period
                    </td>
                  </tr>
                )}

                {/* Closing Balance Row */}
                <tr className="bg-purple-50 font-semibold">
                  <td className="px-4 py-3" colSpan="3">
                    <span className="text-purple-700">Closing Balance</span>
                  </td>
                  <td className="px-4 py-3 text-right text-red-600">
                    ₹{parseFloat(
                      reportData.debit_total ??
                      (reportData.transactions || []).reduce((sum, t) => sum + parseFloat(t.debit || 0), 0)
                    ).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right text-green-600">
                    ₹{parseFloat(
                      reportData.credit_total ??
                      (reportData.transactions || []).reduce((sum, t) => sum + parseFloat(t.credit || 0), 0)
                    ).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right text-purple-700">
                    ₹{parseFloat(reportData.closing_balance || 0).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Unit Statement Report - CAM Statement
    if (activeReport === "unit_statement") {
      return (
        <div>
          <h3 className="text-lg font-semibold mb-4">Unit CAM Statement</h3>

          {/* Unit Info Card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-xs text-gray-500 mb-1">Unit Name</p>
              <p className="font-semibold text-blue-800">{reportData.unit?.name || "-"}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Building</p>
              <p className="font-semibold">{reportData.unit?.building || "-"}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Floor</p>
              <p className="font-semibold">{reportData.unit?.floor || "-"}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-xs text-gray-500 mb-1">Period</p>
              <p className="font-semibold text-purple-700">{reportData.unit?.period || "-"}</p>
            </div>
          </div>

          {/* SECTION 1: INCOME */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4 text-lg text-blue-700">1. Maintenance Income</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-500 mb-1">Advance Maintenance Received</p>
                <p className="font-semibold text-blue-700 text-xl">₹{parseFloat(reportData.income?.total_income ?? reportData.income?.advance_maintenance_received ?? 0).toFixed(2)}</p>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <p className="text-xs text-gray-500 mb-1">Receipts Collected</p>
                <p className="font-semibold text-teal-700 text-xl">₹{parseFloat(reportData.income?.receipts_total || 0).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* SECTION 2: APEX CALCULATION */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4 text-lg text-orange-700">2. Apex Body Transfer (30%)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-xs text-gray-500 mb-1">Amount Received</p>
                <p className="font-semibold text-orange-700">₹{parseFloat(reportData.apex?.total_income ?? reportData.apex?.advance_maintenance_received ?? 0).toFixed(2)}</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-lg border border-orange-300">
                <p className="text-xs text-gray-500 mb-1">Contribution %</p>
                <p className="font-semibold text-orange-800">{reportData.apex?.contribution_percentage || 30}%</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-xs text-gray-500 mb-1">Apex Payment</p>
                <p className="font-semibold text-red-700">₹{parseFloat(reportData.apex?.contribution_amount || 0).toFixed(2)}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-xs text-gray-500 mb-1">Building Fund Available</p>
                <p className="font-semibold text-green-700">₹{parseFloat(reportData.apex?.building_fund_available || 0).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* SECTION 3: EXPENSES BREAKDOWN */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4 text-lg text-purple-700">3. Maintenance Expenses</h4>
            
            {/* CAM Expenses by Category */}
            {reportData.expenses?.cam_breakdown && Object.keys(reportData.expenses.cam_breakdown).length > 0 && (
              <div className="mb-6">
                <h5 className="font-semibold mb-3 text-purple-600">CAM Expenses (by Category)</h5>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-purple-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Category</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {Object.entries(reportData.expenses.cam_breakdown).map(([category, amount], idx) => (
                        <tr key={idx} className="hover:bg-purple-50">
                          <td className="px-4 py-3">{category || "Unclassified"}</td>
                          <td className="px-4 py-3 text-right font-medium">₹{parseFloat(amount || 0).toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="bg-purple-100 font-semibold">
                        <td className="px-4 py-3">CAM Subtotal</td>
                        <td className="px-4 py-3 text-right text-purple-700">₹{parseFloat(reportData.expenses?.cam_expenses || 0).toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Ledger Expenses by Account Group */}
            {reportData.expenses?.ledger_breakdown && Object.keys(reportData.expenses.ledger_breakdown).length > 0 && (
              <div className="mb-6">
                <h5 className="font-semibold mb-3 text-purple-600">Ledger Expenses (by Account Group)</h5>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-purple-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Account Group</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {Object.entries(reportData.expenses.ledger_breakdown).map(([group, amount], idx) => (
                        <tr key={idx} className="hover:bg-purple-50">
                          <td className="px-4 py-3">{group || "Unclassified"}</td>
                          <td className="px-4 py-3 text-right font-medium">₹{parseFloat(amount || 0).toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="bg-purple-100 font-semibold">
                        <td className="px-4 py-3">Ledger Subtotal</td>
                        <td className="px-4 py-3 text-right text-purple-700">₹{parseFloat(reportData.expenses?.ledger_expenses || 0).toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Total Expenses Summary */}
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-xs text-gray-500 mb-1">Total Expenses Incurred</p>
              <p className="font-semibold text-red-700 text-xl">₹{parseFloat(reportData.expenses?.total || 0).toFixed(2)}</p>
            </div>
          </div>

          {/* SECTION 4: BALANCE SUMMARY */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4 text-lg text-green-700">4. Financial Balance</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-xs text-gray-500 mb-1">Building Fund Available</p>
                <p className="font-semibold text-green-700 text-lg">₹{parseFloat(reportData.balance?.building_fund || 0).toFixed(2)}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-xs text-gray-500 mb-1">Less: Total Expenses</p>
                <p className="font-semibold text-red-700 text-lg">₹{parseFloat(reportData.balance?.less_total_expenses || 0).toFixed(2)}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-500 mb-1">Balance Available</p>
                <p className="font-semibold text-blue-700 text-lg">₹{parseFloat(reportData.balance?.balance_fund_available || 0).toFixed(2)}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 md:col-span-3">
                <p className="text-xs text-gray-500 mb-1">Net Income (Receipts - Expenses)</p>
                <p className="font-semibold text-purple-700 text-lg">₹{parseFloat(reportData.balance?.net_income || 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Receivables Summary Report
    if (activeReport === "receivables_summary") {
      return (
        <div>
          <h3 className="text-lg font-semibold mb-4">Receivables Summary</h3>

          {/* Summary Totals Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-xs text-gray-500 mb-1">Total Invoiced</p>
              <p className="font-semibold text-orange-700">
                ₹{parseFloat(reportData?.total_invoiced || 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-xs text-gray-500 mb-1">Total Paid</p>
              <p className="font-semibold text-green-700">
                ₹{parseFloat(reportData?.total_paid || 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-xs text-gray-500 mb-1">Total Outstanding</p>
              <p className="font-semibold text-red-700">
                ₹{parseFloat(reportData?.total_outstanding || 0).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Units Summary Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Building</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Floor</th>
                  {/* <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Invoice Count</th> */}
                  {/* <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Overdue Count</th> */}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Oldest Invoice</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Invoiced Value</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Paid Value</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Outstanding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {reportData.summary?.length > 0 ? (
                  reportData.summary.map((item, index) => (
                    <tr key={item.unit_id || index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-blue-600">
                        {item.unit_name || "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.building || "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.floor || "-"}
                      </td>
                      {/* <td className="px-4 py-3 text-right">
                        {item.invoice_count || 0}
                      </td> */}
                      {/* <td className="px-4 py-3 text-right">
                        {item.overdue_count > 0 ? (
                          <span className="text-red-600 font-medium">{item.overdue_count}</span>
                        ) : (
                          <span>{item.overdue_count || 0}</span>
                        )}
                      </td> */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.oldest_invoice_date ? new Date(item.oldest_invoice_date).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        ₹{parseFloat(item.invoice_value || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right text-green-600">
                        ₹{parseFloat(item.overdue_value || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {parseFloat(item.total_outstanding || 0) > 0 ? (
                          <span className="text-red-600 font-medium">₹{parseFloat(item.total_outstanding || 0).toFixed(2)}</span>
                        ) : (
                          <span className="text-green-600">₹0.00</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                      No receivables data found
                    </td>
                  </tr>
                )}
                {/* Totals Row */}
                {reportData.summary?.length > 0 && (
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-4 py-3" colSpan="3">Total</td>
                    {/* <td className="px-4 py-3 text-right">
                      {(reportData.summary || []).reduce((sum, item) => sum + (item.invoice_count || 0), 0)}
                    </td>
                    <td className="px-4 py-3 text-right text-red-600">
                      {(reportData.summary || []).reduce((sum, item) => sum + (item.overdue_count || 0), 0)}
                    </td> */}
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 text-right">
                      ₹{(reportData.summary || []).reduce((sum, item) => sum + parseFloat(item.invoice_value || 0), 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-green-600">
                      ₹{(reportData.summary || []).reduce((sum, item) => sum + parseFloat(item.overdue_value || 0), 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-red-600">
                      ₹{(reportData.summary || []).reduce((sum, item) => sum + parseFloat(item.total_outstanding || 0), 0).toFixed(2)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
              className={`p-4 rounded-lg border-2 transition-all ${activeReport === report.id
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
                Start Date <span className="text-red-500">*</span>
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
              <label className="block  text-sm font-medium text-gray-700 mb-1">
                End Date <span className="text-red-500">*</span>
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
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit (Optional)
                  </label>
                  <select
                    name="unit_id"
                    value={filters.unit_id}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="">All Units</option>
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ledger
                  </label>
                  <select
                    name="ledger_id"
                    value={filters.ledger_id}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="">Select Ledger</option>
                    {filteredLedgers.map((ledger) => (
                      <option key={ledger.id} value={ledger.id}>
                        {ledger.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {(activeReport === "unit_statement") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  name="unit_id"
                  value={filters.unit_id}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Select Unit</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {(activeReport === "accounting_statements") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type of MIS
                </label>

                {/* <select
                  name="mis_type"
                  value={filters.mis_type}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="expenses">Expenses MIS</option>
                  <option value="income">Income MIS</option>
                  <option value="payables">Payables MIS</option>
                  <option value="receivables">Receivables MIS</option>
                </select> */}
                <select className="w-full p-3 rounded border" name="mis_type" value={filterDownloadMis.mis_type} onChange={handleMisTypeChange}>
                  <option value="">Select MIS</option>
                  <option value="expenses">Expense MIS</option>
                  <option value="income">Income MIS</option>
                  <option value="individual">Individual MIS</option>
                </select>
              </div>
            )}
            <div className="flex items-end gap-2">
              <button
                onClick={generateReport}
                disabled={loading}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900 disabled:bg-gray-400"
              >
                {loading ? "Generating..." : "Generate Report"}
              </button>
              {(activeReport === "trial_balance" || activeReport === "balance_sheet" || activeReport === "profit_and_loss") && (
                <button
                  onClick={
                    activeReport === "trial_balance"
                      ? exportTrialBalanceSheet
                      : activeReport === "balance_sheet"
                        ? exportBalanceSheet
                        : exportProfitAndLoss
                  }
                  disabled={loading || !reportData}
                  className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 disabled:bg-gray-400"
                  title={
                    !reportData
                      ? "Generate report first"
                      : activeReport === "trial_balance"
                        ? "Export trial balance"
                        : activeReport === "balance_sheet"
                          ? "Export balance sheet"
                          : "Export profit & loss"
                  }
                >
                  Export Sheet
                </button>
              )}
              {activeReport === "unit_statement" && (
                <button
                  onClick={exportUnitStatementPdf}
                  disabled={loading || !reportData}
                  className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 disabled:bg-gray-400"
                  title={!reportData ? "Generate report first" : "Export unit statement PDF"}
                >
                  Export PDF
                </button>
              )}
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
