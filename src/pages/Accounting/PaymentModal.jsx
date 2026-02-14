// import React, { useState, useEffect } from "react";
// import { getAccountingInvoices } from "../../api/accountingApi";

// const PaymentModal = ({ payment, onClose, onSave }) => {
//   const [invoices, setInvoices] = useState([]);
//   const [formData, setFormData] = useState({
//     payment_date: new Date().toISOString().split("T")[0],
//     invoice_id: "",
//     amount: 0,
//     payment_method: "cash",
//     payment_type: "",
//     reference: "",
//     status: "completed",
//     notes: "",
//     account_id: ""
//   });

//   useEffect(() => {
//     fetchInvoices();
//     if (payment) {
//       setFormData({
//         payment_date: payment.payment_date?.split("T")[0] || "",
//         invoice_id: payment.invoice_id || "",
//         amount: payment.amount || 0,
//         payment_method: payment.payment_method || "cash",
//         payment_type: payment.payment_type || "income",
//         reference: payment.reference || "",
//         status: payment.status || "completed",
//         notes: payment.notes || "",
//       });
//     }
//   }, [payment]);

//   const fetchInvoices = async () => {
//     try {
//       const response = await getAccountingInvoices();
//       setInvoices(response.data.data || response.data);
//     } catch (error) {
//       console.error("Failed to fetch invoices", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("PAYLOAD BEING SENT:", formData);
//     onSave(formData);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">
//             {payment ? "Edit Payment" : "Create Payment"}
//           </h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             ✕
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="space-y-1/8">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Invoice *
//               </label>
//              <select
//   required
//   name="invoice_id"
//   value={formData.invoice_id}
//  onChange={(e) => {
//   const invoiceId = e.target.value;
//   const inv = invoices.find((i) => i.id == invoiceId);
//   console.log("SELECTED INVOICE:", inv); // 👀 Check if account_id exists

//   setFormData((prev) => ({
//     ...prev,
//     invoice_id: invoiceId,
//     account_id: inv?.account_id || null
//   }));
// }}

//   className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
// >
//   <option value="">Select Invoice</option>

//   {invoices.map((invoice) => (
//     <option key={invoice.id} value={invoice.id}>
//       {invoice.invoice_number} - {invoice.customer_name} (₹
//       {parseFloat(invoice.total_amount || 0).toFixed(2)})
//     </option>
//   ))}
// </select>

//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Payment Date *
//               </label>
//               <input
//                 type="date"
//                 name="payment_date"
//                 value={formData.payment_date}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Amount *
//               </label>
//               <input
//                 type="number"
//                 name="amount"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 required
//                 step="0.01"
//                 min="0"
//                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Payment Method *
//               </label>
//               <select
//                 name="payment_method"
//                 value={formData.payment_method}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="cash">Cash</option>
//                 <option value="cheque">Cheque</option>
//                 <option value="bank_transfer">Bank Transfer</option>
//                 <option value="credit_card">Credit Card</option>
//                 <option value="online">Online Payment</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div>
//   <label className="block text-sm font-medium mb-1">Payment Type *</label>
//   <select
//     required
//     value={formData.payment_type}
//     onChange={(e) =>
//       setFormData((prev) => ({ ...prev, payment_type: e.target.value }))
//     }
//     className="w-full px-4 py-2 border rounded"
//   >
//     <option value="">Select Payment Type</option>
//     <option value="received">Income (Received)</option>
//     <option value="paid">Expense (Paid)</option>
//     <option value="adjustment">Adjustment</option>
//   </select>
// </div>

// <div>
//   <label className="block text-sm font-medium text-gray-700 mb-1">
//     Account *
//   </label>
//   <select
//     name="account_id"
//     value={formData.account_id}
//     onChange={(e) =>
//       setFormData((prev) => ({ ...prev, account_id: e.target.value }))
//     }
//     required
//     className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//   >
//     <option value="">Select Account</option>
//     <option value="1">Cash Account</option>
//     <option value="2">Bank Account</option>
//     <option value="3">Income Account</option>
//     <option value="4">Expense Account</option>
//   </select>
// </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Reference
//               </label>
//               <input
//                 type="text"
//                 name="reference"
//                 value={formData.reference}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Status *
//               </label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="completed">completed</option>
//                 <option value="pending">Pending</option>
//                 <option value="failed">Failed</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Notes
//               </label>
//               <textarea
//                 name="notes"
//                 value={formData.notes}
//                 onChange={handleChange}
//                 rows="3"
//                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border rounded hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               {payment ? "Update" : "Create"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PaymentModal;

