import API from "./axiosInstance";
import { getItemInLocalStorage } from "../utils/localStorage";

// Account Groups
export const getAccountGroups = () => API.get("/account_groups.json");
export const getAccountGroup = (id) => API.get(`/account_groups/${id}.json`);
export const createAccountGroup = (data) => API.post("/account_groups.json", data);
export const updateAccountGroup = (id, data) => API.put(`/account_groups/${id}.json`, data);
export const deleteAccountGroup = (id) => API.delete(`/account_groups/${id}.json`);
export const seedDefaultAccountGroups = () => API.post("/account_groups/seed_defaults.json");

// Ledgers
export const getLedgers = () => API.get("/ledgers.json");
export const getLedger = (id) => API.get(`/ledgers/${id}.json`);
export const createLedger = (data) => API.post("/ledgers.json", data);
export const updateLedger = (id, data) => API.put(`/ledgers/${id}.json`, data);
export const deleteLedger = (id) => API.delete(`/ledgers/${id}.json`);
export const getLedgerBalanceSheet = (id) => API.get(`/ledgers/${id}/balance_sheet.json`);
export const seedDefaultLedgers = () => API.post("/ledgers/seed_defaults.json");
export const getLedgersByGroup = (groupId) => API.get(`/ledgers/by_group.json?group_id=${groupId}`);

// Tax Rates
export const getTaxRates = () => API.get("/tax_rates.json");
export const getTaxRate = (id) => API.get(`/tax_rates/${id}.json`);
export const createTaxRate = (data) => API.post("/tax_rates.json", data);
export const updateTaxRate = (id, data) => API.put(`/tax_rates/${id}.json`, data);
export const deleteTaxRate = (id) => API.delete(`/tax_rates/${id}.json`);
export const seedDefaultTaxRates = () => API.post("/tax_rates/seed_defaults.json");
export const getActiveTaxRates = () => API.get("/tax_rates/active.json");

// Journal Entries
export const getJournalEntries = () => API.get("/journal_entries.json");
export const getJournalEntry = (id) => API.get(`/journal_entries/${id}.json`);
export const createJournalEntry = (data) => API.post("/journal_entries.json", data);
export const updateJournalEntry = (id, data) => API.put(`/journal_entries/${id}.json`, data);
export const deleteJournalEntry = (id) => API.delete(`/journal_entries/${id}.json`);
export const postJournalEntry = (id) => API.post(`/journal_entries/${id}/post.json`);
export const cancelJournalEntry = (id) => API.post(`/journal_entries/${id}/cancel.json`);

// Accounting Invoices
export const getAccountingInvoices = () => API.get("/accounting_invoices.json");
export const getAccountingInvoice = (id) => API.get(`/accounting_invoices/${id}.json`);
export const createAccountingInvoice = (data, paymentData) => {
  // Transform items to accounting_invoice_items_attributes format expected by Rails
  const transformedData = {
    accounting_invoice: {
      ...data,
      terms_and_conditions: data.terms_conditions, // Map terms_conditions to terms_and_conditions
      accounting_invoice_items_attributes: data.items
    }
  };
  
  // Add payment_data if provided
  if (paymentData && paymentData.payment_mode) {
    transformedData.payment_data = paymentData;
  }
  
  delete transformedData.accounting_invoice.items;
  delete transformedData.accounting_invoice.terms_conditions; // Remove old key
  return API.post("/accounting_invoices.json", transformedData);
};
export const updateAccountingInvoice = (id, data) => {
  // Transform items to accounting_invoice_items_attributes format expected by Rails
  const transformedData = {
    accounting_invoice: {
      ...data,
      terms_and_conditions: data.terms_conditions, // Map terms_conditions to terms_and_conditions
      accounting_invoice_items_attributes: data.items
    }
  };
  delete transformedData.accounting_invoice.items;
  delete transformedData.accounting_invoice.terms_conditions; // Remove old key
  return API.put(`/accounting_invoices/${id}.json`, transformedData);
};
export const deleteAccountingInvoice = (id) => API.delete(`/accounting_invoices/${id}.json`);
export const sendInvoice = (id) => API.post(`/accounting_invoices/${id}/send_invoice.json`);
export const addPaymentToInvoice = (id, data) => API.post(`/accounting_invoices/${id}/add_payment.json`, data);
export const getOverdueInvoices = () => API.get("/accounting_invoices/overdue.json");
export const getInvoicesByUnit = (unitId) => API.get(`/accounting_invoices/by_unit.json?unit_id=${unitId}`);
export const findInvoiceByNumber = (invoiceNumber) =>
    API.get("/accounting_invoices/find_by_number.json", { params: { invoice_number: invoiceNumber } });

