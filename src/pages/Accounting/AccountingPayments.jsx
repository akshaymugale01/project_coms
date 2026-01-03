import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  getAccountingPayments,
  createAccountingPayment,
  updateAccountingPayment,
  deleteAccountingPayment,
  getPaymentsByInvoice,
} from "../../api/accountingApi";
import PaymentModal from "./PaymentModal";
import Navbar from "../../components/Navbar";

const AccountingPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterInvoiceId, setFilterInvoiceId] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await getAccountingPayments();
      setPayments(response.data.data || response.data);
    } catch (error) {
      toast.error("Failed to fetch payments");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByInvoice = async (invoiceId) => {
    setFilterInvoiceId(invoiceId);
    if (!invoiceId) {
      fetchPayments();
      return;
    }

    setLoading(true);
    try {
      const response = await getPaymentsByInvoice(invoiceId);
      setPayments(response.data.data || response.data);
    } catch (error) {
      toast.error("Failed to filter payments");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedPayment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payment?"))
      return;

    try {
      await deleteAccountingPayment(id);
      toast.success("Payment deleted successfully");
      fetchPayments();
    } catch (error) {
      toast.error("Failed to delete payment");
      console.error(error);
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedPayment) {
        await updateAccountingPayment(selectedPayment.id, data);
        toast.success("Payment updated successfully");
      } else {
        await createAccountingPayment(data);
        toast.success("Payment created successfully");
      }
      setIsModalOpen(false);
      fetchPayments();
    } catch (error) {
      console.log("SERVER ERROR:", error.response?.data); 
      toast.error("Failed to save payment");
      console.error(error);
    }
  };

  const filteredPayments = payments.filter((payment) =>
    payment.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.invoice?.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex">
      <Navbar />
    <div className="w-full flex mx-3 mb-10 flex-col overflow-hidden p-6 bg-white/80 mt-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Accounting Payments</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Payment
        </button>
      </div>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search payments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 max-w-md px-4 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Filter by Invoice ID"
          value={filterInvoiceId}
          onChange={(e) => handleFilterByInvoice(e.target.value)}
          className="px-4 py-2 border rounded"
        />
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
                  Payment Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
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
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No payments found
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(payment.payment_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {payment.reference || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {payment.invoice?.invoice_number || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ₹{parseFloat(payment.amount || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      {payment.payment_method?.replace("_", " ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-xs ₹{
                          payment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(payment)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(payment.id)}
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
        <PaymentModal
          payment={selectedPayment}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
    </section>
  );
};

export default AccountingPayments;
