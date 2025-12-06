# Accounting Module

A comprehensive accounting system built with React for managing financial operations.

## Features

### 1. Account Groups
- Create, read, update, and delete account groups
- Categorize accounts by type (Asset, Liability, Equity, Revenue, Expense)
- Define debit/credit nature
- Seed default account groups

**Routes:**
- `/accounting/account-groups` - List and manage account groups

### 2. Ledgers
- Manage ledger accounts
- Link ledgers to account groups
- Track opening balances
- View ledger balance sheets
- Filter ledgers by account group
- Seed default ledgers

**Routes:**
- `/accounting/ledgers` - List and manage ledgers

### 3. Tax Rates
- Configure tax rates for invoicing
- Support for multiple tax types (Sales Tax, VAT, GST, etc.)
- Active/Inactive status management
- Seed default tax rates
- Filter active tax rates only

**Routes:**
- `/accounting/tax-rates` - List and manage tax rates

### 4. Journal Entries
- Create double-entry journal transactions
- Multi-line journal entries with debit/credit validation
- Post and cancel journal entries
- Draft, Posted, and Cancelled statuses
- Automatic balance validation (Debit = Credit)

**Routes:**
- `/accounting/journal-entries` - List and manage journal entries

### 5. Accounting Invoices
- Create and manage customer invoices
- Multi-line item invoicing with tax support
- Send invoices to customers
- Track invoice status (Draft, Sent, Paid, Partially Paid, Overdue)
- Add payments to invoices
- Filter by status and overdue invoices
- Filter by unit

**Routes:**
- `/accounting/invoices` - List and manage invoices

### 6. Accounting Payments
- Record payments against invoices
- Multiple payment methods support
- Track payment status (Completed, Pending, Failed)
- Filter payments by invoice
- Link payments to invoices

**Routes:**
- `/accounting/payments` - List and manage payments

### 7. Accounting Reports
- **Trial Balance** - Summary of all ledger balances
- **Balance Sheet** - Assets vs Liabilities & Equity
- **Profit & Loss** - Revenue vs Expenses
- **Ledger Statement** - Detailed ledger transactions
- **Unit Statement** - Financial statement by unit
- **Receivables Summary** - Outstanding receivables report

**Routes:**
- `/accounting/reports` - Generate and view financial reports

### 8. Accounting Dashboard
- Overview of key financial metrics
- Total invoices, revenue, pending amounts
- Overdue invoice alerts
- Recent invoices, payments, and journal entries
- Quick access to all accounting modules

**Routes:**
- `/accounting` - Main accounting dashboard

## API Endpoints

### Account Groups
- `GET /account_groups` - List all account groups
- `GET /account_groups/:id` - Get single account group
- `POST /account_groups` - Create account group
- `PUT /account_groups/:id` - Update account group
- `DELETE /account_groups/:id` - Delete account group
- `POST /account_groups/seed_defaults` - Seed default groups

### Ledgers
- `GET /ledgers` - List all ledgers
- `GET /ledgers/:id` - Get single ledger
- `POST /ledgers` - Create ledger
- `PUT /ledgers/:id` - Update ledger
- `DELETE /ledgers/:id` - Delete ledger
- `GET /ledgers/:id/balance_sheet` - Get ledger balance sheet
- `POST /ledgers/seed_defaults` - Seed default ledgers
- `GET /ledgers/by_group?group_id=X` - Filter by account group

### Tax Rates
- `GET /tax_rates` - List all tax rates
- `GET /tax_rates/:id` - Get single tax rate
- `POST /tax_rates` - Create tax rate
- `PUT /tax_rates/:id` - Update tax rate
- `DELETE /tax_rates/:id` - Delete tax rate
- `POST /tax_rates/seed_defaults` - Seed default tax rates
- `GET /tax_rates/active` - Get active tax rates only