// Accounting Payments
export const getAccountingPayments = () => API.get("/accounting_payments.json");
export const getAccountingPayment = (id) => API.get(`/accounting_payments/${id}.json`);
export const createAccountingPayment = (data) => API.post("/accounting_payments.json", data);
export const updateAccountingPayment = (id, data) => API.put(`/accounting_payments/${id}.json`, data);
export const deleteAccountingPayment = (id) => API.delete(`/accounting_payments/${id}.json`);
export const getPaymentsByInvoice = (invoiceId) => API.get(`/accounting_payments/by_invoice.json?invoice_id=${invoiceId}`);

// Accounting Reports
export const getTrialBalance = (params) => API.get("/accounting_reports/trial_balance.json", { params });
export const getBalanceSheet = (params) => API.get("/accounting_reports/balance_sheet.json", { params });
export const getProfitAndLoss = (params) => API.get("/accounting_reports/profit_and_loss.json", { params });
export const getLedgerStatement = (params) => API.get("/accounting_reports/ledger_statement.json", { params });
export const getUnitStatement = (params) => API.get("/accounting_reports/unit_statement.json", { params });
export const getReceivablesSummary = (params) => API.get("/accounting_reports/receivables_summary.json", { params });

// MIS (Excel)
export const downloadExpensesMIS = (params) =>
  API.get("/accounting_reports/expenses_mis.xlsx", { params, responseType: "blob" });

export const downloadIncomeMIS = (params) =>
  API.get("/accounting_reports/income_mis.xlsx", { params, responseType: "blob" });

export const downloadIndividualMIS = (params) =>
  API.get("/accounting_reports/individual_mis.xlsx", { params, responseType: "blob" });

export const importExpensesMIS = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const token = getItemInLocalStorage("TOKEN");
  return API.post("/accounting_reports/expenses_mis/import.json", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    params: token ? { token } : undefined,
  });
};

export const importIncomeMIS = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const token = getItemInLocalStorage("TOKEN");
  return API.post("/accounting_reports/income_mis/import.json", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    params: token ? { token } : undefined,
  });
};


export const importIndividualMIS = (file, year, month) => {
  const formData = new FormData();
  formData.append('file', file);
  const token = getItemInLocalStorage("TOKEN");
  return API.post('/accounting_reports/individual_mis/import.json', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    params: { token, year, month },
  });
}

    // CAM (Common Area Maintenance) - Society Maintenance APIs (aligned to /api/cam)
// Global CAM Settings
export const getCamSettings = () => API.get("/api/cam/settings");
export const upsertCamSettings = (data) => API.post("/api/cam/settings", data);

// Unit CAM Configs (carpet area, cam_start_date, overrides)
export const getUnitCamConfigs = (params) => API.get("/api/cam/unit_configs", { params });
export const createUnitCamConfig = (data) => API.post("/api/cam/unit_configs", data);
export const updateUnitCamConfig = (id, data) => API.put(`/api/cam/unit_configs/${id}`, data);
export const deleteUnitCamConfig = (id) => API.delete(`/api/cam/unit_configs/${id}`);

// Monthly Expenses (by category)
export const getMonthlyExpenses = (params) => API.get("/api/cam/monthly_expenses", { params });
export const createMonthlyExpense = (data) => API.post("/api/cam/monthly_expenses", data);
export const updateMonthlyExpense = (id, data) => API.put(`/api/cam/monthly_expenses/${id}`, data);
export const deleteMonthlyExpense = (id) => API.delete(`/api/cam/monthly_expenses/${id}`);
export const getMonthlyExpensesTotal = (params) => API.get("/api/cam/monthly_expenses/total", { params });

// CAM Billing
export const previewCamBills = (data) => API.post("/api/cam/bills/preview", data);
export const generateCamBills = (data) => API.post("/api/cam/bills/generate", data);
export const getCamBills = (params) => API.get("/api/cam/bills", { params });
export const getCamBill = (id) => API.get(`/api/cam/bills/${id}`);

