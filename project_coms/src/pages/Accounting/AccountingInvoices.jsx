import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  getAccountingInvoices,
  createAccountingInvoice,
  updateAccountingInvoice,
  deleteAccountingInvoice,
  sendInvoice,
  addPaymentToInvoice,
  getOverdueInvoices,
  getInvoicesByUnit,
} from "../../api/accountingApi";
import InvoiceModal from "./InvoiceModal";
import AddPaymentModal from "./AddPaymentModal";

const AccountingInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, [showOverdueOnly]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = showOverdueOnly
        ? await getOverdueInvoices()
        : await getAccountingInvoices();
      setInvoices(response.data.data || response.data);
    } catch (error) {
      toast.error("Failed to fetch invoices");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedInvoice(null);
    setIsModalOpen(true);
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?"))
      return;

    try {
      await deleteAccountingInvoice(id);
      toast.success("Invoice deleted successfully");
      fetchInvoices();
    } catch (error) {
      toast.error("Failed to delete invoice");
      console.error(error);
    }
  };

  const handleSendInvoice = async (id) => {
    if (!window.confirm("Are you sure you want to send this invoice?")) return;

    try {
      await sendInvoice(id);
      toast.success("Invoice sent successfully");
      fetchInvoices();
    } catch (error) {
      toast.error("Failed to send invoice");
      console.error(error);
    }
  };

  const handleAddPayment = (invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentModalOpen(true);
  };

  const handleSavePayment = async (data) => {
    try {
      await addPaymentToInvoice(selectedInvoice.id, data);
      toast.success("Payment added successfully");
      setIsPaymentModalOpen(false);
      fetchInvoices();
    } catch (error) {
      toast.error("Failed to add payment");
      console.error(error);
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedInvoice) {
        await updateAccountingInvoice(selectedInvoice.id, data);
        toast.success("Invoice updated successfully");
      } else {
        await createAccountingInvoice(data);
        toast.success("Invoice created successfully");
      }
      setIsModalOpen(false);
      fetchInvoices();
    } catch (error) {
      toast.error("Failed to save invoice");
      console.error(error);
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? invoice.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Accounting Invoices</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Invoice
        </button>
      </div>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 max-w-md px-4 py-2 border rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="partially_paid">Partially Paid</option>
          <option value="overdue">Overdue</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOverdueOnly}
            onChange={(e) => setShowOverdueOnly(e.target.checked)}
            className="w-4 h-4"
          />
          <span>Overdue Only</span>
        </label>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No invoices found
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {invoice.invoice_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {invoice.customer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(invoice.invoice_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(invoice.due_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ₹{parseFloat(invoice.total_amount || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-xs ₹{
                          invoice.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : invoice.status === "overdue"
                            ? "bg-red-100 text-red-800"
                            : invoice.status === "sent"
                            ? "bg-blue-100 text-blue-800"
                            : invoice.status === "partially_paid"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {invoice.status === "draft" && (
                        <button
                          onClick={() => handleSendInvoice(invoice.id)}
                          className="text-purple-600 hover:text-purple-900 mr-3"
                        >
                          Send
                        </button>
                      )}
                      {(invoice.status === "sent" ||
                        invoice.status === "overdue" ||
                        invoice.status === "partially_paid") && (
                        <button
                          onClick={() => handleAddPayment(invoice)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Add Payment
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(invoice)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(invoice.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {isPaymentModalOpen && (
        <AddPaymentModal
          invoice={selectedInvoice}
          onClose={() => setIsPaymentModalOpen(false)}
          onSave={handleSavePayment}
        />
      )}
    </div>
  );
};

export default AccountingInvoices;
