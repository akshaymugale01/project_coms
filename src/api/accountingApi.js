import API from "./axiosInstance";

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
export const createAccountingInvoice = (data) => API.post("/accounting_invoices.json", data);
export const updateAccountingInvoice = (id, data) => API.put(`/accounting_invoices/${id}.json`, data);
export const deleteAccountingInvoice = (id) => API.delete(`/accounting_invoices/${id}.json`);
export const sendInvoice = (id) => API.post(`/accounting_invoices/${id}/send_invoice.json`);
export const addPaymentToInvoice = (id, data) => API.post(`/accounting_invoices/${id}/add_payment.json`, data);
export const getOverdueInvoices = () => API.get("/accounting_invoices/overdue.json");
export const getInvoicesByUnit = (unitId) => API.get(`/accounting_invoices/by_unit.json?unit_id=${unitId}`);

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