import React, { useState, useEffect } from "react";
import {
  getAccountingInvoices,
  getAccountingPayments,
} from "../../api/accountingApi";

const PaymentModal = ({ payment, onClose, onSave }) => {
  const [invoices, setInvoices] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [formData, setFormData] = useState({
    payment_date: new Date().toISOString().split("T")[0],
    accounting_invoice_id: "",
    account_id: "",
    amount: "",
    payment_mode: "cash",
    payment_type: "",
    reference_number: "",
    status: "completed",
    notes: "",
  });

  // -----------------------------
  // LOAD INVOICES + ACCOUNTS
  // -----------------------------
  useEffect(() => {
    if (payment) {
      setFormData({
        payment_date: payment.payment_date?.split("T")[0] || "",
        accounting_invoice_id: payment.accounting_invoice_id?.toString() || "",
        account_id: payment.account_id || "",
        amount: payment.amount || "",
        payment_mode: payment.payment_mode || "cash",
        payment_type: payment.payment_type || "",
        reference_number: payment.reference_number || "",
        status: payment.status || "completed",
        notes: payment.notes || "",
      });
    }
  }, [payment]);
  useEffect(() => {
    if (!payment && formData.accounting_invoice_id && invoices.length > 0) {
      const selectedInvoice = invoices.find(
        (inv) => inv.id.toString() === formData.accounting_invoice_id
      );

      if (selectedInvoice) {
        setFormData((prev) => ({
          ...prev,
          account_id: selectedInvoice.bank_account || "",
        }));
      }
    }
  }, [formData.accounting_invoice_id, invoices, payment]);


  const fetchInvoices = async () => {
    try {
      const res = await getAccountingInvoices();
      setInvoices(res.data.data || res.data);
    } catch (err) {
      console.error("Failed to fetch invoices:", err);
    }
  };



  // -----------------------------
  // HANDLE FORM CHANGES
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const handleInvoiceChange = (e) => {
    const invoiceId = e.target.value;

    const selectedInvoice = invoices.find(
      (inv) => inv.id == invoiceId
    );

    setFormData((prev) => ({
      ...prev,
      accounting_invoice_id: invoiceId,
      account_id: selectedInvoice?.bank_account || "", // 🔥 directly set bank account
    }));
  };
  // -----------------------------
  // SUBMIT PAYMENT
  // -----------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      account_id: formData.account_id, // sending bank account number
    };

    console.log("FINAL PAYLOAD:", payload);
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
          <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {payment ? "Edit Payment" : "Add Payment"}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 mx-8 mb-5">
          {/* INVOICE */}
          <div>
            <label className="block text-sm mb-1 font-medium">Invoice *</label>
            <select
              required
              name="accounting_invoice_id"
              value={formData.accounting_invoice_id}
              onChange={handleInvoiceChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Invoice</option>
              {invoices.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.invoice_number}
                </option>
              ))}
            </select>
          </div>

          {/* ACCOUNT */}
        <div>
            <label className="block text-sm font-medium mb-1">
              Account *
            </label>
            <input
              type="text"
              name="account_id"
              value={formData.account_id}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          {/* PAYMENT DATE */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Payment Date *
            </label>
            <input
              type="date"
              name="payment_date"
              value={formData.payment_date}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* AMOUNT */}
          <div>
            <label className="block text-sm mb-1 font-medium">Amount *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* PAYMENT MODE */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Payment Method *
            </label>
            <select
              name="payment_mode"
              value={formData.payment_mode}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="cash">Cash</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cheque">Cheque</option>
              <option value="credit_card">Credit Card</option>
              <option value="online">Online</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* PAYMENT TYPE */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Payment Type *
            </label>
            <select
              required
              name="payment_type"
              value={formData.payment_type}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Payment Type</option>
              <option value="received">Income (Received)</option>
              <option value="paid">Expense (Paid)</option>
              <option value="adjustment">Adjustment</option>
            </select>
          </div>

          {/* REFERENCE NUMBER */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Reference Number
            </label>
            <input
              type="text"
              name="reference_number"
              value={formData.reference_number}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="block text-sm mb-1 font-medium">Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* NOTES */}
          <div>
            <label className="block text-sm mb-1 font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {payment ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