### Journal Entries
- `GET /journal_entries` - List all journal entries
- `GET /journal_entries/:id` - Get single journal entry
- `POST /journal_entries` - Create journal entry
- `PUT /journal_entries/:id` - Update journal entry
- `DELETE /journal_entries/:id` - Delete journal entry
- `POST /journal_entries/:id/post` - Post journal entry
- `POST /journal_entries/:id/cancel` - Cancel journal entry

### Accounting Invoices
- `GET /accounting_invoices` - List all invoices
- `GET /accounting_invoices/:id` - Get single invoice
- `POST /accounting_invoices` - Create invoice
- `PUT /accounting_invoices/:id` - Update invoice
- `DELETE /accounting_invoices/:id` - Delete invoice
- `POST /accounting_invoices/:id/send_invoice` - Send invoice
- `POST /accounting_invoices/:id/add_payment` - Add payment to invoice
- `GET /accounting_invoices/overdue` - Get overdue invoices
- `GET /accounting_invoices/by_unit?unit_id=X` - Filter by unit

### Accounting Payments
- `GET /accounting_payments` - List all payments
- `GET /accounting_payments/:id` - Get single payment
- `POST /accounting_payments` - Create payment
- `PUT /accounting_payments/:id` - Update payment
- `DELETE /accounting_payments/:id` - Delete payment
- `GET /accounting_payments/by_invoice?invoice_id=X` - Filter by invoice

### Accounting Reports
- `GET /accounting_reports/trial_balance` - Trial balance report
- `GET /accounting_reports/balance_sheet` - Balance sheet report
- `GET /accounting_reports/profit_and_loss` - P&L report
- `GET /accounting_reports/ledger_statement` - Ledger statement
- `GET /accounting_reports/unit_statement` - Unit statement
- `GET /accounting_reports/receivables_summary` - Receivables summary

## File Structure

```
src/
├── api/
│   └── accountingApi.js          # API service functions
├── pages/
│   └── Accounting/
│       ├── AccountingDashboard.jsx
│       ├── AccountGroups.jsx
│       ├── AccountGroupModal.jsx
│       ├── Ledgers.jsx
│       ├── LedgerModal.jsx
│       ├── LedgerBalanceSheet.jsx
│       ├── TaxRates.jsx
│       ├── TaxRateModal.jsx
│       ├── JournalEntries.jsx
│       ├── JournalEntryModal.jsx
│       ├── AccountingInvoices.jsx
│       ├── InvoiceModal.jsx
│       ├── AddPaymentModal.jsx
│       ├── AccountingPayments.jsx
│       ├── PaymentModal.jsx
│       ├── AccountingReports.jsx
│       └── index.js
└── App.jsx                        # Route definitions
```

## Technologies Used

- **React** - UI framework
- **React Router** - Navigation
- **React Hot Toast** - Notifications
- **Tailwind CSS** - Styling (via className utilities)
- **Axios** - HTTP client

## Usage

### Accessing the Accounting Module

1. Navigate to `/accounting` to access the main dashboard
2. Use the quick access cards to navigate to specific modules
3. All routes are protected by `ProtectedAdminRoutes`

### Creating an Invoice

1. Go to `/accounting/invoices`
2. Click "+ Add Invoice"
3. Fill in customer details and invoice items
4. Add tax rates to line items
5. Submit to create draft invoice
6. Send invoice to customer
7. Add payments as they are received

### Creating a Journal Entry

1. Go to `/accounting/journal-entries`
2. Click "+ Add Journal Entry"
3. Add entry lines with ledger, debit, and credit amounts
4. Ensure total debits = total credits
5. Save as draft or post immediately

### Generating Reports

1. Go to `/accounting/reports`
2. Select report type (Trial Balance, P&L, etc.)
3. Configure date range and filters
4. Click "Generate Report"
5. View formatted report data

## Notes

- All monetary values are handled with 2 decimal precision
- Journal entries must have balanced debits and credits
- Invoice status automatically updates based on payments
- Protected routes require admin authentication
- Uses existing app's toast notification system