// Advance Maintenance (24 months before possession)
export const recordAdvanceMaintenance = (data) => API.post("/api/cam/advance_maintenances/generate", data);
export const getAdvanceMaintenances = (params) => API.get("/api/cam/advance_maintenances", { params });

// Tenant Move-In / Move-Out Charges
export const createTenantCharge = (data) => API.post("/api/cam/tenant_charges", data);
export const getTenantCharges = (params) => API.get("/api/cam/tenant_charges", { params });

// Income vs Expense summary
export const getCamIncomeExpenseSummary = (params) => API.get("/api/cam/income_expense_summary", { params });

// --- New endpoints per possession enforcement and invoicing spec ---
// Advance payments (possession guard)
export const recordAdvancePayment = (data) => API.post("/accounting/advance-payments/record", data);
export const getAdvancePaymentStatus = (unitId) =>
    API.get("/accounting/advance-payments/status", { params: { unit_id: unitId } });

// Tenant fee invoicing
export const invoiceTenantFee = (data) => API.post("/accounting/tenant-fees/invoice", data);
export const getTenantFeeConfig = () => API.get("/accounting/tenant-fees/config");

// Month-end CAM generation and summary (cron safe)
export const generateMonthlyCam = (period) =>
    API.post("/accounting/cam/generate", null, { params: { period } });
export const getMonthlyCamSummary = (period) =>
    API.get("/accounting/cam/summary", { params: { period } });

// Billing Configurations
export const getBillingConfigurations = () => API.get("/billing_configurations.json");
export const getBillingConfiguration = (id) => API.get(`/billing_configurations/${id}.json`);
export const createBillingConfiguration = (data) => API.post("/billing_configurations.json", data);
export const updateBillingConfiguration = (id, data) => API.put(`/billing_configurations/${id}.json`, data);
export const deleteBillingConfiguration = (id) => API.delete(`/billing_configurations/${id}.json`);
export const uploadBillingLogo = (billingConfigId, formData) =>
    API.post(`/billing_configurations/${billingConfigId}/upload_logo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

// Income Entries
export const getIncomeEntries = (params) => API.get("/income_entries.json", { params });
export const getIncomeEntry = (id) => API.get(`/income_entries/${id}.json`);
export const createIncomeEntry = (data) => API.post("/income_entries.json", data);
export const updateIncomeEntry = (id, data) => API.put(`/income_entries/${id}.json`, data);
export const deleteIncomeEntry = (id) => API.delete(`/income_entries/${id}.json`);
export const getReconciliationReport = (params) => API.get("/income_entries/reconciliation_report.json", { params });

// Calculations - moved to backend for security and consistency
export const calculateMonthlyExpenseTotal = (params) => API.get("/api/cam/monthly_expenses/total", { params });
export const calculateInterest = (data) => API.post("/api/accounting/calculate-interest.json", data);
export const calculateIncomeTotal = (params) => API.post("/api/accounting/calculate-income-total.json", params);

// Monthly Income (by category) - similar to monthly expenses
export const getMonthlyIncome = (params) => API.get("/api/cam/monthly_income", { params });
export const getMonthlyIncomeTotal = (params) => API.get("/api/cam/monthly_income/total", { params });

// Get detailed income breakdown from invoices, payments, journal entries
export const getDetailedIncomeSummary = (params) => API.get("/api/cam/detailed_income_summary", { params });

// Backend calculations for Income & Expense Reports
export const calculateIncomeAllocation = (params) => API.post("/api/cam/calculate_income_allocation", params);
export const calculateExpenseAllocation = (params) => API.post("/api/cam/calculate_expense_allocation", params);
export const calculateIncomeVsExpense = (params) => API.post("/api/cam/calculate_income_vs_expense", params);
export const getIncomeByCategory = (params) => API.get("/api/cam/income_by_category", { params });
export const getExpenseByCategory = (params) => API.get("/api/cam/expense_by_category", { params });
export const getDailyIncomeReport = (params) => API.get("/api/cam/daily_income_report", { params });
export const getDailyExpenseReport = (params) => API.get("/api/cam/daily_expense_report", { params });
export const getUnitWiseIncomeSummary = (params) => API.get("/api/cam/unit_wise_income_summary", { params });
export const getUnitWiseExpenseSummary = (params) => API.get("/api/cam/unit_wise_expense_summary", { params });